import React from 'react';

const Footer = () => {
  return (
    <footer className="container" style={{ padding: '4rem 0', borderTop: '1px solid var(--glass-border)', marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>
      <p>© 2026 ElectorAI. Empowering citizens through information.</p>
      <div style={{ marginTop: '1rem', fontSize: '0.8rem' }}>
        Built for democracy.
      </div>
    </footer>
  );
};

export default Footer;
