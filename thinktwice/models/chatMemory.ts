export type ArchivedChatRole = 'user' | 'assistant';

export interface ArchivedChatMessage {
  role: ArchivedChatRole;
  text: string;
  timestamp: number;
  hasImage?: boolean;
}

export interface StoredUserMemorySummary {
  summary: string;
  updatedAt: number;
  sourceMessageCount: number;
}
