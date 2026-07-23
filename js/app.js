// Application bootstrap — language clone with the FULL SpeakScenes feature
// set: world map landing, Shorts feed, branching Story Mode, Quick Practice
// phrasebook, 5 mini-games, and the character screen. All content data
// (scenarios, phrasebook, vocabulary, sentence bank) is authored in the
// target language; the engine (speech scoring, TTS, growth, avatar, coins)
// is the same language-agnostic core.

import { registerRoute, startRouter } from './ui/router.js?v=6';
import { renderShorts } from './ui/screens/shortsScreen.js?v=6';
import { renderWorldShorts } from './ui/screens/worldShortsScreen.js?v=6';
import { renderCharacterLite } from './ui/screens/characterLiteScreen.js?v=6';
import { renderStoryMap } from './ui/screens/storyMapScreen.js?v=6';
import { renderConversation } from './ui/screens/conversationScreen.js?v=6';
import { renderBranchMap } from './ui/screens/branchMapScreen.js?v=6';
import { renderPhrasePlaces, renderPhraseList } from './ui/screens/quickPracticeScreen.js?v=6';
import { renderMiniGame } from './ui/screens/miniGameRouter.js?v=6';
import { settings } from './progress/settingsStore.js?v=6';
import { shortsCount } from './data/shorts/sentenceBank.js?v=6';
import { APP_LANG, LOCALE } from './data/shorts/langConfig.js?v=6';

function boot() {
  // Persisted accessibility settings before first paint.
  document.documentElement.dataset.textsize = settings.get('textSize');
  document.documentElement.dataset.reducedMotion = String(settings.get('reducedMotion'));

  // Bottom navigation — world map is home; Story and Quick Practice join
  // Shorts and Character as first-class tabs.
  document.getElementById('bottom-nav').innerHTML = `
    <a href="#/" data-nav="home"><span class="nav-ico">🗺️</span>Dünya</a>
    <a href="#/story" data-nav="story"><span class="nav-ico">🎭</span>Hikaye</a>
    <a href="#/shorts" data-nav="shorts"><span class="nav-ico">📱</span>Shorts</a>
    <a href="#/practice-phrases" data-nav="practice-phrases"><span class="nav-ico">⚡</span>Pratik</a>
    <a href="#/character" data-nav="character"><span class="nav-ico">👤</span>Karakter</a>`;

  registerRoute('', renderWorldShorts);
  registerRoute('shorts', renderShorts);
  registerRoute('character', renderCharacterLite);
  registerRoute('story', renderStoryMap);
  registerRoute('story/:id', renderConversation);
  registerRoute('branchmap/:id', renderBranchMap);
  registerRoute('practice-phrases', renderPhrasePlaces);
  registerRoute('practice-phrases/:placeId', renderPhraseList);
  registerRoute('minigame/:type/:id', renderMiniGame);

  if ('speechSynthesis' in window) window.speechSynthesis.getVoices();

  console.info(`SpeakScenes ${APP_LANG} ready — ${shortsCount()} sentences, ASR/TTS locale ${LOCALE}.`);
  startRouter();
}

boot();
