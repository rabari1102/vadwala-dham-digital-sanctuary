import './SectionTitle.css';

export default function SectionTitle({ eyebrow, title, subtitle, align = 'center' }) {
  return (
    <div className={`section-title ${align === 'center' ? 'section-title--center' : ''}`}>
      {eyebrow && <span className="section-title__eyebrow">{eyebrow}</span>}
      {title && <h2 className="section-title__heading">{title}</h2>}
      {subtitle && <p className="section-title__sub">{subtitle}</p>}
    </div>
  );
}
