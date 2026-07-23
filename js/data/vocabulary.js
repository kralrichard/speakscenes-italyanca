// A0/A1 word catalog. Powers the Object Hunt and Memory Match mini-games,
// Word Builder's target words, and the vocabulary tap-popup system. Every
// entry is real content (word + Turkish meaning + example), not a
// placeholder -- these are the words an A0/A1 learner meets first: people,
// food, animals, actions, greetings, colors, numbers, everyday objects.
//
// VocabWord = {
//   id, word, translation_tr, emoji, level: 'A0'|'A1',
//   category, exampleSentence, exampleSentence_tr
// }

export const VOCABULARY = [
  // ---- people ----
  { id: 'mom', word: 'mamma', translation_tr: 'anne', emoji: '👩', level: 'A0', category: 'people', exampleSentence: 'Voglio bene alla mia mamma.', exampleSentence_tr: 'Annemi seviyorum.' },
  { id: 'dad', word: 'papà', translation_tr: 'baba', emoji: '👨', level: 'A0', category: 'people', exampleSentence: 'Il mio papà è alto.', exampleSentence_tr: 'Babam uzun boylu.' },
  { id: 'baby', word: 'bebè', translation_tr: 'bebek', emoji: '👶', level: 'A0', category: 'people', exampleSentence: 'Il bebè sta dormendo.', exampleSentence_tr: 'Bebek uyuyor.' },
  { id: 'friend', word: 'amico', translation_tr: 'arkadaş', emoji: '🧑‍🤝‍🧑', level: 'A1', category: 'people', exampleSentence: 'Lei è la mia migliore amica.', exampleSentence_tr: 'O benim en iyi arkadaşım.' },
  { id: 'boy', word: 'bambino', translation_tr: 'erkek çocuk', emoji: '👦', level: 'A0', category: 'people', exampleSentence: 'Il bambino sta giocando.', exampleSentence_tr: 'Erkek çocuk oynuyor.' },
  { id: 'girl', word: 'bambina', translation_tr: 'kız çocuk', emoji: '👧', level: 'A0', category: 'people', exampleSentence: 'La bambina è felice.', exampleSentence_tr: 'Kız çocuk mutlu.' },
  { id: 'teacher', word: 'insegnante', translation_tr: 'öğretmen', emoji: '🧑‍🏫', level: 'A1', category: 'people', exampleSentence: 'Il mio insegnante è gentile.', exampleSentence_tr: 'Öğretmenim naziktir.' },

  // ---- food & drink ----
  { id: 'water', word: 'acqua', translation_tr: 'su', emoji: '💧', level: 'A0', category: 'food', exampleSentence: 'Voglio dell’acqua.', exampleSentence_tr: 'Su istiyorum.' },
  { id: 'milk', word: 'latte', translation_tr: 'süt', emoji: '🥛', level: 'A0', category: 'food', exampleSentence: 'Il bebè beve il latte.', exampleSentence_tr: 'Bebek süt içiyor.' },
  { id: 'apple', word: 'mela', translation_tr: 'elma', emoji: '🍎', level: 'A0', category: 'food', exampleSentence: 'Mangio una mela.', exampleSentence_tr: 'Bir elma yiyorum.' },
  { id: 'banana', word: 'banana', translation_tr: 'muz', emoji: '🍌', level: 'A0', category: 'food', exampleSentence: 'La scimmia ama le banane.', exampleSentence_tr: 'Maymun muz sever.' },
  { id: 'bread', word: 'pane', translation_tr: 'ekmek', emoji: '🍞', level: 'A1', category: 'food', exampleSentence: 'Mangiamo il pane ogni giorno.', exampleSentence_tr: 'Her gün ekmek yeriz.' },
  { id: 'egg', word: 'uovo', translation_tr: 'yumurta', emoji: '🥚', level: 'A1', category: 'food', exampleSentence: 'Ho mangiato un uovo a colazione.', exampleSentence_tr: 'Kahvaltıda yumurta yedim.' },
  { id: 'cheese', word: 'formaggio', translation_tr: 'peynir', emoji: '🧀', level: 'A1', category: 'food', exampleSentence: 'A lei piace il formaggio.', exampleSentence_tr: 'O peyniri sever.' },
  { id: 'cookie', word: 'biscotto', translation_tr: 'kurabiye', emoji: '🍪', level: 'A0', category: 'food', exampleSentence: 'Posso avere un biscotto?', exampleSentence_tr: 'Bir kurabiye alabilir miyim?' },
  { id: 'juice', word: 'succo', translation_tr: 'meyve suyu', emoji: '🧃', level: 'A1', category: 'food', exampleSentence: 'Bevo il succo d’arancia.', exampleSentence_tr: 'Portakal suyu içerim.' },

  // ---- animals ----
  { id: 'cat', word: 'gatto', translation_tr: 'kedi', emoji: '🐱', level: 'A0', category: 'animals', exampleSentence: 'Il gatto sta dormendo.', exampleSentence_tr: 'Kedi uyuyor.' },
  { id: 'dog', word: 'cane', translation_tr: 'köpek', emoji: '🐶', level: 'A0', category: 'animals', exampleSentence: 'Il cane sta correndo.', exampleSentence_tr: 'Köpek koşuyor.' },
  { id: 'bird', word: 'uccello', translation_tr: 'kuş', emoji: '🐦', level: 'A0', category: 'animals', exampleSentence: 'L’uccello sa volare.', exampleSentence_tr: 'Kuş uçabilir.' },
  { id: 'fish', word: 'pesce', translation_tr: 'balık', emoji: '🐟', level: 'A0', category: 'animals', exampleSentence: 'Il pesce nuota nell’acqua.', exampleSentence_tr: 'Balık suda yüzer.' },
  { id: 'horse', word: 'cavallo', translation_tr: 'at', emoji: '🐴', level: 'A1', category: 'animals', exampleSentence: 'Il cavallo corre veloce.', exampleSentence_tr: 'At hızlı koşar.' },
  { id: 'rabbit', word: 'coniglio', translation_tr: 'tavşan', emoji: '🐰', level: 'A1', category: 'animals', exampleSentence: 'Il coniglio è piccolo.', exampleSentence_tr: 'Tavşan küçüktür.' },

  // ---- actions ----
  { id: 'eat', word: 'mangiare', translation_tr: 'yemek', emoji: '🍽️', level: 'A0', category: 'actions', exampleSentence: 'Faccio colazione alle otto.', exampleSentence_tr: 'Sekizde kahvaltı yaparım.' },
  { id: 'drink', word: 'bere', translation_tr: 'içmek', emoji: '🥤', level: 'A0', category: 'actions', exampleSentence: 'Bevo acqua ogni giorno.', exampleSentence_tr: 'Her gün su içerim.' },
  { id: 'sleep', word: 'dormire', translation_tr: 'uyumak', emoji: '😴', level: 'A0', category: 'actions', exampleSentence: 'Al bebè piace dormire.', exampleSentence_tr: 'Bebek uyumayı sever.' },
  { id: 'play', word: 'giocare', translation_tr: 'oynamak', emoji: '🧸', level: 'A0', category: 'actions', exampleSentence: 'I bambini giocano al parco.', exampleSentence_tr: 'Çocuklar parkta oynar.' },
  { id: 'walk', word: 'camminare', translation_tr: 'yürümek', emoji: '🚶', level: 'A1', category: 'actions', exampleSentence: 'Andiamo a scuola a piedi.', exampleSentence_tr: 'Okula yürüyerek gideriz.' },
  { id: 'run', word: 'correre', translation_tr: 'koşmak', emoji: '🏃', level: 'A1', category: 'actions', exampleSentence: 'Sa correre molto veloce.', exampleSentence_tr: 'O çok hızlı koşabilir.' },
  { id: 'read', word: 'leggere', translation_tr: 'okumak', emoji: '📖', level: 'A1', category: 'actions', exampleSentence: 'Leggo un libro ogni sera.', exampleSentence_tr: 'Her gece bir kitap okurum.' },
  { id: 'sing', word: 'cantare', translation_tr: 'şarkı söylemek', emoji: '🎵', level: 'A1', category: 'actions', exampleSentence: 'A lei piace cantare.', exampleSentence_tr: 'O şarkı söylemeyi sever.' },

  // ---- greetings & small words ----
  { id: 'hello', word: 'ciao', translation_tr: 'merhaba', emoji: '👋', level: 'A0', category: 'greetings', exampleSentence: 'Ciao! Piacere di conoscerti.', exampleSentence_tr: 'Merhaba! Tanıştığımıza memnun oldum.' },
  { id: 'bye', word: 'arrivederci', translation_tr: 'hoşça kal', emoji: '👋', level: 'A0', category: 'greetings', exampleSentence: 'Arrivederci! A presto.', exampleSentence_tr: 'Hoşça kal! Yakında görüşürüz.' },
  { id: 'yes', word: 'sì', translation_tr: 'evet', emoji: '✅', level: 'A0', category: 'greetings', exampleSentence: 'Sì, ne vorrei un po’.', exampleSentence_tr: 'Evet, biraz isterim.' },
  { id: 'no', word: 'no', translation_tr: 'hayır', emoji: '❌', level: 'A0', category: 'greetings', exampleSentence: 'No, grazie.', exampleSentence_tr: 'Hayır, teşekkür ederim.' },
  { id: 'please', word: 'per favore', translation_tr: 'lütfen', emoji: '🙏', level: 'A1', category: 'greetings', exampleSentence: 'Acqua, per favore.', exampleSentence_tr: 'Su, lütfen.' },
  { id: 'thankyou', word: 'grazie', translation_tr: 'teşekkür ederim', emoji: '🙏', level: 'A1', category: 'greetings', exampleSentence: 'Grazie mille.', exampleSentence_tr: 'Çok teşekkür ederim.' },
  { id: 'sorry', word: 'scusa', translation_tr: 'özür dilerim', emoji: '😔', level: 'A1', category: 'greetings', exampleSentence: 'Scusa, sono in ritardo.', exampleSentence_tr: 'Özür dilerim, geç kaldım.' },

  // ---- colors ----
  { id: 'red', word: 'rosso', translation_tr: 'kırmızı', emoji: '🔴', level: 'A0', category: 'colors', exampleSentence: 'La mela è rossa.', exampleSentence_tr: 'Elma kırmızı.' },
  { id: 'blue', word: 'blu', translation_tr: 'mavi', emoji: '🔵', level: 'A0', category: 'colors', exampleSentence: 'Il cielo è blu.', exampleSentence_tr: 'Gökyüzü mavi.' },
  { id: 'green', word: 'verde', translation_tr: 'yeşil', emoji: '🟢', level: 'A0', category: 'colors', exampleSentence: 'L’erba è verde.', exampleSentence_tr: 'Çim yeşil.' },
  { id: 'yellow', word: 'giallo', translation_tr: 'sarı', emoji: '🟡', level: 'A0', category: 'colors', exampleSentence: 'La banana è gialla.', exampleSentence_tr: 'Muz sarı.' },

  // ---- numbers ----
  { id: 'one', word: 'uno', translation_tr: 'bir', emoji: '1️⃣', level: 'A0', category: 'numbers', exampleSentence: 'Ho un fratello.', exampleSentence_tr: 'Bir erkek kardeşim var.' },
  { id: 'two', word: 'due', translation_tr: 'iki', emoji: '2️⃣', level: 'A0', category: 'numbers', exampleSentence: 'Ho due gatti.', exampleSentence_tr: 'İki kedim var.' },
  { id: 'three', word: 'tre', translation_tr: 'üç', emoji: '3️⃣', level: 'A0', category: 'numbers', exampleSentence: 'Tre libri sono sul tavolo.', exampleSentence_tr: 'Masada üç kitap var.' },

  // ---- objects ----
  { id: 'ball', word: 'palla', translation_tr: 'top', emoji: '⚽', level: 'A0', category: 'objects', exampleSentence: 'Il bambino gioca con la palla.', exampleSentence_tr: 'Çocuk topla oynuyor.' },
  { id: 'book', word: 'libro', translation_tr: 'kitap', emoji: '📕', level: 'A0', category: 'objects', exampleSentence: 'Leggo un libro.', exampleSentence_tr: 'Bir kitap okurum.' },
  { id: 'car', word: 'macchina', translation_tr: 'araba', emoji: '🚗', level: 'A0', category: 'objects', exampleSentence: 'La macchina è veloce.', exampleSentence_tr: 'Araba hızlı.' },
  { id: 'house', word: 'casa', translation_tr: 'ev', emoji: '🏠', level: 'A0', category: 'objects', exampleSentence: 'Questa è la mia casa.', exampleSentence_tr: 'Bu benim evim.' },
  { id: 'bed', word: 'letto', translation_tr: 'yatak', emoji: '🛏️', level: 'A0', category: 'objects', exampleSentence: 'Dormo nel mio letto.', exampleSentence_tr: 'Yatağımda uyurum.' },
  { id: 'chair', word: 'sedia', translation_tr: 'sandalye', emoji: '🪑', level: 'A1', category: 'objects', exampleSentence: 'Siediti sulla sedia, per favore.', exampleSentence_tr: 'Lütfen sandalyeye otur.' },
  { id: 'phone', word: 'telefono', translation_tr: 'telefon', emoji: '📱', level: 'A1', category: 'objects', exampleSentence: 'Il mio telefono è nuovo.', exampleSentence_tr: 'Telefonum yeni.' },
  { id: 'bag', word: 'borsa', translation_tr: 'çanta', emoji: '🎒', level: 'A1', category: 'objects', exampleSentence: 'Lei ha una borsa rossa.', exampleSentence_tr: 'Onun kırmızı bir çantası var.' },
  { id: 'umbrella', word: 'ombrello', translation_tr: 'şemsiye', emoji: '☂️', level: 'A1', category: 'objects', exampleSentence: 'Prendi l’ombrello, sta piovendo.', exampleSentence_tr: 'Şemsiyeni al, yağmur yağıyor.' },
  { id: 'key', word: 'chiave', translation_tr: 'anahtar', emoji: '🔑', level: 'A1', category: 'objects', exampleSentence: 'Dov’è la mia chiave?', exampleSentence_tr: 'Anahtarım nerede?' },

  // ---- feelings ----
  { id: 'happy', word: 'felice', translation_tr: 'mutlu', emoji: '😊', level: 'A1', category: 'feelings', exampleSentence: 'Oggi sono felice.', exampleSentence_tr: 'Bugün mutluyum.' },
  { id: 'sad', word: 'triste', translation_tr: 'üzgün', emoji: '😢', level: 'A1', category: 'feelings', exampleSentence: 'Sembra triste.', exampleSentence_tr: 'Üzgün görünüyor.' },
  { id: 'tired', word: 'stanco', translation_tr: 'yorgun', emoji: '😪', level: 'A1', category: 'feelings', exampleSentence: 'Sono stanco dopo la scuola.', exampleSentence_tr: 'Okuldan sonra yorgunum.' },
  { id: 'hungry', word: 'affamato', translation_tr: 'aç', emoji: '🍽️', level: 'A1', category: 'feelings', exampleSentence: 'Ho fame, mangiamo.', exampleSentence_tr: 'Açım, hadi yiyelim.' }
];

export function getVocabById(id) {
  return VOCABULARY.find(v => v.id === id);
}

export function getVocabByLevel(level) {
  return VOCABULARY.filter(v => v.level === level);
}

export function getVocabByCategory(category) {
  return VOCABULARY.filter(v => v.category === category);
}
