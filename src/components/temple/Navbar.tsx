import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'History', href: '#history' },
  { label: 'Parampara', href: '#parampara' },
  { label: 'Services', href: '#services' },
  { label: 'Festivals', href: '#festivals' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Donate', href: '#donate' },
  { label: 'Contact', href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-temple-maroon/95 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <a href="#home" className="flex items-center gap-3">
          <span className="text-2xl">🕉️</span>
          <div className="leading-tight">
            <span className="block text-sm font-heading font-bold text-temple-gold">
              શ્રી વડવાળા મંદિર
            </span>
            <span className="block text-xs text-temple-cream/80 font-body">
              Dudhrej Dham
            </span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-temple-cream/90 hover:text-temple-gold transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#"
            className="glow-live ml-2 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-primary-foreground"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-100" />
            </span>
            Live Darshan
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-temple-cream"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-temple-maroon/95 backdrop-blur-sm border-t border-temple-gold/20 pb-4">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block px-6 py-3 text-sm text-temple-cream/90 hover:text-temple-gold hover:bg-temple-gold/10 transition-colors"
            >
              {l.label}
            </a>
          ))}
          <div className="px-6 pt-2">
            <a
              href="#"
              className="glow-live inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-100" />
              </span>
              Live Darshan
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
