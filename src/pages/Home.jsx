/**
 * Home Page
 *
 * First screen for the Step2Vote Indian election education assistant.
 *
 * @component
 */

import { Link } from 'react-router-dom';
import './Home.css';

const FEATURES = [
  {
    id: 'chat',
    icon: '[AI]',
    title: 'Ask the AI Assistant',
    description: 'Get non-partisan answers about Indian voter registration, polling booths, EVMs, VVPATs, and election timelines.',
    link: '/chat',
    cta: 'Ask Step2Vote',
    color: '#6366f1',
  },
  {
    id: 'learn',
    icon: '[GUIDE]',
    title: 'Interactive ECI Timeline',
    description: 'Follow the Indian election journey from eligibility and Form 6 through polling day and counting.',
    link: '/learn',
    cta: 'Start Learning',
    color: '#06b6d4',
  },
  {
    id: 'quiz',
    icon: '[QUIZ]',
    title: 'Test Your Knowledge',
    description: 'Practice with Gemini-generated quiz questions about Indian election rules, rights, and procedures.',
    link: '/quiz',
    cta: 'Take a Quiz',
    color: '#f59e0b',
  },
  {
    id: 'checklist',
    icon: '[CHECK]',
    title: 'Firebase-Synced Checklist',
    description: 'Track voter readiness locally as a guest or sync progress to Firestore when signed in.',
    link: '/checklist',
    cta: 'Get Ready',
    color: '#10b981',
  },
];

export default function Home() {
  return (
    <div className="home">
      <section className="home__hero" aria-labelledby="hero-heading">
        <div className="home__hero-bg" aria-hidden="true">
          <div className="home__hero-orb home__hero-orb--1" />
          <div className="home__hero-orb home__hero-orb--2" />
          <div className="home__hero-orb home__hero-orb--3" />
        </div>

        <div className="home__hero-content">
          <div className="home__hero-badge">
            <span aria-hidden="true">[ECI]</span> Indian Election Education Companion
          </div>

          <h1 id="hero-heading" className="home__hero-title">
            Understand Every
            <span className="home__hero-highlight"> Step </span>
            of Voting in India
          </h1>

          <p className="home__hero-subtitle">
            Step2Vote helps first-time and returning voters understand eligibility,
            Form 6 registration, polling station preparation, EVM/VVPAT flow, and
            official Election Commission guidance without partisan influence.
          </p>

          <div className="home__hero-actions">
            <Link to="/chat" className="home__hero-btn home__hero-btn--primary" id="hero-cta-chat">
              <span aria-hidden="true">[AI]</span> Ask a Question
            </Link>
            <Link to="/learn" className="home__hero-btn home__hero-btn--secondary" id="hero-cta-learn">
              <span aria-hidden="true">[GUIDE]</span> Explore the Timeline
            </Link>
          </div>

          <div className="home__hero-stats" aria-label="Key application capabilities">
            <div className="home__stat">
              <span className="home__stat-number">7</span>
              <span className="home__stat-label">ECI-Aligned Steps</span>
            </div>
            <div className="home__stat-divider" aria-hidden="true" />
            <div className="home__stat">
              <span className="home__stat-number">Gemini</span>
              <span className="home__stat-label">Powered</span>
            </div>
            <div className="home__stat-divider" aria-hidden="true" />
            <div className="home__stat">
              <span className="home__stat-number">Firebase</span>
              <span className="home__stat-label">Auth + Firestore</span>
            </div>
          </div>
        </div>
      </section>

      <section className="home__features" aria-labelledby="features-heading">
        <h2 id="features-heading" className="home__section-title">
          Tools for Confident, Informed Voting
        </h2>
        <p className="home__section-subtitle">
          Learn the process, check your readiness, and verify important details through official Indian election sources.
        </p>

        <div className="home__features-grid">
          {FEATURES.map((feature) => (
            <Link
              key={feature.id}
              to={feature.link}
              className="home__feature-card"
              id={`feature-${feature.id}`}
              style={{ '--card-accent': feature.color }}
            >
              <div className="home__feature-icon" aria-hidden="true">
                {feature.icon}
              </div>
              <h3 className="home__feature-title">{feature.title}</h3>
              <p className="home__feature-desc">{feature.description}</p>
              <span className="home__feature-cta">
                {feature.cta} <span aria-hidden="true">-&gt;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home__how" aria-labelledby="how-heading">
        <h2 id="how-heading" className="home__section-title">How Step2Vote Works</h2>
        <div className="home__how-steps">
          <div className="home__how-step">
            <div className="home__how-number" aria-hidden="true">1</div>
            <h3>Choose a Civic Topic</h3>
            <p>Start with registration, polling booths, EVM/VVPAT, MCC, accessibility, or counting.</p>
          </div>
          <div className="home__how-connector" aria-hidden="true" />
          <div className="home__how-step">
            <div className="home__how-number" aria-hidden="true">2</div>
            <h3>Get Grounded Answers</h3>
            <p>Gemini answers are constrained to Indian election education and official verification paths.</p>
          </div>
          <div className="home__how-connector" aria-hidden="true" />
          <div className="home__how-step">
            <div className="home__how-number" aria-hidden="true">3</div>
            <h3>Prepare and Save Progress</h3>
            <p>Use the checklist locally or sign in to sync readiness progress with Firebase Firestore.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
