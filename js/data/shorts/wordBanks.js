// ============================================================================
// Word banks — ITALIAN. Each noun carries its indefinite + definite article
// (un/uno/una/un', il/lo/la/l') and gender so frames agree adjectives without
// a morphology engine. Articles ending in an apostrophe attach without a
// space ("un'arancia", "l'ospedale") — helpers in sentenceBank handle that.
//
// Noun = { w, ind, def, g, tr, topic }
// Adj  = { m, f, tr }
// Verb = { inf, first, part, trInf, tr1, trGer, trPast, trFut }
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
export const OWNABLE = NOUNS.filter(n => ['food', 'objects', 'clothes', 'animals', 'transport'].includes(n.topic));

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
  ['nuotare', 'nuoto', 'nuotato', 'yüzmek', 'yüzüyorum', 'yüzmeyi', 'yüzdüm', 'yüzeceğim'],
  ['correre', 'corro', 'corso', 'koşmak', 'koşuyorum', 'koşmayı', 'koştum', 'koşacağım'],
  ['dormire', 'dormo', 'dormito', 'uyumak', 'uyuyorum', 'uyumayı', 'uyudum', 'uyuyacağım'],
  ['leggere', 'leggo', 'letto', 'okumak', 'okuyorum', 'okumayı', 'okudum', 'okuyacağım'],
  ['scrivere', 'scrivo', 'scritto', 'yazmak', 'yazıyorum', 'yazmayı', 'yazdım', 'yazacağım'],
  ['giocare', 'gioco', 'giocato', 'oynamak', 'oynuyorum', 'oynamayı', 'oynadım', 'oynayacağım'],
  ['lavorare', 'lavoro', 'lavorato', 'çalışmak', 'çalışıyorum', 'çalışmayı', 'çalıştım', 'çalışacağım'],
  ['imparare', 'imparo', 'imparato', 'öğrenmek', 'öğreniyorum', 'öğrenmeyi', 'öğrendim', 'öğreneceğim'],
  ['cucinare', 'cucino', 'cucinato', 'yemek pişirmek', 'yemek pişiriyorum', 'yemek pişirmeyi', 'yemek pişirdim', 'yemek pişireceğim'],
  ['cantare', 'canto', 'cantato', 'şarkı söylemek', 'şarkı söylüyorum', 'şarkı söylemeyi', 'şarkı söyledim', 'şarkı söyleyeceğim'],
  ['ballare', 'ballo', 'ballato', 'dans etmek', 'dans ediyorum', 'dans etmeyi', 'dans ettim', 'dans edeceğim'],
  ['aspettare', 'aspetto', 'aspettato', 'beklemek', 'bekliyorum', 'beklemeyi', 'bekledim', 'bekleyeceğim'],
  ['viaggiare', 'viaggio', 'viaggiato', 'seyahat etmek', 'seyahat ediyorum', 'seyahat etmeyi', 'seyahat ettim', 'seyahat edeceğim'],
  ['dipingere', 'dipingo', 'dipinto', 'resim yapmak', 'resim yapıyorum', 'resim yapmayı', 'resim yaptım', 'resim yapacağım'],
  ['ridere', 'rido', 'riso', 'gülmek', 'gülüyorum', 'gülmeyi', 'güldüm', 'güleceğim'],
  ['studiare', 'studio', 'studiato', 'ders çalışmak', 'ders çalışıyorum', 'ders çalışmayı', 'ders çalıştım', 'ders çalışacağım']
].map(([inf, first, part, trInf, tr1, trGer, trPast, trFut]) =>
  ({ inf, first, part, trInf, tr1, trGer, trPast, trFut }));

// "I have been ...ing for ..." — Italian present + da.
export const ACTIVITIES = [
  ['Aspetto', 'bekliyorum'],
  ["Studio l'italiano", 'İtalyanca çalışıyorum'],
  ['Lavoro a questa relazione', 'bu rapor üzerinde çalışıyorum'],
  ['Cerco le mie chiavi', 'anahtarlarımı arıyorum'],
  ['Risparmio per un viaggio', 'bir gezi için para biriktiriyorum'],
  ['Pulisco la casa', 'evi temizliyorum'],
  ['Organizzo il matrimonio', 'düğünü planlıyorum'],
  ['Leggo questo libro', 'bu kitabı okuyorum'],
  ['Mi alleno in palestra', 'spor salonunda antrenman yapıyorum'],
  ['Cerco un nuovo lavoro', 'yeni bir iş arıyorum'],
  ['Scrivo la mia tesi', 'tezimi yazıyorum'],
  ['Imparo a cucinare', 'yemek yapmayı öğreniyorum']
].map(([t, tr]) => ({ t, tr }));

export const DURATIONS = [
  ['da dieci minuti', 'on dakikadır'],
  ["da mezz'ora", 'yarım saattir'],
  ['da due ore', 'iki saattir'],
  ['da stamattina', 'bu sabahtan beri'],
  ['da tre giorni', 'üç gündür'],
  ['da una settimana', 'bir haftadır'],
  ['da un mese', 'bir aydır'],
  ['da tanto tempo', 'uzun zamandır']
].map(([t, tr]) => ({ t, tr }));

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

// Hand-written, real everyday sentences — injected into the stream as-is.
export const DAILY = [
  // A1
  ['A1', 'Ciao, come stai?', 'Merhaba, nasılsın?'],
  ['A1', 'Sto bene, grazie.', 'İyiyim, teşekkürler.'],
  ['A1', 'Come ti chiami?', 'Adın ne?'],
  ['A1', 'Mi chiamo Anna.', 'Benim adım Anna.'],
  ['A1', 'Piacere!', 'Memnun oldum!'],
  ['A1', 'Buongiorno!', 'Günaydın!'],
  ['A1', 'Buonanotte!', 'İyi geceler!'],
  ['A1', 'A domani!', 'Yarın görüşürüz!'],
  ['A1', 'Ho fame.', 'Acıktım.'],
  ['A1', 'Ho sete.', 'Susadım.'],
  ['A1', 'Sono stanco.', 'Yorgunum.'],
  ['A1', 'Oggi il tempo è bellissimo.', 'Bugün hava çok güzel.'],
  ['A1', 'Piove.', 'Yağmur yağıyor.'],
  ['A1', 'Quanti anni hai?', 'Kaç yaşındasın?'],
  ['A1', 'Ho dieci anni.', 'On yaşındayım.'],
  ['A1', 'Di dove sei?', 'Nerelisin?'],
  ['A1', 'Vengo dalla Turchia.', 'Türkiye’denim.'],
  ['A1', 'Questa è la mia famiglia.', 'Bu benim ailem.'],
  ['A1', 'Ti amo.', 'Seni seviyorum.'],
  ['A1', 'Ciao ciao!', 'Hoşça kal!'],
  // A2
  ['A2', 'Non capisco.', 'Anlamıyorum.'],
  ['A2', 'Può ripetere?', 'Tekrar eder misiniz?'],
  ['A2', 'Può parlare più lentamente?', 'Daha yavaş konuşur musunuz?'],
  ['A2', 'Può aiutarmi?', 'Bana yardım eder misiniz?'],
  ['A2', 'Dov’è il bagno?', 'Tuvalet nerede?'],
  ['A2', 'Che ore sono?', 'Saat kaç?'],
  ['A2', 'Che giorno è oggi?', 'Bugün günlerden ne?'],
  ['A2', 'Quando arriva il prossimo autobus?', 'Bir sonraki otobüs ne zaman?'],
  ['A2', 'Dove posso comprare un biglietto?', 'Bilet nereden alabilirim?'],
  ['A2', 'Il conto, per favore.', 'Hesap, lütfen.'],
  ['A2', 'Buon appetito!', 'Afiyet olsun!'],
  ['A2', 'Scusa, sono in ritardo.', 'Özür dilerim, geç kaldım.'],
  ['A2', 'Non c’è problema.', 'Sorun değil.'],
  ['A2', 'Che bella idea!', 'Ne güzel bir fikir!'],
  ['A2', 'Parlo un po’ di italiano.', 'Biraz İtalyanca konuşuyorum.'],
  ['A2', 'Mi sono perso.', 'Kayboldum.'],
  ['A2', 'Posso sedermi qui?', 'Buraya oturabilir miyim?'],
  ['A2', 'Posso fare una foto?', 'Fotoğraf çekebilir miyim?'],
  ['A2', 'È troppo caro!', 'Bu çok pahalı!'],
  ['A2', 'C’è uno sconto?', 'İndirim var mı?'],
  // B1
  ['B1', 'Ieri sera sono andato a letto molto tardi.', 'Dün gece çok geç yattım.'],
  ['B1', 'Domani devo alzarmi presto.', 'Yarın erken kalkmam lazım.'],
  ['B1', 'Hai programmi per il fine settimana?', 'Hafta sonu için planın var mı?'],
  ['B1', 'Non ci vediamo da tanto tempo.', 'Uzun zamandır görüşemedik.'],
  ['B1', 'Vivo in questa città da due anni.', 'İki yıldır bu şehirde yaşıyorum.'],
  ['B1', 'Sto cercando un nuovo lavoro.', 'Şu sıralar yeni bir iş arıyorum.'],
  ['B1', 'Ho appena iniziato a fare sport.', 'Spora yeni başladım.'],
  ['B1', 'Ti consiglio davvero questo libro.', 'Bu kitabı gerçekten tavsiye ederim.'],
  ['B1', 'Vorrei avere più tempo.', 'Keşke daha fazla zamanım olsa.'],
  ['B1', 'Prometto che non succederà più.', 'Söz veriyorum, bir daha olmayacak.'],
  ['B1', 'Hai cambiato idea?', 'Fikrini değiştirdin mi?'],
  ['B1', 'Ne vale davvero la pena?', 'Buna gerçekten değer mi?'],
  // B2
  ['B2', 'Onestamente, non ne sono sicuro.', 'Açıkçası pek emin değilim.'],
  ['B2', 'Sono completamente d’accordo con te.', 'Bu konuda sana tamamen katılıyorum.'],
  ['B2', 'Se ho capito bene, la riunione di domani è annullata.', 'Yanlış anlamadıysam yarınki toplantı iptal.'],
  ['B2', 'Capisco cosa intendi, ma la vedo diversamente.', 'Ne demek istediğini anlıyorum ama farklı düşünüyorum.'],
  ['B2', 'Prova a vederla da questa prospettiva.', 'Bir de şu açıdan bak.'],
  ['B2', 'Farò del mio meglio.', 'Elimden geleni yapacağım.'],
  ['B2', 'Comunque vada, ne è valsa la pena.', 'Sonuç ne olursa olsun denemeye değerdi.'],
  ['B2', 'Dammi un po’ di tempo per pensarci.', 'Düşünmek için bana biraz zaman ver.']
].map(([level, t, tr]) => ({ level, t, tr }));
