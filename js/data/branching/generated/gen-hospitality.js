import { miniAll } from '../miniBuilder.js';

// Compact branching scenarios for hotel / café / restaurant. Each is a real
// decision: choose an intent, speak it, the NPC reacts, and different choices
// reach different endings. Authored with the mini() builder (see miniBuilder.js).

export const HOSPITALITY = miniAll([
  // ---------------- HOTEL ----------------
  { id:'h-wakeup', place:'hotel', level:'A2', title:'A wake-up call', titleTr:'Uyandırma servisi', npc:'grace',
    open:'Front desk, good evening. How can I help you?', openTr:'Resepsiyon, iyi akşamlar. Nasıl yardımcı olabilirim?',
    br:[
      { i:'Uyandırma servisi iste', s:'Could I have a wake-up call at seven, please?', st:'Saat yedide uyandırma alabilir miyim, lütfen?', a:['Can I get a wake-up call at seven'],
        r:'Of course — seven o’clock. Anything else?', rt:'Tabii — saat yedi. Başka bir şey?', e:{k:'success',t:'Set for 7 AM',tt:'7’ye kuruldu'} },
      { i:'İki uyandırma iste', s:'Could I have two calls — at six and six thirty?', st:'İki arama alabilir miyim — altıda ve altı buçukta?',
        r:'Certainly, six and six thirty. Sleep well!', rt:'Elbette, altı ve altı buçuk. İyi uykular!', e:{k:'excellent',t:'Double alarm',tt:'Çift alarm'} } ] },

  { id:'h-pillow', place:'hotel', level:'A1', title:'An extra pillow', titleTr:'Fazladan yastık', npc:'grace',
    open:'Hello! Is everything comfortable in your room?', openTr:'Merhaba! Odanızda her şey rahat mı?',
    br:[
      { i:'Fazladan yastık iste', s:'Could I have an extra pillow, please?', st:'Fazladan bir yastık alabilir miyim, lütfen?', a:['Can I get another pillow'],
        r:'Right away — I’ll send one up.', rt:'Hemen — yukarı gönderiyorum.', e:{k:'success',t:'Pillow on the way',tt:'Yastık yolda'} },
      { i:'Battaniye de iste', s:'Actually, a blanket too, if possible.', st:'Aslında mümkünse bir de battaniye.',
        r:'No problem, a pillow and a blanket coming up.', rt:'Sorun değil, bir yastık ve bir battaniye geliyor.', e:{k:'success',t:'Cosy night',tt:'Rahat bir gece'} } ] },

  { id:'h-roomservice', place:'hotel', level:'A2', title:'Room service order', titleTr:'Oda servisi siparişi', npc:'daniel',
    open:'Room service, good evening. What would you like to order?', openTr:'Oda servisi, iyi akşamlar. Ne sipariş etmek istersiniz?',
    br:[
      { i:'Yemek siparişi ver', s:'I’d like a club sandwich and a bottle of water.', st:'Bir kulüp sandviç ve bir şişe su istiyorum.', a:['A club sandwich and some water please'],
        r:'Excellent choice. It’ll be about twenty minutes.', rt:'Harika seçim. Yaklaşık yirmi dakika sürer.',
        f:[ { i:'Teşekkür et', s:'Perfect, thank you very much.', st:'Mükemmel, çok teşekkürler.', e:{k:'success',t:'Order placed',tt:'Sipariş verildi'} },
            { i:'Acele olduğunu söyle', s:'Could you make it a bit quicker? I’m very hungry.', st:'Biraz daha hızlı olabilir mi? Çok açım.', e:{k:'problem-solved',t:'Rushed order',tt:'Hızlandırılmış sipariş'} } ] },
      { i:'Menü öner iste', s:'What do you recommend from the menu tonight?', st:'Bu akşam menüden ne önerirsiniz?',
        r:'The grilled salmon is very popular tonight.', rt:'Bu akşam ızgara somon çok popüler.', e:{k:'success',t:'Chef’s pick',tt:'Şefin önerisi'} } ] },

  { id:'h-luggage', place:'hotel', level:'A2', title:'Storing luggage', titleTr:'Bavul emanet', npc:'grace',
    open:'Good morning! Checking out already?', openTr:'Günaydın! Şimdiden çıkış mı yapıyorsunuz?',
    br:[
      { i:'Bavul bırakmak iste', s:'Yes, but could I leave my bags here until this evening?', st:'Evet ama bavullarımı bu akşama kadar burada bırakabilir miyim?', a:['Can I store my luggage until tonight'],
        r:'Of course, we’ll keep them safe. Here’s your ticket.', rt:'Tabii, güvenle saklarız. İşte biletiniz.', e:{k:'problem-solved',t:'Bags stored',tt:'Bavullar emanette'} },
      { i:'Taksi de iste', s:'And could you call me a taxi for eight tonight?', st:'Bir de bu akşam sekiz için taksi çağırır mısınız?',
        r:'Certainly, a taxi at eight and your bags are safe.', rt:'Elbette, sekizde taksi ve bavullarınız güvende.', e:{k:'excellent',t:'All arranged',tt:'Her şey ayarlandı'} } ] },

  { id:'h-spa', place:'hotel', level:'B1', title:'Booking the spa', titleTr:'Spa rezervasyonu', npc:'grace',
    open:'Welcome. Were you interested in our spa facilities?', openTr:'Hoş geldiniz. Spa olanaklarımızla ilgilenir misiniz?',
    br:[
      { i:'Masaj randevusu al', s:'Yes, I’d like to book a massage for tomorrow afternoon.', st:'Evet, yarın öğleden sonra için masaj randevusu almak istiyorum.', a:['Can I book a massage tomorrow afternoon'],
        r:'Lovely. We have two o’clock free. Shall I book it?', rt:'Harika. İki boş. Ayarlayayım mı?',
        f:[ { i:'Onayla', s:'Yes, two o’clock is perfect.', st:'Evet, saat iki mükemmel.', e:{k:'success',t:'Spa booked',tt:'Spa ayarlandı'} },
            { i:'Fiyat sor', s:'Before I confirm, how much does it cost?', st:'Onaylamadan önce, ne kadar tutuyor?', e:{k:'neutral',t:'Just checking',tt:'Sadece soruyorum'} } ] },
      { i:'Havuz saatini sor', s:'Actually, what time does the pool close?', st:'Aslında havuz saat kaçta kapanıyor?',
        r:'The pool is open until ten in the evening.', rt:'Havuz akşam ona kadar açık.', e:{k:'success',t:'Good to know',tt:'İyi bilgi'} } ] },

  { id:'h-lostkey', place:'hotel', level:'A2', title:'A locked-out key card', titleTr:'Çalışmayan kart', npc:'daniel',
    open:'You look puzzled — is something wrong?', openTr:'Şaşkın görünüyorsunuz — bir sorun mu var?',
    br:[
      { i:'Kartın çalışmadığını söyle', s:'My key card isn’t working on my door.', st:'Kart anahtarım kapımda çalışmıyor.', a:['My key card won’t open the door'],
        r:'I’m sorry — let me reactivate it for you now.', rt:'Üzgünüm — hemen yeniden etkinleştireyim.', e:{k:'problem-solved',t:'Back in',tt:'İçeri girdin'} },
      { i:'Kartı kaybettiğini söyle', s:'I think I’ve actually lost my key card.', st:'Sanırım aslında kart anahtarımı kaybettim.',
        r:'No worries, I’ll cancel it and print a new one.', rt:'Merak etmeyin, iptal edip yenisini basayım.', e:{k:'success',t:'New card',tt:'Yeni kart'} } ] },

  { id:'h-checkout', place:'hotel', level:'B1', title:'Express checkout', titleTr:'Hızlı çıkış', npc:'grace',
    open:'Good morning. Are you ready to check out?', openTr:'Günaydın. Çıkış yapmaya hazır mısınız?',
    br:[
      { i:'Fatura iste', s:'Yes. Could I have an itemized bill, please?', st:'Evet. Kalem kalem bir fatura alabilir miyim, lütfen?', a:['Can I get a detailed bill'],
        r:'Here it is. Everything looks in order?', rt:'İşte burada. Her şey yolunda mı?',
        f:[ { i:'Bir kalemi sorgula', s:'What’s this extra charge on the second line?', st:'İkinci satırdaki bu ek ücret nedir?', e:{k:'problem-solved',t:'Charge explained',tt:'Ücret açıklandı'} },
            { i:'Kartla öde', s:'It all looks right. I’ll pay by card.', st:'Hepsi doğru görünüyor. Kartla ödeyeceğim.', e:{k:'success',t:'Checked out',tt:'Çıkış yapıldı'} } ] },
      { i:'Geç çıkış iste', s:'Actually, could I check out a couple of hours later?', st:'Aslında birkaç saat sonra çıkabilir miyim?',
        r:'I can offer checkout until one, no charge.', rt:'Bire kadar ücretsiz çıkış verebilirim.', e:{k:'excellent',t:'Late checkout',tt:'Geç çıkış'} } ] },

  { id:'h-parking', place:'hotel', level:'A2', title:'Where to park', titleTr:'Nereye park edilir', npc:'daniel',
    open:'Good evening. Did you arrive by car?', openTr:'İyi akşamlar. Arabayla mı geldiniz?',
    br:[
      { i:'Otopark sor', s:'Yes, where can I park my car?', st:'Evet, arabamı nereye park edebilirim?', a:['Where is the parking'],
        r:'We have free parking behind the building.', rt:'Binanın arkasında ücretsiz otoparkımız var.', e:{k:'success',t:'Parked',tt:'Park edildi'} },
      { i:'Ücret sor', s:'Is there a charge for overnight parking?', st:'Gece boyu park için ücret var mı?',
        r:'It’s ten euros a night, added to your bill.', rt:'Gecesi on euro, faturanıza eklenir.', e:{k:'neutral',t:'Paid parking',tt:'Ücretli otopark'} } ] },

  { id:'h-restaurant-res', place:'hotel', level:'B1', title:'Reserving the restaurant', titleTr:'Restoran rezervasyonu', npc:'grace',
    open:'Would you like to dine with us this evening?', openTr:'Bu akşam bizimle yemek yemek ister misiniz?',
    br:[
      { i:'Masa ayırt', s:'Yes, could you reserve a table for two at eight?', st:'Evet, sekizde iki kişilik bir masa ayırır mısınız?', a:['A table for two at eight please'],
        r:'Booked. Any dietary requirements I should note?', rt:'Ayarlandı. Not almam gereken bir diyet var mı?',
        f:[ { i:'Alerjini belirt', s:'Yes, one of us is allergic to shellfish.', st:'Evet, birimiz kabuklu deniz ürünlerine alerjik.', e:{k:'excellent',t:'Table & noted',tt:'Masa ve not alındı'} },
            { i:'Yok de', s:'No, nothing special, thank you.', st:'Hayır, özel bir şey yok, teşekkürler.', e:{k:'success',t:'Table for two',tt:'İki kişilik masa'} } ] },
      { i:'Menü tipini sor', s:'What kind of food does the restaurant serve?', st:'Restoran ne tür yemek sunuyor?',
        r:'Mostly Mediterranean, with a daily special.', rt:'Çoğunlukla Akdeniz mutfağı, günlük spesyalle.', e:{k:'success',t:'Good to know',tt:'İyi bilgi'} } ] },

  { id:'h-currency', place:'hotel', level:'B1', title:'Changing money', titleTr:'Para bozdurma', npc:'daniel',
    open:'How can I help you this morning?', openTr:'Bu sabah nasıl yardımcı olabilirim?',
    br:[
      { i:'Döviz bozdur', s:'Do you exchange currency here at the desk?', st:'Burada, resepsiyonda döviz bozuyor musunuz?', a:['Can I change money here'],
        r:'We do, at today’s rate. How much would you like?', rt:'Bozuyoruz, bugünkü kurdan. Ne kadar istersiniz?', e:{k:'success',t:'Money changed',tt:'Para bozuldu'} },
      { i:'ATM sor', s:'Is there a cash machine nearby instead?', st:'Onun yerine yakınlarda bir bankamatik var mı?',
        r:'Yes, just across the street to the left.', rt:'Evet, hemen karşıda solda.', e:{k:'success',t:'Found an ATM',tt:'Bankamatik bulundu'} } ] },

  { id:'h-noise', place:'hotel', level:'B1', title:'A noisy neighbour', titleTr:'Gürültülü komşu', npc:'daniel',
    open:'You called about a problem — what’s happening?', openTr:'Bir sorun için aradınız — ne oluyor?', emo:'concerned',
    br:[
      { i:'Gürültüden şikâyet et', s:'The room next to mine is extremely loud and I can’t sleep.', st:'Yan odam aşırı gürültülü ve uyuyamıyorum.', a:['The next room is too loud, I can’t sleep'],
        r:'I’m sorry. I’ll speak to them, or move you — your choice.', rt:'Üzgünüm. Onlarla konuşurum ya da sizi taşırım — siz karar verin.',
        f:[ { i:'Taşınmak iste', s:'I’d rather move to a quieter room, please.', st:'Daha sessiz bir odaya taşınmayı tercih ederim, lütfen.', e:{k:'problem-solved',t:'Moved rooms',tt:'Oda değişti',rel:1} },
            { i:'Uyarmalarını iste', s:'Could you just ask them to be quieter?', st:'Sadece daha sessiz olmalarını isteyebilir misiniz?', e:{k:'success',t:'They were asked',tt:'Uyarıldılar'} } ] },
      { i:'Telafi iste', s:'This has ruined my night — I’d expect some compensation.', st:'Bu gecemi mahvetti — bir telafi beklerim.', tone:'formal', diff:'hard',
        r:'That’s fair. I’ll move you and discount tonight’s rate.', rt:'Bu adil. Sizi taşıyıp bu geceyi indireceğim.', e:{k:'excellent',t:'Moved & refunded',tt:'Taşındı ve indirim'} } ] },

  { id:'h-gym', place:'hotel', level:'A2', title:'Using the gym', titleTr:'Spor salonunu kullanmak', npc:'grace',
    open:'Good morning! Off for a workout?', openTr:'Günaydın! Antrenmana mı?',
    br:[
      { i:'Spor salonunu sor', s:'Yes, where is the hotel gym, and is it free?', st:'Evet, otel spor salonu nerede ve ücretsiz mi?', a:['Where is the gym, is it free'],
        r:'On the third floor, and yes, free for guests.', rt:'Üçüncü katta ve evet, misafirlere ücretsiz.', e:{k:'success',t:'Off to the gym',tt:'Spora'} },
      { i:'Açılış saatini sor', s:'What time does the gym open in the morning?', st:'Spor salonu sabah kaçta açılıyor?',
        r:'It opens at six and closes at eleven at night.', rt:'Altıda açılıp gece on birde kapanıyor.', e:{k:'success',t:'Early bird',tt:'Erkenci'} } ] },

  // ---------------- CAFÉ ----------------
  { id:'c-refill', place:'cafe', level:'A1', title:'A coffee refill', titleTr:'Kahve tazeleme', npc:'mia',
    open:'Hi! Would you like anything else?', openTr:'Selam! Başka bir şey ister misin?',
    br:[
      { i:'Bir kahve daha iste', s:'Could I have another coffee, please?', st:'Bir kahve daha alabilir miyim, lütfen?', a:['Can I get another coffee'],
        r:'Coming right up!', rt:'Hemen geliyor!', e:{k:'success',t:'Refilled',tt:'Tazelendi'} },
      { i:'Hesabı iste', s:'No thanks, could I have the bill?', st:'Hayır teşekkürler, hesabı alabilir miyim?',
        r:'Sure, that’s four euros fifty.', rt:'Tabii, dört euro elli.', e:{k:'success',t:'Paid up',tt:'Ödendi'} } ] },

  { id:'c-order-custom', place:'cafe', level:'A2', title:'A custom coffee', titleTr:'Özel kahve', npc:'mia',
    open:'What can I get started for you?', openTr:'Senin için ne hazırlayayım?',
    br:[
      { i:'Sütlü/az şekerli iste', s:'A latte with oat milk and no sugar, please.', st:'Yulaf sütlü, şekersiz bir latte, lütfen.', a:['Latte with oat milk, no sugar'],
        r:'Great — oat latte, no sugar. Anything to eat?', rt:'Harika — yulaflı latte, şekersiz. Yiyecek?',
        f:[ { i:'Kek ekle', s:'Yes, a slice of carrot cake too.', st:'Evet, bir dilim havuçlu kek de.', e:{k:'success',t:'Coffee & cake',tt:'Kahve ve kek'} },
            { i:'Yok de', s:'No, just the coffee, thanks.', st:'Hayır, sadece kahve, teşekkürler.', e:{k:'success',t:'Just coffee',tt:'Sadece kahve'} } ] },
      { i:'Öneri iste', s:'What’s your most popular drink?', st:'En popüler içeceğin ne?',
        r:'Everyone loves the caramel macchiato!', rt:'Herkes karamelli macchiato’ya bayılıyor!', e:{k:'success',t:'Tried the favourite',tt:'Favoriyi denedin'} } ] },

  { id:'c-wifi', place:'cafe', level:'A1', title:'Asking for the Wi-Fi', titleTr:'Wi-Fi sormak', npc:'mia',
    open:'Here’s your coffee — enjoy!', openTr:'İşte kahven — afiyet olsun!',
    br:[
      { i:'Wi-Fi şifresini sor', s:'Thanks! What’s the Wi-Fi password?', st:'Teşekkürler! Wi-Fi şifresi nedir?', a:['What is the wifi password'],
        r:'It’s on the receipt, at the bottom.', rt:'Fişin altında yazıyor.', e:{k:'success',t:'Online',tt:'Bağlandın'} },
      { i:'Priz sor', s:'Is there a power socket near a table?', st:'Bir masanın yanında priz var mı?',
        r:'Yes, by the window seats.', rt:'Evet, pencere kenarındaki koltuklarda.', e:{k:'success',t:'Plugged in',tt:'Fişe takıldı'} } ] },

  { id:'c-complaint', place:'cafe', level:'B1', title:'A cold coffee', titleTr:'Soğuk kahve', npc:'mia',
    open:'Is everything okay with your drink?', openTr:'İçeceğinle ilgili her şey yolunda mı?', emo:'curious',
    br:[
      { i:'Soğuk olduğunu söyle', s:'Actually, my coffee is a bit cold.', st:'Aslında kahvem biraz soğuk.', a:['My coffee is cold'],
        r:'Oh, I’m sorry! Let me make you a fresh one.', rt:'Ah, özür dilerim! Sana taze bir tane yapayım.', e:{k:'problem-solved',t:'Fresh cup',tt:'Taze fincan',rel:1} },
      { i:'Yanlış içecek de', s:'I think this isn’t what I ordered.', st:'Sanırım bu sipariş ettiğim şey değil.',
        r:'So sorry — what did you order? I’ll fix it.', rt:'Çok özür dilerim — ne sipariş etmiştin? Düzeltirim.', e:{k:'problem-solved',t:'Sorted kindly',tt:'Nazikçe çözüldü',rel:1} } ] },

  { id:'c-meet', place:'cafe', level:'A2', title:'Meeting a colleague', titleTr:'Bir meslektaşla buluşma', npc:'hannah',
    open:'Hey! Thanks for meeting me. How are things?', openTr:'Selam! Buluştuğun için sağ ol. Nasıl gidiyor?',
    br:[
      { i:'İyi olduğunu söyle', s:'Really good, thanks! Busy but happy.', st:'Gerçekten iyi, teşekkürler! Yoğun ama mutluyum.', a:['Good thanks, busy but happy'],
        r:'That’s great to hear. Shall we order first?', rt:'Bunu duymak güzel. Önce sipariş verelim mi?', e:{k:'relationship',t:'Nice catch-up',tt:'Güzel bir sohbet',rel:1} },
      { i:'Yorgun olduğunu söyle', s:'Honestly, a bit tired — work has been hectic.', st:'Açıkçası biraz yorgun — iş çok yoğundu.',
        r:'I know the feeling. Let’s relax with a coffee.', rt:'O hissi bilirim. Bir kahveyle rahatlayalım.', e:{k:'relationship',t:'A friendly ear',tt:'Dost bir kulak',rel:1} } ] },

  // ---------------- RESTAURANT ----------------
  { id:'r-book', place:'restaurant', level:'A2', title:'Booking a table', titleTr:'Masa ayırtmak', npc:'elena',
    open:'Good evening, do you have a reservation?', openTr:'İyi akşamlar, rezervasyonunuz var mı?',
    br:[
      { i:'Masa ayırt', s:'No, but do you have a table for two?', st:'Hayır ama iki kişilik bir masanız var mı?', a:['A table for two please'],
        r:'We do — by the window or inside?', rt:'Var — pencere kenarı mı içeride mi?',
        f:[ { i:'Pencere kenarı iste', s:'By the window would be lovely.', st:'Pencere kenarı harika olur.', e:{k:'success',t:'Best seat',tt:'En iyi koltuk'} },
            { i:'Sessiz yer iste', s:'Somewhere quiet, if possible.', st:'Mümkünse sessiz bir yer.', e:{k:'success',t:'Quiet corner',tt:'Sessiz köşe'} } ] },
      { i:'Bekleme süresini sor', s:'How long is the wait for a table?', st:'Masa için ne kadar beklenir?',
        r:'Only about ten minutes. Can I take your name?', rt:'Sadece on dakika. İsminizi alabilir miyim?', e:{k:'neutral',t:'On the list',tt:'Listeye alındın'} } ] },

  { id:'r-special', place:'restaurant', level:'B1', title:'Asking about the special', titleTr:'Günün spesyalini sormak', npc:'elena',
    open:'Tonight we have a chef’s special. Interested?', openTr:'Bu akşam şefin spesyali var. İlgilenir misiniz?',
    br:[
      { i:'Ne olduğunu sor', s:'Yes — what is the special this evening?', st:'Evet — bu akşamki spesyal nedir?', a:['What is tonight’s special'],
        r:'Slow-cooked lamb with rosemary potatoes.', rt:'Rozmarinli patatesle ağır ateşte kuzu.',
        f:[ { i:'Sipariş et', s:'That sounds delicious — I’ll have it.', st:'Kulağa nefis geliyor — onu alacağım.', e:{k:'success',t:'Special ordered',tt:'Spesyal sipariş edildi'} },
            { i:'İçindekini sor', s:'Does it come with any sauce or nuts?', st:'Yanında sos ya da fındık gelir mi?', e:{k:'success',t:'Checked first',tt:'Önce sordun'} } ] },
      { i:'Vejetaryen seçenek sor', s:'Do you have a vegetarian option instead?', st:'Onun yerine vejetaryen seçeneğiniz var mı?',
        r:'Of course — a wild mushroom risotto.', rt:'Tabii — yabani mantarlı risotto.', e:{k:'success',t:'Veggie choice',tt:'Vejetaryen seçim'} } ] },

  { id:'r-splitbill', place:'restaurant', level:'B1', title:'Splitting the bill', titleTr:'Hesabı bölüşmek', npc:'elena',
    open:'Here’s your bill. All together, or separate?', openTr:'Hesabınız burada. Hep birlikte mi ayrı ayrı mı?',
    br:[
      { i:'Bölüşmek iste', s:'Could we split it evenly between four, please?', st:'Dört kişiye eşit bölebilir miyiz, lütfen?', a:['Can we split it four ways'],
        r:'Of course, that’s eighteen each.', rt:'Tabii, kişi başı on sekiz.', e:{k:'success',t:'Split evenly',tt:'Eşit bölündü'} },
      { i:'Bahşiş ekle', s:'All together, and please add a ten percent tip.', st:'Hep birlikte ve lütfen yüzde on bahşiş ekleyin.',
        r:'Very kind, thank you so much!', rt:'Çok naziksiniz, çok teşekkürler!', e:{k:'relationship',t:'Generous guest',tt:'Cömert misafir',rel:1} } ] },

  { id:'r-wrongcook', place:'restaurant', level:'B2', title:'Sending a dish back', titleTr:'Yemeği geri göndermek', npc:'marco',
    open:'I’m the manager — is there a problem with your meal?', openTr:'Ben müdürüm — yemeğinizde bir sorun mu var?', emo:'concerned',
    br:[
      { i:'Az pişmiş de', s:'I’m afraid my steak is undercooked — it’s quite raw.', st:'Maalesef bifteğim az pişmiş — oldukça çiğ.', a:['My steak is undercooked'],
        r:'My apologies. I’ll have the kitchen redo it at once.', rt:'Özür dilerim. Mutfağa hemen yeniden yaptırayım.',
        f:[ { i:'Nazikçe kabul et', s:'Thank you, I appreciate that.', st:'Teşekkürler, minnettarım.', e:{k:'problem-solved',t:'Recooked',tt:'Yeniden pişti',rel:1} },
            { i:'Telafi bekle', s:'Given the wait, I’d hope for something off the bill.', st:'Bekleme göz önüne alınırsa, hesaptan bir indirim beklerim.', e:{k:'excellent',t:'Comped politely',tt:'Kibarca indirildi'} } ] },
      { i:'Yanlış yemek de', s:'This isn’t the dish I ordered at all.', st:'Bu hiç sipariş ettiğim yemek değil.',
        r:'I’m so sorry — let me bring the correct one immediately.', rt:'Çok özür dilerim — doğrusunu hemen getireyim.', e:{k:'problem-solved',t:'Fixed fast',tt:'Hızlı düzeltildi'} } ] }
]);
