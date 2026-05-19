import { useState } from 'react';
import { useSiteSettings } from '../context/SiteSettingsContext';
import { submitContactForm } from '../api/apiService';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/shared/SectionTitle';
import './ContactPage.css';

export default function ContactPage() {
  const { contact } = useSiteSettings();
  const { t, tr } = useLanguage();
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
      <section className="page-banner">
        <div className="container page-banner__content">
          <span className="page-banner__eyebrow">{t('getInTouch')}</span>
          <h1 className="page-banner__title">{t('contactUs')}</h1>
          <p className="page-banner__subtitle">{t('contactSubtitle')}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="contact-grid">
            {/* Contact Info */}
            <div className="contact-info">
              <SectionTitle eyebrow={t('reachOut')} title={t('contactInfo')} align="left" />
              <div className="contact-info__items">
                {contact?.address && (
                  <div className="contact-info__item">
                    <span className="material-symbols-outlined contact-info__icon">location_on</span>
                    <div>
                      <h4>{t('address')}</h4>
                      <p>{tr(contact.address)}</p>
                    </div>
                  </div>
                )}
                {contact?.phones?.map((p, i) => (
                  <div key={i} className="contact-info__item">
                    <span className="material-symbols-outlined contact-info__icon">call</span>
                    <div>
                      <h4>{t('phone')}</h4>
                      <p><a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a></p>
                    </div>
                  </div>
                ))}
                {contact?.emails?.map((e, i) => (
                  <div key={i} className="contact-info__item">
                    <span className="material-symbols-outlined contact-info__icon">mail</span>
                    <div>
                      <h4>{t('email')}</h4>
                      <p><a href={`mailto:${e}`}>{e}</a></p>
                    </div>
                  </div>
                ))}
                {contact?.website && (
                  <div className="contact-info__item">
                    <span className="material-symbols-outlined contact-info__icon">language</span>
                    <div>
                      <h4>{t('website')}</h4>
                      <p><a href={contact.website} target="_blank" rel="noopener noreferrer">{contact.website}</a></p>
                    </div>
                  </div>
                )}
              </div>
              {contact?.socialLinks?.length > 0 && (
                <div className="contact-social">
                  {contact.socialLinks.map((s, i) => (
                    <a key={i} href={s.url} target="_blank" rel="noopener noreferrer" className="contact-social__link">
                      <span className="material-symbols-outlined" style={{ fontSize: 16 }}>
                        {s.icon === 'Youtube' || s.icon === 'youtube' ? 'play_circle' :
                         s.icon === 'Instagram' || s.icon === 'instagram' ? 'photo_camera' : 'public'}
                      </span>
                      {s.platform}
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Contact Form */}
            <div className="contact-form-wrap">
              <SectionTitle eyebrow={t('sendMessage')} title={t('writeToUs')} align="left" />
              {sent ? (
                <div className="contact-success">✅ {t('sent')}</div>
              ) : (
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">{t('name')}</label>
                    <input id="name" type="text" className="form-input" placeholder={t('namePlaceholder')} value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">{t('phoneNumber')}</label>
                    <input id="phone" type="tel" className="form-input" placeholder={t('phonePlaceholder')} value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">{t('email')}</label>
                    <input id="email" type="email" className="form-input" placeholder={t('emailPlaceholder')} value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">{t('message')}</label>
                    <textarea id="message" className="form-input" style={{ minHeight: 140, resize: 'vertical' }} placeholder={t('messagePlaceholder')} value={form.message} onChange={e => setForm({...form, message: e.target.value})} required />
                  </div>
                  <button type="submit" className="btn btn-primary" disabled={sending}>
                    {sending ? `⏳ ${t('sending')}` : `${t('send')}`}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Map */}
          {contact?.mapEmbedUrl && (
            <div className="contact-map">
              <iframe src={contact.mapEmbedUrl} title="Map" loading="lazy" allowFullScreen="" />
            </div>
          )}
        </div>
      </section>

      {/* Quote */}
      <section className="contact-quote">
        <div className="container">
          <blockquote>
            "સેવા એ જ ભક્તિ છે. જ્યારે આપણે બીજાની સેવા કરીએ છીએ, ત્યારે આપણે ભગવાનની સેવા કરીએ છીએ."
          </blockquote>
        </div>
      </section>
    </>
  );
}
