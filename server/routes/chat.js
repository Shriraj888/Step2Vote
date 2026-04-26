/**
 * Chat API Routes
 *
 * Handles communication with Google Gemini for Indian election education.
 *
 * @module routes/chat
 */

import { Router } from 'express';
import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';

export const chatRouter = Router();

const MAX_HISTORY_TURNS = 10;
const MAX_HISTORY_TEXT_LENGTH = 2000;
const MAX_TOPIC_LENGTH = 120;
const MODEL_NAME = 'gemini-2.5-flash';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function isGeminiConfigured() {
  const apiKey = process.env.GEMINI_API_KEY;
  return Boolean(apiKey && apiKey !== 'your_gemini_api_key_here');
}

function tryParseJSON(text) {
  try {
    return JSON.parse(text);
  } catch {
    return null;
  }
}

function extractJSON(text) {
  if (!text) return null;

  const directJSON = tryParseJSON(text);
  if (directJSON) return directJSON;

  const codeBlockMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (codeBlockMatch) {
    const blockJSON = tryParseJSON(codeBlockMatch[1].trim());
    if (blockJSON) return blockJSON;
  }

  const candidates = [
    [text.indexOf('['), text.lastIndexOf(']')],
    [text.indexOf('{'), text.lastIndexOf('}')],
  ];

  for (const [start, end] of candidates) {
    if (start !== -1 && end > start) {
      const parsed = tryParseJSON(text.substring(start, end + 1));
      if (parsed) return parsed;
    }
  }

  return null;
}

function sanitizeHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .slice(-MAX_HISTORY_TURNS)
    .filter((turn) => {
      const hasValidRole = turn?.role === 'user' || turn?.role === 'model' || turn?.role === 'assistant';
      const hasText = typeof turn?.text === 'string' && turn.text.trim().length > 0;
      return hasValidRole && hasText;
    })
    .map((turn) => ({
      role: turn.role === 'user' ? 'user' : 'model',
      parts: [{ text: turn.text.slice(0, MAX_HISTORY_TEXT_LENGTH).trim() }],
    }));
}

function validateQuizQuestions(questions, expectedCount) {
  if (!Array.isArray(questions)) return null;

  return questions.slice(0, expectedCount).filter((question) => (
    typeof question?.question === 'string'
    && Array.isArray(question.options)
    && question.options.length === 4
    && Number.isInteger(question.correctIndex)
    && question.correctIndex >= 0
    && question.correctIndex <= 3
    && typeof question.explanation === 'string'
  ));
}

const SYSTEM_PROMPT = `You are "Step2Vote", a friendly, non-partisan election education assistant focused strictly on the democratic and electoral process of India. Your role is to help users understand the Indian election process, timelines, and voting steps as mandated by the Election Commission of India (ECI).

Guidelines:
1. Be accurate, clear, and non-partisan at all times.
2. Explain Indian election processes step by step in simple language, including Lok Sabha, Rajya Sabha, Vidhan Sabha, and local body contexts when relevant.
3. Cover voter registration, Form 6, Form 8, EPIC, polling booths, EVMs, VVPATs, election timelines, accessibility support, and polling day procedures in India.
4. Direct users to official ECI, Voters Services Portal, voter helpline, or Chief Electoral Officer sources for final verification.
5. Use bullet points and numbered lists for clarity.
6. Never express political opinions, endorse candidates, compare parties, predict outcomes, or persuade users toward a political choice.
7. If a question is outside Indian elections, voting, or civic election processes, politely redirect to the app scope.
8. Use simple, inclusive language accessible to first-time voters.
9. Include the Model Code of Conduct when relevant.

Important: Refuse unrelated or partisan requests. Explain that Step2Vote only helps with non-partisan Indian election education.`;

const QUIZ_SYSTEM_PROMPT = `You are "Step2Vote", an election education quiz generator focused on the Indian electoral system.

Rules:
1. Generate exactly the number of questions requested.
2. Each question must have exactly 4 options.
3. Include correctIndex and a brief explanation.
4. Cover Indian voter registration, EPIC, Form 6, Form 8, ECI, EVMs, VVPATs, Lok Sabha, State Assembly elections, Model Code of Conduct, voter rights, polling stations, and accessibility support.
5. Keep questions educational, accurate, non-partisan, and beginner friendly.
6. Respond with valid JSON only, no markdown.

Response schema:
[
  {
    "question": "What is the question?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctIndex": 0,
    "explanation": "Brief explanation of the correct answer."
  }
]`;

const safetySettings = [
  { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
  { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
];

function getModel(systemInstruction) {
  if (!isGeminiConfigured()) {
    throw new Error('GEMINI_API_KEY is not configured. Please add it to your .env file.');
  }

  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  return genAI.getGenerativeModel({
    model: MODEL_NAME,
    systemInstruction,
    safetySettings,
    generationConfig: {
      temperature: 0.5,
      topP: 0.9,
      topK: 40,
      maxOutputTokens: 2048,
    },
  });
}

chatRouter.post('/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({ error: 'A non-empty message is required.' });
    }

    const model = getModel(SYSTEM_PROMPT);
    const formattedHistory = sanitizeHistory(history);

    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        const chat = model.startChat({ history: formattedHistory });
        const result = await chat.sendMessage(message.trim());
        return res.json({ response: result.response.text() });
      } catch (err) {
        const statusCode = err.status || err.statusCode;
        if ((statusCode === 429 || statusCode === 503) && attempt < 2) {
          await delay(1000);
          continue;
        }
        if (err.message?.includes('API key not valid')) {
          return res.status(401).json({ error: 'Invalid Gemini API key. Please check your key.' });
        }
        throw err;
      }
    }

    return res.status(502).json({ error: 'Gemini did not return a response. Please try again.' });
  } catch (error) {
    console.error('[Chat Error]', error.message);
    return res.status(500).json({ error: 'Failed to generate response. Please try again.' });
  }
});

chatRouter.post('/quiz', async (req, res) => {
  try {
    const rawCount = Number.parseInt(req.body.count, 10);
    const questionCount = Math.min(Math.max(rawCount || 5, 1), 10);
    const rawTopic = typeof req.body.topic === 'string' ? req.body.topic : 'Indian election process';
    const topic = rawTopic.slice(0, MAX_TOPIC_LENGTH).trim() || 'Indian election process';

    const model = getModel(QUIZ_SYSTEM_PROMPT);
    const prompt = `Generate ${questionCount} quiz questions about this Indian election education topic: ${topic}. Respond with valid JSON only.`;

    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        const result = await model.generateContent(prompt);
        const parsed = extractJSON(result.response.text());
        const questions = validateQuizQuestions(parsed, questionCount);

        if (questions?.length === questionCount) {
          return res.json({ questions });
        }

        if (attempt < 2) {
          await delay(1000);
          continue;
        }

        return res.status(502).json({ error: 'AI returned an invalid quiz format. Please try again.' });
      } catch (err) {
        const statusCode = err.status || err.statusCode;
        if ((statusCode === 429 || statusCode === 503) && attempt < 2) {
          await delay(1000);
          continue;
        }
        throw err;
      }
    }

    return res.status(502).json({ error: 'Gemini did not return quiz questions. Please try again.' });
  } catch (error) {
    console.error('[Quiz Error]', error.message);
    return res.status(500).json({ error: 'Failed to generate quiz. Please try again.' });
  }
});
