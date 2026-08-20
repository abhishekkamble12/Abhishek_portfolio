import logging
from app.config import settings
from app.models.schemas import ContactRequest

logger = logging.getLogger(__name__)


async def send_contact_email(payload: ContactRequest) -> bool:
    """
    Send contact form submission via Resend API.
    Falls back to logging if RESEND_API_KEY is not configured.
    """
    if not settings.resend_api_key:
        logger.warning(
            "RESEND_API_KEY not set — logging contact submission instead of sending email."
        )
        logger.info(
            "Contact form: name=%s email=%s subject=%s message=%s",
            payload.name,
            payload.email,
            payload.subject,
            payload.message[:100],
        )
        # Return True so the frontend still shows success during dev
        return True

    try:
        import resend

        resend.api_key = settings.resend_api_key

        html_body = f"""
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> {payload.name}</p>
        <p><strong>Email:</strong> {payload.email}</p>
        <p><strong>Subject:</strong> {payload.subject}</p>
        <p><strong>Message:</strong></p>
        <p>{payload.message.replace(chr(10), '<br>')}</p>
        """

        resend.Emails.send(
            {
                "from": "Portfolio <onboarding@resend.dev>",
                "to": [settings.contact_to_email],
                "subject": f"Portfolio Contact: {payload.subject}",
                "html": html_body,
                "reply_to": payload.email,
            }
        )
        return True
    except Exception as e:
        logger.error("Failed to send email via Resend: %s", e)
        return False
