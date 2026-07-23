import { createScenario } from '../scenarioSchema.js?v=6';

// ── Job interview (B2) ──────────────────────────────────────────────────────
export const jobInterview = createScenario({
  id: 'job-interview',
  title: 'Il colloquio di lavoro',
  titleTr: 'İş görüşmesi',
  environmentId: 'workplace', sceneType: 'formal-office', level: 'B2',
  goal: 'Fai un’ottima impressione e gestisci le domande difficili.',
  goalTr: 'Güçlü bir izlenim bırak ve zor soruları yönet.',
  npcIds: ['carter'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'carter', emotion: 'formal',
      text: 'Grazie di essere venuto. Per iniziare, può parlarmi un po’ di lei?',
      translation: 'Geldiğiniz için teşekkürler. Başlangıç olarak, kendinizden biraz bahseder misiniz?',
      choices: [
        { id: 'professional', intentionTr: 'Deneyimine odaklanarak profesyonel yanıt ver', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Certo. Ho tre anni di esperienza nel marketing e sono ansioso di assumere più responsabilità.',
          translation: 'Tabii. Pazarlamada üç yıllık deneyimim var ve daha fazla sorumluluk almaya istekliyim.',
          altAccepted: ['Ho tre anni nel marketing e voglio più responsabilità', 'Ho lavorato tre anni nel marketing e sono pronto per più responsabilità'],
          next: 'strengths', relationshipEffect: 1 },
        { id: 'personal', intentionTr: 'Daha kişisel ve tutkulu bir yanıt ver', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Certamente. Sono una persona curiosa a cui piace risolvere problemi e imparare cose nuove.',
          translation: 'Elbette. Sorun çözmeyi ve yeni beceriler öğrenmeyi seven meraklı bir insanım.',
          altAccepted: ['Sono curioso e amo risolvere problemi e imparare', 'Amo imparare cose nuove e risolvere problemi'],
          next: 'strengths' }
      ]
    },
    strengths: {
      id: 'strengths', speakerId: 'carter', emotion: 'curious',
      text: 'Bene. Qual è, secondo lei, il suo punto di forza maggiore, e può farmi un esempio?',
      translation: 'Güzel. En büyük gücünüz nedir ve bir örnek verebilir misiniz?',
      choices: [
        { id: 'teamwork', intentionTr: 'Takım çalışması gücünü örnekle', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Lavoro bene sotto pressione. L’anno scorso ho guidato un progetto consegnato due settimane in anticipo.',
          translation: 'Baskı altında iyi çalışırım. Geçen yıl iki hafta erken tamamlanan bir projeyi yönettim.',
          altAccepted: ['Gestisco bene la pressione, ho guidato un progetto finito in anticipo', 'Sono bravo sotto pressione, il mio ultimo progetto è stato consegnato in anticipo'],
          next: 'weakness' },
        { id: 'communication', intentionTr: 'İletişim gücünü örnekle', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'La comunicazione. Spesso spiego idee tecniche in modo che chiunque possa capirle.',
          translation: 'İletişim. Teknik fikirleri herkesin anlayabileceği şekilde sık sık açıklarım.',
          altAccepted: ['Sono un bravo comunicatore, spiego le cose tecniche con chiarezza', 'La comunicazione, rendo semplici le idee complesse'],
          next: 'weakness' }
      ]
    },
    weakness: {
      id: 'weakness', speakerId: 'carter', emotion: 'thinking',
      text: 'E, sinceramente, qual è un difetto su cui sta lavorando?',
      translation: 'Peki, dürüstçe, üzerinde çalıştığınız bir zayıflık nedir?',
      choices: [
        { id: 'honest_weakness', intentionTr: 'Dürüst ama olgun bir zayıflık ver', tone: 'formal', difficulty: 'hard', xp: 20,
          sentence: 'In passato mi caricavo di troppo lavoro, ma sto imparando a delegare di più.',
          translation: 'Eskiden her şeyi kendim üstlenirdim ama daha fazla yetki devretmeyi öğreniyorum.',
          altAccepted: ['Mi caricavo di troppo, ora sto imparando a delegare', 'Tendo a fare tutto da solo, ma sto migliorando nel delegare'],
          next: 'questions', relationshipEffect: 1 },
        { id: 'cliche', intentionTr: 'Klişe “çok çalışıyorum” yanıtı ver', tone: 'direct', difficulty: 'medium', xp: 12,
          sentence: 'Sinceramente, credo di lavorare solo un po’ troppo a volte.',
          translation: 'Açıkçası, sanırım bazen sadece çok fazla çalışıyorum.',
          altAccepted: ['A volte lavoro troppo', 'Il mio difetto è che lavoro troppo'],
          next: 'questions_flat' }
      ]
    },
    questions: {
      id: 'questions', speakerId: 'carter', emotion: 'happy',
      text: 'È una risposta ponderata. Ha domande per me?',
      translation: 'Bu düşünceli bir cevap. Bana sormak istediğiniz bir şey var mı?',
      choices: [
        { id: 'ask_team', intentionTr: 'Ekip hakkında bir soru sor', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Sì — come si presenta il successo in questo ruolo nei primi sei mesi?',
          translation: 'Evet — bu rolde ilk altı ayda başarı neye benzer?',
          altAccepted: ['Come si presenta il successo nei primi sei mesi', 'Come misurereste il successo in questo ruolo all’inizio'],
          next: 'end_strong', relationshipEffect: 2 },
        { id: 'no_questions', intentionTr: 'Sorunun olmadığını söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'No, credo abbia coperto tutto. Grazie.',
          translation: 'Hayır, sanırım her şeyi anlattınız. Teşekkürler.',
          altAccepted: ['No, ha coperto tutto, grazie', 'Non ho domande, grazie'],
          next: 'end_solid' }
      ]
    },
    questions_flat: {
      id: 'questions_flat', speakerId: 'carter', emotion: 'neutral',
      text: 'Hmm, è una risposta comune. Bene — ha domande per me?',
      translation: 'Hmm, bu yaygın bir cevap. Peki — bana sormak istediğiniz bir şey var mı?',
      choices: [
        { id: 'recover', intentionTr: 'Güçlü bir soruyla toparla', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Sì — come descriverebbe il team con cui lavorerei?',
          translation: 'Evet — birlikte çalışacağım ekibi nasıl tanımlarsınız?',
          altAccepted: ['Come descriverebbe il team', 'Com’è il team a cui mi unirei'],
          next: 'end_solid', relationshipEffect: 1 },
        { id: 'no_q2', intentionTr: 'Soru sorma', tone: 'polite', difficulty: 'easy', xp: 8,
          sentence: 'No, per ora niente. Grazie per il suo tempo.',
          translation: 'Hayır, şimdilik yok. Zaman ayırdığınız için teşekkürler.',
          altAccepted: ['Nessuna domanda, grazie del tempo', 'Niente per ora, grazie'],
          next: 'end_neutral' }
      ]
    }
  },
  endings: {
    end_strong: { id: 'end_strong', kind: 'excellent', title: 'Un colloquio che spicca', titleTr: 'Öne çıkan bir görüşme',
      text: 'Risposte strutturate, un difetto sincero e una domanda finale incisiva. La signora Carter è colpita.',
      translation: 'Düzenli cevaplar, dürüst bir zayıflık ve keskin bir kapanış sorusu. Ms. Carter etkilendi.',
      relationshipEffect: 2, coins: 20 },
    end_solid: { id: 'end_solid', kind: 'success', title: 'Un colloquio solido', titleTr: 'Sağlam bir görüşme',
      text: 'Hai gestito bene le domande e sei sembrato capace. Una buona prova.',
      translation: 'Soruları iyi yönettin ve yetenekli göründün. Güçlü bir performans.',
      relationshipEffect: 1, coins: 12 },
    end_neutral: { id: 'end_neutral', kind: 'neutral', title: 'Un colloquio discreto', titleTr: 'İyi bir görüşme',
      text: 'Te la sei cavata, ma qualche risposta era un po’ prudente. La prossima volta fai una domanda finale forte — rigioca e prova!',
      translation: 'Atlattın ama birkaç cevap biraz temkinliydi. Bir dahaki sefere güçlü bir kapanış sorusu sor — tekrar oyna ve dene!',
      coins: 6 }
  }
});

// ── Workplace misunderstanding (B1) ─────────────────────────────────────────
export const workplaceMisunderstanding = createScenario({
  id: 'workplace-misunderstanding',
  title: 'Chiarire un malinteso',
  titleTr: 'Bir yanlış anlaşılmayı gidermek',
  environmentId: 'workplace', sceneType: 'formal-office', level: 'B1',
  goal: 'Risolvi un equivoco con un collega senza peggiorare le cose.',
  goalTr: 'Bir iş arkadaşıyla yaşanan karışıklığı daha kötüye götürmeden çöz.',
  npcIds: ['raj'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'raj', emotion: 'concerned',
      text: 'Ehi, pensavo che ieri avessi mandato tu il report al cliente. Hanno appena scritto chiedendo dov’è.',
      translation: 'Selam, raporu dün müşteriye göndereceğini sanıyordum. Az önce nerede olduğunu sorarak e-posta attılar.',
      choices: [
        { id: 'clarify', intentionTr: 'Kibarca yanlış anlaşıldığını açıkla', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Oh, credo ci sia stato un equivoco — avevo capito che lo mandassi tu.',
          translation: 'Ah, sanırım bir karışıklık olmuş — onu senin göndereceğini anlamıştım.',
          altAccepted: ['Pensavo lo mandassi tu', 'C’è un malinteso, avevo capito che lo mandassi tu'],
          next: 'check_email' },
        { id: 'defensive', intentionTr: 'Savunmaya geç', tone: 'direct', difficulty: 'medium', xp: 12,
          sentence: 'Non era compito mio. Nessuno mi ha detto di mandarlo.',
          translation: 'Bu benim işim değildi. Kimse bana göndermemi söylemedi.',
          altAccepted: ['Non era il mio compito, nessuno me l’ha detto', 'Non è compito mio, nessuno me l’ha chiesto'],
          next: 'tension' }
      ]
    },
    check_email: {
      id: 'check_email', speakerId: 'raj', emotion: 'thinking',
      text: 'Davvero? Controllo la conversazione… Ah, hai ragione, il messaggio non era chiaro. Colpa mia. Cosa facciamo adesso?',
      translation: 'Gerçekten mi? Yazışmaya bakayım… Ah, haklısın, mesaj net değildi. Benim hatam. Şimdi ne yapmalıyız?',
      choices: [
        { id: 'take_action', intentionTr: 'Hemen çözüm öner', tone: 'friendly', difficulty: 'medium', xp: 16,
          sentence: 'Nessun problema. Lo mando subito e mi scuso con il cliente per il ritardo.',
          translation: 'Sorun değil. Hemen gönderip gecikme için müşteriden özür dilerim.',
          altAccepted: ['Lo mando ora e mi scuso per il ritardo', 'Lo mando subito e dico scusa al cliente'],
          next: 'end_teamwork', relationshipEffect: 2 },
        { id: 'share_blame', intentionTr: 'Birlikte hallederiz de', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Sono cose che capitano. Rispondiamo entrambi così il cliente sa che ce ne stiamo occupando.',
          translation: 'Olur böyle şeyler. İkimiz de yanıt verelim ki müşteri ilgilendiğimizi bilsin.',
          altAccepted: ['Rispondiamo entrambi al cliente', 'Capita, rispondiamo entrambi così sanno che ce ne occupiamo'],
          next: 'end_teamwork', relationshipEffect: 2 }
      ]
    },
    tension: {
      id: 'tension', speakerId: 'raj', emotion: 'concerned',
      text: 'Ok, non c’è bisogno di scattare. Non ti sto incolpando — voglio solo risolverla. Possiamo sistemarla insieme?',
      translation: 'Tamam, ters çıkmana gerek yok. Seni suçlamıyorum — sadece düzeltmek istiyorum. Bunu birlikte çözebilir miyiz?',
      choices: [
        { id: 'apologize', intentionTr: 'Ters çıktığın için özür dile', tone: 'polite', difficulty: 'medium', xp: 16,
          sentence: 'Hai ragione, scusa — ero un po’ stressato. Sì, risolviamola insieme.',
          translation: 'Haklısın, özür dilerim — biraz stresliydim. Evet, birlikte çözelim.',
          altAccepted: ['Scusa, ero stressato, risolviamola insieme', 'Hai ragione, mi dispiace, sistemiamola'],
          next: 'end_recovered', relationshipEffect: 1 },
        { id: 'stay_cold', intentionTr: 'Soğuk kal ama işi yap', tone: 'direct', difficulty: 'easy', xp: 10,
          sentence: 'Va bene. Mando il report adesso.',
          translation: 'Tamam. Raporu şimdi göndereyim.',
          altAccepted: ['Ok, lo mando adesso', 'Va bene, lo mando ora'],
          next: 'end_cold' }
      ]
    }
  },
  endings: {
    end_teamwork: { id: 'end_teamwork', kind: 'problem-solved', title: 'Risolto come squadra', titleTr: 'Ekip olarak çözüldü',
      text: 'Sei rimasto calmo, hai chiarito l’equivoco e hai proposto una soluzione. Raj è contento di lavorare con te.',
      translation: 'Sakin kaldın, karışıklığı giderdin ve bir çözüm önerdin. Raj seninle çalışmaktan memnun.',
      relationshipEffect: 1, coins: 16 },
    end_recovered: { id: 'end_recovered', kind: 'relationship', title: 'Ripreso bene', titleTr: 'İyi toparlandı',
      text: 'All’inizio hai reagito sulla difensiva, ma ti sei scusato e hai ribaltato la situazione. Saper riparare un momento è una vera abilità.',
      translation: 'Önce savunmaya geçtin ama özür dileyip durumu düzelttin. Bir anı onarmayı bilmek gerçek bir beceri.',
      relationshipEffect: 1, coins: 12 },
    end_cold: { id: 'end_cold', kind: 'neutral', title: 'Il lavoro è stato fatto', titleTr: 'İş halledildi',
      text: 'Il report è partito, ma l’atmosfera è rimasta fredda. La prossima volta prova a distendere gli animi — rigioca e nota la differenza.',
      translation: 'Rapor gönderildi ama hava soğuk kaldı. Bir dahaki sefere ortamı yumuşatmayı dene — tekrar oyna ve farkı gör.',
      coins: 5 }
  }
});
