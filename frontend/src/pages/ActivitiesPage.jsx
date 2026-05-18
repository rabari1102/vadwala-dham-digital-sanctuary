import useFetch from '../hooks/useFetch';
import { getActivities, getFestivals } from '../api/apiService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';
import { formatDate } from '../utils/helpers';
import './ActivitiesPage.css';

const iconMap = {
  Utensils: '🍽', Heart: '🐄', GraduationCap: '📚',
  Sparkles: '✦', Home: '🏠', HandHeart: '🙏',
};

export default function ActivitiesPage() {
  const { data: activities, loading: al } = useFetch(() => getActivities(), []);
  const { data: festivals, loading: fl } = useFetch(() => getFestivals(), []);

  if (al || fl) return <LoadingSpinner />;

  return (
    <>
      <div className="page-banner">
        <div className="page-banner__content container">
          <h1 className="page-banner__title">Seva & Festivals</h1>
          <p className="page-banner__subtitle" lang="gu">મંદિરની સેવા, શૈક્ષણિક અને ધાર્મિક પ્રવૃત્તિઓ</p>
        </div>
      </div>

      {/* Activities */}
      <section className="section activities-section">
        <div className="container">
          <SectionTitle eyebrow="Our Mission" title="Service Activities" align="left" />
          {(!activities || activities.length === 0) ? (
            <EmptyState message="Activities coming soon" />
          ) : (
            <div className="activities-list">
              {activities.map((a, i) => {
                const icon = iconMap[a.icon] || '✦';
                return (
                  <article key={a._id || i} className="activity-item">
                    <span className="activity-item__icon">{icon}</span>
                    <div className="activity-item__content">
                      <h3 className="activity-item__title">{a.title}</h3>
                      <p className="activity-item__desc">{a.description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Festivals */}
      <section className="section festivals-page-section">
        <div className="container">
          <SectionTitle eyebrow="Sacred Calendar" title="Festivals" subtitle="Religious festivals celebrated at the temple" align="left" />
          {(!festivals || festivals.length === 0) ? (
            <EmptyState message="Festival information coming soon" />
          ) : (
            <div className="festivals-page-grid">
              {festivals.map((f, i) => (
                <article key={f._id || i} className="festival-page-card">
                  <div className="festival-page-card__header">
                    <h3>{f.title}</h3>
                    {f.isUpcoming && <span className="badge badge-primary">Upcoming</span>}
                  </div>
                  {f.description && <p>{f.description}</p>}
                  {f.date && <time className="festival-page-card__date">{formatDate(f.date)}</time>}
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
