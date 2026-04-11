import { StyleSheet, Pressable, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTranslation } from '@/node_modules/react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Linking, Alert } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useSettings } from '@/contexts/SettingsContext';

export default function CrisisToolkitScreen() {
    const router = useRouter();
    const { t } = useTranslation();
    const insets = useSafeAreaInsets();
    const { resolvedTheme, fontScale, distractionApp } = useSettings();
    const colors = Colors[resolvedTheme];

    const handleDistraction = async () => {
        if (!distractionApp) {
            Alert.alert(
                t('crisis.instantDistraction.notSetTitle', 'Aplicación no seleccionada'),
                t('crisis.instantDistraction.notSetDesc', 'Por favor, ve a los ajustes para elegir qué aplicación quieres usar para distraerte.'),
                [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Ir a Ajustes', onPress: () => router.push('/settings') }
                ]
            );
            return;
        }
        try {
            const { RNLauncherKitHelper } = require('react-native-launcher-kit');
            RNLauncherKitHelper.launchApplication(distractionApp);
        } catch (e) {
            console.warn('Could not launch app', e);
            Alert.alert('Error', 'No se pudo abrir la app. ¿Has compilado la app nativa con expo run:android?');
        }
    };

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
                    {t('crisis.title')}
                </ThemedText>
                <View style={styles.headerBtn} />
            </View>

            <View style={styles.content}>
                <ThemedText type="title" style={[styles.mainTitle, { fontSize: 24 * fontScale }]}>
                    {t('crisis.title')}
                </ThemedText>
                <ThemedText style={[styles.description, { color: colors.textSecondary, fontSize: 15 * fontScale }]}>
                    {t('crisis.description')}
                </ThemedText>

                <View style={styles.optionsContainer}>
                    <Pressable
                        onPress={() => router.push('/waiting-room')}
                        style={({ pressed }) => [
                            styles.card,
                            {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                opacity: pressed ? 0.8 : 1,
                            },
                        ]}
                    >
                        <View style={[styles.iconWrap, { backgroundColor: colors.primaryLight + '20' }]}>
                            <Ionicons name="hourglass-outline" size={32} color={colors.primaryLight} />
                        </View>
                        <View style={styles.cardText}>
                            <ThemedText type="defaultSemiBold" style={{ fontSize: 16 * fontScale }}>
                                {t('crisis.waitingRoom.title')}
                            </ThemedText>
                            <ThemedText style={{ color: colors.textSecondary, fontSize: 13 * fontScale }}>
                                {t('crisis.waitingRoom.description')}
                            </ThemedText>
                        </View>
                        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
                    </Pressable>

                    <Pressable
                        onPress={handleDistraction}
                        style={({ pressed }) => [
                            styles.card,
                            {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                opacity: pressed ? 0.8 : 1,
                            },
                        ]}
                    >
                        <View style={[styles.iconWrap, { backgroundColor: colors.primary + '20' }]}>
                            <Ionicons name="rocket-outline" size={32} color={colors.primary} />
                        </View>
                        <View style={styles.cardText}>
                            <ThemedText type="defaultSemiBold" style={{ fontSize: 16 * fontScale }}>
                                {t('crisis.instantDistraction.title')}
                            </ThemedText>
                            <ThemedText style={{ color: colors.textSecondary, fontSize: 13 * fontScale }}>
                                {t('crisis.instantDistraction.description')}
                            </ThemedText>
                        </View>
                        <Ionicons name="open-outline" size={20} color={colors.textSecondary} />
                    </Pressable>
                </View>
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
        paddingHorizontal: 24,
        paddingTop: 32,
    },
    mainTitle: {
        marginBottom: 8,
    },
    description: {
        lineHeight: 22,
        marginBottom: 32,
    },
    optionsContainer: {
        gap: 16,
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 16,
        borderWidth: 1.5,
        gap: 16,
    },
    iconWrap: {
        width: 56,
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cardText: {
        flex: 1,
        gap: 4,
    },
});
