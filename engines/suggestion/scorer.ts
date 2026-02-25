import { RULES } from './rules';
import type { Condition, ScoredStrategy, SuggestionContext } from './types';

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim();
}

function matchesCondition(condition: Condition, ctx: SuggestionContext): boolean {
  if (
    condition.intensityMin !== undefined &&
    ctx.intensity < condition.intensityMin
  )
    return false;

  if (
    condition.intensityMax !== undefined &&
    ctx.intensity > condition.intensityMax
  )
    return false;

  if (condition.timeOfDay && !condition.timeOfDay.includes(ctx.timeOfDay))
    return false;

  if (
    condition.ageRanges &&
    ctx.childAgeRange &&
    !condition.ageRanges.includes(ctx.childAgeRange)
  )
    return false;

  if (condition.keywords && condition.keywords.length > 0) {
    const normalizedSituation = normalize(ctx.situation);
    const hasKeyword = condition.keywords.some((kw) =>
      normalizedSituation.includes(normalize(kw))
    );
    if (!hasKeyword) return false;
  }

  return true;
}

export function score(
  ctx: SuggestionContext,
  feedbackScores: Record<string, number>
): ScoredStrategy[] {
  const candidateMap = new Map<string, number>();

  for (const rule of RULES) {
    if (!matchesCondition(rule.conditions, ctx)) continue;

    for (const strategyId of rule.strategyIds) {
      const existing = candidateMap.get(strategyId) ?? 0;
      candidateMap.set(strategyId, existing + rule.priority);
    }
  }

  // Applica feedback score e rimuovi strategie recenti
  const recentSet = new Set(ctx.recentStrategyIds);
  const scored: ScoredStrategy[] = [];

  for (const [strategyId, baseScore] of candidateMap.entries()) {
    if (recentSet.has(strategyId)) continue;
    const fb = feedbackScores[strategyId] ?? 0;
    scored.push({ strategyId, score: baseScore + fb });
  }

  // Ordina per score decrescente
  scored.sort((a, b) => b.score - a.score);

  return scored;
}
