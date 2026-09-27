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
      data: "Comprehensive Portuguese banking dataset comprising 45,211 direct marketing interactions with 17 attributes across client demographics, balance levels, loan obligations, contact timing, and macroeconomic indices.",
      approach: "Conducted exhaustive exploratory data analysis, handled non-linear feature interactions, applied categorical encoding, and addressed severe class imbalance through re-weighting and stratified sampling.",
      model: "Trained and benchmarked Logistic Regression, Decision Trees, Random Forests, and Gradient Boosted Classifiers with hyperparameter optimization.",
      evaluation: "Prioritized Precision-Recall AUC and F1-score over raw accuracy to prevent false-negative lead loss, utilizing confusion matrices and threshold tuning.",
      results: "Isolated the top 20% lead tier capable of generating over 65% of successful deposit subscriptions, identifying economic sentiment and prior outreach history as key conversion drivers.",
      impact: "Supplies marketing operations with an empirical lead-scoring system that substantially cuts campaign costs while raising net conversion yield."
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
      { label: "Throughput", value: "Real-Time", description: "Video stream inference capable" },
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
      data: "Annotated multi-class image dataset with precise bounding box coordinates categorized into three states: masked, unmasked, and incorrectly worn masks under varied environmental lighting.",
      approach: "Engineered robust preprocessing pipeline leveraging mosaic augmentation, color jittering, spatial scaling, and normalized bounding box coordinate conversions.",
      model: "Fine-tuned YOLOv5 architecture featuring CSPDarknet53 backbone and Path Aggregation Network (PANet) neck for multi-scale feature localization.",
      evaluation: "Validated against mean Average Precision (mAP@0.5 and mAP@0.5:0.95), inference latency (milliseconds per frame), and precision-recall trade-offs.",
      results: "Demonstrated accurate multi-target localization in high-density frames with minimal latency, distinguishing subtle mask placement variations.",
      impact: "Enables contactless, automated compliance telemetry across transit hubs and commercial facilities without requiring on-site personnel."
    }
  },
  {
    id: "jellyfish-marine-classification",
    slug: "jellyfish-marine-classification",
    title: "Marine Jellyfish Species Classifier",
    category: "Deep Learning & Marine Science",
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
      problem: "Oceanographic biologists face massive manual backlogs indexing underwater video and camera traps to monitor marine biodiversity and jellyfish bloom surges.",
      data: "Multi-species underwater imagery dataset featuring distinct jellyfish classifications (Moon, Compass, Lion's Mane, Barrel) captured across diverse ocean conditions.",
      approach: "Implemented extensive image transformations including rotation, shear, horizontal flips, and zoom alongside channel normalization to handle turbidity.",
      model: "Designed multi-tier Convolutional Neural Network with progressive feature maps (32 → 64 → 128), Batch Normalization, Dropout (0.3), and Softmax classification.",
      evaluation: "Tracked categorical cross-entropy loss convergence, per-species confusion matrices, and precision/recall balance across classes.",
      results: "Achieved robust taxonomic separation across challenging morphometry, accurately identifying species despite motion blur and light refraction.",
      impact: "Accelerates ecological research workflows by automating organism tagging in continuous underwater survey feeds."
    }
  },
  {
    id: "cifar10-visual-recognition",
    slug: "cifar10-visual-recognition",
    title: "CIFAR-10 Visual Recognition Engine",
    category: "Deep Learning & Computer Vision",
    subtitle: "Multi-Class Object Recognition Across Low-Resolution Imagery",
    summary: "Deep learning vision architecture engineered to extract stable visual feature representations from noisy 32x32 color images across 10 diverse classes.",
    image: "/documents/projects/cifar10.png",
    technologies: ["TensorFlow", "Keras", "Python", "Deep Learning", "NumPy", "Matplotlib"],
    metrics: [
      { label: "Dataset Size", value: "60,000", description: "Standardized 32x32 image samples" },
      { label: "Class Count", value: "10 Classes", description: "Balanced object taxonomy" },
      { label: "Framework", value: "TensorFlow", description: "Keras Sequential pipeline" },
    ],
    githubUrl: "https://github.com/alekha1234/Computer-Vision-Object-Detection/blob/main/Object-Classification-Using-Cifar10.ipynb",
    isFeatured: true,
    highlights: [
      "Engineered stacked convolutional blocks with spatial dropout to combat overfitting.",
      "Trained on 60,000 samples spanning animals, vehicles, and everyday objects.",
      "Validated stable generalization across subtle intra-class variations in low resolution.",
    ],
    caseStudy: {
      problem: "Extracting generalized visual representations from low-resolution (32x32) pixels is challenging due to pixel noise and overlapping category contours.",
      data: "60,000 32x32 color images across 10 balanced classes (airplanes, cars, birds, cats, deer, dogs, frogs, horses, ships, trucks), partitioned into 50k train and 10k test splits.",
      approach: "Applied pixel scaling, spatial data augmentations, batch normalization, and He-normal kernel initializations to stabilize gradient propagation.",
      model: "Constructed deep CNN architecture featuring dual conv blocks with Max Pooling, Dropout regularizers (0.25 to 0.5), and dense Softmax prediction layers.",
      evaluation: "Evaluated top-1 test accuracy, cross-entropy loss trajectories, and class-by-class precision and recall metrics.",
      results: "Attained stable generalization across diverse categories without divergence, proving the robustness of the convolutional feature hierarchy.",
      impact: "Serves as an architectural baseline for downstream embedded vision applications and lightweight image categorization models."
    }
  },
  {
    id: "clinical-liver-disease-prediction",
    slug: "clinical-liver-disease-prediction",
    title: "Clinical Liver Disease Diagnostic Predictor",
    category: "Healthcare Analytics & Diagnostics",
    subtitle: "Early Hepatic Pathology Detection via Biochemical Patient Profiles",
    summary: "Predictive clinical classification model leveraging 10 routine biochemical biomarkers to assist medical teams with early-stage hepatic triage.",
    image: "/documents/projects/liver-disease.jpeg",
    technologies: ["Python", "Scikit-Learn", "Pandas", "NumPy", "Seaborn", "Decision Trees"],
    metrics: [
      { label: "Model Accuracy", value: "82%", description: "Validated test classification" },
      { label: "Biomarkers", value: "10 Clinical", description: "Bilirubin, enzymes, protein ratios" },
      { label: "Target", value: "Binary Triage", description: "Hepatic risk indicator" },
    ],
    githubUrl: "https://github.com/alekha1234/LIver-Disease-Prediction",
    isFeatured: true,
    highlights: [
      "Achieved 82% validation accuracy using Decision Trees and Logistic Regression.",
      "Demonstrated Bilirubin ratios and transaminase enzyme levels as top diagnostic indicators.",
      "Designed for early clinical triage to prioritize high-risk patients for confirmatory diagnostics.",
    ],
    caseStudy: {
      problem: "Chronic liver ailments are frequently asymptomatic during early stages, leading to late interventions and adverse patient outcomes.",
      data: "Patient records containing 10 biochemical blood indicators including Total Bilirubin, Direct Bilirubin, Alkaline Phosphotase, ALT, AST, Total Proteins, Albumin, and A/G Ratio.",
      approach: "Performed clinical outlier assessment, missing value imputation, feature scaling, and correlation mapping to prevent multicollinearity.",
      model: "Trained and tuned Decision Tree and Logistic Regression models with regularization to prevent overfitting on clinical variations.",
      evaluation: "Validated against test cohort achieving 82% diagnostic accuracy, calibrating decision boundaries to minimize clinical false-negative occurrences.",
      results: "Confirmed that elevated direct bilirubin and AST/ALT enzyme ratios provide the strongest empirical signal for early hepatic dysfunction.",
      impact: "Provides a reliable algorithmic triage tool for primary health clinics, expediting timely referrals to hepatology specialists."
    }
  },
  {
    id: "nlp-research-pipeline-suite",
    slug: "nlp-research-pipeline-suite",
    title: "Modular NLP Text Processing & Sentiment Suite",
    category: "NLP & Text Analytics",
    subtitle: "End-to-End Text Preprocessing, Vectorization & Sentiment Pipelines",
    summary: "Production-ready NLP pipeline repository establishing standard modular utilities for tokenization, feature extraction, TF-IDF vectorization, and sentiment inference.",
    image: "/documents/projects/nlp-repository.jpeg",
    technologies: ["Python", "NLTK", "Scikit-Learn", "Pandas", "NLP", "Text Analytics"],
    metrics: [
      { label: "Domain", value: "NLP Suite", description: "Full lifecycle text processing" },
      { label: "Vectorization", value: "TF-IDF / N-gram", description: "Semantic vector extraction" },
      { label: "Modularity", value: "Reusable", description: "Modular pipelines for NLP apps" },
    ],
    githubUrl: "https://github.com/alekha1234/Natural-Language-Processing",
    isFeatured: true,
    highlights: [
      "Engineered reusable pipeline components for regex cleaning, lemmatization, and stop-word filtering.",
      "Constructed TF-IDF vectorizers and n-gram representations for downstream text classification.",
      "Benchmarked sentiment scoring and text classification across diverse sentiment datasets.",
    ],
    caseStudy: {
      problem: "Raw unstructured text from varied customer feedback channels is erratic, noisy, and inefficient to process without standardized preprocessing pipelines.",
      data: "Multi-domain textual corpora comprising customer sentiment surveys, product reviews, and benchmark text collections.",
      approach: "Developed modular text engineering workflow: noise cleaning, tokenization, lemmatization, stop-word removal, and vocabulary normalization.",
      model: "Integrated TF-IDF vectorization with Naive Bayes, Logistic Regression, and neural text classifiers for sentiment scoring.",
      evaluation: "Benchmarked classification accuracy, F1-macro metrics across sentiment polarities, and vocabulary sparsity efficiency.",
      results: "Established a robust, modular code foundation that significantly accelerates downstream NLP experimentation and text mining.",
      impact: "Reduces data preparation lead time for conversational, classification, and customer intelligence systems."
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
    id: "end-to-end-ml-pipeline",
    title: "End-to-End Machine Learning Serving Pipeline",
    category: "MLOps & Engineering",
    description: "Production-oriented machine learning lifecycle project featuring modular ingestion, automated feature transformers, and Flask serving.",
    technologies: ["Python", "Flask", "Scikit-Learn", "Docker/Pipeline", "Modular Code"],
    githubUrl: "https://github.com/alekha1234/End-to-End-Machine-Learning-Project",
    image: "/documents/projects/end-to-end-ml.jpeg",
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
