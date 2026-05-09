import Navbar from '@/components/temple/Navbar';
import About from '@/components/temple/About';
import AcharyaParampara from '@/components/temple/AcharyaParampara';
import Footer from '@/components/temple/Footer';
import WhatsAppButton from '@/components/temple/WhatsAppButton';

const AboutPage = () => (
  <>
    <Navbar />
    <div className="pt-[60px]">
      <About />
      <AcharyaParampara />
    </div>
    <Footer />
    <WhatsAppButton />
  </>
);

export default AboutPage;
