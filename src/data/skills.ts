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
    title: "Machine Learning & Statistical Modeling",
    code: "ML_STAT_01",
    description: "Predictive model development, supervised classification, regression, and algorithm benchmarking.",
    skills: [
      { name: "Scikit-Learn", level: "Production", highlight: true },
      { name: "XGBoost & LightGBM", level: "Advanced", highlight: true },
      { name: "Random Forests & Decision Trees", level: "Advanced" },
      { name: "Support Vector Machines (SVM)", level: "Proficient" },
      { name: "Logistic & Linear Regression", level: "Advanced" },
      { name: "Ensemble Techniques", level: "Advanced" },
      { name: "Hyperparameter Optimization", level: "Proficient" },
    ],
  },
  {
    title: "Deep Learning & Computer Vision",
    code: "DL_CV_02",
    description: "Neural network architectures, transfer learning, and real-time visual object detection.",
    skills: [
      { name: "TensorFlow", level: "Production", highlight: true },
      { name: "Keras", level: "Production", highlight: true },
      { name: "Convolutional Neural Networks (CNN)", level: "Advanced", highlight: true },
      { name: "YOLOv5 (Object Detection)", level: "Advanced", highlight: true },
      { name: "ResNet50 & Transfer Learning", level: "Proficient" },
      { name: "OpenCV (Image Processing)", level: "Proficient" },
      { name: "Data Augmentation", level: "Advanced" },
    ],
  },
  {
    title: "Natural Language Processing (NLP)",
    code: "NLP_TXT_03",
    description: "Unstructured text preprocessing, semantic vectorization, and sentiment classification.",
    skills: [
      { name: "NLTK", level: "Advanced", highlight: true },
      { name: "TF-IDF & N-gram Vectorization", level: "Advanced" },
      { name: "Text Preprocessing & Tokenization", level: "Advanced" },
      { name: "Sentiment Analysis", level: "Proficient", highlight: true },
      { name: "Topic Classification", level: "Proficient" },
      { name: "Lemmatization & Regex Cleaning", level: "Advanced" },
    ],
  },
  {
    title: "Data Engineering, Analysis & Storage",
    code: "DE_DATA_04",
    description: "Data wrangling, feature engineering, exploratory data analysis, and database querying.",
    skills: [
      { name: "Python", level: "Core / Advanced", highlight: true },
      { name: "Pandas", level: "Production", highlight: true },
      { name: "NumPy", level: "Production", highlight: true },
      { name: "MySQL (Relational)", level: "Proficient", highlight: true },
      { name: "MongoDB (Document NoSQL)", level: "Proficient" },
      { name: "Feature Engineering & Imputation", level: "Advanced" },
      { name: "Class Imbalance Mitigation (SMOTE)", level: "Advanced" },
    ],
  },
  {
    title: "Visualization & Serving Infrastructure",
    code: "VIS_OPS_05",
    description: "Data storytelling, interactive visualization, API serving, and developer tooling.",
    skills: [
      { name: "Matplotlib & Seaborn", level: "Advanced", highlight: true },
      { name: "FastAPI", level: "Proficient", highlight: true },
      { name: "Flask", level: "Proficient" },
      { name: "Git & GitHub", level: "Proficient", highlight: true },
      { name: "Jupyter Lab / Notebook", level: "Advanced" },
      { name: "VS Code", level: "Advanced" },
      { name: "Model Serialization (Pickle/Joblib)", level: "Proficient" },
    ],
  },
];
