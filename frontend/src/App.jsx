import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './context/SiteSettingsContext';
import { LanguageProvider } from './context/LanguageContext';
import ScrollToTop from './components/shared/ScrollToTop';
import AnnouncementBar from './components/layout/AnnouncementBar';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import HistoryPage from './pages/HistoryPage';
import GalleryPage from './pages/GalleryPage';
import VideosPage from './pages/VideosPage';
import DonatePage from './pages/DonatePage';
import ContactPage from './pages/ContactPage';
import ActivitiesPage from './pages/ActivitiesPage';
import DhajaPage from './pages/DhajaPage';
import GaushalaPage from './pages/GaushalaPage';
import GuruDetailPage from './pages/GuruDetailPage';
import TithisPage from './pages/TithisPage';
import NotFoundPage from './pages/NotFoundPage';
import AdminApp from './admin/AdminApp';

function PublicLayout() {
  return (
    <LanguageProvider>
      <SiteProvider>
        <a href="#main-content" className="skip-nav">
          Skip to main content
        </a>
        <AnnouncementBar />
        <Navbar />
        <main id="main-content">
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
        <Route path="/admin/*" element={<AdminApp />} />
        <Route path="/*" element={<PublicLayout />} />
      </Routes>
    </BrowserRouter>
  );
}
