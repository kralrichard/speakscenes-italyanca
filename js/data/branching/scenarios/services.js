import { createScenario } from '../scenarioSchema.js?v=5';

// ── Bank: reporting a lost card (B1) ────────────────────────────────────────
export const bankLostCard = createScenario({
  id: 'bank-lost-card',
  title: 'Reporting a lost card',
  titleTr: 'Kayıp kartı bildirmek',
  environmentId: 'bank', sceneType: 'bank-office', level: 'B1',
  goal: 'Report your lost card and get a replacement.',
  goalTr: 'Kayıp kartını bildir ve yenisini al.',
  npcIds: ['david'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'david', emotion: 'friendly',
      text: 'Good morning. How can I help you today?',
      translation: 'Günaydın. Bugün nasıl yardımcı olabilirim?',
      choices: [
        { id: 'lost', intentionTr: 'Kartını kaybettiğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Good morning. I think I’ve lost my bank card.',
          translation: 'Günaydın. Sanırım banka kartımı kaybettim.',
          altAccepted: ['I’ve lost my bank card', 'I think I lost my card'],
          next: 'when_lost' },
        { id: 'stolen', intentionTr: 'Kartının çalınmış olabileceğini söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'I need to block my card — I think it may have been stolen.',
          translation: 'Kartımı bloke ettirmem gerekiyor — sanırım çalınmış olabilir.',
          altAccepted: ['I think my card was stolen, please block it', 'My card may have been stolen'],
          next: 'block_now' }
      ]
    },
    when_lost: {
      id: 'when_lost', speakerId: 'david', emotion: 'concerned',
      text: 'I’m sorry to hear that. When did you last use it? I’ll block it right away.',
      translation: 'Bunu duyduğuma üzüldüm. En son ne zaman kullandınız? Hemen bloke edeceğim.',
      choices: [
        { id: 'yesterday', intentionTr: 'Dün kullandığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I used it yesterday at a restaurant, and I haven’t seen it since.',
          translation: 'Dün bir restoranda kullandım ve o zamandan beri görmedim.',
          altAccepted: ['I last used it yesterday at a restaurant', 'Yesterday, at a restaurant, and not since'],
          next: 'new_card' },
        { id: 'not_sure', intentionTr: 'Emin olmadığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I’m not sure, to be honest. Maybe two days ago.',
          translation: 'Açıkçası emin değilim. Belki iki gün önce.',
          altAccepted: ['I’m not sure, maybe two days ago', 'Honestly I’m not certain, a couple of days ago'],
          next: 'new_card' }
      ]
    },
    block_now: {
      id: 'block_now', speakerId: 'david', emotion: 'concerned',
      text: 'Understood — I’m blocking it this second. Done. Have you noticed any payments you don’t recognize?',
      translation: 'Anlaşıldı — şu an bloke ediyorum. Tamam. Tanımadığınız bir ödeme fark ettiniz mi?',
      choices: [
        { id: 'yes_strange', intentionTr: 'Tanımadığın bir ödeme olduğunu söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Yes, actually — there’s a payment I definitely didn’t make.',
          translation: 'Evet, aslında — kesinlikle benim yapmadığım bir ödeme var.',
          altAccepted: ['There’s a payment I didn’t make', 'Yes, I see a charge that isn’t mine'],
          next: 'dispute', relationshipEffect: 1 },
        { id: 'no_strange', intentionTr: 'Tuhaf bir şey yok de', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'No, nothing unusual so far.',
          translation: 'Hayır, şimdiye kadar tuhaf bir şey yok.',
          altAccepted: ['No, nothing strange yet', 'Nothing unusual so far'],
          next: 'new_card' }
      ]
    },
    dispute: {
      id: 'dispute', speakerId: 'david', emotion: 'friendly',
      text: 'Thank you for flagging it. I’ll open a dispute and you won’t be liable for it. Now, let’s order your new card.',
      translation: 'Bildirdiğiniz için teşekkürler. Bir itiraz başlatacağım ve bundan sorumlu olmayacaksınız. Şimdi yeni kartınızı sipariş edelim.',
      next: 'new_card'
    },
    new_card: {
      id: 'new_card', speakerId: 'david', emotion: 'helpful',
      text: 'I can send a new card to your address in three to five days, or you can collect it here tomorrow. Which suits you?',
      translation: 'Yeni kartı üç-beş günde adresinize gönderebilirim ya da yarın buradan alabilirsiniz. Hangisi uygun?',
      choices: [
        { id: 'post', intentionTr: 'Posta ile gönderilmesini iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Please post it to my address. That’s fine.',
          translation: 'Lütfen adresime gönderin. Uygun.',
          altAccepted: ['Post it to my address please', 'By post is fine'],
          next: 'end_sorted' },
        { id: 'collect', intentionTr: 'Yarın gelip almayı tercih et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I’d rather collect it tomorrow, if that’s possible.',
          translation: 'Mümkünse yarın gelip almayı tercih ederim.',
          altAccepted: ['I’ll collect it tomorrow', 'Can I pick it up here tomorrow'],
          next: 'end_sorted', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_sorted: { id: 'end_sorted', kind: 'problem-solved', title: 'Card handled', titleTr: 'Kart halledildi',
      text: 'You reported the lost card calmly, blocked it, and arranged a replacement. Exactly the right steps.',
      translation: 'Kayıp kartı sakince bildirdin, bloke ettirdin ve yenisini ayarladın. Tam da doğru adımlar.',
      relationshipEffect: 1, coins: 14 }
  }
});

// ── Police station: reporting a lost phone (B1) ─────────────────────────────
export const policeLostPhone = createScenario({
  id: 'police-lost-phone',
  title: 'Reporting a lost phone',
  titleTr: 'Kayıp telefonu bildirmek',
  environmentId: 'police', sceneType: 'formal-office', level: 'B1',
  goal: 'File a report for your lost phone and give the details.',
  goalTr: 'Kayıp telefonun için tutanak tut ve ayrıntıları ver.',
  npcIds: ['grant'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'grant', emotion: 'friendly',
      text: 'Good afternoon. What can I do for you?',
      translation: 'İyi günler. Sizin için ne yapabilirim?',
      choices: [
        { id: 'report_lost', intentionTr: 'Telefonunu kaybettiğini bildir', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Hello. I’d like to report a lost phone, please.',
          translation: 'Merhaba. Kayıp bir telefon bildirmek istiyorum, lütfen.',
          altAccepted: ['I want to report a lost phone', 'I’d like to report my phone as lost'],
          next: 'where' },
        { id: 'maybe_stolen', intentionTr: 'Çalınmış olabileceğini bildir', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'I think my phone was stolen on the bus this morning.',
          translation: 'Sanırım telefonum bu sabah otobüste çalındı.',
          altAccepted: ['My phone was stolen on the bus this morning', 'I believe my phone was taken on the bus'],
          next: 'where' }
      ]
    },
    where: {
      id: 'where', speakerId: 'grant', emotion: 'neutral',
      text: 'Alright, let’s get the details. Where and when did you last have it?',
      translation: 'Peki, ayrıntıları alalım. En son nerede ve ne zaman elinizdeydi?',
      choices: [
        { id: 'give_details', intentionTr: 'Ayrıntılı yer ve zaman ver', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'On the number 12 bus, around eight this morning. It’s a black phone in a blue case.',
          translation: '12 numaralı otobüste, bu sabah sekiz sularında. Mavi kılıfta siyah bir telefon.',
          altAccepted: ['On the 12 bus around eight, black phone blue case', 'Around eight on the number 12 bus, a black phone in a blue case'],
          next: 'contact', relationshipEffect: 1 },
        { id: 'vague_details', intentionTr: 'Kısaca, emin olmadan söyle', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Somewhere in the city center this morning. I’m not exactly sure where.',
          translation: 'Bu sabah şehir merkezinde bir yerde. Tam olarak nerede emin değilim.',
          altAccepted: ['In the city center this morning, not sure exactly', 'Somewhere downtown this morning'],
          next: 'contact' }
      ]
    },
    contact: {
      id: 'contact', speakerId: 'grant', emotion: 'helpful',
      text: 'Got it. I’ll file the report and give you a reference number. How would you like us to contact you if it turns up?',
      translation: 'Aldım. Tutanağı tutup size bir referans numarası vereceğim. Bulunursa sizinle nasıl iletişim kuralım?',
      choices: [
        { id: 'by_email', intentionTr: 'E-posta ile iletişim iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'By email would be best, thank you.',
          translation: 'E-posta ile olması en iyisi, teşekkürler.',
          altAccepted: ['Email is best, thanks', 'By email please'],
          next: 'end_filed' },
        { id: 'ask_insurance', intentionTr: 'Sigorta için ne gerektiğini sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'By email, please. Also, will I get a document for my insurance?',
          translation: 'E-posta ile, lütfen. Ayrıca, sigortam için bir belge alacak mıyım?',
          altAccepted: ['Will I get a document for insurance', 'Do I get paperwork for my insurance'],
          next: 'insurance', relationshipEffect: 1 }
      ]
    },
    insurance: {
      id: 'insurance', speakerId: 'grant', emotion: 'friendly',
      text: 'Yes — the reference number and this report are exactly what your insurer will need. Here you are. Good luck.',
      translation: 'Evet — referans numarası ve bu tutanak, sigortacınızın tam olarak isteyeceği şey. Buyurun. Bol şans.',
      next: 'end_insurance'
    }
  },
  endings: {
    end_filed: { id: 'end_filed', kind: 'problem-solved', title: 'Report filed', titleTr: 'Tutanak tutuldu',
      text: 'You reported the phone clearly with all the details. Nothing more you could have done.',
      translation: 'Telefonu tüm ayrıntılarıyla net biçimde bildirdin. Yapabileceğin başka bir şey yoktu.',
      coins: 10 },
    end_insurance: { id: 'end_insurance', kind: 'excellent', title: 'Ready for insurance', titleTr: 'Sigortaya hazır',
      text: 'You thought ahead and asked for the insurance paperwork. That question could save you a lot of money.',
      translation: 'İleriyi düşündün ve sigorta belgesini istedin. Bu soru sana çok para kazandırabilir.',
      coins: 14 }
  }
});
