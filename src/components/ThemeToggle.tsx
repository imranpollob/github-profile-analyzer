import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './theme-toggle.css';

export const ThemeToggle: React.FC = () => {
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <span className="theme-toggle-icon">
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </span>
      <span className="theme-toggle-text">{isDark ? 'Light' : 'Dark'}</span>
    </button>
  );
};

export default ThemeToggle;

