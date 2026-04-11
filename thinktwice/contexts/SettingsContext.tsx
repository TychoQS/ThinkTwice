import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from '@/node_modules/react-i18next';

type ThemeMode = 'system' | 'light' | 'dark';
type FontSize = 'small' | 'medium' | 'large';
type ResolvedTheme = 'light' | 'dark';

interface SettingsContextValue {
    themeMode: ThemeMode;
    resolvedTheme: ResolvedTheme;
    fontSize: FontSize;
    fontScale: number;
    language: string;
    distractionApp: string;
    distractionAppLabel: string;
    setThemeMode: (mode: ThemeMode) => void;
    setFontSize: (size: FontSize) => void;
    setLanguage: (lang: string) => void;
    setDistractionApp: (appId: string, appLabel?: string) => void;
}

const STORAGE_KEYS = {
    theme: '@thinktwice_theme',
    fontSize: '@thinktwice_fontSize',
    language: '@thinktwice_language',
    distractionApp: '@thinktwice_distractionApp',
    distractionAppLabel: '@thinktwice_distractionAppLabel',
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
    const [distractionApp, setDistractionAppState] = useState<string>('');
    const [distractionAppLabel, setDistractionAppLabelState] = useState<string>('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                const [savedTheme, savedFontSize, savedLang, savedApp, savedAppLabel] = await Promise.all([
                    AsyncStorage.getItem(STORAGE_KEYS.theme),
                    AsyncStorage.getItem(STORAGE_KEYS.fontSize),
                    AsyncStorage.getItem(STORAGE_KEYS.language),
                    AsyncStorage.getItem(STORAGE_KEYS.distractionApp),
                    AsyncStorage.getItem(STORAGE_KEYS.distractionAppLabel),
                ]);

                if (savedTheme) setThemeModeState(savedTheme as ThemeMode);
                if (savedFontSize) setFontSizeState(savedFontSize as FontSize);
                if (savedLang) {
                    setLanguageState(savedLang);
                    i18n.changeLanguage(savedLang);
                }
                if (savedApp) setDistractionAppState(savedApp);
                if (savedAppLabel) setDistractionAppLabelState(savedAppLabel);
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

    const setDistractionApp = useCallback((appId: string, appLabel?: string) => {
        setDistractionAppState(appId);
        AsyncStorage.setItem(STORAGE_KEYS.distractionApp, appId);
        if (appLabel) {
            setDistractionAppLabelState(appLabel);
            AsyncStorage.setItem(STORAGE_KEYS.distractionAppLabel, appLabel);
        } else {
            setDistractionAppLabelState('');
            AsyncStorage.removeItem(STORAGE_KEYS.distractionAppLabel);
        }
    }, []);

    const value = useMemo<SettingsContextValue>(
        () => ({
            themeMode,
            resolvedTheme,
            fontSize,
            fontScale: FONT_SCALE_MAP[fontSize] ?? 1,
            language,
            distractionApp,
            distractionAppLabel,
            setThemeMode,
            setFontSize,
            setLanguage,
            setDistractionApp,
        }),
        [themeMode, resolvedTheme, fontSize, language, distractionApp, distractionAppLabel, setThemeMode, setFontSize, setLanguage, setDistractionApp]
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