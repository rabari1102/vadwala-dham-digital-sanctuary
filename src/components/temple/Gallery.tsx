import { useFadeInAll } from '@/hooks/useFadeIn';
import { useState, useEffect, useMemo } from 'react';
import LotusDivider from './LotusDivider';
import { api, type GalleryItem } from '@/services/api';

const Gallery = () => {
  const containerRef = useFadeInAll();
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [activeTag, setActiveTag] = useState('all');
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    api.getGallery().then((d) => { if (d?.length) setPhotos(d); });
  }, []);

  const filters = useMemo(() => {
    const tagMap: Record<string, { label: string; sublabel: string }> = {
      janmashtami: { label: 'જન્માષ્ટમી', sublabel: 'Janmashtami' },
      diwali: { label: 'દીપાવલી', sublabel: 'Diwali' },
      gurupurnima: { label: 'ગુરુ પૂર્ણિમા', sublabel: 'Guru Purnima' },
      gaushala: { label: 'ગૌશાળા', sublabel: 'Gaushala' },
      education: { label: 'શૈક્ષણિક', sublabel: 'Education' },
      temple: { label: 'મંદિર', sublabel: 'Temple' },
    };
    const tags = [...new Set(photos.map((p) => p.tag))];
    return [
      { label: 'બધા', sublabel: 'All', tag: 'all' },
      ...tags.map((t) => ({ label: tagMap[t]?.label || t, sublabel: tagMap[t]?.sublabel || t, tag: t })),
    ];
  }, [photos]);

  const filtered = activeTag === 'all' ? photos : photos.filter((p) => p.tag === activeTag);

  if (!photos.length) {
    return (
      <section id="gallery" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 bg-orange-100 rounded mx-auto" />
            <div className="h-8 w-64 bg-orange-50 rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

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
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">Photo Gallery</span>
          <h2 className="section-heading">ફોટો ગેલેરી</h2>
          <p className="section-sub">Religious Functions Organized By the Temple</p>
          <LotusDivider />
        </div>

        <div className="fade-in-section flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button key={f.tag} onClick={() => setActiveTag(f.tag)} className={`rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 border ${activeTag === f.tag ? 'bg-orange-500 text-white border-orange-500 shadow-md' : 'bg-white border-orange-200 text-gray-600 hover:border-orange-400 hover:text-orange-600'}`}>
              {f.label}
              <span className={`ml-1.5 text-xs ${activeTag === f.tag ? 'text-orange-100' : 'text-gray-400'}`}>
                {f.sublabel !== f.label ? `· ${f.sublabel}` : ''}
              </span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 max-w-6xl mx-auto">
          {filtered.map((photo, i) => (
            <div key={`${activeTag}-${photo._id || i}`} onClick={() => setLightbox(i)} className="fade-in-section group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 border border-orange-50" style={{ transitionDelay: `${i * 50}ms` }}>
              <img src={photo.imageUrl} alt={photo.cat} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <span className="font-heading font-semibold text-white text-xs leading-tight">{photo.cat}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#" className="btn-saffron-outline">વધુ ફોટોઓ જુઓ — View More Photos →</a>
        </div>
      </div>

      {lightbox !== null && (
        <div className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button onClick={() => setLightbox(null)} className="absolute top-4 right-4 text-white/70 hover:text-white text-3xl transition-colors z-10">✕</button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((prev) => (prev! > 0 ? prev! - 1 : filtered.length - 1)); }} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-orange-400 text-4xl transition-colors z-10">‹</button>
          <button onClick={(e) => { e.stopPropagation(); setLightbox((prev) => (prev! < filtered.length - 1 ? prev! + 1 : 0)); }} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-orange-400 text-4xl transition-colors z-10">›</button>
          <img src={filtered[lightbox]?.imageUrl} alt={filtered[lightbox]?.cat} className="max-w-full max-h-[85vh] rounded-xl shadow-2xl object-contain" onClick={(e) => e.stopPropagation()} />
          <div className="absolute bottom-6 left-0 right-0 text-center">
            <span className="inline-block bg-orange-500/90 text-white font-heading text-sm px-6 py-2 rounded-full">{filtered[lightbox]?.cat}</span>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
