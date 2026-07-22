// Dispatches the 'minigame/:type/:id' route to the right mini-game screen.
import { renderObjectHunt } from './miniGames/objectHuntScreen.js';
import { renderWordBuilder } from './miniGames/wordBuilderScreen.js';
import { renderSentenceBuilder } from './miniGames/sentenceBuilderScreen.js';
import { renderListeningChallenge } from './miniGames/listeningChallengeScreen.js';
import { renderMemoryMatch } from './miniGames/memoryMatchScreen.js';

const SCREENS = {
  'object-hunt': renderObjectHunt,
  'word-builder': renderWordBuilder,
  'sentence-builder': renderSentenceBuilder,
  'listening-challenge': renderListeningChallenge,
  'memory-match': renderMemoryMatch
};

export function renderMiniGame(container, params) {
  const render = SCREENS[params.type];
  if (!render) {
    container.innerHTML = `<div class="boot-error"><h2>Unknown mini-game</h2><button class="btn" onclick="location.hash='#/'">Home</button></div>`;
    return;
  }
  return render(container, params);
}
