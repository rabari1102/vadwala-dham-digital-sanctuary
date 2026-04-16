import templeNight from '@/assets/gallery/temple-night.jpg';
import janmashtami from '@/assets/gallery/janmashtami-1.jpg';
import { useState, useEffect } from 'react';

const slides = [templeNight, janmashtami];

const Hero = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setCurrent((c) => (c + 1) % slides.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col">
      {/* Marquee ticker */}
      <div className="relative z-10 bg-temple-maroon/90 py-2 overflow-hidden mt-[60px]">
        <div className="marquee whitespace-nowrap text-sm text-temple-gold font-medium tracking-wider">
          🙏 જય વડવાળા &nbsp;&nbsp;|&nbsp;&nbsp; Shri Vadwala Dev Ki Jai &nbsp;&nbsp;|&nbsp;&nbsp; Dudhrej Dham &nbsp;&nbsp;|&nbsp;&nbsp; અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી &nbsp;&nbsp;|&nbsp;&nbsp; જય વડવાળા &nbsp;&nbsp;|&nbsp;&nbsp; Shri Vadwala Dev Ki Jai &nbsp;&nbsp;|&nbsp;&nbsp; Dudhrej Dham &nbsp;&nbsp;|&nbsp;&nbsp; અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી
        </div>
      </div>

      {/* Hero content */}
      <div className="relative flex-1 flex items-center justify-center">
        {/* Slideshow background */}
        {slides.map((img, i) => (
          <div
            key={i}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${img})`,
              opacity: current === i ? 1 : 0,
            }}
          />
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-temple-dark/80 via-temple-maroon/50 to-temple-dark/90" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 py-20 max-w-4xl mx-auto">
          <p className="text-temple-gold text-2xl md:text-3xl font-heading mb-4 tracking-widest animate-pulse">🕉️</p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-temple-cream leading-tight mb-3 drop-shadow-lg">
            શ્રી વડવાળા મંદિર
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-heading text-temple-gold mb-2 drop-shadow-md">
            દુધરેજધામ
          </h2>
          <p className="text-lg md:text-xl text-temple-cream/90 font-heading italic mb-1">
            Shri Vadwala Mandir, Dudhrej Dham
          </p>
          <p className="text-sm md:text-base text-temple-gold/80 font-medium mb-2">
            અખિલ ભારતીય રબારી સમાજ ધર્મગુરુગાદી
          </p>

          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-temple-gold to-transparent mx-auto my-6" />

          <p className="text-base md:text-lg text-temple-cream/80 max-w-2xl mx-auto mb-2 leading-relaxed font-heading">
            સૌરાષ્ટ્રની દેવભૂમિ પર બિરાજમાન, ૫૦૦ વર્ષ જૂની આધ્યાત્મિક વિભૂતિ
          </p>
          <p className="text-sm text-temple-cream/60 italic mb-10">
            A 500-year-old spiritual legacy enshrined on the holy land of Saurashtra
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#"
              className="glow-live inline-flex items-center gap-2 rounded-full bg-red-600 px-8 py-3 text-base font-semibold text-white hover:bg-red-700 transition-colors shadow-lg"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-300 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-100" />
              </span>
              ભગવાન ના દર્શન 🔴
            </a>
            <a
              href="#donate"
              className="inline-flex items-center gap-2 rounded-full border-2 border-temple-gold bg-temple-gold/10 px-8 py-3 text-base font-semibold text-temple-gold hover:bg-temple-gold hover:text-temple-dark transition-colors backdrop-blur-sm"
            >
              Donate Now 🙏
            </a>
          </div>

          {/* Slide indicators */}
          <div className="flex justify-center gap-2 mt-8">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${current === i ? 'bg-temple-gold w-8' : 'bg-temple-cream/40'}`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
