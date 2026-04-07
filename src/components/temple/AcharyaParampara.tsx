import { useFadeIn } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const acharyas = [
  'Nilkanth Swami', 'Raghunath Swami', 'Yadav Swami', 'Shatpragnya Dasji',
  'Labdhramji', 'Ratnadasji', 'Manadasji', 'Krishnadasji', 'Odhavdasji',
  'Gokuldasji', 'Bhavdasji', 'Gulabdasji', 'Kevaldasji', 'Meghadasji',
  'Yamunadasji', 'Gangaramji', 'Govindramji', 'Raghuvardasji', 'Jivramdasji',
  'Gomatidasji', 'Kalyandasji', 'Kaniramdas ji (Vidyaman since 1994)', 'Vatpati Mahima',
];

const AcharyaParampara = () => {
  const ref = useFadeIn();

  return (
    <section id="parampara" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/50">
      <div className="container mx-auto px-4">
        <div ref={ref} className="fade-in-section text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            આચાર્યશ્રી પરંપરા
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-heading italic">
            ૨૩ ગુરુઓની ૫૦૦ વર્ષ જૂની ગૌરવ ગાથા — A 500-Year Lineage of 23 Gurus
          </p>
          <LotusDivider />
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Vertical line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-temple-gold/30 -translate-x-1/2" />

          {acharyas.map((name, i) => {
            const cardRef = useFadeIn();
            const isLeft = i % 2 === 0;
            return (
              <div
                key={i}
                ref={cardRef}
                className={`fade-in-section relative flex items-center mb-6 md:mb-4 ${
                  isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {/* Number circle */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-gradient-saffron text-primary-foreground text-sm font-bold shadow-md border-2 border-temple-gold">
                  {i + 1}
                </div>

                {/* Card */}
                <div
                  className={`ml-16 md:ml-0 md:w-[calc(50%-2rem)] ${
                    isLeft ? 'md:mr-auto md:pr-8 md:text-right' : 'md:ml-auto md:pl-8 md:text-left'
                  }`}
                >
                  <div className="hover-lift rounded-lg border border-temple-gold/20 bg-card px-5 py-3 shadow-sm">
                    <p className="font-heading font-semibold text-foreground text-sm md:text-base">
                      {name}
                    </p>
                    {i === 21 && (
                      <span className="inline-block mt-1 text-xs bg-temple-gold/20 text-temple-saffron px-2 py-0.5 rounded-full font-medium">
                        Current Acharya
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
