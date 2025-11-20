import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Image } from '../Image';
import type { HeroBanner, LanguageCode } from '../../types/portalContent';

interface FeaturedBannerDesktopProps {
  banner?: HeroBanner | null;
  language: LanguageCode;
}

export const FeaturedBannerDesktop: React.FC<FeaturedBannerDesktopProps> = ({ banner, language }) => {
  if (!banner) return null;

  return (
    <div className="FeaturedBannerDesktop rounded-3xl"style={{ borderTopLeftRadius: '10px',width:'30vw'}}>
      {/* Slika */}
      <Image
        style={{ borderTopLeftRadius: '10px'}}
        src={banner.imageFile}
        alt={banner[language === 'BA' ? 'titleBosnian' : 'titleEnglish']}
        className="w-auto h-auto object-cover object-center rounded-3xl"
      />

      {/* Tekst ispod slike */}
      <div style={{ marginTop: '-4px', borderBottomLeftRadius: '10px' ,paddingBottom:'16px' }} className="bg-white/10 backdrop-blur-md border border-red/15 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.6)] px-4  pb-3 space-y-2">
        <div className="flex items-center gap-1">
          <div className="h-1 w-1 rounded-full bg-gradient-to-r from-[#7A49F0] to-[#C86BFA] animate-pulse" />
        </div>

        <div style={{ display: 'flex' }}>
          <div style={{display:'flex',flexDirection:'column'}}>
            <h3
              className="text-base font-bold leading-snug font-sans drop-shadow-sm"
              style={{ color: banner.titleColor, fontSize: '2vh',marginTop:'auto',marginBottom:'auto' }}
            >
              {banner[language === 'BA' ? 'titleBosnian' : 'titleEnglish']}
            </h3>

            <p
              className="text-[11px] leading-relaxed text-white/85"
              style={{ color: banner.subtitleColor, fontSize: '1.6vh' }}
            >
              {banner[language === 'BA' ? 'subtitleBosnian' : 'subtitleEnglish']}
            </p>
          </div>
          <div style={{ display: 'flex',marginTop:'auto',marginBottom:'auto',marginLeft:'auto' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                banner.buttonLink && window.open(banner.buttonLink, '_blank');
              }}
              className="inline-flex items-center gap-1 rounded-full px-6 py-2.5 min-h-[44px] text-[13px] font-semibold uppercase tracking-wide whitespace-nowrap bg-gradient-to-r from-[#7A49F0] via-[#8F59F4] to-[#C86BFA] text-white shadow-md hover:shadow-purple-500/50 active:scale-95 transition-all"
              style={{
                paddingTop: '0.7vh',
                paddingBottom: '0.9vh',
                background: banner.buttonBackground,
                color: banner.buttonTextColor,
                fontSize: '2vh',
                marginTop:'auto',
                marginBottom:'auto',
                marginLeft:'auto'
              }}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
