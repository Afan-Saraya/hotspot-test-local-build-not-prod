import React, { useState } from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallback?: string;
  /** CSS classes applied to the wrapper div (optional). Use `className` to style the actual <img>. */
  wrapperClassName?: string;
}

/**
 * Simple image component with loading state and error handling
 * - Shows skeleton loader while loading
 * - Fades in smoothly when loaded
 * - Shows fallback or placeholder on error
 * - Lazy loads by default for performance
 */
export function Image({ src, alt, fallback, className, wrapperClassName, style, ...props }: ImageProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  const handleLoad = () => setStatus('loaded');
  const handleError = () => setStatus('error');

  return (
    <div className={`relative inline-block overflow-hidden ${wrapperClassName || ''}`} style={style}>
      {/* Loading skeleton */}
      {status === 'loading' && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-700 via-gray-600 to-gray-700 animate-pulse" />
      )}

      {/* Error state */}
      {status === 'error' ? (
        fallback ? (
          <img
            src={fallback}
            alt={alt}
            className={`w-full h-full ${className || 'object-cover'}`}
            {...props}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
            <div className="text-center text-white/60 p-2">
              <svg className="w-8 h-8 mx-auto mb-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span className="text-xs">Image unavailable</span>
            </div>
          </div>
        )
      ) : (
        <img
          src={src}
          alt={alt}
          className={`w-full h-full ${className || 'object-cover'} transition-opacity duration-300 ${
            status === 'loaded' ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          onError={handleError}
          loading="lazy"
          {...props}
        />
      )}
    </div>
  );
}
