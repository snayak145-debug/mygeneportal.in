// Mock data for mygeneportal.in - E-commerce focused

export const genomicTests = [
  {
    id: 1,
    name: "Whole Exome Sequencing (WES)",
    category: "Clinical Genomics",
    subCategory: "Oncology",
    description: "Comprehensive analysis of protein-coding genes to identify disease-causing mutations. Covers 99% of all protein-coding genes with clinical-grade accuracy.",
    sampleType: "Blood/Saliva",
    turnaroundTime: "4-6 weeks",
    price: "₹20,000",
    mrp: "₹25,000",
    discount: "20% OFF",
    features: ["99% exome coverage", "20,000+ genes analyzed", "ACMG guidelines", "Germline & somatic variants", "Detailed clinical report", "Free genetic counseling included"],
    inStock: true,
    image: "https://images.unsplash.com/photo-1732046801426-f32529468176?w=400"
  },
  {
    id: 2,
    name: "Whole Genome Sequencing (WGS)",
    category: "Clinical Genomics",
    subCategory: "Comprehensive",
    description: "Complete sequencing of your entire genome including all coding and non-coding regions. The most comprehensive genetic test available for rare disease diagnosis and research.",
    sampleType: "Blood",
    turnaroundTime: "6-8 weeks",
    price: "₹70,000",
    mrp: "₹90,000",
    discount: "22% OFF",
    features: ["Complete 3 billion base pairs", "100% genome coverage", "Illumina NovaSeq technology", "Rare disease detection", "Research-grade accuracy", "Lifetime data storage", "Free genetic counseling"],
    inStock: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1579154392128-bf8c7ebee541?w=400"
  },
  {
    id: 3,
    name: "NIPT (Non-Invasive Prenatal Testing)",
    category: "Clinical Genomics",
    subCategory: "Prenatal",
    description: "Non-invasive prenatal screening (NIPT) is the first-line screening test globally recommended for detecting common chromosomal abnormalities in fetuses from cell-free DNA in maternal blood. Can be done as early as 10 weeks of gestation.",
    sampleType: "10ml Maternal Blood",
    turnaroundTime: "2 weeks",
    price: "₹12,000",
    mrp: "₹15,000",
    discount: "20% OFF",
    features: [">99% sensitivity & specificity", "All autosomal abnormalities (Trisomy 13, 18, 21)", "All sex chromosomal abnormalities", "No risk to baby", "ACOG & SMFM recommended", "From 10 weeks pregnancy"],
    inStock: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1768776180013-5c33c9fd9ada?w=400"
  },
  {
    id: 4,
    name: "NIPT Advanced with Microdeletions",
    category: "Clinical Genomics",
    subCategory: "Prenatal",
    description: "Advanced NIPT with extended screening for common chromosomal abnormalities plus microdeletion syndromes. Provides comprehensive prenatal screening with highest accuracy.",
    sampleType: "10ml Maternal Blood",
    turnaroundTime: "2 weeks",
    price: "₹18,000",
    mrp: "₹22,000",
    discount: "18% OFF",
    features: ["All chromosomal abnormalities", "Microdeletion syndromes screening", "22q11.2 deletion (DiGeorge)", "99.9% accuracy", "High detection rate", "Low failure rate"],
    inStock: true,
    image: "https://images.unsplash.com/photo-1768776180013-5c33c9fd9ada?w=400"
  },
  {
    id: 5,
    name: "Pharmacogenomics Panel",
    category: "Preventive Genomics",
    subCategory: "Wellness",
    description: "Personalized medication response analysis to optimize drug therapy and avoid adverse reactions - Saliva based test.",
    sampleType: "Saliva",
    turnaroundTime: "2-3 weeks",
    price: "₹9,999",
    mrp: "₹12,999",
    discount: "23% OFF",
    features: ["150+ medications analyzed", "Lifetime validity", "Drug metabolism insights", "Personalized dosing recommendations"],
    inStock: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?w=400"
  },
  {
    id: 6,
    name: "Gut Microbiome Test (16S rRNA Based)",
    category: "Preventive Genomics",
    subCategory: "Wellness",
    description: "Comprehensive gut health analysis using 16S rRNA sequencing to understand your microbiome composition.",
    sampleType: "Stool Sample",
    turnaroundTime: "3-4 weeks",
    price: "₹10,000",
    mrp: "₹13,000",
    discount: "23% OFF",
    features: ["Bacterial diversity analysis", "Gut health score", "Dietary recommendations", "Probiotic suggestions"],
    inStock: true,
    image: "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=400"
  },
  {
    id: 7,
    name: "Comprehensive Gut Microbiome Test (Metagenomic)",
    category: "Preventive Genomics",
    subCategory: "Wellness",
    description: "Advanced metagenomic shotgun sequencing for complete microbiome profiling including bacteria, fungi, and viruses.",
    sampleType: "Stool Sample",
    turnaroundTime: "4-5 weeks",
    price: "₹14,999",
    mrp: "₹19,999",
    discount: "25% OFF",
    features: ["Complete microbiome profiling", "Bacteria, fungi & virus detection", "Functional gene analysis", "Personalized health insights"],
    inStock: true,
    popular: true,
    image: "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=400"
  },
  {
    id: 8,
    name: "Hereditary Cancer Panel",
    category: "Clinical Genomics",
    subCategory: "Oncology",
    description: "Multi-gene panel testing for inherited cancer risk including BRCA1/2 and other cancer susceptibility genes.",
    sampleType: "Blood/Saliva",
    turnaroundTime: "3-4 weeks",
    price: "₹32,000",
    mrp: "₹40,000",
    discount: "20% OFF",
    features: ["50+ cancer genes", "Risk assessment report", "Family screening guidance", "Free pre & post-test counseling"],
    inStock: true,
    image: "https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?w=400"
  },
  {
    id: 9,
    name: "Cardiac Genetic Panel",
    category: "Clinical Genomics",
    subCategory: "Cardiology",
    description: "Comprehensive testing for inherited cardiac conditions including cardiomyopathy and arrhythmia syndromes.",
    sampleType: "Blood",
    turnaroundTime: "4-5 weeks",
    price: "₹35,000",
    mrp: "₹43,000",
    discount: "19% OFF",
    features: ["100+ cardiac genes", "Sudden death risk assessment", "Family cascade screening", "Treatment guidance"],
    inStock: true,
    image: "https://images.unsplash.com/photo-1646441453885-86f3cbc260b4?w=400"
  },
  {
    id: 10,
    name: "Diabetes Risk Panel",
    category: "Preventive Genomics",
    subCategory: "Wellness",
    description: "Genetic analysis for Type 2 diabetes risk, insulin resistance, and blood sugar metabolism.",
    sampleType: "Saliva",
    turnaroundTime: "2-3 weeks",
    price: "₹13,500",
    mrp: "₹17,000",
    discount: "21% OFF",
    features: ["T2D genetic risk", "Insulin sensitivity genes", "Glucose metabolism", "Lifestyle recommendations"],
    inStock: true,
    image: "https://images.unsplash.com/photo-1576169210859-6796c4b93c32?w=400"
  },
  {
    id: 11,
    name: "Carrier Screening Panel",
    category: "Clinical Genomics",
    subCategory: "Reproductive",
    description: "Comprehensive screening for carrier status of 300+ genetic conditions before family planning.",
    sampleType: "Blood/Saliva",
    turnaroundTime: "3-4 weeks",
    price: "₹28,000",
    mrp: "₹35,000",
    discount: "20% OFF",
    features: ["300+ genetic conditions", "Couple screening available", "Reproductive counseling", "Risk calculation for offspring"],
    inStock: true,
    image: "https://images.unsplash.com/photo-1768776180013-5c33c9fd9ada?w=400"
  },
  {
    id: 12,
    name: "Nutrigenomics Test",
    category: "Preventive Genomics",
    subCategory: "Nutrition",
    description: "DNA-based nutrition and fitness insights for personalized diet and exercise recommendations.",
    sampleType: "Saliva",
    turnaroundTime: "2-3 weeks",
    price: "₹15,000",
    mrp: "₹18,000",
    discount: "17% OFF",
    features: ["Macronutrient metabolism", "Vitamin sensitivities", "Exercise response", "Weight management insights"],
    inStock: true,
    image: "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=400"
  }
];

export const blogPosts = [
  {
    id: 1,
    title: "Understanding Preventive Genomics: Your Guide to Proactive Health",
    excerpt: "Discover how preventive genomics can help you make informed health decisions before symptoms appear.",
    category: "Preventive Genomics",
    date: "March 15, 2024",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800"
  },
  {
    id: 2,
    title: "NIPT Testing: Everything You Need to Know During Pregnancy",
    excerpt: "Learn about non-invasive prenatal testing and how it can provide peace of mind during pregnancy.",
    category: "Prenatal Testing",
    date: "March 10, 2024",
    readTime: "7 min read",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800"
  },
  {
    id: 3,
    title: "The Importance of Pre-Test Genetic Counseling",
    excerpt: "Why professional counseling before genetic testing is crucial for understanding your results.",
    category: "Genetic Counseling",
    date: "March 5, 2024",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800"
  }
];

export const faqs = [
  {
    id: 1,
    question: "How do I order a genetic test online?",
    answer: "Simply browse our test catalog, select the test you need, add it to cart, and proceed to checkout. After payment, we'll send you a home sample collection kit with detailed instructions. Once we receive your sample, testing begins immediately."
  },
  {
    id: 2,
    question: "What payment methods do you accept?",
    answer: "We accept all major payment methods including credit/debit cards, UPI, net banking, and digital wallets through our secure Razorpay payment gateway. You can also pay via QR code for instant confirmation."
  },
  {
    id: 3,
    question: "Is genetic counseling really free?",
    answer: "Yes! We provide FREE pre-test and post-test genetic counseling with all our test purchases. Our Certified Board Genetic Counsellors (BGCI) will guide you through test selection, results interpretation, and health recommendations at no additional cost."
  },
  {
    id: 4,
    question: "How is the sample collected for genetic testing?",
    answer: "We send a home sample collection kit to your doorstep. Depending on the test, you'll collect either saliva (cheek swab), blood (finger prick), or stool sample following simple instructions. Return the sample using our prepaid courier service."
  },
  {
    id: 5,
    question: "How long does it take to get genetic test results?",
    answer: "Turnaround time varies by test complexity. Simple screening tests take 7-10 days, while comprehensive panels like Whole Exome Sequencing take 4-6 weeks. You'll receive email updates throughout the process and can track your order online."
  },
  {
    id: 6,
    question: "Is my genetic data kept private and secure?",
    answer: "Absolutely. We follow strict data protection protocols compliant with Indian medical privacy laws. Your genetic data is encrypted, stored securely, and never shared without your explicit consent. We partner only with NABL & CAP accredited labs that maintain highest privacy standards."
  },
  {
    id: 7,
    question: "Can I get a refund if I change my mind?",
    answer: "Yes, you can request a full refund before the sample collection kit is shipped. Once the kit is dispatched or sample is collected, refunds are subject to our cancellation policy. Please review our terms before ordering."
  }
];

export const partnerLabs = [
  {
    id: 1,
    name: "MedGenome Labs",
    accreditation: "NABL & CAP Accredited",
    location: "Bangalore"
  },
  {
    id: 2,
    name: "Strand Life Sciences",
    accreditation: "NABL & CAP Accredited",
    location: "Bangalore"
  },
  {
    id: 3,
    name: "Genomics Lab India",
    accreditation: "NABL & CAP Accredited",
    location: "Bangalore"
  }
];

export const services = [
  {
    id: 1,
    title: "Free Pre-Test Genetic Counseling",
    description: "Complimentary expert guidance before testing to help you understand test options, implications, and make informed decisions.",
    features: [
      "Comprehensive test selection guidance",
      "Family history evaluation",
      "Risk assessment discussion",
      "Privacy and ethical considerations",
      "No additional charges"
    ],
    duration: "45-60 minutes",
    mode: "Video Call / Email",
    price: "FREE"
  },
  {
    id: 2,
    title: "Free Genetic Report Interpretation",
    description: "Complimentary detailed explanation of your genetic test results with actionable health recommendations.",
    features: [
      "Detailed result explanation in simple terms",
      "Clinical significance assessment",
      "Personalized health recommendations",
      "Family screening guidance",
      "Specialist referral coordination"
    ],
    duration: "60-90 minutes",
    mode: "Video Call / Email",
    price: "FREE"
  },
  {
    id: 3,
    title: "Home Sample Collection",
    description: "Convenient at-home sample collection with easy-to-follow instructions and prepaid return courier.",
    features: [
      "Sample kit delivered to your doorstep",
      "Simple collection instructions included",
      "Prepaid courier service",
      "Sample tracking and updates",
      "Quality assurance with NABL & CAP labs"
    ],
    duration: "Included with every test",
    mode: "Home Service",
    price: "FREE"
  }
];

// Shopping cart state (will be managed in components)
export const cartInitialState = {
  items: [],
  total: 0
};

export const testimonials = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    role: "Cardiologist",
    image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200",
    quote: "MyGenePortal's comprehensive genetic testing has been invaluable for my patients. The detailed reports and expert counseling make a real difference in preventive care."
  },
  {
    id: 2,
    name: "Rajesh Kumar",
    role: "Fitness Entrepreneur",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    quote: "The pharmacogenomics test helped me understand my body's response to medications. Game-changer for personalized health optimization!"
  },
  {
    id: 3,
    name: "Ananya Desai",
    role: "Health & Wellness Coach",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
    quote: "Fast shipping, great packaging, and the genetic counseling session was incredibly informative. Highly recommend MyGenePortal to all my clients."
  },
  {
    id: 4,
    name: "Vikram Singh",
    role: "IT Professional",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
    quote: "Outstanding customer support and comprehensive genetic insights. The gut microbiome test gave me actionable recommendations that truly work."
  }
];

export const healthCategories = [
  {
    id: 1,
    name: "Cancer Genomics",
    description: "Hereditary cancer risk & treatment guidance",
    image: "https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?w=600",
    tests: ["Hereditary Cancer Panel", "Whole Exome Sequencing"]
  },
  {
    id: 2,
    name: "Heart Health",
    description: "Cardiac genetic testing & risk assessment",
    image: "https://images.unsplash.com/photo-1646441453885-86f3cbc260b4?w=600",
    tests: ["Cardiac Genetic Panel"]
  },
  {
    id: 3,
    name: "Pregnancy & Prenatal",
    description: "Non-invasive prenatal testing",
    image: "https://images.unsplash.com/photo-1768776180013-5c33c9fd9ada?w=600",
    tests: ["NIPT", "NIPT Advanced", "Carrier Screening"]
  },
  {
    id: 4,
    name: "Diabetes & Metabolism",
    description: "Genetic risk & lifestyle optimization",
    image: "https://images.unsplash.com/photo-1576169210859-6796c4b93c32?w=600",
    tests: ["Diabetes Risk Panel", "Nutrigenomics"]
  },
  {
    id: 5,
    name: "Pharmacogenomics",
    description: "Personalized medication response",
    image: "https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?w=600",
    tests: ["Pharmacogenomics Panel"]
  },
  {
    id: 6,
    name: "Wellness & Prevention",
    description: "Gut health & nutritional genomics",
    image: "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=600",
    tests: ["Gut Microbiome Test", "Comprehensive Gut Microbiome", "Nutrigenomics"]
  }
];

export const couponCodes = [
  {
    code: "MYGENE5",
    discount: 5,
    type: "percentage",
    description: "Get 5% off on your order"
  },
  {
    code: "MYGENE10",
    discount: 10,
    type: "percentage",
    description: "Get 10% off on your order"
  }
];
