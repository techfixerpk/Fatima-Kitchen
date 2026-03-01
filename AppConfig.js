/**
 * APP CONFIGURATION - ENTERPRISE EDITION
 * Project: Fatima's Kitchen (Royal Gourmet)
 * Version: 2.1.0
 * Description: Centralized source of truth for all brand assets, business logic, and menu data.
 */

const AppConfig = {
    // 1. BRAND IDENTITY
    brand: {
        name: "Fatima's Kitchen",
        legalName: "Fatima Gourmet Solutions Pvt Ltd.",
        tagline: "Authenticity in Every Royal Bite",
        logo: "/assets/logo-gold.png",
        favicon: "/favicon.ico",
        established: "2024",
        theme: "Royal Gold & Deep Black",
    },

    // 2. CONTACT & LOCATION INTELLIGENCE
    contact: {
        phone: "+92 300 1234567",
        whatsapp: "+923001234567",
        whatsappLink: "https://wa.me/923001234567?text=I%20want%20to%20order%20the%20Royal%20Platter",
        email: "orders@fatimaskitchen.com",
        address: "Phase 7, Bahria Town, Rawalpindi, Pakistan",
        googleMapsLink: "https://maps.google.com/...",
    },

    // 3. SOCIAL MEDIA ASSETS
    social: {
        instagram: "https://instagram.com/fatimas_kitchen",
        facebook: "https://facebook.com/fatimaskitchen.pk",
        tiktok: "https://tiktok.com/@fatimaskitchen",
        youtube: "https://youtube.com/fatimaskitchen",
    },

    // 4. BUSINESS OPERATIONS
    operations: {
        currency: "PKR",
        deliveryFee: 150,
        minOrder: 500,
        estimatedDelivery: "35-45 Mins",
        workingHours: {
            mon_fri: "12:00 PM - 02:00 AM",
            sat_sun: "12:00 PM - 04:00 AM",
        },
        status: "OPEN", // Managed by logic in production
    },

    // 5. HEAVY MENU DATA (The Core Engine)
    menu: [
        {
            category: "Signature Platters",
            id: "cat_1",
            items: [
                {
                    id: "sp_1",
                    name: "The Royal Mughal Platter",
                    price: 2450,
                    description: "A grand assembly of Seekh Kababs, Malai Boti, and Mutton Chops served with Saffron Rice.",
                    image: "/assets/menu/royal-platter.jpg",
                    isBestSeller: true,
                    isSpicy: false,
                    calories: "1200 kcal"
                },
                {
                    id: "sp_2",
                    name: "Golden Steak Fusion",
                    price: 3200,
                    description: "Prime Ribeye steak topped with edible gold leaf and truffle butter mash.",
                    image: "/assets/menu/gold-steak.jpg",
                    isBestSeller: true,
                    isSpicy: true,
                    calories: "950 kcal"
                }
            ]
        },
        {
            category: "Gourmet Burgers",
            id: "cat_2",
            items: [
                {
                    id: "gb_1",
                    name: "The Truffle Beast",
                    price: 1150,
                    description: "Double smashed beef patty with black truffle aioli and aged cheddar.",
                    image: "/assets/menu/truffle-burger.jpg",
                    isBestSeller: false,
                    isSpicy: false,
                },
                {
                    id: "gb_2",
                    name: "Spicy Peri-Peri Crown",
                    price: 950,
                    description: "Grilled chicken breast basted in our secret peri-peri sauce with charcoal bun.",
                    image: "/assets/menu/peri-burger.jpg",
                    isBestSeller: true,
                    isSpicy: true,
                }
            ]
        },
        {
            category: "Dessert Royalty",
            id: "cat_3",
            items: [
                {
                    id: "dr_1",
                    name: "Saffron Milk Cake",
                    price: 650,
                    description: "Ultra-moist cake soaked in saffron-infused triple milk.",
                    image: "/assets/menu/milk-cake.jpg",
                    isBestSeller: true,
                }
            ]
        }
    ],

    // 6. SEO & METADATA (For Ranking)
    seo: {
        title: "Fatima's Kitchen | Premium Food Delivery in Rawalpindi",
        metaDescription: "Experience the royal taste of authentic gourmet food. Order the best steaks, platters, and burgers in Bahria Town.",
        keywords: ["Gourmet Food", "Best Burger Rawalpindi", "Fatima's Kitchen", "Luxury Dining"],
        ogImage: "/assets/og-banner.jpg",
    },

    // 7. ANALYTICS & PIXELS
    analytics: {
        googleAnalyticsId: "G-XXXXXXXXXX",
        fbPixelId: "XXXXXXXXXXXXXXX",
    },

    // 8. APP FEATURES TOGGLE (Switching on/off heavy features)
    features: {
        enableNewsletter: true,
        enableLiveChat: true,
        enableDarkMode: true,
        enablePreOrder: false,
        maintenanceMode: false
    }
};

export default AppConfig;

