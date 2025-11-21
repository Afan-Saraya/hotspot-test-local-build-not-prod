import React, { useEffect, useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import * as Icons from 'lucide-react';
import type { SectionsConfig, SectionStyle } from '../types/portalContent';
import { HeroVideoSection } from './captivePortal/HeroVideoSection';
import { HeroVideoSectionDesktop } from './captivePortal/HeroVideoSectionDesktop';
import { ChipsBar } from './captivePortal/ChipsBar';
import { FeaturedBanner } from './captivePortal/FeaturedBanner';
import { DealsSection } from './captivePortal/DealsSection';
import { RecommendedStrip } from './captivePortal/RecommendedStrip';
import { MobileFooterBar } from './captivePortal/MobileFooterBar';
import { EditorsPicks } from './captivePortal/EditorsPicks';
import { DiscoveryStrip } from './captivePortal/DiscoveryStrip';
import { FeaturedMediaLink } from './captivePortal/FeaturedMediaLink';
import { translations } from '../i18n/translations';
import { usePortalContentContext } from '../context/PortalContentContext';
import { CityUtilityDesktop } from './captivePortal/CityUtilityDesktop';
import { CityUtility } from './captivePortal/CityUtility';
import { DealsSectionDesktop } from './captivePortal/DealsSectionDesktop';

interface CaptivePortalContentProps { width: number; height: number; deviceName: string }

export function CaptivePortalContent({ width, height }: CaptivePortalContentProps) {
  const { language, setLanguage, content, isLoading, error, selectedVideo, selectedBanner, selectedBlockSet, chips, footer, global } = usePortalContentContext();
  const t = translations[language];

  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768); // <768px = mobitel
    checkIsMobile(); // inicijalna provjera
    window.addEventListener('resize', checkIsMobile); // automatski update kad se mijenja veličina prozora
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);


  // Fallback to empty structures if hook not yet loaded
  const blocks = selectedBlockSet?.blocks || [];
  const blockStyles = selectedBlockSet?.styling;
  // Recommended content fallback (admin-provided else fallback translations)
  const recommendedHeader = content?.recommendedOffers?.header?.[language] || t.recommendedHeader;
  const recommendedBadge = content?.recommendedOffers?.badge?.[language] || t.badge;
  const recommendedOffers = content?.recommendedOffers?.offers?.[language] || t.recommendedOffers;
  const layoutStyle: 'masonry' | 'grid' = content?.layout?.style || 'masonry';
  const mobileColumns = content?.layout?.mobileColumns ?? (width >= 340 ? 2 : 1);
  const badgePresets = language === 'BA'
    ? [
      { label: 'Novo', gradient: 'from-emerald-400/90 to-emerald-500/90' },
      { label: 'Popularno', gradient: 'from-fuchsia-400/90 to-purple-500/90' },
      { label: 'Akcija', gradient: 'from-sky-400/90 to-cyan-500/90' },
      { label: 'Ekskluzivno', gradient: 'from-amber-400/90 to-orange-500/90' }
    ]
    : [
      { label: 'New', gradient: 'from-emerald-400/90 to-emerald-500/90' },
      { label: 'Hot', gradient: 'from-fuchsia-400/90 to-purple-500/90' },
      { label: 'Sale', gradient: 'from-sky-400/90 to-cyan-500/90' },
      { label: 'Exclusive', gradient: 'from-amber-400/90 to-orange-500/90' }
    ];
  const overlayPresets = [
    'from-black/10 via-black/45 to-black/85',
    'from-black/5 via-[#1a1332]/55 to-[#06040f]/90',
    'from-[#041925]/25 via-[#061b36]/55 to-[#050711]/90',
    'from-[#1c041e]/20 via-[#220b2e]/55 to-[#07020f]/90'
  ];
  const footerStyles = footer?.styling;

  // Helper to render section header with admin-configurable styles
  const renderHeader = (
    key: keyof SectionsConfig,
    fallbackTitleEN: string,
    fallbackTitleBA: string,
    fallbackSubtitleEN?: string,
    fallbackSubtitleBA?: string,
    fallbackIcon?: string
  ) => {
    const cfg: SectionStyle | undefined = content?.sections?.[key];
    const title = (language === 'BA' ? cfg?.titleBosnian : cfg?.titleEnglish) || (language === 'BA' ? fallbackTitleBA : fallbackTitleEN);
    const subtitle = (language === 'BA' ? cfg?.subtitleBosnian : cfg?.subtitleEnglish) || (language === 'BA' ? fallbackSubtitleBA : fallbackSubtitleEN) || '';
    const IconComp = (cfg?.icon && (Icons as any)[cfg.icon]) || (fallbackIcon && (Icons as any)[fallbackIcon]) || null;
    const spacingTop = cfg?.spacingTop ?? 16;
    const spacingBottom = cfg?.spacingBottom ?? 8;
    const titleStyle = { color: cfg?.titleColor } as React.CSSProperties;
    const subtitleStyle = { color: cfg?.subtitleColor, backgroundImage: cfg?.subtitleGradient, WebkitBackgroundClip: cfg?.subtitleGradient ? 'text' : undefined, colorAdjust: undefined as any, WebkitTextFillColor: cfg?.subtitleGradient ? 'transparent' : undefined } as React.CSSProperties;
    return (
      <div className="renderHeader px-6" style={{ marginBottom: spacingBottom }}>
        <div className="mb-2 flex items-center gap-2">
          {IconComp && (
            <div className="relative">
              <div className="absolute -inset-1 rounded-xl bg-gradient-to-tr from-[#7A49F0]/30 via-[#1E6CFF]/20 to-transparent blur-sm" />
              <div className="relative h-8 w-8 rounded-lg bg-white/8 backdrop-blur-md flex items-center justify-center border border-white/15">
                <IconComp className="icon text-white" />
              </div>
            </div>
          )}
          <div className="flex flex-col">
            <h2 className="text-base font-semibold font-sans mb-0.5" style={{ ...titleStyle, fontSize: '1.5vh' }}>{title}</h2>
            {subtitle && (
              <p className="text-[11px] text-white/60" style={{ ...subtitleStyle, fontSize: '1.2vh' }}>{subtitle}</p>
            )}
          </div>
        </div>
        {cfg?.showDivider && (
          <div className="h-px w-full opacity-60" style={{ background: cfg.subtitleGradient || 'linear-gradient(90deg, rgba(122,73,240,.6), rgba(30,108,255,.6))' }} />
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center text-white" style={{ width, height, backgroundColor: global?.backgroundColor || '#0E0F13' }}>
        <span className="text-sm opacity-70">Loading content…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-white" style={{ width, height, backgroundColor: global?.backgroundColor || '#0E0F13' }}>
        <span className="text-sm opacity-70">Failed to load content.</span>
        <span className="text-xs opacity-50">{error}</span>
      </div>
    );
  }

  return (
    <div className="relative text-white overflow-x-hidden overflow-y-auto pb-28" style={{ width: `${width}px`, height: `${height}px`, maxWidth: '100vw', backgroundColor: global?.backgroundColor || '#0E0F13' }}>
      {/* 1. Hero Video */}
      {isMobile ?
        <HeroVideoSection
          width={width}
          selectedVideo={selectedVideo}
          language={language}
          onLanguageToggle={setLanguage}
          backgroundColor={global?.backgroundColor || '#0E0F13'}
        />
        :
        <HeroVideoSectionDesktop
          width={width}
          selectedVideo={selectedVideo}
          language={language}
          onLanguageToggle={setLanguage}
          backgroundColor={global?.backgroundColor || '#0E0F13'}
          banner={selectedBanner}
        />
      }

      {/* 2. Explore Our Platforms (Chips) */}
      {renderHeader('chips', 'Explore Our Platforms', 'Istraži Naše Platforme', 'Quick access to core destinations', 'Brzi pristup ključnim destinacijama', 'LayoutGrid')}
      <section className="px-1 pt-2 pb-4">
        <ChipsBar chips={chips} language={language} />
      </section>

      {/* 3. Hero Banner Ad */}
      {isMobile &&
        <FeaturedBanner banner={selectedBanner} language={language} />
      }

      {/* 4. City Utility */}
      {renderHeader('cityUtility', 'City Utility', 'Gradski Servisi', 'Weather, local time & currency', 'Vrijeme, lokalno vrijeme i kursne liste', 'CloudSun')}
      {isMobile ?
        <CityUtility title={language === 'BA' ? (content?.sections?.cityUtility?.titleBosnian || 'Gradski Servisi') : (content?.sections?.cityUtility?.titleEnglish || 'City Utility')} subtitle={language === 'BA' ? content?.sections?.cityUtility?.subtitleBosnian || 'Vrijeme, lokalno vrijeme i kursne liste' : content?.sections?.cityUtility?.subtitleEnglish || 'Weather, local time & currency'} language={language as any} config={content?.utilities} />
        :
        <CityUtilityDesktop title={language === 'BA' ? (content?.sections?.cityUtility?.titleBosnian || 'Gradski Servisi') : (content?.sections?.cityUtility?.titleEnglish || 'City Utility')} subtitle={language === 'BA' ? content?.sections?.cityUtility?.subtitleBosnian || 'Vrijeme, lokalno vrijeme i kursne liste' : content?.sections?.cityUtility?.subtitleEnglish || 'Weather, local time & currency'} language={language as any} config={content?.utilities} />
      }
      {/* 5. Today’s Recommended Listings (Deals) */}
      {renderHeader('deals', "Today's Recommended Listings", 'Današnje Preporuke', 'Rotated offers from partners', 'Rotirane ponude iz partnera', 'ShoppingBag')}

      {isMobile ? (
        // 👉 MOBILNI — ostaje sve po starom
        <>
          <section className="px-6 dealsSection">
            <DealsSection
              blocks={blocks}
              blockStyles={blockStyles}
              layoutStyle={layoutStyle}
              mobileColumns={mobileColumns}
              badgePresets={badgePresets}
              overlayPresets={overlayPresets}
              language={language}
            />
          </section>{renderHeader(
            'editorsPicks',
            "Pametno Odabrano: Editor's Picks",
            'Pametno Odabrano: Odabir Urednika',
            'Curated quality content',
            'Kvalitetan odabir sadržaja',
            'BookOpen'
          )}
          <EditorsPicks
            title={language === 'BA'
              ? (content?.sections?.editorsPicks?.titleBosnian || 'Pametno Odabrano: Odabir Urednika')
              : (content?.sections?.editorsPicks?.titleEnglish || "Pametno Odabrano: Editor's Picks")}
            subtitle={language === 'BA'
              ? (content?.sections?.editorsPicks?.subtitleBosnian || 'Kvalitetan odabir sadržaja')
              : (content?.sections?.editorsPicks?.subtitleEnglish || 'Curated quality content')}
            items={content?.editorsPicks || []}
            language={language}
            count={3}
          />

          {/* Discovery Strip */}
          {renderHeader(
            'discovery',
            'Sarajevo Discovery',
            'Otkrij Sarajevo',
            'Highlighted places for today',
            'Izdvojena mjesta za danas',
            'MapPin'
          )}
          <DiscoveryStrip
            title={language === 'BA'
              ? (content?.sections?.discovery?.titleBosnian || 'Otkrij Sarajevo')
              : (content?.sections?.discovery?.titleEnglish || 'Sarajevo Discovery')}
            subtitle={language === 'BA'
              ? (content?.sections?.discovery?.subtitleBosnian || 'Izdvojena mjesta za danas')
              : (content?.sections?.discovery?.subtitleEnglish || 'Highlighted places for today')}
            places={content?.discovery?.places || []}
            language={language}
            count={3}
          />
        </>

      ) : (
        // 👉 DESKTOP + TABLET — GRID 2 KOLONE
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-6" style={{ marginLeft: '30vh', marginRight: '30vh' }}>

          {/* Lijeva kolona */}
          <div>
            <DealsSection
              blocks={blocks}
              blockStyles={blockStyles}
              layoutStyle={layoutStyle}
              mobileColumns={mobileColumns}
              badgePresets={badgePresets}
              overlayPresets={overlayPresets}
              language={language}
            />
          </div>

          {/* Desna kolona */}
          <div className="flex flex-col gap-10">

            {/* Editors Picks */}
            <div style={{ marginLeft: '-30vh', width: '100vh',marginTop:'-7vh' }}>
              {renderHeader(
                'editorsPicks',
                "Pametno Odabrano: Editor's Picks",
                'Pametno Odabrano: Odabir Urednika',
                'Curated quality content',
                'Kvalitetan odabir sadržaja',
                'BookOpen'
              )}
            </div>
            <EditorsPicks
              title={language === 'BA'
                ? (content?.sections?.editorsPicks?.titleBosnian || 'Pametno Odabrano: Odabir Urednika')
                : (content?.sections?.editorsPicks?.titleEnglish || "Pametno Odabrano: Editor's Picks")}
              subtitle={language === 'BA'
                ? (content?.sections?.editorsPicks?.subtitleBosnian || 'Kvalitetan odabir sadržaja')
                : (content?.sections?.editorsPicks?.subtitleEnglish || 'Curated quality content')}
              items={content?.editorsPicks || []}
              language={language}
              count={3}
            />

            {/* Discovery Strip */}
            <div style={{ marginLeft: '-30vh', width: '100vh' }}>
              {renderHeader(
                'discovery',
                'Sarajevo Discovery',
                'Otkrij Sarajevo',
                'Highlighted places for today',
                'Izdvojena mjesta za danas',
                'MapPin'
              )}
            </div>
            <DiscoveryStrip
              title={language === 'BA'
                ? (content?.sections?.discovery?.titleBosnian || 'Otkrij Sarajevo')
                : (content?.sections?.discovery?.titleEnglish || 'Sarajevo Discovery')}
              subtitle={language === 'BA'
                ? (content?.sections?.discovery?.subtitleBosnian || 'Izdvojena mjesta za danas')
                : (content?.sections?.discovery?.subtitleEnglish || 'Highlighted places for today')}
              places={content?.discovery?.places || []}
              language={language}
              count={3}
            />
            <div style={{ marginLeft: '-30vh', width: '100vh' }}>
              {renderHeader('quickFun', 'Quick Fun', 'Brza Zabava', 'Play instantly – no signup', 'Igraj odmah – bez registracije', 'Gamepad2')}
            </div>
            <FeaturedMediaLink item={content?.quickFun} language={language as any} />
          </div>
        </div>
      )}


      {/* 8. Quick Fun */}
      {isMobile &&
        <>
          {renderHeader('quickFun', 'Quick Fun', 'Brza Zabava', 'Play instantly – no signup', 'Igraj odmah – bez registracije', 'Gamepad2')}
          <FeaturedMediaLink item={content?.quickFun} language={language as any} />
        </>
      }

      {/* Spacer equal to footer height to prevent overlap */}
      <div className="h-20" />

      {/* 9. Footer */}
      <div className="mt-3" />
      <MobileFooterBar icons={footer?.icons || []} styles={footerStyles} />
      
    </div>
  );
}
