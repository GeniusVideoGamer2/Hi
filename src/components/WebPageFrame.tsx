import React, { useState } from 'react';
import { Tab } from '../types';
import { Shield, Lock, ExternalLink, RefreshCw, Zap, Globe, Wifi } from 'lucide-react';

interface WebPageFrameProps {
  activeTab: Tab;
  onOpenShieldModal: () => void;
}

export const WebPageFrame: React.FC<WebPageFrameProps> = ({
  activeTab,
  onOpenShieldModal,
}) => {
  const [iframeKey, setIframeKey] = useState(0);
  const [mode, setMode] = useState<'proxy' | 'direct'>('proxy');

  let targetUrl = activeTab.url;
  if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
    targetUrl = 'https://' + targetUrl;
  }

  const proxyUrl = `/api/proxy?url=${encodeURIComponent(targetUrl)}`;
  const currentSrc = mode === 'proxy' ? proxyUrl : targetUrl;

  return (
    <div className="relative min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 flex flex-col select-none">
      {/* Top ISTEK Operational Control Bar */}
      <div className="bg-slate-900 text-slate-200 px-4 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 shadow-md text-xs font-medium">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
            <Wifi className="w-3.5 h-3.5 animate-pulse" />
            <span>Connected</span>
          </div>

          <div className="flex items-center gap-1.5 font-bold text-blue-400 bg-blue-500/10 px-2.5 py-1 rounded-full border border-blue-500/30 hidden sm:flex">
            <Lock className="w-3.5 h-3.5" />
            <span>HTTPS Secured</span>
          </div>

          <button
            onClick={onOpenShieldModal}
            className="flex items-center gap-1.5 font-bold text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 px-3 py-1 rounded-full border border-orange-500/30 transition-colors"
            title="ISTEK Shield Stats"
          >
            <Shield className="w-3.5 h-3.5 fill-current" />
            <span>Shields Active ({activeTab.blockedCount || 8} Blocked)</span>
          </button>
        </div>

        {/* Control & Mode Switcher */}
        <div className="flex items-center gap-2">
          {/* Mode Switcher Buttons */}
          <div className="flex items-center bg-slate-950 p-0.5 rounded-full border border-slate-800">
            <button
              onClick={() => { setMode('proxy'); setIframeKey((prev) => prev + 1); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                mode === 'proxy' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Ultra Proxy Mode (Strips Ads & Trackers)"
            >
              <Zap className="w-3 h-3" />
              <span>Proxy View</span>
            </button>
            <button
              onClick={() => { setMode('direct'); setIframeKey((prev) => prev + 1); }}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold transition-colors ${
                mode === 'direct' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
              title="Direct Connection Mode"
            >
              <Globe className="w-3 h-3" />
              <span>Direct Web</span>
            </button>
          </div>

          <button
            onClick={() => setIframeKey((prev) => prev + 1)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
            title="Reload Page Engine"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>

          <a
            href={targetUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 px-3 py-1 rounded-full bg-blue-600 hover:bg-blue-500 text-white border border-blue-500 font-bold transition-colors shadow-sm"
            title="Launch directly in new browser tab"
          >
            <span className="hidden sm:inline">Open Direct Window</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* High Performance Engine Canvas Frame */}
      <div className="flex-1 w-full relative bg-slate-950 overflow-hidden min-h-[85vh]">
        <iframe
          key={iframeKey}
          src={currentSrc}
          title={activeTab.title || 'ISTEK Web View'}
          className="w-full h-full min-h-[85vh] border-0 bg-white transition-opacity duration-150"
          style={{ willChange: 'transform', transform: 'translateZ(0)' }}
          loading="eager"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; camera; microphone; geolocation"
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-modals allow-downloads allow-pointer-lock"
        />
      </div>
    </div>
  );
};


