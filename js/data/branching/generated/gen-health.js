import { miniAll } from '../miniBuilder.js';

// Fictional language-learning conversations — never real medical advice.
export const HEALTH = miniAll([
  // ---------------- HOSPITAL ----------------
  { id:'hp-appointment', place:'hospital', level:'A2', title:'Making an appointment', titleTr:'Randevu almak', npc:'bennett',
    open:'Good morning. Do you have an appointment?', openTr:'Günaydın. Randevunuz var mı?',
    br:[
      { i:'Randevu al', s:'No, I’d like to make one for this week, please.', st:'Hayır, bu hafta için bir tane almak istiyorum, lütfen.', a:['I’d like to make an appointment this week'],
        r:'We have Thursday at ten. Does that work?', rt:'Perşembe onda var. Uygun mu?', e:{k:'success',t:'Booked',tt:'Alındı'} },
      { i:'Acil olduğunu söyle', s:'It’s a bit urgent — could I be seen today?', st:'Biraz acil — bugün görülebilir miyim?',
        r:'Let me fit you in this afternoon.', rt:'Sizi bu öğleden sonraya sığdırayım.', e:{k:'problem-solved',t:'Seen today',tt:'Bugün görüldü'} } ] },

  { id:'hp-headache', place:'hospital', level:'A2', title:'A bad headache', titleTr:'Şiddetli baş ağrısı', npc:'bennett',
    open:'What seems to be the problem today?', openTr:'Bugün sorun nedir?', emo:'curious',
    br:[
      { i:'Baş ağrısını anlat', s:'I’ve had a bad headache for three days.', st:'Üç gündür şiddetli baş ağrım var.', a:['I’ve had a headache for three days'],
        r:'I see. Have you been drinking enough water?', rt:'Anlıyorum. Yeterince su içiyor musunuz?',
        f:[ { i:'Hayır de', s:'Honestly, probably not enough.', st:'Açıkçası muhtemelen yeterince değil.', e:{k:'success',t:'Simple advice',tt:'Basit tavsiye'} },
            { i:'Stresi anlat', s:'I’ve also been very stressed at work.', st:'İşte de çok stresliydim.', e:{k:'success',t:'Got to the cause',tt:'Nedene ulaşıldı'} } ] },
      { i:'İlaç işe yaramadı de', s:'I took painkillers, but they didn’t help at all.', st:'Ağrı kesici aldım ama hiç işe yaramadı.',
        r:'Then let’s look into this a little more carefully.', rt:'O zaman buna biraz daha dikkatli bakalım.', e:{k:'neutral',t:'Further checks',tt:'İleri kontrol'} } ] },

  { id:'hp-nurse', place:'hospital', level:'A1', title:'Talking to the nurse', titleTr:'Hemşireyle konuşmak', npc:'bennett',
    open:'Hello, I just need to check a few things. Your name?', openTr:'Merhaba, birkaç şeyi kontrol etmem gerek. Adınız?',
    br:[
      { i:'Adını söyle', s:'My name is Sam Taylor.', st:'Adım Sam Taylor.', a:['I’m Sam Taylor'],
        r:'Thank you. And your date of birth?', rt:'Teşekkürler. Doğum tarihiniz?', e:{k:'success',t:'Checked in',tt:'Kaydedildi'} },
      { i:'Yardım iste', s:'Sorry, could you speak a little slower?', st:'Pardon, biraz daha yavaş konuşur musunuz?',
        r:'Of course. What… is… your… name?', rt:'Tabii. Adınız… nedir?', e:{k:'success',t:'Understood',tt:'Anlaşıldı'} } ] },

  { id:'hp-form', place:'hospital', level:'B1', title:'Filling a medical form', titleTr:'Tıbbi form doldurmak', npc:'bennett',
    open:'Could you help me complete this form? Any allergies?', openTr:'Bu formu doldurmama yardım eder misiniz? Alerjiniz var mı?',
    br:[
      { i:'Alerjini söyle', s:'Yes, I’m allergic to penicillin.', st:'Evet, penisiline alerjim var.', a:['I’m allergic to penicillin'],
        r:'Important to know. Any current medication?', rt:'Bilmek önemli. Şu an kullandığınız ilaç?',
        f:[ { i:'İlaç kullanıyorum de', s:'Yes, I take tablets for blood pressure.', st:'Evet, tansiyon için hap alıyorum.', e:{k:'success',t:'Form complete',tt:'Form tamam'} },
            { i:'Hiç yok de', s:'No, I’m not taking anything at the moment.', st:'Hayır, şu an hiçbir şey almıyorum.', e:{k:'success',t:'Form complete',tt:'Form tamam'} } ] },
      { i:'Alerjim yok de', s:'No allergies that I know of.', st:'Bildiğim kadarıyla alerjim yok.',
        r:'Good. Let’s move to the next section.', rt:'Güzel. Sonraki bölüme geçelim.', e:{k:'neutral',t:'Next section',tt:'Sonraki bölüm'} } ] },

  { id:'hp-injury', place:'hospital', level:'B1', title:'Helping an injured person', titleTr:'Yaralıya yardım', npc:'bennett',
    open:'You brought your friend in — what happened?', openTr:'Arkadaşınızı getirdiniz — ne oldu?', emo:'concerned',
    br:[
      { i:'Durumu anlat', s:'She fell and hurt her ankle — she can’t walk on it.', st:'Düştü ve ayak bileğini incitti — üzerine basamıyor.', a:['She fell and hurt her ankle'],
        r:'Let’s get her an X-ray. When did it happen?', rt:'Ona röntgen çekelim. Ne zaman oldu?', e:{k:'problem-solved',t:'Getting help',tt:'Yardım geliyor'} },
      { i:'Yardım iste', s:'Please, she’s in a lot of pain — can someone help now?', st:'Lütfen, çok acı çekiyor — biri hemen yardım edebilir mi?',
        r:'A nurse is coming right away. Stay calm.', rt:'Hemşire hemen geliyor. Sakin olun.', e:{k:'success',t:'Nurse coming',tt:'Hemşire geliyor'} } ] },

  { id:'hp-results', place:'hospital', level:'B1', title:'Asking about results', titleTr:'Sonuçları sormak', npc:'bennett',
    open:'Your test results are back. Shall we go through them?', openTr:'Tahlil sonuçlarınız geldi. Beraber bakalım mı?',
    br:[
      { i:'Sonuçları sor', s:'Yes please — is everything alright?', st:'Evet lütfen — her şey yolunda mı?', a:['Is everything okay with the results'],
        r:'Nothing serious. I’ll explain the details.', rt:'Ciddi bir şey yok. Ayrıntıları açıklayayım.', e:{k:'success',t:'Reassured',tt:'İçin rahat'} },
      { i:'Sonraki adımı sor', s:'What should I do next to feel better?', st:'Daha iyi hissetmek için sırada ne yapmalıyım?',
        r:'Rest, fluids, and come back in a week if needed.', rt:'Dinlenme, sıvı ve gerekirse bir haftaya geri gelin.', e:{k:'success',t:'Clear plan',tt:'Net plan'} } ] },

  // ---------------- PHARMACY ----------------
  { id:'ph-cough', place:'pharmacy', level:'A1', title:'Something for a cough', titleTr:'Öksürük için bir şey', npc:'fatima',
    open:'Hello, what can I help you with?', openTr:'Merhaba, ne için yardımcı olabilirim?',
    br:[
      { i:'Öksürük şurubu iste', s:'Do you have something for a cough?', st:'Öksürük için bir şeyiniz var mı?', a:['Something for a cough please'],
        r:'This syrup works well. One spoon at night.', rt:'Bu şurup iyi gelir. Gece bir kaşık.', e:{k:'success',t:'Sorted',tt:'Halledildi'} },
      { i:'Doğal bir şey iste', s:'Do you have anything more natural, like herbal?', st:'Bitkisel gibi daha doğal bir şeyiniz var mı?',
        r:'Yes, these honey-lemon lozenges are gentle.', rt:'Evet, bu bal-limonlu pastiller yumuşak.', e:{k:'success',t:'Natural choice',tt:'Doğal seçim'} } ] },

  { id:'ph-dosage', place:'pharmacy', level:'A2', title:'How to take medicine', titleTr:'İlacı nasıl almalı', npc:'fatima',
    open:'Here’s your medicine. Do you have any questions?', openTr:'İşte ilacınız. Sorunuz var mı?',
    br:[
      { i:'Nasıl alınır sor', s:'How many times a day should I take it?', st:'Günde kaç kez almalıyım?', a:['How often do I take it'],
        r:'Twice a day, after meals, for one week.', rt:'Günde iki kez, yemeklerden sonra, bir hafta.',
        f:[ { i:'Yemekle mi sor', s:'Should I take it with food or before?', st:'Yemekle mi önce mi almalıyım?', e:{k:'success',t:'Clear instructions',tt:'Net talimat'} },
            { i:'Teşekkür et', s:'Great, that’s clear. Thank you.', st:'Harika, anlaşıldı. Teşekkürler.', e:{k:'success',t:'Understood',tt:'Anlaşıldı'} } ] },
      { i:'Yan etki sor', s:'Are there any side effects I should know about?', st:'Bilmem gereken yan etki var mı?',
        r:'It may cause mild drowsiness — avoid driving.', rt:'Hafif uyku yapabilir — araç kullanmayın.', e:{k:'success',t:'Well informed',tt:'İyi bilgilendin'} } ] },

  { id:'ph-prescription', place:'pharmacy', level:'B1', title:'A prescription problem', titleTr:'Reçete sorunu', npc:'fatima',
    open:'Let me check this prescription… hmm.', openTr:'Bu reçeteye bakayım… hmm.', emo:'concerned',
    br:[
      { i:'Sorun ne diye sor', s:'Is there a problem with my prescription?', st:'Reçetemde bir sorun mu var?', a:['Is there a problem with it'],
        r:'This medicine is out of stock, I’m afraid.', rt:'Maalesef bu ilaç stokta yok.',
        f:[ { i:'Alternatif sor', s:'Is there an alternative I could take?', st:'Alabileceğim bir alternatif var mı?', e:{k:'problem-solved',t:'Alternative found',tt:'Alternatif bulundu'} },
            { i:'Ne zaman gelir sor', s:'When will it be back in stock?', st:'Ne zaman tekrar stoğa girer?', e:{k:'neutral',t:'Come back later',tt:'Sonra gel'} } ] },
      { i:'Başka eczane sor', s:'Could another pharmacy have it in stock?', st:'Başka bir eczanede stokta olabilir mi?',
        r:'Yes, try the one on Market Street.', rt:'Evet, Market Caddesi’ndekini deneyin.', e:{k:'success',t:'Pointed elsewhere',tt:'Başka yere yönlendi'} } ] },

  { id:'ph-firstaid', place:'pharmacy', level:'A2', title:'First-aid supplies', titleTr:'İlk yardım malzemesi', npc:'fatima',
    open:'Hi there, how can I help?', openTr:'Merhaba, nasıl yardımcı olabilirim?',
    br:[
      { i:'Yara bandı iste', s:'I need some plasters and antiseptic, please.', st:'Biraz yara bandı ve antiseptik gerekiyor, lütfen.', a:['Plasters and antiseptic please'],
        r:'Here you go. Anything for the pain?', rt:'Buyurun. Ağrı için bir şey?', e:{k:'success',t:'Kit sorted',tt:'Set hazır'} },
      { i:'Yanık kremi iste', s:'Do you have anything for a small burn?', st:'Küçük bir yanık için bir şeyiniz var mı?',
        r:'Yes, this cooling gel is perfect.', rt:'Evet, bu serinletici jel ideal.', e:{k:'success',t:'Burn care',tt:'Yanık bakımı'} } ] }
]);
