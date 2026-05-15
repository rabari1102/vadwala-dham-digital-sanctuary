import { useSiteSettings } from '../context/SiteSettingsContext';
import useFetch from '../hooks/useFetch';
import { getBanners, getActivities, getFestivals, getGalleryItems } from '../api/apiService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import HeroSlider from '../components/home/HeroSlider';
import IntroSection from '../components/home/IntroSection';
import ServiceCards from '../components/home/ServiceCards';
import FestivalSection from '../components/home/FestivalSection';
import GalleryPreview from '../components/home/GalleryPreview';
import DonateCTA from '../components/home/DonateCTA';
import ContactSummary from '../components/home/ContactSummary';

export default function HomePage() {
  const { settings } = useSiteSettings();
  const { data: banners, loading: bl } = useFetch(() => getBanners(), []);
  const { data: activities, loading: al } = useFetch(() => getActivities(), []);
  const { data: festivals, loading: fl } = useFetch(() => getFestivals(), []);
  const { data: galleryItems, loading: gl } = useFetch(() => getGalleryItems({ limit: 6 }), []);

  if (bl && al && fl && gl) return <LoadingSpinner />;

  return (
    <>
      <HeroSlider banners={banners || []} />
      <IntroSection
        title={settings?.introTitle}
        content={settings?.introContent}
        image={settings?.introImage}
      />
      <ServiceCards activities={activities || []} />
      <FestivalSection festivals={festivals || []} />
      <GalleryPreview items={galleryItems || []} />
      <DonateCTA title={settings?.donateCtaTitle} text={settings?.donateCtaText} />
      <ContactSummary />
    </>
  );
}
