import Navbar from '@/components/temple/Navbar';
import Hero from '@/components/temple/Hero';
import About from '@/components/temple/About';
import AcharyaParampara from '@/components/temple/AcharyaParampara';
import Services from '@/components/temple/Services';
import Festivals from '@/components/temple/Festivals';
import DhajaChadava from '@/components/temple/DhajaChadava';
import Gallery from '@/components/temple/Gallery';
import Donate from '@/components/temple/Donate';
import Contact from '@/components/temple/Contact';
import Footer from '@/components/temple/Footer';
import WhatsAppButton from '@/components/temple/WhatsAppButton';

const Index = () => (
  <>
    <Navbar />
    <Hero />
    <About />
    <AcharyaParampara />
    <Services />
    <Festivals />
    <DhajaChadava />
    <Gallery />
    <Donate />
    <Contact />
    <Footer />
    <WhatsAppButton />
  </>
);

export default Index;
