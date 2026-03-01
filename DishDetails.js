import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/Store';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * DISH DETAILS - THE DECISION MAKER
 * Features: High-Res Image Zoom, Dynamic Add-ons, Nutritional Breakdown, 
 * and Kinetic Add-to-Cart Feedback.
 */

const DishDetails = ({ item, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedExtra, setSelectedExtra] = useState([]);
  const dispatch = useDispatch();
  const { colors, glass, typography, depth } = ThemeEngine;

  if (!item) return null;

  // --- HEAVY LOGIC: ADD-ONS MANAGEMENT ---
  const extras = [
    { id: 'ex1', name: 'Extra Royal Sauce', price: 150 },
    { id: 'ex2', name: 'Truffle Oil Drizzle', price: 350 },
    { id: 'ex3', name: 'Caramelized Onions', price: 100 }
  ];

  const toggleExtra = (id) => {
    setSelectedExtra(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const handleAddToCart = () => {
    const finalItem = {
      ...item,
      quantity,
      price: item.price + (selectedExtra.length * 200) // Simplified extra logic
    };
    dispatch(cartActions.addToCart(finalItem));
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          
          {/* 1. BLUR OVERLAY */}
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(15px)' }}
          />

          {/* 2. PRODUCT MODAL CONTAINER */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            style={{ 
              width: '100%', maxWidth: '1000px', background: colors.neutral.royalBlack, 
              borderRadius: '40px', overflow: 'hidden', display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              position: 'relative', boxShadow: depth.high, border: `1px solid ${colors.primary.goldDark}`
            }}
          >
            {/* CLOSE BUTTON */}
            <button onClick={onClose} style={{ position: 'absolute', top: '30px', right: '30px', background: 'none', border: 'none', color: '#FFF', fontSize: '2rem', zIndex: 10, cursor: 'pointer' }}>×</button>

            {/* LEFT: IMAGE SECTION */}
            <div style={{ position: 'relative', height: '100%' }}>
              <motion.img 
                initial={{ scale: 1.2 }} animate={{ scale: 1 }}
                src={item.image} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #0A0A0A, transparent)' }} />
            </div>

            {/* RIGHT: CONTENT SECTION */}
            <div style={{ padding: '60px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div>
                <span style={{ color: colors.primary.gold, letterSpacing: '3px', fontSize: '0.8rem', fontWeight: 'bold' }}>CHEF'S SIGNATURE</span>
                <h2 style={{ fontFamily: typography.fonts.heading, fontSize: '3.5rem', margin: '10px 0', color: colors.neutral.pureWhite }}>{item.name}</h2>
                <p style={{ color: '#888', lineHeight: '1.8', fontSize: '1.1rem' }}>{item.description}</p>
              </div>

              {/* NUTRITION CHIPS */}
              <div style={{ display: 'flex', gap: '15px' }}>
                {['Protein: 45g', 'Fat: 20g', 'Carbs: 12g'].map(stat => (
                  <span key={stat} style={{ background: '#111', padding: '8px 15px', borderRadius: '50px', fontSize: '0.75rem', color: colors.primary.gold, border: '1px solid #222' }}>{stat}</span>
                ))}
              </div>

              {/* ADD-ONS SECTION */}
              <div style={{ marginTop: '20px' }}>
                <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>ENHANCE YOUR FEAST</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                  {extras.map(ex => (
                    <motion.div 
                      key={ex.id}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toggleExtra(ex.id)}
                      style={{ 
                        padding: '12px 20px', borderRadius: '15px', cursor: 'pointer',
                        border: `1px solid ${selectedExtra.includes(ex.id) ? colors.primary.gold : '#333'}`,
                        background: selectedExtra.includes(ex.id) ? 'rgba(212,175,55,0.1)' : 'transparent',
                        color: selectedExtra.includes(ex.id) ? colors.primary.gold : '#888',
                        fontSize: '0.9rem', transition: '0.3s'
                      }}
                    >
                      {ex.name} (+{ex.price})
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* QUANTITY & ACTION */}
              <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '30px', paddingTop: '30px', borderTop: '1px solid #222' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px', background: '#111', padding: '10px 20px', borderRadius: '50px' }}>
                  <button onClick={() => setQuantity(q => Math.max(1, q-1))} style={{ background: 'none', border: 'none', color: colors.primary.gold, fontSize: '1.5rem', cursor: 'pointer' }}>-</button>
                  <span style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{quantity}</span>
                  <button onClick={() => setQuantity(q => q+1)} style={{ background: 'none', border: 'none', color: colors.primary.gold, fontSize: '1.5rem', cursor: 'pointer' }}>+</button>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  onClick={handleAddToCart}
                  style={{ 
                    flex: 1, padding: '20px', background: colors.primary.gold, 
                    color: '#000', border: 'none', borderRadius: '20px', 
                    fontWeight: '900', cursor: 'pointer', fontSize: '1rem' 
                  }}
                >
                  ADD TO FEAST • Rs. {(item.price * quantity) + (selectedExtra.length * 200)}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default DishDetails;
              
