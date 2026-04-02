import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { TestCatalog } from './pages/TestCatalog';
import { Services } from './pages/Services';
import { About } from './pages/About';
import { Blog } from './pages/Blog';
import { Booking } from './pages/Booking';
import { Contact } from './pages/Contact';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';
import { TrackSample } from './pages/TrackSample';
import { TestComparison } from './pages/TestComparison';
import { CartProvider } from './context/CartContext';
import { Toaster } from './components/ui/sonner';
import './styles/genomics.css';
import './App.css';

// Floating Contact Button Component - Simple Get in Touch
const FloatingContactButton = () => {
  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      {/* Simple Get in Touch button that goes to contact page */}
      <a
        href="/contact"
        aria-label="Get in Touch"
        data-testid="contact-float-button"
        style={{
          border: 'none',
          cursor: 'pointer',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #D4AF37 0%, #B8963E 100%)',
          color: '#0A1628',
          boxShadow: '0 4px 15px rgba(212, 175, 55, 0.4)',
          textDecoration: 'none',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.5)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 15px rgba(212, 175, 55, 0.4)';
        }}
      >
        <svg viewBox="0 0 24 24" width="26" height="26" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
      </a>
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tests" element={<TestCatalog />} />
            <Route path="/services" element={<Services />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/track-sample" element={<TrackSample />} />
            <Route path="/test-comparison" element={<TestComparison />} />
          </Routes>
          <Footer />
          
          {/* Floating Contact Button */}
          <FloatingContactButton />
          
          <Toaster />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
