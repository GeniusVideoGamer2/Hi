import React, { useState } from 'react';
import { Search, Sparkles, Globe, ExternalLink, ShieldCheck, ArrowRight } from 'lucide-react';
import { IstekLogo } from './IstekLogo';

interface BraveSearchProps {
  initialQuery: string;
  onNavigateUrl: (url: string) => void;
  onOpenLeoSidebar: () => void;
}

export const BraveSearch: React.FC<BraveSearchProps> = ({
  initialQuery,
  onNavigateUrl,
  onOpenLeoSidebar,
}) => {
  const [query, setQuery] = useState(initialQuery || 'ISTEK privacy browser shields and AI');
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'news' | 'videos'>('all');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onNavigateUrl(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    }
  };

  const MOCK_RESULTS = [
    {
      title: 'ISTEK Browser - Private, Fast & Secure Web Browser',
      url: 'https://istek.com',
      snippet: 'The ISTEK browser is a fast, private and secure web browser for PC, Mac and mobile. Download now to enjoy a faster ad-free browsing experience that saves data and battery life.',
      source: 'istek.com',
    },
    {
      title: 'ISTEK Search - The independent, private search engine',
      url: 'https://search.istek.com',
      snippet: 'Search the web without being tracked. ISTEK Search doesn\'t profile you or sell your personal data. Get unbiased, independent search results powered by our native index.',
      source: 'search.istek.com',
    },
    {
      title: 'Basic Attention Token (BAT) Ecosystem Architecture',
      url: 'https://basicattentiontoken.org',
      snippet: 'Basic Attention Token radically improves the efficiency of digital advertising by creating a new token that can be exchanged between publishers, advertisers, and users.',
      source: 'basicattentiontoken.org',
    },
    {
      title: 'ISTEK Shields: Advanced Anti-Fingerprinting and Ad Blocking',
      url: 'https://istek.com/shields/',
      snippet: 'Learn how ISTEK Shields block cross-site trackers, invasive ad scripts, and canvas fingerprinting while upgrading connections to secure HTTPS automatically.',
      source: 'istek.com',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col select-none">
      {/* Search Header Bar */}
      <div className="p-4 border-b border-slate-800 bg-slate-900/80 sticky top-0 z-20 backdrop-blur-md">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4">
          <div
            onClick={() => onNavigateUrl('istek://newtab')}
            className="flex items-center gap-2 cursor-pointer shrink-0"
          >
            <IstekLogo size={28} />
            <span className="text-lg font-black tracking-wider text-white">GOOGLE <span className="text-orange-500 font-medium">SEARCH</span></span>
          </div>

          <form onSubmit={handleSearch} className="flex-1 w-full max-w-2xl">
            <div className="flex items-center bg-slate-950 border border-slate-700/80 focus-within:border-orange-500 rounded-full px-4 py-2 text-xs shadow-inner">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-500 focus:outline-none"
              />
              <button type="submit" className="text-orange-500 ml-2">
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Goggles & Privacy Badge */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold rounded-full">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Independent Index • No Tracking</span>
            </div>
          </div>
        </div>

        {/* Sub Navigation Tabs */}
        <div className="max-w-6xl mx-auto flex items-center gap-6 mt-4 text-xs font-semibold text-slate-400">
          {(['all', 'images', 'news', 'videos'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`capitalize pb-1 border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-orange-500 text-orange-400 font-bold'
                  : 'border-transparent hover:text-slate-200'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Main Results Container */}
      <div className="max-w-6xl mx-auto w-full px-4 py-8 flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Results Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* AI Answer Box */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-orange-950/40 p-5 rounded-2xl border border-orange-500/40 shadow-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-orange-400">
                <Sparkles className="w-4 h-4" />
                <span>ISTEK Summarizer AI</span>
              </div>
              <button
                onClick={onOpenLeoSidebar}
                className="text-[11px] text-orange-400 hover:underline font-semibold flex items-center gap-1"
              >
                <span>Ask ISTEK for details</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              <strong>{query}</strong> refers to the ecosystem built around privacy-focused browsing and search. ISTEK combines native ad blocking (ISTEK Shields), zero-profiling independent search indexing, and ISTEK AI assistance to safeguard user identity while accelerating web speed.
            </p>

            <div className="flex items-center gap-2 text-[10px] text-slate-400 border-t border-slate-800/80 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Synthesized privately from 12 independent search index documents</span>
            </div>
          </div>

          {/* Search Result Items */}
          <div className="space-y-6">
            {MOCK_RESULTS.map((res, idx) => (
              <div
                key={idx}
                onClick={() => onNavigateUrl(res.url)}
                className="group cursor-pointer space-y-1 bg-slate-900/40 hover:bg-slate-900/80 p-4 rounded-xl border border-transparent hover:border-slate-800 transition-all"
              >
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Globe className="w-3.5 h-3.5 text-orange-400" />
                  <span>{res.source}</span>
                </div>
                <h3 className="text-base font-bold text-indigo-400 group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <span>{res.title}</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">{res.snippet}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar Widgets Column */}
        <div className="space-y-6">
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-3">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">
              Goggles Privacy Filters
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Goggles allow you to customize ranking rules and eliminate ad-driven SEO spam.
            </p>
            <div className="space-y-2">
              {['Tech Blogs Only', 'No Big Tech Domains', 'Peer Reviewed Science', 'Crypto & Web3 Native'].map((g, i) => (
                <div key={i} className="flex items-center justify-between bg-slate-950 p-2.5 rounded-xl text-xs">
                  <span className="font-medium text-slate-200">{g}</span>
                  <input type="checkbox" defaultChecked={i === 0} className="accent-orange-500 rounded" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
