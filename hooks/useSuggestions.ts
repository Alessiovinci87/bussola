import { useMemo } from 'react';
import { SuggestionEngine } from '@/engines/suggestion/SuggestionEngine';
import { useFeedbackStore } from '@/stores/feedbackStore';
import { useEpisodeStore } from '@/stores/episodeStore';
import { useProfileStore } from '@/stores/profileStore';
import type { Strategy } from '@/content/strategies';
import type { SuggestionContext } from '@/engines/suggestion/types';
import type { TimeOfDay } from '@/types';

function getCurrentTimeOfDay(): TimeOfDay {
  const hour = new Date().getHours();
  if (hour >= 6 && hour < 12) return 'morning';
  if (hour >= 12 && hour < 18) return 'afternoon';
  if (hour >= 18 && hour < 22) return 'evening';
  return 'night';
}

function getRecentStrategyIds(cutoffHours = 24): string[] {
  // Accesso diretto allo store (chiamata fuori da hook è sicura in useMemo)
  const episodes = useEpisodeStore.getState().episodes;
  const cutoff = Date.now() - cutoffHours * 60 * 60 * 1000;
  return episodes
    .filter((e) => e.strategyApplied && new Date(e.date).getTime() > cutoff)
    .map((e) => e.strategyApplied as string);
}

/**
 * Restituisce i suggerimenti per la situazione corrente.
 * Si ricalcola solo quando cambiano situation o intensity.
 */
export function useSuggestions(
  situation: string,
  intensity: 1 | 2 | 3 | 4 | 5
): Strategy[] {
  const { getScoreForStrategy } = useFeedbackStore();
  const { profile } = useProfileStore();

  return useMemo(() => {
    if (!situation.trim()) return [];

    const recentStrategyIds = getRecentStrategyIds();

    const feedbackScores: Record<string, number> = {};
    // Gli ID strategie noti — calcoliamo il feedback per ognuno
    // I nuovi ID non presenti default a 0 (gestito in scorer)
    recentStrategyIds.forEach((id) => {
      feedbackScores[id] = getScoreForStrategy(id);
    });

    const ctx: SuggestionContext = {
      situation,
      intensity,
      timeOfDay: getCurrentTimeOfDay(),
      childAgeRange: profile.childAgeRange,
      recentStrategyIds,
    };

    return SuggestionEngine.suggest(ctx, feedbackScores);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [situation, intensity]);
}
