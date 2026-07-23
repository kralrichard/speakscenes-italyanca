// First-run welcome screen. worldScreen.js redirects here whenever
// worldStore.getState().onboarded is false.
import { navigate } from '../router.js?v=6';

export function renderWelcome(container) {
  container.innerHTML = `
    <div style="text-align:center;padding-top:12vh">
      <div style="font-size:3.4rem">🌍</div>
      <h1 class="screen-title" style="margin-top:0.6rem">English <span style="color:var(--accent)">Adventure</span></h1>
      <p class="screen-sub" style="max-width:420px;margin-left:auto;margin-right:auto">
        Grow a character from a baby saying its first words to a confident adult who can debate, negotiate and travel the world in English.
      </p>
      <button class="btn block" id="btn-start" style="max-width:280px;margin:1.2rem auto 0">Start Adventure</button>
    </div>`;
  container.querySelector('#btn-start').addEventListener('click', () => navigate('character-creation'));
}
