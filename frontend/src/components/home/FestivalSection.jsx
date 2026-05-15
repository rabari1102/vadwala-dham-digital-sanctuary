import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import SectionTitle from '../shared/SectionTitle';
import { formatDate } from '../../utils/helpers';
import './FestivalSection.css';

export default function FestivalSection({ festivals = [] }) {
  if (!festivals.length) return null;

  return (
    <section className="section section--white festival-section" id="festivals-section">
      <div className="container">
        <SectionTitle title="ઊજવવામાં આવતા ઉત્સવો" subtitle="મંદિરમાં ઉજવાતા મુખ્ય ધાર્મિક ઉત્સવો" />
        <div className="festival-grid stagger">
          {festivals.slice(0, 4).map((f, i) => (
            <div key={f._id || i} className="festival-item animate-fade-in-up">
              <div className="festival-item__icon"><Calendar size={20} /></div>
              <div className="festival-item__info">
                <h3 className="festival-item__title">{f.title}</h3>
                {f.description && <p className="festival-item__desc">{f.description}</p>}
                {f.date && <span className="festival-item__date">{formatDate(f.date)}</span>}
                {f.isUpcoming && <span className="festival-item__badge">આગામી</span>}
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <Link to="/activities" className="btn btn--outline">બધા ઉત્સવો જુઓ</Link>
        </div>
      </div>
    </section>
  );
}
