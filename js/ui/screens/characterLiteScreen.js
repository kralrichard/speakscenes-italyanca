// ============================================================================
// Character screen — mirrors the English app's character page for the clones:
// the growing avatar, growth progress, honest stats, and full avatar
// customization (skin / hair style / hair color / outfit) via worldStore.
// Accessories stay coin-cosmetics like the original (glasses & bow tie, 5🪙).
// ============================================================================

import { worldStore } from '../../progress/worldStore.js';
import { shortsStore } from '../../progress/shortsStore.js';
import { GROWTH_STAGES } from '../../data/worldLevels.js';
import { renderPlayerAvatar, SKIN_TONES, HAIR_STYLES, HAIR_COLORS, OUTFIT_IDS } from '../components/avatarBuilder.js';
import { APP_KEY } from '../../data/shorts/langConfig.js';
import { navigate } from '../router.js';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const OUTFIT_SWATCH = {
  default: '#3a7ca5', crimson: '#a3324a', forest: '#2e7d5b',
  violet: '#7952b3', amber: '#b5651d', slate: '#44405e'
};
const ACCESSORIES = [
  { id: 'glasses', label: '👓 Gözlük', cost: 5 },
  { id: 'bowtie', label: '🎀 Papyon', cost: 5 }
];

export function renderCharacterLite(container) {
  function draw() {
    const w = worldStore.getState();
    const s = shortsStore.getState();
    const stageIdx = shortsStore.stageIndex();
    const stage = GROWTH_STAGES[stageIdx];
    const pct = Math.round(shortsStore.stageProgress() * 100);
    const av = w.avatar;

    const swatches = (list, part, current, styleFn) => list.map(v => `
      <button class="cl-swatch ${current === v ? 'on' : ''}" data-part="${part}" data-value="${esc(v)}"
        style="${styleFn ? styleFn(v) : ''}">${styleFn ? '' : esc(v)}</button>`).join('');

    const accBtns = ACCESSORIES.map(a => {
      const owned = (av.accessoryIds || []).includes(a.id);
      return `<button class="cl-acc ${owned ? 'on' : ''}" data-acc="${a.id}">
        ${a.label} ${owned ? '✓' : `· ${a.cost}🪙`}</button>`;
    }).join('');

    container.innerHTML = `
      <div class="ws-char screen-pad">
        <header class="qp-head">
          <button class="conv-exit" data-act="back" aria-label="Geri">‹</button>
          <div><h1>👤 Karakterin</h1>
          <p class="qp-sub">${esc(w.playerName || 'İsimsiz kahraman')} · 🪙 ${w.coins}</p></div>
        </header>

        <div class="cl-hero" style="--stage-color:${stage.color}">
          ${renderPlayerAvatar(av, stage.avatarStage, { size: 150, emotion: 'happy' })}
          <div class="cl-hero-text">
            <b>${esc(stage.name)} · ${stage.code}</b>
            <div class="ws-bar"><span style="width:${pct}%;background:${stage.color}"></span></div>
            <small>${esc(stage.desc)}</small>
          </div>
        </div>

        <div class="ws-stats">
          <span>📱 ${s.swipes} kaydırma</span>
          <span>🎙️ ${s.spokenCorrect}/${s.spokenTotal} doğru</span>
          <span>🔥 en iyi seri ${s.bestStreak}</span>
        </div>

        <h2 class="ws-sub">Ten rengi</h2>
        <div class="cl-row">${swatches(SKIN_TONES, 'skinTone', av.skinTone, v => `background:${v}`)}</div>

        <h2 class="ws-sub">Saç stili</h2>
        <div class="cl-row">${swatches(HAIR_STYLES, 'hairStyle', av.hairStyle)}</div>

        <h2 class="ws-sub">Saç rengi</h2>
        <div class="cl-row">${swatches(HAIR_COLORS, 'hairColor', av.hairColor, v => `background:${v}`)}</div>

        <h2 class="ws-sub">Kıyafet</h2>
        <div class="cl-row">${swatches(OUTFIT_IDS, 'outfitId', av.outfitId, v => `background:${OUTFIT_SWATCH[v]}`)}</div>

        <h2 class="ws-sub">Aksesuar <small>(sadece kozmetik)</small></h2>
        <div class="cl-row">${accBtns}</div>

        <h2 class="ws-sub">Sıfırla</h2>
        <p class="cl-reset-note">Tüm ilerlemeyi siler; bebek (A0) olarak baştan başlarsın.</p>
        <button class="cl-reset" data-act="reset">🔄 Baştan başla</button>
      </div>`;

    container.querySelector('[data-act="back"]').addEventListener('click', () => navigate(''));
    // Reset: two-tap confirm, then wipe ONLY this clone's namespaced keys
    // (other apps on the same origin are untouched) and reload fresh at A0.
    const resetBtn = container.querySelector('[data-act="reset"]');
    resetBtn.addEventListener('click', () => {
      if (!resetBtn.dataset.armed) {
        resetBtn.dataset.armed = '1';
        resetBtn.textContent = '⚠️ Emin misin? Silmek için tekrar dokun';
        setTimeout(() => { if (resetBtn.isConnected) { delete resetBtn.dataset.armed; resetBtn.textContent = '🔄 Baştan başla'; } }, 3500);
        return;
      }
      try {
        Object.keys(localStorage)
          .filter(k => k.startsWith(`${APP_KEY}:`))
          .forEach(k => localStorage.removeItem(k));
      } catch {}
      location.hash = '#/';
      location.reload();
    });
    container.querySelectorAll('.cl-swatch').forEach(b =>
      b.addEventListener('click', () => { worldStore.setAvatarPart(b.dataset.part, b.dataset.value); draw(); }));
    container.querySelectorAll('.cl-acc').forEach(b =>
      b.addEventListener('click', () => {
        const id = b.dataset.acc;
        const ids = worldStore.getState().avatar.accessoryIds || [];
        if (ids.includes(id)) {
          worldStore.setAvatarPart('accessoryIds', ids.filter(x => x !== id));
        } else {
          const item = ACCESSORIES.find(a => a.id === id);
          if (worldStore.spendCoins(item.cost)) {
            worldStore.setAvatarPart('accessoryIds', [...ids, id]);
          } else {
            b.textContent = 'Yetersiz 🪙 — Shorts\'ta konuşarak kazan!';
            setTimeout(draw, 1400);
            return;
          }
        }
        draw();
      }));
  }

  draw();
  return () => {};
}
