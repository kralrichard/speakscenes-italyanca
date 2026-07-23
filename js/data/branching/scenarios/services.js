import { createScenario } from '../scenarioSchema.js?v=6';

// ── Bank: reporting a lost card (B1) ────────────────────────────────────────
export const bankLostCard = createScenario({
  id: 'bank-lost-card',
  title: 'Segnalare una carta smarrita',
  titleTr: 'Kayıp kartı bildirmek',
  environmentId: 'bank', sceneType: 'bank-office', level: 'B1',
  goal: 'Segnala la carta smarrita e ottieni un duplicato.',
  goalTr: 'Kayıp kartını bildir ve yenisini al.',
  npcIds: ['david'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'david', emotion: 'friendly',
      text: 'Buongiorno. Come posso aiutarla oggi?',
      translation: 'Günaydın. Bugün nasıl yardımcı olabilirim?',
      choices: [
        { id: 'lost', intentionTr: 'Kartını kaybettiğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Buongiorno. Credo di aver perso la mia carta bancaria.',
          translation: 'Günaydın. Sanırım banka kartımı kaybettim.',
          altAccepted: ['Ho perso la mia carta bancaria', 'Credo di aver perso la carta'],
          next: 'when_lost' },
        { id: 'stolen', intentionTr: 'Kartının çalınmış olabileceğini söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Devo bloccare la mia carta — credo possa essere stata rubata.',
          translation: 'Kartımı bloke ettirmem gerekiyor — sanırım çalınmış olabilir.',
          altAccepted: ['Credo mi abbiano rubato la carta, la blocchi', 'La mia carta potrebbe essere stata rubata'],
          next: 'block_now' }
      ]
    },
    when_lost: {
      id: 'when_lost', speakerId: 'david', emotion: 'concerned',
      text: 'Mi dispiace. Quand’è l’ultima volta che l’ha usata? La blocco subito.',
      translation: 'Bunu duyduğuma üzüldüm. En son ne zaman kullandınız? Hemen bloke edeceğim.',
      choices: [
        { id: 'yesterday', intentionTr: 'Dün kullandığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'L’ho usata ieri al ristorante, e non l’ho più vista da allora.',
          translation: 'Dün bir restoranda kullandım ve o zamandan beri görmedim.',
          altAccepted: ['L’ultima volta ieri al ristorante', 'Ieri, al ristorante, e da allora niente'],
          next: 'new_card' },
        { id: 'not_sure', intentionTr: 'Emin olmadığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'A dire il vero non ne sono sicuro. Forse due giorni fa.',
          translation: 'Açıkçası emin değilim. Belki iki gün önce.',
          altAccepted: ['Non sono sicuro, forse due giorni fa', 'Sinceramente non sono certo, un paio di giorni fa'],
          next: 'new_card' }
      ]
    },
    block_now: {
      id: 'block_now', speakerId: 'david', emotion: 'concerned',
      text: 'Capito — la sto bloccando in questo istante. Fatto. Ha notato pagamenti che non riconosce?',
      translation: 'Anlaşıldı — şu an bloke ediyorum. Tamam. Tanımadığınız bir ödeme fark ettiniz mi?',
      choices: [
        { id: 'yes_strange', intentionTr: 'Tanımadığın bir ödeme olduğunu söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Sì, in effetti — c’è un pagamento che non ho di certo fatto io.',
          translation: 'Evet, aslında — kesinlikle benim yapmadığım bir ödeme var.',
          altAccepted: ['C’è un pagamento che non ho fatto', 'Sì, vedo un addebito che non è mio'],
          next: 'dispute', relationshipEffect: 1 },
        { id: 'no_strange', intentionTr: 'Tuhaf bir şey yok de', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'No, finora niente di strano.',
          translation: 'Hayır, şimdiye kadar tuhaf bir şey yok.',
          altAccepted: ['No, niente di strano per ora', 'Finora nulla di insolito'],
          next: 'new_card' }
      ]
    },
    dispute: {
      id: 'dispute', speakerId: 'david', emotion: 'friendly',
      text: 'Grazie per la segnalazione. Apro una contestazione e lei non ne sarà responsabile. Ora ordiniamo la sua nuova carta.',
      translation: 'Bildirdiğiniz için teşekkürler. Bir itiraz başlatacağım ve bundan sorumlu olmayacaksınız. Şimdi yeni kartınızı sipariş edelim.',
      next: 'new_card'
    },
    new_card: {
      id: 'new_card', speakerId: 'david', emotion: 'helpful',
      text: 'Posso spedire una nuova carta al suo indirizzo in tre-cinque giorni, oppure può ritirarla qui domani. Cosa preferisce?',
      translation: 'Yeni kartı üç-beş günde adresinize gönderebilirim ya da yarın buradan alabilirsiniz. Hangisi uygun?',
      choices: [
        { id: 'post', intentionTr: 'Posta ile gönderilmesini iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'La spedisca pure al mio indirizzo. Va bene.',
          translation: 'Lütfen adresime gönderin. Uygun.',
          altAccepted: ['La spedisca al mio indirizzo per favore', 'Per posta va bene'],
          next: 'end_sorted' },
        { id: 'collect', intentionTr: 'Yarın gelip almayı tercih et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Preferirei ritirarla domani, se è possibile.',
          translation: 'Mümkünse yarın gelip almayı tercih ederim.',
          altAccepted: ['La ritiro domani', 'Posso ritirarla qui domani'],
          next: 'end_sorted', relationshipEffect: 1 }
      ]
    }
  },
  endings: {
    end_sorted: { id: 'end_sorted', kind: 'problem-solved', title: 'Carta sistemata', titleTr: 'Kart halledildi',
      text: 'Hai segnalato la carta smarrita con calma, l’hai bloccata e hai richiesto un duplicato. Esattamente i passi giusti.',
      translation: 'Kayıp kartı sakince bildirdin, bloke ettirdin ve yenisini ayarladın. Tam da doğru adımlar.',
      relationshipEffect: 1, coins: 14 }
  }
});

// ── Police station: reporting a lost phone (B1) ─────────────────────────────
export const policeLostPhone = createScenario({
  id: 'police-lost-phone',
  title: 'Denunciare un telefono smarrito',
  titleTr: 'Kayıp telefonu bildirmek',
  environmentId: 'police', sceneType: 'formal-office', level: 'B1',
  goal: 'Presenta una denuncia per il telefono smarrito e fornisci i dettagli.',
  goalTr: 'Kayıp telefonun için tutanak tut ve ayrıntıları ver.',
  npcIds: ['grant'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'grant', emotion: 'friendly',
      text: 'Buon pomeriggio. Cosa posso fare per lei?',
      translation: 'İyi günler. Sizin için ne yapabilirim?',
      choices: [
        { id: 'report_lost', intentionTr: 'Telefonunu kaybettiğini bildir', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Salve. Vorrei denunciare lo smarrimento di un telefono, per favore.',
          translation: 'Merhaba. Kayıp bir telefon bildirmek istiyorum, lütfen.',
          altAccepted: ['Voglio denunciare un telefono smarrito', 'Vorrei denunciare il mio telefono come smarrito'],
          next: 'where' },
        { id: 'maybe_stolen', intentionTr: 'Çalınmış olabileceğini bildir', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Credo che il mio telefono sia stato rubato sull’autobus stamattina.',
          translation: 'Sanırım telefonum bu sabah otobüste çalındı.',
          altAccepted: ['Mi hanno rubato il telefono sull’autobus stamattina', 'Credo mi abbiano preso il telefono sull’autobus'],
          next: 'where' }
      ]
    },
    where: {
      id: 'where', speakerId: 'grant', emotion: 'neutral',
      text: 'Va bene, prendiamo i dettagli. Dove e quando l’ha avuto per l’ultima volta?',
      translation: 'Peki, ayrıntıları alalım. En son nerede ve ne zaman elinizdeydi?',
      choices: [
        { id: 'give_details', intentionTr: 'Ayrıntılı yer ve zaman ver', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Sull’autobus numero 12, verso le otto di stamattina. È un telefono nero con una custodia blu.',
          translation: '12 numaralı otobüste, bu sabah sekiz sularında. Mavi kılıfta siyah bir telefon.',
          altAccepted: ['Sul bus 12 verso le otto, telefono nero custodia blu', 'Verso le otto sull’autobus 12, un telefono nero con custodia blu'],
          next: 'contact', relationshipEffect: 1 },
        { id: 'vague_details', intentionTr: 'Kısaca, emin olmadan söyle', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Da qualche parte in centro stamattina. Non so di preciso dove.',
          translation: 'Bu sabah şehir merkezinde bir yerde. Tam olarak nerede emin değilim.',
          altAccepted: ['In centro stamattina, non so di preciso', 'Da qualche parte in centro stamattina'],
          next: 'contact' }
      ]
    },
    contact: {
      id: 'contact', speakerId: 'grant', emotion: 'helpful',
      text: 'Ricevuto. Registro la denuncia e le do un numero di riferimento. Come preferisce che la contattiamo se salta fuori?',
      translation: 'Aldım. Tutanağı tutup size bir referans numarası vereceğim. Bulunursa sizinle nasıl iletişim kuralım?',
      choices: [
        { id: 'by_email', intentionTr: 'E-posta ile iletişim iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Via email sarebbe la cosa migliore, grazie.',
          translation: 'E-posta ile olması en iyisi, teşekkürler.',
          altAccepted: ['Meglio via email, grazie', 'Via email per favore'],
          next: 'end_filed' },
        { id: 'ask_insurance', intentionTr: 'Sigorta için ne gerektiğini sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Via email, per favore. Inoltre, riceverò un documento per la mia assicurazione?',
          translation: 'E-posta ile, lütfen. Ayrıca, sigortam için bir belge alacak mıyım?',
          altAccepted: ['Avrò un documento per l’assicurazione', 'Ricevo dei documenti per la mia assicurazione'],
          next: 'insurance', relationshipEffect: 1 }
      ]
    },
    insurance: {
      id: 'insurance', speakerId: 'grant', emotion: 'friendly',
      text: 'Sì — il numero di riferimento e questa denuncia sono esattamente ciò che le servirà per l’assicurazione. Ecco a lei. In bocca al lupo.',
      translation: 'Evet — referans numarası ve bu tutanak, sigortacınızın tam olarak isteyeceği şey. Buyurun. Bol şans.',
      next: 'end_insurance'
    }
  },
  endings: {
    end_filed: { id: 'end_filed', kind: 'problem-solved', title: 'Denuncia presentata', titleTr: 'Tutanak tutuldu',
      text: 'Hai denunciato il telefono con chiarezza e tutti i dettagli. Non potevi fare di più.',
      translation: 'Telefonu tüm ayrıntılarıyla net biçimde bildirdin. Yapabileceğin başka bir şey yoktu.',
      coins: 10 },
    end_insurance: { id: 'end_insurance', kind: 'excellent', title: 'Pronto per l’assicurazione', titleTr: 'Sigortaya hazır',
      text: 'Hai pensato in anticipo e hai chiesto i documenti per l’assicurazione. Quella domanda potrebbe farti risparmiare un sacco di soldi.',
      translation: 'İleriyi düşündün ve sigorta belgesini istedin. Bu soru sana çok para kazandırabilir.',
      coins: 14 }
  }
});
