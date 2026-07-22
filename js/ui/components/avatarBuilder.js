// The player's own persistent, growing avatar -- distinct from
// characterAvatar.js's NPC busts (which are per-dialogue and never owned by
// the player). Reuses characterAvatar.js's hair-rendering technique
// (hairSVG/shade) rather than forking it, but the body/head proportions
// change per growth stage, which NPC avatars never do -- that visible
// change stage-to-stage is the core "character grows" mechanic.
import { hairSVG, shade } from './characterAvatar.js?v=5';

// head radius shrinks and body/shoulder width grows as the stage advances --
// a simple, honest way to render "the character got older" without art assets.
const STAGE_PARAMS = {
  baby:           { headR: 25, shoulderW: 15, shoulderY: 46, label: 'Baby' },
  child:          { headR: 22, shoulderW: 19, shoulderY: 50, label: 'Young Child' },
  olderChild:     { headR: 20.5, shoulderW: 22, shoulderY: 53, label: 'Older Child' },
  teen:           { headR: 19.5, shoulderW: 24, shoulderY: 56, label: 'Teenager' },
  youngAdult:     { headR: 19, shoulderW: 26, shoulderY: 58, label: 'Young Adult' },
  adult:          { headR: 18.5, shoulderW: 27, shoulderY: 58, label: 'Adult' },
  confidentAdult: { headR: 18.5, shoulderW: 27, shoulderY: 58, label: 'Confident Adult' }
};

const OUTFIT_COLORS = {
  default: '#3a7ca5', crimson: '#a3324a', forest: '#2e7d5b',
  violet: '#7952b3', amber: '#b5651d', slate: '#44405e'
};

const EMOTIONS = {
  neutral: { mouth: 'M -9 8 Q 0 11 9 8' },
  happy: { mouth: 'M -11 6 Q 0 18 11 6' },
  friendly: { mouth: 'M -10 7 Q 0 15 10 7' }
};

export const OUTFIT_IDS = Object.keys(OUTFIT_COLORS);
export const HAIR_STYLES = ['short', 'long', 'bun', 'pony', 'curly', 'bob', 'shaggy', 'side'];
export const SKIN_TONES = ['#f0c8a6', '#e0aa7e', '#d9a06b', '#c98e5f', '#b97b4e', '#a9713f'];
export const HAIR_COLORS = ['#2e2620', '#4a2f1d', '#8a6a45', '#c9a35e', '#1f1a15', '#57493c'];

/**
 * @param {object} avatar  worldStore avatar state: { skinTone, hairStyle, hairColor, outfitId, accessoryIds }
 * @param {string} stage   a GROWTH_STAGES[].avatarStage key
 * @param {object} [o] { size=140, talking=false, emotion='friendly' }
 */
export function renderPlayerAvatar(avatar, stage, o = {}) {
  const sp = STAGE_PARAMS[stage] || STAGE_PARAMS.baby;
  const size = o.size || 140;
  const skin = avatar.skinTone || SKIN_TONES[1];
  const hairColor = avatar.hairColor || HAIR_COLORS[1];
  const top = OUTFIT_COLORS[avatar.outfitId] || OUTFIT_COLORS.default;
  const e = EMOTIONS[o.emotion] || EMOTIONS.friendly;
  const mouthClass = o.talking ? 'mouth mouth-talk' : 'mouth';
  const w = sp.shoulderW;

  return `
  <div class="avatar-wrap player-avatar">
    <svg class="avatar-svg" width="${size}" height="${size * 1.18}" viewBox="-32 -38 64 96" role="img" aria-label="your character">
      <path d="M ${-w} ${sp.shoulderY} Q ${-w} ${sp.shoulderY - 28} 0 ${sp.shoulderY - 30} Q ${w} ${sp.shoulderY - 28} ${w} ${sp.shoulderY} Z" fill="${top}"/>
      <rect x="-6" y="18" width="12" height="12" rx="4" fill="${skin}"/>
      <circle cx="0" cy="2" r="${sp.headR}" fill="${skin}"/>
      <circle cx="${-sp.headR + 1}" cy="2" r="3.4" fill="${skin}"/>
      <circle cx="${sp.headR - 1}" cy="2" r="3.4" fill="${skin}"/>
      ${hairSVG(avatar.hairStyle || 'short', hairColor)}
      <ellipse class="eye" cx="-8" cy="-2" rx="2.4" ry="3.1" fill="#26211c"/>
      <ellipse class="eye" cx="8" cy="-2" rx="2.4" ry="3.1" fill="#26211c"/>
      <circle cx="-7.2" cy="-3" r="0.8" fill="#fff" opacity="0.9"/>
      <circle cx="8.8" cy="-3" r="0.8" fill="#fff" opacity="0.9"/>
      <path d="M 0 2 Q 2 5 0 7" stroke="${shade(skin)}" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      <path class="${mouthClass}" d="${e.mouth}" transform="translate(0 4)" fill="none" stroke="#5e2f2f" stroke-width="2" stroke-linecap="round"/>
      ${stage === 'baby' ? `<ellipse cx="0" cy="12" rx="4" ry="3" fill="#e8eef2" opacity="0.9"/>` : ''}
      ${(avatar.accessoryIds || []).includes('glasses') ? `<g stroke="#222" stroke-width="1.6" fill="none"><circle cx="-8" cy="-2" r="5.5"/><circle cx="8" cy="-2" r="5.5"/><line x1="-2.5" y1="-2" x2="2.5" y2="-2"/></g>` : ''}
      ${(avatar.accessoryIds || []).includes('bowtie') ? `<path d="M -6 ${sp.shoulderY - 30} L 0 ${sp.shoulderY - 26} L -6 ${sp.shoulderY - 22} Z M 6 ${sp.shoulderY - 30} L 0 ${sp.shoulderY - 26} L 6 ${sp.shoulderY - 22} Z" fill="#a3324a"/>` : ''}
    </svg>
    <div class="avatar-stage-label">${sp.label}</div>
  </div>`;
}
