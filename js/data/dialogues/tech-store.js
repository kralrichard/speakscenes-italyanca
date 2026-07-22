import { createDialogue } from '../dialogueSchema.js?v=5';

export const TECH_STORE_DIALOGUES = [
  createDialogue({
    id: 'tech-store-product-advice-b1-01',
    locationId: 'tech-store',
    scenarioId: 'product-advice',
    title: 'Asking About a Laptop',
    level: 'B1',
    variant: 1,
    length: 'medium',
    goal: 'Get advice on which laptop suits your needs and budget.',
    tags: ['advice'],
    sceneType: 'retail',
    characters: {
      A: { name: 'Kevin', role: 'Store Assistant', gender: 'male', accent: 'australian', avatarPreset: 'assistant_m' },
      B: { name: 'Customer', role: 'Customer', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Hey, welcome in! Are you looking for anything in particular?', translation_tr: 'Merhaba, hoş geldiniz! Belirli bir şey mi arıyorsunuz?', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'Yes, I’m looking for a laptop that’s good for video editing.',
        altAccepted: ['I’m looking for a laptop for video editing.', 'Yes, I need a laptop that can handle video editing.'],
        translation_tr: 'Evet, video düzenleme için iyi bir laptop arıyorum.',
        register: 'neutral', ipa: '/jɛs aɪm ˈlʊkɪŋ fɔːr ə ˈlæptɒp ðæts gʊd fɔːr ˈvɪdioʊ ˈɛdɪtɪŋ/',
        grammar: [
          { word: 'I’m looking for', role: 'present continuous', note: 'Common polite phrase for stating a shopping goal.' },
          { word: 'that’s good for', role: 'relative clause', note: '"That" introduces extra information describing the laptop.' }
        ],
        keyExpressions: [{ phrase: 'I’m looking for...', meaning: 'a standard shopping phrase to state what you want' }],
        exampleSentences: ['I’m looking for a phone with a good camera.'],
        pronunciationTips: ['Link "looking for" smoothly — the "g" softens into the next word.']
      },
      { speaker: 'A', text: 'Sure. What’s your budget looking like?', translation_tr: 'Tabii. Bütçeniz nasıl?', emotion: 'neutral', register: 'informal' },
      {
        speaker: 'B', expected: 'I’d rather not spend more than a thousand dollars.',
        altAccepted: ['Ideally under a thousand dollars.', 'I don’t want to spend more than a thousand.'],
        translation_tr: 'Bin dolardan fazla harcamamayı tercih ederim.',
        register: 'neutral', ipa: '/aɪd ˈræðər nɒt spɛnd mɔːr ðæn ə ˈθaʊzənd ˈdɒlərz/',
        grammar: [
          { word: 'I’d rather not', role: 'preference structure (would rather)', note: 'Followed by the base form of the verb — "spend," not "to spend" or "spending."' },
          { word: 'more than', role: 'comparative phrase', note: 'Sets an upper limit on the amount.' }
        ],
        keyExpressions: [{ phrase: 'I’d rather not...', meaning: 'a polite way to express a preference against something' }],
        exampleSentences: ['I’d rather not go out tonight.'],
        pronunciationTips: ['Contract "I would" naturally to "I’d" — one quick syllable.']
      },
      { speaker: 'A', text: 'No worries, I’ve got a couple of great options in that range. This one has a fast processor and a great screen.', translation_tr: 'Sorun değil, o aralıkta birkaç harika seçeneğim var. Bunun hızlı bir işlemcisi ve harika bir ekranı var.', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'That sounds great. Could I try it out first?',
        altAccepted: ['That sounds good. Can I try it before I decide?', 'Sounds perfect — mind if I try it out?'],
        translation_tr: 'Kulağa harika geliyor. Önce deneyebilir miyim?',
        register: 'neutral', ipa: '/ðæt saʊndz greɪt kʊd aɪ traɪ ɪt aʊt fɜːrst/',
        grammar: [
          { word: 'That sounds great', role: 'linking phrase', note: '"Sound" here means "to seem" based on what you’ve heard, not literal sound.' },
          { word: 'try it out', role: 'phrasal verb', note: '"Try out" means to test something before deciding.' }
        ],
        keyExpressions: [{ phrase: 'try (something) out', meaning: 'to test something before making a decision' }],
        exampleSentences: ['Can I try out the demo version first?'],
        pronunciationTips: ['Stress "sounds" and "great" evenly — both carry positive emphasis.']
      }
    ]
  })
];
