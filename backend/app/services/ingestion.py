"""
Ingestion service — loads cv.md at startup, chunks it at paragraph level,
and builds a TF-IDF vector index for retrieval.

Each chunk is one logical unit: one project, one experience entry,
one skills category, one certification, or one achievement.
"""

import os
import re
import logging
from dataclasses import dataclass, field

from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np

logger = logging.getLogger(__name__)


@dataclass
class Chunk:
    """A single chunk of portfolio knowledge."""
    text: str
    section: str          # e.g. "Projects", "Work Experience"
    subsection: str       # e.g. "Sampark AI Platform", "SmartBridge"
    source_type: str      # "project", "experience", "skill", "certification", "achievement", "general"
    source_id: str        # slug for linking to frontend
    keywords: list[str] = field(default_factory=list)  # tech/keywords for boosting


# Mapping from CV section headers to source types
_SECTION_TYPE_MAP = {
    "projects": "project",
    "work experience": "experience",
    "technical skills": "skill",
    "certifications": "certification",
    "achievements": "achievement",
    "open-source": "opensource",
    "education": "general",
    "contact": "general",
    "professional summary": "general",
    "training": "general",
}


def _slugify(text: str) -> str:
    """Convert a title to a URL-friendly slug."""
    slug = text.lower().strip()
    slug = re.sub(r"[^\w\s-]", "", slug)
    slug = re.sub(r"[\s_]+", "-", slug)
    slug = re.sub(r"-+", "-", slug)
    return slug.strip("-")


def _detect_source_type(section: str) -> str:
    section_lower = section.lower()
    for key, source_type in _SECTION_TYPE_MAP.items():
        if key in section_lower:
            return source_type
    return "general"


def _extract_subsection_id(subsection: str, source_type: str) -> str:
    """Extract a slug ID from a subsection title."""
    cleaned = re.sub(r"^\d+\.\s*", "", subsection)
    cleaned = re.split(r"\s*[—–-]\s*", cleaned)[0].strip()
    return _slugify(cleaned) if cleaned else ""


def _extract_keywords_from_text(text: str) -> list[str]:
    """Extract technology/skill keywords from chunk text."""
    tech_terms = [
        "Python", "FastAPI", "Django", "Go", "React", "Next.js", "Node.js",
        "LangGraph", "LangChain", "RAG", "AWS", "GCP", "Docker", "Kubernetes",
        "PostgreSQL", "Redis", "MongoDB", "FAISS", "Qdrant", "pgvector",
        "TensorFlow", "PyTorch", "Scikit-learn", "Celery", "RabbitMQ",
        "OpenTelemetry", "Terraform", "Groq", "LLM", "NLP", "MLOps",
        "GraphQL", "gRPC", "REST", "SSE", "WebSocket", "CI/CD",
        "Prometheus", "Grafana", "MLflow", "W&B", "Hugging Face",
        "EventBridge", "Lambda", "BigQuery", "Firestore", "Cloud Run",
        "Deepgram", "Scapy", "SQLAlchemy", "n8n", "OpenAI",
    ]
    found = []
    text_lower = text.lower()
    for term in tech_terms:
        if term.lower() in text_lower:
            found.append(term)
    return found


def chunk_markdown(filepath: str) -> list[Chunk]:
    """
    Parse cv.md and split into fine-grained chunks.
    Each ### subsection becomes its own chunk.
    Content under ## with no ### is split by bullet groups or paragraphs.
    """
    if not os.path.exists(filepath):
        logger.error("cv.md not found at %s", filepath)
        return []

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    chunks: list[Chunk] = []
    lines = content.split("\n")

    current_section = "General"
    current_subsection = ""
    buffer: list[str] = []

    def flush_buffer():
        nonlocal buffer, current_section, current_subsection
        if not buffer or not current_subsection:
            buffer = []
            return
        text = "\n".join(buffer).strip()
        if not text or len(text) < 20:  # skip tiny/empty chunks
            buffer = []
            return
        source_type = _detect_source_type(current_section)
        source_id = _extract_subsection_id(current_subsection, source_type)
        keywords = _extract_keywords_from_text(text)
        chunks.append(Chunk(
            text=f"[{current_section} > {current_subsection}]\n{text}",
            section=current_section,
            subsection=current_subsection,
            source_type=source_type,
            source_id=source_id,
            keywords=keywords,
        ))
        buffer = []

    for line in lines:
        # Track ## section headers
        h2_match = re.match(r"^##\s+(.+)", line)
        if h2_match:
            flush_buffer()
            current_section = h2_match.group(1).strip().lstrip("#").strip()
            # Don't set subsection yet — wait for ### or content
            current_subsection = current_section
            buffer = [line]
            continue

        # Track ### subsection headers
        h3_match = re.match(r"^###\s+(.+)", line)
        if h3_match:
            flush_buffer()
            current_subsection = h3_match.group(1).strip()
            buffer = [line]
            continue

        # Track horizontal rules as section breaks
        if line.strip() == "---":
            flush_buffer()
            continue

        buffer.append(line)

    # Flush final buffer
    flush_buffer()

    # Now further split any chunk that's still too large (>3000 chars)
    # by splitting on blank lines
    final_chunks = []
    for chunk in chunks:
        if len(chunk.text) > 3000:
            # Split on double newlines (paragraph breaks)
            paragraphs = re.split(r"\n\s*\n", chunk.text)
            # First paragraph usually has the header — keep it in each sub-chunk
            header = paragraphs[0] if paragraphs else ""
            body_parts = paragraphs[1:] if len(paragraphs) > 1 else paragraphs

            # Group into chunks of ~2000 chars
            current_group = [header]
            current_len = len(header)

            for para in body_parts:
                if current_len + len(para) > 2000 and len(current_group) > 1:
                    # Flush this group
                    text = "\n\n".join(current_group)
                    sub_id = _extract_subsection_id(chunk.subsection, chunk.source_type)
                    keywords = _extract_keywords_from_text(text)
                    final_chunks.append(Chunk(
                        text=text,
                        section=chunk.section,
                        subsection=chunk.subsection,
                        source_type=chunk.source_type,
                        source_id=sub_id,
                        keywords=keywords,
                    ))
                    current_group = [header]
                    current_len = len(header)

                current_group.append(para)
                current_len += len(para)

            # Flush remaining
            if current_group:
                text = "\n\n".join(current_group)
                keywords = _extract_keywords_from_text(text)
                final_chunks.append(Chunk(
                    text=text,
                    section=chunk.section,
                    subsection=chunk.subsection,
                    source_type=chunk.source_type,
                    source_id=chunk.source_id,
                    keywords=keywords,
                ))
        else:
            final_chunks.append(chunk)

    logger.info("Loaded %d chunks from %s", len(final_chunks), filepath)
    return final_chunks


class KnowledgeIndex:
    """
    In-memory TF-IDF index over portfolio chunks.
    Built once at startup, queried on every /api/ai/ask call.
    """

    def __init__(self):
        self.chunks: list[Chunk] = []
        self.vectorizer: TfidfVectorizer | None = None
        self.tfidf_matrix = None

    def build(self, chunks: list[Chunk]) -> None:
        """Build the TF-IDF index from chunks."""
        if not chunks:
            logger.warning("No chunks to index.")
            return

        self.chunks = chunks
        self.vectorizer = TfidfVectorizer(
            stop_words="english",
            max_features=10000,
            ngram_range=(1, 3),  # up to trigrams for better matching
            min_df=1,
            sublinear_tf=True,  # apply log normalization to term frequencies
        )
        texts = [chunk.text for chunk in self.chunks]
        self.tfidf_matrix = self.vectorizer.fit_transform(texts)
        logger.info(
            "TF-IDF index built: %d chunks, %d features",
            len(self.chunks),
            self.tfidf_matrix.shape[1],
        )

    def search(self, query: str, top_k: int = 6) -> list[tuple[Chunk, float]]:
        """
        Retrieve the top-k most relevant chunks for a query.
        Uses TF-IDF similarity with keyword boosting.
        """
        if self.vectorizer is None or self.tfidf_matrix is None:
            return []

        # Query expansion: add common synonyms/related terms
        expanded = self._expand_query(query)

        query_vec = self.vectorizer.transform([expanded])
        similarities = (self.tfidf_matrix @ query_vec.T).toarray().flatten()

        # Keyword boosting: if chunk keywords appear in the query, boost score
        query_lower = query.lower()
        for i, chunk in enumerate(self.chunks):
            for kw in chunk.keywords:
                if kw.lower() in query_lower:
                    similarities[i] *= 1.3  # 30% boost per matching keyword

        # Get top-k indices
        top_indices = np.argsort(similarities)[::-1][:top_k]

        results = []
        for idx in top_indices:
            score = float(similarities[idx])
            if score > 0.005:  # Lower threshold — let the LLM decide relevance
                results.append((self.chunks[idx], score))

        return results

    def _expand_query(self, query: str) -> str:
        """Add related terms to improve recall."""
        expansions = {
            "backend": "backend API server FastAPI Django",
            "frontend": "frontend UI React JavaScript",
            "ml": "machine learning deep learning neural network",
            "ai": "artificial intelligence LLM language model",
            "cloud": "AWS GCP Docker Kubernetes infrastructure",
            "devops": "CI/CD deployment Docker Kubernetes monitoring",
            "data": "database PostgreSQL pipeline ETL analytics",
            "nlp": "natural language processing text sentiment",
            "scalable": "distributed async concurrent load",
        }
        expanded = query
        query_lower = query.lower()
        for term, addition in expansions.items():
            if term in query_lower:
                expanded += " " + addition
        return expanded

    @property
    def is_ready(self) -> bool:
        return self.vectorizer is not None and len(self.chunks) > 0

    def get_stats(self) -> dict:
        """Return index statistics."""
        return {
            "chunks": len(self.chunks),
            "features": self.tfidf_matrix.shape[1] if self.tfidf_matrix is not None else 0,
            "ready": self.is_ready,
            "sections": list(set(c.section for c in self.chunks)),
            "source_types": list(set(c.source_type for c in self.chunks)),
        }


# Singleton index instance
index = KnowledgeIndex()


def initialize_index(data_dir: str = None) -> None:
    """Load cv.md and build the index. Called at app startup."""
    if data_dir is None:
        data_dir = os.path.join(
            os.path.dirname(os.path.dirname(__file__)),
            "data",
            "portfolio",
        )

    cv_path = os.path.join(data_dir, "cv.md")
    chunks = chunk_markdown(cv_path)
    index.build(chunks)
