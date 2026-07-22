// Guarded state machine for single-word tap interactions (A0's "conversation"
// substitute, and the Object Hunt / Memory Match mini-games). Deliberately
// separate from DialogueEngine: that engine assumes alternating A/B turns
// with an `expected` sentence, which single-word tap rounds don't have --
// forcing them through it would corrupt getSummary()'s averaging and the
// review system's sentence-based item shape. Same guarded-transition/
// onChange style as dialogueEngine.js so it's consistent and testable.
//
// States:
//   'prompt-speaking'  the word/prompt is being read aloud (or shown);
//                      UI calls promptFinishedSpeaking() when done
//   'awaiting-tap'     user must tap the matching item
//   'correct'          last tap matched -- UI shows feedback, then next()
//   'incorrect'        last tap didn't match -- UI shows feedback; retry()
//                      re-arms the same item, or next() skips it
//   'complete'         every item in the round has been shown

export class TapEngine {
  /**
   * @param {Array<{id:string}>} items  the prompt sequence for this round
   */
  constructor(items) {
    this.items = items || [];
    this.index = 0;
    this.listeners = new Set();
    this.results = []; // { itemId, correct }
    this.startedAt = Date.now();
    this.state = this.items.length ? 'prompt-speaking' : 'complete';
  }

  get currentItem() {
    return this.items[this.index] || null;
  }

  get progress() {
    return { current: Math.min(this.index, this.items.length), total: this.items.length };
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

  getSnapshot() {
    return {
      state: this.state,
      index: this.index,
      item: this.currentItem,
      progress: this.progress,
      isComplete: this.state === 'complete'
    };
  }

  /** Call after the prompt (TTS or reveal animation) finishes. Guarded like
   *  DialogueEngine.characterFinishedSpeaking(). */
  promptFinishedSpeaking() {
    if (this.state !== 'prompt-speaking') return false;
    this._setState('awaiting-tap');
    return true;
  }

  /** Call with the id of whatever the user tapped. */
  submitTap(tappedId) {
    if (this.state !== 'awaiting-tap') return null;
    const item = this.currentItem;
    const correct = tappedId === item.id;
    this.results.push({ itemId: item.id, correct });
    this._setState(correct ? 'correct' : 'incorrect');
    return { correct };
  }

  /** Advance to the next item (or complete). Valid from 'correct' or
   *  'incorrect' -- mirrors DialogueEngine's _advance() being reachable
   *  only after a resolved attempt. */
  next() {
    if (this.state !== 'correct' && this.state !== 'incorrect') return false;
    this.index += 1;
    if (this.index >= this.items.length) {
      this._setState('complete');
      return true;
    }
    this._setState('prompt-speaking');
    return true;
  }

  /** Re-arm the current item after a wrong tap, without recording another
   *  attempt yet (the retry itself gets scored via submitTap again). */
  retry() {
    if (this.state !== 'incorrect') return false;
    this._setState('awaiting-tap');
    return true;
  }

  getSummary() {
    const correctCount = this.results.filter(r => r.correct).length;
    return {
      totalItems: this.items.length,
      correctCount,
      accuracy: this.items.length ? Math.round((correctCount / this.items.length) * 100) : 0,
      durationMs: Date.now() - this.startedAt,
      missedItemIds: [...new Set(this.results.filter(r => !r.correct).map(r => r.itemId))]
    };
  }
}
