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
    { name: 'Health Packages', path: '/tests?category=Health%20Packages' },
    { name: 'Track Sample', path: '/track-sample' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 10000,
      background: 'linear-gradient(180deg, #0A1628 0%, #0D1E36 100%)',
      borderBottom: '1px solid rgba(212, 175, 55, 0.2)',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)'
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0.75rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Logo with DNA Icon */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }}>
          {/* DNA Helix SVG Icon */}
          <svg width="42" height="42" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="dnaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#D4AF37"/>
                <stop offset="100%" stopColor="#E8D5B7"/>
              </linearGradient>
            </defs>
            {/* DNA Double Helix */}
            <path d="M25 10 Q50 25, 75 10 Q50 25, 25 40 Q50 55, 75 40 Q50 55, 25 70 Q50 85, 75 70 Q50 85, 25 90" 
                  stroke="url(#dnaGradient)" strokeWidth="4" fill="none" strokeLinecap="round"/>
            <path d="M75 10 Q50 25, 25 10 Q50 25, 75 40 Q50 55, 25 40 Q50 55, 75 70 Q50 85, 25 70 Q50 85, 75 90" 
                  stroke="url(#dnaGradient)" strokeWidth="4" fill="none" strokeLinecap="round"/>
            {/* Horizontal lines connecting strands */}
            <line x1="30" y1="25" x2="70" y2="25" stroke="#D4AF37" strokeWidth="2" opacity="0.6"/>
            <line x1="30" y1="50" x2="70" y2="50" stroke="#D4AF37" strokeWidth="2" opacity="0.6"/>
            <line x1="30" y1="75" x2="70" y2="75" stroke="#D4AF37" strokeWidth="2" opacity="0.6"/>
          </svg>
          {/* Company Name */}
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: '1.1' }}>
            <span style={{ 
              fontSize: '1.4rem', 
              fontWeight: '700', 
              color: '#FFFFFF',
              letterSpacing: '0.5px'
            }}>
              MyGene<span style={{ color: '#D4AF37' }}>Portal</span>
            </span>
            <span style={{ 
              fontSize: '0.65rem', 
              color: 'rgba(212, 175, 55, 0.8)', 
              letterSpacing: '2px',
              textTransform: 'uppercase',
              fontWeight: '500'
            }}>
              Precision Genomics
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '0.25rem'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                color: location.pathname === item.path ? '#D4AF37' : 'rgba(255, 255, 255, 0.9)',
                textDecoration: 'none',
                padding: '0.5rem 0.9rem',
                fontSize: '0.875rem',
                fontWeight: '500',
                transition: 'color 0.2s ease',
                borderBottom: location.pathname === item.path ? '2px solid #D4AF37' : '2px solid transparent'
              }}
            >
              {item.name}
            </Link>
          ))}
          
          {/* Cart Icon */}
          <Link
            to="/cart"
            style={{
              position: 'relative',
              padding: '0.5rem 0.75rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <ShoppingCart size={20} color="rgba(255, 255, 255, 0.9)" />
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: '2px',
                right: '2px',
                background: '#D4AF37',
                color: '#0A1628',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                fontSize: '0.65rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700'
              }}>
                {getCartCount()}
              </span>
            )}
          </Link>

          {/* Book Test CTA */}
          <Link 
            to="/tests" 
            style={{ 
              background: '#D4AF37',
              color: '#0A1628',
              padding: '0.6rem 1.25rem',
              borderRadius: '0.4rem',
              fontSize: '0.85rem',
              fontWeight: '600',
              textDecoration: 'none',
              marginLeft: '0.5rem',
              transition: 'all 0.2s ease',
              boxShadow: '0 2px 8px rgba(212, 175, 55, 0.3)'
            }}
          >
            Book Test
          </Link>
        </nav>

        {/* Mobile Controls */}
        <div className="mobile-nav" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <Link
            to="/cart"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <ShoppingCart size={22} color="rgba(255, 255, 255, 0.9)" />
            {getCartCount() > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-8px',
                background: '#D4AF37',
                color: '#0A1628',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700'
              }}>
                {getCartCount()}
              </span>
            )}
          </Link>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(255, 255, 255, 0.9)',
              padding: '4px'
            }}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          style={{
            background: '#0D1E36',
            borderTop: '1px solid rgba(212, 175, 55, 0.2)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem'
          }}
        >
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: location.pathname === item.path ? '#D4AF37' : 'rgba(255, 255, 255, 0.85)',
                textDecoration: 'none',
                fontWeight: '500',
                padding: '0.75rem 1rem',
                borderRadius: '0.5rem',
                background: location.pathname === item.path ? 'rgba(212, 175, 55, 0.1)' : 'transparent'
              }}
            >
              {item.name}
            </Link>
          ))}
          <Link
            to="/tests"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              background: '#D4AF37',
              color: '#0A1628',
              textDecoration: 'none',
              fontWeight: '600',
              padding: '1rem',
              borderRadius: '0.5rem',
              textAlign: 'center',
              marginTop: '0.5rem'
            }}
          >
            Book Test Now
          </Link>
        </div>
      )}

      <style>{`
        .desktop-nav { display: none; }
        .mobile-nav { display: flex; }
        
        @media (min-width: 1024px) {
          .desktop-nav { display: flex !important; }
          .mobile-nav { display: none !important; }
        }
      `}</style>
    </header>
  );
};
