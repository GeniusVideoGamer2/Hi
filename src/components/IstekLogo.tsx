import React from 'react';

interface IstekLogoProps {
  className?: string;
  size?: number;
  variant?: 'full' | 'icon' | 'badge';
  lightText?: boolean;
}

export const IstekLogo: React.FC<IstekLogoProps> = ({
  className = '',
  size = 28,
  variant = 'icon',
  lightText = true,
}) => {
  const brandBlue = lightText ? '#38bdf8' : '#005da8';
  const brandDarkBlue = lightText ? '#60a5fa' : '#0a58a1';
  const cyanHead = '#5ec6d0';
  const textPrimary = lightText ? '#ffffff' : '#005da8';
  const dividerColor = lightText ? 'rgba(255,255,255,0.4)' : '#005da8';

  if (variant === 'full') {
    return (
      <div className={`inline-flex items-center gap-3 select-none ${className}`}>
        {/* Full Official Logo Vector SVG */}
        <svg
          viewBox="0 0 280 75"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ height: size, width: 'auto' }}
          className="drop-shadow-sm"
        >
          {/* Symbol Above ISTEK */}
          <g transform="translate(10, 0)">
            {/* Person Head Dot */}
            <circle cx="48" cy="11" r="5" fill={cyanHead} />

            {/* Upper Chevron V */}
            <path
              d="M30 20 L48 30 L66 20 L62 16 L48 24 L34 16 Z"
              fill={brandBlue}
            />

            {/* Open Book Wings */}
            <path
              d="M26 29 C35 29 44 32 48 35 C52 32 61 29 70 29 C72 32 67 36 48 40 C29 36 24 32 26 29 Z"
              fill={brandDarkBlue}
            />
            <path
              d="M28 34 C36 34 44 36 48 39 C52 36 60 34 68 34 C69 36 65 39 48 43 C31 39 27 36 28 34 Z"
              fill={cyanHead}
              opacity="0.8"
            />

            {/* ISTEK Text */}
            <text
              x="48"
              y="68"
              textAnchor="middle"
              fill={textPrimary}
              fontSize="28"
              fontWeight="900"
              fontFamily="Times New Roman, Georgia, serif"
              letterSpacing="1.5"
            >
              İSTEK
            </text>
          </g>

          {/* Vertical Divider Line */}
          <line
            x1="122"
            y1="10"
            x2="122"
            y2="68"
            stroke={dividerColor}
            strokeWidth="2"
          />

          {/* Right Text: MERSIN / OKULLARI */}
          <g transform="translate(132, 0)">
            <text
              x="0"
              y="34"
              fill={textPrimary}
              fontSize="22"
              fontWeight="800"
              fontFamily="Times New Roman, Georgia, serif"
              letterSpacing="2"
            >
              MERSİN
            </text>
            <text
              x="0"
              y="62"
              fill={textPrimary}
              fontSize="22"
              fontWeight="800"
              fontFamily="Times New Roman, Georgia, serif"
              letterSpacing="1.5"
            >
              OKULLARI
            </text>
          </g>
        </svg>
      </div>
    );
  }

  // Icon / Badge Variant
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow"
      >
        {/* Subtle Background Ring/Shield */}
        <rect width="100" height="100" rx="22" fill={lightText ? '#0f172a' : '#ffffff'} />
        <rect x="2" y="2" width="96" height="96" rx="20" stroke={brandBlue} strokeWidth="2" opacity="0.3" />

        {/* Person / Head Circle */}
        <circle cx="50" cy="22" r="8" fill={cyanHead} />

        {/* Upper Chevron Wing */}
        <path
          d="M24 34 L50 48 L76 34 L70 28 L50 39 L30 28 Z"
          fill={brandBlue}
        />

        {/* Lower Open Book Wings */}
        <path
          d="M20 48 C34 48 45 52 50 57 C55 52 66 48 80 48 C82 52 75 58 50 65 C25 58 18 52 20 48 Z"
          fill={brandDarkBlue}
        />

        <path
          d="M23 55 C34 55 45 58 50 62 C55 58 66 55 77 55 C78 58 72 63 50 69 C28 63 22 58 23 55 Z"
          fill={cyanHead}
          opacity="0.85"
        />

        {/* Mini ISTEK Label */}
        <text
          x="50"
          y="90"
          textAnchor="middle"
          fill={textPrimary}
          fontSize="18"
          fontWeight="900"
          fontFamily="serif"
          letterSpacing="1"
        >
          İSTEK
        </text>
      </svg>
    </div>
  );
};

