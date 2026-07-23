import { LEVELS } from '../../data/levels.js?v=5';
import { LOCATIONS, getLocation } from '../../data/locations.js?v=5';
import { findDialogues, getAvailableScenarioKeys } from '../../data/dialogues/index.js?v=5';
import { progressStore } from '../../progress/progressStore.js?v=5';
import { navigate } from '../router.js?v=5';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// Wizard state survives within the screen (not across navigation -- the URL
// carries nothing here on purpose: it's a quick 3-tap flow).
export function renderPicker(container) {
  const state = {
    step: 'level',                 // level -> location -> scenario
    level: progressStore.getState().cefrLevel || null,
    locationId: null,
    filter: 'all'                  // all | uncompleted | completed | favorites
  };
  const availableKeys = getAvailableScenarioKeys();

  function stepDots() {
    const steps = ['level', 'location', 'scenario'];
    const idx = steps.indexOf(state.step);
    return `<div class="wizard-steps">${steps.map((s, i) =>
      `<div class="step-dot ${i <= idx ? 'done' : ''}"></div>`).join('')}</div>`;
  }

  function renderLevelStep() {
    container.innerHTML = `
      ${stepDots()}
      <h1 class="screen-title">Seviyeni seç</h1>
      <p class="screen-sub">Bu; kelime, gramer, konuşma hızı ve konuşmanın ne kadar sıkı denetleneceğini belirler.</p>
      ${LEVELS.map(l => `
        <button class="level-card ${state.level === l.code ? 'selected' : ''}" data-level="${l.code}">
          <span class="level-code" style="background:${l.color}22;color:${l.color}">${l.code}</span>
          <span class="grow">
            <div class="level-name">${l.name}</div>
            <div class="level-desc">${l.shortDesc}</div>
            <div class="level-desc" style="margin-top:3px;opacity:.8">${l.descriptors.slice(0, 3).join(' · ')}</div>
          </span>
          <span>›</span>
        </button>`).join('')}
    `;
    container.querySelectorAll('[data-level]').forEach(b => b.addEventListener('click', () => {
      state.level = b.dataset.level;
      progressStore.setCefrLevel(state.level);
      state.step = 'location';
      render();
    }));
  }

  function renderLocationStep() {
    // A location is "available at this level" if any of its scenarios has an
    // authored dialogue at the chosen level.
    const locData = LOCATIONS.map(loc => {
      const count = findDialogues({ locationId: loc.id, level: state.level }).length;
      const anyCount = findDialogues({ locationId: loc.id }).length;
      return { loc, count, anyCount };
    }).sort((a, b) => (b.count - a.count) || (b.anyCount - a.anyCount));

    container.innerHTML = `
      ${stepDots()}
      <div class="row" style="margin-bottom:0.4rem">
        <button class="btn ghost small" id="back">‹ Seviye: ${state.level}</button>
      </div>
      <h1 class="screen-title">Nerede pratik yapmak istersin?</h1>
      <p class="screen-sub">Hiçbir mekân kilitli değil. Seviyende diyaloğu olanlar önce listelenir; diğerlerinde kaydırarak pratik yapabilirsin.</p>
      <div class="loc-grid">
        ${locData.map(({ loc, count, anyCount }) => `
          <button class="loc-card" data-loc="${loc.id}">
            <span class="ico">${loc.icon}</span>
            <span class="nm">${esc(loc.name)}</span>
            <div class="cnt">${count ? `${state.level} seviyesinde ${count}` : anyCount ? `${anyCount} diyalog (başka seviyede)` : '📱 Shorts ile pratik'}</div>
          </button>`).join('')}
      </div>`;
    container.querySelector('#back').addEventListener('click', () => { state.step = 'level'; render(); });
    // Nothing is locked: a location with no authored dialogue yet still opens
    // -- it sends you to the Shorts feed instead of being a dead button.
    container.querySelectorAll('[data-loc]').forEach(b => b.addEventListener('click', () => {
      const id = b.dataset.loc;
      if (!findDialogues({ locationId: id }).length) { navigate('shorts'); return; }
      state.locationId = id;
      state.step = 'scenario';
      render();
    }));
  }

  function renderScenarioStep() {
    const loc = getLocation(state.locationId);
    let dialogues = findDialogues({ locationId: state.locationId });
    // Filters
    const favs = progressStore.getState().favorites;
    if (state.filter === 'uncompleted') dialogues = dialogues.filter(d => !progressStore.hasCompleted(d.id));
    if (state.filter === 'completed') dialogues = dialogues.filter(d => progressStore.hasCompleted(d.id));
    if (state.filter === 'favorites') dialogues = dialogues.filter(d => favs.includes(d.id));
    if (state.filter === 'my-level') dialogues = dialogues.filter(d => d.level === state.level);

    // Group playable dialogues + list authored-but-empty scenarios honestly.
    const scenarioIdsWithContent = new Set(dialogues.map(d => d.scenarioId));
    const comingSoon = loc.scenarios.filter(s => !availableKeys.has(`${loc.id}::${s.id}`));

    container.innerHTML = `
      ${stepDots()}
      <div class="row" style="margin-bottom:0.4rem">
        <button class="btn ghost small" id="back">‹ ${esc(loc.name)}</button>
      </div>
      <h1 class="screen-title">${loc.icon} ${esc(loc.name)}</h1>
      <div class="filter-bar">
        ${[['all', 'Tümü'], ['my-level', `Seviyem (${state.level})`], ['uncompleted', 'Yeni'], ['completed', 'Tamamlandı'], ['favorites', '★ Favoriler']]
          .map(([id, label]) => `<button class="chip ${state.filter === id ? 'active' : ''}" data-filter="${id}">${label}</button>`).join('')}
      </div>
      ${dialogues.length ? dialogues.map(d => `
        <div class="card dlg-card">
          <button class="fav-btn ${favs.includes(d.id) ? 'faved' : ''}" data-fav="${d.id}" aria-label="Toggle favorite">${favs.includes(d.id) ? '⭐' : '☆'}</button>
          <div class="row" style="align-items:flex-start">
            <div class="grow">
              <b>${esc(d.title)}</b> <span class="badge level">${d.level}</span>
              ${progressStore.hasCompleted(d.id) ? '<span class="badge" style="background:var(--green-soft);color:var(--green)">✓ bitti</span>' : ''}
              <div class="goal">${esc(d.goal)}</div>
              <div class="meta-row">
                <span>${d.turns.filter(t => t.speaker === 'B').length} söylenecek cümle</span>
                <span>${d.length}</span>
                <span>${esc(d.characters.A.name)} · ${d.characters.A.accent}</span>
              </div>
            </div>
          </div>
          <button class="btn block" style="margin-top:0.8rem" data-start="${d.id}">🎙️ Diyaloğu başlat</button>
        </div>`).join('') : `<div class="empty-state"><div class="big">🔍</div>Bu filtreye uyan diyalog yok.</div>`}
      ${comingSoon.length ? `
        <div class="section-label">${esc(loc.name)} — yakında eklenecek</div>
        ${comingSoon.map(s => `<div class="scenario-item" style="opacity:.55"><span class="grow">${esc(s.name)}</span><span class="soon">Yakında</span></div>`).join('')}` : ''}
    `;
    container.querySelector('#back').addEventListener('click', () => { state.step = 'location'; render(); });
    container.querySelectorAll('[data-filter]').forEach(b => b.addEventListener('click', () => { state.filter = b.dataset.filter; render(); }));
    container.querySelectorAll('[data-fav]').forEach(b => b.addEventListener('click', () => { progressStore.toggleFavorite(b.dataset.fav); render(); }));
    container.querySelectorAll('[data-start]').forEach(b => b.addEventListener('click', () => navigate(`dialogue/${b.dataset.start}`)));
  }

  function render() {
    if (state.step === 'level') renderLevelStep();
    else if (state.step === 'location') renderLocationStep();
    else renderScenarioStep();
    window.scrollTo(0, 0);
  }

  render();
}
