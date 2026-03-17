import { StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function WelcomeScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + 40 }]}>
      {/* Icon / Brand area */}
      <ThemedView style={styles.heroSection}>
        <ThemedView
          style={[styles.iconCircle, { backgroundColor: colors.primary + '15' }]}
        >
          <Ionicons name="bulb-outline" size={64} color={colors.primary} />
        </ThemedView>

        <ThemedText type="title" style={styles.title}>
          {t('welcome.title')}
        </ThemedText>

        <ThemedText
          style={[styles.subtitle, { color: colors.primary }]}
        >
          {t('welcome.subtitle')}
        </ThemedText>

        <ThemedText
          style={[styles.description, { color: colors.textSecondary }]}
        >
          {t('welcome.description')}
        </ThemedText>
      </ThemedView>

      {/* CTA */}
      <ThemedView style={[styles.bottomSection, { paddingBottom: insets.bottom + 24 }]}>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
          onPress={() => router.push('/lobby')}
        >
          <ThemedText style={styles.buttonText}>
            {t('welcome.getStarted')}
          </ThemedText>
          <Ionicons name="arrow-forward" size={20} color="#fff" />
        </Pressable>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 28,
  },
  heroSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 40,
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 15,
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  bottomSection: {
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    paddingVertical: 16,
    borderRadius: 14,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    fontWeight: '700',
  },
});
