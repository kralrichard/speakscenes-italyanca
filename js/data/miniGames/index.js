// Catalog of the 5 mini-game types. Each type's actual round content is
// generated at runtime from real data (js/data/vocabulary.js for word-level
// games, the target-language Shorts sentence bank for sentence-level games)
// -- this catalog only describes what a type IS, for the world screen's game
// list and the mini-game router.

export const MINI_GAME_TYPES = [
  { type: 'object-hunt', title: 'Nesne Avı', icon: '🔎',
    description: 'Kelimeye ya da sese uyan nesneyi bul.', minLevel: 'A0' },
  { type: 'word-builder', title: 'Kelime Kurma', icon: '🔤',
    description: 'Harfleri doğru sıraya dizip kelimeyi yaz.', minLevel: 'A0' },
  { type: 'sentence-builder', title: 'Cümle Kurma', icon: '🧩',
    description: 'Kelimeleri doğru sıraya dizip gerçek bir cümle kur.', minLevel: 'A1' },
  { type: 'listening-challenge', title: 'Dinleme Oyunu', icon: '👂',
    description: 'Dikkatle dinle, duyduğunu seç.', minLevel: 'A1' },
  { type: 'memory-match', title: 'Hafıza Eşleştirme', icon: '🃏',
    description: 'Kartları çevirip kelimeleri anlamlarıyla eşleştir.', minLevel: 'A0' }
];

export function getMiniGameType(type) {
  return MINI_GAME_TYPES.find(g => g.type === type);
}
