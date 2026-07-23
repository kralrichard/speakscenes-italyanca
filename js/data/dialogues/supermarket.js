import { createDialogue } from '../dialogueSchema.js?v=6';

export const SUPERMARKET_DIALOGUES = [
  createDialogue({
    id: 'supermercato-spesa-a1-01',
    locationId: 'supermarket',
    scenarioId: 'grocery-shopping',
    title: 'Fare la spesa',
    level: 'A1',
    variant: 1,
    length: 'short',
    goal: 'Aradığın ürünü sor ve kasada öde.',
    tags: ['shopping'],
    sceneType: 'retail',
    characters: {
      A: { name: 'Commessa', role: 'Görevli', gender: 'female', accent: 'american', avatarPreset: 'clerk_f' },
      B: { name: 'Cliente', role: 'Müşteri', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Buongiorno! Cerca qualcosa?', translation_tr: 'Günaydın! Bir şey mi arıyorsunuz?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Sì, dove sono le uova?',
        altAccepted: ['Sì, dov\'è il reparto delle uova?', 'Sì, cerco le uova.'],
        translation_tr: 'Evet, yumurtalar nerede?',
        register: 'formal', ipa: '/si ˈdo.ve ˈso.no le ˈwɔ.va/',
        grammar: [
          { word: 'dove sono', role: 'çoğul yer sorusu', note: 'Tekil için "dov\'è", çoğul için "dove sono".' },
          { word: 'le uova', role: 'düzensiz çoğul', note: '"uovo" (eril, tekil) → "uova" (DİŞİL, çoğul). İstisna bir kelime.' }
        ],
        keyExpressions: [{ phrase: 'Dove sono...?', meaning: '... neredeler? — çoğul için yer sorusu' }],
        exampleSentences: ['Dove sono i carrelli?', 'Dove sono le casse?'],
        pronunciationTips: ['"uova" iki hece: WO-va.']
      },
      { speaker: 'A', text: 'In fondo a destra, vicino al latte.', translation_tr: 'En dipte sağda, sütün yanında.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Grazie. Accettate la carta?',
        altAccepted: ['Grazie. Posso pagare con la carta?', 'Grazie. Si può pagare con la carta?'],
        translation_tr: 'Teşekkürler. Kart kabul ediyor musunuz?',
        register: 'formal', ipa: '/ˈɡrat.tsje at.tʃetˈta.te la ˈkar.ta/',
        grammar: [
          { word: 'Accettate', role: 'fiil (siz, çoğul)', note: 'Mağazaya hitap ederken çoğul "voi" kullanılır.' },
          { word: 'la carta', role: 'isim (dişil)', note: 'Banka/kredi kartı. Nakit: "i contanti".' }
        ],
        keyExpressions: [{ phrase: 'Accettate la carta?', meaning: 'Kart geçiyor mu?' }],
        exampleSentences: ['Accettate contanti?', 'Posso pagare con la carta?'],
        pronunciationTips: ['"Accettate" çift "cc" ve "tt" ile: at-chet-TA-te.']
      },
      { speaker: 'A', text: 'Sì, certo. Cassa numero tre, prego.', translation_tr: 'Evet, tabii. Üç numaralı kasa, buyurun.', emotion: 'happy', register: 'formal' }
    ]
  })
];
