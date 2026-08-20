"""
AI Assistant endpoints — RAG-powered Q&A about Abhishek's portfolio.
Uses TF-IDF retrieval + Groq Llama 3.3 70B generation.

Two modes:
- POST /api/ai/ask — synchronous, returns full answer
- POST /api/ai/ask/stream — SSE streaming, word-by-word delivery
"""

import json
import logging
from fastapi import APIRouter, Request, HTTPException
from fastapi.responses import StreamingResponse
from datetime import datetime

from app.models.schemas import AskRequest, AskResponse, SourceReference
from app.services.rag_service import retrieve_and_generate, retrieve_and_generate_stream

logger = logging.getLogger(__name__)

router = APIRouter()

# Rate limiting for AI endpoint
_rate_limit_store: dict[str, list[float]] = {}
_RATE_LIMIT_MAX = 15
_RATE_LIMIT_WINDOW = 3600  # 1 hour


def _check_rate_limit(ip: str) -> None:
    now = datetime.utcnow().timestamp()
    if ip not in _rate_limit_store:
        _rate_limit_store[ip] = []
    _rate_limit_store[ip] = [
        t for t in _rate_limit_store[ip] if now - t < _RATE_LIMIT_WINDOW
    ]
    if len(_rate_limit_store[ip]) >= _RATE_LIMIT_MAX:
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again later.",
        )
    _rate_limit_store[ip].append(now)


@router.post("/ai/ask", response_model=AskResponse)
async def ask_assistant(payload: AskRequest, request: Request):
    """
    Ask a question about Abhishek's portfolio (synchronous).
    """
    client_ip = request.client.host if request.client else "unknown"
    _check_rate_limit(client_ip)

    logger.info("AI question from %s: %s", client_ip, payload.question[:80])

    result = retrieve_and_generate(payload.question)

    sources = [
        SourceReference(type=s["type"], id=s["id"], title=s["title"])
        for s in result.sources
    ]

    return AskResponse(answer=result.answer, sources=sources)


@router.post("/ai/ask/stream")
async def ask_assistant_stream(payload: AskRequest, request: Request):
    """
    Ask a question — streams response via Server-Sent Events.
    Each event is a JSON object with {type, data}.
    """
    client_ip = request.client.host if request.client else "unknown"
    _check_rate_limit(client_ip)

    logger.info("AI stream question from %s: %s", client_ip, payload.question[:80])

    async def event_generator():
        for item in retrieve_and_generate_stream(payload.question):
            # SSE format: "data: {json}\n\n"
            yield f"data: {json.dumps(item)}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",  # Disable nginx buffering
        },
    )
