import React, { useState, useEffect } from 'react';
import { Calendar, Clock, Loader2 } from 'lucide-react';
import { blogAPI } from '../services/api';
import { useToast } from '../hooks/use-toast';
import '../styles/genomics.css';

export const Blog = () => {
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const posts = await blogAPI.getAll();
        setBlogPosts(posts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
        toast({
          title: "Error",
          description: "Failed to load blog posts. Please refresh the page.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, [toast]);

  if (loading) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-light)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <Loader2 size={48} style={{ animation: 'spin 1s linear infinite', color: 'var(--primary-teal)' }} />
          <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>Loading articles...</p>
        </div>
      </div>
    );
  }

  if (blogPosts.length === 0) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-light)' }}>
        <section className="section">
          <div className="container" style={{ textAlign: 'center' }}>
            <h1 className="heading-1" style={{ marginBottom: '1rem' }}>Blog & Resources</h1>
            <p className="body-large" style={{ color: 'var(--text-secondary)' }}>
              No blog posts available at the moment. Check back soon!
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-light)' }}>
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Knowledge Hub</span>
            <h1 className="heading-1">Blog & Resources</h1>
            <p className="body-large">
              Expert insights on genomics, preventive health, and the latest advances in genetic testing. Stay informed about how genetics can shape your health decisions.
            </p>
          </div>

          {/* Featured Article */}
          <div style={{
            background: 'white',
            borderRadius: '1rem',
            overflow: 'hidden',
            marginBottom: '3rem',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              <img
                src={blogPosts[0].image}
                alt={blogPosts[0].title}
                style={{ width: '100%', height: '100%', minHeight: '300px', objectFit: 'cover' }}
              />
              <div style={{ padding: '2.5rem' }}>
                <div style={{ display: 'inline-block', background: 'var(--light-cyan)', color: 'var(--primary-teal)', padding: '0.5rem 1rem', borderRadius: '2rem', fontSize: '0.875rem', fontWeight: '600', marginBottom: '1rem' }}>
                  Featured Article
                </div>
                <h2 className="heading-2" style={{ marginBottom: '1rem' }}>{blogPosts[0].title}</h2>
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Calendar size={16} />
                    {blogPosts[0].date}
                  </span>
                  <span>•</span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    <Clock size={16} />
                    {blogPosts[0].read_time}
                  </span>
                </div>
                <p className="body-large" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  {blogPosts[0].excerpt}
                </p>
                <button className="btn-primary">
                  Read Full Article
                </button>
              </div>
            </div>
          </div>

          {/* Recent Articles */}
          <h2 className="heading-2" style={{ marginBottom: '2rem' }}>Recent Articles</h2>
          <div className="blog-grid">
            {blogPosts.slice(1).map((post) => (
              <div key={post.id} className="blog-card">
                <img src={post.image} alt={post.title} className="blog-image" />
                <div className="blog-content">
                  <div style={{ display: 'inline-block', background: 'var(--light-cyan)', color: 'var(--primary-teal)', padding: '0.25rem 0.75rem', borderRadius: '1rem', fontSize: '0.75rem', fontWeight: '600', marginBottom: '1rem' }}>
                    {post.category}
                  </div>
                  <div className="blog-meta">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span>{post.readTime || post.read_time}</span>
                  </div>
                  <h3 className="blog-title">{post.title}</h3>
                  <p className="blog-excerpt">{post.excerpt}</p>
                  <button
                    className="btn-primary"
                    style={{ marginTop: '1rem', padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
                  >
                    Read Article
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Newsletter CTA */}
          <div style={{
            background: 'linear-gradient(135deg, var(--primary-blue) 0%, var(--primary-teal) 100%)',
            borderRadius: '1.5rem',
            padding: '3rem 2rem',
            textAlign: 'center',
            color: 'white',
            marginTop: '4rem'
          }}>
            <h2 className="heading-2" style={{ color: 'white', marginBottom: '1rem' }}>
              Stay Updated on Genomics Insights
            </h2>
            <p className="body-large" style={{ maxWidth: '600px', margin: '0 auto 2rem', color: 'rgba(255, 255, 255, 0.9)' }}>
              Subscribe to receive the latest articles on preventive genomics, new test offerings, and health tips.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', maxWidth: '500px', margin: '0 auto' }}>
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  flex: 1,
                  minWidth: '250px',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  fontSize: '1rem'
                }}
              />
              <button className="btn-primary">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
