import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const Contact = () => {
  const containerRef = useFadeInAll();

  return (
    <section id="contact" className="py-16 md:py-24 mandala-bg">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">સંપર્ક કરો</h2>
          <p className="text-lg text-muted-foreground font-heading italic">Get in Touch</p>
          <LotusDivider />
        </div>

        <div className="fade-in-section grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="rounded-xl border border-temple-gold/20 bg-card p-6 md:p-8 shadow-sm">
            <h3 className="font-heading font-bold text-xl text-foreground mb-6">Contact Information</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">📍</span>
                <p className="text-sm text-foreground/90 leading-relaxed">Shri Vadwala Mandir Dudhrejdham, Dudhrej, Wadhwan Taluka, Surendranagar, Gujarat — 363040</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📞</span>
                <div>
                  <a href="tel:9687921008" className="text-sm text-temple-saffron hover:underline font-medium">96879 21008</a>
                  <span className="mx-2 text-muted-foreground">|</span>
                  <a href="tel:9825568108" className="text-sm text-temple-saffron hover:underline font-medium">98255 68108</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xl">📧</span>
                <a href="mailto:dudhrejvadwala@gmail.com" className="text-sm text-temple-saffron hover:underline font-medium">dudhrejvadwala@gmail.com</a>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-xl">🕐</span>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-1">Darshan Timings</p>
                  <p className="text-sm text-muted-foreground">Morning: 6:00 AM – 12:00 PM</p>
                  <p className="text-sm text-muted-foreground">Evening: 4:00 PM – 9:00 PM</p>
                </div>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-temple-gold/20">
              <p className="text-sm font-semibold text-foreground mb-3">Follow Us</p>
              <div className="flex gap-4">
                {[
                  { icon: '▶️', label: 'YouTube' },
                  { icon: '📷', label: 'Instagram' },
                  { icon: '👤', label: 'Facebook' },
                ].map((s) => (
                  <a key={s.label} href="#" className="flex items-center gap-2 rounded-lg border border-temple-gold/20 bg-temple-gold/5 px-4 py-2 text-sm text-foreground hover:bg-temple-gold/20 transition-colors">
                    <span>{s.icon}</span>
                    <span className="hidden sm:inline">{s.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-temple-gold/20 bg-card overflow-hidden shadow-sm">
            <iframe
              title="Shri Vadwala Mandir Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3680!2d71.71667!3d22.71667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjLCsDQzJzAwLjAiTiA3McKwNDMnMDAuMCJF!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '400px' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
