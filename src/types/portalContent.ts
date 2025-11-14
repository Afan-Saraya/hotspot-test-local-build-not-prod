// Strong TypeScript types for portal content structure
export type LanguageCode = 'BA' | 'EN';

export interface HeroVideo {
  id: string;
  videoFile: string;
  thumbnail: string;
  titleBosnian: string;
  titleEnglish: string;
  subtitleBosnian?: string;
  subtitleEnglish?: string;
  buttonTextBosnian: string;
  buttonTextEnglish: string;
  buttonLink: string;
  titleColor: string;
  subtitleBg?: string;
  subtitleColor?: string;
  buttonBackground: string;
  buttonTextColor: string;
}

export interface HeroBanner {
  id: string;
  imageFile: string;
  titleBosnian: string;
  titleEnglish: string;
  subtitleBosnian: string;
  subtitleEnglish: string;
  buttonTextBosnian: string;
  buttonTextEnglish: string;
  buttonLink: string;
  titleColor: string;
  subtitleColor: string;
  buttonBackground: string;
  buttonTextColor: string;
}

export interface BlockItem {
  id: string;
  imageFile: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

export interface BlockSetStyling {
  blockBackground: string;
  titleColor: string;
  descriptionColor: string;
  buttonBackground: string;
  buttonTextColor: string;
}

export interface BlockSet {
  id: string;
  blocks: BlockItem[];
  styling: BlockSetStyling;
}

export interface ChipItem {
  id: string;
  nameBosnian: string;
  nameEnglish: string;
  icon: string; // could be lucide icon name or image path
  link: string;
}

export interface ChipsStyles {
  chipBackground: string;
  chipTextColor: string;
  chipActiveBackground: string;
  chipActiveTextColor: string;
}

export interface FooterIcon {
  id: string;
  name: string;
  url: string;
  icon: string; // lucide icon name
}

export interface FooterStyling {
  footerBackground: string;
  iconColor: string;
  textColor: string;
}

export interface RecommendedOffersContent {
  header: Record<LanguageCode, string>;
  badge: Record<LanguageCode, string>;
  offers: Record<LanguageCode, Array<{ title: string; subtitle: string; distance: string }>>;
}

// New content types for City Utility, Editor's Picks, Discovery, and Quick Fun
export interface UtilitiesConfig {
  city: string;
  lat: number;
  lon: number;
  baseCurrency: string; // e.g., 'EUR'
  targetCurrencies: string[]; // e.g., ['BAM','USD']
  timezone?: string; // IANA timezone, e.g., 'Europe/Sarajevo'
}

export interface EditorsPickItem {
  id: string;
  titleBosnian: string;
  titleEnglish: string;
  teaserBosnian?: string;
  teaserEnglish?: string;
  imageFile: string;
  link: string;
}

export interface DiscoveryPlaceItem {
  id: string;
  nameBosnian: string;
  nameEnglish: string;
  categoryBosnian?: string;
  categoryEnglish?: string;
  imageFile: string;
  link: string;
}

export interface QuickFunItem {
  titleBosnian?: string;
  titleEnglish?: string;
  subtitleBosnian?: string;
  subtitleEnglish?: string;
  imageFile: string; // 16:9 preferred
  link: string;
}

// Section header and style controls (admin configurable)
export interface SectionStyle {
  titleBosnian?: string;
  titleEnglish?: string;
  subtitleBosnian?: string;
  subtitleEnglish?: string;
  icon?: string; // lucide icon name
  showDivider?: boolean;
  // CSS gradient string for subtitle text, e.g., 'linear-gradient(90deg, #7A49F0, #C86BFA)'
  subtitleGradient?: string;
  titleColor?: string;
  subtitleColor?: string;
  spacingTop?: number; // px
  spacingBottom?: number; // px
}

export interface SectionsConfig {
  chips?: SectionStyle;
  cityUtility?: SectionStyle;
  deals?: SectionStyle;
  editorsPicks?: SectionStyle;
  discovery?: SectionStyle;
  quickFun?: SectionStyle;
}

export interface PortalContent {
  global?: {
    backgroundColor: string;
    primaryColor: string;
    secondaryColor: string;
  };
  heroVideos?: HeroVideo[];
  heroBanners?: HeroBanner[];
  blockSets?: BlockSet[];
  chips?: ChipItem[];
  chipsStyles?: ChipsStyles;
  footer?: {
    icons: FooterIcon[];
    styling: FooterStyling;
  };
  layout?: {
    style?: 'masonry' | 'grid';
    mobileColumns?: number;
  };
  recommendedOffers?: RecommendedOffersContent;
  // New sections
  utilities?: UtilitiesConfig;
  editorsPicks?: EditorsPickItem[];
  discovery?: { places: DiscoveryPlaceItem[] };
  quickFun?: QuickFunItem;
  sections?: SectionsConfig;
}

export interface RotatedPortalContentResult {
  content: PortalContent | null;
  isLoading: boolean;
  error: string | null;
  selectedVideo?: HeroVideo;
  selectedBanner?: HeroBanner;
  selectedBlockSet?: BlockSet;
  chips: ChipItem[];
  footer?: PortalContent['footer'];
  global?: PortalContent['global'];
}
