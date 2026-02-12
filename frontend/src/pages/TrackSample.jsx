import React, { useState } from 'react';
import { Search, Package, FlaskConical, FileCheck, CheckCircle, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { trackingAPI } from '../services/api';
import '../styles/genomics.css';

export const TrackSample = () => {
  const { toast } = useToast();
  const [trackingId, setTrackingId] = useState('');
  const [sampleStatus, setSampleStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const status = await trackingAPI.track(trackingId);
      
      // Transform API data to match frontend format
      const transformedStatus = {
        orderId: status.tracking_id,
        testName: status.test_name,
        currentStage: status.timeline.length - 1,
        stages: status.timeline.map((event, index) => ({
          name: event.status,
          completed: index < status.timeline.length,
          date: event.date,
          description: event.description
        })),
        estimatedCompletion: status.estimated_completion
      };
      
      setSampleStatus(transformedStatus);
    } catch (error) {
      console.error('Error tracking sample:', error);
      toast({
        title: "Tracking ID Not Found",
        description: error.message || "Please check your tracking ID and try again. You can find it in your order confirmation email.",
        variant: "destructive",
      });
      setSampleStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (stageName, completed) => {
    if (completed) {
      return <CheckCircle size={24} color="var(--success-green)" />;
    }
    
    switch(stageName) {
      case 'Sample Received':
        return <Package size={24} color="var(--text-muted)" />;
      case 'In Lab Processing':
      case 'Sequencing':
        return <FlaskConical size={24} color="var(--text-muted)" />;
      case 'Report Generation':
      case 'Report Ready':
        return <FileCheck size={24} color="var(--text-muted)" />;
      default:
        return <Package size={24} color="var(--text-muted)" />;
    }
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
        <div className="container" style={{ maxWidth: '800px' }}>
          <h1 className="heading-1" style={{ color: 'white', marginBottom: '1rem' }}>
            Track Your Sample
          </h1>
          <p className="body-large" style={{ color: 'rgba(255, 255, 255, 0.9)' }}>
            Enter your tracking ID to check the status of your genetic test
          </p>
        </div>
      </section>

      {/* Tracking Form */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <form onSubmit={handleTrack} style={{
            background: 'white',
            borderRadius: '1rem',
            padding: '2rem',
            border: '1px solid var(--border-color)',
            marginBottom: '3rem'
          }}>
            <label style={{ display: 'block', marginBottom: '0.75rem', fontWeight: '600', color: 'var(--text-primary)' }}>
              Tracking ID / Order Number
            </label>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ position: 'relative', flex: 1 }}>
                <Search
                  size={20}
                  style={{
                    position: 'absolute',
                    left: '1rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                  }}
                />
                <input
                  type="text"
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  placeholder="Enter your tracking ID (e.g., MGP001234)"
                  required
                  className="search-input"
                  style={{ width: '100%', paddingLeft: '3rem' }}
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ padding: '0 2rem' }}
              >
                Track
              </button>
            </div>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginTop: '0.75rem' }}>
              Your tracking ID can be found in your order confirmation email
            </p>
          </form>

          {/* Status Display */}
          {sampleStatus && (
            <div style={{
              background: 'white',
              borderRadius: '1rem',
              padding: '2.5rem',
              border: '1px solid var(--border-color)'
            }}>
              <div style={{ marginBottom: '2rem' }}>
                <h2 className="heading-2" style={{ marginBottom: '0.5rem' }}>
                  Order {sampleStatus.orderId}
                </h2>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem' }}>
                  {sampleStatus.testName}
                </p>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                  Estimated Completion: {new Date(sampleStatus.estimatedCompletion).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>

              {/* Progress Stages */}
              <div style={{ position: 'relative' }}>
                {sampleStatus.stages.map((stage, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      gap: '1.5rem',
                      marginBottom: index < sampleStatus.stages.length - 1 ? '2rem' : '0',
                      position: 'relative'
                    }}
                  >
                    {/* Connecting Line */}
                    {index < sampleStatus.stages.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        left: '12px',
                        top: '32px',
                        width: '2px',
                        height: 'calc(100% + 2rem)',
                        background: stage.completed ? 'var(--success-green)' : 'var(--border-color)'
                      }} />
                    )}

                    {/* Icon */}
                    <div style={{
                      position: 'relative',
                      zIndex: 1,
                      background: 'white',
                      padding: '4px'
                    }}>
                      {getStatusIcon(stage.name, stage.completed)}
                    </div>

                    {/* Content */}
                    <div style={{ flex: 1 }}>
                      <h3 style={{
                        fontWeight: '600',
                        color: stage.completed ? 'var(--text-primary)' : 'var(--text-muted)',
                        marginBottom: '0.25rem'
                      }}>
                        {stage.name}
                      </h3>
                      {stage.date && (
                        <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                          {new Date(stage.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </p>
                      )}
                      {!stage.completed && index === sampleStatus.currentStage && (
                        <span style={{
                          display: 'inline-block',
                          background: 'var(--light-blue)',
                          color: 'var(--primary-blue)',
                          padding: '0.25rem 0.75rem',
                          borderRadius: '1rem',
                          fontSize: '0.75rem',
                          fontWeight: '600',
                          marginTop: '0.5rem'
                        }}>
                          In Progress
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Help Section */}
              <div style={{
                marginTop: '2rem',
                padding: '1.5rem',
                background: 'var(--bg-light)',
                borderRadius: '0.75rem'
              }}>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
                  <strong>Need help?</strong>
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  Contact us at <a href="mailto:info@mygeneportal.in" style={{ color: 'var(--primary-teal)', textDecoration: 'none' }}>info@mygeneportal.in</a> or call our support team for any questions about your sample status.
                </p>
              </div>
            </div>
          )}

          {/* Demo Instruction */}
          {!sampleStatus && (
            <div style={{
              background: 'var(--light-blue)',
              borderRadius: '1rem',
              padding: '2rem',
              textAlign: 'center'
            }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong>Demo:</strong> Try tracking ID <code style={{ background: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontFamily: 'monospace' }}>MGP001234</code>
              </p>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                Your actual tracking ID will be sent to your email after your sample is received at our lab
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};
