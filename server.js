import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Anthropic from '@anthropic-ai/sdk';
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
      model: 'claude-3-haiku-20240307',
      max_tokens: 1024,
      system: `You are a helpful assistant for finding community resources in San Francisco.
You have access to the following resource categories:
- Food Banks: Free meals and groceries
- Shelter: Emergency housing and overnight shelters
- Medical: Free and low-cost medical clinics
- Mental Health & Crisis: 24/7 crisis lines and mental health support
- Hygiene: Showers, toiletries, and personal care facilities
- Clothing: Free clothing and apparel assistance
- ID & Documents: Help getting identification and important documents
- Water: Public water fountains for drinking water
- Restrooms: Public restroom facilities
- Repair Cafes: Places where you can get items repaired for free

Here are the available resources in our database:
${JSON.stringify(resourcesData, null, 2)}

When someone asks for help, analyze their needs and recommend the most relevant resources.
Be empathetic, helpful, and provide specific resource names, addresses, hours, and descriptions when available.
Format your response in a conversational, supportive way. If you suggest resources, list them clearly with their hours and contact information.`,
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

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Anthropic API Key configured: ${process.env.VITE_ANTHROPIC_API_KEY ? 'Yes' : 'No'}`);
});
