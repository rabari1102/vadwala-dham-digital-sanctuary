import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const categories = [
  'Janmashtami', 'Holi Mahotsav', 'Guru Purnima', 'Diwali',
  'Gaushala', 'Annakshetra', 'Temple Architecture', 'Devotees',
  'Acharya Parampara', 'Festivals', 'Yatri Nivas', 'Mahakumbh',
];

const Gallery = () => {
  const containerRef = useFadeInAll();

  return (
    <section id="gallery" className="py-16 md:py-24 mandala-bg">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">ફોટો ગેલેરી</h2>
          <p className="text-lg text-muted-foreground font-heading italic">Religious Functions Organized By the Temple</p>
          <LotusDivider />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {categories.map((cat, i) => (
            <div key={i} className="fade-in-section group relative aspect-square rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br from-temple-saffron/30 to-temple-gold/20 border border-temple-gold/20" style={{ transitionDelay: `${i * 60}ms` }}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-5xl opacity-30">🕉️</span>
              </div>
              <div className="absolute inset-0 bg-temple-gold/0 group-hover:bg-temple-gold/60 transition-all duration-300 flex items-center justify-center">
                <span className="font-heading font-bold text-temple-dark opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm md:text-base text-center px-2">{cat}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 rounded-full border-2 border-temple-gold bg-temple-gold/10 px-8 py-3 text-base font-semibold text-temple-saffron hover:bg-temple-gold hover:text-temple-dark transition-colors">
            View More Photos →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
