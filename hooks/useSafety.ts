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
  const setResult = useSafetyStore((s) => s.setResult);
  const setLastCheckedText = useSafetyStore((s) => s.setLastCheckedText);
  const currentLevel = useSafetyStore((s) => s.currentLevel);
  const currentScore = useSafetyStore((s) => s.currentScore);
  const currentMatchedClusters = useSafetyStore((s) => s.currentMatchedClusters);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    if (text.length < SAFETY_MIN_TEXT_LENGTH) {
      setResult('SAFE', 0, []);
      return;
    }

    timerRef.current = setTimeout(() => {
      const result = SafetyEngine.analyze(text);
      setResult(result.level, result.score, result.matchedClusters);
      setLastCheckedText(text);
    }, SAFETY_CHECK_DEBOUNCE_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [text, setResult, setLastCheckedText]);

  return {
    level: currentLevel,
    score: currentScore,
    matchedClusters: currentMatchedClusters,
  };
}
