import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * LIVE ORDER QUEUE - THE KITCHEN MONITOR
 * Features: Sound Alerts on New Orders, Dynamic Priority Sorting,
 * Live Preparation Timers, and One-Tap Status Updates.
 */

const LiveOrderQueue = () => {
  const { isAdmin, user } = useAuth();
  const { colors, glass, typography } = ThemeEngine;
  const audioPlayer = useRef(null);

  // --- HEAVY STATE: THE KITCHEN PIPELINE ---
  const [queue, setQueue] = useState([
    { id: 'ORD-1001', items: ['Royal Platter x1', 'Mughlai Tea x2'], guest: 'Hamza', time: new Date(), status: 'NEW', priority: 'HIGH' },
    { id: 'ORD-1002', items: ['Truffle Burger x3'], guest: 'Sana', time: new Date(Date.now() - 1000 * 60 * 5), status: 'PREPARING', priority: 'NORMAL' }
  ]);

  // --- LOGIC: SOUND ALERT ON NEW ORDER ---
  useEffect(() => {
    const newOrder = queue.find(o => o.status === 'NEW');
    if (newOrder && audioPlayer.current) {
      audioPlayer.current.play().catch(e => console.log("Audio waiting for interaction"));
    }
  }, [queue]);

  // --- LOGIC: UPDATE ORDER STATUS ---
  const moveStatus = (orderId) => {
    setQueue(prev => prev.map(order => {
      if (order.id === orderId) {
        if (order.status === 'NEW') return { ...order, status: 'PREPARING' };
        if (order.status === 'PREPARING') return { ...order, status: 'READY' };
        if (order.status === 'READY') return { ...order, status: 'DISPATCHED' };
      }
      return order;
    }));
  };

  if (!isAdmin) return <div style={{ color: colors.primary.gold, textAlign: 'center', padding: '100px' }}>ROYAL CLEARANCE REQUIRED</div>;

  return (
    <div style={{ padding: '120px 5% 50px 5%', backgroundColor: '#050505', minHeight: '100vh' }}>
      
      {/* Hidden Audio for Alerts */}
      <audio ref={audioPlayer} src="https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3" />

      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, fontSize: '2.5rem', margin: 0 }}>KITCHEN LIVE QUEUE</h2>
          <p style={{ color: '#666' }}>Monitoring {queue.length} Active Royal Orders</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div style={{ textAlign: 'right' }}>
            <p style={{ margin: 0, color: '#444', fontSize: '0.8rem' }}>LAST SYNC</p>
            <p style={{ margin: 0, color: colors.primary.gold, fontWeight: 'bold' }}>JUST NOW</p>
          </div>
        </div>
      </header>

      {/* 2. KITCHEN BOARD (GRID) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
        <AnimatePresence>
          {queue.map((order) => (
            <motion.div
              key={order.id}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ x: 100, opacity: 0 }}
              style={{ 
                ...glass, borderRadius: '25px', padding: '30px', 
                border: `2px solid ${order.status === 'NEW' ? colors.primary.gold : '#111'}`,
                position: 'relative', overflow: 'hidden'
              }}
            >
              {/* Status Ribbon */}
              <div style={{ 
                position: 'absolute', top: '15px', right: '-35px', width: '120px', 
                textAlign: 'center', transform: 'rotate(45deg)', fontSize: '0.6rem', fontWeight: 'bold',
                background: order.status === 'NEW' ? colors.primary.gold : '#333',
                color: order.status === 'NEW' ? '#000' : '#888'
              }}>
                {order.status}
              </div>

              <h3 style={{ margin: '0 0 10px 0', color: '#FFF' }}>#{order.id}</h3>
              <p style={{ color: colors.primary.gold, fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '20px' }}>GUEST: {order.guest}</p>

              <div style={{ background: 'rgba(255,255,255,0.03)', padding: '15px', borderRadius: '15px', marginBottom: '25px' }}>
                {order.items.map((item, i) => (
                  <p key={i} style={{ color: '#AAA', margin: '5px 0', fontSize: '0.9rem' }}>• {item}</p>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.7rem', color: '#555' }}>
                  WAITING: {Math.floor((new Date() - order.time) / 60000)} MINS
                </span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => moveStatus(order.id)}
                  style={{ 
                    background: colors.primary.gold, border: 'none', padding: '10px 20px', 
                    borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer', fontSize: '0.8rem' 
                  }}
                >
                  {order.status === 'NEW' ? 'START PREP' : order.status === 'PREPARING' ? 'MARK READY' : 'DISPATCH'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default LiveOrderQueue;

