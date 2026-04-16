import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const About = () => {
  const containerRef = useFadeInAll();

  return (
    <section id="history" className="py-16 md:py-24 mandala-bg">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            વડવાળા ધામ — ઐતિહાસિક પરિચય
          </h2>
          <p className="text-lg text-muted-foreground font-heading italic">History of Vadwala Dham</p>
          <LotusDivider />
        </div>

        {/* Main Gujarati history paragraph */}
        <div className="fade-in-section max-w-4xl mx-auto mb-12">
          <div className="rounded-2xl border border-temple-gold/20 bg-card p-6 md:p-10 shadow-md">
            <p className="text-foreground/90 leading-loose text-sm md:text-base mb-6">
              સૌરાષ્ટ્રની ભૂમિ સંત, શૂરવીર અને સતીઓની ભૂમિ ગણાય છે. તેમાય તેમાંનો પાંચાળ પ્રદેશ જે પાછળથી ઝાલાવાડ તરીકે ઓળખાવા લાગ્યો અને હાલ જેને સુરેન્દ્રનગર જિલ્લો કહેવામાં આવે છે તે પ્રદેશ દેવભૂમિ ગણાતો. પશ્ચિમ ભારતમાં આવેલા આ પ્રદેશમાં પ્રાચીન વર્ધમાનપુરી તરીકે જાણીતું વઢવાણ નગર આવેલું છે. સુરેન્દ્રનગર જિલ્લાના વઢવાણ તાલુકામાં સુરેન્દ્રનગર ગામથી પાંચેક કિલોમીટર દૂધરેજ નામક ગામ આવેલું છે.
            </p>
            <p className="text-foreground/90 leading-loose text-sm md:text-base mb-6">
              આ દૂધરેજ ગામમાં શ્રીમદ્ ભકરાચાર્યજીની પરંપરામાં ૨૧મા શિષ્ય શ્રી નીલકંઠસ્વામીની પ્રેરણાથી અને તેઓશ્રીના શુભ આશીર્વાદથી શ્રીરામીય વૈષ્ણવોનાં ધર્મધામ સમું શ્રી વટપતિ (વડવાળા-દેવ) ભગવાનનું આશ્રમ સ્થાન આવેલ છે. તેમના આરાધ્ય દેવ અયોધ્યાપતિ ભગવાન શ્રી રામચંદ્રજી છે.
            </p>
            <p className="text-foreground/90 leading-loose text-sm md:text-base">
              મહા વદ ગિરિ માંથી જન્મ પામેલી ઉન્મત્ત ગંગા (હાલની ઉમઈ નદી)ના ઉત્તર કિનારે આ સુંદર સ્થાન આવેલ છે. નજીકમાં જ આશ્રમને અડીને સુંદર સરોવર આવેલ છે. જેને પયસર કે દુગ્ધસર કહે છે.
            </p>
          </div>
        </div>

        {/* Key facts grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {facts.map((f, i) => (
            <div
              key={i}
              className="fade-in-section hover-lift rounded-xl border border-temple-gold/20 bg-card p-6 shadow-sm"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{f.icon}</span>
                <div>
                  <h3 className="font-heading font-bold text-foreground text-base mb-2">{f.titleGuj}</h3>
                  <p className="text-foreground/80 leading-relaxed text-sm">{f.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Temple architecture detail */}
        <div className="fade-in-section max-w-4xl mx-auto">
          <div className="rounded-2xl border-2 border-temple-gold/30 bg-gradient-to-br from-card to-temple-gold/5 p-6 md:p-10 shadow-lg">
            <h3 className="font-heading font-bold text-xl text-foreground text-center mb-6">
              🏛️ મંદિરની રચના — Temple Architecture
            </h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {gates.map((g, i) => (
                <div key={i} className="text-center rounded-xl bg-temple-gold/10 border border-temple-gold/20 p-5">
                  <span className="text-3xl block mb-2">{g.icon}</span>
                  <p className="font-heading font-bold text-foreground text-sm">{g.name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{g.nameGuj}</p>
                </div>
              ))}
            </div>
            <p className="text-foreground/80 text-sm leading-relaxed text-center">
              મંદિરમાં <strong>પાંચ દેવો</strong> બિરાજેલા છે (ડાબેથી જમણે): શ્રી દ્વારકાનાથજી, શ્રી વટનાથ, ભગવાન શ્રી રામચંદ્રજી, સ્વામી ષટપ્રજ્ઞદાસજી, ભગવાન શ્રી શંકર
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

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
  { icon: '🐂', name: 'Nandidvara', nameGuj: 'નંદીદ્વાર — ઉત્તર' },
  { icon: '🐘', name: 'Hastidvara (Elephant Gate)', nameGuj: 'હસ્તિદ્વાર — દક્ષિણ' },
];

export default About;
