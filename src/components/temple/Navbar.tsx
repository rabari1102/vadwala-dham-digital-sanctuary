import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Home',      labelGuj: 'હોમ',      href: '#home' },
  { label: 'History',   labelGuj: 'ઇતિહાસ',   href: '#history' },
  { label: 'Parampara', labelGuj: 'પરંપરા',   href: '#parampara' },
  { label: 'Services',  labelGuj: 'સેવાઓ',    href: '#services' },
  { label: 'Festivals', labelGuj: 'ઉત્સવ',    href: '#festivals' },
  { label: 'Dhaja',     labelGuj: 'ધજા',      href: '#dhaja' },
  { label: 'Gallery',   labelGuj: 'ગેલેરી',  href: '#gallery' },
  { label: 'Donate',    labelGuj: 'દાન',      href: '#donate' },
  { label: 'Contact',   labelGuj: 'સંપર્ક',  href: '#contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handler = () => { if (window.innerWidth >= 1024) setOpen(false); };
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white shadow-md border-b-2 border-orange-500'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          {/* Logo */}
          <a href="#home" className="flex items-center gap-2.5 min-w-0">
            <div className={`flex-shrink-0 flex h-9 w-9 items-center justify-center rounded-full text-lg font-bold shadow transition-all duration-300 ${
              scrolled ? 'bg-orange-500 text-white' : 'bg-white/20 text-white backdrop-blur-sm'
            }`}>
              🕉️
            </div>
            <div className="leading-tight min-w-0">
              <span className={`block text-sm font-heading font-bold truncate transition-colors duration-300 ${
                scrolled ? 'text-orange-600' : 'text-white drop-shadow'
              }`}>
                શ્રી વડવાળા મંદિર
              </span>
              <span className={`block text-[10px] truncate transition-colors duration-300 ${
                scrolled ? 'text-gray-500' : 'text-white/75 drop-shadow'
              }`}>
                Dudhrej Dham · Surendranagar
              </span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className={`px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200
                  hover:bg-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-orange-400 ${
                  scrolled ? 'text-gray-700' : 'text-white/90'
                }`}
              >
                {l.labelGuj}
              </a>
            ))}
            <a
              href="#"
              className="glow-live ml-2 inline-flex items-center gap-1.5 rounded-full bg-red-600
                         px-3 xl:px-4 py-2 text-xs xl:text-sm font-semibold text-white
                         shadow-md hover:bg-red-700 transition-colors"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-100" />
              </span>
              Live
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            className={`lg:hidden p-2 rounded-xl transition-colors ${
              scrolled ? 'text-gray-700 hover:bg-orange-50' : 'text-white hover:bg-white/10'
            }`}
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu — full-width slide-down */}
      <div
        className={`lg:hidden fixed top-0 left-0 right-0 z-40 bg-white shadow-xl
                    transition-all duration-300 ease-in-out overflow-hidden ${
          open ? 'max-h-screen pt-[60px]' : 'max-h-0 pt-0'
        }`}
      >
        <div className="px-4 py-3 grid grid-cols-3 gap-1.5 border-t border-orange-100">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="flex flex-col items-center py-3 px-1 rounded-xl text-center
                         hover:bg-orange-50 active:bg-orange-100 transition-colors group"
            >
              <span className="text-xs font-semibold text-gray-800 group-hover:text-orange-600 leading-tight">
                {l.labelGuj}
              </span>
              <span className="text-[9px] text-gray-400 group-hover:text-orange-400 mt-0.5">
                {l.label}
              </span>
            </a>
          ))}
        </div>
        <div className="px-4 pb-4 pt-2 border-t border-orange-50">
          <a
            href="#"
            className="glow-live w-full inline-flex items-center justify-center gap-2
                       rounded-full bg-red-600 px-4 py-3 text-sm font-semibold text-white"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-100" />
            </span>
            ભગવાન ના Live Darshan
          </a>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
