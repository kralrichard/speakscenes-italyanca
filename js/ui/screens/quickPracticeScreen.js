// ============================================================================
// Quick Practice — speak (or type) any of 200+ situational phrases and get the
// same meaning-based scoring as Story Mode. Reuses the speech recognizer,
// scorer, and TTS unchanged. Content lives entirely in the phrasebook data
// file, so this screen never changes when phrases are added.
//
// Routes:
//   #/practice-phrases            -> place picker (grid of places + counts)
//   #/practice-phrases/:placeId   -> list of that place's phrases + speak stage
// ============================================================================

import { PHRASEBOOK, PHRASE_PLACES, phrasesForPlace, PHRASEBOOK_COUNT } from '../../data/branching/phrasebook.js';
import { createSpeechProvider, isNativeSpeechSupported } from '../../speech/speechRecognizer.js';
import { scoreAttempt } from '../../speech/scorer.js';
import { tts } from '../../speech/tts.js';
import { storyStore } from '../../progress/storyStore.js';
import { navigate } from '../router.js';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const DONE_KEY = 'edapp:story:phrasesDone';
function loadDone() { try { return new Set(JSON.parse(localStorage.getItem(DONE_KEY) || '[]')); } catch { return new Set(); } }
function saveDone(set) { try { localStorage.setItem(DONE_KEY, JSON.stringify([...set])); } catch {} }

// ---- place picker ----
export function renderPhrasePlaces(container) {
  const done = loadDone();
  const cards = Object.entries(PHRASE_PLACES).map(([id, meta]) => {
    const all = phrasesForPlace(id);
    if (!all.length) return '';
    const doneCount = all.filter(p => done.has(p.id)).length;
    const pct = Math.round(doneCount / all.length * 100);
    return `
      <button class="phrase-place" data-place="${id}">
        <span class="pp-ico">${meta.icon}</span>
        <span class="pp-label">${esc(meta.label)}<span>${esc(meta.labelTr)}</span></span>
        <span class="pp-count">${doneCount}/${all.length}</span>
        <span class="pp-bar"><span style="width:${pct}%"></span></span>
      </button>`;
  }).join('');

  container.innerHTML = `
    <div class="quick-practice screen-pad">
      <header class="qp-head">
        <button class="conv-exit" onclick="location.hash='#/story'" aria-label="Back">‹</button>
        <div>
          <h1>⚡ Hızlı Pratik</h1>
          <p class="qp-sub">${PHRASEBOOK_COUNT}+ gerçek cümle · <b>Bir yer seç, konuşarak pratik yap</b></p>
        </div>
      </header>
      <div class="phrase-place-grid">${cards}</div>
    </div>`;

  container.querySelectorAll('[data-place]').forEach(b =>
    b.addEventListener('click', () => navigate(`practice-phrases/${b.dataset.place}`)));
  return () => {};
}

// ---- phrase list + speaking stage for one place ----
export function renderPhraseList(container, params) {
  const placeId = params.placeId;
  const meta = PHRASE_PLACES[placeId];
  const phrases = phrasesForPlace(placeId);
  if (!meta || !phrases.length) { navigate('practice-phrases'); return () => {}; }

  const provider = createSpeechProvider();
  const usingTyped = !isNativeSpeechSupported();
  let done = loadDone();
  let ttsHandle = null;
  let recording = false;
  let recordTimeout = null;
  let providerOffs = [];
  let destroyed = false;

  // group phrases by topic for display
  const byTopic = {};
  for (const p of phrases) (byTopic[p.topic] ||= []).push(p);

  function stopTTS() { if (ttsHandle) { try { ttsHandle.cancel(); } catch {} ttsHandle = null; } tts.stop(); }

  function renderList() {
    const groups = Object.entries(byTopic).map(([topic, list]) => `
      <div class="phrase-topic">
        <h3 class="pt-title">${esc(topic)}</h3>
        <ul class="phrase-items">
          ${list.map(p => `
            <li class="phrase-item ${done.has(p.id) ? 'done' : ''}" data-id="${p.id}">
              <span class="pi-level lvl-${p.level}">${p.level}</span>
              <span class="pi-en">${esc(p.en)}</span>
              <span class="pi-tr">${esc(p.tr)}</span>
              <span class="pi-go">🎙️</span>
            </li>`).join('')}
        </ul>
      </div>`).join('');

    container.innerHTML = `
      <div class="quick-practice screen-pad">
        <header class="qp-head">
          <button class="conv-exit" onclick="location.hash='#/practice-phrases'" aria-label="Back">‹</button>
          <div>
            <h1>${meta.icon} ${esc(meta.label)}</h1>
            <p class="qp-sub">${phrases.length} cümle · ${done.size ? [...done].filter(id => phrases.some(p => p.id === id)).length : 0} tamamlandı</p>
          </div>
        </header>
        ${groups}
      </div>`;

    container.querySelectorAll('[data-id]').forEach(li =>
      li.addEventListener('click', () => openStage(phrases.find(p => p.id === li.dataset.id))));
  }

  function openStage(phrase) {
    stopTTS();
    const overlay = document.createElement('div');
    overlay.className = 'story-modal phrase-stage-modal';
    overlay.innerHTML = `
      <div class="phrase-stage" role="dialog" aria-label="Practice phrase">
        <button class="ps-close" aria-label="Close">✕</button>
        <span class="pi-level lvl-${phrase.level}">${phrase.level}</span>
        <p class="ps-en">${esc(phrase.en)}</p>
        <p class="ps-tr">${esc(phrase.tr)}</p>
        <div class="ps-audio">
          <button class="ico-btn" data-act="hear">🔊 Dinle</button>
          <button class="ico-btn" data-act="slow">🐢 Yavaş</button>
        </div>
        <div class="ps-mic"><div class="mic-wrap"></div></div>
        <div class="ps-feedback" aria-live="polite"></div>
        <div class="ps-typed ${usingTyped ? '' : 'closed'}">
          ${usingTyped ? '<p class="typed-note">🎤 Mikrofon yok — yazarak pratik yap.</p>' : '<button class="link-btn" data-act="toggle-type">⌨️ Yazarak dene</button>'}
          <div class="typed-input ${usingTyped ? '' : 'hidden'}">
            <input type="text" class="typed-field" placeholder="Type it…" autocomplete="off" />
            <button class="btn small" data-act="check">Check</button>
          </div>
        </div>
      </div>`;
    container.appendChild(overlay);

    const close = () => { cleanupRecording(); stopTTS(); overlay.remove(); };
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    overlay.querySelector('.ps-close').onclick = close;
    overlay.querySelector('[data-act="hear"]').onclick = () => { stopTTS(); ttsHandle = tts.speak(phrase.en, { accent: 'american' }); };
    overlay.querySelector('[data-act="slow"]').onclick = () => { stopTTS(); ttsHandle = tts.speakSlow(phrase.en, { accent: 'american' }); };

    const typeToggle = overlay.querySelector('[data-act="toggle-type"]');
    if (typeToggle) typeToggle.onclick = () => overlay.querySelector('.typed-input').classList.toggle('hidden');
    const field = overlay.querySelector('.typed-field');
    const doTyped = () => { const v = field.value.trim(); if (v) evaluate(phrase, { transcript: v, confidence: null, timing: null }, overlay, null); };
    overlay.querySelector('[data-act="check"]').onclick = doTyped;
    field.addEventListener('keydown', (e) => { if (e.key === 'Enter') doTyped(); });

    import('../components/micButton.js').then(({ createMicButton }) => {
      if (destroyed || !overlay.isConnected) return;
      const micWrap = overlay.querySelector('.mic-wrap');
      const mic = createMicButton(micWrap, { onPress: () => startRecording(phrase, overlay, mic) });
      mic.setState(usingTyped ? 'disabled' : 'ready');
      if (usingTyped) micWrap.querySelector('.mic-hint').textContent = 'Type your answer below.';
    });

    // auto-play the model once
    stopTTS(); ttsHandle = tts.speak(phrase.en, { accent: 'american' });
  }

  function startRecording(phrase, overlay, mic) {
    if (recording) return;
    recording = true;
    mic.setState('listening');
    providerOffs.forEach(o => o()); providerOffs = [];
    providerOffs.push(provider.on('state', s => {
      if (s === 'listening') mic.setState('listening');
      else if (s === 'analyzing') mic.setState('analyzing');
      else if (s === 'no-speech') { cleanupRecording(); mic.setState('retry'); failMsg(overlay, 'Ses algılanmadı. Tekrar dene.'); }
    }));
    providerOffs.push(provider.on('result', r => { clearTimeout(recordTimeout); recording = false; evaluate(phrase, r, overlay, mic); }));
    providerOffs.push(provider.on('error', err => {
      clearTimeout(recordTimeout); recording = false;
      if (err.code === 'permission-denied') { overlay.querySelector('.typed-input')?.classList.remove('hidden'); overlay.querySelector('.typed-field')?.focus(); mic.setState('disabled'); }
      else { mic.setState('retry'); failMsg(overlay, 'Bir sorun oldu. Yazarak deneyebilirsin.'); }
    }));
    providerOffs.push(provider.on('idle', () => { clearTimeout(recordTimeout); if (recording) { recording = false; mic.setState('retry'); failMsg(overlay, 'Ses algılanmadı. Tekrar dene.'); } }));
    provider.start({ accent: 'american' });
    recordTimeout = setTimeout(() => { if (recording) { try { provider.abort(); } catch {} recording = false; mic.setState('retry'); failMsg(overlay, 'Çok uzun sürdü — tekrar dene.'); } }, 12000);
  }

  function cleanupRecording() {
    clearTimeout(recordTimeout); recording = false;
    providerOffs.forEach(o => o()); providerOffs = [];
    try { provider.abort(); } catch {}
  }

  function failMsg(overlay, msg) {
    const fb = overlay.querySelector('.ps-feedback');
    if (fb) fb.innerHTML = `<div class="feedback-panel rejected"><div class="feedback-verdict no">🙉 ${esc(msg)}</div></div>`;
  }

  function evaluate(phrase, res, overlay, mic) {
    const simple = phrase.level === 'A1' || phrase.level === 'A2';
    const score = scoreAttempt({ expected: phrase.en, transcript: res.transcript, confidence: res.confidence, timing: res.timing, strictness: simple ? 'relaxed' : 'normal' });
    const fb = overlay.querySelector('.ps-feedback');
    import('../components/feedbackPanel.js').then(({ renderFeedback }) => {
      if (fb) fb.innerHTML = renderFeedback(score, { transcript: res.transcript, level: phrase.level });
      if (score.accepted) {
        if (mic) mic.setState('correct');
        if (!done.has(phrase.id)) {
          done.add(phrase.id); saveDone(done);
          storyStore.recordSpoken(true);
          storyStore.addCoins(1);
        }
        const badge = document.createElement('div');
        badge.className = 'ps-done-badge';
        badge.textContent = '✅ Harika! (+1 🪙)';
        fb.prepend(badge);
        setTimeout(() => { if (overlay.isConnected) { overlay.remove(); renderList(); } }, 1100);
      } else {
        if (mic) mic.setState('retry');
        storyStore.recordSpoken(false);
      }
    });
  }

  renderList();
  return () => {
    destroyed = true;
    cleanupRecording();
    stopTTS();
    try { provider.removeAllListeners && provider.removeAllListeners(); } catch {}
    container.querySelectorAll('.story-modal').forEach(m => m.remove());
  };
}
