# Abhishek Kamble — Master Profile / Long-Context Reference

## Contact & Identity
- Name: Kamble Abhishek Datta (goes by Abhishek Kamble)
- Location: Pune, Maharashtra, India
- Phone: +91-7822942862
- Email: kambleabhishek7744@gmail.com | 202301070020@mitaoe.ac.in
- LinkedIn: linkedin.com/in/abhishek-softwaredev
- GitHub: github.com/abhishekkamble12

## Education
- B.Tech, Electronics and Telecommunication Engineering
- MIT Academy of Engineering (MITAOE), Pune, Maharashtra
- Aug 2023 – May 2027 (expected graduation 2027)
- CGPA: 7.6/10 (also seen as 7.53/10 on one export — use 7.6 as canonical)

## Professional Summary
Backend engineer who builds agentic AI systems — LangGraph pipelines, RAG search, and the APIs that expose them — on FastAPI/Django and AWS/GCP. Increasingly focused on voice AI and multi-agent orchestration. Top-20 finish of 500+ teams at the WeMakeDev Global Hackathon (Meta & Cerebras sponsors).

---

## Work Experience

### AI Backend Intern — VMK SI Pay (RentEdge)
**Jun 2025 – Jul 2025, Remote**
- Built FastAPI services for an AI property management platform: REST APIs with authentication and DB integration
- Built an event-driven WhatsApp notification system for payment/booking updates, decoupled from the request path
- Shipped backend features in Agile sprints, handling request validation and API design end to end
- Designed APIs and DB queries supporting reporting, payment tracking, and operational analytics
- Collaborated with frontend developers using Next.js/React to integrate backend APIs
- Key skills used: Python, FastAPI, Next.js, PostgreSQL, AI Automation

### Machine Learning Intern — SmartBridge (Frost Solutions)
**Jun 2025 – Aug 2025, Hyderabad**
- Built ETL pipelines processing 50K+ records/run, reducing ingestion failures by 40% via schema validation
- Deployed time-series forecasting models (LSTM and Transformer-based) behind a REST API with Prometheus monitoring, holding sub-200ms p95 latency
- Improved prediction accuracy by 18% through hyperparameter tuning and model comparison (motor temperature prediction from sensor data: current, voltage, RPM, ambient temperature)
- Implemented automated hyperparameter tuning (Grid Search, Bayesian Optimization), cutting model training time from 3 hours to 45 minutes
- Automated preprocessing pipelines; used GitHub for version control and iterative ML workflow collaboration
- Key skills: Scikit-learn, Python, FastAPI, FAISS, PyTorch

---

## Projects (Detailed)

### 1. Sampark AI Platform — Multi-Agent Government Decision Intelligence
GitHub: github.com/abhishekkamble12
- Considered his **strongest AI/ML project**
- Automated end-to-end citizen complaint triage via a 7-node LangGraph pipeline: intake → validation → prediction → recommendation → workflow → notification
- Grounded every LLM recommendation in policy text via a Vertex AI Search RAG layer — citation-backed, not unverified output
- Provisioned stack as IaC with Terraform on Google Cloud: BigQuery, Firestore, Pub/Sub, GCS
- Deployed containerized services to Cloud Run for reproducible, one-command environment setup
- Added SSE-based real-time agent progress streaming with human-in-the-loop approval checkpoints
- Included pytest end-to-end test coverage and onboarding docs for team handoff

### 2. REDROB — AI Knowledge and Workflow Platform
GitHub: github.com/abhishekkamble12
- Built a GitHub Actions CI/CD pipeline: Docker images → Amazon ECR → AWS deployment on every merge
- Asynchronous LangGraph-powered RAG platform delivering citation-backed answers from enterprise knowledge bases (document-grounded semantic retrieval)
- Celery-based ingestion pipeline with PostgreSQL/pgvector: parsing, deduplication, chunking, embedding, indexing — non-blocking
- Scoped every API call to its workspace with JWT auth; tagged each request/task with a trace ID for end-to-end log tracing
- REDROB v6 (offline/CPU-only variant): candidate ranking system targeting 100,000 profiles via a 4-script pipeline (explore.py, precompute.py, rank.py, evaluate.py, orchestrated via run.sh)
  - Uses all-MiniLM-L6-v2 embeddings, FAISS IndexFlatIP, and a cross-encoder reranker
  - Focus: cutting runtime from 60+ minutes to under 3 minutes through architectural optimization

### 3. HiveMind — Event-Driven Media / Agentic Research Platform
GitHub: github.com/abhishekkamble12/hivemind
- Architected an event-driven media processing platform on AWS EventBridge and Lambda, decoupling ingestion, processing, and delivery into independently scalable stages
- Triggered each processing stage from EventBridge events — no manual hand-off between stages
- Built a FastAPI service layer over PostgreSQL/pgvector exposing processed outputs for semantic search
- Built a GitHub Actions CI/CD pipeline (Docker → ECR → AWS on every merge)
- Agentic research/content platform connecting social content generation, personalized news recommendations, and video intelligence via a shared backend and cross-module learning layer
- FastAPI REST APIs and async processing workflows with PostgreSQL/SQLAlchemy, Redis caching, JWT auth, WebSocket real-time updates, input validation, performance monitoring
- Content intelligence pipelines: LLM-driven social generation, NLP-based topic/sentiment analysis with embeddings, hybrid recommendation scoring, engagement tracking, feedback-driven prompt refinement
- Team size: 4

### 4. Arishem — AI-Powered / Multi-Tenant RAG Backend Platform
GitHub: github.com/abhishekkamble12/Arishem
- AWS-native, multi-tenant RAG platform routing queries between Amazon Bedrock and Groq Llama 3.3 70B on cost/latency tradeoffs
- Ingests PDF, DOCX, PPTX, and AWS Transcribe audio/video into citation-grounded knowledge
- Achieved 2.2s async ingestion and 1.4s median query latency on a live corpus (validated on real PDF corpus, semantic queries avg 1.4s, confidence 0.37–0.73)
- Decoupled ingestion from retrieval using RabbitMQ-driven async workers
- JWT-scoped workspace isolation (3-tier RBAC roles) and workspace-scoped Qdrant filtering
- Migrated inference from Bedrock Claude to Groq Llama 3.3 70B, reducing LLM cost ~50% and latency to 300–700ms
- Confidence-gated retrieval bypasses low-confidence LLM calls, reducing inference calls ~20%; OOD rejection threshold at confidence <0.30 (verified on test query at 0.0986)
- RAGAS evaluation: 0.923 Faithfulness, 0.885 Answer Relevancy, 0.890 Context Recall
- Data-quality/observability layer: per-query logging, sliding-window drift detection, automated admin alerts, monitoring dashboards

### 5. ATLAS — Academic Task & Learning Agent System (Voice AI)
GitHub: github.com/abhishekkamble12/ATLAS_Agent
- Intelligent workflow system for document analysis, academic task support, and information retrieval (Python, FastAPI, LangChain, LangGraph)
- Document-processing pipeline with semantic search (FAISS-backed) for contextual information access
- Voice AI features via Deepgram STT/TTS
- Integrated external APIs/services for document interaction, voice features, automated workflows
- Containerized with Docker for deployment portability

### 6. QueueFlow — Distributed Job Processing Platform
GitHub: github.com/abhishekkamble12/QueueFlow
- Distributed job-processing platform: 8+ Celery workers, Redis-backed queuing
- Benchmarked at 1,000+ task dispatches per 10-minute load test, median latency under 800ms
- JWT-secured REST APIs for job creation, retry, cancellation
- Validated state integrity under 200+ concurrent requests via Locust — zero duplicate executions using idempotency keys
- Achieved 98% task completion across 5,000 tasks in 30-minute stress tests; resolved timeout failures via exponential backoff (configurable max-3-retry policy)
- Has unit and integration tests for views and Celery tasks
- Stack: Python, Celery, Redis, PostgreSQL, Docker, Django

### 7. LLM Cost Autopilot — Intelligent LLM Routing & Cost Optimization Platform
GitHub: github.com/abhishekkamble12/LLM_Autopilot
- FastAPI-based LLM gateway dynamically routing requests across providers by prompt characteristics, model capability, estimated cost, latency
- Evaluation-driven routing pipeline benchmarking model quality, latency, token usage, cost — automated selection of cost-efficient model while preserving quality
- Reduced blended inference cost by ~35%
- Verification/escalation pipeline: detects weak generations and auto-upgrades to stronger models before returning results
- OpenTelemetry-based observability with Grafana dashboards: latency, token consumption, model usage, routing decisions, cost metrics
- Containerized (Docker) for reproducible local deployment and multi-provider evaluation

### 8. CoralGuard AI — Multimodal Marine Ecosystem Detection
GitHub: github.com/abhishekkamble12
- Multimodal deep learning system combining 41K+ environmental records and computer vision pipelines for coral anomaly detection
- Transfer learning workflows using EfficientNet-B3 with augmentation, class weighting, hyperparameter tuning for imbalanced classification
- Integrated Grad-CAM explainability and Weights & Biases experiment tracking

### 9. SupplySense — Probabilistic Demand Forecasting & Inventory Decision Engine
GitHub: github.com/abhishekkamble12/SupplySense
- End-to-end demand forecasting/inventory platform: FastAPI + LightGBM
- Produces P10/P50/P90 quantile forecasts; +34.2% lift over moving-average baseline (RMSE 2.15 units/day, MAE 1.42, R²=0.884)
- High-throughput data pipeline across 5M+ transactional records; 65% RAM reduction via 8/16-bit downcasting, datetime optimization, long-format feature stores
- Stochastic safety stock/reorder point engine reducing projected stockout Revenue-at-Risk by ~40%, maintaining 98% cycle-service-level for hero SKUs, 100% compliance with supplier MOQs/case-pack multiples
- Reproducible Docker deployment with MLflow & DagsHub experiment tracking, multi-model benchmarking (LightGBM vs Gradient Boosting vs Ridge), Champion Model Registry
- FastAPI backend serving <120ms p50 latency for real-time inventory audits and what-if simulations

### 10. GoOpsKit
GitHub: github.com/abhishekkamble12/ops_kit
- Production-style Go HTTP backend using net/http: 5 REST endpoints, structured JSON logging, OpenTelemetry distributed tracing, request validation, graceful shutdown
- Automated Linux service deployment via idempotent Ansible role: non-root systemd service, templated env files, conditional restart handlers, firewalld rules on RHEL-compatible systems
- 17 automated tests (5 success paths, 5 error-validation scenarios); verified with go vet ./...
- Team size: 1

### 11. Vehicle Insurance MLOps Pipeline
GitHub: github.com/abhishekkamble12
- End-to-end MLOps pipeline: data ingestion, preprocessing, feature engineering, model training, deployment
- Modular ML pipelines with automated validation, logging, experiment tracking, scalable model evaluation using Scikit-learn and MLflow

### 12. URL_Shortener_API
GitHub: github.com/abhishekkamble12/URL_Shorterner
- Go-based REST API: URL creation, 302 redirects, click analytics, URL listing, health-check endpoints
- Persistence layer with GORM and SQLite: unique 7-character short-code generation, URL validation, click-count tracking, DB migrations
- Dockerized with multi-stage build and persistent volumes preserving data across container restarts

### 13. Foodzgram
GitHub: github.com/abhishekkamble12/foodgram_mern
- Full-stack food content-sharing platform (React) for discovering/uploading/sharing recipes and videos
- ImageKit integration for optimized image/video uploads, transformation, compression, CDN delivery
- RESTful APIs with JWT auth and role-based access control
- Containerized with Docker

### 14. AI Customer Support Agent
- n8n + OpenAI + Airtable + Slack
- Routes WhatsApp/Telegram messages through an LLM-backed knowledge base with human handoff

### 15. Retail Customer Behavior Analytics — End-to-End Data Analytics & BI Pipeline
- Comprehensive retail analytics platform spanning the complete data lifecycle
- **Data Preparation & EDA (Python)**: Cleaning and transforming raw retail datasets using Pandas and NumPy; exploratory data analysis with Jupyter Notebooks to uncover initial patterns and data quality issues
- **Data Analysis (SQL)**: Writing complex SQL queries to extract actionable insights on customer segmentation, loyalty program effectiveness, and key purchase drivers; optimized queries for large transaction datasets
- **Visualization (Power BI)**: Designed and deployed interactive dashboards highlighting key business patterns, trends, and metrics for stakeholder decision-making
- **Reporting**: Created structured project reports and presentations communicating findings and actionable recommendations to business teams
- **Key Skills**: Power BI, Python, SQL, Data Cleaning, Data Transformation, Exploratory Data Analysis (EDA), Business Intelligence, Relational Data Modeling

### 16. Amazon Sales Performance & Revenue Analytics — Multi-Stage Data Analysis & KPI Dashboard
- End-to-end sales analytics platform combining data engineering, analysis, and business intelligence
- **End-to-End Data Analysis**: Extracted, cleaned, and analyzed complex Amazon sales datasets (including restaurant operations records) using Python (Pandas, NumPy) within Jupyter Notebooks to uncover actionable business insights
- **Business Intelligence & Visualization**: Designed and deployed interactive Power BI dashboards visualizing key performance indicators (KPIs) including revenue tracking, customer behavior patterns, and sales performance metrics; enabled data-driven decision-making at scale
- **Data Wrangling**: Engineered complex SQL queries to manipulate and transform raw sales data into optimized schemas for downstream exploratory data analysis and reporting
- **Key Metrics**: Revenue trending, customer acquisition analysis, product performance tracking, margin analysis, KPI dashboards with real-time updates
- **Key Skills**: Python, Pandas, NumPy, SQL, Power BI, Exploratory Data Analysis (EDA), Data Visualization, KPI Dashboard Development, Data Transformation

### 17. Sentiment_analysis_mlopsss — AI-Native Sentiment Intelligence Platform
GitHub: github.com/abhishekkamble12/Sentiment_analysis_mlopsss
- FastAPI/Uvicorn service with a tiered model: fast classical model (TF-IDF + LogisticRegression/LinearSVC) → DistilBERT refinement → LLM fallback (Gemma via HF Inference / Groq)
- LangChain-based SearchAgent (DuckDuckGo + RSS) and ReportAgent for search-driven analysis and JSON reports
- SQLAlchemy/Alembic + monitoring dashboard
- Eval results: LinearSVC deployed as Tier 1 (accuracy 0.9439, F1-weighted 0.9436, F1-macro 0.9379, latency ~1.66s); LogisticRegression/RidgeClassifier as standby ensemble (accuracy 0.9164/0.8982); RandomForest/SVM/MultinomialNB/XGBoost also evaluated; DistilBERT (Tier 2) metrics not yet finalized
- Subject of an IEEE-format research paper draft, targeting an external IEEE conference (specific venue TBD)

### 18. PacketInsight — Network Traffic Analysis
- Scapy/SQLAlchemy-based network traffic analysis tool
- Validated against real public PCAP traces (12,899 packets, 0 skipped): flagged port scans, DNS floods (63 queries from one host), 4.23 MB high-volume flows


---

## Open-Source Contributions
- **OpenTelemetry — opentelemetry-go-compile-instrumentation** (CNCF Project): Identified missing GenAI endpoint attributes and CI coverage gaps for database semantic conventions in the Go compile-time auto-instrumentation pipeline; implemented and merged fixes (PR #992, PR #1107) adding telemetry coverage and multi-process end-to-end tests for HTTP-to-OpenAI context propagation, working directly with CNCF maintainers
- **KubeEdge — Ianvs** (CNCF Project): Root-caused a critical `ModuleNotFoundError` and invalid configuration paths breaking the Cloud Robotics benchmark suite; submitted PR #816 fixing the underlying dependency/structural issues, restoring reliable execution of the semantic segmentation benchmark
- Contributor via Linux Foundation LFX Mentorship

---

## Technical Skills (Consolidated)

**Agentic AI & LLM Tooling:** LangGraph, LangChain, RAG, RAGAS Evaluation, Vertex AI Search, Multi-Agent Orchestration, MCP, Prompt Engineering, Confidence-Gated Generation, LLM Routing & Cost Optimization, pgvector, Qdrant, FAISS

**Voice & NLP:** Deepgram (STT/TTS), Conversational Flow Design, Semantic Search, NLP

**ML/DL:** TensorFlow, PyTorch, Scikit-learn, LightGBM, Keras, Transformers, Hugging Face, Grid Search, Bayesian Optimization, Transfer Learning, Explainable AI (Grad-CAM), Data Augmentation, Probabilistic Forecasting

**Data Science & Analytics:** Pandas, NumPy, Matplotlib, Seaborn, Plotly, Feature Engineering, Data Visualization, Exploratory Data Analysis (EDA), Data Cleaning & Transformation, Relational Data Modeling, SQL Query Optimization, Business Intelligence, KPI Dashboard Development, Power BI, Tableau

**Backend:** Python, Go, Django REST Framework, FastAPI, REST APIs, Async Python, JWT Auth, PostgreSQL, Node.js, Express.js

**Infra & Tooling:** AWS (EC2, Lambda, RDS, Bedrock), Google Cloud (BigQuery, Firestore, Pub/Sub, GCS, Cloud Run), Docker, Kubernetes, Terraform, Celery/Redis, RabbitMQ, GitHub Actions, CI/CD, OpenTelemetry, Prometheus, Grafana, Jaeger

**MLOps/Tools:** MLflow, Weights & Biases, DagsHub, Git, Linux, Jupyter Notebook

**Databases/Cloud:** PostgreSQL, MongoDB, Qdrant, FAISS, MySQL, SQLite

**Also:** JavaScript, TypeScript, C/C++, Java, SQL, React.js, Next.js, MongoDB, SQLAlchemy, Tableau, n8n

---

## Achievements
- LeetCode: 1600+ rating, 300+ problems solved — consistent Medium/Hard DSA across graphs, DP & arrays
- CodeChef: 4-Star rating
- Top 20 of 500+ global teams — WeMakeDev Global Hackathon (Meta & Cerebras sponsors); led backend architecture and system design
- Semi-Finalist — AWS AI for Bharat Hackathon; designed and built the AI-powered async backend end-to-end
- UIDAI Hackathon 2026 — designed a clustering-based anomaly detection system for identifying inconsistencies in large-scale identity datasets

## Certifications
- Oracle AI Foundations Certification (Oracle Cloud) — AI/ML basics, data-driven models, cloud AI deployment
- Introduction to Generative AI (AWS) — GANs, VAEs, transformer-based models; hands-on generative modeling with TensorFlow/PyTorch
- Introduction to Prompt Engineering with GitHub Copilot (Microsoft)
- Fundamentals of Deep Learning (NVIDIA) — neural networks, backpropagation, CNNs, model training
- AI Fluency: Framework and Foundations (Anthropic)

## Training / Bootcamps
- Fullstack Web Bootcamp — Udemy (10 May 2024 – 10 Jun 2024): MERN stack (Node.js, Express.js, React.js, JavaScript, MongoDB)
