export interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readTime: string;
  url: string;
}

export const blogsData: BlogPost[] = [
  {
    title: "Understanding Machine Learning Lifecycles: From EDA to Deployment",
    excerpt: "A structured walkthrough on structuring enterprise ML projects, avoiding common data leakage traps, and transitioning from experimental notebooks to reproducible pipelines.",
    date: "Technical Discourse",
    category: "Machine Learning",
    readTime: "6 min read",
    url: "https://alekhagujuri.blogspot.com/",
  },
  {
    title: "Feature Engineering Strategies for Imbalanced Tabular Data",
    excerpt: "Techniques for handling extreme target distributions, evaluating precision-recall tradeoffs, and engineering high-signal features from raw transaction records.",
    date: "Applied Data Science",
    category: "Feature Engineering",
    readTime: "8 min read",
    url: "https://alekhagujuri.blogspot.com/",
  },
  {
    title: "Practical Computer Vision: Fine-Tuning YOLOv5 for Custom Object Detection",
    excerpt: "Step-by-step methodologies for preparing annotated bounding-box datasets, configuring anchor priors, and monitoring mAP convergence during custom training runs.",
    date: "Deep Learning & Vision",
    category: "Computer Vision",
    readTime: "7 min read",
    url: "https://alekhagujuri.blogspot.com/",
  },
];
