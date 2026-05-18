import { Link } from 'react-router-dom';
import './DonateCTA.css';

export default function DonateCTA({ title, text }) {
  return (
    <section className="section donate-cta" id="donate-cta">
      <div className="container">
        <div className="donate-cta__inner">
          <div className="donate-cta__text">
            <p className="donate-cta__eyebrow">Support the Mission</p>
            <h2 className="donate-cta__heading">{title || 'Your Generosity Fuels Our Seva'}</h2>
            <p className="donate-cta__sub">
              {text || 'Every contribution supports Annshetra meals, Gaushala care, student education, and pilgrimage dharamshalas across Gujarat.'}
            </p>
          </div>
          <Link to="/donate" className="btn btn-gold btn--lg donate-cta__btn">
            🙏 Contribute Now
          </Link>
        </div>
      </div>
    </section>
  );
}
