import type { AgeRange, TimeOfDay } from '@/types';

export interface SuggestionContext {
  situation: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  timeOfDay: TimeOfDay;
  childAgeRange?: AgeRange;
  recentStrategyIds: string[]; // ultimi 24h — escluse
}

export interface Condition {
  intensityMin?: number;
  intensityMax?: number;
  keywords?: string[];   // match su situation (OR logic)
  timeOfDay?: TimeOfDay[];
  ageRanges?: AgeRange[];
}

export interface Rule {
  id: string;
  conditions: Condition;
  strategyIds: string[];
  priority: number; // 1 (bassa) → 10 (alta)
}

export interface ScoredStrategy {
  strategyId: string;
  score: number;
}
