import { useSiteSettings } from '../../context/SiteSettingsContext';
import { Megaphone } from 'lucide-react';
import './AnnouncementBar.css';

export default function AnnouncementBar() {
  const { announcements } = useSiteSettings();
  const active = announcements?.filter(a => a.isActive);
  if (!active || active.length === 0) return null;

  return (
    <div className="announcement-bar" id="announcement-bar">
      <div className="announcement-bar__inner">
        <Megaphone size={16} />
        <div className="announcement-bar__marquee">
          <div className="announcement-bar__track">
            {active.map((a, i) => (
              <span key={i} className="announcement-bar__item">
                {a.title} {i < active.length - 1 ? '  ●  ' : ''}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
