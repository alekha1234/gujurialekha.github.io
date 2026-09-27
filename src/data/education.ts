export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  field?: string;
  details?: string;
}

export interface CertificationItem {
  title: string;
  issuer: string;
  date: string;
  accreditationBody?: string;
  badge?: string;
}

export const educationData: EducationItem[] = [
  {
    degree: "Bachelor of Science (Physics Honours)",
    institution: "Science Degree College",
    location: "Kukudakhandi, Odisha",
    period: "2018 — 2021",
    field: "Physics & Mathematical Sciences",
    details: "Rigorous quantitative foundation in physical modeling, mathematical formulation, differential equations, and computational problem solving.",
  },
  {
    degree: "Higher Secondary (PCM IT)",
    institution: "Science College",
    location: "Kukudakhandi, Odisha",
    period: "2016 — 2018",
    field: "Physics, Chemistry, Mathematics & Information Technology",
    details: "Foundational coursework in computer science fundamentals, calculus, matrix algebra, and algorithmic principles.",
  },
  {
    degree: "High School (General)",
    institution: "Govt. High School",
    location: "Kukudakhandi, Odisha",
    period: "2015 — 2016",
    field: "General Secondary Curriculum",
  },
];

export const certificationsData: CertificationItem[] = [
  {
    title: "Certified Data Scientist",
    issuer: "International Association of Business Analytics (IABAC)",
    date: "September 2023",
    accreditationBody: "Global Professional Standard",
  },
  {
    title: "Certified Data Scientist",
    issuer: "NASSCOM & FutureSkills Prime",
    date: "September 2023",
    accreditationBody: "Ministry of Electronics and IT (MeitY), Govt. of India",
  },
  {
    title: "Data Science Foundation",
    issuer: "International Association of Business Analytics (IABAC)",
    date: "September 2023",
    accreditationBody: "Global Analytics Certification",
  },
  {
    title: "Data Science Immersive Certification",
    issuer: "DataMites™",
    date: "January 2023 — May 2023",
    accreditationBody: "DataMites Global Training",
  },
  {
    title: "Python for Beginners",
    issuer: "SkillUp by Simplilearn",
    date: "January 2023",
    accreditationBody: "Simplilearn Learning Hub",
  },
];
