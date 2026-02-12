from fastapi import FastAPI, APIRouter, HTTPException, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
from enum import Enum

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="MyGenePortal API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


# ===================== ENUMS =====================
class TestCategory(str, Enum):
    CLINICAL_GENOMICS = "Clinical Genomics"
    PREVENTIVE_GENOMICS = "Preventive Genomics"


class OrderStatus(str, Enum):
    PENDING = "pending"
    CONFIRMED = "confirmed"
    KIT_SHIPPED = "kit_shipped"
    SAMPLE_RECEIVED = "sample_received"
    PROCESSING = "processing"
    COMPLETED = "completed"
    CANCELLED = "cancelled"


class SampleStatus(str, Enum):
    KIT_DISPATCHED = "Kit Dispatched"
    IN_TRANSIT = "In Transit"
    SAMPLE_COLLECTED = "Sample Collected"
    SAMPLE_RECEIVED = "Sample Received at Lab"
    TESTING_IN_PROGRESS = "Testing in Progress"
    ANALYSIS_COMPLETE = "Analysis Complete"
    REPORT_GENERATED = "Report Generated"
    DELIVERED = "Report Delivered"


# ===================== MODELS =====================

# --- Test Models ---
class GenomicTest(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    category: str
    sub_category: str
    description: str
    sample_type: str
    turnaround_time: str
    price: str
    mrp: str
    discount: str
    features: List[str]
    in_stock: bool = True
    popular: bool = False
    image: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class GenomicTestCreate(BaseModel):
    name: str
    category: str
    sub_category: str
    description: str
    sample_type: str
    turnaround_time: str
    price: str
    mrp: str
    discount: str
    features: List[str]
    in_stock: bool = True
    popular: bool = False
    image: str


# --- Lead Models ---
class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: EmailStr
    mobile: str
    test_of_interest: str = ""
    preferred_date: str = ""
    preferred_time: str = ""
    notes: str = ""
    source: str = "website"
    status: str = "new"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    mobile: str
    test_of_interest: str = ""
    preferred_date: str = ""
    preferred_time: str = ""
    notes: str = ""
    source: str = "website"


# --- Order Models ---
class OrderItem(BaseModel):
    test_id: str
    test_name: str
    price: str
    quantity: int = 1


class Order(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    customer_name: str
    customer_email: EmailStr
    customer_mobile: str
    customer_address: str
    customer_city: str
    customer_state: str
    customer_pincode: str
    items: List[OrderItem]
    subtotal: float
    discount_amount: float = 0.0
    coupon_code: str = ""
    total_amount: float
    payment_status: str = "pending"
    payment_id: str = ""
    order_status: OrderStatus = OrderStatus.PENDING
    tracking_id: str = Field(default_factory=lambda: f"MGP{str(uuid.uuid4())[:8].upper()}")
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class OrderCreate(BaseModel):
    customer_name: str
    customer_email: EmailStr
    customer_mobile: str
    customer_address: str
    customer_city: str
    customer_state: str
    customer_pincode: str
    items: List[OrderItem]
    subtotal: float
    discount_amount: float = 0.0
    coupon_code: str = ""
    total_amount: float


# --- Coupon Models ---
class Coupon(BaseModel):
    model_config = ConfigDict(extra="ignore")
    code: str
    discount: float
    type: str  # "percentage" or "fixed"
    description: str
    active: bool = True
    min_order_value: float = 0.0
    max_discount: float = 0.0


class CouponVerifyRequest(BaseModel):
    code: str
    order_total: float


class CouponVerifyResponse(BaseModel):
    valid: bool
    discount_amount: float = 0.0
    discount_type: str = ""
    message: str = ""


# --- Blog Models ---
class BlogPost(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    title: str
    excerpt: str
    content: str = ""
    category: str
    date: str
    read_time: str
    image: str
    slug: str = ""
    published: bool = True
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class BlogPostCreate(BaseModel):
    title: str
    excerpt: str
    content: str = ""
    category: str
    date: str
    read_time: str
    image: str
    slug: str = ""
    published: bool = True


# --- Sample Tracking Models ---
class SampleTrackingEvent(BaseModel):
    status: str
    date: str
    description: str


class SampleTracking(BaseModel):
    model_config = ConfigDict(extra="ignore")
    tracking_id: str
    order_id: str
    test_name: str
    customer_name: str
    current_status: str = SampleStatus.KIT_DISPATCHED.value
    timeline: List[SampleTrackingEvent] = []
    estimated_completion: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


# --- Health Category Models ---
class HealthCategory(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    description: str
    image: str
    tests: List[str]


# --- Testimonial Models ---
class Testimonial(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    role: str
    image: str
    quote: str


# ===================== ROUTES =====================

# --- Health Check ---
@api_router.get("/")
async def root():
    return {"message": "MyGenePortal API is running", "version": "1.0.0"}


@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "timestamp": datetime.now(timezone.utc).isoformat()}


# --- Tests Routes ---
@api_router.get("/tests", response_model=List[GenomicTest])
async def get_tests(category: Optional[str] = None, popular: Optional[bool] = None):
    """Get all genomic tests with optional filtering"""
    query = {}
    if category:
        query["category"] = category
    if popular is not None:
        query["popular"] = popular
    
    tests = await db.tests.find(query, {"_id": 0}).to_list(100)
    
    # Convert datetime strings back to datetime objects
    for test in tests:
        if isinstance(test.get('created_at'), str):
            test['created_at'] = datetime.fromisoformat(test['created_at'])
    
    return tests


@api_router.get("/tests/{test_id}", response_model=GenomicTest)
async def get_test(test_id: str):
    """Get a specific test by ID"""
    test = await db.tests.find_one({"id": test_id}, {"_id": 0})
    if not test:
        raise HTTPException(status_code=404, detail="Test not found")
    
    if isinstance(test.get('created_at'), str):
        test['created_at'] = datetime.fromisoformat(test['created_at'])
    
    return test


@api_router.post("/tests", response_model=GenomicTest, status_code=status.HTTP_201_CREATED)
async def create_test(test_data: GenomicTestCreate):
    """Create a new genomic test"""
    test = GenomicTest(**test_data.model_dump())
    doc = test.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.tests.insert_one(doc)
    return test


# --- Leads Routes ---
@api_router.post("/leads", response_model=Lead, status_code=status.HTTP_201_CREATED)
async def create_lead(lead_data: LeadCreate):
    """Create a new lead/enquiry"""
    lead = Lead(**lead_data.model_dump())
    doc = lead.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.leads.insert_one(doc)
    logger.info(f"New lead created: {lead.email} for {lead.test_of_interest}")
    return lead


@api_router.get("/leads", response_model=List[Lead])
async def get_leads(status: Optional[str] = None):
    """Get all leads with optional status filter"""
    query = {}
    if status:
        query["status"] = status
    
    leads = await db.leads.find(query, {"_id": 0}).to_list(1000)
    
    for lead in leads:
        if isinstance(lead.get('created_at'), str):
            lead['created_at'] = datetime.fromisoformat(lead['created_at'])
    
    return leads


# --- Orders Routes ---
@api_router.post("/orders", response_model=Order, status_code=status.HTTP_201_CREATED)
async def create_order(order_data: OrderCreate):
    """Create a new order"""
    order = Order(**order_data.model_dump())
    doc = order.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.orders.insert_one(doc)
    logger.info(f"New order created: {order.id} for {order.customer_email}")
    
    # Create sample tracking entry
    for item in order.items:
        tracking = SampleTracking(
            tracking_id=order.tracking_id,
            order_id=order.id,
            test_name=item.test_name,
            customer_name=order.customer_name,
            current_status=SampleStatus.KIT_DISPATCHED.value,
            timeline=[
                SampleTrackingEvent(
                    status=SampleStatus.KIT_DISPATCHED.value,
                    date=datetime.now(timezone.utc).strftime("%Y-%m-%d"),
                    description="Sample collection kit has been dispatched"
                )
            ],
            estimated_completion=(datetime.now(timezone.utc) + timedelta(days=21)).strftime("%Y-%m-%d")
        )
        tracking_doc = tracking.model_dump()
        tracking_doc['created_at'] = tracking_doc['created_at'].isoformat()
        await db.sample_tracking.insert_one(tracking_doc)
    
    return order


@api_router.get("/orders", response_model=List[Order])
async def get_orders(email: Optional[str] = None):
    """Get orders, optionally filtered by customer email"""
    query = {}
    if email:
        query["customer_email"] = email
    
    orders = await db.orders.find(query, {"_id": 0}).to_list(1000)
    
    for order in orders:
        if isinstance(order.get('created_at'), str):
            order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return orders


@api_router.get("/orders/{order_id}", response_model=Order)
async def get_order(order_id: str):
    """Get a specific order"""
    order = await db.orders.find_one({"id": order_id}, {"_id": 0})
    if not order:
        raise HTTPException(status_code=404, detail="Order not found")
    
    if isinstance(order.get('created_at'), str):
        order['created_at'] = datetime.fromisoformat(order['created_at'])
    
    return order


@api_router.patch("/orders/{order_id}/status")
async def update_order_status(order_id: str, status: OrderStatus):
    """Update order status"""
    result = await db.orders.update_one(
        {"id": order_id},
        {"$set": {"order_status": status.value}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Order not found")
    return {"message": "Order status updated successfully"}


# --- Coupon Routes ---
@api_router.post("/verify-coupon", response_model=CouponVerifyResponse)
async def verify_coupon(request: CouponVerifyRequest):
    """Verify and calculate discount for a coupon code"""
    coupon = await db.coupons.find_one({"code": request.code.upper(), "active": True}, {"_id": 0})
    
    if not coupon:
        return CouponVerifyResponse(
            valid=False,
            message="Invalid or expired coupon code"
        )
    
    # Check minimum order value
    if coupon.get('min_order_value', 0) > request.order_total:
        return CouponVerifyResponse(
            valid=False,
            message=f"Minimum order value of ₹{coupon['min_order_value']} required"
        )
    
    # Calculate discount
    discount_amount = 0.0
    if coupon['type'] == 'percentage':
        discount_amount = (request.order_total * coupon['discount']) / 100
        # Apply max discount cap if exists
        if coupon.get('max_discount', 0) > 0:
            discount_amount = min(discount_amount, coupon['max_discount'])
    else:
        discount_amount = coupon['discount']
    
    return CouponVerifyResponse(
        valid=True,
        discount_amount=round(discount_amount, 2),
        discount_type=coupon['type'],
        message=coupon.get('description', f"₹{discount_amount} discount applied!")
    )


@api_router.get("/coupons", response_model=List[Coupon])
async def get_coupons():
    """Get all active coupons"""
    coupons = await db.coupons.find({"active": True}, {"_id": 0}).to_list(100)
    return coupons


# --- Blog Routes ---
@api_router.get("/blog", response_model=List[BlogPost])
async def get_blog_posts(category: Optional[str] = None):
    """Get all blog posts"""
    query = {"published": True}
    if category:
        query["category"] = category
    
    posts = await db.blog_posts.find(query, {"_id": 0}).to_list(100)
    
    for post in posts:
        if isinstance(post.get('created_at'), str):
            post['created_at'] = datetime.fromisoformat(post['created_at'])
    
    return posts


@api_router.get("/blog/{post_id}", response_model=BlogPost)
async def get_blog_post(post_id: str):
    """Get a specific blog post"""
    post = await db.blog_posts.find_one({"id": post_id}, {"_id": 0})
    if not post:
        raise HTTPException(status_code=404, detail="Blog post not found")
    
    if isinstance(post.get('created_at'), str):
        post['created_at'] = datetime.fromisoformat(post['created_at'])
    
    return post


@api_router.post("/blog", response_model=BlogPost, status_code=status.HTTP_201_CREATED)
async def create_blog_post(post_data: BlogPostCreate):
    """Create a new blog post"""
    post = BlogPost(**post_data.model_dump())
    doc = post.model_dump()
    doc['created_at'] = doc['created_at'].isoformat()
    
    await db.blog_posts.insert_one(doc)
    return post


# --- Sample Tracking Routes ---
@api_router.get("/track-sample/{tracking_id}", response_model=SampleTracking)
async def track_sample(tracking_id: str):
    """Track sample status by tracking ID"""
    tracking = await db.sample_tracking.find_one({"tracking_id": tracking_id.upper()}, {"_id": 0})
    if not tracking:
        raise HTTPException(status_code=404, detail="Tracking ID not found. Please verify your tracking ID.")
    
    if isinstance(tracking.get('created_at'), str):
        tracking['created_at'] = datetime.fromisoformat(tracking['created_at'])
    
    return tracking


@api_router.patch("/track-sample/{tracking_id}/status")
async def update_sample_status(tracking_id: str, status: str, description: str):
    """Update sample tracking status"""
    event = SampleTrackingEvent(
        status=status,
        date=datetime.now(timezone.utc).strftime("%Y-%m-%d"),
        description=description
    )
    
    result = await db.sample_tracking.update_one(
        {"tracking_id": tracking_id.upper()},
        {
            "$set": {"current_status": status},
            "$push": {"timeline": event.model_dump()}
        }
    )
    
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Tracking ID not found")
    
    return {"message": "Tracking status updated successfully"}


# --- Health Categories Routes ---
@api_router.get("/health-categories", response_model=List[HealthCategory])
async def get_health_categories():
    """Get all health categories"""
    categories = await db.health_categories.find({}, {"_id": 0}).to_list(100)
    return categories


# --- Testimonials Routes ---
@api_router.get("/testimonials", response_model=List[Testimonial])
async def get_testimonials():
    """Get all testimonials"""
    testimonials = await db.testimonials.find({}, {"_id": 0}).to_list(100)
    return testimonials


# --- Data Seeding Route (for initial setup) ---
@api_router.post("/seed-data")
async def seed_data():
    """Seed initial data for the application"""
    # Clear existing data
    await db.tests.delete_many({})
    await db.coupons.delete_many({})
    await db.blog_posts.delete_many({})
    await db.health_categories.delete_many({})
    await db.testimonials.delete_many({})
    
    # Seed Tests
    tests_data = [
        {
            "id": "1",
            "name": "Whole Exome Sequencing (WES)",
            "category": "Clinical Genomics",
            "sub_category": "Oncology",
            "description": "Comprehensive analysis of protein-coding genes to identify disease-causing mutations. Covers 99% of all protein-coding genes with clinical-grade accuracy.",
            "sample_type": "Blood/Saliva",
            "turnaround_time": "4-6 weeks",
            "price": "₹20,000",
            "mrp": "₹25,000",
            "discount": "20% OFF",
            "features": ["99% exome coverage", "20,000+ genes analyzed", "ACMG guidelines", "Germline & somatic variants", "Detailed clinical report", "Free genetic counseling included"],
            "in_stock": True,
            "popular": False,
            "image": "https://images.unsplash.com/photo-1732046801426-f32529468176?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "2",
            "name": "Whole Genome Sequencing (WGS)",
            "category": "Clinical Genomics",
            "sub_category": "Comprehensive",
            "description": "Complete sequencing of your entire genome including all coding and non-coding regions. The most comprehensive genetic test available for rare disease diagnosis and research.",
            "sample_type": "Blood",
            "turnaround_time": "6-8 weeks",
            "price": "₹70,000",
            "mrp": "₹90,000",
            "discount": "22% OFF",
            "features": ["Complete 3 billion base pairs", "100% genome coverage", "Illumina NovaSeq technology", "Rare disease detection", "Research-grade accuracy", "Lifetime data storage", "Free genetic counseling"],
            "in_stock": True,
            "popular": True,
            "image": "https://images.unsplash.com/photo-1579154392128-bf8c7ebee541?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "3",
            "name": "NIPT (Non-Invasive Prenatal Testing)",
            "category": "Clinical Genomics",
            "sub_category": "Prenatal",
            "description": "Non-invasive prenatal screening (NIPT) is the first-line screening test globally recommended for detecting common chromosomal abnormalities in fetuses from cell-free DNA in maternal blood. Can be done as early as 10 weeks of gestation.",
            "sample_type": "10ml Maternal Blood",
            "turnaround_time": "2 weeks",
            "price": "₹12,000",
            "mrp": "₹15,000",
            "discount": "20% OFF",
            "features": [">99% sensitivity & specificity", "All autosomal abnormalities (Trisomy 13, 18, 21)", "All sex chromosomal abnormalities", "No risk to baby", "ACOG & SMFM recommended", "From 10 weeks pregnancy"],
            "in_stock": True,
            "popular": True,
            "image": "https://images.unsplash.com/photo-1768776180013-5c33c9fd9ada?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "4",
            "name": "NIPT Advanced with Microdeletions",
            "category": "Clinical Genomics",
            "sub_category": "Prenatal",
            "description": "Advanced NIPT with extended screening for common chromosomal abnormalities plus microdeletion syndromes. Provides comprehensive prenatal screening with highest accuracy.",
            "sample_type": "10ml Maternal Blood",
            "turnaround_time": "2 weeks",
            "price": "₹18,000",
            "mrp": "₹22,000",
            "discount": "18% OFF",
            "features": ["All chromosomal abnormalities", "Microdeletion syndromes screening", "22q11.2 deletion (DiGeorge)", "99.9% accuracy", "High detection rate", "Low failure rate"],
            "in_stock": True,
            "popular": False,
            "image": "https://images.unsplash.com/photo-1768776180013-5c33c9fd9ada?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "5",
            "name": "Pharmacogenomics Panel",
            "category": "Preventive Genomics",
            "sub_category": "Wellness",
            "description": "Personalized medication response analysis to optimize drug therapy and avoid adverse reactions - Saliva based test.",
            "sample_type": "Saliva",
            "turnaround_time": "2-3 weeks",
            "price": "₹9,999",
            "mrp": "₹12,999",
            "discount": "23% OFF",
            "features": ["150+ medications analyzed", "Lifetime validity", "Drug metabolism insights", "Personalized dosing recommendations"],
            "in_stock": True,
            "popular": True,
            "image": "https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "6",
            "name": "Gut Microbiome Test (16S rRNA Based)",
            "category": "Preventive Genomics",
            "sub_category": "Wellness",
            "description": "Comprehensive gut health analysis using 16S rRNA sequencing to understand your microbiome composition.",
            "sample_type": "Stool Sample",
            "turnaround_time": "3-4 weeks",
            "price": "₹10,000",
            "mrp": "₹13,000",
            "discount": "23% OFF",
            "features": ["Bacterial diversity analysis", "Gut health score", "Dietary recommendations", "Probiotic suggestions"],
            "in_stock": True,
            "popular": False,
            "image": "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "7",
            "name": "Comprehensive Gut Microbiome Test (Metagenomic)",
            "category": "Preventive Genomics",
            "sub_category": "Wellness",
            "description": "Advanced metagenomic shotgun sequencing for complete microbiome profiling including bacteria, fungi, and viruses.",
            "sample_type": "Stool Sample",
            "turnaround_time": "4-5 weeks",
            "price": "₹14,999",
            "mrp": "₹19,999",
            "discount": "25% OFF",
            "features": ["Complete microbiome profiling", "Bacteria, fungi & virus detection", "Functional gene analysis", "Personalized health insights"],
            "in_stock": True,
            "popular": True,
            "image": "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "8",
            "name": "Hereditary Cancer Panel",
            "category": "Clinical Genomics",
            "sub_category": "Oncology",
            "description": "Multi-gene panel testing for inherited cancer risk including BRCA1/2 and other cancer susceptibility genes.",
            "sample_type": "Blood/Saliva",
            "turnaround_time": "3-4 weeks",
            "price": "₹32,000",
            "mrp": "₹40,000",
            "discount": "20% OFF",
            "features": ["50+ cancer genes", "Risk assessment report", "Family screening guidance", "Free pre & post-test counseling"],
            "in_stock": True,
            "popular": False,
            "image": "https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "9",
            "name": "Cardiac Genetic Panel",
            "category": "Clinical Genomics",
            "sub_category": "Cardiology",
            "description": "Comprehensive testing for inherited cardiac conditions including cardiomyopathy and arrhythmia syndromes.",
            "sample_type": "Blood",
            "turnaround_time": "4-5 weeks",
            "price": "₹35,000",
            "mrp": "₹43,000",
            "discount": "19% OFF",
            "features": ["100+ cardiac genes", "Sudden death risk assessment", "Family cascade screening", "Treatment guidance"],
            "in_stock": True,
            "popular": False,
            "image": "https://images.unsplash.com/photo-1646441453885-86f3cbc260b4?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "10",
            "name": "Diabetes Risk Panel",
            "category": "Preventive Genomics",
            "sub_category": "Wellness",
            "description": "Genetic analysis for Type 2 diabetes risk, insulin resistance, and blood sugar metabolism.",
            "sample_type": "Saliva",
            "turnaround_time": "2-3 weeks",
            "price": "₹13,500",
            "mrp": "₹17,000",
            "discount": "21% OFF",
            "features": ["T2D genetic risk", "Insulin sensitivity genes", "Glucose metabolism", "Lifestyle recommendations"],
            "in_stock": True,
            "popular": False,
            "image": "https://images.unsplash.com/photo-1576169210859-6796c4b93c32?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "11",
            "name": "Carrier Screening Panel",
            "category": "Clinical Genomics",
            "sub_category": "Reproductive",
            "description": "Comprehensive screening for carrier status of 300+ genetic conditions before family planning.",
            "sample_type": "Blood/Saliva",
            "turnaround_time": "3-4 weeks",
            "price": "₹28,000",
            "mrp": "₹35,000",
            "discount": "20% OFF",
            "features": ["300+ genetic conditions", "Couple screening available", "Reproductive counseling", "Risk calculation for offspring"],
            "in_stock": True,
            "popular": False,
            "image": "https://images.unsplash.com/photo-1768776180013-5c33c9fd9ada?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "12",
            "name": "Nutrigenomics Test",
            "category": "Preventive Genomics",
            "sub_category": "Nutrition",
            "description": "DNA-based nutrition and fitness insights for personalized diet and exercise recommendations.",
            "sample_type": "Saliva",
            "turnaround_time": "2-3 weeks",
            "price": "₹15,000",
            "mrp": "₹18,000",
            "discount": "17% OFF",
            "features": ["Macronutrient metabolism", "Vitamin sensitivities", "Exercise response", "Weight management insights"],
            "in_stock": True,
            "popular": False,
            "image": "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=400",
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.tests.insert_many(tests_data)
    
    # Seed Coupons
    coupons_data = [
        {
            "code": "MYGENE5",
            "discount": 5,
            "type": "percentage",
            "description": "Get 5% off on your order",
            "active": True,
            "min_order_value": 0,
            "max_discount": 5000
        },
        {
            "code": "MYGENE10",
            "discount": 10,
            "type": "percentage",
            "description": "Get 10% off on your order",
            "active": True,
            "min_order_value": 15000,
            "max_discount": 10000
        },
        {
            "code": "FIRSTORDER",
            "discount": 15,
            "type": "percentage",
            "description": "15% off on your first order!",
            "active": True,
            "min_order_value": 10000,
            "max_discount": 7500
        }
    ]
    await db.coupons.insert_many(coupons_data)
    
    # Seed Blog Posts
    blog_posts_data = [
        {
            "id": "1",
            "title": "Understanding Preventive Genomics: Your Guide to Proactive Health",
            "excerpt": "Discover how preventive genomics can help you make informed health decisions before symptoms appear.",
            "content": "",
            "category": "Preventive Genomics",
            "date": "March 15, 2024",
            "read_time": "5 min read",
            "image": "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800",
            "slug": "understanding-preventive-genomics",
            "published": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "2",
            "title": "NIPT Testing: Everything You Need to Know During Pregnancy",
            "excerpt": "Learn about non-invasive prenatal testing and how it can provide peace of mind during pregnancy.",
            "content": "",
            "category": "Prenatal Testing",
            "date": "March 10, 2024",
            "read_time": "7 min read",
            "image": "https://images.unsplash.com/photo-1584515933487-779824d29309?w=800",
            "slug": "nipt-testing-guide",
            "published": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        },
        {
            "id": "3",
            "title": "The Importance of Pre-Test Genetic Counseling",
            "excerpt": "Why professional counseling before genetic testing is crucial for understanding your results.",
            "content": "",
            "category": "Genetic Counseling",
            "date": "March 5, 2024",
            "read_time": "6 min read",
            "image": "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?w=800",
            "slug": "importance-genetic-counseling",
            "published": True,
            "created_at": datetime.now(timezone.utc).isoformat()
        }
    ]
    await db.blog_posts.insert_many(blog_posts_data)
    
    # Seed Health Categories
    health_categories_data = [
        {
            "id": "1",
            "name": "Cancer Genomics",
            "description": "Hereditary cancer risk & treatment guidance",
            "image": "https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?w=600",
            "tests": ["Hereditary Cancer Panel", "Whole Exome Sequencing"]
        },
        {
            "id": "2",
            "name": "Heart Health",
            "description": "Cardiac genetic testing & risk assessment",
            "image": "https://images.unsplash.com/photo-1646441453885-86f3cbc260b4?w=600",
            "tests": ["Cardiac Genetic Panel"]
        },
        {
            "id": "3",
            "name": "Pregnancy & Prenatal",
            "description": "Non-invasive prenatal testing",
            "image": "https://images.unsplash.com/photo-1768776180013-5c33c9fd9ada?w=600",
            "tests": ["NIPT", "NIPT Advanced", "Carrier Screening"]
        },
        {
            "id": "4",
            "name": "Diabetes & Metabolism",
            "description": "Genetic risk & lifestyle optimization",
            "image": "https://images.unsplash.com/photo-1576169210859-6796c4b93c32?w=600",
            "tests": ["Diabetes Risk Panel", "Nutrigenomics"]
        },
        {
            "id": "5",
            "name": "Pharmacogenomics",
            "description": "Personalized medication response",
            "image": "https://images.unsplash.com/photo-1576671081803-5dcb9836dc61?w=600",
            "tests": ["Pharmacogenomics Panel"]
        },
        {
            "id": "6",
            "name": "Wellness & Prevention",
            "description": "Gut health & nutritional genomics",
            "image": "https://images.unsplash.com/photo-1578496480240-32d3e0c04525?w=600",
            "tests": ["Gut Microbiome Test", "Comprehensive Gut Microbiome", "Nutrigenomics"]
        }
    ]
    await db.health_categories.insert_many(health_categories_data)
    
    # Seed Testimonials
    testimonials_data = [
        {
            "id": "1",
            "name": "Dr. Priya Sharma",
            "role": "Cardiologist",
            "image": "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=200",
            "quote": "MyGenePortal's comprehensive genetic testing has been invaluable for my patients. The detailed reports and expert counseling make a real difference in preventive care."
        },
        {
            "id": "2",
            "name": "Rajesh Kumar",
            "role": "Fitness Entrepreneur",
            "image": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
            "quote": "The pharmacogenomics test helped me understand my body's response to medications. Game-changer for personalized health optimization!"
        },
        {
            "id": "3",
            "name": "Ananya Desai",
            "role": "Health & Wellness Coach",
            "image": "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200",
            "quote": "Fast shipping, great packaging, and the genetic counseling session was incredibly informative. Highly recommend MyGenePortal to all my clients."
        },
        {
            "id": "4",
            "name": "Vikram Singh",
            "role": "IT Professional",
            "image": "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200",
            "quote": "Outstanding customer support and comprehensive genetic insights. The gut microbiome test gave me actionable recommendations that truly work."
        }
    ]
    await db.testimonials.insert_many(testimonials_data)
    
    return {"message": "Data seeded successfully", "tests": len(tests_data), "coupons": len(coupons_data), "blog_posts": len(blog_posts_data)}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
