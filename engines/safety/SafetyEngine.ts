import { classify } from './classifier';
import type { SafetyResult } from './types';

/**
 * SafetyEngine — interfaccia pubblica del modulo safety.
 *
 * Unico punto di accesso per tutti i componenti e hook.
 * Sostituibile in Fase 2 (es. classificatore ML) senza toccare la UI.
 */
export const SafetyEngine = {
  /**
   * Analizza il testo e restituisce il livello di sicurezza.
   * Funzione pura — nessun side effect.
   */
  analyze(text: string): SafetyResult {
    return classify(text);
  },

  /**
   * Verifica rapida: il testo richiede intervento immediato?
   */
  isCrisis(text: string): boolean {
    return classify(text).level === 'CRISIS';
  },
};
