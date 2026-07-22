// Tiny localStorage wrapper -- guards against private-browsing/quota errors
// so a storage failure never crashes the app, it just silently no-ops.
export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

export function saveJSON(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage unavailable (private mode, quota exceeded) -- progress just
    // won't persist across reloads for this session.
  }
}

export function todayKey(date = new Date()) {
  return date.toISOString().slice(0, 10);
}
