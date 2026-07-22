// ============================================================================
// Shorts — TikTok-style vertical feed of graded target-language sentences.
//
// Swipe up (or wheel / ArrowDown / the ▲ button) for the next card. Every
// forward swipe grows the pinned avatar from baby (A0) toward confident adult
// (C2); the level-sorted bank makes the sentences harder at exactly that pace.
// Cards can be listened to, slowed down, and spoken aloud — scored by the same
// honest meaning-based scorer as the original SpeakScenes.
//
// `?loc=<id>` (from the world map) filters cards to that location's topics;
// if the current level has no sentences for those topics, the full level
// stream is used instead so the feed never runs dry.
// ============================================================================

import { createSpeechProvider, isNativeSpeechSupported } from '../../speech/speechRecognizer.js?v=5';
import { scoreAttempt } from '../../speech/scorer.js?v=5';
import { tts } from '../../speech/tts.js?v=5';
import { worldStore } from '../../progress/worldStore.js?v=5';
import { shortsStore } from '../../progress/shortsStore.js?v=5';
import { sentencesForLevel, LEVEL_ORDER } from '../../data/shorts/sentenceBank.js?v=5';
import { getShortLocation } from '../../data/shorts/shortsLocations.js?v=5';
import { GROWTH_STAGES, getGrowthStage } from '../../data/worldLevels.js?v=5';
import { renderPlayerAvatar } from '../components/avatarBuilder.js?v=5';
import { renderFeedback } from '../components/feedbackPanel.js?v=5';
import { navigate } from '../router.js?v=5';

function esc(s) { return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c])); }

const LEVEL_LABEL = { A0: 'Baby', A1: 'Young Child', A2: 'Older Child', B1: 'Teen', B2: 'Young Adult', C1: 'Adult', C2: 'Confident' };
const STRICTNESS_BY_LEVEL = { A0: 'relaxed', A1: 'relaxed', A2: 'relaxed', B1: 'normal', B2: 'normal', C1: 'strict', C2: 'strict' };
const GROWTH_THRESHOLDS_LEN = LEVEL_ORDER.length;

export function renderShorts(container, params = {}) {
  const location = getShortLocation(params.loc);
  const provider = createSpeechProvider();
  const usingTyped = !isNativeSpeechSupported();
  let muted = false;
  let ttsHandle = null;
  let recording = false;
  let recordTimeout = null;
  let providerOffs = [];
  let destroyed = false;
  let navLock = false;
  let streak = 0;

  const history = [];   // shorts already shown this session
  let pos = -1;

  container.innerHTML = `
    <div class="shorts" role="region" aria-label="Shorts feed">
      <div class="shorts-hud">
        <button class="shorts-exit" aria-label="Haritaya dön">‹</button>
        <div class="hud-grow">
          <div class="hud-avatar" id="hud-avatar"></div>
          <div class="hud-grow-text">
            <span class="hud-stage" id="hud-stage"></span>
            <span class="hud-next" id="hud-next"></span>
          </div>
        </div>
        <div class="hud-stats">
          <span class="hud-coins" id="hud-coins">🪙 0</span>
          <button class="hud-mute" id="hud-mute" aria-label="Sesi aç/kapat">🔊</button>
        </div>
      </div>

      <div class="shorts-stage" id="shorts-stage"></div>

      <div class="shorts-feedback" id="shorts-feedback" aria-live="polite"></div>

      <div class="shorts-swipe-hint" id="swipe-hint">Yukarı kaydır ▲${location ? ` · ${location.emoji} ${esc(location.label)}` : ' · sıradaki cümle'}</div>
    </div>`;

  const stageEl = container.querySelector('#shorts-stage');
  const fbEl = container.querySelector('#shorts-feedback');
  const hintEl = container.querySelector('#swipe-hint');
  const muteBtn = container.querySelector('#hud-mute');

  container.querySelector('.shorts-exit').addEventListener('click', () => navigate(''));
  muteBtn.addEventListener('click', () => {
    muted = !muted;
    muteBtn.textContent = muted ? '🔇' : '🔊';
    if (muted) stopTTS();
  });

  function stopTTS() { if (ttsHandle) { try { ttsHandle.cancel(); } catch {} ttsHandle = null; } tts.stop(); }

  function currentShort() { return history[pos]; }

  // ---- HUD (growing avatar + progress ring + counters) ----
  function renderHUD(justGrew) {
    const st = worldStore.getState();
    const idx = shortsStore.stageIndex();
    const stage = GROWTH_STAGES[idx];
    const pct = Math.round(shortsStore.stageProgress() * 100);
    container.querySelector('.shorts').style.setProperty('--stage-color', stage.color);
    const av = container.querySelector('#hud-avatar');
    av.style.setProperty('--p', pct);
    av.classList.toggle('grew', !!justGrew);
    av.innerHTML = renderPlayerAvatar(st.avatar, stage.avatarStage, { size: 62, emotion: 'happy' });

    container.querySelector('#hud-stage').textContent = `${stage.name} · ${stage.code}`;
    const toNext = shortsStore.swipesToNextStage();
    container.querySelector('#hud-next').textContent = idx >= GROWTH_THRESHOLDS_LEN - 1
      ? 'En üst seviye! 🌟'
      : `${toNext} kaydırma sonra büyüyecek`;
    container.querySelector('#hud-coins').textContent = `🪙 ${st.coins}`;
    if (justGrew) av.animate?.(
      [{ transform: 'scale(0.7)' }, { transform: 'scale(1.15)' }, { transform: 'scale(1)' }],
      { duration: 650, easing: 'ease-out' });
  }

  // ---- one card ----
  function renderCard(anim = 'in') {
    const s = currentShort();
    if (!s) return;
    const liked = shortsStore.isLiked(s.id);
    stageEl.innerHTML = `
      <article class="short-card ${anim === 'in' ? 'sw-in' : anim === 'back' ? 'sw-back' : ''}">
        <div class="short-body">
          <span class="short-level lvl-${s.level}">${s.level} · ${esc(LEVEL_LABEL[s.level] || '')}</span>
          <p class="short-en">${esc(s.en)}</p>
          <p class="short-tr ${revealTr ? '' : 'hidden'}" id="short-tr">${esc(s.tr)}</p>
          <button class="short-tr-toggle" id="tr-toggle">${revealTr ? 'Çeviriyi gizle' : '👁 Türkçesini gör'}</button>
        </div>
        <div class="short-rail">
          <button class="rail-btn" data-act="hear" aria-label="Listen">🔊<span>Dinle</span></button>
          <button class="rail-btn" data-act="slow" aria-label="Slow">🐢<span>Yavaş</span></button>
          <button class="rail-btn speak ${usingTyped ? 'typed' : ''}" data-act="speak" aria-label="Speak">🎙️<span>${usingTyped ? 'Yaz' : 'Konuş'}</span></button>
          <button class="rail-btn ${liked ? 'liked' : ''}" data-act="like" aria-label="Like">${liked ? '❤️' : '🤍'}<span>Beğen</span></button>
        </div>
      </article>`;

    stageEl.querySelector('#tr-toggle').onclick = () => {
      revealTr = !revealTr;
      const t = stageEl.querySelector('#short-tr');
      t.classList.toggle('hidden', !revealTr);
      stageEl.querySelector('#tr-toggle').textContent = revealTr ? 'Çeviriyi gizle' : '👁 Türkçesini gör';
    };
    stageEl.querySelector('[data-act="hear"]').onclick = () => speak(s.en, false);
    stageEl.querySelector('[data-act="slow"]').onclick = () => speak(s.en, true);
    stageEl.querySelector('[data-act="like"]').onclick = (e) => {
      const on = shortsStore.toggleLike(s.id);
      e.currentTarget.classList.toggle('liked', on);
      e.currentTarget.firstChild.textContent = on ? '❤️' : '🤍';
    };
    stageEl.querySelector('[data-act="speak"]').onclick = () => startSpeaking(s);

    fbEl.innerHTML = '';
    fbEl.classList.remove('open');
    if (!muted) autoPlay(s.en);
  }

  let revealTr = false;

  function autoPlay(text) { stopTTS(); ttsHandle = tts.speak(text, { accent: 'american' }); }
  function speak(text, slow) { stopTTS(); ttsHandle = slow ? tts.speakSlow(text, { accent: 'american' }) : tts.speak(text, { accent: 'american' }); }

  // ---- feed navigation ----
  function pickShort(level, cursor) {
    let list = sentencesForLevel(level);
    if (location && location.topics) {
      const filtered = list.filter(s => location.topics.includes(s.topic));
      if (filtered.length) list = filtered;
    }
    return list[cursor % list.length];
  }

  function pushNew() {
    const level = shortsStore.currentLevel();
    const cursor = shortsStore.nextCursor(level);
    history.push(pickShort(level, cursor));
    pos = history.length - 1;
    renderCard('in');
  }

  function goNext() {
    if (navLock) return;
    lockNav();
    cleanupRecording();
    if (pos < history.length - 1) {
      pos++;
      renderCard('in');
      return;
    }
    const r = shortsStore.recordSwipe();
    if (r.leveledUp) handleLevelUp(r.stageIndex);
    renderHUD(r.leveledUp);
    pushNew();
    hintEl.classList.add('seen');
  }

  function goPrev() {
    if (navLock || pos <= 0) return;
    lockNav();
    cleanupRecording();
    pos--;
    renderCard('back');
  }

  function lockNav() { navLock = true; setTimeout(() => { navLock = false; }, 320); }

  function handleLevelUp(stageIndex) {
    const level = LEVEL_ORDER[stageIndex];
    worldStore.setWorldLevel(level); // keep the rest of the game in sync
    const stage = getGrowthStage(level);
    const toast = document.createElement('div');
    toast.className = 'grow-toast';
    toast.innerHTML = `<span class="gt-emoji">🎉</span> Büyüdün! Artık <b>${esc(stage.name)}</b> (${level})`;
    container.querySelector('.shorts').appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 20);
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 400); }, 2600);
    burst();
  }

  // ---- speaking (real scorer) ----
  function startSpeaking(s) {
    if (recording) return;
    stopTTS();
    if (usingTyped) return openTyped(s);
    recording = true;
    setSpeakState('listening');
    providerOffs.forEach(o => o()); providerOffs = [];
    providerOffs.push(provider.on('state', st => {
      if (st === 'listening') setSpeakState('listening');
      else if (st === 'analyzing') setSpeakState('analyzing');
      else if (st === 'no-speech') { cleanupRecording(); setSpeakState('ready'); failMsg('Ses algılanmadı. Tekrar dene.'); }
    }));
    providerOffs.push(provider.on('result', r => { clearTimeout(recordTimeout); recording = false; evaluate(s, r); }));
    providerOffs.push(provider.on('error', err => {
      clearTimeout(recordTimeout); recording = false; setSpeakState('ready');
      if (err.code === 'permission-denied') openTyped(s, 'Mikrofon reddedildi — yazarak dene.');
      else failMsg('Bir sorun oldu. Yazarak deneyebilirsin.');
    }));
    providerOffs.push(provider.on('idle', () => { clearTimeout(recordTimeout); if (recording) { recording = false; setSpeakState('ready'); failMsg('Ses algılanmadı. Tekrar dene.'); } }));
    provider.start();
    recordTimeout = setTimeout(() => { if (recording) { try { provider.abort(); } catch {} recording = false; setSpeakState('ready'); failMsg('Çok uzun sürdü — tekrar dene.'); } }, 12000);
  }

  function setSpeakState(state) {
    const btn = stageEl.querySelector('[data-act="speak"]');
    if (!btn) return;
    btn.classList.toggle('rec', state === 'listening');
    btn.classList.toggle('busy', state === 'analyzing');
    const label = btn.querySelector('span');
    if (label) label.textContent = state === 'listening' ? 'Dinliyor' : state === 'analyzing' ? '…' : (usingTyped ? 'Yaz' : 'Konuş');
  }

  function evaluate(s, res) {
    const score = scoreAttempt({
      expected: s.en, transcript: res.transcript, confidence: res.confidence,
      timing: res.timing, strictness: STRICTNESS_BY_LEVEL[s.level] || 'normal'
    });
    setSpeakState('ready');
    showFeedback(score, res.transcript, s.level);
    if (score.accepted) {
      streak++;
      worldStore.addCoins(2);
      if (typeof score.overallScore === 'number') worldStore.recordSkillSample(s.level, score.overallScore);
      shortsStore.recordSpoken(true, streak);
      renderHUD(false);
      burst();
      setTimeout(() => { if (!destroyed) goNext(); }, 1300);
    } else {
      streak = 0;
      shortsStore.recordSpoken(false, streak);
    }
  }

  function showFeedback(score, transcript, level) {
    fbEl.innerHTML = `<button class="fb-close" aria-label="Close">✕</button>${renderFeedback(score, { transcript, level })}`;
    fbEl.classList.add('open');
    fbEl.querySelector('.fb-close').onclick = () => { fbEl.classList.remove('open'); fbEl.innerHTML = ''; };
  }

  function failMsg(msg) {
    fbEl.innerHTML = `<button class="fb-close" aria-label="Close">✕</button><div class="feedback-panel rejected"><div class="feedback-verdict no">🙉 ${esc(msg)}</div></div>`;
    fbEl.classList.add('open');
    fbEl.querySelector('.fb-close').onclick = () => { fbEl.classList.remove('open'); fbEl.innerHTML = ''; };
  }

  function openTyped(s, note) {
    fbEl.innerHTML = `
      <button class="fb-close" aria-label="Close">✕</button>
      <div class="typed-box">
        ${note ? `<p class="typed-note">${esc(note)}</p>` : '<p class="typed-note">⌨️ Cümleyi yaz:</p>'}
        <div class="typed-row">
          <input type="text" class="typed-field" placeholder="${esc(s.en)}" autocomplete="off" autocapitalize="off" />
          <button class="btn small" data-act="check">Kontrol</button>
        </div>
      </div>`;
    fbEl.classList.add('open');
    const field = fbEl.querySelector('.typed-field');
    const submit = () => { const v = field.value.trim(); if (v) evaluate(s, { transcript: v, confidence: null, timing: null }); };
    fbEl.querySelector('[data-act="check"]').onclick = submit;
    field.addEventListener('keydown', e => { if (e.key === 'Enter') submit(); });
    fbEl.querySelector('.fb-close').onclick = () => { fbEl.classList.remove('open'); fbEl.innerHTML = ''; };
    setTimeout(() => field.focus(), 50);
  }

  function cleanupRecording() {
    clearTimeout(recordTimeout); recording = false;
    providerOffs.forEach(o => o()); providerOffs = [];
    try { provider.abort(); } catch {}
  }

  // ---- celebratory burst ----
  function burst() {
    const root = container.querySelector('.shorts');
    if (!root) return;
    const layer = document.createElement('div');
    layer.className = 'burst';
    const emojis = ['✨', '🎈', '⭐', '🌟', '💫'];
    for (let i = 0; i < 12; i++) {
      const p = document.createElement('span');
      p.textContent = emojis[i % emojis.length];
      p.style.left = (10 + Math.random() * 80) + '%';
      p.style.animationDelay = (Math.random() * 0.2) + 's';
      p.style.setProperty('--dx', (Math.random() * 120 - 60) + 'px');
      layer.appendChild(p);
    }
    root.appendChild(layer);
    setTimeout(() => layer.remove(), 1400);
  }

  // ---- gestures / keys / wheel ----
  let touchStartY = null, wheelLock = 0;
  const onTouchStart = e => { touchStartY = e.touches[0].clientY; };
  const onTouchEnd = e => {
    if (touchStartY == null) return;
    const dy = e.changedTouches[0].clientY - touchStartY;
    touchStartY = null;
    if (dy < -45) goNext(); else if (dy > 45) goPrev();
  };
  const onWheel = e => {
    const now = Date.now();
    if (now - wheelLock < 400) return;
    if (Math.abs(e.deltaY) < 12) return;
    wheelLock = now;
    if (e.deltaY > 0) goNext(); else goPrev();
  };
  const onKey = e => {
    if (e.key === 'ArrowDown' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); goNext(); }
    else if (e.key === 'ArrowUp' || e.key === 'PageUp') { e.preventDefault(); goPrev(); }
  };
  stageEl.addEventListener('touchstart', onTouchStart, { passive: true });
  stageEl.addEventListener('touchend', onTouchEnd, { passive: true });
  container.querySelector('.shorts').addEventListener('wheel', onWheel, { passive: true });
  window.addEventListener('keydown', onKey);
  hintEl.addEventListener('click', goNext);

  // first card + HUD
  renderHUD(false);
  pushNew();

  return () => {
    destroyed = true;
    cleanupRecording();
    stopTTS();
    try { provider.removeAllListeners && provider.removeAllListeners(); } catch {}
    window.removeEventListener('keydown', onKey);
  };
}
