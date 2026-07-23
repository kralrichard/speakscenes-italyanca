import { createScenario } from '../scenarioSchema.js?v=6';

// ── Airport check-in (A2) ───────────────────────────────────────────────────
export const airportCheckin = createScenario({
  id: 'airport-checkin',
  title: 'Check-in per il tuo volo',
  titleTr: 'Uçuşun için check-in yapmak',
  environmentId: 'airport', sceneType: 'airport', level: 'A2',
  goal: 'Fai il check-in, sistema il bagaglio e prendi la carta d’imbarco.',
  goalTr: 'Check-in yap, bavulunu hallet ve biniş kartını al.',
  npcIds: ['priya'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'priya', emotion: 'friendly',
      text: 'Buongiorno! Posso vedere il suo passaporto e la prenotazione, per favore?',
      translation: 'Günaydın! Pasaportunuzu ve rezervasyonunuzu görebilir miyim, lütfen?',
      choices: [
        { id: 'give_docs', intentionTr: 'Belgeleri ver', tone: 'polite', difficulty: 'easy', xp: 10,
          sentence: 'Ecco a lei — il mio passaporto e la prenotazione sul telefono.',
          translation: 'Buyurun — pasaportum ve telefondaki rezervasyonum.',
          altAccepted: ['Ecco il mio passaporto e la prenotazione', 'Ecco qui, passaporto e prenotazione'],
          next: 'bags', relationshipEffect: 1 },
        { id: 'no_print', intentionTr: 'Dijital biletin geçerli olup olmadığını sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Ho solo una prenotazione digitale. Va bene?',
          translation: 'Sadece dijital rezervasyonum var. Uygun mu?',
          altAccepted: ['Va bene una prenotazione digitale', 'Ce l’ho solo sul telefono, va bene'],
          next: 'digital_ok' }
      ]
    },
    digital_ok: {
      id: 'digital_ok', speakerId: 'priya', emotion: 'friendly',
      text: 'Una prenotazione digitale va benissimo. Grazie — allora, imbarca bagagli oggi?',
      translation: 'Dijital rezervasyon gayet uygun. Teşekkürler — peki bugün bavul verecek misiniz?',
      next: 'bags'
    },
    bags: {
      id: 'bags', speakerId: 'priya', emotion: 'neutral',
      text: 'Imbarca dei bagagli, o oggi è solo il bagaglio a mano?',
      translation: 'Bavul verecek misiniz, yoksa bugün sadece bir el bagajı mı var?',
      choices: [
        { id: 'one_bag', intentionTr: 'Bir bavul vereceğini söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Ho una valigia da imbarcare, per favore.',
          translation: 'Check-in için bir valizim var, lütfen.',
          altAccepted: ['Ho un bagaglio da imbarcare', 'Solo una valigia da imbarcare'],
          next: 'overweight' },
        { id: 'carry_only', intentionTr: 'Sadece el bagajı olduğunu söyle', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'No, ho solo questo bagaglio a mano.',
          translation: 'Hayır, sadece bu el bagajı var.',
          altAccepted: ['Solo bagaglio a mano', 'No, solo questo bagaglio a mano'],
          next: 'seat' },
        { id: 'ask_gate', intentionTr: 'Kapının nerede olduğunu sor', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Solo bagaglio a mano. A proposito, può dirmi a quale gate devo andare?',
          translation: 'Sadece el bagajı. Bu arada hangi kapıya gitmem gerektiğini söyler misiniz?',
          altAccepted: ['A quale gate devo andare', 'Può dirmi il mio gate'],
          next: 'gate_info' }
      ]
    },
    overweight: {
      id: 'overweight', speakerId: 'priya', emotion: 'concerned',
      text: 'La pesiamo… ah, è due chili oltre il limite. C’è un piccolo sovrapprezzo, oppure può spostare qualche oggetto nel bagaglio a mano.',
      translation: 'Tartalım… ah, limitin iki kilo üzerinde. Küçük bir fazlalık ücreti var ya da birkaç eşyayı el bagajına alabilirsiniz.',
      choices: [
        { id: 'pay_fee', intentionTr: 'Ücreti ödemeyi kabul et', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Va bene, pago il sovrapprezzo.',
          translation: 'Sorun değil, fazlalık ücretini öderim.',
          altAccepted: ['Pago il sovrapprezzo', 'Va bene, pago l’eccedenza'],
          next: 'seat' },
        { id: 'move_items', intentionTr: 'Eşyaları taşımayı tercih et', tone: 'casual', difficulty: 'medium', xp: 14,
          sentence: 'Piuttosto sposto qualche cosa nel bagaglio a mano.',
          translation: 'Bunun yerine birkaç şeyi el bagajıma alayım.',
          altAccepted: ['Sposto qualcosa nel bagaglio a mano', 'Preferisco spostare qualche oggetto'],
          next: 'seat', relationshipEffect: 1 }
      ]
    },
    seat: {
      id: 'seat', speakerId: 'priya', emotion: 'friendly',
      text: 'Tutto pronto. Preferisce un posto al finestrino o al corridoio?',
      translation: 'Her şey hazır. Cam kenarı mı yoksa koridor tarafı mı istersiniz?',
      choices: [
        { id: 'window', intentionTr: 'Cam kenarı iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Un posto al finestrino, per favore. Adoro il panorama.',
          translation: 'Cam kenarı, lütfen. Manzarayı severim.',
          altAccepted: ['Finestrino, per favore', 'Vorrei un posto al finestrino'],
          next: 'done' },
        { id: 'aisle', intentionTr: 'Koridor tarafı iste', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Un posto al corridoio sarebbe meglio, grazie.',
          translation: 'Koridor tarafı daha iyi olur, teşekkürler.',
          altAccepted: ['Corridoio, per favore', 'Preferirei un posto al corridoio'],
          next: 'done' }
      ]
    },
    gate_info: {
      id: 'gate_info', speakerId: 'priya', emotion: 'helpful',
      text: 'Certo — imbarcherà al gate B12. È a dieci minuti a piedi, quindi si lasci un po’ di tempo. Allora, finestrino o corridoio?',
      translation: 'Tabii — B12 kapısından bineceksiniz. On dakikalık yürüyüş, biraz zaman bırakın. Şimdi, cam kenarı mı koridor mu?',
      next: 'seat'
    },
    done: {
      id: 'done', speakerId: 'priya', emotion: 'happy',
      text: 'Ecco la sua carta d’imbarco. Gate B12, imbarco alle 10:40. Buon volo!',
      translation: 'Biniş kartınız burada. B12 kapısı, 10:40’ta biniş. İyi uçuşlar!',
      next: 'end_success'
    }
  },
  endings: {
    end_success: { id: 'end_success', kind: 'success', title: 'Check-in fatto e pronto', titleTr: 'Check-in tamam, hazırsın',
      text: 'Passaporto, bagaglio e posto — tutto gestito con chiarezza. Carta d’imbarco in mano.',
      translation: 'Pasaport, bavul ve koltuk — hepsi net biçimde halledildi. Biniş kartı elinde.',
      relationshipEffect: 1, coins: 10 }
  }
});

// ── Missing your flight (B1) ────────────────────────────────────────────────
export const missingFlight = createScenario({
  id: 'missing-flight',
  title: 'Stai per perdere il volo',
  titleTr: 'Uçuşunu kaçırmak üzeresin',
  environmentId: 'airport', sceneType: 'airport', level: 'B1',
  goal: 'Spiega la situazione con calma e trova l’opzione migliore.',
  goalTr: 'Durumu sakince anlat ve en iyi seçeneği bul.',
  npcIds: ['omar'],
  startNodeId: 'start',
  nodes: {
    start: {
      id: 'start', speakerId: 'omar', emotion: 'concerned',
      text: 'Mi dispiace, il gate del volo 208 si è appena chiuso. Cosa posso fare per lei?',
      translation: 'Üzgünüm, 208 sefer sayılı uçuşun kapısı az önce kapandı. Sizin için ne yapabilirim?',
      choices: [
        { id: 'explain', intentionTr: 'Sakince ne olduğunu anlat', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Il mio volo in coincidenza era in ritardo, così non sono riuscito ad arrivare in tempo.',
          translation: 'Aktarma uçuşum rötar yaptı, bu yüzden zamanında gelemedim.',
          altAccepted: ['La mia coincidenza era in ritardo', 'Sono in ritardo perché l’altro volo era in ritardo'],
          next: 'next_flight' },
        { id: 'panic', intentionTr: 'Panikle bir sonraki uçağa binmek istediğini söyle', tone: 'direct', difficulty: 'medium', xp: 14,
          sentence: 'Per favore, devo assolutamente prendere il prossimo volo per Roma.',
          translation: 'Lütfen, Roma’ya bir sonraki uçağa gerçekten binmem gerekiyor.',
          altAccepted: ['Mi serve il prossimo volo per Roma', 'Può mettermi sul prossimo volo per Roma'],
          next: 'next_flight' }
      ]
    },
    next_flight: {
      id: 'next_flight', speakerId: 'omar', emotion: 'thinking',
      text: 'Faccio controllare… C’è un altro volo tra tre ore, ma è quasi pieno. Oppure un volo serale con posti liberi. Quale preferisce?',
      translation: 'Bakayım… Üç saat sonra başka bir uçuş var ama neredeyse dolu. Ya da boş koltukları olan bir akşam uçuşu. Hangisini tercih edersiniz?',
      choices: [
        { id: 'sooner', intentionTr: 'Erken uçuşu iste', tone: 'polite', difficulty: 'medium', xp: 14,
          sentence: 'Preferirei quello prima, anche se devo aspettare al gate.',
          translation: 'Kapıda beklemek zorunda kalsam bile erken olanı tercih ederim.',
          altAccepted: ['Preferirei il volo prima', 'Il volo prima, per favore'],
          next: 'fee_question' },
        { id: 'evening', intentionTr: 'Rahat olan akşam uçuşunu seç', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Il volo serale va bene. Preferisco avere un posto garantito.',
          translation: 'Akşam uçuşu uygun. Garantili bir koltuğu tercih ederim.',
          altAccepted: ['Prendo il volo serale', 'Quello serale va bene'],
          next: 'rebooked_free' }
      ]
    },
    fee_question: {
      id: 'fee_question', speakerId: 'omar', emotion: 'neutral',
      text: 'Poiché il ritardo è colpa della compagnia, non c’è alcuna penale di riprenotazione. Ma su quel volo resta solo un posto centrale. Lo vuole comunque?',
      translation: 'Rötar havayolunun hatası olduğundan yeniden rezervasyon ücreti yok. Ama o uçuşta sadece orta koltuk kaldı. Yine de ister misiniz?',
      choices: [
        { id: 'take_middle', intentionTr: 'Orta koltuğu kabul et', tone: 'casual', difficulty: 'easy', xp: 10,
          sentence: 'Un posto centrale va bene — voglio solo arrivare.',
          translation: 'Orta koltuk uygun — sadece oraya varmak istiyorum.',
          altAccepted: ['Il posto centrale va bene', 'Prendo il posto centrale'],
          next: 'rebooked_sooner' },
        { id: 'ask_lounge', intentionTr: 'Bekleme için bir şey iste', tone: 'formal', difficulty: 'hard', xp: 18,
          sentence: 'Lo prendo. Visto il ritardo, potrei avere un pass per la lounge mentre aspetto?',
          translation: 'Alıyorum. Rötar göz önüne alınırsa, beklerken bir lounge kartı alabilir miyim?',
          altAccepted: ['Potrei avere un pass per la lounge mentre aspetto', 'Posso avere l’accesso alla lounge per l’attesa'],
          next: 'lounge_granted' }
      ]
    },
    rebooked_sooner: {
      id: 'rebooked_sooner', speakerId: 'omar', emotion: 'friendly',
      text: 'Fatto — è confermato sul volo delle tre, gate C4. Ancora scusi per il ritardo.',
      translation: 'Tamam — saat üç uçuşuna onaylandınız, kapı C4. Rötar için tekrar özür dilerim.',
      next: 'end_rebooked'
    },
    lounge_granted: {
      id: 'lounge_granted', speakerId: 'omar', emotion: 'happy',
      text: 'È giusto. Ecco un pass per la lounge e la sua nuova carta d’imbarco. Si rilassi fino alle tre — se lo è meritato.',
      translation: 'Bu adil. İşte bir lounge kartı ve yeni biniş kartınız. Saat üçe kadar dinlenin — hak ettiniz.',
      next: 'end_excellent'
    },
    rebooked_free: {
      id: 'rebooked_free', speakerId: 'omar', emotion: 'friendly',
      text: 'È sul volo serale, posto al finestrino, senza costi. Una scelta tranquilla — grazie per la pazienza.',
      translation: 'Akşam uçuşundasınız, cam kenarı, ücretsiz. Sakin bir tercih — sabrınız için teşekkürler.',
      next: 'end_calm'
    }
  },
  endings: {
    end_rebooked: { id: 'end_rebooked', kind: 'problem-solved', title: 'Di nuovo su un volo', titleTr: 'Yeniden uçuşta',
      text: 'Hai spiegato il ritardo con calma e sei salito sul primo volo disponibile. Crisi gestita.',
      translation: 'Rötarı sakince anlattın ve hemen bir sonraki uçağa bindin. Kriz yönetildi.',
      relationshipEffect: 1, coins: 12 },
    end_excellent: { id: 'end_excellent', kind: 'excellent', title: 'Riprenotato con un extra', titleTr: 'Ekstra ile yeniden rezervasyon',
      text: 'Sei rimasto cortese, conoscevi i tuoi diritti e hai persino ottenuto l’accesso alla lounge. Ottima capacità di risolvere i problemi in italiano.',
      translation: 'Kibar kaldın, haklarını bildin ve hatta lounge erişimi aldın. İngilizcede mükemmel sorun çözme.',
      relationshipEffect: 2, coins: 18 },
    end_calm: { id: 'end_calm', kind: 'success', title: 'Una riprenotazione rilassata', titleTr: 'Rahat bir yeniden rezervasyon',
      text: 'Hai scelto la certezza invece della velocità e hai ottenuto un posto garantito al finestrino. Sensato e senza stress.',
      translation: 'Hızdan çok kesinliği seçtin ve garantili bir cam kenarı koltuk aldın. Mantıklı ve stressiz.',
      coins: 10 }
  }
});
