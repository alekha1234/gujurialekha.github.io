export interface EducationItem {
  degree: string;
  institution: string;
  location?: string;
  period: string;
  field?: string;
  details?: string;
  grade?: string;
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
    degree: "Master of Computer Applications (MCA)",
    institution: "Lovely Professional University",
    location: "Punjab, India",
    period: "Feb 2025 — Feb 2027 (In Progress)",
    field: "Specialization in Machine Learning & Artificial Intelligence",
    details: "Advanced graduate coursework focusing on deep neural architectures, enterprise machine learning systems, distributed computing, and generative AI.",
  },
  {
    degree: "Bachelor of Science (B.Sc.), Physics",
    institution: "Science Degree College",
    location: "Kukudakhandi, Odisha",
    period: "Aug 2018 — Sep 2021",
    grade: "CGPA: 7.7 / 10",
    field: "Physics Honours & Applied Mathematics",
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
    title: "Data Science Immersive Certification",
    issuer: "DataMites™",
    date: "January 2023 — May 2023",
    accreditationBody: "DataMites Bangalore Global Training",
  },
];
