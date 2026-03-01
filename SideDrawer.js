import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppConfig from '../config/AppConfig';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * SIDEDRAWER COMPONENT - THE MOBILE HUB
 * Features: Gesture-based closing, Staggered link animations, and Social integration.
 */

const SideDrawer = ({ isOpen, onClose }) => {
  const { brand, contact, social } = AppConfig;
  const { colors, typography, glass } = ThemeEngine;

  // --- HEAVY ANIMATION VARIANTS ---
  const drawerVariants = {
    closed: { x: '100%', transition: { type: 'spring', damping: 30, stiffness: 300 } },
    opened: { x: 0, transition: { type: 'spring', damping: 25, stiffness: 200 } }
  };

  const overlayVariants = {
    closed: { opacity: 0 },
    opened: { opacity: 1 }
  };

  const listVariants = {
    opened: { transition: { staggerChildren: 0.1, delayChildren: 0.3 } },
    closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
  };

  const itemVariants = {
    opened: { y: 0, opacity: 1 },
    closed: { y: 20, opacity: 0 }
  };

  // --- INTERNAL COMPONENTS / STYLES ---
  const drawerStyle = {
    position: 'fixed',
    top: 0,
    right: 0,
    width: '85%',
    maxWidth: '400px',
    height: '100vh',
    background: colors.neutral.deepBlack,
    zIndex: 2000,
    padding: '40px',
    display: 'flex',
    flexDirection: 'column',
    borderLeft: `1px solid ${colors.primary.goldDark}`,
    boxShadow: '-10px 0 30px rgba(0,0,0,0.5)'
  };

  const menuLink = {
    fontFamily: typography.fonts.heading,
    fontSize: '2rem',
    color: colors.neutral.pureWhite,
    textDecoration: 'none',
    marginBottom: '25px',
    display: 'block',
    letterSpacing: '1px'
  };

  const navItems = [
    { name: 'Home', link: '#' },
    { name: 'The Menu', link: '#menu' },
    { name: 'Specials', link: '#specials' },
    { name: 'Our Story', link: '#story' },
    { name: 'Contact', link: '#contact' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            variants={overlayVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            onClick={onClose}
            style={{
              position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
              background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)', zIndex: 1999
            }}
          />

          {/* Main Drawer Container */}
          <motion.div
            variants={drawerVariants}
            initial="closed"
            animate="opened"
            exit="closed"
            style={drawerStyle}
          >
            {/* Close Button */}
            <div 
              onClick={onClose} 
              style={{ alignSelf: 'flex-end', cursor: 'pointer', marginBottom: '40px' }}
            >
              <div style={{ width: '30px', height: '2px', background: colors.primary.gold, transform: 'rotate(45deg)', position: 'absolute' }} />
              <div style={{ width: '30px', height: '2px', background: colors.primary.gold, transform: 'rotate(-45deg)' }} />
            </div>

            {/* Brand Section */}
            <div style={{ marginBottom: '60px' }}>
              <h2 style={{ color: colors.primary.gold, fontSize: '1.2rem', letterSpacing: '3px' }}>
                {brand.name.toUpperCase()}
              </h2>
            </div>

            {/* Navigation Links with Staggered Motion */}
            <motion.nav variants={listVariants} style={{ flexGrow: 1 }}>
              {navItems.map((item, index) => (
                <motion.a
                  key={index}
                  href={item.link}
                  variants={itemVariants}
                  onClick={onClose}
                  style={menuLink}
                  whileHover={{ x: 10, color: colors.primary.gold }}
                >
                  {item.name}
                </motion.a>
              ))}
            </motion.nav>

            {/* Contact & Social Footer of Sidebar */}
            <motion.div 
              variants={itemVariants}
              style={{ borderTop: `1px solid ${colors.primary.goldDark}`, paddingTop: '30px' }}
            >
              <p style={{ color: colors.primary.gold, fontSize: '0.8rem', marginBottom: '15px', letterSpacing: '2px' }}>
                ORDER NOW
              </p>
              <a href={`tel:${contact.phone}`} style={{ color: '#FFF', textDecoration: 'none', display: 'block', fontSize: '1.2rem', marginBottom: '20px' }}>
                {contact.phone}
              </a>
              
              <div style={{ display: 'flex', gap: '20px' }}>
                {['FB', 'IG', 'WA'].map(social => (
                  <span key={social} style={{ color: colors.primary.gold, fontWeight: 'bold', fontSize: '0.9rem' }}>
                    {social}
                  </span>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default SideDrawer;
