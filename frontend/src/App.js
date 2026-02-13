import React, { useState } from 'react';
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

// WhatsApp Icon Component
const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

// Phone Icon Component
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
  </svg>
);

// Close Icon Component
const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
  </svg>
);

// Floating Contact Button Component
const FloatingContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = "+91 861 840 8028";
  const phoneNumberClean = "918618408028";
  const whatsappMessage = encodeURIComponent("Hi, I'm interested in genetic testing services from MyGenePortal");

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000 }}>
      {/* Popup with contact options */}
      {isOpen && (
        <div style={{
          position: 'absolute',
          bottom: '70px',
          right: '0',
          background: 'white',
          borderRadius: '1rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          padding: '1rem',
          minWidth: '220px',
          animation: 'fadeIn 0.2s ease'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
            <span style={{ fontWeight: '600', color: '#1a365d' }}>Contact Us</span>
            <button 
              onClick={() => setIsOpen(false)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              <CloseIcon />
            </button>
          </div>
          
          <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
            {phoneNumber}
          </div>
          
          {/* Call Button */}
          <a
            href={`tel:${phoneNumberClean}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              background: '#1a365d',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              marginBottom: '0.5rem',
              justifyContent: 'center'
            }}
          >
            <PhoneIcon />
            Call Now
          </a>
          
          {/* WhatsApp Button */}
          <a
            href={`https://wa.me/${phoneNumberClean}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1rem',
              background: '#25D366',
              color: 'white',
              borderRadius: '0.5rem',
              textDecoration: 'none',
              fontWeight: '500',
              justifyContent: 'center'
            }}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      )}
      
      {/* Main floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="whatsapp-float"
        aria-label="Contact Us"
        data-testid="whatsapp-float-button"
        style={{
          border: 'none',
          cursor: 'pointer',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#25D366',
          color: 'white',
          boxShadow: '0 4px 12px rgba(37, 211, 102, 0.4)'
        }}
      >
        <WhatsAppIcon />
      </button>
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
