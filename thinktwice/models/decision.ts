export interface DecisionEntry {
  id: string;
  timestamp: number;
  recommendation: 'proceed' | 'wait' | 'avoid';
  decision: 'bought' | 'skipped' | 'pending';
  mode: 'quick' | 'profile';
  profile?: string;
}
