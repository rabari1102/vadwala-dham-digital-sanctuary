import { Link } from 'react-router-dom';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl } from '../../utils/helpers';
import SocialLinks from '../shared/SocialLinks';
import './Footer.css';

const LOGO_URL = '/logo.png';

const footerNav = [
  { key: 'home', url: '/' },
  { key: 'history', url: '/history' },
  { key: 'seva', url: '/activities' },
  { key: 'gallery', url: '/gallery' },
  { key: 'contact', url: '/contact' },
];

export default function Footer() {
  const { settings, contact } = useSiteSettings();
  const { t, tr } = useLanguage();

  return (
    <footer className="site-footer" role="contentinfo" id="main-footer">
      <div className="container footer-inner">
        {/* Brand */}
        <div className="footer-col footer-brand-col">
          <Link to="/" className="footer-logo" aria-label="Home">
            <img src={getImageUrl(settings?.logo, 240) || LOGO_URL} alt="વડવાળા ધામ" style={{ height: 48, width: 'auto' }} loading="lazy" decoding="async" />
            <span className="footer-brand-name">{tr('વડવાળા ધામ')}</span>
          </Link>
          <p className="footer-tagline">{t('footerTagline')}</p>
          <p className="footer-desc">{t('footerDesc')}</p>
          <SocialLinks settings={settings} contact={contact} variant="icons" className="footer-social" />
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">{t('quickLinks')}</h4>
          <ul className="footer-links">
            {footerNav.map((l, i) => (
              <li key={i}><Link to={l.url}>{t(l.key)}</Link></li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">{t('contact')}</h4>
          <div className="footer-contact-items">
            {contact?.address && (
              <div className="footer-contact-item">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>location_on</span>
                <span>{tr(contact.address)}</span>
              </div>
            )}
            {contact?.phones?.map((p, i) => (
              <div key={i} className="footer-contact-item">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>call</span>
                <a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
              </div>
            ))}
            {contact?.emails?.map((e, i) => (
              <div key={i} className="footer-contact-item">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>mail</span>
                <a href={`mailto:${e}`}>{e}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Shri Vadwala Mandir Dudhrejdham. {t('built')}</p>
      </div>
    </footer>
  );
}
