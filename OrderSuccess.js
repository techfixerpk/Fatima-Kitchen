import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import MainLayout from './MainLayout';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * ORDER SUCCESS COMPONENT - THE ROYAL GRATITUDE
 * Features: Automatic Confetti, Simulated Tracking, 
 * Social Sharing Buttons, and Return-to-Palace Logic.
 */

const OrderSuccess = () => {
  const { colors, typography, depth } = ThemeEngine;

  // --- HEAVY CELEBRATION LOGIC ---
  useEffect(() => {
    // Royal Gold & Silver Confetti Blast
    const duration = 5 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors: [colors.primary.gold, '#FFF'] });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors: [colors.primary.gold, '#DDD'] });
    }, 250);

    return () => clearInterval(interval);
  }, [colors.primary.gold]);

  // --- STYLES ---
  const containerStyle = {
    minHeight: '85vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0 8%'
  };

  const statusCard = {
    background: 'rgba(255, 255, 255, 0.03)',
    border: `1px solid ${colors.primary.goldDark}`,
    borderRadius: '30px',
    padding: '40px',
    maxWidth: '600px',
    boxShadow: depth.high,
    backdropFilter: 'blur(20px)'
  };

  const steps = [
    { label: 'Order Confirmed', active: true },
    { label: 'Preparing Feast', active: true },
    { label: 'Knight Dispatched', active: false },
    { label: 'Delivered', active: false }
  ];

  return (
    <MainLayout>
      <div style={containerStyle}>
        {/* 1. ANIMATED CROWN ICON */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 12, stiffness: 200 }}
          style={{ fontSize: '6rem', marginBottom: '20px' }}
        >
          👑
        </motion.div>

        {/* 2. SUCCESS MESSAGE */}
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ 
            fontFamily: typography.fonts.heading, 
            color: colors.primary.gold, 
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            margin: '0 0 10px 0'
          }}
        >
          HAIL TO THE GUEST!
        </motion.h1>
        
        <p style={{ color: '#888', fontSize: '1.1rem', marginBottom: '40px', letterSpacing: '1px' }}>
          Your royal order **#FK-99283** has been received with honor.
        </p>

        {/* 3. TRACKING PROGRESS BAR (The "Heavy" Logic) */}
        <div style={statusCard}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '30px' }}>
            {steps.map((step, i) => (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
                <div style={{ 
                  width: '12px', height: '12px', borderRadius: '50%', 
                  background: step.active ? colors.primary.gold : '#333',
                  boxShadow: step.active ? `0 0 15px ${colors.primary.gold}` : 'none'
                }} />
                <span style={{ fontSize: '0.65rem', color: step.active ? '#FFF' : '#444', fontWeight: 'bold', textTransform: 'uppercase' }}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <p style={{ color: '#AAA', fontSize: '0.9rem', lineHeight: '1.6' }}>
            Estimated Arrival: <span style={{ color: colors.primary.gold }}>35 - 45 Minutes</span>
          </p>
        </div>

        {/* 4. INTERACTIVE FOOTER */}
        <div style={{ display: 'flex', gap: '20px', marginTop: '50px' }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/'}
            style={{ 
              padding: '15px 40px', background: colors.primary.gold, 
              border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' 
            }}
          >
            RETURN TO PALACE
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            style={{ 
              padding: '15px 40px', background: 'transparent', 
              border: `1px solid ${colors.primary.gold}`, color: colors.primary.gold,
              borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' 
            }}
          >
            SHARE MY FEAST
          </motion.button>
        </div>
      </div>
    </MainLayout>
  );
};

export default OrderSuccess;
                   
