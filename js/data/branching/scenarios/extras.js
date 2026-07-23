import { createScenario } from '../scenarioSchema.js?v=6';

// Extra scenarios that add depth to existing environments (hotel, airport,
// restaurant) so each place has more than one thing to do.

// ── Hotel: asking for amenities (A1) ────────────────────────────────────────
export const hotelAmenities = createScenario({
  id: 'hotel-amenities',
  title: 'Wi-Fi, asciugamani e colazione',
  titleTr: 'Wi-Fi, havlu ve kahvaltı',
  environmentId: 'hotel', sceneType: 'hotel-lobby', level: 'A1',
  goal: 'Chiedi alla reception le piccole cose di cui hai bisogno.',
  goalTr: 'Resepsiyondan ihtiyacın olan küçük şeyleri iste.',
  npcIds: ['grace'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'grace', emotion: 'friendly',
      text: 'Salve di nuovo! Va tutto bene con la sua stanza?',
      translation: 'Tekrar merhaba! Odanızla ilgili her şey yolunda mı?',
      choices: [
        { id: 'wifi', intentionTr: 'Wi-Fi şifresini sor', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Sì, grazie. Potrei avere la password del Wi-Fi?',
          translation: 'Evet, teşekkürler. Wi-Fi şifresini alabilir miyim?',
          altAccepted: ['Qual è la password del wifi', 'Posso avere la password del wifi'],
          next: 'anything_else' },
        { id: 'towels', intentionTr: 'Fazladan havlu iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Potrei avere degli asciugamani in più, per favore?',
          translation: 'Biraz fazladan havlu alabilir miyim, lütfen?',
          altAccepted: ['Posso avere altri asciugamani', 'Qualche asciugamano in più per favore'],
          next: 'anything_else' },
        { id: 'breakfast_time', intentionTr: 'Kahvaltı saatini sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'A che ora viene servita la colazione al mattino?',
          translation: 'Sabah kahvaltı saat kaçta veriliyor?',
          altAccepted: ['Quando viene servita la colazione', 'A che ora inizia la colazione'],
          next: 'anything_else' }
      ]
    },
    anything_else: {
      id: 'anything_else', speakerId: 'grace', emotion: 'happy',
      text: 'Certo, me ne occupo subito. C’è altro di cui ha bisogno?',
      translation: 'Tabii, hemen hallederim. Başka bir ihtiyacınız var mı?',
      choices: [
        { id: 'no_thanks', intentionTr: 'Hayır, teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'No, è tutto. Grazie mille!',
          translation: 'Hayır, hepsi bu. Çok teşekkürler!',
          altAccepted: ['È tutto, grazie', 'No grazie, è tutto'],
          next: 'end_helped', relationshipEffect: 1 },
        { id: 'ask_taxi', intentionTr: 'Taksi çağırmalarını iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Anzi, potrebbe chiamarmi un taxi per le otto?',
          translation: 'Aslında, saat sekiz için bana bir taksi çağırır mısınız?',
          altAccepted: ['Potrebbe chiamare un taxi per le otto', 'Può prenotarmi un taxi alle otto'],
          next: 'end_helped', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_helped: { id: 'end_helped', kind: 'success', title: 'Tutto sistemato', titleTr: 'Her şey ayarlandı',
      text: 'Hai chiesto ciò di cui avevi bisogno con cortesia e chiarezza. La reception è felice di aiutare.',
      translation: 'İhtiyacını kibar ve net biçimde istedin. Resepsiyon yardımcı olmaktan memnun.',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Airport: passport control (B1) ──────────────────────────────────────────
export const passportControl = createScenario({
  id: 'passport-control',
  title: 'Controllo passaporti',
  titleTr: 'Pasaport kontrolü',
  environmentId: 'airport', sceneType: 'airport', level: 'B1',
  goal: 'Rispondi alle domande dell’agente con chiarezza e calma.',
  goalTr: 'Memurun sorularını net ve sakin yanıtla.',
  npcIds: ['omar'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'omar', emotion: 'formal',
      text: 'Passaporto, prego. Qual è il motivo della sua visita?',
      translation: 'Pasaport, lütfen. Ziyaretinizin amacı nedir?',
      choices: [
        { id: 'tourism', intentionTr: 'Turizm için geldiğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Sono qui in vacanza per due settimane.',
          translation: 'İki haftalığına tatil için buradayım.',
          altAccepted: ['Sono in vacanza per due settimane', 'In vacanza, per due settimane'],
          next: 'where_staying' },
        { id: 'business', intentionTr: 'İş için geldiğini söyle', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Sono qui per lavoro — una conferenza di tre giorni.',
          translation: 'İş için buradayım — üç günlük bir konferans.',
          altAccepted: ['Sono qui per una conferenza di lavoro', 'Per lavoro, una conferenza di tre giorni'],
          next: 'where_staying' }
      ]
    },
    where_staying: {
      id: 'where_staying', speakerId: 'omar', emotion: 'neutral',
      text: 'E dove alloggerà?',
      translation: 'Peki nerede kalacaksınız?',
      choices: [
        { id: 'hotel', intentionTr: 'Otelde kalacağını söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'All’Hotel Sunrise, in centro città.',
          translation: 'Şehir merkezindeki Sunrise Otel’de.',
          altAccepted: ['All’Hotel Sunrise in centro', 'Nell’Hotel Sunrise, centro città'],
          next: 'end_through' },
        { id: 'friend', intentionTr: 'Bir arkadaşında kalacağını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Starò da un amico che vive qui.',
          translation: 'Burada yaşayan bir arkadaşımda kalacağım.',
          altAccepted: ['Da un amico che vive qui', 'Alloggio a casa di un amico'],
          next: 'end_through' }
      ]
    }
  },
  endings: {
    end_through: { id: 'end_through', kind: 'success', title: 'Benvenuto nel Paese', titleTr: 'Ülkeye hoş geldin',
      text: 'Hai risposto con chiarezza e calma, e sei passato. Il controllo passaporti è facile quando resti semplice.',
      translation: 'Net ve sakin yanıt verdin ve geçtin. Basit tutunca pasaport kontrolü kolaydır.',
      coins: 12 }
  }
});

// ── Restaurant: asking for the bill (A2) ────────────────────────────────────
export const restaurantBill = createScenario({
  id: 'restaurant-bill',
  title: 'Chiedere il conto',
  titleTr: 'Hesabı istemek',
  environmentId: 'restaurant', sceneType: 'restaurant', level: 'A2',
  goal: 'Termina il pasto e paga come preferisci.',
  goalTr: 'Yemeğini bitir ve istediğin şekilde öde.',
  npcIds: ['elena'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'elena', emotion: 'friendly',
      text: 'Com’è andato tutto? Posso portarle altro?',
      translation: 'Her şey nasıldı? Başka bir şey getirebilir miyim?',
      choices: [
        { id: 'bill', intentionTr: 'Hesabı iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'È stato delizioso, grazie. Potremmo avere il conto, per favore?',
          translation: 'Çok güzeldi, teşekkürler. Hesabı alabilir miyiz, lütfen?',
          altAccepted: ['Possiamo avere il conto per favore', 'Potrei avere il conto per favore'],
          next: 'pay_how' },
        { id: 'dessert', intentionTr: 'Tatlı menüsünü sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Era tutto ottimo! Potrei vedere il menù dei dolci?',
          translation: 'Her şey harikaydı! Tatlı menüsünü görebilir miyim?',
          altAccepted: ['Posso vedere il menù dei dolci', 'Avete un menù dei dolci'],
          next: 'dessert_node' }
      ]
    },
    dessert_node: {
      id: 'dessert_node', speakerId: 'elena', emotion: 'happy',
      text: 'Certo! La torta al cioccolato è incredibile. Gliene porto una?',
      translation: 'Tabii! Çikolatalı kek muhteşem. Bir tane getireyim mi?',
      choices: [
        { id: 'yes_cake', intentionTr: 'Keki iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Sì, la torta al cioccolato sembra perfetta!',
          translation: 'Evet, çikolatalı kek harika olur!',
          altAccepted: ['Sì grazie, la torta al cioccolato', 'Prendo la torta al cioccolato'],
          next: 'pay_how', relationshipEffect: 1 },
        { id: 'just_bill', intentionTr: 'Yok, sadece hesabı iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Magari la prossima volta — solo il conto, per favore.',
          translation: 'Belki bir dahaki sefere — sadece hesap, lütfen.',
          altAccepted: ['Solo il conto per favore', 'No grazie, solo il conto'],
          next: 'pay_how' }
      ]
    },
    pay_how: {
      id: 'pay_how', speakerId: 'elena', emotion: 'neutral',
      text: 'Ecco a lei. Paga con carta o in contanti?',
      translation: 'Buyurun. Kartla mı yoksa nakit mi ödeyeceksiniz?',
      choices: [
        { id: 'card', intentionTr: 'Kartla öde', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Con la carta, per favore. E potrei avere lo scontrino?',
          translation: 'Kartla, lütfen. Bir de fiş alabilir miyim?',
          altAccepted: ['Con carta, e lo scontrino per favore', 'Carta per favore, con lo scontrino'],
          next: 'end_paid' },
        { id: 'cash_tip', intentionTr: 'Nakit öde ve bahşiş bırak', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'In contanti, per favore. Tenga il resto — il servizio è stato ottimo.',
          translation: 'Nakit, lütfen. Üstü kalsın — hizmet harikaydı.',
          altAccepted: ['Contanti, tenga il resto', 'Pago in contanti, tenga il resto'],
          next: 'end_paid', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_paid: { id: 'end_paid', kind: 'success', title: 'Pagato e concluso', titleTr: 'Ödendi, bitti',
      text: 'Hai finito il pasto e hai pagato senza intoppi. Un’esperienza completa al ristorante in italiano!',
      translation: 'Yemeğini bitirdin ve sorunsuz ödedin. İngilizce ile eksiksiz bir restoran deneyimi!',
      relationshipEffect: 1, coins: 10 }
  }
});
