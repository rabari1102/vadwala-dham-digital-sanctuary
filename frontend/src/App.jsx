import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SiteProvider } from './context/SiteSettingsContext';
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
import AdminApp from './admin/AdminApp';

function PublicLayout() {
  return (
    <SiteProvider>
      <AnnouncementBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/donate" element={<DonatePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/activities" element={<ActivitiesPage />} />
        </Routes>
      </main>
      <Footer />
    </SiteProvider>
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
