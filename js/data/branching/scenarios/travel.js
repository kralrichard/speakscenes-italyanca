import { createScenario } from '../scenarioSchema.js?v=5';

// ── Train station: buying a ticket (A2) ─────────────────────────────────────
export const trainTicket = createScenario({
  id: 'train-ticket',
  title: 'Buying a train ticket',
  titleTr: 'Tren bileti almak',
  environmentId: 'train', sceneType: 'transit', level: 'A2',
  goal: 'Buy the right ticket to where you’re going.',
  goalTr: 'Gideceğin yere doğru bileti al.',
  npcIds: ['nina'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'nina', emotion: 'neutral',
      text: 'Next, please! Where are you traveling to today?',
      translation: 'Sıradaki, lütfen! Bugün nereye seyahat ediyorsunuz?',
      choices: [
        { id: 'to_london', intentionTr: 'Londra’ya bilet iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Hi, I’d like a ticket to London, please.',
          translation: 'Merhaba, Londra’ya bir bilet istiyorum, lütfen.',
          altAccepted: ['A ticket to London please', 'Can I have a ticket to London'],
          next: 'return_or_single' },
        { id: 'ask_next', intentionTr: 'Bir sonraki treni sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'When is the next train to London?',
          translation: 'Londra’ya bir sonraki tren ne zaman?',
          altAccepted: ['What time is the next train to London', 'When does the next London train leave'],
          next: 'next_train' }
      ]
    },
    next_train: {
      id: 'next_train', speakerId: 'nina', emotion: 'helpful',
      text: 'The next one leaves at 2:15 from platform three. Would you like a ticket for that?',
      translation: 'Bir sonraki 2:15’te üç numaralı perondan kalkıyor. Ona bilet ister misiniz?',
      choices: [
        { id: 'yes_ticket', intentionTr: 'Evet, o bilete al', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Yes please, one ticket for the 2:15.',
          translation: 'Evet lütfen, 2:15 için bir bilet.',
          altAccepted: ['Yes, one for the 2:15', 'One ticket for that train please'],
          next: 'return_or_single' },
        { id: 'confirm_platform', intentionTr: 'Perdonu teyit ederek bilet al', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Yes, one ticket please. Platform three, you said?',
          translation: 'Evet, bir bilet lütfen. Peron üç, demiştiniz değil mi?',
          altAccepted: ['One ticket, platform three right', 'Yes please, that’s platform three'],
          next: 'return_or_single' }
      ]
    },
    return_or_single: {
      id: 'return_or_single', speakerId: 'nina', emotion: 'neutral',
      text: 'Single or return?',
      translation: 'Tek yön mü gidiş-dönüş mü?',
      choices: [
        { id: 'return', intentionTr: 'Gidiş-dönüş iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'A return, please. I’m coming back tonight.',
          translation: 'Gidiş-dönüş, lütfen. Bu gece dönüyorum.',
          altAccepted: ['A return please', 'Return, I’m back tonight'],
          next: 'end_ticket' },
        { id: 'single', intentionTr: 'Tek yön iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Just a single, thanks.',
          translation: 'Sadece tek yön, teşekkürler.',
          altAccepted: ['A single please', 'One way, thanks'],
          next: 'end_ticket' },
        { id: 'ask_discount', intentionTr: 'İndirim olup olmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'A return — and is there any student discount available?',
          translation: 'Gidiş-dönüş — ve öğrenci indirimi var mı?',
          altAccepted: ['Return, and is there a student discount', 'Do you have a student discount'],
          next: 'discount' }
      ]
    },
    discount: {
      id: 'discount', speakerId: 'nina', emotion: 'friendly',
      text: 'There is, actually — with a valid student card it’s twenty percent off. Do you have one?',
      translation: 'Aslında var — geçerli öğrenci kartıyla yüzde yirmi indirim. Kartınız var mı?',
      next: 'end_discount'
    }
  },
  endings: {
    end_ticket: { id: 'end_ticket', kind: 'success', title: 'Ticket in hand', titleTr: 'Bilet elde',
      text: 'You bought the right ticket and know your platform. All aboard!',
      translation: 'Doğru bileti aldın ve peronunu biliyorsun. Herkes trene!',
      coins: 10 },
    end_discount: { id: 'end_discount', kind: 'excellent', title: 'Cheaper ticket', titleTr: 'Daha ucuz bilet',
      text: 'You thought to ask about a discount and saved yourself money. Smart traveling!',
      translation: 'İndirim sormayı akıl ettin ve para biriktirdin. Akıllı yolculuk!',
      coins: 14 }
  }
});

// ── Taxi ride (A2) ──────────────────────────────────────────────────────────
export const taxiRide = createScenario({
  id: 'taxi-ride',
  title: 'Taking a taxi',
  titleTr: 'Taksiye binmek',
  environmentId: 'taxi', sceneType: 'taxi', level: 'A2',
  goal: 'Tell the driver where to go and handle the ride.',
  goalTr: 'Sürücüye nereye gideceğini söyle ve yolculuğu yönet.',
  npcIds: ['victor'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'victor', emotion: 'friendly',
      text: 'Evening! Hop in. Where can I take you?',
      translation: 'İyi akşamlar! Atla. Sizi nereye götüreyim?',
      choices: [
        { id: 'airport', intentionTr: 'Havalimanına git de', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'To the airport, please. Terminal two.',
          translation: 'Havalimanına, lütfen. İkinci terminal.',
          altAccepted: ['The airport please, terminal two', 'Airport, terminal two'],
          next: 'hurry' },
        { id: 'hotel_addr', intentionTr: 'Otel adresini ver', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Could you take me to the Sunrise Hotel on King Street?',
          translation: 'Beni King Caddesi’ndeki Sunrise Otel’e götürür müsünüz?',
          altAccepted: ['The Sunrise Hotel on King Street please', 'To the Sunrise Hotel, King Street'],
          next: 'smalltalk' }
      ]
    },
    hurry: {
      id: 'hurry', speakerId: 'victor', emotion: 'neutral',
      text: 'No problem. Traffic’s a bit heavy tonight — are you in a hurry, or shall I take the scenic route?',
      translation: 'Sorun değil. Bu gece trafik biraz yoğun — aceleniz var mı, yoksa manzaralı yoldan mı gideyim?',
      choices: [
        { id: 'fast', intentionTr: 'Acelen olduğunu söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'I’m in a hurry — the fastest way, please.',
          translation: 'Acelem var — en hızlı yol, lütfen.',
          altAccepted: ['The fastest way please, I’m in a rush', 'Quickest route, I’m in a hurry'],
          next: 'end_arrived' },
        { id: 'relax', intentionTr: 'Acelen olmadığını söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'No rush at all. Whichever way is easier for you.',
          translation: 'Hiç acelem yok. Sizin için hangisi kolaysa.',
          altAccepted: ['No rush, whichever is easier', 'Take your time, either way'],
          next: 'smalltalk', relationshipEffect: 1 }
      ]
    },
    smalltalk: {
      id: 'smalltalk', speakerId: 'victor', emotion: 'happy',
      text: 'So, are you visiting the city, or do you live here?',
      translation: 'Peki, şehri mi ziyaret ediyorsunuz yoksa burada mı yaşıyorsunuz?',
      choices: [
        { id: 'tourist', intentionTr: 'Turist olduğunu söyle', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Just visiting for a few days. It’s a beautiful city!',
          translation: 'Sadece birkaç günlüğüne ziyaretteyim. Güzel bir şehir!',
          altAccepted: ['I’m just visiting for a few days', 'Visiting for a few days, it’s lovely'],
          next: 'recommend' },
        { id: 'quiet', intentionTr: 'Kibarca sessiz kalmayı tercih et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Just visiting. It’s been a long day, though — do you mind if I rest?',
          translation: 'Sadece ziyaret. Ama uzun bir gündü — dinlensem sorun olur mu?',
          altAccepted: ['Do you mind if I rest, long day', 'It’s been a long day, mind if I close my eyes'],
          next: 'end_arrived', relationshipEffect: 1 }
      ]
    },
    recommend: {
      id: 'recommend', speakerId: 'victor', emotion: 'friendly',
      text: 'Then you must try the old market and the harbor at sunset. Here we are — that’s twelve euros.',
      translation: 'O zaman eski çarşıyı ve gün batımında limanı mutlaka görmelisiniz. Geldik — on iki euro.',
      next: 'end_tips'
    }
  },
  endings: {
    end_arrived: { id: 'end_arrived', kind: 'success', title: 'Arrived safely', titleTr: 'Güvenle vardın',
      text: 'You told the driver where to go and got there smoothly. Easy ride.',
      translation: 'Sürücüye nereye gideceğini söyledin ve sorunsuz vardın. Kolay bir yolculuk.',
      coins: 10 },
    end_tips: { id: 'end_tips', kind: 'relationship', title: 'Local tips and a friend', titleTr: 'Yerel ipuçları ve bir dost',
      text: 'You chatted with the driver and got great local tips. Small talk goes a long way in English!',
      translation: 'Sürücüyle sohbet ettin ve harika yerel ipuçları aldın. İngilizcede biraz sohbet çok işe yarar!',
      relationshipEffect: 1, coins: 12 }
  }
});
