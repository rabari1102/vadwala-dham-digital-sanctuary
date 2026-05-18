import SectionTitle from '../shared/SectionTitle';
import './IntroSection.css';

export default function IntroSection({ title, content, image }) {
  return (
    <section className="section intro-section" id="intro-section">
      <div className="container">
        <div className="intro-grid">
          <div className="intro-text">
            <p className="intro-eyebrow">About the Temple</p>
            <h2 className="intro-heading">{title || 'શ્રી વડવાળા મંદિર'}</h2>
            <p className="intro-content">
              {content || 'સૌરાષ્ટ્રની ભૂમિ સંત, શૂરવીર અને સતીઓની ભૂમિ ગણાય છે. A sacred center of devotion in the heart of Gujarat, Shri Vadwala Mandir has served the community for generations through spiritual guidance, education, and selfless service.'}
            </p>
            <div className="intro-highlights">
              <div className="intro-highlight">
                <span className="intro-highlight-icon">🙏</span>
                <div>
                  <strong>Daily Worship</strong>
                  <span>Morning & evening aarti</span>
                </div>
              </div>
              <div className="intro-highlight">
                <span className="intro-highlight-icon">📖</span>
                <div>
                  <strong>Sacred Tradition</strong>
                  <span>Centuries of spiritual heritage</span>
                </div>
              </div>
            </div>
          </div>
          <div className="intro-visual">
            {image ? (
              <img src={image} alt={title || 'Shri Vadwala Mandir'} className="intro-image" loading="lazy" />
            ) : (
              <div className="intro-image-placeholder" aria-hidden="true">
                <svg width="80" height="80" viewBox="0 0 40 40" fill="none">
                  <path d="M20 4 L28 14 L32 14 L32 36 L8 36 L8 14 L12 14 Z" stroke="currentColor" strokeWidth="0.8" strokeLinejoin="round"/>
                  <path d="M16 36 L16 26 Q20 22 24 26 L24 36" stroke="currentColor" strokeWidth="0.8"/>
                  <circle cx="20" cy="8" r="2" fill="currentColor"/>
                </svg>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
