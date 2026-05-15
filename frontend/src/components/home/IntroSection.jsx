import SectionTitle from '../shared/SectionTitle';
import './IntroSection.css';

export default function IntroSection({ title, content, image }) {
  return (
    <section className="section section--white intro-section" id="intro-section">
      <div className="container">
        <div className="intro-section__grid">
          <div className="intro-section__text animate-fade-in-up">
            <SectionTitle title={title || 'શ્રી વડવાળા મંદિર'} align="left" />
            <p className="intro-section__content">{content || ''}</p>
          </div>
          {image && (
            <div className="intro-section__image animate-slide-right">
              <img src={image} alt={title || 'Mandir'} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
