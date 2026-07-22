import { createScenario } from '../scenarioSchema.js';

// ── Meeting a new friend (A1) ───────────────────────────────────────────────
export const meetingFriend = createScenario({
  id: 'meeting-friend',
  title: 'Meeting a new classmate',
  titleTr: 'Yeni bir sınıf arkadaşıyla tanışmak',
  environmentId: 'street', sceneType: 'school', level: 'A1',
  goal: 'Introduce yourself and make a new friend.',
  goalTr: 'Kendini tanıt ve yeni bir arkadaş edin.',
  npcIds: ['leo'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'leo', emotion: 'friendly',
      text: 'Hi! I don’t think we’ve met. I’m Leo. Are you new here?',
      translation: 'Selam! Sanırım tanışmadık. Ben Leo. Buraya yeni mi geldin?',
      choices: [
        { id: 'introduce', intentionTr: 'Kendini tanıt', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Hi Leo! I’m Sam. Yes, it’s my first week.',
          translation: 'Selam Leo! Ben Sam. Evet, ilk haftam.',
          altAccepted: ['Hi, I’m Sam, yes it’s my first week', 'Hello Leo, my name is Sam, I’m new'],
          next: 'where_from', relationshipEffect: 1 },
        { id: 'shy', intentionTr: 'Utangaç ama nazik ol', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Hello. Yes, I’m new. Nice to meet you.',
          translation: 'Merhaba. Evet, yeniyim. Tanıştığıma memnun oldum.',
          altAccepted: ['Hi, yes I’m new, nice to meet you', 'Hello, I’m new here, nice to meet you'],
          next: 'where_from' }
      ]
    },
    where_from: {
      id: 'where_from', speakerId: 'leo', emotion: 'curious',
      text: 'Nice to meet you, Sam! Where are you from?',
      translation: 'Tanıştığıma memnun oldum, Sam! Nerelisin?',
      choices: [
        { id: 'from_turkey', intentionTr: 'Nereli olduğunu söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'I’m from Turkey. I moved here last month.',
          translation: 'Türkiye’denim. Geçen ay buraya taşındım.',
          altAccepted: ['I am from Turkey, I moved here last month', 'I’m from Turkey and moved last month'],
          next: 'hobbies' },
        { id: 'ask_back', intentionTr: 'Sen nerelisin diye sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'I’m from Turkey. What about you — are you from here?',
          translation: 'Türkiye’denim. Ya sen — buralı mısın?',
          altAccepted: ['I’m from Turkey, and you', 'From Turkey, where are you from'],
          next: 'hobbies', relationshipEffect: 1 }
      ]
    },
    hobbies: {
      id: 'hobbies', speakerId: 'leo', emotion: 'happy',
      text: 'Cool! A few of us play football after class on Fridays. Do you want to join us this week?',
      translation: 'Harika! Birkaçımız cuma günleri dersten sonra futbol oynuyoruz. Bu hafta bize katılmak ister misin?',
      choices: [
        { id: 'accept', intentionTr: 'Daveti kabul et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'That sounds fun! I’d love to join you.',
          translation: 'Kulağa eğlenceli geliyor! Size katılmayı çok isterim.',
          altAccepted: ['I’d love to join', 'Sounds great, I’d love to come'],
          next: 'end_friends', relationshipEffect: 2 },
        { id: 'decline_polite', intentionTr: 'Kibarca reddet ama başka zaman de', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I can’t this Friday, but maybe next week?',
          translation: 'Bu cuma olmaz ama belki gelecek hafta?',
          altAccepted: ['Not this Friday, but maybe next week', 'I’m busy Friday, how about next week'],
          next: 'end_maybe', relationshipEffect: 1 },
        { id: 'ask_details', intentionTr: 'Saatini ve yerini sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Maybe! What time does it start, and where do you play?',
          translation: 'Belki! Kaçta başlıyor ve nerede oynuyorsunuz?',
          altAccepted: ['What time and where do you play', 'When does it start and where'],
          next: 'details' }
      ]
    },
    details: {
      id: 'details', speakerId: 'leo', emotion: 'friendly',
      text: 'We start at four, at the park behind the school. Bring trainers and just come along!',
      translation: 'Saat dörtte, okulun arkasındaki parkta başlıyoruz. Spor ayakkabı getir ve gel!',
      choices: [
        { id: 'ill_come', intentionTr: 'Geleceğini söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Perfect, I’ll be there at four. Thanks for inviting me!',
          translation: 'Mükemmel, dörtte orada olacağım. Davet ettiğin için teşekkürler!',
          altAccepted: ['Great, I’ll be there at four', 'I’ll come at four, thanks for the invite'],
          next: 'end_friends', relationshipEffect: 2 },
        { id: 'ask_bring', intentionTr: 'Başka bir şey getirmen gerekip gerekmediğini sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Sounds great! Should I bring anything else besides trainers?',
          translation: 'Harika! Spor ayakkabı dışında başka bir şey getirmeli miyim?',
          altAccepted: ['Should I bring anything else', 'Do I need to bring anything besides trainers'],
          next: 'end_friends', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_friends: { id: 'end_friends', kind: 'relationship', title: 'A new friend', titleTr: 'Yeni bir arkadaş',
      text: 'You introduced yourself warmly and made plans with Leo. That’s how friendships start!',
      translation: 'Kendini içtenlikle tanıttın ve Leo ile plan yaptın. Arkadaşlıklar böyle başlar!',
      relationshipEffect: 1, coins: 12 },
    end_maybe: { id: 'end_maybe', kind: 'success', title: 'A good start', titleTr: 'İyi bir başlangıç',
      text: 'You couldn’t make it this time, but you kept the door open politely. Leo will ask again.',
      translation: 'Bu sefer gelemedin ama kapıyı kibarca açık bıraktın. Leo tekrar soracak.',
      coins: 8 }
  }
});

// ── Asking for directions (A2) ──────────────────────────────────────────────
export const askingDirections = createScenario({
  id: 'asking-directions',
  title: 'Finding your way',
  titleTr: 'Yolunu bulmak',
  environmentId: 'street', sceneType: 'street', level: 'A2',
  goal: 'Ask a stranger for directions and understand the answer.',
  goalTr: 'Bir yabancıdan yol tarifi iste ve cevabı anla.',
  npcIds: ['sophie'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'sophie', emotion: 'friendly',
      text: 'You look a little lost — can I help you find something?',
      translation: 'Biraz kaybolmuş görünüyorsun — bir şey bulmana yardım edebilir miyim?',
      choices: [
        { id: 'ask_station', intentionTr: 'İstasyonun yerini sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Yes, please. Could you tell me how to get to the train station?',
          translation: 'Evet, lütfen. Tren istasyonuna nasıl gideceğimi söyler misiniz?',
          altAccepted: ['How do I get to the train station', 'Can you tell me the way to the station'],
          next: 'station_dir', relationshipEffect: 1 },
        { id: 'ask_pharmacy', intentionTr: 'En yakın eczaneyi sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Could you tell me where the nearest pharmacy is?',
          translation: 'En yakın eczanenin nerede olduğunu söyleyebilir misiniz?',
          altAccepted: ['Where is the nearest pharmacy', 'Do you know where the closest pharmacy is'],
          next: 'pharmacy_dir', relationshipEffect: 1 }
      ]
    },
    station_dir: {
      id: 'station_dir', speakerId: 'sophie', emotion: 'helpful',
      text: 'Sure! Go straight down this street, take the second left, and it’s right in front of you. About five minutes.',
      translation: 'Tabii! Bu caddeden düz git, ikinci soldan dön, tam karşında. Yaklaşık beş dakika.',
      choices: [
        { id: 'confirm_understood', intentionTr: 'Anladığını tekrar ederek doğrula', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'So, straight ahead and second left. Is it far on foot?',
          translation: 'Yani, düz git ve ikinci soldan dön. Yürüyerek uzak mı?',
          altAccepted: ['Straight and second left, is it far to walk', 'So second left, is it far on foot'],
          next: 'walkable', relationshipEffect: 1 },
        { id: 'thanks_go', intentionTr: 'Teşekkür et ve git', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Got it, thank you so much for your help!',
          translation: 'Anladım, yardımın için çok teşekkürler!',
          altAccepted: ['Thanks a lot for your help', 'Got it, thank you very much'],
          next: 'end_found' }
      ]
    },
    pharmacy_dir: {
      id: 'pharmacy_dir', speakerId: 'sophie', emotion: 'helpful',
      text: 'There’s one just around the corner, next to the bakery. Turn right at the traffic lights and you’ll see it.',
      translation: 'Hemen köşede, fırının yanında bir tane var. Trafik ışıklarında sağa dön, göreceksin.',
      choices: [
        { id: 'thank_pharmacy', intentionTr: 'Teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Right at the lights, next to the bakery. Thank you!',
          translation: 'Işıklarda sağa, fırının yanında. Teşekkürler!',
          altAccepted: ['Right at the lights by the bakery, thanks', 'Turn right at the lights, got it, thank you'],
          next: 'end_found', relationshipEffect: 1 },
        { id: 'ask_open', intentionTr: 'Şu an açık mı diye sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Thank you! Do you know if it’s open at this hour?',
          translation: 'Teşekkürler! Bu saatte açık mı, biliyor musunuz?',
          altAccepted: ['Is it open at this hour', 'Do you know if it’s open now'],
          next: 'end_found', relationshipEffect: 1 }
      ]
    },
    walkable: {
      id: 'walkable', speakerId: 'sophie', emotion: 'happy',
      text: 'Not far at all — five minutes, flat the whole way. You’ll be fine. Have a good trip!',
      translation: 'Hiç uzak değil — beş dakika, yol boyunca düz. Sorun olmaz. İyi yolculuklar!',
      next: 'end_confirmed'
    }
  },
  endings: {
    end_found: { id: 'end_found', kind: 'success', title: 'On your way', titleTr: 'Yolunda',
      text: 'You asked clearly and thanked Sophie. You know exactly where to go.',
      translation: 'Net biçimde sordun ve Sophie’ye teşekkür ettin. Nereye gideceğini tam olarak biliyorsun.',
      coins: 10 },
    end_confirmed: { id: 'end_confirmed', kind: 'excellent', title: 'Confirmed and confident', titleTr: 'Doğrulandı ve emin',
      text: 'You repeated the directions to check you understood and asked a follow-up. That’s the mark of a confident speaker.',
      translation: 'Anladığını kontrol etmek için tarifi tekrarladın ve bir soru daha sordun. Bu, kendinden emin bir konuşmacının işareti.',
      relationshipEffect: 1, coins: 14 }
  }
});
