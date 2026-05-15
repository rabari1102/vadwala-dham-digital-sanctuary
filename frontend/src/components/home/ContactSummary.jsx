import { Phone, Mail, MapPin } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import SectionTitle from '../shared/SectionTitle';
import './ContactSummary.css';

export default function ContactSummary() {
  const { contact } = useSiteSettings();

  return (
    <section className="section section--white contact-summary" id="contact-summary">
      <div className="container">
        <SectionTitle title="સંપર્ક" subtitle="મંદિર સાથે જોડાઓ" />
        <div className="contact-summary__grid">
          <div className="contact-summary__card">
            <MapPin size={24} className="contact-summary__icon" />
            <h4>સરનામું</h4>
            <p>{contact?.address || 'શ્રી વડવાળા મંદિર દુધરેજધામ'}</p>
          </div>
          <div className="contact-summary__card">
            <Phone size={24} className="contact-summary__icon" />
            <h4>ફોન</h4>
            {(contact?.phones || []).map((p, i) => (
              <p key={i}><a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a></p>
            ))}
          </div>
          <div className="contact-summary__card">
            <Mail size={24} className="contact-summary__icon" />
            <h4>ઈમેઈલ</h4>
            {(contact?.emails || []).map((e, i) => (
              <p key={i}><a href={`mailto:${e}`}>{e}</a></p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
