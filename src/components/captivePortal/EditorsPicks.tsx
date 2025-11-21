import React, { useRef } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import type { EditorsPickItem, LanguageCode } from '../../types/portalContent';

interface EditorsPicksProps {
  title: string;
  subtitle?: string;
  items: EditorsPickItem[];
  language: LanguageCode;
  count?: number;
}

export function EditorsPicks({ title, subtitle, items, language, count = 3 }: EditorsPicksProps) {
  const display = items.slice(0, count);
  const dragStatus = useRef(false);

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();

  const handleMouseDown = () => {
    dragStatus.current = false; // reset prije pokretanja drag
  };

  const handleMouseMove = () => {
    dragStatus.current = true; // ako se pomakne miš, markiraj kao drag
  };

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (dragStatus.current) {
      e.preventDefault(); // ako je bilo draganja, spriječi klik
    }
  };

  const sliderItems = display.map((item) => (
    <a
      key={item.id}
      href={item.link}
      style={{ borderRadius: '15px', overflow: 'hidden', marginRight: '10px' }}
      className="group bg-white/5 border border-white/10 flex flex-col hover:bg-white/10 transition-colors"
      onDragStart={handleDragStart}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      <div className="aspect-video w-full overflow-hidden bg-black/30">
        {item.imageFile && (
          <img
            src={item.imageFile}
            alt={item.titleEnglish}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform"
          />
        )}
      </div>

      <div className="p-3 flex flex-col" style={{ height: '10vh' }}>
        <h3 className="text-text-[12px] font-semibold leading-snug line-clamp-2 overflow-hidden text-ellipsis">
          {language === 'BA' ? item.titleBosnian : item.titleEnglish}
        </h3>

        {(item.teaserBosnian || item.teaserEnglish) && (
          <p
            className="text-xs text-white/50 mt-1 overflow-hidden text-ellipsis"
            style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}
          >
            {language === 'BA'
              ? (item.teaserBosnian || '').slice(0, 120) + ((item.teaserBosnian || '').length > 120 ? '...' : '')
              : (item.teaserEnglish || '').slice(0, 120) + ((item.teaserEnglish || '').length > 120 ? '...' : '')}
          </p>
        )}
      </div>
    </a>
  ));

  return (
    <section className="editorPicks p-6 md:p-0 mt-0" style={{ paddingRight: '0px' }}>
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
          {language === 'BA' ? 'Nema odabira urednika.' : 'No editor picks yet.'}
        </div>
      )}
    </section>
  );
}
