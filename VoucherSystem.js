import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti'; // Package.json mein add kiya tha
import AppConfig from '../config/AppConfig';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * VOUCHER SYSTEM - THE CONVERSION CATALYST
 * Features: Real-time Validation, Confetti Celebration, Shake-on-Error, and Auto-copy functionality.
 */

const VoucherSystem = ({ cartTotal, onApplyDiscount }) => {
  const [voucherCode, setVoucherCode] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success | error | validating
  const [appliedVoucher, setAppliedVoucher] = useState(null);

  const { colors, glass } = ThemeEngine;

  // --- HARDCODED ROYAL VOUCHERS (Pro Strategy) ---
  const VALID_VOUCHERS = {
    'ROYAL10': { type: 'percentage', value: 10, minOrder: 1000, desc: '10% OFF on Royal Feast' },
    'FATIMA500': { type: 'flat', value: 500, minOrder: 3000, desc: 'Rs. 500 Flat Discount' },
    'FIRSTORDER': { type: 'percentage', value: 20, minOrder: 500, desc: 'Welcome 20% Discount' }
  };

  const handleApply = () => {
    setStatus('validating');
    
    setTimeout(() => {
      const code = voucherCode.toUpperCase().trim();
      const voucher = VALID_VOUCHERS[code];

      if (voucher && cartTotal >= voucher.minOrder) {
        setStatus('success');
        setAppliedVoucher({ code, ...voucher });
        onApplyDiscount(voucher);
        
        // --- CELEBRATION LOGIC ---
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: [colors.primary.gold, '#FFFFFF', colors.primary.goldDark]
        });
      } else {
        setStatus('error');
        // Reset error after 2 seconds
        setTimeout(() => setStatus('idle'), 2000);
      }
    }, 800);
  };

  const containerStyle = {
    ...glass,
    padding: '30px',
    borderRadius: '20px',
    marginTop: '20px',
    border: `1px solid ${status === 'error' ? colors.functional.error : colors.primary.goldDark}`,
    transition: '0.3s'
  };

  const inputStyle = {
    flex: 1,
    background: 'rgba(255,255,255,0.05)',
    border: `1px solid ${colors.primary.goldDark}`,
    padding: '12px 20px',
    borderRadius: '10px 0 0 10px',
    color: '#FFF',
    outline: 'none',
    fontSize: '0.9rem',
    fontFamily: 'var(--font-body)'
  };

  return (
    <motion.div 
      style={containerStyle}
      animate={status === 'error' ? { x: [-10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.4 }}
    >
      <h3 style={{ 
        fontFamily: 'var(--font-heading)', 
        color: colors.primary.gold, 
        fontSize: '1.2rem', 
        marginBottom: '15px' 
      }}>
        APPLY ROYAL VOUCHER
      </h3>

      {!appliedVoucher ? (
        <div style={{ display: 'flex' }}>
          <input 
            type="text" 
            placeholder="Enter Code (e.g. ROYAL10)" 
            style={inputStyle}
            value={voucherCode}
            onChange={(e) => setVoucherCode(e.target.value)}
            disabled={status === 'validating'}
          />
          <button 
            onClick={handleApply}
            disabled={status === 'validating'}
            style={{
              padding: '12px 25px',
              backgroundColor: colors.primary.gold,
              color: '#000',
              border: 'none',
              borderRadius: '0 10px 10px 0',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: '0.3s'
            }}
          >
            {status === 'validating' ? '...' : 'APPLY'}
          </button>
        </div>
      ) : (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{ 
            background: 'rgba(39, 174, 96, 0.1)', 
            padding: '15px', 
            borderRadius: '10px', 
            border: `1px solid ${colors.functional.success}`,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <span style={{ color: colors.functional.success, fontWeight: 'bold' }}>✓ CODE APPLIED: {appliedVoucher.code}</span>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#AAA' }}>{appliedVoucher.desc}</p>
          </div>
          <button 
            onClick={() => {setAppliedVoucher(null); setVoucherCode('');}}
            style={{ background: 'none', border: 'none', color: '#FF4444', cursor: 'pointer' }}
          >
            REMOVE
          </button>
        </motion.div>
      )}

      {/* ERROR MESSAGE */}
      <AnimatePresence>
        {status === 'error' && (
          <motion.p 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{ color: colors.functional.error, fontSize: '0.8rem', marginTop: '10px', fontWeight: 'bold' }}
          >
            Invalid code or minimum order not met!
          </motion.p>
        )}
      </AnimatePresence>

      {/* SUGGESTED VOUCHERS FOR MAX CONVERSION */}
      <div style={{ marginTop: '20px' }}>
        <p style={{ fontSize: '0.75rem', color: '#666', marginBottom: '10px' }}>AVAILABLE OFFERS:</p>
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '5px' }}>
          {['ROYAL10', 'FIRSTORDER'].map(code => (
            <span 
              key={code}
              onClick={() => setVoucherCode(code)}
              style={{ 
                fontSize: '0.7rem', border: `1px dashed ${colors.primary.gold}`, 
                padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', color: colors.primary.gold 
              }}
            >
              {code}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default VoucherSystem;

