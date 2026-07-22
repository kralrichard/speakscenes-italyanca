// Visual branch map + report for one scenario. Renders the dialogue graph as
// a simple, mobile-friendly indented tree: each decision node with its choices,
// marked unexplored / attempted / completed / mastered from storyStore, plus
// which endings were reached. Reachability is computed from the scenario data,
// never hardcoded, so it stays correct as content grows.

import { getScenario } from '../../data/branching/scenarios/index.js';
import { getCharacter } from '../../data/branching/characters.js';
import { storyStore } from '../../progress/storyStore.js';
import { ENDING_KINDS } from '../../data/branching/scenarioSchema.js';
import { navigate } from '../router.js';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// Walk the graph breadth-first from the start node, listing decision points in
// reachable order (skipping pure auto-advance/narration nodes).
function orderedDecisions(scenario) {
  const seen = new Set();
  const order = [];
  const queue = [scenario.startNodeId];
  let guard = 0;
  while (queue.length && guard++ < 500) {
    const id = queue.shift();
    if (seen.has(id) || !scenario.nodes[id]) continue;
    seen.add(id);
    const node = scenario.nodes[id];
    if (node.choices && node.choices.length) {
      order.push(node);
      for (const c of node.choices) if (!scenario.endings[c.next]) queue.push(c.next);
    } else if (node.next && !scenario.endings[node.next]) {
      queue.push(node.next);
    }
  }
  return order;
}

const STATUS_META = {
  unexplored: { icon: '◦', label: 'Unexplored', labelTr: 'Keşfedilmedi', cls: 'st-unexplored' },
  attempted:  { icon: '◐', label: 'Attempted',  labelTr: 'Denendi',      cls: 'st-attempted' },
  completed:  { icon: '✓', label: 'Completed',  labelTr: 'Tamamlandı',   cls: 'st-completed' },
  mastered:   { icon: '★', label: 'Mastered',   labelTr: 'Ustalaşıldı',  cls: 'st-mastered' }
};

export function renderBranchMap(container, params) {
  const scenario = getScenario(params.id);
  if (!scenario) {
    container.innerHTML = `<div class="boot-error"><h2>Scenario not found</h2><button class="btn" onclick="location.hash='#/story'">Story</button></div>`;
    return () => {};
  }
  const st = storyStore.getState();
  const sc = st.scenarios[scenario.id] || { completedChoices: [], masteredChoices: [], endings: [] };
  const decisions = orderedDecisions(scenario);

  const decisionHtml = decisions.map((node, i) => {
    const npc = getCharacter(node.speakerId);
    const choices = node.choices.map(c => {
      const status = storyStore.choiceStatus(scenario.id, node.id, c.id);
      const m = STATUS_META[status];
      const targetEnding = scenario.endings[c.next];
      const leadsTo = targetEnding
        ? `<span class="branch-arrow">→ ${ENDING_KINDS[targetEnding.kind].icon} ${esc(targetEnding.title)}</span>`
        : '';
      return `
        <li class="branch-choice ${m.cls}">
          <span class="branch-status" title="${m.labelTr}">${m.icon}</span>
          <span class="branch-intent">${esc(c.intentionTr)}</span>
          <span class="branch-sentence">“${esc(c.sentence)}”</span>
          ${leadsTo}
        </li>`;
    }).join('');
    return `
      <div class="branch-node">
        <div class="branch-npc">${esc(npc.name)}: <span>“${esc(node.text)}”</span></div>
        <ul class="branch-choices">${choices}</ul>
      </div>`;
  }).join('<div class="branch-connector">┆</div>');

  const endingChips = Object.values(scenario.endings).map(e => {
    const seen = sc.endings.includes(e.id);
    const meta = ENDING_KINDS[e.kind];
    return `<div class="end-chip ${seen ? 'seen' : ''}">
      <span class="end-chip-ico">${seen ? meta.icon : '🔒'}</span>
      <span class="end-chip-txt"><b>${seen ? esc(e.title) : 'Hidden ending'}</b><span>${meta.labelTr}</span></span>
    </div>`;
  }).join('');

  const total = scenario._totalChoices;
  const done = sc.completedChoices.length;
  const mastered = sc.masteredChoices.length;
  const pct = total ? Math.round(done / total * 100) : 0;

  container.innerHTML = `
    <div class="branchmap screen-pad">
      <header class="bm-head">
        <button class="conv-exit" onclick="location.hash='#/story'" aria-label="Back">‹</button>
        <h1>🌳 Branch Map</h1>
      </header>
      <h2 class="bm-scenario">${esc(scenario.title)}</h2>

      <div class="bm-summary">
        <div class="bm-stat"><b>${done}/${total}</b><span>branches completed</span></div>
        <div class="bm-stat"><b>${mastered}</b><span>★ mastered</span></div>
        <div class="bm-stat"><b>${sc.endings.length}/${Object.keys(scenario.endings).length}</b><span>endings found</span></div>
      </div>
      <div class="bm-bar"><span style="width:${pct}%"></span></div>

      <div class="bm-legend">
        ${Object.values(STATUS_META).map(m => `<span class="${m.cls}">${m.icon} ${m.labelTr}</span>`).join('')}
      </div>

      <div class="branch-tree">${decisionHtml}</div>

      <h3 class="bm-endings-title">Endings · Sonlar</h3>
      <div class="bm-endings">${endingChips}</div>

      <div class="bm-actions">
        <button class="btn" id="play-again">▶ Play this scenario</button>
        <button class="btn ghost" id="back-story">‹ Back to Story</button>
      </div>
    </div>`;

  container.querySelector('#play-again').onclick = () => navigate(`story/${scenario.id}`);
  container.querySelector('#back-story').onclick = () => navigate('story');
  return () => {};
}
