/**
 * Footer Component
 *
 * Application footer with official-source disclaimer.
 *
 * @component
 */

import CivicIcon from '../ui/CivicIcon';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__container">
        <div className="footer__brand">
          <span className="footer__logo" aria-hidden="true"><CivicIcon name="eci" /></span>
          <span className="footer__name">
            Step<span className="footer__accent">2</span>Vote
          </span>
        </div>

        <p className="footer__disclaimer">
          Step2Vote is a non-partisan educational assistant powered by Google Gemini.
          Always verify final voter information through{' '}
          <a
            href="https://www.eci.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="footer__link"
          >
            the Election Commission of India
          </a>{' '}
          or your state Chief Electoral Officer website.
        </p>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Step2Vote - Built with Google Gemini and Firebase
          </p>
          <div className="footer__badges">
            <span className="footer__badge" aria-label="Non-partisan"><CivicIcon name="safe" /> Non-Partisan</span>
            <span className="footer__badge" aria-label="Accessible"><CivicIcon name="ok" /> Accessible</span>
            <span className="footer__badge" aria-label="Google services"><CivicIcon name="ai" /> Google Services</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
