import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeEngine from '../theme/ThemeEngine';

/**
 * REVIEW SYSTEM - THE SOCIAL VALIDATOR
 * Features: Dynamic Star Rating, Sentiment Analysis Badges, 
 * Real-time Review Submission, and High-End Testimonial Slider.
 */

const ReviewSystem = () => {
  const { colors, glass, typography } = ThemeEngine;
  const [reviews, setReviews] = useState([
    { id: 1, name: "Ali Ahmed", rating: 5, comment: "The Royal Platter was out of this world! Best meat in town.", date: "2 days ago", tag: "Must Try" },
    { id: 2, name: "Sana Khan", rating: 4, comment: "Amazing truffle burger, but delivery was 5 mins late. Still 5 stars for taste!", date: "1 week ago", tag: "Foodie" },
    { id: 3, name: "Hamza Malik", rating: 5, comment: "Authentic royal vibes. The saffron milk cake is a masterpiece.", date: "3 days ago", tag: "Sweet Tooth" }
  ]);

  const [newReview, setNewReview] = useState({ name: '', rating: 5, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);

  // --- HEAVY LOGIC: Calculating Average Rating ---
  const averageRating = (reviews.reduce((acc, rev) => acc + rev.rating, 0) / reviews.length).toFixed(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReview.name && newReview.comment) {
      const reviewObj = {
        ...newReview,
        id: Date.now(),
        date: "Just now",
        tag: newReview.rating === 5 ? "Royal Review" : "Valued Guest"
      };
      setReviews([reviewObj, ...reviews]);
      setNewReview({ name: '', rating: 5, comment: '' });
    }
  };

  // --- STYLES ---
  const starStyle = (isFilled) => ({
    fontSize: '1.5rem',
    color: isFilled ? colors.primary.gold : '#333',
    cursor: 'pointer',
    transition: '0.2s',
    marginRight: '5px'
  });

  const reviewCard = {
    ...glass,
    padding: '25px',
    borderRadius: '20px',
    marginBottom: '20px',
    border: `1px solid rgba(212, 175, 55, 0.1)`,
    position: 'relative'
  };

  return (
    <section style={{ padding: '100px 8%', backgroundColor: colors.neutral.deepBlack }}>
      <div style={{ textAlign: 'center', marginBottom: '60px' }}>
        <h2 style={{ fontFamily: typography.fonts.heading, color: colors.primary.gold, fontSize: '3rem' }}>
          VOICES OF ROYALTY
        </h2>
        <p style={{ color: '#888', letterSpacing: '2px' }}>What our esteemed guests say about us</p>
        <div style={{ fontSize: '2.5rem', fontWeight: 'bold', marginTop: '20px' }}>
          {averageRating} <span style={{ color: colors.primary.gold }}>★</span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '50px' }}>
        
        {/* --- FORM COLUMN --- */}
        <motion.div initial={{ x: -50 }} whileInView={{ x: 0 }} style={{ ...glass, padding: '40px', borderRadius: '30px' }}>
          <h3 style={{ color: colors.primary.gold, marginBottom: '25px', fontFamily: typography.fonts.heading }}>Drop Your Feedback</h3>
          <form onSubmit={handleSubmit}>
            <input 
              style={{ width: '100%', background: '#111', border: '1px solid #333', padding: '15px', color: '#fff', borderRadius: '10px', marginBottom: '20px' }}
              placeholder="Your Royal Name"
              value={newReview.name}
              onChange={(e) => setNewReview({...newReview, name: e.target.value})}
            />
            
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '0.8rem', color: '#888', marginBottom: '10px' }}>RATING</p>
              {[1, 2, 3, 4, 5].map((star) => (
                <span 
                  key={star} 
                  style={starStyle(star <= (hoverRating || newReview.rating))}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setNewReview({...newReview, rating: star})}
                >
                  ★
                </span>
              ))}
            </div>

            <textarea 
              rows="4"
              style={{ width: '100%', background: '#111', border: '1px solid #333', padding: '15px', color: '#fff', borderRadius: '10px', marginBottom: '20px' }}
              placeholder="How was your experience?"
              value={newReview.comment}
              onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
            ></textarea>

            <button type="submit" className="btn-gold" style={{ width: '100%' }}>SUBMIT REVIEW</button>
          </form>
        </motion.div>

        {/* --- REVIEWS LIST COLUMN --- */}
        <div style={{ maxHeight: '600px', overflowY: 'auto', paddingRight: '15px' }}>
          <AnimatePresence>
            {reviews.map((rev) => (
              <motion.div 
                key={rev.id} 
                initial={{ opacity: 0, scale: 0.9 }} 
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                style={reviewCard}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                  <h4 style={{ color: colors.primary.gold }}>{rev.name}</h4>
                  <span style={{ fontSize: '0.7rem', color: '#555' }}>{rev.date}</span>
                </div>
                <div style={{ color: colors.primary.gold, marginBottom: '10px', fontSize: '0.8rem' }}>
                  {"★".repeat(rev.rating)}{"☆".repeat(5-rev.rating)}
                </div>
                <p style={{ color: '#AAA', fontSize: '0.9rem', lineHeight: '1.6' }}>"{rev.comment}"</p>
                
                {/* Sentiment Badge */}
                <div style={{ 
                  position: 'absolute', top: '25px', right: '25px', 
                  fontSize: '0.6rem', border: `1px solid ${colors.primary.gold}`, 
                  padding: '2px 8px', borderRadius: '50px', color: colors.primary.gold 
                }}>
                  {rev.tag}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};

export default ReviewSystem;
            
