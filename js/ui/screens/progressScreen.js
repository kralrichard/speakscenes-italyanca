import { progressStore } from '../../progress/progressStore.js?v=5';
import { getDialogueById } from '../../data/dialogues/index.js?v=5';
import { getLocation } from '../../data/locations.js?v=5';
import { todayKey } from '../../progress/storage.js?v=5';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const ACH_ICONS = { 'first-dialogue': '🎬', 'five-dialogues': '🎯', 'streak-3': '🔥', 'streak-7': '🏔️', 'perfect-turn': '💎', 'explorer-5': '🌍' };

export function renderProgress(container) {
  const p = progressStore;
  const state = p.getState();

  // last 7 days speaking bars
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(Date.now() - i * 86400000);
    const secs = state.speakingTimeLog[todayKey(d)] || 0;
    days.push({ label: d.toLocaleDateString(undefined, { weekday: 'short' }).slice(0, 2), secs });
  }
  const maxSecs = Math.max(60, ...days.map(d => d.secs));

  const difficult = p.getMostDifficultWords(8);
  const achievements = p.getAchievements();
  const completed = [...state.completedDialogues].reverse().slice(0, 10);

  // completion rate per level
  const levelCounts = {};
  for (const c of state.completedDialogues) levelCounts[c.level] = (levelCounts[c.level] || 0) + 1;

  container.innerHTML = `
    <h1 class="screen-title">📈 My progress</h1>

    <div class="card">
      <div class="row">
        <div class="grow">
          <b>Level ${p.level}</b> <span style="color:var(--text-faint)">· ${state.xp} XP total</span>
          <div class="xp-bar"><div style="width:${(p.xpIntoLevel / 200) * 100}%"></div></div>
          <small style="color:var(--text-faint)">${p.xpIntoLevel} / 200 XP to level ${p.level + 1}</small>
        </div>
        <div style="text-align:center">
          <div style="font-size:1.6rem">🔥</div>
          <b>${state.streak.current}</b><br><small style="color:var(--text-faint)">streak (best ${state.streak.longest})</small>
        </div>
      </div>
    </div>

    <div class="section-label">Speaking time — last 7 days</div>
    <div class="card">
      <div class="week-bars">
        ${days.map(d => `
          <div class="wb">
            <div class="bar" style="height:${Math.max(3, (d.secs / maxSecs) * 90)}%" title="${Math.round(d.secs / 60)} min"></div>
            <div class="dl">${d.label}</div>
          </div>`).join('')}
      </div>
      <div style="text-align:center;color:var(--text-dim);font-size:0.85rem;margin-top:0.5rem">
        Today: <b>${Math.round(p.getTodaySpeakingSeconds() / 60)} min</b> · This week: <b>${Math.round(p.getWeeklySpeakingSeconds() / 60)} min</b>
      </div>
    </div>

    <div class="section-label">Most difficult words</div>
    <div class="card">
      ${difficult.length ? difficult.map(w => `
        <div class="word-row">
          <span>${esc(w.word)}</span>
          <span class="miss">missed ${w.misses}×</span>
        </div>`).join('') : `<div class="empty-state" style="padding:1rem">No difficult words tracked yet — go speak!</div>`}
    </div>

    <div class="section-label">Dialogues by level</div>
    <div class="card">
      <div class="chip-row">
        ${['A1', 'A2', 'B1', 'B2', 'C1', 'C2'].map(l =>
          `<span class="chip ${levelCounts[l] ? 'active' : ''}">${l}: ${levelCounts[l] || 0}</span>`).join('')}
      </div>
    </div>

    <div class="section-label">Achievements</div>
    <div class="ach-grid">
      ${achievements.map(a => `
        <div class="ach-card ${a.unlocked ? '' : 'locked'}">
          <div class="ico">${ACH_ICONS[a.id] || '🏅'}</div>
          <div class="nm">${esc(a.name)}</div>
          <div class="ds">${esc(a.desc)}</div>
        </div>`).join('')}
    </div>

    <div class="section-label">Tamamlandı dialogues</div>
    ${completed.length ? completed.map(c => {
      const d = getDialogueById(c.dialogueId);
      return `<div class="card row">
        <span style="font-size:1.25rem">${getLocation(c.locationId)?.icon || '✅'}</span>
        <span class="grow"><b>${esc(d ? d.title : c.dialogueId)}</b> <span class="badge level">${c.level}</span><br>
        <small style="color:var(--text-faint)">${c.summary ? `${c.summary.accuracy}% accuracy · ${c.summary.totalAttempts} attempts` : ''} · ${new Date(c.completedAt).toLocaleDateString()}</small></span>
      </div>`;
    }).join('') : `<div class="empty-state"><div class="big">📭</div>Nothing completed yet.</div>`}
  `;
}
