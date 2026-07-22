import { createScenario } from '../scenarioSchema.js';

// NOTE: These are fictional language-learning conversations. They never give
// real medical advice or diagnoses — the NPC always defers to real care.

// ── Hospital visit (A2) ─────────────────────────────────────────────────────
export const hospitalVisit = createScenario({
  id: 'hospital-visit',
  title: 'A visit to the doctor',
  titleTr: 'Doktora bir ziyaret',
  environmentId: 'hospital', sceneType: 'hospital', level: 'A2',
  goal: 'Describe how you feel and understand the next steps.',
  goalTr: 'Nasıl hissettiğini anlat ve sonraki adımları anla.',
  npcIds: ['bennett'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'bennett', emotion: 'friendly',
      text: 'Hello, come in and take a seat. What seems to be the problem today?',
      translation: 'Merhaba, içeri gelin ve oturun. Bugün sorun nedir?',
      choices: [
        { id: 'headache', intentionTr: 'Baş ağrın olduğunu anlat', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'I’ve had a bad headache for two days.',
          translation: 'İki gündür şiddetli bir baş ağrım var.',
          altAccepted: ['I have had a headache for two days', 'My head has been hurting for two days'],
          next: 'when_started' },
        { id: 'stomach', intentionTr: 'Mide ağrın olduğunu anlat', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'My stomach has been hurting since yesterday.',
          translation: 'Dünden beri midem ağrıyor.',
          altAccepted: ['I have stomach pain since yesterday', 'My stomach hurts since yesterday'],
          next: 'when_started' },
        { id: 'tired', intentionTr: 'Çok yorgun hissettiğini anlat', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I’ve been feeling very tired and I can’t sleep well.',
          translation: 'Çok yorgun hissediyorum ve iyi uyuyamıyorum.',
          altAccepted: ['I feel very tired and can’t sleep', 'I’m always tired and sleep badly'],
          next: 'lifestyle' }
      ]
    },
    when_started: {
      id: 'when_started', speakerId: 'bennett', emotion: 'thinking',
      text: 'I see. And have you taken anything for it, or is this the first time you’re treating it?',
      translation: 'Anlıyorum. Bunun için bir şey aldınız mı, yoksa ilk kez mi tedavi ediyorsunuz?',
      choices: [
        { id: 'took_nothing', intentionTr: 'Hiçbir şey almadığını söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'No, I haven’t taken anything yet.',
          translation: 'Hayır, henüz hiçbir şey almadım.',
          altAccepted: ['I haven’t taken anything', 'No, nothing yet'],
          next: 'advice' },
        { id: 'took_painkiller', intentionTr: 'Ağrı kesici aldığını ama işe yaramadığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I took a painkiller, but it didn’t really help.',
          translation: 'Bir ağrı kesici aldım ama pek yardımcı olmadı.',
          altAccepted: ['I took a painkiller but it didn’t help', 'A painkiller didn’t work'],
          next: 'advice' }
      ]
    },
    lifestyle: {
      id: 'lifestyle', speakerId: 'bennett', emotion: 'curious',
      text: 'Thank you for telling me. How much water do you drink, and how are your stress levels lately?',
      translation: 'Söylediğiniz için teşekkürler. Ne kadar su içiyorsunuz ve son zamanlarda stres seviyeniz nasıl?',
      choices: [
        { id: 'stressed', intentionTr: 'Çok stresli olduğunu söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I’ve been under a lot of stress at work recently.',
          translation: 'Son zamanlarda işte çok stres altındaydım.',
          altAccepted: ['I’ve had a lot of stress at work', 'Work has been very stressful lately'],
          next: 'advice' },
        { id: 'fine_otherwise', intentionTr: 'Bunun dışında iyi olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Otherwise I feel fine, just tired all the time.',
          translation: 'Bunun dışında iyiyim, sadece sürekli yorgunum.',
          altAccepted: ['I feel fine otherwise', 'Apart from that I’m fine, just tired'],
          next: 'advice' }
      ]
    },
    advice: {
      id: 'advice', speakerId: 'bennett', emotion: 'friendly',
      text: 'Nothing here worries me seriously. I’ll write a note with some simple steps. Do you have any questions before you go?',
      translation: 'Burada beni ciddi anlamda endişelendiren bir şey yok. Size basit adımlar içeren bir not yazacağım. Gitmeden önce sorunuz var mı?',
      choices: [
        { id: 'ask_followup', intentionTr: 'Ne zaman geri dönmen gerektiğini sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'When should I come back if it doesn’t get better?',
          translation: 'Eğer düzelmezse ne zaman geri gelmeliyim?',
          altAccepted: ['When should I come back if it continues', 'Should I return if it doesn’t improve'],
          next: 'followup_answer', relationshipEffect: 1 },
        { id: 'thanks', intentionTr: 'Teşekkür et ve ayrıl', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'No, that’s clear. Thank you very much, doctor.',
          translation: 'Hayır, açık. Çok teşekkür ederim, doktor.',
          altAccepted: ['That’s clear, thank you doctor', 'No questions, thanks a lot'],
          next: 'end_clear' }
      ]
    },
    followup_answer: {
      id: 'followup_answer', speakerId: 'bennett', emotion: 'happy',
      text: 'Good question. If there’s no improvement in three days, book another appointment. Take care of yourself.',
      translation: 'İyi soru. Üç günde iyileşme olmazsa yeni bir randevu alın. Kendinize iyi bakın.',
      next: 'end_thorough'
    }
  },
  endings: {
    end_clear: { id: 'end_clear', kind: 'success', title: 'Clearly explained', titleTr: 'Açıkça anlatıldı',
      text: 'You described your symptoms clearly and understood the advice. A calm, successful visit.',
      translation: 'Belirtilerini net anlattın ve tavsiyeyi anladın. Sakin, başarılı bir ziyaret.',
      coins: 10 },
    end_thorough: { id: 'end_thorough', kind: 'excellent', title: 'A thorough visit', titleTr: 'Kapsamlı bir ziyaret',
      text: 'You not only explained yourself but asked a smart follow-up question. That’s exactly how to handle a doctor’s visit in English.',
      translation: 'Sadece kendini anlatmadın, akıllıca bir takip sorusu da sordun. Bir doktor ziyaretini İngilizcede tam da böyle halledersin.',
      relationshipEffect: 1, coins: 14 }
  }
});

// ── Pharmacy visit (A2) ─────────────────────────────────────────────────────
export const pharmacyVisit = createScenario({
  id: 'pharmacy-visit',
  title: 'At the pharmacy',
  titleTr: 'Eczanede',
  environmentId: 'pharmacy', sceneType: 'retail', level: 'A2',
  goal: 'Get something for a cold and learn how to take it.',
  goalTr: 'Soğuk algınlığı için bir şey al ve nasıl kullanacağını öğren.',
  npcIds: ['fatima'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'fatima', emotion: 'friendly',
      text: 'Hello! How can I help you today?',
      translation: 'Merhaba! Bugün size nasıl yardımcı olabilirim?',
      choices: [
        { id: 'cold', intentionTr: 'Soğuk algınlığı için bir şey iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Hi, I have a cold. Could you recommend something?',
          translation: 'Merhaba, üşüttüm. Bir şey önerebilir misiniz?',
          altAccepted: ['I have a cold, can you recommend something', 'Do you have something for a cold'],
          next: 'symptoms' },
        { id: 'prescription', intentionTr: 'Reçeteni vermek istediğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'I have a prescription I’d like to fill, please.',
          translation: 'Doldurtmak istediğim bir reçetem var, lütfen.',
          altAccepted: ['I’d like to fill this prescription', 'Can you fill this prescription'],
          next: 'prescription_node' }
      ]
    },
    symptoms: {
      id: 'symptoms', speakerId: 'fatima', emotion: 'curious',
      text: 'Sorry to hear that. Do you mainly have a sore throat, a cough, or a blocked nose?',
      translation: 'Duyduğuma üzüldüm. Daha çok boğaz ağrınız mı, öksürüğünüz mü yoksa burun tıkanıklığınız mı var?',
      choices: [
        { id: 'throat', intentionTr: 'Boğazının ağrıdığını söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Mostly a sore throat and a bit of a cough.',
          translation: 'Çoğunlukla boğaz ağrısı ve biraz öksürük.',
          altAccepted: ['A sore throat and a little cough', 'Mainly my throat hurts, and a small cough'],
          next: 'recommend' },
        { id: 'nose', intentionTr: 'Burnunun tıkalı olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'My nose is really blocked and I keep sneezing.',
          translation: 'Burnum çok tıkalı ve sürekli hapşırıyorum.',
          altAccepted: ['My nose is blocked and I sneeze a lot', 'A very blocked nose and lots of sneezing'],
          next: 'recommend' }
      ]
    },
    recommend: {
      id: 'recommend', speakerId: 'fatima', emotion: 'friendly',
      text: 'This syrup should help. Take one spoon three times a day, after meals. Do you have any allergies I should know about?',
      translation: 'Bu şurup yardımcı olmalı. Günde üç kez, yemeklerden sonra bir kaşık alın. Bilmem gereken bir alerjiniz var mı?',
      choices: [
        { id: 'no_allergy', intentionTr: 'Alerjin olmadığını söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'No allergies. Should I take it with water?',
          translation: 'Alerjim yok. Suyla mı almalıyım?',
          altAccepted: ['No allergies, do I take it with water', 'No, none. With water?'],
          next: 'instructions', relationshipEffect: 1 },
        { id: 'ask_drowsy', intentionTr: 'Uyku yapıp yapmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'No allergies. Will this make me drowsy? I have to drive.',
          translation: 'Alerjim yok. Bu beni uyuşuk yapar mı? Araç kullanmam gerekiyor.',
          altAccepted: ['Will it make me sleepy, I have to drive', 'Does this cause drowsiness'],
          next: 'drowsy_answer', relationshipEffect: 1 }
      ]
    },
    prescription_node: {
      id: 'prescription_node', speakerId: 'fatima', emotion: 'neutral',
      text: 'Thank you. It’ll take about ten minutes to prepare. Would you like to wait, or come back later?',
      translation: 'Teşekkürler. Hazırlaması yaklaşık on dakika sürer. Beklemek mi istersiniz yoksa sonra mı gelirsiniz?',
      choices: [
        { id: 'wait', intentionTr: 'Beklemeyi tercih et', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'I’ll wait, thank you.',
          translation: 'Beklerim, teşekkürler.',
          altAccepted: ['I’ll wait here thanks', 'I can wait'],
          next: 'end_prescription' },
        { id: 'come_back', intentionTr: 'Sonra geleceğini söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'I’ll come back in twenty minutes, thanks.',
          translation: 'Yirmi dakikaya geri gelirim, teşekkürler.',
          altAccepted: ['I’ll come back later', 'I’ll return in twenty minutes'],
          next: 'end_prescription' }
      ]
    },
    instructions: {
      id: 'instructions', speakerId: 'fatima', emotion: 'happy',
      text: 'Water is fine. Finish the whole bottle even if you feel better. Feel well soon!',
      translation: 'Su uygun. Kendinizi iyi hissetseniz bile şişeyi bitirin. Geçmiş olsun!',
      next: 'end_helped'
    },
    drowsy_answer: {
      id: 'drowsy_answer', speakerId: 'fatima', emotion: 'concerned',
      text: 'Good that you asked — this one can cause drowsiness. Take the non-drowsy version instead, one tablet in the morning.',
      translation: 'Sorman iyi oldu — bu uyku yapabilir. Onun yerine uyku yapmayan türü al, sabah bir tablet.',
      next: 'end_careful'
    }
  },
  endings: {
    end_helped: { id: 'end_helped', kind: 'success', title: 'Sorted out', titleTr: 'Halledildi',
      text: 'You explained your symptoms and understood how to take the medicine. Simple and clear.',
      translation: 'Belirtilerini anlattın ve ilacı nasıl alacağını anladın. Basit ve net.',
      coins: 10 },
    end_careful: { id: 'end_careful', kind: 'excellent', title: 'A smart question', titleTr: 'Akıllı bir soru',
      text: 'By asking about side effects, you avoided a problem before driving. That’s exactly the right thing to ask a pharmacist.',
      translation: 'Yan etkileri sorarak araç kullanmadan önce bir sorunu önledin. Bir eczacıya sorulacak tam da doğru şey.',
      relationshipEffect: 1, coins: 14 },
    end_prescription: { id: 'end_prescription', kind: 'success', title: 'Prescription filled', titleTr: 'Reçete hazırlandı',
      text: 'You handled the prescription politely and clearly. All done.',
      translation: 'Reçeteyi kibar ve net biçimde hallettin. Her şey tamam.',
      coins: 8 }
  }
});
