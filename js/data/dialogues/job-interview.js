import { createDialogue } from '../dialogueSchema.js?v=5';

export const JOB_INTERVIEW_DIALOGUES = [
  createDialogue({
    id: 'colloquio-lavoro-b2-01',
    locationId: 'job-interview',
    scenarioId: 'job-interview',
    title: 'Colloquio di lavoro',
    level: 'B2',
    variant: 1,
    length: 'medium',
    goal: 'İş görüşmesinde kendini profesyonelce anlat.',
    tags: ['work'],
    sceneType: 'formal-office',
    characters: {
      A: { name: 'Dott.ssa Ferrari', role: 'İK müdürü', gender: 'female', accent: 'american', avatarPreset: 'manager_f' },
      B: { name: 'Candidato', role: 'Aday', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Si accomodi. Mi parli un po\' di lei.', translation_tr: 'Buyurun oturun. Bana biraz kendinizden bahsedin.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Lavoro nel settore da cinque anni e mi occupo di marketing digitale.',
        altAccepted: ['Lavoro in questo settore da cinque anni e mi occupo di marketing digitale.', 'Da cinque anni lavoro nel settore e mi occupo di marketing digitale.'],
        translation_tr: 'Beş yıldır sektörde çalışıyorum ve dijital pazarlamayla ilgileniyorum.',
        register: 'formal', ipa: '/laˈvo.ro nel setˈto.re da ˈtʃiŋ.kwe ˈan.ni/',
        grammar: [
          { word: 'da cinque anni', role: 'süre', note: 'Devam eden süre: "da" + ŞİMDİKİ zaman ("lavoro", "ho lavorato" değil).' },
          { word: 'mi occupo di', role: 'dönüşlü fiil kalıbı', note: '"...ile ilgilenirim / ...işini yaparım" — profesyonel ve doğal.' }
        ],
        keyExpressions: [{ phrase: 'Mi occupo di...', meaning: '... ile ilgileniyorum — iş alanını anlatmak' }],
        exampleSentences: ['Mi occupo di vendite.', 'Lavoro qui da tre anni.'],
        pronunciationTips: ['"occupo" çift "cc" ile: OK-ku-po.']
      },
      { speaker: 'A', text: 'Interessante. Perché vuole lasciare il suo lavoro attuale?', translation_tr: 'İlginç. Şu anki işinizden neden ayrılmak istiyorsunuz?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Cerco una sfida più stimolante e possibilità di crescita.',
        altAccepted: ['Cerco una sfida più stimolante e maggiori possibilità di crescita.', 'Vorrei una sfida più stimolante e possibilità di crescita.'],
        translation_tr: 'Daha teşvik edici bir meydan okuma ve gelişim imkânı arıyorum.',
        register: 'formal', ipa: '/ˈtʃer.ko ˈu.na ˈsfi.da pju sti.moˈlan.te/',
        grammar: [
          { word: 'sfida', role: 'isim (dişil)', note: '"Meydan okuma, zorlayıcı hedef" — mülakatta olumlu bir kelime.' },
          { word: 'più stimolante', role: 'karşılaştırma', note: '"più + sıfat" = "daha ...".' },
          { word: 'crescita', role: 'isim (dişil)', note: 'Kariyer gelişimi/büyüme.' }
        ],
        keyExpressions: [{ phrase: 'possibilità di crescita', meaning: 'gelişim/ilerleme imkânı' }],
        exampleSentences: ['Cerco nuove opportunità.', 'È un lavoro molto stimolante.'],
        pronunciationTips: ['"sfida" baştaki "sf" birleşik: SFI-da.']
      },
      { speaker: 'A', text: 'Capisco. Qual è il suo punto debole?', translation_tr: 'Anlıyorum. Zayıf yönünüz nedir?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'A volte sono troppo perfezionista, ma sto imparando a delegare.',
        altAccepted: ['A volte sono troppo perfezionista, però sto imparando a delegare.', 'Sono un po\' perfezionista, ma sto imparando a delegare.'],
        translation_tr: 'Bazen fazla mükemmeliyetçiyim ama yetki devretmeyi öğreniyorum.',
        register: 'formal', ipa: '/a ˈvɔl.te ˈso.no ˈtrop.po per.fet.tsjoˈni.sta/',
        grammar: [
          { word: 'A volte', role: 'sıklık zarfı', note: '"Bazen" — zayıflığı yumuşatır.' },
          { word: 'ma', role: 'bağlaç', note: 'Olumsuzu olumluya çeviren köprü — mülakat tekniği.' },
          { word: 'sto imparando a', role: 'sürerlik + edat', note: '"imparare a + mastar" = "...meyi öğrenmek".' }
        ],
        keyExpressions: [{ phrase: 'sto imparando a...', meaning: '...meyi öğreniyorum — gelişim gösterir' }],
        exampleSentences: ['Sto imparando a dire di no.', 'A volte lavoro troppo.'],
        pronunciationTips: ['"perfezionista" uzun; hecelere böl: per-fe-tsyo-NI-sta.']
      },
      { speaker: 'A', text: 'Ottima risposta. Le faremo sapere entro venerdì.', translation_tr: 'Çok iyi bir cevap. Cumaya kadar size haber vereceğiz.', emotion: 'friendly', register: 'formal' }
    ]
  })
];
