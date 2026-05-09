import { useState } from 'react';
import { toast } from 'sonner';
import EventsManager from '@/components/admin/EventsManager';
import GalleryManager from '@/components/admin/GalleryManager';
import DonationsEditor from '@/components/admin/DonationsEditor';
import ContentEditor from '@/components/admin/ContentEditor';
import ContactMessages from '@/components/admin/ContactMessages';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

type Tab = 'events' | 'gallery' | 'donations' | 'content' | 'messages';

const TABS: { id: Tab; label: string; icon: string }[] = [
  { id: 'events', label: 'Events', icon: '🪔' },
  { id: 'gallery', label: 'Gallery', icon: '🖼️' },
  { id: 'donations', label: 'Donations', icon: '💰' },
  { id: 'content', label: 'Site Content', icon: '📝' },
  { id: 'messages', label: 'Messages', icon: '📬' },
];

// In-memory token (not localStorage)
let _token: string | null = null;

export default function Admin() {
  const [token, setToken] = useState<string | null>(_token);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [logging, setLogging] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>('events');

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
      toast.error('Network error. Is the backend running?');
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
            <p className="text-sm text-orange-600 mt-1">Shri Vadwala Mandir</p>
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
          <p className="text-center text-xs text-gray-400 mt-4">
            {import.meta.env.DEV && 'Default: admin / admin123'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-700 text-white px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🕉️</span>
          <div>
            <p className="font-heading font-bold text-sm leading-tight">Admin Panel</p>
            <p className="text-orange-200 text-xs">Shri Vadwala Mandir Dudhrej Dham</p>
          </div>
        </div>
        <button onClick={handleLogout} className="text-xs border border-white/40 rounded-lg px-4 py-2 hover:bg-white/10 transition">
          🚪 Logout
        </button>
      </div>

      <div className="flex flex-col lg:flex-row max-w-7xl mx-auto">
        {/* Sidebar */}
        <aside className="w-full lg:w-56 bg-white border-b lg:border-b-0 lg:border-r border-orange-100 shadow-sm">
          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible p-3 gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium whitespace-nowrap transition-all ${
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
        <main className="flex-1 p-4 md:p-8 min-h-[calc(100vh-56px)]">
          {activeTab === 'events' && <EventsManager token={token} />}
          {activeTab === 'gallery' && <GalleryManager token={token} />}
          {activeTab === 'donations' && <DonationsEditor token={token} />}
          {activeTab === 'content' && <ContentEditor token={token} />}
          {activeTab === 'messages' && <ContactMessages token={token} />}
        </main>
      </div>
    </div>
  );
}
