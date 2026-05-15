import { useState } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { submitContactForm } from '../api/apiService';
import SectionTitle from '../components/shared/SectionTitle';
import { Phone, Mail, MapPin, Globe, Video, Camera } from 'lucide-react';
import './ContactPage.css';

const iconMap = { 
  Youtube: Video, 
  Instagram: Camera, 
  Facebook: Globe,
  youtube: Video,
  instagram: Camera,
  facebook: Globe
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
        <div className="page-banner__content">
          <h1 className="page-banner__title">સંપર્ક</h1>
          <p className="page-banner__subtitle">અમારો સંપર્ક કરો</p>
        </div>
      </div>

      <section className="section section--white">
        <div className="container">
          <div className="contact-grid">
            {/* LEFT COLUMN - CONTACT INFO */}
            <div className="contact-info">
              <SectionTitle title="સંપર્ક માહિતી" align="left" />
              <div className="contact-info__items">
                {contact?.address && (
                  <div className="contact-info__item">
                    <MapPin size={24} className="contact-info__icon" />
                    <div>
                      <h4>સરનામું</h4>
                      <p>{contact.address}</p>
                    </div>
                  </div>
                )}
                {contact?.phones?.map((p, i) => (
                  <div key={i} className="contact-info__item">
                    <Phone size={24} className="contact-info__icon" />
                    <div>
                      <h4>ફોન નંબર</h4>
                      <p><a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a></p>
                    </div>
                  </div>
                ))}
                {contact?.emails?.map((e, i) => (
                  <div key={i} className="contact-info__item">
                    <Mail size={24} className="contact-info__icon" />
                    <div>
                      <h4>ઈમેઈલ</h4>
                      <p><a href={`mailto:${e}`}>{e}</a></p>
                    </div>
                  </div>
                ))}
                {contact?.website && (
                  <div className="contact-info__item">
                    <Globe size={24} className="contact-info__icon" />
                    <div>
                      <h4>વેબસાઈટ</h4>
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
                        <Icon size={18} /> {s.platform}
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* RIGHT COLUMN - CONTACT FORM */}
            <div>
              <div className="contact-form-wrapper">
                <SectionTitle title="સંદેશ મોકલો" align="left" />
                {sent ? (
                  <div className="contact-success">✅ આપનો સંદેશ સફળતાપૂર્વક મોકલવામાં આવ્યો!</div>
                ) : (
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">આપનું નામ *</label>
                      <input 
                        id="name"
                        type="text" 
                        placeholder="નામ લખો" 
                        value={form.name} 
                        onChange={e => setForm({...form, name: e.target.value})} 
                        required 
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">ફોન નંબર</label>
                      <input 
                        id="phone"
                        type="tel" 
                        placeholder="ફોન નંબર લખો" 
                        value={form.phone} 
                        onChange={e => setForm({...form, phone: e.target.value})} 
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email">ઈમેઈલ</label>
                      <input 
                        id="email"
                        type="email" 
                        placeholder="ઈમેઈલ લખો" 
                        value={form.email} 
                        onChange={e => setForm({...form, email: e.target.value})} 
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="message">આપનો સંદેશ *</label>
                      <textarea 
                        id="message"
                        placeholder="તમારો સંદેશ લખો..." 
                        value={form.message} 
                        onChange={e => setForm({...form, message: e.target.value})} 
                        required 
                      />
                    </div>

                    <button type="submit" className="btn btn--submit" disabled={sending}>
                      {sending ? '⏳ મોકલી રહ્યા છે...' : '✉️ સંદેશ મોકલો'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MAP SECTION */}
      {contact?.mapEmbedUrl && (
        <section className="section" style={{paddingBottom: 0}}>
          <div className="container">
            <SectionTitle title="અમારો સ્થાન" align="center" />
            <div className="contact-map">
              <iframe src={contact.mapEmbedUrl} title="Map" loading="lazy" allowFullScreen="" />
            </div>
          </div>
        </section>
      )}
    </>
  );
}
