"""
RAG service — retrieves relevant chunks from the TF-IDF index
and generates answers using Groq (GPT-OSS 120B).

Includes streaming support for real-time word-by-word delivery.
"""

import logging
import re
from dataclasses import dataclass, field
from typing import Generator

from groq import Groq

from app.config import settings
from app.services.ingestion import index

logger = logging.getLogger(__name__)


SYSTEM_PROMPT = """You are the AI assistant for Abhishek Kamble's portfolio. You help recruiters, hiring managers, and engineers understand Abhishek's capabilities.

STRICT RULES:
1. Answer ONLY using the portfolio context provided below. Never invent or assume projects, technologies, employers, dates, metrics, or achievements that aren't mentioned.
2. If the context doesn't contain enough information, say: "Based on the portfolio, I don't have specific information about that. You could ask about his projects, experience, skills, or achievements."
3. Always mention SPECIFIC project names and metrics from the context (e.g., "In Arishem, he achieved 300-700ms latency with Groq Llama 3.3 70B").
4. Structure responses clearly:
   - Lead with a direct answer
   - Follow with specific evidence from projects/experience
   - Include metrics when available
   - Use bullet points for lists of 3+ items
5. If asked a comparison question (e.g., "which project is most impressive"), give an informed opinion backed by metrics and complexity.
6. For skill/technology questions, map each technology to the specific project where it was used.
7. If the question is off-topic (not about Abhishek's work), say: "I specialize in Abhishek's portfolio. Try asking about his AI projects, backend experience, or technical skills."

PORTFOLIO CONTEXT (sorted by relevance, most relevant first):
{context}

Remember: Be specific, cite projects by name, and include metrics. Make the response feel like an informed conversation, not a database dump."""


@dataclass
class SourceRef:
    type: str
    id: str
    title: str
    relevance: float  # 0.0 to 1.0


@dataclass
class RAGResult:
    answer: str
    sources: list[dict] = field(default_factory=list)
    confidence: float = 0.0  # Overall retrieval confidence


def _build_context(results: list[tuple], max_chars: int = 4000) -> str:
    """Build formatted context from retrieved chunks, sorted by relevance."""
    context_parts = []
    total_chars = 0

    for chunk, score in results:
        # Truncate very long chunks
        text = chunk.text
        if len(text) > 1500:
            text = text[:1500] + "\n... (truncated)"

        entry = f"--- [{chunk.section} > {chunk.subsection}] (relevance: {score:.2f}) ---\n{text}"

        if total_chars + len(entry) > max_chars:
            break

        context_parts.append(entry)
        total_chars += len(entry)

    return "\n\n".join(context_parts)


def _extract_sources(results: list[tuple]) -> tuple[list[dict], float]:
    """Extract unique source references and compute overall confidence."""
    sources = []
    seen_ids = set()

    for chunk, score in results:
        source_key = (chunk.source_type, chunk.source_id)
        if source_key not in seen_ids and chunk.source_id:
            seen_ids.add(source_key)
            # Normalize score to 0-1 range (TF-IDF scores are typically 0-0.5)
            normalized = min(score * 5, 1.0)
            sources.append({
                "type": chunk.source_type,
                "id": chunk.source_id,
                "title": chunk.subsection,
                "relevance": round(normalized, 2),
            })

    # Confidence = max score normalized
    max_score = results[0][1] if results else 0
    confidence = min(max_score * 5, 1.0)

    return sources, round(confidence, 2)


def retrieve_and_generate(question: str, top_k: int = 6) -> RAGResult:
    """
    Full RAG pipeline:
    1. Retrieve top-k chunks from TF-IDF index
    2. Build prompt with retrieved context
    3. Generate answer via Groq
    4. Return answer with source references and confidence
    """
    if not index.is_ready:
        return RAGResult(
            answer="The knowledge base is still loading. Please try again in a few seconds.",
            sources=[],
            confidence=0.0,
        )

    if not settings.groq_api_key:
        return RAGResult(
            answer="The AI service needs to be configured. Please set the GROQ_API_KEY environment variable.",
            sources=[],
            confidence=0.0,
        )

    # 1. Retrieve
    results = index.search(question, top_k=top_k)

    if not results:
        return RAGResult(
            answer="I searched the portfolio but couldn't find a direct match. Try rephrasing, or ask about: projects (e.g., Arishem, REDROB, Sampark), experience (VMK SI Pay, SmartBridge), skills (Python, Go, AWS), or achievements (LeetCode, hackathons).",
            sources=[],
            confidence=0.0,
        )

    # 2. Build context and sources
    context = _build_context(results)
    sources, confidence = _extract_sources(results)

    # 3. Generate via Groq
    try:
        client = Groq(api_key=settings.groq_api_key)

        response = client.chat.completions.create(
            model=settings.groq_model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT.format(context=context)},
                {"role": "user", "content": question},
            ],
            temperature=0.3,
            max_tokens=1024,
            top_p=0.9,
        )

        answer = response.choices[0].message.content

    except Exception as e:
        logger.error("Groq API error: %s", e)
        return RAGResult(
            answer=f"Something went wrong generating the response. Please try again.",
            sources=sources,
            confidence=confidence,
        )

    return RAGResult(answer=answer, sources=sources, confidence=confidence)


def retrieve_and_generate_stream(question: str, top_k: int = 6) -> Generator[dict, None, None]:
    """
    Streaming RAG pipeline — yields tokens as they arrive from Groq.
    Each yield is a dict: {"type": "token"|"sources"|"meta"|"error", "data": ...}
    """
    if not index.is_ready:
        yield {"type": "error", "data": "Knowledge base is still loading."}
        return

    if not settings.groq_api_key:
        yield {"type": "error", "data": "AI service not configured."}
        return

    # 1. Retrieve
    results = index.search(question, top_k=top_k)

    if not results:
        yield {"type": "error", "data": "No relevant information found. Try asking about specific projects, skills, or experience."}
        return

    # 2. Send meta info first
    context = _build_context(results)
    sources, confidence = _extract_sources(results)
    yield {"type": "meta", "data": {"sources": sources, "confidence": confidence}}

    # 3. Stream from Groq
    try:
        client = Groq(api_key=settings.groq_api_key)

        stream = client.chat.completions.create(
            model=settings.groq_model,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT.format(context=context)},
                {"role": "user", "content": question},
            ],
            temperature=0.3,
            max_tokens=1024,
            top_p=0.9,
            stream=True,
        )

        for chunk in stream:
            if chunk.choices and chunk.choices[0].delta.content:
                yield {"type": "token", "data": chunk.choices[0].delta.content}

    except Exception as e:
        logger.error("Groq streaming error: %s", e)
        yield {"type": "error", "data": f"Error generating response: {str(e)[:100]}"}
        return

    yield {"type": "done", "data": None}
