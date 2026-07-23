import { createScenario } from '../scenarioSchema.js?v=6';

// ── Train station: buying a ticket (A2) ─────────────────────────────────────
export const trainTicket = createScenario({
  id: 'train-ticket',
  title: 'Comprare un biglietto del treno',
  titleTr: 'Tren bileti almak',
  environmentId: 'train', sceneType: 'transit', level: 'A2',
  goal: 'Compra il biglietto giusto per dove stai andando.',
  goalTr: 'Gideceğin yere doğru bileti al.',
  npcIds: ['nina'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'nina', emotion: 'neutral',
      text: 'Il prossimo, prego! Dove viaggia oggi?',
      translation: 'Sıradaki, lütfen! Bugün nereye seyahat ediyorsunuz?',
      choices: [
        { id: 'to_london', intentionTr: 'Londra’ya bilet iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Salve, vorrei un biglietto per Londra, per favore.',
          translation: 'Merhaba, Londra’ya bir bilet istiyorum, lütfen.',
          altAccepted: ['Un biglietto per Londra per favore', 'Posso avere un biglietto per Londra'],
          next: 'return_or_single' },
        { id: 'ask_next', intentionTr: 'Bir sonraki treni sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Quando parte il prossimo treno per Londra?',
          translation: 'Londra’ya bir sonraki tren ne zaman?',
          altAccepted: ['A che ora è il prossimo treno per Londra', 'Quando parte il prossimo treno per Londra'],
          next: 'next_train' }
      ]
    },
    next_train: {
      id: 'next_train', speakerId: 'nina', emotion: 'helpful',
      text: 'Il prossimo parte alle 14:15 dal binario tre. Le faccio un biglietto per quello?',
      translation: 'Bir sonraki 2:15’te üç numaralı perondan kalkıyor. Ona bilet ister misiniz?',
      choices: [
        { id: 'yes_ticket', intentionTr: 'Evet, o bilete al', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Sì grazie, un biglietto per quello delle 14:15.',
          translation: 'Evet lütfen, 2:15 için bir bilet.',
          altAccepted: ['Sì, uno per quello delle 14:15', 'Un biglietto per quel treno per favore'],
          next: 'return_or_single' },
        { id: 'confirm_platform', intentionTr: 'Perdonu teyit ederek bilet al', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Sì, un biglietto per favore. Binario tre, ha detto?',
          translation: 'Evet, bir bilet lütfen. Peron üç, demiştiniz değil mi?',
          altAccepted: ['Un biglietto, binario tre giusto', 'Sì grazie, è il binario tre'],
          next: 'return_or_single' }
      ]
    },
    return_or_single: {
      id: 'return_or_single', speakerId: 'nina', emotion: 'neutral',
      text: 'Solo andata o andata e ritorno?',
      translation: 'Tek yön mü gidiş-dönüş mü?',
      choices: [
        { id: 'return', intentionTr: 'Gidiş-dönüş iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Andata e ritorno, per favore. Torno stasera.',
          translation: 'Gidiş-dönüş, lütfen. Bu gece dönüyorum.',
          altAccepted: ['Andata e ritorno per favore', 'A/R, torno stasera'],
          next: 'end_ticket' },
        { id: 'single', intentionTr: 'Tek yön iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Solo andata, grazie.',
          translation: 'Sadece tek yön, teşekkürler.',
          altAccepted: ['Solo andata per favore', 'Solo andata, grazie'],
          next: 'end_ticket' },
        { id: 'ask_discount', intentionTr: 'İndirim olup olmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Andata e ritorno — e c’è qualche sconto per studenti?',
          translation: 'Gidiş-dönüş — ve öğrenci indirimi var mı?',
          altAccepted: ['A/R, e c’è uno sconto studenti', 'Avete uno sconto per studenti'],
          next: 'discount' }
      ]
    },
    discount: {
      id: 'discount', speakerId: 'nina', emotion: 'friendly',
      text: 'In effetti sì — con una tessera studenti valida c’è il venti per cento di sconto. Ne ha una?',
      translation: 'Aslında var — geçerli öğrenci kartıyla yüzde yirmi indirim. Kartınız var mı?',
      next: 'end_discount'
    }
  },
  endings: {
    end_ticket: { id: 'end_ticket', kind: 'success', title: 'Biglietto in mano', titleTr: 'Bilet elde',
      text: 'Hai comprato il biglietto giusto e sai qual è il tuo binario. Tutti a bordo!',
      translation: 'Doğru bileti aldın ve peronunu biliyorsun. Herkes trene!',
      coins: 10 },
    end_discount: { id: 'end_discount', kind: 'excellent', title: 'Biglietto più economico', titleTr: 'Daha ucuz bilet',
      text: 'Hai pensato a chiedere uno sconto e hai risparmiato. Viaggiare con furbizia!',
      translation: 'İndirim sormayı akıl ettin ve para biriktirdin. Akıllı yolculuk!',
      coins: 14 }
  }
});

// ── Taxi ride (A2) ──────────────────────────────────────────────────────────
export const taxiRide = createScenario({
  id: 'taxi-ride',
  title: 'Prendere un taxi',
  titleTr: 'Taksiye binmek',
  environmentId: 'taxi', sceneType: 'taxi', level: 'A2',
  goal: 'Di’ all’autista dove andare e gestisci la corsa.',
  goalTr: 'Sürücüye nereye gideceğini söyle ve yolculuğu yönet.',
  npcIds: ['victor'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'victor', emotion: 'friendly',
      text: 'Buonasera! Salga pure. Dove la porto?',
      translation: 'İyi akşamlar! Atla. Sizi nereye götüreyim?',
      choices: [
        { id: 'airport', intentionTr: 'Havalimanına git de', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'All’aeroporto, per favore. Terminal due.',
          translation: 'Havalimanına, lütfen. İkinci terminal.',
          altAccepted: ['All’aeroporto per favore, terminal due', 'Aeroporto, terminal due'],
          next: 'hurry' },
        { id: 'hotel_addr', intentionTr: 'Otel adresini ver', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Può portarmi all’Hotel Sunrise in Via del Re?',
          translation: 'Beni King Caddesi’ndeki Sunrise Otel’e götürür müsünüz?',
          altAccepted: ['All’Hotel Sunrise in Via del Re per favore', 'All’Hotel Sunrise, Via del Re'],
          next: 'smalltalk' }
      ]
    },
    hurry: {
      id: 'hurry', speakerId: 'victor', emotion: 'neutral',
      text: 'Nessun problema. Stasera c’è un po’ di traffico — ha fretta, o faccio la strada panoramica?',
      translation: 'Sorun değil. Bu gece trafik biraz yoğun — aceleniz var mı, yoksa manzaralı yoldan mı gideyim?',
      choices: [
        { id: 'fast', intentionTr: 'Acelen olduğunu söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'Ho fretta — la strada più veloce, per favore.',
          translation: 'Acelem var — en hızlı yol, lütfen.',
          altAccepted: ['La strada più veloce per favore, ho fretta', 'Il percorso più rapido, ho fretta'],
          next: 'end_arrived' },
        { id: 'relax', intentionTr: 'Acelen olmadığını söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Nessuna fretta. La strada che le è più comoda.',
          translation: 'Hiç acelem yok. Sizin için hangisi kolaysa.',
          altAccepted: ['Nessuna fretta, quella più comoda', 'Con calma, come preferisce'],
          next: 'smalltalk', relationshipEffect: 1 }
      ]
    },
    smalltalk: {
      id: 'smalltalk', speakerId: 'victor', emotion: 'happy',
      text: 'Allora, è in visita alla città o vive qui?',
      translation: 'Peki, şehri mi ziyaret ediyorsunuz yoksa burada mı yaşıyorsunuz?',
      choices: [
        { id: 'tourist', intentionTr: 'Turist olduğunu söyle', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Sono solo in visita per qualche giorno. È una bellissima città!',
          translation: 'Sadece birkaç günlüğüne ziyaretteyim. Güzel bir şehir!',
          altAccepted: ['Sono in visita per qualche giorno', 'In visita per qualche giorno, è splendida'],
          next: 'recommend' },
        { id: 'quiet', intentionTr: 'Kibarca sessiz kalmayı tercih et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Solo in visita. È stata una giornata lunga, però — le dispiace se mi riposo?',
          translation: 'Sadece ziyaret. Ama uzun bir gündü — dinlensem sorun olur mu?',
          altAccepted: ['Le dispiace se mi riposo, giornata lunga', 'È stata una giornata lunga, posso chiudere gli occhi'],
          next: 'end_arrived', relationshipEffect: 1 }
      ]
    },
    recommend: {
      id: 'recommend', speakerId: 'victor', emotion: 'friendly',
      text: 'Allora deve provare il vecchio mercato e il porto al tramonto. Eccoci — fanno dodici euro.',
      translation: 'O zaman eski çarşıyı ve gün batımında limanı mutlaka görmelisiniz. Geldik — on iki euro.',
      next: 'end_tips'
    }
  },
  endings: {
    end_arrived: { id: 'end_arrived', kind: 'success', title: 'Arrivato sano e salvo', titleTr: 'Güvenle vardın',
      text: 'Hai detto all’autista dove andare e ci sei arrivato senza intoppi. Corsa facile.',
      translation: 'Sürücüye nereye gideceğini söyledin ve sorunsuz vardın. Kolay bir yolculuk.',
      coins: 10 },
    end_tips: { id: 'end_tips', kind: 'relationship', title: 'Consigli locali e un amico', titleTr: 'Yerel ipuçları ve bir dost',
      text: 'Hai chiacchierato con l’autista e hai ricevuto ottimi consigli locali. Due chiacchiere valgono molto in italiano!',
      translation: 'Sürücüyle sohbet ettin ve harika yerel ipuçları aldın. İngilizcede biraz sohbet çok işe yarar!',
      relationshipEffect: 1, coins: 12 }
  }
});
