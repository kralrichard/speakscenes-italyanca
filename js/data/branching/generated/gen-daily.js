import { miniAll } from '../miniBuilder.js';

export const DAILY = miniAll([
  // ---------------- STREET / OUT & ABOUT ----------------
  { id:'st-museum', place:'street', level:'A2', title:'Directions to the museum', titleTr:'Müzeye yol', npc:'sophie',
    open:'You look a bit lost — need a hand?', openTr:'Biraz kaybolmuş görünüyorsun — yardım gerekir mi?',
    br:[
      { i:'Müzeyi sor', s:'Yes, how do I get to the city museum?', st:'Evet, şehir müzesine nasıl giderim?', a:['How do I get to the museum'],
        r:'Straight ahead, then right at the fountain.', rt:'Düz git, sonra çeşmede sağa.', e:{k:'success',t:'On your way',tt:'Yolunda'} },
      { i:'Yürüme mesafesi sor', s:'Is it walkable, or should I take a bus?', st:'Yürünür mü, yoksa otobüse mi binmeliyim?',
        r:'It’s a ten-minute walk — nice and easy.', rt:'On dakikalık yürüyüş — kolay.', e:{k:'success',t:'Walking it',tt:'Yürüyerek'} } ] },

  { id:'st-photo', place:'street', level:'A1', title:'Asking for a photo', titleTr:'Fotoğraf istemek', npc:'sophie',
    open:'Beautiful view, isn’t it?', openTr:'Güzel manzara, değil mi?',
    br:[
      { i:'Fotoğraf çekmesini iste', s:'It is! Could you take a photo of me?', st:'Öyle! Fotoğrafımı çeker misiniz?', a:['Could you take a photo of me'],
        r:'Of course! Say cheese!', rt:'Tabii! Gülümse!', e:{k:'relationship',t:'Nice moment',tt:'Güzel an',rel:1} },
      { i:'Manzara hakkında konuş', s:'Yes! Do you know what that building is?', st:'Evet! Şu binanın ne olduğunu biliyor musun?',
        r:'That’s the old town hall — very historic.', rt:'O eski belediye binası — çok tarihi.', e:{k:'success',t:'Learned something',tt:'Bir şey öğrendin'} } ] },

  { id:'st-recommend', place:'street', level:'B1', title:'Asking a local for tips', titleTr:'Yerelden tavsiye', npc:'sophie',
    open:'Are you visiting? You’ve got that tourist look!', openTr:'Ziyaretçi misin? O turist havan var!',
    br:[
      { i:'Yemek önerisi iste', s:'Guilty! Where’s a good place to eat around here?', st:'Suçluyum! Buralarda yemek için iyi bir yer nerede?', a:['Where’s a good place to eat'],
        r:'The little café by the river is wonderful.', rt:'Nehir kenarındaki küçük kafe harika.',
        f:[ { i:'Ne yenir sor', s:'What should I order there?', st:'Orada ne sipariş etmeliyim?', e:{k:'relationship',t:'Insider tip',tt:'İçeriden ipucu',rel:1} },
            { i:'Teşekkür et', s:'Thanks so much — I’ll check it out!', st:'Çok teşekkürler — bakacağım!', e:{k:'success',t:'Great tip',tt:'Harika ipucu'} } ] },
      { i:'Gezi önerisi iste', s:'What’s the one thing I shouldn’t miss?', st:'Kaçırmamam gereken tek şey ne?',
        r:'The sunset from the old bridge — magical.', rt:'Eski köprüden gün batımı — büyülü.', e:{k:'success',t:'Must-see noted',tt:'Görülecek yer'} } ] },

  { id:'st-help-carry', place:'street', level:'A2', title:'Helping a stranger', titleTr:'Yabancıya yardım', npc:'sophie',
    open:'Oh dear, these bags are so heavy…', openTr:'Ah, bu çantalar çok ağır…',
    br:[
      { i:'Yardım teklif et', s:'Let me help you carry those.', st:'Onları taşımana yardım edeyim.', a:['Can I help you carry them'],
        r:'Oh, how kind of you! Thank you so much.', rt:'Aa, ne kadar naziksin! Çok teşekkürler.', e:{k:'relationship',t:'A kind stranger',tt:'Nazik bir yabancı',rel:1} },
      { i:'Taksi çağırmayı öner', s:'Would you like me to call you a taxi?', st:'Sana taksi çağırmamı ister misin?',
        r:'That would be a huge help, thank you!', rt:'Bu çok işime yarar, teşekkürler!', e:{k:'relationship',t:'Went out of your way',tt:'Zahmete girdin',rel:1} } ] },

  { id:'st-timeask', place:'street', level:'A1', title:'Asking the time', titleTr:'Saati sormak', npc:'leo',
    open:'Hey, are you waiting for the bus too?', openTr:'Selam, sen de mi otobüs bekliyorsun?',
    br:[
      { i:'Saati sor', s:'Yeah! Excuse me, do you have the time?', st:'Evet! Pardon, saatin var mı?', a:['Do you have the time'],
        r:'It’s quarter past three.', rt:'Üçü çeyrek geçiyor.', e:{k:'success',t:'Time checked',tt:'Saat öğrenildi'} },
      { i:'Otobüsü sor', s:'Do you know when the number 9 comes?', st:'9 numaranın ne zaman geldiğini biliyor musun?',
        r:'Should be any minute now.', rt:'Şimdi her an gelebilir.', e:{k:'success',t:'Almost here',tt:'Neredeyse geldi'} } ] },

  { id:'st-newfriend2', place:'street', level:'B1', title:'Making plans with a friend', titleTr:'Arkadaşla plan yapmak', npc:'leo',
    open:'We should hang out sometime! Are you free this weekend?', openTr:'Bir ara takılalım! Bu hafta sonu boş musun?',
    br:[
      { i:'Kabul et', s:'I’d love to! What did you have in mind?', st:'Çok isterim! Aklında ne vardı?', a:['I’d love to, what’s the plan'],
        r:'Maybe a hike, then food. Sound good?', rt:'Belki bir yürüyüş, sonra yemek. İyi mi?',
        f:[ { i:'Coşkuyla onayla', s:'Perfect — count me in!', st:'Mükemmel — ben varım!', e:{k:'relationship',t:'Plans made',tt:'Plan yapıldı',rel:2} },
            { i:'Detay sor', s:'Sounds fun — what time and where?', st:'Eğlenceli — saat kaçta ve nerede?', e:{k:'relationship',t:'All set',tt:'Ayarlandı',rel:1} } ] },
      { i:'Nazikçe reddet', s:'This weekend’s tricky, but how about next week?', st:'Bu hafta sonu zor ama gelecek hafta olur mu?',
        r:'Next week works great. I’ll text you.', rt:'Gelecek hafta harika. Mesaj atarım.', e:{k:'success',t:'Rain check',tt:'Ertelendi'} } ] },

  { id:'st-lost-tourist', place:'street', level:'A2', title:'A lost tourist asks you', titleTr:'Kayıp turist sana soruyor', npc:'leo',
    open:'Sorry to bother you — do you speak English?', openTr:'Rahatsız ettiğim için üzgünüm — İngilizce konuşuyor musun?',
    br:[
      { i:'Yardım teklif et', s:'A little! Where are you trying to go?', st:'Biraz! Nereye gitmeye çalışıyorsun?', a:['Yes a little, where do you want to go'],
        r:'The train station — I’m completely lost.', rt:'Tren istasyonu — tamamen kayboldum.', e:{k:'relationship',t:'Helped a tourist',tt:'Turiste yardım',rel:1} },
      { i:'Haritanı göster', s:'Sure — let me show you on my phone map.', st:'Tabii — telefon haritamda göstereyim.',
        r:'Oh brilliant, thank you so much!', rt:'Aa harika, çok teşekkürler!', e:{k:'success',t:'Map to the rescue',tt:'Harita kurtardı'} } ] },

  { id:'st-weather', place:'street', level:'A1', title:'Small talk about weather', titleTr:'Hava durumu sohbeti', npc:'sophie',
    open:'Lovely day, isn’t it?', openTr:'Güzel bir gün, değil mi?',
    br:[
      { i:'Katıl', s:'It really is! Perfect for a walk.', st:'Gerçekten öyle! Yürüyüş için mükemmel.', a:['Yes, perfect for a walk'],
        r:'Exactly what I was thinking!', rt:'Tam da düşündüğüm şey!', e:{k:'relationship',t:'Friendly chat',tt:'Dostça sohbet',rel:1} },
      { i:'Yağmur bekliyorum de', s:'It is, but I heard it might rain later.', st:'Öyle ama sonra yağmur yağabilirmiş.',
        r:'Oh no, I’d better bring an umbrella!', rt:'Ah hayır, şemsiye alsam iyi olur!', e:{k:'success',t:'Nice exchange',tt:'Hoş sohbet'} } ] },

  // ---------------- HOME ----------------
  { id:'ho-dinner', place:'home', level:'A1', title:'Deciding on dinner', titleTr:'Yemeğe karar vermek', npc:'emma',
    open:'What should we have for dinner tonight?', openTr:'Bu akşam yemekte ne yiyelim?',
    br:[
      { i:'Öneri sun', s:'How about pasta? It’s quick and easy.', st:'Makarna nasıl? Hızlı ve kolay.', a:['Let’s have pasta'],
        r:'Great idea. I’ll boil the water.', rt:'Harika fikir. Suyu kaynatayım.', e:{k:'relationship',t:'Team dinner',tt:'Beraber yemek',rel:1} },
      { i:'Dışarı çıkmayı öner', s:'Actually, shall we just eat out tonight?', st:'Aslında bu akşam dışarıda mı yesek?',
        r:'Ooh yes, let’s treat ourselves!', rt:'Aa evet, kendimizi şımartalım!', e:{k:'relationship',t:'Night out',tt:'Dışarıda gece',rel:1} } ] },

  { id:'ho-chores', place:'home', level:'A2', title:'Sharing the chores', titleTr:'İşleri paylaşmak', npc:'emma',
    open:'The flat’s a mess. Can you help me tidy up?', openTr:'Ev dağınık. Toplamama yardım eder misin?',
    br:[
      { i:'Yardım teklif et', s:'Sure, I’ll do the dishes if you vacuum.', st:'Tabii, sen süpürürsen ben bulaşıkları yaparım.', a:['I’ll do the dishes, you vacuum'],
        r:'Deal! Thanks, that’s a big help.', rt:'Anlaştık! Sağ ol, çok yardımcı oldun.', e:{k:'relationship',t:'Fair split',tt:'Adil paylaşım',rel:1} },
      { i:'Sonra yaparım de', s:'Can we do it after lunch? I’m starving.', st:'Öğle yemeğinden sonra yapabilir miyiz? Açlıktan ölüyorum.',
        r:'Fine, but you’re not getting out of it!', rt:'Tamam ama yırtamazsın!', e:{k:'funny',t:'Later then',tt:'Sonra o zaman'} } ] },

  { id:'ho-guest', place:'home', level:'B1', title:'A friend drops by', titleTr:'Arkadaş uğruyor', npc:'hannah',
    open:'Hi! I was passing by — is it okay if I come in?', openTr:'Selam! Geçiyordum — girmem sorun olur mu?',
    br:[
      { i:'İçeri buyur et', s:'Of course, come in! Can I get you a drink?', st:'Tabii, gir! Bir içecek getireyim mi?', a:['Come in, would you like a drink'],
        r:'A tea would be lovely, thanks!', rt:'Bir çay harika olur, teşekkürler!', e:{k:'relationship',t:'Warm welcome',tt:'Sıcak karşılama',rel:1} },
      { i:'Meşgul olduğunu söyle', s:'I’d love to, but I’m in the middle of something.', st:'Çok isterdim ama bir şeyin ortasındayım.',
        r:'No worries, another time. Take care!', rt:'Sorun değil, başka zaman. Kendine iyi bak!', e:{k:'neutral',t:'Rain check',tt:'Ertelendi'} } ] },

  { id:'ho-phone', place:'home', level:'A2', title:'A phone call with family', titleTr:'Aileyle telefon', npc:'emma',
    open:'Hi! It’s so good to hear your voice. How are you?', openTr:'Selam! Sesini duymak çok güzel. Nasılsın?',
    br:[
      { i:'İyi olduğunu söyle', s:'I’m great, thanks! Missing everyone, though.', st:'Harikayım, teşekkürler! Yine de herkesi özlüyorum.', a:['I’m good, but I miss everyone'],
        r:'We miss you too! When are you visiting?', rt:'Biz de seni özledik! Ne zaman geliyorsun?', e:{k:'relationship',t:'Warm call',tt:'Sıcak görüşme',rel:1} },
      { i:'Haber ver', s:'Actually, I have some exciting news to share!', st:'Aslında paylaşacak heyecan verici bir haberim var!',
        r:'Ooh, tell me everything right now!', rt:'Aa, hemen her şeyi anlat!', e:{k:'relationship',t:'Good news shared',tt:'Güzel haber paylaşıldı',rel:1} } ] },

  // ---------------- WORKPLACE ----------------
  { id:'w-meeting', place:'workplace', level:'B1', title:'Scheduling a meeting', titleTr:'Toplantı ayarlamak', npc:'raj',
    open:'We need to sync on the project. When are you free?', openTr:'Proje için görüşmemiz lazım. Ne zaman boşsun?',
    br:[
      { i:'Zaman öner', s:'How about tomorrow at ten in the small room?', st:'Yarın onda küçük odada nasıl olur?', a:['Tomorrow at ten works'],
        r:'Works for me. I’ll send an invite.', rt:'Bana uyar. Davet gönderirim.', e:{k:'success',t:'Meeting set',tt:'Toplantı ayarlandı'} },
      { i:'Online öner', s:'Could we do a video call instead? I’m remote tomorrow.', st:'Onun yerine görüntülü görüşsek? Yarın uzaktan çalışıyorum.',
        r:'Sure, I’ll send a link.', rt:'Tabii, bir bağlantı gönderirim.', e:{k:'success',t:'Remote meeting',tt:'Uzaktan toplantı'} } ] },

  { id:'w-help', place:'workplace', level:'A2', title:'Asking a colleague for help', titleTr:'Meslektaştan yardım', npc:'raj',
    open:'You look stuck — everything okay?', openTr:'Takılmış görünüyorsun — her şey yolunda mı?',
    br:[
      { i:'Yardım iste', s:'Could you help me with this spreadsheet?', st:'Bu tabloda bana yardım eder misin?', a:['Can you help me with this spreadsheet'],
        r:'Sure, let’s take a look together.', rt:'Tabii, beraber bakalım.', e:{k:'relationship',t:'Teamwork',tt:'Takım çalışması',rel:1} },
      { i:'Açıklama iste', s:'Could you explain how this system works?', st:'Bu sistemin nasıl çalıştığını açıklar mısın?',
        r:'Of course, it’s easier than it looks.', rt:'Tabii, göründüğünden kolay.', e:{k:'success',t:'Learned it',tt:'Öğrendin'} } ] },

  { id:'w-deadline', place:'workplace', level:'B2', title:'Negotiating a deadline', titleTr:'Süre pazarlığı', npc:'carter',
    open:'How’s the report coming along? It’s due Friday.', openTr:'Rapor nasıl gidiyor? Cuma teslim.',
    br:[
      { i:'Ek süre iste', s:'I’m making progress, but could I have until Monday?', st:'İlerliyorum ama pazartesiye kadar alabilir miyim?', a:['Could I have until Monday'],
        r:'If the quality is better for it, yes — Monday.', rt:'Kalite daha iyi olacaksa, evet — pazartesi.',
        f:[ { i:'Teşekkür et', s:'Thank you, I’ll make it worth the wait.', st:'Teşekkürler, beklemeye değecek.', e:{k:'success',t:'Extension earned',tt:'Süre kazanıldı',rel:1} },
            { i:'Ara teslim öner', s:'I’ll send you a draft Friday to review.', st:'İnceleyesin diye cuma bir taslak göndereyim.', e:{k:'excellent',t:'Professional move',tt:'Profesyonel hamle'} } ] },
      { i:'Zamanında bitiririm de', s:'It’ll be ready by Friday, no problem.', st:'Cumaya hazır olur, sorun değil.',
        r:'Great, I appreciate your reliability.', rt:'Harika, güvenilirliğini takdir ediyorum.', e:{k:'success',t:'Reliable',tt:'Güvenilir'} } ] },

  { id:'w-feedback', place:'workplace', level:'B2', title:'Giving feedback politely', titleTr:'Kibarca geri bildirim', npc:'raj',
    open:'What did you think of my presentation, honestly?', openTr:'Sunumum hakkında ne düşündün, dürüstçe?',
    br:[
      { i:'Yapıcı eleştiri ver', s:'It was strong — maybe just fewer slides next time.', st:'Güçlüydü — belki bir dahakine biraz daha az slayt.', a:['It was good, maybe fewer slides'],
        r:'That’s fair feedback, thanks for being honest.', rt:'Bu adil bir geri bildirim, dürüst olduğun için sağ ol.', e:{k:'relationship',t:'Honest & kind',tt:'Dürüst ve nazik',rel:1} },
      { i:'Öv', s:'Honestly, it was really clear and engaging.', st:'Açıkçası çok net ve ilgi çekiciydi.',
        r:'Thank you, that means a lot!', rt:'Teşekkürler, bu çok değerli!', e:{k:'relationship',t:'Encouraging',tt:'Cesaretlendirici',rel:1} } ] }
]);
