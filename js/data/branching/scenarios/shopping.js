import { createScenario } from '../scenarioSchema.js?v=5';

// ── Supermarket: finding items (A2) ─────────────────────────────────────────
export const supermarketHelp = createScenario({
  id: 'supermarket-help',
  title: 'Finding what you need',
  titleTr: 'Aradığını bulmak',
  environmentId: 'supermarket', sceneType: 'retail', level: 'A2',
  goal: 'Ask a store assistant to help you find items.',
  goalTr: 'Ürünleri bulmak için görevliden yardım iste.',
  npcIds: ['tom'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'tom', emotion: 'friendly',
      text: 'Hi, are you finding everything okay?',
      translation: 'Merhaba, her şeyi bulabiliyor musunuz?',
      choices: [
        { id: 'ask_milk', intentionTr: 'Sütün nerede olduğunu sor', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Actually, no. Could you tell me where the milk is?',
          translation: 'Aslında hayır. Sütün nerede olduğunu söyler misiniz?',
          altAccepted: ['Where is the milk', 'Can you tell me where the milk is'],
          next: 'milk_dir' },
        { id: 'ask_glutenfree', intentionTr: 'Glutensiz ürün olup olmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Do you have any gluten-free bread? I can’t find it.',
          translation: 'Glutensiz ekmeğiniz var mı? Bulamıyorum.',
          altAccepted: ['Do you sell gluten-free bread', 'Where is the gluten-free bread'],
          next: 'gf_dir' }
      ]
    },
    milk_dir: {
      id: 'milk_dir', speakerId: 'tom', emotion: 'helpful',
      text: 'Of course — it’s in aisle four, at the back, in the fridges. Anything else?',
      translation: 'Tabii — dördüncü koridorda, arkada, buzdolaplarında. Başka bir şey?',
      choices: [
        { id: 'also_eggs', intentionTr: 'Yumurta da sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Yes, where can I find the eggs as well?',
          translation: 'Evet, yumurtaları da nerede bulabilirim?',
          altAccepted: ['Where are the eggs', 'Where can I find eggs too'],
          next: 'eggs_dir', relationshipEffect: 1 },
        { id: 'thanks', intentionTr: 'Teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'That’s all, thank you for your help!',
          translation: 'Hepsi bu, yardımın için teşekkürler!',
          altAccepted: ['That’s everything, thanks', 'Thank you, that’s all'],
          next: 'end_found' }
      ]
    },
    gf_dir: {
      id: 'gf_dir', speakerId: 'tom', emotion: 'friendly',
      text: 'We do! It’s in the health-food section, aisle seven. There’s a good selection there.',
      translation: 'Var! Sağlıklı gıda bölümünde, yedinci koridorda. Orada güzel bir seçenek var.',
      choices: [
        { id: 'thank_gf', intentionTr: 'Teşekkür et', tone: 'friendly', difficulty: 'easy', xp: 10,
          sentence: 'Perfect, thank you so much!',
          translation: 'Mükemmel, çok teşekkürler!',
          altAccepted: ['Thanks a lot', 'Great, thank you'],
          next: 'end_found', relationshipEffect: 1 },
        { id: 'ask_more', intentionTr: 'Başka glutensiz ürün var mı sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Great. Do you have gluten-free pasta in that section too?',
          translation: 'Harika. O bölümde glutensiz makarna da var mı?',
          altAccepted: ['Is there gluten-free pasta there too', 'Do you also have gluten-free pasta'],
          next: 'eggs_dir' }
      ]
    },
    eggs_dir: {
      id: 'eggs_dir', speakerId: 'tom', emotion: 'happy',
      text: 'Right next to the milk, same aisle. You’re all set — have a great day!',
      translation: 'Tam sütün yanında, aynı koridorda. Hepsi tamam — iyi günler!',
      next: 'end_found'
    }
  },
  endings: {
    end_found: { id: 'end_found', kind: 'success', title: 'Everything found', titleTr: 'Her şey bulundu',
      text: 'You asked for help clearly and found what you needed. Simple and friendly.',
      translation: 'Net biçimde yardım istedin ve aradığını buldun. Basit ve dostça.',
      coins: 10 }
  }
});

// ── Clothing store: returning an item (B1) ──────────────────────────────────
export const clothingReturn = createScenario({
  id: 'clothing-return',
  title: 'Returning a jacket',
  titleTr: 'Bir ceketi iade etmek',
  environmentId: 'clothing', sceneType: 'retail', level: 'B1',
  goal: 'Return something that doesn’t fit and sort out a refund or exchange.',
  goalTr: 'Olmayan bir ürünü iade et, para iadesi ya da değişim ayarla.',
  npcIds: ['zoe'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'zoe', emotion: 'friendly',
      text: 'Hi! How can I help you today?',
      translation: 'Merhaba! Bugün nasıl yardımcı olabilirim?',
      choices: [
        { id: 'return_size', intentionTr: 'Beden olmadığı için iade etmek istediğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Hi, I’d like to return this jacket. It doesn’t fit me.',
          translation: 'Merhaba, bu ceketi iade etmek istiyorum. Bana olmadı.',
          altAccepted: ['I want to return this jacket, it doesn’t fit', 'I’d like to return this, it’s the wrong size'],
          next: 'receipt' },
        { id: 'return_faulty', intentionTr: 'Kusurlu olduğu için iade etmek istediğini söyle', tone: 'direct', difficulty: 'hard', xp: 18,
          sentence: 'I need to return this jacket — there’s a broken zip.',
          translation: 'Bu ceketi iade etmem gerekiyor — fermuarı bozuk.',
          altAccepted: ['This jacket has a broken zip, I want to return it', 'The zip is broken, I’d like to return it'],
          next: 'faulty' }
      ]
    },
    receipt: {
      id: 'receipt', speakerId: 'zoe', emotion: 'neutral',
      text: 'No problem at all. Do you have the receipt with you?',
      translation: 'Hiç sorun değil. Fişiniz yanınızda mı?',
      choices: [
        { id: 'yes_receipt', intentionTr: 'Fişin olduğunu söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Yes, here it is. I bought it on Monday.',
          translation: 'Evet, buyurun. Pazartesi almıştım.',
          altAccepted: ['Here’s the receipt, I bought it Monday', 'Yes, I have it here'],
          next: 'refund_or_exchange' },
        { id: 'no_receipt', intentionTr: 'Fişin olmadığını söyle', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'I’m afraid I lost the receipt, but I paid by card.',
          translation: 'Korkarım fişi kaybettim ama kartla ödemiştim.',
          altAccepted: ['I lost the receipt but paid by card', 'No receipt, but I have the card payment'],
          next: 'card_lookup' }
      ]
    },
    faulty: {
      id: 'faulty', speakerId: 'zoe', emotion: 'apologetic',
      text: 'Oh, I’m sorry about that! A faulty item — you’re entitled to a full refund. Receipt or card you paid with?',
      translation: 'Ah, çok üzgünüm! Kusurlu ürün — tam para iadesine hakkınız var. Fiş mi yoksa ödediğiniz kart mı var?',
      choices: [
        { id: 'card_faulty', intentionTr: 'Kartla ödediğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I paid by card — here it is.',
          translation: 'Kartla ödemiştim — işte burada.',
          altAccepted: ['I paid by card, here', 'By card, here it is'],
          next: 'refund_done', relationshipEffect: 1 },
        { id: 'receipt_faulty', intentionTr: 'Fişin olduğunu söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'I have the receipt right here.',
          translation: 'Fiş tam burada.',
          altAccepted: ['Here is the receipt', 'I’ve got the receipt here'],
          next: 'refund_done' }
      ]
    },
    card_lookup: {
      id: 'card_lookup', speakerId: 'zoe', emotion: 'friendly',
      text: 'That’s fine — I can find the purchase with your card. Would you like a refund or an exchange?',
      translation: 'Sorun değil — alışverişi kartınızla bulabilirim. Para iadesi mi yoksa değişim mi istersiniz?',
      next: 'refund_or_exchange'
    },
    refund_or_exchange: {
      id: 'refund_or_exchange', speakerId: 'zoe', emotion: 'friendly',
      text: 'Great. So, would you prefer a refund or would you like to exchange it for a different size?',
      translation: 'Harika. Peki, para iadesi mi tercih edersiniz yoksa farklı bir bedenle değişim mi?',
      choices: [
        { id: 'exchange', intentionTr: 'Farklı bedenle değiştir', tone: 'friendly', difficulty: 'medium', xp: 14,
          sentence: 'I’d like to exchange it for a larger size, please.',
          translation: 'Daha büyük bir bedenle değiştirmek istiyorum, lütfen.',
          altAccepted: ['Can I exchange it for a bigger size', 'I’d like a larger size instead'],
          next: 'end_exchange', relationshipEffect: 1 },
        { id: 'refund', intentionTr: 'Para iadesi iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'A refund would be better, thank you.',
          translation: 'Para iadesi daha iyi olur, teşekkürler.',
          altAccepted: ['I’d prefer a refund', 'Just a refund please'],
          next: 'refund_done' }
      ]
    },
    refund_done: {
      id: 'refund_done', speakerId: 'zoe', emotion: 'happy',
      text: 'All done — the refund will be back on your card in a few days. Thanks for your patience!',
      translation: 'Tamamdır — para birkaç gün içinde kartınıza geri yansır. Sabrınız için teşekkürler!',
      next: 'end_refund'
    }
  },
  endings: {
    end_exchange: { id: 'end_exchange', kind: 'problem-solved', title: 'Swapped for the right size', titleTr: 'Doğru bedenle değişti',
      text: 'You explained the problem and walked out with a jacket that actually fits. Nicely done.',
      translation: 'Sorunu anlattın ve sana gerçekten olan bir ceketle çıktın. Güzel iş.',
      relationshipEffect: 1, coins: 12 },
    end_refund: { id: 'end_refund', kind: 'success', title: 'Refund sorted', titleTr: 'İade halledildi',
      text: 'You handled the return calmly and got your money back. Clear and polite throughout.',
      translation: 'İadeyi sakince hallettin ve paranı geri aldın. Baştan sona net ve kibar.',
      coins: 10 }
  }
});
