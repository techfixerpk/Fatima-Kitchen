import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from './MainLayout';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * ORDER TRACKING - THE LIVE ASSURANCE ENGINE
 * Features: Animated Progress Stepper, Simulated Rider Movement, 
 * Dynamic ETA Countdown, and Visual Pulse Indicators.
 */

const OrderTracking = ({ orderId = "FK-99283" }) => {
  const { colors, glass, typography, depth } = ThemeEngine;
  const [currentStep, setCurrentStep] = useState(0); // 0: Confirmed, 1: Preparing, 2: On Way, 3: Arrived
  const [timeLeft, setTimeLeft] = useState(35); // Estimated minutes

  // --- HEAVY LOGIC: SIMULATED PROGRESS ENGINE ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep(prev => (prev < 3 ? prev + 1 : 3));
      setTimeLeft(prev => (prev > 5 ? prev - 8 : 2));
    }, 15000); // 15 seconds par state change hogi (Testing ke liye fast kiya hai)

    return () => clearInterval(timer);
  }, []);

  const steps = [
    { id: 0, label: 'Order Confirmed', icon: '📜', desc: 'The Royal Kitchen has received your request.' },
    { id: 1, label: 'Chef is Crafting', icon: '👨‍🍳', desc: 'Your feast is being prepared with gold-standard spices.' },
    { id: 2, label: 'Knight Dispatched', icon: '🏍️', desc: 'Our delivery knight is racing through the city for you.' },
    { id: 3, label: 'Arrived at Palace', icon: '🏰', desc: 'Your royal meal is at your doorstep. Enjoy!' }
  ];

  // --- STYLES ---
  const trackerContainer = {
    ...glass,
    padding: '40px',
    borderRadius: '30px',
    border: `1px solid ${colors.primary.goldDark}`,
    maxWidth: '800px',
    margin: '100px auto',
    position: 'relative',
    overflow: 'hidden'
  };

  const pulseStyle = {
    width: '10px', height: '10px', borderRadius: '50%',
    backgroundColor: colors.primary.gold,
    position: 'absolute', top: '20px', right: '20px',
    boxShadow: `0 0 15px ${colors.primary.gold}`
  };

  return (
    <MainLayout>
      <section style={{ padding: '0 8%', minHeight: '90vh', display: 'flex', alignItems: 'center' }}>
        <div style={trackerContainer}>
          {/* 1. LIVE PULSE INDICATOR */}
          <motion.div 
            animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }} 
            transition={{ repeat: Infinity, duration: 2 }} 
            style={pulseStyle} 
          />
          <span style={{ position: 'absolute', top: '16px', right: '40px', fontSize: '0.7rem', color: colors.primary.gold, fontWeight: 'bold' }}>LIVE TRACKING</span>

          {/* 2. HEADER INFO */}
          <div style={{ marginBottom: '40px' }}>
            <h2 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, fontSize: '2rem', margin: '0' }}>TRACKING ORDER #{orderId}</h2>
            <p style={{ color: '#888', margin: '10px 0 0 0' }}>Estimated Arrival: <span style={{ color: '#FFF', fontWeight: 'bold' }}>{timeLeft} Minutes</span></p>
          </div>

          {/* 3. VERTICAL PROGRESS STEPPER (The "Heavy" UI) */}
          <div style={{ position: 'relative', paddingLeft: '40px' }}>
            {/* Timeline Line */}
            <div style={{ position: 'absolute', left: '15px', top: '10px', bottom: '10px', width: '2px', background: '#222' }} />
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
              {steps.map((step, index) => {
                const isActive = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                  <motion.div 
                    key={step.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
                    style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', position: 'relative' }}
                  >
                    {/* Circle Indicator */}
                    <div style={{ 
                      position: 'absolute', left: '-33px', width: '18px', height: '18px', 
                      borderRadius: '50%', background: isActive ? colors.primary.gold : '#111',
                      border: `2px solid ${isActive ? colors.primary.gold : '#333'}`,
                      boxShadow: isCurrent ? `0 0 20px ${colors.primary.gold}` : 'none',
                      zIndex: 2, transition: '0.5s'
                    }} />

                    <div style={{ fontSize: '2rem' }}>{step.icon}</div>
                    <div>
                      <h4 style={{ margin: '0', color: isActive ? colors.primary.gold : '#555', transition: '0.5s' }}>{step.label}</h4>
                      <p style={{ margin: '5px 0 0 0', fontSize: '0.85rem', color: isActive ? '#AAA' : '#444', lineHeight: '1.4' }}>{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* 4. RIDER CARD INTERACTION */}
          <motion.div 
            initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            style={{ 
              marginTop: '50px', padding: '20px', background: 'rgba(255,255,255,0.02)', 
              borderRadius: '20px', border: '1px solid #222', display: 'flex', 
              alignItems: 'center', justifyContent: 'space-between' 
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: colors.primary.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem' }}>👤</div>
              <div>
                <p style={{ margin: 0, fontSize: '0.7rem', color: '#666' }}>YOUR KNIGHT</p>
                <h5 style={{ margin: 0, fontSize: '1rem' }}>Sultan Khan</h5>
              </div>
            </div>
            <button style={{ 
              padding: '10px 20px', background: 'transparent', 
              border: `1px solid ${colors.primary.gold}`, color: colors.primary.gold, 
              borderRadius: '10px', fontSize: '0.8rem', cursor: 'pointer' 
            }}>
              CALL RIDER
            </button>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default OrderTracking;
              
