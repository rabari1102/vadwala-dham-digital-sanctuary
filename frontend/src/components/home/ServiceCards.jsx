import { Link } from 'react-router-dom';
import SectionTitle from '../shared/SectionTitle';
import './ServiceCards.css';

const fallbackSeva = [
  {
    title: 'Annshetra',
    titleGu: 'અન્નક્ષેત્ર',
    icon: '🍽',
    shortDescription: '24-hour free meals served daily to 1,000–1,500 devotees and saints.',
  },
  {
    title: 'Gaushala',
    titleGu: 'ગૌશાળા',
    icon: '🐄',
    shortDescription: 'Two Gaushalas preserving indigenous cattle breeds at Vadwala and Jegadwa.',
  },
  {
    title: 'Education',
    titleGu: 'શિક્ષણ',
    icon: '📚',
    shortDescription: 'Boys\' hostel, Girls\' hostel, and Saraswati Vidhyalay school for rural youth.',
  },
  {
    title: 'Dharamshala',
    titleGu: 'ધર્મશાળા',
    icon: '🏠',
    shortDescription: 'Pilgrim rest houses at Dakor and Junagadh for travelers on sacred journeys.',
  },
];

export default function ServiceCards({ activities = [] }) {
  const featured = activities.filter(a => a.isFeatured).slice(0, 4);
  const items = featured.length > 0
    ? featured.map(a => ({
        title: a.title,
        titleGu: a.title,
        icon: a.icon === 'Utensils' ? '🍽' : a.icon === 'Heart' ? '🐄' : a.icon === 'GraduationCap' ? '📚' : a.icon === 'Home' ? '🏠' : '✦',
        shortDescription: a.shortDescription || a.description?.slice(0, 120),
      }))
    : fallbackSeva;

  return (
    <section className="section seva-section" id="services-section">
      <div className="container">
        <SectionTitle
          eyebrow="Our Seva"
          title="Service as Devotion"
          subtitle="The temple's mission flows through four pillars of community care."
        />
        <div className="seva-grid">
          {items.map((item, i) => (
            <Link to="/activities" key={i} className="seva-card">
              <span className="seva-card__icon" role="img" aria-label={item.title}>{item.icon}</span>
              <h3 className="seva-card__title">
                {item.title}
                <span className="gujarati-tag" lang="gu">{item.titleGu}</span>
              </h3>
              <p className="seva-card__desc">{item.shortDescription}</p>
              <span className="seva-card__link" aria-hidden="true">Learn more →</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
