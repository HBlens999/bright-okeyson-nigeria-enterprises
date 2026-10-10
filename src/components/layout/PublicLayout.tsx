import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { FloatingWhatsApp } from '../common/FloatingWhatsApp';
import { AnnouncementPopup } from '../common/AnnouncementPopup';
import { CartDrawer } from '../cart/CartDrawer';
import { useSettings } from '../../context/SettingsContext';
import { X, Volume2, Play, RotateCcw } from 'lucide-react';

const PromoVideoFloat: React.FC = () => {
  const { siteSettings } = useSettings();
  const [visible, setVisible] = React.useState(false);
  const [ended, setEnded] = React.useState(false);
  const [needsTap, setNeedsTap] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const showVideo = () => {
      if (!siteSettings.promo_video_enabled || !siteSettings.promo_video_url) return;
      setVisible(true);
      setEnded(false);
      setNeedsTap(false);
      const video = videoRef.current;
      // This call is made synchronously from the announcement-close user gesture.
      if (video) {
        video.currentTime = 0;
        video.muted = false;
        const attempt = video.play();
        if (attempt) attempt.catch(() => setNeedsTap(true));
      }
    };
    window.addEventListener('bo-announcement-closed', showVideo);
    return () => window.removeEventListener('bo-announcement-closed', showVideo);
  }, [siteSettings.promo_video_enabled, siteSettings.promo_video_url]);

  const playWithSound = async () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = false;
    video.volume = 1;
    try { await video.play(); setNeedsTap(false); setEnded(false); }
    catch { setNeedsTap(true); }
  };

  if (!siteSettings.promo_video_enabled || !siteSettings.promo_video_url) return null;
  return (
    <aside className={`fixed z-[60] right-3 bottom-[88px] sm:right-5 sm:bottom-6 w-[min(88vw,440px)] sm:w-[min(42vw,440px)] rounded-xl overflow-hidden bg-neutral-950 border border-white/20 shadow-2xl ${visible ? '' : 'hidden'}`} aria-label="Bright Okeyson promotional video">
      <div className="flex items-center justify-between gap-3 px-3 py-2 bg-neutral-950 text-white">
        <span className="text-xs font-bold uppercase tracking-wide">Bright Okeyson</span>
        <button type="button" onClick={() => { videoRef.current?.pause(); setVisible(false); }} className="p-1.5 rounded-full bg-white/10 hover:bg-white/20" aria-label="Close promotional video"><X className="w-4 h-4" /></button>
      </div>
      <div className="relative bg-black aspect-video">
        <video ref={videoRef} src={siteSettings.promo_video_url} className="w-full h-full object-contain" playsInline controls preload="metadata" onEnded={() => setEnded(true)} onPlay={() => setNeedsTap(false)} />
        {needsTap && !ended && <button type="button" onClick={() => void playWithSound()} className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/65 text-white font-bold text-sm" aria-label="Play promotional video with sound"><span className="rounded-full bg-emerald-600 p-4"><Volume2 className="w-6 h-6" /></span><span className="inline-flex items-center gap-2"><Play className="w-4 h-4" /> Tap to play with sound</span></button>}
        {ended && <div className="absolute inset-0 flex items-center justify-center gap-3 bg-black/65"><button type="button" onClick={() => void playWithSound()} className="inline-flex items-center gap-2 rounded bg-emerald-600 px-4 py-2 text-white text-xs font-bold"><RotateCcw className="w-4 h-4" /> Replay</button><button type="button" onClick={() => { videoRef.current?.pause(); setVisible(false); }} className="rounded bg-white px-4 py-2 text-neutral-900 text-xs font-bold">Close</button></div>}
      </div>
    </aside>
  );
};

export const PublicLayout: React.FC = () => {
  return (
    <div className="public-site flex flex-col min-h-screen bg-white text-brand-navy">
      {/* Welcome Announcement Modal */}
      <AnnouncementPopup />

      {/* Cart Drawer */}
      <CartDrawer />

      {/* Primary 3-Zone Header */}
      <Header />

      {/* Main Page Viewport */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Floating promotional video; fixed positioning does not affect page scrolling */}
      <PromoVideoFloat />

      {/* Floating Animated WhatsApp Button */}
      <FloatingWhatsApp />

      {/* Comprehensive Official Dealership Footer */}
      <Footer />
    </div>
  );
};
