import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ThemeEngine from '../theme/ThemeEngine';
import MenuData from '../data/MenuData';

/**
 * ADMIN DASHBOARD - THE PALACE STEWARD
 * Features: Live Sales Analytics, Order Queue Management, 
 * Inventory Toggling, and Executive Summary Cards.
 */

const AdminDashboard = () => {
  const { user, isAdmin } = useAuth();
  const { colors, glass, typography, depth } = ThemeEngine;
  
  // --- HEAVY STATE: DASHBOARD ANALYTICS ---
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [orders, setOrders] = useState([
    { id: 'ORD-552', customer: 'Ali Khan', items: 'Royal Platter x1', total: 4500, status: 'PENDING' },
    { id: 'ORD-553', customer: 'Sara Ahmed', items: 'Truffle Burger x2', total: 3200, status: 'PREPARING' },
    { id: 'ORD-554', customer: 'Zain Malik', items: 'Saffron Tea x4', total: 1200, status: 'COMPLETED' }
  ]);

  // Security Check: Only Fatima can see this
  if (!isAdmin) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#000' }}>
        <h1 style={{ color: colors.primary.gold }}>ACCESS DENIED: ROYAL CLEARANCE REQUIRED</h1>
      </div>
    );
  }

  // --- STYLES ---
  const statCard = {
    ...glass,
    padding: '30px',
    borderRadius: '25px',
    border: `1px solid ${colors.primary.goldDark}`,
    textAlign: 'center',
    flex: 1
  };

  const tableHeader = {
    color: colors.primary.gold,
    padding: '15px',
    borderBottom: '1px solid #222',
    textAlign: 'left',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '1px'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#050505', padding: '100px 5% 50px 5%' }}>
      
      {/* 1. EXECUTIVE HEADER */}
      <header style={{ marginBottom: '50px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
        <div>
          <h1 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, fontSize: '3rem', margin: 0 }}>
            COMMAND CENTER
          </h1>
          <p style={{ color: '#666', letterSpacing: '2px' }}>Welcome back, Executive Chef {user.name}</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <span style={{ display: 'block', color: colors.primary.gold, fontWeight: 'bold' }}>SYSTEM STATUS: ONLINE</span>
          <span style={{ fontSize: '0.8rem', color: '#444' }}>Server: Royal-Node-01</span>
        </div>
      </header>

      {/* 2. ANALYTICS GRID (The "Heavy" Metrics) */}
      <div style={{ display: 'flex', gap: '25px', marginBottom: '50px' }}>
        <motion.div whileHover={{ y: -5 }} style={statCard}>
          <p style={{ fontSize: '0.7rem', color: '#888' }}>TOTAL REVENUE</p>
          <h2 style={{ fontSize: '2.5rem', color: colors.primary.gold }}>Rs. 142,500</h2>
          <span style={{ color: '#27AE60', fontSize: '0.8rem' }}>+12% vs Yesterday</span>
        </motion.div>
        
        <motion.div whileHover={{ y: -5 }} style={statCard}>
          <p style={{ fontSize: '0.7rem', color: '#888' }}>ACTIVE ORDERS</p>
          <h2 style={{ fontSize: '2.5rem', color: '#FFF' }}>14</h2>
          <span style={{ color: colors.primary.gold, fontSize: '0.8rem' }}>4 Priority Guests</span>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} style={statCard}>
          <p style={{ fontSize: '0.7rem', color: '#888' }}>AVG. PREP TIME</p>
          <h2 style={{ fontSize: '2.5rem', color: '#FFF' }}>22 Min</h2>
          <span style={{ color: '#E74C3C', fontSize: '0.8rem' }}>+3m Delay</span>
        </motion.div>
      </div>

      {/* 3. ORDER MANAGEMENT TABLE */}
      <section style={{ ...glass, borderRadius: '30px', padding: '40px', border: '1px solid #111' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <h3 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold }}>LIVE ORDER QUEUE</h3>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ background: '#111', border: '1px solid #333', color: '#FFF', padding: '8px 15px', borderRadius: '10px', fontSize: '0.7rem' }}>REFRESH</button>
            <button style={{ background: colors.primary.gold, border: 'none', color: '#000', padding: '8px 15px', borderRadius: '10px', fontSize: '0.7rem', fontWeight: 'bold' }}>EXPORT CSV</button>
          </div>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={tableHeader}>Order ID</th>
              <th style={tableHeader}>Guest</th>
              <th style={tableHeader}>Items</th>
              <th style={tableHeader}>Total Bill</th>
              <th style={tableHeader}>Status</th>
              <th style={tableHeader}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} style={{ borderBottom: '1px solid #111' }}>
                <td style={{ padding: '20px', color: '#FFF', fontWeight: 'bold' }}>#{order.id}</td>
                <td style={{ padding: '20px', color: '#AAA' }}>{order.customer}</td>
                <td style={{ padding: '20px', color: '#AAA' }}>{order.items}</td>
                <td style={{ padding: '20px', color: colors.primary.gold }}>Rs. {order.total}</td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '5px 12px', borderRadius: '50px', fontSize: '0.7rem', fontWeight: 'bold',
                    background: order.status === 'PENDING' ? '#C0392B' : '#F1C40F',
                    color: order.status === 'PENDING' ? '#FFF' : '#000'
                  }}>
                    {order.status}
                  </span>
                </td>
                <td style={{ padding: '20px' }}>
                  <button style={{ background: 'none', border: '1px solid #333', color: '#888', cursor: 'pointer', borderRadius: '5px', padding: '5px 10px' }}>View Detail</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* 4. QUICK INVENTORY TOGGLE (The "Heavy" Control) */}
      <section style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
        <div style={{ ...glass, padding: '30px', borderRadius: '25px' }}>
          <h4 style={{ color: colors.primary.gold, marginBottom: '20px' }}>Out of Stock Quick-Actions</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
             {['Royal Platter', 'Truffle Fries', 'Mughlai Tea'].map(item => (
               <button key={item} style={{ padding: '10px 20px', background: '#111', border: '1px solid #333', color: '#666', borderRadius: '15px', fontSize: '0.8rem' }}>
                 Mark {item} Unavailable
               </button>
             ))}
          </div>
        </div>
        
        <div style={{ ...glass, padding: '30px', borderRadius: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
             <p style={{ color: '#888', fontSize: '0.8rem' }}>CURRENT SERVER LOAD</p>
             <div style={{ width: '200px', height: '10px', background: '#222', borderRadius: '50px', margin: '15px 0', overflow: 'hidden' }}>
                <motion.div initial={{ width: 0 }} animate={{ width: '65%' }} style={{ height: '100%', background: colors.primary.gold }} />
             </div>
             <p style={{ color: colors.primary.gold, fontWeight: 'bold' }}>OPTIMAL (65%)</p>
          </div>
        </div>
      </section>

    </div>
  );
};

export default AdminDashboard;
