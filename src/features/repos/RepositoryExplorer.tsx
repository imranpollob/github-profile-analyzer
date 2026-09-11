import { useMemo, useState } from 'react';
import {
  FolderGit2,
  Search,
  Star,
  GitFork,
  Clock,
  ExternalLink,
  Code,
  Tag,
  CircleAlert
} from 'lucide-react';
import { GithubRepo } from '../../api/github';
import { formatDistance, formatNumber } from '../../utils/format';
import './repos.css';

type SortKey = 'stars' | 'updated' | 'created' | 'forks' | 'issues';
type ForkFilter = 'all' | 'source' | 'fork';

interface RepositoryExplorerProps {
  repos: GithubRepo[];
}

const sortComparators: Record<SortKey, (a: GithubRepo, b: GithubRepo) => number> = {
  stars: (a, b) => b.stargazers_count - a.stargazers_count,
  updated: (a, b) => new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime(),
  created: (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
  forks: (a, b) => b.forks_count - a.forks_count,
  issues: (a, b) => b.open_issues_count - a.open_issues_count
};

const PAGE_SIZE = 12;

const RepositoryExplorer = ({ repos }: RepositoryExplorerProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('stars');
  const [languageFilter, setLanguageFilter] = useState<string>('all');
  const [forkFilter, setForkFilter] = useState<ForkFilter>('all');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(PAGE_SIZE);

  const languages = useMemo(() => {
    const set = new Set(repos.map(repo => repo.language).filter(Boolean) as string[]);
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [repos]);

  const allTopics = useMemo(() => {
    const topicMap = new Map<string, number>();
    repos.forEach(r => {
      r.topics?.forEach(t => {
        topicMap.set(t, (topicMap.get(t) ?? 0) + 1);
      });
    });
    return Array.from(topicMap.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([topic]) => topic);
  }, [repos]);

  const filteredRepos = useMemo(() => {
    return repos.filter(repo => {
      // Text search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = repo.name.toLowerCase().includes(q);
        const matchDesc = (repo.description ?? '').toLowerCase().includes(q);
        if (!matchName && !matchDesc) return false;
      }

      // Language filter
      if (languageFilter !== 'all' && repo.language !== languageFilter) {
        return false;
      }

      // Fork filter
      if (forkFilter === 'source' && repo.fork) return false;
      if (forkFilter === 'fork' && !repo.fork) return false;

      // Topic filter
      if (selectedTopic && (!repo.topics || !repo.topics.includes(selectedTopic))) {
        return false;
      }

      return true;
    }).sort(sortComparators[sortKey]);
  }, [repos, searchQuery, sortKey, languageFilter, forkFilter, selectedTopic]);

  const pagedRepos = useMemo(() => {
    return filteredRepos.slice(0, visibleCount);
  }, [filteredRepos, visibleCount]);

  const handleClearFilters = () => {
    setSearchQuery('');
    setLanguageFilter('all');
    setForkFilter('all');
    setSelectedTopic(null);
    setSortKey('stars');
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <section className="repos card">
      <div className="repos__header">
        <div className="repos__title-row">
          <FolderGit2 size={20} className="section-icon" />
          <div>
            <h3>Repository Explorer</h3>
            <p className="hint-text">
              Showing {filteredRepos.length} of {repos.length} repositories
            </p>
          </div>
        </div>

        <div className="repos__controls">
          <div className="repo-search-box">
            <Search size={15} className="repo-search-icon" />
            <input
              type="text"
              placeholder="Filter by name or keyword..."
              value={searchQuery}
              onChange={e => {
                setSearchQuery(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="repo-search-input"
            />
          </div>

          <label className="repo-select-label">
            <span>Sort</span>
            <select
              value={sortKey}
              onChange={e => setSortKey(e.target.value as SortKey)}
              className="repo-select"
            >
              <option value="stars">Most Stars</option>
              <option value="updated">Recently Updated</option>
              <option value="created">Newly Created</option>
              <option value="forks">Most Forks</option>
              <option value="issues">Open Issues</option>
            </select>
          </label>

          <label className="repo-select-label">
            <span>Language</span>
            <select
              value={languageFilter}
              onChange={e => {
                setLanguageFilter(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="repo-select"
            >
              <option value="all">All Languages</option>
              {languages.map(language => (
                <option key={language} value={language}>
                  {language}
                </option>
              ))}
            </select>
          </label>

          <label className="repo-select-label">
            <span>Type</span>
            <select
              value={forkFilter}
              onChange={e => {
                setForkFilter(e.target.value as ForkFilter);
                setVisibleCount(PAGE_SIZE);
              }}
              className="repo-select"
            >
              <option value="all">All Repos</option>
              <option value="source">Sources Only</option>
              <option value="fork">Forks Only</option>
            </select>
          </label>
        </div>
      </div>

      {allTopics.length > 0 && (
        <div className="topics-row">
          <span className="topics-label"><Tag size={13} /> Popular Topics:</span>
          {allTopics.map(t => (
            <button
              key={t}
              type="button"
              className={`topic-pill ${selectedTopic === t ? 'active' : ''}`}
              onClick={() => {
                setSelectedTopic(selectedTopic === t ? null : t);
                setVisibleCount(PAGE_SIZE);
              }}
            >
              #{t}
            </button>
          ))}
          {selectedTopic && (
            <button
              type="button"
              className="topic-pill clear"
              onClick={() => setSelectedTopic(null)}
            >
              Clear Topic
            </button>
          )}
        </div>
      )}

      <div className="repos__list">
        {pagedRepos.map(repo => (
          <article key={repo.id} className="repo-card">
            <header className="repo-card__header">
              <div className="repo-title-row">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="repo-title"
                >
                  <span>{repo.name}</span>
                  <ExternalLink size={14} className="repo-ext-icon" />
                </a>
                {repo.fork && <span className="badge fork-badge">Fork</span>}
              </div>
              <p className="repo-description">
                {repo.description || 'No description provided.'}
              </p>
            </header>

            {repo.topics && repo.topics.length > 0 && (
              <div className="repo-tags">
                {repo.topics.slice(0, 4).map(topic => (
                  <span key={topic} className="repo-tag">
                    #{topic}
                  </span>
                ))}
              </div>
            )}

            <footer className="repo-card__footer">
              <ul className="repo-meta-list">
                <li title="Stars">
                  <Star size={14} className="meta-icon star-icon" />
                  <span>{formatNumber(repo.stargazers_count)}</span>
                </li>
                <li title="Forks">
                  <GitFork size={14} className="meta-icon fork-icon" />
                  <span>{formatNumber(repo.forks_count)}</span>
                </li>
                {repo.open_issues_count > 0 && (
                  <li title="Open Issues">
                    <CircleAlert size={14} className="meta-icon issue-icon" />
                    <span>{formatNumber(repo.open_issues_count)}</span>
                  </li>
                )}
                {repo.language && (
                  <li title="Primary Language">
                    <Code size={14} className="meta-icon" />
                    <span>{repo.language}</span>
                  </li>
                )}
                <li className="repo-updated" title="Last Push Date">
                  <Clock size={13} className="meta-icon" />
                  <span>{formatDistance(repo.pushed_at)}</span>
                </li>
              </ul>
            </footer>
          </article>
        ))}

        {filteredRepos.length === 0 && (
          <div className="empty-repos">
            <p>No repositories match your active filters.</p>
            <button
              type="button"
              className="ghost btn-clear-filters"
              onClick={handleClearFilters}
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {filteredRepos.length > visibleCount && (
        <div className="repos__load-more">
          <button
            type="button"
            className="outline btn-load-more"
            onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
          >
            Show {Math.min(PAGE_SIZE, filteredRepos.length - visibleCount)} More ({filteredRepos.length - visibleCount} remaining)
          </button>
        </div>
      )}
    </section>
  );
};

export default RepositoryExplorer;
