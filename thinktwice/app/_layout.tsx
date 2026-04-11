import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import * as SystemUI from 'expo-system-ui';
import 'react-native-reanimated';

import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';
import { DrawerContent } from '@/components/DrawerContent';
import { NetworkAlert } from '@/components/NetworkAlert';
import { Colors } from '@/constants/theme';
import '@/i18n';

function DrawerLayout() {
  const { resolvedTheme } = useSettings();
  const colors = Colors[resolvedTheme];

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(colors.background);
  }, [colors.background]);

  return (
    <ThemeProvider value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          sceneStyle: { backgroundColor: colors.background },
          drawerStyle: {
            width: 280,
            backgroundColor: colors.surface,
          },
          swipeEnabled: true,
        }}
      >
        <Drawer.Screen name="index" />
        <Drawer.Screen name="lobby" />
        <Drawer.Screen name="chat" />
        <Drawer.Screen name="settings" />
        <Drawer.Screen name="questionnaire" />
        <Drawer.Screen name="crisis" />
        <Drawer.Screen name="waiting-room" />
      </Drawer>
      <NetworkAlert />
      <StatusBar style={resolvedTheme === 'dark' ? 'light' : 'dark'} />
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SettingsProvider>
        <DrawerLayout />
      </SettingsProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
