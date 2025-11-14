import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Image } from '../Image';
import type { HeroBanner, LanguageCode } from '../../types/portalContent';

interface FeaturedBannerProps {
  banner?: HeroBanner | null;
  language: LanguageCode;
}

export const FeaturedBanner: React.FC<FeaturedBannerProps> = ({ banner, language }) => {
  if (!banner) return null;
  return (
    <div className="featuredBanner px-6 pb-1 relative rounded-3xl">
      
        <div
          className="relative w-full  overflow-hidden rounded-3xl shadow-xl border border-white/10 bg-black/40"
          style={{ height: '40vh', WebkitMaskImage: 'radial-gradient(circle, black 99%, transparent 100%)',borderRadius:'20px' }}
        >
          <Image
            src={banner.imageFile}
            alt={banner[language === 'BA' ? 'titleBosnian' : 'titleEnglish']}
            className="absolute inset-0 w-full h-full object-cover object-center"
            style={{ borderRadius: '20px' }}
          />
          <div className="absolute inset-0 rounded-[2008px] bg-gradient-to-br from-black/80 via-black/30 to-black/70 pointer-events-none" />
          <div  className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(122,73,240,0.35),transparent_60%)]" />
          <div className="absolute bottom-0 left-0 right-0 pb-4 px-4">
            <div className="rounded-xl bg-white/10 backdrop-blur-md border border-red/15 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] px-4 pt-3 pb-3 space-y-1">
              <div className="flex items-center gap-1">
                <span style={{ padding:'0.7vh', paddingLeft: '11px',paddingRight:'11px' ,fontSize:'1.1vh', borderRadius:'12px' }} className="inline-flex items-center gap-1 rounded-full bg-white/12 backdrop-blur-sm px-3 py-1.5 text-[10px] leading-none font-semibold tracking-wide border border-white/25 text-white shadow-inner whitespace-nowrap">
                  {language === 'BA' ? 'NOVO' : 'NEW'}
                </span>
                <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#7A49F0] to-[#C86BFA] animate-pulse" />
              </div>
              <h3
                className="text-base font-bold leading-snug font-sans drop-shadow-sm"
                style={{ color: banner.titleColor,marginBottom:'0vh', fontSize:'2vh' }}
              >
                {banner[language === 'BA' ? 'titleBosnian' : 'titleEnglish']}
              </h3>
              <p
                className="text-[11px] leading-relaxed line-clamp-3 text-white/85"
                style={{ color: banner.subtitleColor,fontSize:'1.6vh',marginBottom:'1vh' }}
              >
                {banner[language === 'BA' ? 'subtitleBosnian' : 'subtitleEnglish']}
              </p>
              <div className="pt-1">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    banner.buttonLink && window.open(banner.buttonLink, '_blank');
                  }}
                  className="inline-flex items-center gap-1 rounded-full px-6 py-2.5 min-h-[44px] text-[13px] font-semibold uppercase tracking-wide whitespace-nowrap bg-gradient-to-r from-[#7A49F0] via-[#8F59F4] to-[#C86BFA] text-white shadow-md hover:shadow-purple-500/50 active:scale-95 transition-all"
                  style={{ paddingTop: "0.7vh", paddingBottom: "0.9vh", background: banner.buttonBackground, color: banner.buttonTextColor, fontSize:'2vh' }}
                >
                  <span className="px-0.5">{banner[language === 'BA' ? 'buttonTextBosnian' : 'buttonTextEnglish']}</span>
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      
      {/* Bouncing arrow removed */}
    </div>
  );
};
