import React, { useState } from 'react';
import { Tab, ShieldSettings, ShieldStats, BlockedTracker, HistoryItem, HistorySettings } from './types';
import { HeaderBar } from './components/HeaderBar';
import { NewTabPage } from './components/NewTabPage';
import { GoogleSearchEngine } from './components/GoogleSearchEngine';
import { BraveRewards } from './components/BraveRewards';
import { WebPageFrame } from './components/WebPageFrame';
import { YouTubeViewer } from './components/YouTubeViewer';
import { BraveShieldModal } from './components/BraveShieldModal';
import { SettingsModal } from './components/SettingsModal';
import { HistoryModal } from './components/HistoryModal';
import { LeftBottomHistoryWidget } from './components/LeftBottomHistoryWidget';

export default function App() {
  const [tabs, setTabs] = useState<Tab[]>([
    {
      id: 'tab_ntp',
      title: 'New Tab',
      url: 'istek://newtab',
      favicon: '⚡',
      type: 'ntp',
      active: true,
      blockedCount: 0,
      httpsUpgraded: true,
    },
  ]);

  const [activeTabId, setActiveTabId] = useState<string>('tab_ntp');

  const [shieldSettings, setShieldSettings] = useState<ShieldSettings>({
    enabled: true,
    trackersBlockingLevel: 'aggressive',
    httpsOnlyMode: true,
    blockCookies: true,
    blockScripts: false,
    fingerprintProtection: true,
  });

  const [shieldStats, setShieldStats] = useState<ShieldStats>({
    trackersBlocked: 3482,
    adsBlocked: 2190,
    fingerprintsBlocked: 412,
    httpsUpgrades: 890,
    bandwidthSavedMb: 842,
    timeSavedMinutes: 148,
  });

  const [historySettings, setHistorySettings] = useState<HistorySettings>({
    searchHistoryEnabled: true,
    siteHistoryEnabled: true,
  });

  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([
    {
      id: 'h1',
      type: 'site',
      queryOrUrl: 'https://geniusvideogamer2.github.io/pados/',
      title: 'Pados Game',
      favicon: '🎮',
      timestamp: '1:30 PM',
      date: 'Today',
    },
    {
      id: 'h2',
      type: 'search',
      queryOrUrl: 'https://www.google.com/search?q=Pados+Game',
      title: 'Google Search: Pados Game',
      favicon: '🔍',
      timestamp: '1:28 PM',
      date: 'Today',
    },
    {
      id: 'h3',
      type: 'site',
      queryOrUrl: 'https://www.youtube.com',
      title: 'YouTube',
      favicon: '▶️',
      timestamp: '1:15 PM',
      date: 'Today',
    },
    {
      id: 'h4',
      type: 'search',
      queryOrUrl: 'https://www.google.com/search?q=YouTube',
      title: 'Google Search: YouTube',
      favicon: '🔍',
      timestamp: '1:10 PM',
      date: 'Today',
    },
  ]);

  const [isShieldModalOpen, setIsShieldModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);

  const activeTab = tabs.find((t) => t.id === activeTabId) || tabs[0];

  // Derive blocked trackers for current tab
  const getBlockedTrackersForTab = (): BlockedTracker[] => {
    if (!shieldSettings.enabled) return [];
    return [
      { id: 'bt1', domain: 'doubleclick.net', company: 'Google Ad Network', category: 'Ad Tracker', threatLevel: 'High', blockedCount: 14, timestamp: '10:45 AM' },
      { id: 'bt2', domain: 'facebook.net/pixel.js', company: 'Meta Platforms', category: 'Social Tracker', threatLevel: 'High', blockedCount: 8, timestamp: '10:45 AM' },
      { id: 'bt3', domain: 'google-analytics.com', company: 'Google LLC', category: 'Analytics', threatLevel: 'Medium', blockedCount: 12, timestamp: '10:45 AM' },
    ];
  };

  const handleSelectTab = (id: string) => {
    setActiveTabId(id);
    setTabs((prev) => prev.map((t) => ({ ...t, active: t.id === id })));
  };

  const handleCloseTab = (id: string) => {
    if (tabs.length <= 1) return;
    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);
    if (activeTabId === id) {
      setActiveTabId(newTabs[0].id);
    }
  };

  const handleNewTab = () => {
    const newId = 'tab_' + Date.now();
    const newTabObj: Tab = {
      id: newId,
      title: 'New Tab',
      url: 'istek://newtab',
      favicon: '⚡',
      type: 'ntp',
      active: true,
      blockedCount: 0,
      httpsUpgraded: true,
    };
    setTabs((prev) => [...prev.map((t) => ({ ...t, active: false })), newTabObj]);
    setActiveTabId(newId);
  };

  const handleToggleSearchHistory = () => {
    setHistorySettings((prev) => ({
      ...prev,
      searchHistoryEnabled: !prev.searchHistoryEnabled,
    }));
  };

  const handleToggleSiteHistory = () => {
    setHistorySettings((prev) => ({
      ...prev,
      siteHistoryEnabled: !prev.siteHistoryEnabled,
    }));
  };

  const handleClearHistory = (type?: 'search' | 'site' | 'all') => {
    if (!type || type === 'all') {
      setHistoryItems([]);
    } else {
      setHistoryItems((prev) => prev.filter((i) => i.type !== type));
    }
  };

  const handleDeleteHistoryItem = (id: string) => {
    setHistoryItems((prev) => prev.filter((i) => i.id !== id));
  };

  const handleNavigateUrl = (targetUrl: string) => {
    let type: Tab['type'] = 'web';
    let title = targetUrl;
    let favicon = '🌐';
    let blockedCount = Math.floor(Math.random() * 10) + 2;

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (targetUrl === 'istek://newtab' || targetUrl === 'brave://newtab') {
      type = 'ntp';
      title = 'New Tab';
      favicon = '⚡';
      blockedCount = 0;
    } else if (targetUrl === 'istek://rewards' || targetUrl === 'brave://rewards') {
      type = 'rewards';
      title = 'Rewards';
      favicon = '🦇';
      blockedCount = 0;
    } else if (targetUrl === 'https://www.google.com' || targetUrl === 'https://google.com' || targetUrl === 'google.com') {
      type = 'search';
      title = 'Google';
      favicon = '🔍';
      blockedCount = 0;

      if (historySettings.searchHistoryEnabled) {
        setHistoryItems((prev) => [
          {
            id: 'h_' + Date.now(),
            type: 'search',
            queryOrUrl: targetUrl,
            title: 'Google Homepage',
            favicon: '🔍',
            timestamp: timeStr,
            date: 'Today',
          },
          ...prev,
        ]);
      }
    } else {
      type = 'web';
      const isSearchQuery = targetUrl.includes('google.com/search') || targetUrl.includes('q=');

      if (targetUrl.includes('youtube.com')) {
        favicon = '▶️';
        title = 'YouTube';
      } else if (isSearchQuery) {
        favicon = '🔍';
        const qMatch = targetUrl.match(/q=([^&]+)/);
        const qText = qMatch ? decodeURIComponent(qMatch[1]) : 'Search Query';
        title = `Google Search: ${qText}`;
      } else if (targetUrl.includes('pados')) {
        favicon = '🎮';
        title = 'Pados Game';
      } else {
        title = targetUrl.replace(/^https?:\/\//, '').split('/')[0];
        favicon = '🌐';
      }

      setShieldStats((prev) => ({
        ...prev,
        trackersBlocked: prev.trackersBlocked + blockedCount,
        bandwidthSavedMb: prev.bandwidthSavedMb + Math.floor(blockedCount * 0.4),
      }));

      if (isSearchQuery && historySettings.searchHistoryEnabled) {
        setHistoryItems((prev) => [
          {
            id: 'h_' + Date.now(),
            type: 'search',
            queryOrUrl: targetUrl,
            title: title,
            favicon: favicon,
            timestamp: timeStr,
            date: 'Today',
          },
          ...prev,
        ]);
      } else if (!isSearchQuery && historySettings.siteHistoryEnabled) {
        setHistoryItems((prev) => [
          {
            id: 'h_' + Date.now(),
            type: 'site',
            queryOrUrl: targetUrl,
            title: title,
            favicon: favicon,
            timestamp: timeStr,
            date: 'Today',
          },
          ...prev,
        ]);
      }
    }

    setTabs((prev) =>
      prev.map((t) => {
        if (t.id === activeTabId) {
          return {
            ...t,
            url: targetUrl,
            title,
            favicon,
            type,
            blockedCount,
          };
        }
        return t;
      })
    );
  };

  const handleOpenRewards = () => handleNavigateUrl('istek://rewards');

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans antialiased overflow-x-hidden">
      {/* Top Header & Omnibox */}
      <HeaderBar
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={handleSelectTab}
        onCloseTab={handleCloseTab}
        onNewTab={handleNewTab}
        onNavigateUrl={handleNavigateUrl}
        shieldSettings={shieldSettings}
        shieldStats={shieldStats}
        onToggleShieldModal={() => setIsShieldModalOpen(true)}
        onOpenRewards={handleOpenRewards}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenHistory={() => setIsHistoryModalOpen(true)}
        onGoHome={() => handleNavigateUrl('istek://newtab')}
      />

      {/* Main View Area */}
      <main className="flex-1 relative">
        {activeTab?.type === 'ntp' && (
          <NewTabPage
            shieldStats={shieldStats}
            onNavigateUrl={handleNavigateUrl}
            onOpenShieldModal={() => setIsShieldModalOpen(true)}
          />
        )}

        {activeTab?.type === 'search' && (
          <GoogleSearchEngine
            initialQuery="Google"
            onNavigateUrl={handleNavigateUrl}
          />
        )}

        {activeTab?.type === 'web' && (
          activeTab.url.includes('youtube.com') ? (
            <YouTubeViewer url={activeTab.url} onNavigateUrl={handleNavigateUrl} />
          ) : (
            <WebPageFrame
              activeTab={activeTab}
              onOpenShieldModal={() => setIsShieldModalOpen(false)}
            />
          )
        )}

        {activeTab?.type === 'rewards' && <BraveRewards onNavigateUrl={handleNavigateUrl} />}
      </main>

      {/* Left Bottom History Widget */}
      <LeftBottomHistoryWidget
        historySettings={historySettings}
        onToggleSearchHistory={handleToggleSearchHistory}
        onToggleSiteHistory={handleToggleSiteHistory}
        onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
      />

      {/* ISTEK Shield Popover Modal */}
      <BraveShieldModal
        isOpen={isShieldModalOpen}
        onClose={() => setIsShieldModalOpen(false)}
        siteDomain={activeTab?.url.replace(/^https?:\/\//, '').split('/')[0] || ''}
        shieldSettings={shieldSettings}
        onUpdateSettings={setShieldSettings}
        shieldStats={shieldStats}
        blockedTrackers={getBlockedTrackersForTab()}
      />

      {/* History Modal */}
      <HistoryModal
        isOpen={isHistoryModalOpen}
        onClose={() => setIsHistoryModalOpen(false)}
        historyItems={historyItems}
        historySettings={historySettings}
        onToggleSearchHistory={handleToggleSearchHistory}
        onToggleSiteHistory={handleToggleSiteHistory}
        onClearHistory={handleClearHistory}
        onDeleteHistoryItem={handleDeleteHistoryItem}
        onNavigateUrl={handleNavigateUrl}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        shieldSettings={shieldSettings}
        onUpdateShieldSettings={setShieldSettings}
        historySettings={historySettings}
        onToggleSearchHistory={handleToggleSearchHistory}
        onToggleSiteHistory={handleToggleSiteHistory}
        onOpenHistoryModal={() => setIsHistoryModalOpen(true)}
      />
    </div>
  );
}

