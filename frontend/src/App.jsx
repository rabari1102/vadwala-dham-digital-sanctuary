import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './context/SiteSettingsContext';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/shared/ScrollToTop';
import LoadingSpinner from './components/shared/LoadingSpinner';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';

// Every other route is split into its own chunk so the first page load stays small.
const pageLoaders = {
  history: () => import('./pages/HistoryPage'),
  gallery: () => import('./pages/GalleryPage'),
  videos: () => import('./pages/VideosPage'),
  donate: () => import('./pages/DonatePage'),
  contact: () => import('./pages/ContactPage'),
  activities: () => import('./pages/ActivitiesPage'),
  dhaja: () => import('./pages/DhajaPage'),
  gaushala: () => import('./pages/GaushalaPage'),
  tithis: () => import('./pages/TithisPage'),
  guru: () => import('./pages/GuruDetailPage'),
};

const HistoryPage = lazy(pageLoaders.history);
const GalleryPage = lazy(pageLoaders.gallery);
const VideosPage = lazy(pageLoaders.videos);
const DonatePage = lazy(pageLoaders.donate);
const ContactPage = lazy(pageLoaders.contact);
const ActivitiesPage = lazy(pageLoaders.activities);
const DhajaPage = lazy(pageLoaders.dhaja);
const GaushalaPage = lazy(pageLoaders.gaushala);
const TithisPage = lazy(pageLoaders.tithis);
const GuruDetailPage = lazy(pageLoaders.guru);
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AdminApp = lazy(() => import('./admin/AdminApp'));

function PageFallback() {
  return (
    <div className="page-fallback">
      <LoadingSpinner />
    </div>
  );
}

// Warm up the other public page chunks once the browser is idle, so navigation feels instant.
function usePrefetchPages() {
  useEffect(() => {
    const prefetch = () => Object.values(pageLoaders).forEach((load) => load().catch(() => {}));
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(prefetch, { timeout: 4000 });
      return () => window.cancelIdleCallback(id);
    }
    const id = setTimeout(prefetch, 2500);
    return () => clearTimeout(id);
  }, []);
}

function PublicLayout() {
  usePrefetchPages();

  return (
    <LanguageProvider>
      <SiteProvider>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main-content">
          <Suspense fallback={<PageFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/videos" element={<VideosPage />} />
              <Route path="/donate" element={<DonatePage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/activities" element={<ActivitiesPage />} />
              <Route path="/dhaja" element={<DhajaPage />} />
              <Route path="/gaushala" element={<GaushalaPage />} />
              <Route path="/tithis" element={<TithisPage />} />
              <Route path="/gurus/:slug" element={<GuruDetailPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </SiteProvider>
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route
          path="/admin/*"
          element={(
            <Suspense fallback={<PageFallback />}>
              <AdminApp />
            </Suspense>
          )}
        />
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
