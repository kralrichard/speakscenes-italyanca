// Tappable-word glossary + grammar notes for Story Mode. Keyed by the
// lowercase word so the conversation screen can look up any word the learner
// taps in an NPC line or their own sentence. Not exhaustive — it covers the
// content/travel words that actually appear in the scenarios. Words not found
// here fall back to a "no entry yet" popup rather than breaking.

// StoryWord = { word, tr, type, definition, example, exampleTr, related? }
const WORDS = [
  { word: 'prenotazione', tr: 'rezervasyon', type: 'isim (la)',
    definition: 'Bir oda, masa ya da koltuğun sizin için ayrılması.',
    example: 'Ho una prenotazione per due notti.', exampleTr: 'İki geceliğine rezervasyonum var.', related: ['prenotare'] },
  { word: 'colazione', tr: 'kahvaltı', type: 'isim (la)',
    definition: 'Sabah yenen ilk öğün.',
    example: 'La colazione è inclusa nel prezzo?', exampleTr: 'Kahvaltı fiyata dahil mi?', related: ['incluso'] },
  { word: 'incluso', tr: 'dahil', type: 'sıfat',
    definition: 'Fiyatın içinde olan.',
    example: 'La colazione è inclusa.', exampleTr: 'Kahvaltı dahil.' },
  { word: 'disponibile', tr: 'müsait / boş', type: 'sıfat',
    definition: 'Kullanılabilir ya da elde edilebilir; boş.',
    example: 'Avete stanze disponibili?', exampleTr: 'Boş odanız var mı?' },
  { word: 'chiave', tr: 'anahtar', type: 'isim (la)',
    definition: 'Kapıyı açmaya yarayan nesne.',
    example: 'Ecco la sua chiave.', exampleTr: 'İşte anahtarınız.' },
  { word: 'imbarco', tr: 'biniş', type: 'isim (il)',
    definition: 'Uçağa, gemiye ya da trene binme işlemi.',
    example: 'L’imbarco inizia alle 10:40.', exampleTr: 'Biniş 10:40’ta başlıyor.', related: ['gate', 'volo'] },
  { word: 'gate', tr: 'kapı (uçuş)', type: 'isim (il)',
    definition: 'Havalimanında uçağa bindiğiniz yer.',
    example: 'Imbarcherà al gate B12.', exampleTr: 'B12 kapısından bineceksiniz.' },
  { word: 'ritardo', tr: 'gecikme / rötar', type: 'isim (il)',
    definition: 'Bekleme süresi; geç kalma durumu.',
    example: 'Il mio volo era in ritardo.', exampleTr: 'Uçuşum rötar yaptı.' },
  { word: 'bagaglio', tr: 'bagaj / valiz', type: 'isim (il)',
    definition: 'Yolculukta taşınan çanta ve valizler.',
    example: 'Ho un bagaglio da imbarcare.', exampleTr: 'Check-in için bir valizim var.', related: ['valigia'] },
  { word: 'ricetta', tr: 'reçete', type: 'isim (la)',
    definition: 'Doktorun ilaç için yazdığı belge.',
    example: 'Vorrei ritirare questa ricetta.', exampleTr: 'Bu reçeteyi doldurtmak istiyorum.' },
  { word: 'sintomi', tr: 'belirtiler', type: 'isim (i)',
    definition: 'Hasta olduğunuzu gösteren işaretler.',
    example: 'Quando sono iniziati i sintomi?', exampleTr: 'Belirtileriniz ne zaman başladı?' },
  { word: 'sonnolenza', tr: 'uyku hâli / uyuşukluk', type: 'isim (la)',
    definition: 'Uykulu olma, tam uyanık olmama hâli.',
    example: 'Questo medicinale può dare sonnolenza.', exampleTr: 'Bu ilaç sizi uykulu yapabilir.' },
  { word: 'allergico', tr: 'alerjik', type: 'sıfat',
    definition: 'Bir şeye karşı kötü bir vücut tepkisi olan.',
    example: 'Sono allergico alla frutta secca.', exampleTr: 'Fındık/fıstığa alerjim var.' },
  { word: 'consigliare', tr: 'önermek / tavsiye etmek', type: 'fiil',
    definition: 'Bir şeyin iyi olduğunu önermek.',
    example: 'Cosa mi consiglia?', exampleTr: 'Ne önerirsiniz?' },
  { word: 'risarcimento', tr: 'tazminat / telafi', type: 'isim (il)',
    definition: 'Bir zahmet ya da kayıp için verilen şey.',
    example: 'Mi aspetterei un risarcimento.', exampleTr: 'Bir telafi beklerdim.' },
  { word: 'malinteso', tr: 'yanlış anlaşılma', type: 'isim (il)',
    definition: 'Bir şeyi doğru anlamama durumu.',
    example: 'Credo ci sia stato un malinteso.', exampleTr: 'Sanırım bir yanlış anlaşılma oldu.' },
  { word: 'delegare', tr: 'yetki devretmek', type: 'fiil',
    definition: 'Bir işi başka birine vermek.',
    example: 'Sto imparando a delegare di più.', exampleTr: 'Daha fazla yetki devretmeyi öğreniyorum.' },
  { word: 'responsabilità', tr: 'sorumluluk', type: 'isim (la)',
    definition: 'Üstlenmen gereken bir görev.',
    example: 'Voglio assumere più responsabilità.', exampleTr: 'Daha fazla sorumluluk almak istiyorum.' },
  { word: 'scusarsi', tr: 'özür dilemek', type: 'fiil',
    definition: 'Üzgün olduğunu söylemek.',
    example: 'Mi scuso per il disturbo.', exampleTr: 'Zahmet için özür dilerim.' },
  { word: 'indicazioni', tr: 'yol tarifi', type: 'isim (le)',
    definition: 'Bir yere nasıl gidileceğine dair açıklamalar.',
    example: 'Può darmi le indicazioni per la stazione?', exampleTr: 'Bana istasyona yol tarifi verir misiniz?' },
  { word: 'farmacia', tr: 'eczane', type: 'isim (la)',
    definition: 'İlaç satılan yer.',
    example: 'Dov’è la farmacia più vicina?', exampleTr: 'En yakın eczane nerede?', related: ['vicino'] },
  { word: 'rimborso', tr: 'para iadesi', type: 'isim (il)',
    definition: 'İade edilen bir ürün için geri verilen para.',
    example: 'Vorrei un rimborso, per favore.', exampleTr: 'Para iadesi istiyorum, lütfen.', related: ['cambiare'] },
  { word: 'cambiare', tr: 'değiştirmek / değişim', type: 'fiil',
    definition: 'Bir şeyi başka bir şeyle değiştirmek.',
    example: 'Posso cambiarla con una taglia più grande?', exampleTr: 'Daha büyük bedenle değiştirebilir miyim?' },
  { word: 'scontrino', tr: 'fiş / makbuz', type: 'isim (lo)',
    definition: 'Ne ödediğinizi gösteren kâğıt.',
    example: 'Ha lo scontrino?', exampleTr: 'Fişiniz var mı?' },
  { word: 'corsia', tr: 'reyon / koridor', type: 'isim (la)',
    definition: 'Bir mağazada raflar arasındaki geçit.',
    example: 'Il latte è nella corsia quattro.', exampleTr: 'Süt dördüncü koridorda.' },
  { word: 'binario', tr: 'peron', type: 'isim (il)',
    definition: 'İstasyonda trene bindiğiniz yer.',
    example: 'Il treno parte dal binario tre.', exampleTr: 'Tren üç numaralı perondan kalkıyor.' },
  { word: 'biglietto', tr: 'bilet', type: 'isim (il)',
    definition: 'Yolculuk ya da giriş için ödenen kâğıt.',
    example: 'Un biglietto per Londra, per favore.', exampleTr: 'Londra’ya bir bilet, lütfen.' },
  { word: 'bloccare', tr: 'bloke etmek', type: 'fiil',
    definition: 'Bir kartın kullanılmasını durdurmak.',
    example: 'Può bloccare la mia carta?', exampleTr: 'Kartımı bloke edebilir misiniz?' },
  { word: 'denuncia', tr: 'tutanak / şikâyet', type: 'isim (la)',
    definition: 'Polise verilen resmi bildirim.',
    example: 'Vorrei fare una denuncia.', exampleTr: 'Bir tutanak tutturmak istiyorum.' },
  { word: 'assicurazione', tr: 'sigorta', type: 'isim (la)',
    definition: 'Zarar durumunda ödeme yapan koruma sistemi.',
    example: 'Mi serve per l’assicurazione.', exampleTr: 'Sigortam için gerekiyor.' }
];

export const STORY_VOCAB = Object.fromEntries(WORDS.map(w => [w.word.toLowerCase(), w]));

/** Look up a tapped word (strips punctuation, lowercases). Returns the entry
 *  or a minimal fallback object so the popup always has something to show. */
export function lookupWord(raw) {
  const key = String(raw).toLowerCase().replace(/[^a-zàèéìòù'’-]/g, '');
  if (STORY_VOCAB[key]) return STORY_VOCAB[key];
  // try singular (drop trailing plural vowel → -a / -o)
  if ((key.endsWith('i') || key.endsWith('e')) && STORY_VOCAB[key.slice(0, -1) + 'a']) return STORY_VOCAB[key.slice(0, -1) + 'a'];
  if ((key.endsWith('i') || key.endsWith('e')) && STORY_VOCAB[key.slice(0, -1) + 'o']) return STORY_VOCAB[key.slice(0, -1) + 'o'];
  return { word: key, tr: null, type: null, definition: null, example: null };
}

// Per-choice grammar notes, keyed by "scenarioId::choiceId". Only the trickier
// sentences get an explanation; the UI shows a generic "tap words to learn"
// hint when there's no specific note. Kept small on purpose — extendable.
export const GRAMMAR_NOTES = {
  'asking-directions::ask_pharmacy': {
    title: 'Dolaylı soru (domanda indiretta)',
    points: [
      '“Può dirmi…” kibar bir soru kalıbıdır.',
      'İç cümlede “dov’è la farmacia più vicina” diye devam eder.',
      'Doğrudan soru da aynı sırayı kullanır: “Dov’è la farmacia?”'
    ]
  },
  'hotel-checkin::confirm': {
    title: 'avere + una prenotazione',
    points: [
      '“Ho una prenotazione” — şu anki bir durum için şimdiki zaman (presente).',
      '“a nome Alex” rezervasyonun kimin adına olduğunu söyler.'
    ]
  },
  'missing-flight::explain': {
    title: 'Neden anlatmak',
    points: [
      '“era in ritardo” — geçmişte olan gecikmeyi anlatır (imperfetto).',
      '“così non sono riuscito a…” gecikmenin sonucunu gösterir.'
    ]
  },
  'job-interview::honest_weakness': {
    title: 'in passato + imparare a',
    points: [
      '“In passato mi caricavo di troppo” = değişmiş eski bir alışkanlık.',
      '“sto imparando a delegare” gelişimi gösterir — güçlü bir mülakat hamlesi.'
    ]
  }
};
