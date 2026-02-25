import { score } from './scorer';
import { getStrategyById, type Strategy } from '@/content/strategies';
import type { SuggestionContext } from './types';

const MAX_SUGGESTIONS = 3;

/**
 * SuggestionEngine — interfaccia pubblica del modulo suggerimenti.
 *
 * Unico punto di accesso per tutti i componenti e hook.
 * Sostituibile con LLM in Fase 2 senza modificare la UI.
 */
export const SuggestionEngine = {
  /**
   * Restituisce al massimo MAX_SUGGESTIONS strategie ordinate per rilevanza.
   *
   * @param ctx     Contesto della situazione
   * @param feedbackScores  Mappa strategyId → score feedback aggregato
   */
  suggest(
    ctx: SuggestionContext,
    feedbackScores: Record<string, number> = {}
  ): Strategy[] {
    const scored = score(ctx, feedbackScores);
    return scored
      .slice(0, MAX_SUGGESTIONS)
      .map((s) => getStrategyById(s.strategyId))
      .filter((s): s is Strategy => s !== undefined);
  },
};
