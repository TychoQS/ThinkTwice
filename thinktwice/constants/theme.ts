/**
 * Centralized theme configuration for ThinkTwice.
 * Primary and secondary colors are easily swappable.
 * Light and dark variants for all semantic tokens.
 */

import { Platform } from 'react-native';

// ── Brand palette (swap these to re-theme the entire app) ──
const primary = '#599380';
const primaryLight = '#75AF9C';
const primaryDark = '#3D7764';

const secondary = '#CAE8DE';
const secondaryLight = '#DFF4EF';
const secondaryDark = '#A0C8BA';

// ── Dark mode brand palette (brighter variants for dark backgrounds) ──
const primaryDk = '#75AF9C';       // same as primaryLight — more visible on dark
const primaryLightDk = '#92C4B4';
const primaryDarkDk = '#599380';   // original primary becomes the dark variant
const secondaryDk = '#9DCFC0';     // mid-tone mint — more visible than #CAE8DE on dark
const secondaryLightDk = '#BAE2D8';
const secondaryDarkDk = '#72B09B';

export const Colors = {
  light: {
    // Semantic
    text: '#11181C',
    textSecondary: '#687076',
    background: '#F8F9FA',
    surface: '#FFFFFF',
    surfaceVariant: '#F0F2F5',
    border: '#E1E4E8',

    // Brand
    primary,
    primaryLight,
    primaryDark,
    secondary,
    secondaryLight,
    secondaryDark,

    // Chat-specific
    bubbleUser: primary,
    bubbleUserText: '#FFFFFF',
    bubbleBot: '#E8ECF0',
    bubbleBotText: '#11181C',
    bubbleError: '#FEE2E2',
    bubbleErrorText: '#991B1B',
    typingIndicator: '#9BA1A6',
    inputBackground: '#FFFFFF',
    inputBorder: '#D0D5DD',

    // Legacy (keep existing consumers happy)
    tint: primary,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: primary,
  },
  dark: {
    // Semantic
    text: '#ECEDEE',
    textSecondary: '#9BA1A6',
    background: '#0D1117',
    surface: '#161B22',
    surfaceVariant: '#21262D',
    border: '#30363D',

    // Brand
    primary: primaryDk,
    primaryLight: primaryLightDk,
    primaryDark: primaryDarkDk,
    secondary: secondaryDk,
    secondaryLight: secondaryLightDk,
    secondaryDark: secondaryDarkDk,

    // Chat-specific
    bubbleUser: primaryDk,
    bubbleUserText: '#0D1117',
    bubbleBot: '#21262D',
    bubbleBotText: '#ECEDEE',
    bubbleError: '#450A0A',
    bubbleErrorText: '#FCA5A5',
    typingIndicator: '#687076',
    inputBackground: '#161B22',
    inputBorder: '#30363D',

    // Legacy
    tint: primaryDk,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryDk,
  },
};

export const Fonts = Platform.select({
  ios: {
    sans: 'system-ui',
    serif: 'ui-serif',
    rounded: 'ui-rounded',
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
