export interface CaseStudy {
  problem: string;
  data: string;
  approach: string;
  model: string;
  evaluation: string;
  results: string;
  impact: string;
}

export interface MetricItem {
  label: string;
  value: string;
  description?: string;
}

export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: string;
  subtitle: string;
  summary: string;
  image: string;
  technologies: string[];
  metrics: MetricItem[];
  githubUrl: string;
  liveUrl?: string;
  isFeatured: boolean;
  caseStudy?: CaseStudy;
  highlights: string[];
}

export const featuredProjects: ProjectItem[] = [
  {
    id: "smart-irrigation-pipeline",
    slug: "smart-irrigation-pipeline",
    title: "Smart Irrigation: 3-Stage ML Pipeline & ICCC Integration",
    category: "Smart City IoT & Time-Series",
    subtitle: "Chained Forecasting, Decisioning & Duration Microservices",
    summary: "Sequential 3-stage predictive pipeline forecasting environmental conditions, classifying irrigation necessity, and regressing duration—exposed via FastAPI with AI-generated alert summaries for city command center operators.",
    image: "/documents/projects/machine-learning.jpeg",
    technologies: ["Python", "FastAPI", "Scikit-Learn", "Pandas", "NumPy", "PySpark", "Delta Lake", "Pydantic"],
    metrics: [
      { label: "Pipeline Stages", value: "3 Chained", description: "Forecast → Decision → Duration" },
      { label: "Integration", value: "ICCC Platform", description: "City Command Center alerts" },
      { label: "AI Feature", value: "LLM Summaries", description: "Operator-facing plain English" },
    ],
    githubUrl: "https://github.com/alekha1234",
    isFeatured: true,
    highlights: [
      "Engineered sequential 3-stage architecture where each stage feeds the next, returning a complete operational command.",
      "Integrated trained models into FastAPI microservices with Pydantic request models and automated validation.",
      "Published irrigation alerts with short AI-generated summaries to the ICCC platform for operators.",
    ],
    caseStudy: {
      problem: "Municipal smart city irrigation systems suffered from disjointed manual controls, risking water waste, over-saturation, and high electricity bills due to lack of automated end-to-end decision-making.",
      data: "Multi-parameter sensor telemetry including historical soil moisture, ambient temperature, humidity, solar radiation, forecasted precipitation, and municipal zone schedules.",
      approach: "Formulated a 3-stage chained workflow: Stage 1 forecasts soil moisture & meteorological parameters; Stage 2 evaluates threshold triggers to classify whether irrigation is required (ON/OFF); Stage 3 regresses the precise watering duration in minutes.",
      model: "Time-series forecasting models combined with Gradient Boosted Classifiers and duration regressors, orchestrated as an integrated pipeline.",
      evaluation: "Benchmarked end-to-end latency, stage-to-stage error propagation, classification precision for valve activation, and duration calibration.",
      results: "Replaced disconnected manual checks with a single atomic API call returning an actionable irrigation command, complete with predictive confidence metrics.",
      impact: "Integrated directly with the municipal Integrated Command and Control Center (ICCC), delivering automated alerts and plain-language AI summaries to city operators."
    }
  },
  {
    id: "ml-composer-platform",
    slug: "ml-composer-platform",
    title: "ML Composer: Enterprise No-Code Machine Learning Platform",
    category: "ML Engineering & MLOps",
    subtitle: "Automated Ingestion, Model Validation & Nexus Registry CI/CD",
    summary: "Enterprise platform enabling non-ML specialists to ingest data from SQL/APIs, clean, train regression/classification/clustering models, enforce automated quality gates, and deploy via a Nexus Model Registry.",
    image: "/documents/projects/end-to-end-ml.jpeg",
    technologies: ["Python", "Flask", "FastAPI", "Scikit-Learn", "PySpark", "MLflow", "Evidently AI", "Nexus", "CI/CD"],
    metrics: [
      { label: "Deployment", value: "Single-Click", description: "Nexus CI/CD deployment path" },
      { label: "Quality Gate", value: "Automated", description: "Code coverage & test suites" },
      { label: "Algorithms", value: "Multi-Model", description: "Regression, Classif., Clustering" },
    ],
    githubUrl: "https://github.com/alekha1234/End-to-End-Machine-Learning-Project",
    isFeatured: true,
    highlights: [
      "Designed Model Registry and Nexus integration workflow for centralized model storage, versioning, and reuse.",
      "Built a reusable pretrained-model CI/CD module with single-click deployment, eliminating manual setup overhead.",
      "Enabled end-to-end automated testing and code coverage within the Flask-service quality gate.",
    ],
    caseStudy: {
      problem: "Domain and engineering teams faced severe bottlenecks deploying ML models: lack of automated testing, scattered model versions, and slow, repetitive manual configuration for every release.",
      data: "Ingestion pipelines connecting relational databases (SQL), big data streams (PySpark), REST APIs, and multi-format local files (CSV, Parquet, JSON).",
      approach: "Constructed a visual data preparation workflow with automated feature engineering, linked to an MLOps pipeline with automated validation, drift monitoring, and strict quality gates.",
      model: "Modular algorithm library supporting regression, classification, and clustering with automated hyperparameter search and model evaluation.",
      evaluation: "Integrated MLflow tracking, Evidently AI data-drift detection, and automated test execution with code coverage gates on every build.",
      results: "Unified model storage in a Nexus-backed Model Registry and introduced a single-click CI/CD deployment workflow that eliminated repeated manual setups.",
      impact: "Standardized model governance across smart city engineering teams, ensuring consistency and preventing flawed models from reaching production."
    }
  },
  {
    id: "smart-energy-grid-simulation",
    slug: "smart-energy-grid-simulation",
    title: "Smart Energy Grid Simulation Engine & Synthetic Telemetry",
    category: "Simulation & Synthetic Data",
    subtitle: "High-Resolution Demand Analysis & Anomaly Detection Telemetry",
    summary: "Physics-informed simulation engine and synthetic dataset generator modeling distribution grid loads, peak demands, and electrical anomalies across 15-minute, hourly, and daily resolutions for ICCC dashboards.",
    image: "/documents/projects/total-sales.jpeg",
    technologies: ["Python", "Pandapower", "NetworkX", "NumPy", "Parquet", "JSON", "Time-Series", "ICCC Telemetry"],
    metrics: [
      { label: "Time Granularity", value: "15m / 1h / 1d", description: "Multi-resolution simulation" },
      { label: "Data Pipeline", value: "Parquet/JSON", description: "High-throughput streaming" },
      { label: "Target Domain", value: "Grid Anomalies", description: "Proactive overload detection" },
    ],
    githubUrl: "https://github.com/alekha1234",
    isFeatured: true,
    highlights: [
      "Engineered simulation engines generating ML-ready synthetic datasets for energy-demand analysis and grid fault scenarios.",
      "Processed high-throughput time-series outputs across 15-minute, hourly, and daily resolutions via Parquet/JSON.",
      "Integrated anomaly triggers with ICCC command center dashboards with plain-language alert explanations.",
    ],
    caseStudy: {
      problem: "Real-world electrical grid anomaly and peak demand datasets are strictly confidential and rare, impeding the training and validation of smart-city demand response and fault detection algorithms.",
      data: "Simulated electrical network topology, load profiles, transformer demand curves, and synthetic anomaly injection points.",
      approach: "Built physics-informed synthetic generation pipelines modeling consumption fluctuations, peak surge events, and voltage fluctuations across 15-min, hourly, and daily intervals.",
      model: "Synthetic simulation engines coupled with time-series anomaly detection algorithms and statistical thresholding.",
      evaluation: "Benchmarked distribution validity against empirical smart meter profiles and verified streaming latency into operator dashboards.",
      results: "Delivered scalable Parquet/JSON simulation pipelines powering command center visualizations, proactive threshold alarms, and anomaly diagnostics.",
      impact: "Empowered municipal operators to simulate grid stress scenarios proactively and validate grid resilience strategies without live network risk."
    }
  },
  {
    id: "real-time-face-mask-detection",
    slug: "real-time-face-mask-detection",
    title: "Real-Time Face Mask Compliance Detection",
    category: "Computer Vision & Edge AI",
    subtitle: "High-Throughput Object Localization with YOLOv5 Architecture",
    summary: "Automated real-time computer vision system built on custom-trained YOLOv5 to detect face mask compliance in high-density public environments.",
    image: "/documents/projects/face-mask.jpeg",
    technologies: ["YOLOv5", "PyTorch", "Python", "OpenCV", "Matplotlib", "Computer Vision"],
    metrics: [
      { label: "Model Family", value: "YOLOv5", description: "Single-stage detector" },
      { label: "Classes", value: "3 Classes", description: "Masked / Unmasked / Incorrect" },
      { label: "Throughput", value: "Real-Time", description: "Edge video stream capable" },
    ],
    githubUrl: "https://github.com/alekha1234/Face-Mask-Detection-Using-YoloV5-Model/blob/main/Yolov5_Face_mask_detection.ipynb",
    isFeatured: true,
    highlights: [
      "Trained custom YOLOv5 weights with mosaic augmentations and anchor box tuning.",
      "Handles partial facial occlusions, varied angles, and diverse illumination levels.",
      "Structured for edge CCTV camera deployment and live video stream inference.",
    ],
    caseStudy: {
      problem: "Manual verification of public health compliance in crowded facilities is non-scalable, labor-intensive, and prone to human inspection fatigue.",
      data: "Annotated multi-class image dataset with precise bounding box coordinates categorized into three states: masked, unmasked, and incorrectly worn masks.",
      approach: "Engineered robust preprocessing pipeline leveraging mosaic augmentation, color jittering, spatial scaling, and normalized bounding box coordinate conversions.",
      model: "Fine-tuned YOLOv5 architecture featuring CSPDarknet53 backbone and Path Aggregation Network (PANet) neck for multi-scale feature localization.",
      evaluation: "Validated against mean Average Precision (mAP@0.5 and mAP@0.5:0.95), inference latency (milliseconds per frame), and precision-recall trade-offs.",
      results: "Demonstrated accurate multi-target localization in high-density frames with minimal latency, distinguishing subtle mask placement variations.",
      impact: "Enables contactless, automated compliance telemetry across transit hubs and commercial facilities without requiring on-site personnel."
    }
  },
  {
    id: "portuguese-bank-marketing",
    slug: "portuguese-bank-marketing",
    title: "Portuguese Bank Direct Marketing Optimization",
    category: "Predictive Analytics & FinTech",
    subtitle: "Customer Lead Scoring & Campaign ROI Maximization",
    summary: "Predictive customer conversion modeling on 45,000+ interactions to maximize term deposit subscriptions while reducing cold-calling operational overhead.",
    image: "/documents/projects/bank-marketing.jpeg",
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    metrics: [
      { label: "Data Scale", value: "45,211", description: "Customer interactions analyzed" },
      { label: "Feature Space", value: "17", description: "Demographic & economic variables" },
      { label: "Lead Tier", value: "Top 20%", description: "Captures majority of subscribers" },
    ],
    githubUrl: "https://github.com/alekha1234/Portuguese-Bank-Marketing-Campaign",
    isFeatured: true,
    highlights: [
      "Mitigated severe class imbalance between subscribers and non-subscribers.",
      "Identified call duration, prior campaign status, and Euribor index as paramount conversion signals.",
      "Formulated decile-based scoring framework prioritizing high-propensity outreach.",
    ],
    caseStudy: {
      problem: "Direct telemarketing campaigns suffered from low conversion rates and escalating operational costs caused by untargeted cold calling across the entire customer base.",
      data: "Comprehensive Portuguese banking dataset comprising 45,211 direct marketing interactions with 17 attributes across client demographics, balance levels, and economic indices.",
      approach: "Conducted exhaustive exploratory data analysis, handled non-linear feature interactions, applied categorical encoding, and addressed class imbalance.",
      model: "Trained and benchmarked Logistic Regression, Decision Trees, Random Forests, and Gradient Boosted Classifiers with hyperparameter optimization.",
      evaluation: "Prioritized Precision-Recall AUC and F1-score over raw accuracy to prevent false-negative lead loss, utilizing confusion matrices and threshold tuning.",
      results: "Isolated the top 20% lead tier capable of generating over 65% of successful deposit subscriptions, identifying economic sentiment as a key driver.",
      impact: "Supplies marketing operations with an empirical lead-scoring system that substantially cuts campaign costs while raising net conversion yield."
    }
  },
  {
    id: "jellyfish-marine-classification",
    slug: "jellyfish-marine-classification",
    title: "Marine Jellyfish Species Classifier",
    category: "Deep Learning & Marine Bio-Vision",
    subtitle: "Automated Species Identification using Convolutional Neural Networks",
    summary: "Convolutional neural network for marine organism classification to support ecological surveys and automated taxonomic indexing from underwater imagery.",
    image: "/documents/projects/jellyfish.jpeg",
    technologies: ["TensorFlow", "Keras", "Python", "NumPy", "Matplotlib", "CNN"],
    metrics: [
      { label: "Architecture", value: "Custom CNN", description: "Multi-layer feature hierarchy" },
      { label: "Domain", value: "Bio-Vision", description: "Underwater taxonomic indexing" },
      { label: "Optimization", value: "Adam + Dropout", description: "Overfitting prevention" },
    ],
    githubUrl: "https://github.com/alekha1234/Computer-Vision-Object-Detection/blob/main/Jelly-Fish-Classification-Using-Computer-Vision.ipynb",
    isFeatured: true,
    highlights: [
      "Custom CNN architecture extracting morphological features from underwater imagery.",
      "Applied spatial data augmentation to counter water turbidity and illumination variance.",
      "Automates tedious marine taxonomic categorization for oceanographic research.",
    ],
    caseStudy: {
      problem: "Oceanographic biologists face massive manual backlogs indexing underwater video and camera traps to monitor marine biodiversity and jellyfish blooms.",
      data: "Multi-species underwater imagery dataset featuring distinct jellyfish classifications (Moon, Compass, Lion's Mane, Barrel) captured across diverse ocean conditions.",
      approach: "Implemented extensive image transformations including rotation, shear, horizontal flips, and zoom alongside channel normalization.",
      model: "Designed multi-tier Convolutional Neural Network with progressive feature maps (32 → 64 → 128), Batch Normalization, Dropout (0.3), and Softmax classification.",
      evaluation: "Tracked categorical cross-entropy loss convergence, per-species confusion matrices, and precision/recall balance across classes.",
      results: "Achieved robust taxonomic separation across challenging morphometry, accurately identifying species despite motion blur and light refraction.",
      impact: "Accelerates ecological research workflows by automating organism tagging in continuous underwater survey feeds."
    }
  },
];

export interface ArchivedProject {
  id: string;
  title: string;
  category: string;
  description: string;
  technologies: string[];
  githubUrl: string;
  image: string;
}

export const moreProjectsData: ArchivedProject[] = [
  {
    id: "cifar10-benchmark",
    title: "CIFAR-10 Visual Recognition Engine",
    category: "Computer Vision",
    description: "Deep convolutional architecture extracting robust feature representations from noisy 32x32 color images across 10 balanced classes.",
    technologies: ["TensorFlow", "Keras", "Python", "CNN", "Deep Learning"],
    githubUrl: "https://github.com/alekha1234/Computer-Vision-Object-Detection/blob/main/Object-Classification-Using-Cifar10.ipynb",
    image: "/documents/projects/cifar10.png",
  },
  {
    id: "clinical-liver-prediction",
    title: "Clinical Liver Disease Diagnostic Predictor",
    category: "Healthcare Analytics",
    description: "Predictive diagnostic classification model using 10 biochemical blood biomarkers, achieving 82% diagnostic accuracy for early triage.",
    technologies: ["Python", "Scikit-Learn", "Pandas", "Decision Trees"],
    githubUrl: "https://github.com/alekha1234/LIver-Disease-Prediction",
    image: "/documents/projects/liver-disease.jpeg",
  },
  {
    id: "nlp-suite",
    title: "Modular NLP Text Processing & Sentiment Suite",
    category: "NLP & Text Analytics",
    description: "Reusable text engineering repository covering tokenization, lemmatization, TF-IDF vectorization, and sentiment classification.",
    technologies: ["Python", "NLTK", "Scikit-Learn", "Pandas", "TF-IDF"],
    githubUrl: "https://github.com/alekha1234/Natural-Language-Processing",
    image: "/documents/projects/nlp-repository.jpeg",
  },
  {
    id: "cat-dog-resnet50",
    title: "Cat vs Dog Classification (ResNet50)",
    category: "Computer Vision",
    description: "Deep transfer learning implementation utilizing pretrained ResNet50 architecture for fine-grained binary animal image classification.",
    technologies: ["Python", "ResNet50", "PyTorch/Keras", "Transfer Learning"],
    githubUrl: "https://github.com/alekha1234/Computer-Vision-Object-Detection/blob/main/Cat-Dog-Classification-Using-ResNet50.ipynb",
    image: "/documents/projects/cat-dog.jpeg",
  },
  {
    id: "sales-effectiveness-ficzon",
    title: "FicZon Sales Effectiveness Analysis",
    category: "Business Analytics",
    description: "Comprehensive enterprise sales data analysis, pipeline velocity tracking, and conversion bottleneck identification for FicZon.",
    technologies: ["Python", "Pandas", "Scikit-Learn", "Matplotlib", "Seaborn"],
    githubUrl: "https://github.com/alekha1234/FicZon-Sales-Effectiveness/blob/main/FicZon-Sales-Effectiveness.ipynb",
    image: "/documents/projects/sales-effectiveness.jpeg",
  },
  {
    id: "employee-attrition-random-forest",
    title: "Employee Attrition Prediction",
    category: "HR Analytics & ML",
    description: "Decision Tree and Random Forest modeling to identify leading organizational and compensation drivers of voluntary staff attrition.",
    technologies: ["Python", "Random Forest", "Decision Trees", "Scikit-Learn"],
    githubUrl: "https://github.com/alekha1234/Machine-Learning-Projects/blob/main/Employee-Attrition-Using-Decision-Tree-and-Random-Forest.ipynb",
    image: "/documents/projects/employee-attrition.jpeg",
  },
  {
    id: "loan-status-svm",
    title: "Loan Status Approval Prediction",
    category: "Financial Analytics",
    description: "Support Vector Machines (SVM) with radial basis kernel applied to credit history and applicant financial attributes for automated loan underwriting.",
    technologies: ["Python", "SVM", "Scikit-Learn", "Pandas"],
    githubUrl: "https://github.com/alekha1234/Machine-Learning-Projects/blob/main/Loan-Status-Classification-Using-Support-Vector-Machines.ipynb",
    image: "/documents/projects/loan-status.jpeg",
  },
  {
    id: "total-sales-forecasting",
    title: "Total Sales Revenue Forecasting",
    category: "Time Series & Regression",
    description: "Linear regression modeling and trend decomposition to predict retail revenue trajectories across marketing budget allocations.",
    technologies: ["Python", "Linear Regression", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/alekha1234/Machine-Learning-Projects/blob/main/Total-Sales-Prediction-Using-Linear-Regression.ipynb",
    image: "/documents/projects/total-sales.jpeg",
  },
  {
    id: "diabetic-risk-prediction",
    title: "Diabetic Patient Risk Stratification",
    category: "Healthcare Analytics",
    description: "Logistic regression model trained on diagnostic metabolic markers (glucose, insulin, BMI) for binary diabetic vulnerability scoring.",
    technologies: ["Python", "Logistic Regression", "Scikit-Learn", "EDA"],
    githubUrl: "https://github.com/alekha1234/Machine-Learning-Projects/blob/main/Diabetic-Prediction-Using-Logistic-Regression.ipynb",
    image: "/documents/projects/diabetic.jpeg",
  },
  {
    id: "inx-employee-performance",
    title: "Employee Performance Analytics (INX Future Inc)",
    category: "Workforce Analytics",
    description: "In-depth workforce productivity analysis identifying key drivers of high performance and structural impediments across business units.",
    technologies: ["Python", "Machine Learning", "Feature Importance", "Seaborn"],
    githubUrl: "https://github.com/alekha1234/Employee-performance-of-INX-Future-Inc",
    image: "/documents/projects/enployee-performance.jpeg",
  },
  {
    id: "iris-flower-classification",
    title: "Iris Flower Taxonomic Classification",
    category: "Foundational ML",
    description: "Comprehensive benchmark comparison of KNN, Decision Trees, and SVM algorithms on the foundational Iris morphometric dataset.",
    technologies: ["Python", "Scikit-Learn", "Matplotlib", "Classification"],
    githubUrl: "https://github.com/alekha1234/Iris_dataset",
    image: "/documents/projects/iris.jpeg",
  },
  {
    id: "fifa-world-cup-analytics",
    title: "FIFA World Cup Tournament Analytics",
    category: "Sports Analytics",
    description: "Exploratory data analysis and unsupervised pattern discovery evaluating national squad metrics, player attributes, and match results.",
    technologies: ["Python", "Unsupervised Learning", "Pandas", "Seaborn"],
    githubUrl: "https://github.com/alekha1234/FIFA-World-Cup-2020",
    image: "/documents/projects/fifa.jpeg",
  },
  {
    id: "house-price-advanced-regression",
    title: "House Price Prediction (Advanced Regression)",
    category: "Predictive Modeling",
    description: "High-dimensional Ames housing valuation modeling utilizing ensemble gradient boosters (XGBoost, LightGBM) with extensive feature engineering.",
    technologies: ["Python", "XGBoost", "LightGBM", "Scikit-Learn", "Advanced Regression"],
    githubUrl: "https://github.com/alekha1234/House_price_prediction_Advance_Regression/blob/main/House_Price_Advance_Regression.ipynb",
    image: "/documents/projects/house-price.jpeg",
  },
];
