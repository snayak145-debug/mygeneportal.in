import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Award, Clock, MessageCircle } from 'lucide-react';
import { testsAPI, blogAPI, testimonialsAPI, categoriesAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';
import { EnquiryModal } from '../components/EnquiryModal';
import '../styles/genomics.css';

export const Home = () => {
  const [featuredTests, setFeaturedTests] = useState([]);
  const [latestBlogs, setLatestBlogs] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [healthCategories, setHealthCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [testsData, blogsData, testimonialsData, categoriesData] = await Promise.all([
          testsAPI.getAll({ popular: true }),
          blogAPI.getAll(),
          testimonialsAPI.getAll(),
          categoriesAPI.getAll(),
        ]);
        
        // Transform API data to match frontend format
        const transformedTests = testsData.slice(0, 3).map(test => ({
          ...test,
          subCategory: test.sub_category,
          sampleType: test.sample_type,
          turnaroundTime: test.turnaround_time,
          inStock: test.in_stock,
        }));
        
        setFeaturedTests(transformedTests);
        setLatestBlogs(blogsData.slice(0, 3));
        setTestimonials(testimonialsData);
        setHealthCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast({
          title: "Error",
          description: "Failed to load data. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [toast]);

  const handleAddToCart = (test) => {
    addToCart(test);
    toast({
      title: "Added to Cart!",
      description: `${test.name} has been added to your cart.`,
    });
  };

  const handleEnquireClick = (testName = '') => {
    setSelectedTest(testName);
    setEnquiryModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <EnquiryModal 
        isOpen={enquiryModalOpen} 
        onClose={() => setEnquiryModalOpen(false)}
        testName={selectedTest}
      />
      
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-badge">
            <Shield size={16} />
            <span>Trusted by 1000+ Patients | NABL & CAP Accredited Labs</span>
          </div>
          <h1 className="heading-hero hero-title">
            Know Yourself. Transform Your Health.
          </h1>
          <p className="body-large hero-subtitle">
            At MyGenePortal, we help you understand yourself better through reliable, DNA-based insights for comprehensive health and wellness. Our easy-to-use at-home DNA tests provide personalized insights tailored just for you, analyzed in secure NABL & CAP accredited labs with certified genetic counselor support.
          </p>
          <div className="hero-cta">
            <Link to="/booking" className="btn-primary" onClick={scrollToTop}>
              Book Free Pre-Test Counseling
              <ArrowRight size={20} />
            </Link>
            <button
              onClick={() => handleEnquireClick('')}
              className="btn-secondary"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Enquire Now
            </button>
          </div>
        </div>
      </section>

      {/* Getting Started - Process Flow */}
      <section className="section section-white">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Getting Started</h2>
            <p className="body-large">
              Start your wellness journey with these simple steps
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'var(--light-blue)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--primary-blue)'
              }}>1</div>
              <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>Order & Activate</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Explore our products and choose the one that fits your needs. Place your order and easily register online to activate your profile.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'var(--light-blue)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--primary-blue)'
              }}>2</div>
              <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>Collect Sample at Home</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Open the kit and follow the instructions to provide your saliva or stool sample—all from the comfort of your home.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'var(--light-blue)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--primary-blue)'
              }}>3</div>
              <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>Send Us Your Sample</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Seal your collected sample securely and return it to us using our prepaid courier service for testing.
              </p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                width: '80px', 
                height: '80px', 
                background: 'var(--light-blue)', 
                borderRadius: '50%', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                margin: '0 auto 1.5rem',
                fontSize: '2rem',
                fontWeight: '700',
                color: 'var(--primary-blue)'
              }}>4</div>
              <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>Genetic Consultation</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Once you receive your report, schedule a FREE genetic counseling session to understand your DNA insights better.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Health Categories - MapMyGenome Style */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Browse Tests by Health Category</h2>
            <p className="body-large">
              Find the right genetic test for your specific health concern
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {healthCategories.map((category) => (
              <Link
                key={category.id}
                to="/tests"
                onClick={scrollToTop}
                style={{
                  position: 'relative',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  height: '250px',
                  textDecoration: 'none',
                  display: 'block',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0))',
                  padding: '3rem 1.5rem 1.5rem',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' }}>
                    {category.name}
                  </h3>
                  <p style={{ fontSize: '0.875rem', opacity: 0.9 }}>
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Signals */}
      <section className="section section-light">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', textAlign: 'center' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--light-cyan)', padding: '1rem', borderRadius: '50%' }}>
                  <Shield size={32} color="var(--primary-teal)" />
                </div>
              </div>
              <h3 className="heading-3">NABL & CAP Accredited</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Partner with India's top NABL & CAP accredited genomics labs
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--light-cyan)', padding: '1rem', borderRadius: '50%' }}>
                  <Users size={32} color="var(--primary-teal)" />
                </div>
              </div>
              <h3 className="heading-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                Expert Counseling
                <Award size={20} color="var(--warning-orange)" />
              </h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Certified Board Genetic Counsellors guide you through every step
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--light-cyan)', padding: '1rem', borderRadius: '50%' }}>
                  <Award size={32} color="var(--primary-teal)" />
                </div>
              </div>
              <h3 className="heading-3">Comprehensive Tests</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Clinical & preventive genomics testing for all health needs
              </p>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--light-cyan)', padding: '1rem', borderRadius: '50%' }}>
                  <Clock size={32} color="var(--primary-teal)" />
                </div>
              </div>
              <h3 className="heading-3">Fast Results</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Quick turnaround with detailed report interpretation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Tests */}
      <section className="section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Popular Tests</span>
            <h2 className="heading-1">Featured Genomic Tests</h2>
            <p className="body-large">
              Explore our most sought-after genetic testing services backed by expert counseling
            </p>
          </div>
          <div className="test-grid">
            {featuredTests.map((test) => (
              <div key={test.id} className="test-card">
                <span className="test-category">{test.subCategory}</span>
                <h3 className="test-name">{test.name}</h3>
                <p className="test-description">{test.description}</p>
                <div className="test-meta">
                  <div>Sample: {test.sampleType}</div>
                  <div>Results: {test.turnaroundTime}</div>
                </div>
                <div className="test-price">{test.price}</div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => handleAddToCart(test)}
                    className="btn-primary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleEnquireClick(test.name)}
                    className="btn-secondary"
                    style={{ flex: 1, justifyContent: 'center' }}
                  >
                    Enquire
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/tests" className="btn-primary" onClick={scrollToTop}>
              View All Tests
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Pre-Test Counseling CTA */}
      <section className="section section-light">
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-teal) 100%)',
            borderRadius: '1.5rem',
            overflow: 'hidden',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            alignItems: 'center'
          }}>
            <div style={{ padding: '4rem 2rem', color: 'white' }}>
              <h2 className="heading-1" style={{ color: 'white', marginBottom: '1rem' }}>
                Why Pre-Test Counseling Matters
              </h2>
              <p className="body-large" style={{ marginBottom: '2rem', color: 'rgba(255, 255, 255, 0.9)' }}>
                Genetic testing is complex. Our expert counselors help you understand which test is right for you, what results mean, and how they impact your health decisions. Get personalized guidance before and after testing.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <Link to="/services" className="btn-primary" onClick={scrollToTop}>
                  Learn About Our Services
                </Link>
                <button
                  onClick={() => handleEnquireClick('Pre-Test Counseling')}
                  className="btn-secondary"
                >
                  Get Counseling Now
                </button>
              </div>
            </div>
            <div style={{ height: '100%', minHeight: '400px' }}>
              <img 
                src="https://static.prod-images.emergentagent.com/jobs/e3fc99b8-330b-4f00-a6ae-9010e2661f37/images/bade748c5e64e51975acf361eac316204f776b212cef97818619031866ecf403.png" 
                alt="Genetic counselor consulting with pregnant patient"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials - MapMyGenome Style */}
      <section className="section section-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Hear From Our Happy Customers</h2>
            <p className="body-large">
              Discover how MyGenePortal is making a meaningful difference in people's lives
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--border-color)',
                  textAlign: 'center',
                  transition: 'all 0.3s ease'
                }}
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    margin: '0 auto 1.5rem',
                    border: '3px solid var(--light-blue)'
                  }}
                />
                <p style={{
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  marginBottom: '1.5rem',
                  lineHeight: '1.7'
                }}>
                  "{testimonial.quote}"
                </p>
                <h4 className="heading-3" style={{ marginBottom: '0.25rem', fontSize: '1.125rem' }}>
                  {testimonial.name}
                </h4>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  {testimonial.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="section section-gray">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Knowledge Hub</span>
            <h2 className="heading-1">Latest from Our Blog</h2>
            <p className="body-large">
              Stay informed with the latest insights on genomics and preventive health
            </p>
          </div>
          <div className="blog-grid">
            {latestBlogs.map((post) => (
              <div key={post.id} className="blog-card">
                <img src={post.image} alt={post.title} className="blog-image" />
                <div className="blog-content">
                  <div className="blog-meta">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <Link
                    to="/blog"
                    style={{
                      color: 'var(--primary-teal)',
                      fontWeight: '600',
                      textDecoration: 'none',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginTop: '1rem'
                    }}
                    onClick={scrollToTop}
                  >
                    Read More <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <Link to="/blog" className="btn-primary" onClick={scrollToTop}>
              View All Articles
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
