// Object Hunt: hear/read a word, tap the matching picture among distractors.
// This is the primary A0 "conversation" substitute (see encounterScreen.js)
// as well as a standalone mini-game reachable from the world map. Driven by
// TapEngine (js/engine/tapEngine.js), not DialogueEngine -- single-word tap
// rounds don't fit the alternating-turn model.
import { VOCABULARY, getVocabByLevel } from '../../../data/vocabulary.js?v=6';
import { TapEngine } from '../../../engine/tapEngine.js?v=6';
import { computeMiniGameReward } from '../../../engine/miniGameScoring.js?v=6';
import { progressStore } from '../../../progress/progressStore.js?v=6';
import { worldStore } from '../../../progress/worldStore.js?v=6';
import { checkMissionsForMiniGame } from '../../../progress/missionEngine.js?v=6';
import { tts, isTTSSupported } from '../../../speech/tts.js?v=6';
import { navigate } from '../../router.js?v=6';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

const ROUND_SIZE = 6;
const OPTIONS = 4;

function buildRound() {
  const level = worldStore.getState().worldLevel;
  let pool = level === 'A0' ? getVocabByLevel('A0') : [...getVocabByLevel('A0'), ...getVocabByLevel('A1')];
  if (pool.length < OPTIONS) pool = VOCABULARY;
  return shuffle(pool).slice(0, Math.min(ROUND_SIZE, pool.length));
}

function optionsFor(target, pool) {
  const others = shuffle(pool.filter(v => v.id !== target.id)).slice(0, OPTIONS - 1);
  return shuffle([target, ...others]);
}

export function renderObjectHunt(container, params) {
  const roundItems = buildRound();
  const pool = VOCABULARY;
  const engine = new TapEngine(roundItems);
  let currentOptions = [];

  container.innerHTML = `<div class="mg-shell"></div>`;
  const shell = container.querySelector('.mg-shell');

  function header() {
    const snap = engine.getSnapshot();
    const pct = snap.progress.total ? (snap.progress.current / snap.progress.total) * 100 : 0;
    return `
      <div class="row" style="margin-bottom:0.8rem">
        <button class="icon-btn" id="btn-exit" aria-label="Çık">✕</button>
        <span class="grow" style="font-weight:700">🔎 Nesne Avı</span>
        <div class="turn-progress" style="max-width:110px"><div style="width:${pct}%"></div></div>
      </div>`;
  }

  function speakPrompt(word) {
    if (isTTSSupported()) tts.speak(word, { rate: 0.85 });
  }

  function renderTappable(item) {
    shell.innerHTML = `
      ${header()}
      <div class="expected-card" style="text-align:center">
        <div class="lbl">Bunu bul</div>
        <div class="sentence">${esc(item.word)}</div>
        <div class="tr-text">${esc(item.translation_tr)}</div>
        <div class="tools-row" style="justify-content:center">
          <button class="mini-btn" id="btn-hear">▶ Dinle</button>
        </div>
      </div>
      <div class="mg-grid">
        ${currentOptions.map(o => `<button class="mg-tile" data-id="${o.id}">${o.emoji}</button>`).join('')}
      </div>`;
    shell.querySelector('#btn-hear').addEventListener('click', () => speakPrompt(item.word));
    shell.querySelectorAll('.mg-tile').forEach(t => t.addEventListener('click', () => {
      shell.querySelectorAll('.mg-tile').forEach(x => x.disabled = true);
      engine.submitTap(t.dataset.id);
    }));
  }

  function renderPrompt() {
    const snap = engine.getSnapshot();
    if (snap.isComplete) { renderReport(); return; }
    const item = snap.item;
    if (snap.state === 'prompt-speaking') {
      currentOptions = optionsFor(item, pool);
      renderTappable(item);
      speakPrompt(item.word);
      engine.promptFinishedSpeaking();
      return;
    }
    if (snap.state === 'awaiting-tap') {
      renderTappable(item);
      return;
    }
    renderResolved(snap, item);
  }

  function renderResolved(snap, item) {
    shell.innerHTML = `
      ${header()}
      <div class="expected-card" style="text-align:center">
        <div class="lbl">${snap.state === 'correct' ? 'Doğru!' : 'Tam değil'}</div>
        <div class="sentence">${esc(item.word)}</div>
        <div class="tr-text">${esc(item.translation_tr)} · ${esc(item.exampleSentence)}</div>
      </div>
      <div class="mg-grid">
        ${currentOptions.map(o => {
          const cls = o.id === item.id ? 'correct' : (snap.state === 'incorrect' ? 'incorrect' : '');
          return `<button class="mg-tile ${cls}" disabled>${o.emoji}</button>`;
        }).join('')}
      </div>
      <button class="btn block" id="btn-next" style="margin-top:1rem">${snap.state === 'incorrect' ? 'Continue' : 'Next ›'}</button>`;
    shell.querySelector('#btn-next').addEventListener('click', () => { engine.next(); });
  }

  function renderReport() {
    const summary = engine.getSummary();
    const reward = computeMiniGameReward(summary.accuracy, summary.totalItems);
    progressStore.addXp(reward.xp);
    worldStore.addCoins(reward.coins);
    const newMissions = checkMissionsForMiniGame('object-hunt', {});
    shell.innerHTML = `
      <div class="report-hero">
        <div class="big-emoji">${'⭐'.repeat(reward.stars)}${'☆'.repeat(3 - reward.stars)}</div>
        <h2>Nesne Avı bitti!</h2>
      </div>
      <div class="xp-toast">+${reward.xp} XP · +${reward.coins} 🪙${newMissions.length ? ` · 🏅 ${newMissions.map(m => esc(m.title)).join(', ')}` : ''}</div>
      <div class="report-grid">
        <div class="report-stat"><div class="v">${summary.accuracy}%</div><div class="k">Doğruluk</div></div>
        <div class="report-stat"><div class="v">${summary.correctCount}/${summary.totalItems}</div><div class="k">Doğru</div></div>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.6rem;margin-top:1rem">
        <button class="btn block" id="btn-again">🔁 Tekrar oyna</button>
        <button class="btn secondary block" id="btn-world">🗺️ Dünyaya dön</button>
      </div>`;
    shell.querySelector('#btn-again').addEventListener('click', () => navigate(`minigame/object-hunt/${params.id || 'any'}?t=${Date.now()}`));
    shell.querySelector('#btn-world').addEventListener('click', () => navigate(''));
  }

  shell.addEventListener('click', (e) => { if (e.target.id === 'btn-exit') navigate(''); });

  const unsub = engine.onChange(() => renderPrompt());
  renderPrompt();

  return () => { tts.stop(); unsub(); };
}
