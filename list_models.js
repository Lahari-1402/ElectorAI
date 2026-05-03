import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.VITE_GEMINI_API_KEY || 'AIzaSyA2MRT3h1rP77wZkRkS8XbfePeqcD3TmBY';
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    const result = await genAI.listModels();
    console.log('Available Models:');
    result.models.forEach(m => {
      console.log(`${m.name} - ${m.supportedGenerationMethods}`);
    });
  } catch (error) {
    console.error('Error listing models:', error);
  }
}

listModels();
