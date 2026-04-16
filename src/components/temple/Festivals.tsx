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
    <section id="festivals" className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            પર્વ ઉજવણી
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-heading italic">
            જન્માષ્ટમી, દિપાવલી, હોળી-ધૂળેટી અને ગુરૂ પૂર્ણિમા જેવા પ્રસંગોની ઉજવણી
          </p>
          <LotusDivider />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {festivals.map((f, i) => (
            <div key={i} className="fade-in-section hover-lift rounded-xl bg-gradient-saffron p-6 text-center shadow-md" style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="text-5xl block mb-3">{f.icon}</span>
              <h3 className="font-heading font-bold text-lg text-white mb-1">{f.nameGuj}</h3>
              <p className="text-sm text-white/80 italic mb-2">{f.name}</p>
              <div className="inline-block rounded-full bg-white/20 px-4 py-1">
                <p className="text-sm text-white font-medium">{f.date}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="fade-in-section max-w-4xl mx-auto mb-10 rounded-xl bg-temple-maroon/10 border border-temple-maroon/20 p-6 text-center">
          <p className="text-foreground font-heading text-base md:text-lg leading-relaxed">
            જન્માષ્ટમી, દિપાવલી, હોળી–ધુળેટી તેમજ ગુરૂ પુર્ણિમા જેવા પાવન પ્રસંગોમાં અંદાજીત{' '}
            <strong className="text-temple-saffron">૨ થી ૩ લાખ</strong>{' '}
            શ્રધ્ધાળુઓ દર્શનાર્થે આવે છે જેમના રહેવા તથા જમવા માટેની વ્યવસ્થા મંદિર દ્વારા કરવામાં આવે છે.
          </p>
        </div>

        <div className="fade-in-section max-w-2xl mx-auto">
          <h3 className="font-heading font-bold text-xl text-foreground text-center mb-4">📅 આવનાર ઉત્સવ ની યાદી</h3>
          <div className="space-y-3">
            {upcoming.map((u, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border border-temple-gold/20 bg-card px-5 py-4 shadow-sm hover-lift">
                <span className="text-2xl">{u.icon}</span>
                <div className="flex-1">
                  <p className="font-heading font-semibold text-foreground text-sm">{u.nameGuj}</p>
                  <p className="text-xs text-muted-foreground italic">{u.name}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-foreground">{u.date}</p>
                  <span className="inline-block rounded-full bg-temple-gold/20 text-temple-saffron text-xs font-semibold px-3 py-0.5 mt-1">Upcoming</span>
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
