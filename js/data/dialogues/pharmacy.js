import { createDialogue } from '../dialogueSchema.js?v=6';

export const PHARMACY_DIALOGUES = [
  createDialogue({
    id: 'farmacia-mal-di-testa-a2-01',
    locationId: 'pharmacy',
    scenarioId: 'buying-medicine',
    title: 'In farmacia',
    level: 'A2',
    variant: 1,
    length: 'short',
    goal: 'Şikâyetini anlat ve uygun ilacı al.',
    tags: ['health'],
    sceneType: 'retail',
    characters: {
      A: { name: 'Farmacista', role: 'Eczacı', gender: 'male', accent: 'american', avatarPreset: 'pharmacist_m' },
      B: { name: 'Cliente', role: 'Müşteri', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Buongiorno, mi dica.', translation_tr: 'Günaydın, buyurun.', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Ho mal di testa da due giorni.',
        altAccepted: ['Ho mal di testa da due giorni.', 'Ho un mal di testa da due giorni.'],
        translation_tr: 'İki gündür başım ağrıyor.',
        register: 'formal', ipa: '/ɔ mal di ˈtɛs.ta da ˈdu.e ˈdʒor.ni/',
        grammar: [
          { word: 'Ho mal di', role: 'ağrı kalıbı', note: '"Ho mal di + organ" = "...ım ağrıyor". Ör: mal di gola, mal di stomaco.' },
          { word: 'da due giorni', role: 'süre', note: 'İtalyancada süre için "da" + ŞİMDİKİ zaman kullanılır.' }
        ],
        keyExpressions: [{ phrase: 'Ho mal di testa', meaning: 'Başım ağrıyor' }],
        exampleSentences: ['Ho mal di gola.', 'Ho mal di stomaco da ieri.'],
        pronunciationTips: ['"Ho" tek sesli: O. Baştaki H okunmaz.']
      },
      { speaker: 'A', text: 'Ha anche la febbre?', translation_tr: 'Ateşiniz de var mı?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'No, non ho la febbre.',
        altAccepted: ['No, la febbre no.', 'No, non ho febbre.'],
        translation_tr: 'Hayır, ateşim yok.',
        register: 'formal', ipa: '/no non ɔ la ˈfeb.bre/',
        grammar: [
          { word: 'non', role: 'olumsuzluk', note: 'Fiilden ÖNCE gelir: "non ho".' },
          { word: 'la febbre', role: 'isim (dişil)', note: 'İtalyancada hastalık isimleriyle artikel kullanılır.' }
        ],
        keyExpressions: [{ phrase: 'Non ho la febbre', meaning: 'Ateşim yok' }],
        exampleSentences: ['Non ho tempo.', 'Non ho fame.'],
        pronunciationTips: ['"febbre" çift "bb" ile: FEB-bre.']
      },
      { speaker: 'A', text: 'Allora prenda questo. Una compressa dopo i pasti.', translation_tr: 'O zaman bunu alın. Yemeklerden sonra bir tablet.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Va bene. Serve la ricetta?',
        altAccepted: ['Va bene. Ci vuole la ricetta?', 'D\'accordo. Serve la ricetta?'],
        translation_tr: 'Tamam. Reçete gerekiyor mu?',
        register: 'formal', ipa: '/va ˈbɛ.ne ˈsɛr.ve la riˈtʃet.ta/',
        grammar: [
          { word: 'Va bene', role: 'kalıp', note: '"Tamam / olur" — onay için en yaygın ifade.' },
          { word: 'Serve', role: 'fiil (3. tekil)', note: '"gerekiyor mu" anlamında; öznesi "la ricetta".' },
          { word: 'ricetta', role: 'isim (dişil)', note: 'Hem "reçete" hem "yemek tarifi" demektir.' }
        ],
        keyExpressions: [{ phrase: 'Serve la ricetta?', meaning: 'Reçete gerekiyor mu?' }],
        exampleSentences: ['Serve un documento?', 'Non serve, grazie.'],
        pronunciationTips: ['"ricetta" içindeki "ce" = "che" sesi: ri-CHET-ta.']
      },
      { speaker: 'A', text: 'No, questo si può comprare senza ricetta.', translation_tr: 'Hayır, bu reçetesiz alınabilir.', emotion: 'friendly', register: 'formal' }
    ]
  })
];
