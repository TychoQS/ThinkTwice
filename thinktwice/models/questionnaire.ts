export interface QuestionOption {
  id: string;
  textKey: string;
  score: number;
}

export interface Question {
  id: string;
  textKey: string;
  options: QuestionOption[];
}

export interface QuestionnaireResult {
  score: number;
  maxScore: number;
  recommendation: 'proceed' | 'wait' | 'avoid';
}

export type BuyerProfile = 'impulsive' | 'dealHunter' | 'functional' | 'budgetConstrained';

export interface DetectionOption {
  id: string;
  textKey: string;
  profile: BuyerProfile;
}

export interface DetectionQuestion {
  id: string;
  textKey: string;
  options: DetectionOption[];
}
