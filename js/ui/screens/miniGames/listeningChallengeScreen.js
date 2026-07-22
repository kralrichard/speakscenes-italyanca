// Listening Challenge: hear a real sentence spoken aloud, then pick which
// of 4 written options matches what was heard. Content is free -- pulled
// from existing dialogue turns (both NPC lines and player-expected lines),
// no new authoring needed. Replay and a slowed-down replay are both
// available, matching the listening controls already used in dialogueScreen.js.
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
const OPTIONS = 4;

function collectLines() {
  const items = [];
  const seen = new Set();
  for (const d of ALL_DIALOGUES) {
    for (const t of d.turns) {
      const text = t.speaker === 'A' ? t.text : t.expected;
      if (!text || seen.has(text)) continue;
      seen.add(text);
      const wordCount = text.split(/\s+/).length;
      if (wordCount >= 3 && wordCount <= 10) items.push({ text, level: d.level });
    }
  }
  return items;
}

function buildRound() {
  const all = collectLines();
  const level = worldStore.getState().worldLevel;
  let pool = all.filter(x => x.level === level);
  if (pool.length < OPTIONS) pool = all;
  return shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length));
}

function optionsFor(target, pool) {
  const others = shuffle(pool.filter(x => x.text !== target.text)).slice(0, OPTIONS - 1);
  return shuffle([target, ...others]);
}

export function renderListeningChallenge(container, params) {
  const round = buildRound();
  const pool = collectLines();
  let index = 0;
  let correctCount = 0;
  let currentOptions = [];
  let resolved = false;

  container.innerHTML = `<div class="mg-shell"></div>`;
  const shell = container.querySelector('.mg-shell');

  function header() {
    const pct = round.length ? (index / round.length) * 100 : 0;
    return `
      <div class="row" style="margin-bottom:0.8rem">
        <button class="icon-btn" id="btn-exit" aria-label="Exit">✕</button>
        <span class="grow" style="font-weight:700">👂 Listening Challenge</span>
        <div class="turn-progress" style="max-width:110px"><div style="width:${pct}%"></div></div>
      </div>`;
  }

  function speak(rate = 0.9) {
    if (isTTSSupported()) tts.speak(round[index].text, { rate });
  }

  function render() {
    if (index >= round.length) { renderReport(); return; }
    const item = round[index];
    if (!resolved) currentOptions = optionsFor(item, pool);
    shell.innerHTML = `
      ${header()}
      <div class="expected-card" style="text-align:center">
        <div class="lbl">Listen, then choose what you heard</div>
        <div class="tools-row" style="justify-content:center">
          <button class="mini-btn" id="btn-hear">▶ Hear it</button>
          <button class="mini-btn" id="btn-hear-slow">🐢 Slow</button>
        </div>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.5rem;margin-top:0.8rem">
        ${currentOptions.map((o, i) => {
          const cls = resolved ? (o.text === item.text ? 'correct' : (o.text === shell.dataset.picked ? 'incorrect' : '')) : '';
          return `<button class="scenario-item mg-choice ${cls}" data-i="${i}" ${resolved ? 'disabled' : ''}>${esc(o.text)}</button>`;
        }).join('')}
      </div>
      ${resolved ? `<button class="btn block" id="btn-next" style="margin-top:1rem">Next ›</button>` : ''}`;

    shell.querySelector('#btn-hear').addEventListener('click', () => speak(0.9));
    shell.querySelector('#btn-hear-slow').addEventListener('click', () => speak(0.5));
    shell.querySelectorAll('.mg-choice').forEach(b => b.addEventListener('click', () => {
      if (resolved) return;
      const picked = currentOptions[Number(b.dataset.i)];
      shell.dataset.picked = picked.text;
      resolved = true;
      if (picked.text === item.text) correctCount++;
      render();
    }));
    shell.querySelector('#btn-next')?.addEventListener('click', () => { index++; resolved = false; render(); });

    if (!resolved) speak(0.9);
  }

  function renderReport() {
    const accuracy = round.length ? Math.round((correctCount / round.length) * 100) : 0;
    const reward = computeMiniGameReward(accuracy, round.length);
    progressStore.addXp(reward.xp);
    worldStore.addCoins(reward.coins);
    const newMissions = checkMissionsForMiniGame('listening-challenge', {});
    shell.innerHTML = `
      <div class="report-hero">
        <div class="big-emoji">${'⭐'.repeat(reward.stars)}${'☆'.repeat(3 - reward.stars)}</div>
        <h2>Listening Challenge complete!</h2>
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
    shell.querySelector('#btn-again').addEventListener('click', () => navigate(`minigame/listening-challenge/${params.id || 'any'}?t=${Date.now()}`));
    shell.querySelector('#btn-world').addEventListener('click', () => navigate(''));
  }

  shell.addEventListener('click', (e) => { if (e.target.id === 'btn-exit') navigate(''); });

  if (!round.length) {
    shell.innerHTML = `${header()}<div class="empty-state"><div class="big">👂</div>No listening content available yet.</div>`;
  } else {
    render();
  }

  return () => tts.stop();
}
