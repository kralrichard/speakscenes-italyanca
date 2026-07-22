import { createScenario } from '../scenarioSchema.js';

// ── Home: a morning at home (A1) ────────────────────────────────────────────
export const homeMorning = createScenario({
  id: 'home-morning',
  title: 'A morning at home',
  titleTr: 'Evde bir sabah',
  environmentId: 'home', sceneType: 'home', level: 'A1',
  goal: 'Chat with your sister over breakfast.',
  goalTr: 'Kahvaltıda kız kardeşinle sohbet et.',
  npcIds: ['emma'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'emma', emotion: 'happy',
      text: 'Good morning! You’re up early. Did you sleep well?',
      translation: 'Günaydın! Erken kalkmışsın. İyi uyudun mu?',
      choices: [
        { id: 'slept_well', intentionTr: 'İyi uyuduğunu söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Good morning! Yes, I slept really well, thanks.',
          translation: 'Günaydın! Evet, çok iyi uyudum, teşekkürler.',
          altAccepted: ['Yes, I slept well thanks', 'Morning, I slept great'],
          next: 'breakfast' },
        { id: 'tired', intentionTr: 'Hâlâ yorgun olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Morning. Not really — I’m still a bit tired.',
          translation: 'Günaydın. Pek sayılmaz — hâlâ biraz yorgunum.',
          altAccepted: ['Not really, I’m still tired', 'I’m still a little tired'],
          next: 'breakfast' }
      ]
    },
    breakfast: {
      id: 'breakfast', speakerId: 'emma', emotion: 'friendly',
      text: 'I’m making eggs. Do you want some, or just coffee?',
      translation: 'Yumurta yapıyorum. Sen de ister misin, yoksa sadece kahve mi?',
      choices: [
        { id: 'eggs', intentionTr: 'Yumurta iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Eggs sound great, yes please!',
          translation: 'Yumurta harika olur, evet lütfen!',
          altAccepted: ['Yes please, eggs sound great', 'I’d love some eggs'],
          next: 'plans' },
        { id: 'just_coffee', intentionTr: 'Sadece kahve iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Just coffee for me, thanks.',
          translation: 'Bana sadece kahve, teşekkürler.',
          altAccepted: ['Just coffee please', 'Only coffee, thanks'],
          next: 'plans' }
      ]
    },
    plans: {
      id: 'plans', speakerId: 'emma', emotion: 'curious',
      text: 'So what are your plans today? Anything fun?',
      translation: 'Peki bugün planların ne? Eğlenceli bir şey var mı?',
      choices: [
        { id: 'busy', intentionTr: 'Meşgul olduğunu söyle', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'I’m pretty busy — I have work and then the gym.',
          translation: 'Oldukça meşgulüm — işim var, sonra da spor salonu.',
          altAccepted: ['I have work and then the gym', 'Busy day, work then the gym'],
          next: 'end_day' },
        { id: 'invite', intentionTr: 'Kız kardeşini bir şeye davet et', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Not much! Do you want to go to the market together later?',
          translation: 'Pek bir şey yok! Sonra birlikte pazara gitmek ister misin?',
          altAccepted: ['Do you want to go to the market together', 'Want to go to the market with me later'],
          next: 'end_together', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_day: { id: 'end_day', kind: 'success', title: 'Off to a busy day', titleTr: 'Yoğun bir güne',
      text: 'A nice, natural morning chat. You told your sister about your day clearly.',
      translation: 'Hoş, doğal bir sabah sohbeti. Gününü kız kardeşine net biçimde anlattın.',
      coins: 8 },
    end_together: { id: 'end_together', kind: 'relationship', title: 'Plans together', titleTr: 'Birlikte plan',
      text: 'You invited your sister out and made a plan. Little conversations like this are real, everyday English.',
      translation: 'Kız kardeşini dışarı davet edip plan yaptın. Bunun gibi küçük sohbetler gerçek, günlük İngilizcedir.',
      relationshipEffect: 1, coins: 12 }
  }
});
