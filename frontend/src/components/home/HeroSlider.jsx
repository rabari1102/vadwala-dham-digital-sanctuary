import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getImageUrl, downloadPhoto } from '../../utils/helpers';
import { useLanguage } from '../../context/LanguageContext';
import './HeroSlider.css';

export default function HeroSlider({ banners = [], loading = false }) {
  const [current, setCurrent] = useState(0);
  const { t, tr } = useLanguage();

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => setCurrent(p => (p + 1) % banners.length), 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  // Preload the next slide so the transition never shows a half-loaded image
  useEffect(() => {
    if (banners.length <= 1) return;
    const next = banners[(current + 1) % banners.length];
    if (next?.image) {
      const img = new Image();
      img.src = getImageUrl(next.image, 800);
    }
  }, [current, banners]);

  const banner = banners[current % (banners.length || 1)];
  const heroImage = banner ? getImageUrl(banner.image, 800) : null;

  return (
    <section className="hero" aria-labelledby="hero-heading" id="hero-section">
      <div className="hero__inner container">
        {/* Text Column */}
        <div className="hero__text">
          <span className="hero__eyebrow">{t('founded')}</span>
          <h1 id="hero-heading" className="hero__heading">
            {tr(banner?.title || 'શ્રી વડવાળા મંદિર દુધરેજધામ')}
            <br />
            <span className="hero__heading-accent">
              {tr(banner?.subtitle || 'શ્રી વડવાળાદેવના પવિત્ર ધામમાં આપનું સ્વાગત છે')}
            </span>
          </h1>
          <p className="hero__sub">
            "જે ભક્ત હૃદયમાં ભક્તિ રાખીને આ આંગણે આવે છે, તેને શાશ્વત શાંતિની અનુભૂતિ થાય છે."
          </p>

          {/* Timing Panel */}
          <div className="hero__timing">
            <span className="hero__timing-badge">Current Status</span>
            <div className="hero__timing-row">
              <div>
                <p className="hero__timing-label">Next Ritual</p>
                <h3 className="hero__timing-value">સંધ્યા આરતી</h3>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p className="hero__timing-label">Time</p>
                <p className="hero__timing-time">૦૭:૧૫ PM</p>
              </div>
            </div>
            <div className="hero__timing-divider" />
            <Link to="/videos" className="hero__timing-btn">
              LIVE DARSHAN <span className="material-symbols-outlined" style={{ fontSize: 16 }}>videocam</span>
            </Link>
          </div>
        </div>

        {/* Visual Column */}
        <div className="hero__visual">
          <div className="hero__image-wrap">
            {heroImage ? (
              <>
                <img
                  src={heroImage}
                  alt="Shri Vadwala Mandir, Dudhrej Dham"
                  width="640" height="800"
                  loading="eager" decoding="async"
                  fetchPriority={current === 0 ? 'high' : 'auto'}
                  key={current}
                  className="hero__image hero__image--fade"
                />
                <button
                  type="button"
                  className="hero__image-download"
                  onClick={() => downloadPhoto(heroImage, `banner-${current + 1}.jpg`)}
                  title="ડાઉનલોડ કરો / Download Banner"
                  aria-label="Download banner"
                >
                  <span className="material-symbols-outlined">download</span>
                </button>
              </>
            ) : (
              <div className={`hero__image-placeholder ${loading ? 'skeleton-shimmer' : ''}`} aria-hidden="true">
                {!loading && <span className="material-symbols-outlined" style={{ fontSize: 80, opacity: 0.3 }}>temple_hindu</span>}
              </div>
            )}
            <div className="hero__heritage-detail hide-mobile">
              <p className="hero__heritage-label">Heritage Detail</p>
              <p className="hero__heritage-text">{t('sacredTraditionText')}</p>
            </div>
          </div>

          {/* Banner dots */}
          {banners.length > 1 && (
            <div className="hero__dots">
              <button className="hero__dot-arrow" onClick={() => setCurrent(p => (p - 1 + banners.length) % banners.length)} aria-label="Previous slide">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_left</span>
              </button>
              {banners.map((_, i) => (
                <button key={i} className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`} onClick={() => setCurrent(i)} aria-label={`Slide ${i + 1}`} />
              ))}
              <button className="hero__dot-arrow" onClick={() => setCurrent(p => (p + 1) % banners.length)} aria-label="Next slide">
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>chevron_right</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
