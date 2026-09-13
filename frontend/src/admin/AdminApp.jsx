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

const STATUS_OPTIONS = [
  { value: 'published', label: 'Published' },
  { value: 'draft', label: 'Draft' },
];

// ── MODULE CONFIGS ──
const BANNERS = {
  title: 'Banners',
  endpoint: 'banners',
  columns: [
    { key: 'image', label: 'Image' },
    { key: 'title', label: 'Title' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'subtitle', label: 'Subtitle', type: 'text' },
    { key: 'image', label: 'Banner Image', type: 'image', required: true },
    { key: 'ctaText', label: 'CTA Button Text', type: 'text' },
    { key: 'ctaLink', label: 'CTA Link', type: 'text' },
    { key: 'order', label: 'Display Order', type: 'number' },
  ],
};

const HISTORY = {
  title: 'History Sections',
  endpoint: 'history-sections',
  columns: [
    { key: 'image', label: 'Image' },
    { key: 'title', label: 'Title' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'year', label: 'Year/Period', type: 'text' },
    { key: 'content', label: 'Content', type: 'textarea', fullWidth: true, required: true },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'order', label: 'Order', type: 'number' },
  ],
};

const ACHARYA = {
  title: 'Acharya Parampara',
  endpoint: 'acharya-parampara',
  columns: [
    { key: 'image', label: 'Image' },
    { key: 'name', label: 'Name' },
    { key: 'order', label: 'Order' },
    { key: 'periodStart', label: 'Period' },
  ],
  fields: [
    { key: 'name', label: 'Acharya Name', type: 'text', required: true },
    { key: 'periodStart', label: 'Period Start', type: 'text' },
    { key: 'periodEnd', label: 'Period End', type: 'text' },
    { key: 'order', label: 'Order', type: 'number', required: true },
    { key: 'description', label: 'Description', type: 'textarea', fullWidth: true },
    { key: 'image', label: 'Portrait', type: 'image', crop: { aspect: 3 / 4 } },
  ],
};

const ACTIVITIES = {
  title: 'Activities',
  endpoint: 'activities',
  columns: [
    { key: 'image', label: 'Image' },
    { key: 'title', label: 'Title' },
    { key: 'category', label: 'Category' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
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
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'isFeatured', label: 'Show on Homepage', type: 'checkbox' },
  ],
};

const FESTIVALS = {
  title: 'Festivals',
  endpoint: 'festivals',
  columns: [
    { key: 'image', label: 'Image' },
    { key: 'title', label: 'Title' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Title', type: 'text', required: true },
    { key: 'description', label: 'Description', type: 'textarea', fullWidth: true },
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'image', label: 'Image', type: 'image' },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'isUpcoming', label: 'Mark as Upcoming', type: 'checkbox' },
  ],
};

const GALLERY_CATS = {
  title: 'Gallery Categories',
  endpoint: 'gallery-categories',
  columns: [
    { key: 'image', label: 'Cover' },
    { key: 'title', label: 'Category Name' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'title', label: 'Category Name', type: 'text', required: true },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'image', label: 'Cover Image (optional)', type: 'image' },
  ],
};

const GALLERY_ITEMS = {
  title: 'Gallery Items',
  endpoint: 'gallery-items',
  columns: [
    { key: 'image', label: 'Image' },
    { key: 'title', label: 'Title' },
    { key: 'categoryId', label: 'Category', render: (item) => item.categoryId?.title || '—' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'categoryId', label: 'Category', type: 'select', optionsEndpoint: 'gallery-categories', optionLabel: 'title', required: true },
    { key: 'title', label: 'Title', type: 'text' },
    { key: 'image', label: 'Photo', type: 'image', required: true },
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'status', label: 'Status', type: 'select', options: STATUS_OPTIONS },
  ],
  defaultValues: { status: 'published' },
  bulkUpload: { categoryField: 'categoryId', categoryEndpoint: 'gallery-categories' },
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
    { key: 'embedUrl', label: 'YouTube URL (embed or watch link)', type: 'text', fullWidth: true },
    { key: 'type', label: 'Type', type: 'select', options: [
      { value: 'video', label: 'Video' }, { value: 'reel', label: 'Reel' },
    ]},
    { key: 'order', label: 'Order', type: 'number' },
    { key: 'thumbnail', label: 'Custom Thumbnail (optional — YouTube thumbnail is used by default)', type: 'image' },
  ],
  defaultValues: { type: 'video' },
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
    { key: 'qrImage', label: 'QR', type: 'image' },
    { key: 'label', label: 'Label' },
    { key: 'type', label: 'Type' },
  ],
  fields: [
    { key: 'label', label: 'Label', type: 'text', required: true },
    { key: 'type', label: 'Type', type: 'select', required: true, options: [
      { value: 'bank', label: 'Bank Transfer' }, { value: 'upi', label: 'UPI' }, { value: 'qr', label: 'QR Code' },
    ]},
    { key: 'details', label: 'Details', type: 'textarea', fullWidth: true },
    { key: 'qrImage', label: 'QR Code Image', type: 'image' },
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
      { value: 'info', label: 'Info' }, { value: 'warning', label: 'Warning' },
    ]},
    { key: 'isActive', label: 'Active on Website', type: 'checkbox' },
    { key: 'order', label: 'Order', type: 'number' },
  ],
  defaultValues: { isActive: true, type: 'general' },
};

const SEO_PAGES = [
  { value: 'home', label: 'Home page' },
  { value: 'history', label: 'History' },
  { value: 'gallery', label: 'Photo Gallery' },
  { value: 'videos', label: 'Videos' },
  { value: 'activities', label: 'Seva & Activities' },
  { value: 'gaushala', label: 'Gaushala' },
  { value: 'dhaja', label: 'Dhaja' },
  { value: 'donate', label: 'Donate' },
  { value: 'contact', label: 'Contact' },
  { value: 'guru-kaniram-bapu', label: 'Guru page – Kaniram Bapu' },
  { value: 'guru-mukundram-bapu', label: 'Guru page – Mukundram Bapu' },
  { value: 'guru-nagardas-bapu', label: 'Guru page – Nagardas Bapu' },
];

const SEO = {
  title: 'SEO Settings',
  endpoint: 'seo',
  allowToggle: false,
  columns: [
    { key: 'pageSlug', label: 'Page', render: (item) => SEO_PAGES.find((p) => p.value === item.pageSlug)?.label || item.pageSlug },
    { key: 'title', label: 'SEO Title' },
  ],
  fields: [
    { key: 'pageSlug', label: 'Page', type: 'select', required: true, options: SEO_PAGES },
    { key: 'title', label: 'SEO Title', type: 'text', fullWidth: true },
    { key: 'description', label: 'Meta Description', type: 'textarea', fullWidth: true },
    { key: 'ogImage', label: 'Social Share Image', type: 'image' },
  ],
};

const GURUS = {
  title: 'Gurus',
  endpoint: 'gurus',
  allowBulkDelete: false,
  columns: [
    { key: 'primary_image', label: 'Photo', type: 'image', value: (item) => item.primary_image?.storage_key || item.primary_image?.image_url || '' },
    { key: 'short_title', label: 'Title/Name' },
    { key: 'role_title', label: 'Role' },
    { key: 'order', label: 'Order' },
  ],
  fields: [
    { key: 'full_name', label: 'Full Name', type: 'text', required: true, fullWidth: true },
    { key: 'short_title', label: 'Short Name / Title', type: 'text' },
    { key: 'role_title', label: 'Role Title', type: 'text' },
    { key: 'community_role', label: 'Community Role', type: 'text' },
    { key: 'key_associated_temple', label: 'Associated Temple', type: 'text', fullWidth: true },
    { key: 'primary_image', label: 'Main Profile Image', type: 'image', crop: { aspect: 3 / 4 } },
    { key: 'gallery_images', label: 'Guru Gallery Images', type: 'images', hint: 'Drag the arrows to reorder. The first image appears first on the website.' },
    { key: 'biography_short', label: 'Short Biography', type: 'textarea', fullWidth: true },
    { key: 'biography_full', label: 'Full Biography (HTML allowed)', type: 'textarea', fullWidth: true },
    { key: 'birth_date', label: 'Birth Date (e.g. 1945 or Date)', type: 'text' },
    { key: 'birthplace', label: 'Birthplace', type: 'text' },
    { key: 'order', label: 'Order', type: 'number' },
  ],
};

const USERS = {
  title: 'Users',
  endpoint: 'auth/users',
  allowToggle: false,
  allowBulkDelete: false,
  columns: [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Account' },
  ],
  fields: [
    { key: 'name', label: 'Name', type: 'text', required: true },
    { key: 'email', label: 'Email', type: 'text', required: true },
    { key: 'password', label: 'Password', type: 'password', required: true },
    { key: 'role', label: 'Role', type: 'select', required: true, options: [
      { value: 'superadmin', label: 'Super Admin' }, { value: 'admin', label: 'Admin' }, { value: 'editor', label: 'Editor' },
    ] },
    { key: 'status', label: 'Account Status', type: 'select', options: [
      { value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' },
    ] },
  ],
  defaultValues: { role: 'admin', status: 'active' },
};

const SETTINGS_FIELDS = [
  { key: 'siteName', label: 'Site Name (Gujarati)', type: 'text' },
  { key: 'siteNameEn', label: 'Site Name (English)', type: 'text' },
  { key: 'tagline', label: 'Tagline', type: 'text', fullWidth: true },
  { key: 'logo', label: 'Logo', type: 'image' },
  { key: 'introTitle', label: 'Intro Section Title', type: 'text', fullWidth: true },
  { key: 'introContent', label: 'Intro Content', type: 'textarea', fullWidth: true },
  { key: 'introImage', label: 'Intro Image', type: 'image' },
  { key: 'donateCtaTitle', label: 'Donate CTA Title', type: 'text' },
  { key: 'donateCtaText', label: 'Donate CTA Text', type: 'textarea' },
  { key: 'trustNote', label: 'Donation Trust Note', type: 'textarea', fullWidth: true },
  { key: 'liveDarshanUrl', label: 'Live Darshan URL', type: 'text', fullWidth: true },
  { key: 'youtubeUrl', label: 'YouTube channel link', type: 'text', fullWidth: true },
  { key: 'instagramUrl', label: 'Instagram page link', type: 'text', fullWidth: true },
  { key: 'facebookUrl', label: 'Facebook page link', type: 'text', fullWidth: true },
];

const CONTACT_FIELDS = [
  { key: 'address', label: 'Address', type: 'textarea', fullWidth: true },
  { key: 'website', label: 'Website', type: 'text' },
  { key: 'mapEmbedUrl', label: 'Google Map Embed URL', type: 'textarea', fullWidth: true },
];

// `key` makes React reset the table state when switching between modules
const crud = (config) => <CrudPage key={config.endpoint} {...config} />;

export default function AdminApp() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
            <Route index element={<DashboardPage />} />
            <Route path="banners" element={crud(BANNERS)} />
            <Route path="history" element={crud(HISTORY)} />
            <Route path="acharya-parampara" element={crud(ACHARYA)} />
            <Route path="gurus" element={crud(GURUS)} />
            <Route path="activities" element={crud(ACTIVITIES)} />
            <Route path="festivals" element={crud(FESTIVALS)} />
            <Route path="gallery-categories" element={crud(GALLERY_CATS)} />
            <Route path="gallery-items" element={crud(GALLERY_ITEMS)} />
            <Route path="videos" element={crud(VIDEOS)} />
            <Route path="donation-items" element={crud(DONATIONS)} />
            <Route path="payment-info" element={crud(PAYMENT)} />
            <Route path="announcements" element={crud(ANNOUNCEMENTS)} />
            <Route path="seo" element={crud(SEO)} />
            <Route path="settings" element={<SingletonPage key="settings" title="⚙️ Site Settings" endpoint="settings" fields={SETTINGS_FIELDS} />} />
            <Route path="contact" element={<SingletonPage key="contact" title="📞 Contact Info" endpoint="contact" fields={CONTACT_FIELDS} />} />
            <Route path="users" element={crud(USERS)} />
          </Route>
        </Routes>
      </ToastProvider>
    </AuthProvider>
  );
}
