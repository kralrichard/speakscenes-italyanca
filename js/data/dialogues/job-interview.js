import { createDialogue } from '../dialogueSchema.js?v=5';

export const JOB_INTERVIEW_DIALOGUES = [
  createDialogue({
    id: 'job-interview-general-b2-01',
    locationId: 'job-interview',
    scenarioId: 'general-interview',
    title: 'A General Job Interview',
    level: 'B2',
    variant: 1,
    length: 'long',
    goal: 'Present yourself confidently and answer common interview questions.',
    tags: ['interview'],
    sceneType: 'formal-office',
    characters: {
      A: { name: 'Ms. Carter', role: 'Hiring Manager', gender: 'female', accent: 'american', avatarPreset: 'manager_f' },
      B: { name: 'Candidate', role: 'Job Candidate', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Thanks for coming in. Could you start by telling me a bit about yourself?', translation_tr: 'Geldiğiniz için teşekkürler. Kendinizden biraz bahsederek başlayabilir misiniz?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Of course. I’ve spent the last four years working in marketing, mostly focusing on digital campaigns.',
        altAccepted: ['Sure. For the past four years, I’ve worked in marketing, focusing mainly on digital campaigns.', 'Certainly. I’ve been in marketing for four years now, primarily on the digital side.'],
        translation_tr: 'Elbette. Son dört yılı pazarlama alanında, çoğunlukla dijital kampanyalara odaklanarak geçirdim.',
        register: 'formal', ipa: '/aɪv spɛnt ðə læst fɔːr jɪərz ˈwɜːrkɪŋ ɪn ˈmɑːrkɪtɪŋ ˈmoʊstli ˈfoʊkəsɪŋ ɒn ˈdɪdʒɪtəl kæmˈpeɪnz/',
        grammar: [
          { word: 'I’ve spent', role: 'present perfect', note: 'Connects past experience to the present — appropriate for summarizing a career so far.' },
          { word: 'mostly focusing on', role: 'present participle clause', note: 'Adds detail about the nature of the work without starting a new sentence.' }
        ],
        keyExpressions: [{ phrase: 'I’ve spent the last [x] years...', meaning: 'a common, professional way to summarize recent experience' }],
        exampleSentences: ['I’ve spent the last two years leading a small design team.'],
        pronunciationTips: ['Keep a steady, confident pace — avoid rushing through the whole sentence in one breath.']
      },
      { speaker: 'A', text: 'Great. What would you say is your biggest strength, and where do you think you could improve?', translation_tr: 'Harika. En büyük gücünüzün ne olduğunu ve nerede gelişebileceğinizi düşünüyorsunuz?', emotion: 'thinking', register: 'formal' },
      {
        speaker: 'B', expected: 'I’d say my biggest strength is problem-solving under pressure, though I’m still working on delegating more effectively.',
        altAccepted: ['My biggest strength is probably staying calm under pressure, but I’m still learning to delegate better.', 'I think my strongest point is problem-solving, though I could improve at delegating tasks.'],
        translation_tr: 'Sanırım en büyük gücüm baskı altında problem çözmek, ancak hâlâ daha etkili delege etmeyi öğreniyorum.',
        register: 'formal', ipa: '/aɪd seɪ maɪ ˈbɪgɪst strɛŋθ ɪz ˈprɒbləm ˈsɒlvɪŋ ˈʌndər ˈprɛʃər ðoʊ aɪm stɪl ˈwɜːrkɪŋ ɒn ˈdɛlɪɡeɪtɪŋ mɔːr ɪˈfɛktɪvli/',
        grammar: [
          { word: 'I’d say', role: 'hedging phrase', note: 'Softens a confident claim, making it sound thoughtful rather than boastful.' },
          { word: 'though', role: 'contrast conjunction', note: 'Introduces a balancing, honest self-critique after the strength.' },
          { word: 'I’m still working on', role: 'present continuous', note: 'Frames a weakness as an ongoing improvement, not a fixed flaw.' }
        ],
        keyExpressions: [{ phrase: 'I’m still working on...', meaning: 'a diplomatic way to admit an area for improvement' }],
        exampleSentences: ['I’m still working on my public speaking.'],
        pronunciationTips: ['Slightly stress "though" to signal the shift from strength to weakness.']
      },
      { speaker: 'A', text: 'That’s good self-awareness. Do you have any questions for me?', translation_tr: 'Bu iyi bir öz farkındalık. Bana sormak istediğiniz bir sorunuz var mı?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Yes, actually — what does success look like in this role after the first six months?',
        altAccepted: ['Yes, I’d love to know what success would look like in this position after six months.', 'Actually yes — how would you measure success in this role early on?'],
        translation_tr: 'Evet, aslında — ilk altı aydan sonra bu rolde başarı nasıl görünüyor?',
        register: 'formal', ipa: '/jɛs ˈæktʃuəli wʌt dʌz səkˈsɛs lʊk laɪk ɪn ðɪs roʊl ˈæftər ðə fɜːrst sɪks mʌnθs/',
        grammar: [
          { word: 'what does success look like', role: 'indirect-style question', note: 'A thoughtful, open question format often used in interviews.' },
          { word: 'after the first six months', role: 'time phrase', note: 'Anchors the question to a concrete, near-term period.' }
        ],
        keyExpressions: [{ phrase: 'What does success look like in this role?', meaning: 'a strong closing question showing genuine engagement' }],
        exampleSentences: ['What does a typical day look like in this position?'],
        pronunciationTips: ['End on a genuinely curious, rising tone — this is a real question, not a rehearsed line.']
      }
    ]
  })
];
