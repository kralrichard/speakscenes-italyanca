// Memory Match: flip cards to pair each English word with its Turkish
// meaning. Sources js/data/vocabulary.js.
import { getVocabByLevel, VOCABULARY } from '../../../data/vocabulary.js';
import { computeMiniGameReward } from '../../../engine/miniGameScoring.js';
import { progressStore } from '../../../progress/progressStore.js';
import { worldStore } from '../../../progress/worldStore.js';
import { checkMissionsForMiniGame } from '../../../progress/missionEngine.js';
import { navigate } from '../../router.js';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

const PAIR_COUNT = 6;

function buildPairs() {
  const level = worldStore.getState().worldLevel;
  let pool = level === 'A0' ? getVocabByLevel('A0') : [...getVocabByLevel('A0'), ...getVocabByLevel('A1')];
  if (pool.length < PAIR_COUNT) pool = VOCABULARY;
  return shuffle(pool).slice(0, Math.min(PAIR_COUNT, pool.length));
}

export function renderMemoryMatch(container, params) {
  const pairs = buildPairs();
  let cards = shuffle(pairs.flatMap(v => [
    { key: `${v.id}-w`, vocabId: v.id, display: `${v.emoji} ${v.word}`, matched: false },
    { key: `${v.id}-m`, vocabId: v.id, display: v.translation_tr, matched: false }
  ]));
  let flipped = [];   // indices currently face-up, not yet resolved
  let locked = false;
  let moves = 0;
  let matchedPairs = 0;

  container.innerHTML = `<div class="mg-shell"></div>`;
  const shell = container.querySelector('.mg-shell');

  function header() {
    const pct = pairs.length ? (matchedPairs / pairs.length) * 100 : 0;
    return `
      <div class="row" style="margin-bottom:0.8rem">
        <button class="icon-btn" id="btn-exit" aria-label="Exit">✕</button>
        <span class="grow" style="font-weight:700">🃏 Memory Match</span>
        <div class="turn-progress" style="max-width:110px"><div style="width:${pct}%"></div></div>
      </div>`;
  }

  function render() {
    if (matchedPairs === pairs.length) { renderReport(); return; }
    shell.innerHTML = `
      ${header()}
      <p class="screen-sub" style="margin:0 0 0.8rem">Find each word's matching meaning. Moves: ${moves}</p>
      <div class="memory-grid">
        ${cards.map((c, i) => {
          const faceUp = c.matched || flipped.includes(i);
          return `<button class="memory-card ${faceUp ? 'flipped' : ''} ${c.matched ? 'matched' : ''}" data-i="${i}" ${c.matched ? 'disabled' : ''}>
            <span class="mc-face">${faceUp ? esc(c.display) : '❓'}</span>
          </button>`;
        }).join('')}
      </div>`;

    shell.querySelectorAll('.memory-card').forEach(b => b.addEventListener('click', () => {
      if (locked) return;
      const i = Number(b.dataset.i);
      if (cards[i].matched || flipped.includes(i)) return;
      flipped.push(i);
      if (flipped.length === 1) { render(); return; }
      if (flipped.length === 2) {
        moves++;
        const [a, bIdx] = flipped;
        if (cards[a].vocabId === cards[bIdx].vocabId) {
          cards[a].matched = true;
          cards[bIdx].matched = true;
          matchedPairs++;
          flipped = [];
          render();
        } else {
          locked = true;
          render();
          setTimeout(() => { flipped = []; locked = false; render(); }, 900);
        }
      }
    }));
  }

  function renderReport() {
    const accuracy = moves ? Math.min(100, Math.round((pairs.length / moves) * 100)) : 100;
    const reward = computeMiniGameReward(accuracy, pairs.length);
    progressStore.addXp(reward.xp);
    worldStore.addCoins(reward.coins);
    const newMissions = checkMissionsForMiniGame('memory-match', {});
    shell.innerHTML = `
      <div class="report-hero">
        <div class="big-emoji">${'⭐'.repeat(reward.stars)}${'☆'.repeat(3 - reward.stars)}</div>
        <h2>Memory Match complete!</h2>
      </div>
      <div class="xp-toast">+${reward.xp} XP · +${reward.coins} 🪙${newMissions.length ? ` · 🏅 ${newMissions.map(m => esc(m.title)).join(', ')}` : ''}</div>
      <div class="report-grid">
        <div class="report-stat"><div class="v">${moves}</div><div class="k">Moves</div></div>
        <div class="report-stat"><div class="v">${pairs.length}</div><div class="k">Pairs matched</div></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.6rem;margin-top:1rem">
        <button class="btn block" id="btn-again">🔁 Play again</button>
        <button class="btn secondary block" id="btn-world">🗺️ Back to World</button>
      </div>`;
    shell.querySelector('#btn-again').addEventListener('click', () => navigate(`minigame/memory-match/${params.id || 'any'}?t=${Date.now()}`));
    shell.querySelector('#btn-world').addEventListener('click', () => navigate(''));
  }

  shell.addEventListener('click', (e) => { if (e.target.id === 'btn-exit') navigate(''); });

  render();

  return () => {};
}
