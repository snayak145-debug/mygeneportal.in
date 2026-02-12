import React, { useState } from 'react';
import { CheckCircle, Clock, Video, Award } from 'lucide-react';
import { services } from '../mockData';
import { Link } from 'react-router-dom';
import { EnquiryModal } from '../components/EnquiryModal';
import '../styles/genomics.css';

export const Services = () => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState('');

  const handleEnquireClick = (serviceName) => {
    setSelectedService(serviceName);
    setEnquiryModalOpen(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      <EnquiryModal 
        isOpen={enquiryModalOpen} 
        onClose={() => setEnquiryModalOpen(false)}
        testName={selectedService}
      />
      
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-teal) 100%)',
        padding: '5rem 1.5rem 3rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <span className="hero-badge">Our Expertise</span>
          <h1 className="heading-hero" style={{ color: 'white', marginBottom: '1rem' }}>
            Expert Genetic Services
          </h1>
          <p className="body-large" style={{ maxWidth: '800px', margin: '0 auto', color: 'rgba(255, 255, 255, 0.9)' }}>
            Comprehensive pre-test counseling and genetic report interpretation by Certified Board Genetic Counsellors. We guide you through every step of your genetic testing journey.
          </p>
        </div>
      </section>

      {/* Services Detail */}
      <section className="section section-light">
        <div className="container">
          {services.map((service, index) => (
            <div
              key={service.id}
              style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '3rem 2rem',
                marginBottom: '2rem',
                border: '1px solid var(--border-color)',
                display: 'grid',
                gridTemplateColumns: index % 2 === 0 ? '1fr' : '1fr',
                gap: '2rem'
              }}
            >
              <div>
                <h2 className="heading-2" style={{ marginBottom: '1rem' }}>{service.title}</h2>
                <p className="body-large" style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                  {service.description}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                  <div style={{
                    background: 'var(--bg-light)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <Clock size={24} color="var(--primary-teal)" />
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Duration</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{service.duration}</div>
                    </div>
                  </div>
                  <div style={{
                    background: 'var(--bg-light)',
                    padding: '1.5rem',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem'
                  }}>
                    <Video size={24} color="var(--primary-teal)" />
                    <div>
                      <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>Mode</div>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{service.mode}</div>
                    </div>
                  </div>
                </div>

                <h3 className="heading-3" style={{ marginBottom: '1rem' }}>What's Included:</h3>
                <ul style={{ display: 'grid', gap: '0.75rem' }}>
                  {service.features.map((feature, idx) => (
                    <li key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                      <CheckCircle size={20} color="var(--success-green)" style={{ flexShrink: 0, marginTop: '0.125rem' }} />
                      <span className="body-medium">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                  <Link to="/booking" className="btn-primary" onClick={scrollToTop}>
                    Book This Service
                  </Link>
                  <button
                    onClick={() => handleEnquireClick(service.title)}
                    className="btn-secondary"
                  >
                    Ask Questions
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section section-gray">
        <div className="container">
          <div className="section-header">
            <h2 className="heading-1">Why Choose MyGenePortal</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
              <h3 className="heading-3" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Expert Qualifications
                <Award size={20} color="var(--warning-orange)" />
              </h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Our genetic counselors are Certified Board Genetic Counsellors with specialized training in clinical genomics and genetic counseling, certified by the Board of Genetic Counseling, India (BGCI).
              </p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
              <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Personalized Approach</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Every patient receives individualized attention with counseling sessions tailored to their specific health concerns and family history.
              </p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
              <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Accredited Lab Network</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Exclusive partnerships with NABL and CAP accredited genomics labs across India ensure highest quality testing standards.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
