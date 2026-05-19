import { useSiteSettings } from '../context/SiteSettingsContext';
import useFetch from '../hooks/useFetch';
import { getBanners, getActivities, getFestivals } from '../api/apiService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import FloatingDonateButton from '../components/shared/FloatingDonateButton';
import HeroSlider from '../components/home/HeroSlider';
import FestivalSection from '../components/home/FestivalSection';
import ServiceCards from '../components/home/ServiceCards';
import IntroSection from '../components/home/IntroSection';

export default function HomePage() {
  const { settings } = useSiteSettings();
  const { data: banners, loading: bl } = useFetch(() => getBanners(), []);
  const { data: activities, loading: al } = useFetch(() => getActivities(), []);
  const { data: festivals, loading: fl } = useFetch(() => getFestivals(), []);

  if (bl && al && fl) return <LoadingSpinner />;

  return (
    <>
      <HeroSlider banners={banners || []} />
      <FestivalSection festivals={festivals || []} />
      <ServiceCards activities={activities || []} />
      <IntroSection
        title={settings?.introTitle}
        content={settings?.introContent}
        image={settings?.introImage}
      />
      <FloatingDonateButton />
    </>
  );
}
