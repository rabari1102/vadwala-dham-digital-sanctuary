import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Video, Camera, Globe } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import './Footer.css';

const iconMap = {
  Youtube: Video,
  Instagram: Camera,
  Facebook: Globe,
  youtube: Video,
  instagram: Camera,
  facebook: Globe,
};

export default function Footer() {
  const { settings, contact } = useSiteSettings();

  const quickLinks = [
    { label: 'હોમ', url: '/' },
    { label: 'ઇતિહાસ', url: '/history' },
    { label: 'પ્રવૃત્તિઓ', url: '/activities' },
    { label: 'ગેલેરી', url: '/gallery' },
    { label: 'વિડીયો', url: '/videos' },
    { label: 'સંપર્ક', url: '/contact' },
  ];

  const sevaLinks = [
    { label: 'અન્નક્ષેત્ર', url: '/activities' },
    { label: 'ગૌશાળા', url: '/activities' },
    { label: 'શૈક્ષણિક કાર્ય', url: '/activities' },
    { label: 'ધર્મશાળા', url: '/activities' },
  ];

  // Get social links from settings or contact
  const socialLinks = settings?.socialLinks || contact?.socialLinks || [];

  return (
    <footer className="footer" id="main-footer">
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__col">
              <h3 className="footer__brand">{settings?.siteName || 'શ્રી વડવાળા મંદિર'}</h3>
              <p className="footer__desc">
                {settings?.introContent?.slice(0, 150) || 'સૌરાષ્ટ્રની ભૂમિ સંત, શૂરવીર અને સતીઓની ભૂમિ ગણાય છે.'}...
              </p>
              <div className="footer__social">
                {socialLinks.length > 0 ? (
                  socialLinks.map((s, i) => {
                    const Icon = iconMap[s.icon] || iconMap[s.icon?.toLowerCase()] || Facebook;
                    return (
                      s.url && (
                        <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label={s.platform || s.icon}>
                          <Icon size={18} />
                        </a>
                      )
                    );
                  })
                ) : (
                  // Placeholder social links if none configured
                  <>
                    <a href="https://youtube.com/@dudhrejvadwala" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="YouTube">
                      <Video size={18} />
                    </a>
                    <a href="https://instagram.com/dudhrejvadwala" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Instagram">
                      <Camera size={18} />
                    </a>
                    <a href="https://facebook.com/dudhrejvadwala" target="_blank" rel="noopener noreferrer" className="footer__social-link" aria-label="Facebook">
                      <Globe size={18} />
                    </a>
                  </>
                )}
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer__col">
              <h4 className="footer__heading">ઝડપી લિંક્સ</h4>
              <ul className="footer__links">
                {quickLinks.map((l, i) => (
                  <li key={i}><Link to={l.url}>{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Seva */}
            <div className="footer__col">
              <h4 className="footer__heading">સેવા પ્રવૃત્તિઓ</h4>
              <ul className="footer__links">
                {sevaLinks.map((l, i) => (
                  <li key={i}><Link to={l.url}>{l.label}</Link></li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div className="footer__col">
              <h4 className="footer__heading">સંપર્ક</h4>
              <div className="footer__contact-items">
                {contact?.address && (
                  <div className="footer__contact-item">
                    <MapPin size={16} />
                    <span>{contact.address}</span>
                  </div>
                )}
                {contact?.phones?.map((p, i) => (
                  <div key={i} className="footer__contact-item">
                    <Phone size={16} />
                    <a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
                  </div>
                ))}
                {contact?.emails?.map((e, i) => (
                  <div key={i} className="footer__contact-item">
                    <Mail size={16} />
                    <a href={`mailto:${e}`}>{e}</a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <p>© {new Date().getFullYear()} {settings?.siteName || 'શ્રી વડવાળા મંદિર દુધરેજધામ'}. સર્વ હકો સુરક્ષિત.</p>
        </div>
      </div>
    </footer>
  );
}
