import { useMemo, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Compass,
  FolderGit2,
  Activity,
  AlertTriangle,
  Key
} from 'lucide-react';
import SearchForm, { saveRecentSearch } from '../features/search/SearchForm';
import useGithubUserProfile from '../features/profile/useGithubUserProfile';
import useGithubUserRepos from '../features/repos/useGithubUserRepos';
import ProfileOverview from '../features/profile/ProfileOverview';
import LanguageSnapshot from '../features/languages/LanguageSnapshot';
import Highlights from '../features/highlights/Highlights';
import RepositoryExplorer from '../features/repos/RepositoryExplorer';
import ActivityTimeline from '../features/activity/ActivityTimeline';
import DevCardExport from '../features/share/DevCardExport';
import {
  ProfileSkeleton,
  InsightsSkeleton,
  ReposSkeleton
} from '../components/SkeletonLoaders';
import { buildRepoInsights } from '../utils/githubStats';
import { useSeo } from '../hooks/useSeo';
import './user.css';

type ActiveTab = 'overview' | 'repos' | 'activity';

const UserPage = () => {
  const { username = '' } = useParams<{ username: string }>();
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isDevCardOpen, setIsDevCardOpen] = useState(false);

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError
  } = useGithubUserProfile(username);

  const {
    data: repos = [],
    isLoading: isReposLoading,
    isError: isReposError,
    error: reposError
  } = useGithubUserRepos(username);

  const insights = useMemo(() => buildRepoInsights(repos), [repos]);

  // Dynamic SEO
  useSeo({
    title: user ? `${user.name || user.login} (@${user.login})` : `@${username} Profile`,
    description: user?.bio || `GitHub statistics, repositories, and languages for @${username} on GitLens.`,
    image: user?.avatar_url
  });

  // Save to recently searched
  useEffect(() => {
    if (username) {
      saveRecentSearch(username);
    }
  }, [username]);

  const isRateLimitError =
    (userError as any)?.rateLimitExceeded ||
    (userError as any)?.status === 403 ||
    (reposError as any)?.status === 403;

  return (
    <div className="user-page">
      <section className="search-section">
        <SearchForm variant="compact" initialValue={username} />
      </section>

      {/* Rate limit warning banner */}
      {isRateLimitError && (
        <section className="card rate-limit-warning">
          <div className="warning-icon-col">
            <AlertTriangle size={24} className="warning-icon" />
          </div>
          <div className="warning-content">
            <h4>GitHub API Rate Limit Reached</h4>
            <p>
              GitHub unauthenticated requests are capped at 60 per hour. Click the rate limit badge in the top navigation or add a free Personal Access Token to enjoy 5,000 requests per hour.
              GitHub&apos;s public API rate limit (60 requests per hour) has been reached. Please wait a short while before searching again.
            </p>
          </div>
        </section>
      )}

      {/* Initial User Loading Skeleton */}
      {isUserLoading && !user && <ProfileSkeleton />}

      {/* User Load Error */}
      {isUserError && !isRateLimitError && (
        <section className="card error">
          <h3>Could not load user &quot;{username}&quot;</h3>
          <p>{(userError as Error)?.message ?? 'User not found or GitHub API error.'}</p>
        </section>
      )}

      {/* Loaded Profile Content */}
      {user && (
        <>
          <ProfileOverview
            user={user}
            insights={insights}
            onOpenDevCard={() => setIsDevCardOpen(true)}
          />

          {/* Navigation Tabs */}
          <div className="user-tabs-nav">
            <button
              type="button"
              className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
              onClick={() => setActiveTab('overview')}
            >
              <Compass size={16} />
              <span>Overview &amp; Tech Stack</span>
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'repos' ? 'active' : ''}`}
              onClick={() => setActiveTab('repos')}
            >
              <FolderGit2 size={16} />
              <span>Repositories ({repos.length})</span>
            </button>
            <button
              type="button"
              className={`tab-btn ${activeTab === 'activity' ? 'active' : ''}`}
              onClick={() => setActiveTab('activity')}
            >
              <Activity size={16} />
              <span>Activity Stream</span>
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="tab-content-pane">
              {isReposLoading ? (
                <InsightsSkeleton />
              ) : (
                <div className="insights-grid">
                  <LanguageSnapshot insights={insights} />
                  <Highlights insights={insights} />
                </div>
              )}
            </div>
          )}

          {/* Tab 2: All Repositories */}
          {activeTab === 'repos' && (
            <div className="tab-content-pane">
              {isReposLoading && <ReposSkeleton />}
              {isReposError && (
                <section className="card error">
                  <h3>Repositories could not be loaded</h3>
                  <p>{(reposError as Error)?.message ?? 'Unknown error'}</p>
                </section>
              )}
              {!isReposLoading && !isReposError && (
                <RepositoryExplorer repos={repos} />
              )}
            </div>
          )}

          {/* Tab 3: Public Activity */}
          {activeTab === 'activity' && (
            <div className="tab-content-pane">
              <ActivityTimeline username={user.login} />
            </div>
          )}

          {/* Dev Card Modal */}
          {isDevCardOpen && (
            <DevCardExport
              user={user}
              insights={insights}
              onClose={() => setIsDevCardOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
};

export default UserPage;
