import type { Question, BuyerProfile } from '@/models/questionnaire';

/**
 * Five profile-specific questions per buyer profile.
 * Scores: +2 (strong positive signal), +1 (mild positive), 0 (neutral), -2 (negative signal).
 * Max possible score per profile: 10 | Min: -10
 * Thresholds: >= 6 → proceed | >= 0 → wait | < 0 → avoid
 *
 * Based on the compulsive-shopping research provided by the questionnaire team.
 */
export const PROFILE_QUESTIONS: Record<BuyerProfile, Question[]> = {
  // ─── Impulsive Shopper (emotion-driven) ──────────────────────────────────────
  impulsive: [
    {
      id: 'iq1',
      textKey: 'questionnaire.profileQuestions.impulsive.iq1.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.impulsive.iq1.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.impulsive.iq1.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.impulsive.iq1.c', score: -2 },
      ],
    },
    {
      id: 'iq2',
      textKey: 'questionnaire.profileQuestions.impulsive.iq2.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.impulsive.iq2.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.impulsive.iq2.b', score: 1 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.impulsive.iq2.c', score: -2 },
      ],
    },
    {
      id: 'iq3',
      textKey: 'questionnaire.profileQuestions.impulsive.iq3.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.impulsive.iq3.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.impulsive.iq3.b', score: 1 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.impulsive.iq3.c', score: -2 },
      ],
    },
    {
      id: 'iq4',
      textKey: 'questionnaire.profileQuestions.impulsive.iq4.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.impulsive.iq4.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.impulsive.iq4.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.impulsive.iq4.c', score: -2 },
      ],
    },
    {
      id: 'iq5',
      textKey: 'questionnaire.profileQuestions.impulsive.iq5.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.impulsive.iq5.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.impulsive.iq5.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.impulsive.iq5.c', score: -2 },
      ],
    },
  ],

  // ─── Deal Hunter (discount-driven) ───────────────────────────────────────────
  dealHunter: [
    {
      id: 'dq1',
      textKey: 'questionnaire.profileQuestions.dealHunter.dq1.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.dealHunter.dq1.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.dealHunter.dq1.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.dealHunter.dq1.c', score: -2 },
      ],
    },
    {
      id: 'dq2',
      textKey: 'questionnaire.profileQuestions.dealHunter.dq2.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.dealHunter.dq2.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.dealHunter.dq2.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.dealHunter.dq2.c', score: -2 },
      ],
    },
    {
      id: 'dq3',
      textKey: 'questionnaire.profileQuestions.dealHunter.dq3.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.dealHunter.dq3.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.dealHunter.dq3.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.dealHunter.dq3.c', score: -2 },
      ],
    },
    {
      id: 'dq4',
      textKey: 'questionnaire.profileQuestions.dealHunter.dq4.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.dealHunter.dq4.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.dealHunter.dq4.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.dealHunter.dq4.c', score: -2 },
      ],
    },
    {
      id: 'dq5',
      textKey: 'questionnaire.profileQuestions.dealHunter.dq5.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.dealHunter.dq5.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.dealHunter.dq5.b', score: 1 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.dealHunter.dq5.c', score: -2 },
      ],
    },
  ],

  // ─── Functional Buyer (need-driven) ──────────────────────────────────────────
  functional: [
    {
      id: 'fq1',
      textKey: 'questionnaire.profileQuestions.functional.fq1.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.functional.fq1.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.functional.fq1.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.functional.fq1.c', score: -2 },
      ],
    },
    {
      id: 'fq2',
      textKey: 'questionnaire.profileQuestions.functional.fq2.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.functional.fq2.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.functional.fq2.b', score: 1 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.functional.fq2.c', score: -2 },
      ],
    },
    {
      id: 'fq3',
      textKey: 'questionnaire.profileQuestions.functional.fq3.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.functional.fq3.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.functional.fq3.b', score: 1 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.functional.fq3.c', score: -2 },
      ],
    },
    {
      id: 'fq4',
      textKey: 'questionnaire.profileQuestions.functional.fq4.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.functional.fq4.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.functional.fq4.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.functional.fq4.c', score: -2 },
      ],
    },
    {
      id: 'fq5',
      textKey: 'questionnaire.profileQuestions.functional.fq5.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.functional.fq5.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.functional.fq5.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.functional.fq5.c', score: -2 },
      ],
    },
  ],

  // ─── Budget-Constrained (financially mindful) ─────────────────────────────────
  budgetConstrained: [
    {
      id: 'bq1',
      textKey: 'questionnaire.profileQuestions.budgetConstrained.bq1.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq1.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq1.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq1.c', score: -2 },
      ],
    },
    {
      id: 'bq2',
      textKey: 'questionnaire.profileQuestions.budgetConstrained.bq2.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq2.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq2.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq2.c', score: -2 },
      ],
    },
    {
      id: 'bq3',
      textKey: 'questionnaire.profileQuestions.budgetConstrained.bq3.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq3.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq3.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq3.c', score: -2 },
      ],
    },
    {
      id: 'bq4',
      textKey: 'questionnaire.profileQuestions.budgetConstrained.bq4.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq4.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq4.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq4.c', score: -2 },
      ],
    },
    {
      id: 'bq5',
      textKey: 'questionnaire.profileQuestions.budgetConstrained.bq5.text',
      options: [
        { id: 'a', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq5.a', score: 2 },
        { id: 'b', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq5.b', score: 0 },
        { id: 'c', textKey: 'questionnaire.profileQuestions.budgetConstrained.bq5.c', score: -2 },
      ],
    },
  ],
};
