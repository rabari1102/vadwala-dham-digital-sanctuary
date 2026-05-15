import { Link } from 'react-router-dom';
import SectionTitle from '../shared/SectionTitle';
import { getImageUrl } from '../../utils/helpers';
import './GalleryPreview.css';

export default function GalleryPreview({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="section section--ivory gallery-preview" id="gallery-preview">
      <div className="container">
        <SectionTitle title="ફોટો ગેલેરી" subtitle="મંદિરના ઉત્સવો અને દર્શનના ફોટો" />
        <div className="gallery-preview__grid stagger">
          {items.slice(0, 6).map((item, i) => (
            <div key={item._id || i} className="gallery-preview__item animate-fade-in-up">
              <img src={getImageUrl(item.image)} alt={item.title || 'Gallery'} loading="lazy" />
              <div className="gallery-preview__overlay">
                <span>{item.title}</span>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 'var(--space-xl)' }}>
          <Link to="/gallery" className="btn btn--outline">વધુ ફોટો જુઓ</Link>
        </div>
      </div>
    </section>
  );
}
