/**
 * Header Component
 *
 * Main application header with navigation.
 * Features responsive design and active link highlighting.
 *
 * @component
 */

import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <header className="header" role="banner">
      <div className="header__container">
        <Link to="/" className="header__logo" aria-label="Step2Vote Home" onClick={closeMenu}>
          <span className="header__logo-icon" aria-hidden="true">🗳️</span>
          <span className="header__logo-text">
            Step<span className="header__logo-accent">2</span>Vote
          </span>
        </Link>

        <button
          className={`header__menu-toggle ${menuOpen ? 'header__menu-toggle--open' : ''}`}
          onClick={toggleMenu}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          <span className="header__menu-bar" aria-hidden="true" />
          <span className="header__menu-bar" aria-hidden="true" />
          <span className="header__menu-bar" aria-hidden="true" />
        </button>

        <nav
          id="main-nav"
          className={`header__nav ${menuOpen ? 'header__nav--open' : ''}`}
          role="navigation"
          aria-label="Main navigation"
        >
          <ul className="header__nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.path} className="header__nav-item">
                <Link
                  to={link.path}
                  className={`header__nav-link ${
                    location.pathname === link.path ? 'header__nav-link--active' : ''
                  }`}
                  onClick={closeMenu}
                  aria-current={location.pathname === link.path ? 'page' : undefined}
                >
                  <span className="header__nav-icon" aria-hidden="true">{link.icon}</span>
                  <span className="header__nav-label">{link.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
