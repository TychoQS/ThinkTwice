import { StyleSheet, View, Pressable, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/node_modules/react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';

export default function WelcomeScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { resolvedTheme, fontScale } = useSettings();
  const colors = Colors[resolvedTheme];
  const { width } = useWindowDimensions();

  const horizontalPad = width < 360 ? 16 : 24;

  return (
    <ThemedView
      style={[styles.container, { paddingTop: insets.top, paddingBottom: insets.bottom }]}
      lightColor={colors.background}
      darkColor={colors.background}
    >
      <View style={[styles.topBar, { paddingHorizontal: horizontalPad }]}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.hamburger}
        >
          <Ionicons name="menu" size={26} color={colors.text} />
        </Pressable>
      </View>
      <View style={[styles.content, { paddingHorizontal: horizontalPad }]}>
        <View style={styles.iconContainer}>
          <Ionicons name="bulb-outline" size={80} color={colors.primary} />
        </View>

        <ThemedText type="title" style={[styles.title, { fontSize: 32 * fontScale }]}>
          {t('welcome.title')}
        </ThemedText>

        <ThemedText
          type="defaultSemiBold"
          style={[styles.subtitle, { color: colors.secondary, fontSize: 18 * fontScale }]}
        >
          {t('welcome.subtitle')}
        </ThemedText>

        <ThemedText
          style={[styles.description, { color: colors.textSecondary, fontSize: 15 * fontScale }]}
        >
          {t('welcome.description')}
        </ThemedText>

        <View style={styles.spacer} />

        <Pressable
          onPress={() => router.push('/lobby' as any)}
          style={({ pressed }) => [
            styles.button,
            {
              backgroundColor: colors.primary,
              opacity: pressed ? 0.8 : 1,
            },
          ]}
        >
          <ThemedText type="defaultSemiBold" style={[styles.buttonText, { fontSize: 16 * fontScale }]}>
            {t('welcome.getStarted')}
          </ThemedText>
          <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
        </Pressable>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  hamburger: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    lineHeight: 22,
    maxWidth: '85%',
  },
  spacer: {
    flex: 1,
    maxHeight: 60,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 30,
    width: '100%',
    maxWidth: 320,
    gap: 8,
    marginTop: 'auto',
  },
  buttonText: {
    color: '#FFFFFF',
  },
});
