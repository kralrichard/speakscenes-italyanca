// ============================================================================
// Quick-Practice phrasebook — the "easy way" to add lots of content at scale.
//
// Instead of authoring a full branching graph, each entry is one compact
// [english, turkish] tuple grouped by place → topic → CEFR level. A tiny
// builder flattens them into practice items the Quick Practice screen scores
// with the SAME speech recognizer + scorer + TTS as Story Mode. Adding 20 more
// phrases is literally 20 more one-line tuples — no engine or UI changes.
//
// PhraseItem = { id, en, tr, level, locationId, topic }
// ============================================================================

// place → topic → { LEVEL: [[en, tr], ...] }
const RAW = {
  hotel: {
    'Check-in & booking': {
      A1: [
        ['I have a reservation.', 'Bir rezervasyonum var.'],
        ['My name is Alex Turner.', 'Adım Alex Turner.'],
        ['Here is my passport.', 'İşte pasaportum.'],
        ['A room for two nights, please.', 'İki geceliğine bir oda, lütfen.']
      ],
      A2: [
        ['I’d like to check in, please.', 'Giriş yapmak istiyorum, lütfen.'],
        ['Is breakfast included in the price?', 'Kahvaltı fiyata dahil mi?'],
        ['What time is check-out?', 'Çıkış saati kaçta?'],
        ['Could I have a room with a view?', 'Manzaralı bir oda alabilir miyim?']
      ],
      B1: [
        ['Would it be possible to have a late check-out?', 'Geç çıkış mümkün olur mu?'],
        ['Do you have any rooms available for tonight?', 'Bu gece için boş odanız var mı?']
      ]
    },
    'Problems & requests': {
      A2: [
        ['Could I have some extra towels?', 'Biraz fazladan havlu alabilir miyim?'],
        ['What is the Wi-Fi password?', 'Wi-Fi şifresi nedir?'],
        ['The air conditioning isn’t working.', 'Klima çalışmıyor.']
      ],
      B1: [
        ['I’m afraid the room next door is very noisy.', 'Maalesef yan oda çok gürültülü.'],
        ['My room hasn’t been cleaned yet.', 'Odam henüz temizlenmedi.'],
        ['Could someone help me with my luggage?', 'Bavulumla biri yardım edebilir mi?']
      ]
    }
  },

  airport: {
    'Check-in & bags': {
      A1: [
        ['Here is my boarding pass.', 'İşte biniş kartım.'],
        ['I have one bag to check in.', 'Check-in için bir bavulum var.'],
        ['Where is the gate?', 'Kapı nerede?']
      ],
      A2: [
        ['I’m checking in for the flight to Rome.', 'Roma uçuşu için check-in yapıyorum.'],
        ['Is my luggage over the weight limit?', 'Bavulum ağırlık limitini aşıyor mu?'],
        ['Could I have a window seat, please?', 'Cam kenarı koltuk alabilir miyim, lütfen?']
      ],
      B1: [
        ['Is a digital boarding pass acceptable?', 'Dijital biniş kartı geçerli mi?'],
        ['How much is the excess baggage fee?', 'Fazla bagaj ücreti ne kadar?']
      ]
    },
    'Problems': {
      B1: [
        ['My connecting flight was delayed.', 'Aktarma uçuşum rötar yaptı.'],
        ['I think I’ve missed my flight.', 'Sanırım uçuşumu kaçırdım.'],
        ['Could you put me on the next flight?', 'Beni bir sonraki uçağa alabilir misiniz?'],
        ['My suitcase didn’t arrive on the belt.', 'Valizim banttan çıkmadı.']
      ],
      B2: [
        ['Since the delay was your fault, I’d expect no rebooking fee.', 'Rötar sizin hatanız olduğu için yeniden rezervasyon ücreti beklemem.']
      ]
    }
  },

  restaurant: {
    'Ordering': {
      A1: [
        ['A table for two, please.', 'İki kişilik bir masa, lütfen.'],
        ['Can I see the menu?', 'Menüyü görebilir miyim?'],
        ['I’ll have the chicken, please.', 'Tavuğu alacağım, lütfen.'],
        ['Just water for me, thanks.', 'Bana sadece su, teşekkürler.']
      ],
      A2: [
        ['What would you recommend?', 'Ne önerirsiniz?'],
        ['Could we have a few more minutes?', 'Birkaç dakika daha alabilir miyiz?'],
        ['Does this dish contain nuts?', 'Bu yemekte fındık/fıstık var mı?']
      ],
      B1: [
        ['I’m allergic to seafood, so I’ll avoid that.', 'Deniz ürünlerine alerjim var, o yüzden ondan uzak duracağım.']
      ]
    },
    'Paying & problems': {
      A2: [
        ['Could we have the bill, please?', 'Hesabı alabilir miyiz, lütfen?'],
        ['Can I pay by card?', 'Kartla ödeyebilir miyim?'],
        ['Keep the change.', 'Üstü kalsın.']
      ],
      B1: [
        ['I’m sorry, but this isn’t what I ordered.', 'Üzgünüm ama bu sipariş ettiğim şey değil.'],
        ['The food is a little cold, I’m afraid.', 'Maalesef yemek biraz soğuk.']
      ]
    }
  },

  cafe: {
    'At the counter': {
      A1: [
        ['A coffee, please.', 'Bir kahve, lütfen.'],
        ['Can I have a cup of tea?', 'Bir fincan çay alabilir miyim?'],
        ['To take away, please.', 'Dışarı alacağım, lütfen.'],
        ['How much is it?', 'Ne kadar?']
      ],
      A2: [
        ['I’ll have a large latte, please.', 'Büyük boy bir latte alacağım, lütfen.'],
        ['Do you have any oat milk?', 'Yulaf sütünüz var mı?'],
        ['Could I get that with less sugar?', 'Onu daha az şekerli alabilir miyim?']
      ]
    },
    'Meeting people': {
      B1: [
        ['It’s been ages — how have you been?', 'Çok uzun zaman oldu — nasılsın?'],
        ['What a coincidence to see you here!', 'Seni burada görmek ne tesadüf!'],
        ['Shall we grab a table and catch up?', 'Bir masa tutup sohbet edelim mi?']
      ]
    }
  },

  hospital: {
    'Describing symptoms': {
      A1: [
        ['I don’t feel well.', 'Kendimi iyi hissetmiyorum.'],
        ['I have a headache.', 'Başım ağrıyor.'],
        ['My throat hurts.', 'Boğazım ağrıyor.']
      ],
      A2: [
        ['I’ve had a fever since yesterday.', 'Dünden beri ateşim var.'],
        ['The pain started two days ago.', 'Ağrı iki gün önce başladı.'],
        ['I feel dizzy when I stand up.', 'Ayağa kalkınca başım dönüyor.']
      ],
      B1: [
        ['I’ve been feeling exhausted and I can’t sleep.', 'Çok bitkin hissediyorum ve uyuyamıyorum.'],
        ['I took a painkiller, but it didn’t help.', 'Ağrı kesici aldım ama işe yaramadı.']
      ]
    },
    'Appointments': {
      A2: [
        ['I’d like to make an appointment.', 'Randevu almak istiyorum.'],
        ['When should I come back?', 'Ne zaman geri gelmeliyim?']
      ]
    }
  },

  pharmacy: {
    'Getting medicine': {
      A1: [
        ['I have a cold.', 'Üşüttüm.'],
        ['Do you have something for a cough?', 'Öksürük için bir şeyiniz var mı?']
      ],
      A2: [
        ['Could you recommend something for a sore throat?', 'Boğaz ağrısı için bir şey önerebilir misiniz?'],
        ['How often should I take this?', 'Bunu ne sıklıkta almalıyım?'],
        ['I’d like to fill this prescription.', 'Bu reçeteyi doldurtmak istiyorum.']
      ],
      B1: [
        ['Will this medicine make me drowsy?', 'Bu ilaç beni uykulu yapar mı?'],
        ['Is it safe to take with food?', 'Yemekle almak güvenli mi?']
      ]
    }
  },

  supermarket: {
    'Finding & buying': {
      A1: [
        ['Where is the milk?', 'Süt nerede?'],
        ['How much is this?', 'Bu ne kadar?'],
        ['Do you have any bread?', 'Ekmeğiniz var mı?']
      ],
      A2: [
        ['Which aisle are the eggs in?', 'Yumurtalar hangi koridorda?'],
        ['Do you sell gluten-free products?', 'Glutensiz ürün satıyor musunuz?'],
        ['Can I pay by card here?', 'Burada kartla ödeyebilir miyim?']
      ],
      B1: [
        ['Excuse me, I think I was charged twice for this.', 'Pardon, sanırım bunun için iki kez ücret alındı.']
      ]
    }
  },

  clothing: {
    'Shopping for clothes': {
      A1: [
        ['Can I try this on?', 'Bunu deneyebilir miyim?'],
        ['Do you have this in medium?', 'Bunun orta bedeni var mı?'],
        ['How much is this jacket?', 'Bu ceket ne kadar?']
      ],
      A2: [
        ['Do you have this in a different colour?', 'Bunun farklı bir rengi var mı?'],
        ['This is a little too tight.', 'Bu biraz fazla dar.'],
        ['Where are the fitting rooms?', 'Deneme kabinleri nerede?']
      ],
      B1: [
        ['I’d like to return this — it doesn’t fit.', 'Bunu iade etmek istiyorum — bana olmadı.'],
        ['Can I exchange it for a larger size?', 'Daha büyük bir bedenle değiştirebilir miyim?']
      ]
    }
  },

  train: {
    'Tickets & travel': {
      A1: [
        ['A ticket to London, please.', 'Londra’ya bir bilet, lütfen.'],
        ['Which platform is it?', 'Hangi peron?'],
        ['What time does the train leave?', 'Tren saat kaçta kalkıyor?']
      ],
      A2: [
        ['A return ticket, please.', 'Gidiş-dönüş bilet, lütfen.'],
        ['When is the next train to the city?', 'Şehre bir sonraki tren ne zaman?'],
        ['Is this seat taken?', 'Bu koltuk dolu mu?']
      ],
      B1: [
        ['Is there a student discount available?', 'Öğrenci indirimi var mı?'],
        ['I think I got on the wrong train.', 'Sanırım yanlış trene bindim.']
      ]
    }
  },

  taxi: {
    'Taking a taxi': {
      A1: [
        ['To the airport, please.', 'Havalimanına, lütfen.'],
        ['How much is it?', 'Ne kadar?'],
        ['Stop here, please.', 'Burada durun, lütfen.']
      ],
      A2: [
        ['Could you take me to the Sunrise Hotel?', 'Beni Sunrise Otel’e götürür müsünüz?'],
        ['I’m in a bit of a hurry.', 'Biraz acelem var.'],
        ['Can I pay by card?', 'Kartla ödeyebilir miyim?']
      ],
      B1: [
        ['Could you take the fastest route, please?', 'En hızlı yoldan gider misiniz, lütfen?']
      ]
    }
  },

  bank: {
    'At the bank': {
      A2: [
        ['I’d like to open an account.', 'Bir hesap açmak istiyorum.'],
        ['I need to change some money.', 'Biraz para bozdurmam gerekiyor.'],
        ['What is the exchange rate today?', 'Bugün döviz kuru nedir?']
      ],
      B1: [
        ['I think I’ve lost my bank card.', 'Sanırım banka kartımı kaybettim.'],
        ['There’s a payment I don’t recognize.', 'Tanımadığım bir ödeme var.'],
        ['Could you block my card, please?', 'Kartımı bloke edebilir misiniz, lütfen?']
      ]
    }
  },

  police: {
    'Reporting things': {
      B1: [
        ['I’d like to report a lost phone.', 'Kayıp bir telefon bildirmek istiyorum.'],
        ['I think my bag was stolen.', 'Sanırım çantam çalındı.'],
        ['It happened about an hour ago.', 'Yaklaşık bir saat önce oldu.'],
        ['Could I get a copy of the report?', 'Tutanağın bir kopyasını alabilir miyim?']
      ],
      B2: [
        ['I’ll need this document for my insurance claim.', 'Bu belge sigorta talebim için gerekecek.']
      ]
    }
  },

  street: {
    'Directions & small talk': {
      A1: [
        ['Excuse me, where is the station?', 'Pardon, istasyon nerede?'],
        ['Is it far from here?', 'Buraya uzak mı?'],
        ['Thank you for your help.', 'Yardımın için teşekkürler.']
      ],
      A2: [
        ['Could you tell me how to get to the museum?', 'Müzeye nasıl gideceğimi söyler misiniz?'],
        ['Is there a pharmacy near here?', 'Buralarda bir eczane var mı?'],
        ['Nice to meet you. I’m new here.', 'Tanıştığıma memnun oldum. Buraya yeniyim.']
      ],
      B1: [
        ['Could you tell me where the nearest bank is?', 'En yakın bankanın nerede olduğunu söyler misiniz?'],
        ['Would you like to join us for coffee?', 'Bize kahveye katılmak ister misin?']
      ]
    }
  },

  workplace: {
    'Interviews & office': {
      B1: [
        ['Thank you for inviting me to the interview.', 'Görüşmeye davet ettiğiniz için teşekkürler.'],
        ['I have three years of experience in this field.', 'Bu alanda üç yıllık deneyimim var.'],
        ['Could you tell me more about the role?', 'Bu pozisyon hakkında biraz daha bilgi verir misiniz?']
      ],
      B2: [
        ['I used to take on too much, but I’m learning to delegate.', 'Eskiden fazla iş üstlenirdim ama yetki devretmeyi öğreniyorum.'],
        ['What does success look like in the first six months?', 'İlk altı ayda başarı neye benzer?'],
        ['I think there’s been a misunderstanding — let me explain.', 'Sanırım bir yanlış anlaşılma oldu — açıklayayım.'],
        ['Let’s sort this out together.', 'Bunu birlikte çözelim.']
      ]
    }
  },

  home: {
    'Everyday home talk': {
      A1: [
        ['Good morning! Did you sleep well?', 'Günaydın! İyi uyudun mu?'],
        ['What’s for breakfast?', 'Kahvaltıda ne var?'],
        ['I’m still a bit tired.', 'Hâlâ biraz yorgunum.'],
        ['See you later!', 'Sonra görüşürüz!']
      ],
      A2: [
        ['What are your plans for today?', 'Bugün planların ne?'],
        ['Do you want to go to the market together?', 'Birlikte pazara gitmek ister misin?'],
        ['Can you help me with this, please?', 'Bunda bana yardım eder misin, lütfen?']
      ]
    }
  }
};

// Second batch — same compact format. Kept separate purely so the file stays
// easy to scan; merged with RAW below. Adding more content = add more tuples.
const RAW_EXTRA = {
  hotel: {
    'More at reception': {
      A2: [
        ['Could you call me a taxi for eight o’clock?', 'Saat sekiz için bana bir taksi çağırır mısınız?'],
        ['Is there a gym or a pool in the hotel?', 'Otelde spor salonu ya da havuz var mı?'],
        ['What time does the restaurant open?', 'Restoran saat kaçta açılıyor?'],
        ['Could I leave my bags here until noon?', 'Bavullarımı öğlene kadar burada bırakabilir miyim?']
      ],
      B1: [
        ['I’d like to extend my stay by one night.', 'Konaklamamı bir gece uzatmak istiyorum.'],
        ['Is there a shuttle service to the airport?', 'Havalimanına servis var mı?']
      ]
    }
  },
  airport: {
    'Boarding & onboard': {
      A2: [
        ['Where is passport control?', 'Pasaport kontrolü nerede?'],
        ['Has the flight to Paris started boarding?', 'Paris uçuşu binişe başladı mı?'],
        ['Could I have a glass of water, please?', 'Bir bardak su alabilir miyim, lütfen?']
      ],
      B1: [
        ['I’m here on holiday for two weeks.', 'İki haftalığına tatil için buradayım.'],
        ['I’ll be staying at a hotel in the city centre.', 'Şehir merkezindeki bir otelde kalacağım.']
      ]
    }
  },
  restaurant: {
    'Extra requests': {
      A2: [
        ['Could we sit by the window?', 'Pencere kenarına oturabilir miyiz?'],
        ['Can I have this without onions?', 'Bunu soğansız alabilir miyim?'],
        ['Could I have the recipe? It’s delicious!', 'Tarifini alabilir miyim? Çok lezzetli!']
      ],
      B1: [
        ['Everything was excellent, thank you.', 'Her şey mükemmeldi, teşekkürler.'],
        ['Could we split the bill, please?', 'Hesabı bölüşebilir miyiz, lütfen?']
      ]
    }
  },
  cafe: {
    'More at the café': {
      A1: [
        ['Is this seat free?', 'Bu koltuk boş mu?'],
        ['Can I have a glass of water too?', 'Bir de bir bardak su alabilir miyim?']
      ],
      A2: [
        ['Do you have any cakes today?', 'Bugün kekiniz var mı?'],
        ['Could I get the Wi-Fi password?', 'Wi-Fi şifresini alabilir miyim?']
      ]
    }
  },
  hospital: {
    'At the clinic': {
      A2: [
        ['Do I need a prescription for this?', 'Bunun için reçeteye ihtiyacım var mı?'],
        ['How long will the results take?', 'Sonuçlar ne kadar sürer?'],
        ['Should I rest for a few days?', 'Birkaç gün dinlenmeli miyim?']
      ],
      B1: [
        ['Is there anything I should avoid eating?', 'Yememem gereken bir şey var mı?']
      ]
    }
  },
  pharmacy: {
    'More at the pharmacy': {
      A1: [
        ['Do you have painkillers?', 'Ağrı kesiciniz var mı?'],
        ['I need some plasters, please.', 'Biraz yara bandı gerekiyor, lütfen.']
      ],
      A2: [
        ['Can I take this with other medicine?', 'Bunu başka ilaçla alabilir miyim?'],
        ['Is there a version without sugar?', 'Şekersiz bir türü var mı?']
      ]
    }
  },
  supermarket: {
    'At the checkout': {
      A1: [
        ['Do you have a bag?', 'Poşetiniz var mı?'],
        ['Can I get a receipt?', 'Fiş alabilir miyim?']
      ],
      A2: [
        ['Is this on offer today?', 'Bu bugün indirimde mi?'],
        ['Where can I find the frozen food?', 'Dondurulmuş gıdaları nerede bulabilirim?'],
        ['Do you have a loyalty card?', 'Sadakat kartınız var mı?']
      ]
    }
  },
  clothing: {
    'More shopping': {
      A2: [
        ['Do you have these shoes in size 42?', 'Bu ayakkabıların 42 numarası var mı?'],
        ['Is this on sale?', 'Bu indirimde mi?'],
        ['Can I pay in cash?', 'Nakit ödeyebilir miyim?']
      ],
      B1: [
        ['Do you offer refunds without a receipt?', 'Fişsiz para iadesi yapıyor musunuz?']
      ]
    }
  },
  train: {
    'On the platform': {
      A1: [
        ['Is this the train to London?', 'Bu Londra treni mi?'],
        ['Excuse me, is this seat free?', 'Pardon, bu koltuk boş mu?']
      ],
      A2: [
        ['Do I need to change trains?', 'Aktarma yapmam gerekiyor mu?'],
        ['How long is the journey?', 'Yolculuk ne kadar sürüyor?']
      ]
    }
  },
  taxi: {
    'On the way': {
      A2: [
        ['Could you slow down a little, please?', 'Biraz yavaşlar mısınız, lütfen?'],
        ['Is it far from here?', 'Buraya uzak mı?'],
        ['Could you wait for a few minutes?', 'Birkaç dakika bekler misiniz?']
      ]
    }
  },
  bank: {
    'More at the bank': {
      A2: [
        ['I’d like to withdraw some money.', 'Biraz para çekmek istiyorum.'],
        ['Where is the nearest cash machine?', 'En yakın bankamatik nerede?']
      ],
      B1: [
        ['How long will the new card take to arrive?', 'Yeni kart ne zaman gelir?'],
        ['Could you send it to my address?', 'Adresime gönderebilir misiniz?']
      ]
    }
  },
  police: {
    'More details': {
      B1: [
        ['Can I contact you by email?', 'Sizinle e-posta ile iletişim kurabilir miyim?'],
        ['It’s a black phone in a blue case.', 'Mavi kılıfta siyah bir telefon.'],
        ['I last had it on the number 12 bus.', 'En son 12 numaralı otobüste elimdeydi.']
      ]
    }
  },
  street: {
    'More directions': {
      A2: [
        ['Turn left at the traffic lights.', 'Trafik ışıklarında sola dön.'],
        ['Go straight on for about five minutes.', 'Yaklaşık beş dakika düz git.'],
        ['It’s next to the pharmacy.', 'Eczanenin yanında.'],
        ['Am I going the right way?', 'Doğru yolda mıyım?']
      ]
    },
    'Everyday essentials': {
      A1: [
        ['Excuse me, can you help me?', 'Pardon, yardım edebilir misiniz?'],
        ['I’m sorry, I don’t understand.', 'Üzgünüm, anlamıyorum.'],
        ['Could you say that again, please?', 'Bunu tekrar söyler misiniz, lütfen?'],
        ['Could you speak more slowly, please?', 'Biraz daha yavaş konuşur musunuz, lütfen?'],
        ['How do you say this in English?', 'Bu İngilizce nasıl söylenir?'],
        ['Thank you very much for your help.', 'Yardımınız için çok teşekkürler.']
      ]
    }
  },
  workplace: {
    'Everyday office': {
      A2: [
        ['Could you help me with this task?', 'Bu işte bana yardım eder misin?'],
        ['I’ll send you the report by email.', 'Raporu sana e-posta ile göndereceğim.'],
        ['Can we schedule a meeting for tomorrow?', 'Yarın için bir toplantı ayarlayabilir miyiz?']
      ],
      B1: [
        ['I’m sorry, I’ll send it right away.', 'Özür dilerim, hemen gönderiyorum.']
      ]
    }
  },
  home: {
    'Around the house': {
      A1: [
        ['Can you pass the salt, please?', 'Tuzu uzatır mısın, lütfen?'],
        ['I’m going to the shop. Do you need anything?', 'Markete gidiyorum. Bir şeye ihtiyacın var mı?'],
        ['Dinner is ready!', 'Yemek hazır!']
      ],
      A2: [
        ['Could you turn the music down a little?', 'Müziği biraz kısar mısın?'],
        ['I’ll do the dishes tonight.', 'Bulaşıkları bu gece ben yıkarım.']
      ]
    }
  }
};

// Deep-merge two RAW objects (place → topic → level arrays never collide here
// because RAW_EXTRA uses distinct topic names).
function mergeRaw(a, b) {
  const out = JSON.parse(JSON.stringify(a));
  for (const [place, topics] of Object.entries(b)) {
    out[place] = { ...(out[place] || {}), ...topics };
  }
  return out;
}

// Flatten RAW into a single array with stable ids.
function build(raw) {
  const out = [];
  for (const [locationId, topics] of Object.entries(raw)) {
    for (const [topic, byLevel] of Object.entries(topics)) {
      for (const [level, pairs] of Object.entries(byLevel)) {
        pairs.forEach(([en, tr], i) => {
          out.push({
            id: `${locationId}-${topic.replace(/[^a-z]/gi, '').slice(0, 8)}-${level}-${i}`.toLowerCase(),
            en, tr, level, locationId, topic
          });
        });
      }
    }
  }
  return out;
}

export const PHRASEBOOK = build(mergeRaw(RAW, RAW_EXTRA));

// Group metadata for the Quick Practice screen (icon/label per place), reusing
// the Story environments where possible.
export const PHRASE_PLACES = {
  hotel:       { icon: '🏨', label: 'Hotel',        labelTr: 'Otel' },
  airport:     { icon: '✈️', label: 'Airport',      labelTr: 'Havalimanı' },
  restaurant:  { icon: '🍽️', label: 'Restaurant',   labelTr: 'Restoran' },
  cafe:        { icon: '☕', label: 'Café',          labelTr: 'Kafe' },
  hospital:    { icon: '🏥', label: 'Hospital',      labelTr: 'Hastane' },
  pharmacy:    { icon: '💊', label: 'Pharmacy',      labelTr: 'Eczane' },
  supermarket: { icon: '🛒', label: 'Supermarket',   labelTr: 'Market' },
  clothing:    { icon: '👕', label: 'Clothing Store', labelTr: 'Giyim' },
  train:       { icon: '🚆', label: 'Train Station', labelTr: 'Tren Garı' },
  taxi:        { icon: '🚕', label: 'Taxi',          labelTr: 'Taksi' },
  bank:        { icon: '🏦', label: 'Bank',          labelTr: 'Banka' },
  police:      { icon: '🚓', label: 'Police',        labelTr: 'Karakol' },
  street:      { icon: '🚶', label: 'Out & About',   labelTr: 'Dışarıda' },
  workplace:   { icon: '💼', label: 'Workplace',     labelTr: 'İş Yeri' },
  home:        { icon: '🏠', label: 'Home',          labelTr: 'Ev' }
};

export function phrasesForPlace(locationId) {
  return PHRASEBOOK.filter(p => p.locationId === locationId);
}

export const PHRASEBOOK_COUNT = PHRASEBOOK.length;
