import { createDialogue } from '../dialogueSchema.js?v=5';

export const DIRECTIONS_DIALOGUES = [
  createDialogue({
    id: 'strada-chiedere-indicazioni-a1-01',
    locationId: 'directions',
    scenarioId: 'asking-directions',
    title: 'Chiedere indicazioni',
    level: 'A1',
    variant: 1,
    length: 'short',
    goal: 'Yoldan birine yol sor ve tarifi anla.',
    tags: ['directions'],
    sceneType: 'transit',
    characters: {
      A: { name: 'Passante', role: 'Yoldan geçen', gender: 'female', accent: 'american', avatarPreset: 'guest_neutral' },
      B: { name: 'Turista', role: 'Turist', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Mi dica pure, ha bisogno di aiuto?', translation_tr: 'Buyurun, yardıma mı ihtiyacınız var?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Scusi, dov\'è la stazione?',
        altAccepted: ['Mi scusi, dov\'è la stazione?', 'Scusi, sa dov\'è la stazione?'],
        translation_tr: 'Affedersiniz, istasyon nerede?',
        register: 'formal', ipa: '/ˈsku.zi doˈvɛ la stat.ˈtsjo.ne/',
        grammar: [
          { word: 'Scusi', role: 'resmi hitap', note: 'Tanımadığın birine seslenirken ilk kelime.' },
          { word: "dov'è", role: '"dove è" kısalması', note: 'Sesli harften önce "dove" kısalır: "dov\'è".' },
          { word: 'la stazione', role: 'isim (dişil)', note: 'Belirli bir istasyondan bahsedildiği için "la".' }
        ],
        keyExpressions: [{ phrase: "Dov'è...?", meaning: '... nerede? — yer sormanın temel kalıbı' }],
        exampleSentences: ["Dov'è il bagno?", "Dov'è la fermata dell'autobus?"],
        pronunciationTips: ['"stazione" sonu "-tsyo-ne": sta-TSYO-ne.']
      },
      { speaker: 'A', text: 'Vada sempre dritto e poi giri a destra.', translation_tr: 'Hep düz gidin, sonra sağa dönün.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'È lontano da qui?',
        altAccepted: ['È lontano?', 'Quanto è lontano da qui?'],
        translation_tr: 'Buradan uzak mı?',
        register: 'formal', ipa: '/ɛ lonˈta.no da kwi/',
        grammar: [
          { word: 'È', role: 'essere (3. tekil)', note: 'Vurgulu "è" (var/dır); vurgusuz "e" ise "ve" demektir.' },
          { word: 'lontano', role: 'sıfat', note: 'Uzak. Karşıtı: "vicino" (yakın).' }
        ],
        keyExpressions: [{ phrase: 'È lontano?', meaning: 'Uzak mı? — mesafe sorma' }],
        exampleSentences: ['È lontano il centro?', 'No, è molto vicino.'],
        pronunciationTips: ['"È" açık ve vurgulu okunur, "e"den daha uzun.']
      },
      { speaker: 'A', text: 'No, sono cinque minuti a piedi.', translation_tr: 'Hayır, yürüyerek beş dakika.', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Grazie mille, molto gentile.',
        altAccepted: ['Grazie mille!', 'La ringrazio, molto gentile.'],
        translation_tr: 'Çok teşekkürler, çok naziksiniz.',
        register: 'formal', ipa: '/ˈɡrat.tsje ˈmil.le ˈmol.to dʒenˈti.le/',
        grammar: [
          { word: 'Grazie mille', role: 'kalıp', note: 'Kelimesi kelimesine "bin teşekkür" — "çok teşekkürler".' },
          { word: 'gentile', role: 'sıfat', note: '"Nazik". Eril/dişil ayrımı yoktur.' }
        ],
        keyExpressions: [{ phrase: 'molto gentile', meaning: 'çok naziksiniz — yardım sonrası teşekkür' }],
        exampleSentences: ['Grazie mille per l\'aiuto!', 'Che gentile!'],
        pronunciationTips: ['"gentile" içindeki "g" yumuşak: jen-TI-le.']
      }
    ]
  }),

  createDialogue({
    id: 'strada-mi-sono-perso-a2-01',
    locationId: 'directions',
    scenarioId: 'lost-in-city',
    title: 'Mi sono perso',
    level: 'A2',
    variant: 1,
    length: 'short',
    goal: 'Kaybolduğunu anlat ve harita üzerinden yardım al.',
    tags: ['directions'],
    sceneType: 'transit',
    characters: {
      A: { name: 'Vigile', role: 'Trafik memuru', gender: 'male', accent: 'american', avatarPreset: 'officer_m' },
      B: { name: 'Turista', role: 'Turist', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Tutto bene? Sembra un po\' smarrito.', translation_tr: 'Her şey yolunda mı? Biraz kaybolmuş görünüyorsunuz.', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Mi sono perso. Cerco questo indirizzo.',
        altAccepted: ['Mi sono perso, cerco questo indirizzo.', 'Mi sono persa. Cerco questo indirizzo.'],
        translation_tr: 'Kayboldum. Bu adresi arıyorum.',
        register: 'formal', ipa: '/mi ˈso.no ˈpɛr.so ˈtʃer.ko ˈkwe.sto in.diˈrit.tso/',
        grammar: [
          { word: 'Mi sono perso', role: 'dönüşlü geçmiş zaman', note: 'Kadın konuşuyorsa "persa" olur — özneyle uyum sağlar.' },
          { word: 'Cerco', role: 'fiil (ben)', note: '"cercare" = aramak. Türkçedeki gibi "için" gerekmez.' },
          { word: 'indirizzo', role: 'isim (eril)', note: 'Adres. Çift "zz" belirgin okunur.' }
        ],
        keyExpressions: [{ phrase: 'Mi sono perso/persa', meaning: 'Kayboldum (erkek/kadın)' }],
        exampleSentences: ['Mi sono perso in centro.', 'Cerco la farmacia.'],
        pronunciationTips: ['"indirizzo" içindeki "zz" = "ts" sesi: in-di-RIT-tso.']
      },
      { speaker: 'A', text: 'Vediamo... Ah sì, è dietro la piazza.', translation_tr: 'Bakalım... Ha evet, meydanın arkasında.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Può mostrarmelo sulla mappa?',
        altAccepted: ['Me lo può mostrare sulla mappa?', 'Può indicarmelo sulla mappa?'],
        translation_tr: 'Bana haritada gösterebilir misiniz?',
        register: 'formal', ipa: '/pwɔ mo.ˈstrar.me.lo ˈsul.la ˈmap.pa/',
        grammar: [
          { word: 'Può', role: 'potere (resmi siz)', note: '"-ebilir misiniz" sorusunu açar.' },
          { word: 'mostrarmelo', role: 'mastar + iki zamir', note: '"mostrare + me + lo" birleşir: "onu bana göstermek".' },
          { word: 'sulla', role: '"su + la" kaynaşması', note: 'Edat ve artikel İtalyancada birleşir.' }
        ],
        keyExpressions: [{ phrase: 'Può mostrarmelo?', meaning: 'Bana gösterebilir misiniz?' }],
        exampleSentences: ['Può ripetere, per favore?', 'Può scrivermelo?'],
        pronunciationTips: ['Uzun görünse de tek akışta söylenir: mo-strar-ME-lo.']
      },
      { speaker: 'A', text: 'Certo, guardi: siamo qui, e lei deve andare lì.', translation_tr: 'Tabii, bakın: biz buradayız, siz de oraya gitmelisiniz.', emotion: 'friendly', register: 'formal' }
    ]
  })
];
