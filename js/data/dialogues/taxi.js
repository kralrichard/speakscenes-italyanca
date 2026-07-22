import { createDialogue } from '../dialogueSchema.js';

export const TAXI_DIALOGUES = [
  createDialogue({
    id: 'taxi-giving-directions-a1-01',
    locationId: 'taxi',
    scenarioId: 'giving-directions',
    title: 'Giving Directions to the Driver',
    level: 'A1',
    variant: 1,
    length: 'short',
    goal: 'Tell the driver where you want to go and pay at the end.',
    tags: ['directions'],
    sceneType: 'taxi',
    characters: {
      A: { name: 'Sam', role: 'Taxi Driver', gender: 'male', accent: 'american', avatarPreset: 'driver_m' },
      B: { name: 'Passenger', role: 'Taxi Passenger', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Hi, where would you like to go?', translation_tr: 'Merhaba, nereye gitmek istersiniz?', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'To the central station, please.',
        altAccepted: ['The central station, please.', 'To the train station, please.'],
        translation_tr: 'Merkez istasyona, lütfen.',
        register: 'neutral', ipa: '/tuː ðə ˈsɛntrəl ˈsteɪʃən pliːz/',
        grammar: [
          { word: 'To', role: 'preposition of direction', note: 'Shows the destination — "to + place."' },
          { word: 'the central station', role: 'object', note: 'The specific place you want to go.' },
          { word: 'please', role: 'politeness marker', note: 'Softens the instruction.' }
        ],
        keyExpressions: [{ phrase: 'To + place, please', meaning: 'a simple way to state your destination to a driver' }],
        exampleSentences: ['To the airport, please.'],
        pronunciationTips: ['Stress "central" on the first syllable: CEN-tral.']
      },
      { speaker: 'A', text: 'No problem. It will take about ten minutes.', translation_tr: 'Sorun değil. Yaklaşık on dakika sürecek.', emotion: 'neutral', register: 'informal' },
      {
        speaker: 'B', expected: 'That’s fine, thank you.',
        altAccepted: ['That’s okay, thanks.', 'Great, thank you.'],
        translation_tr: 'Sorun değil, teşekkür ederim.',
        register: 'neutral', ipa: '/ðæts faɪn θæŋk juː/',
        grammar: [{ word: 'That’s fine', role: 'fixed response', note: 'Shows the information is acceptable to you.' }],
        keyExpressions: [{ phrase: 'That’s fine', meaning: 'used to accept information calmly' }],
        exampleSentences: ['That’s fine, no rush.'],
        pronunciationTips: ['Keep your voice relaxed and even — this is a calm, easy response.']
      },
      { speaker: 'A', text: 'Here we are. That’s twelve dollars.', translation_tr: 'İşte geldik. On iki dolar.', emotion: 'neutral', register: 'informal' },
      {
        speaker: 'B', expected: 'Here you go. Keep the change.',
        altAccepted: ['Here you are. Keep the change.'],
        translation_tr: 'Buyurun. Üstü kalsın.',
        register: 'informal', ipa: '/hɪər juː goʊ kiːp ðə tʃeɪndʒ/',
        grammar: [
          { word: 'Keep the change', role: 'fixed expression', note: 'Tells the driver they can keep the extra money as a tip.' }
        ],
        keyExpressions: [{ phrase: 'Keep the change', meaning: 'let the person keep the extra money as a tip' }],
        exampleSentences: ['That’s fifteen, keep the change.'],
        pronunciationTips: ['Say "change" with a clear "ch" sound, like "chair."']
      }
    ]
  })
];
