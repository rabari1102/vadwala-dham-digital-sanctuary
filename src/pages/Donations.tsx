import { useEffect, useState } from 'react';
import Navbar from '@/components/temple/Navbar';
import Footer from '@/components/temple/Footer';
import { api, DonationData } from '@/services/api';

export default function Donations() {
  const [donation, setDonation] = useState<DonationData | null>(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000';

  useEffect(() => {
    api.getDonation().then((data) => {
      setDonation(data);
      setLoading(false);
    });
  }, []);

  const qrSrc = donation?.qrImageUrl
    ? donation.qrImageUrl.startsWith('http') ? donation.qrImageUrl : `${BASE_URL}${donation.qrImageUrl}`
    : null;

  return (
    <>
      <Navbar />
      <main className="pt-20 min-h-screen bg-amber-50">
        <section className="bg-gradient-to-b from-orange-900 to-orange-700 text-white py-16 text-center">
          <h1 className="text-4xl font-bold mb-2">🙏 દાન — સેવા</h1>
          <p className="text-xl opacity-90">શ્રી વડવાળા મંદિર, દૂધરેજ ધામ</p>
        </section>

        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-600"></div>
          </div>
        ) : donation ? (
          <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">

            {/* QR Code */}
            {qrSrc && (
              <section className="text-center">
                <h2 className="text-2xl font-bold text-orange-800 mb-6">📱 UPI / QR Code થી દાન</h2>
                <img src={qrSrc} alt="Donation QR Code" className="mx-auto max-w-xs rounded-2xl shadow-lg border-4 border-orange-200" />
              </section>
            )}

            {/* Donation Purposes */}
            {donation.purposes && donation.purposes.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold text-orange-800 mb-6 text-center">💛 દાનના હેતુઓ</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {donation.purposes.map((p, i) => (
                    <div key={i} className="bg-white rounded-xl p-5 text-center shadow border border-orange-100">
                      <div className="text-3xl mb-2">{p.icon}</div>
                      <div className="font-semibold text-orange-900 text-sm">{p.label}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Phone numbers */}
            {donation.phones && donation.phones.length > 0 && (
              <section className="bg-orange-50 rounded-2xl p-6 border border-orange-200">
                <h2 className="text-xl font-bold text-orange-800 mb-4">📞 સંપર્ક</h2>
                <div className="flex flex-wrap gap-3">
                  {donation.phones.map((ph, i) => (
                    <a key={i} href={`tel:${ph}`} className="bg-white border border-orange-200 rounded-lg px-4 py-2 text-orange-800 font-semibold hover:bg-orange-100 transition">
                      📱 {ph}
                    </a>
                  ))}
                </div>
              </section>
            )}

            {/* FCRA */}
            {donation.fcraEligible && (
              <section className="bg-green-50 border border-green-200 rounded-2xl p-5 text-center">
                <div className="text-2xl mb-2">🌐</div>
                <h3 className="font-bold text-green-800 mb-1">FCRA Eligible</h3>
                <p className="text-green-700 text-sm">Foreign donations are accepted under FCRA.</p>
              </section>
            )}

          </div>
        ) : (
          <div className="text-center py-16 text-gray-500">
            <div className="text-5xl mb-4">🙏</div>
            <p className="text-xl">Donation info ઉપલબ્ધ નથી</p>
            <p className="text-sm mt-2">Admin panel ➜ Donations માંથી ઉમેરો</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
