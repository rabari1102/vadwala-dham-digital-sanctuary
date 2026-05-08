import templeNight from '@/assets/gallery/temple-night.jpg';
import templeDay from '@/assets/gallery/temple-day.webp';
import janmashtami from '@/assets/gallery/janmashtami-1.jpg';
import { useState, useEffect } from 'react';

const slides = [
  { img: templeNight, tagline: 'સૌરાષ્ટ્રની દેવભૂમિ' },
  { img: templeDay, tagline: '૫૦૦ વર્ષ જૂની આધ્યાત્મિક વિભૂતિ' },
  { img: janmashtami, tagline: 'અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી' },
];

const marqueeText = '🙏 જય વડવાળા  |  Shri Vadwala Dev Ki Jai  |  Dudhrej Dham  |  અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી  |  જય વડવાળા  |  Shri Vadwala Dev Ki Jai  |  Dudhrej Dham  |  અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી  |  ';

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      {/* Marquee ticker — deep saffron bar */}
      <div className="relative z-10 bg-orange-500 py-2 overflow-hidden mt-[60px]">
        <div className="flex whitespace-nowrap">
          <span className="marquee inline-block text-sm text-white font-medium tracking-wider">
            {marqueeText}{marqueeText}
          </span>
        </div>
      </div>

      {/* Hero slideshow */}
      <div className="relative flex-1 flex items-center justify-center min-h-[88vh]">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{ backgroundImage: `url(${slide.img})`, opacity: current === i ? 1 : 0 }}
          />
        ))}

        {/* Multi-layer overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-orange-950/30 via-transparent to-orange-950/30" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 py-16 max-w-4xl mx-auto w-full">
          {/* Om symbol */}
          <div className="text-4xl md:text-5xl animate-pulse mb-4 drop-shadow-lg">🕉️</div>

          {/* Temple name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white leading-tight mb-3 drop-shadow-2xl">
            શ્રી વડવાળા મંદિર
          </h1>

          {/* Subtitle */}
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading text-orange-300 mb-2 drop-shadow-lg">
            દુધરેજધામ
          </h2>

          <p className="text-base md:text-lg text-white/90 font-heading italic mb-1 drop-shadow">
            Shri Vadwala Mandir, Dudhrej Dham
          </p>
          <p className="text-sm md:text-base text-orange-200 font-medium mb-1 drop-shadow">
            અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી
          </p>

          {/* Saffron divider */}
          <div className="flex items-center justify-center gap-3 my-6">
            <div className="h-px flex-1 max-w-24 bg-gradient-to-r from-transparent to-orange-400" />
            <span className="text-orange-300 text-lg">❋</span>
            <div className="h-px flex-1 max-w-24 bg-gradient-to-l from-transparent to-orange-400" />
          </div>

          {/* Dynamic slide tagline */}
          <p className="text-base md:text-xl text-white/90 max-w-2xl mx-auto mb-1 leading-relaxed font-heading drop-shadow">
            {slides[current].tagline}
          </p>
          <p className="text-sm text-white/60 italic mb-10">
            A 500-year-old spiritual legacy enshrined on the holy land of Saurashtra
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="glow-live w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-red-600 px-8 py-3.5 text-base font-semibold text-white hover:bg-red-700 transition-colors shadow-xl"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-100" />
              </span>
              ભગવાન ના દર્શન 🔴
            </a>
            <a
              href="#donate"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-orange-400 bg-orange-500/20 px-8 py-3.5 text-base font-semibold text-white hover:bg-orange-500 transition-colors backdrop-blur-sm shadow-xl"
            >
              🙏 Donate Now
            </a>
            <a
              href="#dhaja"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/50 bg-white/10 px-8 py-3.5 text-base font-semibold text-white hover:bg-white/20 transition-colors backdrop-blur-sm"
            >
              🚩 ધજા ચઢાવો
            </a>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-500 ${
                  current === i ? 'bg-orange-400 w-8' : 'bg-white/40 w-2.5 hover:bg-white/60'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50 animate-bounce">
          <span className="text-xs tracking-widest">SCROLL</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;
