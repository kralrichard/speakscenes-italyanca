// ============================================================================
// Speech recognition service — locale comes from langConfig (LOCALE), so this
// clone listens in the target language, not English. Otherwise identical to
// the original: native SpeechRecognition wrapper + honest typed fallback.
//
// Events:
//   'state'  -> 'listening' | 'analyzing' | 'no-speech'
//   'result' -> { transcript, confidence, timing:{durationMs, pauseGapsMs} }
//   'error'  -> { code, message }
//   'idle'   -> session ended without a result
// ============================================================================

import { LOCALE } from '../data/shorts/langConfig.js';

const NativeSpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition || null;

export function isNativeSpeechSupported() {
  return !!NativeSpeechRecognition && window.isSecureContext !== false;
}

class EventedProvider {
  constructor() { this._listeners = {}; }
  on(event, fn) {
    (this._listeners[event] ||= []).push(fn);
    return () => { this._listeners[event] = (this._listeners[event] || []).filter(f => f !== fn); };
  }
  emit(event, payload) {
    for (const fn of this._listeners[event] || []) fn(payload);
  }
  removeAllListeners() { this._listeners = {}; }
}

export class NativeSpeechProvider extends EventedProvider {
  constructor() {
    super();
    this.recognition = null;
    this.active = false;
    this._gotResult = false;
    this.kind = 'native-asr';
  }

  start() {
    if (!NativeSpeechRecognition) {
      this.emit('error', { code: 'unsupported', message: 'Speech recognition is not supported in this browser.' });
      return;
    }
    if (this.active) this.abort();

    const rec = new NativeSpeechRecognition();
    rec.lang = LOCALE;
    rec.continuous = false;
    rec.interimResults = true;
    rec.maxAlternatives = 3;

    const startTime = Date.now();
    let lastEventTime = startTime;
    const pauseGaps = [];

    this.recognition = rec;
    this.active = true;
    this._gotResult = false;

    rec.onstart = () => this.emit('state', 'listening');

    rec.onresult = (event) => {
      const now = Date.now();
      const gap = now - lastEventTime;
      if (gap > 450) pauseGaps.push(gap);
      lastEventTime = now;

      const result = event.results[event.results.length - 1];
      if (result.isFinal && !this._gotResult) {
        this._gotResult = true;
        const alt = result[0];
        this.emit('state', 'analyzing');
        this.emit('result', {
          transcript: alt.transcript || '',
          confidence: typeof alt.confidence === 'number' ? alt.confidence : null,
          timing: { durationMs: now - startTime, pauseGapsMs: pauseGaps }
        });
      }
    };

    rec.onerror = (event) => {
      this.active = false;
      if (event.error === 'no-speech') {
        this.emit('state', 'no-speech');
      } else if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        this.emit('error', { code: 'permission-denied', message: 'Microphone permission was denied.' });
      } else if (event.error === 'network') {
        this.emit('error', { code: 'network', message: 'The speech service could not be reached. Check your connection.' });
      } else if (event.error === 'aborted') {
        this.emit('error', { code: 'aborted', message: 'Recording was cancelled.' });
      } else {
        this.emit('error', { code: 'unknown', message: `Recognition error: ${event.error}` });
      }
    };

    rec.onend = () => {
      this.active = false;
      this.recognition = null;
      if (!this._gotResult) this.emit('idle');
    };

    try {
      rec.start();
    } catch {
      this.active = false;
      this.emit('error', { code: 'unknown', message: 'Could not start the microphone.' });
    }
  }

  stop()  { if (this.recognition) try { this.recognition.stop(); } catch {} }
  abort() {
    if (this.recognition) {
      const rec = this.recognition;
      rec.onerror = null; rec.onresult = null;
      rec.onend = () => { this.active = false; };
      try { rec.abort(); } catch {}
      this.recognition = null;
      this.active = false;
    }
  }
}

export class TypedFallbackProvider extends EventedProvider {
  constructor() {
    super();
    this.kind = 'typed-fallback';
    this.active = false;
  }
  start() {
    this.active = true;
    this.emit('state', 'listening');
  }
  submitText(text) {
    if (!this.active) return;
    this.active = false;
    this.emit('state', 'analyzing');
    setTimeout(() => {
      this.emit('result', { transcript: text || '', confidence: null, timing: null });
    }, 200);
  }
  stop()  { this.active = false; }
  abort() { this.active = false; }
}

export function createSpeechProvider() {
  return isNativeSpeechSupported() ? new NativeSpeechProvider() : new TypedFallbackProvider();
}
