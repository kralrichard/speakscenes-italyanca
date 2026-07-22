// Language-clone test suite: sentence bank integrity + growth mechanic +
// scorer sanity in the target language. Runs in the browser against the real
// app modules. Mutates no localStorage (growth test edits in-memory state and
// restores it).

import { buildShortsBank, levelBands, sentencesForLevel, shortForLevel, shortsCount, LEVEL_ORDER } from '../js/data/shorts/sentenceBank.js';
import { shortsStore, GROWTH_THRESHOLDS } from '../js/progress/shortsStore.js';
import { scoreAttempt } from '../js/speech/scorer.js';

const results = [];
function test(name, fn) {
  try { fn(); results.push({ name, ok: true }); }
  catch (e) { results.push({ name, ok: false, err: String(e.message || e) }); }
}
function assert(cond, msg) { if (!cond) throw new Error(msg || 'assertion failed'); }
function assertEq(a, b, msg) { if (a !== b) throw new Error(`${msg || 'not equal'}: got ${JSON.stringify(a)}, want ${JSON.stringify(b)}`); }

test('bank: at least 3,500 graded sentences', () => {
  const bank = buildShortsBank();
  assert(bank.length >= 3500, `expected >= 3500, got ${bank.length}`);
  assertEq(shortsCount(), bank.length, 'shortsCount matches');
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
