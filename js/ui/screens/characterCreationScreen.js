import { worldStore } from '../../progress/worldStore.js?v=6';
import { renderPlayerAvatar, SKIN_TONES, HAIR_COLORS, HAIR_STYLES, OUTFIT_IDS } from '../components/avatarBuilder.js?v=6';
import { navigate } from '../router.js?v=6';

export function renderCharacterCreation(container) {
  function render() {
    const w = worldStore.getState();
    container.innerHTML = `
      <h1 class="screen-title">Create your character</h1>
      <p class="screen-sub">You'll see them grow as your English grows — starting as a baby.</p>

      <div class="world-avatar-card">
        ${renderPlayerAvatar(w.avatar, 'baby', { size: 120 })}
        <div class="grow">
          <label class="sr-label" for="name-input">Name</label>
          <input type="text" id="name-input" placeholder="Explorer" value="${w.playerName || ''}" autocomplete="off"
            style="width:100%;margin-top:0.4rem;background:var(--bg-raised);border:1px solid var(--line);color:var(--text);border-radius:8px;padding:0.6rem 0.8rem;font-size:1rem;font-family:inherit">
        </div>
      </div>

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
      </div>

      <button class="btn block" id="btn-continue" style="margin-top:1rem">Continue ›</button>
    `;

    container.querySelectorAll('[data-part]').forEach(b => b.addEventListener('click', () => {
      const name = container.querySelector('#name-input').value;
      worldStore.setAvatarPart(b.dataset.part, b.dataset.val);
      render();
      const input = container.querySelector('#name-input');
      input.value = name;
    }));
    container.querySelector('#btn-continue').addEventListener('click', () => {
      const name = container.querySelector('#name-input').value.trim() || 'Explorer';
      worldStore.setPlayerName(name);
      navigate('level-select');
    });
  }

  render();
}
