import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Video, Camera, Globe } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import './Footer.css';

const iconMap = {
  Youtube: Video, youtube: Video,
  Instagram: Camera, instagram: Camera,
  Facebook: Globe, facebook: Globe,
};

const footerNav = [
  { label: 'Home',    labelGu: 'ઘર',     url: '/' },
  { label: 'History', labelGu: 'ઇતિહાસ', url: '/history' },
  { label: 'Seva',    labelGu: 'સેવા',    url: '/activities' },
  { label: 'Gallery', labelGu: 'ગેલેરી',  url: '/gallery' },
  { label: 'Contact', labelGu: 'સંપર્ક',  url: '/contact' },
];

const sevaLinks = [
  { label: 'Annshetra',   labelGu: 'અન્નક્ષેત્ર', url: '/activities' },
  { label: 'Gaushala',    labelGu: 'ગૌશાળા',     url: '/activities' },
  { label: 'Education',   labelGu: 'શિક્ષણ',      url: '/activities' },
  { label: 'Dharamshala', labelGu: 'ધર્મશાળા',    url: '/activities' },
];

export default function Footer() {
  const { settings, contact } = useSiteSettings();
  const socialLinks = settings?.socialLinks || contact?.socialLinks || [];

  return (
    <footer className="site-footer" role="contentinfo" id="main-footer">
      {/* Top border accent */}
      <div className="footer-accent" aria-hidden="true" />

      <div className="container footer-inner">
        {/* Brand Column */}
        <div className="footer-col footer-brand-col">
          <Link to="/" className="footer-logo" aria-label="Home">
            <svg width="32" height="32" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <path d="M20 4 L28 14 L32 14 L32 36 L8 36 L8 14 L12 14 Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              <path d="M16 36 L16 26 Q20 22 24 26 L24 36" stroke="currentColor" strokeWidth="1.5"/>
              <circle cx="20" cy="8" r="2" fill="currentColor"/>
            </svg>
            <span className="footer-brand-name" lang="gu">શ્રી વડવાળા</span>
          </Link>
          <p className="footer-tagline">Seva · Bhakti · Gyaan</p>
          <p className="footer-desc">
            A living center of devotion, community service, and sacred tradition in Gujarat.
          </p>
          {/* Social */}
          <div className="footer-social">
            {socialLinks.length > 0 ? (
              socialLinks.map((s, i) => {
                const Icon = iconMap[s.icon] || iconMap[s.icon?.toLowerCase()] || Globe;
                return s.url ? (
                  <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label={s.platform || s.icon}>
                    <Icon size={16} />
                  </a>
                ) : null;
              })
            ) : (
              <>
                <a href="https://youtube.com/@dudhrejvadwala" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="YouTube"><Video size={16} /></a>
                <a href="https://instagram.com/dudhrejvadwala" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram"><Camera size={16} /></a>
                <a href="https://facebook.com/dudhrejvadwala" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook"><Globe size={16} /></a>
              </>
            )}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            {footerNav.map((l, i) => (
              <li key={i}>
                <Link to={l.url}>
                  <span>{l.label}</span>
                  <span className="footer-link-gu" lang="gu">{l.labelGu}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Seva */}
        <div className="footer-col">
          <h4 className="footer-heading">Our Seva</h4>
          <ul className="footer-links">
            {sevaLinks.map((l, i) => (
              <li key={i}>
                <Link to={l.url}>
                  <span>{l.label}</span>
                  <span className="footer-link-gu" lang="gu">{l.labelGu}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">Contact</h4>
          <div className="footer-contact-items">
            {contact?.address && (
              <div className="footer-contact-item">
                <MapPin size={14} />
                <span>{contact.address}</span>
              </div>
            )}
            {contact?.phones?.map((p, i) => (
              <div key={i} className="footer-contact-item">
                <Phone size={14} />
                <a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
              </div>
            ))}
            {contact?.emails?.map((e, i) => (
              <div key={i} className="footer-contact-item">
                <Mail size={14} />
                <a href={`mailto:${e}`}>{e}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container footer-bottom-inner">
          <p className="footer-attribution">
            Content references{' '}
            <a href="https://dudhrejvadwala.com" target="_blank" rel="noopener noreferrer">
              Shri Vadwala Mandir, Dudhrej Dham
            </a>
            . All UI design is original and not affiliated with the source website.
          </p>
          <p className="footer-copy">
            © {new Date().getFullYear()} Vadwala Dham. Built with devotion.
          </p>
        </div>
      </div>
    </footer>
  );
}
