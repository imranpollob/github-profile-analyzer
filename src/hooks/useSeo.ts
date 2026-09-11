import { useEffect } from 'react';

interface SeoProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const DEFAULT_TITLE = 'GitLens — GitHub Profile Analyzer & Developer Insights';
const DEFAULT_DESCRIPTION =
  'Discover in-depth GitHub profile analytics, language snapshots, public activity timelines, head-to-head developer comparison, and shareable developer cards. Crafted by Imran Pollob.';
const DEFAULT_IMAGE = 'https://imranpollob.github.io/github-profile-analyzer/brand-logo.png';
const DEFAULT_URL = 'https://imranpollob.github.io/github-profile-analyzer/';

export function useSeo({ title, description, image, url }: SeoProps = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} | GitLens` : DEFAULT_TITLE;
    document.title = fullTitle;

    const descContent = description || DEFAULT_DESCRIPTION;
    const currentUrl = url || (typeof window !== 'undefined' ? window.location.href : DEFAULT_URL);
    const ogImage = image || DEFAULT_IMAGE;

    // Helper to update meta tag content
    const setMeta = (nameOrProp: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${nameOrProp}"]` : `meta[name="${nameOrProp}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement | null;
      if (!meta) {
        meta = document.createElement('meta');
        if (isProperty) {
          meta.setAttribute('property', nameOrProp);
        } else {
          meta.setAttribute('name', nameOrProp);
        }
        document.head.appendChild(meta);
      }
      meta.content = content;
    };

    setMeta('description', descContent);
    setMeta('og:title', fullTitle, true);
    setMeta('og:description', descContent, true);
    setMeta('og:url', currentUrl, true);
    setMeta('og:image', ogImage, true);

    setMeta('twitter:title', fullTitle);
    setMeta('twitter:description', descContent);
    setMeta('twitter:url', currentUrl);
    setMeta('twitter:image', ogImage);

    // Update canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (canonical) {
      canonical.href = currentUrl;
    }
  }, [title, description, image, url]);
}
