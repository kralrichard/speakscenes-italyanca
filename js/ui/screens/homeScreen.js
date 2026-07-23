import { progressStore } from '../../progress/progressStore.js?v=5';
import { reviewSystem } from '../../progress/reviewSystem.js?v=5';
import { sessionStore } from '../../progress/sessionStore.js?v=5';
import { ALL_DIALOGUES, getDialogueById } from '../../data/dialogues/index.js?v=5';
import { getLocation } from '../../data/locations.js?v=5';
import { navigate } from '../router.js?v=5';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

/** Deterministic daily challenge: picks an uncompleted dialogue using the
 *  date as index seed, preferring the user's chosen CEFR level. */
function pickDailyChallenge() {
  const level = progressStore.getState().cefrLevel;
  const uncompleted = ALL_DIALOGUES.filter(d => !progressStore.hasTamamlandı(d.id));
  const pool = uncompleted.filter(d => d.level === level).length
    ? uncompleted.filter(d => d.level === level)
    : (uncompleted.length ? uncompleted : ALL_DIALOGUES);
  const dayNum = Math.floor(Date.now() / 86400000);
  return pool[dayNum % pool.length];
}

export function renderHome(container) {
  const p = progressStore;
  const state = p.getState();
  const due = reviewSystem.getDueItems().length;
  const session = sessionStore.load();
  const sessionDialogue = session && session.dialogueId ? getDialogueById(session.dialogueId) : null;
  const daily = pickDailyChallenge();
  const recent = [...state.completedDialogues].slice(-3).reverse();
  const todayMin = Math.round(p.getTodaySpeakingSeconds() / 60);
  const weekMin = Math.round(p.getWeeklySpeakingSeconds() / 60);

  container.innerHTML = `
    <div class="home-header">
      <div class="home-logo">Speak<span>Scenes</span></div>
      <div class="streak-pill">🔥 ${state.streak.current} day${state.streak.current === 1 ? '' : 's'}</div>
    </div>

    <div class="stat-strip">
      <div class="stat-tile"><div class="val">${todayMin}<small style="font-size:0.7rem">m</small></div><div class="lbl">Today</div></div>
      <div class="stat-tile"><div class="val">${weekMin}<small style="font-size:0.7rem">m</small></div><div class="lbl">This week</div></div>
      <div class="stat-tile"><div class="val">${p.getTamamlandıCount()}</div><div class="lbl">Dialogues</div></div>
      <div class="stat-tile"><div class="val">Lv ${p.level}</div><div class="lbl">${state.xp} XP</div></div>
      <div class="stat-tile"><div class="val">${state.cefrLevel}</div><div class="lbl">English</div></div>
      <div class="stat-tile"><div class="val">${due}</div><div class="lbl">To review</div></div>
    </div>

    ${sessionDialogue ? `
      <div class="hero-card">
        <h3>▶️ Continue your dialogue</h3>
        <p>${esc(sessionDialogue.title)} — ${esc(getLocation(sessionDialogue.locationId)?.name || '')} · turn ${(session.turnIndex || 0) + 1} of ${sessionDialogue.turns.length}</p>
        <button class="btn" id="btn-continue">Continue speaking</button>
      </div>` : ''}

    ${daily ? `
      <div class="hero-card">
        <h3>⚡ Daily challenge</h3>
        <p>${esc(daily.title)} <span class="badge level">${daily.level}</span> — ${esc(daily.goal)}</p>
        <button class="btn secondary" id="btn-daily">Start challenge</button>
      </div>` : ''}

    <div class="section-label">Practice</div>
    <div class="action-grid">
      <button class="action-card" data-go="practice"><span class="ico">🗺️</span><span class="ttl">Choose a scene</span><span class="sub">Level · location · scenario</span></button>
      <button class="action-card" data-go="review"><span class="ico">🔁</span><span class="ttl">Review mistakes</span><span class="sub">${due} sentence${due === 1 ? '' : 's'} due</span></button>
      <button class="action-card" data-go="progress"><span class="ico">📈</span><span class="ttl">My progress</span><span class="sub">Stats & achievements</span></button>
      <button class="action-card" data-go="settings"><span class="ico">⚙️</span><span class="ttl">Settings</span><span class="sub">Voice, strictness, more</span></button>
    </div>

    ${state.favorites.length ? `
      <div class="section-label">Favorites</div>
      ${state.favorites.map(id => {
        const d = getDialogueById(id);
        return d ? `<button class="card row" style="width:100%;text-align:left" data-dlg="${d.id}">
            <span style="font-size:1.3rem">${getLocation(d.locationId)?.icon || '⭐'}</span>
            <span class="grow"><b>${esc(d.title)}</b><br><small style="color:var(--text-faint)">${d.level} · ${esc(d.goal)}</small></span>
            <span>›</span>
          </button>` : '';
      }).join('')}` : ''}

    ${recent.length ? `
      <div class="section-label">Recent activity</div>
      ${recent.map(r => {
        const d = getDialogueById(r.dialogueId);
        return `<div class="card row">
          <span style="font-size:1.3rem">${getLocation(r.locationId)?.icon || '✅'}</span>
          <span class="grow"><b>${esc(d ? d.title : r.dialogueId)}</b><br>
            <small style="color:var(--text-faint)">${r.level} · ${r.summary ? r.summary.accuracy + '% accuracy' : ''} · ${new Date(r.completedAt).toLocaleDateString()}</small></span>
        </div>`;
      }).join('')}` : `
      <div class="empty-state"><div class="big">🎬</div>Complete your first dialogue to see activity here.</div>`}
  `;

  container.querySelector('#btn-continue')?.addEventListener('click', () => navigate(`dialogue/${session.dialogueId}?resume=1`));
  container.querySelector('#btn-daily')?.addEventListener('click', () => daily && navigate(`dialogue/${daily.id}`));
  container.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.go)));
  container.querySelectorAll('[data-dlg]').forEach(b => b.addEventListener('click', () => navigate(`dialogue/${b.dataset.dlg}`)));
}
