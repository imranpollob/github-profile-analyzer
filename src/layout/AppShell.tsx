import React, { PropsWithChildren } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Scale, Compass, Heart } from 'lucide-react';
import { GithubIcon } from '../components/icons';
import ThemeToggle from '../components/ThemeToggle';
import './app-shell.css';

const AppShell: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="header-brand-group">
          <Link to="/" className="brand-logo" aria-label="GitLens Home">
            <img
              src={`${import.meta.env.BASE_URL}brand-logo.png`}
              alt="Imran Pollob Brand Logo"
              className="brand-logo-img"
            />
            <div className="brand-text">
              <span className="brand-name">GitLens</span>
              <span className="brand-badge">PRO</span>
            </div>
          </Link>
        </div>

        <nav className="header-nav" aria-label="Main Navigation">
          <Link
            to="/"
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            <Compass size={16} />
            <span>Explorer</span>
          </Link>
          <Link
            to="/compare"
            className={`nav-link ${location.pathname.startsWith('/compare') ? 'active' : ''}`}
          >
            <Scale size={16} />
            <span>Compare</span>
          </Link>
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <a
            href="https://github.com/imranpollob/github-profile-analyzer"
            target="_blank"
            rel="noreferrer"
            className="github-source-btn"
            title="View source on GitHub"
            aria-label="View source repository"
          >
            <GithubIcon size={18} />
          </a>
        </div>
      </header>

      <main className="app-main">{children}</main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-left">
            <img src={`${import.meta.env.BASE_URL}brand-logo.png`} alt="" className="footer-logo" />
            <span>GitLens by <a href="https://github.com/imranpollob" target="_blank" rel="noreferrer"><strong>Imran Pollob</strong></a></span>
          </div>
          <div className="footer-right">
            <a href="https://github.com/imranpollob" target="_blank" rel="noreferrer">
              <GithubIcon size={14} /> @imranpollob
            </a>
            <span className="separator">•</span>
            <span>GitHub API</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AppShell;
