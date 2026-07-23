import { createDialogue } from '../dialogueSchema.js?v=6';

export const HOTEL_DIALOGUES = [
  createDialogue({
    id: 'hotel-check-in-a1-01',
    locationId: 'hotel',
    scenarioId: 'check-in',
    title: 'Check-in in albergo',
    level: 'A1',
    variant: 1,
    length: 'short',
    goal: 'Otele giriş yap ve odanı al.',
    tags: ['check-in'],
    sceneType: 'hotel-lobby',
    characters: {
      A: { name: 'Chiara', role: 'Resepsiyonist', gender: 'female', accent: 'american', avatarPreset: 'receptionist_f' },
      B: { name: 'Ospite', role: 'Misafir', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Buonasera, benvenuto! Ha una prenotazione?', translation_tr: 'İyi akşamlar, hoş geldiniz! Rezervasyonunuz var mı?', emotion: 'happy', register: 'formal' },
      {
        speaker: 'B', expected: 'Sì, ho una prenotazione a nome Rossi.',
        altAccepted: ['Sì, ho prenotato a nome Rossi.', 'Sì, la prenotazione è a nome Rossi.'],
        translation_tr: 'Evet, Rossi adına bir rezervasyonum var.',
        register: 'formal', ipa: '/si ɔ ˈu.na pre.no.tatˈtsjo.ne a ˈno.me ˈros.si/',
        grammar: [
          { word: 'ho', role: 'avere fiili (ben)', note: '"Sahibim/var" anlamında. "H" harfi okunmaz.' },
          { word: 'prenotazione', role: 'isim (dişil)', note: '"-zione" ile biten isimler her zaman dişildir.' },
          { word: 'a nome', role: 'kalıp', note: '"... adına" — rezervasyon kimin adına kayıtlıysa.' }
        ],
        keyExpressions: [{ phrase: 'a nome...', meaning: '... adına (rezervasyon için)' }],
        exampleSentences: ['Ho una prenotazione a nome Bianchi.', 'Il tavolo è a nome mio.'],
        pronunciationTips: ['"ho" tek hece, "o" gibi okunur — baştaki H sessizdir.']
      },
      { speaker: 'A', text: 'Perfetto. Il suo documento, per favore.', translation_tr: 'Mükemmel. Kimliğiniz, lütfen.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Ecco il mio passaporto.',
        altAccepted: ['Ecco a lei il passaporto.', 'Ecco il passaporto.'],
        translation_tr: 'İşte pasaportum.',
        register: 'formal', ipa: '/ˈek.ko il ˈmi.o pas.saˈpor.to/',
        grammar: [
          { word: 'il mio', role: 'iyelik sıfatı', note: 'İtalyancada iyelik önünde artikel kalır: "il mio".' },
          { word: 'passaporto', role: 'isim (eril)', note: 'Çift "ss" uzun okunur.' }
        ],
        keyExpressions: [{ phrase: 'Ecco il mio...', meaning: 'İşte benim... — belge uzatırken' }],
        exampleSentences: ['Ecco la mia carta d\'identità.', 'Ecco il mio biglietto.'],
        pronunciationTips: ['"passaporto" içindeki çift "ss" belirgin: pas-sa-POR-to.']
      },
      { speaker: 'A', text: 'Grazie. Camera 214, secondo piano.', translation_tr: 'Teşekkürler. Oda 214, ikinci kat.', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'A che ora è la colazione?',
        altAccepted: ['Quando è la colazione?', 'A che ora si fa colazione?'],
        translation_tr: 'Kahvaltı saat kaçta?',
        register: 'formal', ipa: '/a ke ˈo.ra ɛ la ko.latˈtsjo.ne/',
        grammar: [
          { word: 'A che ora', role: 'saat sorusu', note: '"Saat kaçta" — bir etkinliğin zamanını sormak için.' },
          { word: 'colazione', role: 'isim (dişil)', note: 'Kahvaltı. "-zione" eki yine dişil.' }
        ],
        keyExpressions: [{ phrase: 'A che ora...?', meaning: 'Saat kaçta...? — program sormak için' }],
        exampleSentences: ['A che ora parte il treno?', 'A che ora chiude il museo?'],
        pronunciationTips: ['"colazione" sonu "-tsyo-ne": ko-la-TSYO-ne.']
      },
      { speaker: 'A', text: 'Dalle sette alle dieci. Buon soggiorno!', translation_tr: 'Yediden ona kadar. İyi konaklamalar!', emotion: 'happy', register: 'formal' }
    ]
  }),

  createDialogue({
    id: 'hotel-problema-b1-01',
    locationId: 'hotel',
    scenarioId: 'reporting-problem',
    title: 'Un problema in camera',
    level: 'B1',
    variant: 1,
    length: 'short',
    goal: 'Odandaki sorunu bildir ve çözüm iste.',
    tags: ['problem'],
    sceneType: 'hotel-lobby',
    characters: {
      A: { name: 'Davide', role: 'Resepsiyonist', gender: 'male', accent: 'american', avatarPreset: 'receptionist_m' },
      B: { name: 'Ospite', role: 'Misafir', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Reception, buongiorno. Come posso aiutarla?', translation_tr: 'Resepsiyon, günaydın. Size nasıl yardımcı olabilirim?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Il riscaldamento in camera non funziona.',
        altAccepted: ['Il riscaldamento non funziona nella mia camera.', 'In camera il riscaldamento non funziona.'],
        translation_tr: 'Odadaki kalorifer çalışmıyor.',
        register: 'formal', ipa: '/il ri.skal.daˈmen.to in ˈka.me.ra non ˈfun.tsjo.na/',
        grammar: [
          { word: 'riscaldamento', role: 'isim (eril)', note: 'Isıtma sistemi. Klima için "aria condizionata".' },
          { word: 'non funziona', role: 'olumsuz fiil', note: '"Çalışmıyor" — bozuk cihazlar için standart ifade.' }
        ],
        keyExpressions: [{ phrase: 'non funziona', meaning: 'çalışmıyor / bozuk' }],
        exampleSentences: ['La televisione non funziona.', 'L\'ascensore non funziona.'],
        pronunciationTips: ['"funziona" sonu "-tsyo-na": fun-TSYO-na.']
      },
      { speaker: 'A', text: 'Mi dispiace molto. Mando subito un tecnico.', translation_tr: 'Çok üzgünüm. Hemen bir teknisyen gönderiyorum.', emotion: 'sad', register: 'formal' },
      {
        speaker: 'B', expected: 'Sarebbe possibile cambiare camera?',
        altAccepted: ['Potrei cambiare camera?', 'È possibile cambiare camera?'],
        translation_tr: 'Oda değiştirmek mümkün olur mu?',
        register: 'formal', ipa: '/saˈreb.be pos.ˈsi.bi.le kam.ˈbja.re ˈka.me.ra/',
        grammar: [
          { word: 'Sarebbe', role: 'essere — şart kipi', note: '"Olur muydu" — isteği çok kibar yapar.' },
          { word: 'possibile', role: 'sıfat', note: '"Sarebbe possibile + mastar" kalıbı çok kullanışlıdır.' },
          { word: 'cambiare', role: 'mastar', note: 'Şart kipinden sonra fiil mastar hâlinde kalır.' }
        ],
        keyExpressions: [{ phrase: 'Sarebbe possibile...?', meaning: '...mümkün olur mu? — en kibar rica kalıbı' }],
        exampleSentences: ['Sarebbe possibile avere un\'altra chiave?', 'Sarebbe possibile pagare dopo?'],
        pronunciationTips: ['"Sarebbe" çift "bb" ile: sa-REB-be.']
      },
      { speaker: 'A', text: 'Certo. Le do la camera 305, è più calda.', translation_tr: 'Tabii. Size 305 numaralı odayı veriyorum, daha sıcak.', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'La ringrazio molto.',
        altAccepted: ['Grazie mille.', 'La ringrazio davvero.'],
        translation_tr: 'Size çok teşekkür ederim.',
        register: 'formal', ipa: '/la rin.ˈɡrat.tsjo ˈmol.to/',
        grammar: [
          { word: 'La', role: 'resmi nesne zamiri', note: 'Büyük harfli "La" = resmi "sizi".' },
          { word: 'ringrazio', role: 'fiil (ben)', note: '"grazie" demekten daha resmi ve içten.' }
        ],
        keyExpressions: [{ phrase: 'La ringrazio', meaning: 'Size teşekkür ederim (resmi, nazik)' }],
        exampleSentences: ['La ringrazio per l\'aiuto.', 'La ringrazio della sua pazienza.'],
        pronunciationTips: ['"ringrazio" içindeki "gr" net, sonu "-tsyo": rin-GRA-tsyo.']
      }
    ]
  })
];
