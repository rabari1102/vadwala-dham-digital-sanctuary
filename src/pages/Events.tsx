import { useEffect, useState } from 'react';
import Navbar from '@/components/temple/Navbar';
import Footer from '@/components/temple/Footer';
import { api, FestivalData } from '@/services/api';

export default function Events() {
  const [festivals, setFestivals] = useState<FestivalData[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'upcoming' | 'all'>('upcoming');

  useEffect(() => {
    api.getFestivals().then((data) => {
      setFestivals(data || []);
      setLoading(false);
    });
  }, []);

  const displayed = tab === 'upcoming'
    ? festivals.filter(f => f.isUpcoming)
    : festivals;

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-amber-50">
        <section className="bg-gradient-to-b from-orange-900 to-orange-700 text-white py-16 text-center">
          <h1 className="text-4xl font-bold mb-2">🎉 ઉત્સવ — પર્વ ઉજવણી</h1>
          <p className="text-xl opacity-90">દૂધરેજ ધામ — ધાર્મિક ઉત્સવો</p>
        </section>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto px-4 py-12">
            {/* Tabs */}
            <div className="flex gap-3 mb-8 justify-center">
              <button
                onClick={() => setTab('upcoming')}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  tab === 'upcoming' ? 'bg-orange-600 text-white shadow' : 'bg-white text-orange-700 border border-orange-300'
                }`}>
                આગામી ઉત્સવ
              </button>
              <button
                onClick={() => setTab('all')}
                className={`px-6 py-2 rounded-full font-semibold transition ${
                  tab === 'all' ? 'bg-orange-600 text-white shadow' : 'bg-white text-orange-700 border border-orange-300'
                }`}>
                બધા ઉત્સવ
              </button>
            </div>

            {displayed.length === 0 ? (
              <div className="text-center py-16 text-gray-500">
                <div className="text-5xl mb-4">🙏</div>
                <p className="text-xl">કોઈ ઉત્સવ ઉપલબ્ધ નથી</p>
                <p className="text-sm mt-2">Admin panel માંથી ઉત્સવ ઉમેરો</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {displayed.sort((a,b)=>a.order-b.order).map((f) => (
                  <div key={f._id} className="bg-white rounded-2xl shadow border border-orange-100 overflow-hidden">
                    <div className="bg-orange-50 p-5 flex items-center gap-4">
                      <span className="text-4xl">{f.icon || '🎊'}</span>
                      <div>
                        <h3 className="font-bold text-orange-900 text-lg">{f.nameGuj}</h3>
                        <p className="text-gray-500 text-sm">{f.name}</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center gap-2 text-orange-700">
                        <span>📅</span>
                        <span className="font-semibold">{f.date}</span>
                      </div>
                      {f.dateEn && <p className="text-gray-400 text-sm mt-1">{f.dateEn}</p>}
                      {f.isUpcoming && (
                        <span className="mt-3 inline-block bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full">✅ આગામી</span>
                      )}
                    </div>
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
