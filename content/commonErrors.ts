export interface CommonError {
  id: string;
  title: string;
  myth: string;
  reality: string;
  whatToDo: string;
  tags: string[];
}

export const COMMON_ERRORS: CommonError[] = [
  {
    id: 'error-ignore-capriccio',
    title: 'Ignorare il capriccio risolve tutto',
    myth: 'Se lo ignoro smette da solo. Coccolarli durante un capriccio li vizia.',
    reality:
      'Il capriccio è spesso un segnale di bisogno insoddisfatto (stanchezza, fame, sovrastimolazione). Ignorarlo completamente può aumentare l\'intensità e la durata.',
    whatToDo:
      'Rimani presente e calmo. Nomina l\'emozione. Non cedere alla richiesta, ma non sparire nemmeno.',
    tags: ['capriccio', 'eta-piccola', 'confini'],
  },
  {
    id: 'error-urlo-funziona',
    title: 'Alzare la voce fa capire la serietà',
    myth: 'Se urlo capisce che è importante. Altrimenti non mi ascolta.',
    reality:
      'L\'urlo attiva la risposta di stress nel bambino. In quel momento non può apprendere, può solo reagire (fuga, blocco, contrattacco).',
    whatToDo:
      'Abbassa la voce invece di alzarla. Una voce bassa e ferma è molto più efficace di un urlo.',
    tags: ['rabbia', 'comunicazione', 'disciplina'],
  },
  {
    id: 'error-punizione-immediata',
    title: 'La punizione immediata insegna la lezione',
    myth: 'Se lo punisco subito capisce il collegamento causa-effetto.',
    reality:
      'La punizione nella fase acuta, quando entrambi siete agitati, non insegna niente. Insegna paura, non comprensione.',
    whatToDo:
      'Prima calmate entrambi. Poi, quando siete pronti, parlate di cosa è successo e delle conseguenze.',
    tags: ['disciplina', 'rabbia', 'confini'],
  },
  {
    id: 'error-confronto-altri-bambini',
    title: 'Confrontarlo con altri bambini lo motiva',
    myth: '"Il tuo amico Marco non fa così". Il confronto lo sprona a comportarsi meglio.',
    reality:
      'Il confronto negativo danneggia l\'autostima e crea competizione ansiosa. Il bambino non si sente motivato, si sente inadeguato.',
    whatToDo:
      'Confrontalo solo con sé stesso: "Ieri hai fatto così, oggi ce l\'hai fatta meglio".',
    tags: ['comunicazione', 'autostima', 'scuola'],
  },
  {
    id: 'error-cedere-per-pace',
    title: 'Cedere per evitare la lite è la soluzione più rapida',
    myth: 'Se cedo una volta sola, si calma e andiamo avanti. È solo per oggi.',
    reality:
      'Cedere sotto pressione insegna al bambino che la pressione funziona. La prossima volta sarà ancora più intensa.',
    whatToDo:
      'Decidi prima, non durante. Se puoi cedere senza rimpianti, fallo. Se no, tieni il punto con calma.',
    tags: ['confini', 'capriccio', 'disciplina'],
  },
  {
    id: 'error-senso-colpa-espresso',
    title: 'Dire "mi fai sentire una brutta persona" aiuta il bambino a capire',
    myth: 'Se gli spiego quanto sono ferito, si sentirà responsabile e cambierà.',
    reality:
      'I bambini non hanno ancora gli strumenti per gestire la colpa parentale. Si sentono sopraffatti e ansiosi, non motivati a migliorare.',
    whatToDo:
      'Esprimi come ti senti senza caricarlo di responsabilità. "Quando succede X, io mi sento Y".',
    tags: ['comunicazione', 'senso-di-colpa', 'rabbia'],
  },
  {
    id: 'error-dormire-nel-letto',
    title: 'Farlo dormire nel lettone risolve i problemi di sonno per sempre',
    myth: 'Una volta nel lettone dorme e risolviamo domani. Funziona e basta.',
    reality:
      'Non è un errore in sé, ma può diventare difficile da modificare. La coerenza nel tempo conta più della scelta in sé.',
    whatToDo:
      'Scegli consciamente. Se funziona per la tua famiglia e lo accetti, non è un problema. Se lo fai solo per disperazione, considera una transizione graduale.',
    tags: ['sonno', 'routine', 'notte'],
  },
  {
    id: 'error-ragionare-in-crisi',
    title: 'Durante la crisi si può ragionare con il bambino',
    myth: 'Se gli spiego perché ha torto adesso, capirà e si calmerà.',
    reality:
      'Durante la crisi emotiva, la corteccia prefrontale (ragionamento) è offline. Il bambino non può elaborare spiegazioni in quel momento.',
    whatToDo:
      'Prima calma, poi parla. Aspetta che la tempesta passi. Le spiegazioni funzionano solo in stato di calma.',
    tags: ['capriccio', 'rabbia', 'comunicazione'],
  },
  {
    id: 'error-mai-scuse',
    title: 'Chiedere scusa al figlio mina l\'autorità',
    myth: 'Se mi scuso penserà di potermi fare quello che vuole. Devo mantenere il ruolo.',
    reality:
      'Le scuse sincere modellano l\'accountability e il rispetto reciproco. Aumentano la fiducia e la connessione.',
    whatToDo:
      'Chiedi scusa quando hai esagerato. "Mi dispiace di aver urlato. Non va bene. Possiamo riprovare?"',
    tags: ['comunicazione', 'rabbia', 'relazione'],
  },
  {
    id: 'error-stanchezza-normale',
    title: 'La stanchezza cronica è normale, tutti i genitori la vivono',
    myth: 'Essere sempre esausto è parte del gioco. Devo resistere e basta.',
    reality:
      'La stanchezza cronica riduce la soglia di tolleranza e aumenta la reattività. Non è un valore, è un rischio.',
    whatToDo:
      'Identifica UNA cosa che puoi fare oggi per recuperare energia. Anche 20 minuti contano. Chiedere aiuto non è debolezza.',
    tags: ['esaurimento', 'cura-di-sé', 'benessere'],
  },
  {
    id: 'error-forza-cibo',
    title: 'Forzarlo a mangiare è meglio che lasciarlo saltare il pasto',
    myth: 'Se non mangia starà male. Devo assicurarmi che mangi tutto.',
    reality:
      'Forzare il cibo crea associazioni negative con il pasto e aumenta la selettività alimentare nel lungo periodo.',
    whatToDo:
      'Tua responsabilità: cosa, quando e dove. Sua responsabilità: se e quanto. Proponi senza insistere.',
    tags: ['cibo', 'controllo', 'autonomia'],
  },
  {
    id: 'error-schermo-sempre-male',
    title: 'Qualsiasi uso dello schermo è dannoso',
    myth: 'I bambini non devono mai stare davanti agli schermi. È sempre sbagliato.',
    reality:
      'Non è lo schermo in sé il problema, ma come, quanto e con chi viene usato. In certi momenti può essere uno strumento valido.',
    whatToDo:
      'Stabilisci limiti chiari e coerenti. Scegli contenuti intenzionalmente. Non usare lo schermo come tappo emotivo cronico.',
    tags: ['schermo', 'routine', 'confini'],
  },
  {
    id: 'error-senso-colpa-genitore',
    title: 'Un buon genitore non si arrabbia mai',
    myth: 'Se mi arrabbio vuol dire che non sono bravo abbastanza. I genitori buoni rimangono sempre calmi.',
    reality:
      "La rabbia è un'emozione umana normale. Sopprimerla non la elimina — la sposta. L'obiettivo non è non arrabbiarsi mai, ma gestirla.",
    whatToDo:
      'Riconosci la rabbia prima che esploda. Usala come segnale: "Ho bisogno di una pausa". La perfezione non esiste — l\'intenzione sì.',
    tags: ['rabbia', 'senso-di-colpa', 'cura-di-sé'],
  },
  {
    id: 'error-punizione-fisica',
    title: 'Uno schiaffo ogni tanto non fa danni',
    myth: 'Ogni tanto serve. Anche a me lo davano e sono cresciuto bene.',
    reality:
      'La punizione fisica, anche lieve, insegna che il più forte ha ragione. Indebolisce la relazione e non è mai educativamente necessaria.',
    whatToDo:
      'Se senti che stai per perdere il controllo fisico: esci dalla stanza. Non c\'è nessuna urgenza che valga un gesto fisico.',
    tags: ['rabbia', 'disciplina', 'confini'],
  },
  {
    id: 'error-non-piangere',
    title: 'Dire "non piangere" aiuta il bambino a calmarsi',
    myth: '"Non piangere, non è niente". Minimizzare aiuta a non drammatizzare.',
    reality:
      'Dire "non piangere" non elimina l\'emozione — dice al bambino che le sue emozioni non sono valide. Questo crea difficoltà a regolarle.',
    whatToDo:
      'Valida prima: "Stai piangendo, ti fa male". Poi, quando è più calmo, puoi aiutarlo a contestualizzare.',
    tags: ['pianto', 'emozioni', 'comunicazione'],
  },
];
