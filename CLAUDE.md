# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Start dev server
npx expo start

# Platform-specific
npx expo start --android
npx expo start --ios
npx expo start --web

# Lint
npx expo lint
```

There are no automated tests in this project.

## Architecture

ThinkTwice is an Expo (React Native) app that helps users avoid impulse purchases via an AI-powered questionnaire and chat. It uses **file-based routing** (Expo Router) with a **MVVM-inspired** layered architecture.

### Layer Responsibilities

| Layer | Path | Role |
|---|---|---|
| Screens | `app/` | Expo Router pages — thin wrappers that mount a View |
| Views | `views/` | Screen UI implementations, consume ViewModels |
| ViewModels | `viewmodels/` | Feature state & logic as custom hooks (`useState` + `useCallback`) |
| Contexts | `contexts/` | App-wide state (`SettingsContext`: theme, fontSize, language, distraction app) |
| Services | `services/` | External API calls and business logic |
| Models | `models/` | TypeScript interfaces and types |
| Data | `data/` | Static question sets and marketing trap definitions |
| Components | `components/` | Reusable UI; `ThemedText`/`ThemedView` are the theme-aware primitives |
| Constants | `constants/` | Theme colors and semantic tokens (`constants/theme.ts`) |
| i18n | `i18n/` | i18next setup; locale files under `i18n/locales/` |

### Navigation

Drawer navigation via `@react-navigation/drawer`. Root layout is `app/_layout.tsx`, which wraps everything in `SettingsProvider` and defines all drawer routes.

### State Management

- **Global state** — `SettingsContext` persists theme, font size, language, and distraction app to AsyncStorage.
- **Feature state** — `useChatViewModel`, `useQuestionnaireViewModel`, `useNetworkViewModel` are the ViewModels.
- No external state library (no Redux/Zustand).

### AI Integration

Adapter pattern under `services/ai/`. `AIAdapter.ts` defines the interface; `GroqAdapter.ts` is the current implementation. `services/aiService.ts` is the factory entry point. Swap providers by implementing `AIAdapter` and updating `aiConfig.ts`.

### Internationalization

i18next with 7 languages (en, es, de, ru, zh, ko, ja). Device locale is auto-detected via `expo-localization`; user can override in Settings. All strings live in `i18n/locales/{lang}.ts`. Use `useTranslation()` in components.

### Theming

All colors come from `constants/theme.ts`. Components read the active theme from `SettingsContext` and index into `Colors[resolvedTheme]`. Font scaling (0.85 / 1 / 1.2) is also driven by `SettingsContext.fontScale`.

### Path Alias

`@/*` resolves to the repo root (configured in `tsconfig.json`).

### Questionnaire Flow

Multi-phase flow managed by `useQuestionnaireViewModel`: mode-selection → profile-detection → profile-specific questions → result. Question data is in `data/`.
