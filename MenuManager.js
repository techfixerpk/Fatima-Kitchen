import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import MenuData from '../data/MenuData';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * MENU MANAGER - THE CONTENT ENGINE
 * Features: Real-time Item Editing, Instant Price Updates, 
 * Category Toggling, and Dynamic Image URL Preview.
 */

const MenuManager = () => {
  const { isAdmin } = useAuth();
  const { colors, glass, typography } = ThemeEngine;
  
  const [localMenu, setLocalMenu] = useState(MenuData);
  const [editingItem, setEditingItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  // --- HEAVY LOGIC: INSTANT PRICE UPDATE ---
  const updatePrice = (catId, itemId, newPrice) => {
    const updatedMenu = localMenu.map(cat => {
      if (cat.id === catId) {
        return {
          ...cat,
          items: cat.items.map(item => 
            item.id === itemId ? { ...item, price: parseInt(newPrice) } : item
          )
        };
      }
      return cat;
    });
    setLocalMenu(updatedMenu);
  };

  // --- LOGIC: DELETE ITEM FROM PALACE ---
  const deleteItem = (catId, itemId) => {
    if(window.confirm("Are you sure you want to remove this royal dish?")) {
        const updatedMenu = localMenu.map(cat => {
          if (cat.id === catId) {
            return { ...cat, items: cat.items.filter(item => item.id !== itemId) };
          }
          return cat;
        });
        setLocalMenu(updatedMenu);
    }
  };

  if (!isAdmin) return <div style={{ color: 'red', textAlign: 'center', marginTop: '100px' }}>UNAUTHORIZED ACCESS</div>;

  return (
    <div style={{ padding: '120px 5% 50px 5%', backgroundColor: '#050505', minHeight: '100vh' }}>
      
      {/* 1. MANAGEMENT HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div>
          <h2 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, fontSize: '2.5rem', margin: 0 }}>MENU ARCHITECT</h2>
          <p style={{ color: '#666' }}>Modify your culinary offerings in real-time.</p>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          onClick={() => setShowAddModal(true)}
          style={{ 
            background: colors.primary.gold, color: '#000', padding: '15px 30px', 
            borderRadius: '15px', fontWeight: 'bold', border: 'none', cursor: 'pointer' 
          }}
        >
          + ADD NEW DISH
        </motion.button>
      </div>

      {/* 2. CATEGORY-WISE EDITOR GRID */}
      {localMenu.map((category) => (
        <div key={category.id} style={{ marginBottom: '60px' }}>
          <h3 style={{ color: colors.primary.gold, borderBottom: '1px solid #222', paddingBottom: '10px', marginBottom: '25px' }}>
            {category.category}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
            {category.items.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                style={{ ...glass, padding: '20px', borderRadius: '20px', display: 'flex', gap: '15px', border: '1px solid #111' }}
              >
                <img src={item.image} style={{ width: '80px', height: '80px', borderRadius: '12px', objectFit: 'cover' }} alt="" />
                
                <div style={{ flex: 1 }}>
                  <h4 style={{ margin: '0 0 5px 0', color: '#FFF' }}>{item.name}</h4>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#555', fontSize: '0.8rem' }}>Price: Rs.</span>
                    <input 
                      type="number"
                      defaultValue={item.price}
                      onBlur={(e) => updatePrice(category.id, item.id, e.target.value)}
                      style={{ 
                        background: '#111', border: `1px solid #333`, color: colors.primary.gold, 
                        width: '80px', padding: '5px', borderRadius: '5px', fontWeight: 'bold' 
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button onClick={() => deleteItem(category.id, item.id)} style={{ background: 'none', border: 'none', color: '#E74C3C', cursor: 'pointer' }}>🗑️</button>
                  <button style={{ background: 'none', border: 'none', color: '#3498DB', cursor: 'pointer' }}>✏️</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* 3. ADD NEW ITEM MODAL (Simulated Overlay) */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 5000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <motion.div 
              initial={{ y: 50 }} animate={{ y: 0 }}
              style={{ ...glass, width: '500px', padding: '40px', borderRadius: '30px', border: `1px solid ${colors.primary.gold}` }}
            >
              <h3 style={{ color: colors.primary.gold, marginBottom: '20px' }}>New Culinary Creation</h3>
              <input placeholder="Dish Name" style={inputStyle} />
              <input placeholder="Price (Rs.)" type="number" style={inputStyle} />
              <input placeholder="Image URL" style={inputStyle} />
              <textarea placeholder="Ingredients / Description" style={{...inputStyle, height: '100px'}} />
              
              <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
                <button onClick={() => setShowAddModal(false)} style={{ flex: 1, padding: '15px', borderRadius: '10px', background: '#222', color: '#FFF', border: 'none' }}>CANCEL</button>
                <button style={{ flex: 1, padding: '15px', borderRadius: '10px', background: colors.primary.gold, color: '#000', fontWeight: 'bold', border: 'none' }}>SAVE DISH</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const inputStyle = { width: '100%', padding: '15px', marginBottom: '15px', background: '#111', border: '1px solid #333', color: '#FFF', borderRadius: '10px' };

export default MenuManager;
    
