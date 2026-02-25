import { create } from 'zustand';
import type { SafetyLevel, SafetyCluster } from '@/engines/safety/types';

interface SafetyStore {
  currentLevel: SafetyLevel;
  currentScore: number;
  currentMatchedClusters: SafetyCluster[];
  isCrisisMode: boolean;
  lastCheckedText: string;
  activateCrisis: () => void;
  resolveCrisis: () => void;
  setResult: (level: SafetyLevel, score: number, matchedClusters: SafetyCluster[]) => void;
  setLastCheckedText: (text: string) => void;
}

export const useSafetyStore = create<SafetyStore>()((set) => ({
  currentLevel: 'SAFE',
  currentScore: 0,
  currentMatchedClusters: [],
  isCrisisMode: false,
  lastCheckedText: '',

  activateCrisis: () => set({ currentLevel: 'CRISIS', isCrisisMode: true }),

  resolveCrisis: () => set({ currentLevel: 'SAFE', isCrisisMode: false, currentScore: 0, currentMatchedClusters: [] }),

  setResult: (level, score, matchedClusters) =>
    set({ currentLevel: level, currentScore: score, currentMatchedClusters: matchedClusters, isCrisisMode: level === 'CRISIS' }),

  setLastCheckedText: (text) => set({ lastCheckedText: text }),
}));
