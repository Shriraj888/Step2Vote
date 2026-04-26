/**
 * Header Component
 *
 * Main application header with navigation and Firebase auth awareness.
 *
 * @component
 */

import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { NAV_LINKS } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';
import CivicIcon from '../ui/CivicIcon';
import './Header.css';

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser, logout } = useAuth();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  async function handleLogout() {
    closeMenu();
    await logout();
    navigate('/');
  }

  return (
    <header className="header" role="banner">
      <div className="header__container">
        <Link to="/" className="header__logo" aria-label="Step2Vote Home" onClick={closeMenu}>
          <span className="header__logo-icon" aria-hidden="true"><CivicIcon name="eci" /></span>
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
                  <span className="header__nav-icon" aria-hidden="true"><CivicIcon name={link.icon} /></span>
                  <span className="header__nav-label">{link.label}</span>
                </Link>
              </li>
            ))}
            <li className="header__nav-item">
              {currentUser ? (
                <button className="header__nav-link header__nav-button" onClick={handleLogout}>
                  <span className="header__nav-icon" aria-hidden="true"><CivicIcon name="logout" /></span>
                  <span className="header__nav-label">Sign Out</span>
                </button>
              ) : (
                <Link
                  to="/login"
                  className={`header__nav-link ${
                    location.pathname === '/login' ? 'header__nav-link--active' : ''
                  }`}
                  onClick={closeMenu}
                  aria-current={location.pathname === '/login' ? 'page' : undefined}
                >
                  <span className="header__nav-icon" aria-hidden="true"><CivicIcon name="login" /></span>
                  <span className="header__nav-label">Sign In</span>
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
