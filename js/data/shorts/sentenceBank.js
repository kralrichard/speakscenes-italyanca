// ============================================================================
// Shorts sentence bank — ITALIAN. Sentence-first deterministic expansion:
// adjective-gender agreement, passato prossimo, periphrastic future,
// da-durations, and a hand-written DAILY set of real everyday sentences.
// Sorted A0 -> C2.
// ============================================================================

import { NOUNS, GOODS, PLACES, OWNABLE, ADJECTIVES, VERBS, OPINIONS, REQUESTS, ACTIVITIES, DURATIONS, DAILY } from './wordBanks.js?v=5';

export const LEVEL_ORDER = ['A0', 'A1', 'A2', 'B1', 'B2', 'C1', 'C2'];
const levelRank = (c) => LEVEL_ORDER.indexOf(c);

function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

function trQ(word) {
  const v = (word.toLowerCase().match(/[aeıioöuü]/g) || ['e']).pop();
  return { a: 'mı', ı: 'mı', e: 'mi', i: 'mi', o: 'mu', u: 'mu', ö: 'mü', ü: 'mü' }[v] || 'mi';
}

// Article joiners: "un cane" but "un'arancia"; "il cane" but "l'ospedale".
const indN = (n) => n.ind.endsWith("'") ? `${n.ind}${n.w}` : `${n.ind} ${n.w}`;
const defN = (n) => n.def.endsWith("'") ? `${n.def}${n.w}` : `${n.def} ${n.w}`;
const agree = (a, n) => n.g === 'f' ? a.f : a.m;

function frame(level, topic, capN, slots, make) {
  return { level, topic, capN, slots, make };
}

function expandFrame(f, seedBase) {
  const sizes = f.slots.map(s => s.length);
  const total = sizes.reduce((a, b) => a * b, 1);
  const rnd = mulberry32(seedBase);
  let picks;
  if (total <= f.capN) {
    picks = Array.from({ length: total }, (_, i) => i);
  } else {
    const seen = new Set(); picks = [];
    let guard = f.capN * 40;
    while (picks.length < f.capN && guard-- > 0) {
      const idx = Math.floor(rnd() * total);
      if (!seen.has(idx)) { seen.add(idx); picks.push(idx); }
    }
  }
  const out = [];
  for (const flat of picks) {
    let rem = flat;
    const items = [];
    for (let s = f.slots.length - 1; s >= 0; s--) {
      const sz = sizes[s];
      items[s] = f.slots[s][rem % sz];
      rem = Math.floor(rem / sz);
    }
    const { en, tr } = f.make(items);
    out.push({ en, tr, level: f.level, topic: f.topic, words: en.split(/\s+/).length });
  }
  return out;
}

const A = ADJECTIVES, V = VERBS;

const FRAMES = [
  // ---------------- A0 : first mini-sentences ----------------------------
  frame('A0', 'first-words', 999, [NOUNS], ([n]) => ({ en: `${cap(indN(n))}!`, tr: `Bir ${n.tr}!` })),
  frame('A0', 'pointing', 999, [NOUNS], ([n]) => ({ en: `Guarda, ${indN(n)}!`, tr: `Bak, bir ${n.tr}!` })),
  frame('A0', 'pointing', 999, [NOUNS], ([n]) => ({ en: `Là c'è ${indN(n)}!`, tr: `İşte orada bir ${n.tr}!` })),
  frame('A0', 'first-words', 999, [NOUNS], ([n]) => ({ en: `Ancora ${indN(n)}!`, tr: `Bir ${n.tr} daha!` })),
  frame('A0', 'location', 999, [NOUNS], ([n]) => ({ en: `${cap(defN(n))} è qui!`, tr: `${cap(n.tr)} burada!` })),
  frame('A0', 'first-words', 999, [NOUNS], ([n]) => ({ en: `Oh, ${indN(n)}!`, tr: `Oo, bir ${n.tr}!` })),
  frame('A0', 'first-words', 260, [NOUNS, NOUNS], ([a, b]) => ({ en: `${cap(indN(a))} e ${indN(b)}!`, tr: `Bir ${a.tr} ve bir ${b.tr}!` })),

  // ---------------- A1 -----------------------------------------------------
  frame('A1', 'naming', 999, [NOUNS], ([n]) => ({ en: `È ${indN(n)}.`, tr: `Bu bir ${n.tr}.` })),
  frame('A1', 'pointing', 999, [NOUNS], ([n]) => ({ en: `Ecco ${indN(n)}.`, tr: `İşte bir ${n.tr}.` })),
  frame('A1', 'questions', 999, [NOUNS], ([n]) => ({ en: `Dov'è ${defN(n)}?`, tr: `${cap(n.tr)} nerede?` })),
  frame('A1', 'seeing', 999, [NOUNS], ([n]) => ({ en: `Vedo ${indN(n)}.`, tr: `Bir ${n.tr} görüyorum.` })),
  frame('A1', 'having', 999, [NOUNS], ([n]) => ({ en: `Ho ${indN(n)}.`, tr: `Bende bir ${n.tr} var.` })),
  frame('A1', 'questions', 999, [NOUNS], ([n]) => ({ en: `È ${indN(n)}?`, tr: `Bu bir ${n.tr} ${trQ(n.tr)}?` })),
  frame('A1', 'seeing', 999, [NOUNS], ([n]) => ({ en: `Ho trovato ${indN(n)}.`, tr: `Bir ${n.tr} buldum.` })),
  frame('A1', 'questions', 999, [OWNABLE], ([n]) => ({ en: `${cap(defN(n))} è sparit${n.g === 'f' ? 'a' : 'o'}!`, tr: `${cap(n.tr)} kayıp!` })),
  frame('A1', 'describing', 999, [NOUNS, A], ([n, a]) => ({ en: `${cap(defN(n))} è ${agree(a, n)}.`, tr: `${cap(n.tr)} ${a.tr}.` })),
  frame('A1', 'describing', 500, [NOUNS, A], ([n, a]) => ({ en: `${cap(defN(n))} non è ${agree(a, n)}.`, tr: `${cap(n.tr)} ${a.tr} değil.` })),
  frame('A1', 'describing', 800, [NOUNS, A], ([n, a]) => ({ en: `È ${indN(n)} ${agree(a, n)}.`, tr: `Bu ${a.tr} bir ${n.tr}.` })),
  frame('A1', 'routines', 999, [V], ([v]) => ({ en: `${cap(v.first)} ogni giorno.`, tr: `Her gün ${v.tr1}.` })),
  frame('A1', 'likes', 999, [V], ([v]) => ({ en: `Mi piace ${v.inf}.`, tr: `${cap(v.trGer)} severim.` })),

  // ---------------- A2 -----------------------------------------------------
  frame('A2', 'requests', 999, [GOODS], ([n]) => ({ en: `Posso avere ${indN(n)}, per favore?`, tr: `Bir ${n.tr} alabilir miyim, lütfen?` })),
  frame('A2', 'shopping', 999, [GOODS], ([n]) => ({ en: `Quanto costa ${defN(n)}?`, tr: `${cap(n.tr)} ne kadar?` })),
  frame('A2', 'questions', 999, [GOODS], ([n]) => ({ en: `Hai ${indN(n)}?`, tr: `Sende ${n.tr} var mı?` })),
  frame('A2', 'shopping', 999, [GOODS], ([n]) => ({ en: `Sto cercando ${indN(n)}.`, tr: `Bir ${n.tr} arıyorum.` })),
  frame('A2', 'shopping', 999, [GOODS], ([n]) => ({ en: `Vorrei comprare ${indN(n)}.`, tr: `Bir ${n.tr} almak istiyorum.` })),
  frame('A2', 'negatives', 999, [NOUNS], ([n]) => ({ en: `Non ho ${indN(n)}.`, tr: `Bende ${n.tr} yok.` })),
  frame('A2', 'negatives', 999, [NOUNS], ([n]) => ({ en: `Non mi serve ${indN(n)}.`, tr: `Bana ${n.tr} gerekmiyor.` })),
  frame('A2', 'needs', 999, [NOUNS], ([n]) => ({ en: `Mi serve ${indN(n)}.`, tr: `Bana bir ${n.tr} lazım.` })),
  frame('A2', 'location', 999, [NOUNS], ([n]) => ({ en: `C'è ${indN(n)} qui.`, tr: `Burada bir ${n.tr} var.` })),
  frame('A2', 'location', 999, [NOUNS], ([n]) => ({ en: `C'è ${indN(n)} qui vicino?`, tr: `Yakınlarda bir ${n.tr} var mı?` })),
  frame('A2', 'seeing', 999, [NOUNS], ([n]) => ({ en: `Ho visto ${indN(n)}.`, tr: `Bir ${n.tr} gördüm.` })),
  frame('A2', 'shopping', 620, [GOODS, A], ([n, a]) => ({ en: `Ha comprato ${indN(n)} ${agree(a, n)}.`, tr: `${cap(a.tr)} bir ${n.tr} aldı.` })),
  frame('A2', 'describing', 700, [OWNABLE, A], ([n, a]) => ({ en: `Ho ${indN(n)} ${agree(a, n)}.`, tr: `Bende ${a.tr} bir ${n.tr} var.` })),
  frame('A2', 'exclaim', 600, [NOUNS, A], ([n, a]) => ({ en: `Che ${n.w} ${agree(a, n)}!`, tr: `Ne ${a.tr} bir ${n.tr}!` })),
  frame('A2', 'plans', 999, [V], ([v]) => ({ en: `Oggi voglio ${v.inf}.`, tr: `Bugün ${v.trInf} istiyorum.` })),
  frame('A2', 'negatives', 999, [V], ([v]) => ({ en: `Adesso non voglio ${v.inf}.`, tr: `Şimdi ${v.trInf} istemiyorum.` })),
  frame('A2', 'obligation', 999, [V], ([v]) => ({ en: `Adesso devo ${v.inf}.`, tr: `Şimdi ${v.trInf} zorundayım.` })),
  frame('A2', 'plans', 999, [V], ([v]) => ({ en: `Vuoi ${v.inf}?`, tr: `${cap(v.trInf)} ister misin?` })),
  frame('A2', 'routines', 999, [V], ([v]) => ({ en: `Nel fine settimana mi piace ${v.inf}.`, tr: `Hafta sonları ${v.trGer} severim.` })),
  frame('A2', 'routines', 999, [V], ([v]) => ({ en: `Ieri ho ${v.part} tanto.`, tr: `Dün çok ${v.trPast}.` })),
  frame('A2', 'plans', 999, [V], ([v]) => ({ en: `Domani ho intenzione di ${v.inf}.`, tr: `Yarın ${v.trFut}.` })),

  // ---------------- B1 -----------------------------------------------------
  frame('B1', 'polite-requests', 999, [REQUESTS], ([r]) => ({ en: `Potrebbe ${r.r}, per favore?`, tr: `Acaba ${r.tr}?` })),
  frame('B1', 'polite-requests', 999, [REQUESTS], ([r]) => ({ en: `Puoi ${r.r}?`, tr: `Lütfen, ${r.tr}?` })),
  frame('B1', 'directions', 999, [PLACES], ([n]) => ({ en: `Sa dov'è ${defN(n)}?`, tr: `${cap(n.tr)} nerede, biliyor musunuz?` })),
  frame('B1', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Secondo me, ${o.c}.`, tr: `Bence ${o.tr}.` })),
  frame('B1', 'plans', 999, [V], ([v]) => ({ en: `Vorrei imparare a ${v.inf}.`, tr: `${cap(v.trInf)} öğrenmek istiyorum.` })),
  frame('B1', 'experience', 999, [ACTIVITIES, DURATIONS], ([a, d]) => ({ en: `${a.t} ${d.t}.`, tr: `${cap(d.tr)} ${a.tr}.` })),
  frame('B1', 'describing', 700, [OWNABLE, A], ([n, a]) => ({ en: `Non ho mai visto ${indN(n)} così ${agree(a, n)}.`, tr: `Daha önce hiç bu kadar ${a.tr} bir ${n.tr} görmedim.` })),

  // ---------------- B2 -----------------------------------------------------
  frame('B2', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Onestamente, ${o.c}.`, tr: `Dürüst olmak gerekirse, ${o.tr}.` })),
  frame('B2', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `A dire il vero, ${o.c}.`, tr: `Doğrusunu söylemek gerekirse, ${o.tr}.` })),
  frame('B2', 'polite-requests', 999, [REQUESTS], ([r]) => ({ en: `Le dispiacerebbe ${r.r}?`, tr: `Acaba ${r.tr}? Çok memnun olurum.` })),

  // ---------------- C1 -----------------------------------------------------
  frame('C1', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Dal mio punto di vista, ${o.c}.`, tr: `Bana kalırsa ${o.tr}.` })),
  frame('C1', 'opinions', 999, [OPINIONS], ([o]) => ({ en: `Per quanto mi riguarda, ${o.c}.`, tr: `Benim açımdan ${o.tr}.` })),

  // ---------------- C2 -----------------------------------------------------
  frame('C2', 'nuance', 999, [OPINIONS], ([o]) => ({ en: `A essere del tutto sincero, ${o.c}.`, tr: `Tamamen dürüst olmam gerekirse, ${o.tr}.` })),
  frame('C2', 'nuance', 999, [OPINIONS], ([o]) => ({ en: `Diciamoci la verità: ${cap(o.c)}.`, tr: `Kabul etmek gerek: ${o.tr}.` })),

  // ---- deeper upper-level content (matches the 6000-swipe growth pace) ----
  frame('B1', 'describing', 400, [NOUNS, A], ([n, a]) => ({ en: `Mi chiedo se ${defN(n)} sia davvero così ${agree(a, n)}.`, tr: `${cap(n.tr)} gerçekten bu kadar ${a.tr} mı, merak ediyorum.` })),
  frame('B1', 'describing', 400, [NOUNS, A], ([n, a]) => ({ en: `Non trovi che ${defN(n)} sia troppo ${agree(a, n)}?`, tr: `Sence de ${n.tr} fazla ${a.tr} değil mi?` })),
  frame('B2', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Onestamente non avrei pensato che ${defN(n)} fosse così ${agree(a, n)}.`, tr: `Açıkçası ${n.tr} bu kadar ${a.tr} olur diye düşünmemiştim.` })),
  frame('B2', 'describing', 500, [NOUNS, A], ([n, a]) => ({ en: `Dipende da quanto ${defN(n)} è ${agree(a, n)} in realtà.`, tr: `${cap(n.tr)} gerçekte ne kadar ${a.tr}, ona bağlı.` })),
  frame('B2', 'describing', 400, [NOUNS, A], ([n, a]) => ({ en: `Per mia esperienza, ${defN(n)} raramente è così ${agree(a, n)}.`, tr: `Tecrübeme göre ${n.tr} nadiren bu kadar ${a.tr} olur.` })),
  frame('B2', 'plans', 999, [V], ([v]) => ({ en: `Non avrei mai pensato che un giorno avrei potuto ${v.inf}.`, tr: `Bir gün ${v.trInf} aklıma gelmezdi.` })),
  frame('B2', 'advice', 999, [V], ([v]) => ({ en: `Faccio fatica a ${v.inf} regolarmente.`, tr: `Düzenli olarak ${v.trInf} bana zor geliyor.` })),
  frame('C1', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Mi sorprende quanto ${defN(n)} sia ${agree(a, n)} in realtà.`, tr: `${cap(n.tr)} gerçekte ne kadar ${a.tr}, bu beni şaşırtıyor.` })),
  frame('C1', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Non si dovrebbe dare per scontato che ${defN(n)} sia sempre così ${agree(a, n)}.`, tr: `${cap(n.tr)} her zaman bu kadar ${a.tr} olur diye varsaymamak gerek.` })),
  frame('C1', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Se ${defN(n)} sia davvero così ${agree(a, n)}, resta da vedere.`, tr: `${cap(n.tr)} gerçekten bu kadar ${a.tr} mı, şüpheli.` })),
  frame('C1', 'advice', 999, [V], ([v]) => ({ en: `Sarebbe davvero sensato ${v.inf} regolarmente.`, tr: `Düzenli olarak ${v.trInf} gerçekten mantıklı olurdu.` })),
  frame('C1', 'advice', 999, [V], ([v]) => ({ en: `Sono consapevole che dovrei ${v.inf} più spesso.`, tr: `Daha sık ${v.trInf} gerektiğinin farkındayım.` })),
  frame('C2', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Difficilmente si potrebbe sostenere che ${defN(n)} sia particolarmente ${agree(a, n)}.`, tr: `${cap(n.tr)} özellikle ${a.tr} denemez pek.` })),
  frame('C2', 'describing', 600, [NOUNS, A], ([n, a]) => ({ en: `Non si può negare che ${defN(n)} sia notevolmente ${agree(a, n)}.`, tr: `${cap(n.tr)} dikkat çekici derecede ${a.tr}, bu inkar edilemez.` })),
  frame('C2', 'describing', 500, [OWNABLE, A], ([n, a]) => ({ en: `Raramente ho visto ${indN(n)} così ${agree(a, n)}.`, tr: `Nadiren bu kadar ${a.tr} bir ${n.tr} gördüm.` })),
  frame('C2', 'plans', 999, [V], ([v]) => ({ en: `Col senno di poi, avrei dovuto ${v.inf} molto più spesso.`, tr: `Geriye dönüp bakınca çok daha sık ${v.trInf} gerekirmiş.` }))
];

let _bank = null;

export function buildShortsBank() {
  if (_bank) return _bank;
  const all = [];
  FRAMES.forEach((f, fi) => {
    const sentences = expandFrame(f, 1000 + fi * 7919);
    sentences.forEach((s, si) => all.push({ ...s, id: `s${fi}_${si}` }));
  });
  DAILY.forEach((d, i) => all.push({
    en: d.t, tr: d.tr, level: d.level, topic: 'daily',
    words: d.t.split(/\s+/).length, id: `d${i}`
  }));
  const seen = new Set();
  const deduped = all.filter(s => {
    const k = s.en.toLowerCase();
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  deduped.sort((a, b) => levelRank(a.level) - levelRank(b.level));
  _bank = deduped;
  return _bank;
}

export function levelBands() {
  const bank = buildShortsBank();
  const bands = {};
  LEVEL_ORDER.forEach(lv => { bands[lv] = { start: -1, count: 0 }; });
  bank.forEach((s, i) => {
    if (bands[s.level].start === -1) bands[s.level].start = i;
    bands[s.level].count++;
  });
  return bands;
}

export function levelAtIndex(i) {
  const bank = buildShortsBank();
  const s = bank[Math.max(0, Math.min(bank.length - 1, i))];
  return s ? s.level : 'A0';
}

export function shortsCount() {
  return buildShortsBank().length;
}

let _byLevel = null;
export function sentencesForLevel(level) {
  if (!_byLevel) {
    _byLevel = {};
    LEVEL_ORDER.forEach(lv => { _byLevel[lv] = []; });
    for (const s of buildShortsBank()) _byLevel[s.level].push(s);
  }
  return _byLevel[level] || [];
}

export function shortForLevel(level, cursor) {
  const list = sentencesForLevel(level);
  if (!list.length) return buildShortsBank()[0];
  return list[cursor % list.length];
}
