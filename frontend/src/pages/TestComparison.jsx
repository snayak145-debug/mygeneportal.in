import React from 'react';
import { Check, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import '../styles/genomics.css';

export const TestComparison = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-light)' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-teal) 100%)',
        padding: '4rem 1.5rem 3rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <h1 className="heading-1" style={{ color: 'white', marginBottom: '1rem' }}>
            Preventive vs Clinical Genetic Testing
          </h1>
          <p className="body-large" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Understand the difference between wellness screening and diagnostic testing
          </p>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="section">
        <div className="container">
          <div style={{ overflowX: 'auto' }}>
            <table style={{
              width: '100%',
              background: 'white',
              borderRadius: '1rem',
              overflow: 'hidden',
              borderCollapse: 'separate',
              borderSpacing: 0
            }}>
              <thead>
                <tr style={{ background: 'var(--primary-blue)', color: 'white' }}>
                  <th style={{ padding: '1.5rem', textAlign: 'left', fontWeight: '600' }}>Feature</th>
                  <th style={{ padding: '1.5rem', textAlign: 'center', fontWeight: '600', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>Preventive / Wellness</th>
                  <th style={{ padding: '1.5rem', textAlign: 'center', fontWeight: '600', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>Clinical / Diagnostic</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1.25rem', fontWeight: '600' }}>Purpose</td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    Health optimization & risk screening
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    Diagnosis of genetic conditions
                  </td>
                </tr>
                <tr style={{ background: 'var(--bg-light)', borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1.25rem', fontWeight: '600' }}>Who Orders</td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    Direct-to-consumer
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    Physician referral required
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1.25rem', fontWeight: '600' }}>Examples</td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    Nutrigenomics, Fitness, Gut Microbiome
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    WES, NIPT, Cancer Panels
                  </td>
                </tr>
                <tr style={{ background: 'var(--bg-light)', borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1.25rem', fontWeight: '600' }}>Sample Collection</td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    Saliva / Stool at home
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    Blood / Tissue (clinical setting)
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1.25rem', fontWeight: '600' }}>Turnaround Time</td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    2-3 weeks
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    4-6 weeks
                  </td>
                </tr>
                <tr style={{ background: 'var(--bg-light)', borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1.25rem', fontWeight: '600' }}>Genetic Counseling</td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    <Check size={24} color="var(--success-green)" style={{ margin: '0 auto' }} />
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Optional</div>
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    <Check size={24} color="var(--success-green)" style={{ margin: '0 auto' }} />
                    <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Mandatory</div>
                  </td>
                </tr>
                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '1.25rem', fontWeight: '600' }}>Price Range</td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    ₹9,999 - ₹18,000
                  </td>
                  <td style={{ padding: '1.25rem', textAlign: 'center', borderLeft: '1px solid var(--border-color)' }}>
                    ₹20,000 - ₹45,000
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* CTA Section */}
          <div style={{
            marginTop: '3rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem'
          }}>
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              border: '2px solid var(--primary-teal)',
              textAlign: 'center'
            }}>
              <h3 className="heading-3" style={{ marginBottom: '1rem', color: 'var(--primary-teal)' }}>
                Browse Preventive Tests
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Wellness, nutrition, fitness & gut health tests you can order directly
              </p>
              <Link to="/tests" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }} onClick={scrollToTop}>
                Shop Wellness Tests
              </Link>
            </div>

            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2rem',
              border: '2px solid var(--primary-blue)',
              textAlign: 'center'
            }}>
              <h3 className="heading-3" style={{ marginBottom: '1rem', color: 'var(--primary-blue)' }}>
                Need Clinical Testing?
              </h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                Complex diagnostic tests requiring physician consultation
              </p>
              <Link 
                to="/booking" 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  width: '100%', 
                  padding: '1rem 2rem',
                  background: 'var(--primary-blue)',
                  color: 'white',
                  borderRadius: '0.5rem',
                  fontWeight: '600',
                  textDecoration: 'none',
                  transition: 'all 0.2s ease'
                }} 
                onClick={scrollToTop}
              >
                Book the Testing
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
