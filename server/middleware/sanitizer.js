/**
 * Input Sanitization Middleware
 *
 * Validates and sanitizes incoming request bodies before they reach Gemini.
 *
 * @module middleware/sanitizer
 */

const MAX_MESSAGE_LENGTH = 2000;
const MAX_TOPIC_LENGTH = 120;
const MAX_HISTORY_TURNS = 10;

const DANGEROUS_PATTERNS = [
  /<script\b[^>]*>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
  /data:text\/html/gi,
];

function stripHtmlTags(str) {
  return str.replace(/<[^>]*>/g, '');
}

function isSafeInput(input) {
  return !DANGEROUS_PATTERNS.some((pattern) => pattern.test(input));
}

function cleanText(value, maxLength, fieldName) {
  if (value === undefined) return undefined;
  if (typeof value !== 'string') {
    const error = new Error(`${fieldName} must be a string.`);
    error.status = 400;
    throw error;
  }
  if (value.length > maxLength) {
    const error = new Error(`${fieldName} is too long. Maximum ${maxLength} characters allowed.`);
    error.status = 400;
    throw error;
  }
  if (!isSafeInput(value)) {
    const error = new Error(`${fieldName} contains disallowed content.`);
    error.status = 400;
    throw error;
  }
  return stripHtmlTags(value).trim();
}

function cleanHistory(history) {
  if (history === undefined) return undefined;
  if (!Array.isArray(history)) {
    const error = new Error('History must be an array.');
    error.status = 400;
    throw error;
  }

  return history.slice(-MAX_HISTORY_TURNS).map((turn) => ({
    role: turn?.role === 'user' ? 'user' : 'model',
    text: cleanText(String(turn?.text || ''), MAX_MESSAGE_LENGTH, 'History text'),
  })).filter((turn) => turn.text);
}

export function sanitizeInput(req, res, next) {
  if (req.method !== 'POST') return next();

  try {
    req.body.message = cleanText(req.body.message, MAX_MESSAGE_LENGTH, 'Message');
    req.body.topic = cleanText(req.body.topic, MAX_TOPIC_LENGTH, 'Topic');
    req.body.history = cleanHistory(req.body.history);

    if (req.body.count !== undefined) {
      const numericCount = Number.parseInt(req.body.count, 10);
      req.body.count = Number.isFinite(numericCount) ? numericCount : 5;
    }

    return next();
  } catch (error) {
    return res.status(error.status || 400).json({ error: error.message });
  }
}
