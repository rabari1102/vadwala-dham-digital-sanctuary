import { useEffect, useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { getGuruBySlug } from '../api/apiService';
import { getImageUrl, downloadPhoto } from '../utils/helpers';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import './GuruDetailPage.css';

export default function GuruDetailPage() {
  const { slug } = useParams();
  const { t, tr, language } = useLanguage();
  const [guru, setGuru] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Lightbox state
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  // Fetch guru detail
  useEffect(() => {
    setLoading(true);
    setError(null);
    getGuruBySlug(slug)
      .then((res) => {
        setGuru(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching guru details:', err);
        setError(err.response?.data?.error || 'Failed to load guru information.');
        setLoading(false);
      });
  }, [slug]);

  // Set page document title and JSON-LD for SEO
  useEffect(() => {
    if (!guru) return;
    
    // Page Title
    const titleText = `${tr(guru.short_title || guru.full_name)} | ${tr(guru.role_title)} | ${t('siteName')}`;
    document.title = titleText;

    // Inject JSON-LD Schema
    const primaryImg = guru.images?.find((img) => img.is_primary) || guru.images?.[0];
    const imgSrc = primaryImg?.storage_key ? getImageUrl(primaryImg.storage_key) : '';

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Person',
      'name': tr(guru.full_name),
      'jobTitle': tr(guru.role_title),
      'affiliation': {
        '@type': 'Organization',
        'name': t('siteName'),
        'url': window.location.origin,
      },
      'description': tr(guru.biography_short),
      'image': imgSrc,
      'knowsAbout': guru.teachings_themes?.map(theme => tr(theme)) || [],
    };

    const scriptId = `jsonld-guru-${guru.slug}`;
    let scriptEl = document.getElementById(scriptId);
    
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = scriptId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }
    
    scriptEl.textContent = JSON.stringify(schemaData);

    return () => {
      // Cleanup title and schema
      document.title = t('siteName');
      const scriptToRemove = document.getElementById(scriptId);
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [guru, tr, t, language]);

  // Lightbox handlers
  const openLightbox = (index) => {
    setLightboxIndex(index);
    document.body.style.overflow = 'hidden'; // Lock background scroll
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(-1);
    document.body.style.overflow = ''; // Restore background scroll
  }, []);

  const nextImage = useCallback(() => {
    if (!guru?.images || guru.images.length === 0) return;
    setLightboxIndex((prev) => (prev + 1) % guru.images.length);
  }, [guru]);

  const prevImage = useCallback(() => {
    if (!guru?.images || guru.images.length === 0) return;
    setLightboxIndex((prev) => (prev - 1 + guru.images.length) % guru.images.length);
  }, [guru]);

  // Keyboard navigation for lightbox
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

  if (loading) {
    return (
      <div className="guru-detail__loading">
        <LoadingSpinner />
        <p>{t('loadingGurus') || 'લોડ થઈ રહ્યું છે / Loading...'}</p>
      </div>
    );
  }

  if (error || !guru) {
    return (
      <div className="guru-detail__error container">
        <span className="material-symbols-outlined" style={{ fontSize: '64px', color: 'var(--color-primary)' }}>
          error
        </span>
        <h2>{t('guruNotFound') || 'ગુરુ વિશેની માહિતી મળી શકી નથી / Guru Info Not Found'}</h2>
        <p>{error || 'The page you are looking for does not exist or has been moved.'}</p>
        <Link to="/" className="btn btn--primary" style={{ marginTop: '16px' }}>
          {t('backToHome') || 'હોમ પેજ પર પાછા ફરો'}
        </Link>
      </div>
    );
  }

  // Find primary image
  const primaryImg = guru.images?.find((img) => img.is_primary) || guru.images?.[0];
  const heroImgSrc = primaryImg?.storage_key ? getImageUrl(primaryImg.storage_key) : '';

  return (
    <article className="guru-detail-page">
      {/* Hero Section */}
      <section className="guru-hero">
        {heroImgSrc && (
          <img
            src={heroImgSrc}
            alt={primaryImg?.alt_text || tr(guru.full_name)}
            className="guru-hero__image"
          />
        )}
        <div className="guru-hero__overlay">
          <div className="guru-hero__content">
            <Link to="/" className="guru-hero__back-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', color: 'inherit', textDecoration: 'none', marginBottom: '16px', fontSize: '14px', opacity: 0.8 }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_back</span>
              {t('back') || 'પાછા'}
            </Link>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <span className="guru-hero__role">{tr(guru.role_title)}</span>
                <h1 className="guru-hero__name">{tr(guru.full_name)}</h1>
                {guru.community_role && <p className="guru-hero__community">{tr(guru.community_role)}</p>}
                <p className="guru-hero__temple">
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', verticalAlign: 'middle', marginRight: '4px' }}>
                    location_on
                  </span>
                  {tr(guru.key_associated_temple)}
                </p>
              </div>
              {heroImgSrc && (
                <button
                  type="button"
                  className="guru-hero__download-btn"
                  onClick={() => downloadPhoto(heroImgSrc, `${tr(guru.short_title || guru.full_name)}.jpg`)}
                  title="ડાઉનલોડ કરો / Download Profile"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '8px 16px',
                    background: 'rgba(255,255,255,0.15)',
                    border: '1px solid rgba(255,255,255,0.25)',
                    borderRadius: 'var(--radius-pill)',
                    color: '#fff',
                    fontSize: '13px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    backdropFilter: 'blur(4px)',
                    transition: 'background var(--transition-fast)'
                  }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>download</span>
                  {language === 'gu' ? 'છબી ડાઉનલોડ' : 'Download Photo'}
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quick Info Sidebar & Full Biography */}
      <section className="guru-section guru-bio">
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>
            
            {/* Quick Details Bar */}
            {(guru.birth_date || guru.birthplace) && (
              <div className="guru-quick-info" style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', padding: '16px 24px', background: 'var(--color-surface)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)' }}>
                {guru.birth_date && (
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{t('born') || 'જન્મ'}</span>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-on-surface)' }}>{tr(guru.birth_date)}</p>
                  </div>
                )}
                {guru.birthplace && (
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--color-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>{t('birthplace') || 'જન્મસ્થળ'}</span>
                    <p style={{ margin: 0, fontWeight: 600, color: 'var(--color-on-surface)' }}>{tr(guru.birthplace)}</p>
                  </div>
                )}
              </div>
            )}

            {/* Biography Content */}
            <div className="guru-bio__text">
              <span className="guru-section__eyebrow">{t('lifeHistory') || 'જીવન ચરિત્ર'}</span>
              <h2 className="guru-section__heading">{t('biographyTitle') || 'પૂર્ણ જીવન ગાથા'}</h2>
              <div
                className="guru-bio__content"
                dangerouslySetInnerHTML={{ __html: tr(guru.biography_full) }}
              />
            </div>

          </div>
        </div>
      </section>

      {/* Teachings Section */}
      {((guru.teachings_themes && guru.teachings_themes.length > 0) || (guru.notable_quotes && guru.notable_quotes.length > 0)) && (
        <section className="guru-section guru-teachings">
          <div className="container">
            <span className="guru-section__eyebrow">{t('teachings') || 'ઉપદેશ અને સંદેશ'}</span>
            <h2 className="guru-section__heading">{t('teachingsTitle') || 'મુખ્ય સિદ્ધાંતો અને સંદેશો'}</h2>
            
            {guru.teachings_themes && guru.teachings_themes.length > 0 && (
              <div className="guru-teachings__themes">
                {guru.teachings_themes.map((theme, i) => (
                  <span key={i} className="guru-teachings__tag">
                    <span className="material-symbols-outlined">star</span>
                    {tr(theme)}
                  </span>
                ))}
              </div>
            )}

            {guru.notable_quotes && guru.notable_quotes.length > 0 && (
              <div className="guru-teachings__quotes">
                {guru.notable_quotes.map((quote, i) => (
                  <blockquote key={i} className="guru-teachings__quote">
                    "{tr(quote)}"
                  </blockquote>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* Timeline of events */}
      {guru.events && guru.events.length > 0 && (
        <section className="guru-section guru-history-timeline">
          <div className="container">
            <span className="guru-section__eyebrow">{t('timeline') || 'સમયરેખા'}</span>
            <h2 className="guru-section__heading">{t('timelineTitle') || 'મહત્વના સેવા કાર્યો અને ઘટનાક્રમ'}</h2>
            
            <div className="guru-timeline">
              {guru.events.map((event, i) => (
                <div key={event._id || i} className="guru-timeline__item">
                  <span className="guru-timeline__date">{tr(event.year_or_date)}</span>
                  <h3 className="guru-timeline__title">{tr(event.title)}</h3>
                  {event.description && <p className="guru-timeline__desc">{tr(event.description)}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Gallery Section */}
      {guru.images && guru.images.length > 0 && (
        <section className="guru-section guru-gallery">
          <div className="container">
            <span className="guru-section__eyebrow">{t('gallery') || 'ગેલેરી'}</span>
            <h2 className="guru-section__heading">{t('galleryTitle') || 'દર્શન અને સેવા છબીઓ'}</h2>

            <div className="guru-gallery__grid">
              {guru.images.map((img, index) => {
                const imgSrc = img.storage_key ? getImageUrl(img.storage_key) : '';
                return (
                  <div
                    key={img._id || index}
                    className="guru-gallery__item"
                    onClick={() => openLightbox(index)}
                    role="button"
                    tabIndex={0}
                    aria-label={`Open photo in lightbox: ${img.alt_text || tr(guru.full_name)}`}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox(index);
                      }
                    }}
                  >
                    {imgSrc ? (
                      <>
                        <img
                          src={imgSrc}
                          alt={img.alt_text || tr(guru.full_name)}
                          className="guru-gallery__thumb"
                          loading="lazy"
                        />
                        <button
                          type="button"
                          className="guru-gallery__download"
                          onClick={(e) => {
                            e.stopPropagation();
                            downloadPhoto(imgSrc, `gallery-${guru.slug}-${index + 1}.jpg`);
                          }}
                          aria-label="Download image"
                          title="ડાઉનલોડ કરો / Download"
                        >
                          <span className="material-symbols-outlined">download</span>
                        </button>
                      </>
                    ) : (
                      <div className="guru-gallery__placeholder">
                        <span className="material-symbols-outlined">image</span>
                      </div>
                    )}
                    {(img.caption || img.alt_text) && (
                      <div className="guru-gallery__caption-overlay">
                        {tr(img.caption || img.alt_text)}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox Modal */}
      {lightboxIndex !== -1 && guru.images && guru.images[lightboxIndex] && (
        <div className="guru-lightbox" onClick={closeLightbox}>
          <button
            className="guru-lightbox__download"
            onClick={(e) => {
              e.stopPropagation();
              downloadPhoto(getImageUrl(guru.images[lightboxIndex].storage_key), `gallery-${guru.slug}-${lightboxIndex + 1}.jpg`);
            }}
            aria-label="Download photo"
            title="ડાઉનલોડ કરો / Download"
          >
            <span className="material-symbols-outlined">download</span>
          </button>

          <button
            className="guru-lightbox__close"
            onClick={closeLightbox}
            aria-label="Close lightbox"
          >
            <span className="material-symbols-outlined">close</span>
          </button>

          {guru.images.length > 1 && (
            <>
              <button
                className="guru-lightbox__nav guru-lightbox__nav--prev"
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                aria-label="Previous image"
              >
                <span className="material-symbols-outlined">chevron_left</span>
              </button>
              <button
                className="guru-lightbox__nav guru-lightbox__nav--next"
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

          <img
            src={getImageUrl(guru.images[lightboxIndex].storage_key)}
            alt={guru.images[lightboxIndex].alt_text || 'Guru Image'}
            className="guru-lightbox__img"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
          />

          {(guru.images[lightboxIndex].caption || guru.images[lightboxIndex].alt_text) && (
            <div className="guru-lightbox__caption">
              {tr(guru.images[lightboxIndex].caption || guru.images[lightboxIndex].alt_text)}
            </div>
          )}
        </div>
      )}
    </article>
  );
}
