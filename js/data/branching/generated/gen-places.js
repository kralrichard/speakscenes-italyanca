import { miniAll } from '../miniBuilder.js';

// Scenarios for the newly-opened environments: school, gym, museum,
// post office, library, seaside.
export const PLACES = miniAll([
  // ---------------- SCHOOL ----------------
  { id:'sc-late', place:'school', level:'A2', title:'Explaining you’re late', titleTr:'Geç kaldığını açıklamak', npc:'mslee',
    open:'You’re a little late this morning. Is everything okay?', openTr:'Bu sabah biraz geç kaldın. Her şey yolunda mı?', emo:'concerned',
    br:[
      { i:'Özür dile ve açıkla', s:'I’m sorry, the bus was delayed this morning.', st:'Özür dilerim, otobüs bu sabah geç kaldı.', a:['Sorry, the bus was late'],
        r:'That’s alright. Take your seat and catch up.', rt:'Sorun değil. Yerine geç ve arayı kapat.', e:{k:'success',t:'Forgiven',tt:'Affedildin'} },
      { i:'Ödevini sor', s:'Sorry! Did I miss the homework instructions?', st:'Pardon! Ödev talimatlarını kaçırdım mı?',
        r:'A little — see me after class and I’ll explain.', rt:'Biraz — dersten sonra gel, açıklarım.', e:{k:'success',t:'Will catch up',tt:'Arayı kapatacaksın'} } ] },

  { id:'sc-question', place:'school', level:'B1', title:'Asking a question in class', titleTr:'Derste soru sormak', npc:'mslee',
    open:'Does anyone have questions before we continue?', openTr:'Devam etmeden önce sorusu olan var mı?',
    br:[
      { i:'Anlamadığını söyle', s:'Yes, could you explain that last part again?', st:'Evet, o son kısmı tekrar açıklar mısınız?', a:['Can you explain the last part again'],
        r:'Of course — let me put it another way.', rt:'Tabii — başka türlü anlatayım.', e:{k:'success',t:'Cleared up',tt:'Anlaşıldı'} },
      { i:'Örnek iste', s:'Could you give us an example of that?', st:'Bize bunun bir örneğini verir misiniz?',
        r:'Great question — here’s a real-life one.', rt:'Harika soru — işte gerçek hayattan biri.', e:{k:'excellent',t:'Great question',tt:'Harika soru',rel:1} } ] },

  { id:'sc-project', place:'school', level:'B1', title:'A group project', titleTr:'Grup projesi', npc:'leo',
    open:'So, how should we split up the project?', openTr:'Peki, projeyi nasıl bölüşelim?',
    br:[
      { i:'Görev öner', s:'How about I do the research and you do the slides?', st:'Ben araştırmayı, sen slaytları yapsan nasıl olur?', a:['I’ll research, you do the slides'],
        r:'Sounds fair. When shall we meet again?', rt:'Adil. Tekrar ne zaman buluşalım?', e:{k:'relationship',t:'Good teamwork',tt:'İyi takım çalışması',rel:1} },
      { i:'Yardım teklif et', s:'I’m happy to help with whatever you find hardest.', st:'En zor bulduğun şeyde yardıma hazırım.',
        r:'Thanks! Presentations scare me, honestly.', rt:'Sağ ol! Açıkçası sunumlar beni korkutuyor.', e:{k:'relationship',t:'Supportive partner',tt:'Destekleyici ortak',rel:1} } ] },

  { id:'sc-enrol', place:'school', level:'A2', title:'Signing up for a course', titleTr:'Kursa kaydolmak', npc:'mslee',
    open:'Hello! Are you here to enrol in a class?', openTr:'Merhaba! Bir derse kaydolmaya mı geldin?',
    br:[
      { i:'Kaydolmak iste', s:'Yes, I’d like to join the English evening class.', st:'Evet, akşam İngilizce sınıfına katılmak istiyorum.', a:['I want to join the English class'],
        r:'Wonderful. What’s your level, roughly?', rt:'Harika. Seviyen kabaca nedir?', e:{k:'success',t:'Enrolled',tt:'Kaydoldun'} },
      { i:'Program sor', s:'When exactly does the class meet?', st:'Ders tam olarak ne zaman?',
        r:'Tuesdays and Thursdays, seven to nine.', rt:'Salı ve Perşembe, yediden dokuza.', e:{k:'success',t:'Good to know',tt:'İyi bilgi'} } ] },

  { id:'sc-grade', place:'school', level:'B2', title:'Discussing a grade', titleTr:'Notu konuşmak', npc:'mslee',
    open:'You wanted to talk about your essay grade?', openTr:'Kompozisyon notunu konuşmak mı istedin?',
    br:[
      { i:'Nazikçe itiraz et', s:'Yes — I felt my argument was stronger than the grade shows.', st:'Evet — savımın nottan daha güçlü olduğunu düşündüm.', a:['I think my essay deserved a higher grade'],
        r:'Let’s look together. Show me your main point.', rt:'Beraber bakalım. Ana fikrini göster.',
        f:[ { i:'Fikrini savun', s:'Here — I supported it with two clear examples.', st:'İşte — iki net örnekle destekledim.', e:{k:'excellent',t:'Well argued',tt:'İyi savundun',rel:1} },
            { i:'Nasıl gelişir sor', s:'How could I make it stronger next time?', st:'Bir dahakine nasıl güçlendirebilirim?', e:{k:'success',t:'Growth mindset',tt:'Gelişim odağı'} } ] },
      { i:'Geri bildirim iste', s:'Could you tell me where I lost the most marks?', st:'En çok nerede puan kaybettiğimi söyler misiniz?',
        r:'Mainly the conclusion — it needed a clearer finish.', rt:'Çoğunlukla sonuç — daha net bir kapanış gerekiyordu.', e:{k:'success',t:'Clear feedback',tt:'Net geri bildirim'} } ] },

  // ---------------- GYM ----------------
  { id:'g-join', place:'gym', level:'A2', title:'Joining the gym', titleTr:'Spor salonuna üyelik', npc:'coach',
    open:'Hey there! Thinking about joining us?', openTr:'Selam! Bize katılmayı mı düşünüyorsun?',
    br:[
      { i:'Üyelik sor', s:'Yes, how much is a monthly membership?', st:'Evet, aylık üyelik ne kadar?', a:['How much is a monthly membership'],
        r:'Thirty euros, and the first class is free.', rt:'Otuz euro, ilk ders ücretsiz.', e:{k:'success',t:'Signed up',tt:'Üye oldun'} },
      { i:'Deneme iste', s:'Could I try a session before I decide?', st:'Karar vermeden bir seans deneyebilir miyim?',
        r:'Absolutely — come to the six o’clock class.', rt:'Kesinlikle — altı dersine gel.', e:{k:'success',t:'Free trial',tt:'Ücretsiz deneme'} } ] },

  { id:'g-plan', place:'gym', level:'B1', title:'Asking for a workout plan', titleTr:'Antrenman planı istemek', npc:'coach',
    open:'What are your fitness goals?', openTr:'Fitness hedeflerin neler?',
    br:[
      { i:'Hedefini söyle', s:'I want to build strength and feel more energetic.', st:'Güç kazanmak ve daha enerjik hissetmek istiyorum.', a:['I want to get stronger and more energetic'],
        r:'Great goal. Let’s start with three days a week.', rt:'Harika hedef. Haftada üç günle başlayalım.',
        f:[ { i:'Ekipman sor', s:'Which machines should I focus on?', st:'Hangi aletlere odaklanmalıyım?', e:{k:'success',t:'Plan made',tt:'Plan yapıldı'} },
            { i:'Yavaş başla de', s:'Could we start gently? I’m a beginner.', st:'Hafif başlayabilir miyiz? Yeniyim.', e:{k:'success',t:'Beginner-friendly',tt:'Yeni başlayana uygun'} } ] },
      { i:'Beslenme sor', s:'Any advice on what I should eat?', st:'Ne yemem gerektiğine dair tavsiyen var mı?',
        r:'Plenty of protein and water — keep it simple.', rt:'Bol protein ve su — basit tut.', e:{k:'success',t:'Good advice',tt:'İyi tavsiye'} } ] },

  { id:'g-injury', place:'gym', level:'B1', title:'A small injury', titleTr:'Küçük bir sakatlık', npc:'coach',
    open:'You’re holding your shoulder — everything okay?', openTr:'Omzunu tutuyorsun — her şey yolunda mı?', emo:'concerned',
    br:[
      { i:'Ağrıyı söyle', s:'My shoulder hurts a bit when I lift.', st:'Kaldırırken omzum biraz ağrıyor.', a:['My shoulder hurts when I lift'],
        r:'Let’s stop that exercise and try a lighter one.', rt:'O egzersizi bırakıp daha hafifini deneyelim.', e:{k:'problem-solved',t:'Adjusted safely',tt:'Güvenle ayarlandı'} },
      { i:'Isınma sor', s:'Maybe I didn’t warm up enough. What should I do?', st:'Belki yeterince ısınmadım. Ne yapmalıyım?',
        r:'Good thinking — let’s add five minutes of warm-up.', rt:'İyi düşünce — beş dakika ısınma ekleyelim.', e:{k:'success',t:'Learned the lesson',tt:'Ders alındı'} } ] },

  { id:'g-class', place:'gym', level:'A2', title:'Booking a class', titleTr:'Ders ayırtmak', npc:'coach',
    open:'Interested in our group classes?', openTr:'Grup derslerimizle ilgilenir misin?',
    br:[
      { i:'Yoga sor', s:'Yes! When is the next yoga class?', st:'Evet! Bir sonraki yoga dersi ne zaman?', a:['When is the next yoga class'],
        r:'Tomorrow at nine. Shall I book you in?', rt:'Yarın dokuzda. Seni yazayım mı?', e:{k:'success',t:'Booked',tt:'Ayarlandı'} },
      { i:'Seviye sor', s:'Is it suitable for complete beginners?', st:'Tam yeni başlayanlara uygun mu?',
        r:'Perfectly — everyone starts somewhere!', rt:'Kesinlikle — herkes bir yerden başlar!', e:{k:'success',t:'Beginner welcome',tt:'Yeni başlayan hoş geldi'} } ] },

  // ---------------- MUSEUM ----------------
  { id:'m-ticket', place:'museum', level:'A1', title:'Buying a museum ticket', titleTr:'Müze bileti almak', npc:'ava',
    open:'Welcome! One ticket, or a group?', openTr:'Hoş geldiniz! Bir bilet mi grup mu?',
    br:[
      { i:'Bir bilet iste', s:'One adult ticket, please.', st:'Bir yetişkin bileti, lütfen.', a:['One ticket please'],
        r:'That’s twelve euros. Enjoy the exhibits!', rt:'On iki euro. Sergilerin tadını çıkarın!', e:{k:'success',t:'Ticket bought',tt:'Bilet alındı'} },
      { i:'İndirim sor', s:'Do you offer a student discount?', st:'Öğrenci indiriminiz var mı?',
        r:'We do — eight euros with a student card.', rt:'Var — öğrenci kartıyla sekiz euro.', e:{k:'success',t:'Cheaper entry',tt:'Daha ucuz giriş'} } ] },

  { id:'m-tour', place:'museum', level:'B1', title:'Joining a guided tour', titleTr:'Rehberli tura katılmak', npc:'ava',
    open:'Would you like to join our guided tour?', openTr:'Rehberli turumuza katılmak ister misiniz?',
    br:[
      { i:'Tur sor', s:'Yes — how long does the tour take?', st:'Evet — tur ne kadar sürüyor?', a:['How long is the tour'],
        r:'About an hour. It starts in five minutes.', rt:'Yaklaşık bir saat. Beş dakikaya başlıyor.',
        f:[ { i:'Katıl', s:'Perfect, I’ll join. Where do we meet?', st:'Mükemmel, katılıyorum. Nerede buluşuyoruz?', e:{k:'success',t:'On the tour',tt:'Turdasın'} },
            { i:'Fotoğraf sor', s:'Am I allowed to take photos during the tour?', st:'Tur sırasında fotoğraf çekebilir miyim?', e:{k:'success',t:'Good to check',tt:'Sormak iyi oldu'} } ] },
      { i:'Kendim gezerim de', s:'I’d rather explore on my own, thanks.', st:'Kendi başıma gezmeyi tercih ederim, teşekkürler.',
        r:'Of course — here’s a map to guide you.', rt:'Tabii — size yol gösterecek bir harita.', e:{k:'neutral',t:'Solo explorer',tt:'Tek başına gezgin'} } ] },

  { id:'m-lost', place:'museum', level:'A2', title:'Finding an exhibit', titleTr:'Bir sergiyi bulmak', npc:'ava',
    open:'Can I help you find something?', openTr:'Bir şey bulmanıza yardım edeyim mi?',
    br:[
      { i:'Sergiyi sor', s:'Yes, where is the Egyptian exhibit?', st:'Evet, Mısır sergisi nerede?', a:['Where is the Egyptian exhibit'],
        r:'Upstairs, second room on the right.', rt:'Üst katta, sağdaki ikinci oda.', e:{k:'success',t:'Found it',tt:'Bulundu'} },
      { i:'Öneri iste', s:'What’s the most famous piece here?', st:'Buradaki en ünlü eser ne?',
        r:'The ancient gold mask — don’t miss it!', rt:'Antik altın maske — kaçırmayın!', e:{k:'success',t:'Must-see',tt:'Görülmeli'} } ] },

  // ---------------- POST OFFICE ----------------
  { id:'p-send', place:'postoffice', level:'A2', title:'Sending a parcel', titleTr:'Koli göndermek', npc:'pat',
    open:'Next, please. What can I do for you?', openTr:'Sıradaki, lütfen. Sizin için ne yapabilirim?',
    br:[
      { i:'Koli gönder', s:'I’d like to send this parcel to Germany.', st:'Bu koliyi Almanya’ya göndermek istiyorum.', a:['I want to send this parcel to Germany'],
        r:'Standard or express delivery?', rt:'Standart mı ekspres mi?',
        f:[ { i:'Ekspres iste', s:'Express, please — it’s urgent.', st:'Ekspres, lütfen — acil.', e:{k:'success',t:'Sent fast',tt:'Hızlı gönderildi'} },
            { i:'Ucuzu iste', s:'The cheapest option is fine, thanks.', st:'En ucuz seçenek uygun, teşekkürler.', e:{k:'success',t:'Sent',tt:'Gönderildi'} } ] },
      { i:'Fiyat sor', s:'How much does it cost to send it abroad?', st:'Yurt dışına göndermek ne kadar?',
        r:'It depends on the weight — let me check.', rt:'Ağırlığa bağlı — bakayım.', e:{k:'neutral',t:'Price checked',tt:'Fiyat öğrenildi'} } ] },

  { id:'p-stamps', place:'postoffice', level:'A1', title:'Buying stamps', titleTr:'Pul almak', npc:'pat',
    open:'Hello! How can I help?', openTr:'Merhaba! Nasıl yardımcı olabilirim?',
    br:[
      { i:'Pul iste', s:'Could I have five stamps for postcards, please?', st:'Kartpostal için beş pul alabilir miyim, lütfen?', a:['Five stamps for postcards please'],
        r:'Here you are — that’s five euros.', rt:'Buyurun — beş euro.', e:{k:'success',t:'Stamps bought',tt:'Pul alındı'} },
      { i:'Kutu sor', s:'And where’s the nearest postbox?', st:'Bir de en yakın posta kutusu nerede?',
        r:'Just outside, to the left of the door.', rt:'Hemen dışarıda, kapının solunda.', e:{k:'success',t:'Ready to post',tt:'Postaya hazır'} } ] },

  { id:'p-pickup', place:'postoffice', level:'B1', title:'Collecting a package', titleTr:'Paket teslim almak', npc:'pat',
    open:'You have a package to collect? I’ll need some ID.', openTr:'Teslim alınacak paketiniz mi var? Kimlik lazım.',
    br:[
      { i:'Kimliği ver', s:'Yes, here’s my ID and the collection slip.', st:'Evet, işte kimliğim ve teslim fişim.', a:['Here’s my ID and slip'],
        r:'Perfect. One moment, I’ll fetch it.', rt:'Mükemmel. Bir dakika, getireyim.', e:{k:'success',t:'Package collected',tt:'Paket alındı'} },
      { i:'Fiş yok de', s:'I’ve lost the slip, but I have the tracking number.', st:'Fişi kaybettim ama takip numaram var.',
        r:'That works too — read it out for me.', rt:'O da olur — bana okuyun.', e:{k:'problem-solved',t:'Found anyway',tt:'Yine de bulundu'} } ] },

  // ---------------- LIBRARY ----------------
  { id:'l-join', place:'library', level:'A2', title:'Getting a library card', titleTr:'Kütüphane kartı almak', npc:'ruth',
    open:'Hello. Would you like to become a member?', openTr:'Merhaba. Üye olmak ister misiniz?',
    br:[
      { i:'Üye ol', s:'Yes, how do I get a library card?', st:'Evet, kütüphane kartını nasıl alırım?', a:['How do I get a library card'],
        r:'Just fill in this form and show some ID.', rt:'Bu formu doldurup kimlik gösterin yeter.', e:{k:'success',t:'Member now',tt:'Artık üyesin'} },
      { i:'Ödünç sor', s:'How many books can I borrow at once?', st:'Aynı anda kaç kitap ödünç alabilirim?',
        r:'Up to five, for three weeks each.', rt:'Beş taneye kadar, her biri üç hafta.', e:{k:'success',t:'Good to know',tt:'İyi bilgi'} } ] },

  { id:'l-find', place:'library', level:'B1', title:'Finding a book', titleTr:'Kitap bulmak', npc:'ruth',
    open:'Looking for anything in particular?', openTr:'Özellikle bir şey mi arıyorsunuz?',
    br:[
      { i:'Kitap sor', s:'Yes, do you have any books on learning English?', st:'Evet, İngilizce öğrenmeyle ilgili kitabınız var mı?', a:['Do you have books on learning English'],
        r:'A whole section — let me show you.', rt:'Koca bir bölüm — göstereyim.', e:{k:'success',t:'Found the shelf',tt:'Raf bulundu'} },
      { i:'Sessiz yer sor', s:'Is there a quiet place I could study?', st:'Çalışabileceğim sessiz bir yer var mı?',
        r:'Yes, the reading room upstairs is silent.', rt:'Evet, üst kattaki okuma odası sessizdir.', e:{k:'success',t:'Study spot',tt:'Çalışma yeri'} } ] },

  { id:'l-late', place:'library', level:'B1', title:'A late book', titleTr:'Geciken kitap', npc:'ruth',
    open:'This book is a week overdue, I’m afraid.', openTr:'Maalesef bu kitabın iadesi bir hafta gecikti.', emo:'concerned',
    br:[
      { i:'Özür dile ve öde', s:'Oh, I’m sorry — how much is the late fee?', st:'Ah, özür dilerim — gecikme ücreti ne kadar?', a:['Sorry, how much is the fine'],
        r:'Just one euro. No harm done.', rt:'Sadece bir euro. Zararı yok.', e:{k:'success',t:'Fine paid',tt:'Ceza ödendi'} },
      { i:'Uzatma iste', s:'Sorry! Could I renew it for another week?', st:'Pardon! Bir hafta daha uzatabilir miyim?',
        r:'Of course, renewed until next Friday.', rt:'Tabii, gelecek cumaya kadar uzatıldı.', e:{k:'problem-solved',t:'Renewed',tt:'Uzatıldı'} } ] },

  // ---------------- SEASIDE ----------------
  { id:'be-rent', place:'seaside', level:'A2', title:'Renting a sunbed', titleTr:'Şezlong kiralamak', npc:'finn',
    open:'Morning! Fancy a spot on the beach?', openTr:'Günaydın! Sahilde bir yer ister misin?',
    br:[
      { i:'Şezlong kirala', s:'Yes, could I rent a sunbed and umbrella?', st:'Evet, bir şezlong ve şemsiye kiralayabilir miyim?', a:['Can I rent a sunbed and umbrella'],
        r:'Sure — that’s ten euros for the day.', rt:'Tabii — günlüğü on euro.', e:{k:'success',t:'Beach set up',tt:'Sahil hazır'} },
      { i:'Fiyat sor', s:'How much for two sunbeds for the afternoon?', st:'Öğleden sonra için iki şezlong ne kadar?',
        r:'Fifteen euros for the pair. Good deal!', rt:'İkisi on beş euro. İyi fiyat!', e:{k:'success',t:'Sorted',tt:'Halledildi'} } ] },

  { id:'be-icecream', place:'seaside', level:'A1', title:'Buying an ice cream', titleTr:'Dondurma almak', npc:'finn',
    open:'Hot day, huh? Ice cream?', openTr:'Sıcak gün, ha? Dondurma?',
    br:[
      { i:'Dondurma iste', s:'Yes please, a chocolate one.', st:'Evet lütfen, çikolatalı.', a:['A chocolate ice cream please'],
        r:'Good choice! One or two scoops?', rt:'İyi seçim! Bir mi iki top mu?', e:{k:'success',t:'Cooling off',tt:'Serinliyorsun'} },
      { i:'Çeşit sor', s:'What flavours do you have?', st:'Hangi çeşitleriniz var?',
        r:'Chocolate, vanilla, strawberry, and mango.', rt:'Çikolata, vanilya, çilek ve mango.', e:{k:'success',t:'Spoilt for choice',tt:'Seçim bol'} } ] },

  { id:'be-safety', place:'seaside', level:'B1', title:'Asking the lifeguard', titleTr:'Cankurtarana sormak', npc:'finn',
    open:'Careful out there — the current’s strong today.', openTr:'Dikkatli ol — bugün akıntı güçlü.', emo:'concerned',
    br:[
      { i:'Güvenli mi sor', s:'Is it safe to swim here right now?', st:'Şu an burada yüzmek güvenli mi?', a:['Is it safe to swim here'],
        r:'Stay between the flags and you’ll be fine.', rt:'Bayrakların arasında kal, sorun olmaz.', e:{k:'success',t:'Safe swimming',tt:'Güvenli yüzme'} },
      { i:'Çocuk için sor', s:'Is there a calmer area for my kids?', st:'Çocuklarım için daha sakin bir bölge var mı?',
        r:'Yes, the bay to the left is shallow and calm.', rt:'Evet, soldaki koy sığ ve sakin.', e:{k:'excellent',t:'Family safe',tt:'Aile için güvenli',rel:1} } ] }
]);
