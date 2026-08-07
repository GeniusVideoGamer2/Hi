export interface Tab {
  id: string;
  title: string;
  url: string;
  favicon: string;
  type: 'ntp' | 'search' | 'wallet' | 'rewards' | 'web';
  active: boolean;
  blockedCount: number;
  httpsUpgraded: boolean;
}

export interface ShieldSettings {
  enabled: boolean;
  trackersBlockingLevel: 'aggressive' | 'standard' | 'allow';
  httpsOnlyMode: boolean;
  blockCookies: boolean;
  blockScripts: boolean;
  fingerprintProtection: boolean;
}

export interface ShieldStats {
  trackersBlocked: number;
  adsBlocked: number;
  fingerprintsBlocked: number;
  httpsUpgrades: number;
  bandwidthSavedMb: number;
  timeSavedMinutes: number;
}

export interface BlockedTracker {
  id: string;
  domain: string;
  company: string;
  category: 'Ad Tracker' | 'Social Tracker' | 'Analytics' | 'Fingerprinting';
  threatLevel: 'Low' | 'Medium' | 'High';
  blockedCount: number;
  timestamp: string;
}

export interface LeoMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; url: string }[];
  timestamp: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon: string;
}

export interface Wallpaper {
  id: string;
  name: string;
  artist: string;
  url: string;
}

export interface BraveNewsArticle {
  id: string;
  title: string;
  source: string;
  timeAgo: string;
  category: string;
  imageUrl: string;
  summary: string;
  url: string;
}

export interface CryptoAsset {
  symbol: string;
  name: string;
  balance: number;
  priceUsd: number;
  change24h: number;
  valueUsd: number;
  iconBg: string;
}

export interface BATRewardState {
  batBalance: number;
  estimatedEarningsMonth: number;
  adsViewed: number;
  autoContribute: boolean;
  monthlyContributionBat: number;
  payoutDate: string;
}

export interface HistoryItem {
  id: string;
  type: 'search' | 'site';
  queryOrUrl: string;
  title: string;
  favicon: string;
  timestamp: string;
  date: string;
}

export interface HistorySettings {
  searchHistoryEnabled: boolean;
  siteHistoryEnabled: boolean;
}

export interface SimulatedWebsite {
  id: string;
  url: string;
  title: string;
  favicon: string;
  category: string;
  trackersAttempted: BlockedTracker[];
  bodyHtml: string;
}
