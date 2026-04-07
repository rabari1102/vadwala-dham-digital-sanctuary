import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const services = [
  { icon: '🍛', title: 'Annakshetra (Food Hall)', desc: '24-hour free meals served daily to 1,000–1,500 pilgrims, saints and sadhus every day. Inspired by Mata Annapurna\'s divine presence.' },
  { icon: '🐄', title: 'Gaushala (Cow Shelter)', desc: 'Two Gaushalas: (1) Shri Vadwala Mandir Gaushala (2) Shri Vateshwar Gaushala — Jegadwa. Breeding and protection of high-quality indigenous cows.' },
  { icon: '📚', title: 'Educational Institutions', desc: 'Three institutions: Sadguru Shri Gomatidasbapu Kumar Chhatralaya (Boys\' Hostel), Sadguru Shri Kalyandasbapu Kanya Chhatralaya (Girls\' Hostel), Shri Vadwala Dev Saraswati Vidhyalay (School).' },
  { icon: '🏨', title: 'Dharmashala (Pilgrim Rest Houses)', desc: 'Comfortable pilgrim rest houses at: Shri Raghuvir Dham — Dakor and Shri Kalyan Gurudham — Junagadh.' },
  { icon: '🪔', title: 'Mahakumbh Annakshetra', desc: 'Every 12 years during the Mahakumbh, the temple runs free food service at: Ujjain | Nashik | Prayagraj (Allahabad) | Haridwar.' },
  { icon: '🤝', title: 'Emergency Relief', desc: 'During disasters and emergencies: Vastraadan (Clothing Donation) and Annaadan (Food Donation) for those in need.' },
];

const Services = () => {
  const containerRef = useFadeInAll();

  return (
    <section id="services" className="py-16 md:py-24 mandala-bg">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">સેવા અને પ્રવૃત્તિઓ</h2>
          <p className="text-lg text-muted-foreground font-heading italic">Services & Activities</p>
          <LotusDivider />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((s, i) => (
            <div key={i} className="fade-in-section hover-lift rounded-xl border border-temple-gold/20 bg-card p-6 shadow-sm text-center" style={{ transitionDelay: `${i * 100}ms` }}>
              <span className="text-4xl block mb-4">{s.icon}</span>
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
