import { createDialogue } from '../dialogueSchema.js?v=6';

export const FRIEND_CHAT_DIALOGUES = [
  createDialogue({
    id: 'amici-weekend-b1-01',
    locationId: 'friend-chat',
    scenarioId: 'weekend-plans',
    title: 'Programmi per il weekend',
    level: 'B1',
    variant: 1,
    length: 'short',
    goal: 'Bir arkadaşınla hafta sonu planı yap.',
    tags: ['smalltalk'],
    sceneType: 'cafe',
    characters: {
      A: { name: 'Matteo', role: 'Arkadaş', gender: 'male', accent: 'american', avatarPreset: 'friend_m' },
      B: { name: 'Tu', role: 'Sen', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Allora, che fai questo weekend?', translation_tr: 'Eee, bu hafta sonu ne yapıyorsun?', emotion: 'happy', register: 'informal' },
      {
        speaker: 'B', expected: 'Non ho ancora deciso. Hai qualche idea?',
        altAccepted: ['Non lo so ancora. Hai qualche idea?', 'Non ho ancora deciso. Tu hai qualche idea?'],
        translation_tr: 'Henüz karar vermedim. Bir fikrin var mı?',
        register: 'informal', ipa: '/non ɔ anˈko.ra deˈtʃi.zo ai ˈkwal.ke iˈdɛ.a/',
        grammar: [
          { word: 'Non ho ancora deciso', role: 'geçmiş zaman + "ancora"', note: '"ancora" olumsuzla "henüz" anlamı verir.' },
          { word: 'qualche', role: 'belgisiz sıfat', note: 'Anlamı çoğul olsa da ardından TEKİL isim gelir: "qualche idea".' }
        ],
        keyExpressions: [{ phrase: 'Non ho ancora deciso', meaning: 'Henüz karar vermedim' }],
        exampleSentences: ['Non ho ancora mangiato.', 'Hai qualche consiglio?'],
        pronunciationTips: ['"deciso" içindeki "ci" = "chi" sesi: de-CHI-zo.']
      },
      { speaker: 'A', text: 'Potremmo andare al mare, se il tempo è bello.', translation_tr: 'Hava güzel olursa denize gidebiliriz.', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'Mi piacerebbe molto. A che ora partiamo?',
        altAccepted: ['Mi piacerebbe tanto. A che ora partiamo?', 'Volentieri! A che ora partiamo?'],
        translation_tr: 'Çok isterim. Saat kaçta yola çıkıyoruz?',
        register: 'informal', ipa: '/mi pja.tʃeˈreb.be ˈmol.to/',
        grammar: [
          { word: 'Mi piacerebbe', role: 'piacere — şart kipi', note: '"Çok isterim" — davete en doğal olumlu cevap.' },
          { word: 'partiamo', role: 'fiil (biz)', note: 'Planı kesinleştiren "biz" çekimi.' }
        ],
        keyExpressions: [{ phrase: 'Mi piacerebbe molto', meaning: 'Çok isterim — daveti kabul' }],
        exampleSentences: ['Mi piacerebbe venire.', 'Mi piacerebbe vedere quel film.'],
        pronunciationTips: ['"piacerebbe" çift "bb": pya-che-REB-be.']
      },
      { speaker: 'A', text: 'Verso le nove, così evitiamo il traffico.', translation_tr: 'Dokuz gibi, böylece trafikten kaçarız.', emotion: 'neutral', register: 'informal' },
      {
        speaker: 'B', expected: 'Perfetto, ci vediamo lì. Porto io il pranzo.',
        altAccepted: ['Perfetto, ci vediamo lì. Il pranzo lo porto io.', 'Va bene, ci vediamo lì. Porto io il pranzo.'],
        translation_tr: 'Mükemmel, orada görüşürüz. Öğle yemeğini ben getiririm.',
        register: 'informal', ipa: '/perˈfɛt.to tʃi veˈdja.mo li/',
        grammar: [
          { word: 'ci vediamo', role: 'karşılıklı fiil', note: '"Görüşürüz" — vedalaşmanın en yaygın hâli.' },
          { word: 'Porto io', role: 'vurgulu özne', note: 'Özneyi fiilden SONRA koymak vurgu katar: "ben getiririm".' }
        ],
        keyExpressions: [{ phrase: 'Ci vediamo!', meaning: 'Görüşürüz!' }],
        exampleSentences: ['Ci vediamo domani.', 'Ci vediamo alle otto.'],
        pronunciationTips: ['"ci" = "chi" sesi: chi ve-DYA-mo.']
      }
    ]
  })
];
