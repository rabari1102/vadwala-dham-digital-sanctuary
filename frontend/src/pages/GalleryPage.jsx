import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { getGalleryCategories, getGalleryItems } from '../api/apiService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';
import { getImageUrl } from '../utils/helpers';
import './GalleryPage.css';

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const { data: categories, loading: cl } = useFetch(() => getGalleryCategories(), []);
  const { data: items, loading: il } = useFetch(() => getGalleryItems(), []);

  if (cl || il) return <LoadingSpinner />;

  const filtered = activeCategory === 'all'
    ? items || []
    : (items || []).filter(i => (i.categoryId?._id || i.categoryId) === activeCategory);

  return (
    <>
      <div className="page-banner">
        <div className="page-banner__content">
          <h1 className="page-banner__title">ફોટો ગેલેરી</h1>
          <p className="page-banner__subtitle">શ્રી વડવાળા મંદિરના ઉત્સવો અને દર્શનના ફોટો</p>
        </div>
      </div>

      <section className="section section--white">
        <div className="container">
          {/* Filters */}
          {categories && categories.length > 0 && (
            <div className="gallery-filters">
              <button
                className={`gallery-filter ${activeCategory === 'all' ? 'gallery-filter--active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                બધા
              </button>
              {categories.map(c => (
                <button
                  key={c._id}
                  className={`gallery-filter ${activeCategory === c._id ? 'gallery-filter--active' : ''}`}
                  onClick={() => setActiveCategory(c._id)}
                >
                  {c.title}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState message="આ કેટેગરીમાં હાલમાં કોઈ ફોટો નથી" icon="📷" />
          ) : (
            <div className="gallery-grid stagger">
              {filtered.map((item, i) => (
                <div
                  key={item._id || i}
                  className="gallery-item animate-fade-in-up"
                  onClick={() => setLightbox(item)}
                >
                  <img src={getImageUrl(item.image)} alt={item.title || 'Gallery Image'} loading="lazy" />
                  {item.title && (
                    <div className="gallery-item__overlay">
                      <span>{item.title}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox__inner" onClick={e => e.stopPropagation()}>
            <button className="lightbox__close" onClick={() => setLightbox(null)}>✕</button>
            <img src={getImageUrl(lightbox.image)} alt={lightbox.title || ''} />
            {lightbox.title && <p className="lightbox__caption">{lightbox.title}</p>}
          </div>
        </div>
      )}
    </>
  );
}
