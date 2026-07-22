import { createDialogue } from '../dialogueSchema.js';

export const BUSINESS_MEETING_DIALOGUES = [
  createDialogue({
    id: 'business-meeting-negotiation-c1-01',
    locationId: 'business-meeting',
    scenarioId: 'negotiation',
    title: 'Negotiating a Contract Deal',
    level: 'C1',
    variant: 1,
    length: 'long',
    goal: 'Negotiate better terms on a contract without damaging the relationship.',
    tags: ['negotiation'],
    sceneType: 'formal-office',
    characters: {
      A: { name: 'Mr. Whitfield', role: 'Supplier Representative', gender: 'male', accent: 'british', avatarPreset: 'exec_m' },
      B: { name: 'You', role: 'Procurement Manager', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'We’ve reviewed your proposal, and honestly, a fifteen percent discount is a stretch on our end.', translation_tr: 'Teklifinizi inceledik ve açıkçası yüzde on beşlik bir indirim bizim için zorlayıcı.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'I appreciate that, and I understand there’s only so much room to move. That said, given the volume we’re committing to, ten percent feels like fair middle ground.',
        altAccepted: ['I hear you, and I know margins are tight on your side. Still, considering the volume involved, ten percent seems like a reasonable compromise.', 'Understood — I know there’s limited flexibility. That said, with the volume we’re offering, ten percent strikes me as a fair middle ground.'],
        translation_tr: 'Bunu takdir ediyorum ve hareket alanının sınırlı olduğunu anlıyorum. Yine de, taahhüt ettiğimiz hacmi göz önüne alırsak, yüzde on adil bir orta yol gibi görünüyor.',
        register: 'formal', ipa: '/aɪ əˈpriːʃieɪt ðæt ænd aɪ ˌʌndərˈstænd ðɛərz ˈoʊnli soʊ mʌtʃ ruːm tuː muːv ðæt sɛd ˌgɪvən ðə ˈvɒljuːm wɪər kəˈmɪtɪŋ tuː tɛn pərˈsɛnt fiːlz laɪk fɛər ˈmɪdəl graʊnd/',
        grammar: [
          { word: 'I appreciate that, and I understand...', role: 'diplomatic acknowledgment', note: 'Validates the other side’s position before countering — a core negotiation technique.' },
          { word: 'That said', role: 'discourse marker', note: 'Signals a contrast is coming, softer than "but."' },
          { word: 'given the volume we’re committing to', role: 'reduced participial clause', note: 'A concise, formal way to state a justification ("given" = "considering").' },
          { word: 'fair middle ground', role: 'idiomatic collocation', note: 'A compromise position both sides can accept.' }
        ],
        keyExpressions: [
          { phrase: 'there’s only so much room to move', meaning: 'idiom: limited flexibility to negotiate further' },
          { phrase: 'fair middle ground', meaning: 'a reasonable compromise between two positions' }
        ],
        exampleSentences: ['Given the timeline we’re working with, a two-week extension seems like fair middle ground.'],
        pronunciationTips: ['Use falling intonation on "middle ground" to sound settled and confident, not tentative.']
      },
      { speaker: 'A', text: 'I take your point about volume. Let me float this past finance and see if twelve percent could work.', translation_tr: 'Hacim konusundaki noktanızı anlıyorum. Bunu finans ekibine iletip yüzde on ikinin işe yarayıp yaramayacağına bakayım.', emotion: 'thinking', register: 'formal' },
      {
        speaker: 'B', expected: 'Twelve would definitely be workable on our side. I’d also be open to a longer contract term if that sweetens the deal for you.',
        altAccepted: ['Twelve percent would work well for us. And I’m happy to consider a longer term if that helps on your end.', 'We could certainly work with twelve. I’m also open to extending the contract length if that makes it easier for you to agree.'],
        translation_tr: 'On iki kesinlikle bizim için uygun olur. Sizin için anlaşmayı tatlandırıyorsa daha uzun bir sözleşme süresine de açığım.',
        register: 'formal', ipa: '/twɛlv wʊd ˈdɛfɪnətli biː ˈwɜːrkəbəl ɒn aʊər saɪd aɪd ˈɔːlsoʊ biː ˈoʊpən tuː ə ˈlɒŋgər ˈkɒntrækt tɜːrm ɪf ðæt ˈswiːtənz ðə diːl fɔːr juː/',
        grammar: [
          { word: 'workable', role: 'adjective', note: 'Business register for "acceptable / feasible."' },
          { word: 'I’d also be open to', role: 'hedged offer (conditional)', note: 'Signals flexibility without over-committing.' },
          { word: 'sweetens the deal', role: 'idiom', note: 'Makes an offer more attractive to the other party.' }
        ],
        keyExpressions: [{ phrase: 'sweeten the deal', meaning: 'idiom: to make an offer more appealing' }],
        exampleSentences: ['We could throw in free shipping to sweeten the deal.'],
        pronunciationTips: ['Keep "workable" crisp — three even syllables: WORK-a-ble.']
      }
    ]
  }),

  createDialogue({
    id: 'business-meeting-presentation-c1-01',
    locationId: 'business-meeting',
    scenarioId: 'presentation',
    title: 'Fielding Questions After a Presentation',
    level: 'C1',
    variant: 1,
    length: 'long',
    goal: 'Handle a tough question after your presentation with poise.',
    tags: ['presentation'],
    sceneType: 'formal-office',
    characters: {
      A: { name: 'Director Kim', role: 'Senior Director', gender: 'female', accent: 'international', avatarPreset: 'exec_f' },
      B: { name: 'You', role: 'Project Lead', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Thanks for the overview. I have to ask, though — the timeline looks optimistic. What happens if it slips?', translation_tr: 'Genel bakış için teşekkürler. Ama sormam gerekiyor — zaman çizelgesi iyimser görünüyor. Eğer gecikirse ne olur?', emotion: 'curious', register: 'formal' },
      {
        speaker: 'B', expected: 'That’s a fair concern. We’ve built in a two-week buffer, and if we do slip beyond that, the rollout would shift, not the launch quality.',
        altAccepted: ['Fair point — we’ve allowed a two-week buffer, so if things do slip, it’s the rollout date that moves, not the quality of the launch.', 'That’s a valid question. We have a two-week buffer built in, so any slippage would delay the rollout rather than compromise quality.'],
        translation_tr: 'Bu geçerli bir endişe. İki haftalık bir tampon süre koyduk ve bunu aşarsak, gecikecek olan lansman kalitesi değil, dağıtım olur.',
        register: 'formal', ipa: '/ðæts ə fɛər kənˈsɜːrn wiːv bɪlt ɪn ə tuː wiːk ˈbʌfər ænd ɪf wiː duː slɪp bɪˈjɒnd ðæt ðə ˈroʊlaʊt wʊd ʃɪft nɒt ðə lɔːntʃ ˈkwɒləti/',
        grammar: [
          { word: 'That’s a fair concern', role: 'validating opener', note: 'Acknowledges the question’s legitimacy before answering — defuses tension.' },
          { word: 'we’ve built in', role: 'present perfect', note: 'Emphasizes a decision already made and still in effect (a safeguard).' },
          { word: 'would shift, not the launch quality', role: 'contrastive parallel structure', note: 'Clarifies exactly what is and isn’t at risk, a precise, confident framing.' }
        ],
        keyExpressions: [{ phrase: 'That’s a fair concern/point', meaning: 'a professional way to validate a challenging question' }, { phrase: 'built in a buffer', meaning: 'to include extra time/margin for safety' }],
        exampleSentences: ['We’ve built in some contingency budget in case costs rise.'],
        pronunciationTips: ['Pause briefly after "fair concern" — it gives the acknowledgment room to land before you pivot to the answer.']
      },
      { speaker: 'A', text: 'That’s reassuring. And who makes the call if we do end up needing that buffer?', translation_tr: 'Bu rahatlatıcı. Peki o tampon süreye ihtiyaç duyarsak kararı kim verir?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'That decision would sit with me and the engineering lead jointly, and we’d flag it to you well before it became urgent.',
        altAccepted: ['That call would be made jointly by me and the engineering lead, and you’d hear about it well before it became urgent.', 'The engineering lead and I would make that call together, and we’d loop you in early, well before it turned urgent.'],
        translation_tr: 'Bu karar benimle mühendislik liderinin ortak sorumluluğunda olur ve bu aciliyet kazanmadan çok önce sizi bilgilendiririz.',
        register: 'formal', ipa: '/ðæt dɪˈsɪʒən wʊd sɪt wɪð miː ænd ðə ˌɛndʒɪˈnɪərɪŋ liːd ˈdʒɔɪntli ænd wiːd flæg ɪt tuː juː wɛl bɪˈfɔːr ɪt bɪˈkeɪm ˈɜːrdʒənt/',
        grammar: [
          { word: 'would sit with', role: 'idiomatic collocation', note: 'Means "would be the responsibility of" — natural in leadership contexts.' },
          { word: 'we’d flag it to you', role: 'conditional + phrasal verb', note: '"Flag" means to bring something to someone’s attention proactively.' },
          { word: 'well before it became urgent', role: 'time clause with emphatic "well"', note: '"Well" intensifies "before," stressing how early the warning would come.' }
        ],
        keyExpressions: [{ phrase: 'sit with (someone)', meaning: 'to be the responsibility of a person or group' }, { phrase: 'flag something', meaning: 'to proactively bring an issue to someone’s attention' }],
        exampleSentences: ['Final sign-off sits with the client, not with us.'],
        pronunciationTips: ['Give "jointly" its own clear beat — it’s the word that signals shared accountability.']
      }
    ]
  })
];
