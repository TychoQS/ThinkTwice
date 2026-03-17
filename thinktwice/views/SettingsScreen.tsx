import { StyleSheet, Pressable, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSettings, FONT_SCALE_MAP } from '@/contexts/SettingsContext';

type ThemeOption = 'system' | 'light' | 'dark';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'de', label: 'Deutsch' },
  { code: 'ru', label: 'Русский' },
  { code: 'zh', label: '中文' },
  { code: 'ko', label: '한국어' },
  { code: 'ja', label: '日本語' },
];

export default function SettingsScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { resolvedTheme, themePreference, fontScale, language, setThemePreference, setFontScale, setLanguage } =
    useSettings();
  const colors = Colors[resolvedTheme];

  const themeOptions: { key: ThemeOption; label: string }[] = [
    { key: 'system', label: t('settings.themeSystem') },
    { key: 'light', label: t('settings.themeLight') },
    { key: 'dark', label: t('settings.themeDark') },
  ];

  const fontOptions: { key: string; label: string; scale: number }[] = [
    { key: 'small', label: t('settings.fontSmall'), scale: FONT_SCALE_MAP.small },
    { key: 'medium', label: t('settings.fontMedium'), scale: FONT_SCALE_MAP.medium },
    { key: 'large', label: t('settings.fontLarge'), scale: FONT_SCALE_MAP.large },
  ];

  return (
    <ThemedView
      style={styles.container}
      lightColor={colors.background}
      darkColor={colors.background}
    >
      {/* Header */}
      <View style={[styles.header, { paddingTop: insets.top + 8, borderBottomColor: colors.border, backgroundColor: colors.surface }]}>
        <Pressable onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
          {t('settings.title')}
        </ThemedText>
        <View style={styles.headerBtn} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Theme */}
        <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          {t('settings.theme')}
        </ThemedText>
        <View style={[styles.optionGroup, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {themeOptions.map((opt) => (
            <Pressable
              key={opt.key}
              onPress={() => setThemePreference(opt.key)}
              style={[
                styles.option,
                {
                  backgroundColor: themePreference === opt.key ? colors.primary + '15' : 'transparent',
                },
              ]}
            >
              <ThemedText style={{ color: themePreference === opt.key ? colors.primary : colors.text }}>
                {opt.label}
              </ThemedText>
              {themePreference === opt.key && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>

        {/* Font size */}
        <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          {t('settings.fontSize')}
        </ThemedText>
        <View style={[styles.optionGroup, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {fontOptions.map((opt) => (
            <Pressable
              key={opt.key}
              onPress={() => setFontScale(opt.scale)}
              style={[
                styles.option,
                {
                  backgroundColor: fontScale === opt.scale ? colors.primary + '15' : 'transparent',
                },
              ]}
            >
              <ThemedText style={{ color: fontScale === opt.scale ? colors.primary : colors.text }}>
                {opt.label}
              </ThemedText>
              {fontScale === opt.scale && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>

        {/* Language */}
        <ThemedText type="defaultSemiBold" style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          {t('settings.language')}
        </ThemedText>
        <View style={[styles.optionGroup, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {LANGUAGES.map((lang) => (
            <Pressable
              key={lang.code}
              onPress={() => setLanguage(lang.code)}
              style={[
                styles.option,
                {
                  backgroundColor: language === lang.code ? colors.primary + '15' : 'transparent',
                },
              ]}
            >
              <ThemedText style={{ color: language === lang.code ? colors.primary : colors.text }}>
                {lang.label}
              </ThemedText>
              {language === lang.code && (
                <Ionicons name="checkmark" size={20} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  content: {
    padding: 20,
    gap: 8,
  },
  sectionTitle: {
    fontSize: 13,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginTop: 16,
    marginBottom: 4,
    paddingHorizontal: 4,
  },
  optionGroup: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
