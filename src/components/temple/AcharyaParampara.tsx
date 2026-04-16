import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const acharyas = [
  { nameGuj: 'નીલકંઠ સ્વામી', name: 'Nilkanth Swami' },
  { nameGuj: 'રઘુનાથ સ્વામી', name: 'Raghunath Swami' },
  { nameGuj: 'યાદવ સ્વામી', name: 'Yadav Swami' },
  { nameGuj: 'ષટપ્રજ્ઞદાસજી', name: 'Shatpragnya Dasji' },
  { nameGuj: 'લબ્ધરામજી', name: 'Labdhramji' },
  { nameGuj: 'રત્નદાસજી', name: 'Ratnadasji' },
  { nameGuj: 'માનદાસજી', name: 'Manadasji' },
  { nameGuj: 'કૃષ્ણદાસજી', name: 'Krishnadasji' },
  { nameGuj: 'ઓધવદાસજી', name: 'Odhavdasji' },
  { nameGuj: 'ગોકુલદાસજી', name: 'Gokuldasji' },
  { nameGuj: 'ભાવદાસજી', name: 'Bhavdasji' },
  { nameGuj: 'ગુલાબદાસજી', name: 'Gulabdasji' },
  { nameGuj: 'કેવળદાસજી', name: 'Kevaldasji' },
  { nameGuj: 'મેઘદાસજી', name: 'Meghadasji' },
  { nameGuj: 'યમુનાદાસજી', name: 'Yamunadasji' },
  { nameGuj: 'ગંગારામજી', name: 'Gangaramji' },
  { nameGuj: 'ગોવિંદરામજી', name: 'Govindramji' },
  { nameGuj: 'રઘુવરદાસજી', name: 'Raghuvardasji' },
  { nameGuj: 'જીવરામદાસજી', name: 'Jivramdasji' },
  { nameGuj: 'ગોમતીદાસજી', name: 'Gomatidasji' },
  { nameGuj: 'કલ્યાણદાસજી', name: 'Kalyandasji' },
  { nameGuj: 'કનીરામદાસજી', name: 'Kaniramdas ji', current: true, since: '૧૯૯૪' },
  { nameGuj: 'વટપતિ મહિમા', name: 'Vatpati Mahima' },
];

const AcharyaParampara = () => {
  const containerRef = useFadeInAll();

  return (
    <section id="parampara" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            આચાર્યશ્રી પરંપરા
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-heading italic">
            ૨૩ ગુરુઓની ૫૦૦ વર્ષ જૂની ગૌરવ ગાથા — A 500-Year Lineage of 23 Gurus
          </p>
          <LotusDivider />
        </div>

        <div className="max-w-3xl mx-auto relative">
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-temple-gold/30 -translate-x-1/2" />

          {acharyas.map((a, i) => {
            const isLeft = i % 2 === 0;
            const isCurrent = 'current' in a && a.current;
            return (
              <div
                key={i}
                className={`fade-in-section relative flex items-center mb-6 md:mb-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold shadow-md border-2 ${
                  isCurrent
                    ? 'bg-temple-gold text-temple-dark border-temple-gold animate-pulse'
                    : 'bg-gradient-saffron text-white border-temple-gold'
                }`}>
                  {i + 1}
                </div>
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8 md:text-left'}`}>
                  <div className={`hover-lift rounded-lg border bg-card px-5 py-3 shadow-sm ${
                    isCurrent ? 'border-temple-gold/60 ring-2 ring-temple-gold/20' : 'border-temple-gold/20'
                  }`}>
                    <p className="font-heading font-semibold text-foreground text-sm md:text-base">{a.nameGuj}</p>
                    <p className="text-xs text-muted-foreground italic">{a.name}</p>
                    {isCurrent && (
                      <span className="inline-block mt-1 text-xs bg-temple-gold/20 text-temple-saffron px-2 py-0.5 rounded-full font-medium">
                        વિદ્યમાન — {a.since} થી
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcharyaParampara;
