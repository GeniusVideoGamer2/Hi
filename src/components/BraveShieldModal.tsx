import React from 'react';
import { ShieldSettings, ShieldStats, BlockedTracker } from '../types';
import { Shield, X, AlertTriangle, Lock, Eye, Zap, Sliders } from 'lucide-react';

interface BraveShieldModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteDomain: string;
  shieldSettings: ShieldSettings;
  onUpdateSettings: (newSettings: ShieldSettings) => void;
  shieldStats: ShieldStats;
  blockedTrackers: BlockedTracker[];
}

export const BraveShieldModal: React.FC<BraveShieldModalProps> = ({
  isOpen,
  onClose,
  siteDomain,
  shieldSettings,
  onUpdateSettings,
  shieldStats,
  blockedTrackers,
}) => {
  if (!isOpen) return null;

  const toggleShield = () => {
    onUpdateSettings({
      ...shieldSettings,
      enabled: !shieldSettings.enabled,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-slate-950/60 backdrop-blur-sm animate-fade-in select-none">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden text-slate-100 my-auto">
        {/* Header Banner */}
        <div
          className={`p-5 transition-colors ${
            shieldSettings.enabled
              ? 'bg-gradient-to-r from-orange-600 via-amber-600 to-orange-700'
              : 'bg-slate-800'
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 fill-white/20 text-white" />
              <span className="font-bold text-lg text-white">ISTEK Shields</span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <p className="text-xs text-white/90 font-medium">
            Shields protect your privacy and speed up browsing on <span className="font-bold">{siteDomain || 'all websites'}</span>.
          </p>

          {/* Toggle Switch */}
          <div className="mt-4 flex items-center justify-between bg-black/20 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10">
            <div className="flex items-center gap-2">
              <span className={`w-2.5 h-2.5 rounded-full ${shieldSettings.enabled ? 'bg-emerald-400 animate-pulse' : 'bg-slate-500'}`} />
              <span className="text-sm font-bold text-white">
                {shieldSettings.enabled ? 'Shields UP for this site' : 'Shields DOWN'}
              </span>
            </div>
            <button
              onClick={toggleShield}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                shieldSettings.enabled ? 'bg-emerald-500' : 'bg-slate-600'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  shieldSettings.enabled ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 max-h-[70vh] overflow-y-auto space-y-5">
          {/* Real-time Block Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Trackers & Ads</span>
                <Eye className="w-3.5 h-3.5 text-orange-400" />
              </div>
              <div className="text-2xl font-black text-orange-400 mt-1">
                {shieldStats.trackersBlocked}
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Intercepted & Blocked</div>
            </div>

            <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
                <span>Bandwidth Saved</span>
                <Zap className="w-3.5 h-3.5 text-amber-400" />
              </div>
              <div className="text-2xl font-black text-amber-400 mt-1">
                {shieldStats.bandwidthSavedMb} <span className="text-xs font-medium text-slate-400">MB</span>
              </div>
              <div className="text-[10px] text-slate-500 mt-0.5">Saved loading data</div>
            </div>
          </div>

          {/* Blocked Trackers Inspector List */}
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
              <span>Trackers Blocked on Page ({blockedTrackers.length})</span>
              <span className="text-[10px] text-emerald-400 font-semibold">Protected</span>
            </div>

            <div className="bg-slate-950 rounded-xl border border-slate-800 divide-y divide-slate-800/60 max-h-40 overflow-y-auto">
              {blockedTrackers.length === 0 ? (
                <div className="p-4 text-center text-xs text-slate-500">
                  No trackers detected or shields currently disabled.
                </div>
              ) : (
                blockedTrackers.map((tracker) => (
                  <div key={tracker.id} className="p-2.5 flex items-center justify-between text-xs hover:bg-slate-900/50">
                    <div>
                      <div className="font-mono font-bold text-slate-200">{tracker.domain}</div>
                      <div className="text-[10px] text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span className="text-orange-400 font-medium">{tracker.category}</span>
                        <span>•</span>
                        <span>{tracker.company}</span>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">
                      Blocked ({tracker.blockedCount})
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Advanced Shield Controls Toggles */}
          <div className="space-y-3 pt-2 border-t border-slate-800">
            <div className="flex items-center justify-between text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span className="flex items-center gap-1.5">
                <Sliders className="w-3.5 h-3.5 text-orange-400" />
                Advanced Controls
              </span>
            </div>

            {/* Tracker Blocking Mode Dropdown */}
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">Trackers & Ads Blocking</span>
              <select
                value={shieldSettings.trackersBlockingLevel}
                onChange={(e) =>
                  onUpdateSettings({
                    ...shieldSettings,
                    trackersBlockingLevel: e.target.value as any,
                  })
                }
                className="bg-slate-900 border border-slate-700 text-xs font-bold text-orange-400 rounded-lg px-2.5 py-1 focus:outline-none focus:border-orange-500"
              >
                <option value="aggressive">Aggressive Mode</option>
                <option value="standard">Standard Protection</option>
                <option value="allow">Allow All Trackers</option>
              </select>
            </div>

            {/* HTTPS Only Mode Switch */}
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Lock className="w-4 h-4 text-emerald-400" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Upgrade Connections to HTTPS</div>
                  <div className="text-[10px] text-slate-500">Auto-encrypt unencrypted HTTP requests</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={shieldSettings.httpsOnlyMode}
                onChange={(e) =>
                  onUpdateSettings({
                    ...shieldSettings,
                    httpsOnlyMode: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
              />
            </div>

            {/* Fingerprinting Protection */}
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-orange-400" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Block Canvas & Device Fingerprinting</div>
                  <div className="text-[10px] text-slate-500">Prevent hardware-based user identification</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={shieldSettings.fingerprintProtection}
                onChange={(e) =>
                  onUpdateSettings({
                    ...shieldSettings,
                    fingerprintProtection: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
              />
            </div>

            {/* Script Blocking */}
            <div className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <div>
                  <div className="text-xs font-semibold text-slate-200">Block Javascript Scripts</div>
                  <div className="text-[10px] text-slate-500">Strict mode (may break some interactive features)</div>
                </div>
              </div>
              <input
                type="checkbox"
                checked={shieldSettings.blockScripts}
                onChange={(e) =>
                  onUpdateSettings({
                    ...shieldSettings,
                    blockScripts: e.target.checked,
                  })
                }
                className="w-4 h-4 accent-orange-500 rounded cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 bg-slate-950 border-t border-slate-800 text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-orange-600 hover:bg-orange-500 font-bold text-xs text-white rounded-xl transition-colors shadow-lg shadow-orange-600/20"
          >
            Done & Apply Shield Settings
          </button>
        </div>
      </div>
    </div>
  );
};
