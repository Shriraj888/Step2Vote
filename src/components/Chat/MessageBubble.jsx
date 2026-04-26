/**
 * MessageBubble Component
 *
 * Renders a single chat message bubble with role-based styling.
 * Sanitizes AI responses before rendering as HTML.
 *
 * @component
 */

import { useMemo } from 'react';
import { marked } from 'marked';
import { sanitizeHtml } from '../../utils/sanitize';
import './MessageBubble.css';

/**
 * @param {{ message: { id: string, role: string, text: string, timestamp: Date } }} props
 */
export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';

  /**
   * Memoize the HTML rendering of markdown content.
   * Only AI responses are rendered as markdown; user messages are plain text.
   */
  const renderedContent = useMemo(() => {
    if (isUser) return null;

    // Configure marked for safe, minimal output
    marked.setOptions({
      breaks: true,
      gfm: true,
    });

    const rawHtml = marked.parse(message.text);
    return sanitizeHtml(rawHtml);
  }, [message.text, isUser]);

  const formattedTime = new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  }).format(new Date(message.timestamp));

  return (
    <article
      className={`message-bubble ${isUser ? 'message-bubble--user' : 'message-bubble--ai'}`}
      aria-label={`${isUser ? 'You' : 'Step2Vote AI'} said`}
    >
      <div className="message-bubble__avatar" aria-hidden="true">
        {isUser ? '👤' : '🗳️'}
      </div>

      <div className="message-bubble__content">
        <div className="message-bubble__header">
          <span className="message-bubble__role">
            {isUser ? 'You' : 'Step2Vote'}
          </span>
          <time className="message-bubble__time" dateTime={new Date(message.timestamp).toISOString()}>
            {formattedTime}
          </time>
        </div>

        {isUser ? (
          <p className="message-bubble__text">{message.text}</p>
        ) : (
          <div
            className="message-bubble__text message-bubble__text--markdown"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />
        )}
      </div>
    </article>
  );
}
