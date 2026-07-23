import { createDialogue } from '../dialogueSchema.js?v=6';

export const NEW_PERSON_DIALOGUES = [
  createDialogue({
    id: 'conoscere-qualcuno-a1-01',
    locationId: 'new-person',
    scenarioId: 'meeting-someone',
    title: 'Conoscere qualcuno',
    level: 'A1',
    variant: 1,
    length: 'short',
    goal: 'Kendini tanıt ve karşındakini tanı.',
    tags: ['greetings'],
    sceneType: 'party',
    characters: {
      A: { name: 'Sofia', role: 'Yeni tanışılan kişi', gender: 'female', accent: 'american', avatarPreset: 'guest_f' },
      B: { name: 'Tu', role: 'Sen', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Ciao! Io sono Sofia. E tu?', translation_tr: 'Merhaba! Ben Sofia. Ya sen?', emotion: 'happy', register: 'informal' },
      {
        speaker: 'B', expected: 'Ciao, mi chiamo Deniz. Piacere!',
        altAccepted: ['Ciao, io sono Deniz. Piacere!', 'Piacere, mi chiamo Deniz.'],
        translation_tr: 'Merhaba, benim adım Deniz. Memnun oldum!',
        register: 'informal', ipa: '/ˈtʃa.o mi ˈkja.mo deˈniz pjaˈtʃe.re/',
        grammar: [
          { word: 'mi chiamo', role: 'dönüşlü fiil', note: 'Kelimesi kelimesine "kendime ... derim" = "adım ...".' },
          { word: 'Piacere', role: 'kalıp', note: 'Tanışırken "memnun oldum". Tek başına yeterlidir.' }
        ],
        keyExpressions: [{ phrase: 'Mi chiamo...', meaning: 'Benim adım... — kendini tanıtma' }],
        exampleSentences: ['Mi chiamo Luca.', 'Come ti chiami?'],
        pronunciationTips: ['"chiamo" içindeki "chi" = "ki" sesi: KYA-mo.']
      },
      { speaker: 'A', text: 'Piacere mio! Di dove sei?', translation_tr: 'Ben de memnun oldum! Nerelisin?', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'Sono turco, vengo da Istanbul.',
        altAccepted: ['Sono turca, vengo da Istanbul.', 'Vengo dalla Turchia, da Istanbul.'],
        translation_tr: 'Türk\'üm, İstanbul\'dan geliyorum.',
        register: 'informal', ipa: '/ˈso.no ˈtur.ko ˈvɛŋ.ɡo da ˈi.stan.bul/',
        grammar: [
          { word: 'Sono turco', role: 'milliyet', note: 'Kadınsan "turca". Milliyetler küçük harfle yazılır.' },
          { word: 'vengo da', role: 'fiil + edat', note: 'Şehir için "da", ülke için "dalla/dal" kullanılır.' }
        ],
        keyExpressions: [{ phrase: 'Vengo da...', meaning: '...dan geliyorum / ...lıyım' }],
        exampleSentences: ['Vengo da Roma.', 'Vengo dalla Germania.'],
        pronunciationTips: ['"vengo" içindeki "g" sert: VEN-go.']
      },
      { speaker: 'A', text: 'Che bello! E parli molto bene italiano.', translation_tr: 'Ne güzel! Hem İtalyancan çok iyi.', emotion: 'happy', register: 'informal' },
      {
        speaker: 'B', expected: 'Grazie, sto ancora imparando.',
        altAccepted: ['Grazie, sto imparando ancora.', 'Grazie, sto studiando ancora.'],
        translation_tr: 'Teşekkürler, hâlâ öğreniyorum.',
        register: 'informal', ipa: '/ˈɡrat.tsje sto anˈko.ra im.paˈran.do/',
        grammar: [
          { word: 'sto imparando', role: 'şimdiki zaman (sürerlik)', note: '"stare + gerundio" = tam şu an sürüyor.' },
          { word: 'ancora', role: 'zarf', note: '"hâlâ" veya "henüz" anlamında.' }
        ],
        keyExpressions: [{ phrase: 'Sto ancora imparando', meaning: 'Hâlâ öğreniyorum — mütevazı cevap' }],
        exampleSentences: ['Sto imparando l\'italiano.', 'Sto lavorando adesso.'],
        pronunciationTips: ['"imparando" akıcı ve eşit hecelerle: im-pa-RAN-do.']
      }
    ]
  })
];
