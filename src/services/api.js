/**
 * API Client Service
 *
 * Centralised HTTP client for communicating with the Step2Vote backend.
 * All API calls go through here for consistent error handling and logging.
 *
 * @module services/api
 */

import { API_BASE_URL } from '../utils/constants';

/**
 * Sends a chat message to the AI and returns the response.
 *
 * @param {string} message - The user's question.
 * @param {Array<{role: string, text: string}>} history - Conversation history.
 * @returns {Promise<string>} The AI's response text.
 * @throws {Error} If the request fails or returns an error.
 */
export async function sendChatMessage(message, history = []) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.response;
}

/**
 * Generates quiz questions from the AI.
 *
 * @param {number} [count=5] - Number of questions to generate.
 * @param {string} [topic='general election process'] - Topic focus.
 * @returns {Promise<Array>} Array of quiz question objects.
 * @throws {Error} If the request fails or returns an error.
 */
export async function generateQuiz(count = 5, topic = 'general election process') {
  const response = await fetch(`${API_BASE_URL}/quiz`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ count, topic }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `Request failed with status ${response.status}`);
  }

  const data = await response.json();
  return data.questions;
}

/**
 * Checks if the API server is healthy and reachable.
 *
 * @returns {Promise<boolean>} True if the server is healthy.
 */
export async function checkHealth() {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    const data = await response.json();
    return data.status === 'ok';
  } catch {
    return false;
  }
}
