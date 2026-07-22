import { loadJSON, saveJSON, todayKey } from './storage.js?v=5';

const KEY = 'edapp:progress:v1';

const XP_PER_LEVEL = 200;

const ACHIEVEMENT_DEFS = [
  { id: 'first-dialogue', name: 'First Steps', desc: 'Complete your first dialogue.', check: s => s.completedDialogues.length >= 1 },
  { id: 'five-dialogues', name: 'Getting Fluent', desc: 'Complete 5 dialogues.', check: s => s.completedDialogues.length >= 5 },
  { id: 'streak-3', name: 'On a Roll', desc: 'Reach a 3-day speaking streak.', check: s => s.streak.current >= 3 },
  { id: 'streak-7', name: 'Committed', desc: 'Reach a 7-day speaking streak.', check: s => s.streak.current >= 7 },
  { id: 'perfect-turn', name: 'Crystal Clear', desc: 'Get 100% accuracy on a sentence.', check: s => s.hadPerfectTurn === true },
  { id: 'explorer-5', name: 'World Traveler', desc: 'Complete dialogues in 5 different locations.', check: s => new Set(s.completedDialogues.map(d => d.locationId)).size >= 5 }
];

function defaultState() {
  return {
    xp: 0,
    streak: { current: 0, longest: 0, lastActiveDate: null },
    speakingTimeLog: {},        // { 'YYYY-MM-DD': seconds }
    completedDialogues: [],     // { dialogueId, locationId, level, completedAt, summary }
    wordStats: {},              // { word: { attempts, misses } }
    favorites: [],
    achievements: [],
    hadPerfectTurn: false,
    cefrLevel: 'A1'
  };
}

class ProgressStore {
  constructor() {
    this.state = loadJSON(KEY, null) || defaultState();
  }

  _save() {
    saveJSON(KEY, this.state);
  }

  getState() {
    return this.state;
  }

  get level() {
    return Math.floor(this.state.xp / XP_PER_LEVEL) + 1;
  }

  get xpIntoLevel() {
    return this.state.xp % XP_PER_LEVEL;
  }

  setCefrLevel(code) {
    this.state.cefrLevel = code;
    this._save();
  }

  /** Adds XP outside of a full dialogue-completion event (e.g. mission and
   *  mini-game rewards) so every reward in the app counts toward the same
   *  XP/level number shown on the home/progress screens. */
  addXp(amount) {
    this.state.xp += Math.max(0, amount);
    this._save();
  }

  toggleFavorite(dialogueId) {
    const i = this.state.favorites.indexOf(dialogueId);
    if (i === -1) this.state.favorites.push(dialogueId);
    else this.state.favorites.splice(i, 1);
    this._save();
    return this.state.favorites.includes(dialogueId);
  }

  isFavorite(dialogueId) {
    return this.state.favorites.includes(dialogueId);
  }

  _bumpStreak() {
    const today = todayKey();
    const last = this.state.streak.lastActiveDate;
    if (last === today) return;
    const yesterday = todayKey(new Date(Date.now() - 86400000));
    this.state.streak.current = (last === yesterday) ? this.state.streak.current + 1 : 1;
    this.state.streak.longest = Math.max(this.state.streak.longest, this.state.streak.current);
    this.state.streak.lastActiveDate = today;
  }

  recordSpeakingTime(seconds) {
    const key = todayKey();
    this.state.speakingTimeLog[key] = (this.state.speakingTimeLog[key] || 0) + seconds;
    this._bumpStreak();
    this._save();
  }

  recordWordAttempt(word, wasCorrect) {
    const w = this.state.wordStats[word] || { attempts: 0, misses: 0 };
    w.attempts += 1;
    if (!wasCorrect) w.misses += 1;
    this.state.wordStats[word] = w;
    this._save();
  }

  /** Called once per completed dialogue with the DialogueEngine's getSummary() output. */
  recordDialogueCompletion(dialogue, summary) {
    this.state.completedDialogues.push({
      dialogueId: dialogue.id,
      locationId: dialogue.locationId,
      level: dialogue.level,
      completedAt: new Date().toISOString(),
      summary
    });

    for (const word of summary.difficultWords || []) {
      this.recordWordAttempt(word, false);
    }
    if (summary.accuracy >= 100) this.state.hadPerfectTurn = true;

    const xpGain = 40 + Math.round((summary.accuracy || 0) * 0.4) - Math.min(20, (summary.totalAttempts || 0));
    this.state.xp += Math.max(15, xpGain);

    this.recordSpeakingTime(Math.round((summary.durationMs || 0) / 1000));

    const newly = ACHIEVEMENT_DEFS.filter(a => !this.state.achievements.includes(a.id) && a.check(this.state));
    for (const a of newly) this.state.achievements.push(a.id);

    this._save();
    return { xpGain, newAchievements: newly };
  }

  getMostDifficultWords(limit = 10) {
    return Object.entries(this.state.wordStats)
      .map(([word, s]) => ({ word, ...s, missRate: s.attempts ? s.misses / s.attempts : 0 }))
      .filter(w => w.attempts >= 1 && w.misses > 0)
      .sort((a, b) => b.missRate - a.missRate || b.misses - a.misses)
      .slice(0, limit);
  }

  getWeeklySpeakingSeconds() {
    let total = 0;
    for (let i = 0; i < 7; i++) {
      const key = todayKey(new Date(Date.now() - i * 86400000));
      total += this.state.speakingTimeLog[key] || 0;
    }
    return total;
  }

  getTodaySpeakingSeconds() {
    return this.state.speakingTimeLog[todayKey()] || 0;
  }

  getAchievements() {
    return ACHIEVEMENT_DEFS.map(a => ({ ...a, unlocked: this.state.achievements.includes(a.id) }));
  }

  getCompletedCount() {
    return this.state.completedDialogues.length;
  }

  hasCompleted(dialogueId) {
    return this.state.completedDialogues.some(d => d.dialogueId === dialogueId);
  }
}

export const progressStore = new ProgressStore();
