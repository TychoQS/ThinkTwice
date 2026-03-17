import type { AIAdapter } from './AIAdapter';
import type { ChatMessage } from '@/models/chat';
import { AI_CONFIG } from '../aiConfig';

/**
 * Groq / OpenAI-compatible API response types (subset we need).
 */
interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqChoice {
  message: { content: string };
}

interface GroqResponse {
  choices?: GroqChoice[];
  error?: { message: string; type: string; code: string };
}

/**
 * AI adapter that calls the Groq API (OpenAI-compatible format) via `fetch`.
 */
export class GroqAdapter implements AIAdapter {
  async sendMessage(conversationHistory: ChatMessage[]): Promise<string> {
    const messages: GroqMessage[] = [];

    // System prompt
    if (AI_CONFIG.systemPrompt) {
      messages.push({ role: 'system', content: AI_CONFIG.systemPrompt });
    }

    // Map conversation history (skip transient messages like loading/error)
    for (const msg of conversationHistory) {
      if (msg.isLoading || msg.isError) continue;
      messages.push({
        role: msg.role === 'user' ? 'user' : 'assistant',
        content: msg.text,
      });
    }

    const body = {
      model: AI_CONFIG.model,
      messages,
      temperature: AI_CONFIG.temperature,
      max_tokens: AI_CONFIG.maxOutputTokens,
    };

    const url = `${AI_CONFIG.baseUrl}/chat/completions`;

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${AI_CONFIG.apiKey}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Groq API error (${response.status}): ${errorText}`);
      }

      const data: GroqResponse = await response.json();

      if (data.error) {
        throw new Error(`Groq API error: ${data.error.message}`);
      }

      const text = data.choices?.[0]?.message?.content;

      if (!text) {
        throw new Error('Empty response from AI');
      }

      return text;
    } catch (error) {
      console.error('[GroqAdapter] Request failed:', error);
      throw error;
    }
  }
}
