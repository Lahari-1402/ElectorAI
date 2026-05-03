import React, { useState } from 'react';
import { motion } from 'framer-motion';

const electionData = {
  US: [
    {
      step: "01",
      title: "Registration",
      front: "The first step to making your voice heard.",
      back: "Check your eligibility, register online or in-person, and ensure your information is up to date before the deadline."
    },
    {
      step: "02",
      title: "Primaries & Caucuses",
      front: "Selecting the party candidates.",
      back: "Voters choose which candidate will represent their political party in the general election."
    },
    {
      step: "03",
      title: "National Conventions",
      front: "Official nominations and party platforms.",
      back: "Each party holds a convention to formally select their final presidential nominee and define their policy goals."
    },
    {
      step: "04",
      title: "General Election",
      front: "The nationwide vote.",
      back: "Voters across the country cast ballots for the President, Vice President, and other representatives."
    },
    {
      step: "05",
      title: "Inauguration Day",
      front: "The transition of power.",
      back: "The newly elected President and Vice President are sworn into office, marking the beginning of their term."
    },
    {
      step: "06",
      title: "Midterm Elections",
      front: "The Congressional shift.",
      back: "Held halfway through a president's term, these determine control of the House and Senate."
    }
  ],
  India: [
    {
      step: "01",
      title: "Voter Registration",
      front: "Applying for the EPIC card.",
      back: "Eligible citizens (18+) apply via Form 6 on the Voter Helpline app or NVSP portal to get their Voter ID."
    },
    {
      step: "02",
      title: "Model Code of Conduct",
      front: "Guidelines for fair play.",
      back: "The ECI enforces rules for political parties and candidates to ensure no misuse of official machinery or communal appeals."
    },
    {
      step: "03",
      title: "Nomination & Scrutiny",
      front: "Filtering the candidates.",
      back: "Candidates file nomination papers. The Returning Officer scrutinizes them to ensure all legal requirements are met."
    },
    {
      step: "04",
      title: "Phased Polling",
      front: "The 7-Phase Journey.",
      back: "Elections are held in multiple phases across states to ensure security and smooth movement of paramilitary forces."
    },
    {
      step: "05",
      title: "EVM & VVPAT",
      front: "Electronic Voting.",
      back: "Voters use Electronic Voting Machines. The VVPAT provides a paper slip verification to ensure transparency."
    },
    {
      step: "06",
      title: "Counting & Results",
      front: "The Day of Democracy.",
      back: "Votes are counted simultaneously across all constituencies, and results for the Lok Sabha are declared."
    }
  ]
};

const Flashcard = ({ card }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="card-container" 
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ perspective: '1000px', width: '300px', height: '400px', cursor: 'pointer' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div className="glass" style={{
          position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
          display: 'flex', flexDirection: 'column', padding: '2rem', justifyContent: 'space-between',
          background: 'var(--card-bg)', border: '1px solid var(--glass-border)'
        }}>
          <span style={{ fontSize: '3rem', fontWeight: 'bold', opacity: 0.1, alignSelf: 'flex-end' }}>{card.step}</span>
          <div>
            <h3 style={{ marginBottom: '1rem', color: 'var(--accent)' }}>{card.title}</h3>
            <p>{card.front}</p>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Click to flip</span>
        </div>

        {/* Back */}
        <div className="glass" style={{
          position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden',
          display: 'flex', flexDirection: 'column', padding: '2rem', justifyContent: 'center',
          background: 'var(--primary)', border: '1px solid var(--accent)', transform: 'rotateY(180deg)'
        }}>
          <p style={{ lineHeight: '1.8' }}>{card.back}</p>
        </div>
      </motion.div>
    </div>
  );
};

const Flashcards = () => {
  const [region, setRegion] = useState('India');

  return (
    <div style={{ padding: '2rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
        <button 
          onClick={() => setRegion('India')}
          style={{ 
            padding: '0.5rem 2rem', borderRadius: '50px', 
            background: region === 'India' ? 'var(--accent)' : 'transparent',
            color: region === 'India' ? 'var(--primary)' : 'var(--text)',
            border: '1px solid var(--accent)'
          }}
        >
          India
        </button>
        <button 
          onClick={() => setRegion('US')}
          style={{ 
            padding: '0.5rem 2rem', borderRadius: '50px', 
            background: region === 'US' ? 'var(--accent)' : 'transparent',
            color: region === 'US' ? 'var(--primary)' : 'var(--text)',
            border: '1px solid var(--accent)'
          }}
        >
          USA
        </button>
      </div>
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
        {electionData[region].map((card, idx) => (
          <Flashcard key={`${region}-${idx}`} card={card} />
        ))}
      </div>
    </div>
  );
};

export default Flashcards;
