import React, { useRef } from 'react';
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
  const dragStatus = useRef(false);

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();

  const handleMouseDown = () => {
    dragStatus.current = false; // reset prije pokretanja drag
  };

  const handleMouseMove = () => {
    dragStatus.current = true; // ako se pomakne miš/finger, markiraj kao drag
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragStatus.current) {
      e.preventDefault(); // ako je bilo draganja, spriječi klik
    }
  };

  const sliderItems = display.map((place) => (
    <a
      key={place.id}
      href={place.link}
      style={{ borderRadius: '20px', overflow: 'hidden', marginRight: '10px' }}
      className="group bg-white/5 border border-white/10 flex flex-col hover:bg-white/10 transition-colors"
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      onTouchStart={handleMouseDown} // za mobilne touch uređaje
      onTouchMove={handleMouseMove}   // za mobilne touch uređaje
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

      <div className="p-3 flex flex-col" style={{ height: '10vh' }}>
        <h3 className="text-[12px] font-semibold leading-snug line-clamp-2 overflow-hidden text-ellipsis">
          {language === 'BA' ? place.nameBosnian : place.nameEnglish}
        </h3>

        {(place.categoryBosnian || place.categoryEnglish) && (
          <p
            className="text-xs text-white/50 mt-1 overflow-hidden text-ellipsis"
            style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}
          >
            {language === 'BA'
              ? (place.categoryBosnian || '').slice(0, 80) + ((place.categoryBosnian || '').length > 80 ? '...' : '')
              : (place.categoryEnglish || '').slice(0, 80) + ((place.categoryEnglish || '').length > 80 ? '...' : '')}
          </p>
        )}
      </div>
    </a>
  ));

  return (
    <section className="discoveryStrip p-6 md:p-0 mt-0" style={{ paddingRight: '0px' }}>
      <AliceCarousel
        mouseTracking
        items={sliderItems}
        infinite={false}
        disableDotsControls
        disableButtonsControls
        paddingLeft={0}
        paddingRight={0}
        responsive={{
          0: { items: 1.5 },
          768: { items: 2.2 },
        }}
        gutter={16}
      />

      {display.length === 0 && (
        <div className="text-sm opacity-60 py-4 text-center">
          {language === 'BA' ? 'Nema sadržaja za otkrivanje.' : 'No discovery items yet.'}
        </div>
      )}
    </section>
  );
}
