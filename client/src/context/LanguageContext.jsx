import React, { createContext, useContext, useEffect, useState } from 'react';
import { translations } from '../i18n/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('fiaus_lang');
    return saved || 'en';
  });

  const isRTL = language === 'ar';

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute('lang', language);
    root.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    localStorage.setItem('fiaus_lang', language);
  }, [language, isRTL]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'ar' : 'en'));
  };

  const t = (key) => {
    const keys = key.split('.');
    let current = translations[language];

    for (const k of keys) {
      if (!current || current[k] === undefined) {
        // Fallback to English
        let fallback = translations['en'];
        for (const fk of keys) {
          if (!fallback || fallback[fk] === undefined) return key;
          fallback = fallback[fk];
        }
        return fallback;
      }
      current = current[k];
    }
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, isRTL, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

