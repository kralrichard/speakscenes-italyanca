import { createDialogue } from '../dialogueSchema.js?v=5';

export const BANK_DIALOGUES = [
  createDialogue({
    id: 'banca-cambio-b1-01',
    locationId: 'bank',
    scenarioId: 'currency-exchange',
    title: 'In banca',
    level: 'B1',
    variant: 1,
    length: 'short',
    goal: 'Para bozdur ve komisyonu sor.',
    tags: ['money'],
    sceneType: 'bank-office',
    characters: {
      A: { name: 'Impiegato', role: 'Banka görevlisi', gender: 'male', accent: 'american', avatarPreset: 'clerk_m' },
      B: { name: 'Cliente', role: 'Müşteri', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Buongiorno, come posso aiutarla?', translation_tr: 'Günaydın, nasıl yardımcı olabilirim?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Vorrei cambiare dei dollari in euro.',
        altAccepted: ['Vorrei cambiare dollari in euro.', 'Devo cambiare dei dollari in euro.'],
        translation_tr: 'Biraz doları euroya çevirmek istiyorum.',
        register: 'formal', ipa: '/vorˈrɛi kamˈbja.re dei ˈdɔl.la.ri in ˈɛu.ro/',
        grammar: [
          { word: 'Vorrei', role: 'kibar istek', note: 'Resmî ortamda "voglio" yerine her zaman "vorrei".' },
          { word: 'dei', role: 'kısmi artikel', note: '"biraz/bir miktar" anlamı katar: di + i = dei.' },
          { word: 'in euro', role: 'dönüşüm', note: 'Para çevirisinde hedef için "in" kullanılır.' }
        ],
        keyExpressions: [{ phrase: 'cambiare X in Y', meaning: 'X\'i Y\'ye çevirmek/bozdurmak' }],
        exampleSentences: ['Vorrei cambiare cento euro.', 'Dove posso cambiare i soldi?'],
        pronunciationTips: ['"cambiare" içindeki "bi" akıcı: kam-BYA-re.']
      },
      { speaker: 'A', text: 'Certo. Quanto vuole cambiare?', translation_tr: 'Tabii. Ne kadar bozdurmak istiyorsunuz?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Duecento dollari. Qual è il cambio oggi?',
        altAccepted: ['Duecento dollari. Quanto è il cambio oggi?', 'Duecento. Qual è il cambio oggi?'],
        translation_tr: 'İki yüz dolar. Bugünkü kur ne?',
        register: 'formal', ipa: '/du.eˈtʃen.to ˈdɔl.la.ri kwal ɛ il ˈkam.bjo/',
        grammar: [
          { word: 'Duecento', role: 'sayı', note: 'İtalyancada birleşik yazılır: due + cento.' },
          { word: "Qual è", role: 'soru kalıbı', note: 'Kesme işareti YOKTUR — "qual\'è" yanlış yazımdır.' },
          { word: 'il cambio', role: 'isim (eril)', note: 'Döviz kuru.' }
        ],
        keyExpressions: [{ phrase: "Qual è il cambio?", meaning: 'Kur ne kadar?' }],
        exampleSentences: ["Qual è il suo numero?", 'Il cambio è buono oggi.'],
        pronunciationTips: ['"Duecento" içindeki "ce" = "che": du-e-CHEN-to.']
      },
      { speaker: 'A', text: 'Uno a zero novantadue. C\'è una commissione di tre euro.', translation_tr: 'Bir\'e sıfır doksan iki. Üç euro komisyon var.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Va bene. Posso avere una ricevuta?',
        altAccepted: ['D\'accordo. Posso avere una ricevuta?', 'Va bene. Mi dà una ricevuta?'],
        translation_tr: 'Tamam. Bir makbuz alabilir miyim?',
        register: 'formal', ipa: '/ˈpɔs.so aˈve.re ˈu.na ri.tʃeˈvu.ta/',
        grammar: [
          { word: 'ricevuta', role: 'isim (dişil)', note: 'Makbuz/fiş. Restoranda fiş için "scontrino" da denir.' }
        ],
        keyExpressions: [{ phrase: 'Posso avere una ricevuta?', meaning: 'Makbuz alabilir miyim?' }],
        exampleSentences: ['Posso avere lo scontrino?', 'Mi serve una ricevuta.'],
        pronunciationTips: ['"ricevuta" içindeki "ce" = "che": ri-che-VU-ta.']
      },
      { speaker: 'A', text: 'Certo, eccola. Buona giornata!', translation_tr: 'Tabii, işte buyurun. İyi günler!', emotion: 'happy', register: 'formal' }
    ]
  })
];
