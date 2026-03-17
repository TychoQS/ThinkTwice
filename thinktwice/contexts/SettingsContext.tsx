import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

type ThemePreference = 'system' | 'light' | 'dark';
type ResolvedTheme = 'light' | 'dark';
type FontScale = number;

interface SettingsContextValue {
  themePreference: ThemePreference;
  resolvedTheme: ResolvedTheme;
  fontScale: FontScale;
  language: string;
  setThemePreference: (pref: ThemePreference) => void;
  setFontScale: (scale: FontScale) => void;
  setLanguage: (lang: string) => void;
}

const STORAGE_KEYS = {
  theme: '@thinktwice_theme',
  fontScale: '@thinktwice_fontScale',
  language: '@thinktwice_language',
} as const;

const FONT_SCALE_MAP: Record<string, FontScale> = {
  small: 0.85,
  medium: 1,
  large: 1.2,
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const deviceScheme = useDeviceColorScheme();
  const { i18n } = useTranslation();

  const [themePreference, setThemePrefState] = useState<ThemePreference>('system');
  const [fontScale, setFontScaleState] = useState<FontScale>(1);
  const [language, setLanguageState] = useState<string>(i18n.language ?? 'en');

  // Load persisted settings
  useEffect(() => {
    (async () => {
      try {
        const [savedTheme, savedScale, savedLang] = await Promise.all([
          AsyncStorage.getItem(STORAGE_KEYS.theme),
          AsyncStorage.getItem(STORAGE_KEYS.fontScale),
          AsyncStorage.getItem(STORAGE_KEYS.language),
        ]);
        if (savedTheme) setThemePrefState(savedTheme as ThemePreference);
        if (savedScale) setFontScaleState(Number(savedScale));
        if (savedLang) {
          setLanguageState(savedLang);
          i18n.changeLanguage(savedLang);
        }
      } catch {
        // Silently fall back to defaults
      }
    })();
  }, [i18n]);

  const resolvedTheme: ResolvedTheme =
    themePreference === 'system' ? (deviceScheme ?? 'light') : themePreference;

  const setThemePreference = useCallback((pref: ThemePreference) => {
    setThemePrefState(pref);
    AsyncStorage.setItem(STORAGE_KEYS.theme, pref);
  }, []);

  const setFontScale = useCallback((scale: FontScale) => {
    setFontScaleState(scale);
    AsyncStorage.setItem(STORAGE_KEYS.fontScale, String(scale));
  }, []);

  const setLanguage = useCallback(
    (lang: string) => {
      setLanguageState(lang);
      i18n.changeLanguage(lang);
      AsyncStorage.setItem(STORAGE_KEYS.language, lang);
    },
    [i18n],
  );

  const value = useMemo<SettingsContextValue>(
    () => ({
      themePreference,
      resolvedTheme,
      fontScale,
      language,
      setThemePreference,
      setFontScale,
      setLanguage,
    }),
    [themePreference, resolvedTheme, fontScale, language, setThemePreference, setFontScale, setLanguage],
  );

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
  return ctx;
}

export { FONT_SCALE_MAP };
