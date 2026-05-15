import useFetch from '../hooks/useFetch';
import { getActivities, getFestivals } from '../api/apiService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';
import { formatDate } from '../utils/helpers';
import { Utensils, Heart, GraduationCap, Sparkles, Home, HandHeart, Calendar } from 'lucide-react';
import './ActivitiesPage.css';

const iconMap = { Utensils, Heart, GraduationCap, Sparkles, Home, HandHeart };

export default function ActivitiesPage() {
  const { data: activities, loading: al } = useFetch(() => getActivities(), []);
  const { data: festivals, loading: fl } = useFetch(() => getFestivals(), []);

  if (al || fl) return <LoadingSpinner />;

  const upcoming = (festivals || []).filter(f => f.isUpcoming);

  return (
    <>
      <div className="page-banner">
        <div className="page-banner__content">
          <h1 className="page-banner__title">પ્રવૃત્તિઓ અને ઉત્સવો</h1>
          <p className="page-banner__subtitle">મંદિરની સેવા, શૈક્ષણિક અને ધાર્મિક પ્રવૃત્તિઓ</p>
        </div>
      </div>

      {/* Activities */}
      <section className="section section--white">
        <div className="container">
          <SectionTitle title="સેવા પ્રવૃત્તિઓ" />
          {(!activities || activities.length === 0) ? (
            <EmptyState message="પ્રવૃત્તિઓ ટૂંક સમયમાં ઉપલબ્ધ થશે" />
          ) : (
            <div className="activities-list">
              {activities.map((a, i) => {
                const Icon = iconMap[a.icon] || Sparkles;
                return (
                  <div key={a._id || i} className="activity-detail animate-fade-in-up">
                    <div className="activity-detail__header">
                      <div className="activity-detail__icon"><Icon size={24} /></div>
                      <h3 className="activity-detail__title">{a.title}</h3>
                    </div>
                    <p className="activity-detail__desc">{a.description}</p>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Festivals */}
      <section className="section section--ivory">
        <div className="container">
          <SectionTitle title="ઉત્સવો" subtitle="મંદિરમાં ઉજવાતા ધાર્મિક ઉત્સવો" />
          {(!festivals || festivals.length === 0) ? (
            <EmptyState message="ઉત્સવોની માહિતી ટૂંક સમયમાં" icon="🎉" />
          ) : (
            <div className="festivals-grid">
              {festivals.map((f, i) => (
                <div key={f._id || i} className="festival-card animate-fade-in-up">
                  <Calendar size={20} className="festival-card__icon" />
                  <h3>{f.title}</h3>
                  {f.description && <p>{f.description}</p>}
                  {f.date && <span className="festival-card__date">{formatDate(f.date)}</span>}
                  {f.isUpcoming && <span className="festival-card__badge">આગામી</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
