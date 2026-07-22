// SVG character avatars: parameterized cartoon busts with blink animation,
// emotion-driven eyebrows/mouth, and a talking-mouth animation (CSS class
// toggles in styles.css). No external assets. This is the strongest honest
// version of "character animation" possible without a rigging library:
// idle sway, blink, emotional expressions, and audio-synchronized mouth
// movement (mouth animates exactly while TTS is speaking).

const PRESETS = {
  receptionist_f: { skin: '#e8b48c', hair: '#4a2f1d', style: 'bun',    top: '#7a4f9e', acc: null },
  guest_neutral:  { skin: '#d9a06b', hair: '#2e2620', style: 'short',  top: '#3a7ca5', acc: null },
  guest_m:        { skin: '#c98e5f', hair: '#1f1a15', style: 'short',  top: '#2e7d5b', acc: null },
  barista_m:      { skin: '#b97b4e', hair: '#241d16', style: 'curly',  top: '#5c4a35', acc: 'apron' },
  pharmacist_f:   { skin: '#e3ac80', hair: '#151210', style: 'hijab',  top: '#3d8a7a', acc: null },
  driver_m:       { skin: '#d19a6a', hair: '#3d3229', style: 'cap',    top: '#556270', acc: null },
  officer_m:      { skin: '#c08a5c', hair: '#20180f', style: 'cap',    top: '#33415c', acc: 'badge' },
  waiter_f:       { skin: '#eec19a', hair: '#6e3b1f', style: 'pony',   top: '#2b2b33', acc: 'apron' },
  agent_f:        { skin: '#c68a58', hair: '#161210', style: 'long',   top: '#8a3d5e', acc: null },
  agent_f2:       { skin: '#e0aa7e', hair: '#5e3d21', style: 'long',   top: '#b3702e', acc: null },
  doctor_f:       { skin: '#ecc2a0', hair: '#8a6a45', style: 'bun',    top: '#e8eef2', acc: 'stetho' },
  clerk_m:        { skin: '#dda579', hair: '#57493c', style: 'short',  top: '#37503d', acc: null },
  assistant_f:    { skin: '#f0c8a6', hair: '#b5502e', style: 'pony',   top: '#4a6a8a', acc: null },
  assistant_m:    { skin: '#e2b088', hair: '#c9a35e', style: 'shaggy', top: '#3f6650', acc: null },
  colleague_f:    { skin: '#d8a171', hair: '#2b2119', style: 'long',   top: '#7a5580', acc: null },
  manager_f:      { skin: '#e6b58e', hair: '#3a2c20', style: 'bob',    top: '#44405e', acc: 'glasses' },
  manager_m:      { skin: '#d69f70', hair: '#4d3d2c', style: 'short',  top: '#2f4550', acc: null },
  banker_m:       { skin: '#a9713f', hair: '#12100d', style: 'short',  top: '#2a2f3e', acc: 'tie' },
  exec_m:         { skin: '#e4b992', hair: '#8f8578', style: 'side',   top: '#333844', acc: 'tie' },
  exec_f:         { skin: '#dfae82', hair: '#191411', style: 'bob',    top: '#5e3548', acc: null },
  professor_m:    { skin: '#b8induc', hair: '#d8d3cb', style: 'bald',  top: '#4f4438', acc: 'glasses' },
  journalist_f:   { skin: '#f2cba6', hair: '#a34f2b', style: 'curlyl', top: '#365a4e', acc: null }
};
// fix accidental invalid color above
PRESETS.professor_m.skin = '#b98a62';

const EMOTIONS = {
  neutral:    { browY: 0,  browTilt: 0,   mouth: 'M -9 8 Q 0 11 9 8' },
  friendly:   { browY: -1, browTilt: 0,   mouth: 'M -10 7 Q 0 15 10 7' },
  happy:      { browY: -2, browTilt: 0,   mouth: 'M -11 6 Q 0 18 11 6' },
  concerned:  { browY: -1, browTilt: 8,   mouth: 'M -9 10 Q 0 7 9 10' },
  apologetic: { browY: 1,  browTilt: 10,  mouth: 'M -8 10 Q 0 8 8 10' },
  curious:    { browY: -3, browTilt: -6,  mouth: 'M -8 8 Q 0 12 8 8' },
  thinking:   { browY: -2, browTilt: -8,  mouth: 'M -8 9 Q 2 9 8 11' },
  formal:     { browY: 0,  browTilt: 0,   mouth: 'M -8 9 Q 0 12 8 9' },
  surprised:  { browY: -4, browTilt: 0,   mouth: 'M 0 9 m -4 0 a 4 5 0 1 0 8 0 a 4 5 0 1 0 -8 0' }
};

// Exported (in addition to being used internally below) so avatarBuilder.js
// can reuse the same hair-rendering technique for the player's own growing
// avatar instead of forking it.
export function hairSVG(style, color) {
  switch (style) {
    case 'bun': return `<circle cx="0" cy="-30" r="9" fill="${color}"/><path d="M -20 -8 A 20 22 0 0 1 20 -8 L 20 -2 Q 0 -14 -20 -2 Z" fill="${color}"/>`;
    case 'short': return `<path d="M -20 -6 A 20 21 0 0 1 20 -6 L 20 -4 Q 12 -16 0 -15 Q -12 -16 -20 -4 Z" fill="${color}"/>`;
    case 'side': return `<path d="M -20 -6 A 20 21 0 0 1 20 -6 L 20 -4 Q 6 -18 -8 -13 Q -16 -11 -20 -4 Z" fill="${color}"/>`;
    case 'curly': return `<circle cx="-13" cy="-14" r="7" fill="${color}"/><circle cx="0" cy="-19" r="8" fill="${color}"/><circle cx="13" cy="-14" r="7" fill="${color}"/>`;
    case 'curlyl': return `<circle cx="-14" cy="-13" r="8" fill="${color}"/><circle cx="0" cy="-19" r="9" fill="${color}"/><circle cx="14" cy="-13" r="8" fill="${color}"/><circle cx="-18" cy="0" r="6" fill="${color}"/><circle cx="18" cy="0" r="6" fill="${color}"/>`;
    case 'pony': return `<path d="M -20 -8 A 20 22 0 0 1 20 -8 L 20 -2 Q 0 -14 -20 -2 Z" fill="${color}"/><path d="M 16 -10 Q 26 0 22 16 Q 19 8 15 4 Z" fill="${color}"/>`;
    case 'long': return `<path d="M -21 -6 A 21 22 0 0 1 21 -6 L 22 20 Q 16 14 14 4 Q 8 -12 0 -12 Q -8 -12 -14 4 Q -16 14 -22 20 Z" fill="${color}"/>`;
    case 'bob': return `<path d="M -21 -6 A 21 22 0 0 1 21 -6 L 20 12 Q 14 6 13 -1 Q 6 -13 0 -13 Q -6 -13 -13 -1 Q -14 6 -20 12 Z" fill="${color}"/>`;
    case 'shaggy': return `<path d="M -20 -6 A 20 21 0 0 1 20 -6 L 21 2 Q 14 -4 10 -12 Q 0 -17 -10 -12 Q -14 -4 -21 2 Z" fill="${color}"/>`;
    case 'hijab': return `<path d="M -22 14 A 22 25 0 1 1 22 14 L 22 20 L -22 20 Z" fill="${color}"/><path d="M -15 -2 A 15 16 0 0 1 15 -2 L 15 12 L -15 12 Z" fill="none"/>`;
    case 'cap': return `<path d="M -19 -8 A 19 16 0 0 1 19 -8 L 19 -5 L -19 -5 Z" fill="${color}"/><rect x="-21" y="-7" width="42" height="4" rx="2" fill="${color}" opacity="0.85"/>`;
    case 'bald': return `<path d="M -20 -2 A 20 18 0 0 1 20 -2 L 20 0 L 16 0 A 16 14 0 0 0 -16 0 L -20 0 Z" fill="${color}" opacity="0.5"/>`;
    default: return '';
  }
}

function accessorySVG(acc, topColor) {
  switch (acc) {
    case 'glasses': return `<g stroke="#222" stroke-width="1.6" fill="none"><circle cx="-8" cy="-2" r="5.5"/><circle cx="8" cy="-2" r="5.5"/><line x1="-2.5" y1="-2" x2="2.5" y2="-2"/></g>`;
    case 'tie': return `<path d="M 0 30 L -4 36 L 0 52 L 4 36 Z" fill="#8a2f3c"/>`;
    case 'apron': return `<rect x="-16" y="36" width="32" height="18" rx="3" fill="#eee" opacity="0.9"/>`;
    case 'badge': return `<circle cx="-12" cy="40" r="4" fill="#ffd166"/>`;
    case 'stetho': return `<path d="M -8 32 Q -12 44 0 46 Q 12 44 8 32" stroke="#444" stroke-width="2" fill="none"/><circle cx="0" cy="47" r="3.4" fill="#444"/>`;
    default: return '';
  }
}

/**
 * @param {string} presetKey key into PRESETS
 * @param {object} [o] { size=110, emotion='neutral', talking=false, flip=false }
 * @returns {string} HTML
 */
export function renderAvatar(presetKey, o = {}) {
  const p = PRESETS[presetKey] || PRESETS.guest_neutral;
  const e = EMOTIONS[o.emotion] || EMOTIONS.neutral;
  const size = o.size || 110;
  const mouthClass = o.talking ? 'mouth mouth-talk' : 'mouth';
  const flip = o.flip ? 'transform:scaleX(-1);' : '';
  const isOpen = o.emotion === 'surprised';

  return `
  <div class="avatar-wrap" style="${flip}">
    <svg class="avatar-svg" width="${size}" height="${size * 1.18}" viewBox="-32 -38 64 96" role="img" aria-label="character">
      <!-- shoulders / top -->
      <path d="M -26 58 Q -26 30 0 28 Q 26 30 26 58 Z" fill="${p.top}"/>
      <!-- neck -->
      <rect x="-6" y="18" width="12" height="12" rx="4" fill="${p.skin}"/>
      <!-- head -->
      <circle cx="0" cy="2" r="20" fill="${p.skin}"/>
      <!-- ears -->
      <circle cx="-19" cy="2" r="3.6" fill="${p.skin}"/>
      <circle cx="19" cy="2" r="3.6" fill="${p.skin}"/>
      ${hairSVG(p.style, p.hair)}
      <!-- eyebrows -->
      <g transform="translate(0 ${e.browY})">
        <line x1="-12" y1="-7" x2="-4" y2="${-7 + e.browTilt * 0.12}" stroke="${p.hair}" stroke-width="1.8" stroke-linecap="round" transform="rotate(${-e.browTilt} -8 -7)"/>
        <line x1="4" y1="${-7 + e.browTilt * 0.12}" x2="12" y2="-7" stroke="${p.hair}" stroke-width="1.8" stroke-linecap="round" transform="rotate(${e.browTilt} 8 -7)"/>
      </g>
      <!-- eyes (blink via CSS) -->
      <ellipse class="eye" cx="-8" cy="-2" rx="2.4" ry="3.1" fill="#26211c"/>
      <ellipse class="eye" cx="8" cy="-2" rx="2.4" ry="3.1" fill="#26211c"/>
      <circle cx="-7.2" cy="-3" r="0.8" fill="#fff" opacity="0.9"/>
      <circle cx="8.8" cy="-3" r="0.8" fill="#fff" opacity="0.9"/>
      <!-- nose -->
      <path d="M 0 2 Q 2 5 0 7" stroke="${shade(p.skin)}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <!-- mouth -->
      <path class="${mouthClass}" d="${e.mouth}" transform="translate(0 4)"
        ${isOpen ? `fill="#5e2f2f" stroke="none"` : `fill="none" stroke="#5e2f2f" stroke-width="2" stroke-linecap="round"`}/>
      ${accessorySVG(p.acc, p.top)}
    </svg>
  </div>`;
}

export function shade(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, (n >> 16) - 42), g = Math.max(0, ((n >> 8) & 255) - 42), b = Math.max(0, (n & 255) - 42);
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

/** Re-renders an avatar slot in place (cheap: small SVG). */
export function updateAvatarSlot(slotEl, presetKey, opts) {
  const wrap = slotEl.querySelector('.avatar-holder');
  if (wrap) wrap.innerHTML = renderAvatar(presetKey, opts);
}
