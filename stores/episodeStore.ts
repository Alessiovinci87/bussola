import { create } from 'zustand';
import type { Episode, EpisodeOutcome } from '@/types';
import { storageService } from '@/services/storage/StorageService';
import { generateId } from '@/utils/id';

const EPISODE_PREFIX = 'episode:';
const SCHEMA_VERSION = 1;

interface EpisodeStore {
  episodes: Episode[];
  isLoaded: boolean;
  load: () => Promise<void>;
  add: (data: Omit<Episode, 'id' | 'date' | 'schemaVersion'>) => Promise<Episode>;
  update: (id: string, data: Partial<Omit<Episode, 'id' | 'schemaVersion'>>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  setOutcome: (id: string, outcome: EpisodeOutcome, strategyApplied?: string) => Promise<void>;
}

export const useEpisodeStore = create<EpisodeStore>()((set, get) => ({
  episodes: [],
  isLoaded: false,

  load: async () => {
    const loaded = await storageService.getAllByPrefix<Episode>(EPISODE_PREFIX);
    const sorted = loaded.sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    set({ episodes: sorted, isLoaded: true });
  },

  add: async (data) => {
    const episode: Episode = {
      ...data,
      id: generateId(),
      date: new Date().toISOString(),
      schemaVersion: SCHEMA_VERSION,
    };
    await storageService.set(`${EPISODE_PREFIX}${episode.id}`, episode);
    set((state) => ({ episodes: [episode, ...state.episodes] }));
    return episode;
  },

  update: async (id, data) => {
    const current = get().episodes.find((e) => e.id === id);
    if (!current) return;
    const updated: Episode = { ...current, ...data };
    await storageService.set(`${EPISODE_PREFIX}${id}`, updated);
    set((state) => ({
      episodes: state.episodes.map((e) => (e.id === id ? updated : e)),
    }));
  },

  remove: async (id) => {
    await storageService.remove(`${EPISODE_PREFIX}${id}`);
    set((state) => ({ episodes: state.episodes.filter((e) => e.id !== id) }));
  },

  setOutcome: async (id, outcome, strategyApplied) => {
    await get().update(id, { outcome, strategyApplied });
  },
}));
