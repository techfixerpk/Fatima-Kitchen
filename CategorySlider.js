import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, FreeMode } from 'swiper/modules';
import MenuData from '../data/MenuData';
import ThemeEngine from '../theme/ThemeEngine';

// Swiper styles import (Ensure these are in your project)
import 'swiper/css';
import 'swiper/css/free-mode';

/**
 * CATEGORY SLIDER - THE NAVIGATION HUB
 * Features: Touch-enabled scrolling, Active Category Highlighting, 
 * Dynamic Icons, and Auto-scroll to Section logic.
 */

const CategorySlider = ({ activeCategory, onCategoryChange }) => {
  const { colors, typography, glass } = ThemeEngine;

  // --- STYLES OBJECTS ---
  const sliderWrapper = {
    padding: '40px 0',
    backgroundColor: colors.neutral.deepBlack,
    position: 'sticky',
    top: '70px', // Navbar ke neechay lock ho jayega
    zIndex: 900,
    borderBottom: `1px solid rgba(212, 175, 55, 0.1)`,
    backdropFilter: 'blur(10px)'
  };

  const categoryTab = (isActive) => ({
    padding: '12px 30px',
    borderRadius: '50px',
    cursor: 'pointer',
    backgroundColor: isActive ? colors.primary.gold : 'rgba(255,255,255,0.05)',
    border: `1px solid ${isActive ? colors.primary.gold : 'rgba(212, 175, 55, 0.3)'}`,
    color: isActive ? '#000' : '#AAA',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    whiteSpace: 'nowrap'
  });

  const textStyle = {
    fontSize: '0.85rem',
    fontWeight: '700',
    letterSpacing: '1px',
    fontFamily: typography.fonts.accent
  };

  // Icon Mapping Logic (Visual Polish)
  const getIcon = (name) => {
    if (name.includes('PLATTERS')) return '👑';
    if (name.includes('BURGERS')) return '🍔';
    if (name.includes('DESSERTS')) return '🍰';
    if (name.includes('BEVERAGES')) return '🍷';
    return '🍽️';
  };

  return (
    <div style={sliderWrapper}>
      <div className="container" style={{ padding: '0 8%' }}>
        <Swiper
          slidesPerView={'auto'}
          spaceBetween={15}
          freeMode={true}
          modules={[FreeMode, Navigation]}
          className="categorySwiper"
        >
          {MenuData.map((cat) => (
            <SwiperSlide key={cat.id} style={{ width: 'auto' }}>
              <motion.div
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onCategoryChange(cat.id)}
                style={categoryTab(activeCategory === cat.id)}
              >
                <span style={{ fontSize: '1.2rem' }}>{getIcon(cat.category)}</span>
                <span style={textStyle}>{cat.category}</span>
                
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeGlow"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50px',
                      boxShadow: `0 0 20px ${colors.primary.gold}66`,
                      zIndex: -1
                    }}
                  />
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Subtle Gradient Faders for Smooth UX */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '8%',
        background: 'linear-gradient(to right, #0A0A0A, transparent)', zIndex: 2, pointerEvents: 'none'
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '8%',
        background: 'linear-gradient(to left, #0A0A0A, transparent)', zIndex: 2, pointerEvents: 'none'
      }} />
    </div>
  );
};

export default CategorySlider;
              
