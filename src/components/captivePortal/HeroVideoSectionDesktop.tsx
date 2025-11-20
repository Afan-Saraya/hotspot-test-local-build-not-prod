import React from 'react';
import { ChevronRight, Wifi } from 'lucide-react';
import type { HeroVideo, LanguageCode } from '../../types/portalContent';
import { FeaturedBannerDesktop } from './FeaturedBannerDesktop';

interface HeroVideoSectionDesktopProps {
  width: number;
  selectedVideo?: HeroVideo | null;
  language: LanguageCode;
  onLanguageToggle: (lang: LanguageCode) => void;
  backgroundColor?: string;
  banner?: any
}

export const HeroVideoSectionDesktop: React.FC<HeroVideoSectionDesktopProps> = ({
  width,
  selectedVideo,
  language,
  onLanguageToggle,
  backgroundColor = '#0E0F13',
  banner
}) => {

  return (
    <div style={{ display: 'flex', flexDirection: 'row', gap: '10px' }}>
      <div
        className="relative overflow-hidden"
        style={{ backgroundColor, width: '90vw' }}
      >
        {/* Video */}
        <div className="absolute inset-0 w-full h-full z-0">
          <video
            style={{ borderTopRightRadius:'10px',borderBottomRightRadius:'10px' }}
            key={selectedVideo?.videoFile || 'default-video'}
            className="w-full h-full object-cover bg-black block"
            autoPlay
            muted
            loop
            playsInline
            poster={selectedVideo?.thumbnail || '/assets/video/hero-poster.jpg'}
          >
            <source src={selectedVideo?.videoFile || '/assets/video/hero.mp4'} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Readability gradients */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/75 via-black/30 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-black/85 via-black/50 to-transparent z-10" />

        {/* Top Bar 
        <div className="absolute top-0 left-0 right-0 z-20 top-bar">
          <div className="flex justify-between items-center px-6 pt-4 pb-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center shadow-lg iconBackground">
                <Wifi className="w-5 h-5 text-white icon" />
              </div>
              <span className="font-bold text-white drop-shadow-sm font-sans">Saraya Connect</span>
            </div>
            <div className="flex items-center gap-1 bg-white/20 backdrop-blur-sm rounded-full p-1 shadow-lg lanBackground">
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm transition-colors ${language === 'BA' ? 'bg-white text-[#7A49F0]' : 'text-white/90 hover:bg-white/10'}`}
                onClick={() => onLanguageToggle('BA')}
              >
                BA
              </button>
              <button
                className={`px-3 py-1 rounded-full text-sm font-medium shadow-sm transition-colors ${language === 'EN' ? 'bg-white text-[#7A49F0]' : 'text-white/90 hover:bg-white/10'}`}
                onClick={() => onLanguageToggle('EN')}
              >
                EN
              </button>
            </div>
          </div>
        </div>
        */}

        {/* Bottom Content */}
        <div style={{display:'flex'}} className="bottomContent absolute bottom-0 left-0 right-0 z-20 px-6 pb-4 md:pb-6 text-left">
          <div>
          <div style={{marginBottom:'-2px', fontSize:'1.5vh'}}  className="offer inline-flex items-center rounded-full bg-white/18 py-1 text-[8px] font-medium uppercase tracking-wide backdrop-blur-md">
            {language === 'BA' ? '🔥 Specijalna Ponuda' : '🔥 Special Offer'}
          </div>
          <h1
            className="max-w-xs font-sans font-bold leading-snug drop-shadow-2xl"
            style={{
              color: selectedVideo?.titleColor || '#FFFFFF', fontSize: '3vh', marginBottom: '4px'
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
          <div className="flex" style={{marginLeft:'auto',marginTop:'auto',marginBottom:'1.3vh'}}>
            <button
              onClick={() => window.open(selectedVideo?.buttonLink || 'https://halvooo.com', '_blank')}
              className="inline-flex items-center gap-1 rounded-full px-6 py-2.5 min-h-[44px] text-[13px] font-semibold uppercase tracking-wide whitespace-nowrap bg-gradient-to-r from-[#7A49F0] via-[#8F59F4] to-[#C86BFA] text-white shadow-md hover:shadow-purple-500/50 active:scale-95 transition-all"
              style={{
                paddingTop: '0.7vh',
                paddingBottom: '0.9vh',
                background: selectedVideo?.buttonBackground || 'linear-gradient(90deg,#7A49F0,#C86BFA)',
                color: selectedVideo?.buttonTextColor || '#FFFFFF',
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
      <FeaturedBannerDesktop banner={banner} language={language} />
    </div>
  );
};

