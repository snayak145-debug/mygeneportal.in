import React, { useState } from 'react';
import { X, Send, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { leadsAPI } from '../services/api';
import '../styles/genomics.css';

export const EnquiryModal = ({ isOpen, onClose, testName = '' }) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNo: '',
    email: '',
    testName: testName,
    preferredDate: '',
    preferredTime: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      // Submit lead to backend API
      await leadsAPI.create({
        name: formData.fullName,
        email: formData.email,
        mobile: formData.mobileNo,
        test_of_interest: formData.testName,
        preferred_date: formData.preferredDate,
        preferred_time: formData.preferredTime,
        notes: formData.message,
        source: 'website_enquiry_modal'
      });
      
      toast({
        title: "Enquiry Submitted Successfully!",
        description: "Our genetic counsellor will contact you within 24 hours to schedule your appointment.",
      });
      
      // Reset form and close modal
      setFormData({
        fullName: '',
        mobileNo: '',
        email: '',
        testName: '',
        preferredDate: '',
        preferredTime: '',
        message: ''
      });
      onClose();
    } catch (error) {
      console.error('Error submitting lead:', error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your enquiry. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '1rem',
          padding: '2rem',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <X size={24} color="var(--text-primary)" />
        </button>

        {/* Form Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h2 className="heading-2" style={{ marginBottom: '0.5rem' }}>
            Enquire About Genetic Test
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
            Fill in your details and our certified genetic counsellor will contact you to schedule an appointment
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Full Name */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                required
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Enter your full name"
                className="search-input"
                style={{ width: '100%' }}
              />
            </div>

            {/* Mobile Number */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobileNo"
                required
                value={formData.mobileNo}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                pattern="[0-9]{10}"
                className="search-input"
                style={{ width: '100%' }}
              />
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                Enter 10 digit mobile number
              </p>
            </div>

            {/* Email */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Email Address *
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

            {/* Test Name */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Test You're Interested In *
              </label>
              <input
                type="text"
                name="testName"
                required
                value={formData.testName}
                onChange={handleChange}
                placeholder="e.g., NIPT, Whole Exome Sequencing, Gut Microbiome"
                className="search-input"
                style={{ width: '100%' }}
              />
            </div>

            {/* Preferred Date & Time */}
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
                  Preferred Time *
                </label>
                <select
                  name="preferredTime"
                  required
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="search-input"
                  style={{ width: '100%' }}
                >
                  <option value="">Select time</option>
                  <option value="09:00-10:00">09:00 AM - 10:00 AM</option>
                  <option value="10:00-11:00">10:00 AM - 11:00 AM</option>
                  <option value="11:00-12:00">11:00 AM - 12:00 PM</option>
                  <option value="14:00-15:00">02:00 PM - 03:00 PM</option>
                  <option value="15:00-16:00">03:00 PM - 04:00 PM</option>
                  <option value="16:00-17:00">04:00 PM - 05:00 PM</option>
                  <option value="17:00-18:00">05:00 PM - 06:00 PM</option>
                </select>
              </div>
            </div>

            {/* Additional Message */}
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                Additional Information (Optional)
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any specific questions or concerns about the test..."
                className="search-input"
                style={{ width: '100%', minHeight: '80px', resize: 'vertical' }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn-primary"
              style={{ width: '100%', padding: '1rem', fontSize: '1rem', justifyContent: 'center' }}
            >
              <Send size={20} />
              Submit Enquiry
            </button>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center' }}>
              By submitting, you agree to be contacted by our genetic counsellor via phone/email for appointment scheduling
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};
