export interface SocialLink {
  label: string;
  url: string;
  iconName: 'github' | 'linkedin' | 'kaggle' | 'twitter' | 'mail' | 'blog' | 'file-text';
  display: string;
}

export interface PersonalData {
  name: string;
  formalName: string;
  role: string;
  subRoles: string[];
  tagline: string;
  status: string;
  location: string;
  phone: string;
  shortBio: string;
  extendedBio: string[];
  resume: {
    viewUrl: string;
    downloadUrl: string;
    localPdf: string;
  };
  socials: SocialLink[];
  contact: {
    email: string;
    phone: string;
    web3FormsKey: string;
  };
  analytics: {
    googleAnalyticsId: string;
    googleTagManagerId: string;
  };
}

export const personalData: PersonalData = {
  name: "Alekha Gujuri",
  formalName: "Gujuri Alekha",
  role: "Associate Data Scientist",
  subRoles: [
    "Applied Machine Learning",
    "ML Engineering & MLOps",
    "Time Series & Simulation",
    "Synthetic Data & Generative AI",
    "FastAPI & Microservices"
  ],
  tagline: "Carrying machine learning from initial problem statements through to resilient production delivery for Smart City, IoT, and enterprise systems.",
  status: "Available for Applied AI, ML Engineering & Data Science Roles",
  location: "Bengaluru, Karnataka, India",
  phone: "+91 9348673473",
  shortBio: "Applied Data Scientist with 2.5 years of experience carrying machine learning work from raw problem statements through to production. Specializing in time-series forecasting, multi-stage decision pipelines, synthetic data simulation, and MLOps tooling that bridges data science with robust software delivery.",
  extendedBio: [
    "At Trinity Mobility, my work centers on applied machine learning for smart-city systems: designing three-stage automated irrigation pipelines, building smart energy grid simulation engines, integrating ML outputs with Integrated Command and Control Centers (ICCC), and deploying LLM-based alert summarization for operator traceability.",
    "Beyond standalone modeling, I engineer the platform tooling that makes models reliable and maintainable: connecting Model Registries with Nexus, building single-click CI/CD deployment modules, and enforcing automated test quality gates with code coverage in Flask/FastAPI microservices.",
    "Grounding my engineering practice is a strong quantitative foundation: currently completing an MCA specializing in Machine Learning & Artificial Intelligence from Lovely Professional University, preceded by a Bachelor of Science (Physics Honours) from Science Degree College (CGPA 7.7/10)."
  ],
  resume: {
    viewUrl: "https://drive.google.com/file/d/1apVed_aNN6iK8IVO1ZetFuw0buB5T4OI/view?usp=sharing",
    downloadUrl: "https://drive.google.com/uc?export=download&id=1apVed_aNN6iK8IVO1ZetFuw0buB5T4OI",
    localPdf: "/documents/logos/Gujuri-Alekha-Resume.pdf",
  },
  socials: [
    {
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/gujuri-alekha/",
      iconName: "linkedin",
      display: "in/gujuri-alekha",
    },
    {
      label: "GitHub",
      url: "https://github.com/alekha1234",
      iconName: "github",
      display: "github.com/alekha1234",
    },
    {
      label: "Kaggle",
      url: "https://www.kaggle.com/gujurialekha",
      iconName: "kaggle",
      display: "kaggle.com/gujurialekha",
    },
    {
      label: "Twitter/X",
      url: "https://x.com/Alekha81293434?t=tmjtkIs0vGF3vPGIFACtdw&s=09",
      iconName: "twitter",
      display: "@Alekha81293434",
    },
    {
      label: "Technical Blog",
      url: "https://alekhagujuri.blogspot.com/",
      iconName: "blog",
      display: "alekhagujuri.blogspot.com",
    },
  ],
  contact: {
    email: "gujurialekha@gmail.com",
    phone: "+91 9348673473",
    web3FormsKey: "164da4cb-4bc2-49a7-acb5-c69b18982f18",
  },
  analytics: {
    googleAnalyticsId: "G-X9RX470F8T",
    googleTagManagerId: "GTM-56D57HGN",
  },
};
