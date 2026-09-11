import React, { useRef } from 'react';
import {
  Copy,
  Download,
  Share2,
  X,
  Check,
  Code,
  Sparkles,
  Star,
  GitFork,
  Users,
  FolderGit2
} from 'lucide-react';
import { GithubUser } from '../../api/github';
import { RepoInsights } from '../../utils/githubStats';
import { formatNumber } from '../../utils/format';
import { useToast } from '../../context/ToastContext';
import './devcard.css';

interface DevCardExportProps {
  user: GithubUser;
  insights: RepoInsights;
  onClose: () => void;
}

export const DevCardExport: React.FC<DevCardExportProps> = ({
  user,
  insights,
  onClose
}) => {
  const { showToast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);

  const topLanguages = insights.languages.slice(0, 3).map(l => l.label).join(' • ') || 'Various';
  const profileUrl = window.location.href;

  const markdownBadge = `[![GitLens Developer Profile](https://img.shields.io/badge/GitLens-${encodeURIComponent(user.login)}-0d9488?style=for-the-badge&logo=github)](${profileUrl})`;

  const markdownSummary = `### 🌟 GitHub Developer Intelligence: [${user.name || user.login}](https://github.com/${user.login})
- 🚀 **Repositories:** ${user.public_repos}
- ⭐ **Total Stars:** ${insights.totalStars.toLocaleString()}
- 🍴 **Total Forks:** ${insights.totalForks.toLocaleString()}
- 👥 **Followers:** ${user.followers.toLocaleString()}
- 💻 **Top Languages:** ${topLanguages}
*Generated with [GitLens by Imran Pollob](${profileUrl})*`;

  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast(`${label} copied to clipboard!`, 'success');
    } catch {
      showToast('Failed to copy to clipboard.', 'error');
    }
  };

  const downloadSvgCard = () => {
    const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" width="600" height="340" viewBox="0 0 600 340">
  <defs>
    <linearGradient id="cardGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#042f2e" />
      <stop offset="50%" stop-color="#0f766e" />
      <stop offset="100%" stop-color="#0d9488" />
    </linearGradient>
    <filter id="shadow" x="-5%" y="-5%" width="110%" height="110%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000" flood-opacity="0.3"/>
    </filter>
  </defs>

  <rect width="560" height="300" x="20" y="20" rx="16" fill="url(#cardGrad)" filter="url(#shadow)" stroke="#2dd4bf" stroke-width="1.5" />

  <!-- Monogram Logo Watermark -->
  <g transform="translate(500, 45)" opacity="0.3">
    <circle cx="20" cy="20" r="18" fill="none" stroke="#ffffff" stroke-width="2" />
    <text x="20" y="26" font-family="Outfit, sans-serif" font-size="16" font-weight="bold" fill="#ffffff" text-anchor="middle">iP</text>
  </g>

  <!-- User Info -->
  <text x="50" y="75" font-family="Outfit, sans-serif" font-size="28" font-weight="bold" fill="#ffffff">${escapeXml(user.name || user.login)}</text>
  <text x="50" y="105" font-family="JetBrains Mono, monospace" font-size="16" fill="#99f6e4">@${escapeXml(user.login)}</text>

  <!-- Bio snippet -->
  <text x="50" y="140" font-family="system-ui, sans-serif" font-size="14" fill="#ecfdfb" opacity="0.85">
    ${escapeXml((user.bio || 'GitHub Developer & Open Source Contributor').slice(0, 60))}
  </text>

  <!-- Stats Grid -->
  <g transform="translate(50, 180)">
    <rect width="105" height="65" rx="8" fill="#042f2e" fill-opacity="0.4" stroke="#14b8a6" stroke-width="1" />
    <text x="52" y="32" font-family="JetBrains Mono, monospace" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">${formatNumber(insights.totalStars)}</text>
    <text x="52" y="52" font-family="system-ui, sans-serif" font-size="11" fill="#99f6e4" text-anchor="middle">TOTAL STARS</text>

    <g transform="translate(125, 0)">
      <rect width="105" height="65" rx="8" fill="#042f2e" fill-opacity="0.4" stroke="#14b8a6" stroke-width="1" />
      <text x="52" y="32" font-family="JetBrains Mono, monospace" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">${formatNumber(insights.totalForks)}</text>
      <text x="52" y="52" font-family="system-ui, sans-serif" font-size="11" fill="#99f6e4" text-anchor="middle">TOTAL FORKS</text>
    </g>

    <g transform="translate(250, 0)">
      <rect width="105" height="65" rx="8" fill="#042f2e" fill-opacity="0.4" stroke="#14b8a6" stroke-width="1" />
      <text x="52" y="32" font-family="JetBrains Mono, monospace" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">${formatNumber(user.public_repos)}</text>
      <text x="52" y="52" font-family="system-ui, sans-serif" font-size="11" fill="#99f6e4" text-anchor="middle">REPOSITORIES</text>
    </g>

    <g transform="translate(375, 0)">
      <rect width="105" height="65" rx="8" fill="#042f2e" fill-opacity="0.4" stroke="#14b8a6" stroke-width="1" />
      <text x="52" y="32" font-family="JetBrains Mono, monospace" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">${formatNumber(user.followers)}</text>
      <text x="52" y="52" font-family="system-ui, sans-serif" font-size="11" fill="#99f6e4" text-anchor="middle">FOLLOWERS</text>
    </g>
  </g>

  <!-- Footer Watermark -->
  <text x="50" y="295" font-family="system-ui, sans-serif" font-size="12" fill="#99f6e4" opacity="0.8">Verified via GitLens • Crafted by Imran Pollob</text>
  <text x="530" y="295" font-family="JetBrains Mono, monospace" font-size="11" fill="#99f6e4" text-anchor="end">${topLanguages}</text>
</svg>
    `.trim();

    const blob = new Blob([svgContent], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${user.login}-gitlens-devcard.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('Dev Card SVG downloaded!', 'success');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-card devcard-modal"
        onClick={e => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="modal-header">
          <div className="modal-title-row">
            <div className="modal-icon-badge">
              <Sparkles size={18} />
            </div>
            <h3>Developer Snapshot &amp; Badges</h3>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="modal-body devcard-body">
          {/* Card Preview */}
          <div ref={cardRef} className="devcard-preview">
            <div className="devcard-watermark">
              <span className="devcard-watermark-text">GitLens</span>
            </div>

            <div className="devcard-user-info">
              <img
                src={user.avatar_url}
                alt={user.login}
                className="devcard-avatar"
              />
              <div>
                <h4 className="devcard-name">{user.name || user.login}</h4>
                <p className="devcard-handle">@{user.login}</p>
                {user.bio && <p className="devcard-bio">{user.bio}</p>}
              </div>
            </div>

            <div className="devcard-stats">
              <div className="devcard-stat">
                <span className="devcard-stat-val">
                  <Star size={14} className="devcard-icon star" />
                  {formatNumber(insights.totalStars)}
                </span>
                <span className="devcard-stat-lbl">Stars</span>
              </div>
              <div className="devcard-stat">
                <span className="devcard-stat-val">
                  <GitFork size={14} className="devcard-icon fork" />
                  {formatNumber(insights.totalForks)}
                </span>
                <span className="devcard-stat-lbl">Forks</span>
              </div>
              <div className="devcard-stat">
                <span className="devcard-stat-val">
                  <FolderGit2 size={14} className="devcard-icon repo" />
                  {formatNumber(user.public_repos)}
                </span>
                <span className="devcard-stat-lbl">Repos</span>
              </div>
              <div className="devcard-stat">
                <span className="devcard-stat-val">
                  <Users size={14} className="devcard-icon users" />
                  {formatNumber(user.followers)}
                </span>
                <span className="devcard-stat-lbl">Followers</span>
              </div>
            </div>

            <div className="devcard-footer">
              <span>Stack: <strong>{topLanguages}</strong></span>
              <span className="devcard-credit">by Imran Pollob</span>
            </div>
          </div>

          {/* Quick Copy & Export Actions */}
          <div className="devcard-export-options">
            <div className="export-action-card">
              <div className="export-text">
                <span className="export-title">Shields.io README Badge</span>
                <span className="export-desc">
                  Embed this interactive badge directly in your GitHub profile README.
                </span>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => copyToClipboard(markdownBadge, 'README Badge Markdown')}
              >
                <Code size={15} /> Copy Badge Markdown
              </button>
            </div>

            <div className="export-action-card">
              <div className="export-text">
                <span className="export-title">Profile Summary Table</span>
                <span className="export-desc">
                  Formatted Markdown stats snapshot for documentation or portfolios.
                </span>
              </div>
              <button
                type="button"
                className="btn-ghost"
                onClick={() => copyToClipboard(markdownSummary, 'Summary Markdown')}
              >
                <Copy size={15} /> Copy Summary Markdown
              </button>
            </div>

            <div className="export-action-card">
              <div className="export-text">
                <span className="export-title">Vector Image Export</span>
                <span className="export-desc">
                  Download high-res SVG card ready to share on LinkedIn or Twitter.
                </span>
              </div>
              <button
                type="button"
                className="primary"
                onClick={downloadSvgCard}
              >
                <Download size={15} /> Download SVG Card
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, c => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}

export default DevCardExport;

