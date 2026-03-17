/**
 * Centralized theme configuration for ThinkTwice.
 * Primary and secondary colors are easily swappable.
 * Light and dark variants for all semantic tokens.
 */

import { Platform } from 'react-native';

// ── Brand palette (swap these to re-theme the entire app) ──
const primary = '#4A90D9';
const primaryLight = '#6BABEF';
const primaryDark = '#3A7BC8';

const secondary = '#F5A623';
const secondaryLight = '#FFBE4F';
const secondaryDark = '#D98E1B';

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
    primary: primaryLight,
    primaryLight: '#8DC4FF',
    primaryDark: primary,
    secondary: secondaryLight,
    secondaryLight: '#FFD080',
    secondaryDark: secondary,

    // Chat-specific
    bubbleUser: primaryLight,
    bubbleUserText: '#0D1117',
    bubbleBot: '#21262D',
    bubbleBotText: '#ECEDEE',
    inputBackground: '#161B22',
    inputBorder: '#30363D',

    // Legacy
    tint: '#FFFFFF',
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: '#FFFFFF',
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
