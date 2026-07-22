// Persists the active dialogue session so a page refresh resumes at the
// same turn instead of losing progress mid-conversation.
import { loadJSON, saveJSON } from './storage.js?v=5';

const KEY = 'edapp:session:v1';

export const sessionStore = {
  save(engineState) {
    saveJSON(KEY, { ...engineState, savedAt: new Date().toISOString() });
  },
  load() {
    return loadJSON(KEY, null);
  },
  clear() {
    saveJSON(KEY, null);
  }
};
