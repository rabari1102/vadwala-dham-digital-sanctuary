import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const festivals = [
  { icon: '🎨', nameGuj: 'હોળી મહોત્સવ સ્થાપના દિન', name: 'Holi Mahotsav (Sthapana Din)', date: 'ફાગણ સુદ પુનમ', dateEn: 'Fagan Sud Punam' },
  { icon: '🙏', nameGuj: 'ગુરુપુર્ણિમા મહોત્સવ', name: 'Guru Purnima Mahotsav', date: 'અષાઢ સુદ પુનમ', dateEn: 'Ashadh Sud Punam' },
  { icon: '🪴', nameGuj: 'જન્માષ્ટમી મહોત્સવ', name: 'Janmashtami Mahotsav', date: 'શ્રાવણ વદ ૮', dateEn: 'Shravan Vad 8' },
  { icon: '🪔', nameGuj: 'દિપાવલી પર્વ', name: 'Diwali Parv', date: 'આસો વદ ૧૪', dateEn: 'Aso Vad 14' },
];

const upcoming = [
  { icon: '🪔', nameGuj: 'દિપાવલી', name: 'Diwali', date: 'આસો વદ ૧૪' },
  { icon: '🎨', nameGuj: 'હોળી મહોત્સવ સ્થાપના દિવસ', name: 'Holi Mahotsav Sthapana Divas', date: 'ફાગણ સુદ પુનમ' },
];

const Festivals = () => {
  const containerRef = useFadeInAll();

  return (
    <section id="festivals" className="py-16 md:py-24 bg-section-alt">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
            Celebrations
          </span>
          <h2 className="section-heading">પર્વ ઉજવણી</h2>
          <p className="section-sub">
            જન્માષ્ટમી, દિપાવલી, હોળી-ધૂળેટી અને ગુરૂ પૂર્ણિમા
          </p>
          <LotusDivider />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto mb-10">
          {festivals.map((f, i) => (
            <div
              key={i}
              className="fade-in-section hover-lift rounded-2xl overflow-hidden shadow-md group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="bg-gradient-saffron p-6 text-center">
                <span className="text-5xl block mb-3">{f.icon}</span>
                <h3 className="font-heading font-bold text-base text-white mb-1">{f.nameGuj}</h3>
                <p className="text-xs text-orange-100 italic mb-3">{f.name}</p>
                <div className="inline-block rounded-full bg-white/25 px-4 py-1">
                  <p className="text-sm text-white font-semibold">{f.date}</p>
                </div>
              </div>
              <div className="bg-white px-4 py-2 text-center">
                <p className="text-xs text-gray-400 italic">{f.dateEn}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Attendance highlight */}
        <div className="fade-in-section max-w-4xl mx-auto mb-10">
          <div className="rounded-2xl border border-orange-200 bg-white p-6 text-center shadow-sm">
            <p className="text-3xl mb-3">🙏</p>
            <p className="text-gray-700 font-heading text-base md:text-lg leading-relaxed">
              જન્માષ્ટમી, દિપાવલી, હોળી–ધુળેટી તેમજ ગુરૂ પુર્ણિમા જેવા પાવન પ્રસંગોમાં અંદાજીત{' '}
              <strong className="text-orange-600 text-xl">૨ થી ૩ લાખ</strong>{' '}
              શ્રધ્ધાળુઓ દર્શનાર્થે આવે છે.
            </p>
            <p className="text-sm text-gray-400 italic mt-2">
              2–3 lakh devotees attend major festivals; food & accommodation arranged by the temple
            </p>
          </div>
        </div>

        {/* Upcoming events */}
        <div className="fade-in-section max-w-2xl mx-auto">
          <h3 className="font-heading font-bold text-xl text-gray-800 text-center mb-5">
            📅 આવનાર ઉત્સવ ની યાદી
          </h3>
          <div className="space-y-3">
            {upcoming.map((u, i) => (
              <div key={i} className="hover-lift flex items-center gap-4 rounded-xl border border-orange-100 bg-white px-5 py-4 shadow-sm">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-2xl">
                  {u.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold text-gray-800 text-sm">{u.nameGuj}</p>
                  <p className="text-xs text-gray-400 italic truncate">{u.name}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-semibold text-gray-700">{u.date}</p>
                  <span className="inline-block rounded-full bg-orange-100 text-orange-600 text-xs font-semibold px-3 py-0.5 mt-1">
                    Upcoming
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Festivals;
