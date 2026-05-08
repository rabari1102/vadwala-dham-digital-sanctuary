import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
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

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/97 shadow-md backdrop-blur-md border-b-2 border-orange-500'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className={`flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold shadow-md transition-all duration-300 ${scrolled ? 'bg-orange-500 text-white' : 'bg-white/20 text-white backdrop-blur-sm'}`}>
            🕉️
          </div>
          <div className="leading-tight">
            <span className={`block text-sm font-heading font-bold transition-colors duration-300 ${scrolled ? 'text-orange-600' : 'text-white drop-shadow'}`}>
              શ્રી વડવાળા મંદિર
            </span>
            <span className={`block text-xs font-body transition-colors duration-300 ${scrolled ? 'text-gray-500' : 'text-white/80 drop-shadow'}`}>
              Dudhrej Dham · Surendranagar
            </span>
          </div>
        </a>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:bg-orange-500 hover:text-white ${
                scrolled ? 'text-gray-700' : 'text-white/90 hover:bg-white/20'
              }`}
            >
              {l.labelGuj}
            </a>
          ))}
          <a
            href="#"
            className="glow-live ml-3 inline-flex items-center gap-2 rounded-full bg-red-600 px-4 py-2 text-sm font-semibold text-white shadow-md hover:bg-red-700 transition-colors"
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
          className={`lg:hidden p-2 rounded-lg transition-colors ${scrolled ? 'text-gray-700 hover:bg-orange-50' : 'text-white hover:bg-white/10'}`}
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-white border-t border-orange-100 shadow-xl">
          <div className="container mx-auto px-4 py-3 grid grid-cols-3 gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex flex-col items-center py-3 px-2 rounded-xl text-center hover:bg-orange-50 transition-colors group"
              >
                <span className="text-xs font-medium text-gray-700 group-hover:text-orange-600">{l.labelGuj}</span>
                <span className="text-[10px] text-gray-400 group-hover:text-orange-400">{l.label}</span>
              </a>
            ))}
          </div>
          <div className="px-4 pb-4 border-t border-orange-50 pt-3">
            <a
              href="#"
              className="glow-live w-full inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-4 py-2.5 text-sm font-semibold text-white"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-100" />
              </span>
              ભગવાન ના Live Darshan
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
