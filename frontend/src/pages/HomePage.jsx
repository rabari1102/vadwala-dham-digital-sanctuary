import { useSiteSettings } from '../context/SiteSettingsContext';
import useFetch from '../hooks/useFetch';
import { getBanners, getActivities, getFestivals, getGurus } from '../api/apiService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import FloatingDonateButton from '../components/shared/FloatingDonateButton';
import HeroSlider from '../components/home/HeroSlider';
import FestivalSection from '../components/home/FestivalSection';
import ServiceCards from '../components/home/ServiceCards';
import GuruParampara from '../components/home/GuruParampara';
import GuruDarshan from '../components/home/GuruDarshan';
import IntroSection from '../components/home/IntroSection';

export default function HomePage() {
  const { settings } = useSiteSettings();
  const { data: banners, loading: bl } = useFetch(() => getBanners(), []);
  const { data: activities, loading: al } = useFetch(() => getActivities(), []);
  const { data: festivals, loading: fl } = useFetch(() => getFestivals(), []);
  const { data: gurus, loading: gl } = useFetch(() => getGurus(), []);

  if (bl && al && fl && gl) return <LoadingSpinner />;

  return (
    <>
      <HeroSlider banners={banners || []} />
      <GuruParampara gurus={gurus || []} />
      <GuruDarshan />
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
