import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const facts = [
  { icon: '🏔️', titleGuj: 'દેવભૂમિ — સૌરાષ્ટ્ર', text: 'The land of Saurashtra (Panchal/Zhalavad region, now Surendranagar district) is considered Dev Bhoomi — home of saints, warriors and satis.' },
  { icon: '🙏', titleGuj: 'શ્રી વટપતિ (વડવાળા દેવ)', text: 'The presiding deity Shri Vatapati (Vadwala Dev) is widely revered across Gujarat as an avatar of Lord Ramchandraji. The Aradhya Dev is Ayodhyapati Bhagwan Shri Ramchandraji.' },
  { icon: '🏞️', titleGuj: 'ઉમઈ નદી — પયસર સરોવર', text: 'Situated on the northern bank of the Umiya River (ancient Unmatt Ganga), with a beautiful adjacent lake called "Payasar" or "Dugdhasar".' },
  { icon: '🌳', titleGuj: 'પ્રાચીન વટવૃક્ષ', text: 'A magnificent ancient banyan tree (Vatavriksha) grown from a twig by the first Acharya Shri Shatpragnya Swamiji stands on the eastern side.' },
  { icon: '🕯️', titleGuj: 'આચાર્યશ્રીઓની સમાધિઓ', text: 'The Samadhis (sacred tombs) of all Acharyas from Shatpragnya Swamiji onward are located on the southern side — witnesses to 500+ years of glorious tradition.' },
  { icon: '🍽️', titleGuj: 'અન્નક્ષેત્ર — માતા અન્નપૂર્ણા', text: 'The Annakshetra (food hall) houses Mata Annapurna — millions of devotees have received prasad here. Guestrooms/Yatri Nivas available for pilgrims.' },
];

const gates = [
  { icon: '🦁', name: 'Sinhadvara (Lion Gate)', nameGuj: 'સિંહદ્વાર — પૂર્વ' },
  { icon: '🐂', name: 'Nandidvara',             nameGuj: 'નંદીદ્વાર — ઉત્તર' },
  { icon: '🐘', name: 'Hastidvara (Elephant)',  nameGuj: 'હસ્તિદ્વાર — દક્ષિણ' },
];

const About = () => {
  const containerRef = useFadeInAll();

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

        {/* History paragraphs */}
        <div className="fade-in-section max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl sm:rounded-3xl border border-orange-100 bg-orange-50/40 p-5 sm:p-8 md:p-10 shadow-sm space-y-5">
            {[
              'સૌરાષ્ટ્રની ભૂમિ સંત, શૂરવીર અને સતીઓની ભૂમિ ગણાય છે. તેમાય તેમાંનો પાંચાળ પ્રદેશ જે પાછળથી ઝાલાવાડ તરીકે ઓળખાવા લાગ્યો અને હાલ જેને સુરેન્દ્રનગર જિલ્લો કહેવામાં આવે છે તે પ્રદેશ દેવભૂમિ ગણાતો. પશ્ચિમ ભારતમાં આવેલા આ પ્રદેશમાં પ્રાચીન વર્ધમાનપુરી તરીકે જાણીતું વઢવાણ નગર આવેલું છે. સુરેન્દ્રનગર જિલ્લાના વઢવાણ તાલુકામાં સુરેન્દ્રનગર ગામથી પાંચેક કિલોમીટર દૂધરેજ નામક ગામ આવેલું છે.',
              'આ દૂધરેજ ગામમાં શ્રીમદ્ ભકરાચાર્યજીની પરંપરામાં ૨૧મા શિષ્ય શ્રી નીલકંઠસ્વામીની પ્રેરણાથી અને તેઓશ્રીના શુભ આશીર્વાદથી શ્રીરામીય વૈષ્ણવોનાં ધર્મધામ સમું શ્રી વટપતિ (વડવાળા-દેવ) ભગવાનનું આશ્રમ સ્થાન આવેલ છે. તેમના આરાધ્ય દેવ અયોધ્યાપતિ ભગવાન શ્રી રામચંદ્રજી છે.',
              'મહા વદ ગિરિ માંથી જન્મ પામેલી ઉન્મત્ત ગંગા (હાલની ઉમઈ નદી)ના ઉત્તર કિનારે આ સુંદર સ્થાન આવેલ છે. નજીકમાં જ આશ્રમને અડીને સુંદર સરોવર આવેલ છે. જેને પયસર કે દુગ્ધસર કહે છે.',
            ].map((para, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-1 self-stretch bg-gradient-to-b from-orange-400 to-orange-200 rounded-full" />
                <p className="text-gray-700 leading-loose text-sm md:text-base">{para}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Key facts */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-5xl mx-auto mb-12">
          {facts.map((f, i) => (
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
              {gates.map((g, i) => (
                <div key={i} className="text-center rounded-xl bg-white border border-orange-200 p-3 sm:p-5 hover:shadow-md transition-shadow">
                  <span className="text-2xl sm:text-3xl block mb-2">{g.icon}</span>
                  <p className="font-heading font-bold text-gray-800 text-xs sm:text-sm leading-tight">{g.name}</p>
                  <p className="text-[11px] sm:text-xs text-orange-600 mt-1 font-medium">{g.nameGuj}</p>
                </div>
              ))}
            </div>
            <div className="saffron-divider" />
            <p className="text-gray-700 text-xs sm:text-sm leading-relaxed text-center">
              મંદિરમાં <strong className="text-orange-600">પાંચ દેવો</strong> બિરાજેલા છે (ડાબેથી જમણે): શ્રી દ્વારકાનાથજી, શ્રી વટનાથ, ભગવાન શ્રી રામચંદ્રજી, સ્વામી ષટપ્રજ્ઞદાસજી, ભગવાન શ્રી શંકર
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
