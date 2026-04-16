import {
  StyleSheet,
  FlatList,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  View,
  Animated,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/node_modules/react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DrawerActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useRef } from 'react';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';
import { useChatViewModel } from '@/viewmodels/useChatViewModel';
import type { ChatMessage } from '@/models/chat';

/* ──── Typing indicator (animated dots) ──── */
function TypingIndicator({ colors }: { colors: typeof Colors.light }) {
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const createDotAnimation = (dot: Animated.Value, delay: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(delay),
          Animated.timing(dot, { toValue: 1, duration: 300, useNativeDriver: true }),
          Animated.timing(dot, { toValue: 0, duration: 300, useNativeDriver: true }),
        ]),
      );

    const anim = Animated.parallel([
      createDotAnimation(dot1, 0),
      createDotAnimation(dot2, 150),
      createDotAnimation(dot3, 300),
    ]);
    anim.start();
    return () => anim.stop();
  }, [dot1, dot2, dot3]);

  const dotStyle = (anim: Animated.Value) => ({
    opacity: anim.interpolate({ inputRange: [0, 1], outputRange: [0.3, 1] }),
    transform: [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [0.8, 1.2] }) }],
  });

  return (
    <View style={[styles.bubbleRow, styles.bubbleRowBot]}>
      <View style={[styles.bubble, { backgroundColor: colors.bubbleBot, borderBottomLeftRadius: 4 }]}>
        <View style={styles.typingDots}>
          {[dot1, dot2, dot3].map((dot, i) => (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                { backgroundColor: colors.typingIndicator },
                dotStyle(dot),
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

/* ──── Message bubble ──── */
function MessageBubble({
  message,
  colors,
  fontScale,
}: {
  message: ChatMessage;
  colors: typeof Colors.light;
  fontScale: number;
}) {
  const isUser = message.role === 'user';

  // Typing indicator for loading messages
  if (message.isLoading) {
    return <TypingIndicator colors={colors} />;
  }

  const bubbleBg = message.isError
    ? colors.bubbleError
    : isUser
      ? colors.bubbleUser
      : colors.bubbleBot;

  const textColor = message.isError
    ? colors.bubbleErrorText
    : isUser
      ? colors.bubbleUserText
      : colors.bubbleBotText;

  return (
    <View
      style={[
        styles.bubbleRow,
        isUser ? styles.bubbleRowUser : styles.bubbleRowBot,
      ]}
    >
      <View
        style={[
          styles.bubble,
          {
            backgroundColor: bubbleBg,
            borderBottomRightRadius: isUser ? 4 : 18,
            borderBottomLeftRadius: isUser ? 18 : 4,
          },
        ]}
      >
        {message.isError && (
          <Ionicons
            name="alert-circle-outline"
            size={16}
            color={textColor}
            style={styles.errorIcon}
          />
        )}
        {message.imageDataUrl && (
          <Image
            source={{ uri: message.imageDataUrl }}
            style={styles.bubbleImage}
            resizeMode="cover"
          />
        )}
        {message.text ? (
          <ThemedText
            style={[
              styles.bubbleText,
              {
                color: textColor,
                fontSize: 15 * fontScale,
              },
            ]}
          >
            {message.text}
          </ThemedText>
        ) : null}
      </View>
    </View>
  );
}

/* ──── Chat screen ──── */
export default function ChatScreen() {
  const router = useRouter();
  const navigation = useNavigation();
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const { resolvedTheme, fontScale } = useSettings();
  const colors = Colors[resolvedTheme];

  const { messages, inputText, setInputText, sendMessage, isLoading, flatListRef, pendingImageDataUrl, pickImage, clearPendingImage, resetConversation } =
    useChatViewModel();

  useFocusEffect(
    useCallback(() => {
      return () => {
        resetConversation();
      };
    }, [resetConversation]),
  );

  return (
    <ThemedView
      style={styles.container}
      lightColor={colors.background}
      darkColor={colors.background}
    >
      {/* Header */}
      <View
        style={[
          styles.header,
          { paddingTop: insets.top + 8, borderBottomColor: colors.border, backgroundColor: colors.surface },
        ]}
      >
        <Pressable onPress={() => router.back()} style={styles.headerBtn}>
          <Ionicons name="arrow-back" size={24} color={colors.text} />
        </Pressable>
        <ThemedText type="defaultSemiBold" style={[styles.headerTitle, { fontSize: 17 * fontScale }]}>
          {t('chat.title')}
        </ThemedText>
        <Pressable
          onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
          style={styles.headerBtn}
        >
          <Ionicons name="menu" size={24} color={colors.text} />
        </Pressable>
      </View>

      {/* Messages */}
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble message={item} colors={colors} fontScale={fontScale} />
          )}
          contentContainerStyle={styles.messagesList}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        {/* Input bar */}
        <View
          style={[
            styles.inputBar,
            {
              paddingBottom: insets.bottom + 8,
              borderTopColor: colors.border,
              backgroundColor: colors.surface,
            },
          ]}
        >
          {/* Pending image preview */}
          {pendingImageDataUrl && (
            <View style={styles.imagePreviewContainer}>
              <Image source={{ uri: pendingImageDataUrl }} style={styles.imagePreview} resizeMode="cover" />
              <Pressable onPress={clearPendingImage} style={[styles.imageRemoveBtn, { backgroundColor: colors.surface }]}>
                <Ionicons name="close-circle" size={20} color={colors.textSecondary} />
              </Pressable>
            </View>
          )}
          <View style={styles.inputRow}>
            <Pressable
              onPress={pickImage}
              disabled={isLoading}
              style={({ pressed }) => [
                styles.iconButton,
                { opacity: pressed ? 0.6 : isLoading ? 0.4 : 1 },
              ]}
            >
              <Ionicons name="image-outline" size={22} color={colors.textSecondary} />
            </Pressable>
            <View style={styles.inputContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.inputBackground,
                    borderColor: colors.inputBorder,
                    color: colors.text,
                    fontSize: 15 * fontScale,
                  },
                ]}
                placeholder={t('chat.inputPlaceholder')}
                placeholderTextColor={colors.textSecondary}
                value={inputText}
                onChangeText={setInputText}
                multiline
                maxLength={500}
                onSubmitEditing={sendMessage}
                returnKeyType="send"
                editable={!isLoading}
              />
              <ThemedText style={[styles.charCount, { color: colors.textSecondary }]}>
                {inputText.length}/500
              </ThemedText>
            </View>
            <Pressable
              onPress={sendMessage}
              disabled={isLoading || (!inputText.trim() && !pendingImageDataUrl)}
              style={({ pressed }) => [
                styles.sendButton,
                {
                  backgroundColor:
                    (inputText.trim() || pendingImageDataUrl) && !isLoading
                      ? colors.primary
                      : colors.surfaceVariant,
                  opacity: pressed ? 0.8 : isLoading ? 0.5 : 1,
                },
              ]}
            >
              <Ionicons
                name="send"
                size={18}
                color={(inputText.trim() || pendingImageDataUrl) && !isLoading ? '#FFFFFF' : colors.textSecondary}
              />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flex: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
  },
  headerBtn: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
  },
  messagesList: {
    padding: 16,
    gap: 12,
  },
  bubbleRow: {
    flexDirection: 'row',
  },
  bubbleRowUser: {
    justifyContent: 'flex-end',
  },
  bubbleRowBot: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '78%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  bubbleText: {
    lineHeight: 21,
  },
  errorIcon: {
    marginBottom: 4,
  },
  typingDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  inputBar: {
    paddingHorizontal: 12,
    paddingTop: 8,
    borderTopWidth: 1,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 8,
  },
  inputContainer: {
    flex: 1,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  input: {
    width: '100%',
    minHeight: 40,
    maxHeight: 100,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 20,
  },
  charCount: {
    position: 'absolute',
    bottom: 6,
    right: 16,
    fontSize: 10,
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePreviewContainer: {
    position: 'relative',
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  imagePreview: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  imageRemoveBtn: {
    position: 'absolute',
    top: -6,
    right: -6,
    borderRadius: 10,
  },
  bubbleImage: {
    width: 200,
    height: 200,
    borderRadius: 12,
    marginBottom: 6,
  },
});
