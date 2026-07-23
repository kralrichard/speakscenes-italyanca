import { createScenario } from '../scenarioSchema.js?v=6';

// ── Home: a morning at home (A1) ────────────────────────────────────────────
export const homeMorning = createScenario({
  id: 'home-morning',
  title: 'Una mattina a casa',
  titleTr: 'Evde bir sabah',
  environmentId: 'home', sceneType: 'home', level: 'A1',
  goal: 'Chiacchiera con tua sorella durante la colazione.',
  goalTr: 'Kahvaltıda kız kardeşinle sohbet et.',
  npcIds: ['emma'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'emma', emotion: 'happy',
      text: 'Buongiorno! Sei sveglio presto. Hai dormito bene?',
      translation: 'Günaydın! Erken kalkmışsın. İyi uyudun mu?',
      choices: [
        { id: 'slept_well', intentionTr: 'İyi uyuduğunu söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Buongiorno! Sì, ho dormito benissimo, grazie.',
          translation: 'Günaydın! Evet, çok iyi uyudum, teşekkürler.',
          altAccepted: ['Sì, ho dormito bene grazie', 'Buongiorno, ho dormito alla grande'],
          next: 'breakfast' },
        { id: 'tired', intentionTr: 'Hâlâ yorgun olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Buongiorno. Non proprio — sono ancora un po’ stanco.',
          translation: 'Günaydın. Pek sayılmaz — hâlâ biraz yorgunum.',
          altAccepted: ['Non proprio, sono ancora stanco', 'Sono ancora un po’ stanco'],
          next: 'breakfast' }
      ]
    },
    breakfast: {
      id: 'breakfast', speakerId: 'emma', emotion: 'friendly',
      text: 'Sto facendo le uova. Ne vuoi un po’, o solo un caffè?',
      translation: 'Yumurta yapıyorum. Sen de ister misin, yoksa sadece kahve mi?',
      choices: [
        { id: 'eggs', intentionTr: 'Yumurta iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Le uova sono un’ottima idea, sì grazie!',
          translation: 'Yumurta harika olur, evet lütfen!',
          altAccepted: ['Sì grazie, le uova sono un’ottima idea', 'Volentieri, un po’ di uova'],
          next: 'plans' },
        { id: 'just_coffee', intentionTr: 'Sadece kahve iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Per me solo un caffè, grazie.',
          translation: 'Bana sadece kahve, teşekkürler.',
          altAccepted: ['Solo caffè per favore', 'Solo un caffè, grazie'],
          next: 'plans' }
      ]
    },
    plans: {
      id: 'plans', speakerId: 'emma', emotion: 'curious',
      text: 'Allora, che programmi hai oggi? Qualcosa di divertente?',
      translation: 'Peki bugün planların ne? Eğlenceli bir şey var mı?',
      choices: [
        { id: 'busy', intentionTr: 'Meşgul olduğunu söyle', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Sono piuttosto impegnato — ho il lavoro e poi la palestra.',
          translation: 'Oldukça meşgulüm — işim var, sonra da spor salonu.',
          altAccepted: ['Ho il lavoro e poi la palestra', 'Giornata piena, lavoro poi palestra'],
          next: 'end_day' },
        { id: 'invite', intentionTr: 'Kız kardeşini bir şeye davet et', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Non granché! Ti va di andare al mercato insieme più tardi?',
          translation: 'Pek bir şey yok! Sonra birlikte pazara gitmek ister misin?',
          altAccepted: ['Vuoi andare al mercato insieme', 'Ti va di andare al mercato con me dopo'],
          next: 'end_together', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_day: { id: 'end_day', kind: 'success', title: 'Verso una giornata piena', titleTr: 'Yoğun bir güne',
      text: 'Una bella chiacchiera mattutina, naturale. Hai raccontato la tua giornata a tua sorella con chiarezza.',
      translation: 'Hoş, doğal bir sabah sohbeti. Gününü kız kardeşine net biçimde anlattın.',
      coins: 8 },
    end_together: { id: 'end_together', kind: 'relationship', title: 'Programmi insieme', titleTr: 'Birlikte plan',
      text: 'Hai invitato tua sorella a uscire e avete fatto un programma. Piccole conversazioni come questa sono vero italiano di tutti i giorni.',
      translation: 'Kız kardeşini dışarı davet edip plan yaptın. Bunun gibi küçük sohbetler gerçek, günlük İngilizcedir.',
      relationshipEffect: 1, coins: 12 }
  }
});
