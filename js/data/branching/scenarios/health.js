import { createScenario } from '../scenarioSchema.js?v=6';

// NOTE: These are fictional language-learning conversations. They never give
// real medical advice or diagnoses — the NPC always defers to real care.

// ── Hospital visit (A2) ─────────────────────────────────────────────────────
export const hospitalVisit = createScenario({
  id: 'hospital-visit',
  title: 'Una visita dal medico',
  titleTr: 'Doktora bir ziyaret',
  environmentId: 'hospital', sceneType: 'hospital', level: 'A2',
  goal: 'Descrivi come ti senti e capisci i passi successivi.',
  goalTr: 'Nasıl hissettiğini anlat ve sonraki adımları anla.',
  npcIds: ['bennett'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'bennett', emotion: 'friendly',
      text: 'Salve, si accomodi e prenda posto. Qual è il problema oggi?',
      translation: 'Merhaba, içeri gelin ve oturun. Bugün sorun nedir?',
      choices: [
        { id: 'headache', intentionTr: 'Baş ağrın olduğunu anlat', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ho un forte mal di testa da due giorni.',
          translation: 'İki gündür şiddetli bir baş ağrım var.',
          altAccepted: ['Ho mal di testa da due giorni', 'La testa mi fa male da due giorni'],
          next: 'when_started' },
        { id: 'stomach', intentionTr: 'Mide ağrın olduğunu anlat', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Mi fa male lo stomaco da ieri.',
          translation: 'Dünden beri midem ağrıyor.',
          altAccepted: ['Ho mal di stomaco da ieri', 'Lo stomaco mi fa male da ieri'],
          next: 'when_started' },
        { id: 'tired', intentionTr: 'Çok yorgun hissettiğini anlat', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Mi sento molto stanco e non riesco a dormire bene.',
          translation: 'Çok yorgun hissediyorum ve iyi uyuyamıyorum.',
          altAccepted: ['Mi sento molto stanco e non dormo', 'Sono sempre stanco e dormo male'],
          next: 'lifestyle' }
      ]
    },
    when_started: {
      id: 'when_started', speakerId: 'bennett', emotion: 'thinking',
      text: 'Capisco. E ha preso qualcosa, o è la prima volta che lo tratta?',
      translation: 'Anlıyorum. Bunun için bir şey aldınız mı, yoksa ilk kez mi tedavi ediyorsunuz?',
      choices: [
        { id: 'took_nothing', intentionTr: 'Hiçbir şey almadığını söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'No, non ho ancora preso niente.',
          translation: 'Hayır, henüz hiçbir şey almadım.',
          altAccepted: ['Non ho preso niente', 'No, ancora niente'],
          next: 'advice' },
        { id: 'took_painkiller', intentionTr: 'Ağrı kesici aldığını ama işe yaramadığını söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ho preso un antidolorifico, ma non è servito granché.',
          translation: 'Bir ağrı kesici aldım ama pek yardımcı olmadı.',
          altAccepted: ['Ho preso un antidolorifico ma non ha aiutato', 'Un antidolorifico non ha funzionato'],
          next: 'advice' }
      ]
    },
    lifestyle: {
      id: 'lifestyle', speakerId: 'bennett', emotion: 'curious',
      text: 'Grazie per avermelo detto. Quanta acqua beve, e come sono i suoi livelli di stress ultimamente?',
      translation: 'Söylediğiniz için teşekkürler. Ne kadar su içiyorsunuz ve son zamanlarda stres seviyeniz nasıl?',
      choices: [
        { id: 'stressed', intentionTr: 'Çok stresli olduğunu söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ultimamente ho avuto molto stress al lavoro.',
          translation: 'Son zamanlarda işte çok stres altındaydım.',
          altAccepted: ['Ho avuto molto stress al lavoro', 'Il lavoro è stato molto stressante ultimamente'],
          next: 'advice' },
        { id: 'fine_otherwise', intentionTr: 'Bunun dışında iyi olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Per il resto sto bene, solo stanco tutto il tempo.',
          translation: 'Bunun dışında iyiyim, sadece sürekli yorgunum.',
          altAccepted: ['Per il resto sto bene', 'A parte questo sto bene, solo stanco'],
          next: 'advice' }
      ]
    },
    advice: {
      id: 'advice', speakerId: 'bennett', emotion: 'friendly',
      text: 'Qui non vedo nulla di serio che mi preoccupi. Le scrivo una nota con qualche semplice indicazione. Ha domande prima di andare?',
      translation: 'Burada beni ciddi anlamda endişelendiren bir şey yok. Size basit adımlar içeren bir not yazacağım. Gitmeden önce sorunuz var mı?',
      choices: [
        { id: 'ask_followup', intentionTr: 'Ne zaman geri dönmen gerektiğini sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Quando dovrei tornare se non migliora?',
          translation: 'Eğer düzelmezse ne zaman geri gelmeliyim?',
          altAccepted: ['Quando devo tornare se continua', 'Devo tornare se non migliora'],
          next: 'followup_answer', relationshipEffect: 1 },
        { id: 'thanks', intentionTr: 'Teşekkür et ve ayrıl', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'No, è tutto chiaro. Grazie mille, dottore.',
          translation: 'Hayır, açık. Çok teşekkür ederim, doktor.',
          altAccepted: ['È chiaro, grazie dottore', 'Nessuna domanda, grazie mille'],
          next: 'end_clear' }
      ]
    },
    followup_answer: {
      id: 'followup_answer', speakerId: 'bennett', emotion: 'happy',
      text: 'Bella domanda. Se non ci sono miglioramenti in tre giorni, prenoti un altro appuntamento. Si riguardi.',
      translation: 'İyi soru. Üç günde iyileşme olmazsa yeni bir randevu alın. Kendinize iyi bakın.',
      next: 'end_thorough'
    }
  },
  endings: {
    end_clear: { id: 'end_clear', kind: 'success', title: 'Spiegato con chiarezza', titleTr: 'Açıkça anlatıldı',
      text: 'Hai descritto i sintomi con chiarezza e hai capito i consigli. Una visita tranquilla e riuscita.',
      translation: 'Belirtilerini net anlattın ve tavsiyeyi anladın. Sakin, başarılı bir ziyaret.',
      coins: 10 },
    end_thorough: { id: 'end_thorough', kind: 'excellent', title: 'Una visita accurata', titleTr: 'Kapsamlı bir ziyaret',
      text: 'Non solo ti sei spiegato, ma hai fatto un’intelligente domanda di follow-up. È esattamente così che si gestisce una visita medica in italiano.',
      translation: 'Sadece kendini anlatmadın, akıllıca bir takip sorusu da sordun. Bir doktor ziyaretini İngilizcede tam da böyle halledersin.',
      relationshipEffect: 1, coins: 14 }
  }
});

// ── Pharmacy visit (A2) ─────────────────────────────────────────────────────
export const pharmacyVisit = createScenario({
  id: 'pharmacy-visit',
  title: 'In farmacia',
  titleTr: 'Eczanede',
  environmentId: 'pharmacy', sceneType: 'retail', level: 'A2',
  goal: 'Prendi qualcosa per il raffreddore e impara come assumerlo.',
  goalTr: 'Soğuk algınlığı için bir şey al ve nasıl kullanacağını öğren.',
  npcIds: ['fatima'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'fatima', emotion: 'friendly',
      text: 'Salve! Come posso aiutarla oggi?',
      translation: 'Merhaba! Bugün size nasıl yardımcı olabilirim?',
      choices: [
        { id: 'cold', intentionTr: 'Soğuk algınlığı için bir şey iste', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Salve, ho il raffreddore. Potrebbe consigliarmi qualcosa?',
          translation: 'Merhaba, üşüttüm. Bir şey önerebilir misiniz?',
          altAccepted: ['Ho il raffreddore, può consigliarmi qualcosa', 'Ha qualcosa per il raffreddore'],
          next: 'symptoms' },
        { id: 'prescription', intentionTr: 'Reçeteni vermek istediğini söyle', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ho una ricetta che vorrei ritirare, per favore.',
          translation: 'Doldurtmak istediğim bir reçetem var, lütfen.',
          altAccepted: ['Vorrei ritirare questa ricetta', 'Può darmi i farmaci di questa ricetta'],
          next: 'prescription_node' }
      ]
    },
    symptoms: {
      id: 'symptoms', speakerId: 'fatima', emotion: 'curious',
      text: 'Mi dispiace. Ha soprattutto mal di gola, tosse o naso chiuso?',
      translation: 'Duyduğuma üzüldüm. Daha çok boğaz ağrınız mı, öksürüğünüz mü yoksa burun tıkanıklığınız mı var?',
      choices: [
        { id: 'throat', intentionTr: 'Boğazının ağrıdığını söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Soprattutto mal di gola e un po’ di tosse.',
          translation: 'Çoğunlukla boğaz ağrısı ve biraz öksürük.',
          altAccepted: ['Mal di gola e un po’ di tosse', 'Mi fa male la gola, e un po’ di tosse'],
          next: 'recommend' },
        { id: 'nose', intentionTr: 'Burnunun tıkalı olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Ho il naso molto chiuso e continuo a starnutire.',
          translation: 'Burnum çok tıkalı ve sürekli hapşırıyorum.',
          altAccepted: ['Ho il naso chiuso e starnutisco molto', 'Naso molto chiuso e tanti starnuti'],
          next: 'recommend' }
      ]
    },
    recommend: {
      id: 'recommend', speakerId: 'fatima', emotion: 'friendly',
      text: 'Questo sciroppo dovrebbe aiutare. Prenda un cucchiaio tre volte al giorno, dopo i pasti. Ha allergie di cui dovrei sapere?',
      translation: 'Bu şurup yardımcı olmalı. Günde üç kez, yemeklerden sonra bir kaşık alın. Bilmem gereken bir alerjiniz var mı?',
      choices: [
        { id: 'no_allergy', intentionTr: 'Alerjin olmadığını söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Nessuna allergia. Devo prenderlo con l’acqua?',
          translation: 'Alerjim yok. Suyla mı almalıyım?',
          altAccepted: ['Nessuna allergia, lo prendo con l’acqua', 'No, nessuna. Con l’acqua?'],
          next: 'instructions', relationshipEffect: 1 },
        { id: 'ask_drowsy', intentionTr: 'Uyku yapıp yapmadığını sor', tone: 'polite', difficulty: 'hard', xp: 18,
          sentence: 'Nessuna allergia. Mi darà sonnolenza? Devo guidare.',
          translation: 'Alerjim yok. Bu beni uyuşuk yapar mı? Araç kullanmam gerekiyor.',
          altAccepted: ['Mi farà venire sonno, devo guidare', 'Provoca sonnolenza'],
          next: 'drowsy_answer', relationshipEffect: 1 }
      ]
    },
    prescription_node: {
      id: 'prescription_node', speakerId: 'fatima', emotion: 'neutral',
      text: 'Grazie. Ci vorranno circa dieci minuti per prepararlo. Preferisce aspettare o tornare più tardi?',
      translation: 'Teşekkürler. Hazırlaması yaklaşık on dakika sürer. Beklemek mi istersiniz yoksa sonra mı gelirsiniz?',
      choices: [
        { id: 'wait', intentionTr: 'Beklemeyi tercih et', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Aspetto, grazie.',
          translation: 'Beklerim, teşekkürler.',
          altAccepted: ['Aspetto qui grazie', 'Posso aspettare'],
          next: 'end_prescription' },
        { id: 'come_back', intentionTr: 'Sonra geleceğini söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Torno tra venti minuti, grazie.',
          translation: 'Yirmi dakikaya geri gelirim, teşekkürler.',
          altAccepted: ['Torno più tardi', 'Torno tra venti minuti'],
          next: 'end_prescription' }
      ]
    },
    instructions: {
      id: 'instructions', speakerId: 'fatima', emotion: 'happy',
      text: 'L’acqua va bene. Finisca tutta la bottiglia anche se si sente meglio. Guarisca presto!',
      translation: 'Su uygun. Kendinizi iyi hissetseniz bile şişeyi bitirin. Geçmiş olsun!',
      next: 'end_helped'
    },
    drowsy_answer: {
      id: 'drowsy_answer', speakerId: 'fatima', emotion: 'concerned',
      text: 'Ha fatto bene a chiedere — questo può dare sonnolenza. Prenda invece la versione che non dà sonno, una compressa al mattino.',
      translation: 'Sorman iyi oldu — bu uyku yapabilir. Onun yerine uyku yapmayan türü al, sabah bir tablet.',
      next: 'end_careful'
    }
  },
  endings: {
    end_helped: { id: 'end_helped', kind: 'success', title: 'Risolto', titleTr: 'Halledildi',
      text: 'Hai spiegato i sintomi e hai capito come prendere la medicina. Semplice e chiaro.',
      translation: 'Belirtilerini anlattın ve ilacı nasıl alacağını anladın. Basit ve net.',
      coins: 10 },
    end_careful: { id: 'end_careful', kind: 'excellent', title: 'Una domanda intelligente', titleTr: 'Akıllı bir soru',
      text: 'Chiedendo degli effetti collaterali, hai evitato un problema prima di guidare. È esattamente la cosa giusta da chiedere a un farmacista.',
      translation: 'Yan etkileri sorarak araç kullanmadan önce bir sorunu önledin. Bir eczacıya sorulacak tam da doğru şey.',
      relationshipEffect: 1, coins: 14 },
    end_prescription: { id: 'end_prescription', kind: 'success', title: 'Ricetta ritirata', titleTr: 'Reçete hazırlandı',
      text: 'Hai gestito la ricetta con cortesia e chiarezza. Tutto fatto.',
      translation: 'Reçeteyi kibar ve net biçimde hallettin. Her şey tamam.',
      coins: 8 }
  }
});
