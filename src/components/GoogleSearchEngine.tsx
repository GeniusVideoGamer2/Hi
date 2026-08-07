import React, { useState } from 'react';
import { Search, Mic, Camera, Globe, ExternalLink, Sparkles, SlidersHorizontal, ChevronDown, Check, ArrowRight, ShieldCheck } from 'lucide-react';

interface GoogleSearchEngineProps {
  initialQuery: string;
  onNavigateUrl: (url: string) => void;
}

export const GoogleSearchEngine: React.FC<GoogleSearchEngineProps> = ({
  initialQuery,
  onNavigateUrl,
}) => {
  const isHomepage = !initialQuery || initialQuery === 'Google' || initialQuery.includes('www.google.com') || initialQuery === 'https://www.google.com' || initialQuery === 'google.com';
  const [query, setQuery] = useState(isHomepage ? '' : initialQuery.includes('q=') ? decodeURIComponent(initialQuery.split('q=')[1].split('&')[0]) : initialQuery);
  const [activeTab, setActiveTab] = useState<'all' | 'images' | 'news' | 'videos' | 'maps' | 'shopping'>('all');
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onNavigateUrl(`https://www.google.com/search?q=${encodeURIComponent(query)}`);
    }
  };

  const cleanQuery = (query || 'google').replace(/^https?:\/\//, '').replace(/www\./, '');

  const shortcuts = [
    { name: 'Pados Game', url: 'https://geniusvideogamer2.github.io/pados/', icon: '🎮' },
    { name: 'YouTube', url: 'https://www.youtube.com', icon: '▶️' },
    { name: 'Gmail', url: 'https://mail.google.com', icon: '✉️' },
    { name: 'Google Maps', url: 'https://maps.google.com', icon: '📍' },
    { name: 'GitHub', url: 'https://github.com', icon: '🐙' },
    { name: 'Wikipedia', url: 'https://www.wikipedia.org', icon: '🌐' },
  ];

  // Dynamic Google Search Results Generator
  const searchResults = [
    {
      title: `${query} - Official Site & Information`,
      url: `https://www.google.com/url?q=${encodeURIComponent(query)}`,
      displayUrl: `https://${cleanQuery.toLowerCase().replace(/\s+/g, '')}.com`,
      snippet: `Explore official resources, documentation, updates, and community news for ${query}. Access features, security guidelines, and verified tools directly.`,
      sitelinks: [
        { name: 'Getting Started', desc: 'Step-by-step installation and quick start guides.' },
        { name: 'Documentation', desc: 'Full API reference, architecture, and developer manuals.' },
        { name: 'Community Forums', desc: 'Ask questions, share projects, and join discussions.' },
        { name: 'Security & Shields', desc: 'Learn about zero-trace privacy and browser shields.' },
      ],
    },
    {
      title: `What is ${query}? Comprehensive Guide 2026`,
      url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
      displayUrl: `https://en.wikipedia.org › wiki › ${encodeURIComponent(query)}`,
      snippet: `${query} is widely recognized across web technology, operating systems, and digital ecosystems. Discover history, key milestones, technical specifications, and recent updates.`,
    },
    {
      title: `${query} on GitHub - Open Source Repositories`,
      url: `https://github.com/topics/${encodeURIComponent(query)}`,
      displayUrl: `https://github.com › topics › ${cleanQuery.toLowerCase().replace(/\s+/g, '-')}`,
      snippet: `Browse top open source projects, tools, extensions, and libraries built for ${query}. Download source code and contribute.`,
    },
    {
      title: `Latest News & Updates about ${query}`,
      url: `https://news.google.com/search?q=${encodeURIComponent(query)}`,
      displayUrl: `https://news.google.com › search › ${encodeURIComponent(query)}`,
      snippet: `Read breaking news, expert analysis, security disclosures, and market trends related to ${query} updated minutes ago.`,
    },
  ];

  const faqs = [
    {
      q: `What are the main features of ${query}?`,
      a: `${query} offers powerful capabilities including automated processing, cross-platform compatibility, built-in security protocols, and seamless browser integration.`,
    },
    {
      q: `How do I install or use ${query}?`,
      a: `You can access ${query} directly through the address bar, ISTEK BROWSER extensions, or official developer portals with one-click setup.`,
    },
    {
      q: `Is ${query} free and secure?`,
      a: `Yes, standard usage of ${query} is protected by HTTPS encryption, ISTEK zero-trace privacy shields, and ISTEK BROWSER sandbox defense.`,
    },
  ];

  if (isHomepage && !query) {
    return (
      <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-6 relative font-sans select-none">
        {/* Top Right Header */}
        <div className="absolute top-6 right-6 flex items-center gap-4 text-xs text-slate-300 font-medium">
          <button onClick={() => onNavigateUrl('https://mail.google.com')} className="hover:underline">Gmail</button>
          <button onClick={() => onNavigateUrl('https://images.google.com')} className="hover:underline">Images</button>
        </div>

        {/* Centered Google Logo */}
        <div className="flex flex-col items-center max-w-2xl w-full">
          <div className="flex items-center text-6xl sm:text-7xl font-black tracking-tighter mb-8 cursor-pointer" onClick={() => onNavigateUrl('https://www.google.com')}>
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-amber-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-emerald-500">l</span>
            <span className="text-red-500">e</span>
          </div>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="w-full mb-8">
            <div className="relative flex items-center bg-slate-900 hover:bg-slate-800/90 border border-slate-800 focus-within:border-blue-500 rounded-full px-5 py-3.5 shadow-2xl transition-all">
              <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Google or type a URL"
                className="w-full bg-transparent text-base text-white placeholder-slate-500 focus:outline-none pr-20"
                autoFocus
              />
              <div className="absolute right-4 flex items-center gap-2.5 text-slate-400">
                <button type="button" className="hover:text-blue-400 p-1">
                  <Mic className="w-4 h-4" />
                </button>
                <button type="button" className="hover:text-amber-400 p-1">
                  <Camera className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3 mt-6">
              <button
                type="submit"
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg text-xs font-semibold transition-colors"
              >
                Google Search
              </button>
              <button
                type="button"
                onClick={() => onNavigateUrl('https://geniusvideogamer2.github.io/pados/')}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg text-xs font-semibold transition-colors"
              >
                I'm Feeling Lucky
              </button>
            </div>
          </form>

          {/* Shortcuts Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 w-full max-w-lg mt-4">
            {shortcuts.map((sc, i) => (
              <div
                key={i}
                onClick={() => onNavigateUrl(sc.url)}
                className="flex flex-col items-center gap-2 p-3 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-800/80 rounded-2xl cursor-pointer transition-all hover:scale-105 group"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-xl shadow">
                  {sc.icon}
                </div>
                <span className="text-[11px] text-slate-400 group-hover:text-white font-medium truncate max-w-full">
                  {sc.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans select-none pb-24">
      {/* ISTEK BROWSER Search Top Header */}
      <div className="bg-slate-900 border-b border-slate-800 px-4 pt-4 pb-0 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-4 pb-3">
          {/* Google Logo */}
          <div
            onClick={() => onNavigateUrl('https://www.google.com')}
            className="cursor-pointer shrink-0 flex items-center gap-1 font-black text-2xl tracking-tighter"
          >
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-amber-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-emerald-500">l</span>
            <span className="text-red-500">e</span>
          </div>

          {/* Main Google Search Input Bar */}
          <form onSubmit={handleSearch} className="flex-1 w-full max-w-3xl">
            <div className="relative flex items-center bg-slate-800/90 hover:bg-slate-800 border border-slate-700 focus-within:border-blue-500 rounded-full px-4 py-2.5 shadow-lg transition-all">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Google or type a URL"
                className="w-full bg-transparent text-sm text-white placeholder-slate-400 focus:outline-none pr-24"
              />
              <div className="absolute right-3 flex items-center gap-2 text-slate-400">
                <button type="button" className="hover:text-blue-400 p-1">
                  <Mic className="w-4 h-4" />
                </button>
                <button type="button" className="hover:text-amber-400 p-1">
                  <Camera className="w-4 h-4" />
                </button>
                <button type="submit" className="hover:text-white p-1 bg-blue-600 rounded-full text-white p-1.5 ml-1">
                  <Search className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>

          <button
            type="submit"
            className="hidden lg:flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md"
          >
            <span>Google Search</span>
          </button>
        </div>

        {/* Google Navigation Tabs */}
        <div className="max-w-7xl mx-auto flex items-center gap-6 text-xs font-semibold overflow-x-auto text-slate-400 pt-2 border-t border-slate-800/60 no-scrollbar">
          {[
            { id: 'all', label: 'All', icon: Search },
            { id: 'images', label: 'Images', icon: Globe },
            { id: 'news', label: 'News', icon: SlidersHorizontal },
            { id: 'videos', label: 'Videos', icon: Search },
            { id: 'maps', label: 'Maps', icon: Globe },
            { id: 'shopping', label: 'Shopping', icon: Search },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 pb-2.5 border-b-2 transition-colors whitespace-nowrap ${
                  isActive
                    ? 'border-blue-500 text-blue-400 font-bold'
                    : 'border-transparent hover:text-slate-200'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Results Container */}
      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
        {/* Left Column: Search Results */}
        <div className="lg:col-span-8 space-y-6">
          {/* Metadata counter */}
          <div className="text-xs text-slate-400 flex items-center justify-between">
            <span>About 4,820,000,000 results (0.29 seconds)</span>
            <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>SafeSearch Active</span>
            </span>
          </div>

          {/* Organic Results List */}
          <div className="space-y-6">
            {searchResults.map((result, idx) => (
              <div key={idx} className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-all group">
                {/* Domain Breadcrumb */}
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px] font-bold text-blue-400">
                    {result.displayUrl.slice(8, 9).toUpperCase()}
                  </div>
                  <div className="text-xs text-slate-400 font-mono truncate">{result.displayUrl}</div>
                </div>

                {/* Main Link Title */}
                <h3
                  onClick={() => onNavigateUrl(result.url)}
                  className="text-lg font-bold text-blue-400 hover:underline cursor-pointer flex items-center gap-2 group-hover:text-blue-300"
                >
                  <span>{result.title}</span>
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400" />
                </h3>

                {/* Snippet text */}
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">{result.snippet}</p>

                {/* Sitelinks if available */}
                {result.sitelinks && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-800/60">
                    {result.sitelinks.map((s, sIdx) => (
                      <div
                        key={sIdx}
                        onClick={() => onNavigateUrl(result.url)}
                        className="p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 cursor-pointer transition-colors"
                      >
                        <div className="text-xs font-bold text-blue-400 hover:underline">{s.name}</div>
                        <div className="text-[11px] text-slate-400 mt-0.5 line-clamp-1">{s.desc}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* People Also Ask Section */}
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white mb-2">People also ask</h3>
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-slate-800 last:border-0 pb-3">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                  className="w-full text-left flex items-center justify-between text-xs font-semibold text-slate-200 hover:text-blue-400 py-1"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
                </button>
                {expandedFaq === index && (
                  <div className="text-xs text-slate-400 mt-2 pl-2 border-l-2 border-blue-500 py-1 leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Google Knowledge Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 p-5 rounded-2xl border border-slate-800 space-y-4 shadow-lg sticky top-28">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white">{query}</h2>
                <span className="text-[11px] text-slate-400 font-medium">Technology & Web Concept</span>
              </div>
              <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/30 text-blue-400 font-mono text-xs font-bold">
                2026 Verified
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              {query} is an active technology subject in modern computer science, cloud computing, and web browsing infrastructure.
            </p>

            <div className="space-y-2 text-xs border-t border-slate-800 pt-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Category</span>
                <span className="font-semibold text-slate-200">Software & Web</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Primary Engine</span>
                <span className="font-semibold text-slate-200">ISTEK BROWSER</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Shield Protection</span>
                <span className="font-semibold text-emerald-400">ISTEK Zero-Trace</span>
              </div>
            </div>

            <button
              onClick={() => onNavigateUrl(`https://www.google.com/search?q=${encodeURIComponent(query)}`)}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-md"
            >
              <span>Explore Direct Google Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
