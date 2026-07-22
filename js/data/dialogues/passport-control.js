import { createDialogue } from '../dialogueSchema.js';

export const PASSPORT_CONTROL_DIALOGUES = [
  createDialogue({
    id: 'passport-control-standard-entry-a1-01',
    locationId: 'passport-control',
    scenarioId: 'standard-entry',
    title: 'Standard Entry Questions',
    level: 'A1',
    variant: 1,
    length: 'short',
    goal: 'Answer the passport officer’s questions and enter the country.',
    tags: ['travel'],
    sceneType: 'airport',
    characters: {
      A: { name: 'Officer Reyes', role: 'Passport Control Officer', gender: 'male', accent: 'american', avatarPreset: 'officer_m' },
      B: { name: 'Traveler', role: 'Traveler', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Good morning. May I see your passport, please?', translation_tr: 'Günaydın. Pasaportunuzu görebilir miyim, lütfen?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Of course. Here you are.',
        altAccepted: ['Sure, here you are.', 'Yes, here you go.'],
        translation_tr: 'Elbette. Buyurun.',
        register: 'formal', ipa: '/əv kɔːrs hɪər juː ɑːr/',
        grammar: [
          { word: 'Of course', role: 'fixed response', note: 'A polite way to agree immediately to a request.' }
        ],
        keyExpressions: [{ phrase: 'Of course', meaning: 'a polite way of saying "yes, certainly"' }],
        exampleSentences: ['Of course, one moment please.'],
        pronunciationTips: ['Keep "of course" short and connected — it should sound like one word.']
      },
      { speaker: 'A', text: 'What is the purpose of your visit?', translation_tr: 'Ziyaretinizin amacı nedir?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'I’m here on vacation.',
        altAccepted: ['I’m here for tourism.', 'I’m visiting for vacation.'],
        translation_tr: 'Tatil için buradayım.',
        register: 'neutral', ipa: '/aɪm hɪər ɒn veɪˈkeɪʃən/',
        grammar: [
          { word: 'I’m here', role: 'subject + verb + adverb', note: 'States your current location/purpose.' },
          { word: 'on vacation', role: 'prepositional phrase', note: '"On" is used with certain fixed travel expressions like "on vacation," "on business."' }
        ],
        keyExpressions: [{ phrase: 'on vacation', meaning: 'traveling for rest/leisure, not work' }, { phrase: 'on business', meaning: 'traveling for work' }],
        exampleSentences: ['I’m here on business.', 'We’re here on vacation for two weeks.'],
        pronunciationTips: ['Stress the second syllable of "vacation": va-CA-tion.']
      },
      { speaker: 'A', text: 'How long will you be staying?', translation_tr: 'Ne kadar süre kalacaksınız?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'I’ll be staying for one week.',
        altAccepted: ['I’m staying for a week.', 'For one week.'],
        translation_tr: 'Bir hafta kalacağım.',
        register: 'neutral', ipa: '/aɪl biː ˈsteɪɪŋ fɔːr wʌn wiːk/',
        grammar: [
          { word: 'I’ll be staying', role: 'future continuous', note: 'Describes a planned action that will continue over a period of time.' },
          { word: 'for one week', role: 'time expression', note: 'States the duration of the stay.' }
        ],
        keyExpressions: [{ phrase: 'I’ll be staying for...', meaning: 'used to state the length of your stay' }],
        exampleSentences: ['I’ll be staying for three days.'],
        pronunciationTips: ['Contract "I will" to "I’ll" — say it as one quick syllable.']
      }
    ]
  })
];
