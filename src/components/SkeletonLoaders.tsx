import React from 'react';
import './skeleton.css';

export const Shimmer: React.FC<{ className?: string; style?: React.CSSProperties }> = ({
  className = '',
  style
}) => <div className={`skeleton-shimmer ${className}`} style={style} />;

export const ProfileSkeleton: React.FC = () => {
  return (
    <div className="card skeleton-card">
      <div className="skeleton-profile-header">
        <Shimmer className="skeleton-avatar" />
        <div className="skeleton-profile-text">
          <Shimmer style={{ width: '220px', height: '28px' }} />
          <Shimmer style={{ width: '130px', height: '18px' }} />
          <Shimmer style={{ width: '80%', height: '16px', marginTop: '8px' }} />
          <div className="skeleton-row" style={{ marginTop: '12px' }}>
            <Shimmer style={{ width: '100px', height: '24px' }} />
            <Shimmer style={{ width: '100px', height: '24px' }} />
          </div>
        </div>
      </div>
      <div className="skeleton-stats-grid">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="skeleton-stat-box">
            <Shimmer style={{ width: '60px', height: '28px', margin: '0 auto' }} />
            <Shimmer style={{ width: '80px', height: '14px', margin: '6px auto 0' }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export const InsightsSkeleton: React.FC = () => {
  return (
    <div className="insights-grid">
      <div className="card skeleton-card" style={{ minHeight: '260px' }}>
        <Shimmer style={{ width: '160px', height: '22px', marginBottom: '16px' }} />
        <div className="skeleton-circle-row">
          <Shimmer className="skeleton-circle" />
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Shimmer style={{ width: '90%', height: '16px' }} />
            <Shimmer style={{ width: '80%', height: '16px' }} />
            <Shimmer style={{ width: '70%', height: '16px' }} />
          </div>
        </div>
      </div>
      <div className="card skeleton-card" style={{ minHeight: '260px' }}>
        <Shimmer style={{ width: '140px', height: '22px', marginBottom: '16px' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <Shimmer style={{ width: '100%', height: '55px' }} />
          <Shimmer style={{ width: '100%', height: '55px' }} />
          <Shimmer style={{ width: '100%', height: '55px' }} />
        </div>
      </div>
    </div>
  );
};

export const ReposSkeleton: React.FC = () => {
  return (
    <div className="card skeleton-card">
      <div className="skeleton-row" style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <Shimmer style={{ width: '180px', height: '24px' }} />
        <Shimmer style={{ width: '220px', height: '36px' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="skeleton-repo-card">
            <Shimmer style={{ width: '200px', height: '20px' }} />
            <Shimmer style={{ width: '85%', height: '16px', marginTop: '6px' }} />
            <div className="skeleton-row" style={{ marginTop: '12px' }}>
              <Shimmer style={{ width: '60px', height: '16px' }} />
              <Shimmer style={{ width: '60px', height: '16px' }} />
              <Shimmer style={{ width: '80px', height: '16px' }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

