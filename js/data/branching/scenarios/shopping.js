import { createScenario } from '../scenarioSchema.js?v=6';

// ── Supermarket: finding items (A2) ─────────────────────────────────────────
export const supermarketHelp = createScenario({
  id: 'supermarket-help',
  title: 'Trovare ciò che ti serve',
  titleTr: 'Aradığını bulmak',
  environmentId: 'supermarket', sceneType: 'retail', level: 'A2',
  goal: 'Chiedi a un commesso di aiutarti a trovare i prodotti.',
  goalTr: 'Ürünleri bulmak için görevliden yardım iste.',
  npcIds: ['tom'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'tom', emotion: 'friendly',
      text: 'Salve, trova tutto senza problemi?',
      translation: 'Merhaba, her şeyi bulabiliyor musunuz?',
      choices: [
        { id: 'ask_milk', intentionTr: 'Sütün nerede olduğunu sor', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'In realtà no. Può dirmi dov’è il latte?',
          translation: 'Aslında hayır. Sütün nerede olduğunu söyler misiniz?',
          altAccepted: ['Dov’è il latte', 'Può dirmi dove trovo il latte'],
          next: 'milk_dir' },
        { id: 'ask_glutenfree', intentionTr: 'Glutensiz ürün olup olmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Avete del pane senza glutine? Non riesco a trovarlo.',
          translation: 'Glutensiz ekmeğiniz var mı? Bulamıyorum.',
          altAccepted: ['Vendete pane senza glutine', 'Dov’è il pane senza glutine'],
          next: 'gf_dir' }
      ]
    },
    milk_dir: {
      id: 'milk_dir', speakerId: 'tom', emotion: 'helpful',
      text: 'Certo — è nella corsia quattro, in fondo, nei frigoriferi. Altro?',
      translation: 'Tabii — dördüncü koridorda, arkada, buzdolaplarında. Başka bir şey?',
      choices: [
        { id: 'also_eggs', intentionTr: 'Yumurta da sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Sì, dove posso trovare anche le uova?',
          translation: 'Evet, yumurtaları da nerede bulabilirim?',
          altAccepted: ['Dove sono le uova', 'Dove trovo anche le uova'],
          next: 'eggs_dir', relationshipEffect: 1 },
        { id: 'thanks', intentionTr: 'Teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'È tutto, grazie per l’aiuto!',
          translation: 'Hepsi bu, yardımın için teşekkürler!',
          altAccepted: ['È tutto, grazie', 'Grazie, è tutto'],
          next: 'end_found' }
      ]
    },
    gf_dir: {
      id: 'gf_dir', speakerId: 'tom', emotion: 'friendly',
      text: 'Sì! È nel reparto alimenti salutari, corsia sette. Lì c’è una buona scelta.',
      translation: 'Var! Sağlıklı gıda bölümünde, yedinci koridorda. Orada güzel bir seçenek var.',
      choices: [
        { id: 'thank_gf', intentionTr: 'Teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Perfetto, grazie mille!',
          translation: 'Mükemmel, çok teşekkürler!',
          altAccepted: ['Grazie mille', 'Ottimo, grazie'],
          next: 'end_found', relationshipEffect: 1 },
        { id: 'ask_more', intentionTr: 'Başka glutensiz ürün var mı sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Ottimo. In quel reparto avete anche la pasta senza glutine?',
          translation: 'Harika. O bölümde glutensiz makarna da var mı?',
          altAccepted: ['C’è anche la pasta senza glutine lì', 'Avete anche pasta senza glutine'],
          next: 'eggs_dir' }
      ]
    },
    eggs_dir: {
      id: 'eggs_dir', speakerId: 'tom', emotion: 'happy',
      text: 'Proprio accanto al latte, stessa corsia. È tutto a posto — buona giornata!',
      translation: 'Tam sütün yanında, aynı koridorda. Hepsi tamam — iyi günler!',
      next: 'end_found'
    }
  },
  endings: {
    end_found: { id: 'end_found', kind: 'success', title: 'Trovato tutto', titleTr: 'Her şey bulundu',
      text: 'Hai chiesto aiuto con chiarezza e hai trovato ciò che ti serviva. Semplice e cordiale.',
      translation: 'Net biçimde yardım istedin ve aradığını buldun. Basit ve dostça.',
      coins: 10 }
  }
});

// ── Clothing store: returning an item (B1) ──────────────────────────────────
export const clothingReturn = createScenario({
  id: 'clothing-return',
  title: 'Restituire una giacca',
  titleTr: 'Bir ceketi iade etmek',
  environmentId: 'clothing', sceneType: 'retail', level: 'B1',
  goal: 'Restituisci qualcosa che non va e ottieni un rimborso o un cambio.',
  goalTr: 'Olmayan bir ürünü iade et, para iadesi ya da değişim ayarla.',
  npcIds: ['zoe'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'zoe', emotion: 'friendly',
      text: 'Salve! Come posso aiutarla oggi?',
      translation: 'Merhaba! Bugün nasıl yardımcı olabilirim?',
      choices: [
        { id: 'return_size', intentionTr: 'Beden olmadığı için iade etmek istediğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Salve, vorrei restituire questa giacca. Non mi va bene.',
          translation: 'Merhaba, bu ceketi iade etmek istiyorum. Bana olmadı.',
          altAccepted: ['Voglio restituire questa giacca, non mi va bene', 'Vorrei restituire questa, è la taglia sbagliata'],
          next: 'receipt' },
        { id: 'return_faulty', intentionTr: 'Kusurlu olduğu için iade etmek istediğini söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'Devo restituire questa giacca — la cerniera è rotta.',
          translation: 'Bu ceketi iade etmem gerekiyor — fermuarı bozuk.',
          altAccepted: ['Questa giacca ha la cerniera rotta, voglio restituirla', 'La cerniera è rotta, vorrei restituirla'],
          next: 'faulty' }
      ]
    },
    receipt: {
      id: 'receipt', speakerId: 'zoe', emotion: 'neutral',
      text: 'Nessun problema. Ha lo scontrino con sé?',
      translation: 'Hiç sorun değil. Fişiniz yanınızda mı?',
      choices: [
        { id: 'yes_receipt', intentionTr: 'Fişin olduğunu söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Sì, eccolo. L’ho comprata lunedì.',
          translation: 'Evet, buyurun. Pazartesi almıştım.',
          altAccepted: ['Ecco lo scontrino, l’ho comprata lunedì', 'Sì, ce l’ho qui'],
          next: 'refund_or_exchange' },
        { id: 'no_receipt', intentionTr: 'Fişin olmadığını söyle', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Purtroppo ho perso lo scontrino, ma ho pagato con la carta.',
          translation: 'Korkarım fişi kaybettim ama kartla ödemiştim.',
          altAccepted: ['Ho perso lo scontrino ma ho pagato con carta', 'Niente scontrino, ma ho il pagamento con carta'],
          next: 'card_lookup' }
      ]
    },
    faulty: {
      id: 'faulty', speakerId: 'zoe', emotion: 'apologetic',
      text: 'Oh, mi dispiace! Un articolo difettoso — ha diritto al rimborso completo. Ha lo scontrino o la carta con cui ha pagato?',
      translation: 'Ah, çok üzgünüm! Kusurlu ürün — tam para iadesine hakkınız var. Fiş mi yoksa ödediğiniz kart mı var?',
      choices: [
        { id: 'card_faulty', intentionTr: 'Kartla ödediğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ho pagato con la carta — eccola.',
          translation: 'Kartla ödemiştim — işte burada.',
          altAccepted: ['Ho pagato con carta, ecco', 'Con la carta, eccola'],
          next: 'refund_done', relationshipEffect: 1 },
        { id: 'receipt_faulty', intentionTr: 'Fişin olduğunu söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ho lo scontrino proprio qui.',
          translation: 'Fiş tam burada.',
          altAccepted: ['Ecco lo scontrino', 'Ho lo scontrino qui'],
          next: 'refund_done' }
      ]
    },
    card_lookup: {
      id: 'card_lookup', speakerId: 'zoe', emotion: 'friendly',
      text: 'Va bene — posso trovare l’acquisto con la sua carta. Preferisce un rimborso o un cambio?',
      translation: 'Sorun değil — alışverişi kartınızla bulabilirim. Para iadesi mi yoksa değişim mi istersiniz?',
      next: 'refund_or_exchange'
    },
    refund_or_exchange: {
      id: 'refund_or_exchange', speakerId: 'zoe', emotion: 'friendly',
      text: 'Perfetto. Allora, preferisce un rimborso o vorrebbe cambiarla con una taglia diversa?',
      translation: 'Harika. Peki, para iadesi mi tercih edersiniz yoksa farklı bir bedenle değişim mi?',
      choices: [
        { id: 'exchange', intentionTr: 'Farklı bedenle değiştir', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'Vorrei cambiarla con una taglia più grande, per favore.',
          translation: 'Daha büyük bir bedenle değiştirmek istiyorum, lütfen.',
          altAccepted: ['Posso cambiarla con una taglia più grande', 'Vorrei una taglia più grande'],
          next: 'end_exchange', relationshipEffect: 1 },
        { id: 'refund', intentionTr: 'Para iadesi iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Un rimborso sarebbe meglio, grazie.',
          translation: 'Para iadesi daha iyi olur, teşekkürler.',
          altAccepted: ['Preferirei un rimborso', 'Solo un rimborso per favore'],
          next: 'refund_done' }
      ]
    },
    refund_done: {
      id: 'refund_done', speakerId: 'zoe', emotion: 'happy',
      text: 'Tutto fatto — il rimborso tornerà sulla sua carta in pochi giorni. Grazie per la pazienza!',
      translation: 'Tamamdır — para birkaç gün içinde kartınıza geri yansır. Sabrınız için teşekkürler!',
      next: 'end_refund'
    }
  },
  endings: {
    end_exchange: { id: 'end_exchange', kind: 'problem-solved', title: 'Cambiata con la taglia giusta', titleTr: 'Doğru bedenle değişti',
      text: 'Hai spiegato il problema e sei uscito con una giacca che ti va davvero. Ben fatto.',
      translation: 'Sorunu anlattın ve sana gerçekten olan bir ceketle çıktın. Güzel iş.',
      relationshipEffect: 1, coins: 12 },
    end_refund: { id: 'end_refund', kind: 'success', title: 'Rimborso sistemato', titleTr: 'İade halledildi',
      text: 'Hai gestito il reso con calma e hai riavuto i tuoi soldi. Chiaro e cortese dall’inizio alla fine.',
      translation: 'İadeyi sakince hallettin ve paranı geri aldın. Baştan sona net ve kibar.',
      coins: 10 }
  }
});
