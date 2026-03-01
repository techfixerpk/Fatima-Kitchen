import React, { Suspense, useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// --- ROYAL IMPORTS (Direct Root Connection) ---
import Navbar from './Navbar.js';
import Footer from './Footer.js';
import HomePage from './HomePage.js';
import MenuPage from './MenuPage.js';
import CheckoutPage from './CheckoutPage.js';
import AdminDashboard from './AdminDashboard.js';
import InventoryTracker from './InventoryTracker.js';
import WhatsAppEngine from './WhatsAppEngine.js';
import OrderTracking from './OrderTracking.js';
import LiveOrderQueue from './LiveOrderQueue.js';
import GlobalStyles from './GlobalStyles.css';

// --- GOLDEN PRE-LOADER ---
const RoyalLoader = () => (
  <div style={{
    height: '100vh', background: '#000', display: 'flex', 
    justifyContent: 'center', alignItems: 'center', color: '#D4AF37'
  }}>
    <h1 style={{ fontFamily: 'Cinzel', letterSpacing: '10px' }}>FK ROYALTY</h1>
  </div>
);

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Ensuring all sovereign assets are connected
    const timer = setTimeout(() => setIsLoaded(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!isLoaded) return <RoyalLoader />;

  return (
    <Router>
      <div className="app-wrapper" style={{ background: '#050505', minHeight: '100vh' }}>
        <Navbar />
        
        <Routes>
          {/* Public Sovereign Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/track" element={<OrderTracking />} />

          {/* Heavy Admin & Operations Routes */}
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/inventory" element={<InventoryTracker />} />
          <Route path="/live-orders" element={<LiveOrderQueue />} />
        </Routes>

        {/* Global Royal Engines */}
        <WhatsAppEngine />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
            
