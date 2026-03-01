import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppConfig from '../config/AppConfig';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * NAVBAR COMPONENT - THE ROYAL GATEWAY
 * Features: Adaptive Glassmorphism, Shrinking Header, Mobile Sidebar, and Active State Tracking.
 */

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('home');

  const { brand, contact } = AppConfig;
  const { colors, motion: themeMotion, glass } = ThemeEngine;

  // 1. SCROLL LISTENER - Handles the "Shrinking" and "Blur" Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. STYLES DEFINITION (Maxed Out Inline Logic)
  const navContainerStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
    transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const mainNavStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isScrolled ? '15px 8%' : '25px 8%',
    backgroundColor: isScrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
    backdropFilter: isScrolled ? glass.backdropFilter : 'none',
    borderBottom: isScrolled ? `1px solid ${colors.primary.goldDark}` : 'none',
    transition: 'inherit',
  };

  const linkStyle = (id) => ({
    color: activeLink === id ? colors.primary.gold : colors.neutral.pureWhite,
    textDecoration: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    letterSpacing: '1.5px',
    transition: '0.3s',
    cursor: 'pointer',
    position: 'relative'
  });

  const menuItems = [
    { name: 'HOME', id: 'home', link: '#' },
    { name: 'MENU', id: 'menu', link: '#menu' },
    { name: 'SPECIALS', id: 'specials', link: '#specials' },
    { name: 'STORY', id: 'story', link: '#story' }
  ];

  return (
    <>
      <nav style={navContainerStyles}>
        {/* --- TOP ANNOUNCEMENT BAR --- */}
        {!isScrolled && (
          <div style={{
            backgroundColor: colors.primary.gold,
            color: '#000',
            textAlign: 'center',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            padding: '8px 0',
            letterSpacing: '2px'
          }}>
            ✨ FREE DELIVERY ON YOUR FIRST ROYAL ORDER! ✨
          </div>
        )}

        {/* --- MAIN NAVIGATION BAR --- */}
        <div style={mainNavStyles}>
          {/* Brand Identity */}
          <div className="nav-brand" style={{ cursor: 'pointer' }}>
            <h1 style={{ 
              color: colors.primary.gold, 
              fontFamily: ThemeEngine.typography.fonts.heading,
              fontSize: isScrolled ? '1.5rem' : '1.8rem',
              margin: 0,
              transition: '0.4s'
            }}>
              {brand.name.toUpperCase()}
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav" style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            {menuItems.map((item) => (
              <a 
                key={item.id}
                href={item.link}
                className="nav-link-hover"
                style={linkStyle(item.id)}
                onClick={() => setActiveLink(item.id)}
              >
                {item.name}
              </a>
            ))}

            <a href={contact.whatsappLink} className="btn-gold" style={{ 
              padding: '10px 25px', 
              fontSize: '0.8rem',
              borderRadius: '0' 
            }}>
              ORDER NOW
            </a>
          </div>

          {/* Hamburger Icon (Mobile Only) */}
          <div 
            className="mobile-hamburger" 
            onClick={() => setIsMobileOpen(true)}
            style={{ display: 'none', cursor: 'pointer' }} // Control via CSS media query
          >
            <div style={{ width: '25px', height: '2px', background: colors.primary.gold, marginBottom: '6px' }} />
            <div style={{ width: '20px', height: '2px', background: colors.primary.gold, marginBottom: '6px' }} />
            <div style={{ width: '25px', height: '2px', background: colors.primary.gold }} />
          </div>
        </div>
      </nav>

      {/* --- MOBILE SIDEBAR OVERLAY --- */}
      <AnimatePresence>
        {isMobileOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileOpen(false)}
              style={{
                position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
                background: 'rgba(0,0,0,0.8)', zIndex: 1100, backdropFilter: 'blur(5px)'
              }}
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{
                position: 'fixed', top: 0, right: 0, width: '80%', height: '100vh',
                background: colors.neutral.royalBlack, zIndex: 1200, padding: '50px 40px',
                borderLeft: `2px solid ${colors.primary.gold}`
              }}
            >
              <div onClick={() => setIsMobileOpen(false)} style={{ color: colors.primary.gold, fontSize: '2rem', textAlign: 'right', cursor: 'pointer' }}>×</div>
              <div style={{ marginTop: '50px', display: 'flex', flexDirection: 'column', gap: '30px' }}>
                {menuItems.map((item) => (
                  <a 
                    key={item.id} 
                    href={item.link} 
                    onClick={() => setIsMobileOpen(false)}
                    style={{ ...linkStyle(item.id), fontSize: '1.5rem' }}
                  >
                    {item.name}
                  </a>
                ))}
                <hr style={{ borderColor: 'rgba(212, 175, 55, 0.2)' }} />
                <p style={{ color: colors.primary.gold, fontSize: '0.8rem' }}>CONNECT WITH US</p>
                <div style={{ display: 'flex', gap: '20px' }}>
                  <span style={{ color: '#fff' }}>FB</span>
                  <span style={{ color: '#fff' }}>IG</span>
                  <span style={{ color: '#fff' }}>WA</span>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
            
