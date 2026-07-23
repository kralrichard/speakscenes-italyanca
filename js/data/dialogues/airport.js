import { createDialogue } from '../dialogueSchema.js?v=6';

export const AIRPORT_DIALOGUES = [
  createDialogue({
    id: 'aeroporto-check-in-a2-01',
    locationId: 'airport',
    scenarioId: 'check-in-desk',
    title: 'Check-in in aeroporto',
    level: 'A2',
    variant: 1,
    length: 'short',
    goal: 'Uçuş için check-in yap ve bagajını ver.',
    tags: ['travel'],
    sceneType: 'airport',
    characters: {
      A: { name: 'Valentina', role: 'Görevli', gender: 'female', accent: 'american', avatarPreset: 'agent_f' },
      B: { name: 'Passeggero', role: 'Yolcu', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Buongiorno, il passaporto per favore.', translation_tr: 'Günaydın, pasaport lütfen.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Eccolo. Ho un volo per Roma.',
        altAccepted: ['Ecco. Ho un volo per Roma.', 'Eccolo qui. Ho un volo per Roma.'],
        translation_tr: 'İşte burada. Roma\'ya uçuşum var.',
        register: 'formal', ipa: '/ˈek.ko.lo ɔ un ˈvo.lo per ˈro.ma/',
        grammar: [
          { word: 'Eccolo', role: 'ecco + zamir', note: '"ecco" ile "lo" birleşir: "işte o (burada)".' },
          { word: 'per Roma', role: 'yön belirteci', note: 'Uçuş/varış için "per" kullanılır: "Roma\'ya".' }
        ],
        keyExpressions: [{ phrase: 'un volo per...', meaning: '...ya uçuş' }],
        exampleSentences: ['Ho un volo per Milano.', 'Il volo per Napoli è in ritardo.'],
        pronunciationTips: ['"Eccolo" çift "cc" ile: EK-ko-lo.']
      },
      { speaker: 'A', text: 'Ha bagagli da imbarcare?', translation_tr: 'Verilecek bagajınız var mı?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Sì, ho una valigia.',
        altAccepted: ['Sì, una valigia.', 'Sì, ho solo una valigia.'],
        translation_tr: 'Evet, bir bavulum var.',
        register: 'formal', ipa: '/si ɔ ˈu.na vaˈliː.dʒa/',
        grammar: [
          { word: 'valigia', role: 'isim (dişil)', note: '"gi" yumuşak okunur: va-LI-ja.' }
        ],
        keyExpressions: [{ phrase: 'Ho una valigia', meaning: 'Bir bavulum var' }],
        exampleSentences: ['Ho due valigie.', 'Non ho bagagli.'],
        pronunciationTips: ['"valigia" sonu "-ja": va-LI-ja.']
      },
      { speaker: 'A', text: 'Bene. Corridoio o finestrino?', translation_tr: 'Peki. Koridor mu cam kenarı mı?', emotion: 'friendly', register: 'formal' },
      {
        speaker: 'B', expected: 'Finestrino, per favore.',
        altAccepted: ['Vorrei il finestrino, per favore.', 'Corridoio, per favore.'],
        translation_tr: 'Cam kenarı, lütfen.',
        register: 'formal', ipa: '/fi.neˈstriː.no per faˈvo.re/',
        grammar: [
          { word: 'finestrino', role: 'isim (eril)', note: 'Uçak/tren penceresi. Evdeki pencere "finestra".' }
        ],
        keyExpressions: [{ phrase: 'finestrino / corridoio', meaning: 'cam kenarı / koridor koltuğu' }],
        exampleSentences: ['Preferisco il corridoio.', 'Un posto vicino al finestrino.'],
        pronunciationTips: ['"finestrino" akıcı: fi-ne-STRI-no.']
      },
      { speaker: 'A', text: 'Ecco la carta d\'imbarco. Gate dodici.', translation_tr: 'İşte biniş kartınız. On ikinci kapı.', emotion: 'happy', register: 'formal' }
    ]
  }),

  createDialogue({
    id: 'aeroporto-volo-perso-b1-01',
    locationId: 'airport',
    scenarioId: 'missed-flight',
    title: 'Ho perso il volo',
    level: 'B1',
    variant: 1,
    length: 'short',
    goal: 'Kaçırdığın uçuş için çözüm iste.',
    tags: ['problem'],
    sceneType: 'airport',
    characters: {
      A: { name: 'Stefano', role: 'Havayolu görevlisi', gender: 'male', accent: 'american', avatarPreset: 'agent_m' },
      B: { name: 'Passeggero', role: 'Yolcu', gender: 'neutral', accent: 'american', avatarPreset: 'guest_neutral' }
    },
    turns: [
      { speaker: 'A', text: 'Mi dispiace, l\'imbarco è già chiuso.', translation_tr: 'Üzgünüm, biniş kapandı.', emotion: 'sad', register: 'formal' },
      {
        speaker: 'B', expected: 'Ho perso il volo. Cosa posso fare?',
        altAccepted: ['Ho perso il volo. Che cosa posso fare?', 'Ho perso l\'aereo. Cosa posso fare?'],
        translation_tr: 'Uçuşu kaçırdım. Ne yapabilirim?',
        register: 'formal', ipa: '/ɔ ˈpɛr.so il ˈvo.lo ˈkɔ.za ˈpɔs.so ˈfa.re/',
        grammar: [
          { word: 'Ho perso', role: 'geçmiş zaman', note: '"perdere" düzensiz; ortacı "perso".' },
          { word: 'posso fare', role: 'potere + mastar', note: '"yapabilirim" — çözüm ararken temel kalıp.' }
        ],
        keyExpressions: [{ phrase: 'Cosa posso fare?', meaning: 'Ne yapabilirim? — çözüm isteme' }],
        exampleSentences: ['Ho perso il treno.', 'Cosa posso fare adesso?'],
        pronunciationTips: ['"perso" içindeki "r" hafif titretilir: PER-so.']
      },
      { speaker: 'A', text: 'Posso metterla sul volo delle sei, ma c\'è un supplemento.', translation_tr: 'Sizi altıdaki uçuşa alabilirim ama ek ücret var.', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Quanto devo pagare in più?',
        altAccepted: ['Quanto costa il supplemento?', 'Quanto devo pagare di supplemento?'],
        translation_tr: 'Ne kadar fazla ödemem gerekiyor?',
        register: 'formal', ipa: '/ˈkwan.to ˈde.vo paˈɡa.re in pju/',
        grammar: [
          { word: 'devo pagare', role: 'dovere + mastar', note: '"ödemem gerekiyor" — zorunluluk.' },
          { word: 'in più', role: 'zarf öbeği', note: '"fazladan, ilaveten".' }
        ],
        keyExpressions: [{ phrase: 'in più', meaning: 'fazladan, ek olarak' }],
        exampleSentences: ['Devo pagare in più?', 'Costa venti euro in più.'],
        pronunciationTips: ['"più" tek hece, vurgulu: PYU.']
      },
      { speaker: 'A', text: 'Sono quaranta euro. Le va bene?', translation_tr: 'Kırk euro. Uygun mu?', emotion: 'neutral', register: 'formal' },
      {
        speaker: 'B', expected: 'Va bene, lo prendo. Grazie dell\'aiuto.',
        altAccepted: ['D\'accordo, lo prendo. Grazie dell\'aiuto.', 'Va bene, lo prendo. La ringrazio.'],
        translation_tr: 'Tamam, onu alıyorum. Yardımınız için teşekkürler.',
        register: 'formal', ipa: '/va ˈbɛ.ne lo ˈprɛn.do/',
        grammar: [
          { word: 'lo prendo', role: 'nesne zamiri + fiil', note: '"lo" = o (uçuş); zamir fiilden ÖNCE gelir.' },
          { word: "dell'aiuto", role: '"di + il" + elizyon', note: 'di + il = del; sesli önünde "dell\'".' }
        ],
        keyExpressions: [{ phrase: "Grazie dell'aiuto", meaning: 'Yardımınız için teşekkürler' }],
        exampleSentences: ['Lo prendo, grazie.', "Grazie dell'informazione."],
        pronunciationTips: ['"prendo" içindeki "en" burundan değil, net: PREN-do.']
      }
    ]
  })
];
