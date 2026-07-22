import { createScenario } from '../scenarioSchema.js';

// ── Café order (A1) ─────────────────────────────────────────────────────────
export const cafeOrder = createScenario({
  id: 'cafe-order',
  title: 'Ordering at the café',
  titleTr: 'Kafede sipariş vermek',
  environmentId: 'cafe', sceneType: 'cafe', level: 'A1',
  goal: 'Order a drink the way you like it.',
  goalTr: 'İçeceğini istediğin gibi sipariş et.',
  npcIds: ['mia'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'mia', emotion: 'happy',
      text: 'Hi there! What can I get you?',
      translation: 'Merhaba! Ne alırsınız?',
      choices: [
        { id: 'coffee', intentionTr: 'Bir kahve iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Hi! Can I have a coffee, please?',
          translation: 'Merhaba! Bir kahve alabilir miyim, lütfen?',
          altAccepted: ['Can I get a coffee please', 'A coffee, please'],
          next: 'size' },
        { id: 'tea', intentionTr: 'Bir çay iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Could I get a cup of tea, please?',
          translation: 'Bir fincan çay alabilir miyim, lütfen?',
          altAccepted: ['Can I have a tea please', 'A tea, please'],
          next: 'size' },
        { id: 'recommend', intentionTr: 'Ne önerdiğini sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'What’s good here? What do you recommend?',
          translation: 'Burada ne güzel? Ne önerirsin?',
          altAccepted: ['What do you recommend', 'What’s popular here'],
          next: 'suggest' }
      ]
    },
    suggest: {
      id: 'suggest', speakerId: 'mia', emotion: 'friendly',
      text: 'Our caramel latte is a favorite, and the iced tea is great on a hot day. Which sounds good?',
      translation: 'Karamelli latte favorimiz, sıcak günlerde de buzlu çay harika. Hangisi hoşuna gitti?',
      choices: [
        { id: 'latte', intentionTr: 'Latte’yi seç', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'The caramel latte sounds perfect. I’ll have that.',
          translation: 'Karamelli latte harika. Onu alayım.',
          altAccepted: ['I’ll have the caramel latte', 'The caramel latte please'],
          next: 'size', relationshipEffect: 1 },
        { id: 'icedtea', intentionTr: 'Buzlu çayı seç', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'I’ll try the iced tea, thanks.',
          translation: 'Buzlu çayı deneyeyim, teşekkürler.',
          altAccepted: ['The iced tea please', 'I’ll have the iced tea'],
          next: 'size' }
      ]
    },
    size: {
      id: 'size', speakerId: 'mia', emotion: 'neutral',
      text: 'Sure! What size would you like — small, medium, or large?',
      translation: 'Tabii! Hangi boy istersiniz — küçük, orta, yoksa büyük?',
      choices: [
        { id: 'medium', intentionTr: 'Orta boy iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'A medium, please. To take away.',
          translation: 'Orta boy, lütfen. Dışarı alacağım.',
          altAccepted: ['Medium please, to go', 'A medium to take away'],
          next: 'end_ordered' },
        { id: 'large_stay', intentionTr: 'Büyük iste ve içeride kal', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'A large one, and I’ll drink it here.',
          translation: 'Büyük boy ve burada içeceğim.',
          altAccepted: ['Large, and I’ll have it here', 'A large to drink in'],
          next: 'end_ordered', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_ordered: { id: 'end_ordered', kind: 'success', title: 'Order ready', titleTr: 'Sipariş hazır',
      text: 'You ordered your drink clearly, size and all. Enjoy!',
      translation: 'İçeceğini boyuyla birlikte net biçimde sipariş ettin. Afiyet olsun!',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Café catch-up with a friend (B1) ────────────────────────────────────────
export const cafeMeetup = createScenario({
  id: 'cafe-meetup',
  title: 'Catching up with an old friend',
  titleTr: 'Eski bir arkadaşla hasret gidermek',
  environmentId: 'cafe', sceneType: 'cafe', level: 'B1',
  goal: 'Reconnect with a friend you haven’t seen in years.',
  goalTr: 'Yıllardır görmediğin bir arkadaşınla yeniden bağ kur.',
  npcIds: ['hannah'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'hannah', emotion: 'surprised',
      text: 'Oh my goodness — is that really you? It’s been what, five years?',
      translation: 'Aman tanrım — bu gerçekten sen misin? Ne kadar oldu, beş yıl mı?',
      choices: [
        { id: 'warm', intentionTr: 'Sıcak bir şekilde karşılık ver', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Hannah! I can’t believe it — you look exactly the same!',
          translation: 'Hannah! İnanamıyorum — tıpatıp aynısın!',
          altAccepted: ['I can’t believe it, you look the same', 'Hannah, it’s so good to see you'],
          next: 'whats_new', relationshipEffect: 2 },
        { id: 'surprised', intentionTr: 'Şaşkınlığını dile getir', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Wow, what a coincidence! What are you doing here?',
          translation: 'Vay, ne tesadüf! Burada ne yapıyorsun?',
          altAccepted: ['What a coincidence, what brings you here', 'What are you doing here'],
          next: 'whats_new' }
      ]
    },
    whats_new: {
      id: 'whats_new', speakerId: 'hannah', emotion: 'happy',
      text: 'I moved back last month! I’m working at the hospital now. So tell me — what have you been up to?',
      translation: 'Geçen ay geri taşındım! Şimdi hastanede çalışıyorum. Anlat bakalım — sen neler yapıyordun?',
      choices: [
        { id: 'job', intentionTr: 'İşinden bahset', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'A lot has changed! I started my own business two years ago.',
          translation: 'Çok şey değişti! İki yıl önce kendi işimi kurdum.',
          altAccepted: ['I started my own business two years ago', 'I’ve been running my own business'],
          next: 'plans', relationshipEffect: 1 },
        { id: 'travel', intentionTr: 'Seyahatlerinden bahset', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Honestly, I’ve been traveling a lot — I just got back from Japan.',
          translation: 'Açıkçası çok seyahat ediyordum — daha yeni Japonya’dan döndüm.',
          altAccepted: ['I’ve been traveling a lot, just back from Japan', 'I just came back from Japan'],
          next: 'plans' }
      ]
    },
    plans: {
      id: 'plans', speakerId: 'hannah', emotion: 'friendly',
      text: 'That’s amazing! We have so much to catch up on. Do you have time for a proper coffee, or are you rushing off?',
      translation: 'Bu harika! Konuşacak çok şeyimiz var. Doğru dürüst bir kahveye vaktin var mı, yoksa acele mi ediyorsun?',
      choices: [
        { id: 'stay', intentionTr: 'Kal ve sohbet et', tone: 'friendly', difficulty: 'medium', xp: 16,
          sentence: 'I’ve got all afternoon. Let’s grab a table and catch up properly.',
          translation: 'Bütün öğleden sonram boş. Bir masa tutup güzelce sohbet edelim.',
          altAccepted: ['I have time, let’s sit and catch up', 'Let’s get a table and talk'],
          next: 'end_reunion', relationshipEffect: 2 },
        { id: 'reschedule', intentionTr: 'Şimdi olmaz ama buluşma ayarla', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'I have to run now, but let’s swap numbers and meet properly this week.',
          translation: 'Şimdi gitmem lazım ama numaralarımızı alalım ve bu hafta doğru dürüst buluşalım.',
          altAccepted: ['Let’s exchange numbers and meet this week', 'I have to go, but let’s meet this week'],
          next: 'end_plan', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_reunion: { id: 'end_reunion', kind: 'relationship', title: 'A real reunion', titleTr: 'Gerçek bir buluşma',
      text: 'You sat down and talked for hours. Some friendships pick up right where they left off.',
      translation: 'Oturup saatlerce konuştunuz. Bazı dostluklar kaldığı yerden devam eder.',
      relationshipEffect: 2, coins: 16 },
    end_plan: { id: 'end_plan', kind: 'success', title: 'A plan to meet', titleTr: 'Buluşma planı',
      text: 'You couldn’t stay, but you made a firm plan to meet again. Handled warmly and politely.',
      translation: 'Kalamadın ama tekrar buluşmak için sağlam bir plan yaptın. Sıcak ve kibarca halledildi.',
      coins: 10 }
  }
});
