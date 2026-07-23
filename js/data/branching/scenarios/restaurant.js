import { createScenario } from '../scenarioSchema.js?v=6';

// ── Restaurant order (A2) ───────────────────────────────────────────────────
export const restaurantOrder = createScenario({
  id: 'restaurant-order',
  title: 'Ordinare la cena',
  titleTr: 'Akşam yemeği sipariş etmek',
  environmentId: 'restaurant', sceneType: 'restaurant', level: 'A2',
  goal: 'Ordina un piatto e una bevanda come li vuoi tu.',
  goalTr: 'İstediğin şekilde bir yemek ve içecek sipariş et.',
  npcIds: ['elena'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'elena', emotion: 'friendly',
      text: 'Buonasera! Ecco i menù. È pronto per ordinare, o preferisce qualche minuto?',
      translation: 'İyi akşamlar! Menüleriniz burada. Sipariş vermeye hazır mısınız, yoksa birkaç dakika ister misiniz?',
      choices: [
        { id: 'order_now', intentionTr: 'Hemen sipariş ver', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Sono pronto. Prendo il pollo alla griglia, per favore.',
          translation: 'Hazırım. Izgara tavuk alacağım, lütfen.',
          altAccepted: ['Prendo il pollo alla griglia per favore', 'Il pollo alla griglia, per favore'],
          next: 'sides' },
        { id: 'need_time', intentionTr: 'Biraz zaman iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Potremmo avere ancora qualche minuto, per favore?',
          translation: 'Birkaç dakika daha alabilir miyiz, lütfen?',
          altAccepted: ['Ancora qualche minuto per favore', 'Possiamo avere un altro po’ di tempo'],
          next: 'back_later' },
        { id: 'recommend', intentionTr: 'Bir öneri iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Cosa consiglia stasera?',
          translation: 'Bu akşam ne önerirsiniz?',
          altAccepted: ['Cosa mi consiglia', 'Ha qualche consiglio'],
          next: 'recommendation' },
        { id: 'allergy', intentionTr: 'Bir yemekte fıstık olup olmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'La pasta contiene frutta secca? Sono allergico.',
          translation: 'Makarnada fındık/fıstık var mı? Alerjim var.',
          altAccepted: ['C’è frutta secca nella pasta', 'La pasta ha frutta secca, sono allergico'],
          next: 'allergy_answer' }
      ]
    },
    recommendation: {
      id: 'recommendation', speakerId: 'elena', emotion: 'happy',
      text: 'Stasera la nostra pasta ai frutti di mare è la preferita, e anche l’agnello è eccellente. Le porto uno dei due?',
      translation: 'Bu akşam deniz mahsullü makarnamız favori, kuzu da mükemmel. Bunlardan birini getireyim mi?',
      choices: [
        { id: 'take_pasta', intentionTr: 'Makarnayı seç', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'La pasta ai frutti di mare sembra ottima. Prendo quella.',
          translation: 'Deniz mahsullü makarna kulağa harika geliyor. Onu alacağım.',
          altAccepted: ['Prendo la pasta ai frutti di mare', 'La pasta sembra ottima, la prendo'],
          next: 'sides', relationshipEffect: 1 },
        { id: 'take_lamb', intentionTr: 'Kuzuyu seç', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Provo l’agnello, per favore.',
          translation: 'Kuzuyu deneyeceğim, lütfen.',
          altAccepted: ['Prendo l’agnello', 'L’agnello, per favore'],
          next: 'sides' }
      ]
    },
    allergy_answer: {
      id: 'allergy_answer', speakerId: 'elena', emotion: 'concerned',
      text: 'Grazie per avermelo detto. La pasta è senza frutta secca, ma per sicurezza ricontrollo con la cucina. La desidera?',
      translation: 'Söylediğiniz için teşekkürler. Makarnada fındık/fıstık yok ama emin olmak için mutfağa tekrar sorayım. İster misiniz?',
      choices: [
        { id: 'yes_pasta', intentionTr: 'Evet, makarnayı iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Sì, grazie, se la cucina conferma che è sicura.',
          translation: 'Evet, lütfen, mutfak güvenli olduğunu onaylarsa.',
          altAccepted: ['Sì se è sicura', 'Per favore, se la cucina dice che va bene'],
          next: 'sides', relationshipEffect: 1 },
        { id: 'something_else', intentionTr: 'Güvenli başka bir şey iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Per sicurezza, potrei avere il pollo alla griglia invece?',
          translation: 'Güvenli olmak için, onun yerine ızgara tavuk alabilir miyim?',
          altAccepted: ['Prendo il pollo alla griglia per sicurezza', 'Posso avere il pollo invece'],
          next: 'sides' }
      ]
    },
    sides: {
      id: 'sides', speakerId: 'elena', emotion: 'friendly',
      text: 'Ottima scelta. Desidera qualcosa da bere?',
      translation: 'Harika seçim. Yanında içecek bir şey ister misiniz?',
      choices: [
        { id: 'water', intentionTr: 'Su iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Solo una bottiglia di acqua naturale, grazie.',
          translation: 'Sadece bir şişe sade su, teşekkürler.',
          altAccepted: ['Una bottiglia d’acqua per favore', 'Solo acqua naturale, grazie'],
          next: 'end_ordered' },
        { id: 'wine', intentionTr: 'Şarap önerisi iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Può consigliarmi un bicchiere di vino da abbinare?',
          translation: 'Yanına uygun bir kadeh şarap önerebilir misiniz?',
          altAccepted: ['Quale vino ci si abbina bene', 'Può consigliarmi un vino'],
          next: 'end_ordered', relationshipEffect: 1 }
      ]
    },
    back_later: {
      id: 'back_later', speakerId: 'elena', emotion: 'friendly',
      text: 'Certo, con comodo. Torno subito. (Un minuto dopo) Pronto adesso?',
      translation: 'Tabii, acele etmeyin. Hemen dönerim. (Bir dakika sonra) Şimdi hazır mısınız?',
      next: 'recommendation'
    }
  },
  endings: {
    end_ordered: { id: 'end_ordered', kind: 'success', title: 'Ordine effettuato', titleTr: 'Sipariş verildi',
      text: 'Hai ordinato il tuo piatto e la bevanda con chiarezza e cortesia. Buona cena!',
      translation: 'Yemeğini ve içeceğini net ve kibar biçimde sipariş ettin. Afiyet olsun!',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Wrong order / complaint (B1) ────────────────────────────────────────────
export const wrongOrder = createScenario({
  id: 'wrong-order',
  title: 'Non è quello che ho ordinato',
  titleTr: 'Bu sipariş ettiğim şey değil',
  environmentId: 'restaurant', sceneType: 'restaurant', level: 'B1',
  goal: 'Correggi con cortesia un ordine sbagliato, senza storie.',
  goalTr: 'Yanlış siparişi kibarca, sorun çıkarmadan düzelt.',
  npcIds: ['elena', 'marco'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'elena', emotion: 'happy',
      text: 'Ecco a lei — un hamburger di manzo. Buon appetito!',
      translation: 'Buyurun — bir dana burger. Afiyet olsun!',
      choices: [
        { id: 'polite_correct', intentionTr: 'Kibarca yanlış olduğunu söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Mi scusi, ma credo ci sia un errore — avevo ordinato l’hamburger vegetariano.',
          translation: 'Pardon ama sanırım bir hata var — sebzeli burger sipariş etmiştim.',
          altAccepted: ['Ho ordinato l’hamburger vegetariano, non questo', 'Credo sia sbagliato, avevo chiesto quello vegetariano'],
          next: 'apology' },
        { id: 'direct_correct', intentionTr: 'Doğrudan yanlış olduğunu söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'Non è quello che ho ordinato. Avevo chiesto l’hamburger vegetariano.',
          translation: 'Bu sipariş ettiğim şey değil. Sebzeli burger istemiştim.',
          altAccepted: ['È l’ordine sbagliato, volevo quello vegetariano', 'Non ho ordinato questo, ho ordinato quello vegetariano'],
          next: 'apology' }
      ]
    },
    apology: {
      id: 'apology', speakerId: 'elena', emotion: 'apologetic',
      text: 'Oh no, mi dispiace tanto! È colpa mia. Le porto subito l’hamburger vegetariano. Posso portarle qualcosa mentre aspetta?',
      translation: 'Ah hayır, çok özür dilerim! Benim hatam. Sebzeli burgeri hemen getireceğim. Beklerken size bir şey getirebilir miyim?',
      choices: [
        { id: 'no_worries', intentionTr: 'Sorun olmadığını söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Nessun problema, capita. Solo un po’ d’acqua, grazie.',
          translation: 'Sorun değil, olur böyle şeyler. Sadece biraz su, teşekkürler.',
          altAccepted: ['Va bene, solo un po’ d’acqua grazie', 'Nessun problema, dell’acqua andrebbe bene'],
          next: 'end_gracious', relationshipEffect: 2 },
        { id: 'ask_speed', intentionTr: 'Acele olduğunu söyle', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Va bene, ma potrebbe fare in fretta? Ho un po’ di premura.',
          translation: 'Sorun değil ama çabuk olabilir mi? Biraz acelem var.',
          altAccepted: ['Potrebbe sbrigarsi un po’, ho fretta', 'Può fare in fretta, ho premura'],
          next: 'manager' }
      ]
    },
    manager: {
      id: 'manager', speakerId: 'marco', emotion: 'apologetic',
      text: 'Sono il responsabile — ho saputo che c’è stato uno scambio. Il suo ordine corretto è in preparazione con priorità, e offre la casa. Ancora, mi scuso.',
      translation: 'Ben müdürüm — bir karışıklık olduğunu duydum. Doğru siparişiniz hızlandırılıyor ve ikramımız. Tekrar özür dilerim.',
      choices: [
        { id: 'thank_manager', intentionTr: 'Teşekkür et ve nazik ol', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'È molto gentile. Grazie per aver risolto così in fretta.',
          translation: 'Çok naziksiniz. Bu kadar hızlı çözdüğünüz için teşekkürler.',
          altAccepted: ['Grazie per aver risolto in fretta', 'È gentile, grazie per averlo sistemato subito'],
          next: 'end_comped', relationshipEffect: 2 },
        { id: 'decline_free', intentionTr: 'Ücretsiz olmasına gerek yok de', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Grazie, ma davvero non è necessario. Sono felice di pagare.',
          translation: 'Teşekkürler ama gerçekten gerek yok. Ödemekten memnuniyet duyarım.',
          altAccepted: ['Non deve, sono felice di pagare', 'Non è necessario, lo pago volentieri'],
          next: 'end_generous', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_gracious: { id: 'end_gracious', kind: 'relationship', title: 'Gestito con garbo', titleTr: 'Nazikçe halledildi',
      text: 'Hai corretto l’ordine con gentilezza e hai messo a suo agio Elena. Un piccolo momento, gestito come un madrelingua.',
      translation: 'Siparişi nazikçe düzelttin ve Elena’yı rahatlattın. Küçük bir an, ana dili gibi halledildi.',
      relationshipEffect: 1, coins: 12 },
    end_comped: { id: 'end_comped', kind: 'problem-solved', title: 'Pasto gratis, senza drammi', titleTr: 'Ücretsiz yemek, sorunsuz',
      text: 'Sei stato chiaro sul fatto di avere fretta, sei rimasto cortese, e il responsabile ti ha offerto il pasto. Ben negoziato.',
      translation: 'Acelen olduğunu net söyledin, kibar kaldın ve müdür yemeğini ikram etti. İyi bir pazarlık.',
      relationshipEffect: 1, coins: 16 },
    end_generous: { id: 'end_generous', kind: 'relationship', title: 'Un ospite generoso', titleTr: 'Cömert bir misafir',
      text: 'Hai rifiutato il pasto gratis con garbo. Il responsabile ha insistito comunque — e ti sei fatto amico l’intero ristorante.',
      translation: 'Ücretsiz yemeği nezaketle geri çevirdin. Müdür yine de ısrar etti — ve tüm restoranı kendine dost ettin.',
      relationshipEffect: 2, coins: 14 }
  }
});
