interface SkillCategory {
  title: string;
  code: string;
  description: string;
  skills: {
    name: string;
    highlight?: boolean;
  }[];
}

export const skillsData: SkillCategory[] = [
  {
    title: "Applied Machine Learning & Statistical Modeling",
    code: "ML_CORE_01",
    description: "End-to-end model development spanning supervised, unsupervised, and time-series domains.",
    skills: [
      { name: "Scikit-Learn", highlight: true },
      { name: "Time-Series Forecasting", highlight: true },
      { name: "Binary & Multiclass Classification", highlight: true },
      { name: "Regression & Clustering" },
      { name: "Anomaly Detection", highlight: true },
      { name: "Feature Engineering & Lag Features", highlight: true },
      { name: "Recursive Multi-Step Inference" },
      { name: "Model Evaluation & Validation" },
    ],
  },
  {
    title: "Simulation, Synthetic Data & Generative AI",
    code: "SIM_GENAI_02",
    description: "Synthetic load generation, grid anomaly scenarios, and LLM-based alert interpretation.",
    skills: [
      { name: "Synthetic Data Generation", highlight: true },
      { name: "Time-Series Simulation Engines", highlight: true },
      { name: "LLM-Based Alert Summarization", highlight: true },
      { name: "Prompt Design for Operators", highlight: true },
      { name: "Pandapower & NetworkX" },
      { name: "AI Alert Traceability" },
    ],
  },
  {
    title: "Services, APIs & Microservices",
    code: "SERV_API_03",
    description: "Production inference serving, schema validation, and inter-service telemetry.",
    skills: [
      { name: "FastAPI", highlight: true },
      { name: "REST API Design", highlight: true },
      { name: "Pydantic Request Models", highlight: true },
      { name: "Flask" },
      { name: "Microservice Integration", highlight: true },
      { name: "ICCC Command Center APIs" },
    ],
  },
  {
    title: "ML Engineering, MLOps & Quality Gates",
    code: "MLOPS_REL_04",
    description: "Centralized model versioning, automated testing gates, and single-click CI/CD.",
    skills: [
      { name: "Model Registry & Nexus", highlight: true },
      { name: "CI/CD Pipelines", highlight: true },
      { name: "Automated Test Execution", highlight: true },
      { name: "Code Coverage Quality Gates", highlight: true },
      { name: "MLflow & Model Tracking" },
      { name: "Evidently AI (Drift)" },
      { name: "Single-Click Model Deployment" },
    ],
  },
  {
    title: "Programming, Big Data & Storage",
    code: "DATA_STORE_05",
    description: "High-throughput data transformations, serialization formats, and graph/relational databases.",
    skills: [
      { name: "Python", highlight: true },
      { name: "Pandas & NumPy", highlight: true },
      { name: "PySpark & Delta Lake", highlight: true },
      { name: "Parquet & JSON Streaming", highlight: true },
      { name: "Neo4j (Graph DB)" },
      { name: "MySQL / Relational SQL" },
      { name: "Git & Linux Workflows" },
    ],
  },
];
