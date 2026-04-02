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

          {/* NABL & CAP Accredited Labs */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: '1rem 1.5rem',
            borderRadius: '0.75rem',
            border: '2px solid rgba(255, 255, 255, 0.2)'
          }}>
            <ShieldCheck size={32} color="#D4AF37" />
            <div>
              <div style={{ fontWeight: '700', fontSize: '0.875rem', color: 'white' }}>
                NABL & CAP ACCREDITED
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            {/* DNA Helix SVG Icon */}
            <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="dnaGradientFooter" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D4AF37"/>
                  <stop offset="100%" stopColor="#E8D5B7"/>
                </linearGradient>
              </defs>
              <path d="M25 10 Q50 25, 75 10 Q50 25, 25 40 Q50 55, 75 40 Q50 55, 25 70 Q50 85, 75 70 Q50 85, 25 90" 
                    stroke="url(#dnaGradientFooter)" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <path d="M75 10 Q50 25, 25 10 Q50 25, 75 40 Q50 55, 25 40 Q50 55, 75 70 Q50 85, 25 70 Q50 85, 75 90" 
                    stroke="url(#dnaGradientFooter)" strokeWidth="4" fill="none" strokeLinecap="round"/>
              <line x1="30" y1="25" x2="70" y2="25" stroke="#D4AF37" strokeWidth="2" opacity="0.6"/>
              <line x1="30" y1="50" x2="70" y2="50" stroke="#D4AF37" strokeWidth="2" opacity="0.6"/>
              <line x1="30" y1="75" x2="70" y2="75" stroke="#D4AF37" strokeWidth="2" opacity="0.6"/>
            </svg>
            <div>
              <h3 style={{ margin: 0, color: 'white' }}>MyGene<span style={{ color: '#D4AF37' }}>Portal</span></h3>
              <span style={{ fontSize: '0.65rem', color: 'rgba(212, 175, 55, 0.8)', letterSpacing: '1.5px', textTransform: 'uppercase' }}>Precision Genomics</span>
            </div>
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
        <p>&copy; {new Date().getFullYear()} MyGenePortal.in - All rights reserved. | NABL & CAP Accredited Partner Labs</p>
      </div>
    </footer>
  );
};
