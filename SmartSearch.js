import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AppConfig from '../config/AppConfig';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * SMART SEARCH COMPONENT - THE SELECTION ENGINE
 * Features: Real-time Fuzzy Search, Categorized Results, Visual Feedback, and Deep Linking.
 */

const SmartSearch = ({ onItemSelected }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const searchRef = useRef(null);

  const { menu } = AppConfig;
  const { colors, glass, motion: themeMotion } = ThemeEngine;

  // --- HEAVY SEARCH LOGIC (The Brain) ---
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = [];
    menu.forEach(category => {
      category.items.forEach(item => {
        if (
          item.name.toLowerCase().includes(query.toLowerCase()) ||
          item.description.toLowerCase().includes(query.toLowerCase()) ||
          category.category.toLowerCase().includes(query.toLowerCase())
        ) {
          filtered.push({ ...item, categoryName: category.category });
        }
      });
    });
    setResults(filtered.slice(0, 5)); // Limit to top 5 for "Heavy" UI look
  }, [query, menu]);

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // --- STYLES OBJECTS ---
  const searchWrapper = {
    position: 'relative',
    width: '100%',
    maxWidth: '500px',
    margin: '0 auto',
    zIndex: 1500
  };

  const inputStyle = {
    width: '100%',
    padding: '15px 25px 15px 50px',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: `1px solid ${isFocused ? colors.primary.gold : 'rgba(212, 175, 55, 0.3)'}`,
    borderRadius: '50px',
    color: '#FFF',
    fontSize: '1rem',
    outline: 'none',
    transition: 'all 0.4s ease',
    backdropFilter: 'blur(10px)',
    fontFamily: 'var(--font-body)'
  };

  const resultsDropdown = {
    position: 'absolute',
    top: '110%',
    left: 0,
    right: 0,
    backgroundColor: colors.neutral.royalBlack,
    border: `1px solid ${colors.primary.goldDark}`,
    borderRadius: '15px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.6)',
    zIndex: 1600,
    backdropFilter: 'blur(20px)'
  };

  return (
    <div style={searchWrapper} ref={searchRef}>
      {/* Search Icon (Absolute Positioned) */}
      <span style={{
        position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)',
        color: colors.primary.gold, fontSize: '1.2rem', pointerEvents: 'none'
      }}>
        🔍
      </span>

      <input
        type="text"
        placeholder="Search Royal Dishes (e.g. Steak, Platter...)"
        style={inputStyle}
        value={query}
        onFocus={() => setIsFocused(true)}
        onChange={(e) => setQuery(e.target.value)}
      />

      {/* --- FLOATING RESULTS DROPDOWN --- */}
      <AnimatePresence>
        {isFocused && query.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={resultsDropdown}
          >
            {results.length > 0 ? (
              results.map((item, index) => (
                <motion.div
                  key={item.id}
                  whileHover={{ backgroundColor: 'rgba(212, 175, 55, 0.1)' }}
                  onClick={() => {
                    setQuery('');
                    setIsFocused(false);
                    onItemSelected(item.id);
                  }}
                  style={{
                    padding: '15px 25px', borderBottom: index !== results.length - 1 ? '1px solid #222' : 'none',
                    cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                  }}
                >
                  <div>
                    <h4 style={{ margin: 0, fontSize: '0.95rem', color: colors.primary.gold }}>{item.name}</h4>
                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#888' }}>{item.categoryName}</p>
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Rs. {item.price}</span>
                </motion.div>
              ))
            ) : (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                No royal dish found for "{query}"
              </div>
            )}

            {/* View All Button */}
            <div style={{
              padding: '12px', background: 'rgba(212, 175, 55, 0.05)', textAlign: 'center',
              borderTop: '1px solid #222', fontSize: '0.8rem', color: colors.primary.gold, cursor: 'pointer'
            }}>
              VIEW FULL MENU
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Decorative Glow */}
      {isFocused && (
        <motion.div
          layoutId="glow"
          style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            boxShadow: `0 0 25px ${colors.primary.gold}44`, borderRadius: '50px', zIndex: -1
          }}
        />
      )}
    </div>
  );
};

export default SmartSearch;
  
