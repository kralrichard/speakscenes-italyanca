// Characters for Story Mode. Each references an avatarPreset from
// js/ui/components/characterAvatar.js (reused unchanged) plus a gender/accent
// so TTS (js/speech/tts.js) picks a fitting voice, and a personality line the
// conversation screen shows. `player` is the learner's own avatar.
// Roles/personalities are in Turkish (the app's UI language); names are
// international so the same file works for every language clone.

export const CHARACTERS = {
  player: {
    id: 'player', name: 'Sen', role: 'Gezgin / Öğrenci',
    gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral',
    personality: 'Bu sensin — konuş ve sohbeti sen yönlendir.'
  },

  // Hotel
  grace: {
    id: 'grace', name: 'Grace', role: 'Otel Resepsiyonisti',
    gender: 'female', accent: 'british', avatarPreset: 'receptionist_f',
    personality: 'Sıcak, profesyonel ve sonsuz sabırlı.'
  },
  daniel: {
    id: 'daniel', name: 'Daniel', role: 'Otel Vardiya Müdürü',
    gender: 'male', accent: 'american', avatarPreset: 'manager_m',
    personality: 'Sakin bir sorun çözücü; her misafirin mutlu olmasını ister.'
  },

  // Airport
  priya: {
    id: 'priya', name: 'Priya', role: 'Check-in Görevlisi',
    gender: 'female', accent: 'indian', avatarPreset: 'agent_f',
    personality: 'Hızlı ve güler yüzlü ama saat hep işliyor.'
  },
  omar: {
    id: 'omar', name: 'Omar', role: 'Kapı Görevlisi',
    gender: 'male', accent: 'international', avatarPreset: 'clerk_m',
    personality: 'Uçuş kapanırken bile soğukkanlı.'
  },

  // Hospital / Pharmacy
  bennett: {
    id: 'bennett', name: 'Dr. Bennett', role: 'Doktor',
    gender: 'female', accent: 'american', avatarPreset: 'doctor_f',
    personality: 'Dikkatli bir dinleyici; soruları tek tek sorar.'
  },
  fatima: {
    id: 'fatima', name: 'Fatima', role: 'Eczacı',
    gender: 'female', accent: 'international', avatarPreset: 'pharmacist_f',
    personality: 'Dozlar konusunda titiz, endişeler konusunda nazik.'
  },

  // Restaurant / Café
  elena: {
    id: 'elena', name: 'Elena', role: 'Garson',
    gender: 'female', accent: 'international', avatarPreset: 'waiter_f',
    personality: 'Hızlı, neşeli; günün menüsünü ezbere bilir.'
  },
  marco: {
    id: 'marco', name: 'Marco', role: 'Restoran Müdürü',
    gender: 'male', accent: 'international', avatarPreset: 'manager_m',
    personality: 'Şikayetleri ciddiye alır ve hızla çözer.'
  },

  // Street / Social
  sophie: {
    id: 'sophie', name: 'Sophie', role: 'Cana Yakın Yerli',
    gender: 'female', accent: 'canadian', avatarPreset: 'assistant_f',
    personality: 'Gezginlerle tanışmayı ve yol tarif etmeyi sever.'
  },
  leo: {
    id: 'leo', name: 'Leo', role: 'Yeni Arkadaş',
    gender: 'male', accent: 'australian', avatarPreset: 'assistant_m',
    personality: 'Konuşkan ve rahat; yeni bir arkadaş edinmekten mutlu.'
  },

  // Workplace
  carter: {
    id: 'carter', name: 'Bayan Carter', role: 'İşe Alım Müdürü',
    gender: 'female', accent: 'american', avatarPreset: 'manager_f',
    personality: 'Adil ama titiz; net ve dürüst cevaplara değer verir.'
  },
  raj: {
    id: 'raj', name: 'Raj', role: 'İş Arkadaşı',
    gender: 'male', accent: 'indian', avatarPreset: 'colleague_f',
    personality: 'Doğrudan ama makul — açıklık getir, sorun kalmaz.'
  },

  // Café
  mia: {
    id: 'mia', name: 'Mia', role: 'Barista',
    gender: 'female', accent: 'american', avatarPreset: 'assistant_f',
    personality: 'Neşeli ve hızlı; her müdavimin siparişini bilir.'
  },
  hannah: {
    id: 'hannah', name: 'Hannah', role: 'Eski Dost',
    gender: 'female', accent: 'british', avatarPreset: 'colleague_f',
    personality: 'Sıcak ve konuşkan; onu yıllardır görmemiştin.'
  },

  // Supermarket & Clothing store
  tom: {
    id: 'tom', name: 'Tom', role: 'Market Görevlisi',
    gender: 'male', accent: 'american', avatarPreset: 'clerk_m',
    personality: 'Yardımsever; her şeyin hangi reyonda olduğunu bilir.'
  },
  zoe: {
    id: 'zoe', name: 'Zoe', role: 'Mağaza Danışmanı',
    gender: 'female', accent: 'australian', avatarPreset: 'exec_f',
    personality: 'Şık; sana ne yakışacağı konusunda dürüst.'
  },

  // Train station & Taxi
  nina: {
    id: 'nina', name: 'Nina', role: 'Gişe Görevlisi',
    gender: 'female', accent: 'international', avatarPreset: 'agent_f2',
    personality: 'Hızlı ve titiz; kuyruk hep ilerler.'
  },
  victor: {
    id: 'victor', name: 'Victor', role: 'Taksi Şoförü',
    gender: 'male', accent: 'international', avatarPreset: 'driver_m',
    personality: 'Cana yakın; yolda sohbet etmeyi sever.'
  },

  // Bank & Police
  david: {
    id: 'david', name: 'David', role: 'Banka Görevlisi',
    gender: 'male', accent: 'british', avatarPreset: 'banker_m',
    personality: 'Sakin, sabırlı, ayrıntılara dikkat eder.'
  },
  grant: {
    id: 'grant', name: 'Memur Grant', role: 'Polis Memuru',
    gender: 'male', accent: 'american', avatarPreset: 'officer_m',
    personality: 'Güven verici ve yöntemli; her ayrıntıyı not eder.'
  },

  // Home
  emma: {
    id: 'emma', name: 'Emma', role: 'Kız Kardeşin',
    gender: 'female', accent: 'american', avatarPreset: 'receptionist_f',
    personality: 'Neşeli bir sabah insanı — senin aksine.'
  },

  // School
  mslee: {
    id: 'mslee', name: 'Bayan Lee', role: 'Öğretmen',
    gender: 'female', accent: 'american', avatarPreset: 'manager_f',
    personality: 'Cesaretlendirici, sabırlı; iyi bir soruya bayılır.'
  },
  // Gym
  coach: {
    id: 'coach', name: 'Koç Max', role: 'Fitness Antrenörü',
    gender: 'male', accent: 'australian', avatarPreset: 'assistant_m',
    personality: 'Enerjik ve motive edici, asla baskıcı değil.'
  },
  // Museum / tourist guide
  ava: {
    id: 'ava', name: 'Ava', role: 'Müze Rehberi',
    gender: 'female', accent: 'british', avatarPreset: 'journalist_f',
    personality: 'Sıcak gülümseyen yürüyen bir ansiklopedi.'
  },
  // Post office
  pat: {
    id: 'pat', name: 'Pat', role: 'Posta Görevlisi',
    gender: 'male', accent: 'american', avatarPreset: 'clerk_m',
    personality: 'Verimli ve güler yüzlü; kuyruk onu hiç korkutmaz.'
  },
  // Library
  ruth: {
    id: 'ruth', name: 'Ruth', role: 'Kütüphaneci',
    gender: 'female', accent: 'british', avatarPreset: 'exec_f',
    personality: 'Sakin ve yardımsever; fısıltıyla ve gülümseyerek.'
  },
  // Seaside
  finn: {
    id: 'finn', name: 'Finn', role: 'Plaj Satıcısı',
    gender: 'male', accent: 'international', avatarPreset: 'barista_m',
    personality: 'Güneşli ve rahat; sohbete her zaman hazır.'
  }
};

export function getCharacter(id) {
  return CHARACTERS[id] || CHARACTERS.player;
}
