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
    if (!block) return null;
    const badge = badgePresets[idx % badgePresets.length];
    const overlay = overlayPresets[idx % overlayPresets.length];
    const hasCustomButton = Boolean(blockStyles?.buttonBackground);
    const buttonTextColor = blockStyles?.buttonTextColor || (hasCustomButton ? '#FFFFFF' : '#14141F');
    return (
      <div
        key={block.id || `block-tall-${idx}`}
        className={`block-tall-${idx} card-large group relative flex flex-col overflow-hidden rounded-2xl ring-1 ring-white/12 bg-[rgba(20,20,28,0.92)] backdrop-blur-xl shadow-[0_18px_42px_rgba(8,8,12,0.45)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(122,73,240,0.28)]`}
        style={{ backgroundColor: blockStyles?.blockBackground || 'rgba(20, 20, 28, 0.92)' }}
      >
        {/* Full-bleed image (no inner rounding or padding) */}
        <div className="img relative w-full overflow-hidden aspect-[3/4]">
          <Image src={block.imageFile} alt={block.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
          <div className="absolute top-3 left-3 flex items-center gap-2">
            <span className={`rounded-full bg-gradient-to-r ${badge.gradient} px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg`}>{badge.label}</span>
          </div>
        </div>
        {/* Content inset */}
        <div className="flex flex-1 flex-crow justify-between p-5" >
          <div className="space-y-2 px-1">
            <h3 className="text-base font-semibold leading-snug text-white p-2" style={{ color: blockStyles?.titleColor || '#F7F8FB' }}>{block.title}</h3>
            <p className="text-sm leading-relaxed text-white/80 line-clamp-3 p-2" style={{ color: blockStyles?.descriptionColor || 'rgba(240,240,245,0.82)', marginTop: '-20px' }}>{block.description}</p>
          </div>

          <div className="flex  justify-center pb-2" style={{marginRight:'15px'}}>
            <button
              className={`inline-flex items-center justify-center h-7 rounded-full px-6 text-[13px] font-semibold uppercase tracking-wide shadow-md transition-all active:scale-[0.97] ${hasCustomButton ? '' : 'bg-gradient-to-r from-[#7A49F0] via-[#8F59F4] to-[#C86BFA] text-white hover:shadow-purple-500/60'}`}
              style={{
                width: '64px',
                height: '28px',
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

  const renderSmallBlock = (block: BlockItem | undefined, idx: number) => {
    if (!block) return null;
    const badge = badgePresets[idx % badgePresets.length];
    const overlay = overlayPresets[idx % overlayPresets.length];
    const hasCustomButton = Boolean(blockStyles?.buttonBackground);
    const buttonTextColor = blockStyles?.buttonTextColor || (hasCustomButton ? '#FFFFFF' : '#14141F');
    return (
      <div
        key={block.id || `block-tall-${idx}`}
        className={`block-tall-${idx} card group relative flex flex-col overflow-hidden rounded-2xl ring-1 ring-white/12 bg-[rgba(20,20,28,0.92)] backdrop-blur-xl shadow-[0_18px_42px_rgba(8,8,12,0.45)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(122,73,240,0.28)]`}
        style={{ backgroundColor: blockStyles?.blockBackground || 'rgba(20, 20, 28, 0.92)' }}
      >
        {/* Full-bleed image (no inner rounding or padding) */}
        <div className="img relative w-full overflow-hidden aspect-[3/4]">
          <Image src={block.imageFile} alt={block.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
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

  return (
    <div className="pb-8">
      {hasBlocks ? (
        layoutStyle === 'masonry' ? (
          <div className="space-y-4">
            {Array.from({ length: Math.ceil(blocks.length / 3) }).map((_, groupIdx) => {
              const startIdx = groupIdx * 3;
              const block0 = blocks[startIdx];
              const block1 = blocks[startIdx + 1];
              const block2 = blocks[startIdx + 2];
              const isLeftTall = groupIdx % 2 === 0;
              return (
                <div key={`block-group-${groupIdx}`} className="grid gap-4" style={{ gridTemplateColumns: `repeat(${mobileColumns}, minmax(0, 1fr))` }}>
                  {isLeftTall ? (
                    <>
                      {renderTallBlock(block0, startIdx)}
                      <div className="space-y-4">
                        {renderSmallBlock(block1, startIdx + 1)}
                        {renderSmallBlock(block2, startIdx + 2)}
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-4">
                        {renderSmallBlock(block1, startIdx + 1)}
                        {renderSmallBlock(block2, startIdx + 2)}
                      </div>
                      {renderTallBlock(block0, startIdx)}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid gap-5" style={{ gridTemplateColumns: `repeat(${mobileColumns}, minmax(0, 1fr))` }}>
            {blocks.map((block, idx) => {
              const badge = badgePresets[idx % badgePresets.length];
              const overlay = overlayPresets[idx % overlayPresets.length];
              const hasCustomButton = Boolean(blockStyles?.buttonBackground);
              const buttonTextColor = blockStyles?.buttonTextColor || (hasCustomButton ? '#FFFFFF' : '#14141F');
              return (
                <div
                  key={block.id || `uniform-block-${idx}`}
                  className="group relative flex flex-col overflow-hidden rounded-2xl ring-1 ring-white/12 bg-[rgba(28,28,36,0.92)] backdrop-blur-xl shadow-[0_14px_32px_rgba(8,8,12,0.4)] transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_24px_56px_rgba(122,73,240,0.28)]"
                  style={{ backgroundColor: blockStyles?.blockBackground || 'rgba(28,28,36,0.92)' }}
                >
                  {/* Full-bleed image */}
                  <div className="relative w-full overflow-hidden aspect-[4/3]">
                    <Image src={block.imageFile} alt={block.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className={`absolute inset-0 bg-gradient-to-b ${overlay}`} />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className={`rounded-full bg-gradient-to-r ${badge.gradient} px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-white shadow-lg`}>{badge.label}</span>
                    </div>
                  </div>
                  {/* Content inset */}
                  <div className="flex flex-1 flex-col justify-between p-5">
                    <div className="space-y-2 px-1">
                      <h3 className="text-base font-semibold leading-snug text-white p-2" style={{ color: blockStyles?.titleColor || '#F7F8FB' }}>{block.title}</h3>
                      <p className="text-sm leading-relaxed text-white/80 line-clamp-3 p-2" style={{ color: blockStyles?.descriptionColor || 'rgba(240,240,245,0.82)', marginTop: '-20px' }}>{block.description}</p>
                    </div>

                    <div className="flex w-full justify-center">
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
            })}
          </div>
        )
      ) : (
        <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl bg-[#181924] text-white">
          <p className="text-lg font-semibold">{language === 'BA' ? 'Dodajte blokove u admin panelu' : 'Add blocks in the admin dashboard'}</p>
          <p className="mt-1 text-sm text-white/60">{language === 'BA' ? 'Trenutno nema dostupnih ponuda.' : 'There are no deals to show yet.'}</p>
        </div>
      )}
    </div>
  );
};
