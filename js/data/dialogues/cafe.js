import { createDialogue } from '../dialogueSchema.js?v=5';

export const CAFE_DIALOGUES = [
  createDialogue({
    id: 'cafe-ordinare-caffe-a1-01',
    locationId: 'cafe',
    scenarioId: 'ordering-coffee',
    title: 'Ordinare un caffè',
    level: 'A1',
    variant: 1,
    length: 'short',
    goal: 'Bir içecek sipariş et ve ödemesini yap.',
    tags: ['ordering'],
    sceneType: 'cafe',
    characters: {
      A: { name: 'Marco', role: 'Barista', gender: 'male', accent: 'american', avatarPreset: 'barista_m' },
      B: { name: 'Cliente', role: 'Müşteri', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Buongiorno! Cosa le porto?', translation_tr: 'Günaydın! Size ne getireyim?', emotion: 'happy', register: 'formal' },
      {
        speaker: 'B', expected: 'Un cappuccino, per favore.',
        altAccepted: ['Vorrei un cappuccino, per favore.', 'Prendo un cappuccino, per favore.'],
        translation_tr: 'Bir cappuccino, lütfen.',
        register: 'formal', ipa: '/un kap.puˈtʃiː.no per faˈvo.re/',
        grammar: [
          { word: 'Un', role: 'belirsiz artikel (eril)', note: '"cappuccino" eril olduğu için "un" kullanılır.' },
          { word: 'cappuccino', role: 'isim', note: 'İtalya\'da genelde sabah içilir; öğleden sonra "caffè" tercih edilir.' },
          { word: 'per favore', role: 'nezaket kalıbı', note: 'İsteği kibarlaştırır — "lütfen".' }
        ],
        keyExpressions: [{ phrase: 'per favore', meaning: 'lütfen — her türlü ricada kullanılır' }],
        exampleSentences: ['Un caffè, per favore.', 'Il conto, per favore.'],
        pronunciationTips: ['"cappuccino" içindeki çift "cc" ve "pp" uzun tutulur: kap-put-CHI-no.']
      },
      { speaker: 'A', text: 'Certo. Qualcos\'altro?', translation_tr: 'Tabii. Başka bir şey?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'No, grazie. Quanto costa?',
        altAccepted: ['No, grazie. Quant\'è?', 'Basta così, grazie. Quanto costa?'],
        translation_tr: 'Hayır, teşekkürler. Ne kadar?',
        register: 'formal', ipa: '/no ˈɡrat.tsje ˈkwan.to ˈkɔs.ta/',
        grammar: [
          { word: 'grazie', role: 'teşekkür', note: 'Sonu "-tsye" gibi okunur, "grazi" değil.' },
          { word: 'Quanto costa', role: 'fiyat sorusu', note: 'Tek bir şeyin fiyatını sormanın en yaygın yolu.' }
        ],
        keyExpressions: [{ phrase: 'Quanto costa?', meaning: 'Ne kadar? — fiyat sorma' }],
        exampleSentences: ['Quanto costa il biglietto?', 'Quanto costa questo?'],
        pronunciationTips: ['"Quanto" içindeki "qu" = "kw" sesi: KWAN-to.']
      },
      { speaker: 'A', text: 'Sono due euro e cinquanta.', translation_tr: 'İki euro elli sent.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Ecco a lei.',
        altAccepted: ['Ecco.', 'Ecco qui.'],
        translation_tr: 'Buyurun.',
        register: 'formal', ipa: '/ˈek.ko a lɛi/',
        grammar: [
          { word: 'Ecco', role: 'sunma ifadesi', note: 'Bir şey uzatırken kullanılır: "işte, buyurun".' },
          { word: 'a lei', role: 'resmi zamir', note: '"Lei" resmi "siz" — tanımadığın kişiye.' }
        ],
        keyExpressions: [{ phrase: 'Ecco a lei', meaning: 'Buyurun (resmi) — bir şey uzatırken' }],
        exampleSentences: ['Ecco a lei il resto.', 'Ecco il suo caffè.'],
        pronunciationTips: ['"Ecco" çift "cc" ile: EK-ko, kısa ve net.']
      },
      { speaker: 'A', text: 'Grazie a lei. Buona giornata!', translation_tr: 'Ben teşekkür ederim. İyi günler!', emotion: 'happy', register: 'formal' }
    ]
  }),

  createDialogue({
    id: 'cafe-chiacchiere-a2-01',
    locationId: 'cafe',
    scenarioId: 'barista-smalltalk',
    title: 'Due chiacchiere al bar',
    level: 'A2',
    variant: 1,
    length: 'short',
    goal: 'Barista ile kısa bir sohbet kur.',
    tags: ['smalltalk'],
    sceneType: 'cafe',
    characters: {
      A: { name: 'Giulia', role: 'Barista', gender: 'female', accent: 'american', avatarPreset: 'barista_f' },
      B: { name: 'Cliente', role: 'Müşteri', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Il solito? Un caffè macchiato?', translation_tr: 'Her zamanki mi? Bir caffè macchiato?', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'Sì, grazie. Oggi c\'è molta gente.',
        altAccepted: ['Sì, come sempre. Oggi c\'è molta gente.', 'Sì, grazie. Oggi è pieno.'],
        translation_tr: 'Evet, teşekkürler. Bugün çok kalabalık.',
        register: 'informal', ipa: '/si ˈɡrat.tsje ˈɔd.dʒi tʃɛ ˈmol.ta ˈdʒɛn.te/',
        grammar: [
          { word: "c'è", role: 'var (tekil)', note: '"ci è" kısalması — "vardır". Çoğul için "ci sono".' },
          { word: 'molta', role: 'sıfat (dişil)', note: '"gente" dişil olduğu için "molto" değil "molta".' },
          { word: 'gente', role: 'isim (tekil)', note: 'İtalyancada "insanlar" anlamına gelir ama TEKİL çekilir.' }
        ],
        keyExpressions: [{ phrase: "c'è molta gente", meaning: 'çok kalabalık / çok insan var' }],
        exampleSentences: ["C'è molta gente al mercato.", 'Ci sono molte persone qui.'],
        pronunciationTips: ['"gente" içindeki "g" yumuşak: JEN-te.']
      },
      { speaker: 'A', text: 'Sì, il venerdì è sempre così. Lavori qui vicino?', translation_tr: 'Evet, cumalar hep böyle. Buralarda mı çalışıyorsun?', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'Sì, lavoro in un ufficio qui vicino.',
        altAccepted: ['Sì, il mio ufficio è qui vicino.', 'Sì, lavoro qui vicino.'],
        translation_tr: 'Evet, buraya yakın bir ofiste çalışıyorum.',
        register: 'informal', ipa: '/si laˈvo.ro in un uˈffi.tʃo kwi viˈtʃi.no/',
        grammar: [
          { word: 'lavoro', role: 'fiil (ben)', note: '"lavorare" fiilinin 1. tekil hâli — özne zamiri gerekmez.' },
          { word: 'in un ufficio', role: 'yer belirteci', note: 'Kapalı mekân için "in" kullanılır.' },
          { word: 'qui vicino', role: 'yer ifadesi', note: '"buraya yakın, buralarda".' }
        ],
        keyExpressions: [{ phrase: 'qui vicino', meaning: 'buralarda, yakınlarda' }],
        exampleSentences: ["C'è una farmacia qui vicino?", 'Abito qui vicino.'],
        pronunciationTips: ['"ufficio" çift "ff" ile ve sonu "-cho": uf-FI-cho.']
      },
      { speaker: 'A', text: 'Ah, allora ci vediamo spesso! Ecco il tuo macchiato.', translation_tr: 'Ha, o zaman sık görüşürüz! İşte macchiaton.', emotion: 'happy', register: 'informal' }
    ]
  })
];
