import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, ArrowRight } from 'lucide-react';

const quizData = [
  {
    question: "What is the minimum age to vote in India?",
    options: ["16", "18", "21", "25"],
    answer: "18",
    explanation: "The 61st Amendment Act reduced the voting age from 21 to 18 in 1989."
  },
  {
    question: "Who is responsible for conducting elections in India?",
    options: ["Parliament", "President", "Election Commission of India", "Supreme Court"],
    answer: "Election Commission of India",
    explanation: "The ECI is an autonomous constitutional authority responsible for administering election processes in India."
  },
  {
    question: "How many phases were there in the 2024 Indian General Elections?",
    options: ["3", "5", "7", "9"],
    answer: "7",
    explanation: "The 2024 elections were conducted in 7 phases to manage logistics and security across the country."
  },
  {
    question: "What does VVPAT stand for?",
    options: ["Voter Verifiable Paper Audit Trail", "Voter Validated Paper Account Trust", "Virtual Voter Paper Audit Tool", "Voter Verified Power Audit Trail"],
    answer: "Voter Verifiable Paper Audit Trail",
    explanation: "VVPAT provides feedback to voters using EVMs, showing a paper slip with their choice for 7 seconds."
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);

  const handleAnswer = (option) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(option);
    const correct = option === quizData[currentQuestion].answer;
    setIsCorrect(correct);
    if (correct) setScore(score + 1);
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsCorrect(null);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedOption(null);
    setIsCorrect(null);
  };

  return (
    <div className="glass" style={{ padding: '3rem', maxWidth: '800px', margin: '4rem auto', borderRadius: '24px' }}>
      <AnimatePresence mode="wait">
        {!showScore ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-muted)' }}>
              <span>Question {currentQuestion + 1} of {quizData.length}</span>
              <span>Score: {score}</span>
            </div>
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>{quizData[currentQuestion].question}</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {quizData[currentQuestion].options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleAnswer(option)}
                  style={{
                    padding: '1.25rem',
                    textAlign: 'left',
                    borderRadius: '12px',
                    background: selectedOption === option 
                      ? (option === quizData[currentQuestion].answer ? 'rgba(100, 255, 218, 0.1)' : 'rgba(255, 100, 100, 0.1)')
                      : 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid',
                    borderColor: selectedOption === option
                      ? (option === quizData[currentQuestion].answer ? 'var(--secondary)' : '#ff6464')
                      : 'var(--glass-border)',
                    color: 'var(--text)',
                    fontSize: '1rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  {option}
                  {selectedOption === option && (
                    option === quizData[currentQuestion].answer ? <CheckCircle2 color="var(--secondary)" /> : <XCircle color="#ff6464" />
                  )}
                </button>
              ))}
            </div>

            {selectedOption && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', borderLeft: '4px solid var(--accent)' }}
              >
                <p style={{ color: 'var(--accent)', fontWeight: 'bold', marginBottom: '0.5rem' }}>Explanation:</p>
                <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)' }}>{quizData[currentQuestion].explanation}</p>
                <button 
                  onClick={nextQuestion}
                  style={{ 
                    marginTop: '1.5rem', background: 'var(--accent)', color: 'var(--primary)', 
                    padding: '0.75rem 2rem', borderRadius: '8px', fontWeight: 'bold',
                    display: 'flex', alignItems: 'center', gap: '0.5rem'
                  }}
                >
                  Next Question <ArrowRight size={18} />
                </button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: 'center' }}
          >
            <Trophy size={80} color="var(--accent)" style={{ marginBottom: '2rem' }} />
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Quiz Completed!</h2>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', marginBottom: '2rem' }}>
              You scored {score} out of {quizData.length}
            </p>
            <button 
              onClick={resetQuiz}
              style={{ background: 'var(--accent)', color: 'var(--primary)', padding: '1rem 3rem', borderRadius: '50px', fontWeight: 'bold' }}
            >
              Try Again
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
