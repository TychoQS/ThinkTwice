import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useColorScheme as useSystemColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import i18n from '@/i18n';

type ThemeMode = 'system' | 'light' | 'dark';
type FontSize = 'small' | 'medium' | 'large';

interface SettingsState {
  themeMode: ThemeMode;
  fontSize: FontSize;
  language: string;
}

interface SettingsContextValue extends SettingsState {
  resolvedTheme: 'light' | 'dark';
  fontScale: number;
  setThemeMode: (mode: ThemeMode) => void;
  setFontSize: (size: FontSize) => void;
  setLanguage: (lang: string) => void;
}

const STORAGE_KEY = 'thinktwice_settings';

const fontScaleMap: Record<FontSize, number> = {
  small: 0.85,
  medium: 1,
  large: 1.2,
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const systemScheme = useSystemColorScheme();

  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [fontSize, setFontSizeState] = useState<FontSize>('medium');
  const [language, setLanguageState] = useState(i18n.language ?? 'en');
  const [loaded, setLoaded] = useState(false);

  // Load persisted settings
  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        try {
          const saved: Partial<SettingsState> = JSON.parse(raw);
          if (saved.themeMode) setThemeModeState(saved.themeMode);
          if (saved.fontSize) setFontSizeState(saved.fontSize);
          if (saved.language) {
            setLanguageState(saved.language);
            i18n.changeLanguage(saved.language);
          }
        } catch {}
      }
      setLoaded(true);
    });
  }, []);

  const persist = useCallback((patch: Partial<SettingsState>) => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      const current = raw ? JSON.parse(raw) : {};
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ ...current, ...patch }));
    });
  }, []);

  const setThemeMode = useCallback((mode: ThemeMode) => {
    setThemeModeState(mode);
    persist({ themeMode: mode });
  }, [persist]);

  const setFontSize = useCallback((size: FontSize) => {
    setFontSizeState(size);
    persist({ fontSize: size });
  }, [persist]);

  const setLanguage = useCallback((lang: string) => {
    setLanguageState(lang);
    i18n.changeLanguage(lang);
    persist({ language: lang });
  }, [persist]);

  const resolvedTheme: 'light' | 'dark' =
    themeMode === 'system' ? (systemScheme ?? 'light') : themeMode;

  if (!loaded) return null;

  return (
    <SettingsContext.Provider
      value={{
        themeMode,
        fontSize,
        language,
        resolvedTheme,
        fontScale: fontScaleMap[fontSize],
        setThemeMode,
        setFontSize,
        setLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within SettingsProvider');
  return ctx;
}
