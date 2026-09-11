import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Building,
  Calendar,
  Link as LinkIcon,
  ExternalLink,
  Scale,
  Share2,
  Users,
  FolderGit2,
  Star,
  GitFork
} from 'lucide-react';
import { TwitterIcon } from '../../components/icons';
import { GithubUser } from '../../api/github';
import { RepoInsights } from '../../utils/githubStats';
import { formatDateString, formatNumber } from '../../utils/format';
import { useToast } from '../../context/ToastContext';
import './profile.css';

interface ProfileOverviewProps {
  user: GithubUser;
  insights: Pick<RepoInsights, 'totalStars' | 'totalForks'>;
  onOpenDevCard?: () => void;
}

const ProfileOverview: React.FC<ProfileOverviewProps> = ({
  user,
  insights,
  onOpenDevCard
}) => {
  const { showToast } = useToast();

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${user.name || user.login} on GitLens`,
          text: `Check out ${user.login}'s GitHub profile analysis on GitLens`,
          url
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      showToast('Profile link copied to clipboard!', 'success');
    } catch {
      showToast('Could not copy link.', 'error');
    }
  };

  return (
    <section className="profile card">
      <div className="profile__header">
        <div className="profile__avatar-container">
          <img className="profile__avatar" src={user.avatar_url} alt={user.login} />
          <div className="avatar-ring" />
        </div>

        <div className="profile__meta">
          <div className="profile__name-row">
            <div>
              <h2 className="profile__fullname">{user.name ?? user.login}</h2>
              <p className="profile__username">@{user.login}</p>
            </div>
            <div className="profile__action-pills">
              <button
                type="button"
                className="btn-ghost action-pill"
                onClick={handleShare}
                title="Share Profile"
              >
                <Share2 size={15} />
                <span>Share</span>
              </button>
              <Link
                to={`/compare?u1=${encodeURIComponent(user.login)}`}
                className="btn-ghost action-pill"
                title="Compare with another developer"
              >
                <Scale size={15} />
                <span>Compare</span>
              </Link>
              {onOpenDevCard && (
                <button
                  type="button"
                  className="btn-ghost action-pill highlight"
                  onClick={onOpenDevCard}
                  title="Generate Developer Card & Badge"
                >
                  <span>Dev Card</span>
                </button>
              )}
            </div>
          </div>

          {user.bio && <p className="profile__bio">{user.bio}</p>}

          <div className="profile__details">
            {user.company && (
              <div className="detail-item">
                <Building size={15} className="detail-icon" />
                <span>{user.company}</span>
              </div>
            )}
            {user.location && (
              <div className="detail-item">
                <MapPin size={15} className="detail-icon" />
                <span>{user.location}</span>
              </div>
            )}
            <div className="detail-item">
              <Calendar size={15} className="detail-icon" />
              <span>Joined {formatDateString(user.created_at)}</span>
            </div>
            {user.blog && (
              <div className="detail-item">
                <LinkIcon size={15} className="detail-icon" />
                <a
                  href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {user.blog.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}
            {user.twitter_username && (
              <div className="detail-item">
                <TwitterIcon size={15} className="detail-icon" />
                <a
                  href={`https://twitter.com/${user.twitter_username}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  @{user.twitter_username}
                </a>
              </div>
            )}
            <div className="detail-item">
              <ExternalLink size={15} className="detail-icon" />
              <a href={user.html_url} target="_blank" rel="noreferrer">
                github.com/{user.login}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="profile__stats-grid">
        <div className="stat-card">
          <div className="stat-card-icon followers">
            <Users size={20} />
          </div>
          <div>
            <div className="stat-value">{formatNumber(user.followers)}</div>
            <div className="stat-label">Followers</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon following">
            <Users size={20} />
          </div>
          <div>
            <div className="stat-value">{formatNumber(user.following)}</div>
            <div className="stat-label">Following</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon repos">
            <FolderGit2 size={20} />
          </div>
          <div>
            <div className="stat-value">{formatNumber(user.public_repos)}</div>
            <div className="stat-label">Public Repos</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon stars">
            <Star size={20} />
          </div>
          <div>
            <div className="stat-value">{formatNumber(insights.totalStars)}</div>
            <div className="stat-label">Total Stars</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-icon forks">
            <GitFork size={20} />
          </div>
          <div>
            <div className="stat-value">{formatNumber(insights.totalForks)}</div>
            <div className="stat-label">Total Forks</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileOverview;
