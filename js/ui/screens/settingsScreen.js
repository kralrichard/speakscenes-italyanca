import { settings } from '../../progress/settingsStore.js?v=5';
import { STRICTNESS_LEVELS } from '../../data/levels.js?v=5';
import { tts, isTTSSupported } from '../../speech/tts.js?v=5';
import { isNativeSpeechSupported } from '../../speech/speechRecognizer.js?v=5';
import { downloadExport, parseImportText, applyImport } from '../../progress/exportImport.js?v=5';

const ACCENTS = [
  [null, 'Match each dialogue (default)'], ['american', 'American'], ['british', 'British'],
  ['australian', 'Australian'], ['canadian', 'Canadian'], ['irish', 'Irish'],
  ['scottish', 'Scottish'], ['indian', 'Indian'], ['international', 'International']
];

function toggleRow(id, label, desc, checked) {
  return `
    <div class="setting-row">
      <div class="grow"><div class="sr-label">${label}</div><div class="sr-desc">${desc}</div></div>
      <label class="toggle"><input type="checkbox" id="${id}" ${checked ? 'checked' : ''}><span class="knob"></span></label>
    </div>`;
}

export function renderSettings(container) {
  const s = settings;

  container.innerHTML = `
    <h1 class="screen-title">⚙️ Settings</h1>

    <div class="section-label">Speech checking</div>
    <div class="card">
      <div class="setting-row">
        <div class="grow">
          <div class="sr-label">Strictness</div>
          <div class="sr-desc">How exact your spoken sentence must be. "Default" uses each level's recommended setting.</div>
        </div>
        <select class="select" id="set-strictness">
          <option value="">Default (per level)</option>
          ${STRICTNESS_LEVELS.map(x => `<option value="${x.id}" ${s.get('strictness') === x.id ? 'selected' : ''}>${x.name}</option>`).join('')}
        </select>
      </div>
      <div id="strictness-desc" style="font-size:0.8rem;color:var(--text-faint);padding-top:0.3rem"></div>
    </div>

    <div class="section-label">Voice & audio</div>
    <div class="card">
      <div class="setting-row">
        <div class="grow"><div class="sr-label">Accent</div><div class="sr-desc">Voice accent for the app character (uses your browser's installed voices).</div></div>
        <select class="select" id="set-accent">
          ${ACCENTS.map(([v, l]) => `<option value="${v ?? ''}" ${s.get('preferredAccent') === v ? 'selected' : ''}>${l}</option>`).join('')}
        </select>
      </div>
      <div class="setting-row">
        <div class="grow"><div class="sr-label">Speaking speed</div><div class="sr-desc">Multiplies each level's natural speed.</div></div>
        <select class="select" id="set-rate">
          ${[[0.75, 'Slower'], [1, 'Normal'], [1.25, 'Faster']].map(([v, l]) => `<option value="${v}" ${s.get('speechRate') === v ? 'selected' : ''}>${l}</option>`).join('')}
        </select>
      </div>
      <div class="setting-row">
        <div class="grow"><div class="sr-label">Volume</div><div class="sr-desc">Character voice volume.</div></div>
        <input type="range" id="set-volume" min="0" max="1" step="0.1" value="${s.get('volume')}" style="width:130px">
      </div>
      ${toggleRow('set-autoplay', 'Autoplay character voice', 'Speak each line automatically when it appears.', s.get('autoplayCharacter'))}
      <div class="setting-row">
        <div class="grow"><div class="sr-label">Test voice</div><div class="sr-desc">Play a sample with the current settings.</div></div>
        <button class="btn small secondary" id="btn-test-voice">▶ Test</button>
      </div>
    </div>

    <div class="section-label">Learning aids</div>
    <div class="card">
      ${toggleRow('set-translations', 'Turkish translations', 'Türkçeyi göster translations under sentences. Hide for immersion.', s.get('showTranslations'))}
      ${toggleRow('set-grammar', 'Gramer panel open by default', 'Automatically show word-by-word grammar for each sentence.', s.get('showGramerByDefault'))}
    </div>

    <div class="section-label">Accessibility</div>
    <div class="card">
      ${toggleRow('set-textsize', 'Larger text', 'Increase text size across the app.', s.get('textSize') === 'large')}
      ${toggleRow('set-motion', 'Reduce motion', 'Turn off scene and character animations.', s.get('reducedMotion'))}
    </div>

    <div class="section-label">System status</div>
    <div class="card">
      <div class="setting-row">
        <div class="grow"><div class="sr-label">Speech recognition</div>
          <div class="sr-desc">${isNativeSpeechSupported()
            ? '✅ Available (browser speech recognition). For phoneme-level pronunciation scoring, a cloud pronunciation API can be connected — see README.'
            : '❌ Not available in this browser. Chrome or Edge recommended. Typed practice mode will be used.'}</div>
        </div>
      </div>
      <div class="setting-row">
        <div class="grow"><div class="sr-label">Text-to-speech</div>
          <div class="sr-desc">${isTTSSupported() ? `✅ Available (${(window.speechSynthesis.getVoices() || []).filter(v => v.lang.startsWith('en')).length} English voices installed)` : '❌ Not available in this browser.'}</div>
        </div>
      </div>
    </div>

    <div class="section-label">Data</div>
    <div class="card">
      <div class="setting-row">
        <div class="grow"><div class="sr-label">Export progress</div><div class="sr-desc">Download everything (dialogues, review queue, world/character, settings) as one JSON file.</div></div>
        <button class="btn small secondary" id="btn-export">Export</button>
      </div>
      <div class="setting-row">
        <div class="grow"><div class="sr-label">Import progress</div><div class="sr-desc">Restore from a previously exported file. Replaces current data on this device.</div></div>
        <button class="btn small secondary" id="btn-import">Import</button>
      </div>
      <input type="file" id="import-file" accept="application/json" style="display:none">
      <div id="import-msg" style="font-size:0.8rem;margin-top:0.4rem"></div>
      <div class="setting-row">
        <div class="grow"><div class="sr-label">Reset all data</div><div class="sr-desc">Deletes progress, review queue, world/character and settings on this device.</div></div>
        <button class="btn small danger" id="btn-reset">Reset</button>
      </div>
    </div>
  `;

  const strictnessDesc = container.querySelector('#strictness-desc');
  const updateStrictnessDesc = () => {
    const v = container.querySelector('#set-strictness').value;
    const item = STRICTNESS_LEVELS.find(x => x.id === v);
    strictnessDesc.textContent = item ? item.desc : 'Each CEFR level uses a sensible default: relaxed for A1–A2, normal for B1–B2, strict for C1–C2.';
  };
  updateStrictnessDesc();

  container.querySelector('#set-strictness').addEventListener('change', (e) => {
    settings.set('strictness', e.target.value || null);
    updateStrictnessDesc();
  });
  container.querySelector('#set-accent').addEventListener('change', (e) => settings.set('preferredAccent', e.target.value || null));
  container.querySelector('#set-rate').addEventListener('change', (e) => settings.set('speechRate', parseFloat(e.target.value)));
  container.querySelector('#set-volume').addEventListener('input', (e) => settings.set('volume', parseFloat(e.target.value)));
  container.querySelector('#set-autoplay').addEventListener('change', (e) => settings.set('autoplayCharacter', e.target.checked));
  container.querySelector('#set-translations').addEventListener('change', (e) => settings.set('showTranslations', e.target.checked));
  container.querySelector('#set-grammar').addEventListener('change', (e) => settings.set('showGramerByDefault', e.target.checked));
  container.querySelector('#set-textsize').addEventListener('change', (e) => {
    settings.set('textSize', e.target.checked ? 'large' : 'normal');
    document.documentElement.dataset.textsize = settings.get('textSize');
  });
  container.querySelector('#set-motion').addEventListener('change', (e) => {
    settings.set('reducedMotion', e.target.checked);
    document.documentElement.dataset.reducedMotion = String(e.target.checked);
  });
  container.querySelector('#btn-test-voice').addEventListener('click', () => {
    tts.stop();
    tts.speak('Hello! This is how I will sound in your dialogues.', {
      accent: settings.get('preferredAccent') || 'american',
      rate: settings.get('speechRate'),
      volume: settings.get('volume')
    });
  });
  container.querySelector('#btn-export').addEventListener('click', () => downloadExport());
  container.querySelector('#btn-import').addEventListener('click', () => container.querySelector('#import-file').click());
  container.querySelector('#import-file').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const msg = container.querySelector('#import-msg');
    file.text().then(text => {
      const parsed = parseImportText(text);
      if (!confirm('Import this file? It will replace your current progress on this device.')) return;
      applyImport(parsed);
      location.reload();
    }).catch(err => {
      msg.style.color = 'var(--red)';
      msg.textContent = err.message || 'Import failed.';
    });
  });
  container.querySelector('#btn-reset').addEventListener('click', () => {
    if (confirm('Delete ALL progress, review items, world/character and settings on this device? This cannot be undone.')) {
      ['edapp:progress:v1', 'edapp:review:v1', 'edapp:settings:v1', 'edapp:session:v1', 'edapp:world:v1'].forEach(k => {
        try { localStorage.removeItem(k); } catch {}
      });
      location.reload();
    }
  });

  return () => tts.stop();
}
