// Short, optional placement test. Gives a RECOMMENDATION only -- never
// blocks or forces a level choice, matching the product spec ("Your
// recommended level is A2, but you may continue with B1 if you prefer").
import { worldStore } from '../../progress/worldStore.js?v=6';
import { WORLD_LEVEL_CODES, getGrowthStage } from '../../data/worldLevels.js?v=6';
import { navigate } from '../router.js?v=6';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }
function shuffle(arr) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; } return a; }

// Each question is tagged with the CEFR tier it probes. Real, hand-written
// content (vocabulary meaning, tense recognition, register, idiom) -- not
// placeholder text.
const QUESTIONS = [
  { level: 'A1', q: 'What does "water" mean in Turkish?', options: ['su', 'ekmek', 'kedi', 'kitap'], correct: 0 },
  { level: 'A1', q: 'How do you say "hello" when greeting someone?', options: ['Bye', 'Hello', 'Sorry', 'No'], correct: 1 },
  { level: 'A2', q: 'Which sentence talks about something that happened in the past?', options: ['I eat breakfast every day.', 'I ate breakfast yesterday.', 'I am eating breakfast now.', 'I will eat breakfast tomorrow.'], correct: 1 },
  { level: 'B1', q: 'Which sentence describes a plan for the future?', options: ['I visited Paris last year.', 'I am going to visit Paris next summer.', 'I visit Paris every year.', 'I have never visited Paris.'], correct: 1 },
  { level: 'B2', q: 'Which sentence politely introduces a complaint?', options: ["I'm afraid there's a problem with my order.", 'This is amazing!', 'Can you tell me the time?', 'Nice to meet you.'], correct: 0 },
  { level: 'C1', q: 'Which phrase softens a formal request?', options: ['Give me the report.', 'Would you mind sending the report?', 'I want the report now.', 'Send it.'], correct: 1 },
  { level: 'C2', q: 'Which sentence uses an idiom?', options: ['It is raining heavily.', "It's raining cats and dogs.", 'There is a lot of rain today.', 'The weather is bad.'], correct: 1 }
];

export function renderPlacementTest(container) {
  const questions = shuffle(QUESTIONS);
  let index = 0;
  let correctCount = 0;
  let picked = null;

  function render() {
    if (index >= questions.length) { renderResult(); return; }
    const item = questions[index];
    container.innerHTML = `
      <div class="row" style="margin-bottom:0.8rem">
        <button class="icon-btn" id="btn-exit" aria-label="Exit">✕</button>
        <span class="grow" style="font-weight:700">🧭 Placement Test</span>
        <div class="turn-progress" style="max-width:110px"><div style="width:${(index / questions.length) * 100}%"></div></div>
      </div>
      <p class="screen-sub">This is optional and only gives a recommendation — you can still pick any level yourself afterward.</p>
      <div class="card"><b>${esc(item.q)}</b></div>
      <div style="display:flex;flex-direction:column;gap:0.5rem;margin-top:0.8rem">
        ${item.options.map((o, i) => `<button class="scenario-item mg-choice ${picked === i ? (i === item.correct ? 'correct' : 'incorrect') : ''}" data-i="${i}" ${picked != null ? 'disabled' : ''}>${esc(o)}</button>`).join('')}
      </div>
      ${picked != null ? `<button class="btn block" id="btn-next" style="margin-top:1rem">Next ›</button>` : ''}`;

    container.querySelector('#btn-exit').addEventListener('click', () => navigate(''));
    container.querySelectorAll('.mg-choice').forEach(b => b.addEventListener('click', () => {
      if (picked != null) return;
      picked = Number(b.dataset.i);
      if (picked === item.correct) correctCount++;
      render();
    }));
    container.querySelector('#btn-next')?.addEventListener('click', () => { index++; picked = null; render(); });
  }

  function renderResult() {
    const ratio = correctCount / questions.length;
    const idx = correctCount === 0 ? 0 : Math.min(6, Math.round(ratio * 6));
    const recommended = WORLD_LEVEL_CODES[idx];
    worldStore.setPlacementRecommendation(recommended);
    const stage = getGrowthStage(recommended);

    container.innerHTML = `
      <div class="report-hero">
        <div class="big-emoji">🧭</div>
        <h2>Your recommended level</h2>
        <p>${correctCount} / ${questions.length} correct</p>
      </div>
      <div class="card" style="text-align:center">
        <span class="badge level" style="background:${stage.color}22;color:${stage.color};font-size:1rem;padding:0.4rem 0.9rem">${recommended}</span>
        <p style="margin-top:0.6rem"><b>${esc(stage.name)}</b></p>
        <p style="color:var(--text-dim);font-size:0.85rem;margin-top:0.4rem">This is only a recommendation — you can start here, or pick any level yourself.</p>
      </div>
      <div style="display:flex;flex-direction:column;gap:0.6rem;margin-top:1rem">
        <button class="btn block" id="btn-use">Use ${recommended}</button>
        <button class="btn secondary block" id="btn-choose">Choose a different level</button>
      </div>`;

    container.querySelector('#btn-use').addEventListener('click', () => {
      worldStore.setWorldLevel(recommended);
      if (!worldStore.getState().onboarded) worldStore.setOnboarded();
      navigate('');
    });
    container.querySelector('#btn-choose').addEventListener('click', () => navigate('level-select'));
  }

  render();
}
