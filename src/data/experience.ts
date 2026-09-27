export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  location: string;
  domain: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  links: {
    website?: string;
    linkedin?: string;
    locationMap?: string;
  };
}

export const experienceData: ExperienceItem[] = [
  {
    id: "trinity-mobility",
    company: "Trinity Mobility",
    role: "Associate Data Scientist",
    period: "2024 — Present (2 years 5 months)",
    startDate: "2024-05",
    endDate: "present",
    isCurrent: true,
    location: "Bengaluru, Karnataka, India",
    domain: "Smart City IoT, Simulation & Applied ML",
    summary: "Joined in an internship capacity and transitioned into the full-time Associate Data Scientist role. Responsible for carrying machine learning systems from domain problem statements through to production delivery across municipal smart-city platforms.",
    highlights: [
      "Smart Irrigation 3-Stage ML Pipeline: Designed a chained three-stage model pipeline (soil & weather forecasting → irrigation ON/OFF decision classification → duration prediction regression), returning complete automated operational decisions via FastAPI microservices.",
      "Smart Energy Simulation Engine: Built simulation engines and ML-ready synthetic datasets for energy demand forecasting, grid anomaly scenarios, and dashboard visualizations using Parquet/JSON workflows across 15-min, hourly, and daily resolutions.",
      "ICCC Integration & GenAI Summarization: Integrated Smart Irrigation & Smart Energy ML outputs into the Integrated Command and Control Center (ICCC), implementing concise LLM-based alert summaries so operators read plain-language explanations instead of raw model outputs.",
      "ML Composer Quality Gate: Enabled automated test execution and code coverage enforcement in the ML Composer Flask-service quality gate, establishing build-time quality validation.",
      "Model Registry & Nexus CI/CD: Designed a Model Registry and Nexus integration workflow for centralized model versioning and deployment consistency, creating a reusable pretrained-model CI/CD module with single-click deployment.",
      "Cross-Functional Delivery & Mentorship: Clarified requirements with PMs and engineering teams, resolved cross-team dependencies, conducted root-cause analysis on production issues, and mentored junior team members on implementation and debugging."
    ],
    technologies: [
      "Python",
      "FastAPI",
      "Flask",
      "Scikit-Learn",
      "PySpark",
      "Delta Lake",
      "Parquet",
      "JSON",
      "Neo4j",
      "MLflow",
      "Evidently AI",
      "Nexus",
      "MLOps & CI/CD",
      "Time-Series Forecasting",
      "Generative AI Summarization"
    ],
    links: {
      website: "https://www.trinitymobility.com/",
      linkedin: "https://in.linkedin.com/company/trinity-mobility",
      locationMap: "https://www.google.com/maps?q=No.+25,+4th+Floor,+Corniche+Al+Latheef,+Cunningham+Rd,+Shivaji+Nagar,+Bengaluru,+Karnataka+560052",
    },
  },
  {
    id: "rubixe",
    company: "Rubixe",
    role: "Data Science Consultant",
    period: "January 2023 — January 2024 (1 year 1 month)",
    startDate: "2023-01",
    endDate: "2024-01",
    isCurrent: false,
    location: "Bengaluru, Karnataka, India",
    domain: "Enterprise Predictive AI & Analytics",
    summary: "Conducted advanced data analysis, developed predictive machine learning models, and managed end-to-end data engineering pipelines to extract actionable decision intelligence for enterprise clients.",
    highlights: [
      "Led client-facing predictive modeling initiatives from initial problem formulation through data preparation to model deployment.",
      "Engineered data pipelines ensuring clean, reliable, and high-quality data availability for operational models and executive dashboards.",
      "Collaborated with cross-functional engineering teams to validate model behavior and integrate predictive APIs.",
      "Formulated strategic business recommendations grounded in empirical data analysis and statistical validation."
    ],
    technologies: ["Python", "Scikit-Learn", "FastAPI", "Pandas", "NumPy", "MySQL", "Data Pipelines", "Statistical Modeling"],
    links: {
      website: "https://rubixe.com/",
      linkedin: "https://in.linkedin.com/company/rubixe",
      locationMap: "https://www.google.com/maps?q=House,+7th+Mile,+C,+Bajrang,+25,+Bengaluru+-+Chennai+Hwy,+Kudlu+Gate,+Krishna+Reddy+Industrial+Area,+Hosapalaya,+Garvebhavi+Palya,+Bengaluru,+Karnataka+560068",
    },
  },
];
