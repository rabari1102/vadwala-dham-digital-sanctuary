import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { getGalleryCategories, getGalleryItems } from '../api/apiService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import { getImageUrl, downloadPhoto } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';
import './GalleryPage.css';

export default function GalleryPage() {
  const { t, tr } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightbox, setLightbox] = useState(null);
  const { data: categories, loading: cl } = useFetch(() => getGalleryCategories(), []);
  const { data: items, loading: il } = useFetch(() => getGalleryItems(), []);

  const filtered = activeCategory === 'all'
    ? items || []
    : (items || []).filter(i => (i.categoryId?._id || i.categoryId) === activeCategory);

  if (cl || il) return <LoadingSpinner />;

  return (
    <>
      <section className="page-banner">
        <div className="container page-banner__content">
          <span className="page-banner__eyebrow">{t('visualStories')}</span>
          <h1 className="page-banner__title">{t('photoGallery')}</h1>
          <p className="page-banner__subtitle">{t('gallerySubtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          {/* Category Filters */}
          {categories && categories.length > 0 && (
            <div className="gallery-filters">
              <button
                className={`gallery-filter ${activeCategory === 'all' ? 'gallery-filter--active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                {t('all')}
              </button>
              {categories.map(c => (
                <button
                  key={c._id}
                  className={`gallery-filter ${activeCategory === c._id ? 'gallery-filter--active' : ''}`}
                  onClick={() => setActiveCategory(c._id)}
                >
                  {tr(c.title)}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <EmptyState message={t('noPhotos')} icon="📷" />
          ) : (
            <div className="gallery-grid">
              {filtered.map((item, i) => (
                <div key={item._id || i} className="gallery-item">
                  <div className="gallery-item__image" onClick={() => setLightbox(item)}>
                    <img src={getImageUrl(item.image)} alt={tr(item.title || 'Gallery')} loading="lazy" />
                    {/* Download button on hover */}
                    <button
                      type="button"
                      className="gallery-item__download"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadPhoto(getImageUrl(item.image), `gallery-${i + 1}.jpg`);
                      }}
                      aria-label={`Download ${tr(item.title || 'photo')}`}
                      title="ડાઉનલોડ કરો"
                    >
                      <span className="material-symbols-outlined">download</span>
                    </button>
                  </div>
                  {item.categoryId?.title && (
                    <span className="gallery-item__category">{tr(item.categoryId.title)}</span>
                  )}
                  {item.title && <span className="gallery-item__title">{tr(item.title)}</span>}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox with download */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div className="lightbox__inner" onClick={e => e.stopPropagation()}>
            <div className="lightbox__actions">
              <button
                className="lightbox__download"
                onClick={() => downloadPhoto(getImageUrl(lightbox.image), `${tr(lightbox.title || 'photo')}.jpg`)}
                title="ડાઉનલોડ કરો"
              >
                <span className="material-symbols-outlined">download</span>
              </button>
              <button className="lightbox__close" onClick={() => setLightbox(null)}>
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <img src={getImageUrl(lightbox.image)} alt={tr(lightbox.title || '')} />
            {lightbox.title && <p className="lightbox__caption">{tr(lightbox.title)}</p>}
          </div>
        </div>
      )}
    </>
  );
}
