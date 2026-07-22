import { createDialogue } from '../dialogueSchema.js?v=5';

export const PHARMACY_DIALOGUES = [
  createDialogue({
    id: 'pharmacy-asking-medicine-a1-01',
    locationId: 'pharmacy',
    scenarioId: 'asking-medicine',
    title: 'Asking for Medicine',
    level: 'A1',
    variant: 1,
    length: 'short',
    goal: 'Explain a symptom and buy the right medicine.',
    tags: ['problem-solving'],
    sceneType: 'retail',
    characters: {
      A: { name: 'Fatima', role: 'Pharmacist', gender: 'female', accent: 'british', avatarPreset: 'pharmacist_f' },
      B: { name: 'Customer', role: 'Pharmacy Customer', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Hello. How can I help you today?', translation_tr: 'Merhaba. Bugün size nasıl yardımcı olabilirim?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'I have a headache. Do you have any painkillers?',
        altAccepted: ['I’ve got a headache. Do you have painkillers?'],
        translation_tr: 'Başım ağrıyor. Ağrı kesiciniz var mı?',
        register: 'neutral', ipa: '/aɪ hæv ə ˈhɛdeɪk duː juː hæv ˈɛni ˈpeɪnˌkɪlərz/',
        grammar: [
          { word: 'I have', role: 'subject + verb', note: 'Used to describe a symptom you are experiencing now.' },
          { word: 'a headache', role: 'object', note: 'Pain in the head — a common symptom noun.' },
          { word: 'Do you have', role: 'question form (present simple)', note: 'The standard way to ask if a shop sells something.' },
          { word: 'any', role: 'quantifier', note: 'Used in questions before plural/uncountable nouns.' }
        ],
        keyExpressions: [{ phrase: 'Do you have any...?', meaning: 'a standard way to ask if something is available' }],
        exampleSentences: ['I have a sore throat.', 'Do you have any cough syrup?'],
        pronunciationTips: ['Stress "headache" on the first syllable: HEAD-ache.']
      },
      { speaker: 'A', text: 'Of course. Here’s some ibuprofen. Take one tablet every six hours.', translation_tr: 'Elbette. İşte biraz ibuprofen. Altı saatte bir tablet alın.', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Thank you. How much is it?',
        altAccepted: ['Thanks. How much does it cost?', 'Thank you, how much is that?'],
        translation_tr: 'Teşekkürler. Ne kadar tutar?',
        register: 'neutral', ipa: '/θæŋk juː haʊ mʌtʃ ɪz ɪt/',
        grammar: [
          { word: 'How much', role: 'question word', note: 'Used to ask about price or quantity of uncountable things.' },
          { word: 'is it', role: 'subject + verb (present simple)', note: 'Refers back to "it" — the medicine.' }
        ],
        keyExpressions: [{ phrase: 'How much is it?', meaning: 'a simple way to ask the price of something' }],
        exampleSentences: ['How much is this shirt?'],
        pronunciationTips: ['Rise in pitch slightly on "much" — it’s the focus word in the question.']
      }
    ]
  })
];
