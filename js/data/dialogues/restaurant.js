import { createDialogue } from '../dialogueSchema.js?v=6';

export const RESTAURANT_DIALOGUES = [
  createDialogue({
    id: 'ristorante-ordinare-a2-01',
    locationId: 'restaurant',
    scenarioId: 'ordering-food',
    title: 'Ordinare al ristorante',
    level: 'A2',
    variant: 1,
    length: 'medium',
    goal: 'Menüden yemek seç ve sipariş ver.',
    tags: ['ordering'],
    sceneType: 'restaurant',
    characters: {
      A: { name: 'Elena', role: 'Garson', gender: 'female', accent: 'american', avatarPreset: 'waiter_f' },
      B: { name: 'Cliente', role: 'Müşteri', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Buonasera! Ha già scelto?', translation_tr: 'İyi akşamlar! Seçtiniz mi?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Vorrei la pasta al pomodoro, per favore.',
        altAccepted: ['Prendo la pasta al pomodoro, per favore.', 'Per me la pasta al pomodoro, per favore.'],
        translation_tr: 'Domatesli makarna istiyorum, lütfen.',
        register: 'formal', ipa: '/vorˈrɛi la ˈpas.ta al po.moˈdɔ.ro per faˈvo.re/',
        grammar: [
          { word: 'Vorrei', role: 'kibar istek (şart kipi)', note: '"voglio" (istiyorum) kaba kalır; "vorrei" nazik olanıdır.' },
          { word: 'la', role: 'belirli artikel (dişil)', note: 'Menüdeki belirli bir yemeği işaret eder.' },
          { word: 'al pomodoro', role: 'niteleme', note: '"a + il" = "al"; sosun neyle yapıldığını söyler.' }
        ],
        keyExpressions: [{ phrase: 'Vorrei...', meaning: '...istiyorum — restoranda en kibar sipariş kalıbı' }],
        exampleSentences: ['Vorrei un tavolo per due.', 'Vorrei il menù, per favore.'],
        pronunciationTips: ['"Vorrei" çift "rr" ile: vor-REI, "r" titretilir.']
      },
      { speaker: 'A', text: 'Ottima scelta. E da bere?', translation_tr: 'Harika seçim. İçecek olarak?', emotion: 'happy', register: 'formal' },
      {
        speaker: 'B', expected: 'Una bottiglia di acqua naturale, grazie.',
        altAccepted: ['Dell\'acqua naturale, grazie.', 'Una bottiglia d\'acqua naturale, grazie.'],
        translation_tr: 'Bir şişe sade su, teşekkürler.',
        register: 'formal', ipa: '/ˈu.na botˈtiʎ.ʎa di ˈak.kwa na.tuˈra.le ˈɡrat.tsje/',
        grammar: [
          { word: 'bottiglia', role: 'isim', note: '"gli" harf grubu Türkçedeki "ly" gibi yumuşak okunur.' },
          { word: 'naturale', role: 'sıfat', note: 'Sade su. Gazlı için "frizzante" denir.' }
        ],
        keyExpressions: [{ phrase: 'acqua naturale / frizzante', meaning: 'sade su / gazlı su' }],
        exampleSentences: ['Acqua frizzante, per favore.', 'Una bottiglia di vino rosso.'],
        pronunciationTips: ['"bottiglia" içindeki "gli": bot-TI-lya.']
      },
      { speaker: 'A', text: 'Perfetto. Arriva subito.', translation_tr: 'Mükemmel. Hemen geliyor.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Il conto, per favore.',
        altAccepted: ['Ci porta il conto, per favore?', 'Possiamo avere il conto?'],
        translation_tr: 'Hesap, lütfen.',
        register: 'formal', ipa: '/il ˈkon.to per faˈvo.re/',
        grammar: [
          { word: 'Il conto', role: 'isim (eril)', note: 'Restoran hesabı. "Il" belirli artikel.' }
        ],
        keyExpressions: [{ phrase: 'Il conto, per favore', meaning: 'Hesap lütfen — ödeme istemenin standart yolu' }],
        exampleSentences: ['Il conto, per favore.', 'Possiamo pagare con la carta?'],
        pronunciationTips: ['Sakin ve net söyle; İtalyanca\'da bu tamamen normal bir istektir.']
      },
      { speaker: 'A', text: 'Certo, arrivo subito.', translation_tr: 'Tabii, hemen geliyorum.', emotion: 'friendly', register: 'formal' }
    ]
  }),

  createDialogue({
    id: 'ristorante-problema-b1-01',
    locationId: 'restaurant',
    scenarioId: 'order-complaint',
    title: 'Un problema con l\'ordine',
    level: 'B1',
    variant: 1,
    length: 'short',
    goal: 'Yanlış gelen siparişi kibarca düzelttir.',
    tags: ['complaint'],
    sceneType: 'restaurant',
    characters: {
      A: { name: 'Luca', role: 'Garson', gender: 'male', accent: 'american', avatarPreset: 'waiter_m' },
      B: { name: 'Cliente', role: 'Müşteri', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Ecco la sua carbonara.', translation_tr: 'İşte carbonaranız.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Mi scusi, ma io avevo ordinato la pasta al pomodoro.',
        altAccepted: ['Scusi, ma avevo ordinato la pasta al pomodoro.', 'Mi scusi, ho ordinato la pasta al pomodoro.'],
        translation_tr: 'Affedersiniz ama ben domatesli makarna sipariş etmiştim.',
        register: 'formal', ipa: '/mi ˈsku.zi ma ˈi.o aˈve.vo or.diˈna.to la ˈpas.ta al po.moˈdɔ.ro/',
        grammar: [
          { word: 'Mi scusi', role: 'resmi özür', note: 'Tanımadığın kişiye "affedersiniz". Samimi hâli: "scusa".' },
          { word: 'avevo ordinato', role: 'trapassato prossimo', note: 'Daha önce olmuş bir eylemi vurgular: "sipariş etmiştim".' },
          { word: 'ma', role: 'bağlaç', note: '"ama" — itirazı yumuşatarak bağlar.' }
        ],
        keyExpressions: [{ phrase: 'Mi scusi, ma...', meaning: 'Affedersiniz ama... — kibar itirazın başlangıcı' }],
        exampleSentences: ['Mi scusi, ma questo non è il mio ordine.', 'Mi scusi, ma il conto non è corretto.'],
        pronunciationTips: ['"scusi" içindeki "sc" = "sk" değil "sk-u": SKU-zi.']
      },
      { speaker: 'A', text: 'Oh, mi dispiace davvero! Glielo cambio subito.', translation_tr: 'Ah, gerçekten özür dilerim! Hemen değiştiriyorum.', emotion: 'sad', register: 'formal' },
      {
        speaker: 'B', expected: 'Non si preoccupi, capita.',
        altAccepted: ['Non fa niente, capita.', 'Nessun problema, capita.'],
        translation_tr: 'Merak etmeyin, olur böyle şeyler.',
        register: 'formal', ipa: '/non si pre.okˈku.pi ˈka.pi.ta/',
        grammar: [
          { word: 'Non si preoccupi', role: 'resmi emir (olumsuz)', note: 'Dönüşlü fiil "preoccuparsi" — "merak etmeyin".' },
          { word: 'capita', role: 'fiil (3. tekil)', note: '"olur, başa gelir" — durumu yumuşatan yaygın bir kelime.' }
        ],
        keyExpressions: [{ phrase: 'Non si preoccupi', meaning: 'Merak etmeyin / önemli değil (resmi)' }],
        exampleSentences: ['Non si preoccupi, aspetto volentieri.', 'Capita a tutti.'],
        pronunciationTips: ['"preoccupi" uzun görünür ama akıcı: pre-ok-KU-pi.']
      },
      { speaker: 'A', text: 'Grazie della comprensione. Arriva tra due minuti.', translation_tr: 'Anlayışınız için teşekkürler. İki dakikaya geliyor.', emotion: 'friendly', register: 'formal' }
    ]
  })
];
