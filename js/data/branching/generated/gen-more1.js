import { miniAll } from '../miniBuilder.js?v=5';

// More branching scenarios (fresh topics) for hotel / airport / restaurant /
// café / hospital / pharmacy.
export const MORE1 = miniAll([
  // HOTEL
  { id:'h2-phone', place:'hotel', level:'B1', title:'Booking a room by phone', titleTr:'Telefonla oda ayırtmak', npc:'grace',
    open:'Sunrise Hotel, good afternoon. How may I help?', openTr:'Sunrise Otel, iyi günler. Nasıl yardımcı olabilirim?',
    br:[
      { i:'Oda ayırt', s:'I’d like to book a double room for next weekend.', st:'Gelecek hafta sonu için çift kişilik oda ayırtmak istiyorum.', a:['I want to book a double room for next weekend'],
        r:'Certainly. For how many nights?', rt:'Elbette. Kaç gece için?', e:{k:'success',t:'Room booked',tt:'Oda ayarlandı'} },
      { i:'Müsaitlik sor', s:'Do you have any rooms free on the 14th?', st:'14’ünde boş odanız var mı?',
        r:'Let me check… yes, we have two left.', rt:'Bakayım… evet, iki tane kaldı.', e:{k:'success',t:'Availability confirmed',tt:'Müsaitlik onaylandı'} } ] },
  { id:'h2-laundry', place:'hotel', level:'A2', title:'Laundry service', titleTr:'Çamaşır servisi', npc:'daniel',
    open:'Housekeeping. What can I do for you?', openTr:'Kat hizmetleri. Sizin için ne yapabilirim?',
    br:[
      { i:'Çamaşır ver', s:'Could you wash and iron a shirt for tonight?', st:'Bu akşam için bir gömlek yıkayıp ütüler misiniz?', a:['Can you wash and iron a shirt by tonight'],
        r:'Of course, it’ll be ready by six.', rt:'Tabii, altıya hazır olur.', e:{k:'success',t:'Laundry sorted',tt:'Çamaşır halledildi'} },
      { i:'Fiyat sor', s:'How much do you charge per item?', st:'Parça başına ne kadar alıyorsunuz?',
        r:'Three euros a shirt, added to your bill.', rt:'Gömlek başına üç euro, faturaya eklenir.', e:{k:'neutral',t:'Price noted',tt:'Fiyat not edildi'} } ] },
  { id:'h2-concierge', place:'hotel', level:'B1', title:'Concierge tickets', titleTr:'Konsiyerj biletleri', npc:'grace',
    open:'Looking for something to do this evening?', openTr:'Bu akşam için bir aktivite mi arıyorsunuz?',
    br:[
      { i:'Tiyatro bileti iste', s:'Yes, could you get us two theatre tickets?', st:'Evet, bize iki tiyatro bileti alabilir misiniz?', a:['Can you get two theatre tickets'],
        r:'I’ll try — any preference on the show?', rt:'Deneyeyim — oyun tercihiniz var mı?',
        f:[ { i:'Öneri iste', s:'Whatever’s best — surprise us!', st:'En iyisi ne ise — bizi şaşırt!', e:{k:'excellent',t:'Great night out',tt:'Harika bir gece'} },
            { i:'Tarih belirt', s:'Something for tonight, if possible.', st:'Mümkünse bu geceye.', e:{k:'success',t:'Tickets sorted',tt:'Biletler ayarlandı'} } ] },
      { i:'Restoran öner iste', s:'Actually, could you recommend a good restaurant?', st:'Aslında iyi bir restoran önerir misiniz?',
        r:'The rooftop grill is wonderful — I’ll book it.', rt:'Çatı ızgara harika — ayarlayayım.', e:{k:'success',t:'Dinner booked',tt:'Yemek ayarlandı'} } ] },

  // AIRPORT
  { id:'a2-dutyfree', place:'airport', level:'A2', title:'At duty-free', titleTr:'Duty-free’de', npc:'omar',
    open:'Hello! Looking for anything in particular?', openTr:'Merhaba! Özellikle bir şey mi arıyorsunuz?',
    br:[
      { i:'Hediye sor', s:'Yes, I’m looking for a gift for my wife.', st:'Evet, eşime bir hediye arıyorum.', a:['I’m looking for a gift for my wife'],
        r:'This perfume is very popular. Shall I show you?', rt:'Bu parfüm çok popüler. Göstereyim mi?', e:{k:'success',t:'Gift found',tt:'Hediye bulundu'} },
      { i:'Sıvı kuralı sor', s:'Can I take this bottle onto the plane?', st:'Bu şişeyi uçağa alabilir miyim?',
        r:'Yes, sealed duty-free bags are allowed.', rt:'Evet, mühürlü duty-free poşetlerine izin var.', e:{k:'success',t:'Good to know',tt:'İyi bilgi'} } ] },
  { id:'a2-priority', place:'airport', level:'B1', title:'Priority boarding question', titleTr:'Öncelikli biniş sorusu', npc:'priya',
    open:'Boarding will begin shortly. Any questions?', openTr:'Biniş birazdan başlayacak. Sorunuz var mı?',
    br:[
      { i:'Öncelik sor', s:'I have a priority ticket — when do I board?', st:'Öncelikli biletim var — ne zaman biniyorum?', a:['I have priority, when do I board'],
        r:'You board first, right after families.', rt:'Ailelerin hemen ardından ilk siz binersiniz.', e:{k:'success',t:'Boarding first',tt:'İlk biniş'} },
      { i:'El bagajı sor', s:'Is there room for my cabin bag on board?', st:'Uçakta el bagajım için yer var mı?',
        r:'Plenty today — board whenever you’re ready.', rt:'Bugün bol yer var — hazır olunca binin.', e:{k:'success',t:'No worries',tt:'Sorun yok'} } ] },
  { id:'a2-rebook', place:'airport', level:'B2', title:'Rebooking a cancelled flight', titleTr:'İptal uçuşu yeniden ayırtmak', npc:'priya',
    open:'I’m afraid your flight has been cancelled.', openTr:'Maalesef uçuşunuz iptal edildi.', emo:'apologetic',
    br:[
      { i:'Alternatif iste', s:'What are my options to get there today?', st:'Bugün oraya varmak için seçeneklerim ne?', a:['What are my options to fly today'],
        r:'There’s a flight in four hours with seats.', rt:'Dört saat sonra koltuğu olan bir uçuş var.',
        f:[ { i:'Kabul et', s:'I’ll take it — please rebook me.', st:'Onu alıyorum — lütfen yeniden ayarlayın.', e:{k:'problem-solved',t:'Rebooked',tt:'Yeniden ayarlandı'} },
            { i:'Otel iste', s:'And can you cover a hotel if I fly tomorrow?', st:'Yarın uçarsam otel karşılar mısınız?', e:{k:'excellent',t:'Cared for',tt:'İlgilenildi'} } ] },
      { i:'İade iste', s:'Actually, I’d prefer a full refund instead.', st:'Aslında bunun yerine tam iade tercih ederim.',
        r:'Understood — I’ll process that now.', rt:'Anlaşıldı — şimdi işleme alıyorum.', e:{k:'success',t:'Refunded',tt:'İade edildi'} } ] },

  // RESTAURANT
  { id:'r2-diet', place:'restaurant', level:'B1', title:'A dietary request', titleTr:'Diyet isteği', npc:'elena',
    open:'Have you chosen, or shall I give you a minute?', openTr:'Seçtiniz mi, yoksa bir dakika vereyim mi?',
    br:[
      { i:'Vegan sor', s:'Which dishes here are completely vegan?', st:'Buradaki hangi yemekler tamamen vegan?', a:['Which dishes are vegan'],
        r:'The falafel bowl and the veggie curry.', rt:'Falafel kâsesi ve sebzeli köri.', e:{k:'success',t:'Vegan sorted',tt:'Vegan halledildi'} },
      { i:'Glutensiz sor', s:'Do you have gluten-free pasta available?', st:'Glutensiz makarnanız var mı?',
        r:'We do — just let the kitchen know.', rt:'Var — mutfağa haber verin yeter.', e:{k:'success',t:'Safe choice',tt:'Güvenli seçim'} } ] },
  { id:'r2-birthday', place:'restaurant', level:'A2', title:'A birthday surprise', titleTr:'Doğum günü sürprizi', npc:'elena',
    open:'Celebrating something special tonight?', openTr:'Bu akşam özel bir şey mi kutluyorsunuz?',
    br:[
      { i:'Sürpriz iste', s:'Yes! Could you bring a cake after the main course?', st:'Evet! Ana yemekten sonra bir pasta getirir misiniz?', a:['Can you bring a cake after the main'],
        r:'How lovely — with a candle, of course!', rt:'Ne güzel — tabii ki mumla!', e:{k:'relationship',t:'Sweet surprise',tt:'Tatlı sürpriz',rel:1} },
      { i:'Sessiz masa iste', s:'Could we have a quiet table for a special dinner?', st:'Özel bir yemek için sessiz bir masa alabilir miyiz?',
        r:'Absolutely — the corner booth is free.', rt:'Kesinlikle — köşe masası boş.', e:{k:'success',t:'Perfect spot',tt:'Mükemmel yer'} } ] },
  { id:'r2-takeaway', place:'restaurant', level:'A2', title:'Ordering takeaway', titleTr:'Paket sipariş', npc:'elena',
    open:'Eating in, or is this takeaway?', openTr:'İçeride mi yoksa paket mi?',
    br:[
      { i:'Paket iste', s:'Takeaway, please — two pizzas to go.', st:'Paket, lütfen — iki pizza götürmek için.', a:['Takeaway, two pizzas please'],
        r:'Ten minutes. Anything to drink with that?', rt:'On dakika. Yanında içecek?', e:{k:'success',t:'Order to go',tt:'Paket sipariş'} },
      { i:'Süre sor', s:'How long will it take if I wait?', st:'Beklersem ne kadar sürer?',
        r:'About fifteen minutes tonight.', rt:'Bu akşam yaklaşık on beş dakika.', e:{k:'neutral',t:'Worth the wait',tt:'Beklemeye değer'} } ] },

  // CAFÉ
  { id:'c2-loyalty', place:'cafe', level:'A1', title:'A loyalty card', titleTr:'Sadakat kartı', npc:'mia',
    open:'That’s your fifth coffee this week!', openTr:'Bu senin bu haftaki beşinci kahven!',
    br:[
      { i:'Kart sor', s:'Do you have a loyalty card I could get?', st:'Alabileceğim bir sadakat kartınız var mı?', a:['Do you have a loyalty card'],
        r:'We do — every tenth coffee is free!', rt:'Var — her onuncu kahve bedava!', e:{k:'success',t:'Card started',tt:'Kart başlatıldı'} },
      { i:'Bedava sor', s:'Have I earned a free one yet?', st:'Bedava bir tane hak ettim mi?',
        r:'Almost — one more and it’s on us!', rt:'Neredeyse — bir tane daha, o bizden!', e:{k:'success',t:'So close',tt:'Az kaldı'} } ] },
  { id:'c2-lost', place:'cafe', level:'B1', title:'Lost property in the café', titleTr:'Kafede kayıp eşya', npc:'mia',
    open:'Hi again — did you forget something?', openTr:'Tekrar merhaba — bir şey mi unuttun?',
    br:[
      { i:'Eşyayı sor', s:'Yes, I think I left my scarf here earlier.', st:'Evet, sanırım daha önce atkımı burada unuttum.', a:['I left my scarf here'],
        r:'A blue one? It’s behind the counter!', rt:'Mavi mi? Tezgâhın arkasında!', e:{k:'problem-solved',t:'Found it',tt:'Bulundu',rel:1} },
      { i:'Telefon sor', s:'Did anyone hand in a phone?', st:'Biri telefon teslim etti mi?',
        r:'Let me check the lost box… yes, here it is.', rt:'Kayıp kutusuna bakayım… evet, işte burada.', e:{k:'problem-solved',t:'Reunited',tt:'Kavuştun'} } ] },

  // HOSPITAL
  { id:'hp2-dentist', place:'hospital', level:'A2', title:'At the dentist', titleTr:'Dişçide', npc:'bennett',
    open:'What brings you in today?', openTr:'Bugün sizi buraya getiren nedir?',
    br:[
      { i:'Diş ağrısı de', s:'One of my teeth has been aching for days.', st:'Dişlerimden biri günlerdir ağrıyor.', a:['My tooth has been aching'],
        r:'Let’s take a look. Open wide, please.', rt:'Bir bakalım. Ağzınızı açın, lütfen.', e:{k:'success',t:'Getting treated',tt:'Tedavi ediliyor'} },
      { i:'Kontrol iste', s:'I’d just like a check-up and a cleaning.', st:'Sadece bir kontrol ve temizlik istiyorum.',
        r:'Good habit! Let’s get started.', rt:'İyi alışkanlık! Başlayalım.', e:{k:'success',t:'All healthy',tt:'Her şey sağlıklı'} } ] },
  { id:'hp2-eyetest', place:'hospital', level:'B1', title:'An eye test', titleTr:'Göz testi', npc:'bennett',
    open:'Please read the letters from the top line down.', openTr:'Lütfen harfleri en üst satırdan aşağıya okuyun.',
    br:[
      { i:'Zorlandığını söyle', s:'I can read the top, but the small ones are blurry.', st:'Üstü okuyabiliyorum ama küçükleri bulanık.', a:['The small letters are blurry'],
        r:'That’s useful. You may need mild glasses.', rt:'Bu faydalı. Hafif bir gözlük gerekebilir.', e:{k:'success',t:'Diagnosis clear',tt:'Teşhis net'} },
      { i:'Gözlük sor', s:'Would glasses fix this completely?', st:'Gözlük bunu tamamen düzeltir mi?',
        r:'They should make everything sharp again.', rt:'Her şeyi yeniden netleştirmeli.', e:{k:'success',t:'Reassured',tt:'İçin rahat'} } ] },

  // PHARMACY
  { id:'ph2-sunscreen', place:'pharmacy', level:'A2', title:'Choosing sunscreen', titleTr:'Güneş kremi seçmek', npc:'fatima',
    open:'Off to the beach? Can I help?', openTr:'Sahile mi? Yardım edeyim mi?',
    br:[
      { i:'Yüksek koruma iste', s:'Yes, I need a strong sunscreen for sensitive skin.', st:'Evet, hassas cilt için güçlü bir güneş kremi lazım.', a:['A strong sunscreen for sensitive skin'],
        r:'This factor 50 is gentle and effective.', rt:'Bu faktör 50 hem yumuşak hem etkili.', e:{k:'success',t:'Well protected',tt:'İyi korundun'} },
      { i:'Çocuk için sor', s:'Do you have one that’s safe for children?', st:'Çocuklar için güvenli olanınız var mı?',
        r:'Yes, this kids’ range is extra gentle.', rt:'Evet, bu çocuk serisi ekstra yumuşak.', e:{k:'success',t:'Family ready',tt:'Aile hazır'} } ] },
  { id:'ph2-vitamins', place:'pharmacy', level:'B1', title:'Asking about vitamins', titleTr:'Vitamin sormak', npc:'fatima',
    open:'Were you after supplements today?', openTr:'Bugün takviye mi bakıyordunuz?',
    br:[
      { i:'Yorgunluk için sor', s:'Yes, I’ve been tired — what would you suggest?', st:'Evet, yorgunum — ne önerirsiniz?', a:['I’ve been tired, what do you suggest'],
        r:'Vitamin D and iron often help. See a doctor if it lasts.', rt:'D vitamini ve demir genelde yardımcı olur. Sürerse doktora görünün.', e:{k:'success',t:'Sensible advice',tt:'Mantıklı tavsiye'} },
      { i:'Dozaj sor', s:'How many should I take each day?', st:'Günde kaç tane almalıyım?',
        r:'Just one with breakfast — don’t overdo it.', rt:'Kahvaltıyla bir tane — abartmayın.', e:{k:'success',t:'Clear guidance',tt:'Net yönlendirme'} } ] }
]);
