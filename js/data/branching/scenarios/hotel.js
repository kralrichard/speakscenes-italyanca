import { createScenario } from '../scenarioSchema.js?v=6';

// ── Hotel check-in (A2) — the flagship: 4 decision points, 4 endings ────────
export const hotelCheckin = createScenario({
  id: 'hotel-checkin',
  title: 'Check-in all’Hotel Sunrise',
  titleTr: 'Sunrise Otel’e giriş yapmak',
  environmentId: 'hotel', sceneType: 'hotel-lobby', level: 'A2',
  goal: 'Fai il check-in nella tua stanza e risolvi i piccoli problemi.',
  goalTr: 'Odana giriş yap ve küçük sorunları çöz.',
  npcIds: ['grace', 'daniel'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'grace', emotion: 'friendly',
      text: 'Buonasera e benvenuto all’Hotel Sunrise. Ha una prenotazione da noi?',
      translation: 'İyi akşamlar, Sunrise Otel’e hoş geldiniz. Bizde bir rezervasyonunuz var mı?',
      choices: [
        { id: 'confirm', intentionTr: 'Rezervasyonun olduğunu söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Sì, ho una prenotazione a nome Alex.',
          translation: 'Evet, Alex adına bir rezervasyonum var.',
          altAccepted: ['Ho una prenotazione a nome Alex', 'Sì, la prenotazione è a nome Alex'],
          next: 'find_reservation', relationshipEffect: 1 },
        { id: 'no_reservation', intentionTr: 'Rezervasyonun olmadığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'No, non ne ho. Avete una stanza libera per stanotte?',
          translation: 'Hayır, yok. Bu gece boş odanız var mı?',
          altAccepted: ['No, avete stanze disponibili', 'Non ne ho una, ci sono stanze libere stanotte'],
          next: 'walk_in' },
        { id: 'wrong_hotel', intentionTr: 'Yanlış otelde olabileceğini fark et', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'In realtà, credo di essere nell’hotel sbagliato.',
          translation: 'Aslında sanırım yanlış oteldeyim.',
          altAccepted: ['Credo di essere nell’hotel sbagliato', 'Scusi, credo che questo sia l’hotel sbagliato'],
          next: 'wrong_hotel_node' }
      ]
    },
    find_reservation: {
      id: 'find_reservation', speakerId: 'grace', emotion: 'thinking',
      text: 'Faccio controllare… Alex, sì! Due notti in camera doppia. Come desidera pagare?',
      translation: 'Bakayım… Alex, evet! İki gece, çift kişilik oda. Nasıl ödemek istediğinizi söyler misiniz?',
      choices: [
        { id: 'pay_card', intentionTr: 'Kartla ödeyeceğini söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Vorrei pagare con la carta, per favore.',
          translation: 'Kartla ödemek istiyorum, lütfen.',
          altAccepted: ['Pago con la carta', 'Con la carta, per favore', 'Posso pagare con la carta'],
          next: 'room_ready', relationshipEffect: 1 },
        { id: 'ask_breakfast', intentionTr: 'Kahvaltının dahil olup olmadığını sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Prima di questo, la colazione è inclusa nel prezzo?',
          translation: 'Ondan önce, kahvaltı fiyata dahil mi?',
          altAccepted: ['La colazione è inclusa', 'Il prezzo include la colazione'],
          next: 'breakfast_info' }
      ]
    },
    breakfast_info: {
      id: 'breakfast_info', speakerId: 'grace', emotion: 'happy',
      text: 'Sì, la colazione completa è inclusa, servita dalle sette alle dieci nella sala principale. Le faccio il check-in adesso?',
      translation: 'Evet, tam kahvaltı dahil, ana salonda yedi ile on arası servis ediliyor. Şimdi girişinizi yapayım mı?',
      choices: [
        { id: 'yes_checkin', intentionTr: 'Evet, girişi yap', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Sì, grazie. Pago con la carta.',
          translation: 'Evet, lütfen. Kartla ödeyeceğim.',
          altAccepted: ['Sì grazie, pago con la carta', 'Certo, con la carta per favore'],
          next: 'room_ready', relationshipEffect: 1 },
        { id: 'ask_late', intentionTr: 'Geç çıkış isteyip istemediğini sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Un’ultima cosa — sarebbe possibile un check-out posticipato?',
          translation: 'Bir şey daha — geç çıkış mümkün olur mu?',
          altAccepted: ['È possibile un check-out posticipato', 'Potrei avere un check-out più tardi'],
          next: 'late_checkout' }
      ]
    },
    late_checkout: {
      id: 'late_checkout', speakerId: 'grace', emotion: 'friendly',
      text: 'Certo. Posso offrirle il check-out fino all’una senza costi aggiuntivi. È nella stanza 214 — ecco la sua chiave.',
      translation: 'Tabii ki. Ekstra ücret olmadan saat bire kadar çıkış verebilirim. Oda 214’tesiniz — anahtarınız.',
      next: 'end_excellent'
    },
    room_ready: {
      id: 'room_ready', speakerId: 'grace', emotion: 'happy',
      text: 'Meraviglioso. È tutto pronto — stanza 214 al secondo piano. Ecco la sua chiave magnetica. Buon soggiorno!',
      translation: 'Harika. Her şey hazır — ikinci katta oda 214. Anahtar kartınız burada. İyi konaklamalar!',
      next: 'end_success'
    },
    walk_in: {
      id: 'walk_in', speakerId: 'grace', emotion: 'thinking',
      text: 'Vediamo… ci resta una stanza standard a novanta euro a notte. La desidera?',
      translation: 'Bir bakayım… gecesi doksan euro olan tek bir standart odamız kaldı. İster misiniz?',
      choices: [
        { id: 'take_room', intentionTr: 'Odayı kabul et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Mi sembra ottimo. La prendo per una notte.',
          translation: 'Kulağa güzel geliyor. Bir geceliğine alıyorum.',
          altAccepted: ['La prendo per una notte', 'Sì, prendo la stanza per stanotte'],
          next: 'room_ready', relationshipEffect: 1 },
        { id: 'too_expensive', intentionTr: 'Çok pahalı olduğunu kibarca söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'È un po’ più di quanto volessi spendere. C’è qualcosa di più economico?',
          translation: 'Umduğumdan biraz fazla. Daha ucuz bir şey var mı?',
          altAccepted: ['Avete qualcosa di più economico', 'C’è una stanza più economica'],
          next: 'cheaper' }
      ]
    },
    cheaper: {
      id: 'cheaper', speakerId: 'daniel', emotion: 'friendly',
      text: 'Salve, sono il responsabile di turno. Non posso abbassare il prezzo della stanza, ma posso includere la colazione gratis. Le va bene?',
      translation: 'Merhaba, ben nöbetçi müdürüm. Oda fiyatını düşüremem ama ücretsiz kahvaltı ekleyebilirim. Olur mu?',
      choices: [
        { id: 'accept_deal', intentionTr: 'Teklifi kabul et', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'È molto gentile — sì, prendo la stanza con la colazione.',
          translation: 'Çok naziksiniz — evet, odayı kahvaltıyla alıyorum.',
          altAccepted: ['Sì, la prendo con la colazione', 'Va bene, prendo la stanza'],
          next: 'room_ready', relationshipEffect: 2 },
        { id: 'decline', intentionTr: 'Kibarca reddet ve ayrıl', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Grazie, ma credo che stanotte cercherò da un’altra parte.',
          translation: 'Teşekkürler ama sanırım bu gece başka bir yere bakacağım.',
          altAccepted: ['Grazie, ma cerco altrove', 'La ringrazio, ma provo un altro posto'],
          next: 'end_neutral' }
      ]
    },
    wrong_hotel_node: {
      id: 'wrong_hotel_node', speakerId: 'grace', emotion: 'surprised',
      text: 'Oh! Quale hotel sta cercando? Forse posso indicarle la direzione giusta.',
      translation: 'Aa! Hangi oteli arıyorsunuz? Belki sizi doğru yöne yönlendirebilirim.',
      choices: [
        { id: 'ask_directions', intentionTr: 'Yol tarifi iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Sto cercando l’Hotel Moonlight. Può dirmi come arrivarci?',
          translation: 'Moonlight Otel’i arıyorum. Oraya nasıl gideceğimi söyler misiniz?',
          altAccepted: ['Come arrivo all’Hotel Moonlight', 'Può indicarmi la strada per l’Hotel Moonlight'],
          next: 'directions_given', relationshipEffect: 1 },
        { id: 'stay_anyway', intentionTr: 'Aslında burada kalmaya karar ver', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Sa una cosa, il suo hotel sembra delizioso. Avete una stanza per stanotte?',
          translation: 'Aslına bakarsanız oteliniz çok hoş görünüyor. Bu gece odanız var mı?',
          altAccepted: ['In realtà, avete una stanza per stanotte', 'Il suo hotel è bello, c’è una stanza libera'],
          next: 'walk_in' }
      ]
    },
    directions_given: {
      id: 'directions_given', speakerId: 'grace', emotion: 'friendly',
      text: 'È a due strade da qui, sulla sinistra, accanto alla farmacia. Non può sbagliare!',
      translation: 'Sadece iki sokak aşağıda, solunuzda, eczanenin yanında. Kaçırmanız imkânsız!',
      next: 'end_helpful'
    }
  },
  endings: {
    end_excellent: { id: 'end_excellent', kind: 'excellent', title: 'Check-in perfetto', titleTr: 'Kusursuz giriş',
      text: 'Stanza, colazione e check-out posticipato — hai gestito ogni passaggio con cortesia e chiarezza. Grace è felicissima di averti.',
      translation: 'Oda, kahvaltı ve geç çıkış — her adımı kibar ve net biçimde hallettin. Grace seni ağırlamaktan çok memnun.',
      relationshipEffect: 2, coins: 15 },
    end_success: { id: 'end_success', kind: 'success', title: 'Check-in fatto', titleTr: 'Giriş yapıldı',
      text: 'Hai fatto il check-in e ti stai dirigendo verso la stanza 214. Tutto liscio e cordiale.',
      translation: 'Girişini yaptın ve 214 numaralı odaya doğru yola çıktın. Sorunsuz ve dostça.',
      relationshipEffect: 1, coins: 10 },
    end_neutral: { id: 'end_neutral', kind: 'neutral', title: 'Vai a cercare altrove', titleTr: 'Başka yere bakmaya',
      text: 'Hai rifiutato l’offerta con cortesia. Nessuna stanza stanotte, ma hai lasciato una buona impressione — puoi sempre tornare.',
      translation: 'Teklifi kibarca geri çevirdin. Bu gece oda yok ama iyi bir izlenim bıraktın — her zaman geri dönebilirsin.',
      coins: 5 },
    end_helpful: { id: 'end_helpful', kind: 'problem-solved', title: 'Di nuovo sulla strada giusta', titleTr: 'Yeniden yolda',
      text: 'Hai scoperto di essere nell’hotel sbagliato e hai ricevuto indicazioni chiare per quello giusto. Problema risolto!',
      translation: 'Yanlış otelde olduğunu fark ettin ve doğru otele net bir yol tarifi aldın. Sorun çözüldü!',
      coins: 8 }
  }
});

// ── Hotel room problem (B1) — 3 decision points, 3 endings ──────────────────
export const hotelRoomProblem = createScenario({
  id: 'hotel-room-problem',
  title: 'Un problema con la tua stanza',
  titleTr: 'Odanla ilgili bir sorun',
  environmentId: 'hotel', sceneType: 'hotel-lobby', level: 'B1',
  goal: 'Segnala un problema con la tua stanza e fallo risolvere.',
  goalTr: 'Odandaki sorunu bildir ve çözdür.',
  npcIds: ['daniel', 'grace'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'daniel', emotion: 'friendly',
      text: 'Buonasera. La vedo un po’ contrariato — va tutto bene con la sua stanza?',
      translation: 'İyi akşamlar. Biraz sinirli görünüyorsunuz — odanızla ilgili her şey yolunda mı?',
      choices: [
        { id: 'dirty', intentionTr: 'Odanın temiz olmadığını söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'In realtà no. La mia stanza non è stata pulita bene.',
          translation: 'Aslında hayır. Odam düzgün temizlenmemiş.',
          altAccepted: ['La mia stanza non è pulita', 'La stanza non è stata pulita bene'],
          next: 'apologize_clean' },
        { id: 'noise', intentionTr: 'Çok gürültülü olduğundan şikâyet et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'La stanza accanto alla mia è molto rumorosa e non riesco a dormire.',
          translation: 'Yan odam çok gürültülü ve uyuyamıyorum.',
          altAccepted: ['La stanza accanto è troppo rumorosa', 'C’è molto rumore accanto e non riesco a dormire'],
          next: 'apologize_noise' },
        { id: 'ac', intentionTr: 'Klimanın çalışmadığını söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'L’aria condizionata della mia stanza non funziona per niente.',
          translation: 'Odamdaki klima hiç çalışmıyor.',
          altAccepted: ['L’aria condizionata non funziona', 'Il condizionatore non funziona'],
          next: 'apologize_ac' }
      ]
    },
    apologize_clean: {
      id: 'apologize_clean', speakerId: 'daniel', emotion: 'apologetic',
      text: 'Mi dispiace davvero. Preferisce che mandi subito le pulizie o che la sposti in una stanza nuova?',
      translation: 'Bunun için çok üzgünüm. Hemen kat görevlisi mi göndereyim, yoksa sizi temiz bir odaya mı taşıyayım?',
      choices: [
        { id: 'move', intentionTr: 'Başka odaya taşınmayı iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Preferirei spostarmi in un’altra stanza, se è possibile.',
          translation: 'Mümkünse başka bir odaya taşınmayı tercih ederim.',
          altAccepted: ['Può spostarmi in un’altra stanza', 'Preferirei una stanza diversa'],
          next: 'resolved_move', relationshipEffect: 1 },
        { id: 'clean_now', intentionTr: 'Hemen temizlenmesini iste', tone: 'direct', difficulty: 'easy', xp: 10,
          sentence: 'Per favore, mandi solo qualcuno a pulirla adesso.',
          translation: 'Lütfen sadece hemen temizlemesi için birini gönderin.',
          altAccepted: ['Mandi qualcuno a pulirla adesso', 'Per favore, la faccia pulire subito'],
          next: 'resolved_clean' }
      ]
    },
    apologize_noise: {
      id: 'apologize_noise', speakerId: 'daniel', emotion: 'apologetic',
      text: 'A quest’ora non è accettabile. Posso spostarla in una stanza tranquilla sul retro — le andrebbe bene?',
      translation: 'Bu saatte kabul edilemez. Sizi arkadaki sessiz bir odaya taşıyabilirim — bu yardımcı olur mu?',
      choices: [
        { id: 'yes_move', intentionTr: 'Evet, taşınmayı kabul et', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Sì, una stanza tranquilla sarebbe perfetta. Grazie.',
          translation: 'Evet, sessiz bir oda harika olur. Teşekkürler.',
          altAccepted: ['Sì grazie, una stanza tranquilla sarebbe ottima', 'Sarebbe perfetto, grazie'],
          next: 'resolved_move', relationshipEffect: 1 },
        { id: 'compensation', intentionTr: 'Bir tür telafi iste', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Lo apprezzo, ma mi aspetterei anche un risarcimento per il disturbo.',
          translation: 'Bunu takdir ediyorum ama bu zahmet için bir telafi de beklerdim.',
          altAccepted: ['Mi aspetterei anche un risarcimento', 'Penso che un risarcimento sia giusto'],
          next: 'offer_compensation' }
      ]
    },
    apologize_ac: {
      id: 'apologize_ac', speakerId: 'daniel', emotion: 'concerned',
      text: 'Mi scuso. Il nostro tecnico è andato via per stanotte, quindi la soluzione più rapida è una nuova stanza. Va bene?',
      translation: 'Özür dilerim. Teknisyenimiz bu gece ayrıldı, en hızlı çözüm yeni bir oda. Uygun mu?',
      choices: [
        { id: 'accept_new', intentionTr: 'Yeni odayı kabul et', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Va bene. Una nuova stanza mi sta bene.',
          translation: 'Sorun değil. Yeni bir oda benim için uygun.',
          altAccepted: ['Una nuova stanza va bene', 'Mi sta bene'],
          next: 'resolved_move', relationshipEffect: 1 },
        { id: 'insist_tech', intentionTr: 'Yine de teknisyende ısrar et', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Preferirei davvero restare nella mia stanza. Può venire un tecnico domani mattina presto?',
          translation: 'Gerçekten kendi odamda kalmayı tercih ederim. Teknisyen yarın ilk iş gelebilir mi?',
          altAccepted: ['Può venire un tecnico domani mattina', 'Preferirei tenere la stanza e sistemarla domani'],
          next: 'offer_compensation' }
      ]
    },
    offer_compensation: {
      id: 'offer_compensation', speakerId: 'daniel', emotion: 'friendly',
      text: 'È ragionevole. Le farò uno sconto del venti per cento sulla tariffa di stanotte e le manderò la colazione in stanza. Affare fatto?',
      translation: 'Bu makul. Bu geceki ücretten yüzde yirmi indirim yapıp odanıza kahvaltı göndereceğim. Anlaştık mı?',
      next: 'resolved_deal'
    },
    resolved_move: {
      id: 'resolved_move', speakerId: 'daniel', emotion: 'happy',
      text: 'Fatto. Ora è nella stanza 302 — molto meglio. Le farò portare su i bagagli. Buon riposo.',
      translation: 'Tamamdır. Artık 302 numaralı odadasınız — çok daha iyi. Bavullarınızı yukarı getirteceğim. Rahat bir gece geçirin.',
      next: 'end_moved'
    },
    resolved_clean: {
      id: 'resolved_clean', speakerId: 'daniel', emotion: 'friendly',
      text: 'Le pulizie stanno arrivando e saranno lì tra cinque minuti. Grazie per la pazienza.',
      translation: 'Kat görevlisi yolda ve beş dakikaya orada olacak. Sabrınız için teşekkürler.',
      next: 'end_cleaned'
    },
    resolved_deal: {
      id: 'resolved_deal', speakerId: 'daniel', emotion: 'happy',
      text: 'Perfetto. È tutto sistemato. Ancora, mi scuso per il disturbo — grazie per la sua comprensione.',
      translation: 'Mükemmel. Her şey ayarlandı. Zahmet için tekrar özür dilerim — bu kadar anlayışlı olduğunuz için teşekkürler.',
      next: 'end_deal'
    }
  },
  endings: {
    end_moved: { id: 'end_moved', kind: 'problem-solved', title: 'Spostato e sistemato', titleTr: 'Taşındın ve yerleştin',
      text: 'Hai spiegato il problema con chiarezza e hai ottenuto una stanza migliore. Ben gestito.',
      translation: 'Sorunu net anlattın ve daha iyi bir oda aldın. İyi hallettin.',
      relationshipEffect: 1, coins: 12 },
    end_cleaned: { id: 'end_cleaned', kind: 'success', title: 'Risolto in fretta', titleTr: 'Hızlıca çözüldü',
      text: 'Una richiesta rapida e diretta ha messo in moto le pulizie. Semplice ed efficace.',
      translation: 'Hızlı, doğrudan bir istek kat görevlisini yola çıkardı. Basit ve etkili.',
      coins: 8 },
    end_deal: { id: 'end_deal', kind: 'excellent', title: 'Accordo equo negoziato', titleTr: 'Adil bir anlaşma',
      text: 'Hai difeso i tuoi diritti con cortesia e hai negoziato uno sconto più la colazione. Ecco l’italiano avanzato in azione.',
      translation: 'Kibarca hakkını aradın ve indirim artı kahvaltı için pazarlık ettin. İşte ileri seviye İngilizce.',
      relationshipEffect: 2, coins: 18 }
  }
});
