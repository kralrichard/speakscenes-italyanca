import { createDialogue } from '../dialogueSchema.js';

export const RESTAURANT_DIALOGUES = [
  createDialogue({
    id: 'restaurant-ordering-food-a2-01',
    locationId: 'restaurant',
    scenarioId: 'ordering-food',
    title: 'Ordering Food',
    level: 'A2',
    variant: 1,
    length: 'medium',
    goal: 'Order a meal and a drink from the waiter.',
    tags: ['ordering'],
    sceneType: 'restaurant',
    characters: {
      A: { name: 'Elena', role: 'Waiter', gender: 'female', accent: 'american', avatarPreset: 'waiter_f' },
      B: { name: 'Diner', role: 'Restaurant Guest', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Hi, are you ready to order, or do you need a few more minutes?', translation_tr: 'Merhaba, sipariş vermeye hazır mısınız yoksa birkaç dakikaya daha mı ihtiyacınız var?', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'I’m ready. I’d like the grilled chicken with salad.',
        altAccepted: ['I’m ready to order. I’ll have the grilled chicken with salad.'],
        translation_tr: 'Hazırım. Salatalı ızgara tavuk istiyorum.',
        register: 'neutral', ipa: '/aɪm ˈrɛdi aɪd laɪk ðə grɪld ˈtʃɪkɪn wɪð ˈsæləd/',
        grammar: [
          { word: 'I’d like', role: 'polite request (would + like)', note: 'More polite than "I want" — the standard way to order food.' },
          { word: 'the grilled chicken', role: 'object', note: '"Grilled" is a past participle used as an adjective describing how the chicken is cooked.' },
          { word: 'with', role: 'preposition', note: 'Connects the main dish to what comes alongside it.' }
        ],
        keyExpressions: [{ phrase: 'I’d like...', meaning: 'a polite way to order food or request something' }],
        exampleSentences: ['I’d like the soup to start, please.'],
        pronunciationTips: ['Contract "I would" to "I’d" — it should sound like one syllable, not two words.']
      },
      { speaker: 'A', text: 'Great choice. And what would you like to drink?', translation_tr: 'Harika seçim. Peki içmek için ne istersiniz?', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'Just a glass of water, please.',
        altAccepted: ['I’ll just have water, please.', 'Water, please.'],
        translation_tr: 'Sadece bir bardak su, lütfen.',
        register: 'neutral', ipa: '/dʒʌst ə glæs ʌv ˈwɔːtər pliːz/',
        grammar: [
          { word: 'Just', role: 'adverb (limiting)', note: 'Shows that this is the only thing you want — nothing more.' },
          { word: 'a glass of water', role: 'object', note: '"Glass of" is a common quantity expression for liquids.' }
        ],
        keyExpressions: [{ phrase: 'a glass of...', meaning: 'used for quantities of drinks' }],
        exampleSentences: ['Could I have a glass of orange juice?'],
        pronunciationTips: ['Say "glass" with a clear, short "a" sound.']
      },
      { speaker: 'A', text: 'Sure thing. Your food will be ready in about fifteen minutes.', translation_tr: 'Tabii ki. Yemeğiniz yaklaşık on beş dakika içinde hazır olacak.', emotion: 'friendly', register: 'informal' },
      {
        speaker: 'B', expected: 'Perfect, thank you.',
        altAccepted: ['That’s great, thanks.', 'Sounds good, thank you.'],
        translation_tr: 'Mükemmel, teşekkür ederim.',
        register: 'neutral', ipa: '/ˈpɜːrfɪkt θæŋk juː/',
        grammar: [{ word: 'Perfect', role: 'interjection', note: 'Shows satisfaction with the information given.' }],
        keyExpressions: [{ phrase: 'Perfect, thank you', meaning: 'a warm, simple way to close a small exchange' }],
        exampleSentences: ['Perfect, thank you for your help.'],
        pronunciationTips: ['Stress the first syllable: PER-fect.']
      }
    ]
  }),

  createDialogue({
    id: 'restaurant-order-complaint-b1-01',
    locationId: 'restaurant',
    scenarioId: 'order-complaint',
    title: 'Complaining About an Order',
    level: 'B1',
    variant: 1,
    length: 'medium',
    goal: 'Explain that your order is wrong and get it fixed.',
    tags: ['complaint', 'problem-solving'],
    sceneType: 'restaurant',
    characters: {
      A: { name: 'Elena', role: 'Waiter', gender: 'female', accent: 'american', avatarPreset: 'waiter_f' },
      B: { name: 'Diner', role: 'Restaurant Guest', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Here’s your pasta — enjoy!', translation_tr: 'İşte makarnanız — afiyet olsun!', emotion: 'happy', register: 'informal' },
      {
        speaker: 'B', expected: 'Sorry, I think there’s been a mistake. I actually ordered the soup.',
        altAccepted: ['Excuse me, I think this is wrong — I ordered the soup.', 'Sorry, I ordered the soup, not the pasta.'],
        translation_tr: 'Üzgünüm, sanırım bir hata oldu. Aslında çorba sipariş etmiştim.',
        register: 'neutral', ipa: '/ˈsɒri aɪ θɪŋk ðɛərz bɪn ə mɪˈsteɪk aɪ ˈæktʃuəli ˈɔːrdərd ðə suːp/',
        grammar: [
          { word: 'I think', role: 'softening phrase', note: 'Makes the complaint sound polite instead of accusatory.' },
          { word: 'there’s been a mistake', role: 'present perfect passive', note: 'Focuses on the result (a mistake exists now) rather than blaming anyone directly.' },
          { word: 'actually', role: 'adverb', note: 'Signals a correction — "what really happened was..."' }
        ],
        keyExpressions: [{ phrase: 'I think there’s been a mistake', meaning: 'a polite way to point out an error' }],
        exampleSentences: ['I think there’s been a mistake with the bill.'],
        pronunciationTips: ['Keep your tone light and polite — rising intonation on "mistake" softens the complaint.']
      },
      { speaker: 'A', text: 'Oh, I’m so sorry about that! Let me fix it right away.', translation_tr: 'Aman, bunun için çok özür dilerim! Hemen düzelteyim.', emotion: 'apologetic', register: 'informal' },
      {
        speaker: 'B', expected: 'No worries, thanks for taking care of it.',
        altAccepted: ['It’s okay, thank you for sorting it out.', 'No problem, thanks for fixing it.'],
        translation_tr: 'Sorun değil, ilgilendiğiniz için teşekkürler.',
        register: 'informal', ipa: '/noʊ ˈwɜːrɪz θæŋks fɔːr ˈteɪkɪŋ kɛər ʌv ɪt/',
        grammar: [
          { word: 'No worries', role: 'fixed expression', note: 'A relaxed, informal way of saying "it’s fine" or "don’t worry about it."' },
          { word: 'taking care of it', role: 'phrasal expression', note: '"Take care of" means "to deal with / handle" a problem.' }
        ],
        keyExpressions: [{ phrase: 'take care of it', meaning: 'to deal with or resolve a problem' }],
        exampleSentences: ['Don’t worry, I’ll take care of it.'],
        pronunciationTips: ['"No worries" is casual — say it quickly and lightly, not formally.']
      }
    ]
  })
];
