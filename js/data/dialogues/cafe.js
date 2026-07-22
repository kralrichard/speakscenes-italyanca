import { createDialogue } from '../dialogueSchema.js?v=5';

export const CAFE_DIALOGUES = [
  createDialogue({
    id: 'cafe-ordering-coffee-a1-01',
    locationId: 'cafe',
    scenarioId: 'ordering-coffee',
    title: 'Ordering a Coffee',
    level: 'A1',
    variant: 1,
    length: 'short',
    goal: 'Order a drink and pay for it.',
    tags: ['ordering'],
    sceneType: 'cafe',
    characters: {
      A: { name: 'Marco', role: 'Barista', gender: 'male', accent: 'american', avatarPreset: 'barista_m' },
      B: { name: 'Customer', role: 'Café Customer', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Hi there! What can I get for you?', translation_tr: 'Merhaba! Sizin için ne alabilirim?', emotion: 'happy', register: 'informal' },
      {
        speaker: 'B', expected: 'Can I have a medium latte, please?',
        altAccepted: ['I’d like a medium latte, please.', 'Can I get a medium latte, please?'],
        translation_tr: 'Orta boy bir latte alabilir miyim, lütfen?',
        register: 'informal', ipa: '/kæn aɪ hæv ə ˈmiːdiəm ˈlɑːteɪ pliːz/',
        grammar: [
          { word: 'Can I have', role: 'polite request form', note: 'A simple, common way to ask for something in a shop.' },
          { word: 'a', role: 'indefinite article', note: 'Used before "medium latte" because it is one, non-specific item.' },
          { word: 'medium', role: 'adjective', note: 'Describes the size of the drink.' },
          { word: 'please', role: 'politeness marker', note: 'Makes the request sound polite.' }
        ],
        keyExpressions: [{ phrase: 'Can I have...', meaning: 'a simple, polite way to order or ask for something' }],
        exampleSentences: ['Can I have the bill, please?', 'Can I have a glass of water?'],
        pronunciationTips: ['Say "latte" as LAH-tay, with stress on the first part.']
      },
      { speaker: 'A', text: 'Sure! For here or to go?', translation_tr: 'Tabii! Burada mı yoksa yanınıza mı?', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'To go, please.',
        altAccepted: ['To go, thanks.', 'For here, please.'],
        translation_tr: 'Yanıma alacağım, lütfen.',
        register: 'informal', ipa: '/tuː goʊ pliːz/',
        grammar: [
          { word: 'To go', role: 'fixed expression', note: 'Means "to take away," not to drink in the café.' }
        ],
        keyExpressions: [{ phrase: 'to go', meaning: 'take-away, not eaten/drunk on the premises' }],
        exampleSentences: ['I’ll have a coffee to go, please.'],
        pronunciationTips: ['Keep it short and clear — two even beats: "to" and "go."']
      },
      { speaker: 'A', text: 'Great, that’s four dollars fifty.', translation_tr: 'Harika, bu dört dolar elli sent.', emotion: 'neutral', register: 'informal' },
      {
        speaker: 'B', expected: 'Here you go.',
        altAccepted: ['Here you are.', 'Here’s five dollars.'],
        translation_tr: 'Buyurun.',
        register: 'informal', ipa: '/hɪər juː goʊ/',
        grammar: [
          { word: 'Here you go', role: 'fixed expression', note: 'Used when handing something (like money) to someone.' }
        ],
        keyExpressions: [{ phrase: 'here you go', meaning: 'said when giving something to someone, informal' }],
        exampleSentences: ['Here you go, one latte to go.'],
        pronunciationTips: ['Say it in one smooth breath, no pauses between the words.']
      }
    ]
  })
];
