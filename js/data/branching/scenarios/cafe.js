import { createScenario } from '../scenarioSchema.js?v=6';

// ── Café order (A1) ─────────────────────────────────────────────────────────
export const cafeOrder = createScenario({
  id: 'cafe-order',
  title: 'Ordinare al bar',
  titleTr: 'Kafede sipariş vermek',
  environmentId: 'cafe', sceneType: 'cafe', level: 'A1',
  goal: 'Ordina una bevanda come piace a te.',
  goalTr: 'İçeceğini istediğin gibi sipariş et.',
  npcIds: ['mia'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'mia', emotion: 'happy',
      text: 'Ciao! Cosa ti porto?',
      translation: 'Merhaba! Ne alırsınız?',
      choices: [
        { id: 'coffee', intentionTr: 'Bir kahve iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Ciao! Posso avere un caffè, per favore?',
          translation: 'Merhaba! Bir kahve alabilir miyim, lütfen?',
          altAccepted: ['Mi porti un caffè per favore', 'Un caffè, per favore'],
          next: 'size' },
        { id: 'tea', intentionTr: 'Bir çay iste', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Potrei avere una tazza di tè, per favore?',
          translation: 'Bir fincan çay alabilir miyim, lütfen?',
          altAccepted: ['Posso avere un tè per favore', 'Un tè, per favore'],
          next: 'size' },
        { id: 'recommend', intentionTr: 'Ne önerdiğini sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Cosa c’è di buono qui? Cosa mi consigli?',
          translation: 'Burada ne güzel? Ne önerirsin?',
          altAccepted: ['Cosa mi consigli', 'Cosa va di più qui'],
          next: 'suggest' }
      ]
    },
    suggest: {
      id: 'suggest', speakerId: 'mia', emotion: 'friendly',
      text: 'Il nostro latte al caramello è tra i preferiti, e il tè freddo è ottimo in una giornata calda. Cosa ti ispira?',
      translation: 'Karamelli latte favorimiz, sıcak günlerde de buzlu çay harika. Hangisi hoşuna gitti?',
      choices: [
        { id: 'latte', intentionTr: 'Latte’yi seç', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Il latte al caramello sembra perfetto. Prendo quello.',
          translation: 'Karamelli latte harika. Onu alayım.',
          altAccepted: ['Prendo il latte al caramello', 'Il latte al caramello per favore'],
          next: 'size', relationshipEffect: 1 },
        { id: 'icedtea', intentionTr: 'Buzlu çayı seç', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Provo il tè freddo, grazie.',
          translation: 'Buzlu çayı deneyeyim, teşekkürler.',
          altAccepted: ['Il tè freddo per favore', 'Prendo il tè freddo'],
          next: 'size' }
      ]
    },
    size: {
      id: 'size', speakerId: 'mia', emotion: 'neutral',
      text: 'Certo! Che misura vuoi — piccola, media o grande?',
      translation: 'Tabii! Hangi boy istersiniz — küçük, orta, yoksa büyük?',
      choices: [
        { id: 'medium', intentionTr: 'Orta boy iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Una media, per favore. Da portare via.',
          translation: 'Orta boy, lütfen. Dışarı alacağım.',
          altAccepted: ['Media per favore, da portare via', 'Una media d’asporto'],
          next: 'end_ordered' },
        { id: 'large_stay', intentionTr: 'Büyük iste ve içeride kal', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Una grande, e la bevo qui.',
          translation: 'Büyük boy ve burada içeceğim.',
          altAccepted: ['Grande, e la prendo qui', 'Una grande da bere qui'],
          next: 'end_ordered', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_ordered: { id: 'end_ordered', kind: 'success', title: 'Ordine pronto', titleTr: 'Sipariş hazır',
      text: 'Hai ordinato la tua bevanda con chiarezza, misura compresa. Buon appetito!',
      translation: 'İçeceğini boyuyla birlikte net biçimde sipariş ettin. Afiyet olsun!',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Café catch-up with a friend (B1) ────────────────────────────────────────
export const cafeMeetup = createScenario({
  id: 'cafe-meetup',
  title: 'Fare due chiacchiere con un vecchio amico',
  titleTr: 'Eski bir arkadaşla hasret gidermek',
  environmentId: 'cafe', sceneType: 'cafe', level: 'B1',
  goal: 'Ritrova un amico che non vedi da anni.',
  goalTr: 'Yıllardır görmediğin bir arkadaşınla yeniden bağ kur.',
  npcIds: ['hannah'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'hannah', emotion: 'surprised',
      text: 'Oh mio Dio — sei davvero tu? Quanto è passato, cinque anni?',
      translation: 'Aman tanrım — bu gerçekten sen misin? Ne kadar oldu, beş yıl mı?',
      choices: [
        { id: 'warm', intentionTr: 'Sıcak bir şekilde karşılık ver', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Hannah! Non ci credo — sei identica a prima!',
          translation: 'Hannah! İnanamıyorum — tıpatıp aynısın!',
          altAccepted: ['Non ci credo, sei uguale', 'Hannah, che bello vederti'],
          next: 'whats_new', relationshipEffect: 2 },
        { id: 'surprised', intentionTr: 'Şaşkınlığını dile getir', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Wow, che coincidenza! Cosa ci fai qui?',
          translation: 'Vay, ne tesadüf! Burada ne yapıyorsun?',
          altAccepted: ['Che coincidenza, cosa ti porta qui', 'Cosa ci fai qui'],
          next: 'whats_new' }
      ]
    },
    whats_new: {
      id: 'whats_new', speakerId: 'hannah', emotion: 'happy',
      text: 'Sono tornata il mese scorso! Adesso lavoro in ospedale. Allora dimmi — tu cosa hai fatto in questi anni?',
      translation: 'Geçen ay geri taşındım! Şimdi hastanede çalışıyorum. Anlat bakalım — sen neler yapıyordun?',
      choices: [
        { id: 'job', intentionTr: 'İşinden bahset', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'È cambiato tanto! Due anni fa ho aperto la mia attività.',
          translation: 'Çok şey değişti! İki yıl önce kendi işimi kurdum.',
          altAccepted: ['Due anni fa ho aperto la mia attività', 'Gestisco una mia attività'],
          next: 'plans', relationshipEffect: 1 },
        { id: 'travel', intentionTr: 'Seyahatlerinden bahset', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'A dire il vero, ho viaggiato molto — sono appena tornato dal Giappone.',
          translation: 'Açıkçası çok seyahat ediyordum — daha yeni Japonya’dan döndüm.',
          altAccepted: ['Ho viaggiato molto, appena tornato dal Giappone', 'Sono appena tornato dal Giappone'],
          next: 'plans' }
      ]
    },
    plans: {
      id: 'plans', speakerId: 'hannah', emotion: 'friendly',
      text: 'È fantastico! Abbiamo così tante cose da raccontarci. Hai tempo per un caffè come si deve, o devi scappare?',
      translation: 'Bu harika! Konuşacak çok şeyimiz var. Doğru dürüst bir kahveye vaktin var mı, yoksa acele mi ediyorsun?',
      choices: [
        { id: 'stay', intentionTr: 'Kal ve sohbet et', tone: 'friendly', difficulty: 'medium', xp: 16,
          sentence: 'Ho tutto il pomeriggio. Prendiamo un tavolo e raccontiamoci con calma.',
          translation: 'Bütün öğleden sonram boş. Bir masa tutup güzelce sohbet edelim.',
          altAccepted: ['Ho tempo, sediamoci e raccontiamoci', 'Prendiamo un tavolo e parliamo'],
          next: 'end_reunion', relationshipEffect: 2 },
        { id: 'reschedule', intentionTr: 'Şimdi olmaz ama buluşma ayarla', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Ora devo scappare, ma scambiamoci i numeri e vediamoci per bene questa settimana.',
          translation: 'Şimdi gitmem lazım ama numaralarımızı alalım ve bu hafta doğru dürüst buluşalım.',
          altAccepted: ['Scambiamoci i numeri e vediamoci questa settimana', 'Devo andare, ma vediamoci questa settimana'],
          next: 'end_plan', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_reunion: { id: 'end_reunion', kind: 'relationship', title: 'Un vero ritrovarsi', titleTr: 'Gerçek bir buluşma',
      text: 'Vi siete seduti e avete parlato per ore. Certe amicizie riprendono esattamente da dove si erano interrotte.',
      translation: 'Oturup saatlerce konuştunuz. Bazı dostluklar kaldığı yerden devam eder.',
      relationshipEffect: 2, coins: 16 },
    end_plan: { id: 'end_plan', kind: 'success', title: 'Un piano per vedersi', titleTr: 'Buluşma planı',
      text: 'Non potevi restare, ma hai preso un impegno concreto per rivedervi. Gestito con calore e cortesia.',
      translation: 'Kalamadın ama tekrar buluşmak için sağlam bir plan yaptın. Sıcak ve kibarca halledildi.',
      coins: 10 }
  }
});
