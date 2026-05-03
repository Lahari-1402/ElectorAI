import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Gemini AI Setup
const apiKey = process.env.VITE_GEMINI_API_KEY || '';
let model = null;

if (apiKey) {
  const genAI = new GoogleGenerativeAI(apiKey);
  // Using gemini-2.5-flash (Latest stable version as of 2026)
  model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
}

app.post('/api/chat', async (req, res) => {
  try {
    if (!model) {
      return res.status(503).json({ 
        error: 'AI Assistant is currently in "Demo Mode" (Missing API Key). Please set VITE_GEMINI_API_KEY in your environment to enable full AI features.' 
      });
    }

    const { message, history } = req.body;
    
    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const prompt = `You are a helpful Election Process Assistant. 
    Help the user understand timelines, steps, and procedures for elections. 
    You have deep knowledge of BOTH US and INDIAN election processes.
    
    For Indian Elections, you know about:
    1. Election Commission of India (ECI)
    2. Model Code of Conduct (MCC)
    3. EVMs and VVPATs
    4. Lok Sabha vs Rajya Sabha
    5. The 7-phase voting process (typical)
    6. Voter ID (EPIC) registration
    7. Count days and result declaration.

    Keep answers concise, educational, and structured. User says: ${message}`;
    
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();
    
    res.json({ text });
  } catch (error) {
    console.error('AI Error:', error);
    res.status(500).json({ error: 'Failed to get response from AI Assistant' });
  }
});

// All other requests serve the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
