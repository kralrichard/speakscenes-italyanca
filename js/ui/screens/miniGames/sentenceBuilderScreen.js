// Sentence Builder: tap shuffled words in order to rebuild a real sentence.
// Content is free -- every round sentence is a real `expected` line pulled
// straight from the existing authored dialogues (js/data/dialogues/*.js),
// no new authoring needed.
import { ALL_DIALOGUES } from '../../../data/dialogues/index.js?v=5';
import { computeMiniGameReward } from '../../../engine/miniGameScoring.js?v=5';
import { progressStore } from '../../../progress/progressStore.js?v=5';
import { worldStore } from '../../../progress/worldStore.js?v=5';
import { checkMissionsForMiniGame } from '../../../progress/missionEngine.js?v=5';
import { tts, isTTSSupported } from '../../../speech/tts.js?v=5';
import { navigate } from '../../router.js?v=5';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

const ROUND_SIZE = 6;

function collectSentences() {
  const items = [];
  for (const d of ALL_DIALOGUES) {
    for (const t of d.turns) {
      if (t.speaker !== 'B' || !t.expected) continue;
      const wordCount = t.expected.split(/\s+/).length;
      if (wordCount >= 3 && wordCount <= 9) {
        items.push({ sentence: t.expected, translation_tr: t.translation_tr, level: d.level });
      }
    }
  }
  return items;
}

function buildRound() {
  const all = collectSentences();
  const level = worldStore.getState().worldLevel;
  let pool = all.filter(x => x.level === level);
  if (pool.length < 4) pool = all; // A0/no-match world levels fall back to the full pool -- real content always exists
  return shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length));
}

export function renderSentenceBuilder(container, params) {
  const round = buildRound();
  let index = 0;
  let correctCount = 0;
  let built = [];
  let words = [];
  let resolved = null;

  container.innerHTML = `<div class="mg-shell"></div>`;
  const shell = container.querySelector('.mg-shell');

  function header() {
    const pct = round.length ? (index / round.length) * 100 : 0;
    return `
      <div class="row" style="margin-bottom:0.8rem">
        <button class="icon-btn" id="btn-exit" aria-label="Exit">✕</button>
        <span class="grow" style="font-weight:700">🧩 Sentence Builder</span>
        <div class="turn-progress" style="max-width:110px"><div style="width:${pct}%"></div></div>
      </div>`;
  }

  function setupItem() {
    const item = round[index];
    let shuffled = shuffle(item.sentence.split(/\s+/).map(w => ({ w })));
    if (shuffled.map(x => x.w).join(' ') === item.sentence && shuffled.length > 1) shuffled = shuffle(shuffled);
    words = shuffled;
    built = [];
    resolved = null;
  }

  function currentSentence() { return built.map(i => words[i].w).join(' '); }

  function render() {
    if (index >= round.length) { renderReport(); return; }
    const item = round[index];
    const slots = item.sentence.split(/\s+/).map((_, i) => {
      const bi = built[i];
      return `<span class="mg-word-slot ${bi != null ? 'filled' : ''} ${resolved || ''}">${bi != null ? esc(words[bi].w) : ' '}</span>`;
    }).join('');
    const tiles = words.map((w, i) => `<button class="chip mg-word-chip" data-i="${i}" ${built.includes(i) ? 'disabled' : ''} style="${built.includes(i) ? 'visibility:hidden' : ''}">${esc(w.w)}</button>`).join('');

    shell.innerHTML = `
      ${header()}
      <div class="expected-card">
        <div class="lbl">Build the sentence</div>
        <div class="tr-text">${esc(item.translation_tr || '')}</div>
        <div class="tools-row"><button class="mini-btn" id="btn-hear">▶ Hear it</button></div>
      </div>
      <div class="mg-word-slots">${slots}</div>
      <div class="chip-row" style="margin-top:0.8rem">${tiles}</div>
      <div style="display:flex;gap:0.5rem;margin-top:1rem">
        <button class="btn secondary block" id="btn-clear" ${resolved ? 'disabled' : ''}>Clear</button>
      </div>
      ${resolved === 'incorrect' ? `<div class="error-notice" style="margin-top:0.8rem">Not quite — the sentence is: "<b>${esc(item.sentence)}</b>". <button class="mini-btn" id="btn-next-after-fail">Continue</button></div>` : ''}
      ${resolved === 'correct' ? `<button class="btn block" id="btn-next" style="margin-top:1rem">Next ›</button>` : ''}`;

    shell.querySelector('#btn-hear').addEventListener('click', () => { if (isTTSSupported()) tts.speak(item.sentence, { rate: 0.85 }); });
    shell.querySelector('#btn-clear').addEventListener('click', () => { built = []; render(); });
    shell.querySelectorAll('.mg-word-chip').forEach(t => t.addEventListener('click', () => {
      if (resolved) return;
      const i = Number(t.dataset.i);
      if (built.includes(i)) return;
      built.push(i);
      if (built.length === words.length) {
        resolved = currentSentence() === item.sentence ? 'correct' : 'incorrect';
        if (resolved === 'correct') correctCount++;
      }
      render();
    }));
    shell.querySelector('#btn-next')?.addEventListener('click', () => { index++; setupItem(); render(); });
    shell.querySelector('#btn-next-after-fail')?.addEventListener('click', () => { index++; setupItem(); render(); });
  }

  function renderReport() {
    const accuracy = round.length ? Math.round((correctCount / round.length) * 100) : 0;
    const reward = computeMiniGameReward(accuracy, round.length);
    progressStore.addXp(reward.xp);
    worldStore.addCoins(reward.coins);
    const newMissions = checkMissionsForMiniGame('sentence-builder', {});
    shell.innerHTML = `
      <div class="report-hero">
        <div class="big-emoji">${'⭐'.repeat(reward.stars)}${'☆'.repeat(3 - reward.stars)}</div>
        <h2>Sentence Builder complete!</h2>
      </div>
      <div class="xp-toast">+${reward.xp} XP · +${reward.coins} 🪙${newMissions.length ? ` · 🏅 ${newMissions.map(m => esc(m.title)).join(', ')}` : ''}</div>
      <div class="report-grid">
        <div class="report-stat"><div class="v">${accuracy}%</div><div class="k">Accuracy</div></div>
        <div class="report-stat"><div class="v">${correctCount}/${round.length}</div><div class="k">Correct</div></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.6rem;margin-top:1rem">
        <button class="btn block" id="btn-again">🔁 Play again</button>
        <button class="btn secondary block" id="btn-world">🗺️ Back to World</button>
      </div>`;
    shell.querySelector('#btn-again').addEventListener('click', () => navigate(`minigame/sentence-builder/${params.id || 'any'}?t=${Date.now()}`));
    shell.querySelector('#btn-world').addEventListener('click', () => navigate(''));
  }

  shell.addEventListener('click', (e) => { if (e.target.id === 'btn-exit') navigate(''); });

  if (!round.length) {
    shell.innerHTML = `${header()}<div class="empty-state"><div class="big">🧩</div>No sentences available yet.</div>`;
  } else {
    setupItem();
    render();
  }

  return () => tts.stop();
}
