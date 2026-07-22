// ============================================================================
// World-map locations for the language clones — mirrors the English app's
// featured-locations idea, but each location opens the Shorts feed filtered
// to a set of sentence-frame topics instead of an English dialogue. `min` is
// the RECOMMENDED growth stage; nothing is ever locked (same honesty rule as
// the original world map: a jump is never permanently blocked).
// ============================================================================

export const SHORT_LOCATIONS = [
  {
    id: 'ev', emoji: '🏠', label: 'Ev', min: 'A0',
    desc: 'İlk kelimeler: nesneler, gösterme, sahip olma',
    topics: ['first-words', 'naming', 'pointing', 'having', 'seeing', 'describing']
  },
  {
    id: 'sokak', emoji: '🚏', label: 'Sokak', min: 'A1',
    desc: 'Nerede? Yol ve yer sorma',
    topics: ['questions', 'location', 'directions']
  },
  {
    id: 'park', emoji: '🌳', label: 'Park', min: 'A1',
    desc: 'Günlük hayat, sevdiklerin, planlar',
    topics: ['routines', 'likes', 'plans', 'obligation', 'negatives']
  },
  {
    id: 'carsi', emoji: '🛒', label: 'Çarşı', min: 'A2',
    desc: 'Alışveriş: isteme, fiyat sorma',
    topics: ['shopping', 'requests', 'needs', 'exclaim']
  },
  {
    id: 'nezaket', emoji: '🤝', label: 'Nezaket Okulu', min: 'B1',
    desc: 'Kibar ricalar',
    topics: ['polite-requests']
  },
  {
    id: 'ofis', emoji: '💼', label: 'Ofis', min: 'B1',
    desc: 'Fikir belirtme, tartışma',
    topics: ['opinions', 'nuance']
  },
  {
    id: 'akis', emoji: '🚀', label: 'Serbest Akış', min: 'A0',
    desc: 'Her şey karışık — sadece kaydır',
    topics: null
  }
];

export function getShortLocation(id) {
  return SHORT_LOCATIONS.find(l => l.id === id) || null;
}
