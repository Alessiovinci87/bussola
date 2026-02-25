import { useEffect } from 'react';
import { useEpisodeStore } from '@/stores/episodeStore';

/**
 * Carica gli episodi al primo mount e li espone insieme alle azioni CRUD.
 */
export function useEpisodes() {
  const { episodes, isLoaded, load, add, update, remove, setOutcome } =
    useEpisodeStore();

  useEffect(() => {
    if (!isLoaded) {
      load();
    }
  }, [isLoaded, load]);

  return { episodes, isLoaded, add, update, remove, setOutcome };
}
