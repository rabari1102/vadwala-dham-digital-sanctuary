import { useLanguage } from '../../context/LanguageContext';
import './ServiceCards.css';

const defaultRituals = {
  morning: {
    icon: 'wb_twilight',
    period: 'પ્રાતઃ કાલ',
    items: [
      { name: 'મંગળા આરતી', time: '૦૫:૩૦ AM' },
      { name: 'બાલ ભોગ', time: '૦૭:૦૦ AM' },
      { name: 'શણગાર આરતી', time: '૦૮:૧૫ AM' },
    ],
  },
  afternoon: {
    icon: 'sunny',
    period: 'મધ્યાહન',
    items: [
      { name: 'રાજભોગ આરતી', time: '૧૧:૩૦ AM' },
      { name: 'થાળ પ્રસાદ', time: '૧૨:૧૫ PM' },
      { name: 'મંદિર દ્વાર બંધ', time: '૦૧:૦૦ PM' },
    ],
  },
  evening: {
    icon: 'nights_stay',
    period: 'સંધ્યા કાલ',
    items: [
      { name: 'ઉત્થાપન', time: '૦૪:૩૦ PM' },
      { name: 'સંધ્યા આરતી', time: '૦૭:૧૫ PM' },
      { name: 'શયન આરતી', time: '૦૯:૦૦ PM' },
    ],
  },
};

export default function ServiceCards({ activities = [] }) {
  const { t, tr } = useLanguage();

  return (
    <section className="rituals-section" id="rituals-section">
      <div className="container">
        <div className="rituals-header">
          <p className="rituals-header__eyebrow">{t('sacredCalendar')}</p>
          <h2 className="rituals-header__title">{t('dailyWorship')}</h2>
          <p className="rituals-header__sub">{t('dailyWorshipText')}</p>
        </div>

        <div className="rituals-grid">
          {/* Morning */}
          <div className="ritual-card">
            <div className="ritual-card__header">
              <span className="material-symbols-outlined ritual-card__icon" style={{ color: 'var(--color-primary)' }}>
                {defaultRituals.morning.icon}
              </span>
              <h3 className="ritual-card__period">{defaultRituals.morning.period}</h3>
            </div>
            <div className="ritual-card__items">
              {defaultRituals.morning.items.map((item, i) => (
                <div key={i} className="ritual-item">
                  <span className="ritual-item__name">{item.name}</span>
                  <span className="ritual-item__time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Afternoon */}
          <div className="ritual-card ritual-card--secondary">
            <div className="ritual-card__header">
              <span className="material-symbols-outlined ritual-card__icon">
                {defaultRituals.afternoon.icon}
              </span>
              <h3 className="ritual-card__period">{defaultRituals.afternoon.period}</h3>
            </div>
            <div className="ritual-card__items">
              {defaultRituals.afternoon.items.map((item, i) => (
                <div key={i} className="ritual-item">
                  <span className="ritual-item__name">{item.name}</span>
                  <span className="ritual-item__time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evening */}
          <div className="ritual-card ritual-card--tertiary">
            <div className="ritual-card__header">
              <span className="material-symbols-outlined ritual-card__icon">
                {defaultRituals.evening.icon}
              </span>
              <h3 className="ritual-card__period">{defaultRituals.evening.period}</h3>
            </div>
            <div className="ritual-card__items">
              {defaultRituals.evening.items.map((item, i) => (
                <div key={i} className="ritual-item">
                  <span className="ritual-item__name">{item.name}</span>
                  <span className="ritual-item__time">{item.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="rituals-footer">
          <p className="rituals-footer__note">* Timings may vary during festivals</p>
        </div>
      </div>
    </section>
  );
}
