import { StyleSheet, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';

const WAITING_SECONDS = 10 * 60; // 10 minutes

export default function WaitingRoomScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const { resolvedTheme, fontScale } = useSettings();
    const colors = Colors[resolvedTheme];

    const [timeLeft, setTimeLeft] = useState(WAITING_SECONDS);
    const [isActive, setIsActive] = useState(false);

    useFocusEffect(
        useCallback(() => {
            setIsActive(true);
            setTimeLeft(WAITING_SECONDS);
            return () => setIsActive(false);
        }, [])
    );

    useEffect(() => {
        if (!isActive || timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft((prev) => Math.max(0, prev - 1));
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft, isActive]);

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    const progress = 1 - timeLeft / WAITING_SECONDS;

    return (
        <ThemedView
            style={styles.container}
            lightColor={colors.background}
            darkColor={colors.background}
        >
            <View
                style={[
                    styles.header,
                    { paddingTop: insets.top + 8, borderBottomColor: colors.border, backgroundColor: colors.surface },
                ]}
            >
                <Pressable onPress={() => router.back()} style={styles.headerBtn}>
                    <Ionicons name="arrow-back" size={24} color={colors.text} />
                </Pressable>
                <ThemedText type="defaultSemiBold" style={styles.headerTitle}>
                    {t('waitingRoom.title')}
                </ThemedText>
                <View style={styles.headerBtn} />
            </View>

            <View style={styles.content}>
                <View style={[styles.timerCircle, { borderColor: colors.border, backgroundColor: colors.surfaceVariant }]}>
                    <ThemedText
                        type="title"
                        style={{ fontSize: 48 * fontScale, lineHeight: 48 * fontScale * 1.2, color: colors.primary }}
                        numberOfLines={1}
                        adjustsFontSizeToFit
                    >
                        {formatTime(timeLeft)}
                    </ThemedText>
                </View>

                <ThemedText type="defaultSemiBold" style={[styles.subtitle, { fontSize: 20 * fontScale, color: colors.text }]}>
                    {timeLeft > 0 ? t('waitingRoom.subtitle') : t('waitingRoom.completed')}
                </ThemedText>

                {timeLeft > 0 && (
                    <View style={styles.progressContainer}>
                        <ThemedText style={{ color: colors.textSecondary, marginBottom: 8, textAlign: 'center' }}>
                            {t('waitingRoom.timeRemaining')}
                        </ThemedText>
                        <View style={[styles.progressTrack, { backgroundColor: colors.border }]}>
                            <View style={[styles.progressFill, { backgroundColor: colors.primary, width: `${progress * 100}%` }]} />
                        </View>
                    </View>
                )}

                <View style={{ flex: 1 }} />

                <Pressable
                    onPress={() => router.back()}
                    style={({ pressed }) => [
                        styles.leaveButton,
                        { backgroundColor: colors.primary, opacity: pressed ? 0.8 : 1 },
                    ]}
                >
                    <ThemedText type="defaultSemiBold" style={{ color: '#fff', fontSize: 16 * fontScale }}>
                        {t('waitingRoom.leave')}
                    </ThemedText>
                </Pressable>
            </View>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
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
        fontSize: 17,
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingTop: 60,
        paddingBottom: 40,
    },
    timerCircle: {
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 32,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
    },
    subtitle: {
        textAlign: 'center',
        marginBottom: 40,
    },
    progressContainer: {
        width: '100%',
        maxWidth: 300,
    },
    progressTrack: {
        height: 8,
        borderRadius: 4,
        overflow: 'hidden',
    },
    progressFill: {
        height: '100%',
        borderRadius: 4,
    },
    leaveButton: {
        width: '100%',
        maxWidth: 300,
        paddingVertical: 16,
        borderRadius: 14,
        alignItems: 'center',
    },
});
