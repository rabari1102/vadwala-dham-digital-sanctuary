import useFetch from '../hooks/useFetch';
import { getHistorySections, getAcharyaParampara } from '../api/apiService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';
import './HistoryPage.css';

export default function HistoryPage() {
  const { data: sections, loading: sl } = useFetch(() => getHistorySections(), []);
  const { data: acharyas, loading: al } = useFetch(() => getAcharyaParampara(), []);

  if (sl || al) return <LoadingSpinner />;

  return (
    <>
      {/* Page Banner */}
      <div className="page-banner">
        <div className="page-banner__content">
          <h1 className="page-banner__title">ઇતિહાસ</h1>
          <p className="page-banner__subtitle">વડવાળા ધામનો ગૌરવશાળી ઇતિહાસ</p>
        </div>
      </div>

      {/* History Content */}
      <section className="section section--white">
        <div className="container container--narrow">
          {(!sections || sections.length === 0) ? (
            <EmptyState message="ઇતિહાસની માહિતી ટૂંક સમયમાં ઉપલબ્ધ થશે" icon="📜" />
          ) : (
            <div className="history-blocks">
              {sections.map((s, i) => (
                <div key={s._id || i} className={`history-block ${i % 2 !== 0 ? 'history-block--alt' : ''}`}>
                  <div className="history-block__content animate-fade-in-up">
                    {s.year && <span className="history-block__year">{s.year}</span>}
                    <h2 className="history-block__title">{s.title}</h2>
                    <p className="history-block__text">{s.content}</p>
                  </div>
                  {s.image && (
                    <div className="history-block__image">
                      <img src={s.image} alt={s.title} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Acharya Parampara */}
      {acharyas && acharyas.length > 0 && (
        <section className="section section--ivory">
          <div className="container container--narrow">
            <SectionTitle title="આચાર્યશ્રી પરંપરા" subtitle="ગાદીસ્થ આચાર્યશ્રીઓની પરંપરા" />
            <div className="parampara-timeline">
              {acharyas.map((a, i) => (
                <div key={a._id || i} className="parampara-item animate-fade-in-up">
                  <div className="parampara-item__number">{a.order || i + 1}</div>
                  <div className="parampara-item__info">
                    <h3 className="parampara-item__name">{a.name}</h3>
                    {(a.periodStart || a.periodEnd) && (
                      <span className="parampara-item__period">
                        {a.periodStart}{a.periodEnd ? ` – ${a.periodEnd}` : ''}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
