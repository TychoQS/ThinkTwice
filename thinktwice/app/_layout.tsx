import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import 'react-native-reanimated';

import { SettingsProvider, useSettings } from '@/contexts/SettingsContext';
import { DrawerContent } from '@/components/DrawerContent';
import { Colors } from '@/constants/theme';
import '@/i18n';

function DrawerLayout() {
  const { resolvedTheme } = useSettings();
  const colors = Colors[resolvedTheme];

  return (
    <ThemeProvider value={resolvedTheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Drawer
        drawerContent={(props) => <DrawerContent {...props} />}
        screenOptions={{
          headerShown: false,
          drawerType: 'front',
          drawerStyle: {
            width: 280,
            backgroundColor: colors.surface,
          },
          swipeEnabled: true,
        }}
      >
        <Drawer.Screen name="index" />
        <Drawer.Screen name="chat" />
        <Drawer.Screen name="settings" />
        <Drawer.Screen name="questionnaire" />
      </Drawer>
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
