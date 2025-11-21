import React, { useState } from 'react';
import { FiSearch, FiUser, FiVolume2, FiVolumeX, FiSettings } from 'react-icons/fi';
import type { QuickFunItem, LanguageCode } from '../../types/portalContent';
import { IoCloseCircleSharp } from "react-icons/io5";

interface FeaturedMediaLinkProps {
  item?: QuickFunItem;
  language: LanguageCode;
  title?: string;
  subtitle?: string;
}

export function FeaturedMediaLink({ item, language, title, subtitle }: FeaturedMediaLinkProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  if (!item) return null;

  const sectionTitle = title || (language === 'BA' ? item.titleBosnian : item.titleEnglish) || '';

  // MUTE TOGGLE
  const toggleMute = () => {
    const newState = !isMuted;
    setIsMuted(newState);

    // mutiraj sve audio i video elemente na stranici
    const media = document.querySelectorAll("audio, video");
    media.forEach((el: any) => {
      el.muted = newState;
    });
  };

  // Ako postoji samo jedan item, dodaj 5 hardkodiranih
  const launcherItems: QuickFunItem[] = item ? [
    item,
    {
      titleEnglish: 'Space Adventure',
      titleBosnian: 'Space Adventure',
      link: 'https://webgames.sarayasolutions.com/spaceA/',
      imageFile: '/assets/banners/game1.jpeg',
    }
  ] : [];

  return (
    <section className="featuredMedia px-6 mt-0 mb-12">
      <button
        style={{ borderRadius: '15px' }}
        onClick={() => setIsOpen(true)}
        className="w-full group overflow-hidden ring-1 ring-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl"
      >
        <div className="aspect-video w-full bg-black/30 overflow-hidden rounded-2xl">
          <img
            src='assets/banners/launcherbanner.jpg'
            alt='banner'
            style={{ borderRadius: '15px' }}
            className="block w-full h-full object-cover transform-gpu group-hover:scale-[1.02] transition-transform [backface-visibility:hidden]"
          />
        </div>
      </button>

      {isOpen && (
        <div style={{
          backdropFilter: 'blur(15px)',
          WebkitBackdropFilter: 'blur(15px)',
        }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">
          <div
            style={{ height: '100vh', display: 'flex', width: '100vw', marginTop: '1vh' }}
            className="relative bg-gray-50 dark:bg-gray-900 rounded-3xl shadow-2xl w-[100%] h-[100%] p-[10vh] overflow-y-auto flex flex-col"
          >

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-extrabold" style={{ marginLeft: '1vh' }}>Game Launcher</h2>
              <div className="flex space-x-4 text-2xl">

                <button
                  style={{ marginLeft: '10px' }}
                  onClick={() => setIsOpen(false)}
                  className="right-4 text-red-700 dark:text-red-200 font-bold hover:text-red-500 transition-colors"
                >
                  <IoCloseCircleSharp style={{ fontSize: '30px', borderRadius: '100%', marginRight: '1vh', position: 'relative' }} />
                </button>
              </div>
            </div>

            {/* Banner iznad grida (16:6) */}
<div
  style={{
    width: '100%',
    aspectRatio: '16 / 6',
    borderRadius: '20px',
    overflow: 'hidden',
    marginBottom: '24px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.25)',
    marginBottom:'25px'
  }}
>
  <img
    src="/assets/banners/launcherbanner.jpg" // PROMIJENI ako želiš drugu sliku
    alt="Top Banner"
    style={{
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    }}
  />
</div>


            {/* Grid s igrama 3x2 */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
                marginBottom: '24px',
              }}
            >
              {launcherItems.map((i, idx) => (
                <a
                  key={idx}
                  href={i.link}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '9vh',
                      height: '9vh',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    {i.imageFile && (
                      <img
                        src={i.imageFile}
                        alt={language === 'BA' ? i.titleBosnian : i.titleEnglish}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>
                  <span style={{ marginTop: '8px', fontSize: '14px', fontWeight: 500 }}>
                    {language === 'BA' ? i.titleBosnian : i.titleEnglish}
                  </span>
                </a>
              ))}
            </div>

            {/* Banner + prva igra preko cijelog reda */}
            {launcherItems[0] && (
              <>
                <div className="w-full h-40 sm:h-60 bg-gray-300 rounded-2xl flex items-center justify-center text-xl font-bold">
                  {language === 'BA' ? 'Upravo Objavljeno' : 'Fresh Drop'}
                </div>

                <a
                  href={launcherItems[0].link}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',
                    width: '100%',
                    marginBottom: '24px',
                    padding: '2vh',
                  }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '16vh',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
                      transition: 'transform 0.2s',
                    }}
                  >
                    {launcherItems[0].imageFile && (
                      <img
                        src={launcherItems[0].imageFile}
                        alt={language === 'BA' ? launcherItems[0].titleBosnian : launcherItems[0].titleEnglish}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    )}
                  </div>

                  <span style={{ marginTop: '8px', fontSize: '16px', fontWeight: 600 }}>
                    {language === 'BA' ? launcherItems[0].titleBosnian : launcherItems[0].titleEnglish}
                  </span>
                </a>
              </>
            )}

            {/* Footer */}
            <div
              className="flex justify-between items-center text-3xl"
              style={{ marginTop: 'auto', marginBottom: '2vh', marginLeft: '2vh', marginRight: '2vh' }}
            >
              <button onClick={toggleMute}>
                {isMuted ? (
                  <FiVolumeX className="cursor-pointer hover:text-gray-500 transition-colors" />
                ) : (
                  <FiVolume2 className="cursor-pointer hover:text-gray-500 transition-colors" />
                )}
              </button>

              <FiSettings className="cursor-pointer hover:text-gray-500 transition-colors" />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
