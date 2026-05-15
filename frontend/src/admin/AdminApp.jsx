import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider } from './context/ToastContext';
import AdminLayout from './components/AdminLayout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CrudPage from './pages/CrudPage';
import SingletonPage from './pages/SingletonPage';
import './admin.css';

function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth();
  if (loading) return <div style={{ padding: '3rem', textAlign: 'center' }}>Loading...</div>;
  return admin ? children : <Navigate to="/admin/login" replace />;
}

// ── MODULE CONFIGS ──
const BANNERS = {
  title: 'Banners',
  endpoint: 'banners',
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'image', label: 'Image' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'image', label: 'Image URL', type: 'image', fullWidth: true },
    { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Link', type: 'text' },
    { key: 'order', label: 'Display Order', type: 'number' },
  ],
};

const HISTORY = {
  title: 'History Sections',
  endpoint: 'history-sections',
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'year', label: 'Year/Period', type: 'text' },
    { key: 'content', label: 'Content', type: 'textarea', fullWidth: true },
    { key: 'image', label: 'Image URL', type: 'image', fullWidth: true },
    { key: 'order', label: 'Order', type: 'number' },
  ],
};

const ACHARYA = {
  title: 'Acharya Parampara',
  endpoint: 'acharya-parampara',
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'order', label: 'Order' },
    { key: 'periodStart', label: 'Period' },
  ],
  fields: [
    { key: 'name', label: 'Acharya Name', type: 'text', required: true },
    { key: 'periodStart', label: 'Period Start', type: 'text' },
    { key: 'periodEnd', label: 'Period End', type: 'text' },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'description', label: 'Description', type: 'textarea', fullWidth: true },
    { key: 'image', label: 'Image URL', type: 'image' },
  ],
};

const ACTIVITIES = {
  title: 'Activities',
  endpoint: 'activities',
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'slug', label: 'Slug', type: 'text' },
    { key: 'shortDescription', label: 'Short Description', type: 'text', fullWidth: true },
    { key: 'description', label: 'Full Description', type: 'textarea', fullWidth: true },
    { key: 'icon', label: 'Icon Name', type: 'select', options: [
      { value: 'Utensils', label: 'Utensils' }, { value: 'Heart', label: 'Heart' },
      { value: 'GraduationCap', label: 'GraduationCap' }, { value: 'Sparkles', label: 'Sparkles' },
      { value: 'Home', label: 'Home' }, { value: 'HandHeart', label: 'HandHeart' },
    ]},
    { key: 'category', label: 'Category', type: 'select', options: [
      { value: 'seva', label: 'Seva' }, { value: 'education', label: 'Education' },
      { value: 'festival', label: 'Festival' }, { value: 'gaushala', label: 'Gaushala' },
    ]},
    { key: 'image', label: 'Image URL', type: 'image' },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'isFeatured', label: 'Show on Homepage', type: 'checkbox' },
  ],
};

const FESTIVALS = {
  title: 'Festivals',
  endpoint: 'festivals',
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'image', label: 'Image' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', fullWidth: true },
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'image', label: 'Image URL', type: 'image', fullWidth: true },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'isUpcoming', label: 'Mark as Upcoming', type: 'checkbox' },
  ],
};

const GALLERY_CATS = {
  title: 'Gallery Categories',
  endpoint: 'gallery-categories',
  columns: [
    { key: 'title', label: 'Category Name' },
    { key: 'slug', label: 'Slug' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Category Name', type: 'text', required: true },
    { key: 'slug', label: 'Slug', type: 'text' },
    { key: 'order', label: 'Order', type: 'number' },
  ],
};

const GALLERY_ITEMS = {
  title: 'Gallery Items',
  endpoint: 'gallery-items',
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'image', label: 'Image' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'image', label: 'Image URL', type: 'image', fullWidth: true },
    { key: 'categoryId', label: 'Category ID', type: 'text' },
    { key: 'caption', label: 'Caption', type: 'text' },
    { key: 'altText', label: 'Alt Text', type: 'text' },
    { key: 'order', label: 'Order', type: 'number' },
  ],
};

const VIDEOS = {
  title: 'Videos & Reels',
  endpoint: 'videos',
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'embedUrl', label: 'Embed URL (YouTube)', type: 'text', fullWidth: true },
    { key: 'type', label: 'Type', type: 'select', options: [
      { value: 'video', label: 'Video' }, { value: 'reel', label: 'Reel' },
    ]},
    { key: 'thumbnail', label: 'Thumbnail URL', type: 'image' },
    { key: 'description', label: 'Description', type: 'textarea', fullWidth: true },
    { key: 'order', label: 'Order', type: 'number' },
  ],
};

const DONATIONS = {
  title: 'Donation Items',
  endpoint: 'donation-items',
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', fullWidth: true },
    { key: 'icon', label: 'Icon', type: 'select', options: [
      { value: 'Utensils', label: 'Utensils' }, { value: 'Heart', label: 'Heart' },
      { value: 'GraduationCap', label: 'GraduationCap' }, { value: 'Building', label: 'Building' },
    ]},
    { key: 'order', label: 'Order', type: 'number' },
  ],
};

const PAYMENT = {
  title: 'Payment Info',
  endpoint: 'payment-info',
  columns: [
    { key: 'label', label: 'Label' },
    { key: 'type', label: 'Type' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', required: true },
    { key: 'type', label: 'Type', type: 'select', options: [
      { value: 'bank', label: 'Bank Transfer' }, { value: 'upi', label: 'UPI' }, { value: 'qr', label: 'QR Code' },
    ]},
    { key: 'details', label: 'Details', type: 'textarea', fullWidth: true },
    { key: 'order', label: 'Order', type: 'number' },
  ],
};

const ANNOUNCEMENTS = {
  title: 'Announcements',
  endpoint: 'announcements',
  columns: [
    { key: 'title', label: 'Title' },
    { key: 'type', label: 'Type' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true, fullWidth: true },
    { key: 'content', label: 'Content', type: 'textarea', fullWidth: true },
    { key: 'type', label: 'Type', type: 'select', options: [
      { value: 'general', label: 'General' }, { value: 'festival', label: 'Festival' },
      { value: 'urgent', label: 'Urgent' },
    ]},
    { key: 'isActive', label: 'Active on Website', type: 'checkbox' },
    { key: 'order', label: 'Order', type: 'number' },
  ],
};

const SEO = {
  title: 'SEO Settings',
  endpoint: 'seo',
  columns: [
    { key: 'pageSlug', label: 'Page' },
    { key: 'title', label: 'SEO Title' },
  ],
  fields: [
    { key: 'pageSlug', label: 'Page Slug', type: 'text', required: true },
    { key: 'title', label: 'SEO Title', type: 'text', fullWidth: true },
    { key: 'description', label: 'Meta Description', type: 'textarea', fullWidth: true },
    { key: 'ogImage', label: 'OG Image URL', type: 'image' },
  ],
};

const SETTINGS_FIELDS = [
  { key: 'siteName', label: 'Site Name (Gujarati)', type: 'text' },
  { key: 'siteNameEn', label: 'Site Name (English)', type: 'text' },
  { key: 'tagline', label: 'Tagline', type: 'text', fullWidth: true },
  { key: 'introTitle', label: 'Intro Section Title', type: 'text', fullWidth: true },
  { key: 'introContent', label: 'Intro Content', type: 'textarea', fullWidth: true },
  { key: 'introImage', label: 'Intro Image', type: 'image', fullWidth: true },
  { key: 'donateCtaTitle', label: 'Donate CTA Title', type: 'text' },
  { key: 'donateCtaText', label: 'Donate CTA Text', type: 'textarea' },
  { key: 'liveDarshanUrl', label: 'Live Darshan URL', type: 'text', fullWidth: true },
];

const CONTACT_FIELDS = [
  { key: 'address', label: 'Address', type: 'textarea', fullWidth: true },
  { key: 'website', label: 'Website', type: 'text' },
  { key: 'mapEmbedUrl', label: 'Google Map Embed URL', type: 'textarea', fullWidth: true },
];

export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="banners" element={<CrudPage {...BANNERS} />} />
            <Route path="history" element={<CrudPage {...HISTORY} />} />
            <Route path="acharya-parampara" element={<CrudPage {...ACHARYA} />} />
            <Route path="activities" element={<CrudPage {...ACTIVITIES} />} />
            <Route path="festivals" element={<CrudPage {...FESTIVALS} />} />
            <Route path="gallery-categories" element={<CrudPage {...GALLERY_CATS} />} />
            <Route path="gallery-items" element={<CrudPage {...GALLERY_ITEMS} />} />
            <Route path="videos" element={<CrudPage {...VIDEOS} />} />
            <Route path="donation-items" element={<CrudPage {...DONATIONS} />} />
            <Route path="payment-info" element={<CrudPage {...PAYMENT} />} />
            <Route path="announcements" element={<CrudPage {...ANNOUNCEMENTS} />} />
            <Route path="seo" element={<CrudPage {...SEO} />} />
            <Route path="settings" element={<SingletonPage title="⚙️ Site Settings" endpoint="settings" fields={SETTINGS_FIELDS} />} />
            <Route path="contact" element={<SingletonPage title="📞 Contact Info" endpoint="contact" fields={CONTACT_FIELDS} />} />
            <Route path="users" element={<CrudPage title="Users" endpoint="auth/users" columns={[{ key: 'name', label: 'Name' }, { key: 'email', label: 'Email' }, { key: 'role', label: 'Role' }]} fields={[{ key: 'name', label: 'Name', type: 'text' }, { key: 'email', label: 'Email', type: 'text' }, { key: 'role', label: 'Role', type: 'select', options: [{ value: 'superadmin', label: 'Super Admin' }, { value: 'admin', label: 'Admin' }, { value: 'editor', label: 'Editor' }] }]} />} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
