import { MARKETING_TRAPS } from '@/data/marketingTraps';
import type { ArchivedChatMessage } from '@/models/chatMemory';

const MAX_SOURCE_MESSAGES = 40;
const MAX_MESSAGE_TEXT_LENGTH = 400;

function truncateText(text: string): string {
  if (text.length <= MAX_MESSAGE_TEXT_LENGTH) return text;
  return `${text.slice(0, MAX_MESSAGE_TEXT_LENGTH - 1)}…`;
}

function buildPsychologyReference(): string {
  return MARKETING_TRAPS.map((trap) => {
    const signals = trap.detectionSignals.map((signal) => `- ${signal}`).join('\n');

    return [
      `${trap.name} (${trap.id})`,
      `Description: ${trap.description}`,
      'Detection signals:',
      signals,
    ].join('\n');
  }).join('\n\n');
}

function formatArchivedMessage(message: ArchivedChatMessage): string {
  const speaker = message.role === 'user' ? 'User' : 'Assistant';
  const imageNote = message.hasImage
    ? message.text
      ? ' [shared image]'
      : ' shared an image'
    : '';
  const normalizedText = message.text ? truncateText(message.text) : '[no text]';

  return `${speaker}${imageNote}: ${normalizedText}`;
}

export function buildUserMemorySummarySystemPrompt(): string {
  return [
    'You are an internal memory synthesizer for ThinkTwice.',
    'You receive past shopping-reflection conversations and must build a concise summary of the user for future chats.',
    'This summary is internal only and will be injected into a different conversation later.',
    'Base the summary on what the user actually said or on cautious, well-grounded inferences.',
    'Ignore assistant suggestions unless the user clearly endorsed them or provided confirming evidence.',
    'Use the following marketing-psychology reference as an analytical lens when helpful.',
    '',
    buildPsychologyReference(),
    '',
    'Return a concise summary using exactly these sections:',
    'Stable facts:',
    'Behavioral patterns:',
    'Likely triggers / risks:',
    'Helpful coaching directions:',
    'Unknowns:',
    '',
    'Keep it under 180 words and avoid speculation.',
  ].join('\n');
}

export function buildUserMemorySummaryInput(history: ArchivedChatMessage[]): string {
  const relevantMessages = history.slice(-MAX_SOURCE_MESSAGES);
  const transcript = relevantMessages.map(formatArchivedMessage).join('\n');

  return [
    'Summarize the following past conversations into durable user context for future chats.',
    'Focus on needs, budget sensitivity, emotional triggers, recurring products or categories, and susceptibility to marketing traps.',
    'If a point is uncertain, place it in "Unknowns" instead of stating it as fact.',
    '',
    'Past conversations:',
    transcript,
  ].join('\n');
}
