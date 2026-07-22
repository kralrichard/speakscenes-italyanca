import { createDialogue } from '../dialogueSchema.js';

export const HOTEL_DIALOGUES = [
  createDialogue({
    id: 'hotel-check-in-a1-01',
    locationId: 'hotel',
    scenarioId: 'check-in',
    title: 'Checking Into a Hotel',
    level: 'A1',
    variant: 1,
    length: 'short',
    goal: 'Check into the hotel and get your room key.',
    tags: ['booking', 'travel'],
    sceneType: 'hotel-lobby',
    characters: {
      A: { name: 'Grace', role: 'Hotel Receptionist', gender: 'female', accent: 'british', avatarPreset: 'receptionist_f' },
      B: { name: 'Guest', role: 'Hotel Guest', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      {
        speaker: 'A', text: 'Good evening. Do you have a reservation?',
        translation_tr: 'İyi akşamlar. Rezervasyonunuz var mı?', emotion: 'friendly', register: 'formal'
      },
      {
        speaker: 'B', expected: 'Yes, I booked a room for three nights.',
        altAccepted: ['Yes, I have a reservation for three nights.', 'Yes, I have a booking for three nights.'],
        translation_tr: 'Evet, üç gecelik bir oda ayırttım.',
        register: 'neutral', ipa: '/jɛs aɪ bʊkt ə ruːm fɔːr θriː naɪts/',
        grammar: [
          { word: 'Yes', role: 'response word', note: 'Confirms the receptionist’s question.' },
          { word: 'I', role: 'subject', note: 'The person speaking (the guest).' },
          { word: 'booked', role: 'main verb (past simple)', note: '"Book" here means "to reserve in advance." Past tense because the action already happened.' },
          { word: 'a room', role: 'object', note: 'The thing that was booked.' },
          { word: 'for', role: 'preposition', note: 'Shows duration — "for + amount of time."' },
          { word: 'three nights', role: 'time expression', note: 'How long the stay will be.' }
        ],
        keyExpressions: [{ phrase: 'book a room', meaning: 'to reserve a room in advance' }],
        exampleSentences: ['I booked a table for two.', 'She booked a flight for next week.'],
        pronunciationTips: ['Say the "b" in "booked" clearly, then a short, crisp "t" at the end.']
      },
      {
        speaker: 'A', text: 'Perfect. Could I have your name and passport, please?',
        translation_tr: 'Harika. Adınızı ve pasaportunuzu alabilir miyim, lütfen?', emotion: 'friendly', register: 'formal'
      },
      {
        speaker: 'B', expected: 'Sure, here you are.',
        altAccepted: ['Sure, here it is.', 'Of course, here you are.'],
        translation_tr: 'Tabii, buyurun.',
        register: 'informal', ipa: '/ʃʊər hɪər juː ɑːr/',
        grammar: [
          { word: 'Sure', role: 'response word', note: 'A friendly way to say "yes, of course."' },
          { word: 'here', role: 'adverb of place', note: 'Points to something close to the speaker.' },
          { word: 'you are', role: 'subject + verb', note: 'Short form of "here it is for you" — used when handing something over.' }
        ],
        keyExpressions: [{ phrase: 'here you are', meaning: 'said when giving something to someone' }],
        exampleSentences: ['Here you are, one coffee.', 'Here you are, sir.'],
        pronunciationTips: ['Link "here" and "you" smoothly — don’t pause between them.']
      },
      {
        speaker: 'A', text: 'Thank you. Your room is 214, on the second floor. Breakfast is from seven to ten.',
        translation_tr: 'Teşekkür ederim. Odanız 214, ikinci katta. Kahvaltı yediden ona kadar.', emotion: 'friendly', register: 'formal'
      },
      {
        speaker: 'B', expected: 'Great, thank you very much.',
        altAccepted: ['Great, thanks a lot.', 'Thank you very much.'],
        translation_tr: 'Harika, çok teşekkür ederim.',
        register: 'neutral', ipa: '/greɪt θæŋk juː ˈvɛri mʌtʃ/',
        grammar: [
          { word: 'Great', role: 'interjection', note: 'Shows you are happy about the information.' },
          { word: 'thank you', role: 'fixed phrase', note: 'The standard way to express thanks in English.' },
          { word: 'very much', role: 'intensifier', note: 'Makes the thanks stronger.' }
        ],
        keyExpressions: [{ phrase: 'thank you very much', meaning: 'a stronger, more grateful way of saying thanks' }],
        exampleSentences: ['Thank you very much for your help.'],
        pronunciationTips: ['Stress the word "very" slightly more than the others.']
      }
    ]
  }),

  createDialogue({
    id: 'hotel-complaint-b2-01',
    locationId: 'hotel',
    scenarioId: 'complaint',
    title: 'Reporting a Noisy Room',
    level: 'B2',
    variant: 1,
    length: 'medium',
    goal: 'Report a problem with your room and get it resolved.',
    tags: ['complaint', 'problem-solving'],
    sceneType: 'hotel-lobby',
    characters: {
      A: { name: 'Daniel', role: 'Front Desk Manager', gender: 'male', accent: 'irish', avatarPreset: 'manager_m' },
      B: { name: 'Guest', role: 'Hotel Guest', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Good evening, how can I help you?', translation_tr: 'İyi akşamlar, size nasıl yardımcı olabilirim?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'I’m afraid there’s a problem with my room — it’s extremely noisy.',
        altAccepted: ['I’m sorry to bother you, but my room is really noisy.', 'I need to report a problem — my room is very noisy.'],
        translation_tr: 'Korkarım odamda bir sorun var — çok gürültülü.',
        register: 'formal', ipa: '/aɪm əˈfreɪd ðɛrz ə ˈprɒbləm wɪð maɪ ruːm ɪts ɪkˈstriːmli ˈnɔɪzi/',
        grammar: [
          { word: 'I’m afraid', role: 'softening phrase', note: 'Used to introduce bad news politely, not literal fear.' },
          { word: 'there’s', role: 'existential structure', note: '"There is" — introduces a new problem into the conversation.' },
          { word: 'extremely', role: 'adverb of degree', note: 'Stronger than "very"; adds emphasis to "noisy."' }
        ],
        keyExpressions: [{ phrase: 'I’m afraid there’s a problem with...', meaning: 'a polite, formal way to raise a complaint' }],
        exampleSentences: ['I’m afraid there’s a problem with the air conditioning.'],
        pronunciationTips: ['Don’t pause between "I’m" and "afraid" — it should sound like one soft opener before the real complaint.']
      },
      { speaker: 'A', text: 'I’m sorry to hear that. What exactly is the issue?', translation_tr: 'Bunu duyduğuma üzüldüm. Tam olarak sorun nedir?', emotion: 'apologetic', register: 'formal' },
      {
        speaker: 'B', expected: 'There’s construction work right outside my window, and it started at six this morning.',
        altAccepted: ['There’s some construction going on outside my window since six this morning.'],
        translation_tr: 'Penceremin hemen dışında inşaat çalışması var ve bu sabah saat altıda başladı.',
        register: 'neutral', ipa: '/ðɛrz kənˈstrʌkʃən wɜːrk raɪt ˌaʊtˈsaɪd maɪ ˈwɪndoʊ ænd ɪt ˈstɑːrtɪd æt sɪks ðɪs ˈmɔːrnɪŋ/',
        grammar: [
          { word: 'right outside', role: 'adverbial phrase', note: '"Right" here means "directly/exactly," emphasizing closeness.' },
          { word: 'it started at', role: 'past simple', note: 'States when the noise began as a specific fact.' }
        ],
        keyExpressions: [{ phrase: 'right outside', meaning: 'directly next to / immediately outside' }],
        exampleSentences: ['The bus stop is right outside my house.'],
        pronunciationTips: ['Keep a steady rhythm through the long sentence; take a small breath after "window."']
      },
      { speaker: 'A', text: 'I completely understand — I apologize for the inconvenience. Would you like me to move you to a quieter room?', translation_tr: 'Tamamen anlıyorum — rahatsızlık için özür dilerim. Sizi daha sessiz bir odaya taşımamı ister misiniz?', emotion: 'apologetic', register: 'formal' },
      {
        speaker: 'B', expected: 'Yes, that would be great, as long as it’s ready soon.',
        altAccepted: ['Yes, that would be great, if it’s not too much trouble.', 'Yes please, that would be perfect.'],
        translation_tr: 'Evet, harika olur, yeter ki yakında hazır olsun.',
        register: 'neutral', ipa: '/jɛs ðæt wʊd biː greɪt æz lɔːŋ æz ɪts ˈrɛdi suːn/',
        grammar: [
          { word: 'that would be great', role: 'conditional / polite acceptance', note: '"Would" softens the acceptance, making it sound polite rather than demanding.' },
          { word: 'as long as', role: 'conjunction', note: 'Introduces a condition — means "on the condition that."' }
        ],
        keyExpressions: [{ phrase: 'as long as', meaning: 'on the condition that / provided that' }],
        exampleSentences: ['I’m happy to wait, as long as it doesn’t take too long.'],
        pronunciationTips: ['Link "as long as" together smoothly — it’s said almost as one word in natural speech.']
      }
    ]
  })
];
