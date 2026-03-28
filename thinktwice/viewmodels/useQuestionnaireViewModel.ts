import { useState, useMemo, useCallback } from 'react';
import { GENERIC_QUESTIONS } from '@/data/genericQuestions';
import { QuestionnaireResult } from '@/models/questionnaire';

export type QuestionnairePhase = 'mode-selection' | 'questions' | 'result';

export function useQuestionnaireViewModel() {
  const [phase, setPhase] = useState<QuestionnairePhase>('mode-selection');
  const [currentIndex, setCurrentIndex] = useState(0);
  // questionId -> selectedOptionId
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);

  const questions = GENERIC_QUESTIONS;
  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;

  const startQuickTest = useCallback(() => {
    setAnswers({});
    setSelectedOptionId(null);
    setCurrentIndex(0);
    setPhase('questions');
  }, []);

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
      // Restore previously selected answer for the next question if any
      const nextQuestion = questions[nextIndex];
      setSelectedOptionId(answers[nextQuestion.id] ?? null);
    }
  }, [selectedOptionId, isLastQuestion, currentIndex, questions, answers]);

  const goBack = useCallback(() => {
    if (currentIndex === 0) {
      setPhase('mode-selection');
      setSelectedOptionId(null);
    } else {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      const prevQuestion = questions[prevIndex];
      setSelectedOptionId(answers[prevQuestion.id] ?? null);
    }
  }, [currentIndex, questions, answers]);

  const reset = useCallback(() => {
    setPhase('mode-selection');
    setCurrentIndex(0);
    setAnswers({});
    setSelectedOptionId(null);
  }, []);

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

    let recommendation: QuestionnaireResult['recommendation'];
    if (totalScore >= 8) recommendation = 'proceed';
    else if (totalScore >= 0) recommendation = 'wait';
    else recommendation = 'avoid';

    return { score: totalScore, maxScore, recommendation };
  }, [answers, questions]);

  return {
    phase,
    currentQuestion,
    currentIndex,
    totalQuestions,
    selectedOptionId,
    canGoNext: selectedOptionId !== null,
    isLastQuestion,
    result,
    startQuickTest,
    selectOption,
    goNext,
    goBack,
    reset,
  };
}
