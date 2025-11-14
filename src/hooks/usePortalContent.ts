import { useState, useEffect, useMemo } from 'react';
import type { PortalContent } from '../types/portalContent';

/**
 * Hook to load portal content from server and apply ad rotation logic
 * 
 * Ad Rotation Rules:
 * - Hero Videos: Pick ONE random video on page load
 * - Hero Banners: Pick ONE random banner on page load
 * - Block Sets: Pick ONE random set (displays ALL blocks in that set)
 * - Chips & Footer: Static (no rotation)
 */
export function usePortalContent() {
  const [content, setContent] = useState<PortalContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load content from server
  useEffect(() => {
    const fetchContent = async () => {
      // In production (no port or port 3000), use same-origin
      // In development (port 5173), use localhost:3001
      const apiHost = (window.location.port === '3000' || window.location.port === '')
        ? '' // same-origin calls (production or Vite with proxy)
        : 'http://localhost:3001'; // development fallback
      
      try {
  const response = await fetch(`${apiHost}/api/content`);
        if (response.ok) {
          const data = await response.json();
          setContent(data);
        } else {
          setError('Failed to load content from server');
        }
      } catch (err) {
        console.error('Error loading content:', err);
        setError('Could not connect to server');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchContent();
  }, []);

  // Apply ad rotation logic - memoize to maintain selection during component lifecycle
  const rotatedContent = useMemo(() => {
    if (!content) return null;

    const result = { ...content };

    // ROTATION: Select ONE random hero video
    if (content.heroVideos && content.heroVideos.length > 0) {
      const randomIndex = Math.floor(Math.random() * content.heroVideos.length);
      result.heroVideos = [content.heroVideos[randomIndex]];
    }

    // ROTATION: Select ONE random hero banner
    if (content.heroBanners && content.heroBanners.length > 0) {
      const randomIndex = Math.floor(Math.random() * content.heroBanners.length);
      result.heroBanners = [content.heroBanners[randomIndex]];
    }

    // ROTATION: Select ONE random block set (all blocks in the set are displayed)
    if (content.blockSets && content.blockSets.length > 0) {
      const randomIndex = Math.floor(Math.random() * content.blockSets.length);
      result.blockSets = [content.blockSets[randomIndex]];
    }

    return result;
  }, [content]); // Only recalculate when content changes, not on every render

  return {
    content: rotatedContent,
    isLoading,
    error,
    selectedVideo: rotatedContent?.heroVideos?.[0],
    selectedBanner: rotatedContent?.heroBanners?.[0],
    selectedBlockSet: rotatedContent?.blockSets?.[0],
    chips: rotatedContent?.chips || [],
    footer: rotatedContent?.footer,
    global: rotatedContent?.global,
  } as const;
}

/**
 * Get user's language preference
 * Priority: Browser language > Default to English
 */
export function getUserLanguage(): 'bosnian' | 'english' {
  const browserLang = navigator.language.toLowerCase();
  
  // Check for Bosnian language codes
  if (browserLang.startsWith('bs') || browserLang.startsWith('hr') || browserLang.startsWith('sr')) {
    return 'bosnian';
  }
  
  return 'english';
}

/**
 * Helper to get bilingual text based on user language
 */
export function getBilingualText(bosnian: string, english: string): string {
  const lang = getUserLanguage();
  return lang === 'bosnian' ? bosnian : english;
}
