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
  const [open, setOpen] = React.useState(false);
  const [fadeClass, setFadeClass] = React.useState('');

  const toggleOpen = () => {
    setOpen(true);
    setFadeClass('overlay-fade-in');

    // fade-out nakon 5 sekundi
    setTimeout(() => setFadeClass('overlay-fade-out'), 5000);
    // ukloni overlay iz DOM-a nakon 5.5s
    setTimeout(() => setOpen(false), 5500);
  };

  const cardStyle: React.CSSProperties = {
    backgroundColor: blockStyles?.blockBackground || 'rgba(20, 20, 28, 0.92)',
    width: '100%',
    height: 'auto',
    borderRadius: "15px",
  };

  const isFixedSmall = idx === 1 || idx === 2;

  if (!block) {
    const inlineAspect = isFixedSmall ? '1 / 1' :
      idx === 0 ? '9 / 16' :
      idx === 3 ? '16 / 9' : '1 / 1';

    return (
      <div
        key={`empty-${idx}`}
        className="cp-card group relative flex flex-col items-center justify-center overflow-hidden rounded-[15px] border-2 border-dashed border-white/8 bg-[rgba(12,12,16,0.6)] p-4"
        style={{ ...cardStyle, aspectRatio: inlineAspect }}
      >
        <div className="w-full h-full" />
      </div>
    );
  }

  const inlineAspect = isFixedSmall ? '1 / 1' : idx === 3 ? '16 / 9' : idx === 0 ? undefined : '1 / 1';
  const mergedStyle: React.CSSProperties = isFixedSmall
    ? { ...cardStyle, aspectRatio: '1 / 1' }
    : idx === 0
    ? { ...cardStyle, height: '100%' }
    : { ...cardStyle, aspectRatio: inlineAspect };

  return (
    <div
      key={block.id || `block-${idx}`}
      className="cp-card group relative overflow-hidden rounded-[15px] ring-1 ring-white/12 backdrop-blur-xl shadow-[0_16px_32px_rgba(8,8,12,0.45)]"
      style={mergedStyle}
      onClick={toggleOpen}
    >
      {/* IMAGE */}
      <div className="h-full w-full relative overflow-hidden">
        <Image
          src={block.imageFile}
          alt={block.title}
          className="w-full h-full object-cover"
          wrapperClassName="w-full h-full"
        />
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          className={`absolute top-0 left-0 p-4 bg-black/50 rounded-br-lg ${fadeClass}`}
          style={{ zIndex: 20 }}
        >
          <h3 style={{ fontSize: '18px', lineHeight: '22px', marginBottom: '8px', color: 'white', fontWeight: 'bold' }}>
            {block.title}
          </h3>
          <p style={{ fontSize: '14px', lineHeight: '18px', color: 'white' }}>
            {block.description}
          </p>
        </div>
      )}
    </div>
  );
};




  const slots = Array.from({ length: 6 }).map((_, i) => blocks[i]);

  return (
    <div className="pb-8">
      <div className="space-y-4">

        {/* TOP */}
        <div className="grid gap-4" style={{ gridTemplateColumns: '1fr 1fr' }}>
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
