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
    period: "May 2024 — Present",
    startDate: "2024-05",
    endDate: "present",
    isCurrent: true,
    location: "Bengaluru, Karnataka, India",
    domain: "Smart Mobility & Urban Operations",
    summary: "Spearheading advanced data analysis initiatives and predictive modeling systems to optimize municipal operational workflows and smart mobility analytics.",
    highlights: [
      "Working on advanced data analysis initiatives to extract operational intelligence from large-scale smart mobility datasets.",
      "Enhancing operational efficiency through the design, evaluation, and calibration of predictive machine learning models.",
      "Managing robust data engineering pipelines ensuring reliable, clean, and high-quality data availability for operational dashboards and downstream analytics."
    ],
    technologies: ["Python", "Machine Learning", "Predictive Modeling", "Data Engineering", "Time-Series", "SQL", "Feature Engineering"],
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
    period: "January 2023 — February 2024",
    startDate: "2023-01",
    endDate: "2024-02",
    isCurrent: false,
    location: "Bengaluru, Karnataka, India",
    domain: "Enterprise AI & Predictive Solutions",
    summary: "Led client-facing data science engagements from initial problem formulation through data engineering, model development, and operational deployment.",
    highlights: [
      "Led advanced data analysis initiatives to derive actionable insights and quantitative decision support for external clients.",
      "Developed and deployed predictive models that enhanced operational efficiency, conversion rates, and executive decision-making.",
      "Managed end-to-end data engineering processes including automated cleaning, validation, transformation, and feature store preparation.",
      "Collaborated with cross-functional engineering teams, guiding engagements through all phases from problem scoping to deployment.",
      "Provided strategic business recommendations based on statistical and analytical findings to accelerate client objectives."
    ],
    technologies: ["Python", "Scikit-Learn", "TensorFlow", "FastAPI", "Pandas", "NumPy", "MySQL", "Data Pipelines"],
    links: {
      website: "https://rubixe.com/",
      linkedin: "https://in.linkedin.com/company/rubixe",
      locationMap: "https://www.google.com/maps?q=House,+7th+Mile,+C,+Bajrang,+25,+Bengaluru+-+Chennai+Hwy,+Kudlu+Gate,+Krishna+Reddy+Industrial+Area,+Hosapalaya,+Garvebhavi+Palya,+Bengaluru,+Karnataka+560068",
    },
  },
];
