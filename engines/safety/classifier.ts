import { ALL_PATTERNS } from './patterns';
import type { SafetyCluster, SafetyLevel, SafetyResult } from './types';

const CLUSTER_SCORES: Record<SafetyCluster, number> = {
  A: 1,
  B: 2,
  C: 2,
  D: 3,
  E: 3,
  F: 3,
};

const CRISIS_CLUSTERS: SafetyCluster[] = ['D', 'E', 'F'];
const ALERT_CLUSTERS: SafetyCluster[] = ['B', 'C'];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // rimuove accenti
    .replace(/[''`]/g, ' ')          // apostrofi → spazio
    .replace(/[^a-z0-9\s]/g, ' ')    // punteggiatura → spazio
    .replace(/\s+/g, ' ')
    .trim();
}

function matchesPhrase(normalizedText: string, phrase: string): boolean {
  const normalizedPhrase = normalize(phrase);
  return normalizedText.includes(normalizedPhrase);
}

export function classify(input: string): SafetyResult {
  if (!input || input.trim().length < 3) {
    return { level: 'SAFE', score: 0, matchedClusters: [] };
  }

  const normalizedInput = normalize(input);
  const matchedClusters: SafetyCluster[] = [];
  let totalScore = 0;

  for (const pattern of ALL_PATTERNS) {
    const hasMatch = pattern.phrases.some((phrase) =>
      matchesPhrase(normalizedInput, phrase)
    );
    if (hasMatch) {
      matchedClusters.push(pattern.cluster);
      totalScore += CLUSTER_SCORES[pattern.cluster];
    }
  }

  const level = resolveLevel(totalScore, matchedClusters);

  return { level, score: totalScore, matchedClusters };
}

function resolveLevel(score: number, clusters: SafetyCluster[]): SafetyLevel {
  const hasCrisisCluster = clusters.some((c) => CRISIS_CLUSTERS.includes(c));
  if (hasCrisisCluster || score >= 3) return 'CRISIS';

  const hasAlertCluster = clusters.some((c) => ALERT_CLUSTERS.includes(c));
  if (hasAlertCluster || score >= 2) return 'ALERT';

  if (score >= 1) return 'WATCH';

  return 'SAFE';
}
