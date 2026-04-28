import { StyleSheet, Pressable, View, ScrollView, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/node_modules/react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';

const FEATURES: {
  icon: keyof typeof Ionicons.glyphMap;
  titleKey: string;
  descKey: string;
}[] = [
  { icon: 'star-outline', titleKey: 'premium.feature1Title', descKey: 'premium.feature1Desc' },
  { icon: 'flash-outline', titleKey: 'premium.feature2Title', descKey: 'premium.feature2Desc' },
  { icon: 'archive-outline', titleKey: 'premium.feature3Title', descKey: 'premium.feature3Desc' },
  { icon: 'gift-outline', titleKey: 'premium.feature4Title', descKey: 'premium.feature4Desc' },
];

export default function PremiumScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { resolvedTheme, fontScale, isPremium, setIsPremium } = useSettings();
  const colors = Colors[resolvedTheme];

  function handleSubscribe() {
    setIsPremium(true);
  }

  function handleCancel() {
    Alert.alert(
      t('premium.cancelConfirmTitle'),
      t('premium.cancelConfirmMessage'),
      [
        { text: t('premium.cancelConfirmNo'), style: 'cancel' },
        {
          text: t('premium.cancelConfirmYes'),
          style: 'destructive',
          onPress: () => setIsPremium(false),
        },
      ],
    );
  }

  return (
    <ThemedView
      style={[styles.container, { paddingTop: insets.top }]}
      lightColor={colors.background}
      darkColor={colors.background}
    >
      <View style={[styles.topBar, { borderBottomColor: colors.border }]}>
        <Pressable onPress={() => router.push('/lobby' as any)} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <ThemedText type="defaultSemiBold" style={[styles.topTitle, { fontSize: 17 * fontScale }]}>
          {t('premium.title')}
        </ThemedText>
        <View style={styles.backBtn} />
      </View>

      <ScrollView contentContainerStyle={[styles.content, { paddingBottom: insets.bottom + 32 }]} showsVerticalScrollIndicator={false}>
        {/* Hero */}
        <View style={styles.hero}>
          <View style={[styles.heroIcon, { backgroundColor: colors.primary + '18' }]}>
            <Ionicons name="bulb-outline" size={48} color={colors.primary} />
          </View>
          <View style={[styles.premiumBadge, { backgroundColor: colors.primary }]}>
            <Ionicons name="star" size={12} color="#fff" />
            <ThemedText style={styles.premiumBadgeText}>PREMIUM</ThemedText>
          </View>
          <ThemedText type="title" style={[styles.heroTitle, { fontSize: 28 * fontScale }]}>
            {t('premium.title')}
          </ThemedText>
          <ThemedText style={[styles.heroSubtitle, { color: colors.textSecondary, fontSize: 15 * fontScale }]}>
            {t('premium.subtitle')}
          </ThemedText>
          {!isPremium && (
            <View style={[styles.priceTag, { backgroundColor: colors.surfaceVariant }]}>
              <ThemedText type="defaultSemiBold" style={[styles.priceText, { color: colors.primary, fontSize: 20 * fontScale }]}>
                {t('premium.price')}
              </ThemedText>
            </View>
          )}
        </View>

        {isPremium ? (
          /* Active premium state */
          <View style={[styles.activeCard, { backgroundColor: colors.primary + '15', borderColor: colors.primary + '40' }]}>
            <Ionicons name="checkmark-circle" size={32} color={colors.primary} />
            <ThemedText type="defaultSemiBold" style={[styles.activeTitle, { fontSize: 18 * fontScale }]}>
              {t('premium.activeTitle')}
            </ThemedText>
            <ThemedText style={[styles.activeDesc, { color: colors.textSecondary, fontSize: 14 * fontScale }]}>
              {t('premium.activeDesc')}
            </ThemedText>
          </View>
        ) : (
          /* Feature list */
          <View style={[styles.featureList, { backgroundColor: colors.surface, borderColor: colors.border }]}>
            {FEATURES.map((f, i) => (
              <View
                key={f.titleKey}
                style={[
                  styles.featureRow,
                  i < FEATURES.length - 1 && { borderBottomWidth: 1, borderBottomColor: colors.border },
                ]}
              >
                <View style={[styles.featureIcon, { backgroundColor: colors.primary + '15' }]}>
                  <Ionicons name={f.icon} size={22} color={colors.primary} />
                </View>
                <View style={styles.featureText}>
                  <ThemedText type="defaultSemiBold" style={[styles.featureTitle, { fontSize: 15 * fontScale }]}>
                    {t(f.titleKey)}
                  </ThemedText>
                  <ThemedText style={[styles.featureDesc, { color: colors.textSecondary, fontSize: 13 * fontScale }]}>
                    {t(f.descKey)}
                  </ThemedText>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* CTA buttons */}
        <View style={styles.actions}>
          {isPremium ? (
            <Pressable
              onPress={handleCancel}
              style={({ pressed }) => [
                styles.btn,
                styles.btnOutline,
                { borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
              ]}
            >
              <ThemedText style={[styles.btnText, { color: colors.textSecondary, fontSize: 15 * fontScale }]}>
                {t('premium.cancelButton')}
              </ThemedText>
            </Pressable>
          ) : (
            <>
              <Pressable
                onPress={handleSubscribe}
                style={({ pressed }) => [
                  styles.btn,
                  styles.btnPrimary,
                  { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
                ]}
              >
                <Ionicons name="star-outline" size={18} color="#fff" />
                <ThemedText style={[styles.btnText, { color: '#fff', fontSize: 16 * fontScale }]}>
                  {t('premium.subscribeButton')}
                </ThemedText>
              </Pressable>
              <Pressable
                onPress={() => {}}
                style={({ pressed }) => [styles.btn, styles.btnGhost, { opacity: pressed ? 0.6 : 1 }]}
              >
                <ThemedText style={[styles.btnText, { color: colors.textSecondary, fontSize: 14 * fontScale }]}>
                  {t('premium.restoreButton')}
                </ThemedText>
              </Pressable>
            </>
          )}
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  backBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  topTitle: { flex: 1, textAlign: 'center' },
  content: { paddingHorizontal: 24, paddingTop: 32, gap: 24 },
  hero: { alignItems: 'center', gap: 12 },
  heroIcon: { width: 88, height: 88, borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  premiumBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: -8,
  },
  premiumBadgeText: { color: '#fff', fontSize: 11, fontWeight: '700', letterSpacing: 0.5 },
  heroTitle: { textAlign: 'center' },
  heroSubtitle: { textAlign: 'center', lineHeight: 22 },
  priceTag: { paddingHorizontal: 20, paddingVertical: 8, borderRadius: 20 },
  priceText: { fontWeight: '700' },
  activeCard: {
    alignItems: 'center',
    gap: 10,
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
  },
  activeTitle: { textAlign: 'center' },
  activeDesc: { textAlign: 'center', lineHeight: 20 },
  featureList: { borderRadius: 16, borderWidth: 1, overflow: 'hidden' },
  featureRow: { flexDirection: 'row', alignItems: 'center', padding: 16, gap: 14 },
  featureIcon: { width: 44, height: 44, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  featureText: { flex: 1, gap: 2 },
  featureTitle: {},
  featureDesc: { lineHeight: 18 },
  actions: { gap: 12 },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 30,
  },
  btnPrimary: {},
  btnOutline: { borderWidth: 1 },
  btnGhost: {},
  btnText: { fontWeight: '600' },
});
