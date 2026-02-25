import type { Episode } from '@/types';
import type { PatternInsight } from './types';

const MIN_EPISODES_FOR_INSIGHTS = 5;

const STOPWORDS = new Set([
  'a', 'al', 'alla', 'alle', 'agli', 'ai', 'che', 'chi', 'ci', 'col', 'con',
  'da', 'dal', 'dalla', 'dalle', 'dagli', 'dai', 'degli', 'dei', 'del',
  'della', 'delle', 'dello', 'di', 'e', 'ed', 'era', 'è', 'essere', 'fa',
  'fare', 'gli', 'ha', 'hanno', 'ho', 'i', 'il', 'in', 'la', 'le', 'li',
  'lo', 'ma', 'mi', 'mio', 'mia', 'molto', 'ne', 'nel', 'nella', 'nelle',
  'negli', 'nei', 'non', 'o', 'per', 'più', 'può', 'quando', 'qui', 'se',
  'si', 'sia', 'sono', 'sta', 'stavo', 'su', 'sua', 'sue', 'sui', 'sul',
  'sulla', 'sulle', 'sugli', 'suo', 'suoi', 'ti', 'tra', 'tutto', 'un',
  'una', 'uno', 'vi', 'vuole', 'con', 'come', 'però', 'anche', 'oggi',
  'mio', 'mia', 'tuo', 'tua', 'lui', 'lei', 'noi', 'voi', 'loro', 'ho',
  'ha', 'hai', 'abbiamo', 'avevo', 'aveva', 'stare', 'stato', 'stata',
]);

function extractKeywords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-zàáâãäåèéêëìíîïòóôõöùúûü\s]/g, ' ')
    .split(/\s+/)
    .filter((w) => w.length > 3 && !STOPWORDS.has(w));
}

function getTimeOfDay(isoDate: string): string {
  const hour = new Date(isoDate).getHours();
  if (hour >= 6 && hour < 12) return 'mattina';
  if (hour >= 12 && hour < 18) return 'pomeriggio';
  if (hour >= 18 && hour < 22) return 'sera';
  return 'notte';
}

/**
 * PatternAnalyzer — analisi non clinica degli episodi locali.
 * Funzioni pure, nessun side effect.
 */
export const PatternAnalyzer = {
  /**
   * Genera insight dagli episodi. Richiede almeno MIN_EPISODES_FOR_INSIGHTS episodi.
   */
  analyze(episodes: Episode[]): PatternInsight[] {
    if (episodes.length < MIN_EPISODES_FOR_INSIGHTS) return [];

    const insights: PatternInsight[] = [];

    // Insight 1: Fascia oraria più frequente
    const timeCounts: Record<string, number> = {};
    for (const ep of episodes) {
      const t = getTimeOfDay(ep.date);
      timeCounts[t] = (timeCounts[t] ?? 0) + 1;
    }
    const topTime = Object.entries(timeCounts).sort((a, b) => b[1] - a[1])[0];
    if (topTime && topTime[1] >= 3) {
      insights.push({
        type: 'time_of_day',
        message: `La maggior parte degli episodi avviene di ${topTime[0]}.`,
        data: { timeOfDay: topTime[0], count: topTime[1] },
      });
    }

    // Insight 2: Trend intensità (ultimi 7 episodi)
    const recent = episodes.slice(0, 7);
    if (recent.length >= 4) {
      const firstHalf = recent.slice(Math.floor(recent.length / 2));
      const secondHalf = recent.slice(0, Math.floor(recent.length / 2));
      const avg = (arr: Episode[]) =>
        arr.reduce((s, e) => s + e.intensity, 0) / arr.length;
      const diff = avg(secondHalf) - avg(firstHalf);
      if (diff <= -0.8) {
        insights.push({
          type: 'intensity_trend',
          message: 'Nelle ultime settimane l\'intensità degli episodi è diminuita.',
          data: { trend: 'decreasing', diff },
        });
      } else if (diff >= 0.8) {
        insights.push({
          type: 'intensity_trend',
          message: 'Nelle ultime settimane l\'intensità degli episodi è aumentata.',
          data: { trend: 'increasing', diff },
        });
      }
    }

    // Insight 3: Parola/tema più frequente nelle situazioni
    const wordCounts: Record<string, number> = {};
    for (const ep of episodes) {
      const words = extractKeywords(ep.situation);
      const seen = new Set<string>();
      for (const w of words) {
        if (!seen.has(w)) {
          wordCounts[w] = (wordCounts[w] ?? 0) + 1;
          seen.add(w);
        }
      }
    }
    const topWord = Object.entries(wordCounts).sort((a, b) => b[1] - a[1])[0];
    if (topWord && topWord[1] >= 3) {
      insights.push({
        type: 'frequent_situation',
        message: `La parola "${topWord[0]}" ricorre spesso nelle tue situazioni difficili.`,
        data: { word: topWord[0], count: topWord[1] },
      });
    }

    return insights;
  },

  hasEnoughData(episodes: Episode[]): boolean {
    return episodes.length >= MIN_EPISODES_FOR_INSIGHTS;
  },
};
