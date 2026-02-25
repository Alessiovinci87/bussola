import { create } from 'zustand';
import type { SuggestionFeedback, FeedbackValue } from '@/types';
import { storageService } from '@/services/storage/StorageService';
import { generateId } from '@/utils/id';

const FEEDBACK_PREFIX = 'feedback:';
const SCHEMA_VERSION = 1;

interface FeedbackStore {
  feedbacks: SuggestionFeedback[];
  isLoaded: boolean;
  load: () => Promise<void>;
  addFeedback: (strategyId: string, value: FeedbackValue) => Promise<void>;
  getScoreForStrategy: (strategyId: string) => number;
}

export const useFeedbackStore = create<FeedbackStore>()((set, get) => ({
  feedbacks: [],
  isLoaded: false,

  load: async () => {
    const loaded = await storageService.getAllByPrefix<SuggestionFeedback>(FEEDBACK_PREFIX);
    set({ feedbacks: loaded, isLoaded: true });
  },

  addFeedback: async (strategyId, value) => {
    const feedback: SuggestionFeedback = {
      id: generateId(),
      strategyId,
      value,
      date: new Date().toISOString(),
      schemaVersion: SCHEMA_VERSION,
    };
    await storageService.set(`${FEEDBACK_PREFIX}${feedback.id}`, feedback);
    set((state) => ({ feedbacks: [...state.feedbacks, feedback] }));
  },

  // Score: +1 per "useful", -1 per "not_useful". Usato dal SuggestionEngine.
  getScoreForStrategy: (strategyId) => {
    const relevant = get().feedbacks.filter((f) => f.strategyId === strategyId);
    return relevant.reduce(
      (acc, f) => acc + (f.value === 'useful' ? 1 : -1),
      0
    );
  },
}));
