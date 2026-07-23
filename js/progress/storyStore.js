// ============================================================================
// storyStore — persistence for the branching Story Mode. A NEW sibling store
// (key 'edapp:story:v1'); it never reads or writes the original keys
// (edapp:progress / edapp:review / edapp:settings / edapp:world), so Story
// Mode can be added or removed without touching existing progress.
//
// Persists, per requirement §23:
//   - explored / completed / mastered branches per scenario
//   - reached endings per scenario
//   - relationship values per NPC character
//   - conversation XP, coins, spoken-sentence + success counters
//   - unlocked achievements
//   - per-choice attempt history (so returning to a branch keeps records)
//
// XP is anti-farmed (§23): a choice awards its full XP the FIRST time it is
// completed; later completions of the same choice award a small flat practice
// XP so replaying an easy branch can't inflate progress.
// ============================================================================

import { loadJSON, saveJSON } from './storage.js?v=6';

const KEY = 'edapp:story:v1';
const PRACTICE_XP = 3;

// Relationship ladder — value is a running integer; level is derived.
export const RELATIONSHIP_TIERS = [
  { min: -99, id: 'tense',       label: 'Tense',          labelTr: 'Gergin' },
  { min: 0,   id: 'stranger',    label: 'Stranger',       labelTr: 'Yabancı' },
  { min: 3,   id: 'acquaintance',label: 'Acquaintance',   labelTr: 'Tanıdık' },
  { min: 7,   id: 'friend',      label: 'Friend',         labelTr: 'Arkadaş' },
  { min: 12,  id: 'close',       label: 'Close friend',   labelTr: 'Yakın arkadaş' },
  { min: 18,  id: 'trusted',     label: 'Trusted',        labelTr: 'Güvenilir' }
];

export function relationshipTier(value) {
  let tier = RELATIONSHIP_TIERS[0];
  for (const t of RELATIONSHIP_TIERS) if (value >= t.min) tier = t;
  return tier;
}

export const ACHIEVEMENTS = [
  { id: 'first_conversation', label: 'İlk Konuşma',        labelTr: 'İlk Konuşma',        icon: '🎬', desc: 'İlk sözlü cümleni tamamla.' },
  { id: 'tried_both',         label: 'İki Yolu da Denedin', labelTr: 'İki Yolu da Denedin', icon: '🔀', desc: 'Bir kararda iki farklı seçeneği dene.' },
  { id: 'first_ending',       label: 'Bir Sona Ulaştın',   labelTr: 'Bir Sona Ulaştın',   icon: '🏁', desc: 'Herhangi bir senaryo sonuna ulaş.' },
  { id: 'all_branches',       label: 'Tüm Dallar',         labelTr: 'Tüm Dallar',          icon: '🌳', desc: 'Bir senaryodaki her seçeneği tamamla.' },
  { id: 'five_success',       label: 'Beş Sözlü Cevap',    labelTr: 'Beş Sözlü Cevap',     icon: '🎙️', desc: 'Beş sözlü cevabın kabul edilsin.' },
  { id: 'polite_speaker',     label: 'Kibar Konuşmacı',    labelTr: 'Kibar Konuşmacı',     icon: '🎩', desc: 'Beş kibar/resmî seçeneği tamamla.' },
  { id: 'problem_solver',     label: 'Sorun Çözücü',       labelTr: 'Sorun Çözücü',        icon: '🛠️', desc: '“Sorun çözüldü” sonuna ulaş.' },
  { id: 'globetrotter',       label: 'Gezgin',             labelTr: 'Gezgin',              icon: '🌍', desc: 'Üç farklı ortamda senaryo oyna.' }
];

function defaultState() {
  return {
    xp: 0,
    coins: 0,
    spokenCount: 0,
    successCount: 0,
    politeCount: 0,
    // per scenario: { completedChoices:[keys], masteredChoices:[keys],
    //                 endings:[endingIds], environmentId }
    scenarios: {},
    relationships: {},          // characterId -> integer
    achievements: [],           // unlocked ids
    // per choice key -> { attempts, accepted, firstAwarded }
    choiceRecords: {}
  };
}

class StoryStore {
  constructor() {
    this.state = { ...defaultState(), ...loadJSON(KEY, {}) };
    // defensive fill for forward-compat
    for (const [k, v] of Object.entries(defaultState())) {
      if (this.state[k] === undefined) this.state[k] = v;
    }
    this._newlyUnlocked = [];
  }

  _save() { saveJSON(KEY, this.state); }
  getState() { return this.state; }

  _scenario(id, environmentId) {
    if (!this.state.scenarios[id]) {
      this.state.scenarios[id] = { completedChoices: [], masteredChoices: [], endings: [], environmentId };
    } else if (environmentId && !this.state.scenarios[id].environmentId) {
      this.state.scenarios[id].environmentId = environmentId;
    }
    return this.state.scenarios[id];
  }

  choiceKey(scenarioId, nodeId, choiceId) { return `${scenarioId}::${nodeId}::${choiceId}`; }

  choiceStatus(scenarioId, nodeId, choiceId) {
    const sc = this.state.scenarios[scenarioId];
    const key = `${nodeId}::${choiceId}`;
    if (!sc) return 'unexplored';
    if (sc.masteredChoices.includes(key)) return 'mastered';
    if (sc.completedChoices.includes(key)) return 'completed';
    const rec = this.state.choiceRecords[this.choiceKey(scenarioId, nodeId, choiceId)];
    if (rec && rec.attempts > 0) return 'attempted';
    return 'unexplored';
  }

  recordAttempt(scenarioId, nodeId, choiceId) {
    const k = this.choiceKey(scenarioId, nodeId, choiceId);
    const rec = this.state.choiceRecords[k] || (this.state.choiceRecords[k] = { attempts: 0, accepted: false, firstAwarded: false });
    rec.attempts += 1;
    this._save();
  }

  /** Record an accepted spoken/typed answer for a choice. Returns the XP
   *  awarded (full first time, reduced practice XP after) so the UI can show
   *  the right amount. Handles anti-farm, counters, relationships, achievements. */
  completeChoice(scenario, node, choice, { overallScore = null } = {}) {
    const scenarioId = scenario.id;
    const key = `${node.id}::${choice.id}`;
    const recKey = this.choiceKey(scenarioId, node.id, choice.id);
    const rec = this.state.choiceRecords[recKey] || (this.state.choiceRecords[recKey] = { attempts: 0, accepted: false, firstAwarded: false });

    const sc = this._scenario(scenarioId, scenario.environmentId);

    let awardedXp;
    if (!rec.firstAwarded) {
      awardedXp = choice.xp || 10;
      rec.firstAwarded = true;
    } else {
      awardedXp = PRACTICE_XP; // anti-farm: replays give minimal XP
    }
    rec.accepted = true;

    this.state.xp += awardedXp;
    this.state.spokenCount += 1;
    this.state.successCount += 1;

    if (!sc.completedChoices.includes(key)) sc.completedChoices.push(key);
    // "Mastered" = completed with a strong score (>=90) at least once.
    if (overallScore != null && overallScore >= 90 && !sc.masteredChoices.includes(key)) {
      sc.masteredChoices.push(key);
    }

    if (choice.tone === 'polite' || choice.tone === 'formal') this.state.politeCount += 1;

    if (choice.relationshipEffect) this.adjustRelationship(scenario.npcIds[0], choice.relationshipEffect);

    this._checkAchievements(scenario);
    this._save();
    return awardedXp;
  }

  /** Called on a rejected/failed attempt so spokenCount reflects real effort
   *  without inflating successes. */
  recordSpoken(accepted) {
    this.state.spokenCount += 1;
    if (accepted) this.state.successCount += 1;
    this._save();
  }

  reachEnding(scenario, ending) {
    const sc = this._scenario(scenario.id, scenario.environmentId);
    if (!sc.endings.includes(ending.id)) sc.endings.push(ending.id);
    if (ending.coins) this.addCoins(ending.coins);
    if (ending.relationshipEffect) this.adjustRelationship(scenario.npcIds[0], ending.relationshipEffect);
    this._checkAchievements(scenario, ending);
    this._save();
  }

  addCoins(n) { this.state.coins = Math.max(0, this.state.coins + n); this._save(); }

  adjustRelationship(characterId, delta) {
    if (!characterId) return;
    this.state.relationships[characterId] = (this.state.relationships[characterId] || 0) + delta;
    this._save();
  }

  relationship(characterId) { return this.state.relationships[characterId] || 0; }

  /** How many of a scenario's total choices are completed (for progress %). */
  scenarioProgress(scenarioId, totalChoices) {
    const sc = this.state.scenarios[scenarioId];
    const done = sc ? sc.completedChoices.length : 0;
    return { done, total: totalChoices, pct: totalChoices ? Math.round(done / totalChoices * 100) : 0 };
  }

  isChoiceCompleted(scenarioId, nodeId, choiceId) {
    const sc = this.state.scenarios[scenarioId];
    return !!sc && sc.completedChoices.includes(`${nodeId}::${choiceId}`);
  }

  _unlock(id) {
    if (!this.state.achievements.includes(id)) {
      this.state.achievements.push(id);
      this._newlyUnlocked.push(id);
    }
  }

  /** Drains and returns achievement ids unlocked since the last drain, so the
   *  UI can toast them once. */
  drainNewAchievements() {
    const out = this._newlyUnlocked;
    this._newlyUnlocked = [];
    return out;
  }

  _checkAchievements(scenario, ending) {
    if (this.state.successCount >= 1) this._unlock('first_conversation');
    if (this.state.successCount >= 5) this._unlock('five_success');
    if (this.state.politeCount >= 5) this._unlock('polite_speaker');

    // tried_both: any decision node with >=2 attempted choices
    const attemptedByNode = {};
    for (const k of Object.keys(this.state.choiceRecords)) {
      const rec = this.state.choiceRecords[k];
      if (!rec.attempts) continue;
      const [sid, nid] = k.split('::');
      (attemptedByNode[`${sid}::${nid}`] ||= new Set()).add(k);
    }
    if (Object.values(attemptedByNode).some(s => s.size >= 2)) this._unlock('tried_both');

    // environments played
    const envs = new Set(Object.values(this.state.scenarios).map(s => s.environmentId).filter(Boolean));
    if (envs.size >= 3) this._unlock('globetrotter');

    if (ending) {
      this._unlock('first_ending');
      if (ending.kind === 'problem-solved') this._unlock('problem_solver');
    }

    // all_branches: this scenario's completed choices cover every choice
    if (scenario) {
      const total = scenario._totalChoices;
      const sc = this.state.scenarios[scenario.id];
      if (total && sc && sc.completedChoices.length >= total) this._unlock('all_branches');
    }
  }
}

export const storyStore = new StoryStore();
