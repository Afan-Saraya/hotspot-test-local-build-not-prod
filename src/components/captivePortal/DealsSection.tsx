import React, { useEffect, useLayoutEffect, useRef } from 'react';
import { ChevronRight } from 'lucide-react';
import { Image } from '../Image';
import type { BlockItem, BlockSetStyling, LanguageCode } from '../../types/portalContent';

interface DealsSectionProps {
  blocks: BlockItem[];
  blockStyles?: BlockSetStyling;
  layoutStyle: 'masonry' | 'grid';
  mobileColumns: number;
  badgePresets: { label: string; gradient: string }[];
  overlayPresets: string[];
  language: LanguageCode;
}

export const DealsSection: React.FC<DealsSectionProps> = ({
  blocks,
  blockStyles,
  layoutStyle,
  mobileColumns,
  badgePresets,
  overlayPresets,
  language
}) => {
  const hasBlocks = blocks && blocks.length > 0;

  // Refs to measure and equalize heights between left tall block and two right stacked blocks
  const leftWrapperRef = useRef<HTMLDivElement | null>(null);
  const rightTopRef = useRef<HTMLDivElement | null>(null);
  const rightBottomRef = useRef<HTMLDivElement | null>(null);

  // Measure and set left height equal to sum of right stacked blocks (accounts for gap)
  useLayoutEffect(() => {
    function syncHeights() {
      const top = rightTopRef.current;
      const bottom = rightBottomRef.current;
      const left = leftWrapperRef.current;
      if (!left || !top || !bottom) return;
      // reset left height to auto so measurement uses natural sizes first
      left.style.height = 'auto';
      const topRect = top.getBoundingClientRect();
      const bottomRect = bottom.getBoundingClientRect();
      const gap = 16; // matches `gap-4` (1rem ~= 16px) used in grid gap
      const targetHeight = Math.round(topRect.height + bottomRect.height + gap);
      left.style.height = `${targetHeight}px`;
    }

    syncHeights();
    window.addEventListener('resize', syncHeights);
    return () => window.removeEventListener('resize', syncHeights);
  }, [blocks]);

  const renderBlock = (block: BlockItem | undefined, idx: number) => {
    const badge = badgePresets[idx % badgePresets.length];
    const overlay = overlayPresets[idx % overlayPresets.length];
    const hasCustomButton = Boolean(blockStyles?.buttonBackground);
    const buttonTextColor = blockStyles?.buttonTextColor || (hasCustomButton ? '#FFFFFF' : '#14141F');

    // Inline styles to neutralize global .dealsSection .card sizing from globals.css
    const cardStyle: React.CSSProperties = {
      backgroundColor: blockStyles?.blockBackground || 'rgba(20, 20, 28, 0.92)',
      width: '100%',
      height: 'auto',
      minHeight: undefined
    };

    // Placeholder when block is missing — keeps layout intact and prompts admin to add content
    if (!block) {
      const inlineAspectPlaceholder = idx === 0 ? '9 / 16' : idx === 3 ? '16 / 9' : '1 / 1';
      const placeholderStyle: React.CSSProperties = { ...cardStyle, aspectRatio: inlineAspectPlaceholder };
      return (
        <div key={`empty-${idx}`} className="cp-card group relative flex flex-col items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-white/8 bg-[rgba(12,12,16,0.6)] p-4" style={placeholderStyle}>
          <div className="w-full h-full" />
          <div className="mt-3 text-center text-sm text-white/60">{language === 'BA' ? 'Dodajte blok u Admin panelu' : 'Add block in Admin dashboard'}</div>
        </div>
      );
    }
    const aspectClass = idx === 0 ? 'aspect-[9/16]' : idx === 3 ? 'aspect-[16/9]' : 'aspect-[1/1]';
    const inlineAspect = idx === 0 ? '9 / 16' : idx === 3 ? '16 / 9' : '1 / 1';
    const mergedStyle: React.CSSProperties = { ...cardStyle, aspectRatio: inlineAspect };

    return (
      <div
        key={block.id || `block-${idx}`}
        className={`cp-card group relative overflow-hidden rounded-2xl ring-1 ring-white/12 backdrop-blur-xl shadow-[0_16px_32px_rgba(8,8,12,0.45)] transition-transform duration-300 hover:-translate-y-1 ${aspectClass}`}
        style={mergedStyle}
      >
        {/* Image area takes ~90% of card height */}
        <div className="h-[90%] w-full relative overflow-hidden">
          <div className="w-full h-full">
            <Image src={block.imageFile} alt={block.title} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105" wrapperClassName="w-full h-full" />
            <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
            <div className="absolute top-3 left-3 flex items-center gap-2">
              <span className={`rounded-full bg-gradient-to-r ${badge.gradient} px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg`}>{badge.label}</span>
            </div>
          </div>
        </div>

        {/* Text area: leave a small lip (~10%) for titles/description */}
        <div className="h-[10%] flex items-center justify-between p-3">
          <div className="truncate">
            <h3 className="text-sm font-semibold text-white" style={{ color: blockStyles?.titleColor || '#F7F8FB' }}>{block.title}</h3>
            <p className="text-xs text-white/80 line-clamp-1" style={{ color: blockStyles?.descriptionColor || 'rgba(240,240,245,0.82)' }}>{block.description}</p>
          </div>
          <div className="flex items-center pl-2">
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

  // Always render six slots; use placeholders for missing blocks so layout remains consistent
  const slots = Array.from({ length: 6 }).map((_, i) => blocks[i]);

  return (
    <div className="pb-8">
      <div className="space-y-4">
        {/* Top group: left tall vertical + right two stacked squares */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '52.941176% 47.058824%' }}>
          <div style={{ gridRow: '1 / span 2' }}>{renderBlock(slots[0], 0)}</div>
          <div>{renderBlock(slots[1], 1)}</div>
          <div>{renderBlock(slots[2], 2)}</div>
        </div>

        {/* Middle full-width horizontal */}
        <div>{renderBlock(slots[3], 3)}</div>

        {/* Bottom row: two small squares */}
        <div className="grid grid-cols-2 gap-4">
          {renderBlock(slots[4], 4)}
          {renderBlock(slots[5], 5)}
        </div>
      </div>
    </div>
  );
};
