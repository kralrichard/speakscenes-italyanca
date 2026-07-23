// The core dialogue screen. Wires together: DialogueEngine (turn state),
// speech recognizer (real ASR or typed fallback), scorer, TTS, progress
// store, review system, session persistence, and the visual scene.
//
// Reliability guards implemented here:
//  - mic can only start in 'awaiting-user' (button + handler both check)
//  - one recognition session at a time (provider guards + press debounce)
//  - TTS is cancelled before every new utterance and on exit/hide
//  - a stale TTS onEnd cannot double-advance (engine state guard)
//  - completion is recorded exactly once (local flag)
//  - session is persisted after every advance -> refresh resumes the turn
//  - permission denial / no ASR support degrade to clearly-labeled typed mode

import { getDialogueById } from '../../data/dialogues/index.js?v=6';
import { getLocation } from '../../data/locations.js?v=6';
import { getLevel } from '../../data/levels.js?v=6';
import { DialogueEngine } from '../../engine/dialogueEngine.js?v=6';
import { createSpeechProvider, TypedFallbackProvider, isNativeSpeechSupported } from '../../speech/speechRecognizer.js?v=6';
import { scoreAttempt } from '../../speech/scorer.js?v=6';
import { tts, isTTSSupported } from '../../speech/tts.js?v=6';
import { progressStore } from '../../progress/progressStore.js?v=6';
import { reviewSystem } from '../../progress/reviewSystem.js?v=6';
import { sessionStore } from '../../progress/sessionStore.js?v=6';
import { worldStore } from '../../progress/worldStore.js?v=6';
import { checkMissionsForDialogue } from '../../progress/missionEngine.js?v=6';
import { settings } from '../../progress/settingsStore.js?v=6';
import { renderScene } from '../components/sceneBackground.js?v=6';
import { renderAvatar } from '../components/characterAvatar.js?v=6';
import { createMicButton } from '../components/micButton.js?v=6';
import { renderFeedback } from '../components/feedbackPanel.js?v=6';
import { navigate } from '../router.js?v=6';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

export function renderDialogue(container, params) {
  const dialogue = getDialogueById(params.id);
  if (!dialogue) {
    container.innerHTML = `<div class="boot-error"><h2>Dialogue not found</h2><button class="btn" onclick="location.hash='#/'">Home</button></div>`;
    return;
  }

  const level = getLevel(dialogue.level);
  const location = getLocation(dialogue.locationId);
  const playerRole = params.role === 'A' ? 'A' : 'B';

  // ----- resume support -----
  // If a saved session matches this dialogue, resume at the saved turn --
  // this covers both the home-screen "Continue" button and a mid-dialogue
  // page refresh. "Practice again" clears the session first, so it restarts.
  let startTurnIndex = 0;
  {
    const saved = sessionStore.load();
    if (saved && saved.dialogueId === dialogue.id &&
        Number.isInteger(saved.turnIndex) && saved.turnIndex > 0 && saved.turnIndex < dialogue.turns.length) {
      startTurnIndex = saved.turnIndex;
    }
  }

  const engine = new DialogueEngine(dialogue, { playerRole, startTurnIndex });
  sessionStore.save(engine.serialize());

  // ----- local UI state -----
  const strictness = settings.get('strictness') || level.defaultStrictness;
  const accent = settings.get('preferredAccent') || dialogue.characters[engine.characterRole].accent;
  const baseRate = level.ttsRate * (settings.get('speechRate') || 1);
  const volume = settings.get('volume');
  const ui = {
    micState: 'disabled',
    lastScore: null,
    lastTranscript: '',
    errorNotice: null,
    isSpeaking: false,
    showTranslation: settings.get('showTranslations'),
    showGrammar: settings.get('showGrammarByDefault'),
    showVocab: false,
    typedMode: !isNativeSpeechSupported(),
    completionRecorded: false,
    acceptHoldTimer: null,
    wordByWordCancel: null
  };

  let provider = ui.typedMode ? new TypedFallbackProvider() : createSpeechProvider();
  let micApi = null;
  const unsubs = [];          // engine + global listeners (live for the whole screen)
  const providerUnsubs = [];  // provider listeners only (replaced on provider swap)

  // ---------- speech provider wiring ----------
  function wireProvider() {
    providerUnsubs.push(provider.on('state', (s) => {
      if (s === 'listening') { setMic('listening'); setStatus('listening', 'Listening… speak now'); setUserTalking(true); }
      if (s === 'analyzing') {
        engine.beginScoring();
        setMic('analyzing'); setStatus('processing', 'Analyzing your speech…'); setUserTalking(false);
      }
      if (s === 'no-speech') {
        engine.cancelScoring();
        setUserTalking(false);
        setMic('retry', 'No voice was detected. Tap and try again.');
        setStatus('your-turn', 'No voice detected');
      }
    }));

    providerUnsubs.push(provider.on('result', ({ transcript, confidence, timing }) => {
      handleAttempt(transcript, confidence, timing);
    }));

    providerUnsubs.push(provider.on('idle', () => {
      // Session ended without result (and without an error we handled).
      if (engine.state === 'scoring') engine.cancelScoring();
      if (engine.state === 'awaiting-user' && ui.micState === 'listening') {
        setMic('retry', 'Nothing was captured. Tap and try again.');
        setStatus('your-turn', 'Your turn');
      }
      setUserTalking(false);
    }));

    providerUnsubs.push(provider.on('error', (err) => {
      setUserTalking(false);
      if (engine.state === 'scoring') engine.cancelScoring();
      if (err.code === 'permission-denied') {
        ui.typedMode = true;
        ui.errorNotice = 'Microphone access was denied. You can allow it in your browser\'s site settings (🔒 icon in the address bar). Until then, you can type your answers below — clearly marked as typed practice.';
        switchToTypedProvider();
        renderTurnArea();
      } else if (err.code === 'network') {
        ui.errorNotice = 'The speech service could not be reached. Check your internet connection and try again.';
        setMic('error', 'Connection problem');
        setStatus('error-state', 'Connection problem');
        renderTurnArea();
      } else if (err.code !== 'aborted') {
        ui.errorNotice = err.message;
        setMic('retry', 'Something went wrong — try again.');
        renderTurnArea();
      }
    }));
  }

  function switchToTypedProvider() {
    // Only detach the OLD provider's listeners -- engine/global listeners in
    // `unsubs` must survive the swap (unsubscribing them froze the UI after
    // a permission denial; caught in browser testing).
    for (const off of providerUnsubs.splice(0)) off();
    provider.abort();
    provider = new TypedFallbackProvider();
    wireProvider();
  }

  // ---------- scoring ----------
  function handleAttempt(transcript, confidence, timing) {
    const turn = engine.currentTurn;
    if (!turn || (engine.state !== 'scoring' && engine.state !== 'awaiting-user')) return;

    const expected = turn.expected || turn.text;
    const score = scoreAttempt({
      expected,
      altAccepted: turn.altAccepted || [],
      transcript, confidence, timing, strictness
    });
    ui.lastScore = score;
    ui.lastTranscript = transcript;

    // Real progress: record misses for content words the user struggled with.
    for (const w of score.problemWords) progressStore.recordWordAttempt(w, false);

    if (score.accepted) {
      setMic('correct');
      setStatus('your-turn', 'Correct!');
      renderTurnArea(); // show green feedback while we hold
      ui.acceptHoldTimer = setTimeout(() => {
        ui.acceptHoldTimer = null;
        ui.lastScore = null; ui.lastTranscript = '';
        engine.submitAttempt({ transcript, score, accepted: true });
      }, 1200);
    } else {
      engine.submitAttempt({ transcript, score, accepted: false });
      // After 2 failed attempts on a turn, it enters the real review queue.
      const fails = engine.history[engine.turnIndex].attempts.filter(a => !a.accepted).length;
      if (fails >= 2 && turn.speaker === 'B') {
        reviewSystem.queueFailedTurn(dialogue, engine.turnIndex, turn);
      }
    }
  }

  // ---------- TTS ----------
  function speakLine(text, { rate = baseRate, autoAdvance = false } = {}) {
    stopWordByWord();
    tts.stop();
    ui.isSpeaking = true;
    setCharTalking(true);
    updateSpeakControls();
    tts.speak(text, {
      accent,
      gender: dialogue.characters[engine.characterRole].gender,
      rate, volume,
      onEnd: () => {
        ui.isSpeaking = false;
        setCharTalking(false);
        updateSpeakControls();
        // Guarded in the engine: only advances if still 'character-speaking'.
        if (autoAdvance) engine.characterFinishedSpeaking();
      },
      onError: () => {
        ui.isSpeaking = false;
        setCharTalking(false);
        updateSpeakControls();
      }
    });
  }

  function stopWordByWord() {
    if (ui.wordByWordCancel) { ui.wordByWordCancel(); ui.wordByWordCancel = null; }
  }

  // ---------- layout ----------
  const charA = dialogue.characters[engine.characterRole]; // app-controlled
  const charB = dialogue.characters[engine.playerRole];    // the user

  container.innerHTML = `
    <div class="dialogue-shell">
      <div class="scene-viewport">
        ${renderScene(dialogue.sceneType)}
        <div class="dialogue-topbar">
          <button class="icon-btn" id="btn-exit" aria-label="Exit dialogue">✕</button>
          <span class="ttl">${esc(dialogue.title)} · ${esc(location ? location.name : '')}</span>
          <div class="turn-progress"><div id="prog-fill" style="width:0%"></div></div>
        </div>
        <div class="scene-chars">
          <div class="char-slot" id="slot-A">
            <div class="char-name-tag">${esc(charA.name)} · ${esc(charA.role)}</div>
            <div class="avatar-holder">${renderAvatar(charA.avatarPreset, { emotion: 'neutral' })}</div>
          </div>
          <div class="char-slot" id="slot-B">
            <div class="char-name-tag">You · ${esc(charB.role)}</div>
            <div class="avatar-holder">${renderAvatar(charB.avatarPreset, { emotion: 'friendly', flip: true })}</div>
          </div>
        </div>
      </div>
      <div class="dialogue-body">
        <div class="status-banner" id="status"><span class="dot"></span><span id="status-text"></span></div>
        <div id="history"></div>
        <div id="turn-area"></div>
      </div>
    </div>`;

  const el = {
    status: container.querySelector('#status'),
    statusText: container.querySelector('#status-text'),
    history: container.querySelector('#history'),
    turnArea: container.querySelector('#turn-area'),
    progFill: container.querySelector('#prog-fill'),
    slotA: container.querySelector('#slot-A'),
    slotB: container.querySelector('#slot-B')
  };

  container.querySelector('#btn-exit').addEventListener('click', () => {
    // Session already saved on every advance -- user can continue later.
    navigate('');
  });

  function setStatus(cls, text) {
    el.status.className = `status-banner ${cls}`;
    el.statusText.textContent = text;
  }

  function setMic(state, hint) {
    ui.micState = state;
    if (micApi) micApi.setState(state, hint);
  }

  function setCharTalking(talking) {
    const t = engine.currentTurn;
    const emotion = t && t.speaker === engine.characterRole ? (t.emotion || 'neutral') : 'neutral';
    el.slotA.classList.toggle('speaking', talking);
    el.slotA.querySelector('.avatar-holder').innerHTML =
      renderAvatar(charA.avatarPreset, { emotion, talking });
  }

  function setUserTalking(talking) {
    el.slotB.classList.toggle('speaking', talking);
    el.slotB.querySelector('.avatar-holder').innerHTML =
      renderAvatar(charB.avatarPreset, { emotion: talking ? 'happy' : 'friendly', talking, flip: true });
  }

  function updateSpeakControls() {
    const play = el.turnArea.querySelector('#btn-continue-line');
    if (play) play.style.display = ui.isSpeaking ? 'none' : '';
  }

  // ---------- rendering ----------
  function renderHistory() {
    const parts = [];
    for (let i = 0; i < Math.min(engine.turnIndex, dialogue.turns.length); i++) {
      const t = dialogue.turns[i];
      const isChar = t.speaker === engine.characterRole;
      parts.push(`
        <div class="bubble history ${isChar ? 'char' : 'user'}">
          <div class="who">${isChar ? esc(charA.name) : 'You'}</div>
          <div class="line-text">${esc(isChar ? (t.text || t.expected) : (t.expected || t.text))}</div>
        </div>`);
    }
    el.history.innerHTML = parts.join('');
  }

  function grammarPanel(turn) {
    if (!turn.grammar || !turn.grammar.length) return '';
    return `
      <div class="helper-panel">
        <h4>Grammar — what each word is doing</h4>
        ${turn.grammar.map(g => `
          <div class="grammar-item"><span class="gw">${esc(g.word)}</span> <span class="gr">${esc(g.role)}</span><br>${esc(g.note)}</div>`).join('')}
      </div>`;
  }

  function vocabPanel(turn) {
    const kx = turn.keyExpressions || [];
    const ex = turn.exampleSentences || [];
    const pt = turn.pronunciationTips || [];
    if (!kx.length && !ex.length && !pt.length) return '';
    return `
      <div class="helper-panel">
        ${kx.length ? `<h4>Key expressions</h4>${kx.map(k => `<div class="kv-item"><span class="k">${esc(k.phrase)}</span> — ${esc(k.meaning)}</div>`).join('')}` : ''}
        ${ex.length ? `<h4 style="margin-top:0.7rem">More examples</h4>${ex.map(e => `<div class="kv-item">· ${esc(e)}</div>`).join('')}` : ''}
        ${pt.length ? `<h4 style="margin-top:0.7rem">Pronunciation tips</h4>${pt.map(t => `<div class="kv-item">🗣️ ${esc(t)}</div>`).join('')}` : ''}
      </div>`;
  }

  function renderCharacterTurn(turn) {
    const line = turn.text || turn.expected;
    el.turnArea.innerHTML = `
      <div class="bubble char">
        <div class="who">${esc(charA.name)}${turn.register ? `<span class="register-tag">${turn.register}</span>` : ''}</div>
        <div class="line-text">${esc(line)}</div>
        ${ui.showTranslation && turn.translation_tr ? `<div class="tr-text">${esc(turn.translation_tr)}</div>` : ''}
        <div class="audio-controls">
          <button class="mini-btn" id="btn-replay">▶ Replay</button>
          <button class="mini-btn" id="btn-slow">🐢 Slow</button>
          <button class="mini-btn" id="btn-tr-toggle">${ui.showTranslation ? 'Hide' : 'Show'} Türkçe</button>
          <button class="mini-btn" id="btn-continue-line" style="display:none">Continue ›</button>
        </div>
      </div>
      ${!isTTSSupported() ? `<div class="mode-notice">🔇 This browser has no speech voices — read the line above, then press Continue.</div>` : ''}`;

    el.turnArea.querySelector('#btn-replay').addEventListener('click', () => speakLine(line, { autoAdvance: engine.state === 'character-speaking' }));
    el.turnArea.querySelector('#btn-slow').addEventListener('click', () => speakLine(line, { rate: baseRate * 0.55, autoAdvance: engine.state === 'character-speaking' }));
    el.turnArea.querySelector('#btn-tr-toggle').addEventListener('click', () => { ui.showTranslation = !ui.showTranslation; renderTurnArea(); });
    el.turnArea.querySelector('#btn-continue-line').addEventListener('click', () => engine.characterFinishedSpeaking());

    if (settings.get('autoplayCharacter') && isTTSSupported()) {
      speakLine(line, { autoAdvance: true });
    } else {
      ui.isSpeaking = false;
      el.turnArea.querySelector('#btn-continue-line').style.display = '';
    }
  }

  function renderUserTurn(turn) {
    const expected = turn.expected || turn.text;
    const showFeedback = ui.lastScore !== null;

    el.turnArea.innerHTML = `
      <div class="expected-card">
        <div class="lbl">Your line — say this${turn.register ? `<span class="register-tag">${turn.register}</span>` : ''}</div>
        <div class="sentence">${esc(expected)}</div>
        ${turn.ipa ? `<div class="ipa">${esc(turn.ipa)}</div>` : ''}
        ${ui.showTranslation && turn.translation_tr ? `<div class="tr-text">${esc(turn.translation_tr)}</div>` : ''}
        <div class="tools-row">
          <button class="mini-btn" id="btn-hear">▶ Hear it</button>
          <button class="mini-btn" id="btn-hear-slow">🐢 Slow</button>
          <button class="mini-btn" id="btn-hear-words">🔤 Word by word</button>
          <button class="mini-btn ${ui.showGrammar ? 'active' : ''}" id="btn-grammar">📖 Grammar</button>
          <button class="mini-btn ${ui.showVocab ? 'active' : ''}" id="btn-vocab">💡 Vocabulary</button>
          <button class="mini-btn" id="btn-tr-toggle">${ui.showTranslation ? 'Hide' : 'Show'} Türkçe</button>
        </div>
      </div>
      ${ui.showGrammar ? grammarPanel(turn) : ''}
      ${ui.showVocab ? vocabPanel(turn) : ''}
      ${ui.errorNotice ? `<div class="error-notice">${esc(ui.errorNotice)}</div>` : ''}
      ${showFeedback ? renderFeedback(ui.lastScore, { level: dialogue.level, transcript: ui.lastTranscript }) : ''}
      <div class="mic-zone" id="mic-zone"></div>
      ${ui.typedMode ? `
        <div class="mode-notice">⌨️ <b>Typed practice mode.</b> Real speech recognition is unavailable here (${isNativeSpeechSupported() ? 'microphone blocked' : 'browser not supported — use Chrome or Edge'}). Your typed answer is checked with the same strict comparison, but fluency and clarity cannot be measured from typing.</div>
        <div class="typed-fallback">
          <input type="text" id="typed-input" placeholder="Type the sentence exactly as you would say it…" autocomplete="off">
          <button class="btn block" style="margin-top:0.5rem" id="typed-submit">Check my answer</button>
        </div>` : ''}
    `;

    // helper buttons
    el.turnArea.querySelector('#btn-hear').addEventListener('click', () => speakLine(expected, {}));
    el.turnArea.querySelector('#btn-hear-slow').addEventListener('click', () => speakLine(expected, { rate: baseRate * 0.55 }));
    el.turnArea.querySelector('#btn-hear-words').addEventListener('click', () => {
      tts.stop(); stopWordByWord();
      const h = tts.speakWordByWord(expected, { accent, rate: baseRate, volume, onEnd: () => { ui.wordByWordCancel = null; } });
      ui.wordByWordCancel = h.cancel;
    });
    el.turnArea.querySelector('#btn-grammar').addEventListener('click', () => { ui.showGrammar = !ui.showGrammar; renderTurnArea(); });
    el.turnArea.querySelector('#btn-vocab').addEventListener('click', () => { ui.showVocab = !ui.showVocab; renderTurnArea(); });
    el.turnArea.querySelector('#btn-tr-toggle').addEventListener('click', () => { ui.showTranslation = !ui.showTranslation; renderTurnArea(); });

    // mic
    micApi = createMicButton(el.turnArea.querySelector('#mic-zone'), {
      onPress: () => {
        // A new attempt is valid from 'awaiting-user' OR 'turn-rejected'
        // (retrying re-arms the engine). Any other state is a hard no.
        if (engine.state === 'turn-rejected') engine.retry();
        if (engine.state !== 'awaiting-user') return;
        ui.errorNotice = null;
        tts.stop(); stopWordByWord(); ui.isSpeaking = false; setCharTalking(false);
        provider.start({ accent });
      }
    });

    if (ui.typedMode) {
      // In typed mode the mic button is decorative-off; the input drives it.
      setMic('disabled', '');
      el.turnArea.querySelector('#mic-zone').style.display = 'none';
      const input = el.turnArea.querySelector('#typed-input');
      const submit = () => {
        const v = input.value.trim();
        if (!v) return;
        if (engine.state === 'turn-rejected') engine.retry(); // re-arm after a rejection
        if (engine.state !== 'awaiting-user') return;
        provider.start();
        provider.submitText(v);
      };
      el.turnArea.querySelector('#typed-submit').addEventListener('click', submit);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
      input.focus();
    } else if (ui.lastScore && ui.lastScore.accepted) {
      setMic('correct'); // accepted-hold: brief green state before advancing
    } else if (engine.state === 'turn-rejected') {
      setMic('retry');
    } else {
      setMic('ready');
    }
  }

  function renderComplete() {
    tts.stop(); stopWordByWord();
    const summary = engine.getSummary();

    let xpInfo = null;
    let newMissions = [];
    if (!ui.completionRecorded) {
      ui.completionRecorded = true;
      xpInfo = progressStore.recordDialogueCompletion(dialogue, summary);
      newMissions = checkMissionsForDialogue(dialogue, summary);
      worldStore.recordSkillSample(dialogue.level, summary.accuracy);
      sessionStore.clear();
    }

    const mins = Math.floor(summary.durationMs / 60000);
    const secs = Math.round((summary.durationMs % 60000) / 1000);
    const dueReviews = reviewSystem.getDueItems().length;

    el.turnArea.innerHTML = `
      <div class="report-hero">
        <div class="big-emoji">${summary.accuracy >= 90 ? '🏆' : summary.accuracy >= 70 ? '🎉' : '💪'}</div>
        <h2>Dialogue complete!</h2>
        <p>${esc(dialogue.title)} — ${esc(dialogue.goal)}</p>
      </div>
      ${xpInfo ? `<div class="xp-toast">+${xpInfo.xpGain} XP${xpInfo.newAchievements.length ? ` · 🏅 ${xpInfo.newAchievements.map(a => esc(a.name)).join(', ')}` : ''}</div>` : ''}
      ${newMissions.length ? `<div class="xp-toast">🎯 Mission complete: ${newMissions.map(m => esc(m.title)).join(', ')}</div>` : ''}
      <div class="report-grid">
        <div class="report-stat"><div class="v">${summary.accuracy}%</div><div class="k">Word accuracy</div></div>
        <div class="report-stat"><div class="v">${summary.totalAttempts}</div><div class="k">Attempts</div></div>
        <div class="report-stat"><div class="v">${summary.turnsCompleted}</div><div class="k">Sentences spoken</div></div>
        <div class="report-stat"><div class="v">${mins}:${String(secs).padStart(2, '0')}</div><div class="k">Duration</div></div>
        ${typeof summary.clarity === 'number' ? `<div class="report-stat"><div class="v">${summary.clarity}%</div><div class="k">Recognition clarity</div></div>` : ''}
        ${typeof summary.fluency === 'number' ? `<div class="report-stat"><div class="v">${summary.fluency}%</div><div class="k">Fluency (pace)</div></div>` : ''}
      </div>
      ${summary.difficultWords.length ? `
        <div class="card"><b>Words to practice:</b> ${summary.difficultWords.map(esc).join(', ')}
        <div style="color:var(--text-faint);font-size:0.8rem;margin-top:4px">These went into your review queue where they'll come back with spaced repetition.</div></div>` : ''}
      <div style="display:flex;flex-direction:column;gap:0.6rem;margin-top:1rem">
        <button class="btn block" id="btn-again">🔁 Practice this dialogue again</button>
        ${dueReviews ? `<button class="btn secondary block" id="btn-review">📚 Review ${dueReviews} saved sentence${dueReviews === 1 ? '' : 's'}</button>` : ''}
        <button class="btn secondary block" id="btn-more">🗺️ More dialogues</button>
        <button class="btn ghost block" id="btn-home">Home</button>
      </div>`;

    setStatus('your-turn', 'Finished!');
    el.progFill.style.width = '100%';
    el.turnArea.querySelector('#btn-again').addEventListener('click', () => {
      // Full remount for a clean engine.
      sessionStore.clear();
      navigate(`dialogue/${dialogue.id}?t=${Date.now()}`);
    });
    el.turnArea.querySelector('#btn-review')?.addEventListener('click', () => navigate('review'));
    el.turnArea.querySelector('#btn-more').addEventListener('click', () => navigate('practice'));
    el.turnArea.querySelector('#btn-home').addEventListener('click', () => navigate(''));
  }

  function renderTurnArea() {
    const snap = engine.getSnapshot();
    el.progFill.style.width = `${(snap.progress.current / snap.progress.total) * 100}%`;

    if (snap.isComplete) { renderComplete(); return; }

    const turn = snap.turn;
    if (snap.state === 'character-speaking') {
      setStatus('speaking', `${charA.name} is speaking…`);
      renderCharacterTurn(turn);
    } else if (snap.state === 'awaiting-user' || snap.state === 'turn-rejected' || snap.state === 'scoring') {
      if (snap.state === 'awaiting-user' && !ui.lastScore) setStatus('your-turn', 'Your turn — say the sentence below');
      if (snap.state === 'turn-rejected') setStatus('your-turn', 'Try again — check the feedback');
      renderUserTurn(turn);
    }
  }

  // engine -> UI
  unsubs.push(engine.onChange((snap) => {
    sessionStore.save(engine.serialize());
    // Clear stale attempt feedback when we arrive at a NEW turn.
    if (snap.state === 'character-speaking' || snap.state === 'complete') {
      ui.lastScore = null; ui.lastTranscript = ''; ui.showVocab = false;
      ui.showGrammar = settings.get('showGrammarByDefault');
    }
    if (snap.state === 'awaiting-user' && ui.acceptHoldTimer === null && ui.lastScore && ui.lastScore.accepted) {
      ui.lastScore = null; ui.lastTranscript = '';
    }
    renderHistory();
    renderTurnArea();
  }));

  // Pause everything when the tab/screen is hidden.
  const onVisibility = () => {
    if (document.hidden) {
      tts.stop(); stopWordByWord();
      provider.abort();
      ui.isSpeaking = false;
      if (engine.state === 'scoring') engine.cancelScoring();
    }
  };
  document.addEventListener('visibilitychange', onVisibility);

  // ---------- initial paint ----------
  wireProvider();
  renderHistory();
  renderTurnArea();

  // cleanup on navigation away
  return () => {
    document.removeEventListener('visibilitychange', onVisibility);
    if (ui.acceptHoldTimer) clearTimeout(ui.acceptHoldTimer);
    tts.stop(); stopWordByWord();
    provider.abort();
    provider.removeAllListeners();
    for (const off of [...unsubs, ...providerUnsubs]) { try { off(); } catch {} }
  };
}
