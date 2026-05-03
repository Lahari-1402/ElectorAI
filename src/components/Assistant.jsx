import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Bot, User } from 'lucide-react';

const Assistant = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm your Election Assistant. How can I help you understand the process today?" }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          message: input, 
          history: messages
            .filter((m, i) => i > 0) // Skip the initial greeting
            .slice(-6)
            .map(m => ({
              role: m.role === 'assistant' ? 'model' : 'user',
              parts: [{ text: m.content }]
            })) 
        }),
      });

      const data = await response.json();
      if (response.ok && data.text) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.error || "I'm having trouble connecting right now. Please check your configuration." }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      className="glass assistant-card"
      role="complementary"
      aria-label="Election AI Assistant Chat"
      style={{
        width: '400px', height: '600px', display: 'flex', flexDirection: 'column',
        position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 1000,
        background: 'var(--card-bg)', overflow: 'hidden', boxShadow: '0 20px 50px rgba(0,0,0,0.5)'
      }}
    >
      {/* Header */}
      <div style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--secondary)' }}></div>
          <span style={{ fontWeight: '600' }}>Election Assistant</span>
        </div>
        <button 
          onClick={onClose} 
          aria-label="Close Assistant"
          style={{ background: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div 
        role="log" 
        aria-live="polite"
        style={{ flex: 1, overflowY: 'auto', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}
      >
        {messages.map((msg, i) => (
          <div key={i} style={{ 
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            padding: '1rem',
            borderRadius: msg.role === 'user' ? '15px 15px 0 15px' : '15px 15px 15px 0',
            background: msg.role === 'user' ? 'var(--accent)' : 'rgba(255,255,255,0.05)',
            color: msg.role === 'user' ? 'var(--primary)' : 'var(--text)',
            fontSize: '0.95rem'
          }}>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div style={{ alignSelf: 'flex-start', padding: '1rem', borderRadius: '15px 15px 15px 0', background: 'rgba(255,255,255,0.05)' }}>
            <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>Typing...</motion.div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ padding: '1.5rem', borderTop: '1px solid var(--glass-border)', display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask about voter registration..."
          aria-label="Chat message input"
          style={{ 
            flex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid var(--glass-border)',
            borderRadius: '8px', padding: '0.75rem 1rem', color: 'var(--text)', outline: 'none'
          }}
        />
        <button 
          onClick={handleSend}
          aria-label="Send message"
          style={{ background: 'var(--accent)', color: 'var(--primary)', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer' }}
        >
          <Send size={20} />
        </button>
      </div>
    </motion.div>
  );
};

export default Assistant;
