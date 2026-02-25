import { create } from 'zustand';
import type { SafetyLevel } from '@/engines/safety/types';

interface SafetyStore {
  currentLevel: SafetyLevel;
  isCrisisMode: boolean;
  lastCheckedText: string;
  activateCrisis: () => void;
  resolveCrisis: () => void;
  setLevel: (level: SafetyLevel) => void;
  setLastCheckedText: (text: string) => void;
}

export const useSafetyStore = create<SafetyStore>()((set) => ({
  currentLevel: 'SAFE',
  isCrisisMode: false,
  lastCheckedText: '',

  activateCrisis: () => set({ currentLevel: 'CRISIS', isCrisisMode: true }),

  resolveCrisis: () => set({ currentLevel: 'SAFE', isCrisisMode: false }),

  setLevel: (level) =>
    set({ currentLevel: level, isCrisisMode: level === 'CRISIS' }),

  setLastCheckedText: (text) => set({ lastCheckedText: text }),
}));
