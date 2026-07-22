import { createScenario } from '../scenarioSchema.js';

// Extra scenarios that add depth to existing environments (hotel, airport,
// restaurant) so each place has more than one thing to do.

// ── Hotel: asking for amenities (A1) ────────────────────────────────────────
export const hotelAmenities = createScenario({
  id: 'hotel-amenities',
  title: 'Wi-Fi, towels and breakfast',
  titleTr: 'Wi-Fi, havlu ve kahvaltı',
  environmentId: 'hotel', sceneType: 'hotel-lobby', level: 'A1',
  goal: 'Ask reception for the little things you need.',
  goalTr: 'Resepsiyondan ihtiyacın olan küçük şeyleri iste.',
  npcIds: ['grace'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'grace', emotion: 'friendly',
      text: 'Hello again! Is everything alright with your room?',
      translation: 'Tekrar merhaba! Odanızla ilgili her şey yolunda mı?',
      choices: [
        { id: 'wifi', intentionTr: 'Wi-Fi şifresini sor', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Yes, thanks. Could I have the Wi-Fi password?',
          translation: 'Evet, teşekkürler. Wi-Fi şifresini alabilir miyim?',
          altAccepted: ['What’s the wifi password', 'Can I get the wifi password'],
          next: 'anything_else' },
        { id: 'towels', intentionTr: 'Fazladan havlu iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Could I get some extra towels, please?',
          translation: 'Biraz fazladan havlu alabilir miyim, lütfen?',
          altAccepted: ['Can I have extra towels', 'Some more towels please'],
          next: 'anything_else' },
        { id: 'breakfast_time', intentionTr: 'Kahvaltı saatini sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'What time is breakfast served in the morning?',
          translation: 'Sabah kahvaltı saat kaçta veriliyor?',
          altAccepted: ['When is breakfast served', 'What time does breakfast start'],
          next: 'anything_else' }
      ]
    },
    anything_else: {
      id: 'anything_else', speakerId: 'grace', emotion: 'happy',
      text: 'Of course, I’ll sort that out right away. Is there anything else you need?',
      translation: 'Tabii, hemen hallederim. Başka bir ihtiyacınız var mı?',
      choices: [
        { id: 'no_thanks', intentionTr: 'Hayır, teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'No, that’s everything. Thank you so much!',
          translation: 'Hayır, hepsi bu. Çok teşekkürler!',
          altAccepted: ['That’s all, thank you', 'No thanks, that’s everything'],
          next: 'end_helped', relationshipEffect: 1 },
        { id: 'ask_taxi', intentionTr: 'Taksi çağırmalarını iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Actually, could you call me a taxi for eight o’clock?',
          translation: 'Aslında, saat sekiz için bana bir taksi çağırır mısınız?',
          altAccepted: ['Could you call a taxi for eight', 'Can you book me a taxi at eight'],
          next: 'end_helped', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_helped: { id: 'end_helped', kind: 'success', title: 'All sorted', titleTr: 'Her şey ayarlandı',
      text: 'You asked for what you needed politely and clearly. Reception is happy to help.',
      translation: 'İhtiyacını kibar ve net biçimde istedin. Resepsiyon yardımcı olmaktan memnun.',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Airport: passport control (B1) ──────────────────────────────────────────
export const passportControl = createScenario({
  id: 'passport-control',
  title: 'Passport control',
  titleTr: 'Pasaport kontrolü',
  environmentId: 'airport', sceneType: 'airport', level: 'B1',
  goal: 'Answer the officer’s questions clearly and calmly.',
  goalTr: 'Memurun sorularını net ve sakin yanıtla.',
  npcIds: ['omar'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'omar', emotion: 'formal',
      text: 'Passport, please. What’s the purpose of your visit?',
      translation: 'Pasaport, lütfen. Ziyaretinizin amacı nedir?',
      choices: [
        { id: 'tourism', intentionTr: 'Turizm için geldiğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I’m here on holiday for two weeks.',
          translation: 'İki haftalığına tatil için buradayım.',
          altAccepted: ['I’m here on vacation for two weeks', 'On holiday, for two weeks'],
          next: 'where_staying' },
        { id: 'business', intentionTr: 'İş için geldiğini söyle', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'I’m here for business — a three-day conference.',
          translation: 'İş için buradayım — üç günlük bir konferans.',
          altAccepted: ['I’m here for a business conference', 'For business, a three-day conference'],
          next: 'where_staying' }
      ]
    },
    where_staying: {
      id: 'where_staying', speakerId: 'omar', emotion: 'neutral',
      text: 'And where will you be staying?',
      translation: 'Peki nerede kalacaksınız?',
      choices: [
        { id: 'hotel', intentionTr: 'Otelde kalacağını söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'At the Sunrise Hotel, in the city center.',
          translation: 'Şehir merkezindeki Sunrise Otel’de.',
          altAccepted: ['At the Sunrise Hotel downtown', 'In the Sunrise Hotel, city center'],
          next: 'end_through' },
        { id: 'friend', intentionTr: 'Bir arkadaşında kalacağını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I’ll be staying with a friend who lives here.',
          translation: 'Burada yaşayan bir arkadaşımda kalacağım.',
          altAccepted: ['With a friend who lives here', 'I’m staying at a friend’s place'],
          next: 'end_through' }
      ]
    }
  },
  endings: {
    end_through: { id: 'end_through', kind: 'success', title: 'Welcome to the country', titleTr: 'Ülkeye hoş geldin',
      text: 'You answered clearly and calmly, and you’re through. Passport control is easy when you keep it simple.',
      translation: 'Net ve sakin yanıt verdin ve geçtin. Basit tutunca pasaport kontrolü kolaydır.',
      coins: 12 }
  }
});

// ── Restaurant: asking for the bill (A2) ────────────────────────────────────
export const restaurantBill = createScenario({
  id: 'restaurant-bill',
  title: 'Getting the bill',
  titleTr: 'Hesabı istemek',
  environmentId: 'restaurant', sceneType: 'restaurant', level: 'A2',
  goal: 'Finish your meal and pay the way you want.',
  goalTr: 'Yemeğini bitir ve istediğin şekilde öde.',
  npcIds: ['elena'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'elena', emotion: 'friendly',
      text: 'How was everything? Can I get you anything else?',
      translation: 'Her şey nasıldı? Başka bir şey getirebilir miyim?',
      choices: [
        { id: 'bill', intentionTr: 'Hesabı iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'It was lovely, thank you. Could we have the bill, please?',
          translation: 'Çok güzeldi, teşekkürler. Hesabı alabilir miyiz, lütfen?',
          altAccepted: ['Can we have the bill please', 'Could I get the check please'],
          next: 'pay_how' },
        { id: 'dessert', intentionTr: 'Tatlı menüsünü sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Everything was great! Could I see the dessert menu?',
          translation: 'Her şey harikaydı! Tatlı menüsünü görebilir miyim?',
          altAccepted: ['Can I see the dessert menu', 'Do you have a dessert menu'],
          next: 'dessert_node' }
      ]
    },
    dessert_node: {
      id: 'dessert_node', speakerId: 'elena', emotion: 'happy',
      text: 'Of course! The chocolate cake is amazing. Shall I bring one?',
      translation: 'Tabii! Çikolatalı kek muhteşem. Bir tane getireyim mi?',
      choices: [
        { id: 'yes_cake', intentionTr: 'Keki iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Yes, the chocolate cake sounds perfect!',
          translation: 'Evet, çikolatalı kek harika olur!',
          altAccepted: ['Yes please, the chocolate cake', 'I’ll have the chocolate cake'],
          next: 'pay_how', relationshipEffect: 1 },
        { id: 'just_bill', intentionTr: 'Yok, sadece hesabı iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Maybe next time — just the bill, please.',
          translation: 'Belki bir dahaki sefere — sadece hesap, lütfen.',
          altAccepted: ['Just the bill please', 'No thanks, just the check'],
          next: 'pay_how' }
      ]
    },
    pay_how: {
      id: 'pay_how', speakerId: 'elena', emotion: 'neutral',
      text: 'Here you are. Will you be paying by card or cash?',
      translation: 'Buyurun. Kartla mı yoksa nakit mi ödeyeceksiniz?',
      choices: [
        { id: 'card', intentionTr: 'Kartla öde', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'By card, please. And could I get a receipt?',
          translation: 'Kartla, lütfen. Bir de fiş alabilir miyim?',
          altAccepted: ['By card, and a receipt please', 'Card please, with a receipt'],
          next: 'end_paid' },
        { id: 'cash_tip', intentionTr: 'Nakit öde ve bahşiş bırak', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Cash, please. Keep the change — the service was great.',
          translation: 'Nakit, lütfen. Üstü kalsın — hizmet harikaydı.',
          altAccepted: ['Cash, keep the change', 'I’ll pay cash, keep the change'],
          next: 'end_paid', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_paid: { id: 'end_paid', kind: 'success', title: 'Paid and done', titleTr: 'Ödendi, bitti',
      text: 'You finished your meal and paid smoothly. A complete restaurant experience in English!',
      translation: 'Yemeğini bitirdin ve sorunsuz ödedin. İngilizce ile eksiksiz bir restoran deneyimi!',
      relationshipEffect: 1, coins: 10 }
  }
});
