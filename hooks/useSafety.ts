import { useEffect, useRef } from 'react';
import { SafetyEngine } from '@/engines/safety/SafetyEngine';
import { useSafetyStore } from '@/stores/safetyStore';
import { SAFETY_CHECK_DEBOUNCE_MS, SAFETY_MIN_TEXT_LENGTH } from '@/constants/safety';
import type { SafetyResult } from '@/engines/safety/types';

/**
 * Hook che analizza il testo in input e aggiorna lo store safety.
 * Il debounce evita chiamate eccessive durante la digitazione.
 *
 * @param text  Testo libero inserito dall'utente
 * @returns     Risultato safety corrente
 */
export function useSafety(text: string): SafetyResult {
  const { setLevel, setLastCheckedText, currentLevel, matchedClusters, score } =
    useSafetyStore((s) => ({
      setLevel: s.setLevel,
      setLastCheckedText: s.setLastCheckedText,
      currentLevel: s.currentLevel,
      matchedClusters: [] as string[],
      score: 0,
    }));

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (text.length < SAFETY_MIN_TEXT_LENGTH) {
      setLevel('SAFE');
      return;
    }

    timerRef.current = setTimeout(() => {
      const result = SafetyEngine.analyze(text);
      setLevel(result.level);
      setLastCheckedText(text);
    }, SAFETY_CHECK_DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, setLevel, setLastCheckedText]);

  // Ritorna il risultato corrente dallo store (calcolato nell'effect)
  return {
    level: currentLevel,
    score: 0,
    matchedClusters: [],
  };
}
