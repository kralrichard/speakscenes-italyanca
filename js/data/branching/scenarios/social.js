import { createScenario } from '../scenarioSchema.js?v=6';

// ── Meeting a new friend (A1) ───────────────────────────────────────────────
export const meetingFriend = createScenario({
  id: 'meeting-friend',
  title: 'Conoscere un nuovo compagno di classe',
  titleTr: 'Yeni bir sınıf arkadaşıyla tanışmak',
  environmentId: 'street', sceneType: 'school', level: 'A1',
  goal: 'Presèntati e fai una nuova amicizia.',
  goalTr: 'Kendini tanıt ve yeni bir arkadaş edin.',
  npcIds: ['leo'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'leo', emotion: 'friendly',
      text: 'Ciao! Non credo ci siamo conosciuti. Sono Leo. Sei nuovo qui?',
      translation: 'Selam! Sanırım tanışmadık. Ben Leo. Buraya yeni mi geldin?',
      choices: [
        { id: 'introduce', intentionTr: 'Kendini tanıt', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Ciao Leo! Sono Sam. Sì, è la mia prima settimana.',
          translation: 'Selam Leo! Ben Sam. Evet, ilk haftam.',
          altAccepted: ['Ciao, sono Sam, sì è la mia prima settimana', 'Ciao Leo, mi chiamo Sam, sono nuovo'],
          next: 'where_from', relationshipEffect: 1 },
        { id: 'shy', intentionTr: 'Utangaç ama nazik ol', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ciao. Sì, sono nuovo. Piacere di conoscerti.',
          translation: 'Merhaba. Evet, yeniyim. Tanıştığıma memnun oldum.',
          altAccepted: ['Ciao, sì sono nuovo, piacere', 'Salve, sono nuovo qui, piacere di conoscerti'],
          next: 'where_from' }
      ]
    },
    where_from: {
      id: 'where_from', speakerId: 'leo', emotion: 'curious',
      text: 'Piacere di conoscerti, Sam! Di dove sei?',
      translation: 'Tanıştığıma memnun oldum, Sam! Nerelisin?',
      choices: [
        { id: 'from_turkey', intentionTr: 'Nereli olduğunu söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Sono della Turchia. Mi sono trasferito qui il mese scorso.',
          translation: 'Türkiye’denim. Geçen ay buraya taşındım.',
          altAccepted: ['Sono della Turchia, trasferito il mese scorso', 'Vengo dalla Turchia e mi sono trasferito il mese scorso'],
          next: 'hobbies' },
        { id: 'ask_back', intentionTr: 'Sen nerelisin diye sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Sono della Turchia. E tu — sei di qui?',
          translation: 'Türkiye’denim. Ya sen — buralı mısın?',
          altAccepted: ['Sono della Turchia, e tu', 'Vengo dalla Turchia, tu di dove sei'],
          next: 'hobbies', relationshipEffect: 1 }
      ]
    },
    hobbies: {
      id: 'hobbies', speakerId: 'leo', emotion: 'happy',
      text: 'Forte! Alcuni di noi giocano a calcio dopo le lezioni il venerdì. Vuoi unirti a noi questa settimana?',
      translation: 'Harika! Birkaçımız cuma günleri dersten sonra futbol oynuyoruz. Bu hafta bize katılmak ister misin?',
      choices: [
        { id: 'accept', intentionTr: 'Daveti kabul et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Sembra divertente! Mi unirei volentieri a voi.',
          translation: 'Kulağa eğlenceli geliyor! Size katılmayı çok isterim.',
          altAccepted: ['Mi unirei volentieri', 'Sembra ottimo, verrei volentieri'],
          next: 'end_friends', relationshipEffect: 2 },
        { id: 'decline_polite', intentionTr: 'Kibarca reddet ama başka zaman de', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Questo venerdì non posso, ma magari la prossima settimana?',
          translation: 'Bu cuma olmaz ama belki gelecek hafta?',
          altAccepted: ['Non questo venerdì, ma forse la prossima settimana', 'Venerdì sono impegnato, che ne dici della prossima settimana'],
          next: 'end_maybe', relationshipEffect: 1 },
        { id: 'ask_details', intentionTr: 'Saatini ve yerini sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Forse! A che ora inizia, e dove giocate?',
          translation: 'Belki! Kaçta başlıyor ve nerede oynuyorsunuz?',
          altAccepted: ['A che ora e dove giocate', 'Quando inizia e dove'],
          next: 'details' }
      ]
    },
    details: {
      id: 'details', speakerId: 'leo', emotion: 'friendly',
      text: 'Iniziamo alle quattro, al parco dietro la scuola. Porta le scarpe da ginnastica e vieni!',
      translation: 'Saat dörtte, okulun arkasındaki parkta başlıyoruz. Spor ayakkabı getir ve gel!',
      choices: [
        { id: 'ill_come', intentionTr: 'Geleceğini söyle', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Perfetto, sarò lì alle quattro. Grazie per l’invito!',
          translation: 'Mükemmel, dörtte orada olacağım. Davet ettiğin için teşekkürler!',
          altAccepted: ['Ottimo, sarò lì alle quattro', 'Vengo alle quattro, grazie per l’invito'],
          next: 'end_friends', relationshipEffect: 2 },
        { id: 'ask_bring', intentionTr: 'Başka bir şey getirmen gerekip gerekmediğini sor', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Fantastico! Devo portare qualcos’altro oltre alle scarpe da ginnastica?',
          translation: 'Harika! Spor ayakkabı dışında başka bir şey getirmeli miyim?',
          altAccepted: ['Devo portare qualcos’altro', 'Serve altro oltre alle scarpe da ginnastica'],
          next: 'end_friends', relationshipEffect: 2 }
      ]
    }
  },
  endings: {
    end_friends: { id: 'end_friends', kind: 'relationship', title: 'Un nuovo amico', titleTr: 'Yeni bir arkadaş',
      text: 'Ti sei presentato con calore e hai fatto programmi con Leo. È così che nascono le amicizie!',
      translation: 'Kendini içtenlikle tanıttın ve Leo ile plan yaptın. Arkadaşlıklar böyle başlar!',
      relationshipEffect: 1, coins: 12 },
    end_maybe: { id: 'end_maybe', kind: 'success', title: 'Un buon inizio', titleTr: 'İyi bir başlangıç',
      text: 'Questa volta non ce l’hai fatta, ma hai lasciato la porta aperta con cortesia. Leo te lo richiederà.',
      translation: 'Bu sefer gelemedin ama kapıyı kibarca açık bıraktın. Leo tekrar soracak.',
      coins: 8 }
  }
});

// ── Asking for directions (A2) ──────────────────────────────────────────────
export const askingDirections = createScenario({
  id: 'asking-directions',
  title: 'Trovare la strada',
  titleTr: 'Yolunu bulmak',
  environmentId: 'street', sceneType: 'street', level: 'A2',
  goal: 'Chiedi indicazioni a uno sconosciuto e capisci la risposta.',
  goalTr: 'Bir yabancıdan yol tarifi iste ve cevabı anla.',
  npcIds: ['sophie'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'sophie', emotion: 'friendly',
      text: 'Sembri un po’ smarrito — posso aiutarti a trovare qualcosa?',
      translation: 'Biraz kaybolmuş görünüyorsun — bir şey bulmana yardım edebilir miyim?',
      choices: [
        { id: 'ask_station', intentionTr: 'İstasyonun yerini sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Sì, grazie. Può dirmi come arrivare alla stazione dei treni?',
          translation: 'Evet, lütfen. Tren istasyonuna nasıl gideceğimi söyler misiniz?',
          altAccepted: ['Come arrivo alla stazione dei treni', 'Può indicarmi la strada per la stazione'],
          next: 'station_dir', relationshipEffect: 1 },
        { id: 'ask_pharmacy', intentionTr: 'En yakın eczaneyi sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Può dirmi dov’è la farmacia più vicina?',
          translation: 'En yakın eczanenin nerede olduğunu söyleyebilir misiniz?',
          altAccepted: ['Dov’è la farmacia più vicina', 'Sa dov’è la farmacia più vicina'],
          next: 'pharmacy_dir', relationshipEffect: 1 }
      ]
    },
    station_dir: {
      id: 'station_dir', speakerId: 'sophie', emotion: 'helpful',
      text: 'Certo! Vai dritto lungo questa strada, prendi la seconda a sinistra, e ce l’hai proprio davanti. Circa cinque minuti.',
      translation: 'Tabii! Bu caddeden düz git, ikinci soldan dön, tam karşında. Yaklaşık beş dakika.',
      choices: [
        { id: 'confirm_understood', intentionTr: 'Anladığını tekrar ederek doğrula', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Quindi, dritto e seconda a sinistra. È lontano a piedi?',
          translation: 'Yani, düz git ve ikinci soldan dön. Yürüyerek uzak mı?',
          altAccepted: ['Dritto e seconda a sinistra, è lontano a piedi', 'Quindi seconda a sinistra, è lontano a piedi'],
          next: 'walkable', relationshipEffect: 1 },
        { id: 'thanks_go', intentionTr: 'Teşekkür et ve git', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Capito, grazie mille per l’aiuto!',
          translation: 'Anladım, yardımın için çok teşekkürler!',
          altAccepted: ['Grazie mille per l’aiuto', 'Capito, grazie mille'],
          next: 'end_found' }
      ]
    },
    pharmacy_dir: {
      id: 'pharmacy_dir', speakerId: 'sophie', emotion: 'helpful',
      text: 'Ce n’è una proprio dietro l’angolo, accanto al panificio. Gira a destra al semaforo e la vedrai.',
      translation: 'Hemen köşede, fırının yanında bir tane var. Trafik ışıklarında sağa dön, göreceksin.',
      choices: [
        { id: 'thank_pharmacy', intentionTr: 'Teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'A destra al semaforo, accanto al panificio. Grazie!',
          translation: 'Işıklarda sağa, fırının yanında. Teşekkürler!',
          altAccepted: ['A destra al semaforo vicino al panificio, grazie', 'Giro a destra al semaforo, capito, grazie'],
          next: 'end_found', relationshipEffect: 1 },
        { id: 'ask_open', intentionTr: 'Şu an açık mı diye sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Grazie! Sa se è aperta a quest’ora?',
          translation: 'Teşekkürler! Bu saatte açık mı, biliyor musunuz?',
          altAccepted: ['È aperta a quest’ora', 'Sa se è aperta adesso'],
          next: 'end_found', relationshipEffect: 1 }
      ]
    },
    walkable: {
      id: 'walkable', speakerId: 'sophie', emotion: 'happy',
      text: 'Per niente lontano — cinque minuti, tutto in piano. Andrà benissimo. Buon viaggio!',
      translation: 'Hiç uzak değil — beş dakika, yol boyunca düz. Sorun olmaz. İyi yolculuklar!',
      next: 'end_confirmed'
    }
  },
  endings: {
    end_found: { id: 'end_found', kind: 'success', title: 'In cammino', titleTr: 'Yolunda',
      text: 'Hai chiesto con chiarezza e hai ringraziato Sophie. Sai esattamente dove andare.',
      translation: 'Net biçimde sordun ve Sophie’ye teşekkür ettin. Nereye gideceğini tam olarak biliyorsun.',
      coins: 10 },
    end_confirmed: { id: 'end_confirmed', kind: 'excellent', title: 'Confermato e sicuro', titleTr: 'Doğrulandı ve emin',
      text: 'Hai ripetuto le indicazioni per verificare di aver capito e hai fatto una domanda in più. È il segno di chi parla con sicurezza.',
      translation: 'Anladığını kontrol etmek için tarifi tekrarladın ve bir soru daha sordun. Bu, kendinden emin bir konuşmacının işareti.',
      relationshipEffect: 1, coins: 14 }
  }
});
