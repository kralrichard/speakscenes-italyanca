// Application bootstrap — language clone with the same shell as the original
// SpeakScenes: bottom navigation, a world-map landing screen with the growing
// avatar, a character screen with full customization, and the Shorts feed.
// The English original's dialogue/story screens are not registered (their
// authored content is English-only); everything else — speech scoring, TTS,
// growth, avatar, coins — is the same engine running in the target language.

import { registerRoute, startRouter } from './ui/router.js?v=5';
import { renderShorts } from './ui/screens/shortsScreen.js?v=5';
import { renderWorldShorts } from './ui/screens/worldShortsScreen.js?v=5';
import { renderCharacterLite } from './ui/screens/characterLiteScreen.js?v=5';
import { settings } from './progress/settingsStore.js?v=5';
import { shortsCount } from './data/shorts/sentenceBank.js?v=5';
import { APP_LANG, LOCALE } from './data/shorts/langConfig.js?v=5';

function boot() {
  // Persisted accessibility settings before first paint.
  document.documentElement.dataset.textsize = settings.get('textSize');
  document.documentElement.dataset.reducedMotion = String(settings.get('reducedMotion'));

  // Bottom navigation — same pattern as the original (world map is home).
  document.getElementById('bottom-nav').innerHTML = `
    <a href="#/" data-nav="home"><span class="nav-ico">🗺️</span>Dünya</a>
    <a href="#/shorts" data-nav="shorts"><span class="nav-ico">📱</span>Shorts</a>
    <a href="#/character" data-nav="character"><span class="nav-ico">👤</span>Karakter</a>`;

  registerRoute('', renderWorldShorts);
  registerRoute('shorts', renderShorts);
  registerRoute('character', renderCharacterLite);

  if ('speechSynthesis' in window) window.speechSynthesis.getVoices();

  console.info(`SpeakScenes ${APP_LANG} ready — ${shortsCount()} sentences, ASR/TTS locale ${LOCALE}.`);
  startRouter();
}

boot();
