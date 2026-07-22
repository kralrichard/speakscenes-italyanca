// Core turn-by-turn state machine. Framework-agnostic: it knows nothing about
// the DOM, TTS, or speech recognition -- the dialogue screen wires those up.
// This keeps conversation-state logic testable (see tests/) and reusable.
//
// States:
//   'character-speaking'  app character's turn; UI plays TTS then calls
//                         characterFinishedSpeaking()
//   'awaiting-user'       user's turn; UI shows mic + expected sentence
//   'scoring'             a recording is being analyzed
//   'turn-rejected'       last attempt failed; user must retry
//   'complete'            dialogue finished
//
// Transitions are guarded: calls that don't match the current state are
// ignored, so a late TTS callback or double mic-press can never skip a turn
// or advance twice.

export class DialogueEngine {
  /**
   * @param {object} dialogue  validated dialogue object
   * @param {object} [opts]
   * @param {'A'|'B'} [opts.playerRole='B']  which character the user plays
   * @param {number} [opts.startTurnIndex=0] resume point (refresh recovery)
   */
  constructor(dialogue, { playerRole = 'B', startTurnIndex = 0 } = {}) {
    this.dialogue = dialogue;
    this.playerRole = playerRole === 'A' ? 'A' : 'B';
    this.characterRole = this.playerRole === 'A' ? 'B' : 'A';
    this.turnIndex = Math.min(Math.max(0, startTurnIndex), dialogue.turns.length);
    this.listeners = new Set();
    // history[turnIndex] = { attempts: [{ transcript, score, accepted, timestampMs }] }
    this.history = dialogue.turns.map(() => ({ attempts: [] }));
    this.startedAt = Date.now();

    if (this.turnIndex >= dialogue.turns.length) {
      this.state = 'complete';
    } else {
      this.state = this._roleOf(this.turnIndex) === this.playerRole ? 'awaiting-user' : 'character-speaking';
    }
  }

  _roleOf(index) {
    return this.dialogue.turns[index].speaker;
  }

  onChange(fn) {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  _emit() {
    const snap = this.getSnapshot();
    for (const fn of this.listeners) fn(snap);
  }

  _setState(state) {
    this.state = state;
    this._emit();
  }

  get currentTurn() {
    return this.dialogue.turns[this.turnIndex] || null;
  }

  get progress() {
    return { current: Math.min(this.turnIndex, this.dialogue.turns.length), total: this.dialogue.turns.length };
  }

  getSnapshot() {
    return {
      state: this.state,
      turnIndex: this.turnIndex,
      turn: this.currentTurn,
      progress: this.progress,
      isComplete: this.state === 'complete',
      attempts: this.history[this.turnIndex] ? this.history[this.turnIndex].attempts : []
    };
  }

  /** Serializable resume point -- persisted by the session store so a page
   *  refresh restarts at the same turn instead of losing the dialogue. */
  serialize() {
    return { dialogueId: this.dialogue.id, playerRole: this.playerRole, turnIndex: this.turnIndex };
  }

  /** Call after the app character's TTS line finishes playing. Guarded: a
   *  stale onEnd callback (e.g. after a replay) cannot double-advance. */
  characterFinishedSpeaking() {
    if (this.state !== 'character-speaking') return false;
    this._advance();
    return true;
  }

  /** Call when a recording has been captured and analysis begins. */
  beginScoring() {
    if (this.state !== 'awaiting-user') return false;
    this._setState('scoring');
    return true;
  }

  /** Call with the scorer result. Only valid while 'scoring' (or
   *  'awaiting-user' for providers that skip beginScoring). */
  submitAttempt({ transcript, score, accepted }) {
    if (this.state !== 'scoring' && this.state !== 'awaiting-user') return null;
    const entry = { transcript, score, accepted, timestampMs: Date.now() };
    this.history[this.turnIndex].attempts.push(entry);
    if (accepted) this._advance();
    else this._setState('turn-rejected');
    return entry;
  }

  /** Return from rejection feedback to the mic-ready state. */
  retry() {
    if (this.state !== 'turn-rejected') return false;
    this._setState('awaiting-user');
    return true;
  }

  /** Recording produced nothing usable (no-speech / cancel): back to ready. */
  cancelScoring() {
    if (this.state !== 'scoring') return false;
    this._setState('awaiting-user');
    return true;
  }

  _advance() {
    this.turnIndex += 1;
    if (this.turnIndex >= this.dialogue.turns.length) {
      this._setState('complete');
      return;
    }
    this._setState(this._roleOf(this.turnIndex) === this.playerRole ? 'awaiting-user' : 'character-speaking');
  }

  /** Aggregate stats for the end-of-dialogue report. Null-safe: metrics the
   *  scorer couldn't honestly measure (clarity/fluency without timing data)
   *  are averaged only over attempts that have them, or reported as null. */
  getSummary() {
    const userTurns = [];
    this.history.forEach((h, i) => {
      if (this.dialogue.turns[i].speaker === this.playerRole && h.attempts.length) userTurns.push(h);
    });
    const totalAttempts = userTurns.reduce((sum, h) => sum + h.attempts.length, 0);
    const finalScores = userTurns.map(h => h.attempts[h.attempts.length - 1].score).filter(Boolean);

    const avg = (key) => {
      const vals = finalScores.map(s => s[key]).filter(v => typeof v === 'number');
      return vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : null;
    };

    const difficultWords = new Map();
    for (const h of userTurns) {
      for (const attempt of h.attempts) {
        for (const w of (attempt.score && attempt.score.problemWords) || []) {
          difficultWords.set(w, (difficultWords.get(w) || 0) + 1);
        }
      }
    }

    return {
      dialogueId: this.dialogue.id,
      title: this.dialogue.title,
      durationMs: Date.now() - this.startedAt,
      turnsCompleted: userTurns.length,
      totalAttempts,
      accuracy: avg('wordAccuracy') ?? 0,
      clarity: avg('clarity'),          // null when recognizer gave no confidence
      fluency: avg('fluency'),          // null when no timing data (typed mode)
      grammar: avg('grammarAdherence') ?? 0,
      difficultWords: [...difficultWords.entries()].sort((a, b) => b[1] - a[1]).map(([w]) => w).slice(0, 5)
    };
  }
}
