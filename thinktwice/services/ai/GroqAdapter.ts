import type {
  AIAdapter,
  AIContentPart,
  AIConversationMessage,
  AIRequestOptions,
} from './AIAdapter';
import type { ChatMessage } from '@/models/chat';
import { AI_CONFIG } from '../aiConfig';
import i18n from '@/i18n';

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
  private buildChatMessages(
    conversationHistory: ChatMessage[],
    systemPrompt?: string,
  ): AIConversationMessage[] {
    const messages: AIConversationMessage[] = [];

    if (systemPrompt) {
      messages.push({
        role: 'system',
        content: this.withLanguageInstruction(systemPrompt),
      });
    }

    for (const msg of conversationHistory) {
      if (msg.isLoading || msg.isError) continue;

      if (msg.role === 'user' && msg.imageDataUrl) {
        const parts: AIContentPart[] = [];
        if (msg.text) parts.push({ type: 'text', text: msg.text });
        parts.push({ type: 'image_url', image_url: { url: msg.imageDataUrl } });
        messages.push({ role: 'user', content: parts });
      } else {
        messages.push({
          role: msg.role === 'user' ? 'user' : 'assistant',
          content: msg.text,
        });
      }
    }

    return messages;
  }

  private withLanguageInstruction(prompt: string): string {
    const currentLang = i18n.language || 'en';

    return `${prompt}\n\nCRITICAL INSTRUCTION: You MUST respond entirely in the language corresponding to the ISO code '${currentLang}'. Do NOT use other language ever. You must reply in the language that we provided here which is the one that the user set the application, even if the user use another language.`;
  }

  async sendConversation(
    messages: AIConversationMessage[],
    options: Omit<AIRequestOptions, 'systemPrompt'> = {},
  ): Promise<string> {
    const model = options?.isPremium ? AI_CONFIG.premiumModel : AI_CONFIG.model;
    const body = {
      model,
      messages,
      temperature: options.temperature ?? AI_CONFIG.temperature,
      max_tokens: options.maxOutputTokens ?? AI_CONFIG.maxOutputTokens,
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

  async sendMessage(
    conversationHistory: ChatMessage[],
    options: AIRequestOptions = {},
  ): Promise<string> {
    const messages = this.buildChatMessages(
      conversationHistory,
      options.systemPrompt ?? AI_CONFIG.defaultSystemPrompt,
    );

    return this.sendConversation(messages, {
      temperature: options.temperature,
      maxOutputTokens: options.maxOutputTokens,
      isPremium: options.isPremium,
    });
  }
}
