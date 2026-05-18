import { Link } from 'react-router-dom';
import SectionTitle from '../shared/SectionTitle';
import { formatDate } from '../../utils/helpers';
import './FestivalSection.css';

const fallbackFestivals = [
  { title: 'Janmashtami', titleGu: 'જન્માષ્ટમી', description: 'Grand celebration of Lord Krishna\'s birth with 2-3 lakh devotees.' },
  { title: 'Diwali', titleGu: 'દિવાળી', description: 'Festival of lights — Aso Vad 14. Temple illumination and special aarti.' },
  { title: 'Holi Mahotsav', titleGu: 'હોળી મહોત્સવ', description: 'Sthapana Divas — Fagan Sud Punam. Colors, devotion, and community.' },
  { title: 'Guru Purnima', titleGu: 'ગુરુ પૂર્ણિમા', description: 'Honoring the Guru tradition with special worship and gatherings.' },
];

export default function FestivalSection({ festivals = [] }) {
  const items = festivals.length > 0
    ? festivals.slice(0, 4).map(f => ({
        title: f.title,
        titleGu: f.title,
        description: f.description,
        date: f.date,
        isUpcoming: f.isUpcoming,
      }))
    : fallbackFestivals;

  return (
    <section className="section festival-section" id="festivals-section">
      <div className="container">
        <SectionTitle
          eyebrow="Sacred Calendar"
          title="Festivals & Celebrations"
          subtitle="Major religious festivals celebrated at the temple with devotion and grandeur."
        />
        <div className="festival-grid">
          {items.map((f, i) => (
            <article key={i} className="festival-card">
              <div className="festival-card__header">
                <span className="festival-card__num">{String(i + 1).padStart(2, '0')}</span>
                {f.isUpcoming && <span className="badge badge-primary">Upcoming</span>}
              </div>
              <h3 className="festival-card__title">{f.title}</h3>
              {f.titleGu !== f.title && (
                <span className="festival-card__gu" lang="gu">{f.titleGu}</span>
              )}
              {f.description && <p className="festival-card__desc">{f.description}</p>}
              {f.date && <time className="festival-card__date">{formatDate(f.date)}</time>}
            </article>
          ))}
        </div>
        <div className="festival-cta">
          <Link to="/activities" className="btn btn-ghost">View All Festivals →</Link>
        </div>
      </div>
    </section>
  );
}
