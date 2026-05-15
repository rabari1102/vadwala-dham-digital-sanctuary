import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getImageUrl } from '../../utils/helpers';
import './HeroSlider.css';

export default function HeroSlider({ banners = [] }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => setCurrent(p => (p + 1) % banners.length), 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  if (!banners.length) {
    return (
      <section className="hero" id="hero-section">
        <div className="hero__slide hero__slide--default">
          <div className="hero__overlay" />
          <div className="hero__content container animate-fade-in-up">
            <h1 className="hero__title">શ્રી વડવાળા મંદિર દુધરેજધામ</h1>
            <p className="hero__subtitle">ભગવાન શ્રી રામચંદ્રજીના પવિત્ર ધામમાં આપનું સ્વાગત છે</p>
          </div>
        </div>
      </section>
    );
  }

  const banner = banners[current];

  return (
    <section className="hero" id="hero-section">
      <div className="hero__slide" style={{ backgroundImage: `url(${getImageUrl(banner.image)})` }}>
        <div className="hero__overlay" />
        <div className="hero__content container animate-fade-in-up" key={current}>
          <h1 className="hero__title">{banner.title}</h1>
          {banner.subtitle && <p className="hero__subtitle">{banner.subtitle}</p>}
          {banner.ctaText && banner.ctaLink && (
            <Link to={banner.ctaLink} className="btn btn--primary hero__cta">{banner.ctaText}</Link>
          )}
        </div>
      </div>

      {banners.length > 1 && (
        <>
          <button className="hero__arrow hero__arrow--left" onClick={() => setCurrent(p => (p - 1 + banners.length) % banners.length)}>
            <ChevronLeft size={24} />
          </button>
          <button className="hero__arrow hero__arrow--right" onClick={() => setCurrent(p => (p + 1) % banners.length)}>
            <ChevronRight size={24} />
          </button>
          <div className="hero__dots">
            {banners.map((_, i) => (
              <button key={i} className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`} onClick={() => setCurrent(i)} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
