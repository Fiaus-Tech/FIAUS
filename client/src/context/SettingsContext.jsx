import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchSettings, updateSettings as apiUpdateSettings } from '../services/api';

const defaultSettings = {
  companyName: 'FIAUS Tech',
  logo: 'https://res.cloudinary.com/n5yq0whs/image/upload/v1789044874/FIAUS/branding/logo.jpg',
  logoPublicId: '',
  favicon: '',
  descriptor: 'Digital & AI Agency',
  descriptorAr: 'وكالة رقمية وحلول الذكاء الاصطناعي',
  tagline: 'Innovate. Automate. Grow.',
  taglineAr: 'ابتكر. أتمت. انمو.',
  email: 'fiaustech@hotmail.com',
  phone: '+966 51 126 9264',
  whatsapp: '+966511269264',
  telegram: 'https://t.me/fiaustech',
  websiteUrl: 'https://fiaus.tech',
  socialLinks: {
    facebook: 'https://facebook.com/fiaustech',
    instagram: 'https://instagram.com/fiaustech',
    x: 'https://x.com/fiaus_tech',
    linkedin: 'https://www.linkedin.com/in/fiaus-tech',
    github: 'https://github.com/Fiaus-Tech',
    youtube: 'https://youtube.com/@FiausTech',
    telegram: 'https://t.me/fiaustech',
    tiktok: 'https://tiktok.com/@fiaustech',
    snapchat: 'https://snapchat.com/add/fiaustech'
  }
};

const SettingsContext = createContext({
  settings: defaultSettings,
  loading: false,
  refreshSettings: async () => {},
  updateSettings: async () => {}
});

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(defaultSettings);
  const [loading, setLoading] = useState(true);

  const refreshSettings = useCallback(async () => {
    try {
      const res = await fetchSettings();
      if (res.success && res.data) {
        setSettings((prev) => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      console.error('Failed to fetch website settings, using defaults', err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshSettings();
  }, [refreshSettings]);

  const updateSettings = async (newSettings) => {
    const res = await apiUpdateSettings(newSettings);
    if (res.success && res.data) {
      setSettings((prev) => ({ ...prev, ...res.data }));
      return res.data;
    }
    throw new Error(res.message || 'Failed to update settings');
  };

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings, updateSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => useContext(SettingsContext);
