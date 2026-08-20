from pydantic_settings import BaseSettings
from typing import List
from pathlib import Path

# Resolve .env path relative to this file's directory (backend/)
_ENV_PATH = Path(__file__).resolve().parent.parent / ".env"


class Settings(BaseSettings):
    # Server
    port: int = 8000

    # CORS — comma-separated list of allowed frontend origins
    frontend_url: str = "http://localhost:5173"

    # Email (Resend)
    resend_api_key: str = ""
    contact_to_email: str = "kambleabhishek7744@gmail.com"

    # AI / LLM — Groq (free at console.groq.com)
    groq_api_key: str = ""
    groq_model: str = "openai/gpt-oss-120b"

    @property
    def allowed_origins(self) -> List[str]:
        origins = [self.frontend_url]
        # Always allow localhost for dev
        if "localhost" not in self.frontend_url:
            origins.append("http://localhost:5173")
        return origins

    model_config = {
        "env_file": str(_ENV_PATH),
        "env_file_encoding": "utf-8",
    }


settings = Settings()
