import { createScenario } from '../scenarioSchema.js';

// ── Airport check-in (A2) ───────────────────────────────────────────────────
export const airportCheckin = createScenario({
  id: 'airport-checkin',
  title: 'Checking in for your flight',
  titleTr: 'Uçuşun için check-in yapmak',
  environmentId: 'airport', sceneType: 'airport', level: 'A2',
  goal: 'Check in, sort out your bag, and get your boarding pass.',
  goalTr: 'Check-in yap, bavulunu hallet ve biniş kartını al.',
  npcIds: ['priya'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'priya', emotion: 'friendly',
      text: 'Good morning! May I see your passport and booking, please?',
      translation: 'Günaydın! Pasaportunuzu ve rezervasyonunuzu görebilir miyim, lütfen?',
      choices: [
        { id: 'give_docs', intentionTr: 'Belgeleri ver', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Here you are — my passport and my booking on the phone.',
          translation: 'Buyurun — pasaportum ve telefondaki rezervasyonum.',
          altAccepted: ['Here is my passport and booking', 'Here you go, passport and booking'],
          next: 'bags', relationshipEffect: 1 },
        { id: 'no_print', intentionTr: 'Dijital biletin geçerli olup olmadığını sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I only have a digital booking. Is that okay?',
          translation: 'Sadece dijital rezervasyonum var. Uygun mu?',
          altAccepted: ['Is a digital booking okay', 'I only have it on my phone, is that fine'],
          next: 'digital_ok' }
      ]
    },
    digital_ok: {
      id: 'digital_ok', speakerId: 'priya', emotion: 'friendly',
      text: 'A digital booking is perfectly fine. Thank you — now, are you checking any bags today?',
      translation: 'Dijital rezervasyon gayet uygun. Teşekkürler — peki bugün bavul verecek misiniz?',
      next: 'bags'
    },
    bags: {
      id: 'bags', speakerId: 'priya', emotion: 'neutral',
      text: 'Are you checking any bags, or is it just the one carry-on today?',
      translation: 'Bavul verecek misiniz, yoksa bugün sadece bir el bagajı mı var?',
      choices: [
        { id: 'one_bag', intentionTr: 'Bir bavul vereceğini söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'I have one suitcase to check in, please.',
          translation: 'Check-in için bir valizim var, lütfen.',
          altAccepted: ['I have one bag to check', 'Just one suitcase to check in'],
          next: 'overweight' },
        { id: 'carry_only', intentionTr: 'Sadece el bagajı olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'No, just this carry-on bag with me.',
          translation: 'Hayır, sadece bu el bagajı var.',
          altAccepted: ['Just carry-on', 'No, only this carry-on bag'],
          next: 'seat' },
        { id: 'ask_gate', intentionTr: 'Kapının nerede olduğunu sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Just a carry-on. By the way, could you tell me which gate I need?',
          translation: 'Sadece el bagajı. Bu arada hangi kapıya gitmem gerektiğini söyler misiniz?',
          altAccepted: ['Which gate do I need', 'Can you tell me my gate'],
          next: 'gate_info' }
      ]
    },
    overweight: {
      id: 'overweight', speakerId: 'priya', emotion: 'concerned',
      text: 'Let’s weigh it… ah, it’s two kilos over the limit. There’s a small excess fee, or you could move a few items to your carry-on.',
      translation: 'Tartalım… ah, limitin iki kilo üzerinde. Küçük bir fazlalık ücreti var ya da birkaç eşyayı el bagajına alabilirsiniz.',
      choices: [
        { id: 'pay_fee', intentionTr: 'Ücreti ödemeyi kabul et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'That’s alright, I’ll pay the excess fee.',
          translation: 'Sorun değil, fazlalık ücretini öderim.',
          altAccepted: ['I’ll pay the fee', 'It’s fine, I’ll pay the extra'],
          next: 'seat' },
        { id: 'move_items', intentionTr: 'Eşyaları taşımayı tercih et', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'I’ll move a few things to my carry-on instead.',
          translation: 'Bunun yerine birkaç şeyi el bagajıma alayım.',
          altAccepted: ['I’ll move some things to my carry-on', 'Let me move a few items instead'],
          next: 'seat', relationshipEffect: 1 }
      ]
    },
    seat: {
      id: 'seat', speakerId: 'priya', emotion: 'friendly',
      text: 'All set. Would you like a window seat or an aisle seat?',
      translation: 'Her şey hazır. Cam kenarı mı yoksa koridor tarafı mı istersiniz?',
      choices: [
        { id: 'window', intentionTr: 'Cam kenarı iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'A window seat, please. I love the view.',
          translation: 'Cam kenarı, lütfen. Manzarayı severim.',
          altAccepted: ['Window seat please', 'I’d like a window seat'],
          next: 'done' },
        { id: 'aisle', intentionTr: 'Koridor tarafı iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'An aisle seat would be better, thanks.',
          translation: 'Koridor tarafı daha iyi olur, teşekkürler.',
          altAccepted: ['Aisle seat please', 'I’d prefer an aisle seat'],
          next: 'done' }
      ]
    },
    gate_info: {
      id: 'gate_info', speakerId: 'priya', emotion: 'helpful',
      text: 'Of course — you’ll board at gate B12. It’s a ten-minute walk, so leave a little time. Now, window or aisle?',
      translation: 'Tabii — B12 kapısından bineceksiniz. On dakikalık yürüyüş, biraz zaman bırakın. Şimdi, cam kenarı mı koridor mu?',
      next: 'seat'
    },
    done: {
      id: 'done', speakerId: 'priya', emotion: 'happy',
      text: 'Here’s your boarding pass. Gate B12, boarding at 10:40. Have a wonderful flight!',
      translation: 'Biniş kartınız burada. B12 kapısı, 10:40’ta biniş. İyi uçuşlar!',
      next: 'end_success'
    }
  },
  endings: {
    end_success: { id: 'end_success', kind: 'success', title: 'Checked in and ready', titleTr: 'Check-in tamam, hazırsın',
      text: 'Passport, bag, and seat — all handled clearly. Boarding pass in hand.',
      translation: 'Pasaport, bavul ve koltuk — hepsi net biçimde halledildi. Biniş kartı elinde.',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Missing your flight (B1) ────────────────────────────────────────────────
export const missingFlight = createScenario({
  id: 'missing-flight',
  title: 'You’re about to miss your flight',
  titleTr: 'Uçuşunu kaçırmak üzeresin',
  environmentId: 'airport', sceneType: 'airport', level: 'B1',
  goal: 'Explain the situation calmly and find the best option.',
  goalTr: 'Durumu sakince anlat ve en iyi seçeneği bul.',
  npcIds: ['omar'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'omar', emotion: 'concerned',
      text: 'I’m sorry, the gate for flight 208 has just closed. What can I do for you?',
      translation: 'Üzgünüm, 208 sefer sayılı uçuşun kapısı az önce kapandı. Sizin için ne yapabilirim?',
      choices: [
        { id: 'explain', intentionTr: 'Sakince ne olduğunu anlat', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'My connecting flight was delayed, so I couldn’t get here in time.',
          translation: 'Aktarma uçuşum rötar yaptı, bu yüzden zamanında gelemedim.',
          altAccepted: ['My connection was delayed', 'I was late because my other flight was delayed'],
          next: 'next_flight' },
        { id: 'panic', intentionTr: 'Panikle bir sonraki uçağa binmek istediğini söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'Please, I really need to get on the next flight to Rome.',
          translation: 'Lütfen, Roma’ya bir sonraki uçağa gerçekten binmem gerekiyor.',
          altAccepted: ['I need the next flight to Rome', 'Can you get me on the next flight to Rome'],
          next: 'next_flight' }
      ]
    },
    next_flight: {
      id: 'next_flight', speakerId: 'omar', emotion: 'thinking',
      text: 'Let me check… There’s another flight in three hours, but it’s nearly full. Or an evening flight with open seats. Which do you prefer?',
      translation: 'Bakayım… Üç saat sonra başka bir uçuş var ama neredeyse dolu. Ya da boş koltukları olan bir akşam uçuşu. Hangisini tercih edersiniz?',
      choices: [
        { id: 'sooner', intentionTr: 'Erken uçuşu iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I’d prefer the sooner one, even if I have to wait at the gate.',
          translation: 'Kapıda beklemek zorunda kalsam bile erken olanı tercih ederim.',
          altAccepted: ['I’d prefer the earlier flight', 'The sooner flight, please'],
          next: 'fee_question' },
        { id: 'evening', intentionTr: 'Rahat olan akşam uçuşunu seç', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'The evening flight is fine. I’d rather have a guaranteed seat.',
          translation: 'Akşam uçuşu uygun. Garantili bir koltuğu tercih ederim.',
          altAccepted: ['I’ll take the evening flight', 'The evening one is fine'],
          next: 'rebooked_free' }
      ]
    },
    fee_question: {
      id: 'fee_question', speakerId: 'omar', emotion: 'neutral',
      text: 'Since the delay was the airline’s fault, there’s no rebooking fee. But that flight only has a middle seat left. Still want it?',
      translation: 'Rötar havayolunun hatası olduğundan yeniden rezervasyon ücreti yok. Ama o uçuşta sadece orta koltuk kaldı. Yine de ister misiniz?',
      choices: [
        { id: 'take_middle', intentionTr: 'Orta koltuğu kabul et', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'A middle seat is fine — I just want to get there.',
          translation: 'Orta koltuk uygun — sadece oraya varmak istiyorum.',
          altAccepted: ['Middle seat is fine', 'I’ll take the middle seat'],
          next: 'rebooked_sooner' },
        { id: 'ask_lounge', intentionTr: 'Bekleme için bir şey iste', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'I’ll take it. Given the delay, could I get a lounge pass while I wait?',
          translation: 'Alıyorum. Rötar göz önüne alınırsa, beklerken bir lounge kartı alabilir miyim?',
          altAccepted: ['Could I have a lounge pass while I wait', 'Can I get lounge access for the wait'],
          next: 'lounge_granted' }
      ]
    },
    rebooked_sooner: {
      id: 'rebooked_sooner', speakerId: 'omar', emotion: 'friendly',
      text: 'Done — you’re confirmed on the three o’clock flight, gate C4. Sorry again for the delay.',
      translation: 'Tamam — saat üç uçuşuna onaylandınız, kapı C4. Rötar için tekrar özür dilerim.',
      next: 'end_rebooked'
    },
    lounge_granted: {
      id: 'lounge_granted', speakerId: 'omar', emotion: 'happy',
      text: 'That’s fair. Here’s a lounge pass and your new boarding pass. Relax until three — you’ve earned it.',
      translation: 'Bu adil. İşte bir lounge kartı ve yeni biniş kartınız. Saat üçe kadar dinlenin — hak ettiniz.',
      next: 'end_excellent'
    },
    rebooked_free: {
      id: 'rebooked_free', speakerId: 'omar', emotion: 'friendly',
      text: 'You’re on the evening flight, window seat, no charge. A calm choice — thank you for your patience.',
      translation: 'Akşam uçuşundasınız, cam kenarı, ücretsiz. Sakin bir tercih — sabrınız için teşekkürler.',
      next: 'end_calm'
    }
  },
  endings: {
    end_rebooked: { id: 'end_rebooked', kind: 'problem-solved', title: 'Back on a flight', titleTr: 'Yeniden uçuşta',
      text: 'You explained the delay calmly and got on the very next flight. Crisis handled.',
      translation: 'Rötarı sakince anlattın ve hemen bir sonraki uçağa bindin. Kriz yönetildi.',
      relationshipEffect: 1, coins: 12 },
    end_excellent: { id: 'end_excellent', kind: 'excellent', title: 'Rebooked with a perk', titleTr: 'Ekstra ile yeniden rezervasyon',
      text: 'You stayed polite, knew your rights, and even got lounge access. Excellent problem-solving in English.',
      translation: 'Kibar kaldın, haklarını bildin ve hatta lounge erişimi aldın. İngilizcede mükemmel sorun çözme.',
      relationshipEffect: 2, coins: 18 },
    end_calm: { id: 'end_calm', kind: 'success', title: 'A relaxed rebooking', titleTr: 'Rahat bir yeniden rezervasyon',
      text: 'You chose certainty over speed and got a guaranteed window seat. Sensible and stress-free.',
      translation: 'Hızdan çok kesinliği seçtin ve garantili bir cam kenarı koltuk aldın. Mantıklı ve stressiz.',
      coins: 10 }
  }
});
