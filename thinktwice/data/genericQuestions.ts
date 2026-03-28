import { Question } from '@/models/questionnaire';

/**
 * Generic questionnaire question bank.
 * Text is stored as i18n keys (questionnaire.questions.<id>.*).
 * Scores: +2 (very good), +1 (good), 0 (neutral), -1 (bad), -2 (very bad).
 * Max possible score: 16 | Min: -16
 * Thresholds: >= 8 → proceed | 0–7 → wait | < 0 → avoid
 */
export const GENERIC_QUESTIONS: Question[] = [
  {
    id: 'q1',
    textKey: 'questionnaire.questions.q1.text',
    options: [
      { id: 'a', textKey: 'questionnaire.questions.q1.a', score: 2 },
      { id: 'b', textKey: 'questionnaire.questions.q1.b', score: 1 },
      { id: 'c', textKey: 'questionnaire.questions.q1.c', score: -2 },
    ],
  },
  {
    id: 'q2',
    textKey: 'questionnaire.questions.q2.text',
    options: [
      { id: 'a', textKey: 'questionnaire.questions.q2.a', score: 2 },
      { id: 'b', textKey: 'questionnaire.questions.q2.b', score: 0 },
      { id: 'c', textKey: 'questionnaire.questions.q2.c', score: -2 },
    ],
  },
  {
    id: 'q3',
    textKey: 'questionnaire.questions.q3.text',
    options: [
      { id: 'a', textKey: 'questionnaire.questions.q3.a', score: 2 },
      { id: 'b', textKey: 'questionnaire.questions.q3.b', score: 0 },
      { id: 'c', textKey: 'questionnaire.questions.q3.c', score: -2 },
    ],
  },
  {
    id: 'q4',
    textKey: 'questionnaire.questions.q4.text',
    options: [
      { id: 'a', textKey: 'questionnaire.questions.q4.a', score: 2 },
      { id: 'b', textKey: 'questionnaire.questions.q4.b', score: 1 },
      { id: 'c', textKey: 'questionnaire.questions.q4.c', score: -1 },
      { id: 'd', textKey: 'questionnaire.questions.q4.d', score: -2 },
    ],
  },
  {
    id: 'q5',
    textKey: 'questionnaire.questions.q5.text',
    options: [
      { id: 'a', textKey: 'questionnaire.questions.q5.a', score: 2 },
      { id: 'b', textKey: 'questionnaire.questions.q5.b', score: 1 },
      { id: 'c', textKey: 'questionnaire.questions.q5.c', score: -2 },
    ],
  },
  {
    id: 'q6',
    textKey: 'questionnaire.questions.q6.text',
    options: [
      { id: 'a', textKey: 'questionnaire.questions.q6.a', score: 2 },
      { id: 'b', textKey: 'questionnaire.questions.q6.b', score: 0 },
      { id: 'c', textKey: 'questionnaire.questions.q6.c', score: -1 },
    ],
  },
  {
    id: 'q7',
    textKey: 'questionnaire.questions.q7.text',
    options: [
      { id: 'a', textKey: 'questionnaire.questions.q7.a', score: 2 },
      { id: 'b', textKey: 'questionnaire.questions.q7.b', score: -1 },
      { id: 'c', textKey: 'questionnaire.questions.q7.c', score: -2 },
    ],
  },
  {
    id: 'q8',
    textKey: 'questionnaire.questions.q8.text',
    options: [
      { id: 'a', textKey: 'questionnaire.questions.q8.a', score: 2 },
      { id: 'b', textKey: 'questionnaire.questions.q8.b', score: -1 },
      { id: 'c', textKey: 'questionnaire.questions.q8.c', score: -2 },
    ],
  },
];
