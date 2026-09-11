import { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Scale,
  Swords,
  Trophy,
  ArrowRight,
  Star,
  GitFork,
  Users,
  FolderGit2,
  Calendar,
  ExternalLink,
  AlertTriangle
} from 'lucide-react';
import { fetchUser, fetchUserRepos, GithubUser } from '../api/github';
import { buildRepoInsights, RepoInsights } from '../utils/githubStats';
import { formatDateString, formatNumber } from '../utils/format';
import { useSeo } from '../hooks/useSeo';
import './compare.css';

const PRESETS = [
  { u1: 'torvalds', u2: 'gaearon', label: 'Linus Torvalds vs Dan Abramov' },
  { u1: 'yyx990803', u2: 'antfu', label: 'Evan You vs Anthony Fu' },
  { u1: 'shadcn', u2: 'leerob', label: 'shadcn vs Lee Robinson' }
];

export const ComparePage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialU1 = searchParams.get('u1') || 'torvalds';
  const initialU2 = searchParams.get('u2') || 'gaearon';

  const [input1, setInput1] = useState(initialU1);
  const [input2, setInput2] = useState(initialU2);

  const activeU1 = searchParams.get('u1') || '';
  const activeU2 = searchParams.get('u2') || '';

  useSeo({
    title: activeU1 && activeU2 ? `Compare: ${activeU1} vs ${activeU2}` : 'Compare GitHub Developers',
    description: `Side-by-side GitHub developer metrics comparison between ${activeU1 || 'developers'} and ${activeU2 || 'peers'}.`
  });

  // User 1 Data
  const { data: user1, isLoading: loadingUser1, error: errorUser1 } = useQuery({
    queryKey: ['compare-user', activeU1],
    queryFn: () => fetchUser(activeU1),
    enabled: !!activeU1
  });
  const { data: repos1 = [], isLoading: loadingRepos1 } = useQuery({
    queryKey: ['compare-repos', activeU1],
    queryFn: () => fetchUserRepos(activeU1),
    enabled: !!activeU1
  });

  // User 2 Data
  const { data: user2, isLoading: loadingUser2, error: errorUser2 } = useQuery({
    queryKey: ['compare-user', activeU2],
    queryFn: () => fetchUser(activeU2),
    enabled: !!activeU2
  });
  const { data: repos2 = [], isLoading: loadingRepos2 } = useQuery({
    queryKey: ['compare-repos', activeU2],
    queryFn: () => fetchUserRepos(activeU2),
    enabled: !!activeU2
  });

  const insights1 = useMemo(() => buildRepoInsights(repos1), [repos1]);
  const insights2 = useMemo(() => buildRepoInsights(repos2), [repos2]);

  const handleCompareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input1.trim() || !input2.trim()) return;
    setSearchParams({ u1: input1.trim(), u2: input2.trim() });
  };

  const handleApplyPreset = (u1: string, u2: string) => {
    setInput1(u1);
    setInput2(u2);
    setSearchParams({ u1, u2 });
  };

  const isComparing = !!(activeU1 && activeU2);
  const isLoading = (loadingUser1 || loadingRepos1 || loadingUser2 || loadingRepos2) && isComparing;

  const isRateLimitError =
    (errorUser1 as any)?.rateLimitExceeded ||
    (errorUser1 as any)?.status === 403 ||
    (errorUser2 as any)?.rateLimitExceeded ||
    (errorUser2 as any)?.status === 403;

  // Compare stats
  const metrics = useMemo(() => {
    if (!user1 || !user2) return null;

    const getWinner = (v1: number, v2: number) => {
      if (v1 > v2) return 1;
      if (v2 > v1) return 2;
      return 0; // tie
    };

    return [
      {
        label: 'Total Stars',
        icon: <Star size={18} className="metric-icon star" />,
        val1: insights1.totalStars,
        val2: insights2.totalStars,
        winner: getWinner(insights1.totalStars, insights2.totalStars)
      },
      {
        label: 'Total Forks',
        icon: <GitFork size={18} className="metric-icon fork" />,
        val1: insights1.totalForks,
        val2: insights2.totalForks,
        winner: getWinner(insights1.totalForks, insights2.totalForks)
      },
      {
        label: 'Public Repos',
        icon: <FolderGit2 size={18} className="metric-icon repo" />,
        val1: user1.public_repos,
        val2: user2.public_repos,
        winner: getWinner(user1.public_repos, user2.public_repos)
      },
      {
        label: 'Followers',
        icon: <Users size={18} className="metric-icon users" />,
        val1: user1.followers,
        val2: user2.followers,
        winner: getWinner(user1.followers, user2.followers)
      },
      {
        label: 'Language Diversity',
        icon: <Scale size={18} className="metric-icon scale" />,
        val1: insights1.diversity,
        val2: insights2.diversity,
        winner: getWinner(insights1.diversity, insights2.diversity)
      }
    ];
  }, [user1, user2, insights1, insights2]);

  return (
    <div className="compare-page">
      <section className="hero card compare-hero">
        <div className="compare-hero-badge">
          <Swords size={16} />
          <span>Developer Battle &amp; Analytics</span>
        </div>
        <h1>Compare GitHub Profiles</h1>
        <p>Analyze and benchmark any two developers head-to-head.</p>

        {/* Input Form */}
        <form onSubmit={handleCompareSubmit} className="compare-form">
          <div className="compare-inputs-row">
            <div className="compare-input-group">
              <label>Developer 1</label>
              <input
                type="text"
                value={input1}
                onChange={e => setInput1(e.target.value)}
                placeholder="e.g. torvalds"
                className="compare-input"
                required
              />
            </div>
            <div className="compare-vs-badge">VS</div>
            <div className="compare-input-group">
              <label>Developer 2</label>
              <input
                type="text"
                value={input2}
                onChange={e => setInput2(e.target.value)}
                placeholder="e.g. gaearon"
                className="compare-input"
                required
              />
            </div>
          </div>
          <button type="submit" className="primary btn-compare-submit">
            <span>Compare Now</span>
            <ArrowRight size={16} />
          </button>
        </form>

        {/* Presets */}
        <div className="presets-row">
          <span className="presets-label">Popular Battles:</span>
          {PRESETS.map(p => (
            <button
              key={p.label}
              type="button"
              className="preset-pill"
              onClick={() => handleApplyPreset(p.u1, p.u2)}
            >
              {p.label}
            </button>
          ))}
        </div>
      </section>

      {isLoading && (
        <section className="card compare-loading">
          <p>Fetching both developers and crunching metrics...</p>
        </section>
      )}

      {isRateLimitError && (
        <section className="card rate-limit-warning">
          <div className="warning-icon-col">
            <AlertTriangle size={24} className="warning-icon" />
          </div>
          <div className="warning-content">
            <h4>GitHub API Rate Limit Reached</h4>
            <p>
              GitHub&apos;s public API rate limit (60 requests per hour) has been reached. Please wait a short while before comparing again.
            </p>
          </div>
        </section>
      )}

      {(errorUser1 || errorUser2) && !isRateLimitError && (
        <section className="card error">
          <h3>Failed to load comparison</h3>
          <p>
            {((errorUser1 || errorUser2) as Error)?.message ||
              'One or both users could not be found.'}
          </p>
        </section>
      )}

      {!isLoading && user1 && user2 && metrics && (
        <section className="compare-results">
          {/* Header Cards */}
          <div className="compare-profiles-row">
            <ProfileCard user={user1} insights={insights1} />
            <div className="vs-divider">
              <Swords size={28} className="vs-icon" />
            </div>
            <ProfileCard user={user2} insights={insights2} />
          </div>

          {/* Metric Comparison Table */}
          <div className="card compare-metrics-card">
            <div className="compare-metrics-header">
              <h3>Head-to-Head Metrics</h3>
              <p className="hint-text">Winner in each dimension highlighted</p>
            </div>

            <div className="metrics-table">
              {metrics.map(m => (
                <div key={m.label} className="metric-row">
                  <div className={`metric-cell dev1 ${m.winner === 1 ? 'is-winner' : ''}`}>
                    <span className="metric-value">{formatNumber(m.val1)}</span>
                    {m.winner === 1 && <Trophy size={14} className="trophy-badge" />}
                  </div>

                  <div className="metric-cell label-cell">
                    {m.icon}
                    <span>{m.label}</span>
                  </div>

                  <div className={`metric-cell dev2 ${m.winner === 2 ? 'is-winner' : ''}`}>
                    <span className="metric-value">{formatNumber(m.val2)}</span>
                    {m.winner === 2 && <Trophy size={14} className="trophy-badge" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary Language Comparison */}
          <div className="grid-2 compare-details-grid">
            <div className="card compare-detail-card">
              <h4>{user1.name || user1.login}&apos;s Top Languages</h4>
              <ul className="compare-lang-list">
                {insights1.languages.slice(0, 5).map(l => (
                  <li key={l.label}>
                    <span>{l.label}</span>
                    <span className="lang-count">{l.value} repos</span>
                  </li>
                ))}
                {insights1.languages.length === 0 && <p className="hint-text">No languages recorded.</p>}
              </ul>
            </div>

            <div className="card compare-detail-card">
              <h4>{user2.name || user2.login}&apos;s Top Languages</h4>
              <ul className="compare-lang-list">
                {insights2.languages.slice(0, 5).map(l => (
                  <li key={l.label}>
                    <span>{l.label}</span>
                    <span className="lang-count">{l.value} repos</span>
                  </li>
                ))}
                {insights2.languages.length === 0 && <p className="hint-text">No languages recorded.</p>}
              </ul>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

const ProfileCard = ({ user, insights }: { user: GithubUser; insights: RepoInsights }) => (
  <div className="card compare-user-card">
    <div className="compare-user-header">
      <img src={user.avatar_url} alt={user.login} className="compare-avatar" />
      <div className="compare-user-titles">
        <h3>{user.name || user.login}</h3>
        <span className="compare-handle">@{user.login}</span>
        {user.bio && <p className="compare-bio">{user.bio}</p>}
      </div>
    </div>
    <div className="compare-user-footer">
      <span className="compare-member-date">
        <Calendar size={13} /> Joined {formatDateString(user.created_at)}
      </span>
      <Link to={`/user/${user.login}`} className="compare-full-link">
        Full Analysis <ExternalLink size={13} />
      </Link>
    </div>
  </div>
);

export default ComparePage;
