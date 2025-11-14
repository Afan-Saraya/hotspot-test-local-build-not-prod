import React from 'react';
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

  const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();

  // Kreiramo array React elemenata za slider
  const sliderItems = display.map((item) => (
    <a
      key={item.id}
      href={item.link}
      style={{ borderRadius: '20px', overflow: 'hidden', marginRight: '10px' }}
      className="group bg-white/5 border border-white/10 flex flex-col gap-2 hover:bg-white/10 transition-colors"
      onDragStart={handleDragStart}
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
      <div className="p-3">
        <h3 className="text-xs font-semibold leading-snug line-clamp-2">
          {language === 'BA' ? item.titleBosnian : item.titleEnglish}
        </h3>
        {(item.teaserBosnian || item.teaserEnglish) && (
          <p className="text-[10px] text-white/50 line-clamp-3 mt-1">
            {language === 'BA' ? item.teaserBosnian : item.teaserEnglish}
          </p>
        )}
      </div>
    </a>
  ));

  return (
    <section className="editorPicks p-6 mt-0" style={{paddingRight:'0px'}}>
      <AliceCarousel
        mouseTracking
        items={sliderItems}
        infinite={false}
        disableDotsControls
        disableButtonsControls
        paddingLeft={0}
        paddingRight={0}
        responsive={{
          0: { items: 1.5 },       // na mobilnom 1.5 da treća viri
          768: { items: 2.2 },     // tablet/desktop: 2 kartice + 20% treće
        }}
        gutter={16}                 // razmak između kartica
      />
      {display.length === 0 && (
        <div className="text-sm opacity-60 py-4 text-center">{language === 'BA' ? 'Nema odabira urednika.' : 'No editor picks yet.'}</div>
      )}
    </section>
  );
}
