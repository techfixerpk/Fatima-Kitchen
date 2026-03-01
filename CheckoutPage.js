import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions } from '../store/Store';
import MainLayout from './MainLayout';
import VoucherSystem from './VoucherSystem';
import ThemeEngine from '../theme/ThemeEngine';
import AppConfig from '../config/AppConfig';

/**
 * CHECKOUT PAGE - THE ROYAL GATEWAY
 * Features: Form Validation, Progress Tracking, Dynamic Bill Breakdown,
 * and Animated Order Confirmation.
 */

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, finalAmount, appliedVoucher } = useSelector(state => state.cart);
  const { colors, typography, glass, depth } = ThemeEngine;
  const { operations } = AppConfig;

  const [orderStep, setOrderStep] = useState(1); // 1: Info, 2: Payment, 3: Success
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', address: '', city: 'Islamabad', paymentMethod: 'COD'
  });

  // --- HEAVY LOGIC: FINAL BILL CALCULATION ---
  const tax = (totalAmount * 0.05).toFixed(2);
  const delivery = operations.deliveryFee;
  const grandTotal = (parseFloat(finalAmount || totalAmount) + parseFloat(tax) + delivery).toFixed(2);

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderStep(2); // Move to Payment Simulation
    setTimeout(() => {
      setOrderStep(3); // Show Success after 2 seconds
      dispatch(cartActions.clearCart()); // Wipe cart after royal purchase
    }, 2500);
  };

  if (orderStep === 3) {
    return (
      <MainLayout>
        <div style={{ height: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} style={{ fontSize: '6rem', color: colors.primary.gold }}>👑</motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, fontSize: '3.5rem' }}>ORDER PLACED!</motion.h1>
          <p style={{ color: '#888', maxWidth: '500px' }}>Your royal feast is being prepared by our master chefs. Expect the arrival of our delivery knights within 45 minutes.</p>
          <button className="btn-gold" style={{ marginTop: '30px' }} onClick={() => window.location.href = '/'}>BACK TO PALACE</button>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <section style={{ padding: '120px 8% 100px 8%', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '50px' }}>
        
        {/* LEFT: FORM & PROGRESS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <span style={{ color: orderStep >= 1 ? colors.primary.gold : '#333', fontWeight: 'bold' }}>01 DETAILS</span>
            <div style={{ flex: 1, height: '1px', background: '#222', alignSelf: 'center' }} />
            <span style={{ color: orderStep >= 2 ? colors.primary.gold : '#333', fontWeight: 'bold' }}>02 PAYMENT</span>
          </div>

          <form onSubmit={handlePlaceOrder} style={{ ...glass, padding: '50px', borderRadius: '30px', border: `1px solid ${colors.primary.goldDark}` }}>
            <h2 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, marginBottom: '30px' }}>Shipping Details</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <input required style={inputStyle} placeholder="Full Name" onChange={(e) => setFormData({...formData, name: e.target.value})} />
              <input required style={inputStyle} placeholder="Phone Number" onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            </div>
            <input required style={{...inputStyle, width: '100%', marginBottom: '20px'}} placeholder="Email Address" type="email" />
            <textarea required style={{...inputStyle, width: '100%', height: '120px', marginBottom: '30px'}} placeholder="Complete Delivery Address" />
            
            <h2 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, marginBottom: '30px' }}>Payment Method</h2>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '40px' }}>
              {['COD', 'CARD', 'WALLET'].map(method => (
                <div 
                  key={method} 
                  onClick={() => setFormData({...formData, paymentMethod: method})}
                  style={{ 
                    flex: 1, padding: '20px', borderRadius: '15px', textAlign: 'center', cursor: 'pointer',
                    border: `1px solid ${formData.paymentMethod === method ? colors.primary.gold : '#222'}`,
                    background: formData.paymentMethod === method ? 'rgba(212,175,55,0.05)' : 'transparent',
                    color: formData.paymentMethod === method ? colors.primary.gold : '#555'
                  }}
                >
                  {method}
                </div>
              ))}
            </div>

            <button type="submit" className="btn-gold" style={{ width: '100%', padding: '20px', fontSize: '1.1rem' }}>
              {orderStep === 2 ? 'PROCESSING...' : 'CONFIRM ROYAL ORDER'}
            </button>
          </form>
        </div>

        {/* RIGHT: ORDER SUMMARY (Sticky) */}
        <div style={{ position: 'sticky', top: '120px', height: 'fit-content' }}>
          <div style={{ ...glass, padding: '40px', borderRadius: '30px', border: `1px solid #222` }}>
            <h3 style={{ color: colors.primary.gold, marginBottom: '25px' }}>ORDER SUMMARY</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '25px', paddingRight: '10px' }}>
              {items.map(item => (
                <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ color: '#AAA' }}>{item.quantity}x {item.name}</span>
                  <span style={{ color: '#FFF' }}>Rs. {item.totalPrice}</span>
                </div>
              ))}
            </div>

            <VoucherSystem cartTotal={totalAmount} onApplyDiscount={(v) => dispatch(cartActions.applyVoucher(v))} />

            <div style={{ marginTop: '30px', borderTop: '1px solid #222', paddingTop: '20px' }}>
              <div style={sumLine}><span>Subtotal</span><span>Rs. {totalAmount}</span></div>
              <div style={sumLine}><span>Service Tax (5%)</span><span>Rs. {tax}</span></div>
              <div style={sumLine}><span>Delivery Fee</span><span>Rs. {delivery}</span></div>
              {appliedVoucher && <div style={{...sumLine, color: colors.primary.gold}}><span>Discount</span><span>-Rs. {totalAmount - finalAmount}</span></div>}
              <div style={{...sumLine, marginTop: '20px', fontSize: '1.4rem', color: colors.primary.gold, fontWeight: 'bold'}}>
                <span>TOTAL</span><span>Rs. {grandTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

const inputStyle = { background: '#111', border: '1px solid #222', padding: '15px 20px', color: '#FFF', borderRadius: '12px', outline: 'none' };
const sumLine = { display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem', color: '#888' };

export default CheckoutPage;
  
