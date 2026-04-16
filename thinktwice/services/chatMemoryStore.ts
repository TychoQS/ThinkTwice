import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ChatMessage } from '@/models/chat';
import type { ArchivedChatMessage, StoredUserMemorySummary } from '@/models/chatMemory';

const STORAGE_KEYS = {
  archivedMessages: '@thinktwice_archivedMessages',
  userMemorySummary: '@thinktwice_userMemorySummary',
} as const;

const MAX_ARCHIVED_MESSAGES = 60;

function normalizeChatMessage(message: ChatMessage): ArchivedChatMessage | null {
  if (message.isLoading || message.isError) return null;

  const trimmedText = message.text.trim();
  const hasImage = Boolean(message.imageDataUrl);

  if (!trimmedText && !hasImage) return null;

  return {
    role: message.role === 'user' ? 'user' : 'assistant',
    text: trimmedText,
    timestamp: message.timestamp,
    hasImage,
  };
}

export async function getArchivedChatMessages(): Promise<ArchivedChatMessage[]> {
  try {
    const rawValue = await AsyncStorage.getItem(STORAGE_KEYS.archivedMessages);

    if (!rawValue) return [];

    const parsed = JSON.parse(rawValue);

    if (!Array.isArray(parsed)) return [];

    return parsed
      .filter((item): item is ArchivedChatMessage => {
        return (
          typeof item === 'object' &&
          item !== null &&
          (item.role === 'user' || item.role === 'assistant') &&
          typeof item.text === 'string' &&
          typeof item.timestamp === 'number'
        );
      })
      .sort((a, b) => a.timestamp - b.timestamp)
      .slice(-MAX_ARCHIVED_MESSAGES);
  } catch {
    return [];
  }
}

export async function appendArchivedChatMessages(messages: ChatMessage[]): Promise<void> {
  const normalizedMessages = messages
    .map(normalizeChatMessage)
    .filter((message): message is ArchivedChatMessage => message !== null);

  if (normalizedMessages.length === 0) return;

  const currentMessages = await getArchivedChatMessages();
  const nextMessages = [...currentMessages, ...normalizedMessages]
    .sort((a, b) => a.timestamp - b.timestamp)
    .slice(-MAX_ARCHIVED_MESSAGES);

  await AsyncStorage.setItem(STORAGE_KEYS.archivedMessages, JSON.stringify(nextMessages));
  console.log(
    `[memory] Archived ${normalizedMessages.length} new messages. Total stored: ${nextMessages.length}.`,
  );
}

export async function getStoredUserMemorySummary(): Promise<StoredUserMemorySummary | null> {
  try {
    const rawValue = await AsyncStorage.getItem(STORAGE_KEYS.userMemorySummary);

    if (!rawValue) return null;

    const parsed = JSON.parse(rawValue);

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      typeof parsed.summary !== 'string' ||
      typeof parsed.updatedAt !== 'number' ||
      typeof parsed.sourceMessageCount !== 'number'
    ) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export async function saveUserMemorySummary(
  summary: string,
  sourceMessageCount: number,
): Promise<void> {
  const currentSummary = await getStoredUserMemorySummary();

  if (currentSummary && currentSummary.sourceMessageCount > sourceMessageCount) {
    console.log(
      `[memory] Skipping summary save because a newer summary already exists (${currentSummary.sourceMessageCount} > ${sourceMessageCount}).`,
    );
    return;
  }

  const payload: StoredUserMemorySummary = {
    summary,
    updatedAt: Date.now(),
    sourceMessageCount,
  };

  await AsyncStorage.setItem(STORAGE_KEYS.userMemorySummary, JSON.stringify(payload));
  console.log(
    `[memory] Saved user summary based on ${sourceMessageCount} archived messages.`,
  );
}
