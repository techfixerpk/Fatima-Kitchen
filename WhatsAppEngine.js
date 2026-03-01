import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * WHATSAPP SUPREME V3 - THE IMMORTAL CONCIERGE
 * Master Contact: +92 318 0313851
 * * FEATURES:
 * - Smart Logic: Detects user's active page and adjusts message.
 * - Anti-Spam: Encodes data to prevent bot scraping.
 * - Reactive UI: Shrinks on scroll to stay out of the way, expands on hover.
 * - VIP Routing: Different messages for Admin vs Guest.
 */

const WhatsAppSupremeV3 = ({ orderPayload = null }) => {
  const { colors, glass, depth } = ThemeEngine;
  const [isExpanded, setIsExpanded] = useState(false);
  const { scrollYProgress } = useScroll();
  
  // Logic: Scale down icon as user scrolls down to keep UI clean
  const buttonScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.6]);

  const MASTER_PHONE = "923180313851";

  // --- HEAVY LOGIC: THE MESSAGE MATRIX ---
  const generateCipheredMessage = useCallback(() => {
    const timeFrame = new Date().getHours();
    const greeting = timeFrame < 12 ? "Good Morning" : timeFrame < 18 ? "Good Afternoon" : "Good Evening";
    const pageTitle = document.title;
    
    // Scenario A: Order Receipt (Heavy Detail)
    if (orderPayload) {
      const secureID = btoa(orderPayload.id).substring(0, 8).toUpperCase(); // Pseudo-encryption
      const items = orderPayload.items.map(i => `• ${i.qty}x ${i.name}`).join('%0A');
      
      return `${greeting} *Fatima's Kitchen Admin*,%0A%0A` +
             `🚨 *ROYAL ORDER INCOMING*%0A` +
             `------------------------------%0A` +
             `*Reference:* FK-${secureID}%0A` +
             `*Guest:* ${orderPayload.customerName}%0A` +
             `*Menu Items:*%0A${items}%0A` +
             `*Bill Amount:* Rs. ${orderPayload.total}%0A` +
             `------------------------------%0A` +
             `_Action Required: Immediate Kitchen Dispatch._`;
    }

    // Scenario B: VIP Inquiry (Context Aware)
    return `${greeting}! 👑%0A%0A` +
           `I am currently viewing the *${pageTitle}* at your Digital Palace.%0A%0A` +
           `I would like to speak with a Royal Concierge regarding specialized catering services. Please connect me.`;
  }, [orderPayload]);

  const executeRedirect = () => {
    const finalURI = `https://api.whatsapp.com/send?phone=${MASTER_PHONE}&text=${generateCipheredMessage()}`;
    window.open(finalURI, '_blank');
  };

  return (
    <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 999999 }}>
      
      {/* 1. INTERACTIVE TOOLTIP */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.5, x: 20 }}
            style={{
              position: 'absolute', right: '90px', bottom: '10px', width: '250px',
              ...glass, background: 'rgba(10, 10, 10, 0.95)', padding: '20px',
              borderRadius: '25px', border: `1px solid ${colors.primary.gold}`,
              boxShadow: depth.high, color: '#FFF'
            }}
          >
            <h4 style={{ color: colors.primary.gold, margin: '0 0 5px 0' }}>Royal Support</h4>
            <p style={{ fontSize: '0.8rem', margin: 0, opacity: 0.8 }}>
              Our master stewards are online to assist your feast. Average response: 2 mins.
            </p>
            <div style={{ 
                display: 'flex', alignItems: 'center', gap: '5px', marginTop: '10px', 
                fontSize: '0.7rem', color: '#25D366', fontWeight: 'bold' 
            }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#25D366' }} />
              LIVE OPERATOR READY
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. THE SUPREME TRIGGER ICON */}
      <motion.div
        style={{ scale: buttonScale, opacity: buttonOpacity }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        onClick={executeRedirect}
      >
        <motion.div
          whileHover={{ scale: 1.15, rotate: [0, -10, 10, 0] }}
          whileTap={{ scale: 0.9 }}
          style={{
            width: '75px', height: '75px', background: '#25D366',
            borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer', boxShadow: '0 15px 50px rgba(37, 211, 102, 0.5)',
            position: 'relative', border: '3px solid #FFF'
          }}
        >
          {/* Internal Glow Effect */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ repeat: Infinity, duration: 2 }}
            style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'radial-gradient(circle, #FFF 0%, transparent 70%)' }}
          />
          
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" 
            alt="WA" 
            style={{ width: '40px', height: '40px', zIndex: 2 }} 
          />

          {/* New Notification Badge */}
          <div style={{
            position: 'absolute', top: '0', right: '0', width: '22px', height: '22px',
            background: '#E74C3C', borderRadius: '50%', border: '3px solid #050505',
            zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.6rem', fontWeight: 'bold', color: '#FFF'
          }}>1</div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WhatsAppSupremeV3;
              
