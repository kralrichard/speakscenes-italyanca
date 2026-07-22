// Missions tie a real dialogue or mini-game completion to XP/coin rewards
// and (sometimes) an early location unlock. Checked by
// js/progress/missionEngine.js right after the existing, already-guarded
// completion hooks in dialogueScreen.js and each mini-game screen -- no
// mission here invents its own completion criteria, they all reference real
// content ids.
//
// Mission = {
//   id, title, description, locationId, kind: 'main'|'side',
//   requirements: [{ type: 'completeDialogue', dialogueId } |
//                  { type: 'completeAnyAtLocation', locationId } |
//                  { type: 'completeMiniGame', miniGameType }],
//   rewards: { xp, coins, unlockLocationIds?: string[] }
// }

export const MISSIONS = [
  { id: 'main-hotel', title: 'Check Into the Hotel', locationId: 'hotel', kind: 'main',
    description: 'Talk to Grace at the front desk and get your room key.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'hotel-check-in-a1-01' }],
    rewards: { xp: 30, coins: 15, unlockLocationIds: ['airport'] } },

  { id: 'main-hotel-complaint', title: 'Solve a Hotel Problem', locationId: 'hotel', kind: 'side',
    description: 'Report a noisy room to Daniel and get it resolved.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'hotel-complaint-b2-01' }],
    rewards: { xp: 35, coins: 18 } },

  { id: 'main-airport', title: 'Check In for Your Flight', locationId: 'airport', kind: 'main',
    description: 'Talk to Priya at the check-in desk before your flight.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'airport-check-in-desk-a2-01' }],
    rewards: { xp: 30, coins: 15, unlockLocationIds: ['restaurant'] } },

  { id: 'side-airport-missed', title: 'Handle a Missed Flight', locationId: 'airport', kind: 'side',
    description: 'Your flight was missed — sort it out with the airline agent.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'airport-missed-flight-b1-01' }],
    rewards: { xp: 35, coins: 18 } },

  { id: 'main-restaurant', title: 'Order a Meal', locationId: 'restaurant', kind: 'main',
    description: 'Talk to Elena and order food at the restaurant.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'restaurant-ordering-food-a2-01' }],
    rewards: { xp: 30, coins: 15, unlockLocationIds: ['cafe'] } },

  { id: 'side-restaurant-complaint', title: 'Make a Polite Complaint', locationId: 'restaurant', kind: 'side',
    description: 'Something is wrong with your order — explain it to Elena.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'restaurant-order-complaint-b1-01' }],
    rewards: { xp: 35, coins: 18 } },

  { id: 'main-hospital', title: 'See the Doctor', locationId: 'hospital', kind: 'main',
    description: 'Describe how you feel to Dr. Bennett.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'hospital-doctor-consult-a2-01' }],
    rewards: { xp: 30, coins: 15, unlockLocationIds: ['pharmacy'] } },

  { id: 'main-job-interview', title: 'Ace the Interview', locationId: 'job-interview', kind: 'main',
    description: 'Answer Ms. Carter\'s questions in a job interview.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'job-interview-general-b2-01' }],
    rewards: { xp: 40, coins: 20 } },

  { id: 'main-cafe', title: 'Order a Coffee', locationId: 'cafe', kind: 'main',
    description: 'Order your favorite drink from Marco at the café.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'cafe-ordering-coffee-a1-01' }],
    rewards: { xp: 20, coins: 10 } },

  { id: 'main-taxi', title: 'Give Directions', locationId: 'taxi', kind: 'main',
    description: 'Tell Sam where you need to go.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'taxi-giving-directions-a1-01' }],
    rewards: { xp: 20, coins: 10 } },

  { id: 'main-pharmacy', title: 'Ask for Medicine', locationId: 'pharmacy', kind: 'main',
    description: 'Explain what you need to Fatima at the pharmacy.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'pharmacy-asking-medicine-a1-01' }],
    rewards: { xp: 20, coins: 10, unlockLocationIds: ['bank'] } },

  { id: 'main-bank', title: 'Sort Out a Charge', locationId: 'bank', kind: 'main',
    description: 'Explain the problem with a charge to Mr. Osei.',
    requirements: [{ type: 'completeDialogue', dialogueId: 'bank-charge-complaint-b2-01' }],
    rewards: { xp: 40, coins: 20 } },

  // ---- mini-game side missions (locationId: null = playable from any location) ----
  { id: 'side-object-hunt', title: 'First Words', locationId: null, kind: 'side',
    description: 'Find five objects by their English names.',
    requirements: [{ type: 'completeMiniGame', miniGameType: 'object-hunt' }],
    rewards: { xp: 15, coins: 8 } },
  { id: 'side-word-builder', title: 'Build a Word', locationId: null, kind: 'side',
    description: 'Put the letters in the right order to spell a word.',
    requirements: [{ type: 'completeMiniGame', miniGameType: 'word-builder' }],
    rewards: { xp: 15, coins: 8 } },
  { id: 'side-sentence-builder', title: 'Build a Sentence', locationId: null, kind: 'side',
    description: 'Put the words in the right order to make a sentence.',
    requirements: [{ type: 'completeMiniGame', miniGameType: 'sentence-builder' }],
    rewards: { xp: 15, coins: 8 } },
  { id: 'side-listening', title: 'Listen Closely', locationId: null, kind: 'side',
    description: 'Listen to a sentence and choose or type the correct match.',
    requirements: [{ type: 'completeMiniGame', miniGameType: 'listening-challenge' }],
    rewards: { xp: 15, coins: 8 } },
  { id: 'side-memory', title: 'Match the Words', locationId: null, kind: 'side',
    description: 'Flip cards to match English words with their meanings.',
    requirements: [{ type: 'completeMiniGame', miniGameType: 'memory-match' }],
    rewards: { xp: 15, coins: 8 } }
];

export function getMissionById(id) {
  return MISSIONS.find(m => m.id === id);
}

export function getMissionsForLocation(locationId) {
  return MISSIONS.filter(m => m.locationId === locationId);
}
