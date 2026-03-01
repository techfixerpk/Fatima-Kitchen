import React, { createContext, useContext, useState, useEffect } from 'react';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * AUTH CONTEXT - THE ROYAL GATEKEEPER (MAXED EDITION)
 * Features: Hardcoded Admin Credentials, Session Persistence, 
 * Role-Based Access (RBA), and Simulated Cloud Synchronization.
 */

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);
  const { colors, typography } = ThemeEngine;

  // --- 1. SESSION PERSISTENCE (Rehydrating the Royal State) ---
  useEffect(() => {
    const checkSession = () => {
      try {
        const storedUser = localStorage.getItem('FATIMAS_ROYAL_USER');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          // Auto-login logic
          setUser(parsedUser);
        }
      } catch (err) {
        console.error("Palace Guard: Session Corrupted", err);
        localStorage.removeItem('FATIMAS_ROYAL_USER');
      } finally {
        // Professional delay to show the "Verifying Royalty" Loader
        setTimeout(() => setLoading(false), 2000);
      }
    };
    checkSession();
  }, []);

  // --- 2. THE MASTER LOGIN LOGIC (Your Specific Credentials) ---
  const login = async (email, password) => {
    setLoading(true);
    setAuthError(null);

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // --- HARDCODED ROYAL CREDENTIALS ---
        const MASTER_EMAIL = 'Fatimaskitchenpk92@gmail.com';
        const MASTER_PASS = 'Fatima61814@';

        if (email === MASTER_EMAIL && password === MASTER_PASS) {
          const royalUser = {
            id: 'ROYAL-ADMIN-01',
            name: 'Fatima',
            email: email,
            role: 'EXECUTIVE_CHEF_OWNER',
            rank: 'Palace Master',
            accessLevel: 99,
            loyaltyPoints: 50000,
            avatar: 'https://ui-avatars.com/api/?name=Fatima&background=D4AF37&color=000',
            lastLogin: new Date().toLocaleString()
          };

          setUser(royalUser);
          localStorage.setItem('FATIMAS_ROYAL_USER', JSON.stringify(royalUser));
          resolve(royalUser);
        } else {
          const errorMsg = "ACCESS DENIED: Credentials do not match the Royal Registry.";
          setAuthError(errorMsg);
          reject(errorMsg);
        }
        setLoading(false);
      }, 2500); // Cinematic delay for security simulation
    });
  };

  // --- 3. LOGOUT & SESSION WIPE ---
  const logout = () => {
    setUser(null);
    localStorage.removeItem('FATIMAS_ROYAL_USER');
    // Clear other sensitive states if needed
    window.location.href = '/login';
  };

  // --- 4. GUEST ACCESS LOGIC (For casual browsers) ---
  const continueAsGuest = () => {
    const guestUser = { id: 'GUEST-' + Date.now(), name: 'Honored Guest', role: 'VISITOR', rank: 'Guest' };
    setUser(guestUser);
    return guestUser;
  };

  // --- 5. THE GLOBAL LOADER (Royal Branding) ---
  if (loading) {
    return (
      <div style={{ 
        height: '100vh', width: '100%', backgroundColor: '#050505', 
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 9999 
      }}>
        <motion.div
          animate={{ rotate: 360, borderColor: [colors.primary.gold, '#FFF', colors.primary.gold] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          style={{ 
            width: '60px', height: '60px', border: '2px solid transparent', 
            borderTop: `2px solid ${colors.primary.gold}`, borderRadius: '50%' 
          }}
        />
        <motion.h2
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ 
            color: colors.primary.gold, marginTop: '30px', 
            fontFamily: typography.fonts.heading, letterSpacing: '5px', fontSize: '1rem' 
          }}
        >
          VERIFYING PALACE ACCESS...
        </motion.h2>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, continueAsGuest, authError, isAdmin: user?.role === 'EXECUTIVE_CHEF_OWNER' }}>
      {children}
    </AuthContext.Provider>
  );
};

// --- CUSTOM HOOK ---
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Palace Guard Error: useAuth must be used within AuthProvider");
  return context;
};

export default AuthContext;
            
