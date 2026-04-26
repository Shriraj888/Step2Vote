/**
 * Client-side Sanitization Utility
 *
 * Provides functions to sanitize user inputs and AI responses
 * before rendering them in the DOM.
 *
 * @module utils/sanitize
 */

import DOMPurify from 'dompurify';

/**
 * Sanitizes HTML content using DOMPurify to prevent XSS attacks.
 * Allows safe formatting tags used by markdown rendering.
 *
 * @param {string} html - The HTML string to sanitize.
 * @returns {string} Sanitised HTML safe for rendering via dangerouslySetInnerHTML.
 */
export function sanitizeHtml(html) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'p', 'br', 'strong', 'em', 'b', 'i', 'u',
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'ul', 'ol', 'li',
      'a', 'code', 'pre', 'blockquote',
      'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'span', 'div',
    ],
    ALLOWED_ATTR: ['href', 'target', 'rel', 'class'],
    ADD_ATTR: ['target'],
  });
}

/**
 * Escapes a string for safe use in text content (no HTML interpretation).
 *
 * @param {string} str - The string to escape.
 * @returns {string} The escaped string.
 */
export function escapeText(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
