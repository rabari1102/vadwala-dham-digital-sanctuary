import { useFadeInAll } from '@/hooks/useFadeIn';
import { useState, useEffect } from 'react';
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
import da from '@/assets/gallery/diwali-acharya.jpg';
import tn from '@/assets/gallery/temple-night.jpg';
import td from '@/assets/gallery/temple-day.webp';
import g1 from '@/assets/gallery/gaushala-1.jpg';
import g2 from '@/assets/gallery/gaushala-2.jpg';
import g3 from '@/assets/gallery/gaushala-3.jpg';
import gb from '@/assets/gallery/gaushala-banner.jpg';
import eg from '@/assets/gallery/education-girls.jpg';
import es from '@/assets/gallery/education-school.jpg';
import gp from '@/assets/gallery/guru-purnima.jpg';

const photos = [
  { src: j1, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
  { src: td, cat: 'મંદિર — Temple Architecture', tag: 'temple' },
  { src: d2, cat: 'દીપાવલી મહોત્સવ', tag: 'diwali' },
  { src: g1, cat: 'ગૌશાળા — Gaushala', tag: 'gaushala' },
  { src: j6, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
  { src: da, cat: 'દીપાવલી — આચાર્યશ્રી', tag: 'diwali' },
  { src: g2, cat: 'ગૌશાળા — જય ગૌમાતા', tag: 'gaushala' },
  { src: eg, cat: 'શૈક્ષણિક — કન્યા છાત્રાલય', tag: 'education' },
  { src: d1, cat: 'દીપાવલી મહોત્સવ', tag: 'diwali' },
  { src: j5, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
  { src: gp, cat: 'ગુરુ પૂર્ણિમા', tag: 'gurupurnima' },
  { src: es, cat: 'શૈક્ષણિક — વિધાલય', tag: 'education' },
  { src: tn, cat: 'મંદિર — Night View', tag: 'temple' },
  { src: j7, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
  { src: g3, cat: 'ગૌશાળા — Gaushala', tag: 'gaushala' },
  { src: d3, cat: 'દીપાવલી મહોત્સવ', tag: 'diwali' },
  { src: gb, cat: 'શ્રી વટેશ્વર ગૌશાળા', tag: 'gaushala' },
  { src: j4, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
  { src: j3, cat: 'જન્માષ્ટમી મહોત્સવ', tag: 'janmashtami' },
];

const filters = [
  { label: 'બધા', sublabel: 'All', tag: 'all' },
  { label: 'જન્માષ્ટમી', sublabel: 'Janmashtami', tag: 'janmashtami' },
  { label: 'દીપાવલી', sublabel: 'Diwali', tag: 'diwali' },
  { label: 'ગુરુ પૂર્ણિમા', sublabel: 'Guru Purnima', tag: 'gurupurnima' },
  { label: 'ગૌશાળા', sublabel: 'Gaushala', tag: 'gaushala' },
  { label: 'શૈક્ષણિક', sublabel: 'Education', tag: 'education' },
  { label: 'મંદિર', sublabel: 'Temple', tag: 'temple' },
];

const Gallery = () => {
  const containerRef = useFadeInAll();
  const [activeTag, setActiveTag] = useState('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  const filtered = activeTag === 'all' ? photos : photos.filter((p) => p.tag === activeTag);

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowLeft') setLightbox((p) => (p! > 0 ? p! - 1 : filtered.length - 1));
      if (e.key === 'ArrowRight') setLightbox((p) => (p! < filtered.length - 1 ? p! + 1 : 0));
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightbox, filtered.length]);

  return (
    <section id="gallery" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={containerRef}>
        <div className="fade-in-section text-center mb-10">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
            Photo Gallery
          </span>
          <h2 className="section-heading">ફોટો ગેલેરી</h2>
          <p className="section-sub">Religious Functions Organized By the Temple</p>
          <LotusDivider />
        </div>

        {/* Filter pills */}
        <div className="fade-in-section flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.tag}
              onClick={() => setActiveTag(f.tag)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border ${
                activeTag === f.tag
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                  : 'bg-white border-orange-200 text-gray-600 hover:border-orange-400 hover:text-orange-600'
              }`}
            >
              {f.label}
              <span className={`ml-1.5 text-xs ${activeTag === f.tag ? 'text-orange-100' : 'text-gray-400'}`}>
                {f.sublabel !== f.label ? `· ${f.sublabel}` : ''}
              </span>
            </button>
          ))}
        </div>

        {/* Photo grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {filtered.map((photo, i) => (
            <div
              key={`${activeTag}-${i}`}
              onClick={() => setLightbox(i)}
              className="fade-in-section group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-orange-50"
              style={{ transitionDelay: `${i * 50}ms` }}
            >
              <img
                src={photo.src}
                alt={photo.cat}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="font-heading font-semibold text-white text-xs leading-tight">{photo.cat}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="btn-saffron-outline">
            વધુ ફોટોઓ જુઓ — View More Photos →
          </a>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl transition-colors z-10"
          >
            ✕
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((prev) => (prev! > 0 ? prev! - 1 : filtered.length - 1)); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-orange-400 text-4xl transition-colors z-10"
          >
            ‹
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); setLightbox((prev) => (prev! < filtered.length - 1 ? prev! + 1 : 0)); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-orange-400 text-4xl transition-colors z-10"
          >
            ›
          </button>
          <img
            src={filtered[lightbox]?.src}
            alt={filtered[lightbox]?.cat}
            className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="inline-block bg-orange-500/90 text-white font-heading text-sm px-6 py-2 rounded-full">
              {filtered[lightbox]?.cat}
            </span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
