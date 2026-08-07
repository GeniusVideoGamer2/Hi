import React, { useState } from 'react';
import { HistoryItem, HistorySettings } from '../types';
import { X, History, Search, Trash2, Globe, Clock, ShieldAlert, Check, ToggleLeft, ToggleRight, ExternalLink } from 'lucide-react';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  historyItems: HistoryItem[];
  historySettings: HistorySettings;
  onToggleSearchHistory: () => void;
  onToggleSiteHistory: () => void;
  onClearHistory: (type?: 'search' | 'site' | 'all') => void;
  onDeleteHistoryItem: (id: string) => void;
  onNavigateUrl: (url: string) => void;
}

export const HistoryModal: React.FC<HistoryModalProps> = ({
  isOpen,
  onClose,
  historyItems,
  historySettings,
  onToggleSearchHistory,
  onToggleSiteHistory,
  onClearHistory,
  onDeleteHistoryItem,
  onNavigateUrl,
}) => {
  const [filterType, setFilterType] = useState<'all' | 'search' | 'site'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const filteredItems = historyItems.filter((item) => {
    if (filterType !== 'all' && item.type !== filterType) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return item.title.toLowerCase().includes(q) || item.queryOrUrl.toLowerCase().includes(q);
    }
    return true;
  });

  const searchCount = historyItems.filter((i) => i.type === 'search').length;
  const siteCount = historyItems.filter((i) => i.type === 'site').length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex items-center justify-center">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white flex items-center gap-2">
                <span>ISTEK BROWSER Browsing & Search History</span>
              </h2>
              <p className="text-xs text-slate-400">View, manage, or disable your search queries and visited site records</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* History Toggles Section (Disable/Enable Search & Site History) */}
        <div className="p-4 bg-slate-950/70 border-b border-slate-800 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            History Privacy Controls
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Toggle Search History Button */}
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Search className="w-3.5 h-3.5 text-blue-400" />
                    Search History
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                    Saves terms searched in Google search bar. Disable to stop saving queries.
                  </p>
                </div>

                <button
                  onClick={onToggleSearchHistory}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                    historySettings.searchHistoryEnabled
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
                  }`}
                  title={historySettings.searchHistoryEnabled ? 'Click to disable saving search history' : 'Click to enable saving search history'}
                >
                  {historySettings.searchHistoryEnabled ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>ON</span>
                    </>
                  ) : (
                    <>
                      <X className="w-3 h-3 text-rose-400" />
                      <span>OFF</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-800/80 flex justify-between">
                <span>Recorded Queries:</span>
                <span className="font-bold text-slate-300">{searchCount} items</span>
              </div>
            </div>

            {/* Toggle Site History Button */}
            <div className="bg-slate-900 p-3 rounded-2xl border border-slate-800 flex flex-col justify-between">
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-emerald-400" />
                    Website Browsing History
                  </div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-tight">
                    Logs web URLs & sites visited in browser tabs. Disable to stop logging sites.
                  </p>
                </div>

                <button
                  onClick={onToggleSiteHistory}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                    historySettings.siteHistoryEnabled
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 hover:bg-emerald-500/30'
                      : 'bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30'
                  }`}
                  title={historySettings.siteHistoryEnabled ? 'Click to disable logging website visits' : 'Click to enable logging website visits'}
                >
                  {historySettings.siteHistoryEnabled ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>ON</span>
                    </>
                  ) : (
                    <>
                      <X className="w-3 h-3 text-rose-400" />
                      <span>OFF</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-[10px] text-slate-500 pt-1.5 border-t border-slate-800/80 flex justify-between">
                <span>Visited URLs:</span>
                <span className="font-bold text-slate-300">{siteCount} items</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="p-4 bg-slate-900 border-b border-slate-800 flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-1 w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search history entries..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-blue-500 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto justify-between sm:justify-end">
            <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-[11px]">
              <button
                onClick={() => setFilterType('all')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filterType === 'all' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All ({historyItems.length})
              </button>
              <button
                onClick={() => setFilterType('search')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filterType === 'search' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Searches ({searchCount})
              </button>
              <button
                onClick={() => setFilterType('site')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all ${
                  filterType === 'site' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Sites ({siteCount})
              </button>
            </div>

            {historyItems.length > 0 && (
              <button
                onClick={() => onClearHistory(filterType === 'all' ? undefined : filterType)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-colors"
                title="Clear current view history"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* History List Content */}
        <div className="p-4 space-y-2 overflow-y-auto flex-1 max-h-[50vh]">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-slate-500">
              <Clock className="w-10 h-10 mx-auto mb-3 opacity-30 text-slate-400" />
              <p className="text-sm font-semibold text-slate-400">No history entries found</p>
              <p className="text-xs text-slate-500 mt-1">
                {!historySettings.searchHistoryEnabled && !historySettings.siteHistoryEnabled
                  ? 'History recording is currently disabled using the toggles above.'
                  : 'Searches and visited websites will appear here.'}
              </p>
            </div>
          ) : (
            filteredItems.map((item) => (
              <div
                key={item.id}
                className="group flex items-center justify-between p-3 bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800/80 hover:border-slate-700 rounded-2xl transition-all cursor-pointer"
                onClick={() => {
                  onNavigateUrl(item.queryOrUrl);
                  onClose();
                }}
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 pr-3">
                  <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-sm shrink-0 border border-slate-700/60">
                    {item.favicon || (item.type === 'search' ? '🔍' : '🌐')}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100 truncate group-hover:text-blue-400 transition-colors">
                        {item.title}
                      </span>
                      <span className={`text-[10px] px-2 py-0.2 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                        item.type === 'search'
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {item.type === 'search' ? 'Search Query' : 'Website'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-400 truncate font-mono mt-0.5">
                      {item.queryOrUrl}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-[11px] text-slate-500 font-medium">{item.timestamp}</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteHistoryItem(item.id);
                    }}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-colors opacity-60 group-hover:opacity-100"
                    title="Delete item from history"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span>{filteredItems.length} history records</span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-colors shadow-lg shadow-blue-600/20"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
