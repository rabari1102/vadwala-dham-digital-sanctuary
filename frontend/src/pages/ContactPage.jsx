import { useState } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { submitContactForm } from '../api/apiService';
import SectionTitle from '../components/shared/SectionTitle';
import { Phone, Mail, MapPin, Globe, Video, Camera } from 'lucide-react';
import './ContactPage.css';

const iconMap = { Youtube: Video, Instagram: Camera, Facebook: Globe, Video, Camera, Globe };

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
    } catch { /* ignore */ }
    setSending(false);
  };

  return (
    <>
      <div className="page-banner">
        <div className="page-banner__content">
          <h1 className="page-banner__title">સંપર્ક</h1>
          <p className="page-banner__subtitle">અમારો સંપર્ક કરો</p>
        </div>
      </div>

      <section className="section section--white">
        <div className="container">
          <div className="contact-grid">
            {/* Info */}
            <div className="contact-info">
              <SectionTitle title="સંપર્ક માહિતી" align="left" />
              <div className="contact-info__items">
                {contact?.address && (
                  <div className="contact-info__item">
                    <MapPin size={20} className="contact-info__icon" />
                    <div><h4>સરનામું</h4><p>{contact.address}</p></div>
                  </div>
                )}
                {contact?.phones?.map((p, i) => (
                  <div key={i} className="contact-info__item">
                    <Phone size={20} className="contact-info__icon" />
                    <div><h4>ફોન {i + 1}</h4><p><a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a></p></div>
                  </div>
                ))}
                {contact?.emails?.map((e, i) => (
                  <div key={i} className="contact-info__item">
                    <Mail size={20} className="contact-info__icon" />
                    <div><h4>ઈમેઈલ</h4><p><a href={`mailto:${e}`}>{e}</a></p></div>
                  </div>
                ))}
                {contact?.website && (
                  <div className="contact-info__item">
                    <Globe size={20} className="contact-info__icon" />
                    <div><h4>વેબસાઈટ</h4><p><a href={contact.website} target="_blank" rel="noopener noreferrer">{contact.website}</a></p></div>
                  </div>
                )}
              </div>
              {contact?.socialLinks?.length > 0 && (
                <div className="contact-social">
                  {contact.socialLinks.map((s, i) => {
                    const Icon = iconMap[s.icon] || Globe;
                    return (
                      <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="contact-social__link">
                        <Icon size={18} /> {s.platform}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Form */}
            <div className="contact-form-wrap">
              <SectionTitle title="સંદેશ મોકલો" align="left" />
              {sent ? (
                <div className="contact-success">✅ આપનો સંદેશ સફળતાપૂર્વક મોકલવામાં આવ્યો!</div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <input type="text" placeholder="આપનું નામ *" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  <input type="tel" placeholder="ફોન નંબર" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  <input type="email" placeholder="ઈમેઈલ" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  <textarea placeholder="આપનો સંદેશ *" rows="5" value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
                  <button type="submit" className="btn btn--primary" disabled={sending}>
                    {sending ? 'મોકલી રહ્યા છે...' : 'સંદેશ મોકલો'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      {contact?.mapEmbedUrl && (
        <section className="contact-map">
          <iframe src={contact.mapEmbedUrl} title="Map" loading="lazy" allowFullScreen />
        </section>
      )}
    </>
  );
}
