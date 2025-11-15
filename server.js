import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.VITE_ANTHROPIC_API_KEY,
});

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.VITE_GEMINI_API_KEY || '');

// Load resources data
const resourcesData = JSON.parse(
  fs.readFileSync(join(__dirname, 'src', 'data', 'resources.json'), 'utf8')
);

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    console.log('Received chat request with', messages.length, 'messages');

    const response = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1024,
      system: `You are a helpful assistant for finding community resources in San Francisco.
You have access to the following resource categories:
- Food Banks: Locations that provide free food and groceries
- Water: Public water fountains for drinking water
- Restrooms: Public restroom facilities
- Shelters: Emergency housing and overnight shelters
- Repair Cafes: Places where you can get items repaired for free

Here are the available resources in our database:
${JSON.stringify(resourcesData, null, 2)}

When someone asks for help, analyze their needs and recommend the most relevant resources.
Be empathetic, helpful, and provide specific resource names, addresses, and hours when available.
Format your response in a conversational, supportive way. If you suggest resources, list them clearly.`,
      messages: messages,
    });

    console.log('Successfully received response from Claude');

    res.json({
      content: response.content[0].text,
    });
  } catch (error) {
    console.error('Error calling Claude API:', error);
    res.status(500).json({
      error: 'Failed to get response from Claude',
      message: error.message,
    });
  }
});

// Gemini chat endpoint
app.post('/api/chat/gemini', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    console.log('Received Gemini chat request with', messages.length, 'messages');

    const systemPrompt = `You are a helpful assistant for finding community resources in San Francisco.
You have access to the following resource categories:
- Food Banks: Locations that provide free food and groceries
- Water: Public water fountains for drinking water
- Restrooms: Public restroom facilities
- Shelters: Emergency housing and overnight shelters
- Repair Cafes: Places where you can get items repaired for free

Here are the available resources in our database:
${JSON.stringify(resourcesData, null, 2)}

When someone asks for help, analyze their needs and recommend the most relevant resources.
Be empathetic, helpful, and provide specific resource names, addresses, and hours when available.
Format your response in a conversational, supportive way. If you suggest resources, list them clearly.`;

    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

    // Build conversation context from all messages
    const conversationContext = messages
      .filter((msg, index) => index !== 0 || msg.role !== 'model') // Skip initial greeting
      .map(msg => `${msg.role === 'model' ? 'Assistant' : 'User'}: ${msg.content}`)
      .join('\n\n');

    // Get the last user message
    const lastUserMessage = messages.filter(m => m.role === 'user').slice(-1)[0];

    const prompt = messages.length > 2
      ? `${systemPrompt}\n\nConversation so far:\n${conversationContext}\n\nPlease respond to the user's latest message.`
      : `${systemPrompt}\n\nUser: ${lastUserMessage.content}\n\nPlease respond.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('Successfully received response from Gemini');

    res.json({
      content: text,
    });
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    res.status(500).json({
      error: 'Failed to get response from Gemini',
      message: error.message,
    });
  }
});

// Test Gemini models endpoint
app.get('/api/gemini/models', async (req, res) => {
  try {
    const models = await genAI.listModels();
    res.json({ models });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Anthropic API Key configured: ${process.env.VITE_ANTHROPIC_API_KEY ? 'Yes' : 'No'}`);
  console.log(`Gemini API Key configured: ${process.env.VITE_GEMINI_API_KEY ? 'Yes' : 'No'}`);
});
