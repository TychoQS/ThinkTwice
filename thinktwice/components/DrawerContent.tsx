import { StyleSheet, Pressable, View } from 'react-native';
import { useRouter, usePathname } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { DrawerContentComponentProps } from '@react-navigation/drawer';

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

export function DrawerContent(_props: DrawerContentComponentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { resolvedTheme } = useSettings();
  const colors = Colors[resolvedTheme];

  const navigate = (route: '/' | '/settings') => {
    router.push(route);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16, backgroundColor: colors.surface }]}>
      {/* Brand */}
      <View style={styles.brand}>
        <ThemedText type="defaultSemiBold" style={[styles.brandText, { color: colors.primary }]}>
          ThinkTwice
        </ThemedText>
      </View>

      {/* Nav items */}
      <View style={styles.nav}>
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
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
  },
  brand: {
    paddingVertical: 16,
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  brandText: {
    fontSize: 20,
  },
  nav: {
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
});
