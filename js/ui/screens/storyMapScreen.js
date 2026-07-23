// Story Mode landing screen: pick an environment, then a branching scenario.
// Shows per-scenario progress (completed branches / total) and reached endings,
// plus a global level filter (A0–C2, "All"). Reuses the app shell + design
// system; new content type, no changes to the original screens.

import { STORY_ENVIRONMENTS, scenariosForEnvironment, ALL_SCENARIOS } from '../../data/branching/scenarios/index.js?v=6';
import { CEFR_LEVELS, ENDING_KINDS } from '../../data/branching/scenarioSchema.js?v=6';
import { storyStore } from '../../progress/storyStore.js?v=6';
import { getCharacter } from '../../data/branching/characters.js?v=6';
import { navigate } from '../router.js?v=6';
import { loadJSON, saveJSON } from '../../progress/storage.js?v=6';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const LEVEL_KEY = 'edapp:story:levelFilter';
function getLevelFilter() { return loadJSON(LEVEL_KEY, 'ALL'); }
function setLevelFilter(v) { saveJSON(LEVEL_KEY, v); }

export function renderStoryMap(container) {
  const st = storyStore.getState();
  const filter = getLevelFilter();

  const scenarios = filter === 'ALL' ? ALL_SCENARIOS : ALL_SCENARIOS.filter(s => s.level === filter);

  const levelChips = ['ALL', ...CEFR_LEVELS].map(l =>
    `<button class="lvl-chip ${filter === l ? 'active' : ''}" data-lvl="${l}">${l === 'ALL' ? 'Tümü' : l}</button>`
  ).join('');

  const envSections = STORY_ENVIRONMENTS.map(env => {
    const list = scenariosForEnvironment(env.id).filter(s => scenarios.includes(s));
    if (!list.length) return '';
    const cards = list.map(s => scenarioCard(s, st)).join('');
    return `
      <section class="story-env">
        <h3 class="story-env-title"><span class="env-ico">${env.icon}</span> ${esc(env.labelTr)} <span class="env-tr">· ${esc(env.label)}</span></h3>
        <div class="story-card-grid">${cards}</div>
      </section>`;
  }).join('');

  const totalChoices = ALL_SCENARIOS.reduce((a, s) => a + s._totalChoices, 0);
  const doneChoices = ALL_SCENARIOS.reduce((a, s) => {
    const sc = st.scenarios[s.id];
    return a + (sc ? sc.completedChoices.length : 0);
  }, 0);

  container.innerHTML = `
    <div class="story-map screen-pad">
      <header class="story-head">
        <div>
          <h1 class="story-title">Hikaye Modu 🎭</h1>
          <p class="story-sub">Konuşarak öğren — sen konuş, karakterler tepki versin. <b>Hikayeyi sesinle yönlendir.</b></p>
        </div>
      </header>

      <div class="story-stats" role="group" aria-label="Hikaye ilerlemen">
        <div class="stat-tile"><span class="stat-n">${st.xp}</span><span class="stat-l">XP</span></div>
        <div class="stat-tile"><span class="stat-n">🪙 ${st.coins}</span><span class="stat-l">Altın</span></div>
        <div class="stat-tile"><span class="stat-n">${st.successCount}</span><span class="stat-l">Konuşulan cümle</span></div>
        <div class="stat-tile"><span class="stat-n">${doneChoices}/${totalChoices}</span><span class="stat-l">Dal</span></div>
      </div>

      <button class="quick-banner" id="quick-practice-btn">
        <span class="qb-ico">⚡</span>
        <span class="qb-txt"><b>Hızlı Pratik — 200+ cümle</b><span>Her yer için gerçek cümleleri konuşarak çalış</span></span>
        <span class="qb-arrow">›</span>
      </button>

      <div class="lvl-chips" role="group" aria-label="Seviyeye göre filtrele">${levelChips}</div>

      ${envSections || `<p class="story-empty">Bu seviyede henüz senaryo yok. “Tümü”nü dene.</p>`}

      <div class="story-foot">
        <button class="btn ghost" id="achv-btn">🏆 Başarılar (${st.achievements.length}/8)</button>
      </div>
    </div>`;

  container.querySelectorAll('.lvl-chip').forEach(b => {
    b.addEventListener('click', () => { setLevelFilter(b.dataset.lvl); renderStoryMap(container); });
  });
  container.querySelectorAll('[data-scenario]').forEach(c => {
    c.addEventListener('click', () => navigate(`story/${c.dataset.scenario}`));
  });
  container.querySelector('#achv-btn')?.addEventListener('click', () => showAchievements(container));
  container.querySelector('#quick-practice-btn')?.addEventListener('click', () => navigate('practice-phrases'));

  return () => {};
}

function scenarioCard(s, st) {
  const sc = st.scenarios[s.id];
  const done = sc ? sc.completedChoices.length : 0;
  const pct = s._totalChoices ? Math.round(done / s._totalChoices * 100) : 0;
  const npc = getCharacter(s.npcIds[0]);
  const endingsSeen = sc ? sc.endings.length : 0;
  const totalEndings = Object.keys(s.endings).length;

  const endingDots = Object.values(s.endings).map(e => {
    const seen = sc && sc.endings.includes(e.id);
    const meta = ENDING_KINDS[e.kind];
    return `<span class="end-dot ${seen ? 'seen' : ''}" title="${seen ? esc(e.title) : 'Keşfedilmemiş son'}">${seen ? meta.icon : '◦'}</span>`;
  }).join('');

  const statusBadge = done === 0 ? '<span class="sc-badge new">Yeni</span>'
    : done >= s._totalChoices ? '<span class="sc-badge done">Tüm dallar ✓</span>'
    : `<span class="sc-badge prog">${pct}%</span>`;

  return `
    <button class="story-card" data-scenario="${s.id}">
      <div class="sc-top">
        <span class="sc-level lvl-${s.level}">${s.level}</span>
        ${statusBadge}
      </div>
      <h4 class="sc-title">${esc(s.title)}</h4>
      <p class="sc-goal">${esc(s.goalTr)}</p>
      <div class="sc-meta">
        <span class="sc-npc">🗣️ ${esc(npc.name)} · ${esc(npc.role)}</span>
      </div>
      <div class="sc-endings" title="Keşfedilen sonlar">${endingDots} <span class="sc-end-count">${endingsSeen}/${totalEndings} son</span></div>
      <div class="sc-bar"><span style="width:${pct}%"></span></div>
    </button>`;
}

function showAchievements(container) {
  import('../../progress/storyStore.js?v=6').then(({ ACHIEVEMENTS, storyStore }) => {
    const unlocked = new Set(storyStore.getState().achievements);
    const rows = ACHIEVEMENTS.map(a => `
      <li class="achv-row ${unlocked.has(a.id) ? 'on' : 'off'}">
        <span class="achv-ico">${a.icon}</span>
        <span class="achv-txt"><b>${esc(a.label)}</b><span>${esc(a.desc)}</span></span>
        <span class="achv-state">${unlocked.has(a.id) ? '✓' : '🔒'}</span>
      </li>`).join('');
    const modal = document.createElement('div');
    modal.className = 'story-modal';
    modal.innerHTML = `
      <div class="story-modal-card" role="dialog" aria-label="Başarılar">
        <h3>🏆 Başarılar</h3>
        <ul class="achv-list">${rows}</ul>
        <button class="btn" id="close-achv">Kapat</button>
      </div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    modal.querySelector('#close-achv').addEventListener('click', () => modal.remove());
    container.appendChild(modal);
  });
}
