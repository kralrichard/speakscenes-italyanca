import { createDialogue } from '../dialogueSchema.js?v=5';

export const TRAIN_STATION_DIALOGUES = [
  createDialogue({
    id: 'train-station-buying-ticket-a2-01',
    locationId: 'train-station',
    scenarioId: 'buying-ticket',
    title: 'Buying a Train Ticket',
    level: 'A2',
    variant: 1,
    length: 'medium',
    goal: 'Buy the right ticket for your journey.',
    tags: ['booking', 'directions'],
    sceneType: 'transit',
    characters: {
      A: { name: 'Tom', role: 'Ticket Clerk', gender: 'male', accent: 'british', avatarPreset: 'clerk_m' },
      B: { name: 'Traveler', role: 'Traveler', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Good afternoon. Where would you like to go?', translation_tr: 'İyi günler. Nereye gitmek istersiniz?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'One ticket to Manchester, please.',
        altAccepted: ['A ticket to Manchester, please.', 'One ticket to Manchester.'],
        translation_tr: 'Manchester’a bir bilet, lütfen.',
        register: 'neutral', ipa: '/wʌn ˈtɪkɪt tuː ˈmæntʃɪstər pliːz/',
        grammar: [
          { word: 'One ticket', role: 'object', note: 'States the quantity before the item.' },
          { word: 'to Manchester', role: 'prepositional phrase', note: 'Shows the destination of the ticket.' }
        ],
        keyExpressions: [{ phrase: 'One ticket to..., please', meaning: 'a standard way to request a ticket' }],
        exampleSentences: ['Two tickets to Boston, please.'],
        pronunciationTips: ['Say "ticket" with a crisp "t" at the start and end.']
      },
      { speaker: 'A', text: 'Single or return?', translation_tr: 'Tek yön mü gidiş-dönüş mü?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Return, please. I’m coming back tomorrow.',
        altAccepted: ['A return ticket, please.', 'Return, I’ll be back tomorrow.'],
        translation_tr: 'Gidiş-dönüş, lütfen. Yarın geri döneceğim.',
        register: 'neutral', ipa: '/rɪˈtɜːrn pliːz aɪm ˈkʌmɪŋ bæk təˈmɒroʊ/',
        grammar: [
          { word: 'Return', role: 'noun (ticket type)', note: 'British English term for a round-trip ticket.' },
          { word: 'I’m coming back', role: 'present continuous (future plan)', note: 'Explains the reason for choosing "return."' }
        ],
        keyExpressions: [{ phrase: 'single vs. return', meaning: 'one-way ticket vs. round-trip ticket (British English)' }],
        exampleSentences: ['I’ll take a single, thanks — I’m not coming back this way.'],
        pronunciationTips: ['Stress the second syllable: re-TURN.']
      },
      { speaker: 'A', text: 'That’ll be eighteen pounds. Which platform, you ask? Platform four.', translation_tr: 'On sekiz sterlin olacak. Hangi peron mu diyorsunuz? Dördüncü peron.', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Thank you. Which platform did you say again?',
        altAccepted: ['Thanks, sorry, which platform was that?', 'Thank you, could you repeat the platform number?'],
        translation_tr: 'Teşekkürler. Hangi peron demiştiniz?',
        register: 'neutral', ipa: '/θæŋk juː wɪtʃ ˈplætfɔːrm dɪd juː seɪ əˈgɛn/',
        grammar: [
          { word: 'Which platform', role: 'question phrase', note: 'Asks for a specific choice among several platforms.' },
          { word: 'did you say', role: 'past simple question', note: 'Politely asks someone to repeat information already given.' },
          { word: 'again', role: 'adverb', note: 'Signals you are asking for a repeat, not new information.' }
        ],
        keyExpressions: [{ phrase: '...did you say again?', meaning: 'a polite way to ask someone to repeat something' }],
        exampleSentences: ['Sorry, what time did you say again?'],
        pronunciationTips: ['Slightly stress "platform" — that’s the key word you need repeated.']
      }
    ]
  })
];
