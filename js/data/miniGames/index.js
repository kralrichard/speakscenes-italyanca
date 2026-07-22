// Catalog of the 5 mini-game types. Each type's actual round content is
// generated at runtime from real data (js/data/vocabulary.js for word-level
// games, js/data/dialogues/*.js turns for sentence-level games) -- this
// catalog only describes what a type IS, for the world screen's game list
// and the mini-game router.

export const MINI_GAME_TYPES = [
  { type: 'object-hunt', title: 'Object Hunt', icon: '🔎',
    description: 'Find the object that matches the word or sound.', minLevel: 'A0' },
  { type: 'word-builder', title: 'Word Builder', icon: '🔤',
    description: 'Put the letters in the right order to spell the word.', minLevel: 'A0' },
  { type: 'sentence-builder', title: 'Sentence Builder', icon: '🧩',
    description: 'Put the words in the right order to build a real sentence.', minLevel: 'A1' },
  { type: 'listening-challenge', title: 'Listening Challenge', icon: '👂',
    description: 'Listen carefully and choose or type what you heard.', minLevel: 'A1' },
  { type: 'memory-match', title: 'Memory Match', icon: '🃏',
    description: 'Flip cards to match English words with their meanings.', minLevel: 'A0' }
];

export function getMiniGameType(type) {
  return MINI_GAME_TYPES.find(g => g.type === type);
}
