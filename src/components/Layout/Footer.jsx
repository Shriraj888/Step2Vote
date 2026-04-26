/**
 * Footer Component
 *
 * Application footer with disclaimer and helpful links.
 *
 * @component
 */

import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__brand">
          <span className="footer__logo" aria-hidden="true">🗳️</span>
          <span className="footer__name">
            Step<span className="footer__accent">2</span>Vote
          </span>
        </div>

        <p className="footer__disclaimer">
          This is an educational tool powered by Google Gemini AI.
          Always verify election information through{' '}
          <a
            href="https://vote.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            vote.gov
          </a>{' '}
          or your state&apos;s official election website.
        </p>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Step2Vote &mdash; Built with Google Gemini AI
          </p>
          <div className="footer__badges">
            <span className="footer__badge" aria-label="Non-partisan">🤝 Non-Partisan</span>
            <span className="footer__badge" aria-label="Accessible">♿ Accessible</span>
            <span className="footer__badge" aria-label="AI-Powered">🤖 AI-Powered</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
