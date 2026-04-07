import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const festivals = [
  { icon: '🎨', name: 'Holi Mahotsav (Sthapana Din)', date: 'Fagan Sud Punam' },
  { icon: '🙏', name: 'Guru Purnima Mahotsav', date: 'Ashadh Sud Punam' },
  { icon: '🪴', name: 'Janmashtami Mahotsav', date: 'Shravan Vad 8' },
  { icon: '🪔', name: 'Diwali Parv', date: 'Aso Vad 14' },
];

const upcoming = [
  { icon: '🪔', name: 'Diwali', date: 'Aso Vad 14' },
  { icon: '🎨', name: 'Holi Mahotsav Sthapana Divas', date: 'Fagan Sud Punam' },
];

const Festivals = () => {
  const containerRef = useFadeInAll();

  return (
    <section id="festivals" className="py-16 md:py-24 bg-gradient-to-b from-muted/30 to-background">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">ઊજવવામાં આવતા ઉત્સવો</h2>
          <p className="text-lg text-muted-foreground font-heading italic">Festivals Celebrated</p>
          <LotusDivider />
        </div>

        <div className="grid sm:grid-cols-2 gap-6 max-w-4xl mx-auto mb-10">
          {festivals.map((f, i) => (
            <div key={i} className="fade-in-section hover-lift rounded-xl bg-gradient-saffron p-6 text-center shadow-md" style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="text-5xl block mb-3">{f.icon}</span>
              <h3 className="font-heading font-bold text-lg text-primary-foreground mb-1">{f.name}</h3>
              <p className="text-sm text-primary-foreground/80">{f.date}</p>
            </div>
          ))}
        </div>

        <div className="fade-in-section max-w-4xl mx-auto mb-10 rounded-xl bg-temple-maroon/10 border border-temple-maroon/20 p-6 text-center">
          <p className="text-foreground font-heading text-base md:text-lg leading-relaxed">
            During major festivals, <strong className="text-temple-saffron">2–3 LAKH devotees</strong> visit. The temple arranges food and accommodation for all.
          </p>
        </div>

        <div className="fade-in-section max-w-2xl mx-auto">
          <h3 className="font-heading font-bold text-xl text-foreground text-center mb-4">📅 Upcoming Events</h3>
          <div className="space-y-3">
            {upcoming.map((u, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border border-temple-gold/20 bg-card px-5 py-3 shadow-sm">
                <span className="text-2xl">{u.icon}</span>
                <div>
                  <p className="font-heading font-semibold text-foreground text-sm">{u.name}</p>
                  <p className="text-xs text-muted-foreground">{u.date}</p>
                </div>
                <span className="ml-auto inline-block rounded-full bg-temple-gold/20 text-temple-saffron text-xs font-semibold px-3 py-1">Upcoming</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Festivals;
