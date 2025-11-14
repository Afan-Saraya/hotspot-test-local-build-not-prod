import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Globe } from 'lucide-react';
import type { FooterIcon, FooterStyling } from '../../types/portalContent';

interface MobileFooterBarProps {
  icons: FooterIcon[];
  styles?: Partial<FooterStyling>;
}

export const MobileFooterBar: React.FC<MobileFooterBarProps> = ({ icons, styles }) => {
  if (!icons || icons.length === 0) return null;
  return (
    <div className="fixed left-1/2 -translate-x-1/2 bottom-0 w-full max-w-md border-t border-white/10 z-40" style={{ background: styles?.footerBackground || 'rgba(26,27,35,0.85)' }}>
      <nav className={`flex items-stretch justify-center mx-auto`}>
        <ul className="flex w-full justify-evenly py-1.5 px-2 gap-0.5">
          {icons.slice(0, 4).map((icon) => {
            // Check if icon is a URL (image path) or a Lucide icon name
            const isImageUrl = icon.icon.startsWith('/') || icon.icon.startsWith('http');
            const IconComponent = !isImageUrl ? ((LucideIcons as any)[icon.icon] || Globe) : null;
            
            return (
              <li key={icon.id} className="flex-1">
                <button
                  onClick={() => window.open(icon.url, '_blank')}
                  className="mx-auto flex items-center justify-center rounded-xl p-1.5 hover:bg-white/5 active:scale-95 transition-all"
                  style={{ color: styles?.iconColor || '#FFFFFF' }}
                >
                  <div className="size-8 rounded-full bg-white/10 grid place-items-center backdrop-blur-sm border border-white/10 shadow-[0_4px_12px_-4px_rgba(0,0,0,0.6)]">
                    {isImageUrl ? (
                      <img 
                        src={icon.icon} 
                        alt={icon.name}
                        className="w-5 h-5 object-contain"
                        style={{ filter: styles?.iconColor && styles.iconColor !== '#FFFFFF' ? `brightness(0) saturate(100%)` : 'none' }}
                      />
                    ) : IconComponent && (
                      <IconComponent className="w-4.5 h-4.5" style={{ color: styles?.iconColor || '#FFFFFF' }} />
                    )}
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="pb-[env(safe-area-inset-bottom)]" />
    </div>
  );
};
