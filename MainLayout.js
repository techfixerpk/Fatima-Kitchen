import React, { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './Navbar';
import SideDrawer from './SideDrawer';
import Footer from './Footer';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * MAIN LAYOUT COMPONENT - THE PROJECT ARCHITECT
 * Features: Global Scroll Progress, SideDrawer Management, Smooth Section Transitions.
 */

const MainLayout = ({ children }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { colors } = ThemeEngine;

  // --- HEAVY SCROLL PROGRESS LOGIC ---
  // Ye website ke top par ek patli gold line dikhayega jo scroll ke sath barhegi
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const layoutStyle = {
    backgroundColor: colors.neutral.deepBlack,
    minHeight: '100vh',
    width: '100%',
    position: 'relative',
    overflowX: 'hidden'
  };

  const progressBarStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: colors.primary.gold,
    transformOrigin: '0%',
    zIndex: 2000 // Navbar se bhi upar
  };

  // Logic to handle body scroll lock when drawer is open
  if (typeof window !== 'undefined') {
    document.body.style.overflow = isDrawerOpen ? 'hidden' : 'unset';
  }

  return (
    <div style={layoutStyle}>
      {/* 1. TOP SCROLL INDICATOR (The Pro Touch) */}
      <motion.div style={progressBarStyle} style={{ ...progressBarStyle, scaleX }} />

      {/* 2. NAVIGATION SYSTEMS */}
      <Navbar onMenuClick={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* 3. DYNAMIC CONTENT AREA */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{ minHeight: '80vh' }}
      >
        {children}
      </motion.main>

      {/* 4. GLOBAL CTA / WHATSAPP BUBBLE (Always Accessible) */}
      <motion.a
        href="https://wa.me/923001234567"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px',
          backgroundColor: '#25D366',
          color: 'white',
          padding: '15px 20px',
          borderRadius: '50px',
          boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
          zIndex: 999,
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontWeight: 'bold',
          fontSize: '0.9rem'
        }}
      >
        <span>CHAT WITH US</span>
      </motion.a>

      {/* 5. THE FOUNDATION */}
      <Footer />
    </div>
  );
};

export default MainLayout;

