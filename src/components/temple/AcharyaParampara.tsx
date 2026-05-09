import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';
import { useEffect, useState } from 'react';
import { api, type AcharyaData } from '@/services/api';

const AcharyaParampara = () => {
  const containerRef = useFadeInAll();
  const [acharyas, setAcharyas] = useState<AcharyaData[]>([]);

  useEffect(() => {
    api.getAcharyas().then((d) => { if (d?.length) setAcharyas(d); });
  }, []);

  if (!acharyas.length) {
    return (
      <section id="parampara" className="py-16 md:py-24 bg-section-alt">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 bg-orange-100 rounded mx-auto" />
            <div className="h-8 w-64 bg-orange-50 rounded mx-auto" />
            <div className="max-w-3xl mx-auto mt-8 space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-14 bg-white rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="parampara" className="py-16 md:py-24 bg-section-alt">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
            500-Year Lineage
          </span>
          <h2 className="section-heading">આચાર્યશ્રી પરંપરા</h2>
          <p className="section-sub">
            ૨૩ ગુરુઓની ૫૦૦ વર્ષ જૂની ગૌરવ ગાથા — A 500-Year Lineage of 23 Gurus
          </p>
          <LotusDivider />
        </div>

        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-300 via-orange-500 to-orange-300 -translate-x-1/2" />

          {acharyas.map((a, i) => {
            const isLeft = i % 2 === 0;
            const isCurrent = a.current;
            return (
              <div
                key={a._id || i}
                className={`fade-in-section relative flex items-center mb-5 md:mb-4 ${isLeft ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                style={{ transitionDelay: `${i * 50}ms` }}
              >
                {/* Number bubble */}
                <div className={`absolute left-6 md:left-1/2 -translate-x-1/2 z-10 flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold shadow-md border-2 ${
                  isCurrent
                    ? 'bg-orange-500 text-white border-orange-300 ring-4 ring-orange-200 animate-pulse'
                    : 'bg-white text-orange-600 border-orange-400'
                }`}>
                  {i + 1}
                </div>

                {/* Card */}
                <div className={`ml-16 md:ml-0 md:w-[calc(50%-2.5rem)] ${isLeft ? 'md:mr-auto md:pr-6 md:text-right' : 'md:ml-auto md:pl-6 md:text-left'}`}>
                  <div className={`hover-lift rounded-xl border bg-white px-4 py-3 shadow-sm ${
                    isCurrent
                      ? 'border-orange-400 ring-2 ring-orange-100 bg-orange-50'
                      : 'border-orange-100'
                  }`}>
                    <p className="font-heading font-semibold text-gray-800 text-sm md:text-base">{a.nameGuj}</p>
                    <p className="text-xs text-gray-400 italic">{a.name}</p>
                    {isCurrent && (
                      <span className="inline-block mt-1.5 text-xs bg-orange-500 text-white px-3 py-0.5 rounded-full font-medium">
                        🚩 વિદ્યમાન — {a.since} થી
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AcharyaParampara;
