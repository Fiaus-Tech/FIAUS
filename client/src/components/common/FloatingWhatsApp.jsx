import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSettings } from '../../context/SettingsContext';

/**
 * Normalizes phone/WhatsApp strings to a valid wa.me URL
 */
function getWhatsAppUrl(value) {
  const defaultNumber = '966511269264';
  if (!value || typeof value !== 'string') {
    return `https://wa.me/${defaultNumber}`;
  }
  const trimmed = value.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
    return trimmed;
  }
  const digits = trimmed.replace(/[^0-9]/g, '');
  return `https://wa.me/${digits || defaultNumber}`;
}

export default function FloatingWhatsApp() {
  const { language, isRTL } = useLanguage();
  const { settings } = useSettings();

  const rawWhatsApp = settings?.whatsapp || settings?.phone || '+966 51 126 9264';
  const whatsappUrl = getWhatsAppUrl(rawWhatsApp);

  const labelText = language === 'ar' 
    ? 'تواصل مع فياوس تك عبر واتساب' 
    : 'Contact FIAUS Tech on WhatsApp';

  const tooltipText = language === 'ar' 
    ? 'محادثة واتساب سريعة' 
    : 'Chat on WhatsApp';

  return (
    <aside aria-label={labelText}>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={labelText}
        title={tooltipText}
        className={`group fixed z-40 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-[#1ebe5d] to-[#25d366] text-white shadow-lg shadow-emerald-600/30 hover:shadow-xl hover:shadow-emerald-500/50 hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/50 transition-all duration-300 bottom-5 sm:bottom-6 ${
          isRTL ? 'left-5 sm:left-6' : 'right-5 sm:right-6'
        }`}
      >
      {/* Subtle pulsing ring animation */}
      <span className="absolute inset-0 rounded-full bg-[#25d366] opacity-30 group-hover:animate-ping pointer-events-none" />

      {/* Online Status Dot */}
      <span className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-3 h-3 bg-white rounded-full flex items-center justify-center shadow-xs">
        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
      </span>

      {/* Official WhatsApp SVG Glyph */}
      <svg
        className="w-6 h-6 sm:w-7 sm:h-7 fill-current relative z-10 drop-shadow-sm"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
      </svg>

      {/* Desktop Hover Tooltip */}
      <span
        className={`hidden md:block absolute top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-950/90 dark:bg-navy-900/95 text-white shadow-xl backdrop-blur-md border border-slate-800/80 pointer-events-none opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 ${
          isRTL ? 'left-full ml-3.5' : 'right-full mr-3.5'
        }`}
      >
        {tooltipText}
      </span>
      </a>
    </aside>
  );
}
