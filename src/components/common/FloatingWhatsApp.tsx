import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import { useSettings } from '../../context/SettingsContext';
import { getWhatsAppUrl } from '../../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const { siteSettings } = useSettings();
  const [showTooltip, setShowTooltip] = useState(true);

  if (!siteSettings.whatsapp_enabled) return null;

  const phone = siteSettings.primary_whatsapp || '08069382393';
  const url = getWhatsAppUrl(
    phone,
    `Hello ${siteSettings.business_name}, I am visiting your website and would like to inquire about your motorcycles and genuine spare parts.`
  );

  const isLeft = siteSettings.whatsapp_position === 'bottom-left';
  const positionClass = isLeft ? 'left-6 bottom-6' : 'right-6 bottom-6';

  return (
    <aside
      aria-label="WhatsApp live chat support"
      className={`fixed ${positionClass} z-50 flex items-center gap-3 print:hidden`}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div
          role="status"
          className={`hidden sm:flex items-center gap-2 bg-neutral-900/95 border border-neutral-700/80 text-white text-xs font-medium py-2 px-3.5 rounded shadow-xl backdrop-blur-sm animate-fade-in ${
            isLeft ? 'order-2' : 'order-1'
          }`}
        >
          <span>{siteSettings.whatsapp_tooltip || 'Need help? Chat with us on WhatsApp'}</span>
          <button
            onClick={() => setShowTooltip(false)}
            className="text-neutral-400 hover:text-white ml-1 text-sm font-bold leading-none p-0.5"
            aria-label="Dismiss WhatsApp tooltip"
          >
            &times;
          </button>
        </div>
      )}

      {/* Button */}
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Bright Okeyson"
        className={`group relative flex items-center justify-center w-14 h-14 bg-green-600 hover:bg-green-500 text-white rounded-full shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          siteSettings.whatsapp_pulse ? 'animate-bounce-subtle' : ''
        } ${isLeft ? 'order-1' : 'order-2'}`}
      >
        {/* Subtle Radar Wave */}
        {siteSettings.whatsapp_pulse && (
          <span className="absolute -inset-1 rounded-full bg-green-500/30 animate-ping -z-10 pointer-events-none" />
        )}
        <MessageCircle className="w-7 h-7" />
      </a>
    </aside>
  );
};
