/**
 * Rate Limiter Middleware
 *
 * Prevents abuse by limiting the number of API requests per client.
 * Uses express-rate-limit with a sliding window approach.
 *
 * @module middleware/rateLimiter
 */

import rateLimit from 'express-rate-limit';

/**
 * Rate limiter configured for 30 requests per minute per IP.
 * Returns a 429 status with a descriptive message when exceeded.
 */
export const rateLimiter = rateLimit({
  windowMs: 60 * 1000,    // 1-minute window
  limit: 30,               // 30 requests per window (renamed from 'max' in newer versions but 'max' still works)
  standardHeaders: true,   // Return rate limit info in `RateLimit-*` headers
  legacyHeaders: false,    // Disable `X-RateLimit-*` headers
  message: {
    error: 'Too many requests. Please wait a moment before trying again.',
    retryAfter: 60,
  },
  keyGenerator: (req) => req.ip,
});
