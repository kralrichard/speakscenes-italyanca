import { createDialogue } from '../dialogueSchema.js?v=6';

export const TRAIN_STATION_DIALOGUES = [
  createDialogue({
    id: 'stazione-biglietto-a2-01',
    locationId: 'train-station',
    scenarioId: 'buying-ticket',
    title: 'Comprare un biglietto',
    level: 'A2',
    variant: 1,
    length: 'short',
    goal: 'Tren bileti al ve peronu öğren.',
    tags: ['travel'],
    sceneType: 'transit',
    characters: {
      A: { name: 'Bigliettaio', role: 'Gişe görevlisi', gender: 'male', accent: 'american', avatarPreset: 'clerk_m' },
      B: { name: 'Viaggiatore', role: 'Yolcu', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Buongiorno, dove deve andare?', translation_tr: 'Günaydın, nereye gideceksiniz?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Un biglietto per Firenze, per favore.',
        altAccepted: ['Vorrei un biglietto per Firenze.', 'Un biglietto per Firenze, grazie.'],
        translation_tr: 'Floransa\'ya bir bilet, lütfen.',
        register: 'formal', ipa: '/un bi.ʎetˈtːo per fiˈrɛn.tse/',
        grammar: [
          { word: 'biglietto', role: 'isim (eril)', note: '"gli" yumuşak "ly" sesi verir: bi-LYET-to.' },
          { word: 'per Firenze', role: 'yön', note: 'Varış noktası için "per".' }
        ],
        keyExpressions: [{ phrase: 'un biglietto per...', meaning: '...ya bir bilet' }],
        exampleSentences: ['Due biglietti per Roma.', 'Un biglietto di andata e ritorno.'],
        pronunciationTips: ['"Firenze" sonu "-tse": fi-REN-tse.']
      },
      { speaker: 'A', text: 'Solo andata o andata e ritorno?', translation_tr: 'Sadece gidiş mi, gidiş-dönüş mü?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Andata e ritorno, per favore.',
        altAccepted: ['Solo andata, per favore.', 'Andata e ritorno, grazie.'],
        translation_tr: 'Gidiş-dönüş, lütfen.',
        register: 'formal', ipa: '/anˈda.ta e riˈtor.no/',
        grammar: [
          { word: 'andata e ritorno', role: 'kalıp', note: 'Gidiş-dönüş. Sadece gidiş: "solo andata".' }
        ],
        keyExpressions: [{ phrase: 'andata e ritorno', meaning: 'gidiş-dönüş bileti' }],
        exampleSentences: ['Solo andata, grazie.', 'Andata e ritorno per Milano.'],
        pronunciationTips: ['Tek akışta söyle: an-DA-ta e ri-TOR-no.']
      },
      { speaker: 'A', text: 'Sono trentadue euro. Parte dal binario cinque.', translation_tr: 'Otuz iki euro. Beşinci perondan kalkıyor.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'A che ora parte il treno?',
        altAccepted: ['Quando parte il treno?', 'A che ora parte?'],
        translation_tr: 'Tren saat kaçta kalkıyor?',
        register: 'formal', ipa: '/a ke ˈo.ra ˈpar.te il ˈtrɛ.no/',
        grammar: [
          { word: 'A che ora', role: 'saat sorusu', note: 'Kalkış/varış saatini sormanın standart yolu.' },
          { word: 'parte', role: 'fiil (3. tekil)', note: '"partire" = hareket etmek/kalkmak.' }
        ],
        keyExpressions: [{ phrase: 'A che ora parte?', meaning: 'Saat kaçta kalkıyor?' }],
        exampleSentences: ['A che ora arriva?', 'Il treno parte alle otto.'],
        pronunciationTips: ['"treno" içindeki "tr" birleşik ve net: TRE-no.']
      },
      { speaker: 'A', text: 'Alle nove e dieci. Buon viaggio!', translation_tr: 'Dokuzu on geçe. İyi yolculuklar!', emotion: 'happy', register: 'formal' }
    ]
  })
];
