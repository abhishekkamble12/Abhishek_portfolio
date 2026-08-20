from fastapi import APIRouter, HTTPException, Request
from datetime import datetime

from app.models.schemas import ContactRequest, ContactResponse
from app.services.email_service import send_contact_email

router = APIRouter()

# Simple in-memory rate limiting
_rate_limit_store: dict[str, list[float]] = {}
_RATE_LIMIT_MAX = 5
_RATE_LIMIT_WINDOW = 3600  # 1 hour in seconds


def _check_rate_limit(ip: str) -> None:
    now = datetime.utcnow().timestamp()
    if ip not in _rate_limit_store:
        _rate_limit_store[ip] = []
    # Purge old entries
    _rate_limit_store[ip] = [
        t for t in _rate_limit_store[ip] if now - t < _RATE_LIMIT_WINDOW
    ]
    if len(_rate_limit_store[ip]) >= _RATE_LIMIT_MAX:
        raise HTTPException(
            status_code=429,
            detail="Too many requests. Please try again later.",
        )
    _rate_limit_store[ip].append(now)


@router.post("/contact", response_model=ContactResponse)
async def submit_contact(payload: ContactRequest, request: Request):
    # Rate limit by IP
    client_ip = request.client.host if request.client else "unknown"
    _check_rate_limit(client_ip)

    success = await send_contact_email(payload)
    if not success:
        raise HTTPException(status_code=500, detail="Failed to send message.")

    return ContactResponse(success=True, message="Message sent successfully!")
