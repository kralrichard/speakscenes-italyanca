// ============================================================================
// miniBuilder — expands a COMPACT scenario definition into a full, validated
// branching Scenario graph (js/data/branching/scenarioSchema.js). This is how
// we author many scenarios quickly: each one is ~6-14 terse lines instead of
// 60-100, and the builder generates all the node ids, wires the graph, and
// fills sensible defaults, then runs the same createScenario() validation.
//
// Compact shape (short keys keep authoring dense):
//
// mini({
//   id, place, level, title, titleTr, npc, scene,   // scene defaults per place
//   open, openTr,                                    // the NPC's first line
//   br: [                                            // >= 2 branches (a real decision)
//     { i:'intent TR', s:'English sentence to say', st:'sentence TR',
//       a:['alt phrasing', ...],                     // optional accepted alternatives
//       r:'NPC reaction EN', rt:'NPC reaction TR',   // reaction shown before the outcome
//       // then EITHER a terminal ending:
//       e:{ k:'success', t:'Title', tt:'Başlık', c:12 },
//       // OR a second decision (>= 2 follow-ups), each ending the scene:
//       f:[ { i, s, st, a?, e:{...} }, ... ]
//     }, ...
//   ]
// })
//
// Ending kinds (k): excellent | success | problem-solved | relationship |
//                   neutral | misunderstanding | funny
// ============================================================================

import { createScenario, ENDING_KINDS } from './scenarioSchema.js?v=5';

// Default scene template per place id (so `scene` can usually be omitted).
const PLACE_SCENE = {
  hotel: 'hotel-lobby', airport: 'airport', restaurant: 'restaurant', cafe: 'cafe',
  hospital: 'hospital', pharmacy: 'retail', supermarket: 'retail', clothing: 'retail',
  train: 'transit', taxi: 'taxi', bank: 'bank-office', police: 'formal-office',
  street: 'street', workplace: 'formal-office', home: 'home', gym: 'gym', school: 'school',
  museum: 'formal-office', postoffice: 'retail', library: 'school', seaside: 'seaside'
};

// Auto-fill an ending's English/Turkish body text from its kind + title when
// the author didn't write one (keeps branches short).
function endText(e) {
  const kind = ENDING_KINDS[e.k] ? e.k : 'success';
  const fallbackEn = {
    excellent: 'Beautifully handled — clear, polite, and confident.',
    success: 'Nicely done. You got what you needed in clear English.',
    'problem-solved': 'Problem sorted. You explained yourself and it worked out.',
    relationship: 'A warm exchange — this is how good rapport is built.',
    neutral: 'It worked out. Try another choice to see a different outcome.',
    misunderstanding: 'A small mix-up — but every mistake is a lesson. Try again!',
    funny: 'Well, that was memorable! Replay for a smoother version.'
  }[kind];
  const fallbackTr = {
    excellent: 'Harika biçimde halledildi — net, kibar ve kendinden emin.',
    success: 'Güzel iş. İhtiyacın olanı net İngilizceyle aldın.',
    'problem-solved': 'Sorun çözüldü. Kendini anlattın ve işe yaradı.',
    relationship: 'Sıcak bir diyalog — iyi ilişki böyle kurulur.',
    neutral: 'İşe yaradı. Farklı bir sonuç için başka bir seçeneği dene.',
    misunderstanding: 'Küçük bir karışıklık — ama her hata bir derstir. Tekrar dene!',
    funny: 'Şey, bu unutulmazdı! Daha düzgün bir versiyon için tekrar oyna.'
  }[kind];
  return {
    kind,
    title: e.t || 'Done',
    titleTr: e.tt || e.t || 'Bitti',
    text: e.x || fallbackEn,
    translation: e.xt || fallbackTr,
    coins: e.c != null ? e.c : (kind === 'excellent' ? 16 : kind === 'neutral' ? 6 : 10),
    relationshipEffect: e.rel != null ? e.rel : (kind === 'relationship' || kind === 'excellent' ? 1 : 0)
  };
}

const XP_BY_LEVEL = { A0: 8, A1: 10, A2: 12, B1: 15, B2: 18, C1: 20, C2: 22 };

export function mini(def) {
  const { id, place, level } = def;
  const nodes = {};
  const endings = {};
  const scene = def.scene || PLACE_SCENE[place] || 'street';
  const baseXp = XP_BY_LEVEL[level] || 12;
  let endSeq = 0;

  const addEnding = (e) => {
    const built = endText(e);
    const eid = `${id}_e${endSeq++}`;
    endings[eid] = { id: eid, ...built };
    return eid;
  };

  // opening node with the first decision
  const openId = `${id}_open`;
  const openChoices = [];
  nodes[openId] = { id: openId, speakerId: def.npc, emotion: def.emo || 'friendly',
    text: def.open, translation: def.openTr, choices: openChoices };

  def.br.forEach((b, bi) => {
    const reactId = `${id}_r${bi}`;
    openChoices.push({
      id: `c${bi}`, intentionTr: b.i, tone: b.tone, difficulty: b.diff || (level === 'A0' || level === 'A1' ? 'easy' : level === 'A2' || level === 'B1' ? 'medium' : 'hard'),
      sentence: b.s, translation: b.st, altAccepted: b.a || [], xp: b.xp || baseXp,
      relationshipEffect: b.rel || 0, next: reactId
    });

    if (b.f && b.f.length >= 2) {
      // reaction node is itself a second decision
      const fChoices = [];
      nodes[reactId] = { id: reactId, speakerId: def.npc, emotion: b.remo || 'friendly',
        text: b.r, translation: b.rt, choices: fChoices };
      b.f.forEach((f, fi) => {
        const eid = addEnding(f.e);
        fChoices.push({
          id: `c${bi}f${fi}`, intentionTr: f.i, tone: f.tone,
          difficulty: f.diff || (level === 'A0' || level === 'A1' ? 'easy' : 'medium'),
          sentence: f.s, translation: f.st, altAccepted: f.a || [], xp: f.xp || baseXp,
          relationshipEffect: f.rel || 0, next: eid
        });
      });
    } else {
      // reaction node auto-advances to this branch's ending
      const eid = addEnding(b.e || { k: 'success', t: 'Done', tt: 'Bitti' });
      nodes[reactId] = { id: reactId, speakerId: def.npc, emotion: b.remo || 'happy',
        text: b.r, translation: b.rt, endingId: eid };
    }
  });

  return createScenario({
    id, title: def.title, titleTr: def.titleTr || def.title,
    environmentId: place, sceneType: scene, level,
    goal: def.goal || def.title, goalTr: def.goalTr || def.titleTr || def.title,
    npcIds: [def.npc], startNodeId: openId, nodes, endings
  });
}

// Build many at once; returns an array of validated scenarios.
export function miniAll(defs) { return defs.map(mini); }
