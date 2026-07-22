// Animated scene backgrounds. Pure HTML/CSS (keyframes live in styles.css),
// no external assets, cheap to render. Every location's sceneType maps to
// one of these templates; unknown types get a tasteful generic gradient so a
// new location never renders a broken scene.

const SCENES = {
  'seaside': `
    <div class="layer sun"></div>
    <div class="layer cloud" style="top:12%;width:70px;height:20px;animation-duration:42s"></div>
    <div class="layer cloud" style="top:24%;width:50px;height:16px;animation-duration:55s;animation-delay:-20s"></div>
    <div class="layer sea"></div>
    <div class="layer wave w1"></div>
    <div class="layer wave w2"></div>`,
  'hotel-lobby': `
    <div class="layer pillar p1"></div>
    <div class="layer pillar p2"></div>
    <div class="layer chandelier"></div>
    <div class="layer desk"></div>`,
  'airport': `
    <div class="layer cloud" style="top:8%;width:80px;height:22px;animation-duration:48s"></div>
    <div class="layer plane">✈️</div>
    <div class="layer tower"></div>
    <div class="layer desk"></div>`,
  'airplane-cabin': `
    <div class="layer window win1"><div class="layer tiny-cloud" style="left:6px;animation-delay:-2s"></div></div>
    <div class="layer window win2"><div class="layer tiny-cloud" style="left:2px;animation-delay:-5s"></div></div>
    <div class="layer window win3"><div class="layer tiny-cloud" style="left:10px"></div></div>`,
  'restaurant': `
    <div class="layer lamp l1"></div>
    <div class="layer lamp l2"></div>
    <div class="layer lamp l3"></div>
    <div class="layer table"></div>
    <div class="layer candle"></div>`,
  'cafe': `
    <div class="layer shelf s1"></div>
    <div class="layer shelf s2"></div>
    <div class="layer cup c1"></div>
    <div class="layer cup c2"></div>
    <div class="layer cup c3"></div>
    <div class="layer counter"></div>
    <div class="layer steam"></div>`,
  'hospital': `
    <div class="layer cross"></div>
    <div class="layer monitor-line"></div>
    <div class="layer bed"></div>`,
  'retail': `
    <div class="layer shelf-unit su1"></div>
    <div class="layer shelf-unit su2"></div>
    <div class="layer counter"></div>`,
  'transit': `
    <div class="layer board"></div>
    <div class="layer train"></div>
    <div class="layer platform"></div>`,
  'taxi': `
    <div class="layer moon"></div>
    <div class="layer city-glow"></div>
    <div class="layer dashboard"></div>
    <div class="layer wheel"></div>`,
  'street': `
    <div class="layer cloud" style="top:6%;width:70px;height:20px;animation-duration:50s"></div>
    <div class="layer building b1"></div>
    <div class="layer building b2"></div>
    <div class="layer building b3"></div>
    <div class="layer building b4"></div>
    <div class="layer car"></div>
    <div class="layer car c2"></div>`,
  'bank-office': `
    <div class="layer column co1"></div>
    <div class="layer column co2"></div>
    <div class="layer clock"></div>
    <div class="layer desk"></div>`,
  'formal-office': `
    <div class="layer window-pane wp1"><div class="layer tiny-plane">✈️</div></div>
    <div class="layer window-pane wp2"></div>
    <div class="layer screen-board"></div>
    <div class="layer table"></div>`,
  'school': `
    <div class="layer blackboard"></div>
    <div class="layer desk"></div>`,
  'home': `
    <div class="layer window-pane">
      <div class="layer star" style="top:20%;left:30%"></div>
      <div class="layer star" style="top:45%;left:60%;animation-delay:-1.4s"></div>
      <div class="layer star" style="top:30%;left:80%;animation-delay:-0.7s"></div>
    </div>
    <div class="layer lamp-glow"></div>
    <div class="layer sofa"></div>`,
  'party': `
    <div class="layer disco"></div>
    <div class="layer light-beam lb1"></div>
    <div class="layer light-beam lb2"></div>
    <div class="layer light-beam lb3"></div>
    <div class="layer confetti" style="left:20%;background:#ff6bd6"></div>
    <div class="layer confetti" style="left:45%;background:#4cc9f0;animation-delay:-2s"></div>
    <div class="layer confetti" style="left:70%;background:#ffd166;animation-delay:-3.6s"></div>
    <div class="layer confetti" style="left:88%;background:#3ecf8e;animation-delay:-1.2s"></div>`,
  'gym': `
    <div class="layer rack"></div>
    <div class="layer dumbbell"></div>`
};

export function renderScene(sceneType) {
  const inner = SCENES[sceneType] || '';
  const cls = SCENES[sceneType] ? `scene-${sceneType}` : 'scene-generic';
  return `<div class="scene ${cls}" aria-hidden="true">${inner}</div>`;
}
