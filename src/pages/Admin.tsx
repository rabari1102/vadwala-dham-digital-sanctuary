import { useState } from 'react';
import { toast } from 'sonner';
import EventsManager from '@/components/admin/EventsManager';
import GalleryManager from '@/components/admin/GalleryManager';
import DonationsEditor from '@/components/admin/DonationsEditor';
import ContentEditor from '@/components/admin/ContentEditor';
import ContactMessages from '@/components/admin/ContactMessages';
import HeroManager from '@/components/admin/HeroManager';
import AnnouncementsManager from '@/components/admin/AnnouncementsManager';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type Tab = 'hero' | 'announcements' | 'events' | 'gallery' | 'donations' | 'content' | 'messages';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'hero', label: 'Hero Slides', icon: '🖼️' },
  { id: 'announcements', label: 'Announcements', icon: '📢' },
  { id: 'events', label: 'Events', icon: '🪔' },
  { id: 'gallery', label: 'Gallery', icon: '🏛️' },
  { id: 'donations', label: 'Donations', icon: '💰' },
  { id: 'content', label: 'Site Content', icon: '📝' },
  { id: 'messages', label: 'Messages', icon: '📬' },
];

// In-memory token (not localStorage — sandboxed env)
let _token: string | null = null;

export default function Admin() {
  const [token, setToken] = useState<string | null>(_token);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logging, setLogging] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('hero');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLogging(true);
    try {
      const res = await fetch(`${BASE_URL}/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        _token = data.token;
        setToken(data.token);
        toast.success(`Welcome, ${data.username}! 🙏`);
      } else {
        const err = await res.json();
        toast.error(err.error || 'Login failed');
      }
    } catch {
      toast.error('Network error — is the backend running?');
    } finally {
      setLogging(false);
    }
  };

  const handleLogout = () => {
    _token = null;
    setToken(null);
    toast.info('Logged out');
  };

  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <div className="w-full max-w-sm">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🕉️</div>
            <h1 className="font-heading font-bold text-2xl text-gray-800">Admin Login</h1>
            <p className="text-sm text-orange-600 mt-1">Shri Vadwala Mandir, Dudhrej Dham</p>
          </div>
          <form onSubmit={handleLogin} className="bg-white rounded-3xl shadow-xl p-8 space-y-5 border border-orange-100">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
                placeholder="admin"
                className="admin-input"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                placeholder="••••••••"
                className="admin-input"
              />
            </div>
            <button type="submit" disabled={logging} className="w-full btn-saffron justify-center py-3.5">
              {logging ? '⏳ Logging in…' : '🔑 Login'}
            </button>
          </form>
          {import.meta.env.DEV && (
            <p className="text-center text-xs text-gray-400 mt-4">Dev default: admin / admin123</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-3 flex items-center justify-between shadow-lg sticky top-0 z-30">
        <div className="flex items-center gap-3">
          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-1 rounded-md hover:bg-white/10 transition"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-label="Toggle sidebar"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <span className="text-2xl">🕉️</span>
          <div>
            <p className="font-heading font-bold text-sm leading-tight">Admin Panel</p>
            <p className="text-orange-200 text-xs hidden sm:block">Shri Vadwala Mandir Dudhrej Dham</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-orange-200 text-xs hidden sm:block">
            {TABS.find(t => t.id === activeTab)?.icon} {TABS.find(t => t.id === activeTab)?.label}
          </span>
          <button onClick={handleLogout} className="text-xs border border-white/40 rounded-lg px-4 py-2 hover:bg-white/10 transition">
            🚪 Logout
          </button>
        </div>
      </div>

      <div className="flex max-w-7xl mx-auto relative">
        {/* Sidebar overlay (mobile) */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/30 z-20 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:sticky top-[52px] z-20 h-[calc(100vh-52px)] overflow-y-auto
            w-56 bg-white border-r border-orange-100 shadow-md lg:shadow-none
            transition-transform duration-200
            ${
              sidebarOpen
                ? 'translate-x-0'
                : '-translate-x-full lg:translate-x-0'
            }
          `}
        >
          <nav className="flex flex-col p-3 gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium text-left whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-orange-500 text-white shadow-md'
                    : 'text-gray-600 hover:bg-orange-50 hover:text-orange-700'
                }`}
              >
                <span className="text-base">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 min-h-[calc(100vh-52px)] lg:ml-0">
          {activeTab === 'hero'          && <HeroManager token={token} />}
          {activeTab === 'announcements' && <AnnouncementsManager token={token} />}
          {activeTab === 'events'        && <EventsManager token={token} />}
          {activeTab === 'gallery'       && <GalleryManager token={token} />}
          {activeTab === 'donations'     && <DonationsEditor token={token} />}
          {activeTab === 'content'       && <ContentEditor token={token} />}
          {activeTab === 'messages'      && <ContactMessages token={token} />}
        </main>
      </div>
    </div>
  );
}
