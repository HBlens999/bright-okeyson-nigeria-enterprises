import React, { useState, useEffect } from 'react';
import { X, MessageCircle, MapPin } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';

const POPUP_STORAGE_KEY = 'bo_announcement_seen_v1';

export const AnnouncementPopup: React.FC = () => {
  const { announcement, siteSettings } = useSettings();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!announcement || !announcement.is_enabled) return;

    // Check display frequency
    const now = Date.now();
    const stored = localStorage.getItem(POPUP_STORAGE_KEY);
    const sessionSeen = sessionStorage.getItem(POPUP_STORAGE_KEY);

    if (announcement.display_frequency === 'once_per_session' && sessionSeen) {
      return;
    }

    if (announcement.display_frequency === 'once_per_day' && stored) {
      const lastSeen = parseInt(stored, 10);
      const oneDayMs = 24 * 60 * 60 * 1000;
      if (now - lastSeen < oneDayMs) {
        return;
      }
    }

    const timer = setTimeout(() => {
      setIsOpen(true);
    }, announcement.delay || 1500);

    return () => clearTimeout(timer);
  }, [announcement]);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem(POPUP_STORAGE_KEY, Date.now().toString());
    sessionStorage.setItem(POPUP_STORAGE_KEY, 'true');
  };

  if (!isOpen || !announcement || !announcement.is_enabled) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="welcome-popup-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
    >
      <div
        className="relative w-full max-w-lg bg-neutral-900 border border-neutral-700 rounded-lg shadow-2xl overflow-hidden p-6 sm:p-8 animate-scale-in"
        style={{
          backgroundColor: announcement.background_color || '#171717',
          color: announcement.text_color || '#ffffff'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-1.5 text-neutral-400 hover:text-white rounded-full bg-neutral-800/80 transition-colors"
          aria-label="Close Announcement"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Badge */}
        <div className="inline-block px-3 py-1 bg-red-600/30 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider rounded mb-3">
          Official Dealership Announcement
        </div>

        {/* Title */}
        <h2
          id="welcome-popup-title"
          className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white font-['Barlow_Condensed'] leading-tight mb-3"
        >
          {announcement.title || 'WELCOME TO BRIGHT OKEYSON NIGERIA ENTERPRISES'}
        </h2>

        {/* Body Text */}
        <p className="text-sm text-neutral-300 leading-relaxed mb-5 whitespace-pre-line">
          {announcement.body ||
            'Home of All Motorcycle Healing Center. We are dealers in all kinds of complete motorcycles & spare parts.'}
        </p>

        {/* Location Card */}
        <div className="bg-neutral-950/60 border border-neutral-800 rounded p-3 mb-6 flex items-start gap-2.5 text-xs text-neutral-300">
          <MapPin className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-white block">Main Office:</span>
            <span>{siteSettings.main_office}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={announcement.button_url || `https://wa.me/2348069382393`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClose}
            className="w-full sm:flex-1 py-3 px-4 bg-green-700 hover:bg-green-600 text-white font-bold text-xs uppercase tracking-wider rounded flex items-center justify-center gap-2 shadow-md transition-all active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{announcement.button_text || 'Chat on WhatsApp'}</span>
          </a>
          <button
            onClick={handleClose}
            className="w-full sm:w-auto py-3 px-5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white font-semibold text-xs uppercase tracking-wider rounded transition-colors"
          >
            Continue to Site
          </button>
        </div>
      </div>
    </div>
  );
};
