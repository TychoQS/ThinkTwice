import { useState, useCallback, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import type { FlatList } from 'react-native';
import type { ChatMessage } from '@/models/chat';
import { sendMessageToAI } from '@/services/aiService';

let nextId = 1;
function createId(): string {
  return String(nextId++);
}

export function useChatViewModel() {
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList<ChatMessage>>(null);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: createId(),
      role: 'bot',
      text: t('chat.welcomeMessage'),
      timestamp: Date.now(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const scrollToEnd = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const sendMessage = useCallback(async () => {
    const trimmed = inputText.trim();
    if (!trimmed || isLoading) return;

    const userMsg: ChatMessage = {
      id: createId(),
      role: 'user',
      text: trimmed,
      timestamp: Date.now(),
    };

    // Add a loading placeholder for the bot
    const loadingMsg: ChatMessage = {
      id: createId(),
      role: 'bot',
      text: '',
      timestamp: Date.now() + 1,
      isLoading: true,
    };

    const updatedMessages = [...messages, userMsg];

    setMessages([...updatedMessages, loadingMsg]);
    setInputText('');
    setIsLoading(true);
    scrollToEnd();

    try {
      const aiResponse = await sendMessageToAI(updatedMessages);

      const botMsg: ChatMessage = {
        id: loadingMsg.id, // Reuse the same id to replace
        role: 'bot',
        text: aiResponse,
        timestamp: Date.now(),
      };

      setMessages([...updatedMessages, botMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: loadingMsg.id,
        role: 'bot',
        text: t('chat.errorMessage'),
        timestamp: Date.now(),
        isError: true,
      };

      setMessages([...updatedMessages, errorMsg]);
    } finally {
      setIsLoading(false);
      scrollToEnd();
    }
  }, [inputText, isLoading, messages, t, scrollToEnd]);

  return { messages, inputText, setInputText, sendMessage, isLoading, flatListRef };
}
