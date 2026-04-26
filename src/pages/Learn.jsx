/**
 * Learn Page - Interactive Indian Election Timeline
 *
 * Displays the voting process as expandable timeline steps.
 *
 * @component
 */

import { useState } from 'react';
import { ELECTION_TIMELINE } from '../utils/constants';
import './Learn.css';

export default function Learn() {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleStep = (id) => {
    setExpandedStep((prev) => (prev === id ? null : id));
  };

  return (
    <div className="learn">
      <header className="learn__header">
        <h1 className="learn__title">
          <span aria-hidden="true">[GUIDE]</span> Indian Election Process Timeline
        </h1>
        <p className="learn__subtitle">
          Follow the voter journey from eligibility and registration to polling
          station conduct, VVPAT verification, and official result tracking.
          Click each step to learn more.
        </p>
      </header>

      <div className="learn__timeline" role="list" aria-label="Election process steps">
        {ELECTION_TIMELINE.map((step, index) => {
          const isExpanded = expandedStep === step.id;

          return (
            <div
              key={step.id}
              className={`learn__step ${isExpanded ? 'learn__step--expanded' : ''}`}
              role="listitem"
              style={{ '--step-color': step.color }}
            >
              {index < ELECTION_TIMELINE.length - 1 && (
                <div className="learn__connector" aria-hidden="true" />
              )}

              <button
                className="learn__step-header"
                onClick={() => toggleStep(step.id)}
                aria-expanded={isExpanded}
                aria-controls={`step-details-${step.id}`}
                id={`step-header-${step.id}`}
              >
                <div className="learn__step-number" aria-hidden="true">
                  <span className="learn__step-icon">{step.icon}</span>
                </div>

                <div className="learn__step-info">
                  <h2 className="learn__step-title">
                    <span className="learn__step-count">Step {step.id}:</span> {step.title}
                  </h2>
                  <p className="learn__step-desc">{step.description}</p>
                </div>

                <div className={`learn__step-arrow ${isExpanded ? 'learn__step-arrow--open' : ''}`} aria-hidden="true">
                  v
                </div>
              </button>

              <div
                id={`step-details-${step.id}`}
                className="learn__step-details"
                role="region"
                aria-labelledby={`step-header-${step.id}`}
                hidden={!isExpanded}
              >
                <ul className="learn__detail-list">
                  {step.details.map((detail) => (
                    <li key={detail} className="learn__detail-item">
                      <span className="learn__detail-bullet" aria-hidden="true">-</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="learn__cta">
        <p className="learn__cta-text">
          Have questions about any step?{' '}
          <a href="/chat" className="learn__cta-link">Ask our AI assistant -&gt;</a>
        </p>
      </div>
    </div>
  );
}
