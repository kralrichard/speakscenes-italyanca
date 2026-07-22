// Persistent NPC identities layered on top of the existing dialogue content.
// This is additive: every NPC below already exists as a character inside a
// real, authored dialogue (js/data/dialogues/*.js) -- nothing here changes
// dialogueScreen.js or any dialogue file. getNpcForDialogue() is the only
// integration point, used by the world/encounter screens to show a
// persistent name/personality before a conversation starts.

export const NPCS = [
  { id: 'grace-hotel', name: 'Grace', role: 'Hotel Receptionist', locationId: 'hotel',
    personality: 'Warm, efficient, always has a solution ready.', avatarPreset: 'receptionist_f' },
  { id: 'daniel-hotel', name: 'Daniel', role: 'Front Desk Manager', locationId: 'hotel',
    personality: 'Calm under pressure, genuinely apologetic when things go wrong.', avatarPreset: 'manager_m' },
  { id: 'priya-airport', name: 'Priya', role: 'Airline Agent', locationId: 'airport',
    personality: 'Brisk and professional, keeps a long line moving with a smile.', avatarPreset: 'agent_f' },
  { id: 'elena-restaurant', name: 'Elena', role: 'Waiter', locationId: 'restaurant',
    personality: 'Friendly and attentive, remembers regular customers.', avatarPreset: 'waiter_f' },
  { id: 'dr-bennett-hospital', name: 'Dr. Bennett', role: 'Doctor', locationId: 'hospital',
    personality: 'Reassuring and precise, explains things clearly.', avatarPreset: 'doctor_f' },
  { id: 'ms-carter-job-interview', name: 'Ms. Carter', role: 'Hiring Manager', locationId: 'job-interview',
    personality: 'Direct and observant, asks good follow-up questions.', avatarPreset: 'manager_f' },
  { id: 'marco-cafe', name: 'Marco', role: 'Barista', locationId: 'cafe',
    personality: 'Chatty and upbeat, loves talking about coffee.', avatarPreset: 'barista_m' },
  { id: 'sam-taxi', name: 'Sam', role: 'Taxi Driver', locationId: 'taxi',
    personality: 'Talkative, knows every shortcut in the city.', avatarPreset: 'driver_m' },
  { id: 'fatima-pharmacy', name: 'Fatima', role: 'Pharmacist', locationId: 'pharmacy',
    personality: 'Patient and thorough, double-checks everything for safety.', avatarPreset: 'pharmacist_f' },
  { id: 'mr-osei-bank', name: 'Mr. Osei', role: 'Bank Representative', locationId: 'bank',
    personality: 'Formal and reassuring, good at explaining paperwork simply.', avatarPreset: 'banker_m' }
];

export function getNpcById(id) {
  return NPCS.find(n => n.id === id);
}

export function getNpcsForLocation(locationId) {
  return NPCS.filter(n => n.locationId === locationId);
}

/** Resolves the persistent NPC behind a dialogue's "A" character. Falls back
 *  to an anonymous NPC built straight from the dialogue's own character data
 *  so any dialogue -- catalogued here or not -- always resolves cleanly. */
export function getNpcForDialogue(dialogue) {
  const charA = dialogue.characters.A;
  const found = NPCS.find(n => n.locationId === dialogue.locationId && n.name === charA.name);
  if (found) return found;
  return {
    id: `anon-${dialogue.id}`,
    name: charA.name,
    role: charA.role,
    locationId: dialogue.locationId,
    personality: '',
    avatarPreset: charA.avatarPreset
  };
}
