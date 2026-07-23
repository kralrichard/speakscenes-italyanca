// Text-to-speech wrapper around the browser's SpeechSynthesis API. Real (not
// mocked) wherever the browser provides voices; degrades to silent captions
// if speechSynthesis is unavailable (isSupported() lets the UI know so it
// can rely on the on-screen text instead of audio).

// Locale-driven: every voice request resolves to the clone's target language.
import { LOCALE } from '../data/shorts/langConfig.js?v=6';

export function isTTSSupported() {
  return 'speechSynthesis' in window;
}

class TTSService {
  constructor() {
    this.voices = [];
    if (isTTSSupported()) {
      this._refreshVoices();
      window.speechSynthesis.onvoiceschanged = () => this._refreshVoices();
    }
  }

  _refreshVoices() {
    this.voices = window.speechSynthesis.getVoices() || [];
  }

  pickVoice(accent = 'american', gender = 'neutral') {
    const lang = LOCALE;
    const candidates = this.voices.filter(v => v.lang && v.lang.toLowerCase().startsWith(lang.slice(0, 2)));
    const langMatch = candidates.filter(v => v.lang.toLowerCase() === lang.toLowerCase());
    const pool = langMatch.length ? langMatch : candidates.length ? candidates : this.voices;
    if (!pool.length) return null;
    if (gender !== 'neutral') {
      const genderMatch = pool.find(v => v.name.toLowerCase().includes(gender));
      if (genderMatch) return genderMatch;
    }
    return pool[0] || null;
  }

  /** @param {object} opts { accent, gender, rate (0.5-1.5), onStart, onEnd, onBoundary(charIndex), onError } */
  speak(text, opts = {}) {
    if (!isTTSSupported()) {
      // No audio possible -- fire the callbacks anyway on a short timer so
      // the dialogue engine still advances and the on-screen text serves as
      // the sole "speaking" cue.
      opts.onStart && opts.onStart();
      setTimeout(() => opts.onEnd && opts.onEnd(), 900);
      return { cancel() {} };
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voice = this.pickVoice(opts.accent, opts.gender);
    if (voice) utter.voice = voice;
    utter.lang = LOCALE;
    utter.rate = Math.min(2, Math.max(0.4, opts.rate || 1));
    utter.pitch = 1;
    utter.volume = typeof opts.volume === 'number' ? opts.volume : 1;

    // Watchdog: some environments report TTS support but never fire onend
    // (no installed voices, muted synth). The dialogue flow must never hang
    // on a missing callback, so if neither onend nor onerror arrives within
    // a generous text-length-based window, we treat the line as finished.
    let settled = false;
    const settle = (cb) => {
      if (settled) return;
      settled = true;
      clearTimeout(watchdog);
      cb && cb();
    };
    const maxMs = Math.min(30000, 4000 + text.length * 200 / (utter.rate || 1));
    const watchdog = setTimeout(() => settle(opts.onEnd), maxMs);

    utter.onstart = () => opts.onStart && opts.onStart();
    utter.onend = () => settle(opts.onEnd);
    utter.onerror = () => settle(opts.onError || opts.onEnd);
    utter.onboundary = (e) => opts.onBoundary && opts.onBoundary(e.charIndex, e.name);

    window.speechSynthesis.speak(utter);
    return { cancel: () => { settled = true; clearTimeout(watchdog); window.speechSynthesis.cancel(); } };
  }

  speakSlow(text, opts = {}) {
    return this.speak(text, { ...opts, rate: (opts.rate || 1) * 0.55 });
  }

  /** Speaks each word with a short pause after it, calling onWordStart(i, word)
   *  for each -- used by the "listen word by word" control. */
  speakWordByWord(text, opts = {}) {
    const words = text.split(/\s+/).filter(Boolean);
    let cancelled = false;
    const step = (i) => {
      if (cancelled || i >= words.length) {
        opts.onEnd && opts.onEnd();
        return;
      }
      opts.onWordStart && opts.onWordStart(i, words[i]);
      this.speak(words[i], {
        ...opts,
        rate: (opts.rate || 1) * 0.85,
        onEnd: () => setTimeout(() => step(i + 1), 320),
        onStart: undefined
      });
    };
    step(0);
    return { cancel: () => { cancelled = true; window.speechSynthesis && window.speechSynthesis.cancel(); } };
  }

  stop() {
    if (isTTSSupported()) window.speechSynthesis.cancel();
  }
}

export const tts = new TTSService();
