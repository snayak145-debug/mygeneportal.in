import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Award, Clock, MessageCircle } from 'lucide-react';
import { genomicTests, blogPosts } from '../mockData';
import { useCart } from '../context/CartContext';
import { useToast } from '../hooks/use-toast';
import { EnquiryModal } from '../components/EnquiryModal';
import '../styles/genomics.css';

export const Home = () => {
  const featuredTests = genomicTests.filter(test => test.popular).slice(0, 3);
  const latestBlogs = blogPosts.slice(0, 3);
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedTest, setSelectedTest] = useState('');

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
            <span>Trusted by 1000+ Patients | NABL Accredited Labs</span>
          </div>
          <h1 className="heading-hero hero-title">
            Know Yourself. Transform Your Health.
          </h1>
          <p className="body-large hero-subtitle">
            At MyGenePortal, we help you understand yourself better through reliable, DNA-based insights for comprehensive health and wellness. Our easy-to-use at-home DNA tests provide personalized insights tailored just for you, analyzed in secure NABL-accredited labs with certified genetic counselor support.
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
              <h3 className="heading-3">NABL Accredited</h3>
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
                src="https://images.unsplash.com/photo-1739285388427-d6f85d12a8fc" 
                alt="Genetic counselor consulting with patient"
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
