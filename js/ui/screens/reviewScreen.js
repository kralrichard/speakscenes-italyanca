// Spaced-repetition review. Items come from real failed dialogue turns
// (queued automatically after 2+ rejections). Practice uses the same
// recognizer + scorer as the dialogue screen; each result feeds the SM-2
// scheduler with an honest quality grade.

import { reviewSystem } from '../../progress/reviewSystem.js?v=5';
import { getDialogueById } from '../../data/dialogues/index.js?v=5';
import { getLevel } from '../../data/levels.js?v=5';
import { createSpeechProvider, TypedFallbackProvider, isNativeSpeechSupported } from '../../speech/speechRecognizer.js?v=5';
import { scoreAttempt } from '../../speech/scorer.js?v=5';
import { tts } from '../../speech/tts.js?v=5';
import { settings } from '../../progress/settingsStore.js?v=5';
import { createMicButton } from '../components/micButton.js?v=5';
import { renderFeedback } from '../components/feedbackPanel.js?v=5';
import { navigate } from '../router.js?v=5';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// Review items come in two kinds: 'turn' (a failed dialogue sentence, has a
// dialogueTitle) and 'vocab' (a tapped/missed word, has no dialogue). Both
// are scored identically via scoreAttempt() against item.expected -- this
// label is the only place the two need different display text.
function sourceLabel(item) {
  return item.kind === 'vocab' ? 'Kelimeler' : (item.dialogueTitle || 'Dialogue');
}

export function renderReview(container) {
  // Priority = overdue first (oldest due date), then newest failures.
  const due = [...reviewSystem.getDueItems(50)].sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  const all = reviewSystem.getAllItems();

  let session = null; // { queue, index, attemptsThisItem, provider, micApi, unsubs }

  function renderList() {
    stopSession();
    container.innerHTML = `
      <h1 class="screen-title">🔁 Review</h1>
      <p class="screen-sub">Sentences you struggled with come back here on a spaced-repetition schedule.</p>

      ${due.length ? `
        <div class="hero-card">
          <h3>${due.length} sentence${due.length === 1 ? '' : 's'} due now</h3>
          <p>Speak each one until it's accepted — success pushes it further into the future.</p>
          <button class="btn" id="btn-start-review">🎙️ Start review session</button>
        </div>` : `
        <div class="empty-state"><div class="big">🎉</div>Nothing due right now.${all.length ? ` ${all.length} sentence${all.length === 1 ? ' is' : 's are'} scheduled for later.` : ' Fail a sentence twice in a dialogue and it will appear here.'}</div>`}

      ${all.length ? `
        <div class="section-label">All saved sentences (${all.length})</div>
        ${all.map(it => `
          <div class="card">
            <div class="row">
              <span class="grow">
                <b>“${esc(it.expected)}”</b><br>
                <small style="color:var(--text-faint)">${esc(sourceLabel(it))} · due ${new Date(it.dueDate).toLocaleDateString()} · streak ${it.repetitions}</small>
              </span>
              <button class="mini-btn" data-remove="${esc(it.id)}">Remove</button>
            </div>
          </div>`).join('')}` : ''}
    `;
    container.querySelector('#btn-start-review')?.addEventListener('click', startSession);
    container.querySelectorAll('[data-remove]').forEach(b => b.addEventListener('click', () => {
      reviewSystem.removeItem(b.dataset.remove);
      const i = due.findIndex(x => x.id === b.dataset.remove);
      if (i !== -1) due.splice(i, 1);
      const j = all.findIndex(x => x.id === b.dataset.remove);
      if (j !== -1) all.splice(j, 1);
      renderList();
    }));
  }

  function startSession() {
    const typedMode = !isNativeSpeechSupported();
    session = {
      queue: [...due],
      index: 0,
      attempts: 0,
      lastScore: null,
      lastTranscript: '',
      typedMode,
      provider: typedMode ? new TypedFallbackProvider() : createSpeechProvider(),
      micApi: null,
      unsubs: []
    };
    wireSession();
    renderItem();
  }

  function stopSession() {
    if (!session) return;
    tts.stop();
    session.provider.abort();
    session.provider.removeAllListeners();
    session = null;
  }

  function wireSession() {
    const s = session;
    s.unsubs.push(s.provider.on('state', (st) => {
      if (!session) return;
      if (st === 'listening') s.micApi?.setState('listening');
      if (st === 'analyzing') s.micApi?.setState('analyzing');
      if (st === 'no-speech') s.micApi?.setState('retry', 'Ses algılanmadı — tekrar dene.');
    }));
    s.unsubs.push(s.provider.on('idle', () => {
      if (session && s.micApi && s.micApi.getState() === 'listening') s.micApi.setState('retry', 'Hiçbir şey algılanmadı — tekrar dene.');
    }));
    s.unsubs.push(s.provider.on('error', (err) => {
      if (!session) return;
      if (err.code === 'permission-denied') {
        s.typedMode = true;
        s.provider.removeAllListeners();
        s.provider = new TypedFallbackProvider();
        wireSession();
        renderItem();
      } else if (err.code !== 'aborted') {
        s.micApi?.setState('error', err.message);
      }
    }));
    s.unsubs.push(s.provider.on('result', ({ transcript, confidence, timing }) => {
      if (!session) return;
      const item = s.queue[s.index];
      const dlg = getDialogueById(item.dialogueId);
      const level = dlg ? dlg.level : 'B1';
      const strictness = settings.get('strictness') || getLevel(level).defaultStrictness;
      const score = scoreAttempt({ expected: item.expected, transcript, confidence, timing, strictness });
      s.attempts += 1;
      s.lastScore = score;
      s.lastTranscript = transcript;

      if (score.accepted) {
        // Honest SM-2 grade: first-try accept = 5, second = 4, later = 3.
        const quality = s.attempts === 1 ? 5 : s.attempts === 2 ? 4 : 3;
        reviewSystem.grade(item.id, quality);
        s.graded = true;
      } else if (s.attempts >= 3) {
        // Three failures: reschedule for tomorrow, move on.
        reviewSystem.grade(item.id, 2);
        s.failedOut = true;
      }
      renderItem();
    }));
  }

  function nextItem() {
    const s = session;
    s.index += 1;
    s.attempts = 0;
    s.lastScore = null;
    s.lastTranscript = '';
    s.graded = false;
    s.failedOut = false;
    if (s.index >= s.queue.length) {
      stopSession();
      // refresh due list after grading
      due.length = 0;
      due.push(...reviewSystem.getDueItems(50));
      all.length = 0;
      all.push(...reviewSystem.getAllItems());
      renderList();
      return;
    }
    renderItem();
  }

  function renderItem() {
    const s = session;
    const item = s.queue[s.index];
    const dlg = getDialogueById(item.dialogueId);
    const level = dlg ? dlg.level : 'B1';
    const accent = settings.get('preferredAccent') || (dlg ? dlg.characters.A.accent : 'american');
    const rate = getLevel(level).ttsRate * (settings.get('speechRate') || 1);
    const done = s.graded || s.failedOut;

    container.innerHTML = `
      <div class="row" style="margin:0.4rem 0 1rem">
        <button class="btn ghost small" id="btn-quit">‹ End session</button>
        <span style="color:var(--text-faint);font-size:0.85rem">Sentence ${s.index + 1} of ${s.queue.length}</span>
      </div>
      <div class="expected-card">
        <div class="lbl">Say this sentence</div>
        <div class="sentence">${esc(item.expected)}</div>
        ${settings.get('showTranslations') && item.translation_tr ? `<div class="tr-text">${esc(item.translation_tr)}</div>` : ''}
        <div class="tools-row">
          <button class="mini-btn" id="btn-hear">▶ Dinle</button>
          <button class="mini-btn" id="btn-hear-slow">🐢 Yavaş</button>
        </div>
        <div style="color:var(--text-faint);font-size:0.78rem;margin-top:0.6rem">From: ${esc(sourceLabel(item))} · attempt ${s.attempts + (done ? 0 : 1)} of 3</div>
      </div>
      ${s.lastScore ? renderFeedback(s.lastScore, { level, transcript: s.lastTranscript }) : ''}
      ${done ? `
        <div class="${s.graded ? 'xp-toast' : 'error-notice'}" style="text-align:center">
          ${s.graded ? '✅ Scheduled further into the future.' : '📅 Rescheduled for tomorrow — keep practicing!'}
        </div>
        <button class="btn block" id="btn-next">${s.index + 1 >= s.queue.length ? 'Oturumu bitir' : 'Sıradaki cümle ›'}</button>` : `
        <div class="mic-zone" id="mic-zone"></div>
        ${s.typedMode ? `
          <div class="mode-notice">⌨️ Typed practice mode (no speech recognition available).</div>
          <div class="typed-fallback">
            <input type="text" id="typed-input" placeholder="Type the sentence…" autocomplete="off">
            <button class="btn block" style="margin-top:0.5rem" id="typed-submit">Check</button>
          </div>` : ''}`}
    `;

    container.querySelector('#btn-quit').addEventListener('click', () => { stopSession(); renderList(); });
    container.querySelector('#btn-hear')?.addEventListener('click', () => { tts.stop(); tts.speak(item.expected, { accent, rate, volume: settings.get('volume') }); });
    container.querySelector('#btn-hear-slow')?.addEventListener('click', () => { tts.stop(); tts.speak(item.expected, { accent, rate: rate * 0.55, volume: settings.get('volume') }); });
    container.querySelector('#btn-next')?.addEventListener('click', nextItem);

    if (!done) {
      if (s.typedMode) {
        const input = container.querySelector('#typed-input');
        const submit = () => {
          const v = input.value.trim();
          if (!v) return;
          s.provider.start();
          s.provider.submitText(v);
        };
        container.querySelector('#typed-submit').addEventListener('click', submit);
        input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
        input.focus();
        container.querySelector('#mic-zone').style.display = 'none';
      } else {
        s.micApi = createMicButton(container.querySelector('#mic-zone'), {
          onPress: () => { tts.stop(); s.provider.start({ accent }); }
        });
        s.micApi.setState(s.lastScore ? 'retry' : 'ready');
      }
    }
  }

  renderList();

  return () => stopSession();
}
