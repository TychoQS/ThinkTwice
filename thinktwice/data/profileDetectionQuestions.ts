import type { DetectionQuestion } from '@/models/questionnaire';

/**
 * Two questions used to auto-detect the buyer profile.
 * Each option maps to one BuyerProfile. The profile with the most points wins;
 * in a tie the first question's answer is used as a tiebreaker.
 */
export const PROFILE_DETECTION_QUESTIONS: DetectionQuestion[] = [
  {
    id: 'pd1',
    textKey: 'questionnaire.profileDetection.questions.pd1.text',
    options: [
      { id: 'a', textKey: 'questionnaire.profileDetection.questions.pd1.a', profile: 'impulsive' },
      { id: 'b', textKey: 'questionnaire.profileDetection.questions.pd1.b', profile: 'dealHunter' },
      { id: 'c', textKey: 'questionnaire.profileDetection.questions.pd1.c', profile: 'functional' },
      { id: 'd', textKey: 'questionnaire.profileDetection.questions.pd1.d', profile: 'budgetConstrained' },
    ],
  },
  {
    id: 'pd2',
    textKey: 'questionnaire.profileDetection.questions.pd2.text',
    options: [
      { id: 'a', textKey: 'questionnaire.profileDetection.questions.pd2.a', profile: 'impulsive' },
      { id: 'b', textKey: 'questionnaire.profileDetection.questions.pd2.b', profile: 'dealHunter' },
      { id: 'c', textKey: 'questionnaire.profileDetection.questions.pd2.c', profile: 'functional' },
      { id: 'd', textKey: 'questionnaire.profileDetection.questions.pd2.d', profile: 'budgetConstrained' },
    ],
  },
];
