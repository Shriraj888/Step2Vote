/**
 * Step2Vote Backend Server
 *
 * Express server that acts as a secure proxy for the Google Gemini API.
 * The API key is stored server-side and never exposed to the client.
 *
 * @module server
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { chatRouter } from './routes/chat.js';
import { rateLimiter } from './middleware/rateLimiter.js';
import { sanitizeInput } from './middleware/sanitizer.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

/* ─── Security Middleware ──────────────────────────────────────────── */

app.use(cors({
  origin: '*', // Allow all origins for local development proxy
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// Parse JSON bodies with a size limit to prevent payload attacks
app.use(express.json({ limit: '10kb' }));

// Apply rate limiting to all API routes
app.use('/api', rateLimiter);

// Apply input sanitization to all API routes
app.use('/api', sanitizeInput);

/* ─── Routes ───────────────────────────────────────────────────────── */
app.use('/api', chatRouter);

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

/* ─── Production Static Serving ────────────────────────────────────── */
if (process.env.NODE_ENV === 'production') {
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../dist')));

  // The "catchall" handler: for any request that doesn't
  // match one above, send back React's index.html file.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
  });
}

/* ─── Error Handling ───────────────────────────────────────────────── */

/**
 * Global error handler — prevents stack traces from leaking to clients.
 */
app.use((err, _req, res, _next) => {
  console.error('[Server Error]', err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'production'
      ? 'An internal error occurred'
      : err.message,
  });
});

/* ─── Start Server ─────────────────────────────────────────────────── */
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Step2Vote API server running on http://0.0.0.0:${PORT}`);
  if (!process.env.GEMINI_API_KEY || process.env.GEMINI_API_KEY === 'your_gemini_api_key_here') {
    console.warn('⚠️  GEMINI_API_KEY is not set. Add it to your .env file.');
  }
});

export default app;
