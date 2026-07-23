// Level selection: "Start from A0" vs "Choose my current level" per the
// product spec. Also reachable later from worldScreen.js's level-jump row
// and from the placement test result screen -- reusing this same screen
// for a "choose a different level" follow-up, not a separate flow.
import { worldStore } from '../../progress/worldStore.js?v=6';
import { GROWTH_STAGES } from '../../data/worldLevels.js?v=6';
import { navigate } from '../router.js?v=6';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

export function renderLevelSelect(container) {
  const isFirstRun = !worldStore.getState().onboarded;

  function choose(code) {
    worldStore.setWorldLevel(code);
    if (isFirstRun) worldStore.setOnboarded();
    navigate('');
  }

  container.innerHTML = `
    <h1 class="screen-title">Choose your starting level</h1>
    <p class="screen-sub">You can change this anytime from the World screen — nothing here is permanent.</p>
    <button class="hero-card" id="btn-a0" style="width:100%;text-align:left;cursor:pointer">
      <h3>👶 Start from A0</h3>
      <p>New to English? Begin as a baby, learning first words through pictures and sounds.</p>
    </button>
    <div class="section-label">Or choose my current level</div>
    ${GROWTH_STAGES.filter(g => g.code !== 'A0').map(g => `
      <button class="level-card" data-level="${g.code}">
        <span class="level-code" style="background:${g.color}22;color:${g.color}">${g.code}</span>
        <span class="grow">
          <div class="level-name">${esc(g.name)}</div>
          <div class="level-desc">${esc(g.desc)}</div>
        </span>
        <span>›</span>
      </button>`).join('')}
    <button class="btn ghost block" id="btn-placement" style="margin-top:0.8rem">🧭 Not sure? Take a short placement test</button>
  `;

  container.querySelector('#btn-a0').addEventListener('click', () => choose('A0'));
  container.querySelectorAll('[data-level]').forEach(b => b.addEventListener('click', () => choose(b.dataset.level)));
  container.querySelector('#btn-placement').addEventListener('click', () => navigate('placement-test'));
}
