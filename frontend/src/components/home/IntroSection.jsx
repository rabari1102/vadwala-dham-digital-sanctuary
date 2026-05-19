import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl } from '../../utils/helpers';
import './IntroSection.css';

export default function IntroSection({ title, content, image }) {
  const { t, tr } = useLanguage();

  return (
    <section className="intro-section" id="intro-section">
      <div className="container">
        <div className="intro-grid">
          <div className="intro-visual">
            <div className="intro-visual__corner hide-mobile" />
            {image ? (
              <img src={getImageUrl(image)} alt={tr(title || 'Shri Vadwala Mandir')} className="intro-image" loading="lazy" />
            ) : (
              <div className="intro-image-placeholder" aria-hidden="true">
                <span className="material-symbols-outlined" style={{ fontSize: 64, opacity: 0.3 }}>menu_book</span>
              </div>
            )}
          </div>
          <div className="intro-text">
            <span className="intro-eyebrow">{t('aboutTemple')}</span>
            <h2 className="intro-heading">{tr(title || 'શ્રી વડવાળા મંદિર દુધરેજધામ')}</h2>
            <p className="intro-content">
              {tr(content || 'સૌરાષ્ટ્રની ભૂમિ સંત, શૂરવીર અને સતીઓની ભૂમિ ગણાય છે.')}
            </p>
            <div className="intro-stats">
              <div>
                <span className="intro-stat__value">1,500+</span>
                <p className="intro-stat__label">{t('dailyMeals')}</p>
              </div>
              <div>
                <span className="intro-stat__value">500+</span>
                <p className="intro-stat__label">{t('sacredTradition')}</p>
              </div>
            </div>
            <Link to="/history" className="btn btn-tertiary" style={{ alignSelf: 'flex-start', marginTop: 8 }}>
              {t('learnMore')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
