import React, { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Flashcards from './components/Flashcards'
import Assistant from './components/Assistant'
import Quiz from './components/Quiz'
import Footer from './components/Footer'

function App() {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Hero onStart={() => setShowAssistant(true)} />
        <section id="flashcards" className="container">
          <h2 className="section-title fade-in">Election Milestones</h2>
          <Flashcards />
        </section>
        <section id="quiz" className="container">
          <h2 className="section-title fade-in">Test Your Knowledge</h2>
          <Quiz />
        </section>
      </main>
      
      {/* Floating AI Assistant Toggle */}
      <div className={`assistant-wrapper ${showAssistant ? 'active' : ''}`}>
        <Assistant onClose={() => setShowAssistant(false)} />
      </div>
      
      {!showAssistant && (
        <button 
          className="assistant-trigger"
          onClick={() => setShowAssistant(true)}
        >
          Ask Assistant
        </button>
      )}
      
      <Footer />
    </div>
  )
}

export default App
