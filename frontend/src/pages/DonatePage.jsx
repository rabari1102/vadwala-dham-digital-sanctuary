import useFetch from '../hooks/useFetch';
import { getDonationItems, getPaymentInfo } from '../api/apiService';
import { useSiteSettings } from '../context/SiteSettingsContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';
import { Utensils, Heart, GraduationCap, Building } from 'lucide-react';
import './DonatePage.css';

const iconMap = { Utensils, Heart, GraduationCap, Building };

export default function DonatePage() {
  const { settings } = useSiteSettings();
  const { data: items, loading: il } = useFetch(() => getDonationItems(), []);
  const { data: paymentInfo, loading: pl } = useFetch(() => getPaymentInfo(), []);

  if (il || pl) return <LoadingSpinner />;

  return (
    <>
      <div className="page-banner">
        <div className="page-banner__content">
          <h1 className="page-banner__title">દાન – સેવા</h1>
          <p className="page-banner__subtitle">મંદિરના વિવિધ સેવા કાર્યોમાં આપનો સહકાર</p>
        </div>
      </div>

      <section className="section section--white">
        <div className="container">
          <SectionTitle title="દાનના હેતુઓ" subtitle="નીચેના સેવા કાર્યોમાં દાન આપી શકો છો" />
          {(!items || items.length === 0) ? (
            <EmptyState message="દાનની માહિતી ટૂંક સમયમાં ઉપલબ્ધ થશે" icon="🙏" />
          ) : (
            <div className="donate-purposes stagger">
              {items.map((item, i) => {
                const Icon = iconMap[item.icon] || Heart;
                return (
                  <div key={item._id || i} className="donate-purpose animate-fade-in-up">
                    <div className="donate-purpose__icon"><Icon size={24} /></div>
                    <h3 className="donate-purpose__title">{item.title}</h3>
                    <p className="donate-purpose__desc">{item.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="section section--ivory">
        <div className="container container--narrow">
          <SectionTitle title="દાન કેવી રીતે કરવું" />
          {(!paymentInfo || paymentInfo.length === 0) ? (
            <EmptyState message="ચુકવણીની માહિતી ટૂંક સમયમાં ઉપલબ્ધ થશે" />
          ) : (
            <div className="payment-cards">
              {paymentInfo.map((p, i) => (
                <div key={p._id || i} className="payment-card">
                  <span className="payment-card__type">
                    {p.type === 'bank' ? '🏦 Bank' : p.type === 'upi' ? '📱 UPI' : '📱 QR'}
                  </span>
                  <h3 className="payment-card__label">{p.label}</h3>
                  <p className="payment-card__details">{p.details}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {settings?.trustNote && (
        <section className="section section--white">
          <div className="container container--narrow">
            <div className="trust-note">
              <h3>⚠️ મહત્વની નોંધ</h3>
              <p>{settings.trustNote}</p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
