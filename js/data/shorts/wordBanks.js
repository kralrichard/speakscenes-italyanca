// ============================================================================
// Word banks — ITALIAN. Each noun carries its indefinite + definite article
// (un/uno/una/un', il/lo/la/l') and gender so frames agree adjectives without
// a morphology engine. Articles ending in an apostrophe attach without a
// space ("un'arancia", "l'ospedale") — helpers in sentenceBank handle that.
//
// Noun = { w, ind, def, g, tr, topic }
// Adj  = { m, f, tr }         (predicative + postnominal — both agree by g)
// Verb = { inf, first, trInf, tr1, trGer }
// ============================================================================

const N = (w, ind, def, g, tr, topic) => ({ w, ind, def, g, tr, topic });

export const NOUNS = [
  // food
  N('mela', 'una', 'la', 'f', 'elma', 'food'),
  N('banana', 'una', 'la', 'f', 'muz', 'food'),
  N('arancia', "un'", "l'", 'f', 'portakal', 'food'),
  N('uovo', 'un', "l'", 'm', 'yumurta', 'food'),
  N('biscotto', 'un', 'il', 'm', 'kurabiye', 'food'),
  N('torta', 'una', 'la', 'f', 'pasta', 'food'),
  N('zuppa', 'una', 'la', 'f', 'çorba', 'food'),
  N('insalata', "un'", "l'", 'f', 'salata', 'food'),
  N('pomodoro', 'un', 'il', 'm', 'domates', 'food'),
  N('patata', 'una', 'la', 'f', 'patates', 'food'),
  N('limone', 'un', 'il', 'm', 'limon', 'food'),
  N('formaggio', 'un', 'il', 'm', 'peynir', 'food'),
  // animals
  N('cane', 'un', 'il', 'm', 'köpek', 'animals'),
  N('gatto', 'un', 'il', 'm', 'kedi', 'animals'),
  N('uccello', 'un', "l'", 'm', 'kuş', 'animals'),
  N('pesce', 'un', 'il', 'm', 'balık', 'animals'),
  N('cavallo', 'un', 'il', 'm', 'at', 'animals'),
  N('mucca', 'una', 'la', 'f', 'inek', 'animals'),
  N('pecora', 'una', 'la', 'f', 'koyun', 'animals'),
  N('coniglio', 'un', 'il', 'm', 'tavşan', 'animals'),
  N('anatra', "un'", "l'", 'f', 'ördek', 'animals'),
  N('topo', 'un', 'il', 'm', 'fare', 'animals'),
  // objects
  N('libro', 'un', 'il', 'm', 'kitap', 'objects'),
  N('penna', 'una', 'la', 'f', 'kalem', 'objects'),
  N('tavolo', 'un', 'il', 'm', 'masa', 'objects'),
  N('sedia', 'una', 'la', 'f', 'sandalye', 'objects'),
  N('letto', 'un', 'il', 'm', 'yatak', 'objects'),
  N('porta', 'una', 'la', 'f', 'kapı', 'objects'),
  N('finestra', 'una', 'la', 'f', 'pencere', 'objects'),
  N('chiave', 'una', 'la', 'f', 'anahtar', 'objects'),
  N('tazza', 'una', 'la', 'f', 'fincan', 'objects'),
  N('bicchiere', 'un', 'il', 'm', 'bardak', 'objects'),
  N('borsa', 'una', 'la', 'f', 'çanta', 'objects'),
  N('orologio', 'un', "l'", 'm', 'saat', 'objects'),
  N('lampada', 'una', 'la', 'f', 'lamba', 'objects'),
  N('telefono', 'un', 'il', 'm', 'telefon', 'objects'),
  // places
  N('casa', 'una', 'la', 'f', 'ev', 'places'),
  N('scuola', 'una', 'la', 'f', 'okul', 'places'),
  N('parco', 'un', 'il', 'm', 'park', 'places'),
  N('giardino', 'un', 'il', 'm', 'bahçe', 'places'),
  N('stanza', 'una', 'la', 'f', 'oda', 'places'),
  N('cucina', 'una', 'la', 'f', 'mutfak', 'places'),
  N('città', 'una', 'la', 'f', 'şehir', 'places'),
  N('ospedale', 'un', "l'", 'm', 'hastane', 'places'),
  N('stazione', 'una', 'la', 'f', 'istasyon', 'places'),
  N('albergo', 'un', "l'", 'm', 'otel', 'places'),
  N('ristorante', 'un', 'il', 'm', 'restoran', 'places'),
  // transport
  N('macchina', 'una', 'la', 'f', 'araba', 'transport'),
  N('autobus', 'un', "l'", 'm', 'otobüs', 'transport'),
  N('treno', 'un', 'il', 'm', 'tren', 'transport'),
  N('bicicletta', 'una', 'la', 'f', 'bisiklet', 'transport'),
  N('aereo', 'un', "l'", 'm', 'uçak', 'transport'),
  // clothes
  N('cappello', 'un', 'il', 'm', 'şapka', 'clothes'),
  N('camicia', 'una', 'la', 'f', 'gömlek', 'clothes'),
  N('scarpa', 'una', 'la', 'f', 'ayakkabı', 'clothes'),
  N('cappotto', 'un', 'il', 'm', 'palto', 'clothes'),
  N('vestito', 'un', 'il', 'm', 'elbise', 'clothes')
];

export const GOODS = NOUNS.filter(n => ['food', 'objects', 'clothes'].includes(n.topic));
export const PLACES = NOUNS.filter(n => n.topic === 'places');

export const ADJECTIVES = [
  ['grande', 'grande', 'büyük'], ['piccolo', 'piccola', 'küçük'],
  ['nuovo', 'nuova', 'yeni'], ['vecchio', 'vecchia', 'eski'],
  ['bello', 'bella', 'güzel'], ['buono', 'buona', 'iyi'],
  ['lungo', 'lunga', 'uzun'], ['corto', 'corta', 'kısa'],
  ['caldo', 'calda', 'sıcak'], ['freddo', 'fredda', 'soğuk'],
  ['pulito', 'pulita', 'temiz'], ['sporco', 'sporca', 'kirli'],
  ['veloce', 'veloce', 'hızlı'], ['lento', 'lenta', 'yavaş'],
  ['pesante', 'pesante', 'ağır'], ['leggero', 'leggera', 'hafif'],
  ['caro', 'cara', 'pahalı'], ['economico', 'economica', 'ucuz'],
  ['pieno', 'piena', 'dolu'], ['vuoto', 'vuota', 'boş']
].map(([m, f, tr]) => ({ m, f, tr }));

export const VERBS = [
  ['nuotare', 'nuoto', 'yüzmek', 'yüzüyorum', 'yüzmeyi'],
  ['correre', 'corro', 'koşmak', 'koşuyorum', 'koşmayı'],
  ['dormire', 'dormo', 'uyumak', 'uyuyorum', 'uyumayı'],
  ['leggere', 'leggo', 'okumak', 'okuyorum', 'okumayı'],
  ['scrivere', 'scrivo', 'yazmak', 'yazıyorum', 'yazmayı'],
  ['giocare', 'gioco', 'oynamak', 'oynuyorum', 'oynamayı'],
  ['lavorare', 'lavoro', 'çalışmak', 'çalışıyorum', 'çalışmayı'],
  ['imparare', 'imparo', 'öğrenmek', 'öğreniyorum', 'öğrenmeyi'],
  ['cucinare', 'cucino', 'yemek pişirmek', 'yemek pişiriyorum', 'yemek pişirmeyi'],
  ['cantare', 'canto', 'şarkı söylemek', 'şarkı söylüyorum', 'şarkı söylemeyi'],
  ['ballare', 'ballo', 'dans etmek', 'dans ediyorum', 'dans etmeyi'],
  ['aspettare', 'aspetto', 'beklemek', 'bekliyorum', 'beklemeyi'],
  ['viaggiare', 'viaggio', 'seyahat etmek', 'seyahat ediyorum', 'seyahat etmeyi'],
  ['dipingere', 'dipingo', 'resim yapmak', 'resim yapıyorum', 'resim yapmayı'],
  ['ridere', 'rido', 'gülmek', 'gülüyorum', 'gülmeyi'],
  ['studiare', 'studio', 'ders çalışmak', 'ders çalışıyorum', 'ders çalışmayı']
].map(([inf, first, trInf, tr1, trGer]) => ({ inf, first, trInf, tr1, trGer }));

// Full main clauses — opinion wrappers never re-order them, so the grammar
// stays correct (no subjunctive-triggering "penso che" constructions).
export const OPINIONS = [
  ['questa decisione è stata un errore', 'bu karar bir hataydı'],
  ['il prezzo è troppo alto', 'fiyat çok fazla yüksek'],
  ['abbiamo bisogno di un piano più chiaro', 'daha net bir plana ihtiyacımız var'],
  ['questo approccio non funzionerà', 'bu yaklaşım işe yaramayacak'],
  ['tutti meritano una seconda possibilità', 'herkes ikinci bir şansı hak eder'],
  ['il progetto è in ritardo', 'proje programın gerisinde'],
  ['piccoli cambiamenti possono fare una grande differenza', 'küçük değişiklikler büyük fark yaratabilir'],
  ['la scadenza non è realistica', 'teslim tarihi gerçekçi değil'],
  ['il cambiamento è scomodo ma necessario', 'değişim rahatsız edici ama gerekli'],
  ['la soluzione migliore è spesso la più semplice', 'en iyi çözüm çoğu zaman en basit olanıdır'],
  ['non possiamo accontentare tutti', 'herkesi memnun edemeyiz'],
  ['la pazienza è una qualità sottovalutata', 'sabır, hafife alınan bir beceridir'],
  ['questa moda non durerà', 'bu trend sürmeyecek'],
  ['dovremmo ascoltare di più e parlare di meno', 'konuştuğumuzdan çok dinlemeliyiz'],
  ['una buona reputazione richiede anni', 'iyi bir itibar yıllar alır'],
  ['la verità è raramente semplice', 'gerçek nadiren basittir'],
  ['la squadra è più forte del singolo', 'takım, tek bir kişiden daha güçlüdür'],
  ['la prima impressione è difficile da cambiare', 'ilk izlenimleri değiştirmek zordur'],
  ['i conti non tornano', 'rakamlar tutmuyor'],
  ['il tempo non si può ricomprare', 'zaman geri satın alınamaz']
].map(([c, tr]) => ({ c, tr }));

export const REQUESTS = [
  ['aprire la finestra', 'pencereyi açar mısın'],
  ['parlare più lentamente', 'biraz daha yavaş konuşur musun'],
  ['mandarmi i dettagli', 'bana ayrıntıları gönderir misin'],
  ['aiutarmi con questo', 'bu konuda bana yardım eder misin'],
  ['aspettarmi fuori', 'beni dışarıda bekler misin'],
  ['richiamarmi più tardi', 'beni sonra arar mısın'],
  ["spiegarlo un'altra volta", 'bunu bir kez daha açıklar mısın'],
  ["dare un'occhiata", 'buna bir bakar mısın'],
  ["portarmi un bicchiere d'acqua", 'bana bir bardak su getirir misin'],
  ["ricontrollare l'indirizzo", 'adresi bir daha kontrol eder misin'],
  ['tenere la porta', 'kapıyı tutar mısın'],
  ['tenermi un posto', 'bana bir yer ayırır mısın']
].map(([r, tr]) => ({ r, tr }));
