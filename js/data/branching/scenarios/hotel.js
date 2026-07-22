import { createScenario } from '../scenarioSchema.js';

// ── Hotel check-in (A2) — the flagship: 4 decision points, 4 endings ────────
export const hotelCheckin = createScenario({
  id: 'hotel-checkin',
  title: 'Checking in at the Sunrise Hotel',
  titleTr: 'Sunrise Otel’e giriş yapmak',
  environmentId: 'hotel', sceneType: 'hotel-lobby', level: 'A2',
  goal: 'Get checked into your room and settle any small problems.',
  goalTr: 'Odana giriş yap ve küçük sorunları çöz.',
  npcIds: ['grace', 'daniel'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'grace', emotion: 'friendly',
      text: 'Good evening, and welcome to the Sunrise Hotel. Do you have a reservation with us?',
      translation: 'İyi akşamlar, Sunrise Otel’e hoş geldiniz. Bizde bir rezervasyonunuz var mı?',
      choices: [
        { id: 'confirm', intentionTr: 'Rezervasyonun olduğunu söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Yes, I have a reservation under the name Alex.',
          translation: 'Evet, Alex adına bir rezervasyonum var.',
          altAccepted: ['I have a reservation under Alex', 'Yes, the reservation is under the name Alex'],
          next: 'find_reservation', relationshipEffect: 1 },
        { id: 'no_reservation', intentionTr: 'Rezervasyonun olmadığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'No, I don’t. Do you have any rooms available tonight?',
          translation: 'Hayır, yok. Bu gece boş odanız var mı?',
          altAccepted: ['No, do you have any rooms available', 'I don’t have one, are there any rooms free tonight'],
          next: 'walk_in' },
        { id: 'wrong_hotel', intentionTr: 'Yanlış otelde olabileceğini fark et', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Actually, I think I may be at the wrong hotel.',
          translation: 'Aslında sanırım yanlış oteldeyim.',
          altAccepted: ['I think I might be at the wrong hotel', 'Sorry, I think this is the wrong hotel'],
          next: 'wrong_hotel_node' }
      ]
    },
    find_reservation: {
      id: 'find_reservation', speakerId: 'grace', emotion: 'thinking',
      text: 'Let me check… Alex, yes! Two nights in a double room. Could you tell me how you’d like to pay?',
      translation: 'Bakayım… Alex, evet! İki gece, çift kişilik oda. Nasıl ödemek istediğinizi söyler misiniz?',
      choices: [
        { id: 'pay_card', intentionTr: 'Kartla ödeyeceğini söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'I’d like to pay by card, please.',
          translation: 'Kartla ödemek istiyorum, lütfen.',
          altAccepted: ['I will pay by card', 'By card, please', 'Can I pay with a card'],
          next: 'room_ready', relationshipEffect: 1 },
        { id: 'ask_breakfast', intentionTr: 'Kahvaltının dahil olup olmadığını sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Before that, is breakfast included in the price?',
          translation: 'Ondan önce, kahvaltı fiyata dahil mi?',
          altAccepted: ['Is breakfast included', 'Does the price include breakfast'],
          next: 'breakfast_info' }
      ]
    },
    breakfast_info: {
      id: 'breakfast_info', speakerId: 'grace', emotion: 'happy',
      text: 'Yes, a full breakfast is included, served from seven to ten in the main hall. Shall I check you in now?',
      translation: 'Evet, tam kahvaltı dahil, ana salonda yedi ile on arası servis ediliyor. Şimdi girişinizi yapayım mı?',
      choices: [
        { id: 'yes_checkin', intentionTr: 'Evet, girişi yap', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Yes, please. I’ll pay by card.',
          translation: 'Evet, lütfen. Kartla ödeyeceğim.',
          altAccepted: ['Yes please, I will pay by card', 'Sure, by card please'],
          next: 'room_ready', relationshipEffect: 1 },
        { id: 'ask_late', intentionTr: 'Geç çıkış isteyip istemediğini sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'One more thing — would a late checkout be possible?',
          translation: 'Bir şey daha — geç çıkış mümkün olur mu?',
          altAccepted: ['Is a late checkout possible', 'Could I have a late checkout'],
          next: 'late_checkout' }
      ]
    },
    late_checkout: {
      id: 'late_checkout', speakerId: 'grace', emotion: 'friendly',
      text: 'Of course. I can offer checkout until one o’clock at no extra charge. You’re in room 214 — here’s your key.',
      translation: 'Tabii ki. Ekstra ücret olmadan saat bire kadar çıkış verebilirim. Oda 214’tesiniz — anahtarınız.',
      next: 'end_excellent'
    },
    room_ready: {
      id: 'room_ready', speakerId: 'grace', emotion: 'happy',
      text: 'Wonderful. You’re all set — room 214 on the second floor. Here is your key card. Enjoy your stay!',
      translation: 'Harika. Her şey hazır — ikinci katta oda 214. Anahtar kartınız burada. İyi konaklamalar!',
      next: 'end_success'
    },
    walk_in: {
      id: 'walk_in', speakerId: 'grace', emotion: 'thinking',
      text: 'Let me see… we do have one standard room left at ninety euros a night. Would you like it?',
      translation: 'Bir bakayım… gecesi doksan euro olan tek bir standart odamız kaldı. İster misiniz?',
      choices: [
        { id: 'take_room', intentionTr: 'Odayı kabul et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'That sounds good. I’ll take it for one night.',
          translation: 'Kulağa güzel geliyor. Bir geceliğine alıyorum.',
          altAccepted: ['I will take it for one night', 'Yes, I’ll take the room for tonight'],
          next: 'room_ready', relationshipEffect: 1 },
        { id: 'too_expensive', intentionTr: 'Çok pahalı olduğunu kibarca söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'That’s a bit more than I hoped to spend. Is there anything cheaper?',
          translation: 'Umduğumdan biraz fazla. Daha ucuz bir şey var mı?',
          altAccepted: ['Do you have anything cheaper', 'Is there a cheaper room'],
          next: 'cheaper' }
      ]
    },
    cheaper: {
      id: 'cheaper', speakerId: 'daniel', emotion: 'friendly',
      text: 'Hi, I’m the duty manager. I can’t lower the room price, but I can include free breakfast. Fair enough?',
      translation: 'Merhaba, ben nöbetçi müdürüm. Oda fiyatını düşüremem ama ücretsiz kahvaltı ekleyebilirim. Olur mu?',
      choices: [
        { id: 'accept_deal', intentionTr: 'Teklifi kabul et', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'That’s very kind — yes, I’ll take the room with breakfast.',
          translation: 'Çok naziksiniz — evet, odayı kahvaltıyla alıyorum.',
          altAccepted: ['Yes, I’ll take it with breakfast', 'That works, I’ll take the room'],
          next: 'room_ready', relationshipEffect: 2 },
        { id: 'decline', intentionTr: 'Kibarca reddet ve ayrıl', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Thank you, but I think I’ll look somewhere else tonight.',
          translation: 'Teşekkürler ama sanırım bu gece başka bir yere bakacağım.',
          altAccepted: ['Thanks, but I’ll look elsewhere', 'I appreciate it, but I’ll try another place'],
          next: 'end_neutral' }
      ]
    },
    wrong_hotel_node: {
      id: 'wrong_hotel_node', speakerId: 'grace', emotion: 'surprised',
      text: 'Oh! Which hotel are you looking for? Perhaps I can point you in the right direction.',
      translation: 'Aa! Hangi oteli arıyorsunuz? Belki sizi doğru yöne yönlendirebilirim.',
      choices: [
        { id: 'ask_directions', intentionTr: 'Yol tarifi iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I’m looking for the Moonlight Hotel. Could you tell me how to get there?',
          translation: 'Moonlight Otel’i arıyorum. Oraya nasıl gideceğimi söyler misiniz?',
          altAccepted: ['How do I get to the Moonlight Hotel', 'Can you tell me the way to the Moonlight Hotel'],
          next: 'directions_given', relationshipEffect: 1 },
        { id: 'stay_anyway', intentionTr: 'Aslında burada kalmaya karar ver', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'You know what, your hotel looks lovely. Do you have a room tonight?',
          translation: 'Aslına bakarsanız oteliniz çok hoş görünüyor. Bu gece odanız var mı?',
          altAccepted: ['Actually, do you have a room tonight', 'Your hotel looks nice, is there a room free'],
          next: 'walk_in' }
      ]
    },
    directions_given: {
      id: 'directions_given', speakerId: 'grace', emotion: 'friendly',
      text: 'It’s just two streets down, on your left, next to the pharmacy. You can’t miss it!',
      translation: 'Sadece iki sokak aşağıda, solunuzda, eczanenin yanında. Kaçırmanız imkânsız!',
      next: 'end_helpful'
    }
  },
  endings: {
    end_excellent: { id: 'end_excellent', kind: 'excellent', title: 'Perfect check-in', titleTr: 'Kusursuz giriş',
      text: 'Room, breakfast, and a late checkout — you handled every step politely and clearly. Grace is delighted to have you.',
      translation: 'Oda, kahvaltı ve geç çıkış — her adımı kibar ve net biçimde hallettin. Grace seni ağırlamaktan çok memnun.',
      relationshipEffect: 2, coins: 15 },
    end_success: { id: 'end_success', kind: 'success', title: 'Checked in', titleTr: 'Giriş yapıldı',
      text: 'You’re checked in and on your way to room 214. Smooth and friendly.',
      translation: 'Girişini yaptın ve 214 numaralı odaya doğru yola çıktın. Sorunsuz ve dostça.',
      relationshipEffect: 1, coins: 10 },
    end_neutral: { id: 'end_neutral', kind: 'neutral', title: 'Off to look elsewhere', titleTr: 'Başka yere bakmaya',
      text: 'You politely turned down the offer. No room tonight, but you left a good impression — you can always come back.',
      translation: 'Teklifi kibarca geri çevirdin. Bu gece oda yok ama iyi bir izlenim bıraktın — her zaman geri dönebilirsin.',
      coins: 5 },
    end_helpful: { id: 'end_helpful', kind: 'problem-solved', title: 'Back on track', titleTr: 'Yeniden yolda',
      text: 'You found out you were at the wrong hotel and got clear directions to the right one. Problem solved!',
      translation: 'Yanlış otelde olduğunu fark ettin ve doğru otele net bir yol tarifi aldın. Sorun çözüldü!',
      coins: 8 }
  }
});

// ── Hotel room problem (B1) — 3 decision points, 3 endings ──────────────────
export const hotelRoomProblem = createScenario({
  id: 'hotel-room-problem',
  title: 'A problem with your room',
  titleTr: 'Odanla ilgili bir sorun',
  environmentId: 'hotel', sceneType: 'hotel-lobby', level: 'B1',
  goal: 'Report a problem with your room and get it fixed.',
  goalTr: 'Odandaki sorunu bildir ve çözdür.',
  npcIds: ['daniel', 'grace'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'daniel', emotion: 'friendly',
      text: 'Good evening. You look a little frustrated — is everything alright with your room?',
      translation: 'İyi akşamlar. Biraz sinirli görünüyorsunuz — odanızla ilgili her şey yolunda mı?',
      choices: [
        { id: 'dirty', intentionTr: 'Odanın temiz olmadığını söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'Actually, no. My room hasn’t been cleaned properly.',
          translation: 'Aslında hayır. Odam düzgün temizlenmemiş.',
          altAccepted: ['My room isn’t clean', 'The room wasn’t cleaned properly'],
          next: 'apologize_clean' },
        { id: 'noise', intentionTr: 'Çok gürültülü olduğundan şikâyet et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'The room next to mine is very noisy, and I can’t sleep.',
          translation: 'Yan odam çok gürültülü ve uyuyamıyorum.',
          altAccepted: ['The next room is too noisy', 'It’s very noisy next door and I can’t sleep'],
          next: 'apologize_noise' },
        { id: 'ac', intentionTr: 'Klimanın çalışmadığını söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'The air conditioning in my room isn’t working at all.',
          translation: 'Odamdaki klima hiç çalışmıyor.',
          altAccepted: ['The air conditioning doesn’t work', 'My air conditioner isn’t working'],
          next: 'apologize_ac' }
      ]
    },
    apologize_clean: {
      id: 'apologize_clean', speakerId: 'daniel', emotion: 'apologetic',
      text: 'I’m very sorry about that. Would you prefer I send housekeeping right away, or move you to a fresh room?',
      translation: 'Bunun için çok üzgünüm. Hemen kat görevlisi mi göndereyim, yoksa sizi temiz bir odaya mı taşıyayım?',
      choices: [
        { id: 'move', intentionTr: 'Başka odaya taşınmayı iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I’d rather move to a different room, if that’s possible.',
          translation: 'Mümkünse başka bir odaya taşınmayı tercih ederim.',
          altAccepted: ['Could you move me to another room', 'I’d prefer a different room'],
          next: 'resolved_move', relationshipEffect: 1 },
        { id: 'clean_now', intentionTr: 'Hemen temizlenmesini iste', tone: 'direct', difficulty: 'easy', xp: 10,
          sentence: 'Please just send someone to clean it now.',
          translation: 'Lütfen sadece hemen temizlemesi için birini gönderin.',
          altAccepted: ['Send someone to clean it now', 'Please have it cleaned right away'],
          next: 'resolved_clean' }
      ]
    },
    apologize_noise: {
      id: 'apologize_noise', speakerId: 'daniel', emotion: 'apologetic',
      text: 'That’s not acceptable at this hour. I can move you to a quiet room at the back — would that help?',
      translation: 'Bu saatte kabul edilemez. Sizi arkadaki sessiz bir odaya taşıyabilirim — bu yardımcı olur mu?',
      choices: [
        { id: 'yes_move', intentionTr: 'Evet, taşınmayı kabul et', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Yes, a quiet room would be perfect. Thank you.',
          translation: 'Evet, sessiz bir oda harika olur. Teşekkürler.',
          altAccepted: ['Yes please, a quiet room would be great', 'That would be perfect, thank you'],
          next: 'resolved_move', relationshipEffect: 1 },
        { id: 'compensation', intentionTr: 'Bir tür telafi iste', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'I appreciate that, but I’d also expect some compensation for the trouble.',
          translation: 'Bunu takdir ediyorum ama bu zahmet için bir telafi de beklerdim.',
          altAccepted: ['I’d also expect some compensation', 'I think some compensation is fair'],
          next: 'offer_compensation' }
      ]
    },
    apologize_ac: {
      id: 'apologize_ac', speakerId: 'daniel', emotion: 'concerned',
      text: 'I do apologize. Our technician has left for the night, so the fastest fix is a new room. Is that okay?',
      translation: 'Özür dilerim. Teknisyenimiz bu gece ayrıldı, en hızlı çözüm yeni bir oda. Uygun mu?',
      choices: [
        { id: 'accept_new', intentionTr: 'Yeni odayı kabul et', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'That’s fine. A new room works for me.',
          translation: 'Sorun değil. Yeni bir oda benim için uygun.',
          altAccepted: ['A new room is fine', 'That works for me'],
          next: 'resolved_move', relationshipEffect: 1 },
        { id: 'insist_tech', intentionTr: 'Yine de teknisyende ısrar et', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'I’d really prefer to stay in my room. Could a technician come first thing tomorrow?',
          translation: 'Gerçekten kendi odamda kalmayı tercih ederim. Teknisyen yarın ilk iş gelebilir mi?',
          altAccepted: ['Can a technician come tomorrow morning', 'I’d prefer to keep my room and fix it tomorrow'],
          next: 'offer_compensation' }
      ]
    },
    offer_compensation: {
      id: 'offer_compensation', speakerId: 'daniel', emotion: 'friendly',
      text: 'That’s reasonable. I’ll take twenty percent off tonight’s rate and send breakfast to your room. Deal?',
      translation: 'Bu makul. Bu geceki ücretten yüzde yirmi indirim yapıp odanıza kahvaltı göndereceğim. Anlaştık mı?',
      next: 'resolved_deal'
    },
    resolved_move: {
      id: 'resolved_move', speakerId: 'daniel', emotion: 'happy',
      text: 'Done. You’re now in room 302 — much better. I’ll have your bags brought up. Have a restful night.',
      translation: 'Tamamdır. Artık 302 numaralı odadasınız — çok daha iyi. Bavullarınızı yukarı getirteceğim. Rahat bir gece geçirin.',
      next: 'end_moved'
    },
    resolved_clean: {
      id: 'resolved_clean', speakerId: 'daniel', emotion: 'friendly',
      text: 'Housekeeping is on the way and will be there in five minutes. Thank you for your patience.',
      translation: 'Kat görevlisi yolda ve beş dakikaya orada olacak. Sabrınız için teşekkürler.',
      next: 'end_cleaned'
    },
    resolved_deal: {
      id: 'resolved_deal', speakerId: 'daniel', emotion: 'happy',
      text: 'Excellent. It’s all arranged. Again, I’m sorry for the trouble — thank you for being so understanding.',
      translation: 'Mükemmel. Her şey ayarlandı. Zahmet için tekrar özür dilerim — bu kadar anlayışlı olduğunuz için teşekkürler.',
      next: 'end_deal'
    }
  },
  endings: {
    end_moved: { id: 'end_moved', kind: 'problem-solved', title: 'Moved and settled', titleTr: 'Taşındın ve yerleştin',
      text: 'You explained the problem clearly and got a better room. Well handled.',
      translation: 'Sorunu net anlattın ve daha iyi bir oda aldın. İyi hallettin.',
      relationshipEffect: 1, coins: 12 },
    end_cleaned: { id: 'end_cleaned', kind: 'success', title: 'Sorted quickly', titleTr: 'Hızlıca çözüldü',
      text: 'A quick, direct request got housekeeping on the way. Simple and effective.',
      translation: 'Hızlı, doğrudan bir istek kat görevlisini yola çıkardı. Basit ve etkili.',
      coins: 8 },
    end_deal: { id: 'end_deal', kind: 'excellent', title: 'Fair deal negotiated', titleTr: 'Adil bir anlaşma',
      text: 'You stood up for yourself politely and negotiated a discount plus breakfast. That’s advanced English at work.',
      translation: 'Kibarca hakkını aradın ve indirim artı kahvaltı için pazarlık ettin. İşte ileri seviye İngilizce.',
      relationshipEffect: 2, coins: 18 }
  }
});
