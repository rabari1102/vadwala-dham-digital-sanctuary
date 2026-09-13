import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { getImageUrl } from '../../utils/helpers';
import './GuruParampara.css';

export default function GuruParampara({ gurus = [] }) {
  const { t, tr } = useLanguage();

  if (!gurus || gurus.length === 0) return null;

  return (
    <section className="guru-parampara" id="guru-parampara-section">
      <div className="container">
        <div className="guru-parampara__header">
          <span className="guru-parampara__eyebrow">{t('guruEyebrow')}</span>
          <h2 className="guru-parampara__title">{t('guruParampara')}</h2>
        </div>

        <div className="guru-parampara__cards">
          {gurus.map((guru, index) => {
            const isReverse = index % 2 !== 0;
            const imgSrc = guru.primary_image?.storage_key
              ? getImageUrl(guru.primary_image.storage_key, 600)
              : '';

            return (
              <Link
                key={guru._id || guru.slug}
                to={`/gurus/${guru.slug}`}
                className={`guru-card ${isReverse ? 'guru-card--reverse' : ''}`}
                aria-label={`${tr(guru.full_name)} – ${tr(guru.role_title)}`}
              >
                <div className="guru-card__image-wrap">
                  {imgSrc ? (
                    <img
                      src={imgSrc}
                      alt={guru.primary_image?.alt_text || tr(guru.full_name)}
                      className="guru-card__image"
                      loading="lazy"
                      decoding="async"
                      width="280"
                      height="340"
                    />
                  ) : (
                    <div className="guru-card__image-placeholder" aria-hidden="true">
                      <span className="material-symbols-outlined">person</span>
                    </div>
                  )}
                </div>

                <div className="guru-card__text">
                  <p className="guru-card__role">{tr(guru.role_title)}</p>
                  <h3 className="guru-card__name">{tr(guru.short_title || guru.full_name)}</h3>
                  <p className="guru-card__community">{tr(guru.community_role)}</p>
                  <p className="guru-card__bio">{tr(guru.biography_short)}</p>
                  <span className="guru-card__cta">
                    {t('readMore')}
                    <span className="material-symbols-outlined" aria-hidden="true">arrow_forward</span>
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
