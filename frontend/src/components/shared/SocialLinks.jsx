import './SocialLinks.css';

// Used until the admin fills in the links under Site Settings
const DEFAULT_URLS = {
  youtube: 'https://youtube.com/@dudhrejvadwala',
  instagram: 'https://instagram.com/dudhrejvadwala',
  facebook: 'https://facebook.com/dudhrejvadwala',
};

function YouTubeLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  );
}

function InstagramLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.2">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.4" />
      <circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookLogo() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path fill="currentColor" d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z" />
    </svg>
  );
}

const PLATFORMS = [
  { id: 'youtube', label: 'YouTube', settingKey: 'youtubeUrl', match: /youtu/i, Logo: YouTubeLogo },
  { id: 'instagram', label: 'Instagram', settingKey: 'instagramUrl', match: /instagram/i, Logo: InstagramLogo },
  { id: 'facebook', label: 'Facebook', settingKey: 'facebookUrl', match: /facebook|fb\.com/i, Logo: FacebookLogo },
];

/** Resolve each platform's URL: Site Settings field → any matching legacy socialLinks entry → default. */
function resolveLinks(settings = {}, contact = {}) {
  const legacy = [...(settings.socialLinks || []), ...(contact.socialLinks || [])]
    .filter((link) => link?.url && link.isActive !== false);

  return PLATFORMS.map((platform) => {
    const fromLegacy = legacy.find((link) => platform.match.test(`${link.platform} ${link.icon} ${link.url}`));
    return { ...platform, url: settings[platform.settingKey] || fromLegacy?.url || DEFAULT_URLS[platform.id] };
  }).filter((link) => link.url);
}

/**
 * YouTube / Instagram / Facebook brand logos.
 * variant "icons": round brand-coloured buttons (footer)
 * variant "pills": logo + name (contact page)
 */
export default function SocialLinks({ settings, contact, variant = 'icons', className = '' }) {
  const links = resolveLinks(settings, contact);
  if (links.length === 0) return null;

  return (
    <div className={`social-links social-links--${variant} ${className}`}>
      {links.map(({ id, label, url, Logo }) => (
        <a
          key={id}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={`social-link social-link--${id}`}
          aria-label={`${label} (opens in a new tab)`}
          title={label}
        >
          <span className="social-link__logo"><Logo /></span>
          {variant === 'pills' && <span className="social-link__label">{label}</span>}
        </a>
      ))}
    </div>
  );
}
