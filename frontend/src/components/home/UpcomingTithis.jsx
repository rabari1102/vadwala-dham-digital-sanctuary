import { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getUpcomingTithis } from '../../api/apiService';
import { formatDate } from '../../utils/helpers';
import LoadingSpinner from '../shared/LoadingSpinner';
import './UpcomingTithis.css';

export default function UpcomingTithis() {
  const { language, t } = useLanguage();
  const [tithis, setTithis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All'); // 'All', 'Punam', 'Bij'

  useEffect(() => {
    setLoading(true);
    setError(null);
    // Fetch a solid amount of upcoming tithis (e.g., next 12) so client-side filtering works perfectly
    getUpcomingTithis({ limit: 12 })
      .then((res) => {
        setTithis(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching upcoming tithis:', err);
        setError('Failed to load upcoming tithis.');
        setLoading(false);
      });
  }, []);

  // Filter tithis based on selected tab
  const filteredTithis = tithis.filter((tithi) => {
    if (activeFilter === 'All') return true;
    return tithi.tithiName === activeFilter;
  });

  const locale = language === 'gu' ? 'gu-IN' : 'en-IN';

  // Render a beautiful premium SVG moon based on the tithi type
  const renderMoonIcon = (tithiName) => {
    if (tithiName === 'Punam') {
      // Glowing Full Moon
      return (
        <svg viewBox="0 0 24 24" className="tithi-moon-svg punam-moon">
          <defs>
            <radialGradient id="fullMoonGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#fffde7" />
              <stop offset="60%" stopColor="#fff59d" />
              <stop offset="100%" stopColor="#fbc02d" stopOpacity="0.8" />
            </radialGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle cx="12" cy="12" r="9" fill="url(#fullMoonGlow)" filter="url(#glow)" />
        </svg>
      );
    } else if (tithiName === 'Bij') {
      // Elegant Crescent Moon
      return (
        <svg viewBox="0 0 24 24" className="tithi-moon-svg bij-moon">
          <defs>
            <linearGradient id="crescentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fff3e0" />
              <stop offset="50%" stopColor="#ffb74d" />
              <stop offset="100%" stopColor="#e07830" />
            </linearGradient>
          </defs>
          <path
            d="M12 3a9 9 0 1 0 9 9 9.005 9.005 0 0 1-9-9z"
            fill="url(#crescentGrad)"
          />
        </svg>
      );
    } else {
      // Default auspicious star/sparkle icon for other key tithis
      return (
        <svg viewBox="0 0 24 24" className="tithi-moon-svg default-star">
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="#ffb300"
          />
        </svg>
      );
    }
  };

  return (
    <section className="tithi-section" id="tithi-section">
      <div className="container">
        {/* Section Header */}
        <div className="tithi-header">
          <div className="tithi-header__text">
            <span className="tithi-header__eyebrow">
              {language === 'gu' ? 'દૈનિક પંચાંગ માહિતી' : 'Daily Panchang Info'}
            </span>
            <h2 className="tithi-header__title">{t('upcomingTithis')}</h2>
            <p className="tithi-header__desc">{t('tithisSubtitle')}</p>
          </div>

          {/* Tab Filters */}
          <div className="tithi-filters">
            <button
              onClick={() => setActiveFilter('All')}
              className={`tithi-filter-btn ${activeFilter === 'All' ? 'active' : ''}`}
            >
              {t('filterAll')}
            </button>
            <button
              onClick={() => setActiveFilter('Punam')}
              className={`tithi-filter-btn ${activeFilter === 'Punam' ? 'active' : ''}`}
            >
              {t('filterPunam')}
            </button>
            <button
              onClick={() => setActiveFilter('Bij')}
              className={`tithi-filter-btn ${activeFilter === 'Bij' ? 'active' : ''}`}
            >
              {t('filterBij')}
            </button>
          </div>
        </div>

        {/* Content Area */}
        {loading ? (
          <div className="tithi-loading">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="tithi-error">
            <p>{error}</p>
          </div>
        ) : filteredTithis.length === 0 ? (
          <div className="tithi-empty">
            <p>{language === 'gu' ? 'હાલમાં કોઈ આગામી તિથિઓ ઉપલબ્ધ નથી.' : 'No upcoming tithis found.'}</p>
          </div>
        ) : (
          <div className="tithi-grid">
            {filteredTithis.map((item, index) => {
              const name = language === 'gu' ? item.tithiNameGu : item.tithiName;
              const paksha = language === 'gu' ? item.pakshaGu : item.paksha;
              const month = language === 'gu' ? item.monthNameGu : item.monthName;
              const notes = language === 'gu' ? item.notesGu : item.notes;
              const isNext = index === 0;

              return (
                <div
                  key={item._id || index}
                  className={`tithi-card ${item.tithiName.toLowerCase()} ${isNext ? 'next-tithi' : ''}`}
                >
                  {/* Glowing Glow Effect Behind Next Card */}
                  {isNext && <div className="glow-effect" />}

                  <div className="tithi-card__header">
                    <div className="tithi-card__icon-wrapper">
                      {renderMoonIcon(item.tithiName)}
                    </div>
                    {isNext && (
                      <span className="tithi-card__badge">
                        {t('nextBadge')}
                      </span>
                    )}
                  </div>

                  <div className="tithi-card__body">
                    <div className="tithi-card__main-info">
                      <h3 className="tithi-card__name">{name}</h3>
                      <span className="tithi-card__paksha">
                        {month} {paksha}
                      </span>
                    </div>

                    <div className="tithi-card__divider" />

                    <div className="tithi-card__footer">
                      <div className="tithi-card__date-group">
                        <span className="tithi-card__label">
                          {language === 'gu' ? 'તારીખ (Gregorian)' : 'Gregorian Date'}
                        </span>
                        <span className="tithi-card__date">
                          {formatDate(item.dateGregorian, locale)}
                        </span>
                      </div>
                      {notes && (
                        <div className="tithi-card__notes">
                          <span className="tithi-card__notes-text">{notes}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
