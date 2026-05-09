import { useEffect, useState } from 'react';
import Navbar from '@/components/temple/Navbar';
import Footer from '@/components/temple/Footer';
import { api, GalleryItem } from '@/services/api';

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTag, setActiveTag] = useState('all');
  const [lightbox, setLightbox] = useState<string | null>(null);
  const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  useEffect(() => {
    api.getGallery().then((data) => {
      setItems(data || []);
      setLoading(false);
    });
  }, []);

  const tags = ['all', ...Array.from(new Set(items.map(i => i.tag).filter(Boolean)))];
  const filtered = activeTag === 'all' ? items : items.filter(i => i.tag === activeTag);

  const imgSrc = (url: string) =>
    url.startsWith('http') ? url : `${BASE_URL}${url}`;

  return (
    <>
      <Navbar />
      {lightbox && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <img src={imgSrc(lightbox)} alt="gallery" className="max-h-screen max-w-full object-contain rounded-lg" />
          <button className="absolute top-4 right-4 text-white text-3xl" onClick={() => setLightbox(null)}>✕</button>
        </div>
      )}
      <main className="pt-20 min-h-screen bg-amber-50">
        <section className="bg-gradient-to-b from-orange-900 to-orange-700 text-white py-16 text-center">
          <h1 className="text-4xl font-bold mb-2">📸 ફોટો ગેલેરી</h1>
          <p className="text-xl opacity-90">દૂધરેજ ધામ — ભક્તિ ક્ષણો</p>
        </section>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto px-4 py-12">
            {/* Tag Filter */}
            {tags.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-8 justify-center">
                {tags.map(tag => (
                  <button
                    key={tag}
                    onClick={() => setActiveTag(tag)}
                    className={`px-4 py-2 rounded-full text-sm font-semibold transition ${
                      activeTag === tag ? 'bg-orange-600 text-white shadow' : 'bg-white text-orange-700 border border-orange-300'
                    }`}>
                    {tag === 'all' ? 'બધા' : tag}
                  </button>
                ))}
              </div>
            )}

            {filtered.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-5xl mb-4">🖼️</div>
                <p className="text-xl">કોઈ ફોટો ઉપલબ્ધ નથી</p>
                <p className="text-sm mt-2">Admin panel ➜ Gallery માંથી ફોટો ઉમેરો</p>
              </div>
            ) : (
              <div className="columns-2 sm:columns-3 md:columns-4 gap-3">
                {filtered.sort((a,b)=>a.order-b.order).map((item) => (
                  <div
                    key={item._id}
                    className="break-inside-avoid mb-3 overflow-hidden rounded-xl cursor-pointer group"
                    onClick={() => setLightbox(item.imageUrl)}
                  >
                    <img
                      src={imgSrc(item.imageUrl)}
                      alt={item.catEn || item.cat}
                      loading="lazy"
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
