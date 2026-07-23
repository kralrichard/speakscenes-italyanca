// Language-clone test suite: sentence bank integrity + growth mechanic +
// scorer sanity in the target language. Runs in the browser against the real
// app modules. Mutates no localStorage (growth test edits in-memory state and
// restores it).

import { buildShortsBank, levelBands, sentencesForLevel, shortForLevel, shortsCount, LEVEL_ORDER } from '../js/data/shorts/sentenceBank.js?v=6';
import { shortsStore, GROWTH_THRESHOLDS } from '../js/progress/shortsStore.js?v=6';
import { scoreAttempt } from '../js/speech/scorer.js?v=6';
import { ALL_SCENARIOS, STORY_ENVIRONMENTS } from '../js/data/branching/scenarios/index.js?v=6';
import { CHARACTERS } from '../js/data/branching/characters.js?v=6';
import { PHRASEBOOK } from '../js/data/branching/phrasebook.js?v=6';
import { BranchEngine } from '../js/engine/branchEngine.js?v=6';
import { CEFR_LEVELS } from '../js/data/branching/scenarioSchema.js?v=6';

const results = [];
function test(name, fn) {
  try { fn(); results.push({ name, ok: true }); }
  catch (e) { results.push({ name, ok: false, err: String(e.message || e) }); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || 'assertion failed'); }
function assertEq(a, b, msg) { if (a !== b) throw new Error(`${msg || 'not equal'}: got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`); }

test('bank: at least 10,000 graded sentences', () => {
  const bank = buildShortsBank();
  assert(bank.length >= 10000, `expected >= 10000, got ${bank.length}`);
  assertEq(shortsCount(), bank.length, 'shortsCount matches');
});

// The growth pace and the content depth must agree: while the learner is in a
// life stage they see only that level's sentences, so each level needs at
// least as many sentences as the stage lasts in swipes -- otherwise the feed
// starts repeating before the character grows up.
test('content depth covers the growth pace at every level', () => {
  for (let i = 0; i < LEVEL_ORDER.length; i++) {
    const level = LEVEL_ORDER[i];
    const span = i < GROWTH_THRESHOLDS.length - 1
      ? GROWTH_THRESHOLDS[i + 1] - GROWTH_THRESHOLDS[i]
      : 1500; // C2 is terminal -- keep a healthy reserve
    const have = sentencesForLevel(level).length;
    assert(have >= span, `${level}: ${have} sentences for a ${span}-swipe stage (would repeat)`);
  }
});

test('bank: every entry well-formed (text + tr + valid level + unique id)', () => {
  const bank = buildShortsBank();
  const levels = new Set(LEVEL_ORDER);
  const ids = new Set();
  for (const s of bank) {
    assert(s.en && s.en.trim(), `entry ${s.id} empty text`);
    assert(s.tr && s.tr.trim(), `entry ${s.id} empty tr`);
    assert(!/undefined|NaN/.test(s.en + s.tr), `template hole in ${s.id}: "${s.en}" / "${s.tr}"`);
    assert(levels.has(s.level), `bad level in ${s.id}`);
    assert(!ids.has(s.id), `duplicate id ${s.id}`);
    ids.add(s.id);
  }
});

test('bank: sorted A0->C2 with every level populated', () => {
  const bank = buildShortsBank();
  const rank = c => LEVEL_ORDER.indexOf(c);
  for (let i = 1; i < bank.length; i++) {
    assert(rank(bank[i].level) >= rank(bank[i - 1].level), `not sorted at ${i}`);
  }
  const bands = levelBands();
  for (const lv of LEVEL_ORDER) assert(bands[lv].count > 0, `level ${lv} empty`);
});

test('feed: shortForLevel wraps its cursor', () => {
  const n = sentencesForLevel('C2').length;
  assert(n > 0, 'C2 has sentences');
  assertEq(shortForLevel('C2', 0).id, shortForLevel('C2', n).id, 'cursor wraps');
});

test('scorer: verbatim answer accepted, diacritics folded fairly', () => {
  const s = sentencesForLevel('A1')[0];
  const bare = s.en.replace(/[.?!,:;]/g, '').toLowerCase();
  const r = scoreAttempt({ expected: s.en, transcript: bare, strictness: 'relaxed' });
  assert(r.accepted, `verbatim should pass for "${s.en}", accuracy ${r.wordAccuracy}`);
  const folded = bare.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/ß/g, 'ss');
  const r2 = scoreAttempt({ expected: s.en, transcript: folded, strictness: 'relaxed' });
  assert(r2.accepted, `accent-free typing should pass for "${s.en}"`);
});

test('scorer: unrelated sentence rejected', () => {
  const s = sentencesForLevel('B2')[0];
  const r = scoreAttempt({ expected: s.en, transcript: 'xyz abc qqq www', strictness: 'relaxed' });
  assert(!r.accepted, 'garbage must not be accepted');
});

test('growth: stage index tracks swipe thresholds', () => {
  const st = shortsStore.getState();
  const orig = st.swipes;
  st.swipes = 0; assertEq(shortsStore.stageIndex(), 0, 'start = stage 0');
  st.swipes = GROWTH_THRESHOLDS[1]; assertEq(shortsStore.stageIndex(), 1, 'stage 1 at threshold');
  st.swipes = GROWTH_THRESHOLDS[1] - 1; assertEq(shortsStore.stageIndex(), 0, 'still 0 just before');
  st.swipes = GROWTH_THRESHOLDS[6] + 999; assertEq(shortsStore.stageIndex(), 6, 'capped at last stage');
  st.swipes = 0; assertEq(shortsStore.currentLevel(), 'A0', 'level maps from stage');
  st.swipes = orig;
});

// ---------------- Story Mode ----------------
// createScenario already validates each graph at import time (bad content
// would have thrown before this file runs); these tests check the properties
// the schema cannot see on its own.

test('story: 24 scenarios, all environments used are declared', () => {
  assert(ALL_SCENARIOS.length === 24, `expected 24 scenarios, got ${ALL_SCENARIOS.length}`);
  const envIds = new Set(STORY_ENVIRONMENTS.map(e => e.id));
  for (const s of ALL_SCENARIOS) {
    assert(envIds.has(s.environmentId), `${s.id}: unknown environment ${s.environmentId}`);
    assert(CEFR_LEVELS.includes(s.level), `${s.id}: bad level ${s.level}`);
  }
});

test('story: every scenario NPC exists and every ending is reachable', () => {
  for (const s of ALL_SCENARIOS) {
    for (const npcId of s.npcIds) assert(CHARACTERS[npcId], `${s.id}: unknown npc ${npcId}`);
    // BFS from start over all edge kinds (choice.next, node.next,
    // node.endingId) — a target id is either a node or an ending.
    const reachedEndings = new Set();
    const seen = new Set([s.startNodeId]);
    const queue = [s.startNodeId];
    const follow = (target) => {
      if (!target) return;
      if (s.endings[target]) reachedEndings.add(target);
      else if (!seen.has(target)) { seen.add(target); queue.push(target); }
    };
    while (queue.length) {
      const node = s.nodes[queue.shift()];
      if (!node) continue;
      follow(node.next);
      if (node.endingId) reachedEndings.add(node.endingId);
      for (const c of node.choices || []) follow(c.next);
    }
    for (const endId of Object.keys(s.endings)) {
      assert(reachedEndings.has(endId), `${s.id}: ending ${endId} unreachable`);
    }
  }
});

test('story: engine can start, commit a choice, and rewind on every scenario', () => {
  for (const s of ALL_SCENARIOS) {
    const eng = new BranchEngine(s);
    eng.advanceToStart();
    const node = eng.currentNode();
    assert(node && node.choices && node.choices.length >= 2, `${s.id}: start node needs >= 2 choices`);
    const res = eng.commitChoice(node.choices[0].id);
    assert(res, `${s.id}: commit failed`);
    if (!res.ending) {
      assert(eng.back(), `${s.id}: back() failed`);
      assertEq(eng.currentNode().id, node.id, `${s.id}: rewind returned to wrong node`);
    }
  }
});

test('story: no English leaks into NPC lines or player sentences', () => {
  // Cheap heuristic: hallmark English function words as standalone tokens.
  const en = /(^|\s)(the|and|you|what|with|have|this|would|please)(\s|$|[?!,.])/i;
  for (const s of ALL_SCENARIOS) {
    for (const node of Object.values(s.nodes)) {
      if (node.text) assert(!en.test(node.text), `${s.id}/${node.id}: English in NPC line "${node.text}"`);
      for (const c of node.choices || []) {
        assert(!en.test(c.sentence), `${s.id}/${c.id}: English in sentence "${c.sentence}"`);
      }
    }
  }
});

test('phrasebook: 200+ well-formed entries with Turkish translations', () => {
  assert(PHRASEBOOK.length >= 200, `expected >= 200 phrases, got ${PHRASEBOOK.length}`);
  const ids = new Set();
  for (const p of PHRASEBOOK) {
    assert(p.en && p.en.trim(), `${p.id}: empty sentence`);
    assert(p.tr && p.tr.trim(), `${p.id}: empty tr`);
    assert(CEFR_LEVELS.includes(p.level), `${p.id}: bad level ${p.level}`);
    assert(!ids.has(p.id), `duplicate phrase id ${p.id}`);
    ids.add(p.id);
  }
});

// ---------------- report ----------------
const passed = results.filter(r => r.ok).length;
const failed = results.length - passed;
const ul = document.getElementById('results');
ul.innerHTML = results.map(r =>
  `<li class="${r.ok ? 'pass' : 'fail'}">${r.ok ? '✓' : '✗'} ${r.name}${r.err ? ` — ${r.err}` : ''}</li>`).join('');
const sum = document.getElementById('summary');
sum.textContent = `${passed} passed, ${failed} failed, ${results.length} total — bank size: ${shortsCount()}`;
sum.style.color = failed ? '#ff6b6b' : '#3ecf8e';
console.info(`TESTS: ${passed} passed, ${failed} failed — bank ${shortsCount()}`);
