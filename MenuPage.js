import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from './MainLayout';
import CategorySlider from './CategorySlider';
import FoodCard from './FoodCard';
import SmartSearch from './SmartSearch';
import MenuData from '../data/MenuData';
import ThemeEngine from '../theme/ThemeEngine';
import { uiActions } from '../store/Store';

/**
 * MENU PAGE - THE ENGINE OF CONVERSION
 * Features: Multi-State Filtering, Auto-Anchor Scrolling, 
 * Real-time Search Result Highlighting, and Floating Cart Trigger.
 */

const MenuPage = () => {
  const [activeCat, setActiveCat] = useState(MenuData[0].id);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredMenu, setFilteredMenu] = useState(MenuData);
  
  const { colors, typography, glass } = ThemeEngine;
  const dispatch = useDispatch();
  const cartQuantity = useSelector(state => state.cart.totalQuantity);

  // --- HEAVY LOGIC: SEARCH FILTERING ENGINE ---
  useEffect(() => {
    if (!searchQuery) {
      setFilteredMenu(MenuData);
      return;
    }
    const filtered = MenuData.map(cat => ({
      ...cat,
      items: cat.items.filter(item => 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })).filter(cat => cat.items.length > 0);
    
    setFilteredMenu(filtered);
  }, [searchQuery]);

  // --- PARALLAX HERO LOGIC ---
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 300], [0, 100]);
  const opacityRange = useTransform(scrollY, [0, 200], [1, 0]);

  return (
    <MainLayout>
      {/* 1. COMPACT GOURMET HERO */}
      <section style={{ 
        height: '45vh', position: 'relative', overflow: 'hidden', 
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: '#050505'
      }}>
        <motion.div style={{ y: yRange, opacity: opacityRange, textAlign: 'center', zIndex: 2 }}>
          <h1 style={{ 
            fontFamily: typography.fonts.heading, color: colors.primary.gold, 
            fontSize: 'clamp(3rem, 8vw, 6rem)', margin: 0 
          }}>
            THE ROYAL MENU
          </h1>
          <p style={{ color: '#888', letterSpacing: '5px', textTransform: 'uppercase' }}>
            A Symphony of Flavors & Heritage
          </p>
        </motion.div>
        
        {/* Abstract Background Elements */}
        <div style={{ 
          position: 'absolute', width: '100%', height: '100%', 
          backgroundImage: 'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000")',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.2 
        }} />
      </section>

      {/* 2. STICKY INTERACTIVE BAR (Search + Categories) */}
      <div style={{ position: 'sticky', top: '70px', zIndex: 100, background: colors.neutral.deepBlack }}>
        <div style={{ padding: '20px 8% 0 8%' }}>
          <SmartSearch onSearch={setSearchQuery} />
        </div>
        <CategorySlider 
          activeCategory={activeCat} 
          onCategoryChange={(id) => {
            setActiveCat(id);
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }} 
        />
      </div>

      {/* 3. DYNAMIC MENU GRID SYSTEM */}
      <section style={{ padding: '60px 8% 120px 8%' }}>
        {filteredMenu.map((category) => (
          <div key={category.id} id={category.id} style={{ marginBottom: '80px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '40px' }}>
              <h2 style={{ 
                fontFamily: typography.fonts.heading, color: colors.primary.gold, 
                fontSize: '2rem', whiteSpace: 'nowrap' 
              }}>
                {category.category}
              </h2>
              <div style={{ flex: 1, height: '1px', background: 'linear-gradient(to right, rgba(212,175,55,0.5), transparent)' }} />
            </div>

            <motion.div 
              layout
              style={{ 
                display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
                gap: '40px' 
              }}
            >
              <AnimatePresence mode='popLayout'>
                {category.items.map((item) => (
                  <FoodCard key={item.id} item={item} />
                ))}
              </AnimatePresence>
            </motion.div>
          </div>
        ))}

        {filteredMenu.length === 0 && (
          <div style={{ textAlign: 'center', padding: '100px 0' }}>
            <h3 style={{ color: '#555' }}>No royal dishes found for your search.</h3>
            <button 
              onClick={() => setSearchQuery('')}
              style={{ color: colors.primary.gold, background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.1rem' }}
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* 4. FLOATING ACTION HUB (CART TRIGGER) */}
      {cartQuantity > 0 && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => dispatch(uiActions.toggleCart())}
          style={{
            position: 'fixed', bottom: '40px', left: '40px', 
            background: colors.primary.gold, padding: '20px 30px',
            borderRadius: '50px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
            cursor: 'pointer', zIndex: 1000, display: 'flex', alignItems: 'center', gap: '15px'
          }}
        >
          <span style={{ fontWeight: '900', color: '#000' }}>{cartQuantity} ITEMS</span>
          <div style={{ width: '1px', height: '20px', background: 'rgba(0,0,0,0.2)' }} />
          <span style={{ fontWeight: 'bold', color: '#000' }}>VIEW TRAY →</span>
        </motion.div>
      )}

    </MainLayout>
  );
};

export default MenuPage;
