import React, { useState } from 'react';
import { ShieldSettings, HistorySettings } from '../types';
import { X, Settings, Shield, Sparkles, Globe, Smartphone, Download, Copy, Check, History, Search, Trash2 } from 'lucide-react';
import { IstekLogo } from './IstekLogo';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  shieldSettings: ShieldSettings;
  onUpdateShieldSettings: (newSettings: ShieldSettings) => void;
  historySettings: HistorySettings;
  onToggleSearchHistory: () => void;
  onToggleSiteHistory: () => void;
  onOpenHistoryModal: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  shieldSettings,
  onUpdateShieldSettings,
  historySettings,
  onToggleSearchHistory,
  onToggleSiteHistory,
  onOpenHistoryModal,
}) => {
  const [activeTab, setActiveTab] = useState<'general' | 'history' | 'shields' | 'apk'>('general');
  const [copiedWorkflow, setCopiedWorkflow] = useState(false);

  if (!isOpen) return null;

  const workflowYaml = `name: Build Android APK (ISTEK Browser)

on:
  push:
    branches: [ "**" ]
  pull_request:
    branches: [ "**" ]
  workflow_dispatch:

jobs:
  build:
    name: Build Android APK
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install Dependencies
        run: npm install

      - name: Build Web Assets
        run: npm run build

      - name: Set up Java JDK 17
        uses: actions/setup-java@v4
        with:
          distribution: 'zulu'
          java-version: '17'

      - name: Add Android Platform & Sync Capacitor
        run: |
          npx cap add android || true
          npx cap sync android

      - name: Build Android Debug APK
        run: |
          cd android
          chmod +x gradlew
          ./gradlew assembleDebug --stacktrace

      - name: Upload APK Artifact
        uses: actions/upload-artifact@v4
        with:
          name: ISTEK-Browser-APK
          path: android/app/build/outputs/apk/debug/app-debug.apk
          retention-days: 30`;

  const handleCopyWorkflow = () => {
    navigator.clipboard.writeText(workflowYaml);
    setCopiedWorkflow(true);
    setTimeout(() => setCopiedWorkflow(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-fade-in select-none">
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-orange-600/20 text-orange-400 border border-orange-500/30 flex items-center justify-center">
              <IstekLogo size={24} />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-white">ISTEK Preferences & Security</h2>
              <p className="text-xs text-slate-400">
                Global Browser Settings • Made by{' '}
                <a
                  href="https://youtube.com/@gamex_t_u_r_k"
                  target="_blank"
                  rel="noreferrer"
                  className="text-red-400 font-bold hover:underline"
                >
                  https://youtube.com/@gamex_t_u_r_k
                </a>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection Row */}
        <div className="px-5 pt-3 bg-slate-950/60 border-b border-slate-800 flex items-center gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('general')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'general'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            <span>Search & General</span>
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'history'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <History className="w-3.5 h-3.5 text-blue-400" />
            <span>Search & Site History</span>
          </button>

          <button
            onClick={() => setActiveTab('shields')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'shields'
                ? 'border-orange-500 text-orange-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>ISTEK Shields</span>
          </button>

          <button
            onClick={() => setActiveTab('apk')}
            className={`px-3 py-2 text-xs font-bold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'apk'
                ? 'border-emerald-500 text-emerald-400'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
            <span>GitHub APK Workflow</span>
          </button>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          {activeTab === 'general' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Globe className="w-4 h-4 text-orange-400" />
                Default Search Engine
              </h3>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white">Google Search (Default)</div>
                    <div className="text-[10px] text-slate-400">ISTEK BROWSER primary search motor engine integrated into address bar & new tab.</div>
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                    Active
                  </span>
                </div>
                <div className="text-xs text-slate-400 pt-2 border-t border-slate-800/80 flex items-center justify-between">
                  <span>Address bar & New Tab Motor Engine</span>
                  <select className="bg-slate-900 border border-slate-700 text-xs font-bold text-white rounded-xl px-2.5 py-1 focus:outline-none">
                    <option value="google">Google Search (ISTEK Engine)</option>
                    <option value="istek">ISTEK Private Search</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400 flex items-center gap-1.5">
                  <History className="w-4 h-4 text-blue-400" />
                  Search & Site History Preferences
                </h3>

                <button
                  onClick={() => {
                    onClose();
                    onOpenHistoryModal();
                  }}
                  className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
                >
                  <History className="w-3.5 h-3.5" />
                  <span>Open Full History View</span>
                </button>
              </div>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-4">
                {/* Search History Toggle */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-blue-400" />
                      Search History Logging
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Saves search queries entered in Google address bar and search engine. Disable to stop saving searches.
                    </p>
                  </div>

                  <button
                    onClick={onToggleSearchHistory}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                      historySettings.searchHistoryEnabled
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}
                  >
                    {historySettings.searchHistoryEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>

                {/* Site History Toggle */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div>
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-emerald-400" />
                      Website Visiting History Logging
                    </div>
                    <p className="text-[10px] text-slate-400 mt-0.5">
                      Logs web pages, titles, and URLs you visit across tabs. Disable to stop logging visited sites.
                    </p>
                  </div>

                  <button
                    onClick={onToggleSiteHistory}
                    className={`px-3 py-1 rounded-full text-xs font-bold transition-all shrink-0 ${
                      historySettings.siteHistoryEnabled
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                    }`}
                  >
                    {historySettings.siteHistoryEnabled ? 'ENABLED' : 'DISABLED'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'shields' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-orange-400" />
                ISTEK Shields Defaults
              </h3>

              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-white">Global Trackers & Ad Blocking</div>
                    <div className="text-[10px] text-slate-400">Default blocking level for all websites</div>
                  </div>
                  <select
                    value={shieldSettings.trackersBlockingLevel}
                    onChange={(e) =>
                      onUpdateShieldSettings({
                        ...shieldSettings,
                        trackersBlockingLevel: e.target.value as any,
                      })
                    }
                    className="bg-slate-900 border border-slate-700 text-xs font-bold text-orange-400 rounded-xl px-3 py-1.5 focus:outline-none"
                  >
                    <option value="aggressive">Aggressive Mode</option>
                    <option value="standard">Standard Protection</option>
                    <option value="allow">Allow All</option>
                  </select>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div>
                    <div className="text-xs font-semibold text-white">HTTPS Everywhere</div>
                    <div className="text-[10px] text-slate-400">Upgrade insecure HTTP connections to HTTPS</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={shieldSettings.httpsOnlyMode}
                    onChange={(e) =>
                      onUpdateShieldSettings({
                        ...shieldSettings,
                        httpsOnlyMode: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-orange-500 cursor-pointer"
                  />
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
                  <div>
                    <div className="text-xs font-semibold text-white">Fingerprinting Protection</div>
                    <div className="text-[10px] text-slate-400">Block canvas, audio, and device fingerprinting</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={shieldSettings.fingerprintProtection}
                    onChange={(e) =>
                      onUpdateShieldSettings({
                        ...shieldSettings,
                        fingerprintProtection: e.target.checked,
                      })
                    }
                    className="w-4 h-4 accent-orange-500 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'ai' && (
            <div className="space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" />
                ISTEK AI Engine Configuration
              </h3>
              <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-xs font-bold text-white">AI Engine</div>
                    <div className="text-[10px] text-slate-400">Server-side Gemini 3.6 Flash AI Architecture</div>
                  </div>
                  <span className="text-xs font-bold text-orange-400 bg-orange-500/10 px-2.5 py-1 rounded-full border border-orange-500/30">
                    gemini-3.6-flash
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'apk' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                  <Smartphone className="w-4 h-4 text-emerald-400" />
                  GitHub Actions Build APK Workflow
                </h3>

                <button
                  onClick={handleCopyWorkflow}
                  className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all"
                >
                  {copiedWorkflow ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Workflow YAML</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                This project includes a complete <strong>GitHub Actions Workflow</strong> configured in <code className="text-emerald-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded">.github/workflows/build-apk.yml</code>.
              </p>

              <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800 space-y-2 text-xs text-slate-300">
                <div className="font-bold text-white text-xs mb-1 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  How to trigger the APK build:
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-slate-300 text-[11px] leading-relaxed">
                  <li>Click <strong>Export / Settings</strong> in the top right menu of AI Studio Build.</li>
                  <li>Select <strong>Export to GitHub</strong> or <strong>Download ZIP</strong>.</li>
                  <li>Push or commit the project to your GitHub repository on branch <code className="text-emerald-400 font-mono">main</code>.</li>
                  <li>Go to your GitHub repository &rarr; <strong>Actions</strong> tab to watch the build and download your <code className="text-emerald-400 font-mono">app-debug.apk</code> under <strong>Artifacts</strong>!</li>
                </ol>
              </div>

              <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800 font-mono text-[11px] text-slate-300 max-h-44 overflow-y-auto leading-tight select-text">
                <pre>{workflowYaml}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 bg-slate-900/80 py-2 px-3 rounded-xl border border-slate-800">
            <span>Made by</span>
            <a
              href="https://youtube.com/@gamex_t_u_r_k"
              target="_blank"
              rel="noreferrer"
              className="text-red-400 hover:text-red-300 font-bold underline flex items-center gap-1"
            >
              <span>https://youtube.com/@gamex_t_u_r_k</span>
            </a>
          </div>

          <button
            onClick={onClose}
            className="w-full py-2.5 bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white rounded-xl transition-colors shadow-lg shadow-orange-600/20"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};
