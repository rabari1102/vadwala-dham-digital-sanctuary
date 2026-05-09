import { useEffect, useState } from 'react';
import Navbar from '@/components/temple/Navbar';
import Footer from '@/components/temple/Footer';
import { api, AboutData, AcharyaData } from '@/services/api';

export default function About() {
  const [about, setAbout] = useState<AboutData | null>(null);
  const [acharyas, setAcharyas] = useState<AcharyaData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getAbout(), api.getAcharyas()]).then(([a, ac]) => {
      setAbout(a);
      setAcharyas(ac || []);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-amber-50">
        {/* Page Header */}
        <section className="bg-gradient-to-b from-orange-900 to-orange-700 text-white py-16 text-center">
          <h1 className="text-4xl font-bold mb-2">🛕 શ્રી વડવાળા મંદિર</h1>
          <p className="text-xl opacity-90">દૂધરેજ ધામ — ૫૦૦ વર્ષ જૂની આધ્યાત્મિક વિભૂતિ</p>
        </section>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
          </div>
        ) : !about ? (
          <div className="text-center py-20 text-gray-500">
            <span className="text-5xl block mb-4">📜</span>
            <p className="text-xl">ઇતિહાસ માહિતી ઉપલબ્ધ નથી</p>
            <p className="text-sm mt-2">Admin panel ➜ About માંથી માહિતી ઉમેરો</p>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">

            {/* History */}
            {about?.historyParagraphs && about.historyParagraphs.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-orange-800 mb-6 text-center">📜 ઇતિહાસ</h2>
                <div className="space-y-4">
                  {about.historyParagraphs.map((p, i) => (
                    <p key={i} className="text-gray-700 leading-relaxed text-lg bg-white rounded-xl p-5 shadow-sm border border-orange-100">{p}</p>
                  ))}
                </div>
              </section>
            )}

            {/* Five Deities */}
            {about?.fiveDeitiesGuj && (
              <section className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                <h2 className="text-2xl font-bold text-orange-800 mb-3">🙏 પંચ દેવ</h2>
                <p className="text-gray-700 text-lg leading-relaxed">{about.fiveDeitiesGuj}</p>
              </section>
            )}

            {/* Gates */}
            {about?.gates && about.gates.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-orange-800 mb-4 text-center">🏛️ મંદિરના દ્વાર</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {about.gates.map((g, i) => (
                    <div key={i} className="bg-white rounded-xl p-5 text-center shadow border border-orange-100">
                      <div className="text-4xl mb-2">{g.icon}</div>
                      <div className="font-bold text-orange-900">{g.nameGuj}</div>
                      <div className="text-gray-500 text-sm">{g.name}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Facts */}
            {about?.facts && about.facts.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-orange-800 mb-6 text-center">✨ વિशेष વિભૂતિ</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {about.facts.sort((a,b)=>a.order-b.order).map((f, i) => (
                    <div key={i} className="bg-white rounded-xl p-5 shadow border border-orange-100 flex gap-4">
                      <div className="text-3xl flex-shrink-0">{f.icon}</div>
                      <div>
                        <div className="font-bold text-orange-800 mb-1">{f.titleGuj}</div>
                        <div className="text-gray-600 text-sm leading-relaxed">{f.text}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Acharya Parampara */}
            {acharyas.length > 0 && (
              <section>
                <h2 className="text-3xl font-bold text-orange-800 mb-8 text-center">🪷 આચાર્ય પરંપરા</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {acharyas.sort((a,b)=>a.order-b.order).map((a, i) => (
                    <div key={i} className={`rounded-xl p-4 text-center border ${
                      a.current
                        ? 'bg-orange-600 text-white border-orange-700 shadow-lg'
                        : 'bg-white text-gray-700 border-orange-100'
                    }`}>
                      <div className="font-semibold text-sm">{a.nameGuj}</div>
                      <div className="text-xs opacity-70">{a.name}</div>
                      {a.current && a.since && <div className="text-xs mt-1 font-bold">સં. {a.since} થી</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
