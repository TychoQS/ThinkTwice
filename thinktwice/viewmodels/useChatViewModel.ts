import { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import type { ChatMessage } from '@/models/chat';

let nextId = 1;
function createId(): string {
  return String(nextId++);
}

export function useChatViewModel() {
  const { t } = useTranslation();

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createId(),
      role: 'bot',
      text: t('chat.welcomeMessage'),
      timestamp: Date.now(),
    },
  ]);
  const [inputText, setInputText] = useState('');

  const sendMessage = useCallback(() => {
    const trimmed = inputText.trim();
    if (!trimmed) return;

    const userMsg: ChatMessage = {
      id: createId(),
      role: 'user',
      text: trimmed,
      timestamp: Date.now(),
    };

    // Static bot reply (no AI backend yet)
    const botMsg: ChatMessage = {
      id: createId(),
      role: 'bot',
      text: t('chat.thinkingMessage'),
      timestamp: Date.now() + 1,
    };

    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInputText('');
  }, [inputText, t]);

  return { messages, inputText, setInputText, sendMessage };
}
