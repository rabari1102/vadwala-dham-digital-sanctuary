import useFetch from '../hooks/useFetch';
import { getVideos } from '../api/apiService';
import LoadingSpinner from '../components/shared/LoadingSpinner';
import EmptyState from '../components/shared/EmptyState';
import SectionTitle from '../components/shared/SectionTitle';
import { getImageUrl } from '../utils/helpers';
import './VideosPage.css';

export default function VideosPage() {
  const { data: videos, loading: vl } = useFetch(() => getVideos({ type: 'video' }), []);
  const { data: reels, loading: rl } = useFetch(() => getVideos({ type: 'reel' }), []);

  if (vl || rl) return <LoadingSpinner />;

  return (
    <>
      <div className="page-banner">
        <div className="page-banner__content">
          <h1 className="page-banner__title">વિડીયો અને રીલ્સ</h1>
          <p className="page-banner__subtitle">મંદિરના ઉત્સવો અને દર્શનના વિડીયો</p>
        </div>
      </div>

      {/* Videos */}
      <section className="section section--white">
        <div className="container">
          <SectionTitle title="Latest Videos" />
          {(!videos || videos.length === 0) ? (
            <EmptyState message="હાલમાં કોઈ વિડીયો ઉપલબ્ધ નથી" icon="🎬" />
          ) : (
            <div className="video-grid stagger">
              {videos.map((v, i) => (
                <div key={v._id || i} className="video-card animate-fade-in-up">
                  <div className="video-card__thumb">
                    {v.embedUrl ? (
                      <iframe
                        src={v.embedUrl}
                        title={v.title}
                        allowFullScreen
                        loading="lazy"
                      />
                    ) : (
                      <img src={getImageUrl(v.thumbnail)} alt={v.title} />
                    )}
                  </div>
                  <div className="video-card__info">
                    <h3 className="video-card__title">{v.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Reels */}
      <section className="section section--ivory">
        <div className="container">
          <SectionTitle title="Latest Reels" />
          {(!reels || reels.length === 0) ? (
            <EmptyState message="હાલમાં કોઈ રીલ્સ ઉપલબ્ધ નથી" icon="📱" />
          ) : (
            <div className="reels-grid stagger">
              {reels.map((r, i) => (
                <div key={r._id || i} className="reel-card animate-fade-in-up">
                  <div className="reel-card__thumb">
                    {r.embedUrl ? (
                      <iframe src={r.embedUrl} title={r.title} allowFullScreen loading="lazy" />
                    ) : (
                      <img src={getImageUrl(r.thumbnail)} alt={r.title} />
                    )}
                  </div>
                  <p className="reel-card__title">{r.title}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
