import { miniAll } from '../miniBuilder.js?v=5';

export const SHOPS_SERVICES = miniAll([
  // ---------------- SUPERMARKET ----------------
  { id:'s-price', place:'supermarket', level:'A1', title:'Checking a price', titleTr:'Fiyat sormak', npc:'tom',
    open:'Hi, can I help you find anything?', openTr:'Merhaba, bir şey bulmanıza yardım edeyim mi?',
    br:[
      { i:'Fiyat sor', s:'How much are these apples?', st:'Bu elmalar ne kadar?', a:['What’s the price of these apples'],
        r:'They’re two euros a kilo today.', rt:'Bugün kilosu iki euro.', e:{k:'success',t:'Price checked',tt:'Fiyat öğrenildi'} },
      { i:'İndirim sor', s:'Is there any offer on fruit today?', st:'Bugün meyvede indirim var mı?',
        r:'Yes, buy two kilos and get one free.', rt:'Evet, iki kilo al bir kilo bedava.', e:{k:'success',t:'Good deal',tt:'İyi fırsat'} } ] },

  { id:'s-find', place:'supermarket', level:'A2', title:'Which aisle?', titleTr:'Hangi koridor?', npc:'tom',
    open:'You look like you’re searching for something.', openTr:'Bir şey arıyor gibisiniz.',
    br:[
      { i:'Ürün yeri sor', s:'Yes, which aisle is the pasta in?', st:'Evet, makarna hangi koridorda?', a:['Where is the pasta'],
        r:'Aisle five, next to the sauces.', rt:'Beşinci koridor, sosların yanında.', e:{k:'success',t:'Found it',tt:'Bulundu'} },
      { i:'Glutensiz sor', s:'Do you have a gluten-free section?', st:'Glutensiz bölümünüz var mı?',
        r:'Yes, aisle seven, health foods.', rt:'Evet, yedinci koridor, sağlıklı gıdalar.', e:{k:'success',t:'Special section',tt:'Özel bölüm'} } ] },

  { id:'s-checkout', place:'supermarket', level:'A2', title:'A checkout problem', titleTr:'Kasada sorun', npc:'tom',
    open:'That’s twenty-four euros, please.', openTr:'Yirmi dört euro, lütfen.',
    br:[
      { i:'Fazla ücreti sorgula', s:'Sorry, I think this item scanned twice.', st:'Pardon, sanırım bu ürün iki kez okundu.', a:['I think this scanned twice'],
        r:'Let me check… you’re right, my mistake.', rt:'Bir bakayım… haklısınız, benim hatam.', e:{k:'problem-solved',t:'Fixed',tt:'Düzeltildi'} },
      { i:'Poşet iste', s:'Could I have a bag as well, please?', st:'Bir de poşet alabilir miyim, lütfen?',
        r:'Sure, that’s ten cents extra.', rt:'Tabii, on sent ek.', e:{k:'success',t:'Bagged up',tt:'Poşetlendi'} } ] },

  { id:'s-return-food', place:'supermarket', level:'B1', title:'Returning a product', titleTr:'Ürün iadesi', npc:'tom',
    open:'Is there something wrong with your purchase?', openTr:'Aldığınız üründe bir sorun mu var?', emo:'concerned',
    br:[
      { i:'Bozuk ürün de', s:'Yes, this milk is out of date. I’d like a refund.', st:'Evet, bu sütün tarihi geçmiş. İade istiyorum.', a:['This milk is expired, I want a refund'],
        r:'I’m sorry about that — full refund, of course.', rt:'Bunun için üzgünüm — tabii ki tam iade.', e:{k:'problem-solved',t:'Refunded',tt:'İade edildi',rel:1} },
      { i:'Değişim iste', s:'Could I just swap it for a fresh one instead?', st:'Onun yerine tazesiyle değiştirebilir miyim?',
        r:'Of course, grab a new one — no charge.', rt:'Tabii, yenisini alın — ücretsiz.', e:{k:'success',t:'Swapped',tt:'Değiştirildi'} } ] },

  // ---------------- CLOTHING ----------------
  { id:'cl-size', place:'clothing', level:'A2', title:'Finding your size', titleTr:'Bedenini bulmak', npc:'zoe',
    open:'Hi! Are you looking for anything special?', openTr:'Merhaba! Özel bir şey mi arıyorsunuz?',
    br:[
      { i:'Beden sor', s:'Do you have this shirt in a medium?', st:'Bu gömleğin orta bedeni var mı?', a:['Is this shirt in medium'],
        r:'Let me check the back… yes, here you are.', rt:'Depoya bakayım… evet, buyurun.', e:{k:'success',t:'Right size',tt:'Doğru beden'} },
      { i:'Renk sor', s:'Do you have it in blue instead of black?', st:'Siyah yerine mavisi var mı?',
        r:'We do — the blue is over here.', rt:'Var — mavisi şurada.', e:{k:'success',t:'Better colour',tt:'Daha iyi renk'} } ] },

  { id:'cl-tryon', place:'clothing', level:'A1', title:'Trying it on', titleTr:'Denemek', npc:'zoe',
    open:'Would you like to try that on?', openTr:'Onu denemek ister misiniz?',
    br:[
      { i:'Deneme kabini sor', s:'Yes, where are the fitting rooms?', st:'Evet, deneme kabinleri nerede?', a:['Where are the fitting rooms'],
        r:'Just behind you, on the left.', rt:'Hemen arkanızda, solda.', e:{k:'success',t:'Trying on',tt:'Deniyorsun'} },
      { i:'Fikir sor', s:'Does this jacket suit me, honestly?', st:'Bu ceket bana yakışıyor mu, dürüstçe?',
        r:'Honestly? The darker one suits you more.', rt:'Dürüstçe mi? Koyu olanı sana daha çok yakışıyor.', e:{k:'relationship',t:'Honest advice',tt:'Dürüst tavsiye',rel:1} } ] },

  { id:'cl-gift', place:'clothing', level:'B1', title:'Buying a gift', titleTr:'Hediye almak', npc:'zoe',
    open:'Shopping for yourself, or a gift?', openTr:'Kendinize mi yoksa hediye mi?',
    br:[
      { i:'Hediye için yardım iste', s:'A gift for my mother — could you suggest something?', st:'Annem için bir hediye — bir şey önerir misiniz?', a:['A gift for my mum, any suggestions'],
        r:'This silk scarf is very popular. Gift-wrap it?', rt:'Bu ipek eşarp çok popüler. Hediye paketi yapayım mı?',
        f:[ { i:'Paket iste', s:'Yes please, gift-wrapped would be lovely.', st:'Evet lütfen, hediye paketi harika olur.', e:{k:'excellent',t:'Perfect gift',tt:'Mükemmel hediye'} },
            { i:'İade sor', s:'Can she return it if it’s not right?', st:'Uymazsa iade edebilir mi?', e:{k:'success',t:'Safe purchase',tt:'Güvenli alışveriş'} } ] },
      { i:'Bütçe söyle', s:'Something under thirty euros, if possible.', st:'Mümkünse otuz euronun altında bir şey.',
        r:'These gloves are lovely and within budget.', rt:'Bu eldivenler hoş ve bütçeye uygun.', e:{k:'success',t:'On budget',tt:'Bütçeye uygun'} } ] },

  // ---------------- BANK ----------------
  { id:'b-account', place:'bank', level:'B1', title:'Opening an account', titleTr:'Hesap açmak', npc:'david',
    open:'Good morning. How can I help you today?', openTr:'Günaydın. Bugün nasıl yardımcı olabilirim?',
    br:[
      { i:'Hesap aç', s:'I’d like to open a current account, please.', st:'Bir vadesiz hesap açmak istiyorum, lütfen.', a:['I want to open a current account'],
        r:'Certainly. Do you have proof of address?', rt:'Elbette. Adres kanıtınız var mı?',
        f:[ { i:'Evet, var de', s:'Yes, I have a utility bill here.', st:'Evet, burada bir fatura var.', e:{k:'success',t:'Account opened',tt:'Hesap açıldı'} },
            { i:'Ne gerekli sor', s:'What documents exactly do I need?', st:'Tam olarak hangi belgeler gerekiyor?', e:{k:'neutral',t:'Come prepared',tt:'Hazır gel'} } ] },
      { i:'Öğrenci hesabı sor', s:'Do you have a special account for students?', st:'Öğrenciler için özel hesabınız var mı?',
        r:'Yes, with no monthly fee. Interested?', rt:'Evet, aylık ücretsiz. İlgilenir misiniz?', e:{k:'success',t:'Student account',tt:'Öğrenci hesabı'} } ] },

  { id:'b-transfer', place:'bank', level:'B1', title:'Making a transfer', titleTr:'Havale yapmak', npc:'david',
    open:'What can I do for you?', openTr:'Sizin için ne yapabilirim?',
    br:[
      { i:'Havale iste', s:'I need to transfer money to another account.', st:'Başka bir hesaba para göndermem gerekiyor.', a:['I want to transfer money'],
        r:'Of course. Do you have the account details?', rt:'Tabii. Hesap bilgileri sizde mi?', e:{k:'success',t:'Transfer done',tt:'Havale yapıldı'} },
      { i:'Ücret sor', s:'Is there a fee for an international transfer?', st:'Uluslararası havalede ücret var mı?',
        r:'Yes, a small fixed fee of five euros.', rt:'Evet, beş euroluk küçük sabit bir ücret.', e:{k:'neutral',t:'Fee explained',tt:'Ücret açıklandı'} } ] },

  { id:'b-loan', place:'bank', level:'B2', title:'Asking about a loan', titleTr:'Kredi sormak', npc:'david',
    open:'You wanted to discuss financing options?', openTr:'Finansman seçeneklerini görüşmek mi istediniz?',
    br:[
      { i:'Kredi şartını sor', s:'Yes, what are the requirements for a personal loan?', st:'Evet, bireysel kredi için şartlar neler?', a:['What do I need for a personal loan'],
        r:'A steady income and a good credit history.', rt:'Düzenli gelir ve iyi bir kredi geçmişi.',
        f:[ { i:'Faizi sor', s:'And what interest rate would apply?', st:'Peki hangi faiz oranı uygulanır?', e:{k:'success',t:'Well informed',tt:'İyi bilgilendin'} },
            { i:'Düşün de', s:'Thank you — I’ll think it over and come back.', st:'Teşekkürler — düşünüp geri döneceğim.', e:{k:'neutral',t:'Considering it',tt:'Düşünüyorsun'} } ] },
      { i:'Kart limiti iste', s:'Actually, could I just raise my credit-card limit?', st:'Aslında sadece kredi kartı limitimi artırabilir miyim?',
        r:'I can request that for you now.', rt:'Bunu sizin için şimdi talep edebilirim.', e:{k:'success',t:'Limit raised',tt:'Limit artırıldı'} } ] },

  // ---------------- POLICE ----------------
  { id:'po-wallet', place:'police', level:'B1', title:'A stolen wallet', titleTr:'Çalınan cüzdan', npc:'grant',
    open:'Good afternoon. What’s happened?', openTr:'İyi günler. Ne oldu?', emo:'concerned',
    br:[
      { i:'Cüzdanın çalındığını söyle', s:'My wallet was stolen from my bag on the metro.', st:'Cüzdanım metroda çantamdan çalındı.', a:['My wallet was stolen on the metro'],
        r:'I’m sorry. Can you describe when it happened?', rt:'Üzgünüm. Ne zaman olduğunu anlatabilir misiniz?',
        f:[ { i:'Detay ver', s:'About twenty minutes ago, near the exit.', st:'Yaklaşık yirmi dakika önce, çıkışa yakın.', e:{k:'problem-solved',t:'Report filed',tt:'Kayıt açıldı'} },
            { i:'Kart iptali sor', s:'Should I cancel my cards right away?', st:'Kartlarımı hemen iptal ettirmeli miyim?', e:{k:'success',t:'Good advice',tt:'İyi tavsiye'} } ] },
      { i:'Sigorta belgesi iste', s:'I’ll need a report for my insurance.', st:'Sigortam için bir tutanağa ihtiyacım olacak.', tone:'formal',
        r:'Of course — here’s your reference number.', rt:'Tabii — işte referans numaranız.', e:{k:'success',t:'Documented',tt:'Belgelendi'} } ] },

  { id:'po-directions', place:'police', level:'A2', title:'Asking an officer for help', titleTr:'Memurdan yardım', npc:'grant',
    open:'Can I help you with something?', openTr:'Bir konuda yardımcı olabilir miyim?',
    br:[
      { i:'Kaybolduğunu söyle', s:'Yes, I’m lost — how do I get to the station?', st:'Evet, kayboldum — istasyona nasıl giderim?', a:['I’m lost, how do I get to the station'],
        r:'Two streets down, then left. I’ll point you.', rt:'İki sokak aşağı, sonra sola. Göstereyim.', e:{k:'success',t:'Back on track',tt:'Yeniden yolda'} },
      { i:'Kayıp çocuk bildir', s:'I’ve found a lost child near the park.', st:'Parkın yanında kayıp bir çocuk buldum.', diff:'hard',
        r:'Thank you for reporting it — let’s help right away.', rt:'Bildirdiğiniz için teşekkürler — hemen yardım edelim.', e:{k:'excellent',t:'Did the right thing',tt:'Doğru olanı yaptın',rel:1} } ] },

  { id:'po-noise', place:'police', level:'B1', title:'Reporting a disturbance', titleTr:'Rahatsızlık bildirmek', npc:'grant',
    open:'Non-emergency line — how can I help?', openTr:'Acil olmayan hat — nasıl yardımcı olabilirim?',
    br:[
      { i:'Gürültü şikâyeti', s:'There’s a very loud party next door, late at night.', st:'Yan komşuda gece geç saatte çok gürültülü bir parti var.', a:['A loud party next door at night'],
        r:'I’ll send someone to have a word. Your address?', rt:'Konuşması için birini gönderirim. Adresiniz?', e:{k:'problem-solved',t:'Officer sent',tt:'Memur gönderildi'} },
      { i:'Şüpheli durum bildir', s:'I’d like to report a suspicious car on my street.', st:'Sokağımda şüpheli bir araba bildirmek istiyorum.',
        r:'Thanks for the alert — can you describe it?', rt:'Uyarı için teşekkürler — tarif edebilir misiniz?', e:{k:'success',t:'Reported',tt:'Bildirildi'} } ] }
]);
