import Navbar from '@/components/temple/Navbar';
import Festivals from '@/components/temple/Festivals';
import Footer from '@/components/temple/Footer';
import WhatsAppButton from '@/components/temple/WhatsAppButton';

const Events = () => (
  <>
    <Navbar />
    <div className="pt-[60px]">
      <Festivals />
    </div>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Events;
