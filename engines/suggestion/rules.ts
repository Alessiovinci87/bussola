import type { Rule } from './types';

export const RULES: Rule[] = [
  // --- Alta intensità (4-5) ---
  {
    id: 'rule-crisis-high',
    conditions: { intensityMin: 4 },
    strategyIds: ['pause-5', 'corpo-movimento', 'chiamata-supporto', 'abbassare-aspettative'],
    priority: 10,
  },
  {
    id: 'rule-exhaustion-high',
    conditions: {
      intensityMin: 4,
      keywords: ['stanco', 'esausto', 'non ce la faccio', 'a pezzi', 'stremato'],
    },
    strategyIds: ['pause-5', 'abbassare-aspettative', 'chiamata-supporto'],
    priority: 9,
  },

  // --- Capriccio / pianto ---
  {
    id: 'rule-tantrum',
    conditions: {
      keywords: ['capriccio', 'urla', 'urlo', 'piange', 'pianto', 'crisi'],
    },
    strategyIds: ['validazione-emozioni', 'timer-silenzio', 'distrazione-attiva'],
    priority: 8,
  },
  {
    id: 'rule-tantrum-small',
    conditions: {
      keywords: ['capriccio', 'piange', 'pianto'],
      ageRanges: ['0-2', '3-5'],
    },
    strategyIds: ['distrazione-attiva', 'timer-silenzio', 'routine-calma'],
    priority: 9,
  },

  // --- Rabbia genitore ---
  {
    id: 'rule-parent-anger',
    conditions: {
      keywords: ['arrabbiato', 'arrabbiata', 'rabbia', 'esploso', 'urlato', 'perso la testa'],
    },
    strategyIds: ['respiro-4-7-8', 'corpo-movimento', 'pause-5'],
    priority: 9,
  },

  // --- Opposizione / ribellione ---
  {
    id: 'rule-opposition',
    conditions: {
      keywords: ['non vuole', 'rifiuta', 'oppone', 'dice no', 'ribelle', 'non obbedisce'],
    },
    strategyIds: ['scelta-controllata', 'validazione-emozioni', 'scrittura-rapida'],
    priority: 7,
  },
  {
    id: 'rule-opposition-older',
    conditions: {
      keywords: ['non vuole', 'rifiuta', 'dice no'],
      ageRanges: ['6-9', '10-12', '13+'],
    },
    strategyIds: ['scelta-controllata', 'validazione-emozioni'],
    priority: 8,
  },

  // --- Ansia / sopraffazione ---
  {
    id: 'rule-anxiety',
    conditions: {
      keywords: ['ansia', 'ansioso', 'ansiosa', 'sopraffatto', 'sopraffatta', 'paura'],
    },
    strategyIds: ['grounding-5-4-3-2-1', 'respiro-4-7-8', 'scrittura-rapida'],
    priority: 7,
  },

  // --- Sera / sonno ---
  {
    id: 'rule-evening-sleep',
    conditions: {
      keywords: ['non dorme', 'sonno', 'notte', 'va a letto', 'addormentare'],
      timeOfDay: ['evening', 'night'],
    },
    strategyIds: ['routine-calma', 'timer-silenzio', 'abbassare-aspettative'],
    priority: 8,
  },
  {
    id: 'rule-evening-general',
    conditions: { timeOfDay: ['evening', 'night'], intensityMin: 3 },
    strategyIds: ['routine-calma', 'abbassare-aspettative'],
    priority: 6,
  },

  // --- Cibo ---
  {
    id: 'rule-food',
    conditions: {
      keywords: ['mangia', 'cibo', 'pasto', 'non mangia', 'rifiuta di mangiare'],
    },
    strategyIds: ['abbassare-aspettative', 'scelta-controllata', 'validazione-emozioni'],
    priority: 7,
  },

  // --- Intensità bassa (1-2): approccio preventivo ---
  {
    id: 'rule-low-intensity',
    conditions: { intensityMax: 2 },
    strategyIds: ['validazione-emozioni', 'distrazione-attiva', 'scelta-controllata'],
    priority: 5,
  },

  // --- Fallback generale ---
  {
    id: 'rule-default',
    conditions: {},
    strategyIds: ['respiro-4-7-8', 'pause-5', 'validazione-emozioni'],
    priority: 1,
  },
];
