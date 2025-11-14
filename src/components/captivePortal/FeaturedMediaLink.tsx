import React from 'react';
import type { QuickFunItem, LanguageCode } from '../../types/portalContent';

interface FeaturedMediaLinkProps {
  item?: QuickFunItem;
  language: LanguageCode;
  title?: string; // Section title override (unused: header rendered by parent)
  subtitle?: string; // Section subtitle override (unused: header rendered by parent)
}

export function FeaturedMediaLink({ item, language, title, subtitle }: FeaturedMediaLinkProps) {
  if (!item) return null;
  const sectionTitle = title || (language === 'BA' ? item.titleBosnian : item.titleEnglish) || '';
  // Parent renders styled header; this component only renders the media card. Bottom breathing room now handled via explicit spacer in parent layout.
  return (
    <section className="featuredMedia px-6 mt-0 mb-12">
      <a
        href={item.link}
        className="block group overflow-hidden ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition-colors"
      >
        <div className="aspect-video w-full bg-black/30 rounded-2xl overflow-hidden" style={{borderRadius:'10px'}}>
          {item.imageFile && (
            <img
              src={item.imageFile}
              alt={sectionTitle}
              className="block w-full h-full object-cover transform-gpu group-hover:scale-[1.02] transition-transform [backface-visibility:hidden]"
            />
          )}
        </div>
      </a>
    </section>
  );
}
