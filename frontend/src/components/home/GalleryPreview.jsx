import { Link } from 'react-router-dom';
import SectionTitle from '../shared/SectionTitle';
import { getImageUrl } from '../../utils/helpers';
import './GalleryPreview.css';

export default function GalleryPreview({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="section gallery-preview" id="gallery-preview">
      <div className="container">
        <SectionTitle
          eyebrow="Visual Stories"
          title="Photo Gallery"
          subtitle="Glimpses of sacred moments, festivals, and daily life at the temple."
        />
        <div className="gallery-preview__grid">
          {items.slice(0, 6).map((item, i) => (
            <div key={item._id || i} className={`gallery-preview__item ${i === 0 ? 'gallery-preview__item--featured' : ''}`}>
              <img
                src={getImageUrl(item.image)}
                alt={item.title || 'Temple gallery'}
                loading="lazy"
                className="gallery-preview__img"
              />
              <div className="gallery-preview__overlay">
                <span className="gallery-preview__title">{item.title}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="gallery-preview__cta">
          <Link to="/gallery" className="btn btn-ghost">View Full Gallery →</Link>
        </div>
      </div>
    </section>
  );
}
