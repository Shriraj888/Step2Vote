/**
 * useChat Hook
 *
 * Manages chat state, message history, and API communication.
 * Provides a clean interface for the Chat page component.
 *
 * @module hooks/useChat
 */

import { useState, useCallback, useRef } from 'react';
import { sendChatMessage } from '../services/api';

/**
 * Custom hook for managing chat interactions with the AI.
 *
 * @returns {{
 *   messages: Array<{id: string, role: string, text: string, timestamp: Date}>,
 *   isLoading: boolean,
 *   error: string|null,
 *   sendMessage: (message: string) => Promise<void>,
 *   clearChat: () => void,
 * }}
 */
export function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const messageIdCounter = useRef(0);

  /**
   * Generates a unique message ID.
   * @returns {string} A unique identifier for a message.
   */
  const generateId = useCallback(() => {
    messageIdCounter.current += 1;
    return `msg-${Date.now()}-${messageIdCounter.current}`;
  }, []);

  /**
   * Sends a user message and receives the AI response.
   * @param {string} message - The user's message text.
   */
  const sendMessage = useCallback(async (message) => {
    if (!message.trim() || isLoading) return;

    setError(null);

    // Add user message to the list
    const userMessage = {
      id: generateId(),
      role: 'user',
      text: message.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Build conversation history for context (exclude the current message)
      const history = messages.map((msg) => ({
        role: msg.role,
        text: msg.text,
      }));

      const responseText = await sendChatMessage(message.trim(), history);

      const aiMessage = {
        id: generateId(),
        role: 'assistant',
        text: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (err) {
      setError(err.message || 'Failed to get a response. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [isLoading, messages, generateId]);

  /**
   * Clears all chat messages and resets state.
   */
  const clearChat = useCallback(() => {
    setMessages([]);
    setError(null);
    setIsLoading(false);
  }, []);

  return { messages, isLoading, error, sendMessage, clearChat };
}
