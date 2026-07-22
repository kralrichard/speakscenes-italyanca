// ============================================================================
// BranchEngine — a guarded traversal state machine over a Scenario graph
// (js/data/branching/scenarioSchema.js). DOM-free and fully unit-tested so
// the branching logic is verifiable without a browser.
//
// Responsibilities:
//   - Track the current node and a history stack of decisions taken.
//   - Advance ONLY when the UI reports a choice's spoken/typed answer was
//     accepted (the engine never scores speech itself — that stays in
//     js/speech/scorer.js, reused unchanged).
//   - Auto-follow `next` chains (NPC lines with no choices) and stop on an
//     ending.
//   - Support rewind: return to any earlier decision point without losing the
//     record of which branches were already explored.
//
// The engine emits no events; the screen calls methods and reads state. This
// keeps it trivially testable and matches the style of DialogueEngine.
// ============================================================================

export class BranchEngine {
  constructor(scenario) {
    this.scenario = scenario;
    // history: [{ nodeId, choiceId }] — the decision points passed through,
    // in order. The current node is derived by replaying, but we also cache it.
    this.history = [];
    this.currentNodeId = scenario.startNodeId;
    this.endingId = null;
    // Set of "nodeId::choiceId" keys attempted this session (for marking).
    this.exploredChoices = new Set();
    this._autoAdvance();
  }

  get scenarioId() { return this.scenario.id; }

  currentNode() {
    return this.endingId ? null : this.scenario.nodes[this.currentNodeId];
  }

  currentEnding() {
    return this.endingId ? this.scenario.endings[this.endingId] : null;
  }

  isAtEnding() { return this.endingId != null; }

  isDecisionPoint() {
    const n = this.currentNode();
    return !!(n && Array.isArray(n.choices) && n.choices.length);
  }

  /** Follows a run of auto-advancing (`next`/`endingId`) nodes until the next
   *  decision point or an ending. NPC lines the player just watches. Returns
   *  the list of nodes walked over (so the UI can show them in sequence). */
  _autoAdvance() {
    const walked = [];
    // guard against a malformed cyclic `next` chain
    let guard = 0;
    while (!this.endingId) {
      const node = this.scenario.nodes[this.currentNodeId];
      if (!node) throw new Error(`BranchEngine: unknown node "${this.currentNodeId}"`);
      if (node.endingId) { this.endingId = node.endingId; break; }
      if (node.choices && node.choices.length) break; // stop at decision
      if (node.next) {
        walked.push(node);
        this.currentNodeId = node.next;
        if (this.scenario.endings[node.next]) { this.endingId = node.next; break; }
        if (++guard > 200) throw new Error(`BranchEngine: runaway next-chain at "${node.id}"`);
        continue;
      }
      break;
    }
    return walked;
  }

  /** The NPC line the player is currently responding to (or watching). */
  advanceToStart() { return this._autoAdvance(); }

  /** Returns the choice object for a given id at the current node, or null. */
  choiceById(choiceId) {
    const n = this.currentNode();
    if (!n || !n.choices) return null;
    return n.choices.find(c => c.id === choiceId) || null;
  }

  markAttempted(choiceId) {
    this.exploredChoices.add(`${this.currentNodeId}::${choiceId}`);
  }

  /** Commit a choice whose spoken/typed answer the UI already accepted. Pushes
   *  the decision onto history, moves to the choice's target, and follows any
   *  auto-advance chain. Returns { nodes, node, ending }. */
  commitChoice(choiceId) {
    const node = this.currentNode();
    if (!node || !node.choices) throw new Error('commitChoice called when not at a decision point');
    const choice = node.choices.find(c => c.id === choiceId);
    if (!choice) throw new Error(`commitChoice: unknown choice "${choiceId}"`);

    this.exploredChoices.add(`${node.id}::${choice.id}`);
    this.history.push({ nodeId: node.id, choiceId: choice.id });

    // Move to the target: it may be a node or directly an ending.
    if (this.scenario.endings[choice.next]) {
      this.endingId = choice.next;
      return { nodes: [], node: null, ending: this.currentEnding(), choice };
    }
    this.currentNodeId = choice.next;
    this.endingId = null;
    const walked = this._autoAdvance();
    return { nodes: walked, node: this.currentNode(), ending: this.currentEnding(), choice };
  }

  /** Rewind to the decision point at history index `i` (0-based). Everything
   *  after it is dropped from history, but exploredChoices is preserved so the
   *  UI still shows which branches were already tried. */
  rewindTo(historyIndex) {
    if (historyIndex < 0 || historyIndex >= this.history.length) return false;
    const target = this.history[historyIndex];
    this.history = this.history.slice(0, historyIndex);
    this.currentNodeId = target.nodeId;
    this.endingId = null;
    return true;
  }

  /** Convenience: step back to the immediately previous decision point. */
  back() {
    if (!this.history.length) return false;
    // If we're at an ending, the last history entry IS the decision that led
    // here — return to it. Otherwise return to the one before the current.
    const idx = this.history.length - 1;
    return this.rewindTo(idx);
  }

  /** Restart the whole scenario, keeping exploredChoices for branch marking. */
  restart() {
    this.history = [];
    this.currentNodeId = this.scenario.startNodeId;
    this.endingId = null;
    this._autoAdvance();
  }

  /** State of a choice at a given node: 'unexplored' | 'attempted'. Completed/
   *  mastered live in the persistent store; the engine only knows this session. */
  choiceStatus(nodeId, choiceId) {
    return this.exploredChoices.has(`${nodeId}::${choiceId}`) ? 'attempted' : 'unexplored';
  }

  /** The ordered decision breadcrumb for the timeline UI. */
  timeline() {
    return this.history.map(h => {
      const node = this.scenario.nodes[h.nodeId];
      const choice = node?.choices?.find(c => c.id === h.choiceId);
      return { nodeId: h.nodeId, choiceId: h.choiceId, npcText: node?.text, sentence: choice?.sentence, intentionTr: choice?.intentionTr };
    });
  }
}
