import { useFadeInAll } from '@/hooks/useFadeIn';
import { useState } from 'react';
import LotusDivider from './LotusDivider';

import j1 from '@/assets/gallery/janmashtami-1.jpg';
import j3 from '@/assets/gallery/janmashtami-3.jpg';
import j4 from '@/assets/gallery/janmashtami-4.jpg';
import j5 from '@/assets/gallery/janmashtami-5.jpg';
import j6 from '@/assets/gallery/janmashtami-6.jpg';
import j7 from '@/assets/gallery/janmashtami-7.jpg';
import d1 from '@/assets/gallery/diwali-1.jpg';
import d2 from '@/assets/gallery/diwali-2.jpg';
import d3 from '@/assets/gallery/diwali-3.jpg';
import tn from '@/assets/gallery/temple-night.jpg';

const photos = [
  { src: j1, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
  { src: tn, cat: 'મંદિર — Temple', tag: 'temple' },
  { src: d2, cat: 'દીપાવલી મહોત્સવ', tag: 'diwali' },
  { src: j6, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
  { src: d1, cat: 'દીપાવલી મહોત્સવ', tag: 'diwali' },
  { src: j5, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
  { src: j7, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
  { src: d3, cat: 'દીપાવલી મહોત્સવ', tag: 'diwali' },
  { src: j4, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
  { src: j3, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
];

const filters = [
  { label: 'All', tag: 'all' },
  { label: 'જન્માષ્ટમી', tag: 'janmashtami' },
  { label: 'દીપાવલી', tag: 'diwali' },
  { label: 'મંદિર', tag: 'temple' },
];

const Gallery = () => {
  const containerRef = useFadeInAll();
  const [activeTag, setActiveTag] = useState('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeTag === 'all' ? photos : photos.filter((p) => p.tag === activeTag);

  return (
    <section id="gallery" className="py-16 md:py-24 mandala-bg">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">ફોટો ગેલેરી</h2>
          <p className="text-lg text-muted-foreground font-heading italic">Religious Functions Organized By the Temple</p>
          <LotusDivider />
        </div>

        {/* Filters */}
        <div className="fade-in-section flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.tag}
              onClick={() => setActiveTag(f.tag)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 border ${
                activeTag === f.tag
                  ? 'bg-temple-saffron text-white border-temple-saffron shadow-md'
                  : 'bg-card border-temple-gold/20 text-foreground hover:border-temple-gold/50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {filtered.map((photo, i) => (
            <div
              key={i}
              onClick={() => setLightbox(i)}
              className="fade-in-section group relative aspect-square rounded-xl overflow-hidden cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.cat}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-temple-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <span className="font-heading font-bold text-temple-cream text-sm p-4">{photo.cat}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="inline-flex items-center gap-2 rounded-full border-2 border-temple-gold bg-temple-gold/10 px-8 py-3 text-base font-semibold text-temple-saffron hover:bg-temple-gold hover:text-temple-dark transition-colors">
            વધુ ફોટોઓ જુઓ — View More Photos →
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white text-3xl hover:text-temple-gold transition-colors z-10"
          >
            ✕
          </button>
          <img
            src={filtered[lightbox]?.src}
            alt={filtered[lightbox]?.cat}
            className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <p className="absolute bottom-6 text-temple-gold font-heading text-lg">
            {filtered[lightbox]?.cat}
          </p>
        </div>
      )}
    </section>
  );
};

export default Gallery;
