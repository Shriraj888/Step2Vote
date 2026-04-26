/**
 * Chat API Routes
 *
 * Handles communication with the Google Gemini 2.5 Flash model.
 * Provides endpoints for:
 *   - /api/chat  — General election Q&A
 *   - /api/quiz  — Generate quiz questions
 *
 * @module routes/chat
 */

import { Router } from 'express';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';

export const chatRouter = Router();

/* ─── Helpers ──────────────────────────────────────────────────────── */

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function extractJSON(text) {
  if (!text) return null;
  
  // Try direct parse first
  try {
    return JSON.parse(text);
  } catch (e) {
    // ignore
  }

  // Try to extract from markdown code block
  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    try {
      return JSON.parse(codeBlockMatch[1].trim());
    } catch (e) {
      // ignore
    }
  }

  // Try to find JSON array or object in text anywhere
  const firstOpenObj = text.indexOf('{');
  const lastCloseObj = text.lastIndexOf('}');
  const firstOpenArr = text.indexOf('[');
  const lastCloseArr = text.lastIndexOf(']');

  // Check if array is the outermost container
  if (firstOpenArr !== -1 && lastCloseArr !== -1 && lastCloseArr > firstOpenArr && 
      (firstOpenObj === -1 || firstOpenArr < firstOpenObj)) {
    try {
      const jsonStr = text.substring(firstOpenArr, lastCloseArr + 1);
      return JSON.parse(jsonStr);
    } catch (e) {
      // ignore
    }
  }

  // Check if object is the outermost container
  if (firstOpenObj !== -1 && lastCloseObj !== -1 && lastCloseObj > firstOpenObj) {
    try {
      const jsonStr = text.substring(firstOpenObj, lastCloseObj + 1);
      return JSON.parse(jsonStr);
    } catch (e) {
      // ignore
    }
  }

  return null;
}

/* ─── System Prompt ────────────────────────────────────────────────── */

const SYSTEM_PROMPT = `You are "Step2Vote", a friendly, non-partisan election education assistant focused strictly on the democratic and electoral process of India. Your role is to help users understand the Indian election process, timelines, and voting steps as mandated by the Election Commission of India (ECI).

GUIDELINES:
1. Be accurate, clear, and non-partisan at all times.
2. Explain Indian election processes step-by-step in simple language (e.g., Lok Sabha, Rajya Sabha, Vidhan Sabha, Panchayati Raj).
3. Cover topics like voter registration (Form 6, EPIC card), polling booths, Electronic Voting Machines (EVMs), VVPATs, election timelines, and election day procedures in India.
4. When asked about specific states or constituencies in India, provide relevant information when possible or direct users to the official ECI website (eci.gov.in) or Chief Electoral Officer (CEO) websites.
5. Use bullet points and numbered lists for clarity.
6. Always encourage users to verify information through official Indian election websites (like NVSP/Voters' Services Portal).
7. NEVER express political opinions, endorse candidates, or show bias toward any Indian political party.
8. If a question is outside your scope or about non-Indian elections, politely redirect to appropriate official resources or state that you only cover Indian elections.
9. Use simple, inclusive language accessible to first-time Indian voters.
10. Include relevant information about the Model Code of Conduct (MCC) when appropriate.

IMPORTANT: You must refuse to answer questions unrelated to Indian elections, voting, or civic processes. Politely explain that you can only help with India's election-related topics.`;

const QUIZ_SYSTEM_PROMPT = `You are "Step2Vote", an election education quiz generator focused on the Indian electoral system. Generate quiz questions about the election process in India.

RULES:
1. Generate exactly the number of questions requested.
2. Each question must have exactly 4 options (A, B, C, D).
3. Include the correct answer and a brief explanation.
4. Questions should cover: Indian voter registration (EPIC, Form 6), the Election Commission of India (ECI), EVMs & VVPATs, types of elections (Lok Sabha, State Assemblies), Model Code of Conduct, and Indian civic voting rights.
5. Keep questions educational, accurate to the Indian system, and non-partisan.
6. Vary difficulty levels.

RESPONSE FORMAT — You MUST respond with valid JSON only, no markdown:
[
  {
    "question": "What is the question?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation of the correct answer."
  }
]`;

/* ─── Safety Settings ──────────────────────────────────────────────── */

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

/* ─── Gemini Client Setup ──────────────────────────────────────────── */

/**
 * Creates and returns a configured Gemini generative model instance.
 * @param {string} systemInstruction - The system instruction for the model.
 * @returns {import('@google/generative-ai').GenerativeModel} The configured model.
 * @throws {Error} If GEMINI_API_KEY is not configured.
 */
function getModel(systemInstruction) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    throw new Error('GEMINI_API_KEY is not configured. Please add it to your .env file.');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  return genAI.getGenerativeModel({
    model: 'gemini-2.5-flash',
    systemInstruction,
    safetySettings,
    generationConfig: {
      temperature: 0.7,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 2048,
    },
  });
}

/* ─── Chat Endpoint ────────────────────────────────────────────────── */

chatRouter.post('/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'A non-empty message is required.' });
    }

    const model = getModel(SYSTEM_PROMPT);

    // Build chat history from previous turns
    const formattedHistory = history
      .filter((turn) => turn.role && turn.text)
      .map((turn) => ({
        role: turn.role === 'user' ? 'user' : 'model',
        parts: [{ text: turn.text }],
      }));

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const chat = model.startChat({ history: formattedHistory });
        const result = await chat.sendMessage(message.trim());
        const response = result.response.text();
        return res.json({ response });
      } catch (err) {
        const statusCode = err.status || err.statusCode;
        if (statusCode === 429 || statusCode === 503) {
          if (attempt < 2) {
            await delay(1000);
            continue;
          }
        }
        if (err.message && err.message.includes('API key not valid')) {
          return res.status(401).json({ error: 'Invalid Gemini API key. Please check your key.' });
        }
        if (attempt === 2) {
          throw err;
        }
      }
    }
  } catch (error) {
    console.error('[Chat Error]', error.message);
    res.status(500).json({ error: 'Failed to generate response. Please try again.' });
  }
});

/* ─── Quiz Endpoint ────────────────────────────────────────────────── */

chatRouter.post('/quiz', async (req, res) => {
  try {
    const { count = 5, topic = 'general election process' } = req.body;

    const questionCount = Math.min(Math.max(parseInt(count, 10) || 5, 1), 10);
    const model = getModel(QUIZ_SYSTEM_PROMPT);
    const prompt = `Generate ${questionCount} quiz questions about: ${topic}. Respond with valid JSON only.`;

    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        const questions = extractJSON(text);

        if (questions && Array.isArray(questions)) {
          return res.json({ questions });
        }

        if (attempt < 2) {
          await delay(1000);
          continue;
        }

        return res.status(500).json({ error: 'AI returned an unparseable response. Please try again.' });
      } catch (err) {
        const statusCode = err.status || err.statusCode;
        if (statusCode === 429 || statusCode === 503) {
          if (attempt < 2) {
            await delay(1000);
            continue;
          }
        }
        if (attempt === 2) {
          throw err;
        }
      }
    }
  } catch (error) {
    console.error('[Quiz Error]', error.message);
    res.status(500).json({ error: 'Failed to generate quiz. Please try again.' });
  }
});
