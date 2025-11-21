import React from 'react';
import { ChevronRight, Wifi } from 'lucide-react';
import type { HeroVideo, LanguageCode } from '../../types/portalContent';

interface HeroVideoSectionProps {
  width: number;
  selectedVideo?: HeroVideo | null;
  language: LanguageCode;
  onLanguageToggle: (lang: LanguageCode) => void;
  backgroundColor?: string;
}

export const HeroVideoSection: React.FC<HeroVideoSectionProps> = ({
  width,
  selectedVideo,
  language,
  onLanguageToggle,
  backgroundColor = '#0E0F13'
}) => {
  return (
    <div
      className="relative overflow-hidden video-hero"
      style={{ backgroundColor }}
    >
      {/* Wrapper koji osigurava 16:9 */}
      <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
        {/* Video */}
        <video
          key={selectedVideo?.videoFile || 'default-video'}
          className="absolute top-0 left-0 w-full h-full object-cover bg-black block"
          autoPlay
          muted
          loop
          playsInline
          poster={selectedVideo?.thumbnail || '/assets/video/hero-poster.jpg'}
        >
          <source src={selectedVideo?.videoFile || '/assets/video/hero.mp4'} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Readability gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/75 via-black/30 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/85 via-black/50 to-transparent z-10" />

        {/* Bottom Content */}
        <div style={{ display: 'flex', height:'8vh' }} className="bottomContent absolute bottom-0 left-0 right-0 z-20 px-6 pb-0 md:pb-6 text-left">
          <div style={{ marginTop:'auto', marginBottom:'auto'}}>
            <div style={{margin:'-2px',fontSize:'10px'}} className="offer inline-flex items-center rounded-full bg-white/18 font-medium uppercase tracking-wide backdrop-blur-md">
              {/*
              {language === 'BA' ? '🔥 Specijalna Ponuda' : '🔥 Special Offer'}
              */}
            </div>
            <h1
              className="max-w-xs font-sans font-bold leading-snug drop-shadow-2xl"
              style={{
                color: selectedVideo?.titleColor || '#FFFFFF', fontSize: '1.5vh', marginBottom: '4px'
              }}
            >
              {(
                (selectedVideo?.[language === 'BA' ? 'titleBosnian' : 'titleEnglish']
                  || (language === 'BA' ? 'POVEŽI SE IISTRAŽI PONUDE' : 'CONNECT AND EXPLORE OFFERS')
                )
                .replace(/\s*\n\s*/g, ' ')
              )}
            </h1>
          </div>
          <div className="flex" style={{ marginLeft: 'auto', marginTop:'auto', marginBottom:'auto'}}>
            <button
              onClick={() => window.open(selectedVideo?.buttonLink || 'https://halvooo.com', '_blank')}
              className="inline-flex items-center gap-1 rounded-full min-h-[44px] text-[13px] font-semibold uppercase tracking-wide whitespace-nowrap bg-gradient-to-r from-[#7A49F0] via-[#8F59F4] to-[#C86BFA] text-white shadow-md hover:shadow-purple-500/50 active:scale-95 transition-all"
              style={{
                height: '27px',
                width: '62px',
                padding: '12px',
                paddingLeft:'24px',
                background: selectedVideo?.buttonBackground || 'linear-gradient(90deg,#7A49F0,#C86BFA)',
                color: selectedVideo?.buttonTextColor || '#FFFFFF',
                fontSize: '20px',
                marginTop: 'auto',
                marginBottom: 'auto'
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
