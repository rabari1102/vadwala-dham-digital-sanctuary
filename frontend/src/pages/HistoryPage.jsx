import useFetch from '../hooks/useFetch';
import { getHistorySections, getAcharyaParampara } from '../api/apiService';
import { useLanguage } from '../context/LanguageContext';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';
import { getImageUrl } from '../utils/helpers';
import './HistoryPage.css';

export default function HistoryPage() {
  const { t, tr } = useLanguage();
  const { data: sections, loading: sectionsLoading } = useFetch('history:sections', getHistorySections);
  const { data: acharyas } = useFetch('history:acharyas', getAcharyaParampara);

  return (
    <>
      {/* Hero — renders immediately, content fills in below */}
      <section className="page-banner">
        <div className="container page-banner__content">
          <span className="page-banner__eyebrow">{t('history')}</span>
          <h1 className="page-banner__title">
            {t('historySubtitle')}
          </h1>
          <p className="page-banner__subtitle">
            Beyond the stone and mortar lies a story etched in the breath of devotion.
          </p>
        </div>
      </section>

      {/* History Blocks */}
      <section className="section">
        <div className="container">
          {sectionsLoading ? (
            <LoadingSpinner />
          ) : (!sections || sections.length === 0) ? (
            <EmptyState message={t('noHistory')} icon="📜" />
          ) : (
            <div className="history-blocks">
              {sections.map((s, i) => (
                <div key={s._id || i} className={`history-block ${i % 2 !== 0 ? 'history-block--alt' : ''}`}>
                  {s.image && (
                    <div className="history-block__image">
                      <img src={getImageUrl(s.image, 900)} alt={tr(s.title)} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                    </div>
                  )}
                  <div className="history-block__content">
                    {s.year && <span className="history-block__year">{s.year}</span>}
                    <h2 className="history-block__title">{tr(s.title)}</h2>
                    <p className="history-block__text">{tr(s.content)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Acharya Parampara */}
      {acharyas && acharyas.length > 0 && (
        <section className="parampara-section">
          <div className="container">
            <SectionTitle eyebrow={t('parampara')} title={t('paramparaSubtitle')} />
            <div className="parampara-grid">
              {acharyas.map((a, i) => (
                <div key={a._id || i} className="parampara-card">
                  <div className="parampara-card__image">
                    {a.image ? (
                      <img src={getImageUrl(a.image, 300)} alt={a.name} loading="lazy" decoding="async" />
                    ) : (
                      <div className="parampara-card__placeholder">
                        <span className="material-symbols-outlined">person</span>
                      </div>
                    )}
                  </div>
                  <h4 className="parampara-card__name">{tr(a.name)}</h4>
                  <p className="parampara-card__period">
                    {a.periodStart}{a.periodEnd ? ` – ${a.periodEnd}` : ''}
                  </p>
                  {a.description && <p className="parampara-card__desc">{tr(a.description)}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
