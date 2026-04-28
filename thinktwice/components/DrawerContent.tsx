import { StyleSheet, Pressable, Switch, View } from 'react-native';
import { DrawerContentScrollView, type DrawerContentComponentProps } from '@react-navigation/drawer';
import { useRouter, usePathname } from 'expo-router';
import { useTranslation } from '@/node_modules/react-i18next';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';

interface DrawerItemProps {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    isActive: boolean;
    colors: typeof Colors.light;
    onPress: () => void;
}

function DrawerItem({ icon, label, isActive, colors, onPress }: DrawerItemProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.item,
                {
                    backgroundColor: isActive ? colors.primary + '15' : 'transparent',
                    opacity: pressed ? 0.7 : 1,
                },
            ]}
        >
            <Ionicons
                name={icon}
                size={22}
                color={isActive ? colors.primary : colors.textSecondary}
            />
            <ThemedText
                style={[
                    styles.itemLabel,
                    { color: isActive ? colors.primary : colors.text },
                ]}
            >
                {label}
            </ThemedText>
        </Pressable>
    );
}

export function DrawerContent(props: DrawerContentComponentProps) {
    const router = useRouter();
    const pathname = usePathname();
    const { t } = useTranslation();
    const { resolvedTheme, setThemeMode, isPremium } = useSettings();
    const colors = Colors[resolvedTheme];
    const isDark = resolvedTheme === 'dark';

    const toggleTheme = () => {
        setThemeMode(isDark ? 'light' : 'dark');
    };

    const navigate = (route: string) => {
        router.push(route as any);
        props.navigation.closeDrawer();
    };

    return (
        <DrawerContentScrollView
            {...props}
            style={{ backgroundColor: colors.surface }}
            contentContainerStyle={styles.scrollContent}
        >
            <View style={[styles.header, { borderBottomColor: colors.border }]}>
                <Ionicons name="bulb-outline" size={28} color={colors.primary} />
                <ThemedText
                    type="defaultSemiBold"
                    style={[styles.brand, { color: colors.text }]}
                >
                    ThinkTwice
                </ThemedText>
            </View>

            <View style={styles.navSection}>
                <DrawerItem
                    icon="home-outline"
                    label={t('drawer.home')}
                    isActive={pathname === '/'}
                    colors={colors}
                    onPress={() => navigate('/')}
                />
                <DrawerItem
                    icon="settings-outline"
                    label={t('drawer.settings')}
                    isActive={pathname === '/settings'}
                    colors={colors}
                    onPress={() => navigate('/settings')}
                />
                <DrawerItem
                    icon={isPremium ? 'star' : 'star-outline'}
                    label={isPremium ? t('premium.premiumLabel') : t('premium.menuLabel')}
                    isActive={pathname === '/premium'}
                    colors={isPremium ? { ...colors, primary: '#F59E0B', text: colors.text, textSecondary: colors.textSecondary } : colors}
                    onPress={() => navigate('/premium')}
                />
            </View>

            <View style={[styles.themeSection, { borderTopColor: colors.border }]}>
                <View style={styles.themeRow}>
                    <Ionicons
                        name={isDark ? 'moon-outline' : 'sunny-outline'}
                        size={20}
                        color={colors.textSecondary}
                    />
                    <ThemedText style={[styles.themeLabel, { color: colors.text }]}>
                        {isDark ? t('drawer.darkMode') : t('drawer.lightMode')}
                    </ThemedText>
                    <Switch
                        value={isDark}
                        onValueChange={toggleTheme}
                        trackColor={{ false: colors.border, true: colors.primary }}
                        thumbColor="#fff"
                    />
                </View>
            </View>
        </DrawerContentScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        paddingHorizontal: 20,
        paddingVertical: 20,
        borderBottomWidth: 1,
        marginBottom: 8,
    },
    brand: {
        fontSize: 20,
    },
    navSection: {
        flex: 1,
        paddingHorizontal: 8,
        gap: 4,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 12,
        gap: 12,
    },
    itemLabel: {
        fontSize: 15,
    },
    themeSection: {
        borderTopWidth: 1,
        paddingHorizontal: 20,
        paddingVertical: 16,
    },
    themeRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    themeLabel: {
        flex: 1,
        fontSize: 15,
    },
});