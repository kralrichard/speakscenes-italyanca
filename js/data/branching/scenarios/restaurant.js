import { createScenario } from '../scenarioSchema.js';

// ── Restaurant order (A2) ───────────────────────────────────────────────────
export const restaurantOrder = createScenario({
  id: 'restaurant-order',
  title: 'Ordering dinner',
  titleTr: 'Akşam yemeği sipariş etmek',
  environmentId: 'restaurant', sceneType: 'restaurant', level: 'A2',
  goal: 'Order a meal and drink the way you want them.',
  goalTr: 'İstediğin şekilde bir yemek ve içecek sipariş et.',
  npcIds: ['elena'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'elena', emotion: 'friendly',
      text: 'Good evening! Here are your menus. Are you ready to order, or would you like a few minutes?',
      translation: 'İyi akşamlar! Menüleriniz burada. Sipariş vermeye hazır mısınız, yoksa birkaç dakika ister misiniz?',
      choices: [
        { id: 'order_now', intentionTr: 'Hemen sipariş ver', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'I’m ready. I’ll have the grilled chicken, please.',
          translation: 'Hazırım. Izgara tavuk alacağım, lütfen.',
          altAccepted: ['I’ll have the grilled chicken please', 'The grilled chicken, please'],
          next: 'sides' },
        { id: 'need_time', intentionTr: 'Biraz zaman iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Could we have a few more minutes, please?',
          translation: 'Birkaç dakika daha alabilir miyiz, lütfen?',
          altAccepted: ['A few more minutes please', 'Can we have a bit more time'],
          next: 'back_later' },
        { id: 'recommend', intentionTr: 'Bir öneri iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'What would you recommend tonight?',
          translation: 'Bu akşam ne önerirsiniz?',
          altAccepted: ['What do you recommend', 'Do you have a recommendation'],
          next: 'recommendation' },
        { id: 'allergy', intentionTr: 'Bir yemekte fıstık olup olmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Does the pasta contain any nuts? I’m allergic.',
          translation: 'Makarnada fındık/fıstık var mı? Alerjim var.',
          altAccepted: ['Is there any nuts in the pasta', 'Does the pasta have nuts, I’m allergic'],
          next: 'allergy_answer' }
      ]
    },
    recommendation: {
      id: 'recommendation', speakerId: 'elena', emotion: 'happy',
      text: 'Our seafood pasta is the favorite tonight, and the lamb is excellent too. Shall I bring one of those?',
      translation: 'Bu akşam deniz mahsullü makarnamız favori, kuzu da mükemmel. Bunlardan birini getireyim mi?',
      choices: [
        { id: 'take_pasta', intentionTr: 'Makarnayı seç', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'The seafood pasta sounds great. I’ll have that.',
          translation: 'Deniz mahsullü makarna kulağa harika geliyor. Onu alacağım.',
          altAccepted: ['I’ll have the seafood pasta', 'The pasta sounds great, I’ll take it'],
          next: 'sides', relationshipEffect: 1 },
        { id: 'take_lamb', intentionTr: 'Kuzuyu seç', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'I’ll try the lamb, please.',
          translation: 'Kuzuyu deneyeceğim, lütfen.',
          altAccepted: ['I’ll have the lamb', 'The lamb, please'],
          next: 'sides' }
      ]
    },
    allergy_answer: {
      id: 'allergy_answer', speakerId: 'elena', emotion: 'concerned',
      text: 'Thank you for telling me. The pasta is nut-free, but I’ll double-check with the kitchen to be safe. Would you like it?',
      translation: 'Söylediğiniz için teşekkürler. Makarnada fındık/fıstık yok ama emin olmak için mutfağa tekrar sorayım. İster misiniz?',
      choices: [
        { id: 'yes_pasta', intentionTr: 'Evet, makarnayı iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Yes, please, if the kitchen confirms it’s safe.',
          translation: 'Evet, lütfen, mutfak güvenli olduğunu onaylarsa.',
          altAccepted: ['Yes if it’s safe', 'Please, if the kitchen says it’s okay'],
          next: 'sides', relationshipEffect: 1 },
        { id: 'something_else', intentionTr: 'Güvenli başka bir şey iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'To be safe, could I have the grilled chicken instead?',
          translation: 'Güvenli olmak için, onun yerine ızgara tavuk alabilir miyim?',
          altAccepted: ['I’ll have the grilled chicken to be safe', 'Can I get the chicken instead'],
          next: 'sides' }
      ]
    },
    sides: {
      id: 'sides', speakerId: 'elena', emotion: 'friendly',
      text: 'Great choice. Would you like anything to drink with that?',
      translation: 'Harika seçim. Yanında içecek bir şey ister misiniz?',
      choices: [
        { id: 'water', intentionTr: 'Su iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Just a bottle of still water, thanks.',
          translation: 'Sadece bir şişe sade su, teşekkürler.',
          altAccepted: ['A bottle of water please', 'Just still water, thanks'],
          next: 'end_ordered' },
        { id: 'wine', intentionTr: 'Şarap önerisi iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Could you suggest a glass of wine to go with it?',
          translation: 'Yanına uygun bir kadeh şarap önerebilir misiniz?',
          altAccepted: ['Which wine goes well with it', 'Can you suggest a wine'],
          next: 'end_ordered', relationshipEffect: 1 }
      ]
    },
    back_later: {
      id: 'back_later', speakerId: 'elena', emotion: 'friendly',
      text: 'Of course, take your time. I’ll be right back. (A minute later) Ready now?',
      translation: 'Tabii, acele etmeyin. Hemen dönerim. (Bir dakika sonra) Şimdi hazır mısınız?',
      next: 'recommendation'
    }
  },
  endings: {
    end_ordered: { id: 'end_ordered', kind: 'success', title: 'Order placed', titleTr: 'Sipariş verildi',
      text: 'You ordered your meal and drink clearly and politely. Enjoy your dinner!',
      translation: 'Yemeğini ve içeceğini net ve kibar biçimde sipariş ettin. Afiyet olsun!',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Wrong order / complaint (B1) ────────────────────────────────────────────
export const wrongOrder = createScenario({
  id: 'wrong-order',
  title: 'This isn’t what I ordered',
  titleTr: 'Bu sipariş ettiğim şey değil',
  environmentId: 'restaurant', sceneType: 'restaurant', level: 'B1',
  goal: 'Politely fix a wrong order without a fuss.',
  goalTr: 'Yanlış siparişi kibarca, sorun çıkarmadan düzelt.',
  npcIds: ['elena', 'marco'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'elena', emotion: 'happy',
      text: 'Here you are — one beef burger. Enjoy!',
      translation: 'Buyurun — bir dana burger. Afiyet olsun!',
      choices: [
        { id: 'polite_correct', intentionTr: 'Kibarca yanlış olduğunu söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Sorry, but I think there’s a mistake — I ordered the veggie burger.',
          translation: 'Pardon ama sanırım bir hata var — sebzeli burger sipariş etmiştim.',
          altAccepted: ['I ordered the veggie burger, not this', 'I think this is wrong, I asked for the veggie burger'],
          next: 'apology' },
        { id: 'direct_correct', intentionTr: 'Doğrudan yanlış olduğunu söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'This isn’t what I ordered. I asked for the veggie burger.',
          translation: 'Bu sipariş ettiğim şey değil. Sebzeli burger istemiştim.',
          altAccepted: ['This is the wrong order, I wanted the veggie burger', 'I didn’t order this, I ordered the veggie burger'],
          next: 'apology' }
      ]
    },
    apology: {
      id: 'apology', speakerId: 'elena', emotion: 'apologetic',
      text: 'Oh no, I’m so sorry! That’s my mistake. I’ll bring the veggie burger right away. Can I get you anything while you wait?',
      translation: 'Ah hayır, çok özür dilerim! Benim hatam. Sebzeli burgeri hemen getireceğim. Beklerken size bir şey getirebilir miyim?',
      choices: [
        { id: 'no_worries', intentionTr: 'Sorun olmadığını söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'No worries, these things happen. Just some water, thanks.',
          translation: 'Sorun değil, olur böyle şeyler. Sadece biraz su, teşekkürler.',
          altAccepted: ['It’s okay, just some water thanks', 'No problem, water would be nice'],
          next: 'end_gracious', relationshipEffect: 2 },
        { id: 'ask_speed', intentionTr: 'Acele olduğunu söyle', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'It’s fine, but could you make it quick? I’m in a bit of a hurry.',
          translation: 'Sorun değil ama çabuk olabilir mi? Biraz acelem var.',
          altAccepted: ['Could you hurry it a little, I’m in a rush', 'Can you be quick, I’m in a hurry'],
          next: 'manager' }
      ]
    },
    manager: {
      id: 'manager', speakerId: 'marco', emotion: 'apologetic',
      text: 'I’m the manager — I heard there was a mix-up. Your correct order is being rushed, and it’s on the house. Again, my apologies.',
      translation: 'Ben müdürüm — bir karışıklık olduğunu duydum. Doğru siparişiniz hızlandırılıyor ve ikramımız. Tekrar özür dilerim.',
      choices: [
        { id: 'thank_manager', intentionTr: 'Teşekkür et ve nazik ol', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'That’s very kind of you. Thank you for sorting it out so quickly.',
          translation: 'Çok naziksiniz. Bu kadar hızlı çözdüğünüz için teşekkürler.',
          altAccepted: ['Thank you for sorting it out quickly', 'That’s kind, thanks for fixing it fast'],
          next: 'end_comped', relationshipEffect: 2 },
        { id: 'decline_free', intentionTr: 'Ücretsiz olmasına gerek yok de', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Thank you, but you really don’t have to do that. I’m happy to pay.',
          translation: 'Teşekkürler ama gerçekten gerek yok. Ödemekten memnuniyet duyarım.',
          altAccepted: ['You don’t have to, I’m happy to pay', 'That’s not necessary, I’ll pay for it'],
          next: 'end_generous', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_gracious: { id: 'end_gracious', kind: 'relationship', title: 'Handled with grace', titleTr: 'Nazikçe halledildi',
      text: 'You corrected the order kindly and put Elena at ease. A small moment, handled like a native speaker.',
      translation: 'Siparişi nazikçe düzelttin ve Elena’yı rahatlattın. Küçük bir an, ana dili gibi halledildi.',
      relationshipEffect: 1, coins: 12 },
    end_comped: { id: 'end_comped', kind: 'problem-solved', title: 'Free meal, no drama', titleTr: 'Ücretsiz yemek, sorunsuz',
      text: 'You were clear about being in a hurry, stayed polite, and the manager comped your meal. Well negotiated.',
      translation: 'Acelen olduğunu net söyledin, kibar kaldın ve müdür yemeğini ikram etti. İyi bir pazarlık.',
      relationshipEffect: 1, coins: 16 },
    end_generous: { id: 'end_generous', kind: 'relationship', title: 'A generous guest', titleTr: 'Cömert bir misafir',
      text: 'You turned down the free meal graciously. The manager insisted anyway — and you’ve made a friend of the whole restaurant.',
      translation: 'Ücretsiz yemeği nezaketle geri çevirdin. Müdür yine de ısrar etti — ve tüm restoranı kendine dost ettin.',
      relationshipEffect: 2, coins: 14 }
  }
});
