// CEFR level definitions. These drive: level-picker UI, default TTS speed,
// default speech-recognition strictness, and which accents are offered.
export const LEVELS = [
  {
    code: 'A1',
    name: 'Beginner',
    shortDesc: 'Very short sentences, everyday basics.',
    descriptors: [
      'Simple present tense', 'Basic greetings & introductions', 'Numbers & prices',
      'Family, food, daily routines', 'Simple travel phrases'
    ],
    ttsRate: 0.8,
    defaultStrictness: 'relaxed',
    accents: ['american', 'british'],
    color: '#2e7d5b'
  },
  {
    code: 'A2',
    name: 'Elementary',
    shortDesc: 'Everyday conversations, past & future plans.',
    descriptors: [
      'Past and future plans', 'Shopping & transportation', 'Simple problems',
      'Describing people & places', 'Basic requests & explanations'
    ],
    ttsRate: 0.85,
    defaultStrictness: 'relaxed',
    accents: ['american', 'british', 'canadian'],
    color: '#3a7ca5'
  },
  {
    code: 'B1',
    name: 'Intermediate',
    shortDesc: 'Longer everyday talk, opinions, experiences.',
    descriptors: [
      'Travel problems', 'Opinions & experiences', 'Work and education',
      'Making decisions & giving advice', 'Describing events'
    ],
    ttsRate: 0.9,
    defaultStrictness: 'normal',
    accents: ['american', 'british', 'canadian', 'australian'],
    color: '#7952b3'
  },
  {
    code: 'B2',
    name: 'Upper-Intermediate',
    shortDesc: 'Detailed opinions, professional situations.',
    descriptors: [
      'Complaints & negotiations', 'Debates on social issues', 'Complex travel situations',
      'Natural expressions & phrasal verbs', 'Professional communication'
    ],
    ttsRate: 0.95,
    defaultStrictness: 'normal',
    accents: ['american', 'british', 'australian', 'irish', 'indian'],
    color: '#b5651d'
  },
  {
    code: 'C1',
    name: 'Advanced',
    shortDesc: 'Persuasion, presentations, nuance, idiom.',
    descriptors: [
      'Advanced professional conversation', 'Persuasion & presentations',
      'Abstract discussion & humor', 'Cultural topics', 'Formal vs informal register'
    ],
    ttsRate: 1.0,
    defaultStrictness: 'strict',
    accents: ['american', 'british', 'australian', 'irish', 'scottish', 'indian', 'international'],
    color: '#a3324a'
  },
  {
    code: 'C2',
    name: 'Mastery',
    shortDesc: 'Native-like nuance, debate, diplomacy, wit.',
    descriptors: [
      'Complex debate & academic discussion', 'Diplomatic language', 'Subtle humor & sarcasm',
      'Metaphor & idiom', 'Advanced negotiation', 'Philosophical topics'
    ],
    ttsRate: 1.05,
    defaultStrictness: 'strict',
    accents: ['american', 'british', 'australian', 'irish', 'scottish', 'indian', 'international'],
    color: '#4b3869'
  }
];

export function getLevel(code) {
  return LEVELS.find(l => l.code === code);
}

export const STRICTNESS_LEVELS = [
  { id: 'relaxed', name: 'Relaxed', desc: 'Accepts the gist; minor word/pronunciation gaps are fine.' },
  { id: 'normal', name: 'Normal', desc: 'Expects all key words and reasonably clear pronunciation.' },
  { id: 'strict', name: 'Strict', desc: 'Expects the full sentence, correct words, clear pronunciation.' },
  { id: 'near-perfect', name: 'Near-perfect', desc: 'Accepted only when almost completely accurate.' }
];
