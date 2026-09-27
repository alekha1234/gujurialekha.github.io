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
  subRoles: ["Data Science", "Machine Learning", "Artificial Intelligence", "Computer Vision & NLP"],
  tagline: "Transforming complex observational data into deterministic predictive systems across the machine learning lifecycle.",
  status: "Available for Data Science & Applied AI Opportunities",
  location: "Bengaluru, Karnataka, India",
  shortBio: "Welcome to my world of data exploration, where every dataset is an opportunity to uncover hidden insights and drive impactful decisions. I am a dedicated Data Scientist with a passion for turning complex data into actionable strategies and predictive models.",
  extendedBio: [
    "My journey in data science is fueled by curiosity and a relentless drive to solve challenging problems. Over the years, I have had the privilege of working on initiatives spanning industries and operational applications—from analyzing dynamic market behaviors to optimizing operational efficiencies.",
    "My expertise goes beyond building standalone models: I am deeply invested in the entire data lifecycle, from exploratory wrangling and feature engineering to deployment, performance monitoring, and decision translation.",
    "What sets my approach apart is the ability to bridge the gap between technical rigor and business outcomes. I translate complex model outputs into actionable strategies that empower stakeholders to make confident, data-driven decisions."
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
    web3FormsKey: "164da4cb-4bc2-49a7-acb5-c69b18982f18",
  },
  analytics: {
    googleAnalyticsId: "G-X9RX470F8T",
    googleTagManagerId: "GTM-56D57HGN",
  },
};
