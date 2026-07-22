// Word Builder: tap scrambled letters in order to spell the target word.
// Simple local round state (not TapEngine -- a multi-letter build doesn't
// fit a single "tap one item" transition), following the same
// local-mutable-state + full re-render pattern already used by
// pickerScreen.js elsewhere in this app.
import { getVocabByLevel, VOCABULARY } from '../../../data/vocabulary.js?v=5';
import { computeMiniGameReward } from '../../../engine/miniGameScoring.js?v=5';
import { progressStore } from '../../../progress/progressStore.js?v=5';
import { worldStore } from '../../../progress/worldStore.js?v=5';
import { checkMissionsForMiniGame } from '../../../progress/missionEngine.js?v=5';
import { tts, isTTSSupported } from '../../../speech/tts.js?v=5';
import { navigate } from '../../router.js?v=5';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

const ROUND_SIZE = 6;
const isSingleWord = (w) => /^[a-z]+$/i.test(w);

function buildRound() {
  const level = worldStore.getState().worldLevel;
  let pool = (level === 'A0' ? getVocabByLevel('A0') : [...getVocabByLevel('A0'), ...getVocabByLevel('A1')])
    .filter(v => isSingleWord(v.word));
  if (pool.length < 4) pool = VOCABULARY.filter(v => isSingleWord(v.word));
  return shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length));
}

export function renderWordBuilder(container, params) {
  const round = buildRound();
  let index = 0;
  let correctCount = 0;
  let built = [];      // ordered indices into `scrambled`
  let scrambled = [];  // [{ ch }]
  let resolved = null; // null | 'correct' | 'incorrect'

  container.innerHTML = `<div class="mg-shell"></div>`;
  const shell = container.querySelector('.mg-shell');

  function header() {
    const pct = round.length ? (index / round.length) * 100 : 0;
    return `
      <div class="row" style="margin-bottom:0.8rem">
        <button class="icon-btn" id="btn-exit" aria-label="Exit">✕</button>
        <span class="grow" style="font-weight:700">🔤 Word Builder</span>
        <div class="turn-progress" style="max-width:110px"><div style="width:${pct}%"></div></div>
      </div>`;
  }

  function setupItem() {
    const item = round[index];
    let letters = shuffle(item.word.split('').map(ch => ({ ch })));
    if (letters.map(l => l.ch).join('') === item.word && letters.length > 1) letters = shuffle(letters);
    scrambled = letters;
    built = [];
    resolved = null;
  }

  function currentWord() { return built.map(i => scrambled[i].ch).join(''); }

  function render() {
    if (index >= round.length) { renderReport(); return; }
    const item = round[index];
    const slots = item.word.split('').map((_, i) => {
      const bi = built[i];
      return `<div class="mg-letter-slot ${bi != null ? 'filled' : ''} ${resolved || ''}">${bi != null ? esc(scrambled[bi].ch) : ''}</div>`;
    }).join('');
    const tiles = scrambled.map((s, i) => `<button class="mg-letter-tile" data-i="${i}" ${built.includes(i) ? 'disabled' : ''} style="${built.includes(i) ? 'visibility:hidden' : ''}">${esc(s.ch)}</button>`).join('');

    shell.innerHTML = `
      ${header()}
      <div class="expected-card" style="text-align:center">
        <div class="lbl">Build this word</div>
        <div class="sentence">${item.emoji} ${esc(item.translation_tr)}</div>
        <div class="tools-row" style="justify-content:center">
          <button class="mini-btn" id="btn-hear">▶ Hear it</button>
        </div>
      </div>
      <div class="mg-letter-slots">${slots}</div>
      <div class="mg-letter-row">${tiles}</div>
      <div style="display:flex;gap:0.5rem;margin-top:1rem">
        <button class="btn secondary block" id="btn-clear" ${resolved ? 'disabled' : ''}>Clear</button>
      </div>
      ${resolved === 'incorrect' ? `<div class="error-notice" style="margin-top:0.8rem">Not quite — the word is "<b>${esc(item.word)}</b>". <button class="mini-btn" id="btn-next-after-fail">Continue</button></div>` : ''}
      ${resolved === 'correct' ? `<button class="btn block" id="btn-next" style="margin-top:1rem">Next ›</button>` : ''}`;

    shell.querySelector('#btn-hear').addEventListener('click', () => { if (isTTSSupported()) tts.speak(item.word, { rate: 0.8 }); });
    shell.querySelector('#btn-clear').addEventListener('click', () => { built = []; render(); });
    shell.querySelectorAll('.mg-letter-tile').forEach(t => t.addEventListener('click', () => {
      if (resolved) return;
      const i = Number(t.dataset.i);
      if (built.includes(i)) return;
      built.push(i);
      if (built.length === scrambled.length) {
        resolved = currentWord() === item.word ? 'correct' : 'incorrect';
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
    const newMissions = checkMissionsForMiniGame('word-builder', {});
    shell.innerHTML = `
      <div class="report-hero">
        <div class="big-emoji">${'⭐'.repeat(reward.stars)}${'☆'.repeat(3 - reward.stars)}</div>
        <h2>Word Builder complete!</h2>
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
    shell.querySelector('#btn-again').addEventListener('click', () => navigate(`minigame/word-builder/${params.id || 'any'}?t=${Date.now()}`));
    shell.querySelector('#btn-world').addEventListener('click', () => navigate(''));
  }

  shell.addEventListener('click', (e) => { if (e.target.id === 'btn-exit') navigate(''); });

  setupItem();
  render();

  return () => tts.stop();
}
