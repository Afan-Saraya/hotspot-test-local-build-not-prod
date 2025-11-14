import React from 'react';
import type { DiscoveryPlaceItem, LanguageCode } from '../../types/portalContent';

interface DiscoveryStripProps {
  title: string;
  subtitle?: string;
  places: DiscoveryPlaceItem[];
  language: LanguageCode;
  count?: number;
}

export function DiscoveryStrip({ title, subtitle, places, language, count = 3 }: DiscoveryStripProps) {
  const display = places.slice(0, count);
  return (
    // Header is rendered by parent (styled via renderHeader)
    <section className="discoveryStrip px-6 mt-0">
      <div className="grid grid-cols-3 gap-3">
        {display.map(place => (
          <a key={place.id} href={place.link} className="group rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col gap-2 hover:bg-white/10 transition-colors">
            <div className="aspect-video w-full rounded-md overflow-hidden bg-black/30">
              {place.imageFile && <img src={place.imageFile} alt={place.nameEnglish} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />}
            </div>
            <div>
              <h3 className="text-xs font-semibold leading-snug line-clamp-2">{language === 'BA' ? place.nameBosnian : place.nameEnglish}</h3>
              {(place.categoryBosnian || place.categoryEnglish) && (
                <p className="text-[10px] text-white/50 mt-1">{language === 'BA' ? place.categoryBosnian : place.categoryEnglish}</p>
              )}
            </div>
          </a>
        ))}
        {display.length === 0 && (
          <div className="col-span-3 text-sm opacity-60 py-4 text-center">{language === 'BA' ? 'Nema sadržaja za otkrivanje.' : 'No discovery items yet.'}</div>
        )}
      </div>
    </section>
  );
}
