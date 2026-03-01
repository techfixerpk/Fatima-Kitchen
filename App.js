import React, { Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css';

// --- ENTERPRISE CORE IMPORTS (Root Level) ---
import Navbar from './Navbar';
import Footer from './Footer';
import HomePage from './HomePage';
import MenuPage from './MenuPage';
import CheckoutPage from './CheckoutPage';
import OrderTracking from './OrderTracking';
import WhatsAppEngine from './WhatsAppEngine';
import GlobalStyles from './GlobalStyles';
import ThemeEngine from './ThemeEngine';
"homepage": "https://techfixerpk.github.io/Fatima-Kitchen",
  
// --- PRE-RENDERED QUANTUM LOADER ---
const QuantumLoader = () => (
  <motion.div 
    initial={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    style={{
      height: '100vh', width: '100%', background: '#000',
      display: 'flex', flexDirection: 'column', justifyContent: 'center', 
      alignItems: 'center', position: 'fixed', z-index: 9999
    }}
  >
    <motion.div 
      animate={{ 
        scale: [1, 1.2, 1],
        rotate: [0, 180, 360],
        borderWidth: ['2px', '5px', '2px']
      }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      style={{
        width: '100px', height: '100px', border: '2px solid #D4AF37', 
        borderRadius: '50%', boxShadow: '0 0 50px rgba(212, 175, 55, 0.3)'
      }}
    />
    <h2 style={{ color: '#D4AF37', marginTop: '30px', letterSpacing: '8px', fontFamily: 'Cinzel' }}>
      FATIMA'S KITCHEN
    </h2>
  </motion.div>
);

// --- SMART ROUTE WRAPPER ---
const PageWrapper = ({ children }) => {
  const location = useLocation();
  
  useEffect(() => {
    nprogress.start();
    setTimeout(() => nprogress.done(), 500);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.6, ease: "circOut" }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  return (
    <Router>
      <ThemeEngine>
        <GlobalStyles />
        <Helmet>
          <title>Fatima's Kitchen | Sovereign Culinary Arts</title>
          <meta name="theme-color" content="#050505" />
        </Helmet>

        <div className="sovereign-container" style={{ background: '#050505', overflow: 'hidden' }}>
          <Navbar />
          
          <AnimatePresence mode="wait">
            <Suspense fallback={<QuantumLoader />}>
              <Routes>
                <Route path="/" element={<PageWrapper><HomePage /></PageWrapper>} />
                <Route path="/menu" element={<PageWrapper><MenuPage /></PageWrapper>} />
                <Route path="/checkout" element={<PageWrapper><CheckoutPage /></PageWrapper>} />
                <Route path="/track" element={<PageWrapper><OrderTracking /></PageWrapper>} />
              </Routes>
            </Suspense>
          </AnimatePresence>

          {/* --- INTELLIGENT OVERLAYS --- */}
          <WhatsAppEngine pulse={true} goldEdition={true} /> 
          <Footer premium={true} />
        </div>
      </ThemeEngine>
    </Router>
  );
}

export default App;
               
