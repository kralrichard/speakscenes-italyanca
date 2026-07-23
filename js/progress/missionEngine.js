// Pure logic layer that checks mission requirements against a just-completed
// dialogue or mini-game and applies rewards to worldStore. Not a store
// itself -- it only reads js/data/missions.js and writes worldStore.
import { MISSIONS } from '../data/missions.js?v=6';
import { worldStore } from './worldStore.js?v=6';
import { progressStore } from './progressStore.js?v=6';

function applyRewards(mission) {
  const r = mission.rewards || {};
  // XP stays unified on progressStore (the app's single XP/level bar,
  // already shown on home/progress/dialogue-complete screens) so a mission
  // reward and a dialogue-completion reward count toward the same level.
  if (r.xp) progressStore.addXp(r.xp);
  if (r.coins) worldStore.addCoins(r.coins);
  if (r.unlockLocationIds) r.unlockLocationIds.forEach(id => worldStore.unlockLocation(id));
  worldStore.recordMissionComplete(mission.id);
}

function requirementMet(req, ctx) {
  if (req.type === 'completeDialogue') return ctx.dialogueId === req.dialogueId;
  if (req.type === 'completeAnyAtLocation') return ctx.locationId === req.locationId;
  if (req.type === 'completeMiniGame') return ctx.miniGameType === req.miniGameType;
  return false;
}

/** Call once after a dialogue completes (dialogueScreen.js renderComplete).
 *  Returns the list of missions newly completed by this event. */
export function checkMissionsForDialogue(dialogue, summary) {
  const ctx = { dialogueId: dialogue.id, locationId: dialogue.locationId };
  const newlyCompleted = [];
  for (const mission of MISSIONS) {
    if (worldStore.hasMissionCompleted(mission.id)) continue;
    if (mission.requirements.every(req => requirementMet(req, ctx))) {
      applyRewards(mission);
      newlyCompleted.push(mission);
    }
  }
  return newlyCompleted;
}

/** Call once after a mini-game round completes. */
export function checkMissionsForMiniGame(miniGameType, result) {
  const ctx = { miniGameType, locationId: result && result.locationId };
  const newlyCompleted = [];
  for (const mission of MISSIONS) {
    if (worldStore.hasMissionCompleted(mission.id)) continue;
    if (mission.requirements.every(req => requirementMet(req, ctx))) {
      applyRewards(mission);
      newlyCompleted.push(mission);
    }
  }
  return newlyCompleted;
}
