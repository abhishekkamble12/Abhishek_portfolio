# Abhishek Kamble — Master Profile / Long-Context Reference

## Contact & Identity
- Name: Abhishek Kamble (Kamble Abhishek Datta)
- Location: Pune, Maharashtra, India
- Phone: +91-7822942862
- Email: kambleabhishek7744@gmail.com
- LinkedIn: linkedin.com/in/abhishek-softwaredev
- GitHub: github.com/abhishekkamble12

## Education
- B.Tech, Electronics and Telecommunication Engineering
- MIT Academy of Engineering (MITAOE), Pune, Maharashtra
- Aug 2023 – May 2027 (expected graduation May 2027)
- CGPA: 7.6 / 10
- Relevant Coursework: Operating Systems, Computer Networks, Data Structures and Algorithms, DBMS, Object-Oriented Programming

## Professional Summary
Full-Stack & Backend Engineer shipping production features across React/TypeScript, FastAPI, and PostgreSQL — with hands-on depth in LLM agent orchestration (LangGraph), tool-calling, hybrid RAG systems, distributed backends (Celery, Redis, RabbitMQ), and cloud-native observability (OpenTelemetry). Active contributor to CNCF incubating projects and Linux Foundation LFX Mentorship alumnus.

---

## Work Experience

### Software Engineering Intern — VMK SI Pay (RentEdge)
**May 2026 – Aug 2026, Remote**
- Shipped production features end-to-end for an AI property-management platform: Next.js frontend consuming FastAPI REST endpoints, with JWT authentication, request validation, and structured error handling from UI to database.
- Architected an event-driven, asynchronous WhatsApp notification pipeline (producer/consumer, decoupled from API request path) to support concurrent user actions without timeout risk.
- Collaborated through technical code reviews, design discussions with founders, and cross-functional stakeholders across iterative Agile sprint cycles.
- Key skills: Next.js, TypeScript, FastAPI, Python, PostgreSQL, JWT/RBAC, Docker

### Machine Learning Intern — SmartBridge (Frost Solutions)
**Jun 2025 – Aug 2025, Hyderabad / Remote**
- Built production ETL pipelines processing 50K+ records per run with schema validation and failure recovery, reducing ingestion failures by 40% and making pipeline runs resumable from the last successful batch.
- Deployed a time-series forecasting model behind a monitored production REST API sustaining sub-200ms p95 latency under load.
- Designed evaluation pipelines instrumented with MAE tracking and drift detection to monitor model performance in production-like environments before affecting downstream consumers.
- Key skills: Python, FastAPI, PyTorch, Scikit-learn, ETL, Prometheus, Time-Series

---

## Projects (Detailed)

### 1. Monarch — Multi-Agent AI Platform on AWS
GitHub: github.com/abhishekkamble12
- Led a 4-person team to architect Monarch AI, an enterprise multi-agent platform for analyzing invoices, POs, contracts, and general business documents to identify payment delays, legal exposure, MSMED interest, and generate evidence-backed recovery actions.
- Designed the FastAPI + LangGraph orchestration layer, routing requests across planner, research, RAG, and vision agents with typed state, tool integration, persistent memory, and self-reflection-based execution.
- Built hybrid retrieval with FAISS, BM25, Reciprocal Rank Fusion (RRF), and HyDE query expansion; implemented reflection-based validation and faithfulness checks to improve grounding and response reliability.
- Implemented enterprise guardrails including PII masking, prompt injection defense, sliding window rate limiting (20 req/min), LangSmith observability, FastMCP server tools, and containerized Docker/AWS deployment architecture (ECS/Fargate, PostgreSQL + pgvector, S3, SQS).
- Integrated LangSmith tracing and Docker-based services with Harness + DeepEval evaluation workflows.

### 2. Arishem — Multi-Tenant RAG Backend Platform
GitHub: github.com/abhishekkamble12/Arishem
- Architected a multi-tenant RAG backend ingesting PDF, DOCX, PPTX, and AWS Transcribe audio/video into citation-grounded knowledge; achieved 2.2s async ingestion and median 1.4s query latency verified on a live document corpus.
- Enforced tenant-level data trust boundaries via JWT/RBAC (3-tier roles) and workspace-scoped Qdrant payload filtering.
- Benchmarked inference head-to-head on Bedrock Claude vs. Groq (Llama 3.3 70B), moving to Groq to cut LLM cost by ~50% and latency to 300–700ms.
- Implemented confidence-gated generation that short-circuits LLM calls when semantic similarity falls below 0.35 (measured OOD score: 0.0986), eliminating hallucinations and reducing inference calls by a further ~20%; validated end-to-end quality via a RAGAS harness (Faithfulness 0.9231, Answer Relevancy 0.8845, Context Recall 0.8903).
- Stack: Django REST Framework, MySQL, Qdrant, Celery, RabbitMQ, Groq (Llama 3.3 70B), AWS Bedrock (Claude), Docker, React, RAGAS

### 3. QueueFlow — Distributed Job Processing System
GitHub: github.com/abhishekkamble12/QueueFlow
- Built QueueFlow, an asynchronous background job management system using Django REST Framework, Celery, Redis, and PostgreSQL to decouple long-running tasks from API requests and support job queuing, status tracking, retries, and cancellation.
- Implemented a state-driven job lifecycle with owner/admin authorization, JWT authentication, job-type validation, retry and cancellation workflows, and persistent audit history capturing status transitions and triggering users.
- Load-tested at 10/50/100 concurrent users via Locust, sustaining 0% failures up to 50 users (14.86 RPS, 390ms median); deliberately benchmarked against a SQLite backend at 100 users to expose file-locking write contention (4.26% failure rate), validating PostgreSQL as the production database in the Docker Compose stack.
- Stack: Django, DRF, Celery, Redis, PostgreSQL, JWT, Docker, Locust

### 4. SupplySense — Autonomous Retail Inventory & Decision Engine
GitHub: github.com/abhishekkamble12/SupplySense
- Engineered a probabilistic demand-forecasting pipeline on 30,490+ retail SKUs (Walmart M5 dataset) using LightGBM with temporal lag and rolling features, achieving R² = 0.884 (RMSE 2.14, MAE 1.42), a 34.2% lift over rolling baselines.
- Designed a stochastic inventory optimizer computing dynamic safety stock and reorder points (ROP) from demand-lead-time variance, driving automated purchase-order generation with MOQ clamping.
- Benchmarked LightGBM, Gradient Boosting, Ridge, LSTM, and Temporal Fusion Transformer (TFT) candidates with MLflow/DagsHub tracking and automated champion-model selection for deployment.
- Served the platform via a containerized FastAPI backend with SQLAlchemy/PostgreSQL persistence and a dual-layer Redis cache, exposed through an interactive dashboard for real-time forecast and inventory review (<120ms p50 latency).
- Stack: Python, LightGBM, PyTorch (LSTM/TFT), FastAPI, PostgreSQL, Redis, MLflow, Docker

### 5. Go Service Ops Kit
GitHub: github.com/abhishekkamble12/ops_kit
- Built a Go HTTP service for RHEL-compatible Linux using the standard net/http library, with health/readiness checks, build metadata, simulated workload handling, structured JSON logging, OpenTelemetry tracing, and graceful shutdown.
- Automated deployment with an idempotent Ansible role that provisions a non-root systemd service, renders environment configuration, manages firewalld, and conditionally restarts the service only when binaries or configuration change.
- Hardened the Linux service with systemd sandboxing including ProtectSystem, ProtectHome, PrivateTmp, and NoNewPrivileges, while keeping SELinux enforcing and integrating logs with systemd-journald.
- Added table-driven HTTP and configuration tests covering success paths, method enforcement, invalid inputs, and edge cases; configured GitHub Actions for go vet, race-enabled tests, Linux builds, and Ansible syntax validation.
- Stack: Go, Ansible, systemd, OpenTelemetry, RHEL-compatible Linux, GitHub Actions, CI/CD

### 6. LLM Cost Autopilot — LLM Routing and Evaluation Gateway
GitHub: github.com/abhishekkamble12/LLM_Autopilot
- Built an LLM inference gateway that routes requests across providers using prompt complexity, model capability, latency, and token-cost signals — cutting blended inference cost by ~35% versus a single-provider baseline.
- Designed a verification loop where every response is scored against a stronger reference model via a RAGAS-style evaluator, with weak responses escalated rather than returned to the caller.
- Instrumented routing decisions with OpenTelemetry traces into Grafana, surfacing per-route P95 latency, cost-per-request, and escalation rate — used to identify and retune the highest-cost prompt patterns in production.
- Stack: Python, FastAPI, OpenTelemetry, Grafana, Docker, RAGAS

### 7. CoralGuard AI — Marine Ecosystem Detection
GitHub: github.com/abhishekkamble12/CoralGuard_AI
- Built an EfficientNet-B3 transfer-learning pipeline for coral-health image classification, achieving 86.14% validation accuracy across multi-class reef-health categories.
- Applied Albumentations-based augmentation to improve generalization on limited marine imagery, and HDBSCAN density-based clustering to flag anomalous ecosystem patterns without labeled anomaly data.
- Fused 41K+ environmental telemetry records with visual predictions in an interactive Streamlit dashboard for real-time reef-health monitoring and anomaly review.
- Stack: Python, TensorFlow, EfficientNet-B3, HDBSCAN, Streamlit, Grad-CAM

### 8. Sampark AI Platform — Multi-Agent Government Decision Intelligence
GitHub: github.com/abhishekkamble12
- Automated end-to-end citizen complaint triage via a 7-node LangGraph pipeline with Vertex AI Search RAG and human-in-the-loop approval checkpoints.
- Stack: Python, LangGraph, Vertex AI Search, Google Cloud, BigQuery, Firestore, Cloud Run

### 9. HiveMind — Event-Driven Media & Agentic Research Platform
GitHub: github.com/abhishekkamble12/hivemind
- Event-driven media processing platform on AWS EventBridge and Lambda, with FastAPI service layer over PostgreSQL/pgvector for semantic search.
- Stack: Python, FastAPI, AWS EventBridge, Lambda, PostgreSQL, pgvector, Redis, Docker

### 10. Sentiment Intelligence Platform
GitHub: github.com/abhishekkamble12/Sentiment_analysis_mlopsss
- Tiered sentiment service: fast classical model (TF-IDF + LinearSVC) → DistilBERT refinement → LLM fallback, with LangChain search/report agents. Subject of an IEEE research paper draft.
- Stack: Python, FastAPI, LangChain, DistilBERT, SQLAlchemy, Alembic

---

## Open-Source Contributions
- **opentelemetry-go-compile-instrumentation (CNCF Incubating | Linux Foundation LFX Mentorship)**: Shipped pull requests with test coverage and passing CI on production observability tooling for distributed systems; added GenAI client instrumentation, telemetry coverage, and multi-process propagation tests (PR #992, PR #1107).
- **KubeEdge Ianvs (CNCF Sandbox)**: Diagnosed and fixed a subprocess byte-output decoding/parsing bug causing intermittent failures in the interoperability test suite by tracing root cause through Python system internals (PR #816).

---

## Technical Skills

- **Languages:** Python, Go, TypeScript, JavaScript, SQL, Java, C++
- **AI & LLM Orchestration:** LangGraph, LangChain, Hybrid RAG (FAISS + BM25 + Reciprocal Rank Fusion), RAGAS Evaluation, Multi-Agent Systems, Tool Calling & FastMCP, Groq & AWS Bedrock, Prompt Security & Guardrails
- **Backend & Distributed Systems:** FastAPI, Django & DRF, Celery, RabbitMQ, Redis, REST APIs & Microservices, JWT & RBAC Authorization, Event-Driven Architecture, Next.js
- **Machine Learning & Data:** PyTorch, TensorFlow, LightGBM, Scikit-learn, MLflow, Time-Series Forecasting & Drift Detection, PostgreSQL & pgvector, Qdrant, SQLAlchemy, ETL Pipelines & Pandas
- **Cloud, Systems & Observability:** AWS (ECS, S3, SQS, EC2, Lambda), Linux (RHEL, systemd sandboxing), Ansible, Docker, Kubernetes, OpenTelemetry, Prometheus, Grafana, Jaeger, GitHub Actions, CI/CD, Terraform

---

## Achievements
- **WeMakeDev Global Hackathon:** Top 20 of 500+ Global Teams (sponsored by Meta & Cerebras) — led backend architecture and system design
- **AWS AI for Bharat Hackathon:** Semi-Finalist — team lead for AI-powered asynchronous backend architecture
- **LeetCode:** 1550+ contest rating, 300+ problems solved
- **CodeChef:** 4-Star rating
