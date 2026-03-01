/**
 * APP CONFIGURATION - THE MASTER CONTROL
 * Purpose: Centralizing all brand assets and global constants.
 * This is the "Single Source of Truth" for Fatima's Kitchen.
 */

const AppConfig = {
  brand: {
    name: "Fatima's Kitchen",
    tagline: "Premium Taste, Enterprise Speed",
    logo: {
      primary: "/assets/images/WA0005.jpg", // Path locked for GitHub
      alt: "Fatima's Kitchen Official Logo",
      favicon: "/favicon.ico"
    },
    version: "2.0.0-Killer",
  },
  
  // Design System Baseline
  appearance: {
    theme: "gold-standard", // Options: 'gold-standard' | 'dark-premium'
    animationsEnabled: true,
  }
};

export default AppConfig;
  contact: {
    phone: "+923129291552", // Primary WhatsApp for Orders
    displayPhone: "0312-9291552",
    email: "fatimaskitchen@gmail.com",
    address: "Main Branch, Food Street, Pakistan",
    whatsappLink: "https://wa.me/923129291552?text=I%20want%20to%20place%20an%20order",
  },

  social: {
    facebook: "https://facebook.com/fatimaskitchen",
    instagram: "https://instagram.com/fatimaskitchen",
    tiktok: "https://tiktok.com/@fatimaskitchen",
  },
  operations: {
    minOrderValue: 500, // Rs. 500 se kam order nahi hoga
    delivery: {
      baseFee: 99,     // Standard delivery
      freeDeliveryThreshold: 2000, // 2k+ par delivery free
      estimatedTime: "25-45 mins",
    },
    tax: {
      gstPercentage: 16, // Government Tax
      serviceCharges: 20, // Packaging/Service
    },
    currency: {
      symbol: "Rs.",
      code: "PKR",
    },
    status: "active", // Open/Closed switch
  },
  security: {
    adminEmail: "admin@fatimaskitchen.com",
    // Ye keys encryption ke liye use hongi
    authKey: "FATIMA_SECURE_2026", 
    sessionTimeout: 3600, // 1 Hour tak login rahega
    
    // Safety Gates
    enableCloudinary: true, // For heavy image hosting
    enableAnalytics: true,  // To track Foodpanda vs Your sales
  },

  // Environment-Ready Settings
  api: {
    baseUrl: process.env.NODE_ENV === 'production' 
      ? "https://api.fatimaskitchen.com" 
      : "http://localhost:3000",
  },
  menu: {
    categories: [
      { id: "deals", label: "Exclusive Deals", icon: "🔥" },
      { id: "fastfood", label: "Fast Food", icon: "🍔" },
      { id: "desi", label: "Desi Specials", icon: "🍛" },
      { id: "drinks", label: "Beverages", icon: "🥤" },
      { id: "desserts", label: "Sweet Cravings", icon: "🍰" }
    ],
    
    // Foodpanda-style badges
    badges: {
      hot: { label: "Bestseller", color: "#FFD700" }, // Gold
      new: { label: "New Launch", color: "#00FF00" }, // Green
      sale: { label: "Flash Sale", color: "#FF0000" }  // Red
    },

    // Maximum items per page for speed
    paginationLimit: 12,
  },
  localization: {
    defaultLanguage: "en",
    supportedLanguages: ["en", "ur"],
    translations: {
      en: { welcome: "Welcome to Fatima's Kitchen", cart: "Your Basket" },
      ur: { welcome: "فاطمہ کچن میں خوش آمدید", cart: "آپ کی ٹوکری" }
    },
    timezone: "Asia/Karachi",
    currencyFormat: "en-PK", // Rs. 1,000 format ke liye
  },

  ux: {
    vibrationEnabled: true, // Mobile par button click par feel aaye
    skeletonTheme: "shimmer-gold", 
    popupDelay: 5000, // 5 seconds baad promotion dikhao
    autoHideNotifications: 3000, // 3 seconds baad toast gayab
}
  integrations: {
    // Cloudinary for Auto-Compressed Images (Foodpanda Secret)
    cloudinary: {
      cloudName: "fatima-kitchen-cloud",
      uploadPreset: "ml_default",
      baseUrl: "https://res.cloudinary.com/fatima-kitchen-cloud/image/upload/",
    },

    // Google Maps for Live Address & Tracking
    googleMaps: {
      apiKey: "AIzaSy_FATIMA_MAP_KEY", // Secure placeholder
      defaultCenter: { lat: 24.8607, lng: 67.0011 }, // Karachi/Pakistan Center
      mapStyle: "silver-premium", // Gold/Black theme ke liye custom map style
    },

    // Analytics to see where customers are coming from
    googleAnalyticsId: "G-FATIMA-2026",
  },
  promotions: {
    flashSale: {
      isActive: true,
      tagline: "Midnight Cravings Deal!",
      discountPercentage: 25,
      endsAt: "2026-12-31T23:59:59", // Countdown timer logic
    },
    
    // Promo Codes (The 'Fatima' Specials)
    coupons: [
      { code: "FIRST50", discount: 50, type: "fixed", minSpend: 1000 },
      { code: "FATIMAKITCHEN", discount: 15, type: "percentage", minSpend: 500 }
    ],

    // Referral System
    referralBonus: 100, // Rs. 100 for inviting a friend
  },
  system: {
    // The "Master Kill-Switch"
    maintenanceMode: false, 
    maintenanceMessage: "Fatima's Kitchen is currently upgrading its menu. We'll be back in 30 minutes!",
    
    // Operating Hours (Enterprise Level)
    openingHours: {
      mondayToFriday: { open: "12:00", close: "00:00" },
      saturdaySunday: { open: "12:00", close: "02:00" }
    },

    // Error Handling (Custom Professional Pages)
    errorPages: {
      notFound: "Oops! This dish isn't on our menu yet.",
      serverError: "Our chefs are busy fixing the server. Please try again later."
    }
  },
    
