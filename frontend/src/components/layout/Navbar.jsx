import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import ThemeToggle from '../shared/ThemeToggle';
import './Navbar.css';

const defaultNavLinks = [
  { label: 'Home',       labelGu: 'ઘર',      url: '/' },
  { label: 'History',    labelGu: 'ઇતિહાસ',  url: '/history' },
  { label: 'Seva',       labelGu: 'સેવા',     url: '/activities' },
  { label: 'Gallery',    labelGu: 'ગેલેરી',   url: '/gallery' },
  { label: 'Videos',     labelGu: 'વિડીયો',   url: '/videos' },
  { label: 'Contact',    labelGu: 'સંપર્ક',   url: '/contact' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { settings } = useSiteSettings();
  const location = useLocation();

  /* Build nav links from API or defaults */
  const apiLinks = settings?.navLinks?.filter(l => l.isActive)?.sort((a, b) => a.order - b.order);
  const navLinks = apiLinks?.length
    ? apiLinks.map(l => {
        const def = defaultNavLinks.find(d => d.url === l.url);
        return {
          label: def ? def.label : (l.labelEn || l.label),
          labelGu: l.labelGu || l.label,
          url: l.url
        };
      })
    : defaultNavLinks;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Close menu on route change */
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  /* Prevent body scroll when menu open */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`} role="banner" id="main-navbar">
      <div className="container site-header__inner">
        {/* Logo */}
        <Link to="/" className="logo-link" aria-label="Shri Vadwala Mandir Home">
          <svg width="36" height="36" viewBox="0 0 40 40" fill="none" aria-hidden="true" className="logo-svg">
            <path d="M20 4 L28 14 L32 14 L32 36 L8 36 L8 14 L12 14 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <path d="M16 36 L16 26 Q20 22 24 26 L24 36" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="20" cy="8" r="2" fill="currentColor"/>
          </svg>
          <span className="logo-text">
            <span className="logo-gujarati" lang="gu">{settings?.siteName || 'શ્રી વડવાળા'}</span>
            <span className="logo-subtitle">Dudhrej Dham</span>
          </span>
        </Link>

        {/* Nav */}
        <nav className={`site-nav ${menuOpen ? 'is-open' : ''}`} aria-label="Main navigation">
          <ul role="list">
            {navLinks.map(item => (
              <li key={item.url}>
                <Link
                  to={item.url}
                  className={`nav-link ${location.pathname === item.url ? 'nav-link--active' : ''}`}
                >
                  <span className="nav-label-en">{item.label}</span>
                  <span className="nav-label-gu" lang="gu">{item.labelGu}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-mobile-actions">
            <Link to="/donate" className="btn btn-primary nav-donate-btn">
              🙏 Donate
            </Link>
          </div>
        </nav>

        {/* Header actions */}
        <div className="header-actions">
          <ThemeToggle />
          <Link to="/donate" className="btn btn-primary btn--sm header-donate-btn">
            🙏 દાન કરો
          </Link>
          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile overlay */}
      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
    </header>
  );
}
