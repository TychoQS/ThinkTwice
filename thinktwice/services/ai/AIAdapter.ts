import type { ChatMessage } from '@/models/chat';

/**
 * Provider-agnostic AI adapter interface.
 *
 * Implement this interface to add support for a new AI provider
 * (e.g. OpenAI, Anthropic, Mistral, etc.).
 */
export interface AIAdapter {
  /**
   * Sends the full conversation history and returns the AI-generated response.
   *
   * @param conversationHistory - Full list of chat messages (user + bot)
   * @returns The AI-generated response text
   * @throws Error if the API call fails or the response is empty
   */
  sendMessage(conversationHistory: ChatMessage[]): Promise<string>;
}
