import { StyleSheet, Pressable, ScrollView, View, Modal, FlatList, Image, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect } from 'react';
import { Alert } from 'react-native';

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
        distractionApp,
        distractionAppLabel,
        setThemeMode,
        setFontSize,
        setLanguage,
        setDistractionApp,
    } = useSettings();
    const colors = Colors[resolvedTheme];

    const [apps, setApps] = useState<any[]>([]);
    const [isAppsLoading, setIsAppsLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);

    useEffect(() => {
        if (isModalVisible && apps.length === 0 && !isAppsLoading) {
            setIsAppsLoading(true);
            try {
                const { InstalledApps } = require('react-native-launcher-kit');
                InstalledApps.getSortedApps()
                    .then((installedApps: any[]) => {
                        setApps(installedApps.filter(app => app.label));
                    })
                    .catch((err: any) => console.warn('Could not load apps', err))
                    .finally(() => setIsAppsLoading(false));
            } catch (error) {
                console.warn('react-native-launcher-kit is not available', error);
                setIsAppsLoading(false);
                setApps([]);
                Alert.alert(
                    'Native Module Missing',
                    'Please rebuild the app with npx expo run:android to use this feature.'
                );
            }
        }
    }, [isModalVisible, apps.length, isAppsLoading]);

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

                <View style={styles.section}>
                    <ThemedText
                        type="defaultSemiBold"
                        style={[styles.sectionTitle, { color: colors.textSecondary }]}
                    >
                        {t('settings.distractionApp')}
                    </ThemedText>
                    <View style={[styles.optionGroup, { backgroundColor: colors.surface, borderColor: colors.border }]}>
                        <Pressable
                            onPress={() => setIsModalVisible(true)}
                            style={styles.option}
                        >
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12, paddingRight: 8 }}>
                                <Ionicons name="apps-outline" size={20} color={colors.text} />
                                <ThemedText style={{ color: colors.text, flex: 1 }} numberOfLines={1}>
                                    {distractionAppLabel || distractionApp || t('settings.selectApp', 'Seleccionar app...')}
                                </ThemedText>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                        </Pressable>
                    </View>
                </View>
            </ScrollView>

            {/* Apps Modal */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                presentationStyle="pageSheet"
                onRequestClose={() => setIsModalVisible(false)}
            >
                <ThemedView style={styles.modalContainer} lightColor={colors.background} darkColor={colors.background}>
                    <View style={[styles.modalHeader, { borderBottomColor: colors.border }]}>
                        <Pressable onPress={() => setIsModalVisible(false)} style={styles.headerBtn}>
                            <Ionicons name="close" size={24} color={colors.text} />
                        </Pressable>
                        <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
                            {t('settings.selectApp', 'Seleccionar App')}
                        </ThemedText>
                        <View style={styles.headerBtn} />
                    </View>

                    {isAppsLoading ? (
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="large" color={colors.primary} />
                        </View>
                    ) : (
                        <FlatList
                            data={apps}
                            keyExtractor={item => item.packageName}
                            renderItem={({ item }) => (
                                <Pressable
                                    style={({ pressed }) => [
                                        styles.appItem,
                                        { backgroundColor: pressed ? colors.surfaceVariant : 'transparent' }
                                    ]}
                                    onPress={() => {
                                        setDistractionApp(item.packageName, item.label);
                                        setIsModalVisible(false);
                                    }}
                                >
                                    {item.icon ? (
                                        <Image source={{ uri: `data:image/png;base64,${item.icon}` }} style={styles.appIcon} />
                                    ) : (
                                        <View style={[styles.appIcon, { backgroundColor: colors.surfaceVariant }]} />
                                    )}
                                    <ThemedText style={{ flex: 1 }}>{item.label}</ThemedText>
                                    {distractionApp === item.packageName && (
                                        <Ionicons name="checkmark" size={20} color={colors.primary} />
                                    )}
                                </Pressable>
                            )}
                        />
                    )}
                </ThemedView>
            </Modal>
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
    modalContainer: {
        flex: 1,
    },
    modalHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
    },
    appItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        gap: 16,
    },
    appIcon: {
        width: 40,
        height: 40,
        borderRadius: 8,
    },
});