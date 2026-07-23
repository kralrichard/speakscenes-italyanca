// Growth timeline + avatar cosmetics + the honest "selected world level vs.
// measured skill" panel (mirrors this app's existing anti-overclaiming
// philosophy from scorer.js: never pretend a manual level jump means a
// skill was already earned).
import { worldStore } from '../../progress/worldStore.js?v=6';
import { GROWTH_STAGES, worldLevelIndex } from '../../data/worldLevels.js?v=6';
import { renderPlayerAvatar, SKIN_TONES, HAIR_COLORS, HAIR_STYLES, OUTFIT_IDS } from '../components/avatarBuilder.js?v=6';
import { navigate } from '../router.js?v=6';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const ACCESSORIES = [{ id: 'glasses', name: 'Glasses', icon: '👓', cost: 5 }, { id: 'bowtie', name: 'Bow tie', icon: '🎀', cost: 5 }];

export function renderCharacter(container) {
  function render() {
    const w = worldStore.getState();
    const stage = GROWTH_STAGES.find(g => g.code === w.worldLevel) || GROWTH_STAGES[0];
    const curIdx = worldLevelIndex(w.worldLevel);

    container.innerHTML = `
      <div class="row" style="margin-bottom:0.8rem">
        <button class="icon-btn" id="btn-back" aria-label="Back">‹</button>
        <span class="grow" style="font-weight:700">🧑 My Character</span>
        <div class="streak-pill">🪙 ${w.coins}</div>
      </div>

      <div class="world-avatar-card">
        ${renderPlayerAvatar(w.avatar, stage.avatarStage, { size: 130 })}
        <div class="grow">
          <b>${esc(stage.name)}</b>
          <p style="color:var(--text-dim);font-size:0.85rem;margin:0.3rem 0">${esc(stage.desc)}</p>
        </div>
      </div>

      <div class="section-label">Growth timeline</div>
      <div class="growth-timeline">
        ${GROWTH_STAGES.map((g, i) => `
          <div class="growth-step ${i < curIdx ? 'done' : ''} ${i === curIdx ? 'current' : ''}">
            <div class="gs-dot"></div>
            <div class="gs-label">${g.code}<br><small>${esc(g.name)}</small></div>
          </div>`).join('')}
      </div>

      <div class="section-label">Selected level vs. measured skill</div>
      <div class="card">
        <p style="font-size:0.85rem;color:var(--text-dim);margin-bottom:0.6rem">
          Your world level is whatever you choose — it decides which locations and content are shown.
          Your measured skill only rises from actually completing conversations at that level, so the two numbers can differ honestly.
        </p>
        ${GROWTH_STAGES.map(g => {
          const val = w.skillScores[g.code];
          return `<div class="word-row"><span>${g.code} · ${esc(g.name)}</span><span>${val == null ? '<span style="color:var(--text-faint)">not measured</span>' : val + '%'}</span></div>`;
        }).join('')}
      </div>

      <div class="section-label">Customize</div>
      <div class="card">
        <div class="cosmetic-row"><span class="sr-label">Skin tone</span>
          <div class="swatch-row">${SKIN_TONES.map(c => `<button class="swatch ${w.avatar.skinTone === c ? 'active' : ''}" data-part="skinTone" data-val="${c}" style="background:${c}"></button>`).join('')}</div>
        </div>
        <div class="cosmetic-row"><span class="sr-label">Hair style</span>
          <div class="chip-row">${HAIR_STYLES.map(h => `<button class="chip ${w.avatar.hairStyle === h ? 'active' : ''}" data-part="hairStyle" data-val="${h}">${h}</button>`).join('')}</div>
        </div>
        <div class="cosmetic-row"><span class="sr-label">Hair color</span>
          <div class="swatch-row">${HAIR_COLORS.map(c => `<button class="swatch ${w.avatar.hairColor === c ? 'active' : ''}" data-part="hairColor" data-val="${c}" style="background:${c}"></button>`).join('')}</div>
        </div>
        <div class="cosmetic-row"><span class="sr-label">Outfit color</span>
          <div class="swatch-row">${OUTFIT_IDS.map(id => `<button class="chip ${w.avatar.outfitId === id ? 'active' : ''}" data-part="outfitId" data-val="${id}">${id}</button>`).join('')}</div>
        </div>
        <div class="cosmetic-row"><span class="sr-label">Accessories</span>
          <div class="chip-row">${ACCESSORIES.map(a => {
            const owned = (w.avatar.accessoryIds || []).includes(a.id);
            return `<button class="chip ${owned ? 'active' : ''}" data-acc="${a.id}" data-cost="${a.cost}">${a.icon} ${a.name}${owned ? '' : ` · ${a.cost}🪙`}</button>`;
          }).join('')}</div>
        </div>
      </div>
    `;

    container.querySelector('#btn-back').addEventListener('click', () => navigate(''));
    container.querySelectorAll('[data-part]').forEach(b => b.addEventListener('click', () => {
      worldStore.setAvatarPart(b.dataset.part, b.dataset.val);
      render();
    }));
    container.querySelectorAll('[data-acc]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.acc;
      const ids = new Set(worldStore.getState().avatar.accessoryIds || []);
      if (ids.has(id)) {
        ids.delete(id);
        worldStore.setAvatarPart('accessoryIds', [...ids]);
      } else {
        if (!worldStore.spendCoins(Number(b.dataset.cost))) return;
        ids.add(id);
        worldStore.setAvatarPart('accessoryIds', [...ids]);
      }
      render();
    }));
  }

  render();
}
