import { createDialogue } from '../dialogueSchema.js?v=5';

export const CLOTHING_STORE_DIALOGUES = [
  createDialogue({
    id: 'negozio-provare-a2-01',
    locationId: 'clothing-store',
    scenarioId: 'trying-clothes',
    title: 'In un negozio di vestiti',
    level: 'A2',
    variant: 1,
    length: 'short',
    goal: 'Beden sor, dene ve karar ver.',
    tags: ['shopping'],
    sceneType: 'retail',
    characters: {
      A: { name: 'Commessa', role: 'Satış görevlisi', gender: 'female', accent: 'american', avatarPreset: 'clerk_f' },
      B: { name: 'Cliente', role: 'Müşteri', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Posso aiutarla?', translation_tr: 'Yardımcı olabilir miyim?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Posso provare questa camicia?',
        altAccepted: ['Vorrei provare questa camicia.', 'Posso provarla?'],
        translation_tr: 'Bu gömleği deneyebilir miyim?',
        register: 'formal', ipa: '/ˈpɔs.so proˈva.re ˈkwe.sta kaˈmi.tʃa/',
        grammar: [
          { word: 'Posso provare', role: 'potere + mastar', note: 'İzin isteme kalıbı: "-ebilir miyim".' },
          { word: 'questa', role: 'işaret sıfatı (dişil)', note: '"camicia" dişil olduğu için "questo" değil "questa".' }
        ],
        keyExpressions: [{ phrase: 'Posso provare...?', meaning: '... deneyebilir miyim?' }],
        exampleSentences: ['Posso provare queste scarpe?', 'Dove sono i camerini?'],
        pronunciationTips: ['"camicia" sonu "-cha": ka-MI-cha.']
      },
      { speaker: 'A', text: 'Certo. Che taglia porta?', translation_tr: 'Tabii. Hangi bedeni giyiyorsunuz?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Porto la media.',
        altAccepted: ['La media.', 'Porto una media.'],
        translation_tr: 'Orta beden giyiyorum.',
        register: 'formal', ipa: '/ˈpɔr.to la ˈmɛ.dja/',
        grammar: [
          { word: 'Porto', role: 'fiil (ben)', note: 'Beden için "portare" kullanılır: "giymek/beden olmak".' },
          { word: 'la media', role: 'isim (dişil)', note: 'Beden: piccola / media / grande.' }
        ],
        keyExpressions: [{ phrase: 'Che taglia porta?', meaning: 'Hangi bedeni giyiyorsunuz?' }],
        exampleSentences: ['Porto la piccola.', 'Avete una taglia più grande?'],
        pronunciationTips: ['"media" iki hece gibi akar: ME-dya.']
      },
      { speaker: 'A', text: 'Ecco. Il camerino è là in fondo.', translation_tr: 'Buyurun. Kabin en dipte.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Mi sta un po\' stretta. Avete una taglia più grande?',
        altAccepted: ['È un po\' stretta. Avete una taglia più grande?', 'Mi sta stretta. Avete la taglia più grande?'],
        translation_tr: 'Biraz dar geldi. Daha büyük bedeniniz var mı?',
        register: 'formal', ipa: '/mi sta un pɔ ˈstret.ta/',
        grammar: [
          { word: 'Mi sta', role: 'stare + zamir', note: '"Bana ... oturuyor/geliyor" — kıyafet için kullanılır.' },
          { word: "un po'", role: 'zarf', note: '"poco" kısalması: "biraz". Kesme işareti şart.' },
          { word: 'più grande', role: 'karşılaştırma', note: '"più + sıfat" = "daha ...".' }
        ],
        keyExpressions: [{ phrase: 'Mi sta stretta/larga', meaning: 'Bana dar/bol geldi' }],
        exampleSentences: ['Mi sta benissimo!', 'Mi sta un po\' larga.'],
        pronunciationTips: ['"stretta" çift "tt" ile: STRET-ta.']
      },
      { speaker: 'A', text: 'Sì, gliela porto subito.', translation_tr: 'Evet, hemen getiriyorum.', emotion: 'happy', register: 'formal' }
    ]
  })
];
