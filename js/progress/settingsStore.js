import { loadJSON, saveJSON } from './storage.js?v=6';

const KEY = 'edapp:settings:v1';

const DEFAULTS = {
  strictness: null,          // null = use the level's default
  showTranslations: true,
  autoplayCharacter: true,   // speak the character's line automatically
  preferredAccent: null,     // null = use the dialogue's authored accent
  textSize: 'normal',        // 'normal' | 'large'
  reducedMotion: false,
  showGrammarByDefault: false,
  speechRate: 1,             // multiplier on the level's base TTS rate
  volume: 1                  // 0..1 TTS volume

};

class SettingsStore {
  constructor() {
    this.state = { ...DEFAULTS, ...loadJSON(KEY, {}) };
  }
  get(key) { return this.state[key]; }
  set(key, value) {
    this.state[key] = value;
    saveJSON(KEY, this.state);
  }
  getAll() { return { ...this.state }; }
}

export const settings = new SettingsStore();
