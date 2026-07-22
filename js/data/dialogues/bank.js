import { createDialogue } from '../dialogueSchema.js';

export const BANK_DIALOGUES = [
  createDialogue({
    id: 'bank-charge-complaint-b2-01',
    locationId: 'bank',
    scenarioId: 'charge-complaint',
    title: 'Disputing an Unexpected Charge',
    level: 'B2',
    variant: 1,
    length: 'long',
    goal: 'Dispute an unfamiliar charge on your account and get it resolved.',
    tags: ['complaint', 'negotiation'],
    sceneType: 'bank-office',
    characters: {
      A: { name: 'Mr. Osei', role: 'Bank Representative', gender: 'male', accent: 'british', avatarPreset: 'banker_m' },
      B: { name: 'Customer', role: 'Bank Customer', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Good afternoon. What can I do for you?', translation_tr: 'İyi günler. Sizin için ne yapabilirim?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'I noticed a charge on my statement that I don’t recognize, and I’d like to dispute it.',
        altAccepted: ['There’s a charge on my account I don’t recognize, and I’d like to dispute it.', 'I’d like to dispute a charge on my statement — I don’t recall making it.'],
        translation_tr: 'Hesap özetimde tanımadığım bir ücret fark ettim ve bunu itiraz etmek istiyorum.',
        register: 'formal', ipa: '/aɪ ˈnoʊtɪst ə tʃɑːrdʒ ɒn maɪ ˈsteɪtmənt ðæt aɪ doʊnt ˈrɛkəgnaɪz ænd aɪd laɪk tuː dɪsˈpjuːt ɪt/',
        grammar: [
          { word: 'I noticed', role: 'past simple', note: 'States the discovery of the problem as a fact.' },
          { word: 'that I don’t recognize', role: 'relative clause', note: 'Adds identifying detail about the charge without starting a new sentence.' },
          { word: 'I’d like to dispute it', role: 'formal request', note: '"Dispute" is a precise, professional verb for formally challenging a charge.' }
        ],
        keyExpressions: [{ phrase: 'I’d like to dispute a charge', meaning: 'the standard formal phrase for challenging a transaction' }],
        exampleSentences: ['I’d like to dispute a transaction from last week.'],
        pronunciationTips: ['Stress "dispute" on the second syllable: dis-PUTE.']
      },
      { speaker: 'A', text: 'I understand your concern. Could you point out the specific transaction?', translation_tr: 'Endişenizi anlıyorum. Belirli işlemi gösterebilir misiniz?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Yes, it’s this one here — dated the fifteenth, for eighty-nine dollars.',
        altAccepted: ['It’s this transaction, dated the fifteenth, for eighty-nine dollars.', 'Right here — the one from the fifteenth for eighty-nine dollars.'],
        translation_tr: 'Evet, işte bu — on beşinde, seksen dokuz dolar tutarında.',
        register: 'neutral', ipa: '/jɛs ɪts ðɪs wʌn hɪər ˈdeɪtɪd ðə ˈfɪfˈtiːnθ fɔːr ˈeɪti naɪn ˈdɒlərz/',
        grammar: [
          { word: 'dated the fifteenth', role: 'reduced relative clause', note: 'A shortened way of saying "which is dated the fifteenth" — common in precise, formal descriptions.' }
        ],
        keyExpressions: [{ phrase: 'dated the [date]', meaning: 'used to identify a transaction or document by its date' }],
        exampleSentences: ['The invoice dated the third hasn’t been paid yet.'],
        pronunciationTips: ['Pronounce "eighty-nine" clearly as two distinct number words.']
      },
      { speaker: 'A', text: 'I see it. I’ll file a dispute right away, and you should hear back within five business days.', translation_tr: 'Görüyorum. Hemen bir itiraz başlatacağım ve beş iş günü içinde geri dönüş alacaksınız.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'That’s reassuring. Will the amount be refunded while the dispute is being reviewed?',
        altAccepted: ['That’s good to hear. Will I get the money back while it’s under review?', 'Good. Is the charge refunded while the dispute is being investigated?'],
        translation_tr: 'Bu rahatlatıcı. İtiraz incelenirken tutar iade edilecek mi?',
        register: 'formal', ipa: '/ðæts ˌriːəˈʃʊərɪŋ wɪl ðə əˈmaʊnt biː ˈriːfʌndɪd waɪl ðə dɪsˈpjuːt ɪz ˈbiːɪŋ rɪˈvjuːd/',
        grammar: [
          { word: 'Will the amount be refunded', role: 'future passive question', note: 'The focus is on the amount, not who refunds it — passive voice is natural here.' },
          { word: 'while the dispute is being reviewed', role: 'present continuous passive', note: 'Describes an ongoing background process during another action.' }
        ],
        keyExpressions: [{ phrase: 'while ... is being reviewed/investigated', meaning: 'describes something happening during an ongoing process' }],
        exampleSentences: ['Will my application be processed while I’m abroad?'],
        pronunciationTips: ['Keep a calm, even tone — this is a clarifying question, not a complaint.']
      }
    ]
  })
];
