import { StyleSheet, Pressable, View, ScrollView, Modal } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/node_modules/react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { saveDecision } from '@/services/decisionLogService';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';
import { useQuestionnaireViewModel } from '@/viewmodels/useQuestionnaireViewModel';
import { QuestionnaireResult, BuyerProfile } from '@/models/questionnaire';

const PROFILE_LABEL_KEYS: Record<BuyerProfile, string> = {
  impulsive: 'questionnaire.profiles.impulsive.label',
  dealHunter: 'questionnaire.profiles.dealHunter.label',
  functional: 'questionnaire.profiles.functional.label',
  budgetConstrained: 'questionnaire.profiles.budgetConstrained.label',
};

// ─── Mode Selection ───────────────────────────────────────────────────────────

function ModeCard({
  icon,
  title,
  description,
  accentColor,
  disabled,
  badge,
  onPress,
  colors,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  accentColor: string;
  disabled?: boolean;
  badge?: string;
  onPress: () => void;
  colors: typeof Colors.light;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.modeCard,
        {
          backgroundColor: colors.surface,
          borderColor: disabled ? colors.border : accentColor + '40',
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
      ]}
    >
      <View style={[styles.modeCardIcon, { backgroundColor: accentColor + '15' }]}>
        <Ionicons name={icon} size={32} color={accentColor} />
      </View>
      <View style={styles.modeCardText}>
        <View style={styles.modeCardTitleRow}>
          <ThemedText type="defaultSemiBold" style={styles.modeCardTitle}>
            {title}
          </ThemedText>
          {badge && (
            <View style={[styles.badge, { backgroundColor: colors.surfaceVariant }]}>
              <ThemedText style={[styles.badgeText, { color: colors.textSecondary }]}>
                {badge}
              </ThemedText>
            </View>
          )}
        </View>
        <ThemedText style={[styles.modeCardDesc, { color: colors.textSecondary }]}>
          {description}
        </ThemedText>
      </View>
      {!disabled && (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      )}
    </Pressable>
  );
}

function ModeSelectionPhase({
  onStartQuickTest,
  onStartProfileTest,
  colors,
  fontScale,
}: {
  onStartQuickTest: () => void;
  onStartProfileTest: () => void;
  colors: typeof Colors.light;
  fontScale: number;
}) {
  const { t } = useTranslation();

  return (
    <View style={styles.phaseContainer}>
      <ThemedText type="title" style={[styles.phaseTitle, { fontSize: 26 * fontScale }]}>
        {t('questionnaire.modeTitle')}
      </ThemedText>
      <ThemedText style={[styles.phaseSubtitle, { color: colors.textSecondary, fontSize: 14 * fontScale }]}>
        {t('questionnaire.modeSubtitle')}
      </ThemedText>

      <View style={styles.modeCards}>
        <ModeCard
          icon="flash-outline"
          title={t('questionnaire.quickTest.title')}
          description={t('questionnaire.quickTest.description')}
          accentColor={colors.primaryLight}
          onPress={onStartQuickTest}
          colors={colors}
        />
        <ModeCard
          icon="options-outline"
          title={t('questionnaire.customTest.title')}
          description={t('questionnaire.customTest.description')}
          accentColor={colors.primaryDark}
          onPress={onStartProfileTest}
          colors={colors}
        />
      </View>
    </View>
  );
}

// ─── Profile Detection ────────────────────────────────────────────────────────

function ProfileDetectionPhase({
  detectionIndex,
  totalDetectionQuestions,
  questionTextKey,
  options,
  selectedOptionId,
  canGoNext,
  isLastDetectionQuestion,
  onSelectOption,
  onNext,
  onBack,
  colors,
  fontScale,
}: {
  detectionIndex: number;
  totalDetectionQuestions: number;
  questionTextKey: string;
  options: { id: string; textKey: string }[];
  selectedOptionId: string | null;
  canGoNext: boolean;
  isLastDetectionQuestion: boolean;
  onSelectOption: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
  colors: typeof Colors.light;
  fontScale: number;
}) {
  const { t } = useTranslation();
  const progress = (detectionIndex + 1) / totalDetectionQuestions;

  return (
    <View style={styles.phaseContainer}>
      {/* Header */}
      <ThemedText type="defaultSemiBold" style={[styles.detectionTitle, { fontSize: 18 * fontScale }]}>
        {t('questionnaire.profileDetection.title')}
      </ThemedText>
      <ThemedText style={[styles.detectionSubtitle, { color: colors.textSecondary, fontSize: 13 * fontScale }]}>
        {t('questionnaire.profileDetection.subtitle')}
      </ThemedText>

      {/* Progress */}
      <View style={styles.progressContainer}>
        <ThemedText style={[styles.progressText, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>
          {t('questionnaire.progress', { current: detectionIndex + 1, total: totalDetectionQuestions })}
        </ThemedText>
        <View style={[styles.progressTrack, { backgroundColor: colors.surfaceVariant }]}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: colors.primaryDark, width: `${progress * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Question */}
      <ThemedText type="defaultSemiBold" style={[styles.questionText, { fontSize: 20 * fontScale }]}>
        {t(questionTextKey)}
      </ThemedText>

      {/* Options */}
      <ScrollView style={styles.optionsList} contentContainerStyle={styles.optionsContent} showsVerticalScrollIndicator={false}>
        {options.map(option => {
          const isSelected = selectedOptionId === option.id;
          return (
            <Pressable
              key={option.id}
              onPress={() => onSelectOption(option.id)}
              style={({ pressed }) => [
                styles.optionCard,
                {
                  backgroundColor: isSelected ? colors.primaryDark + '18' : colors.surface,
                  borderColor: isSelected ? colors.primaryDark : colors.border,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View
                style={[
                  styles.optionIndicator,
                  {
                    borderColor: isSelected ? colors.primaryDark : colors.border,
                    backgroundColor: isSelected ? colors.primaryDark : 'transparent',
                  },
                ]}
              >
                {isSelected && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              <ThemedText style={[styles.optionText, { fontSize: 15 * fontScale }]}>
                {t(option.textKey)}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navRow}>
        <Pressable onPress={onBack} style={[styles.navButton, { backgroundColor: colors.surfaceVariant }]}>
          <Ionicons name="arrow-back" size={18} color={colors.text} />
          <ThemedText style={[styles.navButtonText, { fontSize: 14 * fontScale }]}>
            {t('questionnaire.back')}
          </ThemedText>
        </Pressable>
        <Pressable
          onPress={onNext}
          disabled={!canGoNext}
          style={[
            styles.navButton,
            styles.navButtonPrimary,
            { backgroundColor: canGoNext ? colors.primaryDark : colors.surfaceVariant },
          ]}
        >
          <ThemedText style={[styles.navButtonText, { fontSize: 14 * fontScale, color: canGoNext ? '#fff' : colors.textSecondary }]}>
            {isLastDetectionQuestion ? t('questionnaire.start') : t('questionnaire.next')}
          </ThemedText>
          <Ionicons
            name={isLastDetectionQuestion ? 'checkmark-circle-outline' : 'arrow-forward'}
            size={18}
            color={canGoNext ? '#fff' : colors.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
}

// ─── Profile Info Modal ───────────────────────────────────────────────────────

function ProfileInfoModal({
  profile,
  isVisible,
  onClose,
  colors,
  fontScale,
}: {
  profile: BuyerProfile | null;
  isVisible: boolean;
  onClose: () => void;
  colors: typeof Colors.light;
  fontScale: number;
}) {
  const { t } = useTranslation();
  if (!profile) return null;

  const labelKey = `questionnaire.profiles.${profile}.label` as const;
  const subtitleKey = `questionnaire.profiles.${profile}.subtitle` as const;
  const descKey = `questionnaire.profiles.${profile}.description` as const;
  const tip1Key = `questionnaire.profiles.${profile}.tip1` as const;
  const tip2Key = `questionnaire.profiles.${profile}.tip2` as const;
  const tip3Key = `questionnaire.profiles.${profile}.tip3` as const;

  const PROFILE_ICONS: Record<BuyerProfile, keyof typeof Ionicons.glyphMap> = {
    impulsive: 'flash-outline',
    dealHunter: 'pricetag-outline',
    functional: 'construct-outline',
    budgetConstrained: 'wallet-outline',
  };

  const PROFILE_COLORS: Record<BuyerProfile, string> = {
    impulsive: '#EF4444',
    dealHunter: '#F59E0B',
    functional: '#3B82F6',
    budgetConstrained: '#10B981',
  };

  const accentColor = PROFILE_COLORS[profile];

  return (
    <Modal visible={isVisible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.modalOverlay} onPress={onClose}>
        <Pressable
          style={[styles.modalSheet, { backgroundColor: colors.surface }]}
          onPress={() => {}}
        >
          {/* Handle */}
          <View style={[styles.modalHandle, { backgroundColor: colors.border }]} />

          {/* Profile header */}
          <View style={styles.modalHeader}>
            <View style={[styles.modalProfileIcon, { backgroundColor: accentColor + '18' }]}>
              <Ionicons name={PROFILE_ICONS[profile]} size={32} color={accentColor} />
            </View>
            <View style={styles.modalHeaderText}>
              <ThemedText type="defaultSemiBold" style={[styles.modalProfileLabel, { fontSize: 18 * fontScale }]}>
                {t(labelKey)}
              </ThemedText>
              <ThemedText style={[styles.modalProfileSub, { color: accentColor, fontSize: 13 * fontScale }]}>
                {t(subtitleKey)}
              </ThemedText>
            </View>
          </View>

          {/* Description */}
          <ThemedText style={[styles.modalDesc, { color: colors.textSecondary, fontSize: 14 * fontScale }]}>
            {t(descKey)}
          </ThemedText>

          {/* Tips */}
          <ThemedText type="defaultSemiBold" style={[styles.modalTipsTitle, { fontSize: 14 * fontScale, color: colors.text }]}>
            {t('questionnaire.profileModal.tipsTitle')}
          </ThemedText>
          {[tip1Key, tip2Key, tip3Key].map((tipKey, i) => (
            <View key={i} style={styles.modalTipRow}>
              <View style={[styles.modalTipDot, { backgroundColor: accentColor }]} />
              <ThemedText style={[styles.modalTipText, { color: colors.textSecondary, fontSize: 13 * fontScale }]}>
                {t(tipKey)}
              </ThemedText>
            </View>
          ))}

          {/* Close button */}
          <Pressable
            onPress={onClose}
            style={({ pressed }) => [
              styles.modalCloseBtn,
              { backgroundColor: colors.surfaceVariant, opacity: pressed ? 0.7 : 1 },
            ]}
          >
            <ThemedText style={[styles.modalCloseBtnText, { fontSize: 15 * fontScale }]}>
              {t('questionnaire.profileModal.close')}
            </ThemedText>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

// ─── Questions ────────────────────────────────────────────────────────────────

function QuestionsPhase({
  currentIndex,
  totalQuestions,
  questionTextKey,
  options,
  selectedOptionId,
  canGoNext,
  isLastQuestion,
  profileBadge,
  onSelectOption,
  onNext,
  onBack,
  onProfileBadgePress,
  colors,
  fontScale,
}: {
  currentIndex: number;
  totalQuestions: number;
  questionTextKey: string;
  options: { id: string; textKey: string; score: number }[];
  selectedOptionId: string | null;
  canGoNext: boolean;
  isLastQuestion: boolean;
  profileBadge?: string;
  onSelectOption: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
  onProfileBadgePress?: () => void;
  colors: typeof Colors.light;
  fontScale: number;
}) {
  const { t } = useTranslation();
  const progress = (currentIndex + 1) / totalQuestions;

  return (
    <View style={styles.phaseContainer}>
      {/* Profile badge */}
      {profileBadge && (
        <Pressable
          onPress={onProfileBadgePress}
          style={({ pressed }) => [
            styles.profileBadge,
            { backgroundColor: colors.surfaceVariant, opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <Ionicons name="person-outline" size={12} color={colors.textSecondary} />
          <ThemedText style={[styles.profileBadgeText, { color: colors.textSecondary, fontSize: 11 * fontScale }]}>
            {profileBadge}
          </ThemedText>
          <Ionicons name="information-circle-outline" size={12} color={colors.textSecondary} />
        </Pressable>
      )}
      {/* Progress */}
      <View style={styles.progressContainer}>
        <ThemedText style={[styles.progressText, { color: colors.textSecondary, fontSize: 12 * fontScale }]}>
          {t('questionnaire.progress', { current: currentIndex + 1, total: totalQuestions })}
        </ThemedText>
        <View style={[styles.progressTrack, { backgroundColor: colors.surfaceVariant }]}>
          <View
            style={[
              styles.progressFill,
              { backgroundColor: colors.primary, width: `${progress * 100}%` },
            ]}
          />
        </View>
      </View>

      {/* Question */}
      <ThemedText type="defaultSemiBold" style={[styles.questionText, { fontSize: 20 * fontScale }]}>
        {t(questionTextKey)}
      </ThemedText>

      {/* Options */}
      <ScrollView
        style={styles.optionsList}
        contentContainerStyle={styles.optionsContent}
        showsVerticalScrollIndicator={false}
      >
        {options.map(option => {
          const isSelected = selectedOptionId === option.id;
          return (
            <Pressable
              key={option.id}
              onPress={() => onSelectOption(option.id)}
              style={({ pressed }) => [
                styles.optionCard,
                {
                  backgroundColor: isSelected ? colors.primary + '18' : colors.surface,
                  borderColor: isSelected ? colors.primary : colors.border,
                  opacity: pressed ? 0.8 : 1,
                },
              ]}
            >
              <View
                style={[
                  styles.optionIndicator,
                  {
                    borderColor: isSelected ? colors.primary : colors.border,
                    backgroundColor: isSelected ? colors.primary : 'transparent',
                  },
                ]}
              >
                {isSelected && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              <ThemedText style={[styles.optionText, { fontSize: 15 * fontScale }]}>
                {t(option.textKey)}
              </ThemedText>
            </Pressable>
          );
        })}
      </ScrollView>

      {/* Navigation */}
      <View style={styles.navRow}>
        <Pressable
          onPress={onBack}
          style={[styles.navButton, { backgroundColor: colors.surfaceVariant }]}
        >
          <Ionicons name="arrow-back" size={18} color={colors.text} />
          <ThemedText style={[styles.navButtonText, { fontSize: 14 * fontScale }]}>
            {t('questionnaire.back')}
          </ThemedText>
        </Pressable>
        <Pressable
          onPress={onNext}
          disabled={!canGoNext}
          style={[
            styles.navButton,
            styles.navButtonPrimary,
            {
              backgroundColor: canGoNext ? colors.primary : colors.surfaceVariant,
            },
          ]}
        >
          <ThemedText
            style={[
              styles.navButtonText,
              { fontSize: 14 * fontScale, color: canGoNext ? '#fff' : colors.textSecondary },
            ]}
          >
            {isLastQuestion ? t('questionnaire.result.title') : t('questionnaire.next')}
          </ThemedText>
          <Ionicons
            name={isLastQuestion ? 'checkmark-circle-outline' : 'arrow-forward'}
            size={18}
            color={canGoNext ? '#fff' : colors.textSecondary}
          />
        </Pressable>
      </View>
    </View>
  );
}

// ─── Result ───────────────────────────────────────────────────────────────────

const RESULT_CONFIG: Record<
  QuestionnaireResult['recommendation'],
  { icon: keyof typeof Ionicons.glyphMap; colorKey: 'proceed' | 'wait' | 'avoid' }
> = {
  proceed: { icon: 'checkmark-circle', colorKey: 'proceed' },
  wait: { icon: 'time', colorKey: 'wait' },
  avoid: { icon: 'close-circle', colorKey: 'avoid' },
};

const RESULT_COLORS: Record<'proceed' | 'wait' | 'avoid', { bg: string; icon: string }> = {
  proceed: { bg: '#D1FAE5', icon: '#059669' },
  wait: { bg: '#FEF3C7', icon: '#D97706' },
  avoid: { bg: '#FEE2E2', icon: '#DC2626' },
};

function ResultPhase({
  result,
  mode,
  profile,
  onTryAgain,
  onBackHome,
  colors,
  fontScale,
}: {
  result: QuestionnaireResult;
  mode: 'quick' | 'profile';
  profile?: string;
  onTryAgain: () => void;
  onBackHome: () => void;
  colors: typeof Colors.light;
  fontScale: number;
}) {
  const { t } = useTranslation();
  const [loggedDecision, setLoggedDecision] = useState<'bought' | 'skipped' | 'pending' | null>(null);

  function handleDecision(d: 'bought' | 'skipped' | 'pending') {
    setLoggedDecision(d);
    saveDecision({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      timestamp: Date.now(),
      recommendation: result.recommendation,
      decision: d,
      mode,
      profile,
    });
  }

  const config = RESULT_CONFIG[result.recommendation];
  const resultColors = RESULT_COLORS[result.recommendation];
  const labelKey = `questionnaire.result.${result.recommendation}.label` as const;
  const descKey = `questionnaire.result.${result.recommendation}.description` as const;

  return (
    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={[styles.phaseContainer, styles.resultContainer]}
      showsVerticalScrollIndicator={false}
    >
      <View style={[styles.resultIconWrap, { backgroundColor: resultColors.bg }]}>
        <Ionicons name={config.icon} size={64} color={resultColors.icon} />
      </View>

      <ThemedText type="title" style={[styles.resultLabel, { fontSize: 28 * fontScale }]}>
        {t(labelKey)}
      </ThemedText>

      <ThemedText style={[styles.resultDesc, { color: colors.textSecondary, fontSize: 15 * fontScale }]}>
        {t(descKey)}
      </ThemedText>

      {/* Score indicator */}
      <View style={[styles.scoreWrap, { backgroundColor: colors.surfaceVariant }]}>
        <ThemedText style={[styles.scoreText, { color: colors.textSecondary, fontSize: 13 * fontScale }]}>
          Score: {result.score} / {result.maxScore}
        </ThemedText>
        <View style={[styles.scoreTrack, { backgroundColor: colors.border }]}>
          <View
            style={[
              styles.scoreFill,
              {
                backgroundColor: resultColors.icon,
                width: `${Math.max(0, (result.score / result.maxScore) * 100)}%`,
              },
            ]}
          />
        </View>
      </View>

      {/* Decision log */}
      <View style={[styles.decisionCard, { backgroundColor: colors.surfaceVariant }]}>
        <ThemedText type="defaultSemiBold" style={[styles.decisionTitle, { fontSize: 14 * fontScale }]}>
          {loggedDecision ? t('questionnaire.result.decisionLogged') : t('questionnaire.result.decisionPrompt')}
        </ThemedText>
        {!loggedDecision ? (
          <View style={styles.decisionButtons}>
            {(['bought', 'skipped', 'pending'] as const).map((d) => (
              <Pressable
                key={d}
                onPress={() => handleDecision(d)}
                style={({ pressed }) => [
                  styles.decisionBtn,
                  { backgroundColor: colors.surface, borderColor: colors.border, opacity: pressed ? 0.7 : 1 },
                ]}
              >
                <ThemedText style={[styles.decisionBtnText, { color: colors.text, fontSize: 12 * fontScale }]}>
                  {t(`questionnaire.result.decision${d.charAt(0).toUpperCase() + d.slice(1)}` as any)}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        ) : (
          <View style={styles.decisionLogged}>
            <Ionicons name="checkmark-circle" size={18} color={colors.primary} />
            <ThemedText style={[{ color: colors.primary, fontSize: 13 * fontScale }]}>
              {t(`questionnaire.result.decision${loggedDecision.charAt(0).toUpperCase() + loggedDecision.slice(1)}` as any)}
            </ThemedText>
          </View>
        )}
      </View>

      <View style={styles.resultActions}>
        <Pressable
          onPress={onTryAgain}
          style={({ pressed }) => [
            styles.resultButton,
            { backgroundColor: colors.surfaceVariant, opacity: pressed ? 0.8 : 1 },
          ]}
        >
          <Ionicons name="refresh-outline" size={18} color={colors.text} />
          <ThemedText style={[styles.resultButtonText, { fontSize: 14 * fontScale }]}>
            {t('questionnaire.result.tryAgain')}
          </ThemedText>
        </Pressable>
        <Pressable
          onPress={onBackHome}
          style={({ pressed }) => [
            styles.resultButton,
            styles.resultButtonPrimary,
            { backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 },
          ]}
        >
          <Ionicons name="home-outline" size={18} color="#fff" />
          <ThemedText style={[styles.resultButtonText, { fontSize: 14 * fontScale, color: '#fff' }]}>
            {t('questionnaire.result.backHome')}
          </ThemedText>
        </Pressable>
      </View>
    </ScrollView>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function QuestionnaireScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { resolvedTheme, fontScale } = useSettings();
  const colors = Colors[resolvedTheme];
  const [showProfileModal, setShowProfileModal] = useState(false);

  const vm = useQuestionnaireViewModel();

  const profileBadge = vm.detectedProfile ? t(PROFILE_LABEL_KEYS[vm.detectedProfile]) : undefined;

  function handleBack() {
    if (vm.phase === 'mode-selection') {
      router.push('/lobby' as any);
    } else if (vm.phase === 'result') {
      vm.reset();
    } else if (vm.phase === 'profile-detection') {
      vm.goBackDetection();
    } else {
      vm.goBack();
    }
  }

  return (
    <ThemedView
      style={[styles.container, { paddingTop: insets.top }]}
      lightColor={colors.background}
      darkColor={colors.background}
    >
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable onPress={handleBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <ThemedText type="defaultSemiBold" style={[styles.screenTitle, { fontSize: 17 * fontScale }]}>
          {t('lobby.questionnaire.title')}
        </ThemedText>
        <View style={styles.backButton} />
      </View>

      {/* Phase content */}
      {vm.phase === 'mode-selection' && (
        <ModeSelectionPhase
          onStartQuickTest={vm.startQuickTest}
          onStartProfileTest={vm.startProfileTest}
          colors={colors}
          fontScale={fontScale}
        />
      )}

      {vm.phase === 'profile-detection' && vm.currentDetectionQuestion && (
        <ProfileDetectionPhase
          detectionIndex={vm.detectionIndex}
          totalDetectionQuestions={vm.totalDetectionQuestions}
          questionTextKey={vm.currentDetectionQuestion.textKey}
          options={vm.currentDetectionQuestion.options}
          selectedOptionId={vm.detectionOptionId}
          canGoNext={vm.canGoNextDetection}
          isLastDetectionQuestion={vm.isLastDetectionQuestion}
          onSelectOption={vm.selectDetectionOption}
          onNext={vm.goNextDetection}
          onBack={vm.goBackDetection}
          colors={colors}
          fontScale={fontScale}
        />
      )}

      {vm.phase === 'questions' && vm.currentQuestion && (
        <QuestionsPhase
          currentIndex={vm.currentIndex}
          totalQuestions={vm.totalQuestions}
          questionTextKey={vm.currentQuestion.textKey}
          options={vm.currentQuestion.options}
          selectedOptionId={vm.selectedOptionId}
          canGoNext={vm.canGoNext}
          isLastQuestion={vm.isLastQuestion}
          profileBadge={profileBadge}
          onSelectOption={vm.selectOption}
          onNext={vm.goNext}
          onBack={vm.goBack}
          onProfileBadgePress={vm.detectedProfile ? () => setShowProfileModal(true) : undefined}
          colors={colors}
          fontScale={fontScale}
        />
      )}

      {vm.phase === 'result' && (
        <ResultPhase
          result={vm.result}
          mode={vm.mode}
          profile={vm.detectedProfile ?? undefined}
          onTryAgain={vm.reset}
          onBackHome={() => router.push('/lobby' as any)}
          colors={colors}
          fontScale={fontScale}
        />
      )}

      {/* Profile info modal */}
      <ProfileInfoModal
        profile={vm.detectedProfile}
        isVisible={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        colors={colors}
        fontScale={fontScale}
      />
    </ThemedView>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  screenTitle: {
    textAlign: 'center',
  },
  phaseContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  phaseTitle: {
    marginBottom: 6,
  },
  phaseSubtitle: {
    lineHeight: 20,
    marginBottom: 28,
  },
  // Mode cards
  modeCards: {
    gap: 14,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1.5,
    gap: 14,
  },
  modeCardIcon: {
    width: 52,
    height: 52,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modeCardText: {
    flex: 1,
    gap: 4,
  },
  modeCardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modeCardTitle: {
    fontSize: 16,
  },
  modeCardDesc: {
    fontSize: 13,
    lineHeight: 18,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
  },
  // Profile detection
  detectionTitle: {
    marginBottom: 4,
  },
  detectionSubtitle: {
    lineHeight: 18,
    marginBottom: 20,
  },
  // Profile badge (shown during questions phase)
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  profileBadgeText: {
    fontWeight: '600',
  },
  // Questions
  progressContainer: {
    marginBottom: 24,
    gap: 8,
  },
  progressText: {
    textAlign: 'right',
  },
  progressTrack: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  questionText: {
    lineHeight: 30,
    marginBottom: 20,
  },
  optionsList: {
    flex: 1,
  },
  optionsContent: {
    gap: 10,
    paddingBottom: 8,
  },
  optionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1.5,
    gap: 14,
  },
  optionIndicator: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  optionText: {
    flex: 1,
    lineHeight: 22,
  },
  navRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 16,
  },
  navButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  navButtonPrimary: {
    flex: 2,
  },
  navButtonText: {
    fontWeight: '600',
  },
  // Result
  resultContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  resultIconWrap: {
    width: 110,
    height: 110,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  resultLabel: {
    textAlign: 'center',
  },
  resultDesc: {
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 8,
  },
  scoreWrap: {
    width: '100%',
    padding: 14,
    borderRadius: 12,
    gap: 8,
    marginTop: 8,
  },
  scoreText: {
    textAlign: 'center',
  },
  scoreTrack: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
  },
  scoreFill: {
    height: '100%',
    borderRadius: 3,
  },
  resultActions: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  resultButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
  },
  resultButtonPrimary: {
    flex: 1.5,
  },
  resultButtonText: {
    fontWeight: '600',
  },
  // Decision log
  decisionCard: {
    width: '100%',
    padding: 16,
    borderRadius: 14,
    gap: 12,
    marginTop: 4,
  },
  decisionTitle: {
    textAlign: 'center',
  },
  decisionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  decisionBtn: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  decisionBtnText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  decisionLogged: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  // Profile info modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    paddingBottom: 36,
    gap: 16,
  },
  modalHandle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  modalProfileIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeaderText: {
    flex: 1,
    gap: 2,
  },
  modalProfileLabel: {},
  modalProfileSub: {
    fontWeight: '600',
  },
  modalDesc: {
    lineHeight: 21,
  },
  modalTipsTitle: {
    fontWeight: '700',
  },
  modalTipRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  modalTipDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginTop: 6,
    flexShrink: 0,
  },
  modalTipText: {
    flex: 1,
    lineHeight: 19,
  },
  modalCloseBtn: {
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 4,
  },
  modalCloseBtnText: {
    fontWeight: '600',
  },
});
