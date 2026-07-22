// Application bootstrap — Shorts-focused language clone. The whole app IS the
// Shorts feed: swipe up, the sentence gets harder, the avatar grows A0 -> C2.
// The English original's dialogue/story screens are not registered here (their
// content is English-only); the shared engine files remain in the repo so the
// speech/scoring/growth systems run unchanged.

import { registerRoute, startRouter } from './ui/router.js';
import { renderShorts } from './ui/screens/shortsScreen.js';
import { settings } from './progress/settingsStore.js';
import { shortsCount } from './data/shorts/sentenceBank.js';
import { APP_LANG, LOCALE } from './data/shorts/langConfig.js';

function boot() {
  // Persisted accessibility settings before first paint.
  document.documentElement.dataset.textsize = settings.get('textSize');
  document.documentElement.dataset.reducedMotion = String(settings.get('reducedMotion'));

  // Single-screen app: no bottom navigation, and the Shorts back-arrow (which
  // would lead to the world map in the original) is hidden via CSS.
  const nav = document.getElementById('bottom-nav');
  if (nav) nav.style.display = 'none';
  const style = document.createElement('style');
  style.textContent = '.shorts-exit{display:none} .shorts{--nav-h:0px}';
  document.head.appendChild(style);

  registerRoute('', renderShorts);
  registerRoute('shorts', renderShorts);

  if ('speechSynthesis' in window) window.speechSynthesis.getVoices();

  console.info(`SpeakScenes ${APP_LANG} ready — ${shortsCount()} sentences, ASR/TTS locale ${LOCALE}.`);
  startRouter();
}

boot();
