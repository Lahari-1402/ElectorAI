import React from 'react';

const Navbar = () => {
  return (
    <nav className="glass" style={{ margin: '1rem 2rem', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: '1rem', zIndex: 100 }}>
      <div className="logo" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--accent)' }}>
        Elector<span style={{ color: 'var(--text)' }}>AI</span>
      </div>
      <div className="nav-links" style={{ display: 'flex', gap: '2rem' }}>
        <a href="#" className="nav-link">Home</a>
        <a href="#flashcards" className="nav-link">Milestones</a>
        <a href="#" className="nav-link">Process</a>
      </div>
    </nav>
  );
};

export default Navbar;
