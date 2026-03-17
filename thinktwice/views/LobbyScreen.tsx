import { StyleSheet, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

interface OptionCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  color: string;
  onPress: () => void;
  borderColor: string;
}

function OptionCard({ icon, title, description, color, onPress, borderColor }: OptionCardProps) {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <ThemedView style={[styles.cardIcon, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={32} color={color} />
      </ThemedView>
      <ThemedView style={styles.cardContent}>
        <ThemedText type="defaultSemiBold" style={styles.cardTitle}>
          {title}
        </ThemedText>
        <ThemedText style={[styles.cardDescription, { color: colors.textSecondary }]}>
          {description}
        </ThemedText>
      </ThemedView>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </Pressable>
  );
}

export default function LobbyScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];

  return (
    <ThemedView style={[styles.container, { paddingTop: insets.top + 24 }]}>
      {/* Back button */}
      <Pressable onPress={() => router.back()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color={colors.text} />
      </Pressable>

      {/* Header */}
      <ThemedView style={styles.header}>
        <ThemedText type="title" style={styles.title}>
          {t('lobby.title')}
        </ThemedText>
        <ThemedText style={[styles.subtitle, { color: colors.textSecondary }]}>
          {t('lobby.subtitle')}
        </ThemedText>
      </ThemedView>

      {/* Options */}
      <ThemedView style={styles.options}>
        <OptionCard
          icon="chatbubbles-outline"
          title={t('lobby.chatbot.title')}
          description={t('lobby.chatbot.description')}
          color={colors.primary}
          borderColor={colors.border}
          onPress={() => router.push('/chat')}
        />
        <OptionCard
          icon="clipboard-outline"
          title={t('lobby.questionnaire.title')}
          description={t('lobby.questionnaire.description')}
          color={colors.secondary}
          borderColor={colors.border}
          onPress={() => {
            // Questionnaire screen — not part of US1.5
          }}
        />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 4,
    marginBottom: 16,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
  },
  options: {
    gap: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 16,
  },
  cardIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 17,
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
});
