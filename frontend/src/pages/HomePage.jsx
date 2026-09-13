import { useSiteSettings } from '../context/SiteSettingsContext';
import useFetch from '../hooks/useFetch';
import { getHomeBootstrap } from '../api/apiService';
import FloatingDonateButton from '../components/shared/FloatingDonateButton';
import HeroSlider from '../components/home/HeroSlider';
import FestivalSection from '../components/home/FestivalSection';
import ServiceCards from '../components/home/ServiceCards';
import GuruParampara from '../components/home/GuruParampara';
import GuruDarshan from '../components/home/GuruDarshan';
import IntroSection from '../components/home/IntroSection';

const EMPTY = [];

export default function HomePage() {
  const { settings } = useSiteSettings();
  // Banners, festivals and gurus arrive in a single request; the page shell renders immediately
  const { data } = useFetch('home', getHomeBootstrap, { persist: true });

  return (
    <>
      <HeroSlider banners={data?.banners || EMPTY} loading={!data} />
      <GuruParampara gurus={data?.gurus || EMPTY} />
      <GuruDarshan />
      <FestivalSection festivals={data?.festivals || EMPTY} />
      <ServiceCards />
      <IntroSection
        title={settings?.introTitle}
        content={settings?.introContent}
        image={settings?.introImage}
      />
      <FloatingDonateButton />
    </>
  );
}
