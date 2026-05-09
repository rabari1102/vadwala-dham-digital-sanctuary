import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';
import { useEffect, useState } from 'react';
import { api, type ServiceData } from '@/services/api';

const Services = () => {
  const containerRef = useFadeInAll();
  const [services, setServices] = useState<ServiceData[]>([]);

  useEffect(() => {
    api.getServices().then((d) => { if (d?.length) setServices(d); });
  }, []);

  if (!services.length) {
    return (
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="animate-pulse space-y-4">
            <div className="h-6 w-48 bg-orange-100 rounded mx-auto" />
            <div className="h-8 w-72 bg-orange-50 rounded mx-auto" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold tracking-widest uppercase px-4 py-1.5 rounded-full mb-3">
            Seva & Activities
          </span>
          <h2 className="section-heading">સામાજીક, ધાર્મિક અને શૈક્ષણિક પ્રવૃતિઓ</h2>
          <p className="section-sub">Social, Religious & Educational Activities</p>
          <LotusDivider />
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <div key={s._id || i} className="fade-in-section hover-lift rounded-2xl border border-orange-100 bg-white p-6 shadow-sm group hover:border-orange-300 transition-colors" style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-50 text-3xl mb-4 group-hover:bg-orange-100 transition-colors">{s.icon}</div>
              <h3 className="font-heading font-bold text-base text-gray-800 mb-1">{s.titleGuj}</h3>
              <p className="text-xs text-orange-500 font-semibold mb-3">{s.title}</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-2">{s.descGuj}</p>
              <p className="text-xs text-gray-400 leading-relaxed italic">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
