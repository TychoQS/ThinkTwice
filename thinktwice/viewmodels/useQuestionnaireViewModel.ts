import { useState, useMemo, useCallback } from 'react';
import { GENERIC_QUESTIONS } from '@/data/genericQuestions';
import { PROFILE_DETECTION_QUESTIONS } from '@/data/profileDetectionQuestions';
import { PROFILE_QUESTIONS } from '@/data/profileQuestions';
import { QuestionnaireResult, BuyerProfile } from '@/models/questionnaire';

export type QuestionnairePhase = 'mode-selection' | 'profile-detection' | 'questions' | 'result';
export type QuestionnaireMode = 'quick' | 'profile';

function detectProfile(answers: Record<string, string>): BuyerProfile {
  const scores: Record<BuyerProfile, number> = {
    impulsive: 0, dealHunter: 0, functional: 0, budgetConstrained: 0,
  };

  PROFILE_DETECTION_QUESTIONS.forEach(q => {
    const optId = answers[q.id];
    if (!optId) return;
    const opt = q.options.find(o => o.id === optId);
    if (opt) scores[opt.profile]++;
  });

  const maxScore = Math.max(...Object.values(scores));
  const winners = (Object.entries(scores) as [BuyerProfile, number][])
    .filter(([, s]) => s === maxScore)
    .map(([p]) => p);

  if (winners.length === 1) return winners[0];

  // Tiebreak: first detection question's answer
  const pd1Answer = answers[PROFILE_DETECTION_QUESTIONS[0].id];
  if (pd1Answer) {
    const pd1Opt = PROFILE_DETECTION_QUESTIONS[0].options.find(o => o.id === pd1Answer);
    if (pd1Opt && winners.includes(pd1Opt.profile)) return pd1Opt.profile;
  }
  return winners[0];
}

export function useQuestionnaireViewModel() {
  const [phase, setPhase] = useState<QuestionnairePhase>('mode-selection');
  const [mode, setMode] = useState<QuestionnaireMode>('quick');

  // Profile detection state
  const [detectionIndex, setDetectionIndex] = useState(0);
  const [detectionAnswers, setDetectionAnswers] = useState<Record<string, string>>({});
  const [detectionOptionId, setDetectionOptionId] = useState<string | null>(null);
  const [detectedProfile, setDetectedProfile] = useState<BuyerProfile | null>(null);

  // Questions state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const questions = useMemo(() => {
    if (mode === 'profile' && detectedProfile) return PROFILE_QUESTIONS[detectedProfile];
    return GENERIC_QUESTIONS;
  }, [mode, detectedProfile]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const currentDetectionQuestion = PROFILE_DETECTION_QUESTIONS[detectionIndex];
  const totalDetectionQuestions = PROFILE_DETECTION_QUESTIONS.length;
  const isLastDetectionQuestion = detectionIndex === totalDetectionQuestions - 1;

  // ─── Mode selection ───────────────────────────────────────────────────────────

  const startQuickTest = useCallback(() => {
    setMode('quick');
    setDetectedProfile(null);
    setAnswers({});
    setSelectedOptionId(null);
    setCurrentIndex(0);
    setPhase('questions');
  }, []);

  const startProfileTest = useCallback(() => {
    setMode('profile');
    setDetectedProfile(null);
    setDetectionAnswers({});
    setDetectionOptionId(null);
    setDetectionIndex(0);
    setPhase('profile-detection');
  }, []);

  // ─── Profile detection ────────────────────────────────────────────────────────

  const selectDetectionOption = useCallback((optionId: string) => {
    setDetectionOptionId(optionId);
    setDetectionAnswers(prev => ({ ...prev, [currentDetectionQuestion.id]: optionId }));
  }, [currentDetectionQuestion]);

  const goNextDetection = useCallback(() => {
    if (!detectionOptionId) return;
    if (isLastDetectionQuestion) {
      const finalAnswers = { ...detectionAnswers, [currentDetectionQuestion.id]: detectionOptionId };
      const profile = detectProfile(finalAnswers);
      setDetectedProfile(profile);
      setAnswers({});
      setSelectedOptionId(null);
      setCurrentIndex(0);
      setPhase('questions');
    } else {
      const nextIdx = detectionIndex + 1;
      setDetectionIndex(nextIdx);
      const nextQ = PROFILE_DETECTION_QUESTIONS[nextIdx];
      setDetectionOptionId(detectionAnswers[nextQ.id] ?? null);
    }
  }, [detectionOptionId, isLastDetectionQuestion, detectionIndex, detectionAnswers, currentDetectionQuestion]);

  const goBackDetection = useCallback(() => {
    if (detectionIndex === 0) {
      setPhase('mode-selection');
      setDetectionOptionId(null);
    } else {
      const prevIdx = detectionIndex - 1;
      setDetectionIndex(prevIdx);
      const prevQ = PROFILE_DETECTION_QUESTIONS[prevIdx];
      setDetectionOptionId(detectionAnswers[prevQ.id] ?? null);
    }
  }, [detectionIndex, detectionAnswers]);

  // ─── Questions ────────────────────────────────────────────────────────────────

  const selectOption = useCallback((optionId: string) => {
    setSelectedOptionId(optionId);
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionId }));
  }, [currentQuestion]);

  const goNext = useCallback(() => {
    if (!selectedOptionId) return;
    if (isLastQuestion) {
      setPhase('result');
    } else {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      const nextQuestion = questions[nextIndex];
      setSelectedOptionId(answers[nextQuestion.id] ?? null);
    }
  }, [selectedOptionId, isLastQuestion, currentIndex, questions, answers]);

  const goBack = useCallback(() => {
    if (currentIndex === 0) {
      if (mode === 'profile') {
        // Return to last detection question
        const lastIdx = PROFILE_DETECTION_QUESTIONS.length - 1;
        setDetectionIndex(lastIdx);
        const lastQ = PROFILE_DETECTION_QUESTIONS[lastIdx];
        setDetectionOptionId(detectionAnswers[lastQ.id] ?? null);
        setPhase('profile-detection');
      } else {
        setPhase('mode-selection');
        setSelectedOptionId(null);
      }
    } else {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const prevQuestion = questions[prevIndex];
      setSelectedOptionId(answers[prevQuestion.id] ?? null);
    }
  }, [currentIndex, questions, answers, mode, detectionAnswers]);

  const reset = useCallback(() => {
    setPhase('mode-selection');
    setMode('quick');
    setCurrentIndex(0);
    setAnswers({});
    setSelectedOptionId(null);
    setDetectionIndex(0);
    setDetectionAnswers({});
    setDetectionOptionId(null);
    setDetectedProfile(null);
  }, []);

  // ─── Result ───────────────────────────────────────────────────────────────────

  const result = useMemo<QuestionnaireResult>(() => {
    const totalScore = questions.reduce((sum, q) => {
      const optId = answers[q.id];
      if (!optId) return sum;
      const option = q.options.find(o => o.id === optId);
      return sum + (option?.score ?? 0);
    }, 0);

    const maxScore = questions.reduce(
      (sum, q) => sum + Math.max(...q.options.map(o => o.score)),
      0
    );

    // Quick: proceed ≥8 (max 16) | Profile: proceed ≥6 (max 10)
    const proceedThreshold = mode === 'quick' ? 8 : 6;

    let recommendation: QuestionnaireResult['recommendation'];
    if (totalScore >= proceedThreshold) recommendation = 'proceed';
    else if (totalScore >= 0) recommendation = 'wait';
    else recommendation = 'avoid';

    return { score: totalScore, maxScore, recommendation };
  }, [answers, questions, mode]);

  return {
    phase,
    mode,
    detectedProfile,
    // Detection
    currentDetectionQuestion,
    detectionIndex,
    totalDetectionQuestions,
    detectionOptionId,
    canGoNextDetection: detectionOptionId !== null,
    isLastDetectionQuestion,
    selectDetectionOption,
    goNextDetection,
    goBackDetection,
    // Questions
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedOptionId,
    canGoNext: selectedOptionId !== null,
    isLastQuestion,
    result,
    // Actions
    startQuickTest,
    startProfileTest,
    selectOption,
    goNext,
    goBack,
    reset,
  };
}
