import AsyncStorage from '@react-native-async-storage/async-storage';
import type { DecisionEntry } from '@/models/decision';

const STORAGE_KEY = '@thinktwice_decisions';

export async function saveDecision(entry: DecisionEntry): Promise<void> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    const existing: DecisionEntry[] = raw ? JSON.parse(raw) : [];
    existing.push(entry);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(existing));
  } catch {
    // silently fail - non-critical
  }
}

export async function loadDecisions(): Promise<DecisionEntry[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}
