import { useSiteSettings } from '../../context/SiteSettingsContext';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  const { announcements } = useSiteSettings();
  const active = announcements?.filter(a => a.isActive);
  if (!active || active.length === 0) return null;

  const text = active.map(a => a.title).join('   ●   ');

  return (
    <div className="announcement-bar" id="announcement-bar" role="marquee" aria-label="Announcements">
      <div className="announcement-bar__track">
        <span className="announcement-bar__text">{text}   ●   {text}</span>
      </div>
    </div>
  );
}
