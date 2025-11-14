import React from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
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

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();

  const sliderItems = display.map((place) => (
    <a
      key={place.id}
      href={place.link}
      style={{ borderRadius: '20px', overflow: 'hidden', marginRight: '10px' }}
      className="group bg-white/5 border border-white/10 flex flex-col gap-2 hover:bg-white/10 transition-colors"
      onDragStart={handleDragStart}
    >
      <div className="aspect-video w-full overflow-hidden bg-black/30">
        {place.imageFile && (
          <img
            src={place.imageFile}
            alt={place.nameEnglish}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
          />
        )}
      </div>
      <div className="p-3">
        <h3 className="text-xs font-semibold leading-snug line-clamp-2">
          {language === 'BA' ? place.nameBosnian : place.nameEnglish}
        </h3>
        {(place.categoryBosnian || place.categoryEnglish) && (
          <p className="text-[10px] text-white/50 mt-1">
            {language === 'BA' ? place.categoryBosnian : place.categoryEnglish}
          </p>
        )}
      </div>
    </a>
  ));

  return (
    <section className="discoveryStrip p-6 mt-0" style={{ paddingRight: '0px' }}>
      <AliceCarousel
        mouseTracking
        items={sliderItems}
        infinite={false}
        disableDotsControls
        disableButtonsControls
        paddingLeft={0}
        paddingRight={0}
        responsive={{
          0: { items: 1.5 },   // mobilno: 1.5 kartice, treća viri
          768: { items: 2.2 }, // tablet/desktop: 2 kartice + 20% treće
        }}
        gutter={16}             // razmak između kartica
      />
      {display.length === 0 && (
        <div className="text-sm opacity-60 py-4 text-center">
          {language === 'BA' ? 'Nema sadržaja za otkrivanje.' : 'No discovery items yet.'}
        </div>
      )}
    </section>
  );
}
