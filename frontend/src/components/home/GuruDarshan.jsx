import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getGuruImages } from '../../api/apiService';
import useFetch, { fetchResource } from '../../hooks/useFetch';
import { getImageUrl, downloadPhoto } from '../../utils/helpers';
import LoadingSpinner from '../shared/LoadingSpinner';
import './GuruDarshan.css';

const GURU_TABS = [
  {
    slug: 'kaniram-bapu',
    labelGu: 'મહંત શ્રી કનીરામદાસજી બાપુ',
    labelEn: 'Shri Kaniram Bapu',
    subtitleGu: 'શ્રી વડવાળા મંદિરના ૨૨મા ગાદીપતિ અને ધર્મગુરુ',
    subtitleEn: '22nd Gadipati & Spiritual Leader of Shree Vadwala Mandir'
  },
  {
    slug: 'mukundram-bapu',
    labelGu: 'કોઠારી શ્રી મુકુંદરામ બાપુ',
    labelEn: 'Kothari Shri Mukundram Bapu',
    subtitleGu: 'શ્રી વડવાળા મંદિરના મુખ્ય કોઠારી અને વહીવટી વડા',
    subtitleEn: 'Chief Administrator & Kothari of Shree Vadwala Mandir'
  },
  {
    slug: 'nagardas-bapu',
    labelGu: 'શ્રી નાગરદાસ બાપુ',
    labelEn: 'Shri Nagardas Bapu',
    subtitleGu: 'શ્રી વડવાળા મંદિરના પૂજનીય સંત અને સેવક',
    subtitleEn: 'Revered Saint & Sevadhar of Shree Vadwala Mandir'
  }
];

const imagesKey = (slug) => `guru-images:${slug}`;

export default function GuruDarshan() {
  const { language, tr } = useLanguage();
  const [activeTab, setActiveTab] = useState(GURU_TABS[0].slug);
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const { data, loading, error } = useFetch(imagesKey(activeTab), () => getGuruImages(activeTab));

  // Filter out empty storage keys and sort by sort_order
  const images = useMemo(() => (data || [])
    .filter(img => img.storage_key)
    .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)), [data]);

  // Hovering a tab fetches its images ahead of the click
  const prefetchTab = (slug) => {
    fetchResource(imagesKey(slug), () => getGuruImages(slug)).catch(() => {});
  };

  const selectTab = (slug) => {
    setActiveTab(slug);
    setLightboxIndex(-1);
  };

  const isLightboxOpen = lightboxIndex !== -1 && Boolean(images[lightboxIndex]);

  const closeLightbox = useCallback(() => setLightboxIndex(-1), []);

  const nextImage = useCallback(() => {
    if (images.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  // Keyboard navigation + background scroll lock while the lightbox is open
  useEffect(() => {
    if (!isLightboxOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen, nextImage, prevImage, closeLightbox]);

  const activeInfo = GURU_TABS.find(tab => tab.slug === activeTab);

  return (
    <section className="guru-darshan" id="guru-darshan-section">
      <div className="container">
        {/* Section Header */}
        <div className="guru-darshan__header">
          <span className="guru-darshan__eyebrow">
            {language === 'gu' ? 'દિવ્ય દર્શન' : 'Guru Darshan'}
          </span>
          <h2 className="guru-darshan__title">
            {language === 'gu' ? 'ધર્મગુરુ છબી ગેલેરી' : 'Guru Photo Gallery'}
          </h2>
          <p className="guru-darshan__desc">
            {language === 'gu'
              ? 'પૂજ્ય સદ્ગુરુદેવોના પાવન જીવન પ્રસંગો અને સેવા કાર્યોની મનોહર છબીઓ.'
              : 'Sacred moments and service glimpses of our revered spiritual leaders.'}
          </p>
        </div>

        {/* Custom Tabs Switcher */}
        <div className="guru-darshan__tabs-container">
          <div className="guru-darshan__tabs" role="tablist">
            {GURU_TABS.map((tab) => {
              const isActive = activeTab === tab.slug;
              return (
                <button
                  type="button"
                  key={tab.slug}
                  role="tab"
                  aria-selected={isActive}
                  className={`guru-darshan__tab-btn ${isActive ? 'guru-darshan__tab-btn--active' : ''}`}
                  onClick={() => selectTab(tab.slug)}
                  onMouseEnter={() => prefetchTab(tab.slug)}
                  onFocus={() => prefetchTab(tab.slug)}
                >
                  <span className="material-symbols-outlined tab-icon">
                    {tab.slug === 'kaniram-bapu' ? 'person' : 'supervisor_account'}
                  </span>
                  {language === 'gu' ? tab.labelGu : tab.labelEn}
                </button>
              );
            })}
          </div>
          {activeInfo && (
            <div className="guru-darshan__sub-info animate-fade-in">
              <h3 className="guru-darshan__sub-name">
                {language === 'gu' ? activeInfo.labelGu : activeInfo.labelEn}
              </h3>
              <p className="guru-darshan__sub-title">
                {language === 'gu' ? activeInfo.subtitleGu : activeInfo.subtitleEn}
              </p>
            </div>
          )}
        </div>

        {/* Gallery Content Area */}
        {loading ? (
          <div className="guru-darshan__state">
            <LoadingSpinner />
          </div>
        ) : error ? (
          <div className="guru-darshan__state guru-darshan__state--error">
            <span className="material-symbols-outlined">error</span>
            <p>{language === 'gu' ? 'છબીઓ લોડ થઈ શકી નથી.' : 'Failed to load gallery images.'}</p>
          </div>
        ) : images.length === 0 ? (
          <div className="guru-darshan__state">
            <p>{language === 'gu' ? 'હાલમાં કોઈ છબીઓ ઉપલબ્ધ નથી.' : 'No images available right now.'}</p>
          </div>
        ) : (
          <div className="guru-darshan__grid">
            {images.map((img, index) => (
              <div
                key={img._id || index}
                className="guru-darshan__card"
                onClick={() => setLightboxIndex(index)}
                role="button"
                tabIndex={0}
                aria-label={img.alt_text || `Guru Photo ${index + 1}`}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLightboxIndex(index);
                  }
                }}
              >
                <div className="guru-darshan__img-wrap">
                  <img
                    src={getImageUrl(img.storage_key, 500)}
                    alt={img.alt_text || 'Guru Image'}
                    className="guru-darshan__img"
                    loading="lazy"
                    decoding="async"
                  />
                  <button
                    type="button"
                    className="guru-darshan__card-download"
                    onClick={(e) => {
                      e.stopPropagation();
                      downloadPhoto(getImageUrl(img.storage_key), `${activeTab}-${index + 1}.jpg`);
                    }}
                    aria-label="Download image"
                    title="ડાઉનલોડ કરો / Download"
                  >
                    <span className="material-symbols-outlined">download</span>
                  </button>
                  <div className="guru-darshan__overlay">
                    <span className="material-symbols-outlined zoom-icon">zoom_in</span>
                    {img.caption && <span className="guru-darshan__caption">{tr(img.caption)}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox / Modal Viewer */}
      {isLightboxOpen && (
        <div className="guru-darshan-lightbox" onClick={closeLightbox} role="dialog" aria-modal="true">
          <button
            type="button"
            className="guru-darshan-lightbox__download"
            onClick={(e) => {
              e.stopPropagation();
              downloadPhoto(getImageUrl(images[lightboxIndex].storage_key), `${activeTab}-${lightboxIndex + 1}.jpg`);
            }}
            aria-label="Download image"
            title="ડાઉનલોડ કરો / Download"
          >
            <span className="material-symbols-outlined">download</span>
          </button>

          <button
            type="button"
            className="guru-darshan-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close viewer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="guru-darshan-lightbox__nav guru-darshan-lightbox__nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                type="button"
                className="guru-darshan-lightbox__nav guru-darshan-lightbox__nav--next"
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                aria-label="Next image"
              >
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </>
          )}

          <div className="guru-darshan-lightbox__content" onClick={(e) => e.stopPropagation()}>
            <img
              key={lightboxIndex}
              src={getImageUrl(images[lightboxIndex].storage_key, 1600)}
              alt={images[lightboxIndex].alt_text || 'Guru Image'}
              className="guru-darshan-lightbox__img hero__image--fade"
              decoding="async"
            />
            {images[lightboxIndex].caption && (
              <div className="guru-darshan-lightbox__caption-panel">
                <p className="guru-darshan-lightbox__text">
                  {tr(images[lightboxIndex].caption)}
                </p>
                <span className="guru-darshan-lightbox__counter">
                  {lightboxIndex + 1} / {images.length}
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
