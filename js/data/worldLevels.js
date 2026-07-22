// World/growth level system: A0-C2. This is the "how grown-up is my
// character" axis for the life-adventure game, kept deliberately separate
// from dialogueSchema.js's LEVEL_CODES (A1-C2 only, used to validate real
// turn-based Dialogue content). A0 never appears on a validated Dialogue --
// it is driven entirely by the tap-based Object Hunt experience
// (see engine/tapEngine.js) instead of the alternating-turn dialogue engine.

export const WORLD_LEVEL_CODES = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const GROWTH_STAGES = [
  { code: 'A0', name: 'Baby', avatarStage: 'baby', color: '#6b9bd1',
    desc: 'Learning first words through objects, sounds, colors and people.' },
  { code: 'A1', name: 'Young Child', avatarStage: 'child', color: '#2e7d5b',
    desc: 'Simple sentences: greetings, family, food, everyday basics.' },
  { code: 'A2', name: 'Older Child', avatarStage: 'olderChild', color: '#3a7ca5',
    desc: 'A bigger world: school, shopping, transport, hobbies, past events.' },
  { code: 'B1', name: 'Teenager', avatarStage: 'teen', color: '#7952b3',
    desc: 'More independence: traveling, hotels, first job interviews, friendships.' },
  { code: 'B2', name: 'Young Adult', avatarStage: 'youngAdult', color: '#b5651d',
    desc: 'Complex social and professional situations, negotiation, debate.' },
  { code: 'C1', name: 'Adult', avatarStage: 'adult', color: '#a3324a',
    desc: 'Advanced academic and professional communication, persuasion, nuance.' },
  { code: 'C2', name: 'Confident Adult', avatarStage: 'confidentAdult', color: '#4b3869',
    desc: 'Natural, precise, flexible English — idiom, humor, complex debate.' }
];

export function getGrowthStage(code) {
  return GROWTH_STAGES.find(g => g.code === code) || GROWTH_STAGES[0];
}

export function worldLevelIndex(code) {
  const i = WORLD_LEVEL_CODES.indexOf(code);
  return i === -1 ? 0 : i;
}

/** True if `code` is at or beyond `minCode` on the A0-C2 ladder. */
export function isAtLeastLevel(code, minCode) {
  return worldLevelIndex(code) >= worldLevelIndex(minCode);
}
