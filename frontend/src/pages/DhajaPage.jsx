import { useState } from 'react';
import { submitDhajaBooking } from '../api/apiService';
import { useLanguage } from '../context/LanguageContext';
import SectionTitle from '../components/shared/SectionTitle';
import './DhajaPage.css';

const INITIAL_FORM = {
  fullName: '', phone: '', email: '', address: '', city: '',
  gotra: '', familyMembers: '', preferredDate: '', occasion: '',
  dhajaType: 'regular', message: '',
};

export default function DhajaPage() {
  const { t, isGujarati } = useLanguage();
  const [form, setForm] = useState(INITIAL_FORM);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.fullName || !form.phone) {
      setError(isGujarati ? 'કૃપા કરીને પૂરું નામ અને ફોન નંબર ભરો.' : 'Please fill in full name and phone number.');
      return;
    }
    setSending(true);
    setError('');
    try {
      await submitDhajaBooking(form);
      setSent(true);
      setForm(INITIAL_FORM);
    } catch (err) {
      setError(isGujarati ? 'કંઈક ખોટું થયું. ફરી પ્રયાસ કરો.' : 'Something went wrong. Please try again.');
    }
    setSending(false);
  };

  return (
    <>
      {/* Dark Hero */}
      <section className="dhaja-hero">
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <span className="dhaja-hero__icon">🚩</span>
          <span className="dhaja-hero__eyebrow">
            {isGujarati ? 'પવિત્ર પરંપરા' : 'Sacred Tradition'}
          </span>
          <h1 className="dhaja-hero__title">
            {isGujarati ? 'ધજા ચઢાવો' : 'Dhaja Chadavani'}
          </h1>
          <p className="dhaja-hero__sub">
            {isGujarati
              ? 'શ્રી વડવાળા મંદિર દુધરેજધામમાં ધજા ચઢાવવી એ ભક્તિ અને સમર્પણનું પવિત્ર પ્રતીક છે. દ્વારકાધીશ મંદિરની જેમ, અહીં પણ ભક્તો ધજા ચઢાવી પોતાની મનોકામના પૂર્ણ કરે છે.'
              : 'Hoisting the sacred flag (Dhaja) at Shri Vadwala Mandir Dudhrejdham is a holy symbol of devotion and surrender. Like Dwarkadhish Temple, devotees offer Dhaja to fulfill their wishes and seek divine blessings.'}
          </p>
        </div>
      </section>

      {/* Info Cards */}
      <section className="dhaja-info">
        <div className="container">
          <SectionTitle
            eyebrow={isGujarati ? 'ધજા વિશે' : 'About Dhaja'}
            title={isGujarati ? 'ધજા ચઢાવવાનું મહત્વ' : 'Significance of Dhaja'}
          />
          <div className="dhaja-info__grid">
            <div className="dhaja-info__card">
              <span className="dhaja-info__card-icon">🙏</span>
              <h3>{isGujarati ? 'ભક્તિ પ્રતીક' : 'Symbol of Devotion'}</h3>
              <p>{isGujarati
                ? 'ધજા ચઢાવવી એ વડવાળાદેવ ને સમર્પિત થવાની, ભક્તિ અને શ્રદ્ધા વ્યક્ત કરવાની પવિત્ર ક્રિયા છે. ધજા મંદિરના શિખર ઉપર ફરકતી રહે છે.'
                : 'Hoisting a Dhaja is a sacred act of surrender to God, expressing devotion and faith. The flag flies atop the temple spire.'}
              </p>
            </div>
            <div className="dhaja-info__card">
              <span className="dhaja-info__card-icon">✨</span>
              <h3>{isGujarati ? 'મનોકામના પૂર્તિ' : 'Wish Fulfillment'}</h3>
              <p>{isGujarati
                ? 'ભક્તો પોતાની મનોકામના પૂર્ણ થવાની પ્રાર્થના સાથે ધજા ચઢાવે છે. પરિવારના સુખ, સ્વાસ્થ્ય અને સમૃદ્ધિ માટે ધજા ચઢાવવામાં આવે છે.'
                : 'Devotees hoist the flag with prayers for fulfillment of wishes — family happiness, health, prosperity, and divine protection.'}
              </p>
            </div>
            <div className="dhaja-info__card">
              <span className="dhaja-info__card-icon">📿</span>
              <h3>{isGujarati ? 'પરંપરા' : 'Tradition'}</h3>
              <p>{isGujarati
                ? 'દ્વારકાધીશ મંદિર અને અન્ય પ્રસિદ્ધ મંદિરોની જેમ, શ્રી વડવાળા મંદિરમાં પણ ધજા ચઢાવવાની પ્રાચીન પરંપરા છે.'
                : 'Like Dwarkadhish Temple and other sacred sites, Shri Vadwala Mandir continues the ancient tradition of Dhaja hoisting.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="dhaja-process">
        <div className="container">
          <SectionTitle
            eyebrow={isGujarati ? 'પ્રક્રિયા' : 'Process'}
            title={isGujarati ? 'ધજા ચઢાવવાની રીત' : 'How to Book Dhaja'}
          />
          <div className="dhaja-steps">
            <div className="dhaja-step">
              <span className="dhaja-step__num">1</span>
              <div className="dhaja-step__content">
                <h4>{isGujarati ? 'ફોર્મ ભરો' : 'Fill the Form'}</h4>
                <p>{isGujarati ? 'નીચે આપેલ ફોર્મમાં તમારું પૂરું નામ, ફોન નંબર, ગોત્ર, અને ધજાની તારીખ ભરો.' : 'Fill in your full name, phone number, gotra, and preferred date in the form below.'}</p>
              </div>
            </div>
            <div className="dhaja-step">
              <span className="dhaja-step__num">2</span>
              <div className="dhaja-step__content">
                <h4>{isGujarati ? 'મંદિર સંપર્ક' : 'Temple Contacts You'}</h4>
                <p>{isGujarati ? 'મંદિર વ્યવસ્થાપન સમિતિ તમારી અરજી મળ્યા પછી તમારો સંપર્ક કરશે અને તારીખ/સમય નક્કી કરશે.' : 'The temple management committee will contact you after receiving your request to confirm date and time.'}</p>
              </div>
            </div>
            <div className="dhaja-step">
              <span className="dhaja-step__num">3</span>
              <div className="dhaja-step__content">
                <h4>{isGujarati ? 'ધજા ચઢાવો' : 'Hoist the Dhaja'}</h4>
                <p>{isGujarati ? 'નક્કી કરેલ દિવસે મંદિરમાં આવો, પૂજા-વિધિ કરો, અને ધજા ચઢાવો. ભોજન પ્રસાદની વ્યવસ્થા મંદિર દ્વારા થશે.' : 'Visit the temple on the confirmed day, perform the puja rituals, and hoist the Dhaja. The temple provides prasad arrangements.'}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Form */}
      <section className="dhaja-form-section">
        <div className="container">
          <SectionTitle
            eyebrow={isGujarati ? 'બુકિંગ' : 'Booking'}
            title={isGujarati ? 'ધજા ચઢાવવા માટે અરજી' : 'Request Dhaja Chadavani'}
          />
          <div className="dhaja-form-grid">
            {/* Left — Note */}
            <div className="dhaja-form-left">
              <div className="dhaja-form-note">
                <h4>{isGujarati ? 'મહત્વની માહિતી' : 'Important Information'}</h4>
                <p>{isGujarati
                  ? 'ધજા ચઢાવવા માટે મંદિરની વ્યવસ્થાપન સમિતિ બુકિંગની તારીખ નક્કી કરે છે. અરજી મળ્યા પછી મંદિરમાંથી ફોનથી સંપર્ક કરવામાં આવશે.'
                  : 'The temple management committee decides the booking date for Dhaja. You will be contacted by phone after your request is received.'}
                </p>
                <ul>
                  <li>{isGujarati ? 'ધજાનો ખર્ચ મંદિરની વ્યવસ્થા મુજબ' : 'Dhaja cost as per temple arrangements'}</li>
                  <li>{isGujarati ? 'ભોજન પ્રસાદની વ્યવસ્થા મંદિર દ્વારા' : 'Prasad arrangements by the temple'}</li>
                  <li>{isGujarati ? 'પૂજા-વિધિ મંદિરના સાધુ-સંતો દ્વારા' : 'Puja rituals by temple sadhu-sants'}</li>
                </ul>
              </div>

              <div className="dhaja-form-note">
                <h4>{isGujarati ? 'ધજાના પ્રકાર' : 'Types of Dhaja'}</h4>
                <p>{isGujarati
                  ? '• નિયમિત ધજા — સામાન્ય દિવસે\n• વિશેષ ધજા — પૂર્ણિમા, અમાસ, એકાદશી\n• ઉત્સવ ધજા — તહેવાર/મહોત્સવ સમયે'
                  : '• Regular Dhaja — On normal days\n• Special Dhaja — Purnima, Amavas, Ekadashi\n• Festival Dhaja — During festivals/celebrations'}
                </p>
              </div>
            </div>

            {/* Right — Form */}
            <div className="dhaja-form-wrap">
              {sent ? (
                <div className="dhaja-success">
                  <span className="dhaja-success__icon">🚩</span>
                  <h3>{isGujarati ? 'અરજી સફળ!' : 'Request Submitted!'}</h3>
                  <p>{isGujarati
                    ? 'તમારી ધજા ચઢાવવાની અરજી મળી ગઈ છે. મંદિર વ્યવસ્થાપન સમિતિ ટૂંક સમયમાં તમારો સંપર્ક કરશે.'
                    : 'Your Dhaja booking request has been received. The temple management committee will contact you soon.'}
                  </p>
                  <button
                    className="btn btn-secondary"
                    style={{ marginTop: 20 }}
                    onClick={() => setSent(false)}
                  >
                    {isGujarati ? 'નવી અરજી' : 'New Request'}
                  </button>
                </div>
              ) : (
                <form className="dhaja-form" onSubmit={handleSubmit}>
                  {error && (
                    <div style={{ padding: '10px 16px', borderRadius: 'var(--radius-md)', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: 13 }}>
                      {error}
                    </div>
                  )}

                  {/* Name + Phone */}
                  <div className="dhaja-form-row">
                    <div className="form-group">
                      <label htmlFor="fullName">{isGujarati ? 'પૂરું નામ *' : 'Full Name *'}</label>
                      <input id="fullName" name="fullName" type="text" className="form-input" placeholder={isGujarati ? 'તમારું પૂરું નામ' : 'Your full name'} value={form.fullName} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">{isGujarati ? 'ફોન નંબર *' : 'Phone Number *'}</label>
                      <input id="phone" name="phone" type="tel" className="form-input" placeholder={isGujarati ? 'મોબાઈલ નંબર' : 'Mobile number'} value={form.phone} onChange={handleChange} required />
                    </div>
                  </div>

                  {/* Email + City */}
                  <div className="dhaja-form-row">
                    <div className="form-group">
                      <label htmlFor="email">{isGujarati ? 'ઈમેલ' : 'Email'}</label>
                      <input id="email" name="email" type="email" className="form-input" placeholder={isGujarati ? 'ઈમેલ (વૈકલ્પિક)' : 'Email (optional)'} value={form.email} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="city">{isGujarati ? 'શહેર' : 'City'}</label>
                      <input id="city" name="city" type="text" className="form-input" placeholder={isGujarati ? 'તમારું શહેર' : 'Your city'} value={form.city} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Address */}
                  <div className="form-group">
                    <label htmlFor="address">{isGujarati ? 'સરનામું' : 'Address'}</label>
                    <input id="address" name="address" type="text" className="form-input" placeholder={isGujarati ? 'પૂરું સરનામું' : 'Full address'} value={form.address} onChange={handleChange} />
                  </div>

                  {/* Gotra + Family Members */}
                  <div className="dhaja-form-row">
                    <div className="form-group">
                      <label htmlFor="gotra">{isGujarati ? 'ગોત્ર' : 'Gotra'}</label>
                      <input id="gotra" name="gotra" type="text" className="form-input" placeholder={isGujarati ? 'તમારું ગોત્ર' : 'Your gotra'} value={form.gotra} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="familyMembers">{isGujarati ? 'પરિવારના સભ્યો' : 'Family Members'}</label>
                      <input id="familyMembers" name="familyMembers" type="text" className="form-input" placeholder={isGujarati ? 'કેટલા સભ્યો આવશે' : 'No. of members attending'} value={form.familyMembers} onChange={handleChange} />
                    </div>
                  </div>

                  {/* Preferred Date + Dhaja Type */}
                  <div className="dhaja-form-row">
                    <div className="form-group">
                      <label htmlFor="preferredDate">{isGujarati ? 'પ્રાધાન્ય તારીખ' : 'Preferred Date'}</label>
                      <input id="preferredDate" name="preferredDate" type="date" className="form-input" value={form.preferredDate} onChange={handleChange} min={new Date().toISOString().split('T')[0]} />
                    </div>
                    <div className="form-group">
                      <label htmlFor="dhajaType">{isGujarati ? 'ધજાનો પ્રકાર' : 'Dhaja Type'}</label>
                      <select id="dhajaType" name="dhajaType" className="form-input" value={form.dhajaType} onChange={handleChange}>
                        <option value="regular">{isGujarati ? 'નિયમિત ધજા' : 'Regular Dhaja'}</option>
                        <option value="special">{isGujarati ? 'વિશેષ ધજા (પૂર્ણિમા/એકાદશી)' : 'Special Dhaja (Purnima/Ekadashi)'}</option>
                        <option value="festival">{isGujarati ? 'ઉત્સવ ધજા' : 'Festival Dhaja'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Occasion */}
                  <div className="form-group">
                    <label htmlFor="occasion">{isGujarati ? 'પ્રસંગ / કારણ' : 'Occasion / Reason'}</label>
                    <input id="occasion" name="occasion" type="text" className="form-input" placeholder={isGujarati ? 'જન્મદિવસ, લગ્ન, મનોકામના પૂર્તિ, વગેરે' : 'Birthday, Marriage, Wish Fulfillment, etc.'} value={form.occasion} onChange={handleChange} />
                  </div>

                  {/* Message */}
                  <div className="form-group">
                    <label htmlFor="message">{isGujarati ? 'વધારાનો સંદેશ' : 'Additional Message'}</label>
                    <textarea id="message" name="message" className="form-input" style={{ minHeight: 100, resize: 'vertical' }} placeholder={isGujarati ? 'કોઈ વિશેષ વિનંતી કે માહિતી...' : 'Any special request or information...'} value={form.message} onChange={handleChange} />
                  </div>

                  <button type="submit" className="btn btn-primary btn--lg" disabled={sending}>
                    {sending
                      ? (isGujarati ? '⏳ મોકલી રહ્યા છીએ...' : '⏳ Submitting...')
                      : (isGujarati ? '🚩 ધજા ચઢાવવા માટે અરજી કરો' : '🚩 Submit Dhaja Request')}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="dhaja-quote">
        <div className="container">
          <blockquote>
            {isGujarati
              ? '"ધજા ચઢાવવી એ વડવાળાદેવ ને  આપણા ઘરનું નિમંત્રણ છે — આપણે કહીએ છીએ કે હે પ્રભુ, અમારા કુટુંબ ઉપર તમારી કૃપા બનાવી રાખો."'
              : '"Hoisting the Dhaja is an invitation to God — we say, O Lord, keep your grace upon our family."'}
          </blockquote>
        </div>
      </section>
    </>
  );
}
