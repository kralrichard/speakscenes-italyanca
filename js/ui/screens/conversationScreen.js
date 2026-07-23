// ============================================================================
// conversationScreen — the branching Story Mode player. Wires together:
//   BranchEngine (graph traversal)  ·  speech recognizer (ASR or typed)
//   scorer (reused, meaning-based)  ·  TTS (auto-play + slow + replay)
//   storyStore (XP/coins/relationship/achievements/branch marking)
//   scene backgrounds + emotive SVG avatars + tappable-word glossary
//
// Reliability guards (mirrors dialogueScreen's proven approach):
//   - mic only starts from the speaking stage; provider + button both guard
//   - one recognition session at a time; press debounce in micButton
//   - TTS cancelled before every new line and on screen cleanup/unmount
//   - a hard timeout on recording so no state can hang on "listening"
//   - permission denial / no ASR → clearly-labeled typed mode automatically
//   - each accepted line records progress exactly once (committedFlag)
// ============================================================================

import { getScenario } from '../../data/branching/scenarios/index.js?v=5';
import { getCharacter } from '../../data/branching/characters.js?v=5';
import { BranchEngine } from '../../engine/branchEngine.js?v=5';
import { createSpeechProvider, isNativeSpeechSupported } from '../../speech/speechRecognizer.js?v=5';
import { scoreAttempt } from '../../speech/scorer.js?v=5';
import { tts, isTTSSupported } from '../../speech/tts.js?v=5';
import { storyStore, relationshipTier, ACHIEVEMENTS } from '../../progress/storyStore.js?v=5';
import { settings } from '../../progress/settingsStore.js?v=5';
import { renderScene } from '../components/sceneBackground.js?v=5';
import { renderAvatar } from '../components/characterAvatar.js?v=5';
import { renderFeedback } from '../components/feedbackPanel.js?v=5';
import { lookupWord, GRAMMAR_NOTES } from '../../data/branching/vocabulary.js?v=5';
import { TONE_META, DIFFICULTY_META, ENDING_KINDS } from '../../data/branching/scenarioSchema.js?v=5';
import { navigate } from '../router.js?v=5';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

// Wrap each word of a sentence in a tappable span for the glossary popup.
function tappable(text) {
  return String(text).split(/(\s+)/).map(tok => {
    if (/^\s+$/.test(tok) || !/[a-zA-Z]/.test(tok)) return esc(tok);
    return `<span class="tap-word" data-word="${esc(tok)}">${esc(tok)}</span>`;
  }).join('');
}

export function renderConversation(container, params) {
  const scenario = getScenario(params.id);
  if (!scenario) {
    container.innerHTML = `<div class="boot-error"><h2>Scenario not found</h2><button class="btn" onclick="location.hash='#/story'">Back to Story</button></div>`;
    return () => {};
  }

  const engine = new BranchEngine(scenario);
  const provider = createSpeechProvider();
  const usingTyped = !isNativeSpeechSupported();
  const level = scenario.level;
  const simpleFeedback = level === 'A0' || level === 'A1' || level === 'A2';
  const accentFor = (charId) => getCharacter(charId).accent;
  const genderFor = (charId) => getCharacter(charId).gender;

  // ----- per-screen mutable state -----
  let stage = 'npc';          // 'npc' | 'speaking' | 'ending'
  let activeChoice = null;    // the choice being spoken
  let committedFlag = false;  // guards double-commit for the active choice
  let recording = false;
  let recordTimeout = null;
  let ttsHandle = null;
  let showTr = false;         // Turkish subtitle toggle for the NPC line
  let providerOffs = [];
  let destroyed = false;

  // ---- TTS helpers (always cancel before speaking; never overlap) ----
  function stopTTS() { if (ttsHandle) { try { ttsHandle.cancel(); } catch {} ttsHandle = null; } tts.stop(); }
  function speak(text, charId, { slow = false } = {}) {
    if (!settings.get('autoplayCharacter') && !slow && stage === 'npc' && ttsSpokenOnce) return;
    stopTTS();
    const opts = { accent: accentFor(charId), gender: genderFor(charId), rate: slow ? 0.6 : 1 };
    ttsHandle = tts.speak(text, opts);
  }
  let ttsSpokenOnce = false;

  container.innerHTML = shellHTML(scenario);
  const els = {
    scene: container.querySelector('.conv-scene-holder'),
    npcSlot: container.querySelector('.npc-slot'),
    playerSlot: container.querySelector('.player-slot'),
    bubble: container.querySelector('.npc-bubble'),
    stageArea: container.querySelector('.conv-stage'),
    timeline: container.querySelector('.conv-timeline'),
    rel: container.querySelector('.conv-rel'),
    toast: container.querySelector('.conv-toast')
  };
  els.scene.innerHTML = renderScene(scenario.sceneType);

  // Global word-tap handler (event delegation on the whole screen).
  const wordTapHandler = (e) => {
    const w = e.target.closest('.tap-word');
    if (w) { e.stopPropagation(); showWordPopup(w.dataset.word); }
  };
  container.addEventListener('click', wordTapHandler);

  // ---------------- rendering ----------------
  function renderNpcLine(node, { animateIn = true } = {}) {
    stage = 'npc';
    const npc = getCharacter(node.speakerId);
    els.npcSlot.innerHTML = `
      <div class="char-name-tag">${esc(npc.name)} · <span>${esc(npc.role)}</span></div>
      <div class="avatar-holder" data-emotion="${node.emotion || 'neutral'}">${renderAvatar(npc.avatarPreset, { emotion: node.emotion, size: 132, talking: true })}</div>`;
    els.bubble.className = `npc-bubble emotion-${node.emotion || 'neutral'} ${animateIn ? 'pop-in' : ''}`;
    els.bubble.innerHTML = `
      <p class="npc-en">${tappable(node.text)}</p>
      ${showTr ? `<p class="npc-tr">${esc(node.translation || '')}</p>` : ''}
      <div class="bubble-controls">
        <button class="ico-btn" data-act="replay" title="Play again" aria-label="Play again">🔊</button>
        <button class="ico-btn" data-act="slow" title="Slow" aria-label="Slow">🐢</button>
        <button class="ico-btn ${showTr ? 'on' : ''}" data-act="tr" title="Turkish" aria-label="Turkish translation">TR</button>
      </div>`;

    ttsSpokenOnce = false;
    speak(node.text, node.speakerId);
    ttsSpokenOnce = true;

    els.bubble.querySelector('[data-act="replay"]').onclick = () => speak(node.text, node.speakerId);
    els.bubble.querySelector('[data-act="slow"]').onclick = () => speak(node.text, node.speakerId, { slow: true });
    els.bubble.querySelector('[data-act="tr"]').onclick = () => { showTr = !showTr; renderNpcLine(node, { animateIn: false }); };

    renderChoices(node);
    renderTimeline();
    renderRelationship();
  }

  function choiceStatusClass(nodeId, choiceId) {
    const persisted = storyStore.choiceStatus(scenario.id, nodeId, choiceId);
    if (persisted === 'mastered') return 'mastered';
    if (persisted === 'completed') return 'completed';
    if (engine.choiceStatus(nodeId, choiceId) === 'attempted') return 'attempted';
    return 'unexplored';
  }

  function renderChoices(node) {
    const cards = node.choices.map(c => {
      const status = choiceStatusClass(node.id, c.id);
      const tone = c.tone ? TONE_META[c.tone] : null;
      const diff = c.difficulty ? DIFFICULTY_META[c.difficulty] : null;
      const badge = { unexplored: '', attempted: '<span class="ch-mark att">tried</span>',
        completed: '<span class="ch-mark done">✓ done</span>', mastered: '<span class="ch-mark mast">★ mastered</span>' }[status];
      return `
        <button class="choice-card ${status}" data-choice="${esc(c.id)}">
          <div class="ch-head">
            <span class="ch-intent">${esc(c.intentionTr)}</span>
            ${badge}
          </div>
          <div class="ch-sentence">“${esc(c.sentence)}”</div>
          <div class="ch-tags">
            ${tone ? `<span class="ch-tag tone">${tone.icon} ${tone.labelTr}</span>` : ''}
            ${diff ? `<span class="ch-tag diff diff-${c.difficulty}">${'●'.repeat(diff.dots)}<span class="diff-off">${'●'.repeat(3 - diff.dots)}</span> ${diff.labelTr}</span>` : ''}
          </div>
        </button>`;
    }).join('');
    els.stageArea.innerHTML = `
      <div class="choice-prompt">🗣️ <b>Ne söylemek istersin?</b> <span>What do you want to say?</span></div>
      <div class="choice-grid">${cards}</div>`;
    els.stageArea.querySelectorAll('[data-choice]').forEach(btn => {
      btn.addEventListener('click', () => openSpeaking(node, node.choices.find(c => c.id === btn.dataset.choice)));
    });
  }

  // ---------------- speaking stage ----------------
  function openSpeaking(node, choice) {
    stage = 'speaking';
    activeChoice = choice;
    committedFlag = false;
    stopTTS();
    const grammarKey = `${scenario.id}::${choice.id}`;
    const grammar = GRAMMAR_NOTES[grammarKey];

    els.stageArea.innerHTML = `
      <div class="speak-stage">
        <button class="link-back" data-act="cancel">‹ Choose a different answer</button>
        <div class="speak-target">
          <p class="speak-en">${tappable(choice.sentence)}</p>
          <p class="speak-tr">${esc(choice.translation)}</p>
        </div>
        <div class="speak-audio">
          <button class="ico-btn" data-act="hear" title="Dinle">🔊 Dinle</button>
          <button class="ico-btn" data-act="hearslow" title="Slow">🐢 Yavaş</button>
          <button class="ico-btn" data-act="chunks" title="Kelime kelime">🧩 Kelime kelime</button>
        </div>
        ${grammar ? `<details class="grammar-note"><summary>📘 ${esc(grammar.title)}</summary><ul>${grammar.points.map(p => `<li>${esc(p)}</li>`).join('')}</ul></details>` : `<p class="grammar-hint">💡 Kelimelerin üzerine dokunarak anlamlarını gör.</p>`}
        <div class="mic-zone">
          <div class="mic-wrap"></div>
        </div>
        <div class="speak-feedback" aria-live="polite"></div>
        <div class="typed-zone ${usingTyped ? 'forced' : ''}">
          ${usingTyped ? `<p class="typed-note">🎤 Mikrofon bu tarayıcıda yok — yazarak pratik yap.</p>` : `<button class="link-btn" data-act="type-toggle">⌨️ Bunun yerine yazarak cevapla</button>`}
          <div class="typed-input ${usingTyped ? '' : 'hidden'}">
            <input type="text" class="typed-field" placeholder="Type the sentence…" autocomplete="off" />
            <button class="btn small" data-act="submit-typed">Check</button>
          </div>
        </div>
      </div>`;

    const stageEl = els.stageArea.querySelector('.speak-stage');
    stageEl.querySelector('[data-act="cancel"]').onclick = () => { cleanupRecording(); renderNpcLine(node, { animateIn: false }); };
    // Model pronunciation of the learner's target sentence uses a neutral clear voice.
    stageEl.querySelector('[data-act="hear"]').onclick = () => { stopTTS(); ttsHandle = tts.speak(choice.sentence, { accent: 'american' }); };
    stageEl.querySelector('[data-act="hearslow"]').onclick = () => { stopTTS(); ttsHandle = tts.speakSlow(choice.sentence, { accent: 'american' }); };
    stageEl.querySelector('[data-act="chunks"]').onclick = () => { stopTTS(); ttsHandle = tts.speakWordByWord(choice.sentence, { accent: 'american' }); };

    // typed toggle
    const typeToggle = stageEl.querySelector('[data-act="type-toggle"]');
    if (typeToggle) typeToggle.onclick = () => stageEl.querySelector('.typed-input').classList.toggle('hidden');
    const submitTyped = stageEl.querySelector('[data-act="submit-typed"]');
    const typedField = stageEl.querySelector('.typed-field');
    const doTyped = () => {
      const val = typedField.value.trim();
      if (!val) { typedField.focus(); return; }
      evaluate(node, choice, { transcript: val, confidence: null, timing: null }, 'typed');
    };
    submitTyped.onclick = doTyped;
    typedField.addEventListener('keydown', (e) => { if (e.key === 'Enter') doTyped(); });

    // mic button (reused component)
    const micWrap = stageEl.querySelector('.mic-wrap');
    setupMic(micWrap, node, choice, usingTyped);
  }

  function setupMic(micWrap, node, choice, typedOnly) {
    // Lazy import of the mic button component (keeps parity with dialogueScreen).
    import('../components/micButton.js?v=5').then(({ createMicButton }) => {
      if (destroyed || stage !== 'speaking') return;
      const mic = createMicButton(micWrap, { onPress: () => startRecording(node, choice, mic) });
      mic.setState(typedOnly ? 'disabled' : 'ready');
      if (typedOnly) micWrap.querySelector('.mic-hint').textContent = 'Type your answer below.';
      currentMic = mic;
    });
  }
  let currentMic = null;

  function startRecording(node, choice, mic) {
    if (recording) return;
    recording = true;
    mic.setState('listening');
    // wire provider events fresh each recording
    providerOffs.forEach(off => off());
    providerOffs = [];
    providerOffs.push(provider.on('state', (s) => {
      if (s === 'listening') mic.setState('listening');
      else if (s === 'analyzing') mic.setState('analyzing');
      else if (s === 'no-speech') { cleanupRecording(); mic.setState('retry'); showFailure(node, choice, 'no-speech'); }
    }));
    providerOffs.push(provider.on('result', (r) => {
      clearTimeout(recordTimeout);
      recording = false;
      evaluate(node, choice, r, 'speech', mic);
    }));
    providerOffs.push(provider.on('error', (err) => {
      clearTimeout(recordTimeout);
      recording = false;
      if (err.code === 'permission-denied') { forceTypedMode(node, choice); }
      else { mic.setState('retry'); showFailure(node, choice, err.code); }
    }));
    providerOffs.push(provider.on('idle', () => {
      // session ended with no final result -> recover, never hang
      clearTimeout(recordTimeout);
      if (recording) { recording = false; mic.setState('retry'); showFailure(node, choice, 'no-speech'); }
    }));

    provider.start({ accent: 'american' });
    // hard timeout so nothing can hang on "listening"/"analyzing"
    recordTimeout = setTimeout(() => {
      if (recording) { try { provider.abort(); } catch {} recording = false; mic.setState('retry'); showFailure(node, choice, 'timeout'); }
    }, 12000);
  }

  function cleanupRecording() {
    clearTimeout(recordTimeout);
    recording = false;
    providerOffs.forEach(off => off());
    providerOffs = [];
    try { provider.abort(); } catch {}
  }

  function forceTypedMode(node, choice) {
    const stageEl = els.stageArea.querySelector('.speak-stage');
    if (!stageEl) return;
    const zone = stageEl.querySelector('.typed-zone');
    zone.classList.add('forced');
    zone.querySelector('.typed-input')?.classList.remove('hidden');
    const note = document.createElement('p');
    note.className = 'typed-note';
    note.textContent = '🎤 Mikrofon izni verilmedi — yazarak devam edebilirsin.';
    zone.prepend(note);
    if (currentMic) currentMic.setState('disabled');
    stageEl.querySelector('.typed-field')?.focus();
  }

  function evaluate(node, choice, res, mode, mic) {
    const strictness = simpleFeedback ? 'relaxed' : 'normal';
    const score = scoreAttempt({
      expected: choice.sentence,
      altAccepted: choice.altAccepted || [],
      transcript: res.transcript,
      confidence: res.confidence,
      timing: res.timing,
      strictness
    });
    storyStore.recordAttempt(scenario.id, node.id, choice.id);

    const fbEl = els.stageArea.querySelector('.speak-feedback');
    if (fbEl) fbEl.innerHTML = renderFeedback(score, { transcript: res.transcript, level });

    if (score.accepted) {
      if (mic) mic.setState('correct');
      commitAccepted(node, choice, score);
    } else {
      storyStore.recordSpoken(false);
      if (mic) mic.setState('retry');
      // append recovery options under the feedback
      appendRecovery(node, choice, fbEl);
    }
  }

  function appendRecovery(node, choice, fbEl) {
    if (!fbEl) return;
    const rec = document.createElement('div');
    rec.className = 'recovery-row';
    rec.innerHTML = `
      <button class="btn small ghost" data-act="hear-again">🔊 Tekrar dinle</button>
      <button class="btn small ghost" data-act="type-instead">⌨️ Yazarak dene</button>`;
    rec.querySelector('[data-act="hear-again"]').onclick = () => { stopTTS(); ttsHandle = tts.speakSlow(choice.sentence, { accent: 'american' }); };
    rec.querySelector('[data-act="type-instead"]').onclick = () => {
      const zone = els.stageArea.querySelector('.typed-input');
      zone?.classList.remove('hidden');
      els.stageArea.querySelector('.typed-field')?.focus();
    };
    fbEl.appendChild(rec);
  }

  function showFailure(node, choice, code) {
    const fbEl = els.stageArea.querySelector('.speak-feedback');
    if (!fbEl) return;
    const msgs = {
      'no-speech': 'I couldn’t hear anything. Tap the mic and speak clearly.',
      'timeout': 'That took too long — let’s try again.',
      'network': 'The speech service could not be reached. You can type instead.',
      'aborted': 'Recording was cancelled.'
    };
    fbEl.innerHTML = `<div class="feedback-panel rejected" role="alert">
      <div class="feedback-verdict no">🙉 ${esc(msgs[code] || 'I couldn’t understand that clearly. Please try again.')}</div>
    </div>`;
    appendRecovery(node, choice, fbEl);
  }

  function commitAccepted(node, choice, score) {
    if (committedFlag) return;
    committedFlag = true;
    cleanupRecording();
    storyStore.recordSpoken(true);
    const awardedXp = storyStore.completeChoice(scenario, node, choice, { overallScore: score.overallScore });
    flashReward(awardedXp);
    flushAchievements();

    // brief success beat, then advance the graph
    setTimeout(() => {
      if (destroyed) return;
      const result = engine.commitChoice(choice.id);
      if (result.ending) {
        showEnding(result.ending);
      } else {
        renderNpcLine(result.node);
      }
    }, 700);
  }

  // ---------------- ending / report ----------------
  function showEnding(ending) {
    stage = 'ending';
    storyStore.reachEnding(scenario, ending);
    flushAchievements();
    stopTTS();
    const meta = ENDING_KINDS[ending.kind];
    const st = storyStore.getState();
    const sc = st.scenarios[scenario.id] || { completedChoices: [], endings: [] };
    const total = scenario._totalChoices;
    const done = sc.completedChoices.length;
    const allEndings = Object.keys(scenario.endings).length;
    const seenEndings = sc.endings.length;

    els.stageArea.innerHTML = `
      <div class="ending-card" style="--end-color:${meta.color}">
        <div class="ending-icon">${meta.icon}</div>
        <div class="ending-kind">${meta.label} · ${meta.labelTr}</div>
        <h2 class="ending-title">${esc(ending.title)}</h2>
        <p class="ending-text">${esc(ending.text)}</p>
        <p class="ending-tr">${esc(ending.translation)}</p>
        <div class="ending-stats">
          <div><b>${done}/${total}</b><span>branches done</span></div>
          <div><b>${seenEndings}/${allEndings}</b><span>endings found</span></div>
          ${ending.coins ? `<div><b>🪙 +${ending.coins}</b><span>coins</span></div>` : ''}
        </div>
        <div class="ending-actions">
          <button class="btn" data-act="branch-map">🌳 Branch map</button>
          <button class="btn ghost" data-act="try-another">🔀 Try another branch</button>
          <button class="btn ghost" data-act="restart">↺ Restart scenario</button>
          <button class="btn ghost" data-act="exit">✓ Back to Story</button>
        </div>
      </div>`;
    els.timeline.innerHTML = '';
    renderRelationship();

    const A = (act) => els.stageArea.querySelector(`[data-act="${act}"]`);
    A('branch-map').onclick = () => navigate(`branchmap/${scenario.id}`);
    A('try-another').onclick = () => {
      // return to the last decision that had an unexplored/other option
      const idx = findLastRewindableIndex();
      if (idx >= 0 && engine.rewindTo(idx)) { renderNpcLine(engine.currentNode(), { animateIn: false }); }
      else { engine.restart(); renderNpcLine(engine.currentNode()); }
    };
    A('restart').onclick = () => { engine.restart(); renderNpcLine(engine.currentNode()); };
    A('exit').onclick = () => navigate('story');
  }

  function findLastRewindableIndex() {
    // Prefer the most recent decision that still has an un-completed choice.
    for (let i = engine.history.length - 1; i >= 0; i--) {
      const node = scenario.nodes[engine.history[i].nodeId];
      if (!node || !node.choices) continue;
      const anyOpen = node.choices.some(c => !storyStore.isChoiceTamamlandı(scenario.id, node.id, c.id));
      if (anyOpen) return i;
    }
    return engine.history.length ? engine.history.length - 1 : -1;
  }

  // ---------------- timeline / back navigation ----------------
  function renderTimeline() {
    const tl = engine.timeline();
    if (!tl.length) { els.timeline.innerHTML = ''; return; }
    els.timeline.innerHTML = `
      <div class="tl-label">Konuşma geçmişi · Timeline</div>
      <div class="tl-steps">
        ${tl.map((step, i) => `
          <button class="tl-step" data-idx="${i}" title="Return to this decision">
            <span class="tl-n">${i + 1}</span>
            <span class="tl-said">“${esc(step.sentence || '')}”</span>
          </button>`).join('')}
        <button class="tl-back" data-act="back">‹ Son karara dön</button>
      </div>`;
    els.timeline.querySelectorAll('.tl-step').forEach(b => {
      b.addEventListener('click', () => {
        cleanupRecording();
        if (engine.rewindTo(parseInt(b.dataset.idx, 10))) renderNpcLine(engine.currentNode(), { animateIn: false });
      });
    });
    els.timeline.querySelector('[data-act="back"]')?.addEventListener('click', () => {
      cleanupRecording();
      if (engine.back()) renderNpcLine(engine.currentNode(), { animateIn: false });
    });
  }

  function renderRelationship() {
    const npc = getCharacter(scenario.npcIds[0]);
    const val = storyStore.relationship(npc.id);
    const tier = relationshipTier(val);
    els.rel.innerHTML = `<span class="rel-chip">💛 ${esc(npc.name)}: <b>${tier.labelTr}</b></span>`;
  }

  // ---------------- reward + achievement toasts ----------------
  function flashReward(xp) {
    const t = document.createElement('div');
    t.className = 'reward-pop';
    t.textContent = `+${xp} XP`;
    els.toast.appendChild(t);
    setTimeout(() => t.remove(), 1400);
  }
  function flushAchievements() {
    const newly = storyStore.drainNewAchievements();
    newly.forEach((id, i) => {
      const a = ACHIEVEMENTS.find(x => x.id === id);
      if (!a) return;
      setTimeout(() => {
        const t = document.createElement('div');
        t.className = 'achv-toast';
        t.innerHTML = `<span>${a.icon}</span> <b>${esc(a.label)}</b> açıldı!`;
        els.toast.appendChild(t);
        setTimeout(() => t.remove(), 3000);
      }, i * 400);
    });
  }

  // ---------------- word glossary popup ----------------
  function showWordPopup(raw) {
    const w = lookupWord(raw);
    const modal = document.createElement('div');
    modal.className = 'story-modal';
    modal.innerHTML = `
      <div class="word-card" role="dialog" aria-label="Word: ${esc(w.word)}">
        <div class="word-head">
          <h3>${esc(w.word)}</h3>
          <button class="ico-btn" data-act="say">🔊</button>
        </div>
        ${w.ipa ? `<div class="word-ipa">${esc(w.ipa)} ${w.type ? `· <i>${esc(w.type)}</i>` : ''}</div>` : ''}
        ${w.tr ? `<div class="word-tr"><b>TR:</b> ${esc(w.tr)}</div>` : `<div class="word-tr">Bu kelime için sözlük kaydı yok.</div>`}
        ${w.definition ? `<div class="word-def">${esc(w.definition)}</div>` : ''}
        ${w.example ? `<div class="word-ex">“${esc(w.example)}”${w.exampleTr ? `<br><span>${esc(w.exampleTr)}</span>` : ''}</div>` : ''}
        ${w.related ? `<div class="word-rel">İlgili: ${w.related.map(r => esc(r)).join(', ')}</div>` : ''}
        <button class="btn small" data-act="close">Kapat</button>
      </div>`;
    modal.addEventListener('click', (e) => { if (e.target === modal) modal.remove(); });
    modal.querySelector('[data-act="close"]').onclick = () => modal.remove();
    modal.querySelector('[data-act="say"]').onclick = () => { stopTTS(); ttsHandle = tts.speak(w.word, { accent: 'american' }); };
    container.appendChild(modal);
  }

  // ---------------- boot ----------------
  engine.advanceToStart();
  renderNpcLine(engine.currentNode());

  // cleanup on route change
  return () => {
    destroyed = true;
    container.removeEventListener('click', wordTapHandler);
    cleanupRecording();
    stopTTS();
    try { provider.removeAllListeners && provider.removeAllListeners(); } catch {}
    container.querySelectorAll('.story-modal').forEach(m => m.remove());
  };
}

function shellHTML(scenario) {
  return `
    <div class="conversation">
      <div class="conv-scene-holder"></div>
      <header class="conv-topbar">
        <button class="conv-exit" onclick="location.hash='#/story'" aria-label="Exit">‹</button>
        <div class="conv-goal">
          <span class="conv-scenario-title">${esc(scenario.title)}</span>
          <span class="conv-goal-tr">🎯 ${esc(scenario.goalTr)}</span>
        </div>
        <span class="conv-level lvl-${scenario.level}">${scenario.level}</span>
      </header>
      <div class="conv-rel"></div>
      <div class="conv-actors">
        <div class="actor npc-slot"></div>
        <div class="actor player-slot">
          <div class="avatar-holder">${renderAvatar('guest_neutral', { emotion: 'friendly', size: 96, flip: true })}</div>
          <div class="char-name-tag you">You · Sen</div>
        </div>
      </div>
      <div class="npc-bubble"></div>
      <div class="conv-stage"></div>
      <div class="conv-timeline"></div>
      <div class="conv-toast" aria-live="polite"></div>
    </div>`;
}
