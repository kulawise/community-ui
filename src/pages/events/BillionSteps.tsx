import React, { useState, useEffect } from 'react';
import Navbar from "../../components/community/Navbar";
import CommunityFooter from "../../components/community/CommunityFooter";

interface LeaderboardEntry {
  user_id: string;
  username: string;
  first_name: string;
  last_name: string;
  avatar: string;
  steps: number;
  rank: number;
}

interface CampaignSnapshot {
  campaign: string;
  totalSteps: number;
  participants: number;
  distanceKm: number;
  progress: number;
  topUsers: LeaderboardEntry[];
  topCircles: any[];
  champions: any[];
  status: string;
  startAt?: string;
  endAt?: string;
  updatedAt: string;
}

const CAMPAIGN_SLUG = "latest";
const CACHE_KEY = `campaign_snapshot_latest`;
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

const getRelativeTime = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return "Just now";
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
  return `${Math.floor(diffInSeconds / 86400)} days ago`;
};

const formatDateRange = (start?: string, end?: string): string | null => {
  if (!start && !end) return null;
  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric', year: 'numeric' };
  
  if (start && end) {
    return `${new Date(start).toLocaleDateString('en-US', options)} - ${new Date(end).toLocaleDateString('en-US', options)}`;
  }
  if (start) {
    return `Starts ${new Date(start).toLocaleDateString('en-US', options)}`;
  }
  return `Ends ${new Date(end!).toLocaleDateString('en-US', options)}`;
};

const BillionSteps: React.FC = () => {
  const [currentTab, setCurrentTab] = useState<'users' | 'circles' | 'champions'>('users');
  
  // Stale-While-Revalidate: Load from localStorage instantly
  const [snapshot, setSnapshot] = useState<CampaignSnapshot | null>(() => {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const parsed: CampaignSnapshot = JSON.parse(cached);
        const cacheAge = new Date().getTime() - new Date(parsed.updatedAt).getTime();
        // Only use cache if it's fresher than 24 hours
        if (cacheAge < CACHE_EXPIRY_MS) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Failed to parse cached snapshot", e);
    }
    return null;
  });

  const [isConnected, setIsConnected] = useState(false);
  const [timeAgo, setTimeAgo] = useState<string>("");
  const [searchUsername, setSearchUsername] = useState("");
  const [searchResult, setSearchResult] = useState<LeaderboardEntry | null>(null);

  // Update relative time display
  useEffect(() => {
    if (snapshot?.updatedAt) {
      setTimeAgo(getRelativeTime(snapshot.updatedAt));
      const interval = setInterval(() => {
        setTimeAgo(getRelativeTime(snapshot.updatedAt));
      }, 60000); // Update every minute
      return () => clearInterval(interval);
    }
  }, [snapshot?.updatedAt]);

  // Main Connection logic (HTTP Backfill + SSE)
  useEffect(() => {
    let eventSource: EventSource | null = null;
    let pollInterval: ReturnType<typeof setInterval> | null = null;
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

    const handleSnapshot = (data: CampaignSnapshot) => {
      setSnapshot(data);
      localStorage.setItem(CACHE_KEY, JSON.stringify(data));
    };

    const fetchSnapshot = async () => {
      try {
        const res = await fetch(`${API_URL}/community/events/${CAMPAIGN_SLUG}/snapshot`);
        const data = await res.json();
        if (res.ok && data.data) {
          handleSnapshot(data.data);
        }
      } catch (e) {
        console.error("HTTP Fetch failed:", e);
      }
    };

    const connectSSE = () => {
      if (eventSource) eventSource.close();
      if (pollInterval) {
        clearInterval(pollInterval);
        pollInterval = null;
      }

      eventSource = new EventSource(`${API_URL}/community/events/${CAMPAIGN_SLUG}/stream`);
      
      eventSource.onopen = () => {
        setIsConnected(true);
      };

      eventSource.onmessage = (event) => {
        try {
          const data: CampaignSnapshot = JSON.parse(event.data);
          handleSnapshot(data);
        } catch (e) {
          console.error("SSE Parse Error", e);
        }
      };

      eventSource.onerror = () => {
        console.warn("SSE disconnected, falling back to polling");
        setIsConnected(false);
        eventSource?.close();
        
        // Start polling as fallback
        pollInterval = setInterval(fetchSnapshot, 30000);
        
        // Try to reconnect SSE after 10 seconds
        setTimeout(connectSSE, 10000);
      };
    };

    // 1. Instantly fetch the current snapshot to backfill stale UI
    fetchSnapshot().then(() => {
      // 2. Connect to the live stream
      connectSSE();
    });

    return () => {
      if (eventSource) eventSource.close();
      if (pollInterval) clearInterval(pollInterval);
    };
  }, []);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchUsername) return;
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';
      const res = await fetch(`${API_URL}/community/events/${CAMPAIGN_SLUG}/search?username=${searchUsername}`);
      const data = await res.json();
      if (res.ok && data.data) {
        setSearchResult(data.data);
      } else {
        setSearchResult(null);
        alert(data.error || "User not found");
      }
    } catch (e) {
      console.error("Search failed:", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      
      {/* Live Indicator */}
      <div className="bg-white border-b border-gray-200 py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center text-xs">
          <div className="flex items-center text-gray-500 font-medium">
            <span className={`w-2 h-2 rounded-full mr-2 ${isConnected ? 'bg-green-500 animate-pulse' : 'bg-yellow-500'}`}></span>
            {isConnected ? 'Live Stream Active' : 'Connecting...'}
          </div>
          <div className="text-gray-400">
            {timeAgo ? `Updated ${timeAgo}` : 'Updating...'}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-white py-16 sm:py-24 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          
          {/* Status Badge */}
          {snapshot?.status && (
            <div className="absolute top-0 right-4 sm:right-6 lg:right-8">
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${
                snapshot.status === 'active' 
                  ? 'bg-green-50 text-green-700 border-green-200' 
                  : 'bg-red-50 text-red-700 border-red-200'
              }`}>
                <span className={`w-2 h-2 mr-1.5 rounded-full ${
                  snapshot.status === 'active' ? 'bg-green-500' : 'bg-red-500'
                }`}></span>
                {snapshot.status === 'active' ? 'Running' : 'Closed'}
              </span>
            </div>
          )}

          <h1 className="text-xs sm:text-sm font-bold tracking-wider text-primary uppercase mb-4">A Billion Steps Campaign</h1>
          <div className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-gray-900 tracking-tighter mb-8 tabular-nums">
            {snapshot ? snapshot.totalSteps.toLocaleString() : "..."}
          </div>
          
          {snapshot && (snapshot.startAt || snapshot.endAt) && (
            <div className="text-sm sm:text-base font-medium text-gray-500 mb-8 max-w-2xl mx-auto flex items-center justify-center space-x-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{formatDateRange(snapshot.startAt, snapshot.endAt)}</span>
            </div>
          )}

          <div className="max-w-3xl mx-auto">
            <div className="flex justify-between text-sm font-medium text-gray-500 mb-2">
              <span>Progress to 1 Billion</span>
              <span>{snapshot ? snapshot.progress.toFixed(1) : 0}%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-4 mb-8 overflow-hidden">
              <div 
                className="bg-primary h-4 rounded-full transition-all duration-1000 ease-out" 
                style={{ width: `${snapshot ? snapshot.progress : 0}%` }}
              ></div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-8 max-w-xl mx-auto">
              <div className="flex flex-col">
                <span className="text-lg sm:text-3xl font-bold text-gray-900">{snapshot ? snapshot.distanceKm.toLocaleString() : "..."} km</span>
                <span className="text-[10px] sm:text-sm font-medium text-gray-500">Estimated Distance</span>
              </div>
              <div className="flex flex-col">
                <span className="text-lg sm:text-3xl font-bold text-gray-900">{snapshot ? snapshot.participants.toLocaleString() : "..."}</span>
                <span className="text-[10px] sm:text-sm font-medium text-gray-500">Participants</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-8 lg:gap-12">
          
          {/* User Search */}
          <div className="order-1 lg:col-start-1 lg:row-start-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 self-start">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Your Contribution</h3>
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                value={searchUsername}
                onChange={(e) => setSearchUsername(e.target.value)}
                placeholder="Search your username (e.g. otobong)" 
                className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
              />
              <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-gray-100 min-h-[120px] flex flex-col justify-center">
              {searchResult ? (
                <>
                  <div className="flex items-center mb-4">
                    <img src={searchResult.avatar || "https://ui-avatars.com/api/?name=" + searchResult.first_name} alt="Avatar" className="w-10 h-10 rounded-full mr-3" />
                    <div>
                      <div className="font-bold text-sm">{searchResult.first_name} {searchResult.last_name}</div>
                      <div className="text-xs text-gray-500">@{searchResult.username}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div>
                      <div className="text-lg font-bold text-primary">{searchResult.steps.toLocaleString()}</div>
                      <div className="text-xs text-gray-500">Steps</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-gray-900">#{searchResult.rank}</div>
                      <div className="text-xs text-gray-500">Global Rank</div>
                    </div>
                  </div>
                </>
              ) : (
                <p className="text-sm text-gray-500 text-center">Search to see your stats</p>
              )}
            </div>
          </div>

          {/* How It Works */}
          <div className="order-3 lg:col-start-1 lg:row-start-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 self-start">
            <h3 className="text-lg font-bold text-gray-900 mb-4">How It Works</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mt-0.5">1</div>
                <p className="ml-3 text-sm text-gray-600">Join the campaign through the Kulawise mobile app.</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mt-0.5">2</div>
                <p className="ml-3 text-sm text-gray-600">Walk and sync your steps using Apple Health or Google Fit.</p>
              </li>
              <li className="flex items-start">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-xs mt-0.5">3</div>
                <p className="ml-3 text-sm text-gray-600">Compete globally or with your Circle to reach the top.</p>
              </li>
            </ul>
          </div>

          {/* Leaderboards */}
          <div className="order-2 lg:col-start-2 lg:col-span-2 lg:row-start-1 lg:row-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden h-full">
              <div className="border-b border-gray-200 overflow-x-auto">
                <nav className="flex -mb-px px-4 sm:px-6 whitespace-nowrap min-w-max" aria-label="Tabs">
                  <button onClick={() => setCurrentTab('users')} className={`py-4 px-4 font-medium text-sm border-b-2 transition-colors ${currentTab === 'users' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    Top 50 Users
                  </button>
                  <button onClick={() => setCurrentTab('circles')} className={`py-4 px-4 font-medium text-sm border-b-2 transition-colors ${currentTab === 'circles' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    Top Circles
                  </button>
                  <button onClick={() => setCurrentTab('champions')} className={`py-4 px-4 font-medium text-sm border-b-2 transition-colors ${currentTab === 'champions' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                    Community Champions
                  </button>
                </nav>
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-16">Rank</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{currentTab === 'users' ? 'User' : currentTab === 'circles' ? 'Circle' : 'User'}</th>
                      <th scope="col" className="px-4 sm:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">{currentTab === 'champions' ? 'Referrals' : 'Steps'}</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {!snapshot && (
                      <tr>
                        <td colSpan={3} className="px-4 sm:px-6 py-12 text-center text-sm text-gray-500 animate-pulse">
                          Loading snapshot...
                        </td>
                      </tr>
                    )}
                    {snapshot && currentTab === 'users' && snapshot.topUsers?.map((user) => (
                      <tr key={user.user_id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                          #{user.rank}
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-8 w-8">
                              <img className="h-8 w-8 rounded-full" src={user.avatar || `https://ui-avatars.com/api/?name=${user.first_name}`} alt="" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.first_name} {user.last_name}</div>
                              <div className="text-xs text-gray-500">@{user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-bold text-primary tabular-nums">
                          {user.steps.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                    {snapshot && currentTab !== 'users' && (
                       <tr>
                         <td colSpan={3} className="px-4 sm:px-6 py-12 text-center text-sm text-gray-500">
                           Data for {currentTab} coming soon.
                         </td>
                       </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          
        </div>
      </div>
      
      <CommunityFooter />
    </div>
  );
};

export default BillionSteps;
