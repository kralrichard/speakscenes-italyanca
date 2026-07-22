import { createDialogue } from '../dialogueSchema.js';

export const TRAVEL_AGENCY_DIALOGUES = [
  createDialogue({
    id: 'travel-agency-booking-trip-b2-01',
    locationId: 'travel-agency',
    scenarioId: 'booking-trip',
    title: 'Booking a Multi-City Trip',
    level: 'B2',
    variant: 1,
    length: 'long',
    goal: 'Plan and book a complex multi-city trip within a budget.',
    tags: ['booking', 'negotiation'],
    sceneType: 'formal-office',
    characters: {
      A: { name: 'Isabel', role: 'Travel Agent', gender: 'female', accent: 'international', avatarPreset: 'agent_f2' },
      B: { name: 'Client', role: 'Client', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'So, tell me about the trip you have in mind.', translation_tr: 'Peki, aklınızdaki geziyi anlatın bana.', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'I’d like to visit three cities — Rome, Florence, and Venice — over about ten days.',
        altAccepted: ['I’m hoping to see Rome, Florence, and Venice, all within around ten days.', 'I want to travel to three cities: Rome, Florence, and Venice, in roughly ten days.'],
        translation_tr: 'Yaklaşık on gün içinde üç şehri — Roma, Floransa ve Venedik’i — ziyaret etmek istiyorum.',
        register: 'formal', ipa: '/aɪd laɪk tuː ˈvɪzɪt θriː ˈsɪtiz roʊm ˈflɒrəns ænd ˈvɛnɪs ˈoʊvər əˈbaʊt tɛn deɪz/',
        grammar: [
          { word: 'I’d like to visit', role: 'polite statement of intent', note: 'A standard, professional way to open a planning conversation.' },
          { word: 'over about ten days', role: 'time-span expression', note: '"Over" indicates a period across which the activity is spread.' }
        ],
        keyExpressions: [{ phrase: 'over [a period of time]', meaning: 'spread across a duration' }],
        exampleSentences: ['We’re planning the renovation over about six weeks.'],
        pronunciationTips: ['Give each city name its own clear beat, with a short pause between them.']
      },
      { speaker: 'A', text: 'Lovely choice. What’s your budget for the whole trip, roughly?', translation_tr: 'Harika bir seçim. Tüm gezi için bütçeniz kabaca nedir?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'We’re aiming to keep it under three thousand dollars per person, if that’s realistic.',
        altAccepted: ['Ideally under three thousand dollars each, if that’s doable.', 'We’d like to stay under three thousand per person, if possible.'],
        translation_tr: 'Kişi başı üç bin doların altında tutmayı hedefliyoruz, eğer bu gerçekçiyse.',
        register: 'formal', ipa: '/wɪər ˈeɪmɪŋ tuː kiːp ɪt ˈʌndər θriː ˈθaʊzənd ˈdɒlərz pɜːr ˈpɜːrsən ɪf ðæts ˌriːəˈlɪstɪk/',
        grammar: [
          { word: 'We’re aiming to', role: 'stated goal (present continuous)', note: 'Expresses an intention/target rather than a fixed rule.' },
          { word: 'if that’s realistic', role: 'hedging clause', note: 'Shows flexibility and invites the agent’s professional judgment.' }
        ],
        keyExpressions: [{ phrase: 'We’re aiming to keep it under...', meaning: 'a diplomatic way to state a budget ceiling' }],
        exampleSentences: ['We’re aiming to keep costs under five hundred dollars.'],
        pronunciationTips: ['Slightly stress "realistic" — it signals you’re open to adjusting the plan.']
      },
      { speaker: 'A', text: 'That should be manageable if we take the train between cities instead of flying. Shall I put together an itinerary?', translation_tr: 'Şehirler arasında uçmak yerine treni kullanırsak bu yönetilebilir olmalı. Bir gezi planı hazırlayayım mı?', emotion: 'thinking', register: 'formal' },
      {
        speaker: 'B', expected: 'That sounds ideal. Please go ahead and put something together.',
        altAccepted: ['That works for me — please go ahead.', 'Sounds perfect, please put an itinerary together.'],
        translation_tr: 'Kulağa ideal geliyor. Lütfen devam edin ve bir şeyler hazırlayın.',
        register: 'formal', ipa: '/ðæt saʊndz aɪˈdiːəl pliːz goʊ əˈhɛd ænd pʊt ˈsʌmθɪŋ təˈgɛðər/',
        grammar: [
          { word: 'go ahead', role: 'phrasal verb', note: 'Means "to proceed" — gives permission or encouragement to continue.' },
          { word: 'put something together', role: 'phrasal verb', note: '"Put together" means to assemble/create, here an itinerary.' }
        ],
        keyExpressions: [{ phrase: 'go ahead and...', meaning: 'gives someone permission or encouragement to proceed' }],
        exampleSentences: ['Go ahead and book the earlier flight.'],
        pronunciationTips: ['Say "go ahead" as a smooth, confident phrase, stressing "ahead."']
      }
    ]
  })
];
