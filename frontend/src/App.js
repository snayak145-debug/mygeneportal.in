import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
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
          
          {/* WhatsApp Floating Button - Essential for Indian Market */}
          <a
            href="https://wa.me/919742337892?text=Hi, I'm interested in genetic testing services"
            className="whatsapp-float"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={28} />
          </a>
          
          <Toaster />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
