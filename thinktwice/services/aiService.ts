import type { AIAdapter } from './ai/AIAdapter';
import { GroqAdapter } from './ai/GroqAdapter';
import { AI_CONFIG } from './aiConfig';
import type { ChatMessage } from '@/models/chat';

/**
 * Returns the adapter for the currently configured AI provider.
 * To add a new provider, implement AIAdapter and add a case here.
 */
function createAdapter(): AIAdapter {
  switch (AI_CONFIG.provider) {
    case 'groq':
      return new GroqAdapter();
    default: {
      const _exhaustive: never = AI_CONFIG.provider;
      throw new Error(`Unknown AI provider: ${_exhaustive}`);
    }
  }
}

const adapter: AIAdapter = createAdapter();

/**
 * Sends the conversation history to the configured AI provider and returns the response.
 *
 * @param conversationHistory - Full list of chat messages (both user and bot)
 * @returns The AI-generated response text
 * @throws Error if the API call fails
 */
export async function sendMessageToAI(conversationHistory: ChatMessage[]): Promise<string> {
  return adapter.sendMessage(conversationHistory);
}
