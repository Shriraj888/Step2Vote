/**
 * Input Sanitization Middleware
 *
 * Validates and sanitizes all incoming request bodies to prevent
 * injection attacks and ensure data integrity.
 *
 * @module middleware/sanitizer
 */

/** Maximum allowed length for user messages */
const MAX_MESSAGE_LENGTH = 2000;

/** Pattern to detect potential prompt injection attempts */
const DANGEROUS_PATTERNS = [
  /<script\b[^>]*>/gi,
  /javascript:/gi,
  /on\w+\s*=/gi,
];

/**
 * Strips HTML tags from a string to prevent XSS.
 * @param {string} str - The input string to sanitize.
 * @returns {string} The sanitized string with HTML tags removed.
 */
function stripHtmlTags(str) {
  return str.replace(/<[^>]*>/g, '');
}

/**
 * Validates that the input doesn't contain dangerous patterns.
 * @param {string} input - The input string to validate.
 * @returns {boolean} True if the input is safe.
 */
function isSafeInput(input) {
  return !DANGEROUS_PATTERNS.some((pattern) => pattern.test(input));
}

/**
 * Express middleware that sanitizes request body inputs.
 * Validates message length, strips HTML, and checks for injection patterns.
 *
 * @param {import('express').Request} req
 * @param {import('express').Response} res
 * @param {import('express').NextFunction} next
 */
export function sanitizeInput(req, res, next) {
  if (req.method !== 'POST') return next();

  const { message } = req.body;

  // Validate message exists and is a string
  if (message !== undefined) {
    if (typeof message !== 'string') {
      return res.status(400).json({
        error: 'Message must be a string.',
      });
    }

    // Check message length
    if (message.length > MAX_MESSAGE_LENGTH) {
      return res.status(400).json({
        error: `Message too long. Maximum ${MAX_MESSAGE_LENGTH} characters allowed.`,
      });
    }

    // Check for dangerous patterns
    if (!isSafeInput(message)) {
      return res.status(400).json({
        error: 'Message contains disallowed content.',
      });
    }

    // Sanitize the message by stripping HTML tags
    req.body.message = stripHtmlTags(message).trim();
  }

  next();
}
