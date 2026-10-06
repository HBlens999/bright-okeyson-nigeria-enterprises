import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { SiteSettings, BrandingSettings, Branch, ThemeSettings, Announcement, Category } from '../types/database';
import { getSiteSettings, getBranding, getBranches, getThemeSettings, getAnnouncement, getCategories } from '../services/dataService';
import { INITIAL_SITE_SETTINGS, INITIAL_BRANDING, INITIAL_BRANCHES, INITIAL_THEME, INITIAL_ANNOUNCEMENT, INITIAL_CATEGORIES } from '../lib/seedData';

interface SettingsContextValue {
  siteSettings: SiteSettings; branding: BrandingSettings; branches: Branch[]; theme: ThemeSettings;
  announcement: Announcement; categories: Category[]; loading: boolean; refreshSettings: () => Promise<void>;
}
const SettingsContext = createContext<SettingsContextValue>({
  siteSettings: INITIAL_SITE_SETTINGS, branding: INITIAL_BRANDING, branches: INITIAL_BRANCHES, theme: INITIAL_THEME,
  announcement: INITIAL_ANNOUNCEMENT, categories: INITIAL_CATEGORIES, loading: false, refreshSettings: async () => {}
});

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [siteSettings, setSiteSettings] = useState(INITIAL_SITE_SETTINGS);
  const [branding, setBranding] = useState(INITIAL_BRANDING);
  const [branches, setBranches] = useState<Branch[]>(INITIAL_BRANCHES);
  const [theme, setTheme] = useState<ThemeSettings>(INITIAL_THEME);
  const [announcement, setAnnouncement] = useState(INITIAL_ANNOUNCEMENT);
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [loading, setLoading] = useState(false);

  const applyThemeVariables = (t: ThemeSettings) => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    root.style.setProperty('--color-primary', t.primary_color || '#429EBD');
    root.style.setProperty('--color-primary-hover', t.primary_hover || '#053F5C');
    root.style.setProperty('--color-secondary', t.secondary_color || '#053F5C');
    root.style.setProperty('--color-accent', t.accent_color || '#F7AD19');
    root.style.setProperty('--color-bg', t.bg_color || '#FFFFFF');
    root.style.setProperty('--color-text', t.text_color || '#053F5C');
    root.style.setProperty('--app-radius', t.border_radius || '0.375rem');
  };

  const refreshSettings = async () => {
    setLoading(true);
    try {
      const [s, b, br, t, a, c] = await Promise.all([
        getSiteSettings(), getBranding(), getBranches(), getThemeSettings(), getAnnouncement(), getCategories()
      ]);
      setSiteSettings(s); setBranding(b); setBranches(br); setTheme(t); setAnnouncement(a); setCategories(c);
      applyThemeVariables(t);
    } catch (err) {
      console.warn('Error loading site settings:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    try {
      const cached = localStorage.getItem('bright-okeyson-theme-settings');
      if (cached) applyThemeVariables(JSON.parse(cached) as ThemeSettings);
    } catch {}
    refreshSettings();
  }, []);

  return <SettingsContext.Provider value={{siteSettings, branding, branches, theme, announcement, categories, loading, refreshSettings}}>
    {children}
  </SettingsContext.Provider>;
};
export const useSettings = () => useContext(SettingsContext);
