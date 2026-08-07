import {
  Bookmark,
  Wallpaper,
  BraveNewsArticle,
  CryptoAsset,
  SimulatedWebsite,
} from '../types';

export const INITIAL_WALLPAPERS: Wallpaper[] = [
  {
    id: 'wp1',
    name: 'Cosmic Aurora Peaks',
    artist: 'ISTEK Community Collection',
    url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'wp2',
    name: 'Cyberpunk Neon Metropolis',
    artist: 'Digital Vision',
    url: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1920&q=80',
  },
  {
    id: 'wp3',
    name: 'Emerald Mist Forest',
    artist: 'Nature Series',
    url: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1920&q=80',
  },
];

export const TOP_SHORTCUTS: Bookmark[] = [
  { id: 'sc1', title: 'ISTEK Search', url: 'https://search.istek.com', favicon: '⚡' },
  { id: 'sc2', title: 'ISTEK Rewards', url: 'istek://rewards', favicon: '🦇' },
  { id: 'sc3', title: 'Daily Tech', url: 'https://dailytech.org', favicon: '⚡' },
  { id: 'sc4', title: 'GitHub', url: 'https://github.com', favicon: '🐙' },
];

export const INITIAL_NEWS: BraveNewsArticle[] = [];

export const INITIAL_CRYPTO_ASSETS: CryptoAsset[] = [
  {
    symbol: 'BAT',
    name: 'Basic Attention Token',
    balance: 485.2,
    priceUsd: 0.38,
    change24h: 5.4,
    valueUsd: 184.37,
    iconBg: 'bg-gradient-to-r from-orange-500 to-amber-500',
  },
  {
    symbol: 'ETH',
    name: 'Ethereum',
    balance: 2.85,
    priceUsd: 3420.5,
    change24h: 2.1,
    valueUsd: 9748.42,
    iconBg: 'bg-gradient-to-r from-indigo-500 to-purple-600',
  },
  {
    symbol: 'SOL',
    name: 'Solana',
    balance: 38.5,
    priceUsd: 142.1,
    change24h: -1.2,
    valueUsd: 5470.85,
    iconBg: 'bg-gradient-to-r from-cyan-500 to-emerald-500',
  },
  {
    symbol: 'BTC',
    name: 'Bitcoin',
    balance: 0.022,
    priceUsd: 97800.0,
    change24h: 3.8,
    valueUsd: 2151.6,
    iconBg: 'bg-gradient-to-r from-amber-500 to-yellow-600',
  },
];

export const SIMULATED_WEBSITES: SimulatedWebsite[] = [
  {
    id: 'dailytech',
    url: 'https://dailytech.org',
    title: 'Daily Tech Chronicles - Tomorrow\'s Web Today',
    favicon: '⚡',
    category: 'Tech News',
    trackersAttempted: [
      { id: 't1', domain: 'google-analytics.com', company: 'Google LLC', category: 'Analytics', threatLevel: 'Medium', blockedCount: 14, timestamp: 'Just now' },
      { id: 't2', domain: 'doubleclick.net', company: 'Google Ad Network', category: 'Ad Tracker', threatLevel: 'High', blockedCount: 22, timestamp: 'Just now' },
      { id: 't3', domain: 'connect.facebook.net/en_US/fbevents.js', company: 'Meta Platforms', category: 'Social Tracker', threatLevel: 'High', blockedCount: 9, timestamp: 'Just now' },
      { id: 't4', domain: 'cdn.fingerprintjs.com', company: 'FingerprintJS Inc', category: 'Fingerprinting', threatLevel: 'High', blockedCount: 4, timestamp: 'Just now' },
    ],
    bodyHtml: `
      <div class="space-y-6 text-left">
        <div class="border-b border-slate-700/60 pb-4">
          <span class="text-xs font-bold text-orange-500 uppercase tracking-wider">Tech & AI Deep Dive</span>
          <h1 class="text-3xl font-extrabold text-slate-100 mt-1">The Architecture of Privacy-First Web Browsers in 2026</h1>
          <p class="text-xs text-slate-400 mt-2">Published by Tech Editor • 4 min read</p>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">
          Modern web browsers have evolved beyond mere document renderers. Today, ISTEK Browser serves as a zero-trust perimeter guarding users against invasive tracking scripts, cross-site telemetry, and hardware fingerprinting.
        </p>
        <div class="p-4 bg-orange-500/10 border border-orange-500/30 rounded-2xl text-xs text-orange-300 font-medium">
          <strong>ISTEK Shield Protection Summary:</strong> 4 tracking scripts and 49 network requests were intercepted and blocked on this page in 0.04 seconds.
        </div>
        <h2 class="text-xl font-bold text-slate-200 mt-4">Why Native Blocking Outperforms Extensions</h2>
        <p class="text-sm text-slate-300 leading-relaxed">
          When ad and tracker blocking is compiled directly into the network layer, memory overhead drops by over 50%, and page rendering speeds accelerate by up to 3x compared to legacy browser extension hooks.
        </p>
      </div>
    `,
  },
  {
    id: 'cryptomarket',
    url: 'https://cryptomarket.io',
    title: 'CryptoMarket Hub - Real-Time On-Chain Terminal',
    favicon: '📈',
    category: 'Finance',
    trackersAttempted: [
      { id: 't5', domain: 'hotjar.com/api/v2', company: 'Hotjar Ltd', category: 'Analytics', threatLevel: 'Medium', blockedCount: 8, timestamp: 'Just now' },
      { id: 't6', domain: 'taboola.com/scripts', company: 'Taboola', category: 'Ad Tracker', threatLevel: 'Medium', blockedCount: 16, timestamp: 'Just now' },
    ],
    bodyHtml: `
      <div class="space-y-6 text-left">
        <div class="border-b border-slate-700/60 pb-4">
          <span class="text-xs font-bold text-emerald-400 uppercase tracking-wider">Web3 Finance</span>
          <h1 class="text-3xl font-extrabold text-slate-100 mt-1">DeFi Liquidity and Attention Economy Expansion</h1>
          <p class="text-xs text-slate-400 mt-2">Market Report • Live Updates</p>
        </div>
        <p class="text-sm text-slate-300 leading-relaxed">
          Decentralized financial protocols are witnessing an unprecedented influx of privacy-first web traffic.
        </p>
      </div>
    `,
  },
];
