import React, { useState, useEffect } from 'react';
import { ShieldStats, CryptoAsset } from '../types';
import { INITIAL_WALLPAPERS, INITIAL_CRYPTO_ASSETS } from '../data/mockData';
import { IstekLogo } from './IstekLogo';
import {
  Shield,
  Zap,
  Clock,
  Search,
  TrendingUp,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

interface NewTabPageProps {
  shieldStats: ShieldStats;
  onNavigateUrl: (url: string) => void;
  onOpenShieldModal: () => void;
}

export const NewTabPage: React.FC<NewTabPageProps> = ({
  shieldStats,
  onNavigateUrl,
  onOpenShieldModal,
}) => {
  const [currentWallpaperIdx, setCurrentWallpaperIdx] = useState(0);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const wallpaper = INITIAL_WALLPAPERS[currentWallpaperIdx];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    let url = searchQuery.trim();
    if (url.includes('.') && !url.includes(' ')) {
      url = url.startsWith('http') ? url : 'https://' + url;
    } else {
      url = `https://www.google.com/search?q=${encodeURIComponent(url)}`;
    }
    onNavigateUrl(url);
  };

  return (
    <div className="relative min-h-screen w-full text-slate-100 flex flex-col bg-slate-950 select-none overflow-x-hidden">
      {/* Background Image Layer */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-700 filter brightness-[0.70] contrast-[1.05]"
        style={{ backgroundImage: `url(${wallpaper.url})` }}
      />
      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-slate-950/60" />

      {/* Main Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 flex-1 flex flex-col justify-between">
        {/* Top Header Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <IstekLogo size={36} />
            <span className="text-2xl font-black tracking-wider text-white drop-shadow">ISTEK BROWSER</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() =>
                setCurrentWallpaperIdx((prev) => (prev + 1) % INITIAL_WALLPAPERS.length)
              }
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-900 text-slate-300 border border-slate-700/80 text-xs font-semibold backdrop-blur-md transition-all"
              title="Switch Background Wallpaper"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">{wallpaper.name}</span>
            </button>
          </div>
        </div>

        {/* Center Clock & Search Section */}
        <div className="my-10 flex flex-col items-center text-center space-y-6">
          {/* Time & Greeting */}
          <div>
            <div className="text-6xl sm:text-7xl font-extrabold tracking-tight font-mono text-white drop-shadow-lg">
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
            <div className="text-sm font-semibold text-slate-300 mt-2 tracking-wide uppercase">
              {currentTime.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' })}
            </div>
          </div>

          {/* Center ISTEK BROWSER Search Engine Default Bar */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl">
            <div className="relative flex items-center bg-slate-900/90 hover:bg-slate-900 backdrop-blur-xl border border-slate-700/80 focus-within:border-blue-500 rounded-2xl shadow-2xl transition-all px-4 py-3.5">
              <div className="mr-3 shrink-0 flex items-center font-black text-lg tracking-tighter cursor-pointer" onClick={() => onNavigateUrl('https://www.google.com')}>
                <span className="text-blue-500">G</span>
                <span className="text-red-500">o</span>
                <span className="text-amber-500">o</span>
                <span className="text-blue-500">g</span>
                <span className="text-emerald-500">l</span>
                <span className="text-red-500">e</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search Google or type a URL"
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                type="submit"
                className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors shadow-md shadow-blue-600/30 font-bold flex items-center gap-1 text-xs"
              >
                <Search className="w-4 h-4" />
                <span className="hidden sm:inline">Search</span>
              </button>
            </div>
          </form>

          {/* Top Shortcuts Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 w-full max-w-2xl mt-2">
            {[
              {
                name: 'YouTube',
                url: 'https://www.youtube.com',
                logo: 'https://www.google.com/s2/favicons?domain=youtube.com&sz=128',
                bgColor: 'bg-red-950/40',
                fallback: '▶️',
              },
              {
                name: 'Google',
                url: 'https://www.google.com',
                logo: 'https://www.google.com/s2/favicons?domain=google.com&sz=128',
                bgColor: 'bg-blue-950/40',
                fallback: '🔍',
              },
              {
                name: 'Gmail',
                url: 'https://mail.google.com',
                logo: 'https://www.google.com/s2/favicons?domain=mail.google.com&sz=128',
                bgColor: 'bg-rose-950/40',
                fallback: '✉️',
              },
              {
                name: 'Google Maps',
                url: 'https://maps.google.com',
                logo: 'https://www.google.com/s2/favicons?domain=maps.google.com&sz=128',
                bgColor: 'bg-emerald-950/40',
                fallback: '📍',
              },
              {
                name: 'Google Docs',
                url: 'https://docs.google.com',
                logo: 'https://www.google.com/s2/favicons?domain=docs.google.com&sz=128',
                bgColor: 'bg-sky-950/40',
                fallback: '📄',
              },
            ].map((sc, i) => (
              <div
                key={i}
                onClick={() => onNavigateUrl(sc.url)}
                className="flex flex-col items-center gap-2 p-3 bg-slate-900/80 hover:bg-slate-850 backdrop-blur-md border border-slate-800/90 hover:border-blue-500/50 rounded-2xl cursor-pointer transition-all hover:scale-105 shadow-xl group"
              >
                <div className={`w-12 h-12 rounded-2xl ${sc.bgColor} border border-slate-700/60 flex items-center justify-center p-2.5 shadow-md group-hover:shadow-blue-500/20 transition-all overflow-hidden`}>
                  <img
                    src={sc.logo}
                    alt={sc.name}
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLElement).style.display = 'none';
                      const parent = e.currentTarget.parentElement;
                      if (parent) {
                        parent.innerText = sc.fallback;
                        parent.className += ' text-xl font-bold flex items-center justify-center';
                      }
                    }}
                  />
                </div>
                <span className="text-[11px] text-slate-300 group-hover:text-white font-bold truncate max-w-full">
                  {sc.name}
                </span>
              </div>
            ))}
          </div>

          {/* Real-time ISTEK Shield Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-2xl mt-4">
            <div
              onClick={onOpenShieldModal}
              className="bg-slate-900/80 hover:bg-slate-900 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 hover:border-orange-500/50 cursor-pointer transition-all shadow-xl text-left group"
            >
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
                <span>Trackers & Ads Blocked</span>
                <Shield className="w-4 h-4 text-orange-400 group-hover:scale-110 transition-transform" />
              </div>
              <div className="text-3xl font-black text-orange-400 font-mono">
                {shieldStats.trackersBlocked.toLocaleString()}
              </div>
              <div className="text-[10px] text-slate-500 mt-1">100% Client-Side Shield Active</div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 shadow-xl text-left">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
                <span>Bandwidth Saved</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-3xl font-black text-amber-400 font-mono">
                {shieldStats.bandwidthSavedMb} <span className="text-sm font-medium text-slate-400">MB</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Faster Page Rendering</div>
            </div>

            <div className="bg-slate-900/80 backdrop-blur-md p-4 rounded-2xl border border-slate-800/80 shadow-xl text-left">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold mb-1">
                <span>Estimated Time Saved</span>
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-black text-emerald-400 font-mono">
                {shieldStats.timeSavedMinutes} <span className="text-sm font-medium text-slate-400">min</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-1">Eliminated Ad Loading Delays</div>
            </div>
          </div>
        </div>

        {/* Crypto Asset Ticker Section (Preserved) */}
        <div className="mt-6">
          <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800/80 p-5 shadow-xl max-w-2xl mx-auto flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                <span className="font-bold text-sm text-white">Crypto Market Ticker</span>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/30">
                LIVE
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 divide-y sm:divide-y-0 divide-slate-800/80">
              {INITIAL_CRYPTO_ASSETS.map((asset) => (
                <div key={asset.symbol} className="p-2.5 bg-slate-950/60 rounded-xl border border-slate-800/60 flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl ${asset.iconBg} flex items-center justify-center font-bold text-white text-xs shadow-md`}>
                      {asset.symbol}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">{asset.name}</div>
                      <div className="text-[10px] text-slate-400">{asset.symbol}</div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-bold font-mono text-white">
                      ${asset.priceUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <div
                      className={`text-[10px] font-bold ${
                        asset.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'
                      }`}
                    >
                      {asset.change24h >= 0 ? '+' : ''}
                      {asset.change24h}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
