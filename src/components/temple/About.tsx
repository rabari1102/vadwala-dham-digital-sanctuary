import { useFadeIn } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const facts = [
  {
    icon: '🏔️',
    text: 'The land of Saurashtra (Panchal/Zhalavad region, now Surendranagar district) is considered Dev Bhoomi — home of saints, warriors and satis.',
  },
  {
    icon: '🏛️',
    text: 'The ancient city of Vardhmanpuri (now Wadhwan) is located in this region. The temple is in Dudhrej village, inspired by the 21st disciple of Shrimad Bhakaracharya\'s tradition — Shri Nilkanthswami.',
  },
  {
    icon: '🙏',
    text: 'The presiding deity is Shri Vatapati (Vadwala Dev) — widely revered across Gujarat as an avatar of Lord Ramchandraji.',
  },
  {
    icon: '🏞️',
    text: 'Situated on the northern bank of the Umiya River (ancient Unmatt Ganga), with a beautiful adjacent lake called "Payasar" or "Dugdhasar".',
  },
  {
    icon: '🚪',
    text: 'The east-facing temple has THREE grand entrance gates: 🦁 Sinhadvara (Lion Gate), 🐂 Nandidvara, 🐘 Hastidvara (Elephant Gate).',
  },
  {
    icon: '✨',
    text: 'FIVE deities enshrined (left to right): Shri Dwarkanaathji, Shri Vatanath, Bhagwan Shri Ramchandraji, Swami Shatpragnya Dasji, Bhagwan Shri Shankar.',
  },
  {
    icon: '🌳',
    text: 'A magnificent ancient banyan tree (Vatavriksha) grown from a twig by the first Acharya Shri Shatpragnya Swamiji stands on the eastern side.',
  },
  {
    icon: '🕯️',
    text: 'The Samadhis (sacred tombs) of all Acharyas from Shatpragnya Swamiji onward are on the southern side — witnesses to 500+ years of glorious tradition.',
  },
  {
    icon: '🍽️',
    text: 'The Annakshetra (food hall) houses Mata Annapurna — millions of devotees have received prasad here. Guestrooms/Yatri Nivas available for pilgrims.',
  },
];

const About = () => {
  const ref = useFadeIn();

  return (
    <section id="history" className="py-16 md:py-24 mandala-bg">
      <div className="container mx-auto px-4">
        <div ref={ref} className="fade-in-section text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">
            વડવાળા ધામ — ઐતિહાસિક પરિચય
          </h2>
          <p className="text-lg text-muted-foreground font-heading italic">
            History of Vadwala Dham
          </p>
          <LotusDivider />
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {facts.map((f, i) => {
            const cardRef = useFadeIn();
            return (
              <div
                key={i}
                ref={cardRef}
                className="fade-in-section hover-lift rounded-xl border border-temple-gold/20 bg-card p-6 shadow-sm"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <span className="text-2xl mb-3 block">{f.icon}</span>
                <p className="text-foreground/90 leading-relaxed text-sm md:text-base">
                  {f.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
