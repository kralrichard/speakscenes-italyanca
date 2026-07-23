import { createDialogue } from '../dialogueSchema.js?v=5';

export const HOSPITAL_DIALOGUES = [
  createDialogue({
    id: 'ospedale-visita-a2-01',
    locationId: 'hospital',
    scenarioId: 'doctor-visit',
    title: 'Dal dottore',
    level: 'A2',
    variant: 1,
    length: 'short',
    goal: 'Şikâyetini doktora anlat.',
    tags: ['health'],
    sceneType: 'hospital',
    characters: {
      A: { name: 'Dott. Bruno', role: 'Doktor', gender: 'male', accent: 'american', avatarPreset: 'doctor_m' },
      B: { name: 'Paziente', role: 'Hasta', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Buongiorno, che problema c\'è?', translation_tr: 'Günaydın, sorun nedir?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Non mi sento bene da tre giorni.',
        altAccepted: ['Non sto bene da tre giorni.', 'Da tre giorni non mi sento bene.'],
        translation_tr: 'Üç gündür kendimi iyi hissetmiyorum.',
        register: 'formal', ipa: '/non mi ˈsɛn.to ˈbɛ.ne da tre ˈdʒor.ni/',
        grammar: [
          { word: 'Non mi sento', role: 'dönüşlü fiil (olumsuz)', note: '"sentirsi" = kendini hissetmek; "mi" dönüşlü zamir.' },
          { word: 'da tre giorni', role: 'süre', note: 'Süren durum için "da" + ŞİMDİKİ zaman.' }
        ],
        keyExpressions: [{ phrase: 'Non mi sento bene', meaning: 'Kendimi iyi hissetmiyorum' }],
        exampleSentences: ['Mi sento meglio oggi.', 'Non mi sento bene.'],
        pronunciationTips: ['"sento" net ve kısa: SEN-to.']
      },
      { speaker: 'A', text: 'Ha la tosse o la febbre?', translation_tr: 'Öksürüğünüz ya da ateşiniz var mı?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Ho la tosse e mi fa male la gola.',
        altAccepted: ['Ho la tosse e ho mal di gola.', 'Ho la tosse e la gola mi fa male.'],
        translation_tr: 'Öksürüğüm var ve boğazım ağrıyor.',
        register: 'formal', ipa: '/ɔ la ˈtos.se e mi fa ˈma.le la ˈɡo.la/',
        grammar: [
          { word: 'mi fa male', role: 'ağrı kalıbı', note: 'Kelimesi kelimesine "bana acı veriyor" — özne ağrıyan organdır.' },
          { word: 'la gola', role: 'isim (dişil)', note: 'Vücut organlarında artikel kullanılır.' }
        ],
        keyExpressions: [{ phrase: 'Mi fa male...', meaning: '...ım ağrıyor' }],
        exampleSentences: ['Mi fa male la testa.', 'Mi fanno male i piedi.'],
        pronunciationTips: ['"gola" içindeki "g" sert: GO-la.']
      },
      { speaker: 'A', text: 'Va bene, le prescrivo uno sciroppo.', translation_tr: 'Peki, size bir şurup yazıyorum.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Devo prendere anche un antibiotico?',
        altAccepted: ['Devo prendere un antibiotico?', 'Serve anche un antibiotico?'],
        translation_tr: 'Antibiyotik de almam gerekiyor mu?',
        register: 'formal', ipa: '/ˈde.vo ˈprɛn.de.re ˈan.ke un an.ti.bjˈɔ.ti.ko/',
        grammar: [
          { word: 'Devo prendere', role: 'dovere + mastar', note: 'İlaç için "prendere" (almak) kullanılır.' },
          { word: 'anche', role: 'zarf', note: '"de/da" — eklediğin şeyden ÖNCE gelir.' }
        ],
        keyExpressions: [{ phrase: 'Devo prendere...?', meaning: '...almam gerekiyor mu?' }],
        exampleSentences: ['Devo prendere questo ogni giorno?', 'Prendo una compressa la sera.'],
        pronunciationTips: ['"anche" içindeki "ch" = "k": AN-ke.']
      },
      { speaker: 'A', text: 'No, per ora no. Beva molta acqua e riposi.', translation_tr: 'Hayır, şimdilik hayır. Bol su için ve dinlenin.', emotion: 'friendly', register: 'formal' }
    ]
  })
];
