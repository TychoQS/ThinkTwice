import { StyleSheet, Modal, View, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { useNetworkViewModel } from '@/viewmodels/useNetworkViewModel';
import { useSettings } from '@/contexts/SettingsContext';
import { Colors } from '@/constants/theme';
import { ThemedText } from '@/components/themed-text';

export function NetworkAlert() {
  const { isOffline } = useNetworkViewModel();
  const { t } = useTranslation();
  const { resolvedTheme, fontScale } = useSettings();
  const colors = Colors[resolvedTheme];
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    if (!isOffline) {
      setDismissed(false);
    }
  }, [isOffline]);

  const visible = isOffline && !dismissed;

  return (
    <Modal visible={visible} transparent animationType="fade" statusBarTranslucent>
      <View style={styles.overlay}>
        <View style={[styles.modalCard, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          <Pressable
            onPress={() => setDismissed(true)}
            style={styles.closeButton}
            hitSlop={8}
          >
            <Ionicons name="close" size={24} color={colors.textSecondary} />
          </Pressable>

          <View style={[styles.iconCircle, { backgroundColor: colors.bubbleError }]}>
            <Ionicons name="cloud-offline" size={32} color={colors.bubbleErrorText} />
          </View>
          
          <ThemedText style={[styles.title, { fontSize: 16 * fontScale }]}>
            {t('network.offlineWarning')}
          </ThemedText>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalCard: {
    width: '100%',
    maxWidth: 320,
    borderRadius: 24,
    borderWidth: 1,
    padding: 32,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
  },
});
