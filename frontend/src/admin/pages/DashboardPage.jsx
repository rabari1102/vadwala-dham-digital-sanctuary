import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import adminApi from '../hooks/adminApi';
import { Image, Video, Calendar, Heart, Megaphone, Sparkles, History, CreditCard } from 'lucide-react';

export default function DashboardPage() {
  const [stats, setStats] = useState({});

  useEffect(() => {
    const endpoints = [
      { key: 'banners', ep: 'banners' }, { key: 'history', ep: 'history-sections' },
      { key: 'activities', ep: 'activities' }, { key: 'festivals', ep: 'festivals' },
      { key: 'galleryItems', ep: 'gallery-items' }, { key: 'videos', ep: 'videos' },
      { key: 'donations', ep: 'donation-items' }, { key: 'announcements', ep: 'announcements' },
    ];
    Promise.all(endpoints.map(e => adminApi.getAll(e.ep).then(r => ({ [e.key]: Array.isArray(r.data) ? r.data.length : 0 })).catch(() => ({ [e.key]: 0 }))))
      .then(results => setStats(Object.assign({}, ...results)));
  }, []);

  const cards = [
    { label: 'Banners', count: stats.banners, icon: Image, color: 'orange', to: '/admin/banners' },
    { label: 'History', count: stats.history, icon: History, color: 'maroon', to: '/admin/history' },
    { label: 'Activities', count: stats.activities, icon: Sparkles, color: 'green', to: '/admin/activities' },
    { label: 'Festivals', count: stats.festivals, icon: Calendar, color: 'blue', to: '/admin/festivals' },
    { label: 'Gallery', count: stats.galleryItems, icon: Image, color: 'orange', to: '/admin/gallery-items' },
    { label: 'Videos', count: stats.videos, icon: Video, color: 'maroon', to: '/admin/videos' },
    { label: 'Donations', count: stats.donations, icon: Heart, color: 'green', to: '/admin/donation-items' },
    { label: 'Announcements', count: stats.announcements, icon: Megaphone, color: 'blue', to: '/admin/announcements' },
  ];

  return (
    <>
      <h2 style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>📊 Dashboard Overview</h2>
      <div className="stats-grid">
        {cards.map(c => (
          <Link to={c.to} key={c.label} className="stat-card" style={{ textDecoration: 'none' }}>
            <div className={`stat-card__icon stat-card__icon--${c.color}`}><c.icon size={22} /></div>
            <div className="stat-card__info"><h3>{c.count ?? '...'}</h3><p>{c.label}</p></div>
          </Link>
        ))}
      </div>
      <div className="admin-form" style={{ marginTop: '1rem' }}>
        <h3 style={{ marginBottom: '0.75rem', fontSize: '1rem' }}>🚀 Quick Actions</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <Link to="/admin/banners" className="btn-admin btn-admin--primary">+ Add Banner</Link>
          <Link to="/admin/gallery-items" className="btn-admin btn-admin--primary">+ Add Gallery</Link>
          <Link to="/admin/announcements" className="btn-admin btn-admin--outline">+ Announcement</Link>
          <Link to="/admin/settings" className="btn-admin btn-admin--outline">⚙️ Settings</Link>
        </div>
      </div>
    </>
  );
}
