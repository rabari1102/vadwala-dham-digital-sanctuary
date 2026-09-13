import { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { getVideos } from '../api/apiService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';
import { useLanguage } from '../context/LanguageContext';
import './VideosPage.css';

/* ── Extract YouTube video ID from embed URL ── */
function getYouTubeId(url) {
  if (!url) return null;
  const match = url.match(/(?:embed\/|watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

/* ── Click-to-play YouTube component ── */
function YouTubePlayer({ embedUrl, title, thumbnail }) {
  const [playing, setPlaying] = useState(false);
  const videoId = getYouTubeId(embedUrl);

  if (playing && videoId) {
    return (
      <div className="video-card__thumb">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title={title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  const thumbSrc = videoId
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : thumbnail || '';

  return (
    <button
      type="button"
      className="video-card__thumb video-card__thumb--clickable"
      onClick={() => setPlaying(true)}
      aria-label={`Play: ${title}`}
    >
      {thumbSrc ? (
        <img src={thumbSrc} alt={title} loading="lazy" decoding="async" />
      ) : (
        <div className="video-card__placeholder">{title}</div>
      )}
      {videoId && (
        <span className="video-play-overlay" aria-hidden="true">
          <span className="material-symbols-outlined">play_arrow</span>
        </span>
      )}
    </button>
  );
}

export default function VideosPage() {
  const { t, tr } = useLanguage();
  const { data: videos, loading: vl } = useFetch('videos:video', () => getVideos({ type: 'video' }));
  const { data: reels, loading: rl } = useFetch('videos:reel', () => getVideos({ type: 'reel' }));

  if (vl || rl) return <LoadingSpinner />;

  /* Split featured (order=1) from rest */
  const sorted = [...(videos || [])].sort((a, b) => (a.order || 0) - (b.order || 0));
  const featured = sorted.length > 0 ? sorted[0] : null;
  const rest = sorted.slice(1);

  return (
    <>
      {/* Dark Hero */}
      <section className="videos-hero">
        <div className="container">
          <span className="videos-hero__eyebrow">Live Darshan</span>
          <h1 className="videos-hero__title">{t('videosTitle')}</h1>
          <p className="videos-hero__sub">{t('videosSubtitle')}</p>
        </div>
      </section>

      {/* Videos */}
      <section className="video-section">
        <div className="container">
          <SectionTitle eyebrow="Latest" title={t('latestVideos')} />

          {(!videos || videos.length === 0) ? (
            <EmptyState message={t('noVideos')} icon="🎬" />
          ) : (
            <>
              {/* ── Featured / Highlighted Video ── */}
              {featured && (
                <div className="video-featured">
                  <div className="video-featured__card">
                    <YouTubePlayer
                      embedUrl={featured.embedUrl}
                      title={tr(featured.title)}
                      thumbnail={featured.thumbnail}
                    />
                    <div className="video-featured__info">
                      <span className="video-featured__badge">
                        <span className="material-symbols-outlined">star</span>
                        Featured
                      </span>
                      <h3 className="video-featured__title">{tr(featured.title)}</h3>
                    </div>
                  </div>
                </div>
              )}

              {/* ── Other Videos Grid ── */}
              {rest.length > 0 && (
                <div className="video-grid">
                  {rest.map((v, i) => (
                    <div key={v._id || i} className="video-card">
                      <YouTubePlayer
                        embedUrl={v.embedUrl}
                        title={tr(v.title)}
                        thumbnail={v.thumbnail}
                      />
                      <div className="video-card__info">
                        <h3 className="video-card__title">{tr(v.title)}</h3>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Reels */}
      <section className="reels-section">
        <div className="container">
          <SectionTitle eyebrow="Shorts" title={t('latestReels')} />
          {(!reels || reels.length === 0) ? (
            <EmptyState message={t('noReels')} icon="📱" />
          ) : (
            <div className="reels-grid">
              {reels.map((r, i) => (
                <div key={r._id || i} className="reel-card">
                  <YouTubePlayer
                    embedUrl={r.embedUrl}
                    title={tr(r.title)}
                    thumbnail={r.thumbnail}
                  />
                  <p className="reel-card__title">{tr(r.title)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
