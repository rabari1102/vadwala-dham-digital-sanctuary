import useFetch from '../hooks/useFetch';
import { getDonationItems, getPaymentInfo } from '../api/apiService';
import { useSiteSettings } from '../context/SiteSettingsContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';
import { getImageUrl } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';
import './DonatePage.css';

const iconMap = {
  Utensils: 'restaurant', Heart: 'favorite', GraduationCap: 'school', Building: 'account_balance',
};

export default function DonatePage() {
  const { settings } = useSiteSettings();
  const { t, tr } = useLanguage();
  const { data: items, loading: il } = useFetch('donation:items', getDonationItems);
  const { data: paymentInfo, loading: pl } = useFetch('donation:payment', getPaymentInfo);

  if (il || pl) return <LoadingSpinner />;

  return (
    <>
      <section className="page-banner">
        <div className="container page-banner__content">
          <span className="page-banner__eyebrow">{t('supportMission')}</span>
          <h1 className="page-banner__title">{t('donationTitle')}</h1>
          <p className="page-banner__subtitle">{t('donationSubtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={t('contributeNow')} title={t('donationPurposes')} subtitle={t('donationPurposesSub')} />
          {(!items || items.length === 0) ? (
            <EmptyState message={t('noDonation')} icon="🙏" />
          ) : (
            <div className="donate-funds">
              {items.map((item, i) => {
                const icon = iconMap[item.icon] || 'volunteer_activism';
                return (
                  <div key={item._id || i} className="donate-fund">
                    <span className="material-symbols-outlined donate-fund__icon">{icon}</span>
                    <div className="donate-fund__content">
                      <h3 className="donate-fund__title">{tr(item.title)}</h3>
                      <p className="donate-fund__desc">{tr(item.description)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="section section--alt">
        <div className="container">
          <SectionTitle eyebrow={t('howToDonate')} title={t('howToDonate')} />
          {(!paymentInfo || paymentInfo.length === 0) ? (
            <EmptyState message={t('noPayment')} />
          ) : (
            <div className="payment-section">
              <div className="payment-cards">
                {paymentInfo.map((p, i) => (
                  <div key={p._id || i} className="payment-card">
                    <span className="payment-card__type">
                      {p.type === 'bank' ? '🏦 Bank Transfer' : p.type === 'upi' ? '📱 UPI' : '📱 QR Code'}
                    </span>
                    <h3 className="payment-card__label">{tr(p.label)}</h3>
                    <p className="payment-card__details">{tr(p.details)}</p>
                    {p.qrImage && (
                      <img className="payment-card__qr" src={getImageUrl(p.qrImage, 600)} alt={`${p.label} QR`} loading="lazy" decoding="async" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {settings?.trustNote && (
        <section className="section">
          <div className="container">
            <div className="trust-note">
              <h3>{t('importantNote')}</h3>
              <p>{tr(settings.trustNote)}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
