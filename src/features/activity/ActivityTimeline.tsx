import React from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  GitCommit,
  GitPullRequest,
  CircleDot,
  Star,
  GitFork,
  Tag,
  Activity,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { fetchUserEvents, GithubEvent } from '../../api/github';
import { formatDistance } from '../../utils/format';
import './activity.css';

interface ActivityTimelineProps {
  username: string;
}

function getEventDetails(event: GithubEvent) {
  switch (event.type) {
    case 'PushEvent': {
      const count = event.payload.commits?.length ?? 1;
      const branch = (event.payload.ref ?? '').replace('refs/heads/', '');
      const firstMsg = event.payload.commits?.[0]?.message;
      return {
        icon: <GitCommit size={16} className="event-icon push" />,
        action: `Pushed ${count} ${count === 1 ? 'commit' : 'commits'} to`,
        target: branch ? `${event.repo.name} (${branch})` : event.repo.name,
        snippet: firstMsg
      };
    }
    case 'PullRequestEvent': {
      const action = event.payload.action ?? 'opened';
      const pr = event.payload.pull_request;
      return {
        icon: <GitPullRequest size={16} className="event-icon pr" />,
        action: `${action.charAt(0).toUpperCase() + action.slice(1)} pull request in`,
        target: event.repo.name,
        snippet: pr?.title
      };
    }
    case 'IssuesEvent': {
      const action = event.payload.action ?? 'opened';
      const issue = event.payload.issue;
      return {
        icon: <CircleDot size={16} className="event-icon issue" />,
        action: `${action.charAt(0).toUpperCase() + action.slice(1)} issue in`,
        target: event.repo.name,
        snippet: issue?.title
      };
    }
    case 'WatchEvent':
      return {
        icon: <Star size={16} className="event-icon star" />,
        action: 'Starred repository',
        target: event.repo.name
      };
    case 'ForkEvent':
      return {
        icon: <GitFork size={16} className="event-icon fork" />,
        action: 'Forked repository',
        target: event.repo.name
      };
    case 'CreateEvent':
      return {
        icon: <Sparkles size={16} className="event-icon create" />,
        action: `Created ${event.payload.ref_type ?? 'resource'} in`,
        target: event.repo.name
      };
    case 'ReleaseEvent':
      return {
        icon: <Tag size={16} className="event-icon release" />,
        action: 'Published a new release for',
        target: event.repo.name
      };
    default:
      return {
        icon: <Activity size={16} className="event-icon default" />,
        action: 'Contributed to',
        target: event.repo.name
      };
  }
}

export const ActivityTimeline: React.FC<ActivityTimelineProps> = ({ username }) => {
  const { data: events = [], isLoading, isError, error } = useQuery({
    queryKey: ['github-events', username],
    queryFn: () => fetchUserEvents(username),
    staleTime: 1000 * 60 * 3
  });

  if (isLoading) {
    return (
      <section className="activity-timeline card">
        <div className="activity-header">
          <Activity size={20} className="section-icon" />
          <div>
            <h3>Public Activity Feed</h3>
            <p className="hint-text">Loading recent events...</p>
          </div>
        </div>
        <div className="timeline-loading">
          <div className="skeleton-line" />
          <div className="skeleton-line" />
          <div className="skeleton-line" />
        </div>
      </section>
    );
  }

  if (isError) {
    return (
      <section className="activity-timeline card">
        <div className="activity-header">
          <Activity size={20} className="section-icon" />
          <h3>Public Activity Feed</h3>
        </div>
        <p className="hint error">{(error as Error)?.message ?? 'Could not load public activity.'}</p>
      </section>
    );
  }

  return (
    <section className="activity-timeline card">
      <div className="activity-header">
        <div className="title-row">
          <Activity size={20} className="section-icon" />
          <div>
            <h3>Recent Public Contributions</h3>
            <p className="hint-text">Latest public activity &amp; event timeline</p>
          </div>
        </div>
      </div>

      {events.length > 0 ? (
        <div className="timeline-list">
          {events.slice(0, 15).map(event => {
            const details = getEventDetails(event);
            const repoUrl = `https://github.com/${event.repo.name}`;

            return (
              <div key={event.id} className="timeline-item">
                <div className="timeline-bullet">
                  <div className="bullet-icon">{details.icon}</div>
                  <div className="bullet-line" />
                </div>

                <div className="timeline-body">
                  <div className="timeline-meta-row">
                    <span className="timeline-action">{details.action}</span>
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="timeline-repo-link"
                    >
                      {details.target}
                      <ExternalLink size={12} />
                    </a>
                    <span className="timeline-time">
                      {formatDistance(event.created_at)}
                    </span>
                  </div>

                  {details.snippet && (
                    <p className="timeline-snippet">{details.snippet}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-timeline">
          <p className="hint-text">No recent public activity recorded for this user.</p>
        </div>
      )}
    </section>
  );
};

export default ActivityTimeline;

