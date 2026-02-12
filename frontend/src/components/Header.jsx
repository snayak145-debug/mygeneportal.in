import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import '../styles/genomics.css';

export const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Tests', path: '/tests' },
    { name: 'Compare', path: '/test-comparison' },
    { name: 'Track Sample', path: '/track-sample' },
    { name: 'Services', path: '/services' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header className="genomics-header">
      <div className="header-container">
        <Link to="/" className="logo" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          <img 
            src="https://customer-assets.emergentagent.com/job_genetic-services/artifacts/lll47xq1_Gemini_Generated_Image_nnbeuznnbeuznnbe.png" 
            alt="MyGenePortal Logo" 
            style={{ height: '50px', width: 'auto' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: '700', color: 'var(--primary-blue)', lineHeight: '1' }}>
              MyGenePortal
            </span>
            <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontWeight: '500', letterSpacing: '0.5px' }}>
              NABL & CAP Accredited Labs
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: location.pathname === item.path ? 'var(--primary-teal)' : 'var(--text-primary)'
              }}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/cart"
            style={{
              position: 'relative',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShoppingCart size={24} color="var(--text-primary)" />
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: '0',
                right: '-2px',
                background: '#EF4444',
                color: 'white',
                borderRadius: '50%',
                width: '20px',
                height: '20px',
                fontSize: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '600'
              }}>
                {getCartCount()}
              </span>
            )}
          </Link>
          <Link to="/booking" className="btn-primary" style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}>
            Free Counseling
          </Link>
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--text-primary)'
          }}
          className="md:hidden"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: 'white',
            borderTop: '1px solid var(--border-color)',
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: location.pathname === item.path ? 'var(--primary-teal)' : 'var(--text-primary)',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '0.5rem'
              }}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/cart"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              color: 'var(--text-primary)',
              textDecoration: 'none',
              fontWeight: '500',
              padding: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <ShoppingCart size={20} />
            Cart {getCartCount() > 0 && `(${getCartCount()})`}
          </Link>
          <Link
            to="/booking"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary"
            style={{ marginTop: '0.5rem' }}
          >
            Free Counseling
          </Link>
        </div>
      )}
    </header>
  );
};
