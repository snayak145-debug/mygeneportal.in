"""
MyGenePortal Backend API Tests
Tests for genomic testing platform - Tests API, Coupons, Leads, Orders, Sample Tracking
"""
import pytest
import requests
import os
import uuid
from datetime import datetime

# Base URL from environment
BASE_URL = os.environ.get('REACT_APP_BACKEND_URL', '').rstrip('/')

class TestHealthCheck:
    """Health check and API availability tests"""
    
    def test_api_root(self):
        """Test API root endpoint"""
        response = requests.get(f"{BASE_URL}/api/")
        assert response.status_code == 200
        data = response.json()
        assert "message" in data
        assert "MyGenePortal" in data["message"]
        print(f"✓ API root returns: {data}")
    
    def test_health_endpoint(self):
        """Test health check endpoint"""
        response = requests.get(f"{BASE_URL}/api/health")
        assert response.status_code == 200
        data = response.json()
        assert data["status"] == "healthy"
        assert "timestamp" in data
        print(f"✓ Health check: {data}")


class TestTestsAPI:
    """Tests for the genomic tests catalog API"""
    
    def test_get_all_tests(self):
        """GET /api/tests - should return 12 genomic tests"""
        response = requests.get(f"{BASE_URL}/api/tests")
        assert response.status_code == 200
        tests = response.json()
        assert isinstance(tests, list)
        assert len(tests) == 12, f"Expected 12 tests, got {len(tests)}"
        print(f"✓ GET /api/tests returns {len(tests)} tests")
        
        # Validate test structure
        for test in tests[:3]:
            assert "id" in test
            assert "name" in test
            assert "category" in test
            assert "price" in test
            assert "features" in test
            print(f"  - Test: {test['name']} ({test['category']})")
    
    def test_get_popular_tests(self):
        """GET /api/tests?popular=true - should return popular tests"""
        response = requests.get(f"{BASE_URL}/api/tests?popular=true")
        assert response.status_code == 200
        tests = response.json()
        assert isinstance(tests, list)
        assert len(tests) > 0, "Should have at least one popular test"
        for test in tests:
            assert test["popular"] == True, f"Test {test['name']} should be popular"
        print(f"✓ Found {len(tests)} popular tests")
    
    def test_get_tests_by_category(self):
        """GET /api/tests?category=Clinical Genomics"""
        response = requests.get(f"{BASE_URL}/api/tests?category=Clinical Genomics")
        assert response.status_code == 200
        tests = response.json()
        assert isinstance(tests, list)
        assert len(tests) > 0, "Should have clinical genomics tests"
        for test in tests:
            assert test["category"] == "Clinical Genomics"
        print(f"✓ Found {len(tests)} Clinical Genomics tests")
    
    def test_get_single_test(self):
        """GET /api/tests/1 - get specific test by ID"""
        response = requests.get(f"{BASE_URL}/api/tests/1")
        assert response.status_code == 200
        test = response.json()
        assert test["id"] == "1"
        assert "name" in test
        assert "description" in test
        print(f"✓ GET /api/tests/1 returns: {test['name']}")
    
    def test_get_nonexistent_test(self):
        """GET /api/tests/nonexistent - should return 404"""
        response = requests.get(f"{BASE_URL}/api/tests/nonexistent123")
        assert response.status_code == 404
        print("✓ Nonexistent test correctly returns 404")


class TestCouponVerification:
    """Tests for coupon verification API"""
    
    def test_verify_mygene5_coupon(self):
        """POST /api/verify-coupon - MYGENE5 (5% off)"""
        response = requests.post(
            f"{BASE_URL}/api/verify-coupon",
            json={"code": "MYGENE5", "order_total": 20000}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == True
        assert data["discount_amount"] == 1000.0, "5% of 20000 = 1000"
        assert data["discount_type"] == "percentage"
        print(f"✓ MYGENE5 coupon: {data}")
    
    def test_verify_mygene10_coupon(self):
        """POST /api/verify-coupon - MYGENE10 (10% off, min ₹15000)"""
        response = requests.post(
            f"{BASE_URL}/api/verify-coupon",
            json={"code": "MYGENE10", "order_total": 20000}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == True
        assert data["discount_amount"] == 2000.0, "10% of 20000 = 2000"
        print(f"✓ MYGENE10 coupon: {data}")
    
    def test_mygene10_below_minimum(self):
        """POST /api/verify-coupon - MYGENE10 below min order value"""
        response = requests.post(
            f"{BASE_URL}/api/verify-coupon",
            json={"code": "MYGENE10", "order_total": 10000}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == False
        assert "Minimum order value" in data["message"]
        print(f"✓ MYGENE10 correctly rejected for low order: {data['message']}")
    
    def test_verify_firstorder_coupon(self):
        """POST /api/verify-coupon - FIRSTORDER (15% off, min ₹10000)"""
        response = requests.post(
            f"{BASE_URL}/api/verify-coupon",
            json={"code": "FIRSTORDER", "order_total": 15000}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == True
        assert data["discount_amount"] == 2250.0, "15% of 15000 = 2250"
        print(f"✓ FIRSTORDER coupon: {data}")
    
    def test_invalid_coupon(self):
        """POST /api/verify-coupon - invalid code"""
        response = requests.post(
            f"{BASE_URL}/api/verify-coupon",
            json={"code": "INVALIDCODE", "order_total": 20000}
        )
        assert response.status_code == 200
        data = response.json()
        assert data["valid"] == False
        assert "Invalid" in data["message"] or "expired" in data["message"]
        print(f"✓ Invalid coupon correctly rejected: {data['message']}")


class TestLeadsAPI:
    """Tests for lead generation/enquiry API"""
    
    def test_create_lead(self):
        """POST /api/leads - create new enquiry"""
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        lead_data = {
            "name": "TEST_Lead User",
            "email": unique_email,
            "mobile": "9876543210",
            "test_of_interest": "NIPT (Non-Invasive Prenatal Testing)",
            "preferred_date": "2026-02-15",
            "preferred_time": "10:00-11:00",
            "notes": "Automated test lead",
            "source": "website_test"
        }
        
        response = requests.post(f"{BASE_URL}/api/leads", json=lead_data)
        assert response.status_code == 201
        data = response.json()
        
        # Validate response
        assert data["name"] == lead_data["name"]
        assert data["email"] == unique_email
        assert data["mobile"] == lead_data["mobile"]
        assert data["test_of_interest"] == lead_data["test_of_interest"]
        assert "id" in data
        print(f"✓ Lead created: {data['id']} for {data['email']}")
        
        return data["id"]
    
    def test_get_all_leads(self):
        """GET /api/leads - retrieve all leads"""
        response = requests.get(f"{BASE_URL}/api/leads")
        assert response.status_code == 200
        leads = response.json()
        assert isinstance(leads, list)
        print(f"✓ GET /api/leads returns {len(leads)} leads")


class TestOrdersAPI:
    """Tests for order creation and retrieval API"""
    
    @pytest.fixture
    def test_order_data(self):
        """Generate unique test order data"""
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        return {
            "customer_name": "TEST_Order Customer",
            "customer_email": unique_email,
            "customer_mobile": "9876543210",
            "customer_address": "123 Test Street, Test Building",
            "customer_city": "Bangalore",
            "customer_state": "Karnataka",
            "customer_pincode": "560001",
            "items": [
                {
                    "test_id": "1",
                    "test_name": "Whole Exome Sequencing (WES)",
                    "price": "₹20,000",
                    "quantity": 1
                }
            ],
            "subtotal": 20000.0,
            "discount_amount": 0.0,
            "coupon_code": "",
            "total_amount": 20000.0
        }
    
    def test_create_order(self, test_order_data):
        """POST /api/orders - create new order with tracking ID"""
        response = requests.post(f"{BASE_URL}/api/orders", json=test_order_data)
        assert response.status_code == 201
        order = response.json()
        
        # Validate order structure
        assert "id" in order
        assert "tracking_id" in order
        assert order["tracking_id"].startswith("MGP"), f"Tracking ID should start with MGP, got {order['tracking_id']}"
        assert order["customer_name"] == test_order_data["customer_name"]
        assert order["customer_email"] == test_order_data["customer_email"]
        assert order["total_amount"] == test_order_data["total_amount"]
        assert len(order["items"]) == 1
        
        print(f"✓ Order created: {order['id']}")
        print(f"  Tracking ID: {order['tracking_id']}")
        
        return order
    
    def test_get_all_orders(self):
        """GET /api/orders - retrieve all orders"""
        response = requests.get(f"{BASE_URL}/api/orders")
        assert response.status_code == 200
        orders = response.json()
        assert isinstance(orders, list)
        print(f"✓ GET /api/orders returns {len(orders)} orders")
    
    def test_order_creates_sample_tracking(self, test_order_data):
        """Verify order creation also creates sample tracking entry"""
        # Create order
        response = requests.post(f"{BASE_URL}/api/orders", json=test_order_data)
        assert response.status_code == 201
        order = response.json()
        tracking_id = order["tracking_id"]
        
        # Verify tracking entry was created
        tracking_response = requests.get(f"{BASE_URL}/api/track-sample/{tracking_id}")
        assert tracking_response.status_code == 200
        tracking = tracking_response.json()
        
        assert tracking["tracking_id"] == tracking_id
        assert tracking["test_name"] == test_order_data["items"][0]["test_name"]
        assert tracking["customer_name"] == test_order_data["customer_name"]
        assert len(tracking["timeline"]) >= 1
        print(f"✓ Sample tracking created for order {tracking_id}")


class TestSampleTrackingAPI:
    """Tests for sample tracking API"""
    
    def test_track_nonexistent_sample(self):
        """GET /api/track-sample/INVALID - should return 404"""
        response = requests.get(f"{BASE_URL}/api/track-sample/INVALID123")
        assert response.status_code == 404
        print("✓ Nonexistent tracking ID correctly returns 404")
    
    def test_track_existing_sample(self):
        """Test tracking with a newly created order's tracking ID"""
        # First create an order to get a valid tracking ID
        unique_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
        order_data = {
            "customer_name": "TEST_Track User",
            "customer_email": unique_email,
            "customer_mobile": "9876543210",
            "customer_address": "Test Address",
            "customer_city": "Mumbai",
            "customer_state": "Maharashtra",
            "customer_pincode": "400001",
            "items": [{"test_id": "3", "test_name": "NIPT Test", "price": "₹12,000", "quantity": 1}],
            "subtotal": 12000.0,
            "discount_amount": 0.0,
            "coupon_code": "",
            "total_amount": 12000.0
        }
        
        create_response = requests.post(f"{BASE_URL}/api/orders", json=order_data)
        assert create_response.status_code == 201
        order = create_response.json()
        tracking_id = order["tracking_id"]
        
        # Now track the sample
        response = requests.get(f"{BASE_URL}/api/track-sample/{tracking_id}")
        assert response.status_code == 200
        tracking = response.json()
        
        assert tracking["tracking_id"] == tracking_id
        assert "timeline" in tracking
        assert "current_status" in tracking
        assert "estimated_completion" in tracking
        print(f"✓ Sample tracking works for {tracking_id}: {tracking['current_status']}")


class TestBlogAPI:
    """Tests for blog posts API"""
    
    def test_get_all_blog_posts(self):
        """GET /api/blog - retrieve all blog posts"""
        response = requests.get(f"{BASE_URL}/api/blog")
        assert response.status_code == 200
        posts = response.json()
        assert isinstance(posts, list)
        assert len(posts) >= 1, "Should have at least one blog post"
        
        # Validate structure
        for post in posts:
            assert "id" in post
            assert "title" in post
            assert "excerpt" in post
            assert "category" in post
        
        print(f"✓ GET /api/blog returns {len(posts)} posts")
        for post in posts[:3]:
            print(f"  - {post['title']}")
    
    def test_get_single_blog_post(self):
        """GET /api/blog/1 - get specific post"""
        response = requests.get(f"{BASE_URL}/api/blog/1")
        assert response.status_code == 200
        post = response.json()
        assert post["id"] == "1"
        assert "title" in post
        print(f"✓ GET /api/blog/1 returns: {post['title']}")


class TestHealthCategoriesAPI:
    """Tests for health categories API"""
    
    def test_get_health_categories(self):
        """GET /api/health-categories"""
        response = requests.get(f"{BASE_URL}/api/health-categories")
        assert response.status_code == 200
        categories = response.json()
        assert isinstance(categories, list)
        assert len(categories) >= 1, "Should have health categories"
        print(f"✓ GET /api/health-categories returns {len(categories)} categories")


class TestTestimonialsAPI:
    """Tests for testimonials API"""
    
    def test_get_testimonials(self):
        """GET /api/testimonials"""
        response = requests.get(f"{BASE_URL}/api/testimonials")
        assert response.status_code == 200
        testimonials = response.json()
        assert isinstance(testimonials, list)
        assert len(testimonials) >= 1, "Should have testimonials"
        print(f"✓ GET /api/testimonials returns {len(testimonials)} testimonials")


class TestCouponsAPI:
    """Tests for coupons listing API"""
    
    def test_get_active_coupons(self):
        """GET /api/coupons - retrieve all active coupons"""
        response = requests.get(f"{BASE_URL}/api/coupons")
        assert response.status_code == 200
        coupons = response.json()
        assert isinstance(coupons, list)
        assert len(coupons) >= 3, "Should have at least 3 coupons (MYGENE5, MYGENE10, FIRSTORDER)"
        
        coupon_codes = [c["code"] for c in coupons]
        assert "MYGENE5" in coupon_codes
        assert "MYGENE10" in coupon_codes
        assert "FIRSTORDER" in coupon_codes
        print(f"✓ GET /api/coupons returns {len(coupons)} active coupons: {coupon_codes}")


if __name__ == "__main__":
    pytest.main([__file__, "-v", "--tb=short"])
