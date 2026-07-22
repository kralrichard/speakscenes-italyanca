// ============================================================================
// Branching-scenario authoring schema + validation.
//
// This is a NEW, additive content type that lives alongside the original
// linear `Dialogue` (js/data/dialogueSchema.js). A linear Dialogue is a fixed
// A/B/A/B transcript; a `Scenario` here is a directed dialogue GRAPH: every
// NPC line can offer several player choices, and each choice can lead to a
// completely different next node, emotion, mission, or ending.
//
// Shapes (plain JS objects, no build step):
//
// Scenario = {
//   id: string,                       // unique kebab-case
//   title: string,
//   titleTr: string,                  // Turkish title
//   environmentId: string,            // 'hotel' | 'airport' | ...
//   sceneType: string,                // key into renderScene() templates
//   level: CEFRLevel,                 // 'A0'..'C2'
//   goal: string,                     // English one-liner
//   goalTr: string,                   // Turkish one-liner
//   playerId: string,                 // character id of the learner's avatar
//   npcIds: string[],                 // >= 1 NPC character ids in this scene
//   startNodeId: string,
//   nodes: { [id]: DialogueNode },
//   endings: { [id]: Ending }
// }
//
// DialogueNode (one NPC utterance + what the player may do next) = {
//   id: string,
//   speakerId: string,                // NPC character id who says `text`
//   emotion: string,                  // drives the avatar face
//   text: string,                     // English line (spoken by NPC)
//   translation: string,              // Turkish
//   choices?: DialogueChoice[],       // decision point (>= 2) OR
//   next?: string,                    // auto-advance to another node OR
//   endingId?: string                 // terminal node -> show this ending
// }
//
// DialogueChoice (a player intention the learner must then SPEAK) = {
//   id: string,
//   intentionTr: string,              // short Turkish label of the intent
//   tone?: 'polite'|'casual'|'direct'|'formal'|'friendly',
//   difficulty?: 'easy'|'medium'|'hard',
//   sentence: string,                 // the English sentence to say aloud
//   translation: string,              // Turkish meaning
//   altAccepted?: string[],           // equally-correct phrasings
//   next: string,                     // node id this branch leads to
//   relationshipEffect?: number,      // -2..+2 change to NPC relationship
//   xp?: number                       // base XP for completing this line
// }
//
// Ending = {
//   id: string,
//   kind: 'excellent'|'success'|'neutral'|'misunderstanding'|'funny'|'problem-solved'|'relationship',
//   title: string,
//   titleTr: string,
//   text: string,                     // English wrap-up
//   translation: string,              // Turkish
//   relationshipEffect?: number,
//   coins?: number
// }
// ============================================================================

export const CEFR_LEVELS = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];

export const ENDING_KINDS = {
  excellent:        { label: 'Excellent outcome',   labelTr: 'Mükemmel sonuç',        icon: '🌟', color: 'var(--green)' },
  success:          { label: 'Successful outcome',   labelTr: 'Başarılı sonuç',        icon: '✅', color: 'var(--green)' },
  'problem-solved': { label: 'Problem solved',       labelTr: 'Sorun çözüldü',         icon: '🛠️', color: 'var(--blue)' },
  relationship:     { label: 'Relationship improved',labelTr: 'İlişki gelişti',        icon: '💛', color: 'var(--yellow)' },
  neutral:          { label: 'Neutral outcome',      labelTr: 'Nötr sonuç',            icon: '➖', color: 'var(--text-dim)' },
  misunderstanding: { label: 'Misunderstanding',     labelTr: 'Yanlış anlaşılma',      icon: '😅', color: 'var(--yellow)' },
  funny:            { label: 'Funny outcome',        labelTr: 'Komik sonuç',           icon: '😄', color: 'var(--blue)' }
};

export const TONE_META = {
  polite:   { label: 'Polite',   labelTr: 'Kibar',    icon: '🙂' },
  formal:   { label: 'Formal',   labelTr: 'Resmî',    icon: '🎩' },
  friendly: { label: 'Friendly', labelTr: 'Samimi',   icon: '😊' },
  casual:   { label: 'Casual',   labelTr: 'Gündelik', icon: '👋' },
  direct:   { label: 'Direct',   labelTr: 'Doğrudan', icon: '➡️' }
};

export const DIFFICULTY_META = {
  easy:   { label: 'Easy',   labelTr: 'Kolay', dots: 1 },
  medium: { label: 'Medium', labelTr: 'Orta',  dots: 2 },
  hard:   { label: 'Hard',   labelTr: 'Zor',   dots: 3 }
};

/** Throws a descriptive error if a scenario graph is malformed. Every node a
 *  choice points at must exist (as a node OR an ending); every decision point
 *  must offer >= 2 choices; the start node must exist. This runs at load time
 *  so an authoring mistake fails loudly with the scenario id instead of
 *  dead-ending the player mid-conversation. */
export function validateScenario(s) {
  const errs = [];
  if (!s.id) errs.push('missing id');
  if (!CEFR_LEVELS.includes(s.level)) errs.push(`invalid level "${s.level}"`);
  if (!s.environmentId) errs.push('missing environmentId');
  if (!s.sceneType) errs.push('missing sceneType');
  if (!s.playerId) errs.push('missing playerId');
  if (!Array.isArray(s.npcIds) || !s.npcIds.length) errs.push('npcIds must list >= 1 NPC');
  if (!s.nodes || typeof s.nodes !== 'object') errs.push('missing nodes map');
  if (!s.endings || typeof s.endings !== 'object') errs.push('missing endings map');

  const nodeIds = new Set(Object.keys(s.nodes || {}));
  const endingIds = new Set(Object.keys(s.endings || {}));
  const isTarget = (id) => nodeIds.has(id) || endingIds.has(id);

  if (!s.startNodeId || !nodeIds.has(s.startNodeId)) errs.push(`startNodeId "${s.startNodeId}" is not a node`);

  for (const [id, node] of Object.entries(s.nodes || {})) {
    if (node.id !== id) errs.push(`node "${id}" has mismatched inner id "${node.id}"`);
    if (!node.speakerId) errs.push(`node "${id}" missing speakerId`);
    if (!node.text) errs.push(`node "${id}" missing text`);
    const outs = [node.choices ? 'choices' : null, node.next ? 'next' : null, node.endingId ? 'endingId' : null].filter(Boolean);
    if (outs.length === 0) errs.push(`node "${id}" is a dead end (no choices, next, or endingId)`);
    if (node.next && !isTarget(node.next)) errs.push(`node "${id}".next -> unknown "${node.next}"`);
    if (node.endingId && !endingIds.has(node.endingId)) errs.push(`node "${id}".endingId -> unknown ending "${node.endingId}"`);
    if (node.choices) {
      if (node.choices.length < 2) errs.push(`node "${id}" is a decision point with < 2 choices`);
      const seen = new Set();
      node.choices.forEach((c, i) => {
        if (!c.id) errs.push(`node "${id}" choice ${i} missing id`);
        if (seen.has(c.id)) errs.push(`node "${id}" duplicate choice id "${c.id}"`);
        seen.add(c.id);
        if (!c.sentence) errs.push(`node "${id}" choice "${c.id}" missing sentence`);
        if (!c.intentionTr) errs.push(`node "${id}" choice "${c.id}" missing intentionTr`);
        if (!c.next || !isTarget(c.next)) errs.push(`node "${id}" choice "${c.id}".next -> unknown "${c.next}"`);
      });
    }
  }

  for (const [id, e] of Object.entries(s.endings || {})) {
    if (!ENDING_KINDS[e.kind]) errs.push(`ending "${id}" has invalid kind "${e.kind}"`);
    if (!e.title) errs.push(`ending "${id}" missing title`);
  }

  if (errs.length) {
    throw new Error(`Invalid scenario "${s.id || '(no id)'}": ${errs.join('; ')}`);
  }
  return s;
}

/** Terse factory used by content files. Fills sensible defaults and validates. */
export function createScenario(def) {
  return validateScenario({
    titleTr: def.title,
    goalTr: def.goal,
    playerId: 'player',
    ...def
  });
}

/** Enumerates every decision point (nodes with choices) reachable from start.
 *  Used by the branch map and by progress tracking so "how many branches are
 *  in this scenario" is derived from content, never hardcoded. */
export function collectDecisionPoints(scenario) {
  return Object.values(scenario.nodes).filter(n => Array.isArray(n.choices) && n.choices.length);
}

/** Every choice id in the scenario, as "nodeId::choiceId" keys -- the unit
 *  used to mark unexplored / attempted / completed. */
export function allChoiceKeys(scenario) {
  const keys = [];
  for (const node of collectDecisionPoints(scenario)) {
    for (const c of node.choices) keys.push(`${node.id}::${c.id}`);
  }
  return keys;
}
