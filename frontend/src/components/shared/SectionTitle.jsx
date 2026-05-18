import './SectionTitle.css';

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center', light = false }) {
  return (
    <div className={`section-title section-title--${align} ${light ? 'section-title--light' : ''}`}>
      {eyebrow && <p className="section-title__eyebrow">{eyebrow}</p>}
      <h2 className="section-title__heading">{title}</h2>
      {subtitle && <p className="section-title__subtitle">{subtitle}</p>}
      <div className="section-title__accent" aria-hidden="true" />
    </div>
  );
}
