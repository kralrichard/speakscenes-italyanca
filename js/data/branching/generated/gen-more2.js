import { miniAll } from '../miniBuilder.js';

// Final large batch of fresh-topic branching scenarios across everyday places.
export const MORE2 = miniAll([
  // SUPERMARKET
  { id:'s2-outofstock', place:'supermarket', level:'A2', title:'Out of stock', titleTr:'Stokta yok', npc:'tom',
    open:'Can I help you find something?', openTr:'Bir şey bulmanıza yardım edeyim mi?',
    br:[
      { i:'Ürün yok de', s:'The shelf is empty — do you have more bread?', st:'Raf boş — daha ekmeğiniz var mı?', a:['Do you have more bread in the back'],
        r:'Let me check the back for you.', rt:'Sizin için depoya bakayım.', e:{k:'problem-solved',t:'Found more',tt:'Daha bulundu'} },
      { i:'Ne zaman gelir sor', s:'When will you get more in stock?', st:'Ne zaman tekrar stok gelir?',
        r:'Tomorrow morning, first delivery.', rt:'Yarın sabah, ilk teslimat.', e:{k:'neutral',t:'Come back tomorrow',tt:'Yarın gel'} } ] },
  { id:'s2-selfcheckout', place:'supermarket', level:'B1', title:'Self-checkout trouble', titleTr:'Self-servis kasa sorunu', npc:'tom',
    open:'Need a hand with the machine?', openTr:'Makineyle yardım gerekir mi?',
    br:[
      { i:'Hata veriyor de', s:'Yes, it says “unexpected item” but I scanned it.', st:'Evet, "beklenmeyen ürün" diyor ama okuttum.', a:['It says unexpected item'],
        r:'Ah, just place it in the bag — I’ll reset it.', rt:'Ah, poşete koyun yeter — sıfırlayayım.', e:{k:'problem-solved',t:'Sorted',tt:'Halledildi'} },
      { i:'Nakit sor', s:'Can I pay with cash at this machine?', st:'Bu makinede nakit ödeyebilir miyim?',
        r:'This one’s card only — use lane three.', rt:'Bu sadece kart — üç numarayı kullanın.', e:{k:'success',t:'Right lane',tt:'Doğru kasa'} } ] },
  { id:'s2-deli', place:'supermarket', level:'A2', title:'At the deli counter', titleTr:'Şarküteri reyonunda', npc:'tom',
    open:'What can I get you from the deli?', openTr:'Şarküteriden ne alayım?',
    br:[
      { i:'Peynir iste', s:'Two hundred grams of cheese, please.', st:'İki yüz gram peynir, lütfen.', a:['200 grams of cheese please'],
        r:'Sliced or in a block?', rt:'Dilimli mi parça mı?', e:{k:'success',t:'Deli sorted',tt:'Şarküteri tamam'} },
      { i:'Tatmak iste', s:'Could I try a small piece first?', st:'Önce küçük bir parça tadabilir miyim?',
        r:'Of course, here you go!', rt:'Tabii, buyurun!', e:{k:'success',t:'Tasted first',tt:'Önce tattın'} } ] },

  // CLOTHING
  { id:'cl2-alter', place:'clothing', level:'B1', title:'Getting trousers altered', titleTr:'Pantolon tadilatı', npc:'zoe',
    open:'How do the trousers fit?', openTr:'Pantolon nasıl oldu?',
    br:[
      { i:'Uzun de', s:'They’re great, but a bit long. Can they be shortened?', st:'Güzel ama biraz uzun. Kısaltılabilir mi?', a:['They’re a bit long, can you shorten them'],
        r:'Certainly — ready by Friday, no charge.', rt:'Tabii — cumaya hazır, ücretsiz.', e:{k:'success',t:'Perfect fit soon',tt:'Yakında tam olacak'} },
      { i:'Bel sor', s:'The waist feels tight — is there a bigger size?', st:'Bel dar geldi — daha büyük beden var mı?',
        r:'Let me grab the next size up.', rt:'Bir üst bedeni getireyim.', e:{k:'success',t:'Better fit',tt:'Daha iyi oturdu'} } ] },
  { id:'cl2-sale', place:'clothing', level:'A2', title:'Asking about the sale', titleTr:'İndirimi sormak', npc:'zoe',
    open:'Everything on this rail is on sale!', openTr:'Bu askıdaki her şey indirimde!',
    br:[
      { i:'İndirim oranı sor', s:'Great! How much off is this coat?', st:'Harika! Bu paltoda ne kadar indirim var?', a:['How much off is this coat'],
        r:'Fifty percent — a real bargain.', rt:'Yüzde elli — gerçek bir kelepir.', e:{k:'success',t:'Bargain found',tt:'Kelepir bulundu'} },
      { i:'İade sor', s:'Can sale items still be returned?', st:'İndirimli ürünler yine de iade edilebilir mi?',
        r:'Yes, within fourteen days with the receipt.', rt:'Evet, fişle on dört gün içinde.', e:{k:'success',t:'Safe buy',tt:'Güvenli alışveriş'} } ] },
  { id:'cl2-shoes', place:'clothing', level:'A2', title:'Buying shoes', titleTr:'Ayakkabı almak', npc:'zoe',
    open:'Can I measure your foot size?', openTr:'Ayak numaranızı ölçebilir miyim?',
    br:[
      { i:'Numara iste', s:'Yes, do you have these in a 43?', st:'Evet, bunların 43 numarası var mı?', a:['Do you have these in size 43'],
        r:'Let me check… yes, one pair left.', rt:'Bakayım… evet, bir çift kaldı.', e:{k:'success',t:'Just in time',tt:'Tam zamanında'} },
      { i:'Rahat mı sor', s:'Are these comfortable for a lot of walking?', st:'Bunlar çok yürümek için rahat mı?',
        r:'Very — they’re our best for travel.', rt:'Çok — seyahat için en iyimiz.', e:{k:'success',t:'Comfy choice',tt:'Rahat seçim'} } ] },

  // TRAIN
  { id:'t2-luggage', place:'train', level:'A2', title:'Where to put luggage', titleTr:'Bavul nereye', npc:'nina',
    open:'Boarding now — do you need help?', openTr:'Şimdi biniş — yardım gerekir mi?',
    br:[
      { i:'Bavul yeri sor', s:'Yes, where can I put my large suitcase?', st:'Evet, büyük valizimi nereye koyabilirim?', a:['Where do I put my suitcase'],
        r:'The rack at the end of the carriage.', rt:'Vagonun sonundaki rafta.', e:{k:'success',t:'Stored',tt:'Yerleştirildi'} },
      { i:'Yardım iste', s:'It’s heavy — could you give me a hand?', st:'Ağır — bana yardım eder misiniz?',
        r:'Of course, let me lift that for you.', rt:'Tabii, onu sizin için kaldırayım.', e:{k:'relationship',t:'Kind help',tt:'Nazik yardım',rel:1} } ] },
  { id:'t2-delay-train', place:'train', level:'B1', title:'A delayed train', titleTr:'Rötarlı tren', npc:'nina',
    open:'The 3:15 is running late, I’m afraid.', openTr:'Maalesef 3:15 gecikiyor.', emo:'apologetic',
    br:[
      { i:'Süre sor', s:'How late is it expected to be?', st:'Ne kadar geç olması bekleniyor?', a:['How long is the delay'],
        r:'About twenty minutes. Sorry for the wait.', rt:'Yaklaşık yirmi dakika. Bekleme için üzgünüm.', e:{k:'neutral',t:'Short wait',tt:'Kısa bekleme'} },
      { i:'Bağlantı sor', s:'Will I still catch my connection at Leeds?', st:'Leeds’teki aktarmamı yine yakalar mıyım?',
        r:'It’ll be tight — I’ll note it for the guard.', rt:'Sıkışık olacak — görevliye not düşeyim.', e:{k:'problem-solved',t:'Guard informed',tt:'Görevli bilgilendirildi'} } ] },
  { id:'t2-firstclass', place:'train', level:'B1', title:'Upgrading to first class', titleTr:'Birinci mevkiye geçmek', npc:'nina',
    open:'Can I see your ticket, please?', openTr:'Biletinizi görebilir miyim, lütfen?',
    br:[
      { i:'Yükseltme iste', s:'Could I upgrade to first class for this journey?', st:'Bu yolculuk için birinci mevkiye geçebilir miyim?', a:['Can I upgrade to first class'],
        r:'Yes, it’s fifteen euros extra. Interested?', rt:'Evet, on beş euro fark. İster misiniz?', e:{k:'success',t:'Upgraded',tt:'Yükseltildi'} },
      { i:'Fark sor', s:'What do I get in first class?', st:'Birinci mevkide ne alıyorum?',
        r:'A bigger seat, quiet, and free coffee.', rt:'Daha büyük koltuk, sessizlik ve ücretsiz kahve.', e:{k:'neutral',t:'Good to know',tt:'İyi bilgi'} } ] },

  // TAXI
  { id:'x2-airport-run', place:'taxi', level:'A2', title:'A rush to the airport', titleTr:'Havalimanına yetişme', npc:'victor',
    open:'Where to? You look in a hurry.', openTr:'Nereye? Aceleniz var gibi.',
    br:[
      { i:'Acele söyle', s:'The airport, fast — my flight leaves in an hour!', st:'Havalimanı, hızlı — uçağım bir saate kalkıyor!', a:['The airport quickly, my flight is soon'],
        r:'Hold on — I know a shortcut!', rt:'Sıkı tutun — bir kestirme biliyorum!', e:{k:'problem-solved',t:'Made it',tt:'Yetiştin'} },
      { i:'Süre sor', s:'How long does it take at this time of day?', st:'Günün bu saatinde ne kadar sürer?',
        r:'Twenty minutes if the road’s clear.', rt:'Yol açıksa yirmi dakika.', e:{k:'success',t:'Plenty of time',tt:'Bolca zaman'} } ] },
  { id:'x2-scenic', place:'taxi', level:'B1', title:'The scenic route', titleTr:'Manzaralı yol', npc:'victor',
    open:'First time in town? I could show you the sights.', openTr:'Şehirde ilk kez mi? Manzaraları gösterebilirim.',
    br:[
      { i:'Kabul et', s:'That sounds lovely — take the scenic route.', st:'Kulağa hoş geliyor — manzaralı yoldan gidin.', a:['Yes, take the scenic route'],
        r:'You’ll love the view from the hill.', rt:'Tepeden manzaraya bayılacaksınız.', e:{k:'relationship',t:'Lovely ride',tt:'Hoş yolculuk',rel:1} },
      { i:'Doğrudan git de', s:'Maybe another time — the direct way today, thanks.', st:'Belki başka zaman — bugün doğrudan, teşekkürler.',
        r:'No problem, straight there it is.', rt:'Sorun değil, doğruca gidiyoruz.', e:{k:'neutral',t:'Straight there',tt:'Doğruca'} } ] },
  { id:'x2-splitfare', place:'taxi', level:'A2', title:'Sharing a taxi', titleTr:'Taksi paylaşmak', npc:'victor',
    open:'Two stops? That’s fine with me.', openTr:'İki durak mı? Benim için sorun değil.',
    br:[
      { i:'İki durak söyle', s:'Yes, drop my friend first, then me at the hotel.', st:'Evet, önce arkadaşımı, sonra beni otele bırakın.', a:['Drop my friend first, then me at the hotel'],
        r:'Got it. I’ll split the fare fairly.', rt:'Anladım. Ücreti adilce bölerim.', e:{k:'success',t:'Fair fare',tt:'Adil ücret'} },
      { i:'Ücret sor', s:'How will you split the price between us?', st:'Ücreti aramızda nasıl böleceksiniz?',
        r:'By distance — the meter shows each part.', rt:'Mesafeye göre — taksimetre her kısmı gösterir.', e:{k:'success',t:'Clear split',tt:'Net bölüşüm'} } ] },

  // BANK
  { id:'b2-atm', place:'bank', level:'A2', title:'The ATM ate my card', titleTr:'Bankamatik kartı yuttu', npc:'david',
    open:'You look frustrated — what’s the matter?', openTr:'Sinirli görünüyorsunuz — sorun nedir?', emo:'concerned',
    br:[
      { i:'Kart yutuldu de', s:'The cash machine kept my card and won’t return it.', st:'Bankamatik kartımı yuttu ve geri vermiyor.', a:['The ATM kept my card'],
        r:'I can retrieve it. May I see some ID?', rt:'Onu alabilirim. Kimliğinizi görebilir miyim?', e:{k:'problem-solved',t:'Card returned',tt:'Kart geri geldi'} },
      { i:'Yeni kart iste', s:'If it’s stuck, could you just issue a new one?', st:'Sıkıştıysa yenisini verebilir misiniz?',
        r:'Certainly — I’ll cancel that one and print a new card.', rt:'Tabii — onu iptal edip yeni kart basayım.', e:{k:'success',t:'New card',tt:'Yeni kart'} } ] },
  { id:'b2-statement', place:'bank', level:'B1', title:'A confusing statement', titleTr:'Karışık hesap özeti', npc:'david',
    open:'You had a question about your statement?', openTr:'Hesap özetinizle ilgili bir sorunuz mu vardı?',
    br:[
      { i:'Ödemeyi sorgula', s:'Yes, what is this charge I don’t recognize?', st:'Evet, tanımadığım bu ücret nedir?', a:['What is this charge I don’t recognize'],
        r:'Let me look… it’s a monthly subscription.', rt:'Bakayım… bu aylık bir abonelik.',
        f:[ { i:'İptal iste', s:'I never signed up for that — can you stop it?', st:'Buna hiç kaydolmadım — durdurabilir misiniz?', e:{k:'problem-solved',t:'Stopped it',tt:'Durduruldu'} },
            { i:'Anladım de', s:'Oh, right — I forgot about that. Thanks.', st:'Ah, doğru — onu unutmuşum. Teşekkürler.', e:{k:'success',t:'Mystery solved',tt:'Gizem çözüldü'} } ] },
      { i:'Kopya iste', s:'Could I get a printed copy of last month’s statement?', st:'Geçen ayın özetinin bir çıktısını alabilir miyim?',
        r:'Of course, printing it now.', rt:'Tabii, şimdi yazdırıyorum.', e:{k:'success',t:'Copy printed',tt:'Kopya alındı'} } ] },
  { id:'b2-mortgage', place:'bank', level:'B2', title:'A mortgage question', titleTr:'Konut kredisi sorusu', npc:'david',
    open:'You’re thinking about buying a home?', openTr:'Ev almayı mı düşünüyorsunuz?',
    br:[
      { i:'Şart sor', s:'Yes — what would I need to qualify for a mortgage?', st:'Evet — konut kredisine hak kazanmak için ne gerekir?', a:['What do I need for a mortgage'],
        r:'A deposit, steady income, and a good credit score.', rt:'Peşinat, düzenli gelir ve iyi bir kredi notu.', e:{k:'success',t:'Well informed',tt:'İyi bilgilendin'} },
      { i:'Randevu iste', s:'Could I book an appointment with an adviser?', st:'Bir danışmanla randevu alabilir miyim?',
        r:'Certainly, how about Thursday morning?', rt:'Elbette, perşembe sabahı nasıl?', e:{k:'success',t:'Appointment set',tt:'Randevu ayarlandı'} } ] },

  // POLICE
  { id:'po2-bike', place:'police', level:'B1', title:'A stolen bicycle', titleTr:'Çalınan bisiklet', npc:'grant',
    open:'What can I help you report?', openTr:'Ne bildirmenize yardımcı olabilirim?', emo:'concerned',
    br:[
      { i:'Bisikleti bildir', s:'My bicycle was stolen from outside the library.', st:'Bisikletim kütüphanenin önünden çalındı.', a:['My bike was stolen from the library'],
        r:'I’m sorry. Do you have the serial number?', rt:'Üzgünüm. Seri numarası sizde mi?',
        f:[ { i:'Numarayı ver', s:'Yes, I photographed it when I bought it.', st:'Evet, aldığımda fotoğrafını çekmiştim.', e:{k:'excellent',t:'Well prepared',tt:'İyi hazırlanmış'} },
            { i:'Tarif et', s:'No, but it’s a red mountain bike with a basket.', st:'Hayır ama sepetli kırmızı bir dağ bisikleti.', e:{k:'problem-solved',t:'Report filed',tt:'Kayıt açıldı'} } ] },
      { i:'Kamera sor', s:'Are there cameras near the library I could check?', st:'Kütüphane yakınında bakabileceğim kamera var mı?',
        r:'There are — I’ll request the footage.', rt:'Var — görüntüleri talep edeceğim.', e:{k:'success',t:'Good lead',tt:'İyi ipucu'} } ] },
  { id:'po2-neighbour', place:'police', level:'B2', title:'A neighbour dispute', titleTr:'Komşu anlaşmazlığı', npc:'grant',
    open:'You wanted advice about a neighbour issue?', openTr:'Bir komşu meselesiyle ilgili tavsiye mi istediniz?',
    br:[
      { i:'Durumu anlat', s:'Yes, my neighbour keeps blocking my driveway.', st:'Evet, komşum sürekli araç yolumu kapatıyor.', a:['My neighbour blocks my driveway'],
        r:'Have you spoken to them politely first?', rt:'Önce onlarla kibarca konuştunuz mu?',
        f:[ { i:'Denedim de', s:'I have, several times, but nothing changes.', st:'Konuştum, birkaç kez, ama bir şey değişmiyor.', e:{k:'success',t:'Next steps given',tt:'Sonraki adımlar verildi'} },
            { i:'Nasıl derim sor', s:'Not yet — how should I raise it with them?', st:'Henüz değil — bunu onlara nasıl açmalıyım?', e:{k:'success',t:'Good approach',tt:'İyi yaklaşım'} } ] },
      { i:'Resmî şikâyet sor', s:'How do I make a formal complaint if it continues?', st:'Devam ederse nasıl resmî şikâyet ederim?',
        r:'I’ll give you the form and explain the process.', rt:'Formu verip süreci anlatayım.', e:{k:'success',t:'Knows the process',tt:'Süreci biliyor'} } ] },

  // STREET
  { id:'st2-bus', place:'street', level:'A1', title:'Which bus to take', titleTr:'Hangi otobüs', npc:'sophie',
    open:'Waiting for a bus? Where are you off to?', openTr:'Otobüs mü bekliyorsun? Nereye gidiyorsun?',
    br:[
      { i:'Otobüs sor', s:'The city centre — which bus should I take?', st:'Şehir merkezi — hangi otobüse binmeliyim?', a:['Which bus goes to the city centre'],
        r:'The number 5 — it stops right here.', rt:'5 numara — tam burada duruyor.', e:{k:'success',t:'Right bus',tt:'Doğru otobüs'} },
      { i:'Bilet sor', s:'Do I buy the ticket on the bus?', st:'Bileti otobüste mi alıyorum?',
        r:'Yes, from the driver, exact change is best.', rt:'Evet, şoförden, bozuk para iyi olur.', e:{k:'success',t:'Ready to ride',tt:'Binmeye hazır'} } ] },
  { id:'st2-charity', place:'street', level:'B1', title:'A charity collector stops you', titleTr:'Bağış toplayan biri durduruyor', npc:'leo',
    open:'Hi! Have you got a moment for children’s charity?', openTr:'Selam! Çocuk hayrı için bir dakikanız var mı?',
    br:[
      { i:'Kibarca reddet', s:'I’d rather not commit today, but thank you.', st:'Bugün taahhütte bulunmak istemem ama teşekkürler.', a:['Not today, but thank you'],
        r:'No problem at all — have a lovely day!', rt:'Hiç sorun değil — güzel bir gün!', e:{k:'success',t:'Polite no',tt:'Kibar bir hayır'} },
      { i:'Bilgi iste', s:'Tell me more first — what does the money fund?', st:'Önce anlat — para neyi finanse ediyor?',
        r:'It funds school meals for children in need.', rt:'İhtiyaç sahibi çocuklara okul yemeği sağlıyor.', e:{k:'relationship',t:'Made a difference',tt:'Fark yarattın',rel:1} } ] },
  { id:'st2-neighbourhi', place:'street', level:'A2', title:'Meeting a neighbour', titleTr:'Komşuyla tanışmak', npc:'sophie',
    open:'Oh, hello! Have you just moved in next door?', openTr:'Aa, merhaba! Yeni mi taşındın yan eve?',
    br:[
      { i:'Tanış', s:'Yes, just last week! I’m Sam, nice to meet you.', st:'Evet, geçen hafta! Ben Sam, tanıştığıma memnun oldum.', a:['Yes last week, I’m Sam nice to meet you'],
        r:'Welcome to the street! I’m Sophie.', rt:'Sokağa hoş geldin! Ben Sophie.', e:{k:'relationship',t:'New neighbour',tt:'Yeni komşu',rel:1} },
      { i:'Mahalleyi sor', s:'Thanks! Is there a good bakery nearby?', st:'Teşekkürler! Yakınlarda iyi bir fırın var mı?',
        r:'The best one is just around the corner.', rt:'En iyisi hemen köşede.', e:{k:'success',t:'Local tip',tt:'Yerel ipucu'} } ] },

  // HOME
  { id:'ho2-repair', place:'home', level:'B1', title:'Calling about a repair', titleTr:'Tamir için arama', npc:'daniel',
    open:'Maintenance line — what seems to be the problem?', openTr:'Bakım hattı — sorun nedir?',
    br:[
      { i:'Musluk akıyor de', s:'My kitchen tap is leaking and won’t stop.', st:'Mutfak musluğum akıyor ve durmuyor.', a:['My kitchen tap is leaking'],
        r:'I’ll send a plumber this afternoon.', rt:'Öğleden sonra bir tesisatçı gönderirim.', e:{k:'problem-solved',t:'Plumber coming',tt:'Tesisatçı geliyor'} },
      { i:'Isıtma çalışmıyor de', s:'The heating won’t turn on and it’s freezing.', st:'Isıtma açılmıyor ve hava buz gibi.',
        r:'That’s urgent — someone will come within the hour.', rt:'Bu acil — bir saat içinde biri gelecek.', e:{k:'success',t:'Urgent help',tt:'Acil yardım'} } ] },
  { id:'ho2-neighbour', place:'home', level:'A2', title:'Borrowing from a neighbour', titleTr:'Komşudan ödünç almak', npc:'sophie',
    open:'Hi! Everything alright?', openTr:'Selam! Her şey yolunda mı?',
    br:[
      { i:'Şeker ödünç iste', s:'Sorry to bother you — could I borrow some sugar?', st:'Rahatsız ettiğim için üzgünüm — biraz şeker ödünç alabilir miyim?', a:['Could I borrow some sugar'],
        r:'Of course! Come in, I’ll get you some.', rt:'Tabii! Gir, sana biraz vereyim.', e:{k:'relationship',t:'Kind neighbour',tt:'Nazik komşu',rel:1} },
      { i:'Yardım iste', s:'Could you help me lift something heavy for a second?', st:'Bir saniye ağır bir şeyi kaldırmama yardım eder misin?',
        r:'Sure, lead the way!', rt:'Tabii, önden buyur!', e:{k:'relationship',t:'Helpful neighbour',tt:'Yardımsever komşu',rel:1} } ] },
  { id:'ho2-delivery', place:'home', level:'A2', title:'A delivery arrives', titleTr:'Bir teslimat geldi', npc:'pat',
    open:'Delivery for you — could you sign here?', openTr:'Size teslimat — buraya imza atar mısınız?',
    br:[
      { i:'İmzala', s:'Sure, where do I sign?', st:'Tabii, nereye imza atayım?', a:['Where do I sign'],
        r:'Right here, thank you. Have a good day!', rt:'Tam burada, teşekkürler. İyi günler!', e:{k:'success',t:'Parcel received',tt:'Paket alındı'} },
      { i:'Komşuya bırak de', s:'I’m heading out — could you leave it next door?', st:'Çıkıyorum — yan komşuya bırakabilir misiniz?',
        r:'No problem, I’ll leave a note for you.', rt:'Sorun değil, size bir not bırakırım.', e:{k:'success',t:'Sorted',tt:'Halledildi'} } ] },

  // WORKPLACE
  { id:'w2-sick', place:'workplace', level:'B1', title:'Calling in sick', titleTr:'Hastalık bildirmek', npc:'carter',
    open:'Good morning. Everything okay? You don’t sound well.', openTr:'Günaydın. Her şey yolunda mı? Sesin iyi gelmiyor.', emo:'concerned',
    br:[
      { i:'Hasta olduğunu söyle', s:'I’m not well — I’d like to take a sick day.', st:'İyi değilim — bir hastalık izni almak istiyorum.', a:['I’m sick, I need a day off'],
        r:'Of course, rest up. I’ll cover your meetings.', rt:'Tabii, dinlen. Toplantılarını ben devralırım.', e:{k:'success',t:'Rest approved',tt:'İzin onaylandı'} },
      { i:'Uzaktan çalışırım de', s:'I’m unwell but could work from home today.', st:'Rahatsızım ama bugün evden çalışabilirim.',
        r:'Only if you’re up to it — no pressure.', rt:'Sadece hâlin varsa — baskı yok.', e:{k:'success',t:'Flexible day',tt:'Esnek gün'} } ] },
  { id:'w2-raise', place:'workplace', level:'C1', title:'Asking for a raise', titleTr:'Zam istemek', npc:'carter',
    open:'You wanted to discuss your role. Go ahead.', openTr:'Rolünü konuşmak istemişsin. Buyur.',
    br:[
      { i:'Zam iste', s:'I’ve taken on more responsibility, and I’d like to discuss my salary.', st:'Daha fazla sorumluluk aldım ve maaşımı görüşmek istiyorum.', a:['I’d like to discuss a salary increase'],
        r:'You have. Make your case — what are you asking for?', rt:'Aldın. Gerekçeni sun — ne talep ediyorsun?',
        f:[ { i:'Rakam ver', s:'Given my results, I believe a ten percent rise is fair.', st:'Sonuçlarım göz önüne alınırsa yüzde on zammın adil olduğuna inanıyorum.', e:{k:'excellent',t:'Well argued',tt:'İyi savundun',rel:1} },
            { i:'Esneklik iste', s:'If not salary, could we discuss extra leave?', st:'Maaş olmazsa, ek izin konuşabilir miyiz?', e:{k:'success',t:'Creative deal',tt:'Yaratıcı anlaşma'} } ] },
      { i:'Terfi sor', s:'I’d also like to know my path to a senior role.', st:'Ayrıca kıdemli role giden yolumu da öğrenmek isterim.',
        r:'Let’s map that out together — good ambition.', rt:'Bunu beraber planlayalım — güzel hedef.', e:{k:'success',t:'Career mapped',tt:'Kariyer planlandı'} } ] },
  { id:'w2-conflict', place:'workplace', level:'B2', title:'Disagreeing respectfully', titleTr:'Saygıyla karşı çıkmak', npc:'raj',
    open:'I think we should launch next week. What do you reckon?', openTr:'Bence gelecek hafta çıkmalıyız. Sen ne dersin?',
    br:[
      { i:'Nazikçe itiraz et', s:'I see your point, but I think we need more testing first.', st:'Fikrini anlıyorum ama önce daha fazla test gerektiğini düşünüyorum.', a:['I think we need more testing first'],
        r:'Fair — what risks worry you most?', rt:'Adil — en çok hangi riskler endişelendiriyor?', e:{k:'excellent',t:'Constructive debate',tt:'Yapıcı tartışma',rel:1} },
      { i:'Uzlaşma öner', s:'Could we launch a small test version next week instead?', st:'Onun yerine gelecek hafta küçük bir test sürümü çıkarsak?',
        r:'I like that — a smart compromise.', rt:'Bunu sevdim — akıllıca bir uzlaşma.', e:{k:'success',t:'Compromise reached',tt:'Uzlaşıldı'} } ] }
]);
