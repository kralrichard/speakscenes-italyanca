// ============================================================================
// Dialogue authoring schema + helpers.
//
// A "dialogue" is one complete two-person conversation. It is the unit that
// the dialogue engine (js/engine/dialogueEngine.js) plays back turn by turn.
//
// Shape (informal JSDoc typedefs -- plain JS objects, no build step/TS):
//
// Dialogue = {
//   id: string,                 // unique, kebab-case, e.g. "hotel-checkin-a1-01"
//   locationId: string,         // must match an id in js/data/locations.js
//   scenarioId: string,         // must match a scenario id under that location
//   title: string,
//   level: 'A1'|'A2'|'B1'|'B2'|'C1'|'C2',
//   variant: number,            // 1, 2, 3... lets a scenario have several
//                                // non-repeating versions at the same level
//   length: 'short'|'medium'|'long',
//   goal: string,                // one-line "what this conversation achieves"
//   tags: string[],
//   sceneType: string,           // key into SCENE_TEMPLATES (ui/components/sceneBackground.js)
//   characters: {
//     A: Character,              // application-controlled by default
//     B: Character                // user-controlled by default
//   },
//   turns: Turn[]
// }
//
// Character = {
//   name: string,
//   role: string,                // e.g. "Hotel Receptionist"
//   gender: 'female'|'male'|'neutral',
//   accent: 'american'|'british'|'australian'|'canadian'|'irish'|'scottish'|'indian'|'international',
//   avatarPreset: string          // key into AVATAR_PRESETS
// }
//
// Turn (spoken by the app character, speaker 'A') = {
//   speaker: 'A',
//   text: string,
//   translation_tr: string,
//   emotion: 'neutral'|'friendly'|'concerned'|'apologetic'|'curious'|'thinking'|'happy'|'formal'|'surprised',
//   register: 'formal'|'informal'|'neutral'
// }
//
// Turn (expected from the user, speaker 'B') = {
//   speaker: 'B',
//   expected: string,             // canonical sentence shown & scored
//   altAccepted: string[],        // equally-correct alternate phrasings
//   translation_tr: string,
//   register: 'formal'|'informal'|'neutral',
//   ipa: string,                  // approximate phonetic transcription
//   grammar: GrammarNote[],       // word-by-word breakdown
//   keyExpressions: {phrase:string, meaning:string}[],
//   exampleSentences: string[],
//   pronunciationTips: string[]   // static author-written tips shown alongside
//                                  // the live tips the scorer generates
// }
//
// GrammarNote = { word: string, role: string, note: string }
//
// ============================================================================

export const LEVEL_CODES = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
export const REGISTERS = ['formal', 'informal', 'neutral'];
export const EMOTIONS = [
  'neutral', 'friendly', 'concerned', 'apologetic',
  'curious', 'thinking', 'happy', 'formal', 'surprised'
];

/** Tokenizes a sentence into lowercase words, stripping punctuation. Shared by
 *  the scorer and by authoring-time validation so both agree on word counts. */
export function tokenize(sentence) {
  return sentence
    .toLowerCase()
    .normalize('NFKC')
    .replace(/[.,!?;:"“”'’()]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

/** Throws a descriptive error if a dialogue object is malformed. Call this
 *  from dialogues/index.js when registering content so authoring mistakes
 *  fail loudly during development instead of breaking the UI silently. */
export function validateDialogue(d) {
  const errs = [];
  if (!d.id) errs.push('missing id');
  if (!d.locationId) errs.push('missing locationId');
  if (!d.scenarioId) errs.push('missing scenarioId');
  if (!LEVEL_CODES.includes(d.level)) errs.push(`invalid level "${d.level}"`);
  if (!d.sceneType) errs.push('missing sceneType');
  if (!d.characters || !d.characters.A || !d.characters.B) errs.push('missing characters.A / characters.B');
  if (!Array.isArray(d.turns) || d.turns.length < 2) errs.push('turns must be an array with at least 2 entries');

  (d.turns || []).forEach((t, i) => {
    if (t.speaker !== 'A' && t.speaker !== 'B') {
      errs.push(`turn ${i}: speaker must be 'A' or 'B'`);
      return;
    }
    if (t.speaker === 'A' && !t.text) errs.push(`turn ${i}: A-turn missing text`);
    if (t.speaker === 'B' && !t.expected) errs.push(`turn ${i}: B-turn missing expected`);
  });

  if (errs.length) {
    throw new Error(`Invalid dialogue "${d.id || '(no id)'}": ${errs.join('; ')}`);
  }
  return d;
}

/** Convenience factory so dialogue-content files stay terse and consistent. */
export function createDialogue(def) {
  return validateDialogue({
    variant: 1,
    length: 'short',
    tags: [],
    ...def
  });
}
