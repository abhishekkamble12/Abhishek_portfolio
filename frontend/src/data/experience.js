export const experience = [
  {
    id: "vmk-si-pay",
    role: "Software Engineering Intern",
    company: "VMK SI Pay (RentEdge)",
    period: "May 2026 – Aug 2026",
    location: "Remote",
    bullets: [
      "Built production features end-to-end for an AI property-management platform: Next.js frontend consuming FastAPI REST endpoints, with JWT authentication, request validation, and structured error handling from UI to database.",
      "Architected an event-driven, asynchronous WhatsApp notification pipeline (producer/consumer, off the request path) that decoupled message delivery from API responses — improving responsiveness and supporting concurrent user actions without timeout risk.",
      "Collaborated through technical code reviews, design discussions with founders, and cross-functional stakeholders across iterative Agile sprint cycles.",
    ],
    tech: ["Next.js", "TypeScript", "FastAPI", "Python", "PostgreSQL", "JWT/RBAC", "Docker"],
  },
  {
    id: "smartbridge",
    role: "Machine Learning Intern",
    company: "SmartBridge (Frost Solutions)",
    period: "Jun 2025 – Aug 2025",
    location: "Hyderabad / Remote",
    bullets: [
      "Built production ETL pipelines processing 50K+ records per run with schema validation and failure recovery, reducing ingestion failures by 40% and making pipeline runs resumable from the last successful batch.",
      "Deployed a time-series forecasting model behind a monitored production REST API sustaining sub-200ms p95 latency under load.",
      "Designed evaluation pipelines instrumented with MAE tracking and drift detection to monitor model performance in production-like environments before affecting downstream consumers.",
    ],
    tech: ["Python", "FastAPI", "PyTorch", "Scikit-learn", "ETL", "Prometheus", "Time-Series"],
  },
];
