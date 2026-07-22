import { createDialogue } from '../dialogueSchema.js?v=5';

export const CLOTHING_STORE_DIALOGUES = [
  createDialogue({
    id: 'clothing-store-returning-item-b1-01',
    locationId: 'clothing-store',
    scenarioId: 'returning-item',
    title: 'Returning a Damaged Product',
    level: 'B1',
    variant: 1,
    length: 'medium',
    goal: 'Return a damaged jacket and get a refund or exchange.',
    tags: ['complaint', 'problem-solving'],
    sceneType: 'retail',
    characters: {
      A: { name: 'Nora', role: 'Store Assistant', gender: 'female', accent: 'scottish', avatarPreset: 'assistant_f' },
      B: { name: 'Customer', role: 'Customer', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Hi, how can I help you today?', translation_tr: 'Merhaba, bugün size nasıl yardımcı olabilirim?', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'I’d like to return this jacket. There’s a tear in the sleeve.',
        altAccepted: ['I’d like to return this jacket — the sleeve is torn.', 'I want to return this jacket because the sleeve is torn.'],
        translation_tr: 'Bu ceketi iade etmek istiyorum. Kolunda bir yırtık var.',
        register: 'neutral', ipa: '/aɪd laɪk tuː rɪˈtɜːrn ðɪs ˈdʒækɪt ðɛərz ə tɛər ɪn ðə sliːv/',
        grammar: [
          { word: 'I’d like to return', role: 'polite request (would like + infinitive)', note: 'Softer and more formal than "I want to return."' },
          { word: 'There’s a tear', role: 'existential structure', note: 'Introduces the specific problem/damage.' },
          { word: 'in the sleeve', role: 'prepositional phrase', note: 'Specifies the exact location of the damage.' }
        ],
        keyExpressions: [{ phrase: 'I’d like to return this...', meaning: 'a polite, standard opener for a return request' }],
        exampleSentences: ['I’d like to return this shirt — it’s the wrong size.'],
        pronunciationTips: ['Pronounce "tear" (rip) as /tɛər/, not like "tear" (crying), which is /tɪər/.']
      },
      { speaker: 'A', text: 'I’m sorry about that. Do you have the receipt with you?', translation_tr: 'Bunun için üzgünüm. Yanınızda fişiniz var mı?', emotion: 'apologetic', register: 'formal' },
      {
        speaker: 'B', expected: 'Yes, I do. Here it is.',
        altAccepted: ['Yes, here it is.', 'Yes, I’ve got it right here.'],
        translation_tr: 'Evet, var. İşte burada.',
        register: 'neutral', ipa: '/jɛs aɪ duː hɪər ɪt ɪz/',
        grammar: [
          { word: 'Yes, I do', role: 'short answer (auxiliary "do")', note: 'A grammatically complete short answer to a "Do you...?" question.' }
        ],
        keyExpressions: [{ phrase: 'Yes, I do / No, I don’t', meaning: 'standard short answers to "do" questions' }],
        exampleSentences: ['Do you have ID? Yes, I do.'],
        pronunciationTips: ['Stress "do" a little in "Yes, I do" — it carries the emphasis of confirmation.']
      },
      { speaker: 'A', text: 'Great, thanks. Would you prefer a refund or an exchange?', translation_tr: 'Harika, teşekkürler. Para iadesi mi yoksa değişim mi tercih edersiniz?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'I’d prefer a refund, if that’s possible.',
        altAccepted: ['I’d rather have a refund, please.', 'A refund would be better, if possible.'],
        translation_tr: 'Mümkünse, para iadesini tercih ederim.',
        register: 'neutral', ipa: '/aɪd prɪˈfɜːr ə ˈriːfʌnd ɪf ðæts ˈpɒsəbəl/',
        grammar: [
          { word: 'I’d prefer', role: 'polite preference (would prefer)', note: 'A softer, more polite way to state a preference than "I want."' },
          { word: 'if that’s possible', role: 'conditional softener', note: 'Adds politeness by acknowledging it might not be possible.' }
        ],
        keyExpressions: [{ phrase: 'I’d prefer... if that’s possible', meaning: 'a polite way to state a preference while leaving room for the other option' }],
        exampleSentences: ['I’d prefer the window seat, if that’s possible.'],
        pronunciationTips: ['Stress "prefer" on the second syllable: pre-FER.']
      }
    ]
  })
];
