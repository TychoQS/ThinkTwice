import { StyleSheet, Pressable, View, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/node_modules/react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';
import { useQuestionnaireViewModel } from '@/viewmodels/useQuestionnaireViewModel';
import { QuestionnaireResult } from '@/models/questionnaire';

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
  colors,
  fontScale,
}: {
  onStartQuickTest: () => void;
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
          disabled
          badge={t('questionnaire.customTest.comingSoon')}
          onPress={() => { }}
          colors={colors}
        />
      </View>
    </View>
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
  onSelectOption,
  onNext,
  onBack,
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
  onSelectOption: (id: string) => void;
  onNext: () => void;
  onBack: () => void;
  colors: typeof Colors.light;
  fontScale: number;
}) {
  const { t } = useTranslation();
  const progress = (currentIndex + 1) / totalQuestions;

  return (
    <View style={styles.phaseContainer}>
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
  onTryAgain,
  onBackHome,
  colors,
  fontScale,
}: {
  result: QuestionnaireResult;
  onTryAgain: () => void;
  onBackHome: () => void;
  colors: typeof Colors.light;
  fontScale: number;
}) {
  const { t } = useTranslation();
  const config = RESULT_CONFIG[result.recommendation];
  const resultColors = RESULT_COLORS[result.recommendation];
  const labelKey = `questionnaire.result.${result.recommendation}.label` as const;
  const descKey = `questionnaire.result.${result.recommendation}.description` as const;

  return (
    <View style={[styles.phaseContainer, styles.resultContainer]}>
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
    </View>
  );
}

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function QuestionnaireScreen() {
  const router = useRouter();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { resolvedTheme, fontScale } = useSettings();
  const colors = Colors[resolvedTheme];

  const vm = useQuestionnaireViewModel();

  function handleBack() {
    if (vm.phase === 'mode-selection') {
      router.back();
    } else if (vm.phase === 'result') {
      vm.reset();
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
          onSelectOption={vm.selectOption}
          onNext={vm.goNext}
          onBack={vm.goBack}
          colors={colors}
          fontScale={fontScale}
        />
      )}

      {vm.phase === 'result' && (
        <ResultPhase
          result={vm.result}
          onTryAgain={vm.reset}
          onBackHome={() => router.back()}
          colors={colors}
          fontScale={fontScale}
        />
      )}
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
});
