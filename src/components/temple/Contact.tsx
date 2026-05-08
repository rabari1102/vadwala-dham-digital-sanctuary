import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const Contact = () => {
  const containerRef = useFadeInAll();

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
            Get In Touch
          </span>
          <h2 className="section-heading">સંપર્ક કરો</h2>
          <p className="section-sub">Contact Us</p>
          <LotusDivider />
        </div>

        <div className="fade-in-section grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Contact info card */}
          <div className="rounded-3xl border border-orange-100 bg-white p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6 pb-5 border-b border-orange-100">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-2xl text-white shadow">
                🕉️
              </div>
              <div>
                <h3 className="font-heading font-bold text-lg text-gray-800">
                  શ્રી વડવાળા મંદિર
                </h3>
                <p className="text-sm text-orange-500 font-medium">દુધરેજધામ</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg">📍</div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Address</p>
                  <p className="text-sm text-gray-700">શ્રી વડવાળા મંદિર દુધરેજધામ</p>
                  <p className="text-sm text-gray-700">દુધરેજ, સુરેન્દ્રનગર (ગુજરાત) — 363040</p>
                  <p className="text-xs text-gray-400 mt-1 italic">5 km north of Surendranagar on Dhrangadhra Road</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg">📞</div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Phone</p>
                  <a href="tel:9687921008" className="block text-sm text-orange-600 font-semibold hover:underline">96879 21008</a>
                  <a href="tel:9825568108" className="block text-sm text-orange-600 font-semibold hover:underline">98255 68108</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg">📧</div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Email</p>
                  <a href="mailto:dudhrejvadwala@gmail.com" className="text-sm text-orange-600 font-semibold hover:underline">dudhrejvadwala@gmail.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg">🌐</div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Website</p>
                  <a href="https://dudhrejvadwala.com" target="_blank" rel="noopener noreferrer" className="text-sm text-orange-600 font-semibold hover:underline">dudhrejvadwala.com</a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-orange-50 text-lg">🕐</div>
                <div>
                  <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-1">Darshan Timings</p>
                  <p className="text-sm text-gray-700">Morning: <strong>6:00 AM – 12:00 PM</strong></p>
                  <p className="text-sm text-gray-700">Evening: <strong>4:00 PM – 9:00 PM</strong></p>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-7 pt-5 border-t border-orange-100">
              <p className="text-xs text-gray-400 font-semibold uppercase tracking-wider mb-3">Follow Us</p>
              <div className="flex gap-2">
                {[
                  { icon: '▶️', label: 'YouTube', href: '#' },
                  { icon: '📷', label: 'Instagram', href: '#' },
                  { icon: '👤', label: 'Facebook', href: '#' },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    className="flex items-center gap-2 rounded-xl border border-orange-100 bg-orange-50 px-3 py-2 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-700 transition-colors"
                  >
                    <span>{s.icon}</span>
                    <span className="hidden sm:inline text-xs font-medium">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Google map */}
          <div className="rounded-3xl border border-orange-100 bg-white overflow-hidden shadow-sm" style={{ minHeight: '350px' }}>
            <iframe
              title="Shri Vadwala Mandir Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680!2d71.71667!3d22.71667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzAwLjAiTiA3McKwNDMnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '350px', display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
