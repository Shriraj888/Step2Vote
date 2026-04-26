/**
 * Step2Vote Backend Server
 *
 * Secure Express proxy for Google Gemini and production static serving.
 *
 * @module server
 */

import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { rateLimiter } from './middleware/rateLimiter.js';
import { sanitizeInput } from './middleware/sanitizer.js';
import { chatRouter, isGeminiConfigured } from './routes/chat.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const defaultOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  'http://localhost:4173',
  'http://127.0.0.1:4173',
];
const allowedOrigins = (process.env.CORS_ORIGINS || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);
const trustedOrigins = new Set([...defaultOrigins, ...allowedOrigins]);

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1);
}

app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  next();
});

// CORS configuration
const corsOptions = {
  origin(origin, callback) {
    if (!origin || trustedOrigins.has(origin) || process.env.NODE_ENV !== 'production') {
      callback(null, true);
      return;
    }
    console.warn(`[CORS Blocked] Origin: ${origin}`);
    callback(new Error('CORS origin is not allowed.'));
  },
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
};

app.use(express.json({ limit: '10kb' }));
app.use('/api', cors(corsOptions));
app.use('/api', rateLimiter);
app.use('/api', sanitizeInput);
app.use('/api', chatRouter);

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    services: {
      gemini: isGeminiConfigured() ? 'configured' : 'missing-key',
      firebase: process.env.VITE_FIREBASE_PROJECT_ID ? 'configured' : 'client-env-missing',
    },
  });
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../dist'), {
    immutable: true,
    maxAge: '1y',
    setHeaders(res, filePath) {
      if (filePath.endsWith('index.html')) {
        res.setHeader('Cache-Control', 'no-store');
      }
    },
  }));

  app.get(/.*/, (_req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'An internal error occurred'
      : err.message,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Step2Vote API server running on http://0.0.0.0:${PORT}`);
  if (!isGeminiConfigured()) {
    console.warn('GEMINI_API_KEY is not set. Add it to your environment before using AI routes.');
  }
});

export default app;
