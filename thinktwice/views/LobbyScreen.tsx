import { StyleSheet, Pressable, useWindowDimensions, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/node_modules/react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';

interface OptionCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  accentColor: string;
  onPress: () => void;
  colors: typeof Colors.light;
  fullWidth?: boolean;
}

function OptionCard({ icon, title, description, accentColor, onPress, colors, fullWidth }: OptionCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        fullWidth ? { flexDirection: 'row', alignItems: 'center' } : { flex: 1, alignItems: 'center' },
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          opacity: pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={[styles.cardIcon, { backgroundColor: accentColor + '15' }]}>
        <Ionicons name={icon} size={36} color={accentColor} />
      </View>
      <View style={fullWidth ? { flex: 1, alignItems: 'flex-start' } : { alignItems: 'center' }}>
        <ThemedText type="defaultSemiBold" style={[styles.cardTitle, fullWidth && { textAlign: 'left' }]}>
          {title}
        </ThemedText>
        <ThemedText style={[styles.cardDescription, { color: colors.textSecondary }, fullWidth && { textAlign: 'left' }]} numberOfLines={fullWidth ? 3 : undefined}>
          {description}
        </ThemedText>
      </View>
    </Pressable>
  );
}

export default function LobbyScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { resolvedTheme, fontScale } = useSettings();
  const colors = Colors[resolvedTheme];
  const { width } = useWindowDimensions();

  // Responsive gap and padding
  const horizontalPad = width < 360 ? 16 : 24;

  return (
    <ThemedView
      style={[styles.container, { paddingTop: insets.top }]}
      lightColor={colors.background}
      darkColor={colors.background}
    >
      {/* Top bar with hamburger */}
      <View style={[styles.topBar, { paddingHorizontal: horizontalPad }]}>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.hamburger}
        >
          <Ionicons name="menu" size={26} color={colors.text} />
        </Pressable>
        <ThemedText type="defaultSemiBold" style={[styles.appTitle, { fontSize: 18 * fontScale }]}>
          ThinkTwice
        </ThemedText>
        <View style={styles.hamburger} />
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 32 }} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={[styles.header, { paddingHorizontal: horizontalPad }]}>
          <ThemedText
            type="title"
            style={[styles.title, { fontSize: 26 * fontScale }]}
          >
            {t('lobby.title')}
          </ThemedText>
          <ThemedText
            style={[styles.subtitle, { color: colors.textSecondary, fontSize: 14 * fontScale }]}
          >
            {t('lobby.subtitle')}
          </ThemedText>
        </View>

        {/* Horizontal option cards */}
        <View style={[styles.cardsRow, { paddingHorizontal: horizontalPad }]}>
          <OptionCard
            icon="chatbubbles-outline"
            title={t('lobby.chatbot.title')}
            description={t('lobby.chatbot.description')}
            accentColor={colors.primary}
            colors={colors}
            onPress={() => router.push('/chat')}
          />
          <OptionCard
            icon="clipboard-outline"
            title={t('lobby.questionnaire.title')}
            description={t('lobby.questionnaire.description')}
            accentColor={colors.primaryLight}
            colors={colors}
            onPress={() => router.push('/questionnaire')}
          />
        </View>

        <View style={{ paddingHorizontal: horizontalPad, marginTop: 12 }}>
          <OptionCard
            icon="medical-outline"
            title={t('lobby.crisis.title')}
            description={t('lobby.crisis.description')}
            accentColor={colors.secondary}
            colors={colors}
            onPress={() => router.push('/crisis')}
            fullWidth
          />
        </View>
      </ScrollView>
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
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  hamburger: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appTitle: {
    textAlign: 'center',
  },
  header: {
    marginTop: 8,
    marginBottom: 24,
  },
  title: {
    marginBottom: 6,
  },
  subtitle: {
    lineHeight: 20,
  },
  cardsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  card: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    gap: 12,
  },
  cardIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  cardDescription: {
    fontSize: 12,
    lineHeight: 17,
    textAlign: 'center',
  },
});
