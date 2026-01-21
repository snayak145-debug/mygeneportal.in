import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import '../styles/genomics.css';

export const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, getCartCount } = useCart();

  if (cartItems.length === 0) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-light)' }}>
        <section className="section">
          <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
            <ShoppingBag size={64} color="var(--text-muted)" style={{ margin: '0 auto 2rem' }} />
            <h1 className="heading-1" style={{ marginBottom: '1rem' }}>Your Cart is Empty</h1>
            <p className="body-large" style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
              Browse our comprehensive genetic tests and add them to your cart to get started.
            </p>
            <Link to="/tests" className="btn-primary">
              Browse Tests
            </Link>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-light)' }}>
      <section className="section">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <h1 className="heading-1" style={{ marginBottom: '2rem' }}>Shopping Cart ({getCartCount()} items)</h1>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Cart Items */}
            <div style={{ gridColumn: 'span 2' }}>
              {cartItems.map((item) => (
                <div key={item.id} style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '1.5rem',
                  marginBottom: '1rem',
                  border: '1px solid var(--border-color)',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr auto',
                  gap: '1.5rem',
                  alignItems: 'center'
                }}>
                  {/* Test Info */}
                  <div>
                    <span style={{
                      display: 'inline-block',
                      background: 'var(--light-cyan)',
                      color: 'var(--primary-teal)',
                      padding: '0.25rem 0.75rem',
                      borderRadius: '1rem',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      marginBottom: '0.5rem'
                    }}>
                      {item.subCategory}
                    </span>
                    <h3 className="heading-3" style={{ marginBottom: '0.5rem' }}>{item.name}</h3>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
                      Sample: {item.sampleType} • Results: {item.turnaroundTime}
                    </p>
                    {item.discount && (
                      <span style={{
                        display: 'inline-block',
                        background: '#FEF3C7',
                        color: '#92400E',
                        padding: '0.25rem 0.5rem',
                        borderRadius: '0.25rem',
                        fontSize: '0.75rem',
                        fontWeight: '600'
                      }}>
                        {item.discount}
                      </span>
                    )}
                  </div>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', justifySelf: 'center' }}>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      style={{
                        background: 'var(--bg-light)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.5rem',
                        width: '2.5rem',
                        height: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Minus size={16} />
                    </button>
                    <span style={{ fontWeight: '600', fontSize: '1.125rem', minWidth: '2rem', textAlign: 'center' }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      style={{
                        background: 'var(--bg-light)',
                        border: '1px solid var(--border-color)',
                        borderRadius: '0.5rem',
                        width: '2.5rem',
                        height: '2.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  {/* Price & Remove */}
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-blue)', marginBottom: '0.5rem' }}>
                      {item.price}
                    </div>
                    {item.mrp && (
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', textDecoration: 'line-through', marginBottom: '1rem' }}>
                        {item.mrp}
                      </div>
                    )}
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'transparent',
                        color: '#EF4444',
                        border: '1px solid #EF4444',
                        borderRadius: '0.5rem',
                        padding: '0.5rem 1rem',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: '0.875rem'
                      }}
                    >
                      <Trash2 size={16} />
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div>
              <div style={{
                background: 'white',
                borderRadius: '1rem',
                padding: '2rem',
                border: '1px solid var(--border-color)',
                position: 'sticky',
                top: '100px'
              }}>
                <h3 className="heading-3" style={{ marginBottom: '1.5rem' }}>Order Summary</h3>
                
                <div style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                    <span style={{ fontWeight: '600' }}>₹{getCartTotal().toLocaleString()}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                    <span style={{ color: 'var(--success-green)', fontWeight: '600' }}>FREE</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text-secondary)' }}>Genetic Counseling</span>
                    <span style={{ color: 'var(--success-green)', fontWeight: '600' }}>FREE</span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '1.25rem' }}>
                  <span style={{ fontWeight: '700' }}>Total</span>
                  <span style={{ fontWeight: '700', color: 'var(--primary-blue)' }}>₹{getCartTotal().toLocaleString()}</span>
                </div>

                <Link
                  to="/checkout"
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center', marginBottom: '1rem' }}
                >
                  Proceed to Checkout
                  <ArrowRight size={20} />
                </Link>

                <Link
                  to="/tests"
                  className="btn-secondary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  Continue Shopping
                </Link>

                {/* Benefits */}
                <div style={{ marginTop: '2rem', padding: '1rem', background: 'var(--bg-light)', borderRadius: '0.5rem' }}>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    ✓ Free home sample collection kit
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                    ✓ Free genetic counseling included
                  </p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    ✓ NABL accredited lab testing
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};