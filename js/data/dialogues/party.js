import { createDialogue } from '../dialogueSchema.js';

export const PARTY_DIALOGUES = [
  createDialogue({
    id: 'party-meeting-someone-new-a2-01',
    locationId: 'party',
    scenarioId: 'meeting-someone-new',
    title: 'Meeting Someone New at a Party',
    level: 'A2',
    variant: 1,
    length: 'medium',
    goal: 'Introduce yourself and make small talk with someone new.',
    tags: ['small-talk', 'meeting-someone'],
    sceneType: 'party',
    characters: {
      A: { name: 'Jordan', role: 'Party Guest', gender: 'male', accent: 'canadian', avatarPreset: 'guest_m' },
      B: { name: 'You', role: 'Party Guest', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Hi! I don’t think we’ve met. I’m Jordan.', translation_tr: 'Merhaba! Sanırım tanışmadık. Ben Jordan.', emotion: 'happy', register: 'informal' },
      {
        speaker: 'B', expected: 'Nice to meet you, Jordan. I’m Alex.',
        altAccepted: ['Nice to meet you. My name is Alex.', 'Pleased to meet you, I’m Alex.'],
        translation_tr: 'Tanıştığımıza memnun oldum, Jordan. Ben Alex.',
        register: 'informal', ipa: '/naɪs tuː miːt juː ˈdʒɔːrdən aɪm ˈæləks/',
        grammar: [
          { word: 'Nice to meet you', role: 'fixed greeting phrase', note: 'The standard response when meeting someone for the first time.' },
          { word: 'I’m Alex', role: 'subject + verb + name', note: 'A simple way to introduce your own name.' }
        ],
        keyExpressions: [{ phrase: 'Nice to meet you', meaning: 'a standard, friendly greeting for a first meeting' }],
        exampleSentences: ['Nice to meet you, I’ve heard a lot about you.'],
        pronunciationTips: ['Say "nice to meet you" as one smooth, connected phrase.']
      },
      { speaker: 'A', text: 'So, how do you know the host?', translation_tr: 'Peki, ev sahibini nereden tanıyorsun?', emotion: 'curious', register: 'informal' },
      {
        speaker: 'B', expected: 'We work together. What about you?',
        altAccepted: ['We’re coworkers. How about you?', 'We work at the same company. And you?'],
        translation_tr: 'Birlikte çalışıyoruz. Ya sen?',
        register: 'informal', ipa: '/wiː wɜːrk təˈgɛðər wʌt əˈbaʊt juː/',
        grammar: [
          { word: 'We work together', role: 'present simple', note: 'Describes a general, ongoing fact about your relationship.' },
          { word: 'What about you?', role: 'fixed question', note: 'A quick way to turn the question back to the other person.' }
        ],
        keyExpressions: [{ phrase: 'What about you?', meaning: 'used to ask the same question back to someone' }],
        exampleSentences: ['I’m from Spain — what about you?'],
        pronunciationTips: ['Rise in pitch on "you" — it signals you’re asking a genuine question back.']
      },
      { speaker: 'A', text: 'Oh nice! I’m actually her neighbor.', translation_tr: 'Ah harika! Ben aslında onun komşusuyum.', emotion: 'happy', register: 'informal' },
      {
        speaker: 'B', expected: 'That’s great. It’s a nice party, isn’t it?',
        altAccepted: ['Cool! It’s a nice party, right?', 'That’s nice. This is a great party.'],
        translation_tr: 'Harika. Güzel bir parti, değil mi?',
        register: 'informal', ipa: '/ðæts greɪt ɪts ə naɪs ˈpɑːrti ˈɪznt ɪt/',
        grammar: [
          { word: 'isn’t it?', role: 'question tag', note: 'Added to a statement to invite agreement — common in casual conversation.' }
        ],
        keyExpressions: [{ phrase: '..., isn’t it?', meaning: 'a question tag used to invite agreement' }],
        exampleSentences: ['It’s a lovely evening, isn’t it?'],
        pronunciationTips: ['The tag "isn’t it" usually rises in pitch at the end, like a real question.']
      }
    ]
  })
];
