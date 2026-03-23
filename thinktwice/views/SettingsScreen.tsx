import { StyleSheet, Pressable, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';

type ThemeMode = 'system' | 'light' | 'dark';
type FontSize = 'small' | 'medium' | 'large';

const LANGUAGES = [
    { code: 'en', label: 'English' },
    { code: 'es', label: 'Español' },
    { code: 'de', label: 'Deutsch' },
    { code: 'ru', label: 'Русский' },
    { code: 'zh', label: '中文' },
    { code: 'ko', label: '한국어' },
    { code: 'ja', label: '日本語' },
];

function SegmentedControl<T extends string>({
                                                options,
                                                value,
                                                onChange,
                                                colors,
                                            }: {
    options: { key: T; label: string }[];
    value: T;
    onChange: (v: T) => void;
    colors: typeof Colors.light;
}) {
    return (
        <View style={[styles.segmented, { backgroundColor: colors.surfaceVariant }]}>
            {options.map((opt) => {
                const active = opt.key === value;
                return (
                    <Pressable
                        key={opt.key}
                        onPress={() => onChange(opt.key)}
                        style={[
                            styles.segmentItem,
                            active && { backgroundColor: colors.primary },
                        ]}
                    >
                        <ThemedText
                            style={[
                                styles.segmentText,
                                { color: active ? '#fff' : colors.text },
                            ]}
                        >
                            {opt.label}
                        </ThemedText>
                    </Pressable>
                );
            })}
        </View>
    );
}

export default function SettingsScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const {
        resolvedTheme,
        themeMode,
        fontSize,
        language,
        setThemeMode,
        setFontSize,
        setLanguage,
    } = useSettings();
    const colors = Colors[resolvedTheme];

    const themeOptions: { key: ThemeMode; label: string }[] = [
        { key: 'system', label: t('settings.themeSystem') },
        { key: 'light', label: t('settings.themeLight') },
        { key: 'dark', label: t('settings.themeDark') },
    ];

    const fontOptions: { key: FontSize; label: string }[] = [
        { key: 'small', label: t('settings.fontSmall') },
        { key: 'medium', label: t('settings.fontMedium') },
        { key: 'large', label: t('settings.fontLarge') },
    ];

    return (
        <ThemedView
            style={styles.container}
            lightColor={colors.background}
            darkColor={colors.background}
        >
            <View
                style={[
                    styles.header,
                    { paddingTop: insets.top + 8, borderBottomColor: colors.border, backgroundColor: colors.surface },
                ]}
            >
                <Pressable onPress={() => router.back()} style={styles.headerBtn}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </Pressable>
                <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
                    {t('settings.title')}
                </ThemedText>
                <View style={styles.headerBtn} />
            </View>

            <ScrollView
                contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 24 }]}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.section}>
                    <ThemedText
                        type="defaultSemiBold"
                        style={[styles.sectionTitle, { color: colors.textSecondary }]}
                    >
                        {t('settings.theme')}
                    </ThemedText>
                    <SegmentedControl
                        options={themeOptions}
                        value={themeMode}
                        onChange={setThemeMode}
                        colors={colors}
                    />
                </View>

                <View style={styles.section}>
                    <ThemedText
                        type="defaultSemiBold"
                        style={[styles.sectionTitle, { color: colors.textSecondary }]}
                    >
                        {t('settings.fontSize')}
                    </ThemedText>
                    <SegmentedControl
                        options={fontOptions}
                        value={fontSize}
                        onChange={setFontSize}
                        colors={colors}
                    />
                </View>

                <View style={styles.section}>
                    <ThemedText
                        type="defaultSemiBold"
                        style={[styles.sectionTitle, { color: colors.textSecondary }]}
                    >
                        {t('settings.language')}
                    </ThemedText>
                    <View style={[styles.optionGroup, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        {LANGUAGES.map((lang) => {
                            const active = language === lang.code;
                            return (
                                <Pressable
                                    key={lang.code}
                                    onPress={() => setLanguage(lang.code)}
                                    style={[
                                        styles.option,
                                        {
                                            backgroundColor: active ? colors.primary + '15' : 'transparent',
                                        },
                                    ]}
                                >
                                    <ThemedText style={{ color: active ? colors.primary : colors.text }}>
                                        {lang.label}
                                    </ThemedText>
                                    {active && (
                                        <Ionicons name="checkmark" size={20} color={colors.primary} />
                                    )}
                                </Pressable>
                            );
                        })}
                    </View>
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
        fontSize: 17,
    },
    content: {
        padding: 20,
        gap: 28,
    },
    section: {
        gap: 10,
    },
    sectionTitle: {
        fontSize: 13,
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        paddingHorizontal: 4,
    },
    segmented: {
        flexDirection: 'row',
        borderRadius: 12,
        padding: 3,
    },
    segmentItem: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    segmentText: {
        fontSize: 14,
        fontWeight: '600',
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