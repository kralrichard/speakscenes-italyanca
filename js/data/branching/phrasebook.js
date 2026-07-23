// ============================================================================
// Quick-Practice phrasebook — the "easy way" to add lots of content at scale.
//
// Instead of authoring a full branching graph, each entry is one compact
// [italian, turkish] tuple grouped by place → topic → CEFR level. A tiny
// builder flattens them into practice items the Quick Practice screen scores
// with the SAME speech recognizer + scorer + TTS as Story Mode. Adding 20 more
// phrases is literally 20 more one-line tuples — no engine or UI changes.
//
// PhraseItem = { id, en, tr, level, locationId, topic }
// ============================================================================

// place → topic → { LEVEL: [[it, tr], ...] }
const RAW = {
  hotel: {
    'Check-in & booking': {
      A1: [
        ['Ho una prenotazione.', 'Bir rezervasyonum var.'],
        ['Mi chiamo Alex Turner.', 'Adım Alex Turner.'],
        ['Ecco il mio passaporto.', 'İşte pasaportum.'],
        ['Una stanza per due notti, per favore.', 'İki geceliğine bir oda, lütfen.']
      ],
      A2: [
        ['Vorrei fare il check-in, per favore.', 'Giriş yapmak istiyorum, lütfen.'],
        ['La colazione è inclusa nel prezzo?', 'Kahvaltı fiyata dahil mi?'],
        ['A che ora è il check-out?', 'Çıkış saati kaçta?'],
        ['Potrei avere una stanza con vista?', 'Manzaralı bir oda alabilir miyim?']
      ],
      B1: [
        ['Sarebbe possibile un check-out posticipato?', 'Geç çıkış mümkün olur mu?'],
        ['Avete stanze disponibili per stanotte?', 'Bu gece için boş odanız var mı?']
      ]
    },
    'Problems & requests': {
      A2: [
        ['Potrei avere degli asciugamani in più?', 'Biraz fazladan havlu alabilir miyim?'],
        ['Qual è la password del Wi-Fi?', 'Wi-Fi şifresi nedir?'],
        ['L’aria condizionata non funziona.', 'Klima çalışmıyor.']
      ],
      B1: [
        ['Purtroppo la stanza accanto è molto rumorosa.', 'Maalesef yan oda çok gürültülü.'],
        ['La mia stanza non è ancora stata pulita.', 'Odam henüz temizlenmedi.'],
        ['Qualcuno potrebbe aiutarmi con i bagagli?', 'Bavulumla biri yardım edebilir mi?']
      ]
    }
  },

  airport: {
    'Check-in & bags': {
      A1: [
        ['Ecco la mia carta d’imbarco.', 'İşte biniş kartım.'],
        ['Ho un bagaglio da imbarcare.', 'Check-in için bir bavulum var.'],
        ['Dov’è il gate?', 'Kapı nerede?']
      ],
      A2: [
        ['Faccio il check-in per il volo per Roma.', 'Roma uçuşu için check-in yapıyorum.'],
        ['Il mio bagaglio supera il limite di peso?', 'Bavulum ağırlık limitini aşıyor mu?'],
        ['Potrei avere un posto al finestrino, per favore?', 'Cam kenarı koltuk alabilir miyim, lütfen?']
      ],
      B1: [
        ['Va bene una carta d’imbarco digitale?', 'Dijital biniş kartı geçerli mi?'],
        ['Quanto costa il sovrapprezzo per il bagaglio in eccesso?', 'Fazla bagaj ücreti ne kadar?']
      ]
    },
    'Problems': {
      B1: [
        ['Il mio volo in coincidenza era in ritardo.', 'Aktarma uçuşum rötar yaptı.'],
        ['Credo di aver perso il volo.', 'Sanırım uçuşumu kaçırdım.'],
        ['Potreste mettermi sul prossimo volo?', 'Beni bir sonraki uçağa alabilir misiniz?'],
        ['La mia valigia non è arrivata sul nastro.', 'Valizim banttan çıkmadı.']
      ],
      B2: [
        ['Dato che il ritardo è colpa vostra, non mi aspetto penali di riprenotazione.', 'Rötar sizin hatanız olduğu için yeniden rezervasyon ücreti beklemem.']
      ]
    }
  },

  restaurant: {
    'Ordering': {
      A1: [
        ['Un tavolo per due, per favore.', 'İki kişilik bir masa, lütfen.'],
        ['Posso vedere il menù?', 'Menüyü görebilir miyim?'],
        ['Prendo il pollo, per favore.', 'Tavuğu alacağım, lütfen.'],
        ['Solo acqua per me, grazie.', 'Bana sadece su, teşekkürler.']
      ],
      A2: [
        ['Cosa mi consiglia?', 'Ne önerirsiniz?'],
        ['Possiamo avere ancora qualche minuto?', 'Birkaç dakika daha alabilir miyiz?'],
        ['Questo piatto contiene frutta secca?', 'Bu yemekte fındık/fıstık var mı?']
      ],
      B1: [
        ['Sono allergico ai frutti di mare, quindi li eviterò.', 'Deniz ürünlerine alerjim var, o yüzden ondan uzak duracağım.']
      ]
    },
    'Paying & problems': {
      A2: [
        ['Possiamo avere il conto, per favore?', 'Hesabı alabilir miyiz, lütfen?'],
        ['Posso pagare con la carta?', 'Kartla ödeyebilir miyim?'],
        ['Tenga il resto.', 'Üstü kalsın.']
      ],
      B1: [
        ['Mi dispiace, ma non è quello che ho ordinato.', 'Üzgünüm ama bu sipariş ettiğim şey değil.'],
        ['Purtroppo il cibo è un po’ freddo.', 'Maalesef yemek biraz soğuk.']
      ]
    }
  },

  cafe: {
    'At the counter': {
      A1: [
        ['Un caffè, per favore.', 'Bir kahve, lütfen.'],
        ['Posso avere una tazza di tè?', 'Bir fincan çay alabilir miyim?'],
        ['Da portare via, per favore.', 'Dışarı alacağım, lütfen.'],
        ['Quanto costa?', 'Ne kadar?']
      ],
      A2: [
        ['Prendo un latte macchiato grande, per favore.', 'Büyük boy bir latte alacağım, lütfen.'],
        ['Avete del latte d’avena?', 'Yulaf sütünüz var mı?'],
        ['Potrei averlo con meno zucchero?', 'Onu daha az şekerli alabilir miyim?']
      ]
    },
    'Meeting people': {
      B1: [
        ['È passato un secolo — come stai?', 'Çok uzun zaman oldu — nasılsın?'],
        ['Che coincidenza vederti qui!', 'Seni burada görmek ne tesadüf!'],
        ['Prendiamo un tavolo e ci raccontiamo?', 'Bir masa tutup sohbet edelim mi?']
      ]
    }
  },

  hospital: {
    'Describing symptoms': {
      A1: [
        ['Non mi sento bene.', 'Kendimi iyi hissetmiyorum.'],
        ['Ho mal di testa.', 'Başım ağrıyor.'],
        ['Mi fa male la gola.', 'Boğazım ağrıyor.']
      ],
      A2: [
        ['Ho la febbre da ieri.', 'Dünden beri ateşim var.'],
        ['Il dolore è iniziato due giorni fa.', 'Ağrı iki gün önce başladı.'],
        ['Mi gira la testa quando mi alzo.', 'Ayağa kalkınca başım dönüyor.']
      ],
      B1: [
        ['Mi sento esausto e non riesco a dormire.', 'Çok bitkin hissediyorum ve uyuyamıyorum.'],
        ['Ho preso un antidolorifico, ma non è servito.', 'Ağrı kesici aldım ama işe yaramadı.']
      ]
    },
    'Appointments': {
      A2: [
        ['Vorrei prendere un appuntamento.', 'Randevu almak istiyorum.'],
        ['Quando dovrei tornare?', 'Ne zaman geri gelmeliyim?']
      ]
    }
  },

  pharmacy: {
    'Getting medicine': {
      A1: [
        ['Ho il raffreddore.', 'Üşüttüm.'],
        ['Avete qualcosa per la tosse?', 'Öksürük için bir şeyiniz var mı?']
      ],
      A2: [
        ['Può consigliarmi qualcosa per il mal di gola?', 'Boğaz ağrısı için bir şey önerebilir misiniz?'],
        ['Ogni quanto devo prenderlo?', 'Bunu ne sıklıkta almalıyım?'],
        ['Vorrei ritirare questa ricetta.', 'Bu reçeteyi doldurtmak istiyorum.']
      ],
      B1: [
        ['Questo medicinale mi darà sonnolenza?', 'Bu ilaç beni uykulu yapar mı?'],
        ['È sicuro prenderlo con il cibo?', 'Yemekle almak güvenli mi?']
      ]
    }
  },

  supermarket: {
    'Finding & buying': {
      A1: [
        ['Dov’è il latte?', 'Süt nerede?'],
        ['Quanto costa questo?', 'Bu ne kadar?'],
        ['Avete del pane?', 'Ekmeğiniz var mı?']
      ],
      A2: [
        ['In quale corsia sono le uova?', 'Yumurtalar hangi koridorda?'],
        ['Vendete prodotti senza glutine?', 'Glutensiz ürün satıyor musunuz?'],
        ['Posso pagare con la carta qui?', 'Burada kartla ödeyebilir miyim?']
      ],
      B1: [
        ['Mi scusi, credo di essere stato addebitato due volte per questo.', 'Pardon, sanırım bunun için iki kez ücret alındı.']
      ]
    }
  },

  clothing: {
    'Shopping for clothes': {
      A1: [
        ['Posso provarlo?', 'Bunu deneyebilir miyim?'],
        ['Avete questo nella taglia media?', 'Bunun orta bedeni var mı?'],
        ['Quanto costa questa giacca?', 'Bu ceket ne kadar?']
      ],
      A2: [
        ['Avete questo in un colore diverso?', 'Bunun farklı bir rengi var mı?'],
        ['Questo è un po’ troppo stretto.', 'Bu biraz fazla dar.'],
        ['Dove sono i camerini?', 'Deneme kabinleri nerede?']
      ],
      B1: [
        ['Vorrei restituire questo — non mi va bene.', 'Bunu iade etmek istiyorum — bana olmadı.'],
        ['Posso cambiarlo con una taglia più grande?', 'Daha büyük bir bedenle değiştirebilir miyim?']
      ]
    }
  },

  train: {
    'Tickets & travel': {
      A1: [
        ['Un biglietto per Londra, per favore.', 'Londra’ya bir bilet, lütfen.'],
        ['Qual è il binario?', 'Hangi peron?'],
        ['A che ora parte il treno?', 'Tren saat kaçta kalkıyor?']
      ],
      A2: [
        ['Un biglietto di andata e ritorno, per favore.', 'Gidiş-dönüş bilet, lütfen.'],
        ['Quando parte il prossimo treno per la città?', 'Şehre bir sonraki tren ne zaman?'],
        ['È occupato questo posto?', 'Bu koltuk dolu mu?']
      ],
      B1: [
        ['C’è uno sconto per studenti?', 'Öğrenci indirimi var mı?'],
        ['Credo di aver preso il treno sbagliato.', 'Sanırım yanlış trene bindim.']
      ]
    }
  },

  taxi: {
    'Taking a taxi': {
      A1: [
        ['All’aeroporto, per favore.', 'Havalimanına, lütfen.'],
        ['Quanto costa?', 'Ne kadar?'],
        ['Si fermi qui, per favore.', 'Burada durun, lütfen.']
      ],
      A2: [
        ['Può portarmi all’Hotel Sunrise?', 'Beni Sunrise Otel’e götürür müsünüz?'],
        ['Ho un po’ di fretta.', 'Biraz acelem var.'],
        ['Posso pagare con la carta?', 'Kartla ödeyebilir miyim?']
      ],
      B1: [
        ['Può fare la strada più veloce, per favore?', 'En hızlı yoldan gider misiniz, lütfen?']
      ]
    }
  },

  bank: {
    'At the bank': {
      A2: [
        ['Vorrei aprire un conto.', 'Bir hesap açmak istiyorum.'],
        ['Devo cambiare un po’ di soldi.', 'Biraz para bozdurmam gerekiyor.'],
        ['Qual è il tasso di cambio oggi?', 'Bugün döviz kuru nedir?']
      ],
      B1: [
        ['Credo di aver perso la mia carta bancaria.', 'Sanırım banka kartımı kaybettim.'],
        ['C’è un pagamento che non riconosco.', 'Tanımadığım bir ödeme var.'],
        ['Potrebbe bloccare la mia carta, per favore?', 'Kartımı bloke edebilir misiniz, lütfen?']
      ]
    }
  },

  police: {
    'Reporting things': {
      B1: [
        ['Vorrei denunciare un telefono smarrito.', 'Kayıp bir telefon bildirmek istiyorum.'],
        ['Credo che mi abbiano rubato la borsa.', 'Sanırım çantam çalındı.'],
        ['È successo circa un’ora fa.', 'Yaklaşık bir saat önce oldu.'],
        ['Potrei avere una copia della denuncia?', 'Tutanağın bir kopyasını alabilir miyim?']
      ],
      B2: [
        ['Mi servirà questo documento per la richiesta all’assicurazione.', 'Bu belge sigorta talebim için gerekecek.']
      ]
    }
  },

  street: {
    'Directions & small talk': {
      A1: [
        ['Mi scusi, dov’è la stazione?', 'Pardon, istasyon nerede?'],
        ['È lontano da qui?', 'Buraya uzak mı?'],
        ['Grazie per l’aiuto.', 'Yardımın için teşekkürler.']
      ],
      A2: [
        ['Può dirmi come arrivare al museo?', 'Müzeye nasıl gideceğimi söyler misiniz?'],
        ['C’è una farmacia qui vicino?', 'Buralarda bir eczane var mı?'],
        ['Piacere di conoscerti. Sono nuovo qui.', 'Tanıştığıma memnun oldum. Buraya yeniyim.']
      ],
      B1: [
        ['Può dirmi dov’è la banca più vicina?', 'En yakın bankanın nerede olduğunu söyler misiniz?'],
        ['Ti va di unirti a noi per un caffè?', 'Bize kahveye katılmak ister misin?']
      ]
    }
  },

  workplace: {
    'Interviews & office': {
      B1: [
        ['Grazie per avermi invitato al colloquio.', 'Görüşmeye davet ettiğiniz için teşekkürler.'],
        ['Ho tre anni di esperienza in questo campo.', 'Bu alanda üç yıllık deneyimim var.'],
        ['Può parlarmi di più del ruolo?', 'Bu pozisyon hakkında biraz daha bilgi verir misiniz?']
      ],
      B2: [
        ['In passato mi caricavo di troppo, ma sto imparando a delegare.', 'Eskiden fazla iş üstlenirdim ama yetki devretmeyi öğreniyorum.'],
        ['Come si presenta il successo nei primi sei mesi?', 'İlk altı ayda başarı neye benzer?'],
        ['Credo ci sia stato un malinteso — lasci che spieghi.', 'Sanırım bir yanlış anlaşılma oldu — açıklayayım.'],
        ['Risolviamola insieme.', 'Bunu birlikte çözelim.']
      ]
    }
  },

  home: {
    'Everyday home talk': {
      A1: [
        ['Buongiorno! Hai dormito bene?', 'Günaydın! İyi uyudun mu?'],
        ['Cosa c’è per colazione?', 'Kahvaltıda ne var?'],
        ['Sono ancora un po’ stanco.', 'Hâlâ biraz yorgunum.'],
        ['A più tardi!', 'Sonra görüşürüz!']
      ],
      A2: [
        ['Che programmi hai per oggi?', 'Bugün planların ne?'],
        ['Ti va di andare al mercato insieme?', 'Birlikte pazara gitmek ister misin?'],
        ['Puoi aiutarmi con questo, per favore?', 'Bunda bana yardım eder misin, lütfen?']
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
        ['Potrebbe chiamarmi un taxi per le otto?', 'Saat sekiz için bana bir taksi çağırır mısınız?'],
        ['C’è una palestra o una piscina nell’hotel?', 'Otelde spor salonu ya da havuz var mı?'],
        ['A che ora apre il ristorante?', 'Restoran saat kaçta açılıyor?'],
        ['Potrei lasciare qui i bagagli fino a mezzogiorno?', 'Bavullarımı öğlene kadar burada bırakabilir miyim?']
      ],
      B1: [
        ['Vorrei prolungare il soggiorno di una notte.', 'Konaklamamı bir gece uzatmak istiyorum.'],
        ['C’è un servizio navetta per l’aeroporto?', 'Havalimanına servis var mı?']
      ]
    }
  },
  airport: {
    'Boarding & onboard': {
      A2: [
        ['Dov’è il controllo passaporti?', 'Pasaport kontrolü nerede?'],
        ['È iniziato l’imbarco per il volo per Parigi?', 'Paris uçuşu binişe başladı mı?'],
        ['Potrei avere un bicchiere d’acqua, per favore?', 'Bir bardak su alabilir miyim, lütfen?']
      ],
      B1: [
        ['Sono qui in vacanza per due settimane.', 'İki haftalığına tatil için buradayım.'],
        ['Alloggerò in un hotel in centro città.', 'Şehir merkezindeki bir otelde kalacağım.']
      ]
    }
  },
  restaurant: {
    'Extra requests': {
      A2: [
        ['Possiamo sederci vicino alla finestra?', 'Pencere kenarına oturabilir miyiz?'],
        ['Posso averlo senza cipolle?', 'Bunu soğansız alabilir miyim?'],
        ['Potrei avere la ricetta? È deliziosa!', 'Tarifini alabilir miyim? Çok lezzetli!']
      ],
      B1: [
        ['Era tutto eccellente, grazie.', 'Her şey mükemmeldi, teşekkürler.'],
        ['Possiamo dividere il conto, per favore?', 'Hesabı bölüşebilir miyiz, lütfen?']
      ]
    }
  },
  cafe: {
    'More at the café': {
      A1: [
        ['È libero questo posto?', 'Bu koltuk boş mu?'],
        ['Posso avere anche un bicchiere d’acqua?', 'Bir de bir bardak su alabilir miyim?']
      ],
      A2: [
        ['Avete dolci oggi?', 'Bugün kekiniz var mı?'],
        ['Potrei avere la password del Wi-Fi?', 'Wi-Fi şifresini alabilir miyim?']
      ]
    }
  },
  hospital: {
    'At the clinic': {
      A2: [
        ['Mi serve una ricetta per questo?', 'Bunun için reçeteye ihtiyacım var mı?'],
        ['Quanto ci vorrà per i risultati?', 'Sonuçlar ne kadar sürer?'],
        ['Dovrei riposare per qualche giorno?', 'Birkaç gün dinlenmeli miyim?']
      ],
      B1: [
        ['C’è qualcosa che dovrei evitare di mangiare?', 'Yememem gereken bir şey var mı?']
      ]
    }
  },
  pharmacy: {
    'More at the pharmacy': {
      A1: [
        ['Avete antidolorifici?', 'Ağrı kesiciniz var mı?'],
        ['Mi servono dei cerotti, per favore.', 'Biraz yara bandı gerekiyor, lütfen.']
      ],
      A2: [
        ['Posso prenderlo con altri medicinali?', 'Bunu başka ilaçla alabilir miyim?'],
        ['C’è una versione senza zucchero?', 'Şekersiz bir türü var mı?']
      ]
    }
  },
  supermarket: {
    'At the checkout': {
      A1: [
        ['Avete un sacchetto?', 'Poşetiniz var mı?'],
        ['Posso avere lo scontrino?', 'Fiş alabilir miyim?']
      ],
      A2: [
        ['Questo è in offerta oggi?', 'Bu bugün indirimde mi?'],
        ['Dove posso trovare i surgelati?', 'Dondurulmuş gıdaları nerede bulabilirim?'],
        ['Avete una carta fedeltà?', 'Sadakat kartınız var mı?']
      ]
    }
  },
  clothing: {
    'More shopping': {
      A2: [
        ['Avete queste scarpe nel numero 42?', 'Bu ayakkabıların 42 numarası var mı?'],
        ['Questo è in saldo?', 'Bu indirimde mi?'],
        ['Posso pagare in contanti?', 'Nakit ödeyebilir miyim?']
      ],
      B1: [
        ['Fate rimborsi senza scontrino?', 'Fişsiz para iadesi yapıyor musunuz?']
      ]
    }
  },
  train: {
    'On the platform': {
      A1: [
        ['È questo il treno per Londra?', 'Bu Londra treni mi?'],
        ['Mi scusi, è libero questo posto?', 'Pardon, bu koltuk boş mu?']
      ],
      A2: [
        ['Devo cambiare treno?', 'Aktarma yapmam gerekiyor mu?'],
        ['Quanto dura il viaggio?', 'Yolculuk ne kadar sürüyor?']
      ]
    }
  },
  taxi: {
    'On the way': {
      A2: [
        ['Potrebbe rallentare un po’, per favore?', 'Biraz yavaşlar mısınız, lütfen?'],
        ['È lontano da qui?', 'Buraya uzak mı?'],
        ['Potrebbe aspettare qualche minuto?', 'Birkaç dakika bekler misiniz?']
      ]
    }
  },
  bank: {
    'More at the bank': {
      A2: [
        ['Vorrei prelevare un po’ di soldi.', 'Biraz para çekmek istiyorum.'],
        ['Dov’è il bancomat più vicino?', 'En yakın bankamatik nerede?']
      ],
      B1: [
        ['Quanto tempo ci vorrà per ricevere la nuova carta?', 'Yeni kart ne zaman gelir?'],
        ['Potrebbe spedirla al mio indirizzo?', 'Adresime gönderebilir misiniz?']
      ]
    }
  },
  police: {
    'More details': {
      B1: [
        ['Posso contattarvi via email?', 'Sizinle e-posta ile iletişim kurabilir miyim?'],
        ['È un telefono nero con una custodia blu.', 'Mavi kılıfta siyah bir telefon.'],
        ['L’ultima volta ce l’avevo sull’autobus numero 12.', 'En son 12 numaralı otobüste elimdeydi.']
      ]
    }
  },
  street: {
    'More directions': {
      A2: [
        ['Gira a sinistra al semaforo.', 'Trafik ışıklarında sola dön.'],
        ['Vai dritto per circa cinque minuti.', 'Yaklaşık beş dakika düz git.'],
        ['È accanto alla farmacia.', 'Eczanenin yanında.'],
        ['Sto andando nella direzione giusta?', 'Doğru yolda mıyım?']
      ]
    },
    'Everyday essentials': {
      A1: [
        ['Mi scusi, può aiutarmi?', 'Pardon, yardım edebilir misiniz?'],
        ['Mi dispiace, non capisco.', 'Üzgünüm, anlamıyorum.'],
        ['Può ripetere, per favore?', 'Bunu tekrar söyler misiniz, lütfen?'],
        ['Può parlare più lentamente, per favore?', 'Biraz daha yavaş konuşur musunuz, lütfen?'],
        ['Come si dice questo in italiano?', 'Bu İngilizce nasıl söylenir?'],
        ['Grazie mille per l’aiuto.', 'Yardımınız için çok teşekkürler.']
      ]
    }
  },
  workplace: {
    'Everyday office': {
      A2: [
        ['Potresti aiutarmi con questo compito?', 'Bu işte bana yardım eder misin?'],
        ['Ti mando il report via email.', 'Raporu sana e-posta ile göndereceğim.'],
        ['Possiamo fissare una riunione per domani?', 'Yarın için bir toplantı ayarlayabilir miyiz?']
      ],
      B1: [
        ['Mi dispiace, lo mando subito.', 'Özür dilerim, hemen gönderiyorum.']
      ]
    }
  },
  home: {
    'Around the house': {
      A1: [
        ['Puoi passarmi il sale, per favore?', 'Tuzu uzatır mısın, lütfen?'],
        ['Vado al negozio. Ti serve qualcosa?', 'Markete gidiyorum. Bir şeye ihtiyacın var mı?'],
        ['La cena è pronta!', 'Yemek hazır!']
      ],
      A2: [
        ['Potresti abbassare un po’ la musica?', 'Müziği biraz kısar mısın?'],
        ['Stasera lavo io i piatti.', 'Bulaşıkları bu gece ben yıkarım.']
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
  hotel:       { icon: '🏨', label: 'Hotel',            labelTr: 'Otel' },
  airport:     { icon: '✈️', label: 'Aeroporto',        labelTr: 'Havalimanı' },
  restaurant:  { icon: '🍽️', label: 'Ristorante',       labelTr: 'Restoran' },
  cafe:        { icon: '☕', label: 'Bar',              labelTr: 'Kafe' },
  hospital:    { icon: '🏥', label: 'Ospedale',         labelTr: 'Hastane' },
  pharmacy:    { icon: '💊', label: 'Farmacia',         labelTr: 'Eczane' },
  supermarket: { icon: '🛒', label: 'Supermercato',     labelTr: 'Market' },
  clothing:    { icon: '👕', label: 'Negozio di abbigliamento', labelTr: 'Giyim' },
  train:       { icon: '🚆', label: 'Stazione',         labelTr: 'Tren Garı' },
  taxi:        { icon: '🚕', label: 'Taxi',             labelTr: 'Taksi' },
  bank:        { icon: '🏦', label: 'Banca',            labelTr: 'Banka' },
  police:      { icon: '🚓', label: 'Polizia',          labelTr: 'Karakol' },
  street:      { icon: '🚶', label: 'In giro',          labelTr: 'Dışarıda' },
  workplace:   { icon: '💼', label: 'Lavoro',           labelTr: 'İş Yeri' },
  home:        { icon: '🏠', label: 'Casa',             labelTr: 'Ev' }
};

export function phrasesForPlace(locationId) {
  return PHRASEBOOK.filter(p => p.locationId === locationId);
}

export const PHRASEBOOK_COUNT = PHRASEBOOK.length;
