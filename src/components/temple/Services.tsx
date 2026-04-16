import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const services = [
  {
    icon: '🍛',
    titleGuj: 'અન્નક્ષેત્ર : અભિયાગત સેવા',
    title: 'Annakshetra (Food Hall)',
    descGuj: 'શ્રી વડવાળા મંદિર દુધરેજધામ માં દરરોજ ૨૪ કલાક અન્નક્ષેત્ર ચલાવવામાં આવે છે. જ્યાં દરરોજના ૧૦૦૦ થી ૧૫૦૦ દર્શનાર્થીઓ તેમજ સાધુ–સંતો ભોજન પ્રસાદ ગ્રહણ કરે છે.',
    desc: '24-hour free meals served daily to 1,000–1,500 pilgrims, saints and sadhus.',
  },
  {
    icon: '🐄',
    titleGuj: 'ગૌશાળા : ઉત્તમ ઓલાદનું રક્ષણ',
    title: 'Gaushala (Cow Shelter)',
    descGuj: 'શ્રી વડવાળા મંદિર દુધરેજધામ દ્વારા ઉતમ ઓલાદના રક્ષણ માટે (૧) શ્રી વડવાળા મંદિર ગૌશાળા (૨) શ્રી વટેશ્વર ગૌશાળા – જેગડવા ચલાવવામાં આવે છે.',
    desc: 'Two Gaushalas for breeding and protection of high-quality indigenous cows.',
  },
  {
    icon: '📚',
    titleGuj: 'શૈક્ષણિક કાર્ય',
    title: 'Educational Institutions',
    descGuj: 'શ્રી વડવાળા મંદિર દ્વારા (1) સદગુરૂ શ્રી ગોમતીદાસબાપુ કુમાર છાત્રાલય (2) સદગુરૂ શ્રી કલ્યાણદાસબાપુ કન્યા છાત્રાલય તેમજ શ્રી વડવાળા દેવ સરસ્વતી વિધાલય ચલાવવામાં આવે છે.',
    desc: "Three institutions: Boys' Hostel, Girls' Hostel, and Shri Vadwala Dev Saraswati Vidhyalay.",
  },
  {
    icon: '🏨',
    titleGuj: 'ધર્મશાળા — યાત્રિક નિવાસ',
    title: 'Dharmashala (Pilgrim Rest Houses)',
    descGuj: 'આ સંસ્થા દ્વારા ભારતના પવિત્ર સ્થળોમાં સેવક સમાજ માટે વિશાળ ધર્મશાળા ચલાવવામાં આવે છે.',
    desc: 'Comfortable pilgrim rest houses at: Shri Raghuvir Dham — Dakor and Shri Kalyan Gurudham — Junagadh.',
  },
  {
    icon: '🪔',
    titleGuj: 'મહાકુંભ અન્નક્ષેત્ર',
    title: 'Mahakumbh Annakshetra',
    descGuj: 'બાર બાર વર્ષે આવતા ભારતના પ્રસિધ્ધ મહાકુંભ પર્વમાં અન્નક્ષેત્ર ચલાવવામાં આવે છે.',
    desc: 'Free food service at: Ujjain | Nashik | Prayagraj (Allahabad) | Haridwar.',
  },
  {
    icon: '🤝',
    titleGuj: 'આપાતકાળે સેવા',
    title: 'Emergency Relief',
    descGuj: 'આપાતકાળે વસ્ત્રદાન, અન્નદાન વગેરે સેવા કરવામાં આવે છે.',
    desc: 'During disasters: Vastraadan (Clothing Donation) and Annaadan (Food Donation).',
  },
];

const Services = () => {
  const containerRef = useFadeInAll();

  return (
    <section id="services" className="py-16 md:py-24 mandala-bg">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            સામાજીક, ધાર્મિક અને શૈક્ષણિક પ્રવૃતિઓ
          </h2>
          <p className="text-lg text-muted-foreground font-heading italic">Social, Religious & Educational Activities</p>
          <LotusDivider />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <div
              key={i}
              className="fade-in-section hover-lift rounded-xl border border-temple-gold/20 bg-card p-6 shadow-sm group"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <span className="text-4xl block mb-4 group-hover:scale-110 transition-transform duration-300">{s.icon}</span>
              <h3 className="font-heading font-bold text-base text-foreground mb-1">{s.titleGuj}</h3>
              <p className="text-xs text-temple-saffron font-medium mb-3 italic">{s.title}</p>
              <p className="text-sm text-foreground/80 leading-relaxed mb-2">{s.descGuj}</p>
              <p className="text-xs text-muted-foreground leading-relaxed italic">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
