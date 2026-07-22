// Renders the accept/reject feedback for one scored attempt. Everything shown
// comes from the scorer's real diff; the "clarity" pill is explicitly
// labeled as recognition-based, never as pronunciation.

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

/** Word chips in expected-sentence order: match=green, sub=red(+what was
 *  heard), del=gray dashed, ins=blue. Low-confidence attempts mark matched
 *  words yellow ("unclear") instead of green. */
function renderDiff(score) {
  const lowConfidence = typeof score.clarity === 'number' && score.clarity < 40;
  const chips = score.diff.map(op => {
    if (op.type === 'match') {
      return `<span class="wd ${lowConfidence ? 'unclear' : 'ok'}">${esc(op.expected)}</span>`;
    }
    if (op.type === 'sub') {
      return `<span class="wd bad" title="You said: ${esc(op.actual)}">${esc(op.expected)}</span><span class="wd extra">${esc(op.actual)}</span>`;
    }
    if (op.type === 'del') {
      return `<span class="wd missing">${esc(op.expected)}</span>`;
    }
    return `<span class="wd extra">+${esc(op.actual)}</span>`;
  }).join('');
  return `<div class="word-diff">${chips}</div>`;
}

const LEGEND = `
  <div class="diff-legend">
    <span><i style="background:var(--green-soft);border:1px solid var(--green)"></i>correct</span>
    <span><i style="background:var(--red-soft);border:1px solid var(--red)"></i>incorrect</span>
    <span><i style="border:1px dashed var(--gray-word)"></i>missing</span>
    <span><i style="background:var(--blue-soft);border:1px solid var(--blue)"></i>extra</span>
    <span><i style="background:var(--yellow-soft);border:1px solid var(--yellow)"></i>unclear</span>
  </div>`;

/**
 * @param {object} score  scorer result
 * @param {object} [o]    { level: 'A1'..'C2', transcript: string }
 */
export function renderFeedback(score, o = {}) {
  const simple = o.level === 'A1' || o.level === 'A2';
  const verdict = score.accepted
    ? `<div class="feedback-verdict ok">✅ Accepted — well said!</div>`
    : `<div class="feedback-verdict no">❌ Not accepted yet</div>`;

  const heard = score.empty
    ? `<div class="heard-line">No speech was detected.</div>`
    : `<div class="heard-line">We heard: <b>“${esc(o.transcript || '')}”</b></div>`;

  // Beginners: at most 2 tips, no jargon. Higher levels: full detail.
  const tips = (score.tips || []).slice(0, simple ? 2 : 6);
  const tipsHtml = tips.length
    ? `<ul class="tips-list">${tips.map(t => `<li>${esc(t)}</li>`).join('')}</ul>`
    : '';

  const pills = [];
  pills.push(`<span class="score-pill">Words <b>${score.wordAccuracy}%</b></span>`);
  if (!simple) pills.push(`<span class="score-pill">Complete <b>${score.completeness}%</b></span>`);
  if (typeof score.clarity === 'number') {
    pills.push(`<span class="score-pill" title="Based on the speech recognizer's confidence, not a phoneme-level pronunciation measurement">Recognition clarity <b>${score.clarity}%</b></span>`);
  }
  if (typeof score.fluency === 'number' && !simple) {
    pills.push(`<span class="score-pill" title="Estimated from your pace and pauses">Fluency <b>${score.fluency}%</b>${score.wpm ? ` · ${score.wpm} wpm` : ''}</span>`);
  }

  return `
    <div class="feedback-panel ${score.accepted ? 'accepted' : 'rejected'}" role="alert">
      ${verdict}
      ${heard}
      ${score.empty ? '' : renderDiff(score)}
      ${score.empty || simple ? '' : LEGEND}
      ${tipsHtml}
      <div class="score-pills">${pills.join('')}</div>
    </div>`;
}
