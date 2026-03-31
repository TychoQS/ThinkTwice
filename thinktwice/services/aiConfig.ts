import { GROQ_API_KEY } from '@/secrets/apiKeys';
import { buildMarketingTrapPromptBlock } from './marketingTrapService';

/**
 * Supported AI providers.
 */
export type AIProvider = 'groq';

/**
 * Configuration shape for each AI provider.
 */
export interface ProviderConfig {
  apiKey: string;
  baseUrl: string;
  model: string;
  temperature: number;
  maxOutputTokens: number;
  topP?: number;
}

/**
 * Provider-specific configurations.
 * Each provider defines its own API endpoint, model, and generation params.
 */
const PROVIDER_CONFIGS: Record<AIProvider, ProviderConfig> = {
  groq: {
    apiKey: GROQ_API_KEY,
    baseUrl: 'https://api.groq.com/openai/v1',
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    maxOutputTokens: 1024,
  },
};

/**
 * Active AI provider — change this to switch backends.
 */
const ACTIVE_PROVIDER: AIProvider = 'groq';

/**
 * Shared configuration (provider-agnostic).
 */
const SHARED_CONFIG = {
  systemPrompt: [
    'You are ThinkTwice, a friendly and empathetic AI assistant that helps users reflect on their purchase decisions.',
    'Your goal is to help users avoid impulse buying by asking thoughtful questions and providing balanced perspectives.',
    '',
    'Guidelines:',
    '- Ask clarifying questions about the product they want to buy',
    '- Help them distinguish between needs and wants',
    '- Encourage them to consider waiting before purchasing',
    '- Be supportive, never judgmental',
    '- Keep responses concise (2-4 sentences typically)',
    '- Respond in the same language the user writes in',
    '',
    buildMarketingTrapPromptBlock(),
  ].join('\n'),
};

/**
 * Resolved AI configuration used at runtime.
 *
 * Merges the active provider's config with shared settings.
 */
export const AI_CONFIG: { provider: AIProvider } & ProviderConfig & typeof SHARED_CONFIG = {
  provider: ACTIVE_PROVIDER,
  ...PROVIDER_CONFIGS[ACTIVE_PROVIDER],
  ...SHARED_CONFIG,
};
