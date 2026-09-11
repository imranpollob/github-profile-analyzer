import { FormEvent, useMemo, useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Loader2 } from 'lucide-react';
import clsx from 'clsx';
import { useDebounce } from '../../hooks/useDebounce';
import useGithubUserSearch from './useGithubUserSearch';
import './search.css';

interface SearchFormProps {
  variant?: 'hero' | 'compact';
  initialValue?: string;
  onSearch?: (username: string) => void;
}

export const RECENT_SEARCHES_KEY = 'gitlens_recent_searches';

export function saveRecentSearch(username: string) {
  try {
    const raw = localStorage.getItem(RECENT_SEARCHES_KEY);
    const list: string[] = raw ? JSON.parse(raw) : [];
    const filtered = list.filter(u => u.toLowerCase() !== username.toLowerCase());
    filtered.unshift(username);
    localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(filtered.slice(0, 8)));
  } catch {
    // ignore storage errors
  }
}

const SearchForm = ({ variant = 'hero', initialValue = '', onSearch }: SearchFormProps) => {
  const [term, setTerm] = useState(initialValue);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setTerm(initialValue);
  }, [initialValue]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const debounced = useDebounce(term);
  const enableSuggestions = isOpen && debounced.trim().length >= 2;

  const { data: suggestions = [], isFetching, isError } = useGithubUserSearch(
    debounced,
    enableSuggestions
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = term.trim();
    if (!value) return;
    setIsOpen(false);
    saveRecentSearch(value);
    if (onSearch) {
      onSearch(value);
    } else {
      navigate(`/user/${value}`);
    }
  };

  const handleSelectUser = (username: string) => {
    setTerm(username);
    setIsOpen(false);
    saveRecentSearch(username);
    if (onSearch) {
      onSearch(username);
    } else {
      navigate(`/user/${username}`);
    }
  };

  const suggestionList = useMemo(() => suggestions.slice(0, 5), [suggestions]);

  return (
    <div ref={containerRef} className={clsx('search-form', variant)}>
      <form className="search-form__form" onSubmit={handleSubmit}>
        <div className="search-input-wrapper">
          <Search size={18} className="search-input-icon" />
          <input
            aria-label="Search GitHub users"
            className="search-form__input"
            placeholder="Search any GitHub username (e.g. torvalds, gaearon)..."
            value={term}
            onChange={event => {
              setTerm(event.target.value);
              setIsOpen(true);
            }}
            onFocus={() => {
              if (term.trim().length >= 2) {
                setIsOpen(true);
              }
            }}
            onKeyDown={e => {
              if (e.key === 'Escape') {
                setIsOpen(false);
              }
            }}
          />
          {isFetching && <Loader2 size={16} className="search-loading-icon spin" />}
        </div>
        <button className="primary search-submit-btn" type="submit">
          <span>Explore</span>
          <ArrowRight size={16} />
        </button>
      </form>

      {isOpen && debounced.trim().length >= 2 && (
        <div className="search-suggestions">
          {isError && <p className="hint error">Unable to load suggestions right now.</p>}
          {!isError && !isFetching && suggestionList.length === 0 && (
            <div className="empty-suggestion-box">
              <p className="hint">No matching GitHub users found.</p>
            </div>
          )}
          {!isError && suggestionList.length > 0 && (
            <ul className="suggestion-list">
              {suggestionList.map(user => (
                <li key={user.id}>
                  <button
                    type="button"
                    onClick={() => handleSelectUser(user.login)}
                    className="suggestion-item"
                  >
                    <img src={user.avatar_url} alt={user.login} className="suggestion-avatar" />
                    <span className="suggestion-login">{user.login}</span>
                    <ArrowRight size={14} className="suggestion-arrow" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchForm;
