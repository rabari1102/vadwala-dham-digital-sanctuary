import { useState } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { submitContactForm } from '../api/apiService';
import SectionTitle from '../components/shared/SectionTitle';
import { Phone, Mail, MapPin, Globe, Video, Camera } from 'lucide-react';
import './ContactPage.css';

const iconMap = {
  Youtube: Video, youtube: Video,
  Instagram: Camera, instagram: Camera,
  Facebook: Globe, facebook: Globe,
};

export default function ContactPage() {
  const { contact } = useSiteSettings();
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await submitContactForm(form);
      setSent(true);
      setForm({ name: '', phone: '', email: '', message: '' });
      setTimeout(() => setSent(false), 3000);
    } catch { /* ignore */ }
    setSending(false);
  };

  return (
    <>
      <div className="page-banner">
        <div className="page-banner__content container">
          <h1 className="page-banner__title">Contact Us</h1>
          <p className="page-banner__subtitle" lang="gu">અમારો સંપર્ક કરો</p>
        </div>
      </div>

      <section className="section contact-page-section">
        <div className="container">
          <div className="contact-page-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <SectionTitle eyebrow="Reach Out" title="Contact Information" align="left" />
              <div className="contact-info__items">
                {contact?.address && (
                  <div className="contact-info__item">
                    <MapPin size={20} className="contact-info__icon" />
                    <div>
                      <h4>Address</h4>
                      <p>{contact.address}</p>
                    </div>
                  </div>
                )}
                {contact?.phones?.map((p, i) => (
                  <div key={i} className="contact-info__item">
                    <Phone size={20} className="contact-info__icon" />
                    <div>
                      <h4>Phone</h4>
                      <p><a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a></p>
                    </div>
                  </div>
                ))}
                {contact?.emails?.map((e, i) => (
                  <div key={i} className="contact-info__item">
                    <Mail size={20} className="contact-info__icon" />
                    <div>
                      <h4>Email</h4>
                      <p><a href={`mailto:${e}`}>{e}</a></p>
                    </div>
                  </div>
                ))}
                {contact?.website && (
                  <div className="contact-info__item">
                    <Globe size={20} className="contact-info__icon" />
                    <div>
                      <h4>Website</h4>
                      <p><a href={contact.website} target="_blank" rel="noopener noreferrer">{contact.website}</a></p>
                    </div>
                  </div>
                )}
              </div>
              {contact?.socialLinks?.length > 0 && (
                <div className="contact-social">
                  {contact.socialLinks.map((s, i) => {
                    const Icon = iconMap[s.icon] || Globe;
                    return (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="contact-social__link">
                        <Icon size={16} /> {s.platform}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrap">
              <SectionTitle eyebrow="Send a Message" title="Write to Us" align="left" />
              {sent ? (
                <div className="contact-success">✅ Your message was sent successfully!</div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Your Name *</label>
                    <input id="name" type="text" placeholder="Enter your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input id="phone" type="tel" placeholder="Enter phone number" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input id="email" type="email" placeholder="Enter email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Your Message *</label>
                    <textarea id="message" placeholder="Write your message..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
                  </div>
                  <button type="submit" className="btn btn-primary btn--lg" disabled={sending}>
                    {sending ? '⏳ Sending...' : '✉️ Send Message'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      {contact?.mapEmbedUrl && (
        <section className="section contact-map-section">
          <div className="container">
            <SectionTitle eyebrow="Find Us" title="Our Location" />
            <div className="contact-map">
              <iframe src={contact.mapEmbedUrl} title="Map" loading="lazy" allowFullScreen="" />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
