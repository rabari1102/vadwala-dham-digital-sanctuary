import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';
import { useEffect, useState } from 'react';
import { api, type AboutData } from '@/services/api';

const About = () => {
  const containerRef = useFadeInAll();
  const [data, setData] = useState<AboutData | null>(null);

  useEffect(() => {
    api.getAbout().then((d) => { if (d) setData(d); });
  }, []);

  if (!data) {
    return (
      <section id="history" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 bg-orange-100 rounded mx-auto" />
            <div className="h-8 w-72 bg-orange-50 rounded mx-auto" />
            <div className="max-w-4xl mx-auto space-y-3 mt-8">
              <div className="h-20 bg-orange-50/60 rounded-3xl" />
              <div className="h-20 bg-orange-50/60 rounded-3xl" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="history" className="py-14 md:py-24 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6" ref={containerRef}>

        {/* Header */}
        <div className="fade-in-section text-center mb-10 md:mb-14">
          <span className="section-badge">Our Heritage</span>
          <h2 className="section-heading">વડવાળા ધામ — ઐતિહાસિક પરિચય</h2>
          <p className="section-sub">History of Vadwala Dham</p>
          <LotusDivider />
        </div>

        {/* Main history */}
        <div className="fade-in-section max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl sm:rounded-3xl border border-orange-100 bg-orange-50/40 p-5 sm:p-8 md:p-10 shadow-sm space-y-5">
            {data.historyParagraphs.map((para, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1 self-stretch bg-gradient-to-b from-orange-400 to-orange-200 rounded-full" />
                <p className="text-gray-700 leading-loose text-sm md:text-base">
                  {para}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Key facts grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto mb-12">
          {data.facts.map((f, i) => (
            <div
              key={i}
              className="fade-in-section hover-lift rounded-xl sm:rounded-2xl border border-orange-100 bg-white p-4 sm:p-5 shadow-sm group"
              style={{ transitionDelay: `${i * 70}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-2xl group-hover:bg-orange-100 transition-colors">
                  {f.icon}
                </div>
                <div>
                  <h3 className="font-heading font-bold text-gray-800 text-sm mb-1">{f.titleGuj}</h3>
                  <p className="text-gray-500 leading-relaxed text-xs">{f.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Temple architecture */}
        <div className="fade-in-section max-w-4xl mx-auto">
          <div className="rounded-2xl sm:rounded-3xl border-2 border-orange-200 bg-orange-50 p-5 sm:p-8 md:p-10 shadow-md">
            <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-800 text-center mb-6">
              🏛️ મંદિરની રચના — Temple Architecture
            </h3>
            <div className="grid grid-cols-3 gap-3 sm:gap-4 mb-5">
              {data.gates.map((g, i) => (
                <div key={i} className="text-center rounded-xl bg-white border border-orange-200 p-3 sm:p-5 hover:shadow-md transition-shadow">
                  <span className="text-2xl sm:text-3xl block mb-2">{g.icon}</span>
                  <p className="font-heading font-bold text-gray-800 text-xs sm:text-sm leading-tight">{g.name}</p>
                  <p className="text-[11px] sm:text-xs text-orange-600 mt-1 font-medium">{g.nameGuj}</p>
                </div>
              ))}
            </div>
            <div className="saffron-divider mb-4" />
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed text-center">
              {data.fiveDeitiesGuj}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
