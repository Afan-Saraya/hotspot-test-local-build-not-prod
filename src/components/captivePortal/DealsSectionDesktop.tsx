import React, { useEffect, useLayoutEffect, useRef } from 'react'; 
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
      left.style.height = 'auto';
      const topRect = top.getBoundingClientRect();
      const bottomRect = bottom.getBoundingClientRect();
      const gap = 16;
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

    // Inline styles for card
    const cardStyle: React.CSSProperties = {
      backgroundColor: blockStyles?.blockBackground || 'rgba(20, 20, 28, 0.92)',
      width: '100%',
      height: 'auto',
      borderRadius: "15px"
    };

    const isFixedSmall = idx === 1 || idx === 2;

    // PLACEHOLDER
    if (!block) {
      if (isFixedSmall) {
        const placeholderStyle: React.CSSProperties = {
          ...cardStyle,
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: "15px"
        };
        return (
          <div 
            key={`empty-${idx}`} 
            className="cp-card group relative flex flex-col items-center justify-center overflow-hidden rounded-[15px] border-2 border-dashed border-white/8 bg-[rgba(12,12,16,0.6)] p-4" 
            style={placeholderStyle}
          >
            <div className="w-full h-full" />
          </div>
        );
      }

      const inlineAspectPlaceholder = idx === 0 ? '9 / 16' : idx === 3 ? '16 / 9' : '1 / 1';
      const placeholderStyle: React.CSSProperties = { 
        ...cardStyle, 
        aspectRatio: inlineAspectPlaceholder,
        borderRadius: "15px"
      };

      return (
        <div 
          key={`empty-${idx}`} 
          className="cp-card group relative flex flex-col items-center justify-center overflow-hidden rounded-[15px] border-2 border-dashed border-white/8 bg-[rgba(12,12,16,0.6)] p-4" 
          style={placeholderStyle}
        >
          <div className="w-full h-full" />
        </div>
      );
    }

    // Determine aspect classes and inline sizing for real cards
    let aspectClass = '';
    if (!isFixedSmall) {
      aspectClass = idx === 3 ? 'aspect-[16/9]' : idx === 0 ? '' : 'aspect-[1/1]';
    }

    const inlineAspect = isFixedSmall ? undefined : idx === 3 ? '16 / 9' : idx === 0 ? undefined : '1 / 1';

    const mergedStyle: React.CSSProperties = isFixedSmall
      ? { ...cardStyle, width: '100%', aspectRatio: '1 / 1', borderRadius: "15px" }
      : idx === 0
      ? { ...cardStyle, height: '100%', width: '100%', borderRadius: "15px" }
      : { ...cardStyle, aspectRatio: inlineAspect, borderRadius: "15px" };

    return (
      <div
        key={block.id || `block-${idx}`}
        className={`cp-card group relative overflow-hidden rounded-[15px] ring-1 ring-white/12 backdrop-blur-xl shadow-[0_16px_32px_rgba(8,8,12,0.45)] transition-transform duration-300 hover:-translate-y-1 ${aspectClass}`}
        style={mergedStyle}
      >
        <div className="h-full w-full relative overflow-hidden">
          <div className="w-full h-full">
            <Image 
              src={block.imageFile} 
              alt={block.title} 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              wrapperClassName="w-full h-full" 
            />
          </div>
        </div>
      </div>
    );
  };

  const slots = Array.from({ length: 6 }).map((_, i) => blocks[i]);

  return (
    <div className="pb-8">
      <div className="space-y-4">

        {/* TOP */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '10fr 10fr' }}>
          <div style={{ gridRow: '1 / span 2', display: 'flex', flexDirection: 'column' }} ref={leftWrapperRef}>
            <div style={{ flex: 1 }}>{renderBlock(slots[0], 0)}</div>
          </div>

          <div ref={rightTopRef}>{renderBlock(slots[1], 1)}</div>
          <div ref={rightBottomRef}>{renderBlock(slots[2], 2)}</div>
        </div>

        {/* MIDDLE */}
        <div>{renderBlock(slots[3], 3)}</div>

        {/* BOTTOM */}
        <div className="grid grid-cols-2 gap-4">
          {renderBlock(slots[4], 4)}
          {renderBlock(slots[5], 5)}
        </div>

      </div>
    </div>
  );
}
