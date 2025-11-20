import React from 'react';
import * as LucideIcons from 'lucide-react';
import { PartyPopper } from 'lucide-react';
import type { ChipItem, LanguageCode } from '../../types/portalContent';

interface ChipsBarProps {
  chips: ChipItem[];
  language: LanguageCode;
}

export const ChipsBar: React.FC<ChipsBarProps> = ({ chips, language }) => {
  return (
    <div className="chipBar pt-0 pb-0">
      <div
        className="scrollbar-hide w-full"
        style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', scrollbarWidth: 'none' }}
      >
        <div className="flex gap-3 px-6" style={{ minWidth: 'max-content' }}>
          {chips.map((chip, idx) => {
            const gradients = [
              'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
              'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
              'linear-gradient(135deg, #30cfd0 0%, #330867 100%)'
            ];
            const chipName = language === 'BA' ? chip.nameBosnian : chip.nameEnglish;
            const isImageUrl = typeof chip.icon === 'string' && chip.icon && (chip.icon.startsWith('/') || chip.icon.startsWith('http') || chip.icon.includes('.'));
            const IconComponent = !isImageUrl && typeof chip.icon === 'string' && chip.icon ? (LucideIcons as any)[chip.icon] || PartyPopper : null;
            return (
              <button
                key={chip.id}
                onClick={() => chip.link && window.open(chip.link, '_blank')}
                className="flex items-center gap-2 rounded-full font-semibold tracking-wide shadow-lg transition-transform hover:-translate-y-0.5 hover:shadow-purple-500/40 flex-shrink-0"
                style={{
                  background: gradients[idx % gradients.length],
                  padding: '0.8vh 1.6vh',      // koristi vh za padding
                  fontSize: '1.6vh',          // font u vh
                  lineHeight: 1
                }}
              >
                <div
                  // wrapper koristi vh za dimenzije ikone
                  style={{ width: '2.2vh', height: '2.2vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {isImageUrl ? (
                    <img src={chip.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  ) : IconComponent ? (
                    <IconComponent style={{ width: '2.2vh', height: '2.2vh', color: 'white' }} />
                  ) : (
                    <PartyPopper style={{ width: '2.2vh', height: '2.2vh', color: 'white' }} />
                  )}
                </div>
                <span style={{ color: 'white' }}>{chipName}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
