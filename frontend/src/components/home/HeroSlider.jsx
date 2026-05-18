import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../../utils/helpers';
import './HeroSlider.css';

export default function HeroSlider({ banners = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => setCurrent(p => (p + 1) % banners.length), 6000);
    return () => clearInterval(interval);
  }, [banners.length]);

  const banner = banners[current];
  const heroImage = banner ? getImageUrl(banner.image) : null;

  return (
    <section className="hero" aria-labelledby="hero-heading" id="hero-section">
      <div className="hero__inner container">
        {/* Text Column */}
        <div className="hero__text">
          <p className="hero__eyebrow">Founded on Faith · Serving Humanity</p>
          <h1 id="hero-heading" className="hero__heading">
            {banner?.title || 'શ્રી વડવાળા મંદિર - Dudhrej Dham'}
          </h1>
          <p className="hero__sub">
            {banner?.subtitle || 'A living center of devotion, community service, and sacred tradition in Gujarat. Serving 1,000–1,500 souls daily through Annshetra, education, and Gaushala.'}
          </p>
          <div className="hero__actions">
            {banner?.ctaText && banner?.ctaLink ? (
              <Link to={banner.ctaLink} className="btn btn-primary btn--lg">{banner.ctaText}</Link>
            ) : (
              <Link to="/activities" className="btn btn-primary btn--lg">Explore Our Seva</Link>
            )}
            <Link to="/gallery" className="btn btn-ghost btn--lg">View Gallery →</Link>
          </div>

          {/* Stats row */}
          <div className="hero__stats">
            <div className="hero__stat">
              <span className="hero__stat-num">1,500+</span>
              <span className="hero__stat-label">Daily Meals</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-num">2-3 Lakh</span>
              <span className="hero__stat-label">Festival Devotees</span>
            </div>
            <div className="hero__stat-divider" aria-hidden="true" />
            <div className="hero__stat">
              <span className="hero__stat-num">24/7</span>
              <span className="hero__stat-label">Annshetra</span>
            </div>
          </div>
        </div>

        {/* Visual Column */}
        <div className="hero__visual">
          <div className="hero__image-wrap">
            {heroImage ? (
              <img
                src={heroImage}
                alt="Shri Vadwala Mandir, Dudhrej Dham"
                width="640"
                height="480"
                loading="eager"
                decoding="async"
                key={current}
                className="hero__image"
              />
            ) : (
              <div className="hero__image-placeholder" aria-hidden="true">
                <svg width="120" height="120" viewBox="0 0 40 40" fill="none">
                  <path d="M20 4 L28 14 L32 14 L32 36 L8 36 L8 14 L12 14 Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round"/>
                  <path d="M16 36 L16 26 Q20 22 24 26 L24 36" stroke="currentColor" strokeWidth="0.8"/>
                  <circle cx="20" cy="8" r="2" fill="currentColor"/>
                </svg>
              </div>
            )}
            {/* Decorative frame */}
            <div className="hero__frame" aria-hidden="true" />
          </div>

          {/* Banner navigation dots */}
          {banners.length > 1 && (
            <div className="hero__dots">
              <button
                className="hero__dot-arrow"
                onClick={() => setCurrent(p => (p - 1 + banners.length) % banners.length)}
                aria-label="Previous slide"
              >
                <ChevronLeft size={16} />
              </button>
              {banners.map((_, i) => (
                <button
                  key={i}
                  className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Slide ${i + 1}`}
                />
              ))}
              <button
                className="hero__dot-arrow"
                onClick={() => setCurrent(p => (p + 1) % banners.length)}
                aria-label="Next slide"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
