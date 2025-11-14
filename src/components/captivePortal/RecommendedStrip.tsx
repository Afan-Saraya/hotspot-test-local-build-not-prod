import React from 'react';
import { MapPin } from 'lucide-react';
import type { LanguageCode } from '../../types/portalContent';

interface OfferItem { title: string; subtitle: string; distance: string }

interface RecommendedStripProps {
  header: string;
  badgeLabel: string;
  offers: OfferItem[];
}

export const RecommendedStrip: React.FC<RecommendedStripProps> = ({ header, badgeLabel, offers }) => {
  return (
    <div className="py-4 bg-black/20 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-4 px-6">
        <h2 className="font-medium font-sans">{header}</h2>
      </div>
      <div className="scrollbar-hide w-full" style={{ overflowX: 'scroll', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}>
        <div className="flex gap-3 px-6 pb-2 pt-3" style={{ minWidth: 'max-content' }}>
          {offers.map((offer: any, index: number) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-3 hover:bg-white/15 transition-all shadow-lg relative flex-shrink-0 mt-2"
              style={{ width: '180px', minWidth: '180px', maxWidth: '180px' }}
            >
              <div className="absolute -top-2 -right-2 bg-[#1E6CFF] text-white text-xs px-3 py-1 rounded-full shadow-lg font-medium z-10">
                {badgeLabel}
              </div>
              <div className="w-full h-16 bg-gradient-to-br from-[#7A49F0]/50 to-[#1E6CFF]/50 rounded-lg mb-3 flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white/70" />
              </div>
              <h4 className="font-medium text-sm mb-2 font-sans">{offer.title}</h4>
              <p className="text-xs text-[#1E6CFF] mb-1">{offer.subtitle}</p>
              <p className="text-xs text-white/60 flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                {offer.distance}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
