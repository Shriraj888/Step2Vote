/**
 * Chat Page
 *
 * AI-powered Indian election Q&A interface with conversation history,
 * quick-start prompts, and markdown-rendered responses.
 *
 * @component
 */

import { useState, useRef, useEffect, useCallback } from 'react';
import { useChat } from '../hooks/useChat';
import { QUICK_PROMPTS } from '../utils/constants';
import MessageBubble from '../components/Chat/MessageBubble';
import CivicIcon from '../components/ui/CivicIcon';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import './Chat.css';

export default function Chat() {
  const { messages, isLoading, error, sendMessage, clearChat } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current && typeof messagesEndRef.current.scrollIntoView === 'function') {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  }, [input, isLoading, sendMessage]);

  const handleQuickPrompt = useCallback((prompt) => {
    if (isLoading) return;
    sendMessage(prompt);
  }, [isLoading, sendMessage]);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  const hasMessages = messages.length > 0;

  return (
    <div className="chat">
      <div className="chat__header">
        <div className="chat__header-info">
          <h1 className="chat__title">
            <CivicIcon name="ai" /> Ask Step2Vote
          </h1>
          <p className="chat__subtitle">
            Ask about Indian voter registration, ECI processes, polling day, EVMs, VVPATs, and civic rights.
          </p>
        </div>
        {hasMessages && (
          <button
            className="chat__clear-btn"
            onClick={clearChat}
            aria-label="Clear chat history"
          >
            <CivicIcon name="safe" /> Clear Chat
          </button>
        )}
      </div>

      <div
        className="chat__messages"
        role="log"
        aria-label="Chat messages"
        aria-live="polite"
        aria-relevant="additions"
      >
        {!hasMessages && (
          <div className="chat__welcome">
            <div className="chat__welcome-icon" aria-hidden="true"><CivicIcon name="eci" /></div>
            <h2 className="chat__welcome-title">Welcome to Step2Vote!</h2>
            <p className="chat__welcome-text">
              I&apos;m your AI election education assistant for India. Ask about
              Form 6, EPIC details, polling stations, EVM/VVPAT, the Model Code
              of Conduct, or start with one of the prompts below.
            </p>

            <div className="chat__quick-prompts" role="group" aria-label="Quick question suggestions">
              {QUICK_PROMPTS.map((qp) => (
                <button
                  key={qp.id}
                  className="chat__quick-btn"
                  onClick={() => handleQuickPrompt(qp.prompt)}
                  disabled={isLoading}
                  id={`quick-prompt-${qp.id}`}
                >
                  <span className="chat__quick-icon" aria-hidden="true"><CivicIcon name={qp.icon} /></span>
                  <span className="chat__quick-label">{qp.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isLoading && (
          <div className="chat__typing" aria-label="Step2Vote is typing">
            <div className="chat__typing-avatar" aria-hidden="true"><CivicIcon name="ai" /></div>
            <div className="chat__typing-dots">
              <span /><span /><span />
            </div>
          </div>
        )}

        {error && (
          <div className="chat__error" role="alert">
            <span aria-hidden="true">!</span>
            <p>{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      <form className="chat__input-area" onSubmit={handleSubmit}>
        <label htmlFor="chat-input" className="sr-only">
          Type your question about Indian elections
        </label>
        <input
          ref={inputRef}
          id="chat-input"
          type="text"
          className="chat__input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask about Form 6, EVM, VVPAT, polling booths..."
          disabled={isLoading}
          autoComplete="off"
          maxLength={2000}
          aria-describedby="chat-hint"
        />
        <span id="chat-hint" className="sr-only">
          Press Enter to send your question
        </span>
        <button
          type="submit"
          className="chat__send-btn"
          disabled={!input.trim() || isLoading}
          aria-label="Send message"
        >
          {isLoading ? (
            <LoadingSpinner size="sm" label="Sending" />
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          )}
        </button>
      </form>
    </div>
  );
}
