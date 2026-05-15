import { Link } from 'react-router-dom';
import SectionTitle from '../shared/SectionTitle';
import './DonateCTA.css';

export default function DonateCTA({ title, text }) {
  return (
    <section className="section donate-cta" id="donate-cta">
      <div className="container">
        <div className="donate-cta__inner">
          <SectionTitle title={title || 'દાન – સેવા'} subtitle={text} light />
          <Link to="/donate" className="btn btn--gold donate-cta__btn">🙏 દાન કરો</Link>
        </div>
      </div>
    </section>
  );
}
