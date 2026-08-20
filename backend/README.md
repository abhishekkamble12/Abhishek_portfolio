# Portfolio Backend — FastAPI

Backend API for Abhishek Kamble's portfolio website.

## Quick Start

```bash
# 1. Create virtual environment
python -m venv .venv
# Windows:
.venv\Scripts\activate
# Linux/Mac:
source .venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Copy environment variables
copy .env.example .env
# Edit .env with your values

# 4. Run development server
uvicorn app.main:app --reload --port 8000
```

API docs available at: http://localhost:8000/api/docs

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| POST | `/api/ai/ask` | Ask AI assistant (Phase 6) |

## Deployment

### Railway
1. Connect GitHub repo
2. Set root directory to `backend/`
3. Add environment variables from `.env.example`
4. Deploy — Railway auto-detects the Dockerfile

### Render
1. New Web Service → connect repo
2. Root directory: `backend/`
3. Build command: `pip install -r requirements.txt`
4. Start command: `uvicorn app.main:app --host 0.0.0.0 --port $PORT`
