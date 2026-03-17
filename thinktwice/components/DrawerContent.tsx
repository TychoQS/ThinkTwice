import { StyleSheet, Pressable, Switch, View } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { Ionicons } from '@expo/vector-icons';
import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';

export function DrawerContent(props: any) {
  const router = useRouter();
  const { t } = useTranslation();
  const { resolvedTheme, setThemeMode } = useSettings();
  const colors = Colors[resolvedTheme];
  const isDark = resolvedTheme === 'dark';

  const toggleTheme = () => {
    setThemeMode(isDark ? 'light' : 'dark');
  };

  return (
    <DrawerContentScrollView
      {...props}
      style={{ backgroundColor: colors.surface }}
      contentContainerStyle={styles.scrollContent}
    >
      {/* Brand header */}
      <View style={[styles.header, { borderBottomColor: colors.border }]}>
        <Ionicons name="bulb-outline" size={28} color={colors.primary} />
        <ThemedText
          type="defaultSemiBold"
          style={[styles.brand, { color: colors.text }]}
        >
          ThinkTwice
        </ThemedText>
      </View>

      {/* Navigation items */}
      <View style={styles.navSection}>
        <DrawerItem
          icon="home-outline"
          label={t('drawer.home')}
          color={colors}
          onPress={() => {
            router.push('/');
            props.navigation.closeDrawer();
          }}
        />
        <DrawerItem
          icon="settings-outline"
          label={t('drawer.settings')}
          color={colors}
          onPress={() => {
            router.push('/settings');
            props.navigation.closeDrawer();
          }}
        />
      </View>

      {/* Theme toggle */}
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

function DrawerItem({
  icon,
  label,
  color,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: typeof Colors.light;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.navItem,
        { backgroundColor: pressed ? color.surfaceVariant : 'transparent' },
      ]}
    >
      <Ionicons name={icon} size={22} color={color.textSecondary} />
      <ThemedText style={[styles.navLabel, { color: color.text }]}>
        {label}
      </ThemedText>
    </Pressable>
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
  },
  navItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  navLabel: {
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
