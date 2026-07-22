// ============================================================================
// World screen — the clone's landing page, mirroring the English app's world
// map: your growing avatar at the top, growth progress, coins/stats, and a
// grid of themed locations that each open the Shorts feed filtered to that
// location's topics. First visit shows a small welcome overlay (name +
// start), matching the original onboarding in one step.
// ============================================================================

import { worldStore } from '../../progress/worldStore.js';
import { shortsStore } from '../../progress/shortsStore.js';
import { shortsCount } from '../../data/shorts/sentenceBank.js';
import { SHORT_LOCATIONS } from '../../data/shorts/shortsLocations.js';
import { GROWTH_STAGES } from '../../data/worldLevels.js';
import { renderPlayerAvatar } from '../components/avatarBuilder.js';
import { APP_LANG } from '../../data/shorts/langConfig.js';
import { navigate } from '../router.js';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

export function renderWorldShorts(container) {
  function draw() {
    const w = worldStore.getState();
    const s = shortsStore.getState();
    const stageIdx = shortsStore.stageIndex();
    const stage = GROWTH_STAGES[stageIdx];
    const pct = Math.round(shortsStore.stageProgress() * 100);
    const toNext = shortsStore.swipesToNextStage();

    const cards = SHORT_LOCATIONS.map(l => {
      const recommended = GROWTH_STAGES.findIndex(g => g.code === l.min) <= stageIdx;
      return `
        <button class="wsl-card ${recommended ? '' : 'ahead'}" data-loc="${l.id}">
          <span class="wsl-emoji">${l.emoji}</span>
          <span class="wsl-body">
            <span class="wsl-label">${esc(l.label)}</span>
            <span class="wsl-desc">${esc(l.desc)}</span>
          </span>
          <span class="wsl-min lvl-${l.min}">${l.min}${recommended ? '' : ' önerilen'}</span>
        </button>`;
    }).join('');

    container.innerHTML = `
      <div class="ws-world screen-pad">
        <header class="ws-head">
          <div class="ws-avatar" style="--stage-color:${stage.color}">
            ${renderPlayerAvatar(w.avatar, stage.avatarStage, { size: 92, emotion: 'happy' })}
          </div>
          <div class="ws-head-text">
            <h1>${esc(w.playerName ? w.playerName : `${APP_LANG} Macerası`)}</h1>
            <p class="ws-stage">${esc(stage.name)} · ${stage.code}</p>
            <div class="ws-bar"><span style="width:${pct}%;background:${stage.color}"></span></div>
            <p class="ws-next">${stageIdx >= GROWTH_STAGES.length - 1
              ? 'En üst seviye! 🌟'
              : `${toNext} kaydırma sonra büyüyeceksin`}</p>
          </div>
          <button class="ws-char-btn" data-act="character" aria-label="Karakter">👤</button>
        </header>

        <div class="ws-stats">
          <span>🪙 ${w.coins}</span>
          <span>📱 ${s.swipes} kaydırma</span>
          <span>🎙️ ${s.spokenCorrect} doğru</span>
          <span>🔥 seri ${s.bestStreak}</span>
        </div>

        <h2 class="ws-sub">Nereye gidiyoruz?</h2>
        <div class="wsl-grid">${cards}</div>
        <p class="ws-foot">${shortsCount()} ${APP_LANG.toLowerCase()} cümle · A0'dan C2'ye</p>

        ${w.onboarded ? '' : `
        <div class="ws-welcome" role="dialog" aria-label="Hoş geldin">
          <div class="ws-welcome-card">
            <div class="ws-welcome-avatar">${renderPlayerAvatar(w.avatar, 'baby', { size: 110, emotion: 'happy' })}</div>
            <h2>${APP_LANG} bebeğin doğdu! 👶</h2>
            <p>Kaydırdıkça büyüyecek, konuştukça öğrenecek. Bebeğe bir isim ver:</p>
            <input type="text" class="ws-name" maxlength="20" placeholder="İsim (isteğe bağlı)" autocomplete="off" />
            <button class="btn ws-start">Maceraya Başla 🚀</button>
          </div>
        </div>`}
      </div>`;

    container.querySelectorAll('[data-loc]').forEach(b =>
      b.addEventListener('click', () => navigate(`shorts?loc=${b.dataset.loc}`)));
    container.querySelector('[data-act="character"]').addEventListener('click', () => navigate('character'));

    const start = container.querySelector('.ws-start');
    if (start) start.addEventListener('click', () => {
      const name = container.querySelector('.ws-name').value.trim();
      worldStore.setOnboarded(name);
      draw();
    });
  }

  draw();
  return () => {};
}
