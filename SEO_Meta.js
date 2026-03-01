import React from 'react';
import { Helmet } from 'react-helmet';

/**
 * SEO META COMPONENT - THE PALACE ANNOUNCER
 * Features: Dynamic Title Management, Open Graph for Social Media, 
 * Schema.org Integration (JSON-LD), and Crawler Optimization.
 */

const SEO_Meta = ({ 
  title = "Fatima's Kitchen | The Royal Taste of Pakistan",
  description = "Experience the finest Mughlai and Fusion cuisine. Order from the most premium kitchen in Pakistan. Royal taste delivered to your palace.",
  keywords = "Fatima's Kitchen, Gourmet Pakistani Food, Luxury Delivery, Mughlai Food, Best Burger in Pakistan",
  image = "https://fatimaskitchen.pk/og-image-royal.jpg",
  url = "https://fatimaskitchen.pk"
}) => {
  
  // --- HEAVY LOGIC: GOOGLE STRUCTURED DATA (Schema.org) ---
  const schemaOrgJSONLD = {
    "@context": "http://schema.org",
    "@type": "Restaurant",
    "name": "Fatima's Kitchen",
    "alternateName": "FK Royal Palace",
    "description": description,
    "url": url,
    "logo": "https://fatimaskitchen.pk/logo-gold.png",
    "image": image,
    "priceRange": "$$$",
    "servesCuisine": "Pakistani, Mughlai, Fusion",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Pakistan",
      "addressRegion": "PK"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+923180313851",
      "contactType": "Customer Service"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1250"
    }
  };

  return (
    <Helmet>
      {/* 1. STANDARD META TAGS */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Fatima's Kitchen Executive" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />

      {/* 2. OPEN GRAPH (For Facebook, WhatsApp, LinkedIn) */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Fatima's Kitchen" />

      {/* 3. TWITTER CARD (For X.com) */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* 4. GOOGLE BOT & CRAWLER INSTRUCTIONS */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="revisit-after" content="1 days" />

      {/* 5. STRUCTURED DATA (JSON-LD) */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* 6. CANONICAL LINK */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO_Meta;
    
