// Tiny localStorage wrapper -- guards against private-browsing/quota errors
// so a storage failure never crashes the app, it just silently no-ops.
//
// IMPORTANT: every key is prefixed with this clone's APP_KEY. All the
// SpeakScenes apps are hosted under the same origin (kralrichard.github.io),
// so without a namespace they would SHARE localStorage — progress from the
// English app would leak into this clone and the baby would not start at A0.
import { APP_KEY } from '../data/shorts/langConfig.js?v=6';

const ns = (key) => `${APP_KEY}:${key}`;

export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(ns(key));
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(ns(key), JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode, quota exceeded) -- progress just
    // won't persist across reloads for this session.
  }
}

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}
