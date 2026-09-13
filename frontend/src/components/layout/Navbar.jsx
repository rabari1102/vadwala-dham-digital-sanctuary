import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl } from '../../utils/helpers';
import './Navbar.css';

const LOGO_URL = '/logo.png';

const defaultNavLinks = [
  { key: 'home', url: '/' },
  { key: 'history', url: '/history' },
  { key: 'upcomingTithis', url: '/tithis' },
  { key: 'seva', url: '/activities' },
  { key: 'gallery', url: '/gallery' },
  { key: 'videos', url: '/videos' },
  { key: 'dhaja', url: '/dhaja' },
  { key: 'gaushala', url: '/gaushala' },
  { key: 'donate', url: '/donate' },
  { key: 'contact', url: '/contact' },
];

export default function Navbar() {
  const [menuPath, setMenuPath] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const { settings } = useSiteSettings();
  const { t, tr, toggleLanguage, isGujarati } = useLanguage();
  const location = useLocation();
  // The menu is "open for a path": navigating anywhere closes it without an extra effect/render
  const menuOpen = menuPath === location.pathname;
  const setMenuOpen = (open) => setMenuPath(open ? location.pathname : null);

  const apiLinks = settings?.navLinks?.filter(l => l.isActive)?.sort((a, b) => a.order - b.order);
  let navLinks = apiLinks?.length
    ? apiLinks.map(l => {
        const def = defaultNavLinks.find(d => d.url === l.url) || {};
        return { label: def.key ? t(def.key) : tr(l.label), url: l.url };
      })
    : defaultNavLinks.map(l => ({ ...l, label: t(l.key) }));

  // Always ensure Dhaja link is present (insert before Donate)
  if (!navLinks.find(l => l.url === '/dhaja')) {
    const donateIdx = navLinks.findIndex(l => l.url === '/donate');
    const dhajaItem = { label: t('dhaja'), url: '/dhaja' };
    if (donateIdx >= 0) {
      navLinks = [...navLinks.slice(0, donateIdx), dhajaItem, ...navLinks.slice(donateIdx)];
    } else {
      navLinks = [...navLinks, dhajaItem];
    }
  }

  // Always ensure Gaushala link is present (insert before Donate)
  if (!navLinks.find(l => l.url === '/gaushala')) {
    const donateIdx = navLinks.findIndex(l => l.url === '/donate');
    const gaushalaItem = { label: t('gaushala'), url: '/gaushala' };
    if (donateIdx >= 0) {
      navLinks = [...navLinks.slice(0, donateIdx), gaushalaItem, ...navLinks.slice(donateIdx)];
    } else {
      navLinks = [...navLinks, gaushalaItem];
    }
  }

  // Always ensure Tithis link is present (insert before Donate)
  if (!navLinks.find(l => l.url === '/tithis')) {
    const donateIdx = navLinks.findIndex(l => l.url === '/donate');
    const tithisItem = { label: t('upcomingTithis'), url: '/tithis' };
    if (donateIdx >= 0) {
      navLinks = [...navLinks.slice(0, donateIdx), tithisItem, ...navLinks.slice(donateIdx)];
    } else {
      navLinks = [...navLinks, tithisItem];
    }
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <header className={`site-header ${scrolled ? 'site-header--scrolled' : ''}`} role="banner" id="main-navbar">
      <div className="container site-header__inner">
        {/* Logo */}
        <Link to="/" className="logo-link" aria-label="Shri Vadwala Mandir Home">
          <img
            src={getImageUrl(settings?.logo, 240) || LOGO_URL}
            alt="શ્રી વડવાળા મંદિર"
            className="logo-img"
            width="73"
            height="48"
            fetchPriority="high"
          />
          <span className="logo-text hide-mobile">
            <span className="logo-gujarati">{tr(settings?.siteName || 'શ્રી વડવાળા મંદિર')}</span>
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
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav-mobile-actions">
            <Link to="/donate" className="btn btn-primary nav-donate-btn">
              🙏 {t('donateNow')}
            </Link>
          </div>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          <button type="button" className="language-toggle" onClick={toggleLanguage}>
            {isGujarati ? 'EN' : 'ગુજરાતી'}
          </button>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="material-symbols-outlined">
              {menuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {menuOpen && <div className="nav-overlay" onClick={() => setMenuOpen(false)} aria-hidden="true" />}
    </header>
  );
}
