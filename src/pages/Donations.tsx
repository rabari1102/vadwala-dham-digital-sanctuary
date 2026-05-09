import Navbar from '@/components/temple/Navbar';
import Donate from '@/components/temple/Donate';
import Footer from '@/components/temple/Footer';
import WhatsAppButton from '@/components/temple/WhatsAppButton';

const Donations = () => (
  <>
    <Navbar />
    <div className="pt-[60px]">
      <Donate />
    </div>
    <Footer />
    <WhatsAppButton />
  </>
);

export default Donations;
