import React, { useState, useEffect } from 'react';
import { Search, Play, ThumbsUp, MessageSquare, Share2, Youtube, Flame, Compass, Library, History, Bell, User, ExternalLink } from 'lucide-react';

interface YouTubeVideoItem {
  videoId: string;
  title: string;
  channelTitle: string;
  viewCountText: string;
  publishedTimeText: string;
  lengthText: string;
  thumbnailUrl: string;
  embedUrl: string;
  url: string;
}

interface YouTubeViewerProps {
  url: string;
  onNavigateUrl: (url: string) => void;
}

export const YouTubeViewer: React.FC<YouTubeViewerProps> = ({ url, onNavigateUrl }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);
  const [videoTitle, setVideoTitle] = useState<string>('');
  const [authorName, setAuthorName] = useState<string>('YouTube Creator');
  const [videos, setVideos] = useState<YouTubeVideoItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeCategory, setActiveCategory] = useState<string>('All');

  // Parse video ID or search query from URL prop
  useEffect(() => {
    if (url.includes('v=')) {
      const match = url.match(/[?&]v=([^&]+)/);
      if (match && match[1]) {
        setSelectedVideoId(match[1]);
      }
    } else if (url.includes('search_query=')) {
      const match = url.match(/[?&]search_query=([^&]+)/);
      if (match && match[1]) {
        const q = decodeURIComponent(match[1]);
        setSearchQuery(q);
        fetchSearch(q);
        setSelectedVideoId(null);
        return;
      }
    } else {
      setSelectedVideoId(null);
    }

    fetchSearch(searchQuery || 'trending gaming music coding news');
  }, [url]);

  useEffect(() => {
    if (selectedVideoId) {
      fetch(`/api/youtube/video?v=${selectedVideoId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.title) setVideoTitle(data.title);
          if (data.authorName) setAuthorName(data.authorName);
        })
        .catch((err) => console.error('Video fetch error', err));
    }
  }, [selectedVideoId]);

  const fetchSearch = async (queryText: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/youtube/search?q=${encodeURIComponent(queryText)}&maxResults=16`);
      const data = await res.json();
      if (data.items && Array.isArray(data.items)) {
        setVideos(data.items);
      }
    } catch (e) {
      console.error('YouTube search error', e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    onNavigateUrl(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`);
  };

  const handleSelectVideo = (video: YouTubeVideoItem) => {
    setSelectedVideoId(video.videoId);
    setVideoTitle(video.title);
    setAuthorName(video.channelTitle);
    onNavigateUrl(`https://www.youtube.com/watch?v=${video.videoId}`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-950 text-slate-100 flex flex-col select-none">
      {/* Top YouTube Header */}
      <div className="h-14 bg-slate-900 border-b border-slate-800 px-4 flex items-center justify-between gap-4 sticky top-0 z-30">
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-90"
          onClick={() => {
            setSelectedVideoId(null);
            onNavigateUrl('https://www.youtube.com');
          }}
        >
          <div className="w-8 h-8 rounded-xl bg-red-600 flex items-center justify-center text-white shadow-lg shadow-red-600/30">
            <Youtube className="w-5 h-5 fill-current" />
          </div>
          <span className="font-black text-lg tracking-tight text-white flex items-center gap-1">
            YouTube <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-800 text-red-400 border border-red-500/30 uppercase">API Engine</span>
          </span>
        </div>

        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex-1 max-w-xl mx-auto">
          <div className="relative flex items-center bg-slate-950 border border-slate-800 focus-within:border-red-500 rounded-full px-4 py-1.5 shadow-inner transition-all">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search YouTube videos, channels, topics..."
              className="w-full bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none"
            />
            <button type="submit" className="text-slate-400 hover:text-red-400 p-1">
              <Search className="w-4 h-4" />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-full hover:bg-slate-800 text-slate-300">
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-8 h-8 rounded-full bg-red-600/20 text-red-400 font-bold border border-red-500/40 flex items-center justify-center text-xs">
            Y
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-56 bg-slate-900/60 border-r border-slate-800/80 p-3 hidden md:flex flex-col gap-1 text-xs shrink-0">
          <button
            onClick={() => {
              setSelectedVideoId(null);
              onNavigateUrl('https://www.youtube.com');
            }}
            className={`flex items-center gap-3 px-3 py-2 rounded-xl font-bold transition-all ${
              !selectedVideoId ? 'bg-red-600 text-white shadow' : 'text-slate-300 hover:bg-slate-800'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Home Trending</span>
          </button>

          <button
            onClick={() => onNavigateUrl('https://www.youtube.com/results?search_query=gaming')}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 font-semibold"
          >
            <Compass className="w-4 h-4 text-blue-400" />
            <span>Gaming & Esports</span>
          </button>

          <button
            onClick={() => onNavigateUrl('https://www.youtube.com/results?search_query=music')}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 font-semibold"
          >
            <Library className="w-4 h-4 text-purple-400" />
            <span>Music Hits</span>
          </button>

          <button
            onClick={() => onNavigateUrl('https://www.youtube.com/results?search_query=programming')}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-slate-300 hover:bg-slate-800 font-semibold"
          >
            <History className="w-4 h-4 text-emerald-400" />
            <span>Coding & Tech</span>
          </button>

          <div className="mt-auto pt-4 border-t border-slate-800/80 text-[11px] text-slate-500 p-2">
            <span>Powered by Python YouTube API & Google Engine</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-4 overflow-y-auto max-h-[calc(100vh-136px)] space-y-6">
          {/* Active Player View if selected */}
          {selectedVideoId && (
            <div className="space-y-4 max-w-5xl mx-auto">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideoId}?autoplay=1&enablejsapi=1`}
                  title={videoTitle || 'YouTube Video Player'}
                  className="w-full h-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>

              <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl space-y-3">
                <h1 className="text-base sm:text-lg font-bold text-white">{videoTitle || 'YouTube Video Player'}</h1>

                <div className="flex items-center justify-between gap-4 flex-wrap text-xs text-slate-300 border-t border-slate-800/80 pt-3">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-red-600/30 text-red-400 font-black border border-red-500/40 flex items-center justify-center text-sm">
                      {authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold text-white text-sm">{authorName}</div>
                      <span className="text-[10px] text-slate-400">Verified YouTube Channel</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold">
                      <ThumbsUp className="w-3.5 h-3.5" />
                      <span>Like</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold">
                      <Share2 className="w-3.5 h-3.5" />
                      <span>Share</span>
                    </button>
                    <a
                      href={`https://www.youtube.com/watch?v=${selectedVideoId}`}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open in YouTube</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Video Grid Section */}
          <div className="max-w-6xl mx-auto space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-extrabold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Youtube className="w-4 h-4 text-red-500" />
                <span>{selectedVideoId ? 'Recommended Related Videos' : searchQuery ? `Search Results for "${searchQuery}"` : 'Trending YouTube Videos'}</span>
              </h2>

              <span className="text-xs text-slate-500 font-mono">{videos.length} videos loaded</span>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                  <div key={n} className="bg-slate-900 border border-slate-800 rounded-2xl p-3 animate-pulse space-y-3">
                    <div className="w-full h-36 bg-slate-800 rounded-xl" />
                    <div className="h-4 bg-slate-800 rounded w-3/4" />
                    <div className="h-3 bg-slate-800/60 rounded w-1/2" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {videos.map((video) => (
                  <div
                    key={video.videoId}
                    onClick={() => handleSelectVideo(video)}
                    className="group bg-slate-900 hover:bg-slate-800/90 border border-slate-800 hover:border-red-500/50 rounded-2xl p-2.5 transition-all cursor-pointer shadow-lg hover:scale-[1.02]"
                  >
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-slate-950 mb-2.5">
                      <img
                        src={video.thumbnailUrl}
                        alt={video.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                      {video.lengthText && (
                        <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-bold px-1.5 py-0.5 rounded backdrop-blur-sm">
                          {video.lengthText}
                        </span>
                      )}
                      <div className="absolute inset-0 bg-red-600/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg shadow-red-600/40">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>
                    </div>

                    <h3 className="text-xs font-bold text-slate-100 line-clamp-2 group-hover:text-red-400 transition-colors leading-snug">
                      {video.title}
                    </h3>

                    <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-400">
                      <span className="truncate max-w-[120px] font-semibold text-slate-300">{video.channelTitle}</span>
                      <span>{video.viewCountText}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
