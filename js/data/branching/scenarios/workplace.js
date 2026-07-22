import { createScenario } from '../scenarioSchema.js';

// ── Job interview (B2) ──────────────────────────────────────────────────────
export const jobInterview = createScenario({
  id: 'job-interview',
  title: 'The job interview',
  titleTr: 'İş görüşmesi',
  environmentId: 'workplace', sceneType: 'formal-office', level: 'B2',
  goal: 'Make a strong impression and handle tough questions.',
  goalTr: 'Güçlü bir izlenim bırak ve zor soruları yönet.',
  npcIds: ['carter'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'carter', emotion: 'formal',
      text: 'Thanks for coming in. To start, could you tell me a little about yourself?',
      translation: 'Geldiğiniz için teşekkürler. Başlangıç olarak, kendinizden biraz bahseder misiniz?',
      choices: [
        { id: 'professional', intentionTr: 'Deneyimine odaklanarak profesyonel yanıt ver', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Of course. I have three years of experience in marketing, and I’m keen to take on more responsibility.',
          translation: 'Tabii. Pazarlamada üç yıllık deneyimim var ve daha fazla sorumluluk almaya istekliyim.',
          altAccepted: ['I have three years in marketing and want more responsibility', 'I’ve worked three years in marketing and I’m ready for more responsibility'],
          next: 'strengths', relationshipEffect: 1 },
        { id: 'personal', intentionTr: 'Daha kişisel ve tutkulu bir yanıt ver', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'Certainly. I’m a curious person who loves solving problems and learning new skills.',
          translation: 'Elbette. Sorun çözmeyi ve yeni beceriler öğrenmeyi seven meraklı bir insanım.',
          altAccepted: ['I’m curious and love solving problems and learning', 'I love learning new skills and solving problems'],
          next: 'strengths' }
      ]
    },
    strengths: {
      id: 'strengths', speakerId: 'carter', emotion: 'curious',
      text: 'Good. What would you say is your greatest strength, and can you give me an example?',
      translation: 'Güzel. En büyük gücünüz nedir ve bir örnek verebilir misiniz?',
      choices: [
        { id: 'teamwork', intentionTr: 'Takım çalışması gücünü örnekle', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'I work well under pressure. Last year I led a project that shipped two weeks early.',
          translation: 'Baskı altında iyi çalışırım. Geçen yıl iki hafta erken tamamlanan bir projeyi yönettim.',
          altAccepted: ['I handle pressure well, I led a project that finished early', 'I’m good under pressure, my last project shipped early'],
          next: 'weakness' },
        { id: 'communication', intentionTr: 'İletişim gücünü örnekle', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Communication. I often explain technical ideas so that anyone can understand them.',
          translation: 'İletişim. Teknik fikirleri herkesin anlayabileceği şekilde sık sık açıklarım.',
          altAccepted: ['I’m a good communicator, I explain technical things clearly', 'Communication, I make complex ideas simple'],
          next: 'weakness' }
      ]
    },
    weakness: {
      id: 'weakness', speakerId: 'carter', emotion: 'thinking',
      text: 'And, honestly, what’s a weakness you’re working on?',
      translation: 'Peki, dürüstçe, üzerinde çalıştığınız bir zayıflık nedir?',
      choices: [
        { id: 'honest_weakness', intentionTr: 'Dürüst ama olgun bir zayıflık ver', tone: 'formal', difficulty: 'hard', xp: 20,
          sentence: 'I used to take on too much myself, but I’m learning to delegate more.',
          translation: 'Eskiden her şeyi kendim üstlenirdim ama daha fazla yetki devretmeyi öğreniyorum.',
          altAccepted: ['I took on too much, now I’m learning to delegate', 'I tend to do everything myself, but I’m getting better at delegating'],
          next: 'questions', relationshipEffect: 1 },
        { id: 'cliche', intentionTr: 'Klişe “çok çalışıyorum” yanıtı ver', tone: 'direct', difficulty: 'medium', xp: 12,
          sentence: 'Honestly, I think I just work too hard sometimes.',
          translation: 'Açıkçası, sanırım bazen sadece çok fazla çalışıyorum.',
          altAccepted: ['I work too hard sometimes', 'My weakness is that I work too much'],
          next: 'questions_flat' }
      ]
    },
    questions: {
      id: 'questions', speakerId: 'carter', emotion: 'happy',
      text: 'That’s a thoughtful answer. Do you have any questions for me?',
      translation: 'Bu düşünceli bir cevap. Bana sormak istediğiniz bir şey var mı?',
      choices: [
        { id: 'ask_team', intentionTr: 'Ekip hakkında bir soru sor', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Yes — what does success look like in this role in the first six months?',
          translation: 'Evet — bu rolde ilk altı ayda başarı neye benzer?',
          altAccepted: ['What does success look like in the first six months', 'How would you measure success in this role early on'],
          next: 'end_strong', relationshipEffect: 2 },
        { id: 'no_questions', intentionTr: 'Sorunun olmadığını söyle', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'No, I think you’ve covered everything. Thank you.',
          translation: 'Hayır, sanırım her şeyi anlattınız. Teşekkürler.',
          altAccepted: ['No, you covered everything, thanks', 'I don’t have questions, thank you'],
          next: 'end_solid' }
      ]
    },
    questions_flat: {
      id: 'questions_flat', speakerId: 'carter', emotion: 'neutral',
      text: 'Hmm, that’s a common answer. Well — do you have any questions for me?',
      translation: 'Hmm, bu yaygın bir cevap. Peki — bana sormak istediğiniz bir şey var mı?',
      choices: [
        { id: 'recover', intentionTr: 'Güçlü bir soruyla toparla', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'I do — how would you describe the team I’d be working with?',
          translation: 'Evet — birlikte çalışacağım ekibi nasıl tanımlarsınız?',
          altAccepted: ['How would you describe the team', 'What is the team like that I’d join'],
          next: 'end_solid', relationshipEffect: 1 },
        { id: 'no_q2', intentionTr: 'Soru sorma', tone: 'polite', difficulty: 'easy', xp: 8,
          sentence: 'No, nothing for now. Thank you for your time.',
          translation: 'Hayır, şimdilik yok. Zaman ayırdığınız için teşekkürler.',
          altAccepted: ['No questions, thanks for your time', 'Nothing right now, thank you'],
          next: 'end_neutral' }
      ]
    }
  },
  endings: {
    end_strong: { id: 'end_strong', kind: 'excellent', title: 'A standout interview', titleTr: 'Öne çıkan bir görüşme',
      text: 'Structured answers, an honest weakness, and a sharp closing question. Ms. Carter is impressed.',
      translation: 'Düzenli cevaplar, dürüst bir zayıflık ve keskin bir kapanış sorusu. Ms. Carter etkilendi.',
      relationshipEffect: 2, coins: 20 },
    end_solid: { id: 'end_solid', kind: 'success', title: 'A solid interview', titleTr: 'Sağlam bir görüşme',
      text: 'You handled the questions well and came across as capable. A strong showing.',
      translation: 'Soruları iyi yönettin ve yetenekli göründün. Güçlü bir performans.',
      relationshipEffect: 1, coins: 12 },
    end_neutral: { id: 'end_neutral', kind: 'neutral', title: 'A fair interview', titleTr: 'İyi bir görüşme',
      text: 'You got through it, but a few answers were a bit safe. Ask a strong closing question next time — replay and try!',
      translation: 'Atlattın ama birkaç cevap biraz temkinliydi. Bir dahaki sefere güçlü bir kapanış sorusu sor — tekrar oyna ve dene!',
      coins: 6 }
  }
});

// ── Workplace misunderstanding (B1) ─────────────────────────────────────────
export const workplaceMisunderstanding = createScenario({
  id: 'workplace-misunderstanding',
  title: 'Clearing up a misunderstanding',
  titleTr: 'Bir yanlış anlaşılmayı gidermek',
  environmentId: 'workplace', sceneType: 'formal-office', level: 'B1',
  goal: 'Fix a mix-up with a coworker without making it worse.',
  goalTr: 'Bir iş arkadaşıyla yaşanan karışıklığı daha kötüye götürmeden çöz.',
  npcIds: ['raj'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'raj', emotion: 'concerned',
      text: 'Hey, I thought you were sending the report to the client yesterday. They just emailed asking where it is.',
      translation: 'Selam, raporu dün müşteriye göndereceğini sanıyordum. Az önce nerede olduğunu sorarak e-posta attılar.',
      choices: [
        { id: 'clarify', intentionTr: 'Kibarca yanlış anlaşıldığını açıkla', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Oh, I think there’s been a mix-up — I understood that you were sending it.',
          translation: 'Ah, sanırım bir karışıklık olmuş — onu senin göndereceğini anlamıştım.',
          altAccepted: ['I thought you were sending it', 'There’s a misunderstanding, I understood you would send it'],
          next: 'check_email' },
        { id: 'defensive', intentionTr: 'Savunmaya geç', tone: 'direct', difficulty: 'medium', xp: 12,
          sentence: 'That wasn’t my job. Nobody told me to send it.',
          translation: 'Bu benim işim değildi. Kimse bana göndermemi söylemedi.',
          altAccepted: ['It wasn’t my task, no one told me', 'That’s not my job, nobody asked me'],
          next: 'tension' }
      ]
    },
    check_email: {
      id: 'check_email', speakerId: 'raj', emotion: 'thinking',
      text: 'Really? Let me check the thread… Ah, you’re right, the message wasn’t clear. My mistake. What should we do now?',
      translation: 'Gerçekten mi? Yazışmaya bakayım… Ah, haklısın, mesaj net değildi. Benim hatam. Şimdi ne yapmalıyız?',
      choices: [
        { id: 'take_action', intentionTr: 'Hemen çözüm öner', tone: 'friendly', difficulty: 'medium', xp: 16,
          sentence: 'No problem. I’ll send it right now and apologize to the client for the delay.',
          translation: 'Sorun değil. Hemen gönderip gecikme için müşteriden özür dilerim.',
          altAccepted: ['I’ll send it now and apologize for the delay', 'Let me send it right away and say sorry to the client'],
          next: 'end_teamwork', relationshipEffect: 2 },
        { id: 'share_blame', intentionTr: 'Birlikte hallederiz de', tone: 'friendly', difficulty: 'hard', xp: 18,
          sentence: 'These things happen. Let’s both reply so the client knows we’re on it.',
          translation: 'Olur böyle şeyler. İkimiz de yanıt verelim ki müşteri ilgilendiğimizi bilsin.',
          altAccepted: ['Let’s both reply to the client', 'It happens, let’s both respond so they know we’re handling it'],
          next: 'end_teamwork', relationshipEffect: 2 }
      ]
    },
    tension: {
      id: 'tension', speakerId: 'raj', emotion: 'concerned',
      text: 'Okay, no need to snap. I’m not blaming you — I just want to fix it. Can we sort this out together?',
      translation: 'Tamam, ters çıkmana gerek yok. Seni suçlamıyorum — sadece düzeltmek istiyorum. Bunu birlikte çözebilir miyiz?',
      choices: [
        { id: 'apologize', intentionTr: 'Ters çıktığın için özür dile', tone: 'polite', difficulty: 'medium', xp: 16,
          sentence: 'You’re right, sorry — I was a bit stressed. Yes, let’s fix it together.',
          translation: 'Haklısın, özür dilerim — biraz stresliydim. Evet, birlikte çözelim.',
          altAccepted: ['Sorry, I was stressed, let’s fix it together', 'You’re right, I’m sorry, let’s sort it out'],
          next: 'end_recovered', relationshipEffect: 1 },
        { id: 'stay_cold', intentionTr: 'Soğuk kal ama işi yap', tone: 'direct', difficulty: 'easy', xp: 10,
          sentence: 'Fine. I’ll send the report now.',
          translation: 'Tamam. Raporu şimdi göndereyim.',
          altAccepted: ['Okay, I’ll send it now', 'Fine, sending it now'],
          next: 'end_cold' }
      ]
    }
  },
  endings: {
    end_teamwork: { id: 'end_teamwork', kind: 'problem-solved', title: 'Sorted as a team', titleTr: 'Ekip olarak çözüldü',
      text: 'You stayed calm, cleared up the mix-up, and offered a solution. Raj is glad to work with you.',
      translation: 'Sakin kaldın, karışıklığı giderdin ve bir çözüm önerdin. Raj seninle çalışmaktan memnun.',
      relationshipEffect: 1, coins: 16 },
    end_recovered: { id: 'end_recovered', kind: 'relationship', title: 'Recovered well', titleTr: 'İyi toparlandı',
      text: 'You reacted defensively at first, but apologized and turned it around. Knowing how to repair a moment is real skill.',
      translation: 'Önce savunmaya geçtin ama özür dileyip durumu düzelttin. Bir anı onarmayı bilmek gerçek bir beceri.',
      relationshipEffect: 1, coins: 12 },
    end_cold: { id: 'end_cold', kind: 'neutral', title: 'The work got done', titleTr: 'İş halledildi',
      text: 'The report went out, but the mood stayed cool. Next time, try clearing the air — replay and see the difference.',
      translation: 'Rapor gönderildi ama hava soğuk kaldı. Bir dahaki sefere ortamı yumuşatmayı dene — tekrar oyna ve farkı gör.',
      coins: 5 }
  }
});
