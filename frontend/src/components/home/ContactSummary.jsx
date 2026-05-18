import { Phone, Mail, MapPin } from 'lucide-react';
import { useSiteSettings } from '../../context/SiteSettingsContext';
import './ContactSummary.css';

export default function ContactSummary() {
  const { contact } = useSiteSettings();

  return (
    <section className="section contact-summary" id="contact-summary">
      <div className="container">
        <div className="contact-summary__header">
          <p className="contact-summary__eyebrow">Get in Touch</p>
          <h2 className="contact-summary__heading">Visit or Connect</h2>
          <p className="contact-summary__sub">
            We welcome all devotees and visitors. Reach out for darshan, accommodation, or guidance.
          </p>
        </div>
        <div className="contact-summary__grid">
          <div className="contact-summary__card">
            <MapPin size={22} className="contact-summary__icon" />
            <h4 className="contact-summary__card-title">Address</h4>
            <p>{contact?.address || 'Shri Vadwala Mandir, Dudhrej, Gujarat'}</p>
          </div>
          <div className="contact-summary__card">
            <Phone size={22} className="contact-summary__icon" />
            <h4 className="contact-summary__card-title">Phone</h4>
            {(contact?.phones || []).length > 0 ? (
              contact.phones.map((p, i) => (
                <p key={i}><a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a></p>
              ))
            ) : (
              <p className="contact-summary__placeholder">Coming soon</p>
            )}
          </div>
          <div className="contact-summary__card">
            <Mail size={22} className="contact-summary__icon" />
            <h4 className="contact-summary__card-title">Email</h4>
            {(contact?.emails || []).length > 0 ? (
              contact.emails.map((e, i) => (
                <p key={i}><a href={`mailto:${e}`}>{e}</a></p>
              ))
            ) : (
              <p className="contact-summary__placeholder">Coming soon</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
