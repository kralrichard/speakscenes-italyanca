import { createDialogue } from '../dialogueSchema.js';

export const HOSPITAL_DIALOGUES = [
  createDialogue({
    id: 'hospital-doctor-consult-a2-01',
    locationId: 'hospital',
    scenarioId: 'doctor-consult',
    title: 'Talking to a Doctor',
    level: 'A2',
    variant: 1,
    length: 'medium',
    goal: 'Describe how you feel and understand the doctor’s advice.',
    tags: ['problem-solving', 'advice'],
    sceneType: 'hospital',
    characters: {
      A: { name: 'Dr. Bennett', role: 'Doctor', gender: 'female', accent: 'british', avatarPreset: 'doctor_f' },
      B: { name: 'Patient', role: 'Patient', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Hello, please have a seat. What seems to be the problem?', translation_tr: 'Merhaba, lütfen oturun. Sorun ne görünüyor?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'I’ve had a sore throat and a fever since yesterday.',
        altAccepted: ['I have a sore throat and a fever since yesterday.', 'Since yesterday I’ve had a fever and a sore throat.'],
        translation_tr: 'Dünden beri boğazım ağrıyor ve ateşim var.',
        register: 'neutral', ipa: '/aɪv hæd ə sɔːr θroʊt ænd ə ˈfiːvər sɪns ˈjɛstərdeɪ/',
        grammar: [
          { word: 'I’ve had', role: 'present perfect', note: 'Describes a symptom that started in the past and continues now.' },
          { word: 'a sore throat', role: 'object', note: 'A common symptom expression — "sore" means painful.' },
          { word: 'since', role: 'preposition of time', note: 'Marks the starting point of a continuing situation.' }
        ],
        keyExpressions: [{ phrase: 'I’ve had ... since ...', meaning: 'describes a symptom that began at a point in the past and continues' }],
        exampleSentences: ['I’ve had a headache since this morning.'],
        pronunciationTips: ['Don’t drop the "v" sound in "I’ve" — it should be clearly heard, not "I had."']
      },
      { speaker: 'A', text: 'I see. Do you have any other symptoms, like a cough?', translation_tr: 'Anlıyorum. Öksürük gibi başka belirtileriniz var mı?', emotion: 'thinking', register: 'formal' },
      {
        speaker: 'B', expected: 'Yes, a little bit, especially at night.',
        altAccepted: ['Yes, a slight cough, mostly at night.'],
        translation_tr: 'Evet, biraz, özellikle geceleri.',
        register: 'informal', ipa: '/jɛs ə ˈlɪtəl bɪt ɪˈspɛʃəli æt naɪt/',
        grammar: [
          { word: 'a little bit', role: 'adverbial phrase', note: 'Softens the degree of the symptom — "a small amount."' },
          { word: 'especially', role: 'adverb', note: 'Highlights when the symptom is worst.' }
        ],
        keyExpressions: [{ phrase: 'a little bit', meaning: 'a small amount' }],
        exampleSentences: ['I’m a little bit tired today.'],
        pronunciationTips: ['Link "a little bit" together smoothly, almost like one word.']
      },
      { speaker: 'A', text: 'Okay. It looks like a common cold. Rest, drink plenty of water, and take paracetamol if needed.', translation_tr: 'Tamam. Bu sıradan bir soğuk algınlığı gibi görünüyor. Dinlenin, bol su için ve gerekirse parasetamol alın.', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Okay, thank you very much, doctor.',
        altAccepted: ['Thank you very much, doctor.', 'Alright, thanks a lot, doctor.'],
        translation_tr: 'Tamam, çok teşekkür ederim, doktor.',
        register: 'formal', ipa: '/oʊˈkeɪ θæŋk juː ˈvɛri mʌtʃ ˈdɒktər/',
        grammar: [{ word: 'thank you very much', role: 'fixed phrase', note: 'A stronger, more grateful way to say thanks.' }],
        keyExpressions: [{ phrase: 'thank you very much, doctor', meaning: 'a respectful way to close a medical consultation' }],
        exampleSentences: ['Thank you very much for your time, doctor.'],
        pronunciationTips: ['Stress "very" slightly to sound sincere.']
      }
    ]
  })
];
