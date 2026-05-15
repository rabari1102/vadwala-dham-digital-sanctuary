import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import './Navbar.css';

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { settings } = useSiteSettings();
  const location = useLocation();

  const navLinks = settings?.navLinks?.filter(l => l.isActive)?.sort((a, b) => a.order - b.order) || [
    { label: 'હોમ', url: '/' },
    { label: 'ઇતિહાસ', url: '/history' },
    { label: 'પ્રવૃત્તિઓ', url: '/activities' },
    { label: 'ગેલેરી', url: '/gallery' },
    { label: 'વિડીયો', url: '/videos' },
    { label: 'સંપર્ક', url: '/contact' },
  ];

  return (
    <header className="navbar" id="main-navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand">
          <Sun className="navbar__icon" size={28} />
          <div className="navbar__brand-text">
            <span className="navbar__name">{settings?.siteName || 'શ્રી વડવાળા મંદિર'}</span>
            <span className="navbar__tagline">{settings?.tagline || 'દુધરેજધામ'}</span>
          </div>
        </Link>

        <nav className={`navbar__nav ${open ? 'navbar__nav--open' : ''}`}>
          {navLinks.map((link, i) => (
            <Link
              key={i}
              to={link.url}
              className={`navbar__link ${location.pathname === link.url ? 'navbar__link--active' : ''}`}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/donate" className="btn btn--primary navbar__cta" onClick={() => setOpen(false)}>
            🙏 દાન કરો
          </Link>
        </nav>

        <button className="navbar__toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>
    </header>
  );
}
