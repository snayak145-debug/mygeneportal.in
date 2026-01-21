import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Mail, Phone, MapPin, Send, MessageCircle } from 'lucide-react';
import { faqs, partnerLabs } from '../mockData';
import { useToast } from '../hooks/use-toast';
import '../styles/genomics.css';

export const Contact = () => {
  const { toast } = useToast();
  const [contactForm, setContactForm] = React.useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission - will be replaced with actual API call
    console.log('Contact form submitted:', contactForm);
    toast({
      title: "Message Sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setContactForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh' }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-teal) 100%)',
        padding: '4rem 1.5rem 3rem',
        textAlign: 'center',
        color: 'white'
      }}>
        <div className="container">
          <h1 className="heading-hero" style={{ color: 'white', marginBottom: '1rem' }}>
            Get in Touch
          </h1>
          <p className="body-large" style={{ maxWidth: '700px', margin: '0 auto', color: 'rgba(255, 255, 255, 0.9)' }}>
            Have questions about genetic testing? Our expert counselors are here to help.
          </p>
        </div>
      </section>

      {/* Contact Options */}
      <section className="section section-light">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--light-cyan)', padding: '1rem', borderRadius: '50%' }}>
                  <Phone size={28} color="var(--primary-teal)" />
                </div>
              </div>
              <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>Phone</h3>
              <a href="tel:+919876543210" style={{ color: 'var(--primary-teal)', textDecoration: 'none', fontWeight: '600' }}>
                +91 98765 43210
              </a>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Mon-Sat: 9 AM - 6 PM IST
              </p>
            </div>

            <div style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '1rem',
              border: '1px solid var(--border-color)',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{ background: 'var(--light-cyan)', padding: '1rem', borderRadius: '50%' }}>
                  <Mail size={28} color="var(--primary-teal)" />
                </div>
              </div>
              <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>Email</h3>
              <a href="mailto:info@mygeneportal.in" style={{ color: 'var(--primary-teal)', textDecoration: 'none', fontWeight: '600' }}>
                info@mygeneportal.in
              </a>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                We respond within 24 hours
              </p>
            </div>

            <div style={{
              background: '#E8F8F5',
              padding: '2rem',
              borderRadius: '1rem',
              border: '2px solid #25D366',
              textAlign: 'center'
            }}>
              <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1rem' }}>
                <div style={{ background: '#25D366', padding: '1rem', borderRadius: '50%' }}>
                  <MessageCircle size={28} color="white" />
                </div>
              </div>
              <h3 className="heading-3" style={{ marginBottom: '0.75rem' }}>WhatsApp</h3>
              <a
                href="https://wa.me/919876543210?text=Hi, I have a question about genetic testing"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#25D366', textDecoration: 'none', fontWeight: '600' }}
              >
                Chat Now
              </a>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                Instant responses
              </p>
            </div>
          </div>

          {/* Contact Form & Info Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '3rem' }}>
            {/* Contact Form */}
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2.5rem',
              border: '1px solid var(--border-color)'
            }}>
              <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Send Us a Message</h2>
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your full name"
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
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="your.email@example.com"
                      className="search-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                      placeholder="What's this about?"
                      className="search-input"
                      style={{ width: '100%' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                      Message *
                    </label>
                    <textarea
                      required
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us more about your inquiry..."
                      className="search-input"
                      style={{ width: '100%', minHeight: '150px', resize: 'vertical' }}
                    />
                  </div>
                  <button type="submit" className="btn-primary" style={{ width: '100%', padding: '1rem' }}>
                    <Send size={20} />
                    Send Message
                  </button>
                </div>
              </form>
            </div>

            {/* Info & FAQ */}
            <div>
              {/* Office Info */}
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid var(--border-color)',
                marginBottom: '2rem'
              }}>
                <h3 className="heading-3" style={{ marginBottom: '1.5rem' }}>Our Office</h3>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
                  <MapPin size={24} color="var(--primary-teal)" style={{ flexShrink: 0 }} />
                  <div>
                    <p className="body-medium" style={{ marginBottom: '0.5rem' }}>
                      <strong>MyGenePortal.in</strong>
                    </p>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Bangalore, Karnataka, India
                    </p>
                  </div>
                </div>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '1rem' }}>
                  <strong>Office Hours:</strong><br />
                  Monday - Saturday: 9:00 AM - 6:00 PM<br />
                  Sunday: Closed
                </p>
              </div>

              {/* Partner Labs */}
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid var(--border-color)'
              }}>
                <h3 className="heading-3" style={{ marginBottom: '1rem' }}>Our Partner Labs</h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  We exclusively partner with NABL & CAP accredited labs across India:
                </p>
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {partnerLabs.map((lab) => (
                    <li key={lab.id} style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      <strong style={{ color: 'var(--text-primary)' }}>{lab.name}</strong><br />
                      {lab.accreditation} • {lab.location}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="section section-gray">
        <div className="container" style={{ maxWidth: '900px' }}>
          <div className="section-header">
            <span className="section-badge">FAQs</span>
            <h2 className="heading-1">Frequently Asked Questions</h2>
            <p className="body-large">
              Quick answers to common questions about genetic testing and our services
            </p>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={`item-${faq.id}`} style={{ background: 'white', marginBottom: '1rem', borderRadius: '0.75rem', border: '1px solid var(--border-color)', padding: '0.5rem 1rem' }}>
                <AccordionTrigger style={{ fontWeight: '600', color: 'var(--text-primary)', textAlign: 'left' }}>
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent style={{ color: 'var(--text-secondary)', lineHeight: '1.7', paddingTop: '0.5rem' }}>
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </div>
  );
};
