// Views over src/data shared by the HTML sections and the 3D scene. No new facts live here:
// every string is either copied from src/data or is a label for a stage in a diagram.
import { experienceData } from '@/data/experience';
import { educationData, certificationsData } from '@/data/education';

interface Capability {
  id: string;
  short: string;
  title: string;
  evidence: string;
  source: string;
}

export const capabilities: Capability[] = [
  {
    id: 'ai',
    short: 'AI',
    title: 'Artificial Intelligence',
    evidence: 'Agentic AI workflows orchestrating multi-step reasoning across forecasting and decision stages.',
    source: 'Trinity Mobility',
  },
  {
    id: 'ml',
    short: 'ML',
    title: 'Machine Learning',
    evidence: 'Chained 3-stage pipeline: soil & weather forecasting, irrigation ON/OFF classification, duration regression.',
    source: 'Smart Irrigation',
  },
  {
    id: 'dl',
    short: 'DL',
    title: 'Deep Learning',
    evidence: 'Custom CNN for jellyfish species, CIFAR-10 recognition engine, ResNet50 transfer learning.',
    source: 'Vision projects',
  },
  {
    id: 'nlp',
    short: 'NLP',
    title: 'Natural Language Processing',
    evidence: 'Reusable text suite covering tokenization, lemmatization, TF-IDF vectorization and sentiment classification.',
    source: 'NLP Suite',
  },
  {
    id: 'genai',
    short: 'GEN AI',
    title: 'Generative AI',
    evidence: 'RAG pipelines and LLM-based alert summaries so ICCC operators read grounded, plain-language explanations.',
    source: 'Trinity Mobility',
  },
  {
    id: 'cv',
    short: 'CV',
    title: 'Computer Vision',
    evidence: 'Custom-trained YOLOv5 detecting face mask compliance in high-density public environments.',
    source: 'Face Mask Detection',
  },
];

type MilestoneKind = 'work' | 'education' | 'cert';

interface Milestone {
  id: string;
  kind: MilestoneKind;
  title: string;
  org: string;
  period: string;
  sortKey: string;
  summary?: string;
  highlights: string[];
  technologies: string[];
  location?: string;
  link?: string;
}

const eduStart: Record<string, string> = {
  'Master of Computer Applications (MCA)': '2025-02',
  'Bachelor of Science (B.Sc.), Physics': '2018-08',
  'Higher Secondary (PCM IT)': '2016-06',
};
const certStart: Record<string, string> = {
  'DataMites™': '2023-01',
};

export const milestones: Milestone[] = [
  ...experienceData.map<Milestone>((e) => ({
    id: e.id,
    kind: 'work',
    title: e.role,
    org: e.company,
    period: e.period,
    sortKey: e.startDate,
    summary: e.summary,
    highlights: e.highlights,
    technologies: e.technologies,
    location: e.location,
    link: e.links.website,
  })),
  ...educationData.map<Milestone>((e, i) => ({
    id: `edu-${i}`,
    kind: 'education',
    title: e.degree,
    org: e.institution,
    period: e.period,
    sortKey: eduStart[e.degree] ?? '2000-01',
    summary: e.details,
    highlights: [e.field, e.grade].filter(Boolean) as string[],
    technologies: [],
    location: e.location,
  })),
  ...certificationsData.map<Milestone>((c, i) => ({
    id: `cert-${i}`,
    kind: 'cert',
    title: c.title,
    org: c.issuer,
    period: c.date,
    sortKey: certStart[c.issuer] ?? '2023-09',
    highlights: c.accreditationBody ? [c.accreditationBody] : [],
    technologies: [],
  })),
].sort((a, b) => a.sortKey.localeCompare(b.sortKey));

// Stage labels for the AI Lab diagrams (rendered both as HTML and in 3D).
export const pipelines = {
  ml: ['DATA', 'PREPROCESSING', 'FEATURES', 'MODEL', 'TRAINING', 'INFERENCE', 'PREDICTION'],
  nlp: ['TOKENIZATION', 'EMBEDDINGS', 'ATTENTION', 'SEMANTIC ANALYSIS', 'LANGUAGE MODEL', 'OUTPUT'],
  rag: ['USER QUERY', 'EMBEDDING', 'VECTOR SEARCH', 'RETRIEVAL', 'CONTEXT', 'LLM', 'RESPONSE'],
  cv: ['IMAGE', 'PIXELS', 'FEATURE EXTRACTION', 'VISION MODEL', 'CLASSIFICATION / DETECTION'],
};
