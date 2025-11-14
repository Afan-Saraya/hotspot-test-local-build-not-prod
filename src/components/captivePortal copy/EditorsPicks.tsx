import React from 'react';
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
  return (
    // Header is rendered by parent (styled via renderHeader)
    <section className="editorPicks px-6 mt-0">
      <div className="grid grid-cols-3 gap-3">
        {display.map(item => (
          <a key={item.id} href={item.link} className="group rounded-xl bg-white/5 border border-white/10 p-3 flex flex-col gap-2 hover:bg-white/10 transition-colors">
            <div className="aspect-video w-full rounded-md overflow-hidden bg-black/30">
              {item.imageFile && <img src={item.imageFile} alt={item.titleEnglish} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform" />}
            </div>
            <div>
              <h3 className="text-xs font-semibold leading-snug line-clamp-2">{language === 'BA' ? item.titleBosnian : item.titleEnglish}</h3>
              {(item.teaserBosnian || item.teaserEnglish) && (
                <p className="text-[10px] text-white/50 line-clamp-3 mt-1">{language === 'BA' ? item.teaserBosnian : item.teaserEnglish}</p>
              )}
            </div>
          </a>
        ))}
        {display.length === 0 && (
          <div className="col-span-3 text-sm opacity-60 py-4 text-center">{language === 'BA' ? 'Nema odabira urednika.' : 'No editor picks yet.'}</div>
        )}
      </div>
    </section>
  );
}
