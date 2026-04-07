import { useFadeInAll } from '@/hooks/useFadeIn';
import LotusDivider from './LotusDivider';

const purposes = ['Annakshetra', 'Gaushala', 'Education', 'Temple Maintenance', 'Festival'];

const Donate = () => {
  const containerRef = useFadeInAll();

  return (
    <section id="donate" className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4" ref={containerRef}>
        <div className="fade-in-section text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">ડોનેશન</h2>
          <p className="text-base md:text-lg text-muted-foreground font-heading italic max-w-xl mx-auto">
            આપનો સહયોગ આ સેવા ને ટકાવી રાખે છે — Your support sustains these divine services
          </p>
          <LotusDivider />
        </div>

        <div className="fade-in-section max-w-3xl mx-auto">
          <div className="rounded-2xl border-2 border-temple-gold/30 bg-card p-8 md:p-10 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-shrink-0 w-48 h-48 rounded-xl border-2 border-dashed border-temple-gold/50 bg-temple-gold/5 flex flex-col items-center justify-center text-center p-4">
                <span className="text-3xl mb-2">📱</span>
                <p className="text-sm font-heading font-semibold text-foreground">Scan to Donate via UPI</p>
                <p className="text-xs text-muted-foreground mt-1">QR Code</p>
              </div>

              <div className="flex-1 text-center md:text-left">
                <h3 className="font-heading font-bold text-xl text-foreground mb-3">Shri Vadwala Mandir Dudhrejdham</h3>
                <p className="text-sm text-muted-foreground mb-4">FCRA & 80G eligible donations</p>

                <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                  {purposes.map((p) => (
                    <span key={p} className="rounded-full border border-temple-gold/30 bg-temple-gold/10 px-3 py-1 text-xs font-medium text-temple-saffron cursor-pointer hover:bg-temple-gold/30 transition-colors">{p}</span>
                  ))}
                </div>

                <a href="#" className="inline-flex items-center gap-2 rounded-full bg-temple-gold px-8 py-3 text-base font-bold text-temple-dark hover:shadow-lg transition-all">🙏 Donate Now</a>

                <p className="text-xs text-muted-foreground mt-4">For bank transfer details, please contact: <strong>96879 21008</strong></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Donate;
