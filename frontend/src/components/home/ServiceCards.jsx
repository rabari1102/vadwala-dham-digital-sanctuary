import { Link } from 'react-router-dom';
import { Utensils, Heart, GraduationCap, Sparkles, Home, HandHeart } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import './ServiceCards.css';

const iconMap = { Utensils, Heart, GraduationCap, Sparkles, Home, HandHeart };

export default function ServiceCards({ activities = [] }) {
  const featured = activities.filter(a => a.isFeatured).slice(0, 4);
  if (!featured.length) return null;

  return (
    <section className="section section--ivory service-section" id="services-section">
      <div className="container">
        <SectionTitle title="મંદિર સેવા પ્રવૃત્તિઓ" subtitle="શ્રી વડવાળા મંદિર દ્વારા ચલાવવામાં આવતી વિવિધ સેવાઓ" />
        <div className="service-grid stagger">
          {featured.map((item, i) => {
            const Icon = iconMap[item.icon] || Sparkles;
            return (
              <Link to="/activities" key={item._id || i} className="service-card animate-fade-in-up">
                <div className="service-card__icon"><Icon size={28} /></div>
                <h3 className="service-card__title">{item.title}</h3>
                <p className="service-card__desc">{item.shortDescription}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
