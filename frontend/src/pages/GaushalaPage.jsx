import { useState, useEffect } from 'react';
import { getGaushalaContent } from '../api/apiService';
import { getImageUrl, downloadPhoto } from '../utils/helpers';
import './GaushalaPage.css';

/* ── Click-to-play YouTube thumbnail component ── */
function YouTubeVideo({ embedId, title }) {
  const [playing, setPlaying] = useState(false);

  if (playing) {
    return (
      <div className="video-wrapper">
        <iframe
          src={`https://www.youtube.com/embed/${embedId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      className="video-thumbnail"
      onClick={() => setPlaying(true)}
      aria-label={`Play video: ${title}`}
    >
      <img
        src={`https://img.youtube.com/vi/${embedId}/hqdefault.jpg`}
        alt={title}
        loading="lazy"
      />
      <span className="video-play-btn" aria-hidden="true">
        <span className="material-symbols-outlined">play_arrow</span>
      </span>
    </button>
  );
}

/* ── Loading Skeleton ── */
function LoadingSkeleton() {
  return (
    <div className="gaushala-loading">
      <div className="container">
        <div className="skeleton skeleton-title" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text" />
        <div className="skeleton skeleton-text skeleton--short" />
      </div>
    </div>
  );
}

export default function GaushalaPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGaushalaContent()
      .then((res) => {
        const items = res.data;
        setData(Array.isArray(items) ? items[0] : items);
      })
      .catch((err) => console.error('Failed to load gaushala content:', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSkeleton />;
  if (!data) return <div className="container" style={{ padding: '80px 0', textAlign: 'center' }}>ગૌશાળાની માહિતી ટૂંક સમયમાં ઉપલબ્ધ થશે.</div>;

  return (
    <>
      {/* A. Hero Banner */}
      <section className="page-banner" id="shital-gaushala">
        <div className="container page-banner__content">
          <span className="page-banner__eyebrow">{data.heroEyebrow}</span>
          <h1 className="page-banner__title" style={{ fontFamily: "var(--font-gujarati)" }}>
            {data.heroTitle}
          </h1>
          <p className="page-banner__subtitle">{data.heroSubtitle}</p>
        </div>
      </section>

      {/* A. Intro */}
      <section className="section gaushala-section">
        <div className="container">
          <div className="gaushala-intro">
            {data.introTexts?.map((text, i) => <p key={i}>{text}</p>)}
          </div>
        </div>
      </section>

      {/* B. Vision & Inspiration */}
      <section className="section section--alt gaushala-section">
        <div className="container">
          <div className="section-title section-title--center">
            <span className="section-title__eyebrow">{data.visionEyebrow}</span>
            <h2 className="section-title__heading">{data.visionHeading}</h2>
          </div>
          <div className="gaushala-vision">
            <div className="gaushala-vision__text">
              {data.visionTexts?.map((text, i) => <p key={i}>{text}</p>)}
            </div>
            <div>
              <div className="gaushala-quote-card">
                <blockquote>"{data.quote}"</blockquote>
                <cite>{data.quoteCite}</cite>
              </div>
              <ul className="gaushala-values" style={{ marginTop: 16 }}>
                {data.values?.map((v, i) => (
                  <li key={i}>
                    <span className="material-symbols-outlined">{v.icon}</span>
                    {v.label}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* C. Facilities and Gau Sewa */}
      <section className="section gaushala-section">
        <div className="container">
          <div className="section-title section-title--center">
            <span className="section-title__eyebrow">{data.facilitiesEyebrow}</span>
            <h2 className="section-title__heading">{data.facilitiesHeading}</h2>
          </div>
          <div className="gaushala-facilities__content">
            {data.facilityTexts?.map((text, i) => <p key={i}>{text}</p>)}
          </div>
          <ul className="gaushala-seva-list" style={{ marginTop: 20 }}>
            {data.sevaItems?.map((item, i) => (
              <li key={i}>
                <span className="material-symbols-outlined">{item.icon}</span>
                {item.label}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* D. Festivals & Mahotsavs */}
      <section className="section section--alt gaushala-section">
        <div className="container">
          <div className="section-title section-title--center">
            <span className="section-title__eyebrow">{data.eventsEyebrow}</span>
            <h2 className="section-title__heading">{data.eventsHeading}</h2>
          </div>
          <div className="gaushala-events__content">
            {data.eventTexts?.map((text, i) => <p key={i}>{text}</p>)}
            {data.eventHighlight && (
              <div className="gaushala-event-highlight">
                <span className="material-symbols-outlined">celebration</span>
                <div className="gaushala-event-highlight__text">
                  <strong>{data.eventHighlight.title}</strong>
                  <span>{data.eventHighlight.description}</span>
                </div>
              </div>
            )}
            {data.eventFooterText && <p>{data.eventFooterText}</p>}
          </div>
        </div>
      </section>

      {/* E. How Devotees Can Support */}
      <section className="section gaushala-section">
        <div className="container">
          <div className="section-title section-title--center">
            <span className="section-title__eyebrow">{data.supportEyebrow}</span>
            <h2 className="section-title__heading">{data.supportHeading}</h2>
          </div>
          <div className="gaushala-support">
            <div className="gaushala-support__text">
              {data.supportTexts?.map((text, i) => <p key={i}>{text}</p>)}
              <ul className="gaushala-support-actions">
                {data.supportActions?.map((a, i) => (
                  <li key={i}>
                    <span className="material-symbols-outlined">{a.icon}</span>
                    {a.label}
                  </li>
                ))}
              </ul>
            </div>
            <div className="gaushala-cta-box">
              <h3>{data.ctaTitle}</h3>
              <p>{data.ctaText}</p>
              <a href="/donate" className="btn">દાન કરો</a>
            </div>
          </div>
        </div>
      </section>

      {/* F. Location and Visit Info */}
      <section className="section section--alt gaushala-section">
        <div className="container">
          <div className="section-title section-title--center">
            <span className="section-title__eyebrow">{data.locationEyebrow}</span>
            <h2 className="section-title__heading">{data.locationHeading}</h2>
          </div>
          <div className="gaushala-location__content">
            {data.locationTexts?.map((text, i) => <p key={i}>{text}</p>)}
            {data.locationNote && (
              <div className="gaushala-location-note">
                <span className="material-symbols-outlined">info</span>
                <span>
                  {data.locationNote}
                  {' '}
                  <a href="/contact">સંપર્ક</a>
                </span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* G. Photo & Video Gallery */}
      <section className="section gaushala-section">
        <div className="container">
          <div className="section-title section-title--center">
            <span className="section-title__eyebrow">{data.galleryEyebrow}</span>
            <h2 className="section-title__heading">{data.galleryHeading}</h2>
            {data.gallerySub && <p className="section-title__sub">{data.gallerySub}</p>}
          </div>

          {/* Photo Grid */}
          {data.photos?.length > 0 && (
            <>
              <div className="gaushala-gallery-grid">
                {data.photos.map((photo, i) => (
                  <figure className="gaushala-gallery-figure" key={i}>
                    <div className="gaushala-gallery-figure__img-wrap">
                      <img src={getImageUrl(photo.src)} alt={photo.alt} loading="lazy" />
                      <button
                        type="button"
                        className="gaushala-gallery-download"
                        onClick={() => downloadPhoto(getImageUrl(photo.src), `gaushala-${i + 1}.jpg`)}
                        aria-label={`Download ${photo.caption}`}
                        title="ડાઉનલોડ કરો"
                      >
                        <span className="material-symbols-outlined">download</span>
                      </button>
                    </div>
                    <figcaption>{photo.caption}</figcaption>
                  </figure>
                ))}
              </div>
            </>
          )}

          {/* Video Grid */}
          {data.videos?.length > 0 && (
            <div className="gaushala-video-grid">
              {data.videos.map((video, i) => (
                <div className="gaushala-video-item" key={i}>
                  <h4>{video.title}</h4>
                  <YouTubeVideo embedId={video.embedId} title={video.title} />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
