import type { SafetyPattern } from './types';

/**
 * Cluster A — Esaurimento genitore
 * Score: 1 per match
 */
const CLUSTER_A: SafetyPattern = {
  cluster: 'A',
  phrases: [
    'non ce la faccio',
    'non ce la faccio piu',
    'sono esausto',
    'sono esausta',
    'sono a pezzi',
    'non reggo',
    'non reggo piu',
    'sono al limite',
    'sono esploso',
    'sono esplosa',
    'non ne posso piu',
    'non ne posso',
    'sto cedendo',
    'sono stremato',
    'sono stremata',
    'ho toccato il fondo',
    'non riesco piu',
    'non riesco ad andare avanti',
    'sono distrutto',
    'sono distrutta',
    'non ho piu forze',
    'non ho forze',
    'sono sfinito',
    'sono sfinita',
    'non ne ho piu',
    'non posso andare avanti',
  ],
};

/**
 * Cluster B — Perdita di controllo
 * Score: 2 per match
 */
const CLUSTER_B: SafetyPattern = {
  cluster: 'B',
  phrases: [
    'stavo perdendo la testa',
    'ho perso la testa',
    'non mi controllavo',
    'non riuscivo a fermarmi',
    'non mi riconoscevo',
    'ero fuori di me',
    'ho perso il controllo',
    'stavo perdendo il controllo',
    'non controllavo piu',
    'non sapevo cosa stavo facendo',
    'ero in preda alla rabbia',
    'non riuscivo a calmarmi',
    'ho urlato come un pazzo',
    'ho urlato come una pazza',
    'non mi sono fermato',
    'non mi sono fermata',
    'ho perso la pazienza',
    'ero cieco dalla rabbia',
    'non vedevo piu niente',
    'non riuscivo a controllare la rabbia',
  ],
};

/**
 * Cluster C — Distruzione oggetti
 * Score: 2 per match
 */
const CLUSTER_C: SafetyPattern = {
  cluster: 'C',
  phrases: [
    'ho buttato',
    'ho rotto',
    'ho lanciato',
    'ho spaccato',
    'ho distrutto',
    'ho sbattuto',
    'ho tirato',
    'ho scaraventato',
    'ho sfasciato',
    'ho frantumato',
    'ho rovesciato',
    'ho gettato',
    'ho preso e buttato',
    'ho sbattuto la porta',
    'ho sfondato',
  ],
};

/**
 * Cluster D — Aggressività implicita verso il figlio
 * Score: 3 per match → CRISIS immediato
 */
const CLUSTER_D: SafetyPattern = {
  cluster: 'D',
  phrases: [
    'l ho spinto',
    'l ho strattonato',
    'l ho strattonata',
    'l ho afferrato',
    'l ho afferrata',
    'l ho scosso',
    'l ho scossa',
    'avevo voglia di colpirlo',
    'avevo voglia di colpirla',
    'avevo voglia di colpire',
    'l ho schiaffeggiato',
    'l ho schiaffeggiata',
    'l ho colpito',
    'l ho colpita',
    'l ho picchiato',
    'l ho picchiata',
    'l ho tirato',
    'l ho tirata',
    'l ho trascinato',
    'l ho trascinata',
    'gli ho dato',
    'le ho dato',
    'ho alzato le mani',
    'ho usato le mani',
    'stavo per colpirlo',
    'stavo per colpirla',
  ],
};

/**
 * Cluster E — Rischio fisico
 * Score: 3 per match → CRISIS immediato
 */
const CLUSTER_E: SafetyPattern = {
  cluster: 'E',
  phrases: [
    'ho paura di quello che posso fare',
    'ho paura di fargli del male',
    'ho paura di farle del male',
    'non riesco a garantire la sua sicurezza',
    'potrei fargli del male',
    'potrei farle del male',
    'temo di perdere il controllo',
    'ho paura di me stesso',
    'ho paura di me stessa',
    'non so cosa potrei fare',
    'potrei fare una cosa brutta',
    'mi fa paura quello che sento',
    'non sono sicuro di stare bene',
    'non sono sicura di stare bene',
    'devo allontanarmi o faccio qualcosa',
    'se non esco faccio qualcosa',
  ],
};

/**
 * Cluster F — Disperazione profonda
 * Score: 3 per match → CRISIS immediato
 */
const CLUSTER_F: SafetyPattern = {
  cluster: 'F',
  phrases: [
    'non voglio piu essere genitore',
    'voglio sparire',
    'vorrei non esistere',
    'non vedo via d uscita',
    'non vedo uscita',
    'non ce la faro mai',
    'meglio che non ci fossi',
    'sarebbe meglio senza di me',
    'non ha senso andare avanti',
    'non ha senso niente',
    'voglio smettere di esistere',
    'pensieri di farmi del male',
    'sto pensando di farmi del male',
    'mi voglio fare del male',
    'non voglio piu vivere',
    'non voglio vivere piu',
    'pensieri negativi su me stesso',
    'pensieri negativi su me stessa',
    'lascio tutto',
    'scappo via da tutto',
  ],
};

export const ALL_PATTERNS: SafetyPattern[] = [
  CLUSTER_A,
  CLUSTER_B,
  CLUSTER_C,
  CLUSTER_D,
  CLUSTER_E,
  CLUSTER_F,
];
