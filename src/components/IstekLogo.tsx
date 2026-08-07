import React from 'react';

interface IstekLogoProps {
  className?: string;
  size?: number;
}

export const IstekLogo: React.FC<IstekLogoProps> = ({ className = '', size = 24 }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          <linearGradient id="istekGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f97316" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#ea580c" />
          </linearGradient>
          <linearGradient id="istekInner" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fed7aa" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Outer Shield Crest */}
        <path
          d="M50 8 L85 24 V52 C85 72 69 88 50 94 C31 88 15 72 15 52 V24 L50 8 Z"
          fill="url(#istekGrad)"
          filter="url(#glow)"
        />

        {/* Inner Stylized 'I' & Flame Motif */}
        <path
          d="M42 30 H58 V36 H53 V64 H58 V70 H42 V64 H47 V36 H42 V30 Z"
          fill="url(#istekInner)"
        />

        {/* Star Sparkle Accent */}
        <path
          d="M50 20 L52 26 L58 28 L52 30 L50 36 L48 30 L42 28 L48 26 Z"
          fill="#ffffff"
          opacity="0.9"
        />
      </svg>
    </div>
  );
};
