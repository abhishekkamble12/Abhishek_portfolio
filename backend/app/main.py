import asyncio
import logging
import os

import httpx
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


# ── Keep-alive self-ping (prevents Render free tier from sleeping) ──────────
SELF_URL = os.getenv("RENDER_EXTERNAL_URL", "")  # Render sets this automatically
PING_INTERVAL = 14 * 60  # 14 minutes (Render sleeps after 15 min inactivity)


async def _keep_alive():
    """Ping own /api/health every 14 min so Render never goes to sleep."""
    if not SELF_URL:
        logger.info("RENDER_EXTERNAL_URL not set — keep-alive disabled (local dev).")
        return
    url = f"{SELF_URL}/api/health"
    async with httpx.AsyncClient(timeout=10) as client:
        while True:
            await asyncio.sleep(PING_INTERVAL)
            try:
                resp = await client.get(url)
                logger.info(f"[keep-alive] ping → {url} — {resp.status_code}")
            except Exception as exc:
                logger.warning(f"[keep-alive] ping failed: {exc}")


@app.on_event("startup")
async def startup():
    """Build the TF-IDF knowledge index at startup and launch keep-alive."""
    logger.info("Initializing knowledge index...")
    initialize_index()
    logger.info("Knowledge index ready.")
    # Start background keep-alive task
    asyncio.create_task(_keep_alive())
    logger.info("Keep-alive task started.")


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
