import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { cartActions } from '../store/Store';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * FOOD CARD COMPONENT - THE SALES ENGINE
 * Features: 3D Tilt Effect, Badge Logic, Redux Dispatch, and Image Shimmer.
 */

const FoodCard = ({ item }) => {
  const dispatch = useDispatch();
  const { colors, typography, depth, glass } = ThemeEngine;

  // --- REDUX ACTION: Add to Royal Cart ---
  const addToCartHandler = () => {
    dispatch(cartActions.addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image
    }));
    // Logic for a small "Success" toast can be added here
  };

  // --- STYLES OBJECTS ---
  const cardStyle = {
    ...glass,
    position: 'relative',
    borderRadius: '25px',
    overflow: 'hidden',
    padding: '0',
    cursor: 'pointer',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    border: `1px solid rgba(212, 175, 55, 0.1)`,
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };

  const imageContainer = {
    position: 'relative',
    height: '240px',
    overflow: 'hidden',
    borderRadius: '25px 25px 0 0'
  };

  const priceBadge = {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    backgroundColor: colors.primary.gold,
    color: '#000',
    padding: '8px 15px',
    borderRadius: '50px',
    fontWeight: 'bold',
    fontSize: '0.9rem',
    boxShadow: depth.medium,
    zIndex: 5
  };

  const badgeStyle = (bgColor) => ({
    padding: '4px 12px',
    borderRadius: '4px',
    fontSize: '0.65rem',
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: '1px',
    backgroundColor: bgColor,
    color: '#FFF',
    marginRight: '8px'
  });

  return (
    <motion.div
      whileHover={{ 
        y: -15, 
        scale: 1.02,
        boxShadow: "0 25px 50px rgba(0,0,0,0.5), 0 0 20px rgba(212, 175, 55, 0.1)" 
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      style={cardStyle}
    >
      {/* 1. IMAGE SECTION WITH ZOOM HOVER */}
      <div style={imageContainer}>
        <motion.img
          whileHover={{ scale: 1.15 }}
          transition={{ duration: 0.8 }}
          src={item.image}
          alt={item.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={priceBadge}>Rs. {item.price}</div>
        
        {/* Floating Tags Logic */}
        <div style={{ position: 'absolute', top: '15px', left: '15px', display: 'flex' }}>
          {item.isBestSeller && <span style={badgeStyle(colors.primary.goldDark)}>BESTSELLER</span>}
          {item.isSpicy && <span style={badgeStyle('#C0392B')}>SPICY 🔥</span>}
        </div>
      </div>

      {/* 2. CONTENT SECTION */}
      <div style={{ padding: '25px', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ 
          fontFamily: typography.fonts.heading, 
          color: colors.primary.gold, 
          margin: '0 0 12px 0',
          fontSize: '1.3rem'
        }}>
          {item.name}
        </h3>
        
        <p style={{ 
          color: '#AAA', 
          fontSize: '0.85rem', 
          lineHeight: '1.6', 
          margin: '0 0 20px 0',
          flexGrow: 1 
        }}>
          {item.description.substring(0, 95)}...
        </p>

        {/* 3. INTERACTIVE BUTTONS */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={addToCartHandler}
            style={{
              flex: 1,
              backgroundColor: colors.primary.gold,
              color: '#000',
              border: 'none',
              padding: '12px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '0.8rem',
              cursor: 'pointer',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}
          >
            ADD TO CART
          </motion.button>
          
          <button style={{
            width: '45px',
            backgroundColor: 'transparent',
            border: `1px solid ${colors.primary.goldDark}`,
            color: colors.primary.gold,
            borderRadius: '12px',
            cursor: 'pointer'
          }}>
            ♡
          </button>
        </div>
      </div>

      {/* 4. NUTRITION PREVIEW (The "Heavy" Touch) */}
      <div style={{ 
        padding: '10px 25px', 
        borderTop: '1px solid rgba(255,255,255,0.05)', 
        display: 'flex', 
        justifyContent: 'space-between',
        fontSize: '0.7rem',
        color: '#666'
      }}>
        <span>CALORIES: {item.nutrition?.calories || 'N/A'}</span>
        <span>PROTEIN: {item.nutrition?.protein || 'N/A'}</span>
      </div>
    </motion.div>
  );
};

export default FoodCard;
          
