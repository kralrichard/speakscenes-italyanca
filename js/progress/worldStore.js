// Player/world state for the life-adventure game: growth level, avatar,
// coins, location unlocks, per-level measured skill, missions, placement
// test result. Deliberately a NEW sibling store (key 'edapp:world:v1'),
// not an extension of progressStore.js -- progressStore already has a lot
// of surface area and, critically, loads state via a full REPLACE
// (`loadJSON(KEY, null) || defaultState()`), not a merge, so bolting new
// fields onto its defaultState() would leave them `undefined` for existing
// users. This store uses the MERGE pattern from settingsStore.js instead
// (`{...DEFAULTS, ...loadJSON(...)}`), so future field additions are safe
// by construction. edapp:progress:v1 / edapp:review:v1 / edapp:settings:v1
// are never touched by this file.
import { loadJSON, saveJSON } from './storage.js?v=5';
import { progressStore } from './progressStore.js?v=5';
import { getLocation, LOCATIONS } from '../data/locations.js?v=5';
import { WORLD_LEVEL_CODES, worldLevelIndex } from '../data/worldLevels.js?v=5';
import { LEVEL_CODES as DIALOGUE_LEVEL_CODES } from '../data/dialogueSchema.js?v=5';

const KEY = 'edapp:world:v1';

function defaultState() {
  return {
    onboarded: false,
    playerName: '',
    worldLevel: 'A0',
    coins: 0,
    avatar: { skinTone: '#e0aa7e', hairStyle: 'short', hairColor: '#4a2f1d', outfitId: 'default', accessoryIds: [] },
    unlockedLocationIds: ['home'],
    skillScores: { A0: null, A1: null, A2: null, B1: null, B2: null, C1: null, C2: null },
    completedMissionIds: [],
    placementTest: { taken: false, recommendedLevel: null, takenAt: null },
    mapVisited: []
  };
}

class WorldStore {
  constructor() {
    this.state = { ...defaultState(), ...loadJSON(KEY, {}) };
  }

  _save() {
    saveJSON(KEY, this.state);
  }

  getState() {
    return this.state;
  }

  setOnboarded(name) {
    this.state.onboarded = true;
    if (name) this.state.playerName = name;
    this._save();
  }

  setPlayerName(name) {
    this.state.playerName = name;
    this._save();
  }

  /** Raises/lowers the world (growth) level. Instantly changes which
   *  featured locations are reachable (see isLocationUnlocked below) --
   *  "freedom to jump" from the product spec. Mirrors into
   *  progressStore.cefrLevel for A1-C2 so the existing picker/home screens
   *  (which read progressStore.cefrLevel) stay in sync; A0 has no dialogue
   *  equivalent so it isn't mirrored. */
  setWorldLevel(code) {
    if (!WORLD_LEVEL_CODES.includes(code)) return;
    this.state.worldLevel = code;
    if (DIALOGUE_LEVEL_CODES.includes(code)) progressStore.setCefrLevel(code);
    this._save();
  }

  addCoins(n) {
    this.state.coins = Math.max(0, this.state.coins + n);
    this._save();
  }

  spendCoins(n) {
    if (this.state.coins < n) return false;
    this.state.coins -= n;
    this._save();
    return true;
  }

  setAvatarPart(part, value) {
    this.state.avatar[part] = value;
    this._save();
  }

  unlockLocation(id) {
    if (!this.state.unlockedLocationIds.includes(id)) {
      this.state.unlockedLocationIds.push(id);
      this._save();
    }
  }

  markLocationVisited(id) {
    if (!this.state.mapVisited.includes(id)) {
      this.state.mapVisited.push(id);
      this._save();
    }
  }

  hasMissionCompleted(id) {
    return this.state.completedMissionIds.includes(id);
  }

  recordMissionComplete(id) {
    if (this.state.completedMissionIds.includes(id)) return false;
    this.state.completedMissionIds.push(id);
    this._save();
    return true;
  }

  /** Rolling-average "measured skill" for a world level -- kept separate
   *  from worldLevel itself so the UI can honestly show "Selected world
   *  level: B1, Measured speaking skill: A2" rather than pretending a
   *  manual level jump means the skill was already earned. */
  recordSkillSample(levelCode, value) {
    if (!WORLD_LEVEL_CODES.includes(levelCode) || typeof value !== 'number') return;
    const prev = this.state.skillScores[levelCode];
    this.state.skillScores[levelCode] = prev == null ? value : Math.round((prev + value) / 2);
    this._save();
  }

  setPlacementRecommendation(code) {
    this.state.placementTest = { taken: true, recommendedLevel: code, takenAt: new Date().toISOString() };
    this._save();
  }
}

export const worldStore = new WorldStore();

/** NOTHING IS LOCKED. Every real location is reachable from the start.
 *  `minWorldLevel` survives only as a *recommendation* used for ordering and
 *  for the "recommended level" badge -- it never blocks access, so a learner
 *  can always jump straight to whatever situation they actually need. */
export function isLocationUnlocked(locationId) {
  return !!getLocation(locationId);
}

/** Every location goes on the world map, not just the hand-picked ones.
 *  Sorted by recommended level so the natural progression is still obvious
 *  at a glance, with the lowest-level places first. */
export function getFeaturedLocations() {
  return [...LOCATIONS].sort((a, b) =>
    worldLevelIndex(a.minWorldLevel || 'A0') - worldLevelIndex(b.minWorldLevel || 'A0'));
}
