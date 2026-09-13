import { useCallback, useEffect, useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import { getGalleryCategories, getGalleryItems } from '../api/apiService';
import EmptyState from '../components/shared/EmptyState';
import { getImageUrl, downloadPhoto } from '../utils/helpers';
import { useLanguage } from '../context/LanguageContext';
import './GalleryPage.css';

const PAGE_SIZE = 24;
const SKELETON_COUNT = 12;

export default function GalleryPage() {
  const { t, tr } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const { data: categories } = useFetch('gallery:categories', getGalleryCategories);
  const { data: items, loading } = useFetch('gallery:items', getGalleryItems);

  const filtered = useMemo(() => {
    const list = items || [];
    if (activeCategory === 'all') return list;
    return list.filter(i => (i.categoryId?._id || i.categoryId) === activeCategory);
  }, [items, activeCategory]);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;
  const lightbox = lightboxIndex >= 0 ? filtered[lightboxIndex] : null;

  const selectCategory = (id) => {
    setActiveCategory(id);
    setVisibleCount(PAGE_SIZE);
  };

  // Render photos in pages of 24; the sentinel is re-keyed after each page so it re-triggers.
  const sentinelRef = useCallback((node) => {
    if (!node || !('IntersectionObserver' in window)) return;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) setVisibleCount(c => c + PAGE_SIZE);
    }, { rootMargin: '800px 0px' });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(-1), []);
  const stepLightbox = useCallback((delta) => {
    setLightboxIndex(i => (filtered.length ? (i + delta + filtered.length) % filtered.length : -1));
  }, [filtered.length]);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') stepLightbox(1);
      if (e.key === 'ArrowLeft') stepLightbox(-1);
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [lightbox, closeLightbox, stepLightbox]);

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
            <div className="gallery-filters" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeCategory === 'all'}
                className={`gallery-filter ${activeCategory === 'all' ? 'gallery-filter--active' : ''}`}
                onClick={() => selectCategory('all')}
              >
                {t('all')}
              </button>
              {categories.map(c => (
                <button
                  type="button"
                  role="tab"
                  key={c._id}
                  aria-selected={activeCategory === c._id}
                  className={`gallery-filter ${activeCategory === c._id ? 'gallery-filter--active' : ''}`}
                  onClick={() => selectCategory(c._id)}
                >
                  {tr(c.title)}
                </button>
              ))}
            </div>
          )}

          {loading ? (
            <div className="gallery-grid" aria-busy="true">
              {Array.from({ length: SKELETON_COUNT }, (_, i) => (
                <div key={i} className="gallery-item">
                  <div className="gallery-item__image skeleton-shimmer" />
                </div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <EmptyState message={t('noPhotos')} icon="📷" />
          ) : (
            <>
              <div className="gallery-grid">
                {visible.map((item, i) => (
                  <div key={item._id || i} className="gallery-item">
                    <div
                      className="gallery-item__image"
                      onClick={() => setLightboxIndex(i)}
                      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setLightboxIndex(i); } }}
                      role="button"
                      tabIndex={0}
                      aria-label={tr(item.title || 'Gallery')}
                    >
                      <img
                        src={getImageUrl(item.image, 480)}
                        alt={tr(item.title || 'Gallery')}
                        loading={i < 8 ? 'eager' : 'lazy'}
                        decoding="async"
                        width="480"
                        height="360"
                      />
                      <button
                        type="button"
                        className="gallery-item__download"
                        onClick={(e) => {
                          e.stopPropagation();
                          downloadPhoto(item.image, `gallery-${i + 1}.jpg`);
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

              {hasMore && (
                <div className="gallery-more" key={visibleCount} ref={sentinelRef}>
                  <button type="button" className="btn btn-secondary" onClick={() => setVisibleCount(c => c + PAGE_SIZE)}>
                    {t('viewGallery')} ({filtered.length - visibleCount})
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Lightbox with prev/next + download */}
      {lightbox && (
        <div className="lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          {filtered.length > 1 && (
            <>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--prev"
                onClick={(e) => { e.stopPropagation(); stepLightbox(-1); }}
                aria-label="Previous photo"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                type="button"
                className="lightbox__nav lightbox__nav--next"
                onClick={(e) => { e.stopPropagation(); stepLightbox(1); }}
                aria-label="Next photo"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </>
          )}
          <div className="lightbox__inner" onClick={e => e.stopPropagation()}>
            <div className="lightbox__actions">
              <button
                type="button"
                className="lightbox__download"
                onClick={() => downloadPhoto(lightbox.image, `gallery-${lightboxIndex + 1}.jpg`)}
                title="ડાઉનલોડ કરો"
                aria-label="Download photo"
              >
                <span className="material-symbols-outlined">download</span>
              </button>
              <button type="button" className="lightbox__close" onClick={closeLightbox} aria-label="Close">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <img key={lightbox._id} className="hero__image--fade" src={getImageUrl(lightbox.image, 1600)} alt={tr(lightbox.title || '')} decoding="async" />
            <p className="lightbox__caption">
              {lightbox.title ? `${tr(lightbox.title)} · ` : ''}{lightboxIndex + 1} / {filtered.length}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
