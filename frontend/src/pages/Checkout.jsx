import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Lock, CreditCard, QrCode, Loader2 } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { ordersAPI } from '../services/api';
import '../styles/genomics.css';

export const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [paymentMethod, setPaymentMethod] = useState('razorpay');
  const [processing, setProcessing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });

  if (cartItems.length === 0) {
    navigate('/tests');
    return null;
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    
    try {
      // Prepare order items
      const orderItems = cartItems.map(item => ({
        test_id: item.id.toString(),
        test_name: item.name,
        price: item.price,
        quantity: item.quantity || 1
      }));

      // Create order in backend
      const order = await ordersAPI.create({
        customer_name: formData.name,
        customer_email: formData.email,
        customer_mobile: formData.mobile,
        customer_address: formData.address,
        customer_city: formData.city,
        customer_state: formData.state,
        customer_pincode: formData.pincode,
        items: orderItems,
        subtotal: getCartTotal(),
        discount_amount: 0,
        coupon_code: '',
        total_amount: getCartTotal()
      });
      
      // Note: Razorpay integration will be added here
      // For now, simulate payment success
      toast({
        title: "Order Placed Successfully!",
        description: `Order ID: ${order.tracking_id}. Your sample collection kit will be delivered within 3-5 business days. Check your email for order details.`,
      });
      clearCart();
      navigate('/');
    } catch (error) {
      console.error('Error creating order:', error);
      toast({
        title: "Order Failed",
        description: "There was an error processing your order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: 'var(--bg-light)' }}>
      <section className="section">
        <div className="container" style={{ maxWidth: '1200px' }}>
          <h1 className="heading-1" style={{ marginBottom: '2rem' }}>Checkout</h1>
          
          <form onSubmit={handlePayment}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
              {/* Shipping Information */}
              <div>
                <div style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--border-color)',
                  marginBottom: '2rem'
                }}>
                  <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Shipping Information</h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your full name"
                        className="search-input"
                        style={{ width: '100%' }}
                      />
                    </div>

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

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                        Mobile Number *
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        required
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        pattern="[0-9]{10}"
                        className="search-input"
                        style={{ width: '100%' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                        Address *
                      </label>
                      <textarea
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Enter your complete address"
                        className="search-input"
                        style={{ width: '100%', minHeight: '80px' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                          City *
                        </label>
                        <input
                          type="text"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City"
                          className="search-input"
                          style={{ width: '100%' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                          State *
                        </label>
                        <input
                          type="text"
                          name="state"
                          required
                          value={formData.state}
                          onChange={handleChange}
                          placeholder="State"
                          className="search-input"
                          style={{ width: '100%' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', color: 'var(--text-primary)' }}>
                        Pincode *
                      </label>
                      <input
                        type="text"
                        name="pincode"
                        required
                        value={formData.pincode}
                        onChange={handleChange}
                        placeholder="Enter pincode"
                        className="search-input"
                        style={{ width: '100%' }}
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div style={{
                  background: 'white',
                  borderRadius: '1rem',
                  padding: '2rem',
                  border: '1px solid var(--border-color)'
                }}>
                  <h2 className="heading-2" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Lock size={24} color="var(--primary-teal)" />
                    Payment Method
                  </h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: paymentMethod === 'razorpay' ? '2px solid var(--primary-teal)' : '1px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      background: paymentMethod === 'razorpay' ? 'var(--light-cyan)' : 'white'
                    }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="razorpay"
                        checked={paymentMethod === 'razorpay'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <CreditCard size={24} color="var(--primary-teal)" />
                      <div>
                        <div style={{ fontWeight: '600' }}>Razorpay</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Credit/Debit Card, UPI, Net Banking</div>
                      </div>
                    </label>

                    <label style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1rem',
                      border: paymentMethod === 'upi' ? '2px solid var(--primary-teal)' : '1px solid var(--border-color)',
                      borderRadius: '0.5rem',
                      cursor: 'pointer',
                      background: paymentMethod === 'upi' ? 'var(--light-cyan)' : 'white'
                    }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={paymentMethod === 'upi'}
                        onChange={(e) => setPaymentMethod(e.target.value)}
                      />
                      <QrCode size={24} color="var(--primary-teal)" />
                      <div>
                        <div style={{ fontWeight: '600' }}>UPI / QR Code</div>
                        <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>Scan & Pay Instantly</div>
                      </div>
                    </label>
                  </div>
                </div>
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
                  <h2 className="heading-2" style={{ marginBottom: '1.5rem' }}>Order Summary</h2>
                  
                  {/* Items List */}
                  <div style={{ marginBottom: '1.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                    {cartItems.map((item) => (
                      <div key={item.id} style={{
                        padding: '1rem 0',
                        borderBottom: '1px solid var(--border-color)',
                        display: 'flex',
                        justifyContent: 'space-between',
                        gap: '1rem'
                      }}>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: '600', marginBottom: '0.25rem' }}>{item.name}</div>
                          <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>Qty: {item.quantity}</div>
                        </div>
                        <div style={{ fontWeight: '600', color: 'var(--primary-blue)' }}>{item.price}</div>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div style={{ marginBottom: '1.5rem', paddingTop: '1rem', borderTop: '2px solid var(--border-color)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                      <span style={{ fontWeight: '600' }}>₹{getCartTotal().toLocaleString()}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Sample Collection Kit</span>
                      <span style={{ color: 'var(--success-green)', fontWeight: '600' }}>FREE</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Genetic Counseling</span>
                      <span style={{ color: 'var(--success-green)', fontWeight: '600' }}>FREE</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Shipping</span>
                      <span style={{ color: 'var(--success-green)', fontWeight: '600' }}>FREE</span>
                    </div>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    padding: '1rem',
                    background: 'var(--light-cyan)',
                    borderRadius: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700' }}>Total</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary-blue)' }}>₹{getCartTotal().toLocaleString()}</span>
                  </div>

                  <button
                    type="submit"
                    disabled={processing}
                    className="btn-primary"
                    style={{ 
                      width: '100%', 
                      justifyContent: 'center', 
                      padding: '1.25rem',
                      opacity: processing ? 0.7 : 1,
                      cursor: processing ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {processing ? (
                      <>
                        <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock size={20} />
                        Complete Secure Payment
                      </>
                    )}
                  </button>

                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: '1rem' }}>
                    Your payment information is secure and encrypted
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};