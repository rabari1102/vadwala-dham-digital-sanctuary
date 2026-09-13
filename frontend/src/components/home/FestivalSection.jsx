import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { formatDate, getImageUrl } from '../../utils/helpers';
import './FestivalSection.css';

export default function FestivalSection({ festivals = [] }) {
  const { language, t, tr } = useLanguage();
  if (!festivals || festivals.length === 0) return null;

  const featured = festivals[0];
  const secondary = festivals.slice(1, 3);
  const locale = language === 'gu' ? 'gu-IN' : 'en-IN';

  return (
    <section className="festival-section" id="festivals-section">
      <div className="container">
        <div className="festival-header">
          <div className="festival-header__text">
            <span className="festival-header__eyebrow">{t('sacredCalendar')}</span>
            <h2 className="festival-header__title">{t('festivalsCelebrations')}</h2>
          </div>
          <Link to="/activities" className="festival-header__link hide-mobile">
            {t('viewAllFestivals')}
          </Link>
        </div>

        <div className="festival-grid">
          {/* Featured Card */}
          <div className="festival-featured">
            {featured.image && (
              <div className="festival-featured__image">
                <img src={getImageUrl(featured.image, 900)} alt={tr(featured.title)} loading="lazy" decoding="async" />
              </div>
            )}
            <div className="festival-featured__info">
              <div className="festival-featured__meta">
                {featured.date && <span className="festival-featured__date">{formatDate(featured.date, locale)}</span>}
                <span className="festival-featured__line" />
                {featured.isUpcoming && <span className="festival-featured__tag">{t('upcoming')}</span>}
              </div>
              <h3 className="festival-featured__title">{tr(featured.title)}</h3>
              {featured.description && <p className="festival-featured__desc">{tr(featured.description)}</p>}
            </div>
          </div>

          {/* Secondary Cards */}
          {secondary.length > 0 && (
            <div className="festival-secondary">
              {secondary.map((f, i) => (
                <div key={f._id || i} className="festival-card">
                  {f.image && (
                    <div className="festival-card__thumb">
                      <img src={getImageUrl(f.image, 320)} alt={tr(f.title)} loading="lazy" decoding="async" />
                    </div>
                  )}
                  <div className="festival-card__info">
                    {f.date && <span className="festival-card__date">{formatDate(f.date, locale)}</span>}
                    <h4 className="festival-card__title">{tr(f.title)}</h4>
                    {f.description && <p className="festival-card__desc">{tr(f.description)}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
