# MyGenePortal - Product Requirements Document

## Overview
MyGenePortal (mygeneportal.in) is a comprehensive genomics testing platform that provides Direct-to-Consumer (DTC) and clinical genomic testing services with expert genetic counseling.

## Problem Statement
Build a professional genomics testing e-commerce platform inspired by mapmygenome.in, enabling users to browse tests, add them to cart, apply coupon codes, purchase online, track samples, and submit enquiries for genetic counseling.

## Core Features

### Implemented Features
1. **E-commerce Engine**
   - Test catalog with 12 genomic tests (WES, WGS, NIPT, Cancer panels, etc.)
   - Shopping cart with quantity management
   - Coupon code system (MYGENE5, MYGENE10, FIRSTORDER)
   - Checkout flow with order creation

2. **Lead Generation**
   - Enquiry modal for test inquiries
   - Contact form for general inquiries
   - Lead capture with preferred date/time for counseling

3. **Sample Tracking**
   - Order tracking by MGP tracking ID
   - Status timeline with stages (Kit Dispatched → Testing → Report Delivered)

4. **Content Pages**
   - Home page with featured tests, testimonials, health categories
   - Test catalog with filtering by category/specialty
   - Blog/Resources page
   - About Us page
   - Services page
   - Contact page
   - Test Comparison page

5. **Trust & Branding**
   - NABL & CAP accreditation badges
   - BGCI certified genetic counselor badge
   - MyGenePortal logo integration
   - WhatsApp floating button

## Technical Architecture

### Backend (FastAPI)
- **Framework:** FastAPI with async MongoDB (motor)
- **Database:** MongoDB
- **Port:** 8001 (internal), exposed via /api prefix

### Frontend (React)
- **Framework:** React 18 with React Router
- **UI Components:** Shadcn UI + custom CSS
- **State Management:** React Context (CartContext)
- **Port:** 3000

### API Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| /api/tests | GET | Get all genomic tests |
| /api/tests/{id} | GET | Get test by ID |
| /api/leads | POST | Create new lead/enquiry |
| /api/orders | POST | Create new order |
| /api/orders | GET | Get orders (by email) |
| /api/verify-coupon | POST | Verify and calculate coupon discount |
| /api/track-sample/{id} | GET | Track sample status |
| /api/blog | GET | Get blog posts |
| /api/health-categories | GET | Get health categories |
| /api/testimonials | GET | Get testimonials |
| /api/seed-data | POST | Seed initial data |

### Database Schema
- **tests:** name, category, price, features, sample_type, turnaround_time
- **orders:** customer_info, items, totals, tracking_id, status
- **leads:** name, email, mobile, test_of_interest, preferred_date/time
- **blog_posts:** title, excerpt, content, category, image
- **coupons:** code, discount, type, min_order_value, max_discount
- **sample_tracking:** tracking_id, timeline, current_status

## Current Status
- **Backend:** Fully implemented with all APIs working
- **Frontend:** Integrated with backend APIs
- **Testing:** 24/24 backend tests passed, frontend verified

## Pending Tasks (P0 - High Priority)
1. **Razorpay Payment Integration**
   - Integrate payment gateway for checkout
   - Payment confirmation and order status update

## Future Tasks (P1-P3)
1. **Blog Content Creation (P1)**
   - Write detailed articles for WES, NIPT, Gut Microbiome
   - SEO optimization

2. **Doctor's Portal (P2)**
   - Secure login for physicians
   - Patient referral system
   - Report download

3. **FAQ Section (P2)**
   - Comprehensive FAQ page

4. **Enhanced Content (P3)**
   - About Us page with detailed content
   - Partner Labs information

## Test Credentials
- **Coupon Codes:** MYGENE5 (5% off), MYGENE10 (10% off, min ₹15k), FIRSTORDER (15% off, min ₹10k)
- **Sample Tracking IDs:** MGP341FA77B (test order)

## Preview URL
https://mygene-launch.preview.emergentagent.com
