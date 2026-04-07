const links = [
  { label: 'Home', href: '#home' },
  { label: 'History', href: '#history' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Donate', href: '#donate' },
  { label: 'Contact', href: '#contact' },
];

const Footer = () => (
  <footer className="bg-gradient-maroon py-12">
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Logo / name */}
        <div className="text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
            <span className="text-2xl">🕉️</span>
            <div>
              <p className="font-heading font-bold text-temple-gold text-lg">શ્રી વડવાળા મંદિર</p>
              <p className="text-sm text-temple-cream/70">Dudhrej Dham, Surendranagar</p>
            </div>
          </div>
        </div>

        {/* Nav links */}
        <nav className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
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
