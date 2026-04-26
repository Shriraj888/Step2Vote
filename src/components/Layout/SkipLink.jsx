/**
 * SkipLink Component
 *
 * Provides a hidden skip navigation link that becomes visible on focus.
 * Essential for keyboard users and screen reader navigation (WCAG 2.1 AA).
 *
 * @component
 */

import './SkipLink.css';

/**
 * @param {{ targetId: string }} props
 * @param {string} props.targetId - The ID of the main content element to skip to.
 */
export default function SkipLink({ targetId = 'main-content' }) {
  return (
    <a
      href={`#${targetId}`}
      className="skip-link"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
}
