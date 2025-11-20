import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Image } from '../Image';
import type { BlockItem, BlockSetStyling, LanguageCode } from '../../types/portalContent';

interface DealsSectionDesktopProps {
  blocks: BlockItem[];
  blockStyles?: BlockSetStyling;
  layoutStyle: 'masonry' | 'grid';
  mobileColumns: number;
  badgePresets: { label: string; gradient: string }[];
  overlayPresets: string[];
  language: LanguageCode;
}

export const DealsSectionDesktop: React.FC<DealsSectionDesktopProps> = ({
  blocks,
  blockStyles,
  layoutStyle,
  mobileColumns,
  badgePresets,
  overlayPresets,
  language
}) => {
  const hasBlocks = blocks && blocks.length > 0;

  const renderTallBlock = (block: BlockItem | undefined, idx: number) => {
    if (!block) {
      const placeholderStyle: React.CSSProperties = { backgroundColor: blockStyles?.blockBackground || 'rgba(20, 20, 28, 0.92)', aspectRatio: '9 / 16' };
      return (
        <div key={`empty-tall-${idx}`} className="cp-card-large group relative overflow-hidden rounded-2xl border-2 border-dashed border-white/8 bg-[rgba(12,12,16,0.6)] p-4" style={placeholderStyle}>
          <div className="h-[90%] w-full" />
          <div className="h-[10%] mt-2 text-center text-sm text-white/60">{language === 'BA' ? 'Dodajte blok u Admin panelu' : 'Add block in Admin dashboard'}</div>
        </div>
      );
    }
    const badge = badgePresets[idx % badgePresets.length];
    const overlay = overlayPresets[idx % overlayPresets.length];
    const hasCustomButton = Boolean(blockStyles?.buttonBackground);
    const buttonTextColor = blockStyles?.buttonTextColor || (hasCustomButton ? '#FFFFFF' : '#14141F');
    return (
      <div
        key={block.id || `block-tall-${idx}`}
        className={`cp-block-tall-${idx} cp-card-large group relative overflow-hidden rounded-2xl ring-1 ring-white/12 bg-[rgba(20,20,28,0.92)] backdrop-blur-xl shadow-[0_18px_42px_rgba(8,8,12,0.45)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(122,73,240,0.28)]`}
        style={{ backgroundColor: blockStyles?.blockBackground || 'rgba(20, 20, 28, 0.92)', aspectRatio: '9 / 16' }}
      >
        <div className="h-[90%] w-full relative overflow-hidden">
          <Image src={block.imageFile} alt={block.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" wrapperClassName="w-full h-full" />
          <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={`rounded-full bg-gradient-to-r ${badge.gradient} px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg`}>{badge.label}</span>
          </div>
        </div>
        <div className="h-[10%] flex items-center p-3">
          <div className="truncate">
            <h3 className="text-sm font-semibold text-white" style={{ color: blockStyles?.titleColor || '#F7F8FB' }}>{block.title}</h3>
            <p className="text-xs text-white/80 line-clamp-1" style={{ color: blockStyles?.descriptionColor || 'rgba(240,240,245,0.82)' }}>{block.description}</p>
          </div>
          <div className="flex items-center ml-auto">
            <button
              className={`inline-flex items-center justify-center h-7 rounded-full px-3 text-[13px] font-semibold uppercase tracking-wide shadow-md transition-all active:scale-[0.97] ${hasCustomButton ? '' : 'bg-gradient-to-r from-[#7A49F0] via-[#8F59F4] to-[#C86BFA] text-white hover:shadow-purple-500/60'}`}
              style={{
                width: '44px',
                height: '28px',
                background: hasCustomButton ? blockStyles?.buttonBackground : undefined,
                color: buttonTextColor,
                border: hasCustomButton ? '1px solid rgba(255,255,255,0.18)' : undefined
              }}
              onClick={() => block.buttonLink && window.open(block.buttonLink, '_blank')}
            >
              <ChevronRight className="h-4 w-4 text-current" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderSmallBlock = (block: BlockItem | undefined, idx: number) => {
    if (!block) {
      const placeholderStyle: React.CSSProperties = { backgroundColor: blockStyles?.blockBackground || 'rgba(20, 20, 28, 0.92)', aspectRatio: '1 / 1' };
      return (
        <div key={`empty-small-${idx}`} className="cp-card group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/8 bg-[rgba(12,12,16,0.6)] p-4" style={placeholderStyle}>
          <div className="w-full h-full" />
          <div className="mt-3 text-center text-sm text-white/60">{language === 'BA' ? 'Dodajte blok u Admin panelu' : 'Add block in Admin dashboard'}</div>
        </div>
      );
    }
    const badge = badgePresets[idx % badgePresets.length];
    const overlay = overlayPresets[idx % overlayPresets.length];
    const hasCustomButton = Boolean(blockStyles?.buttonBackground);
    const buttonTextColor = blockStyles?.buttonTextColor || (hasCustomButton ? '#FFFFFF' : '#14141F');
        return (
      <div
        key={block.id || `block-tall-${idx}`}
        className={`cp-block-tall-${idx} cp-card group relative flex flex-col overflow-hidden rounded-2xl ring-1 ring-white/12 bg-[rgba(20,20,28,0.92)] backdrop-blur-xl shadow-[0_18px_42px_rgba(8,8,12,0.45)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(122,73,240,0.28)]`}
        style={{ backgroundColor: blockStyles?.blockBackground || 'rgba(20, 20, 28, 0.92)', aspectRatio: '1 / 1' }}
      >
        {/* Full-bleed image (no inner rounding or padding) */}
        <div className="img relative w-full overflow-hidden aspect-[1/1]">
          <Image src={block.imageFile} alt={block.title} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
          <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={`rounded-full bg-gradient-to-r ${badge.gradient} px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg`}>{badge.label}</span>
          </div>
        </div>
        {/* Content inset */}
        <div className="flex flex-1 flex-row justify-between p-5">
          <div className="space-y-2 px-1">
            <h3 className="text-base font-semibold leading-snug text-white p-2" style={{ color: blockStyles?.titleColor || '#F7F8FB' }}>{block.title}</h3>
            <p className="text-sm leading-relaxed text-white/80 line-clamp-3 p-2" style={{ color: blockStyles?.descriptionColor || 'rgba(240,240,245,0.82)', marginTop: '-20px' }}>{block.description}</p>
          </div>

          <div className="flex justify-center" style={{marginRight:'15px'}}>
            <button
              className={`inline-flex items-center justify-center h-7 rounded-full px-6 text-[13px] font-semibold uppercase tracking-wide shadow-md transition-all active:scale-[0.97] ${hasCustomButton ? '' : 'bg-gradient-to-r from-[#7A49F0] via-[#8F59F4] to-[#C86BFA] text-white hover:shadow-purple-500/60'}`}
              style={{
                width: '64px',
                height: '24px',
                marginLeft:'auto',
                marginTop:'auto',
                marginBottom:'auto',
                background: hasCustomButton ? blockStyles?.buttonBackground : undefined,
                color: buttonTextColor,
                border: hasCustomButton ? '1px solid rgba(255,255,255,0.18)' : undefined
              }}
              onClick={() => block.buttonLink && window.open(block.buttonLink, '_blank')}
            >
              <ChevronRight className="h-4 w-4 text-current" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderWideBlock = (block: BlockItem | undefined, idx: number) => {
    if (!block) {
      const placeholderStyle: React.CSSProperties = { backgroundColor: blockStyles?.blockBackground || 'rgba(20, 20, 28, 0.92)', aspectRatio: '16 / 9' };
      return (
        <div key={`empty-wide-${idx}`} className="cp-card-large group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/8 bg-[rgba(12,12,16,0.6)] p-4" style={placeholderStyle}>
          <div className="w-full h-full" />
          <div className="mt-3 text-center text-sm text-white/60">{language === 'BA' ? 'Dodajte blok u Admin panelu' : 'Add block in Admin dashboard'}</div>
        </div>
      );
    }
    const badge = badgePresets[idx % badgePresets.length];
    const overlay = overlayPresets[idx % overlayPresets.length];
    const hasCustomButton = Boolean(blockStyles?.buttonBackground);
    const buttonTextColor = blockStyles?.buttonTextColor || (hasCustomButton ? '#FFFFFF' : '#14141F');
    return (
      <div key={block.id || `block-wide-${idx}`} className={`cp-card-large group relative flex flex-col overflow-hidden rounded-2xl ring-1 ring-white/12 bg-[rgba(20,20,28,0.92)] backdrop-blur-xl shadow-[0_18px_42px_rgba(8,8,12,0.45)] transition-transform duration-300 hover:-translate-y-1`} style={{ backgroundColor: blockStyles?.blockBackground || 'rgba(20, 20, 28, 0.92)', aspectRatio: '16 / 9' }}>
        <div className="img relative w-full overflow-hidden aspect-[16/9]">
          <Image src={block.imageFile} alt={block.title} className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105" />
          <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={`rounded-full bg-gradient-to-r ${badge.gradient} px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg`}>{badge.label}</span>
          </div>
        </div>
        <div className="flex flex-1 flex-row justify-between p-5">
          <div className="space-y-2 px-1">
            <h3 className="text-base font-semibold leading-snug text-white p-2" style={{ color: blockStyles?.titleColor || '#F7F8FB' }}>{block.title}</h3>
            <p className="text-sm leading-relaxed text-white/80 line-clamp-3 p-2" style={{ color: blockStyles?.descriptionColor || 'rgba(240,240,245,0.82)', marginTop: '-20px' }}>{block.description}</p>
          </div>

          <div className="flex justify-center" style={{ marginRight: '15px' }}>
            <button
              className={`inline-flex items-center justify-center h-7 rounded-full px-6 text-[13px] font-semibold uppercase tracking-wide shadow-md transition-all active:scale-[0.97] ${hasCustomButton ? '' : 'bg-gradient-to-r from-[#7A49F0] via-[#8F59F4] to-[#C86BFA] text-white hover:shadow-purple-500/60'}`}
              style={{
                width: '64px',
                height: '28px',
                background: hasCustomButton ? blockStyles?.buttonBackground : undefined,
                color: buttonTextColor,
                border: hasCustomButton ? '1px solid rgba(255,255,255,0.18)' : undefined
              }}
              onClick={() => block.buttonLink && window.open(block.buttonLink, '_blank')}
            >
              <ChevronRight className="h-4 w-4 text-current" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Render fixed 6-slot layout (left tall + two small stacked, wide banner, two smalls)
  const slots = Array.from({ length: 6 }).map((_, i) => blocks[i]);
  return (
    <div className="pb-8">
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">{renderTallBlock(slots[0], 0)}</div>
          <div className="col-span-1 flex flex-col gap-6">
            {renderSmallBlock(slots[1], 1)}
            {renderSmallBlock(slots[2], 2)}
          </div>
        </div>

        <div>{renderWideBlock(slots[3], 3)}</div>

        <div className="grid grid-cols-2 gap-6">
          {renderSmallBlock(slots[4], 4)}
          {renderSmallBlock(slots[5], 5)}
        </div>
      </div>
    </div>
  );
};
