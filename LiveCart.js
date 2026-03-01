import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { cartActions, uiActions } from '../store/Store';
import ThemeEngine from '../theme/ThemeEngine';
import AppConfig from '../config/AppConfig';

/**
 * LIVE CART COMPONENT - THE CONVERSION HUB
 * Features: Auto-Calculation, Motion-Staggered Items, 
 * Dynamic Tax Engine, and Persistence-ready checkout.
 */

const LiveCart = () => {
  const dispatch = useDispatch();
  const { items, totalAmount, finalAmount, totalQuantity, appliedVoucher } = useSelector((state) => state.cart);
  const isCartOpen = useSelector((state) => state.ui.isCartOpen);
  
  const { colors, glass, typography, depth } = ThemeEngine;
  const { operations } = AppConfig;

  // --- HEAVY LOGIC: TAX & SERVICE CALCULATIONS ---
  const taxAmount = (totalAmount * 0.05).toFixed(2); // 5% Royal Service Tax
  const grandTotal = (parseFloat(finalAmount || totalAmount) + operations.deliveryFee + parseFloat(taxAmount)).toFixed(2);

  const toggleCart = () => dispatch(uiActions.toggleCart());

  // --- STYLES OBJECTS ---
  const drawerStyle = {
    position: 'fixed', top: 0, right: 0, width: '100%', maxWidth: '450px',
    height: '100vh', background: colors.neutral.deepBlack, zIndex: 2500,
    display: 'flex', flexDirection: 'column', borderLeft: `1px solid ${colors.primary.goldDark}`,
    boxShadow: depth.high
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* 1. BACKDROP OVERLAY */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={toggleCart}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 2499 }}
          />

          {/* 2. MAIN CART DRAWER */}
          <motion.div
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={drawerStyle}
          >
            {/* HEADER */}
            <div style={{ padding: '30px', borderBottom: '1px solid #222', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, margin: 0 }}>YOUR FEAST</h2>
              <button onClick={toggleCart} style={{ background: 'none', border: 'none', color: '#FFF', fontSize: '1.5rem', cursor: 'pointer' }}>×</button>
            </div>

            {/* CART ITEMS LIST (SCROLLABLE) */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '100px' }}>
                  <p style={{ color: '#555', fontSize: '1.2rem' }}>The Royal Tray is empty...</p>
                  <button onClick={toggleCart} style={{ color: colors.primary.gold, background: 'none', border: 'none', cursor: 'pointer', marginTop: '10px' }}>Start Adding Dishes</button>
                </div>
              ) : (
                <AnimatePresence>
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8 }}
                      style={{ display: 'flex', gap: '15px', marginBottom: '20px', background: '#111', padding: '15px', borderRadius: '15px' }}
                    >
                      <img src={item.image} style={{ width: '70px', height: '70px', borderRadius: '10px', objectFit: 'cover' }} alt={item.name} />
                      <div style={{ flex: 1 }}>
                        <h4 style={{ color: colors.primary.gold, margin: '0 0 5px 0', fontSize: '0.9rem' }}>{item.name}</h4>
                        <p style={{ color: '#888', fontSize: '0.8rem' }}>Rs. {item.price} x {item.quantity}</p>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '5px' }}>
                        <button onClick={() => dispatch(cartActions.addToCart(item))} style={{ color: colors.primary.gold, background: 'none', border: 'none', cursor: 'pointer' }}>▲</button>
                        <span style={{ fontSize: '0.8rem' }}>{item.quantity}</span>
                        <button onClick={() => dispatch(cartActions.removeFromCart(item.id))} style={{ color: '#555', background: 'none', border: 'none', cursor: 'pointer' }}>▼</button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* SUMMARY & CHECKOUT */}
            {items.length > 0 && (
              <div style={{ padding: '30px', background: '#050505', borderTop: `1px solid ${colors.primary.goldDark}` }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#888' }}>Subtotal</span>
                  <span>Rs. {totalAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#888' }}>Royal Service Tax (5%)</span>
                  <span>Rs. {taxAmount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.9rem' }}>
                  <span style={{ color: '#888' }}>Delivery Fee</span>
                  <span>Rs. {operations.deliveryFee}</span>
                </div>
                
                {appliedVoucher && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', color: colors.primary.gold }}>
                    <span>Voucher ({appliedVoucher.code})</span>
                    <span>- Rs. {totalAmount - finalAmount}</span>
                  </div>
                )}

                <hr style={{ borderColor: '#222', margin: '20px 0' }} />
                
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
                  <span style={{ fontWeight: 'bold' }}>GRAND TOTAL</span>
                  <span style={{ color: colors.primary.gold, fontWeight: 'bold', fontSize: '1.2rem' }}>Rs. {grandTotal}</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  style={{ 
                    width: '100%', padding: '20px', background: colors.primary.gold, 
                    border: 'none', borderRadius: '15px', fontWeight: '800', 
                    fontSize: '1rem', cursor: 'pointer', letterSpacing: '2px' 
                  }}
                >
                  CONFIRM ROYAL ORDER
                </motion.button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LiveCart;
              
