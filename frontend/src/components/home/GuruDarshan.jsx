import { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { getGuruImages } from '../../api/apiService';
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
  }
];

export default function GuruDarshan() {
  const { language, t, tr } = useLanguage();
  const [activeTab, setActiveTab] = useState(GURU_TABS[0].slug);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Fetch images for the active Guru tab
  useEffect(() => {
    setLoading(true);
    setError(null);
    getGuruImages(activeTab)
      .then((res) => {
        // Filter out empty storage keys and sort by sort_order
        const filtered = (res.data || [])
          .filter(img => img.storage_key)
          .sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0));
        setImages(filtered);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching guru images:', err);
        setError('Failed to load gallery images.');
        setLoading(false);
      });
  }, [activeTab]);

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(-1);
    document.body.style.overflow = '';
  }, []);

  const nextImage = useCallback(() => {
    if (images.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % images.length);
  }, [images]);

  const prevImage = useCallback(() => {
    if (images.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (lightboxIndex === -1) return;
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxIndex, nextImage, prevImage, closeLightbox]);

  const activeInfo = GURU_TABS.find(t => t.slug === activeTab);

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
                  key={tab.slug}
                  role="tab"
                  aria-selected={isActive}
                  className={`guru-darshan__tab-btn ${isActive ? 'guru-darshan__tab-btn--active' : ''}`}
                  onClick={() => setActiveTab(tab.slug)}
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
            <p>{error}</p>
          </div>
        ) : images.length === 0 ? (
          <div className="guru-darshan__state">
            <p>{language === 'gu' ? 'હાલમાં કોઈ છબીઓ ઉપલબ્ધ નથી.' : 'No images available right now.'}</p>
          </div>
        ) : (
          <div className="guru-darshan__grid">
            {images.map((img, index) => {
              const imgSrc = getImageUrl(img.storage_key);
              return (
                <div
                  key={img._id || index}
                  className="guru-darshan__card"
                  onClick={() => openLightbox(index)}
                  role="button"
                  tabIndex={0}
                  aria-label={img.alt_text || `Guru Photo ${index + 1}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      openLightbox(index);
                    }
                  }}
                >
                  <div className="guru-darshan__img-wrap">
                    <img
                      src={imgSrc}
                      alt={img.alt_text || 'Guru Image'}
                      className="guru-darshan__img"
                      loading="lazy"
                    />
                    <button
                      type="button"
                      className="guru-darshan__card-download"
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadPhoto(imgSrc, `${activeTab}-${index + 1}.jpg`);
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
              );
            })}
          </div>
        )}
      </div>

      {/* Lightbox / Modal Viewer */}
      {lightboxIndex !== -1 && images[lightboxIndex] && (
        <div className="guru-darshan-lightbox" onClick={closeLightbox}>
          <button
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
            className="guru-darshan-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close viewer"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {images.length > 1 && (
            <>
              <button
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
              src={getImageUrl(images[lightboxIndex].storage_key)}
              alt={images[lightboxIndex].alt_text || 'Guru Image'}
              className="guru-darshan-lightbox__img"
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
