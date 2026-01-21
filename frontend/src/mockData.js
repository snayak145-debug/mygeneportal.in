// Mock data for mygeneportal.in - E-commerce focused

export const genomicTests = [
  {
    id: 1,
    name: "Whole Exome Sequencing (WES)",
    category: "Clinical Genomics",
    subCategory: "Oncology",
    description: "Comprehensive analysis of protein-coding genes to identify disease-causing mutations in cancer patients.",
    sampleType: "Blood/Saliva",
    turnaroundTime: "4-6 weeks",
    price: "₹20,000",
    mrp: "₹25,000",
    discount: "20% OFF",
    features: ["99% exome coverage", "Germline & somatic variants", "Detailed clinical report", "Free genetic counseling included"],
    inStock: true
  },
  {
    id: 2,
    name: "NIPT (Non-Invasive Prenatal Testing)",
    category: "Clinical Genomics",
    subCategory: "Prenatal",
    description: "Safe, accurate screening for common chromosomal abnormalities in pregnancy from maternal blood.",
    sampleType: "Maternal Blood",
    turnaroundTime: "7-10 days",
    price: "₹12,000",
    mrp: "₹15,000",
    discount: "20% OFF",
    features: ["99% accuracy", "No risk to baby", "From 10 weeks pregnancy", "Trisomy 21, 18, 13 detection"],
    inStock: true,
    popular: true
  },
  {
    id: 3,
    name: "NIPT Advanced",
    category: "Clinical Genomics",
    subCategory: "Prenatal",
    description: "Advanced prenatal screening with extended chromosomal abnormality detection and gender determination.",
    sampleType: "Maternal Blood",
    turnaroundTime: "7-10 days",
    price: "₹18,000",
    mrp: "₹22,000",
    discount: "18% OFF",
    features: ["Extended chromosome screening", "Gender determination", "Microdeletion syndromes", "99.9% accuracy"],
    inStock: true
  },
  {
    id: 4,
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
    popular: true
  },
  {
    id: 5,
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
    inStock: true
  },
  {
    id: 6,
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
    popular: true
  },
  {
    id: 7,
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
    inStock: true
  },
  {
    id: 8,
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
    inStock: true
  },
  {
    id: 9,
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
    inStock: true
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
    answer: "Absolutely. We follow strict data protection protocols compliant with Indian medical privacy laws. Your genetic data is encrypted, stored securely, and never shared without your explicit consent. We partner only with NABL-accredited labs that maintain highest privacy standards."
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
    accreditation: "NABL Accredited",
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
      "Quality assurance with NABL labs"
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
