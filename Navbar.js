import React, { useState, useEffect } from 'react';
import AppConfig from '../config/AppConfig';
import ThemeEngine from '../theme/ThemeEngine';

const Navbar = () => {
  // State to track if user has scrolled
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Agar 50px se zyada scroll kiya toh true
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const { brand, contact } = AppConfig;
  const { colors, layers } = ThemeEngine;

  // Dynamic Styles based on scroll state
  const navStyles = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: layers.navbar,
    height: isScrolled ? '70px' : '90px', // Shrinks on scroll
    backgroundColor: isScrolled ? 'rgba(26, 26, 26, 0.95)' : 'transparent',
    backdropFilter: isScrolled ? 'blur(10px)' : 'none',
    borderBottom: isScrolled ? `1px solid ${colors.light.primary}` : 'none',
    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 8%',
  };

  return (
    <nav style={navStyles} className="navbar-assembly">
      {/* Brand Side */}
      <div className="nav-brand">
        <h1 style={{ 
          color: colors.light.primary, 
          fontSize: isScrolled ? '1.5rem' : '1.8rem',
          transition: '0.4s'
        }}>
          {brand.name.toUpperCase()}
        </h1>
      </div>

      {/* Action Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <a href="#menu" className="nav-link">Menu</a>
        <a href={contact.whatsappLink} className="btn-gold" style={{ padding: '10px 20px' }}>
          ORDER NOW
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
  // --- STEP 2: Mobile Logic & Sidebar Styles ---
  const [isOpen, setIsOpen] = useState(false); // Menyuni ochish/yopish holati

  const toggleMenu = () => setIsOpen(!isOpen);

  const sidebarStyle = {
    position: 'fixed',
    top: 0,
    right: isOpen ? '0' : '-100%', // Agar ochiq bo'lsa ko'rinadi, yopiq bo'lsa ekrandan chiqib ketadi
    width: '280px',
    height: '100vh',
    backgroundColor: '#1A1A1A', // Royal Black background
    zIndex: layers.sidebar,
    transition: '0.6s cubic-bezier(0.8, 0, 0.2, 1)', // Smooth slide effect
    display: 'flex',
    flexDirection: 'column',
    padding: '40px 20px',
    boxShadow: effects.shadows.premium,
    borderLeft: `2px solid ${colors.light.primary}` // Oltin rangli chegara
  };

  const menuLinkStyle = {
    color: '#FFFFFF',
    fontSize: '1.2rem',
    textDecoration: 'none',
    marginBottom: '25px',
    fontFamily: "'Playfair Display', serif",
    letterSpacing: '1px'
  };

  // ----------------------------------------------
            // --- STEP 3: Announcement Bar Logic ---
  const announcementStyle = {
    width: '100%',
    backgroundColor: colors.light.primary, // Gold
    color: '#000', // Black text for contrast
    padding: '8px 0',
    fontSize: '0.85rem',
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    display: isScrolled ? 'none' : 'block', // Scroll karte hi gayab ho jaye ga
    transition: '0.3s ease-in-out',
    fontFamily: 'var(--font-body)'
  };
  // --- STEP 4: Interactive Link Logic ---
  const [activeLink, setActiveLink] = useState('home');

  const navLinks = [
    { name: 'HOME', id: 'home', link: '#' },
    { name: 'OUR MENU', id: 'menu', link: '#menu' },
    { name: 'DEALS', id: 'deals', link: '#deals' },
    { name: 'CONTACT', id: 'contact', link: '#contact' }
  ];

  const getLinkStyle = (id) => ({
    color: activeLink === id ? colors.light.primary : '#FFFFFF',
    textDecoration: 'none',
    fontSize: '0.85rem',
    fontWeight: '600',
    letterSpacing: '1px',
    transition: '0.3s',
    position: 'relative',
    padding: '5px 0'
  });
  // --- STEP 5: Social Media Logic ---
  const socialIconsStyle = {
    display: 'flex',
    gap: '20px',
    marginTop: 'auto', // Isay sidebar ke bilkul niche push kar dega
    paddingTop: '30px',
    borderTop: `1px solid rgba(212, 175, 55, 0.2)`
  };

  const iconStyle = {
    color: colors.light.primary,
    fontSize: '1.2rem',
    transition: '0.3s',
    cursor: 'pointer'
  };

  // Inhe Sidebar Drawer ke div ke andar bilkul niche rakhein:
  
    <div style={sidebarStyle}>
       ... (Step 2 links) ...
       
       <div style={socialIconsStyle}>
          <a href="#" style={iconStyle}>FB</a>
          <a href="#" style={iconStyle}>IG</a>
          <a href="#" style={iconStyle}>WA</a>
       </div>
    </div>
  
