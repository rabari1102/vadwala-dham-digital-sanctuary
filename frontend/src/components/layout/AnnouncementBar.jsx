import { useSiteSettings } from '../../context/SiteSettingsContext';
import { useLanguage } from '../../context/LanguageContext';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  const { announcements } = useSiteSettings();
  const { tr, t } = useLanguage();
  const active = announcements?.filter(a => a.isActive);
  if (!active || active.length === 0) return null;

  const text = active.map(a => tr(a.title)).join('   ●   ');

  return (
    <div className="announcement-bar" id="announcement-bar" role="status" aria-label="Announcements">
      <span className="announcement-bar__label">નવીનતમ સમાચાર</span>
      <p className="announcement-bar__text">{text}</p>
      <span className="announcement-bar__arrow">→</span>
    </div>
  );
}
