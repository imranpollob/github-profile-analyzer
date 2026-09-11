import React, { useMemo } from 'react';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';
import { Code2, Layers } from 'lucide-react';
import { RepoInsights } from '../../utils/githubStats';
import './languages.css';

// Harmonious brand color palette
const BRAND_COLORS = [
  '#0d9488', // Teal
  '#06b6d4', // Cyan
  '#10b981', // Emerald
  '#0284c7', // Sky
  '#8b5cf6', // Purple
  '#f59e0b', // Amber
  '#ec4899', // Pink
  '#6366f1', // Indigo
  '#14b8a6', // Light Teal
  '#64748b'  // Slate
];

interface LanguageSnapshotProps {
  insights: Pick<RepoInsights, 'languages' | 'primaryLanguage' | 'diversity'>;
}

const LanguageSnapshot: React.FC<LanguageSnapshotProps> = ({ insights }) => {
  const hasLanguages = insights.languages.length > 0;

  const totalRepoCount = useMemo(() => {
    return insights.languages.reduce((acc, curr) => acc + curr.value, 0);
  }, [insights.languages]);

  const languagesWithPercent = useMemo(() => {
    return insights.languages.map(lang => ({
      ...lang,
      percent: totalRepoCount > 0 ? ((lang.value / totalRepoCount) * 100).toFixed(1) : '0'
    }));
  }, [insights.languages, totalRepoCount]);

  return (
    <section className="languages card">
      <div className="languages__header">
        <div className="title-row">
          <Code2 size={20} className="section-icon" />
          <div>
            <h3>Language Snapshot</h3>
            <p className="hint-text">Primary languages across public repositories</p>
          </div>
        </div>
      </div>

      {hasLanguages ? (
        <div className="languages__content">
          <div className="chart-wrapper">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie
                  dataKey="value"
                  data={insights.languages}
                  innerRadius={65}
                  outerRadius={95}
                  paddingAngle={3}
                  animationDuration={800}
                >
                  {insights.languages.map((entry, index) => (
                    <Cell
                      key={entry.label}
                      fill={BRAND_COLORS[index % BRAND_COLORS.length]}
                      stroke="var(--card-bg)"
                      strokeWidth={2}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [
                    `${value} ${value === 1 ? 'repo' : 'repos'} (${((value / totalRepoCount) * 100).toFixed(1)}%)`,
                    name
                  ]}
                  contentStyle={{
                    backgroundColor: 'var(--card-bg)',
                    borderColor: 'var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text)',
                    boxShadow: 'var(--shadow-lg)'
                  }}
                  itemStyle={{
                    color: 'var(--color-text)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="languages__legend">
            <div className="summary-row">
              <div className="summary-pill">
                <span className="summary__label">Primary Stack</span>
                <span className="summary__value">{insights.primaryLanguage ?? '—'}</span>
              </div>
              <div className="summary-pill">
                <span className="summary__label">Diversity</span>
                <span className="summary__value">
                  {insights.diversity} {insights.diversity === 1 ? 'Language' : 'Languages'}
                </span>
              </div>
            </div>

            <ul className="language-list">
              {languagesWithPercent.map((language, index) => (
                <li key={language.label} className="language-item">
                  <span
                    className="color-dot"
                    style={{ backgroundColor: BRAND_COLORS[index % BRAND_COLORS.length] }}
                  />
                  <span className="language-name">{language.label}</span>
                  <span className="language-percent">{language.percent}%</span>
                  <span className="language-count">
                    {language.value} {language.value === 1 ? 'repo' : 'repos'}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div className="empty-languages">
          <Layers size={32} className="empty-icon" />
          <p className="hint-text">No primary language data available.</p>
        </div>
      )}
    </section>
  );
};

export default LanguageSnapshot;
