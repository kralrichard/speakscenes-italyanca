// Microphone control with explicit visual states. The dialogue screen drives
// setState(); the button never invents its own state.
//
// States: ready | listening | analyzing | correct | retry | error | disabled

const STATE_CONFIG = {
  ready:     { icon: '🎙️', cls: '',          hint: 'Mikrofona dokun, sonra cümleyi söyle' },
  listening: { icon: '🔴', cls: 'listening', hint: 'Dinliyor… şimdi konuş' },
  analyzing: { icon: '⏳', cls: 'analyzing', hint: 'Konuşman analiz ediliyor…' },
  correct:   { icon: '✅', cls: 'correct',   hint: 'Doğru! Aferin' },
  retry:     { icon: '🔁', cls: 'retry',     hint: 'Tam olmadı — geri bildirime bak ve tekrar dene' },
  error:     { icon: '⚠️', cls: 'retry',     hint: 'Mikrofon sorunu — yukarıdaki mesaja bak' },
  disabled:  { icon: '🎙️', cls: '',          hint: '' }
};

export function createMicButton(container, { onPress }) {
  container.innerHTML = `
    <button class="mic-button" type="button" aria-label="Start recording"></button>
    <div class="mic-hint" role="status"></div>`;
  const btn = container.querySelector('.mic-button');
  const hint = container.querySelector('.mic-hint');
  let state = 'disabled';
  let pressGuard = 0;

  btn.addEventListener('click', () => {
    // Debounce rapid taps so double-clicks can't start two sessions.
    const now = Date.now();
    if (now - pressGuard < 600) return;
    pressGuard = now;
    if (state === 'ready' || state === 'retry') onPress();
  });

  function setState(next, hintOverride) {
    state = next;
    const cfg = STATE_CONFIG[next] || STATE_CONFIG.ready;
    btn.className = `mic-button ${cfg.cls}`;
    btn.textContent = cfg.icon;
    btn.disabled = next === 'disabled' || next === 'analyzing' || next === 'correct' || next === 'listening';
    btn.setAttribute('aria-label', cfg.hint || 'Microphone');
    hint.textContent = hintOverride !== undefined ? hintOverride : cfg.hint;
  }

  setState('disabled');
  return { setState, getState: () => state };
}
