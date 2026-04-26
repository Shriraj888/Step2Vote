/**
 * Home Page
 *
 * Landing page with hero section, feature cards, and call-to-action.
 * Designed to be the first touchpoint for users.
 *
 * @component
 */

import { Link } from 'react-router-dom';
import './Home.css';

/** Feature cards displayed on the homepage */
const FEATURES = [
  {
    id: 'chat',
    icon: '💬',
    title: 'Ask AI Assistant',
    description: 'Get instant, accurate answers to any election question from our AI-powered assistant.',
    link: '/chat',
    cta: 'Start Asking',
    color: '#6366f1',
  },
  {
    id: 'learn',
    icon: '📚',
    title: 'Interactive Timeline',
    description: 'Follow the complete election journey step-by-step with our interactive guide.',
    link: '/learn',
    cta: 'Start Learning',
    color: '#06b6d4',
  },
  {
    id: 'quiz',
    icon: '❓',
    title: 'Test Your Knowledge',
    description: 'Challenge yourself with AI-generated quizzes about the election process.',
    link: '/quiz',
    cta: 'Take a Quiz',
    color: '#f59e0b',
  },
  {
    id: 'checklist',
    icon: '✅',
    title: 'Voter Checklist',
    description: 'Make sure you\'re fully prepared with our interactive voter readiness checklist.',
    link: '/checklist',
    cta: 'Get Ready',
    color: '#10b981',
  },
];

export default function Home() {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="home__hero" aria-labelledby="hero-heading">
        <div className="home__hero-bg" aria-hidden="true">
          <div className="home__hero-orb home__hero-orb--1" />
          <div className="home__hero-orb home__hero-orb--2" />
          <div className="home__hero-orb home__hero-orb--3" />
        </div>

        <div className="home__hero-content">
          <div className="home__hero-badge">
            <span aria-hidden="true">🗳️</span> Your Election Education Companion
          </div>

          <h1 id="hero-heading" className="home__hero-title">
            Understand Every
            <span className="home__hero-highlight"> Step </span>
            of the Election Process
          </h1>

          <p className="home__hero-subtitle">
            Step2Vote is your AI-powered guide to elections. Learn about voter registration,
            election timelines, voting methods, and everything you need to make your voice heard.
          </p>

          <div className="home__hero-actions">
            <Link to="/chat" className="home__hero-btn home__hero-btn--primary" id="hero-cta-chat">
              <span aria-hidden="true">💬</span> Ask a Question
            </Link>
            <Link to="/learn" className="home__hero-btn home__hero-btn--secondary" id="hero-cta-learn">
              <span aria-hidden="true">📚</span> Explore the Timeline
            </Link>
          </div>

          <div className="home__hero-stats" aria-label="Key election statistics">
            <div className="home__stat">
              <span className="home__stat-number">7</span>
              <span className="home__stat-label">Key Steps</span>
            </div>
            <div className="home__stat-divider" aria-hidden="true" />
            <div className="home__stat">
              <span className="home__stat-number">AI</span>
              <span className="home__stat-label">Powered</span>
            </div>
            <div className="home__stat-divider" aria-hidden="true" />
            <div className="home__stat">
              <span className="home__stat-number">100%</span>
              <span className="home__stat-label">Non-Partisan</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="home__features" aria-labelledby="features-heading">
        <h2 id="features-heading" className="home__section-title">
          Everything You Need to Vote with Confidence
        </h2>
        <p className="home__section-subtitle">
          Explore our tools designed to make election education simple and accessible for everyone.
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
                {feature.cta} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="home__how" aria-labelledby="how-heading">
        <h2 id="how-heading" className="home__section-title">How Step2Vote Works</h2>
        <div className="home__how-steps">
          <div className="home__how-step">
            <div className="home__how-number" aria-hidden="true">1</div>
            <h3>Choose a Topic</h3>
            <p>Pick from registration, voting methods, timelines, or ask anything election-related.</p>
          </div>
          <div className="home__how-connector" aria-hidden="true" />
          <div className="home__how-step">
            <div className="home__how-number" aria-hidden="true">2</div>
            <h3>Get AI-Powered Answers</h3>
            <p>Our Gemini-powered AI provides accurate, non-partisan explanations instantly.</p>
          </div>
          <div className="home__how-connector" aria-hidden="true" />
          <div className="home__how-step">
            <div className="home__how-number" aria-hidden="true">3</div>
            <h3>Vote with Confidence</h3>
            <p>Use our checklist and quiz to make sure you&apos;re fully prepared for Election Day.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
