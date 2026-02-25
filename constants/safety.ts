/**
 * Soglie e configurazioni del Safety Engine.
 * Modificare qui per calibrare la sensibilità senza toccare la logica.
 */
export const SAFETY_THRESHOLDS = {
  WATCH: 1,
  ALERT: 2,
  CRISIS: 3,
} as const;

/** Debounce in ms per il controllo safety su input utente */
export const SAFETY_CHECK_DEBOUNCE_MS = 300;

/** Lunghezza minima testo prima di avviare il controllo */
export const SAFETY_MIN_TEXT_LENGTH = 3;
