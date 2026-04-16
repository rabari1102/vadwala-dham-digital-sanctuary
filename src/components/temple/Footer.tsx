const links = [
  { label: 'Home', href: '#home' },
  { label: 'History', href: '#history' },
  { label: 'Parampara', href: '#parampara' },
  { label: 'Services', href: '#services' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Donate', href: '#donate' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => (
  <footer className="bg-gradient-maroon py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <span className="text-2xl">🕉️</span>
            <div>
              <p className="font-heading font-bold text-temple-gold text-lg">શ્રી વડવાળા મંદિર</p>
              <p className="text-sm text-temple-cream/70">દુધરેજધામ, સુરેન્દ્રનગર</p>
              <p className="text-xs text-temple-cream/50">Dudhrej Dham, Surendranagar, Gujarat — 363040</p>
            </div>
          </div>
          <div className="mt-3 flex gap-4 justify-center md:justify-start text-sm text-temple-cream/60">
            <a href="tel:9687921008" className="hover:text-temple-gold transition-colors">📞 96879 21008</a>
            <a href="mailto:dudhrejvadwala@gmail.com" className="hover:text-temple-gold transition-colors">📧 Email</a>
          </div>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-5">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-temple-cream/70 hover:text-temple-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="mt-8 pt-6 border-t border-temple-gold/20 text-center">
        <p className="text-sm text-temple-cream/60">
          © {new Date().getFullYear()} Shri Vadwala Mandir Dudhrej Dham. All Rights Reserved.
        </p>
        <p className="text-xs text-temple-cream/40 mt-1">
          🙏 જય વડવાળા — Jai Vadwala
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
