export interface SkillCategory {
  title: string;
  code: string;
  description: string;
  skills: {
    name: string;
    level: string;
    highlight?: boolean;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Applied Machine Learning & Statistical Modeling",
    code: "ML_CORE_01",
    description: "End-to-end model development spanning supervised, unsupervised, and time-series domains.",
    skills: [
      { name: "Scikit-Learn", level: "Production", highlight: true },
      { name: "Time-Series Forecasting", level: "Production", highlight: true },
      { name: "Binary & Multiclass Classification", level: "Production", highlight: true },
      { name: "Regression & Clustering", level: "Production" },
      { name: "Anomaly Detection", level: "Advanced", highlight: true },
      { name: "Feature Engineering & Lag Features", level: "Production", highlight: true },
      { name: "Recursive Multi-Step Inference", level: "Advanced" },
      { name: "Model Evaluation & Validation", level: "Production" },
    ],
  },
  {
    title: "Simulation, Synthetic Data & Generative AI",
    code: "SIM_GENAI_02",
    description: "Synthetic load generation, grid anomaly scenarios, and LLM-based alert interpretation.",
    skills: [
      { name: "Synthetic Data Generation", level: "Production", highlight: true },
      { name: "Time-Series Simulation Engines", level: "Production", highlight: true },
      { name: "LLM-Based Alert Summarization", level: "Production", highlight: true },
      { name: "Prompt Design for Operators", level: "Advanced", highlight: true },
      { name: "Pandapower & NetworkX", level: "Advanced" },
      { name: "AI Alert Traceability", level: "Production" },
    ],
  },
  {
    title: "Services, APIs & Microservices",
    code: "SERV_API_03",
    description: "Production inference serving, schema validation, and inter-service telemetry.",
    skills: [
      { name: "FastAPI", level: "Production", highlight: true },
      { name: "REST API Design", level: "Production", highlight: true },
      { name: "Pydantic Request Models", level: "Production", highlight: true },
      { name: "Flask", level: "Production" },
      { name: "Microservice Integration", level: "Production", highlight: true },
      { name: "ICCC Command Center APIs", level: "Production" },
    ],
  },
  {
    title: "ML Engineering, MLOps & Quality Gates",
    code: "MLOPS_REL_04",
    description: "Centralized model versioning, automated testing gates, and single-click CI/CD.",
    skills: [
      { name: "Model Registry & Nexus", level: "Production", highlight: true },
      { name: "CI/CD Pipelines", level: "Production", highlight: true },
      { name: "Automated Test Execution", level: "Production", highlight: true },
      { name: "Code Coverage Quality Gates", level: "Production", highlight: true },
      { name: "MLflow & Model Tracking", level: "Advanced" },
      { name: "Evidently AI (Drift)", level: "Advanced" },
      { name: "Single-Click Model Deployment", level: "Production" },
    ],
  },
  {
    title: "Programming, Big Data & Storage",
    code: "DATA_STORE_05",
    description: "High-throughput data transformations, serialization formats, and graph/relational databases.",
    skills: [
      { name: "Python", level: "Core / Advanced", highlight: true },
      { name: "Pandas & NumPy", level: "Production", highlight: true },
      { name: "PySpark & Delta Lake", level: "Proficient", highlight: true },
      { name: "Parquet & JSON Streaming", level: "Production", highlight: true },
      { name: "Neo4j (Graph DB)", level: "Proficient" },
      { name: "MySQL / Relational SQL", level: "Proficient" },
      { name: "Git & Linux Workflows", level: "Advanced" },
    ],
  },
];
