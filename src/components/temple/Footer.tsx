const links = [
  { label: 'Home', labelGuj: 'હોમ', href: '#home' },
  { label: 'History', labelGuj: 'ઇતિહાસ', href: '#history' },
  { label: 'Parampara', labelGuj: 'પરંપરા', href: '#parampara' },
  { label: 'Services', labelGuj: 'સેવાઓ', href: '#services' },
  { label: 'Festivals', labelGuj: 'ઉત્સવ', href: '#festivals' },
  { label: 'Dhaja', labelGuj: 'ધજા', href: '#dhaja' },
  { label: 'Gallery', labelGuj: 'ગેલેરી', href: '#gallery' },
  { label: 'Donate', labelGuj: 'દાન', href: '#donate' },
  { label: 'Contact', labelGuj: 'સંપર્ક', href: '#contact' },
];

const Footer = () => (
  <footer className="bg-gradient-to-b from-orange-600 to-orange-800 text-white">
    {/* Top wave */}
    <div className="w-full overflow-hidden leading-none">
      <svg viewBox="0 0 1440 40" className="w-full fill-white" preserveAspectRatio="none">
        <path d="M0,40 C360,0 1080,0 1440,40 L1440,0 L0,0 Z" />
      </svg>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="grid md:grid-cols-3 gap-8 mb-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-2xl shadow">
              🕉️
            </div>
            <div>
              <p className="font-heading font-bold text-lg text-white">શ્રી વડવાળા મંદિર</p>
              <p className="text-sm text-orange-100">દુધરેજધામ, સુરેન્દ્રનગર</p>
            </div>
          </div>
          <p className="text-xs text-orange-200 leading-relaxed">
            Dudhrej Dham, Surendranagar, Gujarat — 363040
          </p>
          <p className="text-xs text-orange-200 mt-1">
            અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-heading font-bold text-white mb-4 text-base">Quick Links</h4>
          <div className="grid grid-cols-3 gap-1">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-xs text-orange-100 hover:text-white hover:underline transition-colors py-1"
              >
                {l.labelGuj}
              </a>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-heading font-bold text-white mb-4 text-base">સંપર્ક</h4>
          <div className="space-y-2">
            <a href="tel:9687921008" className="flex items-center gap-2 text-sm text-orange-100 hover:text-white transition-colors">
              <span>📞</span> 96879 21008
            </a>
            <a href="tel:9825568108" className="flex items-center gap-2 text-sm text-orange-100 hover:text-white transition-colors">
              <span>📞</span> 98255 68108
            </a>
            <a href="mailto:dudhrejvadwala@gmail.com" className="flex items-center gap-2 text-sm text-orange-100 hover:text-white transition-colors">
              <span>📧</span> dudhrejvadwala@gmail.com
            </a>
          </div>

          {/* Social */}
          <div className="flex gap-2 mt-4">
            {[
              { icon: '▶️', label: 'YouTube', href: '#' },
              { icon: '📷', label: 'Instagram', href: '#' },
              { icon: '👤', label: 'Facebook', href: '#' },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                title={s.label}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-sm"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/20 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-xs text-orange-200">
          © {new Date().getFullYear()} Shri Vadwala Mandir Dudhrej Dham. All Rights Reserved.
        </p>
        <p className="text-sm text-orange-100 font-heading">
          🙏 જય વડવાળા — Jai Vadwala
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
