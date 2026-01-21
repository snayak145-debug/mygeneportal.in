import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, Mail, MapPin, Award, ShieldCheck } from 'lucide-react';
import '../styles/genomics.css';

export const Footer = () => {
  return (
    <footer className="genomics-footer">
      {/* Certification Badges Section */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        padding: '2rem 1.5rem'
      }}>
        <div style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '2rem'
        }}>
          {/* BGCI Certification */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <Award size={32} color="#FFD700" />
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.875rem', color: 'white' }}>
                BGCI CERTIFIED
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                Board of Genetic Counseling, India
              </div>
            </div>
          </div>

          {/* NABL Accredited Labs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <ShieldCheck size={32} color="#00D4FF" />
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.875rem', color: 'white' }}>
                NABL ACCREDITED
              </div>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.8)' }}>
                Partner Laboratory Network
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div className="footer-section">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Activity size={24} />
            <h3 style={{ margin: 0 }}>MyGenePortal</h3>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', lineHeight: '1.6' }}>
            Your trusted partner for comprehensive genomic testing and expert genetic counseling services across India.
          </p>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/tests">Browse Tests</Link></li>
            <li><Link to="/services">Our Services</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/blog">Blog & Resources</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Test Categories</h3>
          <ul>
            <li><Link to="/tests?category=oncology">Cancer Genomics</Link></li>
            <li><Link to="/tests?category=prenatal">Prenatal Testing</Link></li>
            <li><Link to="/tests?category=wellness">Preventive Wellness</Link></li>
            <li><Link to="/tests?category=nutrition">Nutrigenomics</Link></li>
            <li><Link to="/tests?category=neurology">Neurogenetics</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Contact Us</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Mail size={16} />
              <a href="mailto:info@mygeneportal.in">info@mygeneportal.in</a>
            </li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
              <MapPin size={16} style={{ marginTop: '0.25rem' }} />
              <span style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Bangalore, Karnataka, India</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} MyGenePortal.in - All rights reserved. | NABL Accredited Partner Labs</p>
      </div>
    </footer>
  );
};
