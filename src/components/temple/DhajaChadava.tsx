import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';
import { useEffect, useState } from 'react';
import { api, type DhajaEntry } from '@/services/api';

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('gu-IN', { day: 'numeric', month: 'long', year: 'numeric' });
}

const DhajaChadava = () => {
  const containerRef = useFadeInAll();
  const [entries, setEntries] = useState<DhajaEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDhajaChadava('today')
      .then((data) => { if (data?.length) setEntries(data); })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="dhaja" className="py-16 md:py-24 bg-section-alt">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={containerRef}>
        {/* Header */}
        <div className="fade-in-section text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">આજ ની ધજા</span>
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="text-4xl md:text-5xl">🚩</span>
            <h2 className="section-heading !mb-0">ધજા ચઢાવવા</h2>
          </div>
          <p className="section-sub">Dhaja Chadavva — Today's Flag Offerings</p>
          <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2 leading-relaxed">જે ભક્તો આજે શ્રી વડવાળા મંદિરમાં ધજા ચઢાવી છે, તેઓના નામ નીચે દર્શાવ્યા છે.</p>
          <LotusDivider />
        </div>

        <div className="fade-in-section max-w-4xl mx-auto mb-8">
          <div className="rounded-2xl bg-gradient-saffron p-4 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-md">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📅</span>
              <div>
                <p className="text-white font-heading font-bold text-lg">{new Date().toLocaleDateString('gu-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="text-orange-100 text-sm">Today's Dhaja Offerings</p>
              </div>
            </div>
            <div className="bg-white/25 rounded-xl px-5 py-2 text-center">
              <p className="text-white font-bold text-2xl">{loading ? '...' : entries.length}</p>
              <p className="text-orange-100 text-xs">ધજા ચઢાવી</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="max-w-4xl mx-auto text-center py-12">
            <div className="animate-pulse space-y-3">
              {[...Array(3)].map((_, i) => <div key={i} className="h-24 bg-white rounded-2xl" />)}
            </div>
          </div>
        ) : entries.length > 0 ? (
          <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
            {entries.map((entry, i) => (
              <div key={entry._id || i} className="fade-in-section hover-lift rounded-2xl bg-white border border-orange-100 p-5 shadow-sm" style={{ transitionDelay: `${i * 70}ms` }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-xl flex-shrink-0">🚩</div>
                  <div className="min-w-0">
                    <p className="font-heading font-bold text-gray-800 text-sm truncate">{entry.nameGuj || entry.name}</p>
                    {entry.nameGuj && <p className="text-xs text-gray-400 truncate">{entry.name}</p>}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 mb-2">
                  <span className="text-xs">📍</span>
                  <span className="text-xs text-orange-600 font-semibold">{entry.village}</span>
                </div>
                {entry.samvat && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-xs">🗓️</span>
                    <span className="text-xs text-gray-500">{entry.samvat}</span>
                  </div>
                )}
                {entry.dedication && (
                  <div className="mt-3 pt-3 border-t border-orange-50">
                    <p className="text-xs text-gray-600 italic leading-relaxed">"{entry.dedication}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto text-center py-12">
            <span className="text-5xl block mb-4">🙏</span>
            <p className="text-gray-500 font-heading">આજ ની ધજા ચઢાવવા ની નોંધ ઉપલબ્ધ નથી.</p>
            <p className="text-sm text-gray-400 italic">No flag offerings recorded for today.</p>
          </div>
        )}

        <div className="fade-in-section max-w-2xl mx-auto text-center">
          <div className="rounded-3xl border-2 border-orange-300 bg-white p-7 shadow-md">
            <div className="text-4xl mb-3">🚩</div>
            <h3 className="font-heading font-bold text-xl text-gray-800 mb-2">ધજા ચઢાવો</h3>
            <p className="text-sm text-gray-500 mb-5 leading-relaxed">
              શ્રી વડવાળા મંદિરમાં ધજા ચઢાવવા માટે, કૃપા કરીને અમારો સંપર્ક કરો.<br />
              <span className="text-xs italic">To register your Dhaja Chadavva at the temple, please contact us.</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="https://wa.me/919687921008" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 rounded-full bg-green-500 px-6 py-3 text-sm font-semibold text-white hover:bg-green-600 transition-colors shadow-md">💬 WhatsApp પર નોંધ કરો</a>
              <a href="tel:9687921008" className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-orange-500 px-6 py-3 text-sm font-semibold text-orange-600 hover:bg-orange-500 hover:text-white transition-colors">📞 96879 21008</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DhajaChadava;
