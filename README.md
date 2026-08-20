# Abhishek Kamble — Portfolio

A modern, AI-native engineering portfolio with a FastAPI backend and React frontend.

## Architecture

```
Abhishek_portfolio/
├── frontend/    → React + Vite + Tailwind (deploy → Vercel)
├── backend/     → FastAPI + Python (deploy → Railway/Render)
├── cv.md        → Master profile reference document
└── plan.md      → Project vision and design decisions
```

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
# Opens http://localhost:5173
```

### Backend
```bash
cd backend
python -m venv .venv
.venv\Scripts\activate        # Windows
source .venv/bin/activate     # Linux/Mac
pip install -r requirements.txt
copy .env.example .env        # Edit with your values
uvicorn app.main:app --reload --port 8000
# API docs at http://localhost:8000/api/docs
```

## Deployment

### Frontend → Vercel
```bash
cd frontend
npx vercel --prod
```
Set environment variable: `VITE_API_URL` = your backend URL

### Backend → Railway
1. Connect GitHub repo on Railway
2. Set root directory to `backend/`
3. Add env vars from `backend/.env.example`
4. Deploy — auto-detects Dockerfile

## Tech Stack

**Frontend:** React 19, Vite 6, Tailwind CSS v4, Framer Motion, Lucide React

**Backend:** FastAPI, Pydantic, Resend (email), Docker

## Sections

| Section | Description |
|---|---|
| Hero | Name, title, tagline, stats, social links |
| Skills | 8 capability categories from CV |
| Projects | 16 projects with search, filters, metrics |
| Experience | 2 internships with detailed bullets |
| Open Source | CNCF contributions (OpenTelemetry, KubeEdge) |
| About | Bio, education, stats |
| Certifications | 5 professional certifications |
| Contact | Form wired to backend API |

## License

Personal portfolio — all rights reserved.
