import Navbar from '@/components/temple/Navbar';
import GalleryComponent from '@/components/temple/Gallery';
import Footer from '@/components/temple/Footer';
import WhatsAppButton from '@/components/temple/WhatsAppButton';

const GalleryPage = () => (
  <>
    <Navbar />
    <div className="pt-[60px]">
      <GalleryComponent />
    </div>
    <Footer />
    <WhatsAppButton />
  </>
);

export default GalleryPage;
