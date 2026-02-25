import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { Language, ThemeMode, ReminderSettings } from '@/types';

interface SettingsState {
  language: Language;
  theme: ThemeMode;
  reminder: ReminderSettings;
  setLanguage: (language: Language) => void;
  setTheme: (theme: ThemeMode) => void;
  setReminder: (reminder: ReminderSettings) => void;
}

const defaultReminder: ReminderSettings = {
  enabled: false,
  hour: 20,
  minute: 0,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      language: 'it',
      theme: 'system',
      reminder: defaultReminder,
      setLanguage: (language) => set({ language }),
      setTheme: (theme) => set({ theme }),
      setReminder: (reminder) => set({ reminder }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
