import useFetch from '../hooks/useFetch';
import { getActivities, getFestivals } from '../api/apiService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';
import { formatDate } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';
import './ActivitiesPage.css';

const iconMap = {
  Utensils: 'restaurant',
  Heart: 'pets',
  GraduationCap: 'school',
  Sparkles: 'auto_awesome',
  Home: 'home',
  HandHeart: 'volunteer_activism',
};

export default function ActivitiesPage() {
  const { language, t, tr } = useLanguage();
  const { data: activities, loading: al } = useFetch(() => getActivities(), []);
  const { data: festivals, loading: fl } = useFetch(() => getFestivals(), []);

  if (al || fl) return <LoadingSpinner />;

  return (
    <>
      <section className="page-banner">
        <div className="container page-banner__content">
          <span className="page-banner__eyebrow">{t('ourMission')}</span>
          <h1 className="page-banner__title">{t('activitiesTitle')}</h1>
          <p className="page-banner__subtitle">{t('activitiesSubtitle')}</p>
        </div>
      </section>

      {/* Activities */}
      <section className="section">
        <div className="container">
          <SectionTitle eyebrow={t('ourSeva')} title={t('serviceActivities')} />
          {(!activities || activities.length === 0) ? (
            <EmptyState message={t('activitiesSoon')} />
          ) : (
            <div className="activities-grid">
              {activities.map((a, i) => {
                const icon = iconMap[a.icon] || 'auto_awesome';
                return (
                  <div key={a._id || i} className="activity-card">
                    <span className="material-symbols-outlined activity-card__icon">{icon}</span>
                    <div className="activity-card__content">
                      <h3 className="activity-card__title">{tr(a.title)}</h3>
                      <p className="activity-card__desc">{tr(a.description)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Festivals */}
      <section className="section section--alt">
        <div className="container">
          <SectionTitle eyebrow={t('sacredCalendar')} title={t('festivals')} subtitle={t('festivalsSubtitle')} />
          {(!festivals || festivals.length === 0) ? (
            <EmptyState message={t('festivalInfoSoon')} />
          ) : (
            <div className="festivals-grid">
              {festivals.map((f, i) => (
                <article key={f._id || i} className="festival-page-card">
                  <div className="festival-page-card__header">
                    <h3>{tr(f.title)}</h3>
                    {f.isUpcoming && <span className="badge badge-primary">{t('upcoming')}</span>}
                  </div>
                  {f.description && <p>{tr(f.description)}</p>}
                  {f.date && <time className="festival-page-card__date">{formatDate(f.date, language === 'gu' ? 'gu-IN' : 'en-IN')}</time>}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
