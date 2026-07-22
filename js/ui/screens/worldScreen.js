// The game's landing screen ('#/', replacing the old dashboard there --
// homeScreen.js/homeScreen dashboard moved to '#/home', unchanged). Shows
// the player's growing avatar, current world level, coins, the world map of
// featured locations (locked/unlocked), and the 5 mini-games. This is the
// "game, not a lesson list" screen the product spec asks for.
import { progressStore } from '../../progress/progressStore.js';
import { worldStore, isLocationUnlocked, getFeaturedLocations } from '../../progress/worldStore.js';
import { WORLD_LEVEL_CODES, getGrowthStage } from '../../data/worldLevels.js';
import { MINI_GAME_TYPES } from '../../data/miniGames/index.js';
import { MISSIONS } from '../../data/missions.js';
import { renderPlayerAvatar } from '../components/avatarBuilder.js';
import { navigate } from '../router.js';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

function nextMission() {
  const unlockedIds = getFeaturedLocations().filter(l => isLocationUnlocked(l.id)).map(l => l.id);
  return MISSIONS.find(m => m.kind === 'main' && !worldStore.hasMissionCompleted(m.id) &&
    (m.locationId === null || unlockedIds.includes(m.locationId)));
}

export function renderWorld(container) {
  if (!worldStore.getState().onboarded) { navigate('welcome'); return; }

  const w = worldStore.getState();
  const stage = getGrowthStage(w.worldLevel);
  const measured = w.skillScores[w.worldLevel];
  const locations = getFeaturedLocations();
  const mission = nextMission();
  const streak = progressStore.getState().streak.current;

  container.innerHTML = `
    <div class="home-header">
      <div class="home-logo">${w.playerName ? esc(w.playerName) + `'s` : 'Your'} <span>Adventure</span></div>
      <div class="row" style="gap:0.5rem">
        <div class="streak-pill">🪙 ${w.coins}</div>
        <div class="streak-pill">🔥 ${streak}</div>
      </div>
    </div>

    <div class="world-avatar-card">
      ${renderPlayerAvatar(w.avatar, stage.avatarStage, { size: 120 })}
      <div class="grow">
        <div class="row" style="gap:0.5rem;flex-wrap:wrap">
          <span class="badge level" style="background:${stage.color}22;color:${stage.color}">${w.worldLevel}</span>
          <b>${esc(stage.name)}</b>
        </div>
        <p style="color:var(--text-dim);font-size:0.85rem;margin:0.3rem 0">${esc(stage.desc)}</p>
        <p style="font-size:0.75rem;color:var(--text-faint)">Selected world level: <b>${w.worldLevel}</b> · Measured skill: <b>${measured == null ? 'not measured yet' : measured + '%'}</b></p>
      </div>
    </div>

    <div class="level-jump-row">
      ${WORLD_LEVEL_CODES.map(code => `<button class="chip ${code === w.worldLevel ? 'active' : ''}" data-jump="${code}">${code}</button>`).join('')}
    </div>

    ${mission ? `
      <div class="hero-card">
        <h3>🎯 Main mission</h3>
        <p>${esc(mission.title)} — ${esc(mission.description)}</p>
        <button class="btn" id="btn-mission">Go</button>
      </div>` : `
      <div class="hero-card"><h3>🎉 All main missions done at your level</h3><p>Try a side mission, mini-game, or jump to a higher level.</p></div>`}

    <div class="section-label">World map</div>
    <div class="loc-grid">
      ${locations.map(loc => {
        const unlocked = isLocationUnlocked(loc.id);
        return `<button class="loc-card ${unlocked ? '' : 'unavailable'}" data-loc="${loc.id}" ${unlocked ? '' : 'disabled'}>
          <span class="ico">${unlocked ? loc.icon : '🔒'}</span>
          <span class="nm">${esc(loc.name)}</span>
          <div class="cnt">${unlocked ? (worldStore.getState().mapVisited.includes(loc.id) ? 'Visited' : 'New') : `Needs ${loc.minWorldLevel}`}</div>
        </button>`;
      }).join('')}
    </div>

    <div class="section-label">Mini-games</div>
    <div class="loc-grid">
      ${MINI_GAME_TYPES.map(g => `
        <button class="loc-card" data-game="${g.type}">
          <span class="ico">${g.icon}</span>
          <span class="nm">${esc(g.title)}</span>
          <div class="cnt">${esc(g.description)}</div>
        </button>`).join('')}
    </div>

    <div class="section-label">More</div>
    <div class="action-grid">
      <button class="action-card" data-go="character"><span class="ico">🧑</span><span class="ttl">My Character</span><span class="sub">Growth & cosmetics</span></button>
      <button class="action-card" data-go="home"><span class="ico">📊</span><span class="ttl">Dashboard</span><span class="sub">Stats & streak</span></button>
      <button class="action-card" data-go="practice"><span class="ico">🔍</span><span class="ttl">Browse all locations</span><span class="sub">Full scenario list</span></button>
      <button class="action-card" data-go="placement-test"><span class="ico">🧭</span><span class="ttl">Placement test</span><span class="sub">Get a level recommendation</span></button>
    </div>
  `;

  container.querySelectorAll('[data-jump]').forEach(b => b.addEventListener('click', () => {
    worldStore.setWorldLevel(b.dataset.jump);
    renderWorld(container);
  }));
  container.querySelector('#btn-mission')?.addEventListener('click', () => navigate(`encounter/${mission.locationId}`));
  container.querySelectorAll('[data-loc]').forEach(b => b.addEventListener('click', () => navigate(`encounter/${b.dataset.loc}`)));
  container.querySelectorAll('[data-game]').forEach(b => b.addEventListener('click', () => navigate(`minigame/${b.dataset.game}/any`)));
  container.querySelectorAll('[data-go]').forEach(b => b.addEventListener('click', () => navigate(b.dataset.go)));
}
