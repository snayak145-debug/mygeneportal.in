import React from 'react';
import { GraduationCap, Award, Heart, Target } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/genomics.css';

export const About = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-teal) 100%)',
        padding: '5rem 1.5rem 3rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h1 className="heading-hero" style={{ color: 'white', marginBottom: '1rem' }}>
            About MyGenePortal
          </h1>
          <p className="body-large" style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255, 255, 255, 0.9)' }}>
            Empowering informed health decisions through expert genetic counseling and comprehensive genomic testing services across India.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="section section-light">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '1rem',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--light-cyan)', padding: '1.25rem', borderRadius: '50%' }}>
                  <Target size={36} color="var(--primary-teal)" />
                </div>
              </div>
              <h2 className="heading-2" style={{ marginBottom: '1rem' }}>Our Mission</h2>
              <p className="body-medium" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                To make genomic testing accessible and understandable for all Indians through expert pre-test counseling, partnering with accredited labs, and providing personalized genetic health insights.
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '1rem',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
                <div style={{ background: 'var(--light-cyan)', padding: '1.25rem', borderRadius: '50%' }}>
                  <Heart size={36} color="var(--primary-teal)" />
                </div>
              </div>
              <h2 className="heading-2" style={{ marginBottom: '1rem' }}>Our Vision</h2>
              <p className="body-medium" style={{ color: 'var(--text-secondary)', lineHeight: '1.7' }}>
                To be India's most trusted platform for preventive and clinical genomics, where every individual can access personalized genetic information to make proactive health decisions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Founder Story */}
      <section className="section section-gray">
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '3rem',
            alignItems: 'center'
          }}>
            <div>
              <span className="section-badge">Our Founder</span>
              <h2 className="heading-1" style={{ marginBottom: '1rem' }}>Expert Background</h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Award size={24} color="var(--primary-teal)" />
                <span className="body-large" style={{ fontWeight: '600', color: 'var(--text-primary)' }}>
                  Certified Board Genetic Counsellor (BGCI)
                </span>
              </div>
              <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                Certified by the Board of Genetic Counseling, India (BGCI) with advanced training in clinical genomics and years of experience, our founder recognized the critical gap in India's genetic testing landscape: the lack of expert pre-test counseling and personalized guidance.
              </p>
              <p className="body-medium" style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', lineHeight: '1.7' }}>
                MyGenePortal was founded to bridge this gap by providing comprehensive genetic counseling services alongside access to India's top NABL-accredited genomics laboratories.
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '2.5rem',
              borderRadius: '1rem',
              border: '1px solid var(--border-color)'
            }}>
              <h3 className="heading-3" style={{ marginBottom: '1.5rem' }}>Our Core Values</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Award size={24} color="var(--primary-teal)" style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Scientific Excellence</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      We partner only with NABL and CAP accredited labs to ensure highest quality genetic testing standards.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Heart size={24} color="var(--primary-teal)" style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Patient-Centered Care</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      Every patient receives personalized attention with counseling tailored to their unique health journey.
                    </p>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <Target size={24} color="var(--primary-teal)" style={{ flexShrink: 0 }} />
                  <div>
                    <h4 style={{ fontWeight: '600', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Transparency</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                      Clear communication about test options, costs, limitations, and what results truly mean for you.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section section-light">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">What Sets Us Apart</h2>
            <p className="body-large">
              More than just a testing service - we're your partner in understanding and utilizing genetic information
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
              <h3 className="heading-3" style={{ color: 'var(--primary-teal)', marginBottom: '1rem' }}>01</h3>
              <h4 className="heading-3" style={{ marginBottom: '0.75rem' }}>Pre-Test Counseling</h4>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Understand which test is right for you, what it can reveal, and implications before making a decision.
              </p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
              <h3 className="heading-3" style={{ color: 'var(--primary-teal)', marginBottom: '1rem' }}>02</h3>
              <h4 className="heading-3" style={{ marginBottom: '0.75rem' }}>Lab Coordination</h4>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Seamless coordination with India's top NABL-accredited genomics labs for sample collection and processing.
              </p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
              <h3 className="heading-3" style={{ color: 'var(--primary-teal)', marginBottom: '1rem' }}>03</h3>
              <h4 className="heading-3" style={{ marginBottom: '0.75rem' }}>Report Interpretation</h4>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Detailed explanation of your results with actionable health recommendations and specialist referrals.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section section-gray">
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-teal) 100%)',
            borderRadius: '1.5rem',
            padding: '4rem 2rem',
            textAlign: 'center',
            color: 'white'
          }}>
            <h2 className="heading-1" style={{ color: 'white', marginBottom: '1rem' }}>
              Ready to Start Your Genetic Health Journey?
            </h2>
            <p className="body-large" style={{ maxWidth: '800px', margin: '0 auto 2rem' }}>
              Book a free pre-test counseling session with our Certified Board Genetic Counsellors to discuss your genetic testing options and health goals.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center' }}>
              <Link to="/booking" className="btn-primary" onClick={scrollToTop}>
                Book Free Counseling
              </Link>
              <Link to="/tests" className="btn-secondary" onClick={scrollToTop}>
                Browse Tests
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
