import templeNight from '@/assets/gallery/temple-night.jpg';
import templeDay from '@/assets/gallery/temple-day.webp';
import janmashtami from '@/assets/gallery/janmashtami-1.jpg';
import { useState, useEffect, useCallback } from 'react';

const slides = [
  { img: templeNight, tagline: 'સૌરાષ્ટ્રની દેવભૂમિ પર બિરાજમાન' },
  { img: templeDay,   tagline: '૫૦૦ વર્ષ જૂની આધ્યાત્મિક વિભૂતિ' },
  { img: janmashtami, tagline: 'અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી' },
];

const MARQUEE = '🙏 જય વડવાળા  ✦  Shri Vadwala Dev Ki Jai  ✦  Dudhrej Dham  ✦  અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી  ✦  ';

const Hero = () => {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((c) => (c + 1) % slides.length), []);

  useEffect(() => {
    const t = setInterval(next, 5500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <section id="home" className="relative min-h-screen flex flex-col">

      {/* ── Marquee ticker ── */}
      <div className="relative z-10 bg-orange-500 py-2 overflow-hidden mt-[60px]">
        <div className="marquee-track text-sm text-white font-medium tracking-wide select-none">
          {/* Doubled so the loop is seamless */}
          <span className="pr-8">{MARQUEE}</span>
          <span className="pr-8">{MARQUEE}</span>
          <span className="pr-8">{MARQUEE}</span>
          <span className="pr-8">{MARQUEE}</span>
        </div>
      </div>

      {/* ── Slideshow ── */}
      <div className="relative flex-1 flex items-center justify-center" style={{ minHeight: 'calc(100vh - 96px)' }}>
        {slides.map((slide, i) => (
          <div
            key={i}
            aria-hidden={current !== i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${slide.img})`, opacity: current === i ? 1 : 0 }}
          />
        ))}

        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-950/25 via-transparent to-orange-950/25" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto w-full">

          <div className="text-3xl sm:text-4xl md:text-5xl animate-pulse mb-4 drop-shadow-lg select-none">🕉️</div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white
                          leading-tight mb-3 drop-shadow-2xl">
            શ્રી વડવાળા મંદિર
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading text-orange-300 mb-2 drop-shadow-lg">
            દુધરેજધામ
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-white/90 font-heading italic mb-1 drop-shadow">
            Shri Vadwala Mandir, Dudhrej Dham
          </p>
          <p className="text-xs sm:text-sm md:text-base text-orange-200 font-medium mb-1 drop-shadow">
            અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી
          </p>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 my-5 sm:my-6">
            <div className="h-px flex-1 max-w-20 sm:max-w-24 bg-gradient-to-r from-transparent to-orange-400" />
            <span className="text-orange-300 text-lg select-none">❋</span>
            <div className="h-px flex-1 max-w-20 sm:max-w-24 bg-gradient-to-l from-transparent to-orange-400" />
          </div>

          {/* Slide tagline */}
          <p className="text-sm sm:text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-1
                         leading-relaxed font-heading drop-shadow min-h-[1.5em] transition-all duration-500">
            {slides[current].tagline}
          </p>
          <p className="text-xs sm:text-sm text-white/55 italic mb-8 sm:mb-10">
            A 500-year-old spiritual legacy on the holy land of Saurashtra
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <a
              href="#"
              className="glow-live inline-flex items-center justify-center gap-2 rounded-full
                         bg-red-600 px-6 sm:px-8 py-3.5 text-sm sm:text-base font-semibold
                         text-white hover:bg-red-700 transition-colors shadow-xl"
            >
              <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-100" />
              </span>
              ભગવાન ના દર્શન 🔴
            </a>
            <a
              href="#donate"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2
                         border-orange-400 bg-orange-500/20 px-6 sm:px-8 py-3.5 text-sm sm:text-base
                         font-semibold text-white hover:bg-orange-500 transition-colors backdrop-blur-sm shadow-xl"
            >
              🙏 Donate Now
            </a>
            <a
              href="#dhaja"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2
                         border-white/50 bg-white/10 px-6 sm:px-8 py-3.5 text-sm sm:text-base
                         font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              🚩 ધજા ચઢાવો
            </a>
          </div>

          {/* Slide dots */}
          <div className="flex justify-center gap-2 mt-8 sm:mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === i ? 'bg-orange-400 w-8' : 'bg-white/40 w-2.5 hover:bg-white/60'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center
                        gap-1 text-white/40 animate-bounce pointer-events-none">
          <span className="text-[10px] tracking-widest uppercase">Scroll</span>
          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
