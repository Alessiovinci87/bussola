export type Language = 'it' | 'en';
export type ThemeMode = 'light' | 'dark' | 'system';
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';
export type AgeRange = '0-2' | '3-5' | '6-9' | '10-12' | '13+';
export type EpisodeOutcome = 'resolved' | 'partially' | 'unresolved';
export type FeedbackValue = 'useful' | 'not_useful';

export interface Episode {
  id: string;
  date: string; // ISO 8601
  situation: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  durationMinutes?: number;
  strategyApplied?: string; // ID from strategies
  outcome?: EpisodeOutcome;
  safetyFlagActivated: boolean;
  notes?: string;
  schemaVersion: number;
}

export interface UserProfile {
  childAgeRange?: AgeRange;
  sensitivities: ProfileSensitivity[];
  schemaVersion: number;
}

export type ProfileSensitivity =
  | 'aggression'
  | 'anxiety'
  | 'sleep'
  | 'food'
  | 'school'
  | 'transitions';

export interface SuggestionFeedback {
  id: string;
  strategyId: string;
  value: FeedbackValue;
  date: string; // ISO 8601
  schemaVersion: number;
}

export interface PatternInsight {
  type: 'time_of_day' | 'intensity_trend' | 'frequent_situation';
  message: string; // già tradotto
  data: Record<string, unknown>;
}

export interface ReminderSettings {
  enabled: boolean;
  hour: number; // 0-23
  minute: 0 | 30;
}
