import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

type ThemeMode = 'system' | 'light' | 'dark';
type FontSize = 'small' | 'medium' | 'large';
type ResolvedTheme = 'light' | 'dark';

interface SettingsContextValue {
    themeMode: ThemeMode;
    resolvedTheme: ResolvedTheme;
    fontSize: FontSize;
    fontScale: number;
    language: string;
    setThemeMode: (mode: ThemeMode) => void;
    setFontSize: (size: FontSize) => void;
    setLanguage: (lang: string) => void;
}

const STORAGE_KEYS = {
    theme: '@thinktwice_theme',
    fontSize: '@thinktwice_fontSize',
    language: '@thinktwice_language',
} as const;

const FONT_SCALE_MAP: Record<FontSize, number> = {
    small: 0.85,
    medium: 1,
    large: 1.2,
};

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    const deviceScheme = useDeviceColorScheme();
    const { i18n } = useTranslation();

    const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
    const [fontSize, setFontSizeState] = useState<FontSize>('medium');
    const [language, setLanguageState] = useState<string>(i18n.language ?? 'en');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const [savedTheme, savedFontSize, savedLang] = await Promise.all([
                    AsyncStorage.getItem(STORAGE_KEYS.theme),
                    AsyncStorage.getItem(STORAGE_KEYS.fontSize),
                    AsyncStorage.getItem(STORAGE_KEYS.language),
                ]);

                if (savedTheme) setThemeModeState(savedTheme as ThemeMode);
                if (savedFontSize) setFontSizeState(savedFontSize as FontSize);
                if (savedLang) {
                    setLanguageState(savedLang);
                    i18n.changeLanguage(savedLang);
                }
            } catch {
            } finally {
                setLoaded(true);
            }
        })();
    }, [i18n]);

    const resolvedTheme: ResolvedTheme =
        themeMode === 'system' ? (deviceScheme ?? 'light') : themeMode;

    const setThemeMode = useCallback((mode: ThemeMode) => {
        setThemeModeState(mode);
        AsyncStorage.setItem(STORAGE_KEYS.theme, mode);
    }, []);

    const setFontSize = useCallback((size: FontSize) => {
        setFontSizeState(size);
        AsyncStorage.setItem(STORAGE_KEYS.fontSize, size);
    }, []);

    const setLanguage = useCallback(
        (lang: string) => {
            setLanguageState(lang);
            i18n.changeLanguage(lang);
            AsyncStorage.setItem(STORAGE_KEYS.language, lang);
        },
        [i18n]
    );

    const value = useMemo<SettingsContextValue>(
        () => ({
            themeMode,
            resolvedTheme,
            fontSize,
            fontScale: FONT_SCALE_MAP[fontSize] ?? 1,
            language,
            setThemeMode,
            setFontSize,
            setLanguage,
        }),
        [themeMode, resolvedTheme, fontSize, language, setThemeMode, setFontSize, setLanguage]
    );

    if (!loaded) return null;

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error('useSettings must be used within a SettingsProvider');
    return ctx;
}

export { FONT_SCALE_MAP };