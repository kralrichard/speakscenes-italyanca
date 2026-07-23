// Shorts feed progress + the "grow the baby by swiping" mechanic.
//
// A NEW sibling store (key 'edapp:shorts:v1') using the safe MERGE pattern
// (like settingsStore/worldStore), so it never touches the original
// progress/review/settings/world/story keys. It owns only: how many cards the
// learner has swiped through, how many they spoke correctly, and a per-level
// cursor so the feed walks the 10k-sentence bank without repeating.
//
// GROWTH MODEL (honest + tied to real content):
//   The avatar's life stage is a function of total swipes. Each swipe is one
//   unit of "language exposure" — the baby literally grows as it experiences
//   more English, and because the sentence bank is CEFR-sorted the sentences
//   it meets get harder exactly as it grows. Reaching the final Confident-Adult
//   (C2) stage takes GROWTH_THRESHOLDS[6] swipes. Speaking a card correctly is
//   tracked separately (spokenCorrect) and feeds worldStore's *measured* skill,
//   so swiping = growing up, speaking = getting good — never conflated.

import { loadJSON, saveJSON } from './storage.js?v=6';
import { LEVEL_ORDER } from '../data/shorts/sentenceBank.js?v=6';

const KEY = 'edapp:shorts:v1';

// Cumulative swipes needed to ENTER each life stage (index matches LEVEL_ORDER
// / GROWTH_STAGES). Front-loaded so the first few stages come quickly and feel
// rewarding, then space out toward mastery.
export const GROWTH_THRESHOLDS = [0, 360, 900, 1700, 2800, 4200, 6000];

function defaultState() {
  return {
    swipes: 0,
    spokenCorrect: 0,
    spokenTotal: 0,
    bestStreak: 0,
    cursor: { A0: 0, A1: 0, A2: 0, B1: 0, B2: 0, C1: 0, C2: 0 },
    likedIds: []
  };
}

class ShortsStore {
  constructor() {
    this.state = { ...defaultState(), ...loadJSON(KEY, {}) };
    // heal a partial cursor from an older save
    this.state.cursor = { ...defaultState().cursor, ...(this.state.cursor || {}) };
  }
  _save() { saveJSON(KEY, this.state); }
  getState() { return this.state; }

  /** 0-based life-stage index from total swipes. */
  stageIndex() {
    let idx = 0;
    for (let i = 0; i < GROWTH_THRESHOLDS.length; i++) {
      if (this.state.swipes >= GROWTH_THRESHOLDS[i]) idx = i;
    }
    return idx;
  }

  currentLevel() { return LEVEL_ORDER[this.stageIndex()]; }

  /** Progress 0..1 through the CURRENT stage toward the next one. 1 at the
   *  final stage. */
  stageProgress() {
    const i = this.stageIndex();
    if (i >= GROWTH_THRESHOLDS.length - 1) return 1;
    const from = GROWTH_THRESHOLDS[i], to = GROWTH_THRESHOLDS[i + 1];
    return Math.max(0, Math.min(1, (this.state.swipes - from) / (to - from)));
  }

  swipesToNextStage() {
    const i = this.stageIndex();
    if (i >= GROWTH_THRESHOLDS.length - 1) return 0;
    return Math.max(0, GROWTH_THRESHOLDS[i + 1] - this.state.swipes);
  }

  /** Record one forward swipe. Returns { leveledUp, stageIndex }. */
  recordSwipe() {
    const before = this.stageIndex();
    this.state.swipes++;
    const after = this.stageIndex();
    this._save();
    return { leveledUp: after > before, stageIndex: after };
  }

  /** Next cursor position for a level (so the feed doesn't repeat). */
  nextCursor(level) {
    const c = this.state.cursor[level] || 0;
    this.state.cursor[level] = c + 1;
    this._save();
    return c;
  }

  recordSpoken(ok, streak = 0) {
    this.state.spokenTotal++;
    if (ok) this.state.spokenCorrect++;
    if (streak > this.state.bestStreak) this.state.bestStreak = streak;
    this._save();
  }

  toggleLike(id) {
    const i = this.state.likedIds.indexOf(id);
    if (i === -1) this.state.likedIds.push(id); else this.state.likedIds.splice(i, 1);
    this._save();
    return this.state.likedIds.includes(id);
  }
  isLiked(id) { return this.state.likedIds.includes(id); }
}

export const shortsStore = new ShortsStore();
