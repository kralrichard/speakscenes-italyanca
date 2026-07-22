// Spaced-repetition queue (simplified SM-2) for sentences the user struggled
// with. A turn is queued automatically after 2+ failed attempts in a
// dialogue session (see dialogueScreen.js), and resurfaces on the Review
// screen once its due date arrives.
import { loadJSON, saveJSON } from './storage.js';

const KEY = 'edapp:review:v1';

function load() {
  return loadJSON(KEY, { items: [] });
}
function save(state) {
  saveJSON(KEY, state);
}

class ReviewSystem {
  constructor() {
    this.state = load();
  }

  _itemId(dialogueId, turnIndex) {
    return `${dialogueId}::${turnIndex}`;
  }

  queueFailedTurn(dialogue, turnIndex, turn) {
    const id = this._itemId(dialogue.id, turnIndex);
    if (this.state.items.some(it => it.id === id)) return;
    this.state.items.push({
      id,
      kind: 'turn',
      dialogueId: dialogue.id,
      dialogueTitle: dialogue.title,
      locationId: dialogue.locationId,
      turnIndex,
      expected: turn.expected,
      translation_tr: turn.translation_tr,
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: new Date().toISOString(),
      addedAt: new Date().toISOString()
    });
    save(this.state);
  }

  /** Queues a vocabulary word (from the tap-to-inspect popup or a mini-game
   *  miss) into the same SM-2 queue as failed dialogue turns. `kind` lets
   *  reviewScreen.js render/grade each item type appropriately; existing
   *  items with no `kind` field default to 'turn' via getKind() below. */
  queueVocabItem(vocabWord) {
    const id = `vocab::${vocabWord.id}`;
    if (this.state.items.some(it => it.id === id)) return;
    this.state.items.push({
      id,
      kind: 'vocab',
      wordId: vocabWord.id,
      expected: vocabWord.word,
      translation_tr: vocabWord.translation_tr,
      easeFactor: 2.5,
      interval: 0,
      repetitions: 0,
      dueDate: new Date().toISOString(),
      addedAt: new Date().toISOString()
    });
    save(this.state);
  }

  getKind(item) {
    return item.kind || 'turn';
  }

  getDueItems(limit = 20) {
    const now = Date.now();
    return this.state.items
      .filter(it => new Date(it.dueDate).getTime() <= now)
      .slice(0, limit);
  }

  getAllItems() {
    return this.state.items;
  }

  /** quality: 0-5 (SM-2 scale). Use 2 for "rejected again", 4 for "accepted
   *  on first retry", 5 for "accepted immediately". */
  grade(itemId, quality) {
    const item = this.state.items.find(it => it.id === itemId);
    if (!item) return;

    if (quality < 3) {
      item.repetitions = 0;
      item.interval = 1;
    } else {
      item.repetitions += 1;
      if (item.repetitions === 1) item.interval = 1;
      else if (item.repetitions === 2) item.interval = 3;
      else item.interval = Math.round(item.interval * item.easeFactor);

      item.easeFactor = Math.max(1.3, item.easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
    }

    if (quality >= 4 && item.repetitions >= 4) {
      // Mastered -- remove from the active queue entirely.
      this.state.items = this.state.items.filter(it => it.id !== itemId);
    } else {
      item.dueDate = new Date(Date.now() + item.interval * 86400000).toISOString();
    }
    save(this.state);
  }

  removeItem(itemId) {
    this.state.items = this.state.items.filter(it => it.id !== itemId);
    save(this.state);
  }
}

export const reviewSystem = new ReviewSystem();
