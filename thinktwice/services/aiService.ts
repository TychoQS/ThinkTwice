import type { AIAdapter } from './ai/AIAdapter';
import { GroqAdapter } from './ai/GroqAdapter';
import { AI_CONFIG, buildAssistantSystemPrompt } from './aiConfig';
import {
  appendArchivedChatMessages,
  getArchivedChatMessages,
  getStoredUserMemorySummary,
  saveUserMemorySummary,
} from './chatMemoryStore';
import {
  buildUserMemorySummaryInput,
  buildUserMemorySummarySystemPrompt,
} from './userMemoryPromptService';
import type { ChatMessage } from '@/models/chat';

const SUMMARY_LOG_PREVIEW_LENGTH = 240;

function previewSummary(summary: string | null | undefined): string {
  const trimmed = summary?.trim();

  if (!trimmed) return '[empty]';
  if (trimmed.length <= SUMMARY_LOG_PREVIEW_LENGTH) return trimmed;

  return `${trimmed.slice(0, SUMMARY_LOG_PREVIEW_LENGTH - 1)}…`;
}

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

async function generateUserMemorySummaryFromArchive(): Promise<string | null> {
  const archivedMessages = await getArchivedChatMessages();

  if (archivedMessages.length === 0) {
    console.log('[memory] No archived messages available. Skipping summary generation.');
    return null;
  }

  console.log(
    `[memory] Generating user summary from ${archivedMessages.length} archived messages.`,
  );

  const summary = await adapter.sendConversation(
    [
      {
        role: 'system',
        content: buildUserMemorySummarySystemPrompt(),
      },
      {
        role: 'user',
        content: buildUserMemorySummaryInput(archivedMessages),
      },
    ],
    {
      temperature: 0.2,
      maxOutputTokens: 320,
    },
  );

  await saveUserMemorySummary(summary, archivedMessages.length);
  console.log('[memory] Generated summary:', previewSummary(summary));

  return summary;
}

async function getUserMemorySummaryForPrompt(): Promise<string | null> {
  const storedSummary = await getStoredUserMemorySummary();
  const archivedMessages = await getArchivedChatMessages();

  if (archivedMessages.length === 0) {
    console.log('[memory] No archived messages found when preparing the prompt.');
    return null;
  }

  if (
    storedSummary?.summary.trim() &&
    storedSummary.sourceMessageCount >= archivedMessages.length
  ) {
    console.log(
      `[memory] Reusing stored summary based on ${storedSummary.sourceMessageCount} archived messages:`,
      previewSummary(storedSummary.summary),
    );
    return storedSummary.summary;
  }

  console.log('[memory] Stored summary missing or stale. Regenerating before chat response.');
  return generateUserMemorySummaryFromArchive();
}

/**
 * Sends the conversation history to the configured AI provider and returns the response.
 *
 * @param conversationHistory - Full list of chat messages (both user and bot)
 * @returns The AI-generated response text
 * @throws Error if the API call fails
 */
export async function sendMessageToAI(conversationHistory: ChatMessage[], isPremium?: boolean): Promise<string> {
  let userMemorySummary: string | null = null;

  try {
    userMemorySummary = await getUserMemorySummaryForPrompt();
  } catch (error) {
    console.error('[aiService] Failed to load user memory summary for prompt:', error);
  }

  console.log(
    '[memory] Injecting summary into assistant prompt:',
    previewSummary(userMemorySummary),
  );

  return adapter.sendMessage(conversationHistory, {
    systemPrompt: buildAssistantSystemPrompt(userMemorySummary),
    isPremium,
  });
}

/**
 * Stores the latest successful exchange and refreshes the persisted user summary
 * in a separate model conversation for future chats.
 */
export async function syncUserMemoryFromConversation(messages: ChatMessage[]): Promise<void> {
  try {
    await appendArchivedChatMessages(messages);
    await generateUserMemorySummaryFromArchive();
  } catch (error) {
    console.error('[aiService] Failed to refresh user memory summary:', error);
  }
}
