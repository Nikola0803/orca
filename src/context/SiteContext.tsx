import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { fetchLayout } from '../lib/api';
import { defaultLayout } from '../lib/defaults';

interface SiteSettings {
  logo_url: string;
  company_name: string;
  company_description: string;
  contact_email: string;
  contact_phone: string;
  contact_phone_sales: string;
  contact_address: string;
  instagram_url: string;
  linkedin_url: string;
  youtube_video_url: string;
  copyright_text: string;
  powered_by_text: string;
  powered_by_url: string;
  google_maps_embed: string;
}

interface Navigation {
  items: Array<{ to: string; label: string }>;
  cta: { to: string; label: string } | null;
}

interface SiteContextType {
  settings: SiteSettings;
  navigation: Navigation;
}

const SiteContext = createContext<SiteContextType>({
  settings: defaultLayout.settings as SiteSettings,
  navigation: defaultLayout.navigation as Navigation,
});

export function useSite() {
  return useContext(SiteContext);
}

export function SiteProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(defaultLayout.settings as SiteSettings);
  const [navigation, setNavigation] = useState<Navigation>(defaultLayout.navigation as Navigation);

  useEffect(() => {
    fetchLayout().then((data) => {
      if (data) {
        setSettings({ ...defaultLayout.settings, ...data.settings } as SiteSettings);
        setNavigation({ ...defaultLayout.navigation, ...data.navigation } as Navigation);
      }
    });
  }, []);

  return (
    <SiteContext.Provider value={{ settings, navigation }}>
      {children}
    </SiteContext.Provider>
  );
}
