export interface Strategy {
  id: string;
  title: string;
  shortDescription: string;
  steps: string[];
  durationMinutes: number;
  tags: string[];
}

export const STRATEGIES: Strategy[] = [
  {
    id: 'pause-5',
    title: 'Pausa di 5 minuti',
    shortDescription: 'Mettiti in un posto sicuro per qualche minuto.',
    steps: [
      'Metti il bambino in un luogo sicuro (lettino, tappeto, box).',
      'Esci dalla stanza o allontanati di qualche passo.',
      'Respira lentamente per 5 minuti.',
      'Torna solo quando ti senti pronto.',
    ],
    durationMinutes: 5,
    tags: ['crisi', 'rabbia', 'esaurimento', 'intensita-alta'],
  },
  {
    id: 'respiro-4-7-8',
    title: 'Respiro 4-7-8',
    shortDescription: 'Una tecnica di respirazione per abbassare lo stress in 2 minuti.',
    steps: [
      'Inspira dal naso contando fino a 4.',
      'Trattieni il respiro contando fino a 7.',
      'Espira dalla bocca contando fino a 8.',
      'Ripeti 3-4 volte.',
    ],
    durationMinutes: 2,
    tags: ['ansia', 'rabbia', 'tensione', 'intensita-media'],
  },
  {
    id: 'grounding-5-4-3-2-1',
    title: 'Grounding 5-4-3-2-1',
    shortDescription: 'Riporta la mente al presente usando i 5 sensi.',
    steps: [
      '5 cose che vedi intorno a te.',
      '4 cose che puoi toccare.',
      '3 cose che senti.',
      '2 cose che puoi annusare.',
      '1 cosa che puoi gustare.',
    ],
    durationMinutes: 3,
    tags: ['ansia', 'sopraffazione', 'dissociazione', 'intensita-media'],
  },
  {
    id: 'validazione-emozioni',
    title: 'Valida le emozioni del bambino',
    shortDescription: 'Nomina quello che sente prima di correggere il comportamento.',
    steps: [
      'Abbassati al livello degli occhi del bambino.',
      'Nomina l\'emozione: "Stai piangendo, sei arrabbiato".',
      'Mostra comprensione: "Capisco, è difficile".',
      'Aspetta che si calmi prima di parlare del comportamento.',
    ],
    durationMinutes: 5,
    tags: ['pianto', 'capriccio', 'rabbia-bambino', 'intensita-bassa', 'intensita-media'],
  },
  {
    id: 'distrazione-attiva',
    title: 'Distrazione attiva',
    shortDescription: 'Sposta l\'attenzione del bambino con qualcosa di nuovo.',
    steps: [
      'Introduci un oggetto nuovo o insolito.',
      'Cambia stanza o ambiente.',
      'Proponi un\'attività fisica semplice (saltare, correre).',
      'Usa una voce allegra e un po\' esagerata.',
    ],
    durationMinutes: 3,
    tags: ['capriccio', 'noia', 'pianto', 'intensita-bassa', 'eta-piccola'],
  },
  {
    id: 'routine-calma',
    title: 'Routine di calma',
    shortDescription: 'Una sequenza prevedibile che segnala al bambino: è ora di calmarsi.',
    steps: [
      'Abbassa le luci se possibile.',
      'Abbassa la voce e rallenta i movimenti.',
      'Proponi una coperta o un oggetto confortante.',
      'Metti musica calma o silenzio.',
      'Siediti vicino senza parlare per qualche minuto.',
    ],
    durationMinutes: 10,
    tags: ['sera', 'sonno', 'agitazione', 'intensita-bassa', 'intensita-media'],
  },
  {
    id: 'scelta-controllata',
    title: 'Offrire una scelta',
    shortDescription: 'Dai al bambino il senso di controllo con due opzioni accettabili.',
    steps: [
      'Pensa a due opzioni entrambe ok per te.',
      'Presenta: "Vuoi fare X o Y?"',
      'Aspetta la risposta senza insistere.',
      'Qualunque scelga, accettala.',
    ],
    durationMinutes: 2,
    tags: ['opposizione', 'ribellione', 'autonomia', 'intensita-media', 'eta-grande'],
  },
  {
    id: 'corpo-movimento',
    title: 'Muovi il corpo',
    shortDescription: 'Scarica la tensione fisica prima di affrontare la situazione.',
    steps: [
      'Fai 10 salti sul posto.',
      'Stringi forte i pugni e poi apri le mani, 5 volte.',
      'Scrolla le spalle e il collo.',
      'Fai 3 respiri profondi.',
    ],
    durationMinutes: 2,
    tags: ['rabbia', 'tensione', 'esaurimento', 'intensita-alta'],
  },
  {
    id: 'scrittura-rapida',
    title: 'Scrivi 3 parole',
    shortDescription: 'Esternalizza l\'emozione scrivendola rapidamente.',
    steps: [
      'Prendi il telefono o un foglio.',
      'Scrivi 3 parole che descrivono come ti senti ADESSO.',
      'Leggilele ad alta voce (anche solo in testa).',
      'Ora puoi tornare dal bambino.',
    ],
    durationMinutes: 1,
    tags: ['esaurimento', 'confusione', 'sopraffazione', 'intensita-media'],
  },
  {
    id: 'chiamata-supporto',
    title: 'Chiama qualcuno',
    shortDescription: 'Non devi farcela da solo. Chiama un adulto di fiducia.',
    steps: [
      'Pensa a chi puoi chiamare: partner, genitore, amico.',
      'Chiamalo adesso — anche solo per sentire una voce.',
      'Dì: "Ho bisogno di supporto, puoi restare in linea?"',
      'Non devi spiegare tutto — basta non essere solo.',
    ],
    durationMinutes: 5,
    tags: ['crisi', 'solitudine', 'esaurimento', 'intensita-alta'],
  },
  {
    id: 'timer-silenzio',
    title: 'Timer del silenzio',
    shortDescription: 'Usa un timer visivo per dare struttura a un momento difficile.',
    steps: [
      'Imposta un timer visibile a 5 minuti.',
      'Di\' al bambino: "Aspettiamo insieme che finisce".',
      'Non parlare, non intervenire, stai presente.',
      'Quando suona, ricomincia con calma.',
    ],
    durationMinutes: 5,
    tags: ['pianto', 'agitazione', 'capriccio', 'intensita-media', 'eta-piccola'],
  },
  {
    id: 'abbassare-aspettative',
    title: 'Abbassa le aspettative ora',
    shortDescription: 'Questo momento non deve essere perfetto. Sopravvivere è abbastanza.',
    steps: [
      'Dì a te stesso: "Non devo essere un genitore perfetto adesso".',
      'Chiediti: "Qual è la cosa minima che devo fare nei prossimi 10 minuti?"',
      'Fai solo quella cosa.',
      'Il resto può aspettare.',
    ],
    durationMinutes: 1,
    tags: ['esaurimento', 'perfezionismo', 'sopraffazione', 'intensita-alta'],
  },
];

export function getStrategyById(id: string): Strategy | undefined {
  return STRATEGIES.find((s) => s.id === id);
}
