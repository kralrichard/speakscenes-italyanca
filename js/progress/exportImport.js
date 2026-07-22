// Save export/import: bundles every persistent localStorage key into one
// downloadable JSON file, and restores them from a previously exported
// file. Used by settingsScreen.js's Data section.
const KEYS = ['edapp:progress:v1', 'edapp:review:v1', 'edapp:settings:v1', 'edapp:world:v1'];

export function exportProgressBlob() {
  const data = {};
  for (const k of KEYS) {
    try { data[k] = JSON.parse(localStorage.getItem(k)); } catch { data[k] = null; }
  }
  return new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), data }, null, 2)], { type: 'application/json' });
}

export function downloadExport() {
  const blob = exportProgressBlob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `speakscenes-progress-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

/** Parses and validates an exported file's text content. Throws a readable
 *  error on malformed input rather than silently importing garbage. */
export function parseImportText(text) {
  let parsed;
  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error('That file is not valid JSON.');
  }
  if (!parsed || typeof parsed !== 'object' || !parsed.data) {
    throw new Error('That file doesn\'t look like a SpeakScenes progress export.');
  }
  return parsed;
}

/** Writes an already-parsed export's data back into localStorage. Caller is
 *  expected to reload the page afterward so every store re-reads fresh
 *  state (matches the existing "Reset all data" flow in settingsScreen.js). */
export function applyImport(parsed) {
  for (const k of KEYS) {
    if (k in parsed.data && parsed.data[k] != null) {
      localStorage.setItem(k, JSON.stringify(parsed.data[k]));
    }
  }
}
