import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Image, Video, Calendar, Heart, CreditCard, Megaphone, Phone, Settings, Users, History, Sparkles, Sun, Menu, X, FileText, Globe } from 'lucide-react';

const nav = [
  { section: 'Overview', items: [
    { label: 'Dashboard', to: '/admin', icon: LayoutDashboard, end: true },
  ]},
  { section: 'Content', items: [
    { label: 'Banners', to: '/admin/banners', icon: Image },
    { label: 'History', to: '/admin/history', icon: History },
    { label: 'Acharya Parampara', to: '/admin/acharya-parampara', icon: Sun },
    { label: 'Gurus', to: '/admin/gurus', icon: Users },
    { label: 'Activities', to: '/admin/activities', icon: Sparkles },
    { label: 'Festivals', to: '/admin/festivals', icon: Calendar },
    { label: 'Tithi Calendar', to: '/admin/tithi-days', icon: Calendar },
    { label: 'Announcements', to: '/admin/announcements', icon: Megaphone },
  ]},
  { section: 'Media', items: [
    { label: 'Gallery Categories', to: '/admin/gallery-categories', icon: FileText },
    { label: 'Gallery Items', to: '/admin/gallery-items', icon: Image },
    { label: 'Videos', to: '/admin/videos', icon: Video },
  ]},
  { section: 'Finance', items: [
    { label: 'Donation Items', to: '/admin/donation-items', icon: Heart },
    { label: 'Payment Info', to: '/admin/payment-info', icon: CreditCard },
  ]},
  { section: 'Settings', items: [
    { label: 'Contact Info', to: '/admin/contact', icon: Phone },
    { label: 'Site Settings', to: '/admin/settings', icon: Settings },
    { label: 'SEO', to: '/admin/seo', icon: Globe },
    { label: 'Users', to: '/admin/users', icon: Users },
  ]},
];

export default function Sidebar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button className="admin-sidebar__toggle" onClick={() => setOpen(!open)} style={{ position: 'fixed', top: 16, left: 16, zIndex: 150 }}>
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>
      <aside className={`admin-sidebar ${open ? 'admin-sidebar--open' : ''}`}>
        <div className="admin-sidebar__brand">
          <img src="/logo.png" alt="Shri Vadwala Mandir" className="admin-sidebar__logo" width="96" height="63" />
          <div>
            <h2>Vadwala Admin</h2>
            <span>Content Management</span>
          </div>
        </div>
        <nav className="admin-sidebar__nav">
          {nav.map(group => (
            <div key={group.section} className="admin-sidebar__group">
              <div className="admin-sidebar__label">{group.section}</div>
              {group.items.map(item => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.end}
                  className={({ isActive }) => `admin-sidebar__link ${isActive ? 'admin-sidebar__link--active' : ''}`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon size={18} /> {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
