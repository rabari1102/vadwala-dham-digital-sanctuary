import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function FloatingDonateButton() {
  const { t } = useLanguage();
  return (
    <Link
      to="/donate"
      className="fab-donate"
      title={t('donateNow')}
      aria-label={t('donateNow')}
      style={{
        position: 'fixed',
        bottom: '24px',
        right: '24px',
        background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))',
        color: 'var(--color-on-primary)',
        width: '56px',
        height: '56px',
        borderRadius: '50%',
        boxShadow: '0 6px 24px rgba(224, 120, 48, 0.4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 30,
        transition: 'all 350ms cubic-bezier(0.16, 1, 0.3, 1)',
        textDecoration: 'none',
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.1) translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(224, 120, 48, 0.5)'; }}
      onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 6px 24px rgba(224, 120, 48, 0.4)'; }}
    >
      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1", fontSize: '26px' }}>
        volunteer_activism
      </span>
    </Link>
  );
}
