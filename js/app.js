// Application bootstrap — full Italian edition of SpeakScenes.
//
// Same shell as the English original: world map with the growing avatar, the
// Shorts feed, turn-by-turn spoken dialogues, spaced-repetition review, and a
// progress dashboard. Content (dialogues, sentence bank) is authored in
// Italian; the engine — speech recognition, the meaning-based scorer, TTS,
// growth, avatar, coins — is the original one, running at it-IT.

import { registerRoute, startRouter } from './ui/router.js?v=5';
import { renderShorts } from './ui/screens/shortsScreen.js?v=5';
import { renderWorldShorts } from './ui/screens/worldShortsScreen.js?v=5';
import { renderCharacterLite } from './ui/screens/characterLiteScreen.js?v=5';
import { renderPicker } from './ui/screens/pickerScreen.js?v=5';
import { renderDialogue } from './ui/screens/dialogueScreen.js?v=5';
import { renderReview } from './ui/screens/reviewScreen.js?v=5';
import { renderProgress } from './ui/screens/progressScreen.js?v=5';
import { renderSettings } from './ui/screens/settingsScreen.js?v=5';
import { settings } from './progress/settingsStore.js?v=5';
import { shortsCount } from './data/shorts/sentenceBank.js?v=5';
import { APP_LANG, LOCALE } from './data/shorts/langConfig.js?v=5';

async function boot() {
  const screen = document.getElementById('screen');

  // Load + validate the dialogue library. createDialogue() throws on malformed
  // content, so a bad file fails loudly here with the offending dialogue id --
  // it can never half-render inside a lesson.
  let dialogueCount = 0;
  try {
    const mod = await import('./data/dialogues/index.js?v=5');
    dialogueCount = mod.ALL_DIALOGUES.length;
    if (!dialogueCount) throw new Error('Nessun dialogo registrato.');
  } catch (e) {
    screen.innerHTML = `
      <div class="boot-error" role="alert">
        <h2>İçerik yüklenemedi</h2>
        <p style="color:var(--text-dim);margin:0.6rem 0">${String(e.message || e)}</p>
        <p style="color:var(--text-faint);font-size:0.85rem">Yukarıda adı geçen diyalog dosyasını düzeltip sayfayı yenileyin.</p>
      </div>`;
    console.error(e);
    return;
  }

  // Persisted accessibility settings before first paint.
  document.documentElement.dataset.textsize = settings.get('textSize');
  document.documentElement.dataset.reducedMotion = String(settings.get('reducedMotion'));

  document.getElementById('bottom-nav').innerHTML = `
    <a href="#/" data-nav="home"><span class="nav-ico">🗺️</span>Dünya</a>
    <a href="#/shorts" data-nav="shorts"><span class="nav-ico">📱</span>Shorts</a>
    <a href="#/practice" data-nav="practice"><span class="nav-ico">🎙️</span>Diyalog</a>
    <a href="#/review" data-nav="review"><span class="nav-ico">🔁</span>Tekrar</a>
    <a href="#/progress" data-nav="progress"><span class="nav-ico">📈</span>İlerleme</a>`;

  registerRoute('', renderWorldShorts);
  registerRoute('shorts', renderShorts);
  registerRoute('character', renderCharacterLite);
  registerRoute('practice', renderPicker);
  registerRoute('dialogue/:id', renderDialogue);
  registerRoute('review', renderReview);
  registerRoute('progress', renderProgress);
  registerRoute('settings', renderSettings);

  // Warm up the speech-synthesis voice list (Chrome loads it async).
  if ('speechSynthesis' in window) window.speechSynthesis.getVoices();

  console.info(`SpeakScenes ${APP_LANG} ready — ${dialogueCount} dialoghi, ${shortsCount()} frasi, locale ${LOCALE}.`);
  startRouter();
}

boot();
