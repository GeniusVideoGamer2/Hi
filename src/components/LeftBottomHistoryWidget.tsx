import React from 'react';
import { HistorySettings } from '../types';
import { History, Search, Globe, Shield, Check, X } from 'lucide-react';

interface LeftBottomHistoryWidgetProps {
  historySettings: HistorySettings;
  onToggleSearchHistory: () => void;
  onToggleSiteHistory: () => void;
  onOpenHistoryModal: () => void;
}

export const LeftBottomHistoryWidget: React.FC<LeftBottomHistoryWidgetProps> = ({
  historySettings,
  onToggleSearchHistory,
  onToggleSiteHistory,
  onOpenHistoryModal,
}) => {
  return (
    <div className="fixed bottom-3 left-3 z-40 flex items-center gap-1.5 p-1.5 bg-slate-900/90 hover:bg-slate-900 backdrop-blur-xl border border-slate-700/80 rounded-2xl shadow-2xl transition-all select-none text-xs">
      {/* Search History Entry & Modal Trigger Button */}
      <button
        onClick={onOpenHistoryModal}
        className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-md shadow-blue-600/20 active:scale-95"
        title="Open Search & Visited Website History Logs"
      >
        <History className="w-3.5 h-3.5" />
        <span>Search & Site History</span>
      </button>

      <div className="h-4 w-[1px] bg-slate-700/80 mx-0.5" />

      {/* Search History Quick Toggle Button */}
      <button
        onClick={onToggleSearchHistory}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-bold transition-all border text-[11px] ${
          historySettings.searchHistoryEnabled
            ? 'bg-slate-950 text-slate-200 border-emerald-500/50 hover:bg-slate-800'
            : 'bg-rose-950/40 text-rose-300 border-rose-500/40 hover:bg-rose-900/50'
        }`}
        title="Toggle Search Engine Query History (On/Off)"
      >
        <Search className="w-3 h-3 text-blue-400" />
        <span className="hidden sm:inline">Search Log:</span>
        <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase tracking-wider font-extrabold ${
          historySettings.searchHistoryEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
        }`}>
          {historySettings.searchHistoryEnabled ? 'ON' : 'OFF'}
        </span>
      </button>

      {/* Site History Quick Toggle Button */}
      <button
        onClick={onToggleSiteHistory}
        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-bold transition-all border text-[11px] ${
          historySettings.siteHistoryEnabled
            ? 'bg-slate-950 text-slate-200 border-emerald-500/50 hover:bg-slate-800'
            : 'bg-rose-950/40 text-rose-300 border-rose-500/40 hover:bg-rose-900/50'
        }`}
        title="Toggle Website Browsing History (On/Off)"
      >
        <Globe className="w-3 h-3 text-emerald-400" />
        <span className="hidden sm:inline">Site Log:</span>
        <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase tracking-wider font-extrabold ${
          historySettings.siteHistoryEnabled ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'
        }`}>
          {historySettings.siteHistoryEnabled ? 'ON' : 'OFF'}
        </span>
      </button>
    </div>
  );
};
