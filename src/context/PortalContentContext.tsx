import React from 'react';
import { usePortalContent } from '../hooks/usePortalContent';
import { detectLanguage } from '../i18n/translations';
import type { LanguageCode, PortalContent, HeroVideo, HeroBanner, BlockSet } from '../types/portalContent';

export interface PortalContentContextValue {
  content: PortalContent | null;
  isLoading: boolean;
  error: string | null;
  // rotated selections
  selectedVideo?: HeroVideo;
  selectedBanner?: HeroBanner;
  selectedBlockSet?: BlockSet;
  chips: NonNullable<PortalContent['chips']>;
  footer?: PortalContent['footer'];
  global?: PortalContent['global'];
  // language
  language: LanguageCode;
  setLanguage: React.Dispatch<React.SetStateAction<LanguageCode>>;
}

const PortalContentContext = React.createContext<PortalContentContextValue | undefined>(undefined);

export function PortalContentProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = React.useState<LanguageCode>(detectLanguage());
  const { content, isLoading, error, selectedVideo, selectedBanner, selectedBlockSet, chips, footer, global } = usePortalContent();

  const value = React.useMemo<PortalContentContextValue>(() => ({
    content,
    isLoading,
    error,
    selectedVideo,
    selectedBanner,
    selectedBlockSet,
    chips,
    footer,
    global,
    language,
    setLanguage,
  }), [content, isLoading, error, selectedVideo, selectedBanner, selectedBlockSet, chips, footer, global, language]);

  return (
    <PortalContentContext.Provider value={value}>{children}</PortalContentContext.Provider>
  );
}

export function usePortalContentContext() {
  const ctx = React.useContext(PortalContentContext);
  if (!ctx) {
    throw new Error('usePortalContentContext must be used within a PortalContentProvider');
  }
  return ctx;
}
