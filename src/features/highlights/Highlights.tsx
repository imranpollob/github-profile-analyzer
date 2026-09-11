import React from 'react';
import { Trophy, History, Zap, ExternalLink, Star, GitFork } from 'lucide-react';
import { GithubRepo } from '../../api/github';
import { RepoInsights } from '../../utils/githubStats';
import { formatDateString, formatDistance, formatNumber } from '../../utils/format';
import './highlights.css';

interface HighlightsProps {
  insights: Pick<RepoInsights, 'mostStarredRepo' | 'oldestRepo' | 'recentlyActiveRepo'>;
}

const Highlights: React.FC<HighlightsProps> = ({ insights }) => {
  const items = [
    {
      key: 'most-starred',
      title: 'Crown Jewel',
      subtitle: 'Most Starred Repository',
      icon: <Trophy size={18} className="highlight-icon trophy" />,
      repo: insights.mostStarredRepo,
      meta: (repo: GithubRepo) => (
        <span className="highlight-stat">
          <Star size={14} /> {formatNumber(repo.stargazers_count)} stars
        </span>
      ),
      footer: (repo: GithubRepo) => `Updated ${formatDistance(repo.pushed_at)}`
    },
    {
      key: 'oldest',
      title: 'First Venture',
      subtitle: 'Earliest Created Repo',
      icon: <History size={18} className="highlight-icon history" />,
      repo: insights.oldestRepo,
      meta: (repo: GithubRepo) => (
        <span className="highlight-stat">
          Created {formatDateString(repo.created_at)}
        </span>
      ),
      footer: (repo: GithubRepo) => `Last pushed ${formatDistance(repo.pushed_at)}`
    },
    {
      key: 'recent',
      title: 'Current Velocity',
      subtitle: 'Most Recently Active',
      icon: <Zap size={18} className="highlight-icon zap" />,
      repo: insights.recentlyActiveRepo,
      meta: (repo: GithubRepo) => (
        <span className="highlight-stat">
          Pushed {formatDistance(repo.pushed_at)}
        </span>
      ),
      footer: (repo: GithubRepo) => (
        <span className="highlight-stats-duo">
          <span><Star size={13} /> {formatNumber(repo.stargazers_count)}</span>
          <span><GitFork size={13} /> {formatNumber(repo.forks_count)}</span>
        </span>
      )
    }
  ];

  return (
    <section className="highlights card">
      <div className="highlights__header">
        <h3>Highlights &amp; Milestones</h3>
        <p className="hint-text">Key repository achievements at a glance</p>
      </div>

      <div className="highlights__grid">
        {items.map(item => (
          <article key={item.key} className="highlight-card">
            <header className="highlight-card__header">
              <div className="highlight-icon-wrapper">{item.icon}</div>
              <div className="highlight-badge-group">
                <span className="highlight-title">{item.title}</span>
                <span className="highlight-subtitle">{item.subtitle}</span>
              </div>
            </header>

            {item.repo ? (
              <div className="highlight-card__body">
                <h4 className="highlight-repo-name">
                  <a href={item.repo.html_url} target="_blank" rel="noreferrer">
                    <span>{item.repo.name}</span>
                    <ExternalLink size={14} />
                  </a>
                </h4>
                <p className="highlight-desc">
                  {item.repo.description || 'No repository description provided.'}
                </p>
                <div className="highlight-meta">{item.meta(item.repo)}</div>
                <div className="highlight-footer">{item.footer(item.repo)}</div>
              </div>
            ) : (
              <p className="hint-text empty-highlight">No repository data available.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
};

export default Highlights;
