import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import MainLayout from './components/MainLayout';
import Hero from './components/Hero'; // Assuming Hero is modularized
import CategorySlider from './components/CategorySlider';
import FoodCard from './components/FoodCard';
import SmartSearch from './components/SmartSearch';
import ReviewSystem from './components/ReviewSystem';
import MenuData from './data/MenuData';
import ThemeEngine from './theme/ThemeEngine';

/**
 * HOME PAGE - THE ROYAL SHOWCASE
 * Features: Multi-Layer Parallax, Dynamic Filtering, 
 * Intersection Animations, and Smooth Content Sequencing.
 */

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState(MenuData[0].id);
  const { colors, typography } = ThemeEngine;

  // --- HEAVY PARALLAX LOGIC ---
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]); // For background floating elements
  const opacity = useTransform(scrollY, [0, 300, 500], [1, 0.5, 0]);

  // Filtering Logic
  const activeItems = MenuData.find(cat => cat.id === selectedCategory)?.items || [];

  return (
    <MainLayout>
      {/* 1. HERO SECTION WITH VIDEO PARALLAX */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
        <motion.div style={{ y: y1, opacity }} className="hero-content">
          <Hero /> 
        </motion.div>
        
        {/* Floating Gold Grain Overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle, transparent 20%, #0A0A0A 100%)',
          zIndex: 2, pointerEvents: 'none'
        }} />
      </section>

      {/* 2. SEARCH & INTELLIGENCE BAR */}
      <div style={{ 
        marginTop: '-50px', position: 'relative', zIndex: 10, 
        display: 'flex', justifyContent: 'center', padding: '0 8%' 
      }}>
        <SmartSearch onItemSelected={(id) => console.log("Navigating to item:", id)} />
      </div>

      {/* 3. THE ROYAL MENU NAVIGATION */}
      <section id="menu" style={{ padding: '80px 0 20px 0' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <motion.h2 
            initial={{ opacity: 0, letterSpacing: '0px' }}
            whileInView={{ opacity: 1, letterSpacing: '4px' }}
            style={{ 
              fontFamily: typography.fonts.heading, 
              color: colors.primary.gold, 
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              textTransform: 'uppercase'
            }}
          >
            Curated For Royalty
          </motion.h2>
          <div style={{ width: '60px', height: '2px', background: colors.primary.gold, margin: '20px auto' }} />
        </div>

        <CategorySlider 
          activeCategory={selectedCategory} 
          onCategoryChange={setSelectedCategory} 
        />
      </section>

      {/* 4. DYNAMIC FOOD GRID (The Main Attraction) */}
      <section style={{ padding: '40px 8% 100px 8%' }}>
        <motion.div 
          layout
          style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
            gap: '30px' 
          }}
        >
          {activeItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </motion.div>
      </section>

      {/* 5. INTERACTIVE STORY SECTION (Middle Parallax) */}
      <section style={{ 
        height: '60vh', 
        backgroundImage: 'url("https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000")',
        backgroundAttachment: 'fixed',
        backgroundSize: 'cover',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
      }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.7)' }} />
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 3, textAlign: 'center', maxWidth: '800px', padding: '0 20px' }}
        >
          <h2 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, fontSize: '3rem' }}>Our Heritage</h2>
          <p style={{ color: '#DDD', fontSize: '1.1rem', lineHeight: '1.8' }}>
            Born in the heart of traditional spice routes, Fatima's Kitchen blends centuries-old Mughlai 
            secrets with modern culinary precision. Every dish is a testament to our history.
          </p>
        </motion.div>
      </section>

      {/* 6. SOCIAL PROOF & REVIEWS */}
      <ReviewSystem />

      {/* 7. CTA / CONTACT MAP SECTION */}
      <section id="contact" style={{ padding: '100px 8%', backgroundColor: '#050505', textAlign: 'center' }}>
        <h2 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, fontSize: '2.5rem', marginBottom: '30px' }}>
          Visit The Palace
        </h2>
        <div style={{ 
          width: '100%', height: '400px', background: '#111', 
          borderRadius: '30px', border: `1px solid ${colors.primary.goldDark}`,
          display: 'flex', alignItems: 'center', justifyContent: 'center'
        }}>
          <p style={{ color: '#555' }}>[GOOGLE MAPS INTERACTIVE API EMBED]</p>
        </div>
      </section>

    </MainLayout>
  );
};

export default HomePage;

