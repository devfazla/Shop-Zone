import React, { useState, useEffect } from "react";
import { Package, ImageOff } from "lucide-react";

export const DEFAULT_PRODUCT_FALLBACK_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400" fill="none">
  <rect width="400" height="400" fill="#F8FAFC"/>
  <rect x="1" y="1" width="398" height="398" rx="16" stroke="#E2E8F0" stroke-width="2"/>
  <g transform="translate(160, 150)" stroke="#94A3B8" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" fill="none">
    <path d="M40 5L10 20L40 35L70 20L40 5Z" />
    <path d="M10 20V55L40 70V35" />
    <path d="M70 20V55L40 70" />
    <path d="M25 27.5L55 42.5" />
  </g>
  <text x="50%" y="255" text-anchor="middle" fill="#64748B" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="700" letter-spacing="0.5">
    ShopZone Curated
  </text>
  <text x="50%" y="278" text-anchor="middle" fill="#94A3B8" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="500">
    Preview Unavailable
  </text>
</svg>
`)}`;

export interface ImageWithFallbackProps extends React.ComponentPropsWithoutRef<"img"> {
  src?: string;
  alt?: string;
  className?: string;
  fallbackSrc?: string;
  fallbackText?: string;
  fallbackIcon?: React.ReactNode;
  width?: number | string;
  height?: number | string;
  referrerPolicy?: React.HTMLAttributeReferrerPolicy;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export default function ImageWithFallback({
  src,
  alt = "",
  className = "",
  fallbackSrc,
  fallbackText,
  fallbackIcon,
  onError,
  ...props
}: ImageWithFallbackProps) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      if (onError) {
        onError(e);
      }
    }
  };

  if (hasError || !src) {
    if (fallbackSrc && fallbackSrc !== src) {
      return (
        <img
          src={fallbackSrc}
          alt={alt || "Product image"}
          className={className}
          onError={() => setHasError(true)}
          referrerPolicy="no-referrer"
          {...props}
        />
      );
    }

    return (
      <div
        className={`flex flex-col items-center justify-center bg-slate-50 border border-slate-100 text-slate-400 select-none overflow-hidden ${className}`}
        role="img"
        aria-label={alt || "Image unavailable"}
      >
        {fallbackIcon ? (
          fallbackIcon
        ) : (
          <div className="flex flex-col items-center justify-center p-3 text-center">
            <Package className="h-6 w-6 sm:h-8 sm:w-8 text-slate-300 mb-1.5 animate-pulse" />
            <span className="text-[11px] font-bold text-slate-400 max-w-[90%] truncate">
              {fallbackText || alt || "ShopZone Item"}
            </span>
            <span className="text-[9px] font-semibold text-slate-300 uppercase tracking-widest mt-0.5">
              Curated Asset
            </span>
          </div>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={handleError}
      onLoad={() => setIsLoaded(true)}
      referrerPolicy="no-referrer"
      {...props}
    />
  );
}
