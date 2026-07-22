import { createDialogue } from '../dialogueSchema.js?v=5';

export const PHONE_CALL_DIALOGUES = [
  createDialogue({
    id: 'phone-call-resolving-misunderstanding-b1-01',
    locationId: 'phone-call',
    scenarioId: 'resolving-misunderstanding',
    title: 'Resolving a Misunderstanding',
    level: 'B1',
    variant: 1,
    length: 'medium',
    goal: 'Clear up a misunderstanding about a missed meeting.',
    tags: ['problem-solving', 'apology'],
    sceneType: 'home',
    characters: {
      A: { name: 'Sofia', role: 'Colleague', gender: 'female', accent: 'american', avatarPreset: 'colleague_f' },
      B: { name: 'You', role: 'Colleague', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Hey, it’s Sofia. I thought we agreed to meet at two — I waited for twenty minutes.', translation_tr: 'Merhaba, ben Sofia. Saat ikide buluşmayı kararlaştırdığımızı sanıyordum — yirmi dakika bekledim.', emotion: 'concerned', register: 'neutral' },
      {
        speaker: 'B', expected: 'I’m really sorry, I think there’s been a mix-up. I had three o’clock in my calendar.',
        altAccepted: ['I’m so sorry, I must have misunderstood — I had three o’clock written down.', 'Sorry about that, I think we got our wires crossed — I thought it was three.'],
        translation_tr: 'Gerçekten özür dilerim, sanırım bir karışıklık olmuş. Ben takvimimde üçü yazmıştım.',
        register: 'neutral', ipa: '/aɪm ˈrɪəli ˈsɒri aɪ θɪŋk ðɛərz bɪn ə mɪksˈʌp aɪ hæd θriː əˈklɒk ɪn maɪ ˈkælɪndər/',
        grammar: [
          { word: 'I think there’s been a mix-up', role: 'softening phrase + present perfect', note: 'Avoids blaming either person directly; presents it as a neutral mistake.' },
          { word: 'I had ... in my calendar', role: 'past simple', note: 'Explains your side of the misunderstanding factually.' }
        ],
        keyExpressions: [{ phrase: 'a mix-up', meaning: 'a confusion or mistake, often about times/plans' }, { phrase: 'get your wires crossed', meaning: 'idiom: to misunderstand each other about arrangements' }],
        exampleSentences: ['Sorry, there’s been a mix-up with the dates.'],
        pronunciationTips: ['Slow down slightly on "mix-up" so both syllables are clear.']
      },
      { speaker: 'A', text: 'Oh, I see — that explains it. No hard feelings, these things happen.', translation_tr: 'Ah, anlıyorum — bu açıklıyor. Kırgınlık yok, bu tür şeyler olur.', emotion: 'neutral', register: 'neutral' },
      {
        speaker: 'B', expected: 'Thanks for understanding. Can we reschedule for tomorrow?',
        altAccepted: ['Thanks for being understanding. Shall we reschedule for tomorrow?', 'I appreciate that. Can we move it to tomorrow?'],
        translation_tr: 'Anlayışınız için teşekkürler. Yarına erteleyebilir miyiz?',
        register: 'neutral', ipa: '/θæŋks fɔːr ˌʌndərˈstændɪŋ kæn wiː ˌriːˈʃɛdjuːl fɔːr təˈmɒroʊ/',
        grammar: [
          { word: 'Thanks for understanding', role: 'gerund after preposition', note: '"For" is followed by the -ing form of the verb, not the base form.' },
          { word: 'reschedule', role: 'verb', note: 'Means "to arrange a new time" — the prefix "re-" means "again."' }
        ],
        keyExpressions: [{ phrase: 'reschedule for...', meaning: 'to set a new date/time for an appointment' }],
        exampleSentences: ['Could we reschedule for next week?'],
        pronunciationTips: ['Stress the second syllable of "reschedule": re-SCHED-ule.']
      }
    ]
  })
];
