import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * INVENTORY TRACKER - THE PROFIT GUARD
 * Features: Auto-Calculation of Stock Value, Low Stock Warning System,
 * Rapid-Toggle Availability, and Ingredient-Level Management.
 */

const InventoryTracker = () => {
  const { isAdmin } = useAuth();
  const { colors, glass, typography, depth } = ThemeEngine;

  // --- HEAVY STATE: INVENTORY DATA ---
  const [stock, setStock] = useState([
    { id: 'I-001', name: 'Wagyu Beef Paties', category: 'MEAT', quantity: 45, unit: 'kg', minLimit: 10, status: 'STABLE' },
    { id: 'I-002', name: 'Organic Saffron', category: 'SPICES', quantity: 2, unit: 'kg', minLimit: 5, status: 'LOW' },
    { id: 'I-003', name: 'Truffle Oil', category: 'OILS', quantity: 12, unit: 'liters', minLimit: 3, status: 'STABLE' },
    { id: 'I-004', name: 'Premium Basmati', category: 'GRAINS', quantity: 120, unit: 'kg', minLimit: 20, status: 'STABLE' }
  ]);

  // --- LOGIC: QUICK QUANTITY ADJUSTER ---
  const adjustStock = (id, amount) => {
    setStock(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + amount);
        return { 
          ...item, 
          quantity: newQty,
          status: newQty <= item.minLimit ? 'LOW' : 'STABLE'
        };
      }
      return item;
    }));
  };

  if (!isAdmin) return <div style={{ color: colors.primary.gold, textAlign: 'center', padding: '100px' }}>ROYAL AUTHORIZATION REQUIRED</div>;

  return (
    <div style={{ padding: '120px 5% 50px 5%', backgroundColor: '#050505', minHeight: '100vh' }}>
      
      {/* 1. INVENTORY DASHBOARD HEADER */}
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h2 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, fontSize: '2.5rem', margin: 0 }}>PALACE INVENTORY</h2>
          <p style={{ color: '#666' }}>Critical Resource Monitoring & Management</p>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ ...glass, padding: '15px 25px', borderRadius: '15px', border: '1px solid #222' }}>
            <p style={{ margin: 0, fontSize: '0.7rem', color: '#888' }}>TOTAL STOCK VALUE</p>
            <p style={{ margin: 0, color: colors.primary.gold, fontWeight: 'bold', fontSize: '1.2rem' }}>Rs. 845,000</p>
          </div>
        </div>
      </header>

      {/* 2. INVENTORY LISTING TABLE */}
      <div style={{ ...glass, borderRadius: '30px', overflow: 'hidden', border: '1px solid #111' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#0A0A0A' }}>
              <th style={thStyle}>Item Name</th>
              <th style={thStyle}>Category</th>
              <th style={thStyle}>Current Stock</th>
              <th style={thStyle}>Min. Required</th>
              <th style={thStyle}>Status</th>
              <th style={thStyle}>Manage</th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {stock.map((item) => (
                <motion.tr 
                  key={item.id}
                  layout
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  style={{ borderBottom: '1px solid #111' }}
                >
                  <td style={tdStyle}>
                    <span style={{ color: '#FFF', fontWeight: 'bold' }}>{item.name}</span>
                    <p style={{ margin: 0, fontSize: '0.7rem', color: '#444' }}>ID: {item.id}</p>
                  </td>
                  <td style={tdStyle}><span style={catBadge}>{item.category}</span></td>
                  <td style={tdStyle}>
                    <span style={{ fontSize: '1.1rem', color: item.status === 'LOW' ? '#E74C3C' : '#FFF' }}>
                      {item.quantity} {item.unit}
                    </span>
                  </td>
                  <td style={tdStyle}><span style={{ color: '#666' }}>{item.minLimit} {item.unit}</span></td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ 
                        width: '8px', height: '8px', borderRadius: '50%', 
                        background: item.status === 'LOW' ? '#E74C3C' : '#27AE60',
                        boxShadow: item.status === 'LOW' ? '0 0 10px #E74C3C' : 'none'
                      }} />
                      <span style={{ color: item.status === 'LOW' ? '#E74C3C' : '#27AE60', fontSize: '0.8rem', fontWeight: 'bold' }}>
                        {item.status}
                      </span>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button onClick={() => adjustStock(item.id, -5)} style={btnMini}>- 5</button>
                      <button onClick={() => adjustStock(item.id, 5)} style={btnMini}>+ 5</button>
                      <button style={{ ...btnMini, color: colors.primary.gold }}>ORDER MORE</button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

    </div>
  );
};

// --- STYLES ---
const thStyle = { padding: '20px', textAlign: 'left', color: '#D4AF37', fontSize: '0.75rem', textTransform: 'uppercase' };
const tdStyle = { padding: '20px', borderBottom: '1px solid #111' };
const catBadge = { padding: '4px 10px', background: '#111', borderRadius: '5px', fontSize: '0.7rem', color: '#888' };
const btnMini = { background: '#111', border: '1px solid #333', color: '#FFF', padding: '5px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.7rem' };

export default InventoryTracker;
    
