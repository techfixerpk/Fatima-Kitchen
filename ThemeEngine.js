/**
 * THEME ENGINE - THE VISUAL DNA
 * Purpose: Defining the Luxury 'Gold & Black' identity.
 */

export const LightTheme = {
  primary: "#D4AF37", // Metallic Gold (Aapka Signature)
  secondary: "#1A1A1A", // Deep Charcoal Black
  background: "#FFFFFF", // Pure White for readability
  surface: "#F9F9F9", // Off-white for cards
  text: {
    main: "#1A1A1A",
    muted: "#666666",
    inv: "#FFFFFF"
  },
  accent: "#FF4D4D", // Red for 'Sale' or 'Delete'
};

export const DarkTheme = {
  primary: "#FFD700", // Bright Gold
  secondary: "#000000", // Pure Black
  background: "#121212", // Dark Mode Background
  surface: "#1E1E1E", // Dark Grey for cards
  text: {
    main: "#FFFFFF",
    muted: "#AAAAAA",
    inv: "#1A1A1A"
  },
  accent: "#FF4D4D",
};
export const Typography = {
  fontFamily: {
    heading: "'Playfair Display', serif", // Royal/Luxury Look
    body: "'Inter', sans-serif",          // Modern/Clean Look
  },
  fontSize: {
    h1: "2.5rem", // 40px - Main Title
    h2: "2rem",   // 32px - Section Headings
    h3: "1.5rem", // 24px - Food Item Names
    body: "1rem", // 16px - Descriptions
    small: "0.875rem" // 14px - Terms & Conditions
  },
  fontWeight: {
    light: 300,
    regular: 400,
    bold: 700,
    extraBold: 900
  }
};

export const Spacing = {
  container: "1200px", // Standard Desktop Width
  gutter: "1.5rem",    // Gap between cards
  radius: {
    small: "4px",
    medium: "12px",    // Foodpanda style rounded cards
    full: "9999px"     // Buttons ke liye
  }
};
export const Effects = {
  // Shadow for cards - Makes them float
  shadows: {
    soft: "0 4px 12px rgba(0, 0, 0, 0.05)",
    medium: "0 8px 24px rgba(0, 0, 0, 0.1)",
    premium: "0 12px 40px rgba(212, 175, 55, 0.15)", // Subtle Gold Shadow
  },

  // The "Foodpanda Killer" Glass Effect
  glass: {
    background: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.07)",
  },

  // Smooth Transitions
  transitions: {
    fast: "0.2s ease-in-out",
    standard: "0.4s cubic-bezier(0.4, 0, 0.2, 1)",
    slow: "0.8s ease",
  }
};
export const Interactive = {
  // Button Styles
  buttons: {
    primary: {
      bg: "#D4AF37", // Gold
      text: "#FFFFFF",
      hover: "#B8860B", // Darker Gold on hover
      activeScale: "0.95", // Button thora sa dabega click par
    },
    secondary: {
      bg: "transparent",
      border: "2px solid #1A1A1A",
      text: "#1A1A1A",
      hover: "rgba(26, 26, 26, 0.05)",
    }
  },

  // Input Fields (Search Bar & Address)
  inputs: {
    padding: "12px 16px",
    bg: "#FFFFFF",
    border: "1px solid #E0E0E0",
    focusBorder: "#D4AF37", // Click karne par Gold border chamkega
    placeholder: "#999999",
  },

  // State Overlays
  overlays: {
    disabled: "rgba(255, 255, 255, 0.6)",
    loading: "linear-gradient(90deg, #F0F0F0 25%, #E0E0E0 50%, #F0F0F0 75%)", // Skeleton Shimmer
  }
};
export const Layout = {
  // Screen size limits (Standard Industry Standards)
  breakpoints: {
    mobile: "480px",
    tablet: "768px",
    laptop: "1024px",
    desktop: "1440px"
  },

  // Grid logic for Food Cards
  grid: {
    gap: "24px",
    columns: {
      mobile: "1fr",          // 1 Item per row
      tablet: "1fr 1fr",      // 2 Items per row
      desktop: "repeat(4, 1fr)" // 4 Items per row (Professional look)
    }
  },

  // Navbar & Footer heights
  dimensions: {
    navbarHeight: "80px",
    footerHeight: "350px",
    sidebarWidth: "280px"
  }
};
export const Layers = {
  // Higher number means closer to the user's eye
  base: 0,
  content: 1,
  dropdown: 100,
  navbar: 500,     // Sticky Navbar har cheez ke upar rahegi
  sidebar: 600,    // Mobile menu navbar se upar ayega
  modal: 1000,     // Pop-ups (Login/Deals) sab se upar
  toast: 2000,     // Notifications (Order Success) sab se top par
  tooltip: 3000    // Sab se top layer
};

// Global Animation Presets
export const Animations = {
  hover: { scale: 1.05, transition: { duration: 0.2 } },
  tap: { scale: 0.95 },
  fadeIn: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};
// Function to detect user's system preference
export const getSystemTheme = () => {
  if (typeof window !== "undefined" && window.matchMedia) {
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    return isDarkMode ? "dark" : "light";
  }
  return "light"; // Default
};

// Global Theme Configuration Object
export const ThemeConfig = {
  initialMode: getSystemTheme(), // Auto-detect on first load
  useSystemColor: true,         // Sync with mobile settings
  transitionSpeed: "0.5s",      // Smooth color change animation
};

// Helper to mix colors (Gold + Transparency)
export const hexToRGBA = (hex, opacity) => {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};
export const Scrolling = {
  // Pure Butter Experience
  behavior: "smooth",
  
  // Custom Scrollbar Styling (Gold & Black Theme)
  scrollbar: {
    width: "8px",
    track: "#1A1A1A", // Black track
    thumb: "#D4AF37", // Gold handle
    thumbHover: "#FFD700", // Bright gold on hover
    borderRadius: "10px",
  },

  // Scroll Padding (Navbar ke neeche content na chupe)
  scrollPaddingTop: "100px",

  // Momentum for Mobile devices
  touchAction: "pan-y",
  overscrollBehavior: "contain",
};
/**
 * THEME ENGINE - FINAL MASTER FILE
 * Brand: Fatima's Kitchen
 * Standards: Enterprise Luxury (Gold & Black)
 */

import { LightTheme, DarkTheme, Typography, Spacing } from './steps_1_and_2';
import { Effects } from './step_3';
import { Interactive } from './step_4';
import { Layout } from './step_5';
import { Layers, Animations } from './step_6';
import { ThemeConfig } from './step_7';
import { Scrolling } from './step_8';

const ThemeEngine = {
  // Brand Identity
  colors: {
    light: LightTheme,
    dark: DarkTheme,
  },
  
  // Visual Language
  typography: Typography,
  spacing: Spacing,
  effects: Effects,
  
  // UI Logic
  interactive: Interactive,
  layout: Layout,
  layers: Layers,
  
  // Experience Logic
  animations: Animations,
  config: ThemeConfig,
  scrolling: Scrolling,

  // Helper: Quick Premium Shadow
  getShadow: (type = 'medium') => Effects.shadows[type],
};

export default ThemeEngine;
