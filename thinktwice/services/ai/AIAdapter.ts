import type { ChatMessage } from '@/models/chat';

export type AIContentPart =
  | { type: 'text'; text: string }
  | { type: 'image_url'; image_url: { url: string } };

export interface AIConversationMessage {
  role: 'system' | 'user' | 'assistant';
  content: string | AIContentPart[];
}

export interface AIRequestOptions {
  systemPrompt?: string;
  temperature?: number;
  maxOutputTokens?: number;
}

/**
 * Provider-agnostic AI adapter interface.
 *
 * Implement this interface to add support for a new AI provider
 * (e.g. OpenAI, Anthropic, Mistral, etc.).
 */
export interface AIAdapter {
  /**
   * Sends an arbitrary isolated conversation to the configured provider.
   * This is used both for user-facing chats and for internal background prompts.
   */
  sendConversation(
    messages: AIConversationMessage[],
    options?: Omit<AIRequestOptions, 'systemPrompt'>,
  ): Promise<string>;

  /**
   * Sends the full conversation history and returns the AI-generated response.
   *
   * @param conversationHistory - Full list of chat messages (user + bot)
   * @returns The AI-generated response text
   * @throws Error if the API call fails or the response is empty
   */
  sendMessage(conversationHistory: ChatMessage[], options?: AIRequestOptions): Promise<string>;
}
