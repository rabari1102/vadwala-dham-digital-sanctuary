import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const acharyas = [
  { nameGuj: 'નીલકંઠ સ્વામી',  name: 'Nilkanth Swami' },
  { nameGuj: 'રઘુનાથ સ્વામી',  name: 'Raghunath Swami' },
  { nameGuj: 'યાદવ સ્વામી',    name: 'Yadav Swami' },
  { nameGuj: 'ષટપ્રજ્ઞદાસજી', name: 'Shatpragnya Dasji' },
  { nameGuj: 'લબ્ધરામજી',      name: 'Labdhramji' },
  { nameGuj: 'રત્નદાસજી',      name: 'Ratnadasji' },
  { nameGuj: 'માનદાસજી',       name: 'Manadasji' },
  { nameGuj: 'કૃષ્ણદાસજી',    name: 'Krishnadasji' },
  { nameGuj: 'ઓધવદાસજી',      name: 'Odhavdasji' },
  { nameGuj: 'ગોકુલદાસજી',    name: 'Gokuldasji' },
  { nameGuj: 'ભાવદાસજી',       name: 'Bhavdasji' },
  { nameGuj: 'ગુલાબદાસજી',    name: 'Gulabdasji' },
  { nameGuj: 'કેવળદાસજી',     name: 'Kevaldasji' },
  { nameGuj: 'મેઘદાસજી',       name: 'Meghadasji' },
  { nameGuj: 'યમુનાદાસજી',    name: 'Yamunadasji' },
  { nameGuj: 'ગંગારામજી',      name: 'Gangaramji' },
  { nameGuj: 'ગોવિંદરામજી',   name: 'Govindramji' },
  { nameGuj: 'રઘુવરદાસજી',    name: 'Raghuvardasji' },
  { nameGuj: 'જીવરામદાસજી',   name: 'Jivramdasji' },
  { nameGuj: 'ગોમતીદાસજી',    name: 'Gomatidasji' },
  { nameGuj: 'કલ્યાણદાસજી',   name: 'Kalyandasji' },
  { nameGuj: 'કનીરામદાસજી',   name: 'Kaniramdas ji', current: true, since: '૧૯૯૪' },
  { nameGuj: 'વટપતિ મહિમા',   name: 'Vatpati Mahima' },
];

const AcharyaParampara = () => {
  const containerRef = useFadeInAll();

  return (
    <section id="parampara" className="py-14 md:py-24 bg-orange-50/50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6" ref={containerRef}>

        {/* Header */}
        <div className="fade-in-section text-center mb-10 md:mb-14">
          <span className="section-badge">500-Year Lineage</span>
          <h2 className="section-heading">આચાર્યશ્રી પરંપરા</h2>
          <p className="section-sub">૨૩ ગુરુઓની ૫૦૦ વર્ષ જૂની ગૌરવ ગાથા</p>
          <LotusDivider />
        </div>

        {/* Mobile: simple card grid */}
        <div className="md:hidden grid grid-cols-2 gap-2 sm:gap-3">
          {acharyas.map((a, i) => {
            const isCurrent = 'current' in a && a.current;
            return (
              <div
                key={i}
                className={`fade-in-section rounded-xl p-3 border text-center ${
                  isCurrent
                    ? 'border-orange-400 bg-orange-50 ring-2 ring-orange-200'
                    : 'border-orange-100 bg-white'
                }`}
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <div className={`w-7 h-7 rounded-full text-xs font-bold flex items-center justify-center mx-auto mb-2 ${
                  isCurrent ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-700'
                }`}>
                  {i + 1}
                </div>
                <p className="font-heading font-semibold text-gray-800 text-xs leading-tight">{a.nameGuj}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{a.name}</p>
                {isCurrent && (
                  <span className="inline-block mt-1.5 text-[10px] bg-orange-500 text-white px-2 py-0.5 rounded-full">
                    🚩 {a.since} થી
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop: zigzag timeline */}
        <div className="hidden md:block relative">
          {/* Centre line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2
                          bg-gradient-to-b from-orange-200 via-orange-400 to-orange-200" />

          {acharyas.map((a, i) => {
            const isLeft = i % 2 === 0;
            const isCurrent = 'current' in a && a.current;
            return (
              <div
                key={i}
                className={`fade-in-section relative flex items-center mb-4 ${
                  isLeft ? 'flex-row' : 'flex-row-reverse'
                }`}
                style={{ transitionDelay: `${i * 45}ms` }}
              >
                {/* Number bubble */}
                <div className={`absolute left-1/2 -translate-x-1/2 z-10 flex h-9 w-9 items-center
                                 justify-center rounded-full text-xs font-bold shadow-md border-2 ${
                  isCurrent
                    ? 'bg-orange-500 text-white border-orange-300 ring-4 ring-orange-100 animate-pulse'
                    : 'bg-white text-orange-600 border-orange-300'
                }`}>
                  {i + 1}
                </div>

                {/* Card */}
                <div className={`w-[calc(50%-2.5rem)] ${isLeft ? 'mr-auto pr-5 text-right' : 'ml-auto pl-5 text-left'}`}>
                  <div className={`hover-lift rounded-xl border bg-white px-4 py-3 shadow-sm ${
                    isCurrent ? 'border-orange-400 ring-2 ring-orange-100' : 'border-orange-100'
                  }`}>
                    <p className="font-heading font-semibold text-gray-800 text-sm">{a.nameGuj}</p>
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
