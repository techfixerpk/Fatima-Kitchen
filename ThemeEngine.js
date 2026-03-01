/**
 * THEME ENGINE - ROYAL EDITION
 * Defines the core visual language, spacing, and motion physics for Fatima's Kitchen.
 */

const ThemeEngine = {
    // 1. BRAND COLOR PALETTE (Luxury Specs)
    colors: {
        primary: {
            gold: "#D4AF37",      // Classic Metallic Gold
            goldLight: "#F1D279", // Shimmer Highlight
            goldDark: "#996515",  // Shadow Gold
        },
        neutral: {
            deepBlack: "#0A0A0A", // Main Background
            royalBlack: "#1A1A1A", // Card/Section Background
            softGray: "#666666",   // Muted Text
            pureWhite: "#FFFFFF",  // Primary Text
            offWhite: "#F5F5F5",   // Subtle Overlays
        },
        functional: {
            success: "#27AE60",
            error: "#C0392B",
            warning: "#F39C12",
            info: "#2980B9"
        }
    },

    // 2. TYPOGRAPHY SYSTEM
    typography: {
        fonts: {
            heading: "'Playfair Display', serif", // High-end luxury font
            body: "'Inter', sans-serif",          // Modern, clean readability
            accent: "'Montserrat', sans-serif"    // For buttons and labels
        },
        weights: {
            light: 300,
            regular: 400,
            medium: 500,
            semiBold: 600,
            bold: 700
        },
        sizes: {
            xs: "0.75rem",
            sm: "0.875rem",
            base: "1rem",
            lg: "1.125rem",
            xl: "1.25rem",
            h1: "clamp(2.5rem, 8vw, 5rem)", // Responsive sizing
            h2: "clamp(2rem, 5vw, 3.5rem)",
            h3: "clamp(1.5rem, 3vw, 2.5rem)"
        }
    },

    // 3. MOTION & INTERACTION PHYSICS (Framer Motion Presets)
    motion: {
        transition: {
            slow: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] },
            standard: { duration: 0.4, ease: "easeOut" },
            fast: { duration: 0.2, ease: "easeInOut" }
        },
        hover: {
            scale: 1.05,
            y: -5,
            glow: "0px 0px 20px rgba(212, 175, 55, 0.4)"
        }
    },

    // 4. THE LUXURY GLASSMORPHISM EFFECT
    glass: {
        background: "rgba(26, 26, 26, 0.8)",
        backdropFilter: "blur(12px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
        boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)"
    },

    // 5. SHADOWS & DEPTH (Layering)
    depth: {
        low: "0 2px 4px rgba(0,0,0,0.1)",
        medium: "0 10px 25px rgba(0,0,0,0.3)",
        high: "0 20px 50px rgba(0,0,0,0.5)",
        goldGlow: "0 0 30px rgba(212, 175, 55, 0.2)"
    },

    // 6. RESPONSIVE BREAKPOINTS
    breakpoints: {
        mobile: "576px",
        tablet: "768px",
        desktop: "1024px",
        wide: "1440px"
    },

    // 7. GLOBAL SPACING (Grid units)
    spacing: {
        containerPadding: "8%",
        sectionGap: "120px",
        elementGap: "24px"
    }
};

export default ThemeEngine;
