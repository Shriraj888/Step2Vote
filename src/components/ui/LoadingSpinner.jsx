/**
 * LoadingSpinner Component
 *
 * Animated loading indicator with accessible labeling.
 *
 * @component
 * @param {{ size?: 'sm' | 'md' | 'lg', label?: string }} props
 */

import './LoadingSpinner.css';

export default function LoadingSpinner({ size = 'md', label = 'Loading...' }) {
  return (
    <div className={`spinner spinner--${size}`} role="status" aria-label={label}>
      <div className="spinner__circle" aria-hidden="true" />
      <span className="spinner__text">{label}</span>
    </div>
  );
}
