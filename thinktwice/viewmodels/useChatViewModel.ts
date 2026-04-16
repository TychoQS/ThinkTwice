import { useState, useCallback, useRef } from 'react';
import { useTranslation } from '@/node_modules/react-i18next';
import type { FlatList } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import type { ChatMessage } from '@/models/chat';
import { sendMessageToAI, syncUserMemoryFromConversation } from '@/services/aiService';

let nextId = 1;
function createId(): string {
  return String(nextId++);
}

function createInitialMessages(welcomeMessage: string): ChatMessage[] {
  return [
    {
      id: createId(),
      role: 'bot',
      text: welcomeMessage,
      timestamp: Date.now(),
    },
  ];
}

export function useChatViewModel() {
  const { t } = useTranslation();
  const flatListRef = useRef<FlatList<ChatMessage>>(null);
  const sessionVersionRef = useRef(0);
  const welcomeMessage = t('chat.welcomeMessage');

  const [messages, setMessages] = useState<ChatMessage[]>(() => createInitialMessages(welcomeMessage));
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [pendingImageDataUrl, setPendingImageDataUrl] = useState<string | null>(null);

  const scrollToEnd = useCallback(() => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, []);

  const pickImage = useCallback(async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      base64: true,
      quality: 0.6,
    });
    if (!result.canceled && result.assets[0]?.base64) {
      const { base64, mimeType } = result.assets[0];
      setPendingImageDataUrl(`data:${mimeType ?? 'image/jpeg'};base64,${base64}`);
    }
  }, []);

  const clearPendingImage = useCallback(() => setPendingImageDataUrl(null), []);

  const resetConversation = useCallback(() => {
    sessionVersionRef.current += 1;
    setMessages(createInitialMessages(welcomeMessage));
    setInputText('');
    setIsLoading(false);
    setPendingImageDataUrl(null);
  }, [welcomeMessage]);

  const sendMessage = useCallback(async () => {
    const trimmed = inputText.trim();
    if ((!trimmed && !pendingImageDataUrl) || isLoading) return;

    const imageDataUrl = pendingImageDataUrl ?? undefined;

    const userMsg: ChatMessage = {
      id: createId(),
      role: 'user',
      text: trimmed,
      timestamp: Date.now(),
      imageDataUrl,
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
    setPendingImageDataUrl(null);
    setIsLoading(true);
    scrollToEnd();

    const sessionVersion = sessionVersionRef.current;

    try {
      const aiResponse = await sendMessageToAI(updatedMessages);

      if (sessionVersion !== sessionVersionRef.current) return;

      const botMsg: ChatMessage = {
        id: loadingMsg.id, // Reuse the same id to replace
        role: 'bot',
        text: aiResponse,
        timestamp: Date.now(),
      };

      setMessages([...updatedMessages, botMsg]);
      void syncUserMemoryFromConversation([userMsg, botMsg]);
    } catch {
      if (sessionVersion !== sessionVersionRef.current) return;

      const errorMsg: ChatMessage = {
        id: loadingMsg.id,
        role: 'bot',
        text: t('chat.errorMessage'),
        timestamp: Date.now(),
        isError: true,
      };

      setMessages([...updatedMessages, errorMsg]);
    } finally {
      if (sessionVersion !== sessionVersionRef.current) return;

      setIsLoading(false);
      scrollToEnd();
    }
  }, [inputText, isLoading, messages, t, scrollToEnd, pendingImageDataUrl]);

  return {
    messages,
    inputText,
    setInputText,
    sendMessage,
    isLoading,
    flatListRef,
    pendingImageDataUrl,
    pickImage,
    clearPendingImage,
    resetConversation,
  };
}
