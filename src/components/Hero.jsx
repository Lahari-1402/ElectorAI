import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onStart }) => {
  return (
    <section className="container hero" style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        style={{ fontSize: '4rem', marginBottom: '1.5rem', maxWidth: '800px' }}
      >
        Demystifying the <span className="gradient-text">Election Process</span>
      </motion.h1>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{ fontSize: '1.25rem', color: 'var(--text-muted)', maxWidth: '600px', marginBottom: '2.5rem' }}
      >
        Explore every step of the journey, from registration to inauguration. Your AI-powered guide to understanding democracy.
      </motion.p>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{ display: 'flex', gap: '1rem' }}
      >
        <button 
          onClick={() => document.getElementById('flashcards').scrollIntoView({ behavior: 'smooth' })}
          className="glass" 
          style={{ padding: '1rem 2rem', background: 'var(--accent)', color: 'var(--primary)', fontWeight: 'bold' }}
        >
          View Milestones
        </button>
        <button 
          onClick={onStart}
          className="glass" 
          style={{ padding: '1rem 2rem', borderColor: 'var(--accent)', color: 'var(--accent)' }}
        >
          Talk to Assistant
        </button>
      </motion.div>
    </section>
  );
};

export default Hero;
