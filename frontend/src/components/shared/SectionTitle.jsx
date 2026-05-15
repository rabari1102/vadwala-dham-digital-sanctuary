import './SectionTitle.css';

export default function SectionTitle({ title, subtitle, align = 'center', light = false }) {
  return (
    <div className={`section-title section-title--${align} ${light ? 'section-title--light' : ''}`}>
      <div className="section-title__ornament">✦</div>
      <h2 className="section-title__heading">{title}</h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
      <div className="section-title__line" />
    </div>
  );
}
