import React from 'react';
import { motion } from 'framer-motion';
import AppConfig from '../config/AppConfig';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * FOOTER COMPONENT - THE ROYAL CLOSURE
 * Features: Multi-column Grid, Social Hub, Lead Capture Newsletter, and Dynamic Copyright.
 */

const Footer = () => {
  const { brand, contact, social, menu } = AppConfig;
  const { colors, typography } = ThemeEngine;

  // --- FOOTER STYLING OBJECTS ---
  const footerContainer = {
    backgroundColor: '#050505', // Deepest Black for professional contrast
    color: '#FFFFFF',
    padding: '100px 8% 40px 8%',
    borderTop: `1px solid ${colors.primary.goldDark}`,
    fontFamily: typography.fonts.body,
    position: 'relative',
    overflow: 'hidden'
  };

  const footerGrid = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '60px',
    marginBottom: '80px',
    position: 'relative',
    zIndex: 2
  };

  const columnTitle = {
    color: colors.primary.gold,
    fontFamily: typography.fonts.heading,
    fontSize: '1.4rem',
    marginBottom: '30px',
    letterSpacing: '1px'
  };

  const footerLink = {
    color: '#AAAAAA',
    textDecoration: 'none',
    fontSize: '0.9rem',
    display: 'block',
    marginBottom: '15px',
    transition: '0.3s ease-in-out',
    cursor: 'pointer'
  };

  const socialIconWrapper = {
    display: 'flex',
    gap: '15px',
    marginTop: '25px'
  };

  const socialCircle = {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    border: `1px solid ${colors.primary.goldDark}`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.primary.gold,
    transition: '0.4s',
    textDecoration: 'none',
    fontSize: '0.8rem'
  };

  return (
    <footer style={footerContainer}>
      {/* Background Subtle Logo Watermark */}
      <div style={{
        position: 'absolute',
        bottom: '-20px',
        right: '-20px',
        fontSize: '15rem',
        color: 'rgba(212, 175, 55, 0.03)',
        fontFamily: typography.fonts.heading,
        userSelect: 'none',
        zIndex: 1
      }}>
        FK
      </div>

      <div style={footerGrid}>
        
        {/* COLUMN 1: BRAND STORY & SOCIALS */}
        <div className="footer-col">
          <h2 style={columnTitle}>{brand.name.toUpperCase()}</h2>
          <p style={{ color: '#888', lineHeight: '1.8', fontSize: '0.95rem', marginBottom: '30px' }}>
            {brand.tagline}. We bring the heritage of royal kitchens to your doorstep with modern gourmet techniques.
          </p>
          <div style={socialIconWrapper}>
            <a href={social.facebook} style={socialCircle} onMouseOver={(e) => {e.target.style.background = colors.primary.gold; e.target.style.color = '#000'}}>FB</a>
            <a href={social.instagram} style={socialCircle} onMouseOver={(e) => {e.target.style.background = colors.primary.gold; e.target.style.color = '#000'}}>IG</a>
            <a href={social.tiktok} style={socialCircle} onMouseOver={(e) => {e.target.style.background = colors.primary.gold; e.target.style.color = '#000'}}>TK</a>
          </div>
        </div>

        {/* COLUMN 2: QUICK NAVIGATION */}
        <div className="footer-col">
          <h3 style={columnTitle}>EXPLORE</h3>
          <nav>
            <a href="#" style={footerLink} onMouseOver={(e) => e.target.style.color = colors.primary.gold} onMouseOut={(e) => e.target.style.color = '#AAA'}>The Royal Menu</a>
            <a href="#" style={footerLink} onMouseOver={(e) => e.target.style.color = colors.primary.gold} onMouseOut={(e) => e.target.style.color = '#AAA'}>Special Platters</a>
            <a href="#" style={footerLink} onMouseOver={(e) => e.target.style.color = colors.primary.gold} onMouseOut={(e) => e.target.style.color = '#AAA'}>Gourmet Story</a>
            <a href="#" style={footerLink} onMouseOver={(e) => e.target.style.color = colors.primary.gold} onMouseOut={(e) => e.target.style.color = '#AAA'}>Track Your Feast</a>
            <a href="#" style={footerLink} onMouseOver={(e) => e.target.style.color = colors.primary.gold} onMouseOut={(e) => e.target.style.color = '#AAA'}>Contact Us</a>
          </nav>
        </div>

        {/* COLUMN 3: RECENT DELIGHTS (Dynamic from Menu) */}
        <div className="footer-col">
          <h3 style={columnTitle}>DELIGHTS</h3>
          {menu[0].items.slice(0, 3).map(item => (
            <div key={item.id} style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
              <div style={{ width: '60px', height: '60px', background: '#222', borderRadius: '5px' }}></div>
              <div>
                <p style={{ fontSize: '0.85rem', marginBottom: '5px', color: '#EEE' }}>{item.name}</p>
                <p style={{ fontSize: '0.8rem', color: colors.primary.gold }}>Rs. {item.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* COLUMN 4: THE NEWSLETTER HOOK */}
        <div className="footer-col">
          <h3 style={columnTitle}>NEWSLETTER</h3>
          <p style={{ color: '#888', fontSize: '0.9rem', marginBottom: '20px' }}>
            Subscribe to receive exclusive royal deals and secret menu updates.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input 
              type="email" 
              placeholder="Your Email Address" 
              style={{ 
                background: '#111', border: '1px solid #333', padding: '15px', 
                color: '#FFF', outline: 'none', borderRadius: '4px' 
              }} 
            />
            <button className="btn-gold" style={{ width: '100%', padding: '12px' }}>
              SUBSCRIBE NOW
            </button>
          </div>
        </div>
      </div>

      {/* --- FINAL BOTTOM BAR --- */}
      <div style={{ 
        borderTop: '1px solid #222', paddingTop: '40px', 
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' 
      }}>
        <p style={{ color: '#555', fontSize: '0.8rem' }}>
          © {new Date().getFullYear()} {brand.legalName}. All Rights Reserved.
        </p>
        <div style={{ display: 'flex', gap: '30px' }}>
          <span style={{ color: '#555', fontSize: '0.75rem', cursor: 'pointer' }}>PRIVACY POLICY</span>
          <span style={{ color: '#555', fontSize: '0.75rem', cursor: 'pointer' }}>TERMS OF SERVICE</span>
          <span style={{ color: '#555', fontSize: '0.75rem', cursor: 'pointer' }}>REFUND POLICY</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
                
