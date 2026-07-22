// Tappable-word glossary + grammar notes for Story Mode. Keyed by the
// lowercase word so the conversation screen can look up any word the learner
// taps in an NPC line or their own sentence. Not exhaustive — it covers the
// content/travel words that actually appear in the scenarios. Words not found
// here fall back to a "no entry yet" popup rather than breaking.

// StoryWord = { word, tr, type, ipa, definition, example, exampleTr, related? }
const WORDS = [
  { word: 'reservation', tr: 'rezervasyon', type: 'noun', ipa: '/ˌrez.əˈveɪ.ʃən/',
    definition: 'An arrangement to keep a room, table, or seat for you.',
    example: 'I have a reservation for two nights.', exampleTr: 'İki geceliğine rezervasyonum var.', related: ['book', 'booking'] },
  { word: 'available', tr: 'müsait / boş', type: 'adjective', ipa: '/əˈveɪ.lə.bəl/',
    definition: 'Able to be used or obtained; free.',
    example: 'Do you have any rooms available?', exampleTr: 'Boş odanız var mı?' },
  { word: 'checkout', tr: 'çıkış (otelden)', type: 'noun', ipa: '/ˈtʃek.aʊt/',
    definition: 'The time you must leave a hotel room.',
    example: 'Late checkout is until one o’clock.', exampleTr: 'Geç çıkış saat bire kadar.' },
  { word: 'boarding', tr: 'biniş', type: 'noun', ipa: '/ˈbɔːr.dɪŋ/',
    definition: 'Getting onto a plane, ship, or train.',
    example: 'Boarding starts at 10:40.', exampleTr: 'Biniş 10:40’ta başlıyor.', related: ['gate', 'flight'] },
  { word: 'gate', tr: 'kapı (uçuş)', type: 'noun', ipa: '/ɡeɪt/',
    definition: 'The place in an airport where you get on your plane.',
    example: 'You’ll board at gate B12.', exampleTr: 'B12 kapısından bineceksiniz.' },
  { word: 'delayed', tr: 'rötarlı / gecikmiş', type: 'adjective', ipa: '/dɪˈleɪd/',
    definition: 'Made late.',
    example: 'My connecting flight was delayed.', exampleTr: 'Aktarma uçuşum rötar yaptı.' },
  { word: 'excess', tr: 'fazla', type: 'adjective', ipa: '/ɪkˈses/',
    definition: 'More than the allowed or usual amount.',
    example: 'There’s a small excess baggage fee.', exampleTr: 'Küçük bir fazla bagaj ücreti var.' },
  { word: 'prescription', tr: 'reçete', type: 'noun', ipa: '/prɪˈskrɪp.ʃən/',
    definition: 'A doctor’s written order for medicine.',
    example: 'I’d like to fill this prescription.', exampleTr: 'Bu reçeteyi doldurtmak istiyorum.' },
  { word: 'symptoms', tr: 'belirtiler', type: 'noun', ipa: '/ˈsɪmp.təmz/',
    definition: 'Signs that show you are ill.',
    example: 'When did your symptoms start?', exampleTr: 'Belirtileriniz ne zaman başladı?' },
  { word: 'drowsy', tr: 'uykulu / uyuşuk', type: 'adjective', ipa: '/ˈdraʊ.zi/',
    definition: 'Sleepy; not fully awake.',
    example: 'This medicine can make you drowsy.', exampleTr: 'Bu ilaç sizi uykulu yapabilir.' },
  { word: 'allergic', tr: 'alerjik', type: 'adjective', ipa: '/əˈlɜːr.dʒɪk/',
    definition: 'Having a bad body reaction to something.',
    example: 'I’m allergic to nuts.', exampleTr: 'Fındık/fıstığa alerjim var.' },
  { word: 'recommend', tr: 'önermek / tavsiye etmek', type: 'verb', ipa: '/ˌrek.əˈmend/',
    definition: 'To suggest that something is good.',
    example: 'What would you recommend?', exampleTr: 'Ne önerirsiniz?' },
  { word: 'compensation', tr: 'tazminat / telafi', type: 'noun', ipa: '/ˌkɒm.penˈseɪ.ʃən/',
    definition: 'Something given to make up for trouble or loss.',
    example: 'I’d expect some compensation.', exampleTr: 'Bir telafi beklerdim.' },
  { word: 'misunderstanding', tr: 'yanlış anlaşılma', type: 'noun', ipa: '/ˌmɪs.ʌn.dərˈstæn.dɪŋ/',
    definition: 'A failure to understand something correctly.',
    example: 'I think there’s been a misunderstanding.', exampleTr: 'Sanırım bir yanlış anlaşılma oldu.' },
  { word: 'delegate', tr: 'yetki devretmek', type: 'verb', ipa: '/ˈdel.ɪ.ɡeɪt/',
    definition: 'To give a task to someone else.',
    example: 'I’m learning to delegate more.', exampleTr: 'Daha fazla yetki devretmeyi öğreniyorum.' },
  { word: 'responsibility', tr: 'sorumluluk', type: 'noun', ipa: '/rɪˌspɒn.sɪˈbɪl.ə.ti/',
    definition: 'A duty you must deal with.',
    example: 'I want to take on more responsibility.', exampleTr: 'Daha fazla sorumluluk almak istiyorum.' },
  { word: 'delay', tr: 'gecikme / rötar', type: 'noun', ipa: '/dɪˈleɪ/',
    definition: 'A period of waiting; being late.',
    example: 'Sorry for the delay.', exampleTr: 'Gecikme için özür dilerim.' },
  { word: 'apologize', tr: 'özür dilemek', type: 'verb', ipa: '/əˈpɒl.ə.dʒaɪz/',
    definition: 'To say you are sorry.',
    example: 'I apologize for the trouble.', exampleTr: 'Zahmet için özür dilerim.' },
  { word: 'directions', tr: 'yol tarifi', type: 'noun', ipa: '/dɪˈrek.ʃənz/',
    definition: 'Instructions on how to get somewhere.',
    example: 'Could you give me directions to the station?', exampleTr: 'Bana istasyona yol tarifi verir misiniz?' },
  { word: 'nearest', tr: 'en yakın', type: 'adjective', ipa: '/ˈnɪə.rɪst/',
    definition: 'Closest.',
    example: 'Where is the nearest pharmacy?', exampleTr: 'En yakın eczane nerede?' },
  { word: 'refund', tr: 'para iadesi', type: 'noun', ipa: '/ˈriː.fʌnd/',
    definition: 'Money given back for a returned item.',
    example: 'I’d like a refund, please.', exampleTr: 'Para iadesi istiyorum, lütfen.', related: ['return', 'exchange'] },
  { word: 'exchange', tr: 'değişim / değiştirmek', type: 'verb', ipa: '/ɪksˈtʃeɪndʒ/',
    definition: 'To swap one thing for another.',
    example: 'Can I exchange it for a larger size?', exampleTr: 'Daha büyük bedenle değiştirebilir miyim?' },
  { word: 'receipt', tr: 'fiş / makbuz', type: 'noun', ipa: '/rɪˈsiːt/',
    definition: 'A paper showing what you paid.',
    example: 'Do you have the receipt?', exampleTr: 'Fişiniz var mı?' },
  { word: 'aisle', tr: 'reyon / koridor', type: 'noun', ipa: '/aɪl/',
    definition: 'A passage between shelves in a shop.',
    example: 'The milk is in aisle four.', exampleTr: 'Süt dördüncü koridorda.' },
  { word: 'single', tr: 'tek yön (bilet)', type: 'noun', ipa: '/ˈsɪŋ.ɡəl/',
    definition: 'A one-way ticket.',
    example: 'A single to London, please.', exampleTr: 'Londra’ya tek yön, lütfen.', related: ['return'] },
  { word: 'return', tr: 'gidiş-dönüş / iade', type: 'noun', ipa: '/rɪˈtɜːn/',
    definition: 'A round-trip ticket; or to take an item back.',
    example: 'A return ticket, please.', exampleTr: 'Gidiş-dönüş bilet, lütfen.' },
  { word: 'liable', tr: 'sorumlu', type: 'adjective', ipa: '/ˈlaɪ.ə.bəl/',
    definition: 'Legally responsible for something.',
    example: 'You won’t be liable for that payment.', exampleTr: 'O ödemeden sorumlu olmayacaksınız.' },
  { word: 'entitled', tr: 'hak sahibi', type: 'adjective', ipa: '/ɪnˈtaɪ.təld/',
    definition: 'Having the right to something.',
    example: 'You’re entitled to a full refund.', exampleTr: 'Tam para iadesine hakkınız var.' }
];

export const STORY_VOCAB = Object.fromEntries(WORDS.map(w => [w.word.toLowerCase(), w]));

/** Look up a tapped word (strips punctuation, lowercases). Returns the entry
 *  or a minimal fallback object so the popup always has something to show. */
export function lookupWord(raw) {
  const key = String(raw).toLowerCase().replace(/[^a-z'’-]/g, '');
  if (STORY_VOCAB[key]) return STORY_VOCAB[key];
  // try singular (drop trailing s)
  if (key.endsWith('s') && STORY_VOCAB[key.slice(0, -1)]) return STORY_VOCAB[key.slice(0, -1)];
  return { word: key, tr: null, type: null, ipa: null, definition: null, example: null };
}

// Per-choice grammar notes, keyed by "scenarioId::choiceId". Only the trickier
// sentences get an explanation; the UI shows a generic "tap words to learn"
// hint when there's no specific note. Kept small on purpose — extendable.
export const GRAMMAR_NOTES = {
  'asking-directions::ask_pharmacy': {
    title: 'Indirect question',
    points: [
      '“Could you tell me…” is a polite way to ask.',
      'Inside, we say “where the pharmacy is”, NOT “where is the pharmacy”.',
      'The word order changes in an indirect question — the verb goes last.'
    ]
  },
  'hotel-checkin::confirm': {
    title: 'have + a reservation',
    points: [
      '“I have a reservation” uses the present simple for a current fact.',
      '“under the name Alex” tells whose reservation it is.'
    ]
  },
  'missing-flight::explain': {
    title: 'Past simple for a reason',
    points: [
      '“was delayed” is the past passive — the flight received the delay.',
      '“so I couldn’t get here” shows the result of the delay.'
    ]
  },
  'job-interview::honest_weakness': {
    title: 'used to + learning to',
    points: [
      '“I used to take on too much” = a past habit that has changed.',
      '“I’m learning to delegate” shows growth — a strong interview move.'
    ]
  }
};
