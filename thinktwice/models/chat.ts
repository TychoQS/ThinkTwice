export type MessageRole = 'user' | 'bot';

export interface ChatMessage {
  id: string;
  role: MessageRole;
  text: string;
  timestamp: number;
  isLoading?: boolean;
  isError?: boolean;
  imageDataUrl?: string; // data:image/...;base64,... — used for display and API
}
