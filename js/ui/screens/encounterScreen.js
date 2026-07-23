// The seam between the world map and real content: picks which NPC/dialogue
// (or, at A0, which tap-based encounter) to offer at a location, then hands
// off to the EXISTING dialogue engine/screen unchanged -- this screen never
// reimplements conversation logic, it only decides what to launch.
import { getLocation } from '../../data/locations.js?v=6';
import { findDialogues } from '../../data/dialogues/index.js?v=6';
import { getNpcForDialogue, getNpcsForLocation } from '../../data/npcs.js?v=6';
import { progressStore } from '../../progress/progressStore.js?v=6';
import { worldStore, isLocationUnlocked } from '../../progress/worldStore.js?v=6';
import { renderAvatar } from '../components/characterAvatar.js?v=6';
import { renderScene } from '../components/sceneBackground.js?v=6';
import { navigate } from '../router.js?v=6';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

export function renderEncounter(container, params) {
  const location = getLocation(params.locationId);
  if (!location || !isLocationUnlocked(location.id)) {
    container.innerHTML = `<div class="boot-error"><h2>This location isn't unlocked yet</h2><button class="btn" onclick="location.hash='#/'">Back to World</button></div>`;
    return;
  }
  worldStore.markLocationVisited(location.id);

  const worldLevel = worldStore.getState().worldLevel;
  const allDialogues = findDialogues({ locationId: location.id });
  const isA0 = worldLevel === 'A0';

  if (isA0 || allDialogues.length === 0) {
    container.innerHTML = `
      <div class="row" style="margin-bottom:0.8rem">
        <button class="icon-btn" id="btn-back" aria-label="Back">‹</button>
        <span class="grow" style="font-weight:700">${location.icon} ${esc(location.name)}</span>
      </div>
      <div class="card" style="text-align:center;padding:1.6rem 1rem">
        <div style="font-size:2.4rem;margin-bottom:0.5rem">${location.icon}</div>
        <p style="color:var(--text-dim)">${isA0
          ? 'At this level, you learn words by finding and naming things around you.'
          : 'No conversations are authored for this location yet — try an Object Hunt round here instead.'}</p>
        <button class="btn block" id="btn-hunt" style="margin-top:1rem">🔎 Start Object Hunt</button>
      </div>`;
    container.querySelector('#btn-back').addEventListener('click', () => navigate(''));
    container.querySelector('#btn-hunt').addEventListener('click', () => navigate(`minigame/object-hunt/${location.id}`));
    return;
  }

  const atLevel = allDialogues.filter(d => d.level === worldLevel);
  const uncompletedAtLevel = atLevel.filter(d => !progressStore.hasCompleted(d.id));
  const primary = uncompletedAtLevel[0] || atLevel[0] || allDialogues.find(d => !progressStore.hasCompleted(d.id)) || allDialogues[0];
  const npc = getNpcForDialogue(primary);
  const others = allDialogues.filter(d => d.id !== primary.id);

  container.innerHTML = `
    <div class="dialogue-shell" style="min-height:auto">
      <div class="scene-viewport" style="height:180px">
        ${renderScene(location.sceneType)}
        <div class="scene-chars">
          <div class="char-slot">
            <div class="char-name-tag">${esc(npc.name)} · ${esc(npc.role)}</div>
            <div class="avatar-holder">${renderAvatar(npc.avatarPreset, { emotion: 'friendly' })}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="row" style="margin:0.8rem 0">
      <button class="btn ghost small" id="btn-back">‹ World</button>
    </div>
    <div class="card">
      <b>${esc(npc.name)}</b> <span class="badge level">${primary.level}</span>
      <p class="goal">${esc(npc.personality || npc.role)}</p>
      <p class="goal">${esc(primary.goal)}</p>
      <button class="btn block" id="btn-start" style="margin-top:0.8rem">🎙️ Start conversation</button>
    </div>
    ${others.length ? `
      <div class="section-label">Other conversations here</div>
      ${others.map(d => {
        const otherNpc = getNpcForDialogue(d);
        return `<div class="card row">
          <span style="font-size:1.3rem">${location.icon}</span>
          <span class="grow"><b>${esc(d.title)}</b> <span class="badge level">${d.level}</span><br>
            <small style="color:var(--text-faint)">${esc(otherNpc.name)} · ${esc(d.goal)}</small></span>
          <button class="btn secondary small" data-start="${d.id}">Go</button>
        </div>`;
      }).join('')}` : ''}
  `;

  container.querySelector('#btn-back').addEventListener('click', () => navigate(''));
  container.querySelector('#btn-start').addEventListener('click', () => navigate(`dialogue/${primary.id}`));
  container.querySelectorAll('[data-start]').forEach(b => b.addEventListener('click', () => navigate(`dialogue/${b.dataset.start}`)));
}
