import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  History,
  TrendingUp,
  Scale,
  Code2,
  Trophy,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import SearchForm, { RECENT_SEARCHES_KEY } from '../features/search/SearchForm';
import { getRandomFeaturedProfiles, FeaturedProfile } from '../data/featuredProfiles';
import { useSeo } from '../hooks/useSeo';
import './home.css';

const HomePage = () => {
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [featuredDevs, setFeaturedDevs] = useState<FeaturedProfile[]>(() => getRandomFeaturedProfiles(8));
  const navigate = useNavigate();

  useSeo({
    title: 'GitLens — GitHub Profile Analyzer & Developer Insights',
    description: 'Explore any public GitHub profile with comprehensive repository metrics, language breakdowns, contribution streams, and developer comparison.'
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
      if (raw) {
        setRecentSearches(JSON.parse(raw));
      }
    } catch {
      // ignore storage errors
    }
  }, []);

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(RECENT_SEARCHES_KEY);
      setRecentSearches([]);
    } catch {
      // ignore
    }
  };

  const handleRefreshFeatured = () => {
    setFeaturedDevs(getRandomFeaturedProfiles(8));
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero card home-hero">
        <div className="hero-copy">
          <h1>Analyze Any GitHub Profile with Deep Insights</h1>
          <p>
            Explore repository analytics, language breakdowns, contribution streams,
            and head-to-head developer benchmarks.
          </p>
        </div>

        <SearchForm variant="hero" />

        {/* Recently Viewed History */}
        {recentSearches.length > 0 && (
          <div className="recent-searches">
            <div className="recent-header">
              <span className="recent-title">
                <History size={14} /> Recent Explorations:
              </span>
              <button
                type="button"
                className="btn-clear-history"
                onClick={handleClearHistory}
              >
                Clear
              </button>
            </div>
            <div className="recent-pills">
              {recentSearches.map(username => (
                <button
                  key={username}
                  type="button"
                  className="recent-pill"
                  onClick={() => navigate(`/user/${username}`)}
                >
                  @{username}
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Featured Developers Showcase (8 Random Profiles on each reload) */}
      <section className="featured-section">
        <div className="section-title-group">
          <div className="title-with-icon">
            <TrendingUp size={20} className="section-icon" />
            <div>
              <h2>Featured Developers</h2>
              <p className="hint-text">8 randomly curated open source leaders &amp; creators on each visit</p>
            </div>
          </div>
          <button
            type="button"
            className="btn-ghost btn-shuffle"
            onClick={handleRefreshFeatured}
            title="Shuffle featured profiles"
          >
            <RefreshCw size={14} />
            <span>Shuffle</span>
          </button>
        </div>

        <div className="featured-grid">
          {featuredDevs.map(dev => (
            <Link
              key={dev.login}
              to={`/user/${dev.login}`}
              className="featured-card"
            >
              <div className="featured-avatar-row">
                <img src={dev.avatar} alt={dev.login} className="featured-avatar" />
              </div>
              <div className="featured-info">
                <h4>{dev.name}</h4>
                <span className="featured-handle">@{dev.login}</span>
                <p className="featured-role">{dev.role}</p>
              </div>
              <div className="featured-arrow">
                <ArrowRight size={16} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Highlights / Features Banner */}
      <section className="features-banner card">
        <div className="feature-item">
          <div className="feature-icon-box">
            <Code2 size={24} />
          </div>
          <h3>Language Snapshot</h3>
          <p>Visual breakdown of technologies, diversity counts, and repository distribution.</p>
        </div>

        <div className="feature-item">
          <div className="feature-icon-box">
            <Scale size={24} />
          </div>
          <h3>Compare Developers</h3>
          <p>Side-by-side metric battles comparing stars, forks, velocity, and tech stacks.</p>
        </div>

        <div className="feature-item">
          <div className="feature-icon-box">
            <Trophy size={24} />
          </div>
          <h3>Milestone Highlights</h3>
          <p>Automatically discover top-starred repositories, earliest creations, and current pushes.</p>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
