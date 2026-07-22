import { miniAll } from '../miniBuilder.js';

export const TRAVEL = miniAll([
  // ---------------- AIRPORT ----------------
  { id:'a-security', place:'airport', level:'A2', title:'Going through security', titleTr:'Güvenlikten geçmek', npc:'omar',
    open:'Please place your bags on the belt. Any liquids or laptops?', openTr:'Çantalarınızı banda koyun. Sıvı ya da dizüstü var mı?', emo:'formal',
    br:[
      { i:'Dizüstü olduğunu söyle', s:'Yes, I have a laptop in my bag.', st:'Evet, çantamda bir dizüstü var.', a:['I have a laptop'],
        r:'Please take it out and place it in a tray.', rt:'Lütfen çıkarıp bir kaba koyun.', e:{k:'success',t:'Through security',tt:'Güvenlikten geçtin'} },
      { i:'Hiçbir şey yok de', s:'No, nothing like that in my bag.', st:'Hayır, çantamda öyle bir şey yok.',
        r:'Great, walk through when the light is green.', rt:'Harika, ışık yeşilken geçin.', e:{k:'success',t:'Cleared',tt:'Geçtin'} } ] },

  { id:'a-lostbag', place:'airport', level:'B1', title:'Lost luggage', titleTr:'Kayıp bagaj', npc:'priya',
    open:'How can I help? You look worried.', openTr:'Nasıl yardımcı olabilirim? Endişeli görünüyorsunuz.', emo:'concerned',
    br:[
      { i:'Bavulun gelmediğini söyle', s:'My suitcase didn’t come out on the belt.', st:'Valizim banttan çıkmadı.', a:['My bag never arrived'],
        r:'I’m sorry. Can you describe it for me?', rt:'Üzgünüm. Onu tarif edebilir misiniz?',
        f:[ { i:'Bavulu tarif et', s:'It’s a large red suitcase with a yellow tag.', st:'Sarı etiketli büyük kırmızı bir valiz.', e:{k:'problem-solved',t:'Report filed',tt:'Kayıt açıldı'} },
            { i:'Teslim adresi ver', s:'Could you deliver it to my hotel when found?', st:'Bulununca otelime teslim edebilir misiniz?', e:{k:'success',t:'Delivery arranged',tt:'Teslimat ayarlandı'} } ] },
      { i:'Tazminat sor', s:'What compensation do I get for the delay?', st:'Gecikme için ne tazminat alırım?', tone:'formal', diff:'hard',
        r:'You can claim for essentials tonight — keep receipts.', rt:'Bu gece temel ihtiyaçlar için talep açabilirsiniz — fişleri saklayın.', e:{k:'success',t:'Knows the rules',tt:'Kuralları biliyor'} } ] },

  { id:'a-gate', place:'airport', level:'A1', title:'Finding the gate', titleTr:'Kapıyı bulmak', npc:'omar',
    open:'Hello, do you need directions?', openTr:'Merhaba, yol tarifine ihtiyacınız var mı?',
    br:[
      { i:'Kapıyı sor', s:'Yes, where is gate 22?', st:'Evet, 22 numaralı kapı nerede?', a:['Where is gate 22'],
        r:'Straight ahead, then turn right at the shops.', rt:'Düz gidin, sonra mağazalarda sağa dönün.', e:{k:'success',t:'On your way',tt:'Yolunda'} },
      { i:'Süreyi sor', s:'Is it far? My flight is boarding soon.', st:'Uzak mı? Uçuşum yakında biniyor.',
        r:'About five minutes — you have time.', rt:'Yaklaşık beş dakika — vaktiniz var.', e:{k:'success',t:'In time',tt:'Zamanında'} } ] },

  { id:'a-upgrade', place:'airport', level:'B1', title:'Asking for an upgrade', titleTr:'Üst sınıf istemek', npc:'priya',
    open:'You’re checked in. Is there anything else?', openTr:'Girişiniz yapıldı. Başka bir şey var mı?',
    br:[
      { i:'Üst sınıfı sor', s:'Are there any upgrades to business class available?', st:'Business class’a yükseltme var mı?', a:['Can I upgrade to business class'],
        r:'There’s one seat — it’s ninety euros extra.', rt:'Bir koltuk var — doksan euro ek ücret.',
        f:[ { i:'Kabul et', s:'That’s worth it — I’ll take it.', st:'Buna değer — alıyorum.', e:{k:'excellent',t:'Upgraded',tt:'Yükseltildi'} },
            { i:'Vazgeç', s:'On second thought, I’ll keep my seat.', st:'Bir düşününce, koltuğumda kalayım.', e:{k:'neutral',t:'Stayed put',tt:'Yerinde kaldı'} } ] },
      { i:'Ekstra bagaj sor', s:'Instead, can I add a checked bag?', st:'Onun yerine bir bavul ekleyebilir miyim?',
        r:'Yes, that’s thirty euros. Shall I add it?', rt:'Evet, otuz euro. Ekleyeyim mi?', e:{k:'success',t:'Bag added',tt:'Bavul eklendi'} } ] },

  { id:'a-onboard', place:'airport', level:'A2', title:'Ordering on the plane', titleTr:'Uçakta sipariş', npc:'omar', scene:'airplane-cabin',
    open:'Would you like anything to eat or drink?', openTr:'Yiyecek ya da içecek bir şey ister misiniz?',
    br:[
      { i:'İçecek iste', s:'Could I have a coffee and some water, please?', st:'Bir kahve ve biraz su alabilir miyim, lütfen?', a:['A coffee and water please'],
        r:'Of course. Sugar or milk?', rt:'Tabii. Şeker mi süt mü?', e:{k:'success',t:'Served',tt:'Servis edildi'} },
      { i:'Vejetaryen yemek sor', s:'Do you have a vegetarian meal option?', st:'Vejetaryen yemek seçeneğiniz var mı?',
        r:'We do — a vegetable pasta. Would you like it?', rt:'Var — sebzeli makarna. İster misiniz?', e:{k:'success',t:'Veggie meal',tt:'Vejetaryen yemek'} } ] },

  { id:'a-delay', place:'airport', level:'B1', title:'A delayed flight', titleTr:'Rötarlı uçuş', npc:'priya',
    open:'I’m afraid flight 340 is delayed. How can I help?', openTr:'Maalesef 340 sefer rötarlı. Nasıl yardımcı olabilirim?', emo:'apologetic',
    br:[
      { i:'Ne kadar sür sor', s:'How long is the delay expected to be?', st:'Rötarın ne kadar sürmesi bekleniyor?', a:['How long is the delay'],
        r:'About three hours, unfortunately.', rt:'Ne yazık ki yaklaşık üç saat.',
        f:[ { i:'Yemek fişi iste', s:'Do I get a meal voucher for the wait?', st:'Bekleme için bir yemek fişi alır mıyım?', e:{k:'success',t:'Voucher given',tt:'Fiş verildi'} },
            { i:'Lounge sor', s:'Is there a lounge I could wait in?', st:'Bekleyebileceğim bir lounge var mı?', e:{k:'success',t:'Lounge access',tt:'Lounge erişimi'} } ] },
      { i:'Bağlantı uçuşunu sor', s:'I have a connection — will I miss it?', st:'Aktarmam var — kaçıracak mıyım?',
        r:'Let me rebook your connection to be safe.', rt:'Güvenli olması için aktarmanızı yeniden ayarlayayım.', e:{k:'problem-solved',t:'Rebooked',tt:'Yeniden ayarlandı'} } ] },

  { id:'a-customs', place:'airport', level:'B1', title:'At customs', titleTr:'Gümrükte', npc:'omar',
    open:'Anything to declare?', openTr:'Beyan edecek bir şey var mı?', emo:'formal',
    br:[
      { i:'Bir şey yok de', s:'No, nothing to declare.', st:'Hayır, beyan edecek bir şey yok.', a:['Nothing to declare'],
        r:'Thank you. Enjoy your stay.', rt:'Teşekkürler. İyi konaklamalar.', e:{k:'success',t:'Waved through',tt:'Geçtin'} },
      { i:'Hediye olduğunu söyle', s:'Just some gifts for my family, nothing valuable.', st:'Sadece aileme birkaç hediye, değerli bir şey yok.',
        r:'That’s fine. Have a good trip.', rt:'Sorun değil. İyi yolculuklar.', e:{k:'success',t:'All clear',tt:'Sorunsuz'} } ] },

  { id:'a-checkin-family', place:'airport', level:'A2', title:'Seats together', titleTr:'Yan yana koltuk', npc:'priya',
    open:'Checking in for the family? How many of you?', openTr:'Aile için giriş mi? Kaç kişisiniz?',
    br:[
      { i:'Yan yana koltuk iste', s:'Four of us — could we have seats together?', st:'Dört kişiyiz — yan yana oturabilir miyiz?', a:['Can we sit together, four of us'],
        r:'Let me see… yes, row 20, all together.', rt:'Bir bakayım… evet, 20. sıra, hepsi bir arada.', e:{k:'success',t:'Seated together',tt:'Yan yana oturuldu'} },
      { i:'Bebek için yer sor', s:'We have a baby — is there a bassinet seat?', st:'Bebeğimiz var — beşik koltuğu var mı?',
        r:'Yes, I’ll assign you the bulkhead row.', rt:'Evet, size ön sırayı ayarlayayım.', e:{k:'excellent',t:'Family sorted',tt:'Aile ayarlandı'} } ] },

  // ---------------- TRAIN ----------------
  { id:'t-platform', place:'train', level:'A1', title:'Which platform?', titleTr:'Hangi peron?', npc:'nina',
    open:'Next, please. Where are you headed?', openTr:'Sıradaki, lütfen. Nereye gidiyorsunuz?',
    br:[
      { i:'Peronu sor', s:'Which platform is the train to Oxford?', st:'Oxford treni hangi perondan?', a:['What platform for the Oxford train'],
        r:'Platform six, leaving in ten minutes.', rt:'Altı numara, on dakikaya kalkıyor.', e:{k:'success',t:'Found it',tt:'Bulundu'} },
      { i:'Geç kaldığını söyle', s:'I’m late — has the Oxford train left yet?', st:'Geç kaldım — Oxford treni kalktı mı?',
        r:'Not yet! Hurry to platform six.', rt:'Henüz değil! Altı numaraya koşun.', e:{k:'success',t:'Just made it',tt:'Son anda'} } ] },

  { id:'t-refund', place:'train', level:'B1', title:'Refund for a missed train', titleTr:'Kaçan tren için iade', npc:'nina',
    open:'How can I help you?', openTr:'Nasıl yardımcı olabilirim?',
    br:[
      { i:'İade iste', s:'I missed my train — can I get a refund?', st:'Trenimi kaçırdım — iade alabilir miyim?', a:['Can I get a refund, I missed my train'],
        r:'Was it a flexible ticket? Let me check.', rt:'Esnek bilet miydi? Bakayım.',
        f:[ { i:'Sonraki trene geç', s:'If not, can I just take the next train?', st:'Değilse, bir sonraki trene binebilir miyim?', e:{k:'problem-solved',t:'Next train',tt:'Sonraki tren'} },
            { i:'İade onayı iste', s:'Yes it was flexible — I’d like the refund.', st:'Evet esnekti — iadeyi istiyorum.', e:{k:'success',t:'Refunded',tt:'İade edildi'} } ] },
      { i:'Şikâyet et', s:'The delay was your fault, so I expect a full refund.', st:'Rötar sizin hatanızdı, tam iade beklerim.', tone:'formal', diff:'hard',
        r:'You’re right — I’ll process a full refund.', rt:'Haklısınız — tam iade işleme alıyorum.', e:{k:'excellent',t:'Full refund',tt:'Tam iade'} } ] },

  { id:'t-seat', place:'train', level:'A2', title:'Someone in your seat', titleTr:'Koltuğunda biri var', npc:'victor',
    open:'Excuse me, I think this might be my seat.', openTr:'Pardon, sanırım bu benim koltuğum olabilir.', emo:'curious',
    br:[
      { i:'Bileti göster', s:'Oh, sorry — my ticket says seat 14. Let me check.', st:'Ah, pardon — biletimde koltuk 14 yazıyor. Bakayım.', a:['My ticket says seat 14, let me check'],
        r:'Ah, you’re in 14B, I’m 14A. We’re both right!', rt:'Ah, siz 14B’desiniz, ben 14A. İkimiz de haklıyız!', e:{k:'funny',t:'Mix-up sorted',tt:'Karışıklık çözüldü'} },
      { i:'Kibarca yer değiş', s:'No problem, I’ll happily move. Where’s your seat?', st:'Sorun değil, memnuniyetle taşınırım. Koltuğunuz nerede?',
        r:'That’s very kind, thank you!', rt:'Çok naziksiniz, teşekkürler!', e:{k:'relationship',t:'Kind gesture',tt:'Nazik jest',rel:1} } ] },

  { id:'t-info', place:'train', level:'A2', title:'Do I change trains?', titleTr:'Aktarma var mı?', npc:'nina',
    open:'Where are you travelling to today?', openTr:'Bugün nereye seyahat ediyorsunuz?',
    br:[
      { i:'Aktarma sor', s:'To Bath — do I need to change trains?', st:'Bath’e — aktarma yapmam gerekiyor mu?', a:['Do I change trains for Bath'],
        r:'Yes, change at Bristol, platform two.', rt:'Evet, Bristol’de aktarın, peron iki.', e:{k:'success',t:'Route clear',tt:'Güzergâh net'} },
      { i:'Süre sor', s:'How long does the whole journey take?', st:'Tüm yolculuk ne kadar sürüyor?',
        r:'About two hours with the connection.', rt:'Aktarmayla yaklaşık iki saat.', e:{k:'success',t:'Good to know',tt:'İyi bilgi'} } ] },

  // ---------------- TAXI ----------------
  { id:'x-fare', place:'taxi', level:'A2', title:'Agreeing the fare', titleTr:'Ücrette anlaşma', npc:'victor',
    open:'Where to? I can go by the meter or a fixed price.', openTr:'Nereye? Taksimetreyle ya da sabit fiyatla gidebilirim.',
    br:[
      { i:'Taksimetre iste', s:'By the meter is fine — to the station, please.', st:'Taksimetre uygun — istasyona, lütfen.', a:['Meter is fine, to the station'],
        r:'Meter it is. Hop in!', rt:'Taksimetre olsun. Atlayın!', e:{k:'success',t:'On the way',tt:'Yolda'} },
      { i:'Sabit fiyat sor', s:'How much is a fixed price to the airport?', st:'Havalimanına sabit fiyat ne kadar?',
        r:'Twenty-five euros, no surprises.', rt:'Yirmi beş euro, sürpriz yok.', e:{k:'success',t:'Deal agreed',tt:'Anlaşıldı'} } ] },

  { id:'x-lost-item', place:'taxi', level:'B1', title:'Left something behind', titleTr:'Bir şeyi unuttun', npc:'victor',
    open:'You called about a lost item?', openTr:'Kayıp bir eşya için mi aradınız?', emo:'concerned',
    br:[
      { i:'Telefonu unuttuğunu söyle', s:'Yes, I think I left my phone in your taxi.', st:'Evet, sanırım telefonumu taksinizde unuttum.', a:['I left my phone in your taxi'],
        r:'Let me look… yes, it’s here on the back seat!', rt:'Bir bakayım… evet, arka koltukta!',
        f:[ { i:'Buluşma ayarla', s:'Oh, thank you! Where can I meet you?', st:'Ah, teşekkürler! Sizinle nerede buluşabilirim?', e:{k:'problem-solved',t:'Phone returned',tt:'Telefon geri geldi',rel:1} },
            { i:'Otele getirmesini iste', s:'Could you drop it at my hotel? I’ll pay for the trip.', st:'Otelime bırakabilir misiniz? Yolu öderim.', e:{k:'excellent',t:'Delivered',tt:'Teslim edildi'} } ] },
      { i:'Çantayı sor', s:'I also left a small bag — is it there?', st:'Küçük bir çanta da unuttum — orada mı?',
        r:'I see a bag too — I’ll keep both safe.', rt:'Bir çanta da görüyorum — ikisini de saklarım.', e:{k:'success',t:'Both found',tt:'İkisi de bulundu'} } ] },

  { id:'x-directions', place:'taxi', level:'A2', title:'Giving directions', titleTr:'Yol tarif etmek', npc:'victor',
    open:'I don’t know that address — can you guide me?', openTr:'O adresi bilmiyorum — bana yol gösterir misiniz?',
    br:[
      { i:'Yol tarif et', s:'Sure — go straight, then turn left after the bridge.', st:'Tabii — düz gidin, köprüden sonra sola dönün.', a:['Go straight then left after the bridge'],
        r:'Got it. Left after the bridge.', rt:'Anladım. Köprüden sonra sola.', e:{k:'success',t:'Guided him',tt:'Yol gösterdin'} },
      { i:'Haritayı göster', s:'Actually, let me show you on my map.', st:'Aslında haritamda göstereyim.',
        r:'Perfect, that’s much easier. Thanks!', rt:'Mükemmel, çok daha kolay. Teşekkürler!', e:{k:'success',t:'Map to the rescue',tt:'Harita kurtardı'} } ] }
]);
