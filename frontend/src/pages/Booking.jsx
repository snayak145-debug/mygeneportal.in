import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import '../styles/genomics.css';

export const Booking = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    preferredDate: '',
    city: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission - will be replaced with actual API call
    console.log('Counseling booking submitted:', formData);
    toast({
      title: "Booking Request Received!",
      description: "Our genetic counselor will contact you via email within 24 hours to confirm your appointment.",
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      preferredDate: '',
      city: '',
      message: ''
    });
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-light)' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-teal) 100%)',
        padding: '3rem 1.5rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="heading-1" style={{ color: 'white', marginBottom: '1rem' }}>
            Get Genetic Counseling With Our Experts
          </h1>
          <p className="body-large" style={{ color: 'rgba(255, 255, 255, 0.9)', marginBottom: '0.5rem' }}>
            Free pre-test and post-test genetic counseling by Certified Board Genetic Counsellors (BGCI)
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem', alignItems: 'start' }}>
            
            {/* Counseling Image */}
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1739285388427-d6f85d12a8fc"
                alt="Genetic counselor with patient"
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: '1rem',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)'
                }}
              />
              
              {/* Benefits */}
              <div style={{
                marginTop: '2rem',
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid var(--border-color)'
              }}>
                <h3 className="heading-3" style={{ marginBottom: '1rem' }}>What's Included:</h3>
                <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--success-green)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Free 45-60 minute consultation</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--success-green)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--text-secondary)' }}>BGCI Certified Genetic Counsellors</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--success-green)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Video call or email consultation</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--success-green)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Personalized test recommendations</span>
                  </li>
                  <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}>
                    <span style={{ color: 'var(--success-green)', fontSize: '1.25rem' }}>✓</span>
                    <span style={{ color: 'var(--text-secondary)' }}>Report interpretation included</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Booking Form */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2.5rem',
              border: '1px solid var(--border-color)',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
            }}>
              <h2 className="heading-2" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>
                Connect With Our Experts
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      Patient/Doctor Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your name"
                      className="search-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="search-input"
                      style={{ width: '100%' }}
                    />
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        name="preferredDate"
                        required
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="search-input"
                        style={{ width: '100%' }}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="Your city"
                        className="search-input"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about your genetic testing needs or any questions you have..."
                      className="search-input"
                      style={{ width: '100%', minHeight: '120px', resize: 'vertical' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn-primary"
                    style={{ width: '100%', padding: '1rem', fontSize: '1rem', justifyContent: 'center' }}
                  >
                    <Calendar size={20} />
                    Book Counseling
                  </button>

                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '0.5rem' }}>
                    Our genetic counselor will contact you within 24 hours via email
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Why Book Counseling */}
      <section className="section section-gray">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-header">
            <h2 className="heading-1">Why Book Genetic Counseling?</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
              <h3 className="heading-3" style={{ color: 'var(--primary-teal)', marginBottom: '1rem' }}>Before Testing</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Understand which genetic test is right for you, what it can reveal, and the implications for you and your family.
              </p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
              <h3 className="heading-3" style={{ color: 'var(--primary-teal)', marginBottom: '1rem' }}>After Testing</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Get detailed explanation of your results in simple terms with actionable health recommendations and next steps.
              </p>
            </div>
            <div style={{ background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid var(--border-color)' }}>
              <h3 className="heading-3" style={{ color: 'var(--primary-teal)', marginBottom: '1rem' }}>Ongoing Support</h3>
              <p className="body-medium" style={{ color: 'var(--text-secondary)' }}>
                Continue to receive guidance as new information emerges and for family planning decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
