import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routes import contact, ai
from app.services.ingestion import initialize_index

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title="Abhishek Kamble Portfolio API",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)

# CORS — allow frontend origin
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routes
app.include_router(contact.router, prefix="/api")
app.include_router(ai.router, prefix="/api")


@app.on_event("startup")
async def startup():
    """Build the TF-IDF knowledge index at startup."""
    logger.info("Initializing knowledge index...")
    initialize_index()
    logger.info("Knowledge index ready.")


@app.get("/api/health")
async def health_check():
    from app.services.ingestion import index
    return {
        "status": "ok",
        "ai_ready": index.is_ready,
        "chunks_indexed": len(index.chunks),
        "groq_configured": bool(settings.groq_api_key),
        "model": settings.groq_model,
    }
