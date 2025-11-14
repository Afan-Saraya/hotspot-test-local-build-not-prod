import type { LanguageCode } from '../types/portalContent';

export type Translations = Record<LanguageCode, {
  recommendedHeader: string;
  recommendedOffers: Array<{ title: string; subtitle: string; distance: string }>;
  badge: string;
}>;

export const translations: Translations = {
  BA: {
    recommendedHeader: 'Preporučeno za vas u blizini',
    recommendedOffers: [
      { title: 'Restoran Harmony', subtitle: 'Popust 20%', distance: '50m' },
      { title: 'Tech Store BH', subtitle: 'Besplatna dostava', distance: '120m' },
      { title: 'Cafe Central', subtitle: 'Kupi 2 dobiješ 1', distance: '80m' },
      { title: 'VR Gaming Zone', subtitle: 'Grupne sesije', distance: '200m' }
    ],
    badge: 'U blizini'
  },
  EN: {
    recommendedHeader: 'Recommended for you nearby',
    recommendedOffers: [
      { title: 'Harmony Restaurant', subtitle: '20% discount', distance: '50m' },
      { title: 'Tech Store BH', subtitle: 'Free shipping', distance: '120m' },
      { title: 'Cafe Central', subtitle: 'Buy 2 get 1 free', distance: '80m' },
      { title: 'VR Gaming Zone', subtitle: 'Group sessions', distance: '200m' }
    ],
    badge: 'Nearby'
  }
};

export function detectLanguage(): LanguageCode {
  const browserLang = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en';
  if (browserLang.startsWith('bs') || browserLang.startsWith('sr') || browserLang.startsWith('hr')) return 'BA';
  return 'EN';
}
