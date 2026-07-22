// A0/A1 word catalog. Powers the Object Hunt and Memory Match mini-games,
// Word Builder's target words, and the vocabulary tap-popup system. Every
// entry is real content (word + Turkish meaning + IPA + example), not a
// placeholder -- these are the words an A0/A1 learner meets first: people,
// food, animals, actions, greetings, colors, numbers, everyday objects.
//
// VocabWord = {
//   id, word, translation_tr, ipa, emoji, level: 'A0'|'A1',
//   category, exampleSentence, exampleSentence_tr
// }

export const VOCABULARY = [
  // ---- people ----
  { id: 'mom', word: 'mom', translation_tr: 'anne', ipa: '/mɒm/', emoji: '👩', level: 'A0', category: 'people', exampleSentence: 'I love my mom.', exampleSentence_tr: 'Annemi seviyorum.' },
  { id: 'dad', word: 'dad', translation_tr: 'baba', ipa: '/dæd/', emoji: '👨', level: 'A0', category: 'people', exampleSentence: 'My dad is tall.', exampleSentence_tr: 'Babam uzun boylu.' },
  { id: 'baby', word: 'baby', translation_tr: 'bebek', ipa: '/ˈbeɪbi/', emoji: '👶', level: 'A0', category: 'people', exampleSentence: 'The baby is sleeping.', exampleSentence_tr: 'Bebek uyuyor.' },
  { id: 'friend', word: 'friend', translation_tr: 'arkadaş', ipa: '/frɛnd/', emoji: '🧑‍🤝‍🧑', level: 'A1', category: 'people', exampleSentence: 'She is my best friend.', exampleSentence_tr: 'O benim en iyi arkadaşım.' },
  { id: 'boy', word: 'boy', translation_tr: 'erkek çocuk', ipa: '/bɔɪ/', emoji: '👦', level: 'A0', category: 'people', exampleSentence: 'The boy is playing.', exampleSentence_tr: 'Erkek çocuk oynuyor.' },
  { id: 'girl', word: 'girl', translation_tr: 'kız çocuk', ipa: '/ɡɜːrl/', emoji: '👧', level: 'A0', category: 'people', exampleSentence: 'The girl is happy.', exampleSentence_tr: 'Kız çocuk mutlu.' },
  { id: 'teacher', word: 'teacher', translation_tr: 'öğretmen', ipa: '/ˈtiːtʃər/', emoji: '🧑‍🏫', level: 'A1', category: 'people', exampleSentence: 'My teacher is kind.', exampleSentence_tr: 'Öğretmenim naziktir.' },

  // ---- food & drink ----
  { id: 'water', word: 'water', translation_tr: 'su', ipa: '/ˈwɔːtər/', emoji: '💧', level: 'A0', category: 'food', exampleSentence: 'I want water.', exampleSentence_tr: 'Su istiyorum.' },
  { id: 'milk', word: 'milk', translation_tr: 'süt', ipa: '/mɪlk/', emoji: '🥛', level: 'A0', category: 'food', exampleSentence: 'The baby drinks milk.', exampleSentence_tr: 'Bebek süt içiyor.' },
  { id: 'apple', word: 'apple', translation_tr: 'elma', ipa: '/ˈæpəl/', emoji: '🍎', level: 'A0', category: 'food', exampleSentence: 'I eat an apple.', exampleSentence_tr: 'Bir elma yiyorum.' },
  { id: 'banana', word: 'banana', translation_tr: 'muz', ipa: '/bəˈnænə/', emoji: '🍌', level: 'A0', category: 'food', exampleSentence: 'The monkey likes bananas.', exampleSentence_tr: 'Maymun muz sever.' },
  { id: 'bread', word: 'bread', translation_tr: 'ekmek', ipa: '/brɛd/', emoji: '🍞', level: 'A1', category: 'food', exampleSentence: 'We eat bread every day.', exampleSentence_tr: 'Her gün ekmek yeriz.' },
  { id: 'egg', word: 'egg', translation_tr: 'yumurta', ipa: '/ɛɡ/', emoji: '🥚', level: 'A1', category: 'food', exampleSentence: 'I had an egg for breakfast.', exampleSentence_tr: 'Kahvaltıda yumurta yedim.' },
  { id: 'cheese', word: 'cheese', translation_tr: 'peynir', ipa: '/tʃiːz/', emoji: '🧀', level: 'A1', category: 'food', exampleSentence: 'She likes cheese.', exampleSentence_tr: 'O peyniri sever.' },
  { id: 'cookie', word: 'cookie', translation_tr: 'kurabiye', ipa: '/ˈkʊki/', emoji: '🍪', level: 'A0', category: 'food', exampleSentence: 'Can I have a cookie?', exampleSentence_tr: 'Bir kurabiye alabilir miyim?' },
  { id: 'juice', word: 'juice', translation_tr: 'meyve suyu', ipa: '/dʒuːs/', emoji: '🧃', level: 'A1', category: 'food', exampleSentence: 'I drink orange juice.', exampleSentence_tr: 'Portakal suyu içerim.' },

  // ---- animals ----
  { id: 'cat', word: 'cat', translation_tr: 'kedi', ipa: '/kæt/', emoji: '🐱', level: 'A0', category: 'animals', exampleSentence: 'The cat is sleeping.', exampleSentence_tr: 'Kedi uyuyor.' },
  { id: 'dog', word: 'dog', translation_tr: 'köpek', ipa: '/dɒɡ/', emoji: '🐶', level: 'A0', category: 'animals', exampleSentence: 'The dog is running.', exampleSentence_tr: 'Köpek koşuyor.' },
  { id: 'bird', word: 'bird', translation_tr: 'kuş', ipa: '/bɜːrd/', emoji: '🐦', level: 'A0', category: 'animals', exampleSentence: 'The bird can fly.', exampleSentence_tr: 'Kuş uçabilir.' },
  { id: 'fish', word: 'fish', translation_tr: 'balık', ipa: '/fɪʃ/', emoji: '🐟', level: 'A0', category: 'animals', exampleSentence: 'The fish swims in the water.', exampleSentence_tr: 'Balık suda yüzer.' },
  { id: 'horse', word: 'horse', translation_tr: 'at', ipa: '/hɔːrs/', emoji: '🐴', level: 'A1', category: 'animals', exampleSentence: 'The horse runs fast.', exampleSentence_tr: 'At hızlı koşar.' },
  { id: 'rabbit', word: 'rabbit', translation_tr: 'tavşan', ipa: '/ˈræbɪt/', emoji: '🐰', level: 'A1', category: 'animals', exampleSentence: 'The rabbit is small.', exampleSentence_tr: 'Tavşan küçüktür.' },

  // ---- actions ----
  { id: 'eat', word: 'eat', translation_tr: 'yemek', ipa: '/iːt/', emoji: '🍽️', level: 'A0', category: 'actions', exampleSentence: 'I eat breakfast at eight.', exampleSentence_tr: 'Sekizde kahvaltı yaparım.' },
  { id: 'drink', word: 'drink', translation_tr: 'içmek', ipa: '/drɪŋk/', emoji: '🥤', level: 'A0', category: 'actions', exampleSentence: 'I drink water every day.', exampleSentence_tr: 'Her gün su içerim.' },
  { id: 'sleep', word: 'sleep', translation_tr: 'uyumak', ipa: '/sliːp/', emoji: '😴', level: 'A0', category: 'actions', exampleSentence: 'The baby likes to sleep.', exampleSentence_tr: 'Bebek uyumayı sever.' },
  { id: 'play', word: 'play', translation_tr: 'oynamak', ipa: '/pleɪ/', emoji: '🧸', level: 'A0', category: 'actions', exampleSentence: 'The children play in the park.', exampleSentence_tr: 'Çocuklar parkta oynar.' },
  { id: 'walk', word: 'walk', translation_tr: 'yürümek', ipa: '/wɔːk/', emoji: '🚶', level: 'A1', category: 'actions', exampleSentence: 'We walk to school.', exampleSentence_tr: 'Okula yürüyerek gideriz.' },
  { id: 'run', word: 'run', translation_tr: 'koşmak', ipa: '/rʌn/', emoji: '🏃', level: 'A1', category: 'actions', exampleSentence: 'He can run very fast.', exampleSentence_tr: 'O çok hızlı koşabilir.' },
  { id: 'read', word: 'read', translation_tr: 'okumak', ipa: '/riːd/', emoji: '📖', level: 'A1', category: 'actions', exampleSentence: 'I read a book every night.', exampleSentence_tr: 'Her gece bir kitap okurum.' },
  { id: 'sing', word: 'sing', translation_tr: 'şarkı söylemek', ipa: '/sɪŋ/', emoji: '🎵', level: 'A1', category: 'actions', exampleSentence: 'She likes to sing.', exampleSentence_tr: 'O şarkı söylemeyi sever.' },

  // ---- greetings & small words ----
  { id: 'hello', word: 'hello', translation_tr: 'merhaba', ipa: '/həˈloʊ/', emoji: '👋', level: 'A0', category: 'greetings', exampleSentence: 'Hello! Nice to meet you.', exampleSentence_tr: 'Merhaba! Tanıştığımıza memnun oldum.' },
  { id: 'bye', word: 'bye', translation_tr: 'hoşça kal', ipa: '/baɪ/', emoji: '👋', level: 'A0', category: 'greetings', exampleSentence: 'Bye! See you soon.', exampleSentence_tr: 'Hoşça kal! Yakında görüşürüz.' },
  { id: 'yes', word: 'yes', translation_tr: 'evet', ipa: '/jɛs/', emoji: '✅', level: 'A0', category: 'greetings', exampleSentence: 'Yes, I would like some.', exampleSentence_tr: 'Evet, biraz isterim.' },
  { id: 'no', word: 'no', translation_tr: 'hayır', ipa: '/noʊ/', emoji: '❌', level: 'A0', category: 'greetings', exampleSentence: 'No, thank you.', exampleSentence_tr: 'Hayır, teşekkür ederim.' },
  { id: 'please', word: 'please', translation_tr: 'lütfen', ipa: '/pliːz/', emoji: '🙏', level: 'A1', category: 'greetings', exampleSentence: 'Water, please.', exampleSentence_tr: 'Su, lütfen.' },
  { id: 'thankyou', word: 'thank you', translation_tr: 'teşekkür ederim', ipa: '/ˈθæŋk juː/', emoji: '🙏', level: 'A1', category: 'greetings', exampleSentence: 'Thank you very much.', exampleSentence_tr: 'Çok teşekkür ederim.' },
  { id: 'sorry', word: 'sorry', translation_tr: 'özür dilerim', ipa: '/ˈsɒri/', emoji: '😔', level: 'A1', category: 'greetings', exampleSentence: 'Sorry, I am late.', exampleSentence_tr: 'Özür dilerim, geç kaldım.' },

  // ---- colors ----
  { id: 'red', word: 'red', translation_tr: 'kırmızı', ipa: '/rɛd/', emoji: '🔴', level: 'A0', category: 'colors', exampleSentence: 'The apple is red.', exampleSentence_tr: 'Elma kırmızı.' },
  { id: 'blue', word: 'blue', translation_tr: 'mavi', ipa: '/bluː/', emoji: '🔵', level: 'A0', category: 'colors', exampleSentence: 'The sky is blue.', exampleSentence_tr: 'Gökyüzü mavi.' },
  { id: 'green', word: 'green', translation_tr: 'yeşil', ipa: '/ɡriːn/', emoji: '🟢', level: 'A0', category: 'colors', exampleSentence: 'The grass is green.', exampleSentence_tr: 'Çim yeşil.' },
  { id: 'yellow', word: 'yellow', translation_tr: 'sarı', ipa: '/ˈjɛloʊ/', emoji: '🟡', level: 'A0', category: 'colors', exampleSentence: 'The banana is yellow.', exampleSentence_tr: 'Muz sarı.' },

  // ---- numbers ----
  { id: 'one', word: 'one', translation_tr: 'bir', ipa: '/wʌn/', emoji: '1️⃣', level: 'A0', category: 'numbers', exampleSentence: 'I have one brother.', exampleSentence_tr: 'Bir erkek kardeşim var.' },
  { id: 'two', word: 'two', translation_tr: 'iki', ipa: '/tuː/', emoji: '2️⃣', level: 'A0', category: 'numbers', exampleSentence: 'I have two cats.', exampleSentence_tr: 'İki kedim var.' },
  { id: 'three', word: 'three', translation_tr: 'üç', ipa: '/θriː/', emoji: '3️⃣', level: 'A0', category: 'numbers', exampleSentence: 'Three books are on the table.', exampleSentence_tr: 'Masada üç kitap var.' },

  // ---- objects ----
  { id: 'ball', word: 'ball', translation_tr: 'top', ipa: '/bɔːl/', emoji: '⚽', level: 'A0', category: 'objects', exampleSentence: 'The boy plays with a ball.', exampleSentence_tr: 'Çocuk topla oynuyor.' },
  { id: 'book', word: 'book', translation_tr: 'kitap', ipa: '/bʊk/', emoji: '📕', level: 'A0', category: 'objects', exampleSentence: 'I read a book.', exampleSentence_tr: 'Bir kitap okurum.' },
  { id: 'car', word: 'car', translation_tr: 'araba', ipa: '/kɑːr/', emoji: '🚗', level: 'A0', category: 'objects', exampleSentence: 'The car is fast.', exampleSentence_tr: 'Araba hızlı.' },
  { id: 'house', word: 'house', translation_tr: 'ev', ipa: '/haʊs/', emoji: '🏠', level: 'A0', category: 'objects', exampleSentence: 'This is my house.', exampleSentence_tr: 'Bu benim evim.' },
  { id: 'bed', word: 'bed', translation_tr: 'yatak', ipa: '/bɛd/', emoji: '🛏️', level: 'A0', category: 'objects', exampleSentence: 'I sleep in my bed.', exampleSentence_tr: 'Yatağımda uyurum.' },
  { id: 'chair', word: 'chair', translation_tr: 'sandalye', ipa: '/tʃɛr/', emoji: '🪑', level: 'A1', category: 'objects', exampleSentence: 'Sit on the chair, please.', exampleSentence_tr: 'Lütfen sandalyeye otur.' },
  { id: 'phone', word: 'phone', translation_tr: 'telefon', ipa: '/foʊn/', emoji: '📱', level: 'A1', category: 'objects', exampleSentence: 'My phone is new.', exampleSentence_tr: 'Telefonum yeni.' },
  { id: 'bag', word: 'bag', translation_tr: 'çanta', ipa: '/bæɡ/', emoji: '🎒', level: 'A1', category: 'objects', exampleSentence: 'She has a red bag.', exampleSentence_tr: 'Onun kırmızı bir çantası var.' },
  { id: 'umbrella', word: 'umbrella', translation_tr: 'şemsiye', ipa: '/ʌmˈbrɛlə/', emoji: '☂️', level: 'A1', category: 'objects', exampleSentence: 'Take your umbrella, it is raining.', exampleSentence_tr: 'Şemsiyeni al, yağmur yağıyor.' },
  { id: 'key', word: 'key', translation_tr: 'anahtar', ipa: '/kiː/', emoji: '🔑', level: 'A1', category: 'objects', exampleSentence: 'Where is my key?', exampleSentence_tr: 'Anahtarım nerede?' },

  // ---- feelings ----
  { id: 'happy', word: 'happy', translation_tr: 'mutlu', ipa: '/ˈhæpi/', emoji: '😊', level: 'A1', category: 'feelings', exampleSentence: 'I am happy today.', exampleSentence_tr: 'Bugün mutluyum.' },
  { id: 'sad', word: 'sad', translation_tr: 'üzgün', ipa: '/sæd/', emoji: '😢', level: 'A1', category: 'feelings', exampleSentence: 'She looks sad.', exampleSentence_tr: 'Üzgün görünüyor.' },
  { id: 'tired', word: 'tired', translation_tr: 'yorgun', ipa: '/ˈtaɪərd/', emoji: '😪', level: 'A1', category: 'feelings', exampleSentence: 'I am tired after school.', exampleSentence_tr: 'Okuldan sonra yorgunum.' },
  { id: 'hungry', word: 'hungry', translation_tr: 'aç', ipa: '/ˈhʌŋɡri/', emoji: '🍽️', level: 'A1', category: 'feelings', exampleSentence: 'I am hungry, let\'s eat.', exampleSentence_tr: 'Açım, hadi yiyelim.' }
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
