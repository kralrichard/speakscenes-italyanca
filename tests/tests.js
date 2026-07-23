// Language-clone test suite: sentence bank integrity + growth mechanic +
// scorer sanity in the target language. Runs in the browser against the real
// app modules. Mutates no localStorage (growth test edits in-memory state and
// restores it).

import { buildShortsBank, levelBands, sentencesForLevel, shortForLevel, shortsCount, LEVEL_ORDER } from '../js/data/shorts/sentenceBank.js?v=5';
import { shortsStore, GROWTH_THRESHOLDS } from '../js/progress/shortsStore.js?v=5';
import { scoreAttempt } from '../js/speech/scorer.js?v=5';

const results = [];
const pending = [];
function test(name, fn) {
  try {
    const r = fn();
    if (r && typeof r.then === 'function') {
      // async test: record only after it settles, so a rejected assertion
      // cannot slip through as a false pass.
      pending.push(
        r.then(() => results.push({ name, ok: true }))
         .catch(e => results.push({ name, ok: false, err: String(e.message || e) }))
      );
    } else {
      results.push({ name, ok: true });
    }
  } catch (e) {
    results.push({ name, ok: false, err: String(e.message || e) });
  }
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

// ---------------- Italian dialogue library ----------------

test('dialogues: all shipped dialogues validate and alternate A/B sensibly', async () => {
  const { ALL_DIALOGUES } = await import('../js/data/dialogues/index.js?v=5');
  assert(ALL_DIALOGUES.length > 0, 'expected at least one dialogue');
  const ids = new Set();
  for (const d of ALL_DIALOGUES) {
    assert(!ids.has(d.id), `duplicate dialogue id "${d.id}"`);
    ids.add(d.id);
    assert(d.turns.length >= 2, `${d.id}: needs at least 2 turns`);
    const hasB = d.turns.some(t => t.speaker === 'B');
    assert(hasB, `${d.id}: has no learner (B) turn to speak`);
    for (const t of d.turns) {
      if (t.speaker === 'A') assert(t.text, `${d.id}: A-turn missing text`);
      if (t.speaker === 'B') {
        assert(t.expected, `${d.id}: B-turn missing expected`);
        assert(t.translation_tr, `${d.id}: B-turn "${t.expected}" missing Turkish translation`);
      }
    }
  }
});

test('dialogues: every expected line is accepted verbatim by the Italian scorer', async () => {
  const { ALL_DIALOGUES } = await import('../js/data/dialogues/index.js?v=5');
  for (const d of ALL_DIALOGUES) {
    for (const t of d.turns.filter(x => x.speaker === 'B')) {
      const bare = t.expected.replace(/[.,!?;:¿¡]/g, '').toLowerCase();
      const r = scoreAttempt({ expected: t.expected, transcript: bare, strictness: 'relaxed' });
      assert(r.accepted, `${d.id}: verbatim answer rejected for "${t.expected}" (accuracy ${r.wordAccuracy})`);
    }
  }
});

test('dialogues: every dialogue points at a real location', async () => {
  const { ALL_DIALOGUES } = await import('../js/data/dialogues/index.js?v=5');
  const { getLocation } = await import('../js/data/locations.js?v=5');
  for (const d of ALL_DIALOGUES) {
    assert(getLocation(d.locationId), `${d.id}: unknown locationId "${d.locationId}"`);
  }
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

// ---------------- report ----------------
(async () => {
  await Promise.all(pending);

  const passed = results.filter(r => r.ok).length;
  const failed = results.length - passed;
  const ul = document.getElementById('results');
  ul.innerHTML = results.map(r =>
    `<li class="${r.ok ? 'pass' : 'fail'}">${r.ok ? '✓' : '✗'} ${r.name}${r.err ? ` — ${r.err}` : ''}</li>`).join('');
  const sum = document.getElementById('summary');
  sum.textContent = `${passed} passed, ${failed} failed, ${results.length} total — bank size: ${shortsCount()}`;
  sum.style.color = failed ? '#ff6b6b' : '#3ecf8e';
  console.info(`TESTS: ${passed} passed, ${failed} failed — bank ${shortsCount()}`);
})();
