import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';
import { useEffect, useState } from 'react';
import { api, type DonationData } from '@/services/api';

const Donate = () => {
  const containerRef = useFadeInAll();
  const [data, setData] = useState<DonationData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getDonation()
      .then((d) => { if (d) setData(d); })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section id="donate" className="py-16 md:py-24 bg-gradient-to-b from-orange-600 to-orange-700 relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 bg-white/20 rounded mx-auto" />
            <div className="h-8 w-64 bg-white/10 rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="donate" className="py-16 md:py-24 bg-gradient-to-b from-orange-600 to-orange-700 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-72 h-72 rounded-full bg-white/5 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-white/5 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <span className="inline-block bg-white/20 text-white text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">Daan & Seva</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-2">ડોનેશન</h2>
          <p className="text-base md:text-lg text-orange-100 font-heading italic max-w-xl mx-auto">આપનો સહયોગ આ સેવા ને ટકાવી રાખે છે — Your support sustains these divine services</p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px flex-1 max-w-24 bg-white/30" />
            <span className="text-white text-lg">🙏</span>
            <div className="h-px flex-1 max-w-24 bg-white/30" />
          </div>
        </div>

        {data ? (
          <div className="fade-in-section max-w-4xl mx-auto">
            <div className="rounded-3xl bg-white p-6 md:p-10 shadow-2xl">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-shrink-0 text-center">
                  <div className="w-52 h-52 rounded-2xl border-4 border-orange-100 overflow-hidden shadow-md mx-auto">
                    <img src={data.qrImageUrl || 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + ((data as any).upiId || 'upi')} alt="Donate via UPI QR Code" className="w-full h-full object-contain" loading="lazy" />
                  </div>
                  <p className="text-xs text-gray-400 mt-2 font-medium">Scan to Donate via UPI</p>
                  {data.fcraEligible && (
                    <div className="mt-2 inline-block bg-green-50 text-green-700 text-xs px-3 py-1 rounded-full font-semibold border border-green-200">✓ FCRA &amp; 80G Eligible</div>
                  )}
                </div>

                <div className="flex-1 text-center md:text-left">
                  <h3 className="font-heading font-bold text-xl text-gray-800 mb-1">શ્રી વડવાળા મંદિર દુધરેજધામ</h3>
                  <p className="text-sm text-orange-500 font-semibold mb-5">Shri Vadwala Mandir Dudhrejdham</p>

                  <p className="text-xs text-gray-500 font-semibold uppercase tracking-widest mb-3">ડોનેશન હેતુ</p>
                  <div className="flex flex-wrap gap-2 mb-7 justify-center md:justify-start">
                    {((data as any).schemes || data.purposes || []).map((p: any, i: number) => (
                      <span key={p.name || p.label || i} className="inline-flex items-center gap-1.5 rounded-full border border-orange-200 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700">
                        <span>{p.icon || '🙏'}</span>{p.name || p.label}
                      </span>
                    ))}
                  </div>

                  <a href="#" className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-8 py-3.5 text-base font-bold text-white hover:bg-orange-600 shadow-lg hover:shadow-xl transition-all hover:scale-105">🙏 Donate Now</a>

                  <div className="mt-5 pt-5 border-t border-gray-100">
                    <p className="text-xs text-gray-400">For bank transfer details, please contact:</p>
                    <div className="flex flex-wrap gap-3 mt-1.5 justify-center md:justify-start">
                      {(data.phones || []).map((p, i) => (
                        <a key={i} href={`tel:${p}`} className="text-sm font-semibold text-orange-600 hover:underline">📞 {p.replace(/(\d{5})(\d{5})/, '$1 $2')}</a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12 fade-in-section">
            <span className="text-5xl block mb-4">🙏</span>
            <p className="text-white font-heading text-lg">ડોનેશન માહિતી ઉપલબ્ધ નથી.</p>
            <p className="text-sm text-orange-200 italic mt-1">Donation information is not available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Donate;
