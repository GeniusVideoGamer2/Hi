import React, { useState } from 'react';
import { Tab, ShieldSettings, ShieldStats } from '../types';
import { IstekLogo } from './IstekLogo';
import {
  Shield,
  Plus,
  X,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Home,
  Sparkles,
  Coins,
  Settings as SettingsIcon,
  Search,
  Lock,
  Globe,
  Star,
  History,
} from 'lucide-react';

interface HeaderBarProps {
  tabs: Tab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: () => void;
  onNavigateUrl: (url: string) => void;
  shieldSettings: ShieldSettings;
  shieldStats: ShieldStats;
  onToggleShieldModal: () => void;
  onOpenRewards: () => void;
  onOpenSettings: () => void;
  onOpenHistory: () => void;
  onGoHome: () => void;
}

export const HeaderBar: React.FC<HeaderBarProps> = ({
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  onNavigateUrl,
  shieldSettings,
  shieldStats,
  onToggleShieldModal,
  onOpenRewards,
  onOpenSettings,
  onOpenHistory,
  onGoHome,
}) => {
  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];
  const [urlInput, setUrlInput] = useState(activeTab ? activeTab.url : '');
  const [isBookmarked, setIsBookmarked] = useState(false);

  React.useEffect(() => {
    if (activeTab) {
      setUrlInput(activeTab.url);
    }
  }, [activeTabId, activeTab?.url]);

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!urlInput.trim()) return;
    let target = urlInput.trim();
    if (!target.startsWith('http://') && !target.startsWith('https://') && !target.startsWith('istek://') && !target.startsWith('brave://')) {
      if (target.includes('.') && !target.includes(' ')) {
        target = 'https://' + target;
      } else {
        target = `https://www.google.com/search?q=${encodeURIComponent(target)}`;
      }
    }
    onNavigateUrl(target);
  };

  return (
    <div className="bg-slate-900 text-slate-100 flex flex-col border-b border-slate-800 select-none shadow-md">
      {/* Tab Strip */}
      <div className="flex items-center px-2 pt-2 gap-1 overflow-x-auto no-scrollbar bg-slate-950/80">
        <div className="flex items-center gap-1.5 px-2 py-1 text-xs font-black text-orange-500 tracking-wider">
          <IstekLogo size={20} />
          <span className="hidden sm:inline text-white font-black text-sm">ISTEK</span>
        </div>

        <div className="flex items-center gap-1 overflow-x-auto flex-1 no-scrollbar">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`group relative flex items-center gap-2 px-3 py-1.5 max-w-[200px] min-w-[120px] rounded-t-lg text-xs font-medium cursor-pointer transition-all border-t border-x ${
                  isActive
                    ? 'bg-slate-900 text-slate-100 border-slate-700 shadow-sm'
                    : 'bg-slate-900/40 text-slate-400 hover:text-slate-200 hover:bg-slate-900/70 border-transparent'
                }`}
              >
                <span className="text-sm shrink-0">
                  {tab.favicon === '🦁' ? <IstekLogo size={14} /> : tab.favicon || '🌐'}
                </span>
                <span className="truncate flex-1">{tab.title || 'New Tab'}</span>

                {/* Tab Shield Mini Pill */}
                {tab.blockedCount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.2 bg-orange-500/20 text-orange-400 rounded-full border border-orange-500/30">
                    {tab.blockedCount}
                  </span>
                )}

                {tabs.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tab.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded-full hover:bg-slate-700/80 text-slate-400 hover:text-slate-100 transition-opacity"
                    title="Close Tab"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            );
          })}

          <button
            onClick={onNewTab}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors ml-1"
            title="New Tab"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Top Right Quick Controls */}
        <div className="flex items-center gap-1.5 pl-2 border-l border-slate-800">
          <button
            onClick={onOpenRewards}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-orange-500/10 hover:bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-semibold transition-colors"
            title="ISTEK Rewards"
          >
            <Coins className="w-3.5 h-3.5 text-orange-500" />
            <span className="hidden md:inline">ISTEK Rewards</span>
          </button>
        </div>
      </div>

      {/* Navigation & Omnibox Bar */}
      <div className="flex items-center gap-2 px-3 py-2 bg-slate-900 border-t border-slate-800/80">
        <div className="flex items-center gap-1">
          <button
            onClick={onGoHome}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            title="Back / Home"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 rounded-lg text-slate-500 cursor-not-allowed"
            title="Forward"
            disabled
          >
            <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={() => onNavigateUrl(activeTab?.url || 'istek://newtab')}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            title="Reload Page"
          >
            <RotateCw className="w-4 h-4" />
          </button>
          <button
            onClick={onGoHome}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            title="New Tab Page"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* Address / Search Bar (Omnibox) */}
        <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center">
          <div className="w-full flex items-center gap-2 px-3 py-1.5 bg-slate-950 border border-slate-800 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500/30 rounded-full text-xs transition-all shadow-inner">
            {/* Lock or Protocol Indicator */}
            {activeTab?.url.startsWith('https://') ? (
              <div className="flex items-center gap-1 text-emerald-400 font-medium">
                <Lock className="w-3.5 h-3.5" />
              </div>
            ) : activeTab?.url.startsWith('istek://') || activeTab?.url.startsWith('brave://') ? (
              <div className="flex items-center text-[11px] font-black tracking-tight" title="Google Search Engine Default">
                <span className="text-blue-500">G</span>
              </div>
            ) : (
              <Search className="w-3.5 h-3.5 text-blue-400" />
            )}

            <input
              type="text"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="Search Google or enter web URL"
              className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none font-mono text-xs"
            />

            {/* Bookmark Star Button */}
            <button
              type="button"
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`p-1 rounded-full transition-colors ${
                isBookmarked ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
              }`}
              title="Bookmark this page"
            >
              <Star className="w-3.5 h-3.5 fill-current" />
            </button>

            {/* ISTEK Shield Icon Button in Omnibox */}
            <button
              type="button"
              onClick={onToggleShieldModal}
              className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                shieldSettings.enabled
                  ? 'bg-orange-500/20 text-orange-400 border border-orange-500/40 hover:bg-orange-500/30'
                  : 'bg-slate-800 text-slate-400 border border-slate-700'
              }`}
              title="ISTEK Shield Controls & Analytics"
            >
              <Shield className={`w-3.5 h-3.5 ${shieldSettings.enabled ? 'fill-orange-500/20' : ''}`} />
              <span>{activeTab?.blockedCount || shieldStats.trackersBlocked}</span>
            </button>
          </div>
        </form>

        {/* Right Utility Actions */}
        <div className="flex items-center gap-1">
          {/* History Button */}
          <button
            onClick={onOpenHistory}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            title="Search & Browsing History"
          >
            <History className="w-4 h-4 text-blue-400" />
          </button>

          {/* Settings Trigger */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-800 transition-colors"
            title="ISTEK Browser Settings"
          >
            <SettingsIcon className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
