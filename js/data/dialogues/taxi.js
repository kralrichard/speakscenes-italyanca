import { createDialogue } from '../dialogueSchema.js?v=6';

export const TAXI_DIALOGUES = [
  createDialogue({
    id: 'taxi-corsa-a1-01',
    locationId: 'taxi',
    scenarioId: 'taking-taxi',
    title: 'In taxi',
    level: 'A1',
    variant: 1,
    length: 'short',
    goal: 'Gideceğin yeri söyle ve ücreti öde.',
    tags: ['transport'],
    sceneType: 'taxi',
    characters: {
      A: { name: 'Tassista', role: 'Taksici', gender: 'male', accent: 'american', avatarPreset: 'driver_m' },
      B: { name: 'Passeggero', role: 'Yolcu', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Buonasera, dove andiamo?', translation_tr: 'İyi akşamlar, nereye gidiyoruz?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Alla stazione centrale, per favore.',
        altAccepted: ['Alla stazione, per favore.', 'Vorrei andare alla stazione centrale.'],
        translation_tr: 'Merkez istasyona, lütfen.',
        register: 'formal', ipa: '/ˈal.la stat.ˈtsjo.ne tʃen.ˈtra.le per faˈvo.re/',
        grammar: [
          { word: 'Alla', role: '"a + la" kaynaşması', note: 'Edat ve dişil artikel birleşir: a + la = alla.' },
          { word: 'centrale', role: 'sıfat', note: 'İtalyancada sıfat isimden SONRA gelir: "stazione centrale".' }
        ],
        keyExpressions: [{ phrase: 'Alla stazione, per favore', meaning: 'İstasyona lütfen — taksi hedefi' }],
        exampleSentences: ['All\'aeroporto, per favore.', 'Al centro, per favore.'],
        pronunciationTips: ['"Alla" çift "ll" ile uzun: AL-la.']
      },
      { speaker: 'A', text: 'Va bene. Sono circa quindici minuti.', translation_tr: 'Tamam. Yaklaşık on beş dakika.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Quanto costa la corsa?',
        altAccepted: ['Quanto viene la corsa?', 'Quanto costa più o meno?'],
        translation_tr: 'Yolculuk ne kadar tutar?',
        register: 'formal', ipa: '/ˈkwan.to ˈkɔs.ta la ˈkor.sa/',
        grammar: [
          { word: 'la corsa', role: 'isim (dişil)', note: 'Taksi yolculuğu/sefer anlamında.' }
        ],
        keyExpressions: [{ phrase: 'Quanto costa la corsa?', meaning: 'Yolculuk kaç para?' }],
        exampleSentences: ['Quanto costa il biglietto?', 'Quanto le devo?'],
        pronunciationTips: ['"corsa" içindeki "r" hafif titretilir.']
      },
      { speaker: 'A', text: 'Circa venti euro, dipende dal traffico.', translation_tr: 'Yaklaşık yirmi euro, trafiğe bağlı.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Va bene, grazie. Può fermarsi qui?',
        altAccepted: ['Va bene. Può fermarsi qui, per favore?', 'D\'accordo. Si può fermare qui?'],
        translation_tr: 'Tamam, teşekkürler. Burada durabilir misiniz?',
        register: 'formal', ipa: '/pwɔ ferˈmar.si kwi/',
        grammar: [
          { word: 'Può fermarsi', role: 'potere + dönüşlü mastar', note: 'Dönüşlü zamir mastarın sonuna yapışır: "fermarsi".' }
        ],
        keyExpressions: [{ phrase: 'Può fermarsi qui?', meaning: 'Burada durabilir misiniz?' }],
        exampleSentences: ['Può fermarsi all\'angolo?', 'Può aspettare un minuto?'],
        pronunciationTips: ['"fermarsi" içindeki "r"ler net: fer-MAR-si.']
      }
    ]
  })
];
