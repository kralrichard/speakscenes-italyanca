import { createDialogue } from '../dialogueSchema.js';

export const AIRPORT_DIALOGUES = [
  createDialogue({
    id: 'airport-check-in-desk-a2-01',
    locationId: 'airport',
    scenarioId: 'check-in-desk',
    title: 'Airline Check-in Desk',
    level: 'A2',
    variant: 1,
    length: 'medium',
    goal: 'Check in for your flight and check your luggage.',
    tags: ['travel', 'booking'],
    sceneType: 'airport',
    characters: {
      A: { name: 'Priya', role: 'Check-in Agent', gender: 'female', accent: 'indian', avatarPreset: 'agent_f' },
      B: { name: 'Passenger', role: 'Passenger', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Good morning. Where are you flying today?', translation_tr: 'Günaydın. Bugün nereye uçuyorsunuz?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'I’m flying to London.',
        altAccepted: ['I’m going to London.'],
        translation_tr: 'Londra’ya uçuyorum.',
        register: 'neutral', ipa: '/aɪm ˈflaɪɪŋ tuː ˈlʌndən/',
        grammar: [
          { word: 'I’m flying', role: 'present continuous', note: 'Used for a planned future action — a booked flight.' },
          { word: 'to London', role: 'prepositional phrase', note: 'Shows the destination.' }
        ],
        keyExpressions: [{ phrase: 'I’m flying to...', meaning: 'used to state your flight destination' }],
        exampleSentences: ['I’m flying to Paris tomorrow.'],
        pronunciationTips: ['Say "flying" with a clear long "i" sound: FLY-ing.']
      },
      { speaker: 'A', text: 'May I see your passport, please?', translation_tr: 'Pasaportunuzu görebilir miyim, lütfen?', emotion: 'formal', register: 'formal' },
      {
        speaker: 'B', expected: 'Of course. Here you are.',
        altAccepted: ['Sure, here you go.'],
        translation_tr: 'Elbette. Buyurun.',
        register: 'formal', ipa: '/əv kɔːrs hɪər juː ɑːr/',
        grammar: [{ word: 'Of course', role: 'fixed response', note: 'Polite agreement to a request.' }],
        keyExpressions: [{ phrase: 'Of course', meaning: 'certainly, yes' }],
        exampleSentences: ['Of course, one moment.'],
        pronunciationTips: ['Link the two words smoothly: "of course" almost sounds like "uh-course."']
      },
      { speaker: 'A', text: 'Thank you. Do you have any bags to check in?', translation_tr: 'Teşekkürler. Check-in yapacak bagajınız var mı?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Yes, just one suitcase.',
        altAccepted: ['Yes, one suitcase.', 'Yes, I have one bag.'],
        translation_tr: 'Evet, sadece bir bavul.',
        register: 'neutral', ipa: '/jɛs dʒʌst wʌn ˈsuːtkeɪs/',
        grammar: [
          { word: 'just', role: 'adverb (limiting)', note: 'Means "only" — limits the quantity to one.' },
          { word: 'one suitcase', role: 'object', note: 'The item being checked in.' }
        ],
        keyExpressions: [{ phrase: 'just one...', meaning: 'only one, nothing more' }],
        exampleSentences: ['I only have one carry-on bag.'],
        pronunciationTips: ['Stress "suit" in "suitcase": SUIT-case.']
      },
      { speaker: 'A', text: 'Perfect. Please place it on the scale.', translation_tr: 'Mükemmel. Lütfen teraziye koyun.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Sure, here it is.',
        altAccepted: ['Okay, here it is.', 'Sure, no problem.'],
        translation_tr: 'Tabii, işte burada.',
        register: 'neutral', ipa: '/ʃʊər hɪər ɪt ɪz/',
        grammar: [{ word: 'here it is', role: 'fixed phrase', note: 'Used when handing over or presenting an object.' }],
        keyExpressions: [{ phrase: 'here it is', meaning: 'said while presenting an object' }],
        exampleSentences: ['Here it is, right on the scale.'],
        pronunciationTips: ['Keep the rhythm even across the three words.']
      }
    ]
  }),

  createDialogue({
    id: 'airport-missed-flight-b1-01',
    locationId: 'airport',
    scenarioId: 'missed-flight',
    title: 'Missing a Flight',
    level: 'B1',
    variant: 1,
    length: 'long',
    goal: 'Explain that you missed your flight and find a solution.',
    tags: ['problem-solving'],
    sceneType: 'airport',
    characters: {
      A: { name: 'Priya', role: 'Airline Agent', gender: 'female', accent: 'indian', avatarPreset: 'agent_f' },
      B: { name: 'Passenger', role: 'Passenger', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Hello, how can I help you?', translation_tr: 'Merhaba, size nasıl yardımcı olabilirim?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'I just missed my flight to Berlin. Is there anything you can do?',
        altAccepted: ['I’ve just missed my flight to Berlin — can you help me?', 'I missed my flight to Berlin. What are my options?'],
        translation_tr: 'Berlin’e olan uçağımı az önce kaçırdım. Yapabileceğiniz bir şey var mı?',
        register: 'neutral', ipa: '/aɪ dʒʌst mɪst maɪ flaɪt tuː bərˈlɪn ɪz ðɛər ˈɛnɪθɪŋ juː kæn duː/',
        grammar: [
          { word: 'I just missed', role: 'past simple + adverb', note: '"Just" shows the action happened very recently.' },
          { word: 'Is there anything you can do?', role: 'polite request for help', note: 'A softer way to ask for a solution than a direct demand.' }
        ],
        keyExpressions: [{ phrase: 'Is there anything you can do?', meaning: 'a polite way to ask for help or a solution' }],
        exampleSentences: ['I just missed the bus — is there anything you can do?'],
        pronunciationTips: ['Don’t rush "missed my flight" — pronounce the final "t" in "missed" clearly.']
      },
      { speaker: 'A', text: 'I’m sorry to hear that. Let me check the next available flight for you.', translation_tr: 'Bunu duyduğuma üzüldüm. Sizin için bir sonraki uygun uçuşu kontrol edeyim.', emotion: 'apologetic', register: 'formal' },
      {
        speaker: 'B', expected: 'Thank you, I really appreciate it.',
        altAccepted: ['Thanks, I appreciate that.', 'Thank you so much, I appreciate it.'],
        translation_tr: 'Teşekkür ederim, gerçekten minnettarım.',
        register: 'neutral', ipa: '/θæŋk juː aɪ ˈrɪəli əˈpriːʃieɪt ɪt/',
        grammar: [
          { word: 'I really appreciate it', role: 'fixed expression', note: '"Appreciate" is a slightly more formal, heartfelt way of saying "thank you."' }
        ],
        keyExpressions: [{ phrase: 'I appreciate it', meaning: 'a sincere way to express thanks' }],
        exampleSentences: ['Thanks for your patience, I really appreciate it.'],
        pronunciationTips: ['Stress "really" and slow down slightly to sound sincere.']
      },
      { speaker: 'A', text: 'There’s a flight in three hours, but there’s a fifty-dollar rebooking fee. Would that work for you?', translation_tr: 'Üç saat sonra bir uçuş var ama elli dolarlık bir yeniden rezervasyon ücreti var. Bu sizin için uygun olur mu?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'That works for me. I’ll pay the fee.',
        altAccepted: ['That’s fine, I’ll pay the fee.', 'Sounds good, I’ll pay the rebooking fee.'],
        translation_tr: 'Benim için uygun. Ücreti öderim.',
        register: 'neutral', ipa: '/ðæt wɜːrks fɔːr miː aɪl peɪ ðə fiː/',
        grammar: [
          { word: 'That works for me', role: 'fixed expression', note: 'A common informal way to accept a suggestion or plan.' },
          { word: 'I’ll pay', role: 'future simple (willingness)', note: 'Expresses a decision made at the moment of speaking.' }
        ],
        keyExpressions: [{ phrase: 'That works for me', meaning: 'used to agree that a plan or option is acceptable' }],
        exampleSentences: ['Three o’clock works for me.'],
        pronunciationTips: ['Contract "I will" naturally to "I’ll" — don’t pronounce it as two separate words.']
      }
    ]
  })
];
