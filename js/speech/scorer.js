// ============================================================================
// Speech-attempt scorer — LANGUAGE-CONFIGURED version.
//
// Same honesty contract as the English original:
//   - wordAccuracy / completeness / missing / extra / incorrect: REAL, from
//     weighted Levenshtein alignment of the recognizer's transcript.
//   - fluency: REAL but coarse (duration + pauses). clarity: recognizer
//     confidence ESTIMATE, never a phoneme-level pronunciation score.
//   - pronunciationAssessment: always null (PronunciationAdapter is the
//     integration point for a real service via a backend proxy).
//
// All language-specific word classes (function words, negation, numbers,
// fillers, digit forms, contraction expansions) come from
// ../data/shorts/langConfig.js. Tokenization is Unicode-aware and folds
// diacritics on BOTH sides (ä->a, é->e, ß->ss, œ->oe), so typed answers
// without accents are compared fairly against accented content.
// ============================================================================

import {
  FUNCTION_WORDS as FN_LIST, NEGATION_WORDS as NEG_LIST, NUMBER_WORDS as NUM_LIST,
  FILLER_WORDS as FILL_LIST, DIGIT_WORDS, CONTRACTIONS, ASR_EQUIVALENTS
} from '../data/shorts/langConfig.js?v=5';

export const STRICTNESS_THRESHOLDS = {
  relaxed:        { wordAccuracy: 60, clarity: 0,  fluency: 0,  allowMissingFn: true  },
  normal:         { wordAccuracy: 78, clarity: 30, fluency: 35, allowMissingFn: true  },
  strict:         { wordAccuracy: 92, clarity: 45, fluency: 50, allowMissingFn: false },
  'near-perfect': { wordAccuracy: 98, clarity: 55, fluency: 60, allowMissingFn: false }
};

// Fold diacritics and language-specific letter variants so "uber"=="über",
// "cafe"=="café". Applied to content AND transcript — symmetric, therefore fair.
function fold(s) {
  return s.normalize('NFD').replace(/\p{M}/gu, '')
    .replace(/ß/g, 'ss').replace(/œ/g, 'oe').replace(/æ/g, 'ae');
}

const FUNCTION_WORDS = new Set(FN_LIST.map(w => fold(w.toLowerCase())));
const NEGATION_WORDS = new Set(NEG_LIST.map(w => fold(w.toLowerCase())));
const NUMBER_WORDS = new Set(NUM_LIST.map(w => fold(w.toLowerCase())));
const FILLER_WORDS = new Set(FILL_LIST.map(w => fold(w.toLowerCase())));
const DIGITS = Object.fromEntries(Object.entries(DIGIT_WORDS).map(([d, w]) => [d, fold(w.toLowerCase())]));
const EQUIV = new Map(ASR_EQUIVALENTS.map(([a, b]) => [fold(a.toLowerCase()), fold(b.toLowerCase())]));

function normalizeSentence(sentence) {
  let s = sentence.toLowerCase().normalize('NFC').replace(/[’‘]/g, "'");
  for (const [re, expansion] of CONTRACTIONS) s = s.replace(re, expansion);
  return fold(s);
}

// Unicode tokenizer: apostrophes and punctuation are separators, so French/
// Italian elisions ("l'aéroport" -> l + aeroport) align consistently with ASR.
function toTokens(sentence) {
  return (normalizeSentence(sentence).match(/[\p{L}\p{N}]+/gu) || [])
    .map(w => DIGITS[w] || w)
    .map(w => EQUIV.get(w) || w)
    .filter(w => !FILLER_WORDS.has(w));
}

function wordWeight(word) {
  if (NEGATION_WORDS.has(word)) return 2.5;
  if (NUMBER_WORDS.has(word)) return 2.0;
  if (FUNCTION_WORDS.has(word)) return 0.45;
  return 1.0;
}

function alignWords(expected, actual) {
  const n = expected.length, m = actual.length;
  const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0));
  for (let i = 0; i <= n; i++) dp[i][0] = i;
  for (let j = 0; j <= m; j++) dp[0][j] = j;
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      dp[i][j] = expected[i - 1] === actual[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const ops = [];
  let i = n, j = m;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && expected[i - 1] === actual[j - 1]) {
      ops.unshift({ type: 'match', expected: expected[i - 1], actual: actual[j - 1] }); i--; j--;
    } else if (i > 0 && j > 0 && dp[i][j] === dp[i - 1][j - 1] + 1) {
      ops.unshift({ type: 'sub', expected: expected[i - 1], actual: actual[j - 1] }); i--; j--;
    } else if (i > 0 && dp[i][j] === dp[i - 1][j] + 1) {
      ops.unshift({ type: 'del', expected: expected[i - 1] }); i--;
    } else {
      ops.unshift({ type: 'ins', actual: actual[j - 1] }); j--;
    }
  }
  return ops;
}

function scoreAgainstTarget(targetSentence, transcript) {
  const expectedTokens = toTokens(targetSentence);
  const actualTokens = toTokens(transcript);
  const ops = alignWords(expectedTokens, actualTokens);

  let earned = 0, possible = 0, extraPenalty = 0;
  for (const op of ops) {
    if (op.type === 'match') { earned += wordWeight(op.expected); possible += wordWeight(op.expected); }
    else if (op.type === 'sub' || op.type === 'del') { possible += wordWeight(op.expected); }
    else if (op.type === 'ins') { extraPenalty += wordWeight(op.actual) * 0.5; }
  }
  const raw = possible > 0 ? Math.max(0, (earned - extraPenalty) / possible) : 0;
  const wordAccuracy = Math.round(raw * 100);

  const matches = ops.filter(o => o.type === 'match').length;
  const completeness = expectedTokens.length ? Math.round((matches / expectedTokens.length) * 100) : 0;

  return { ops, wordAccuracy, completeness, expectedTokens, actualTokens };
}

function findCriticalErrors(ops) {
  const reasons = [];
  for (const op of ops) {
    if (op.type === 'del' && NEGATION_WORDS.has(op.expected)) {
      reasons.push(`Missing "${op.expected}" changes the meaning of the sentence.`);
    }
    if (op.type === 'sub' && (NEGATION_WORDS.has(op.expected) || NEGATION_WORDS.has(op.actual))) {
      reasons.push(`"${op.actual}" instead of "${op.expected}" changes the meaning.`);
    }
    if (op.type === 'sub' && NUMBER_WORDS.has(op.expected) && NUMBER_WORDS.has(op.actual) && op.expected !== op.actual) {
      reasons.push(`The number "${op.actual}" is not "${op.expected}" -- numbers must be exact.`);
    }
    if (op.type === 'del' && NUMBER_WORDS.has(op.expected)) {
      reasons.push(`The number "${op.expected}" was not heard.`);
    }
    if (op.type === 'ins' && NEGATION_WORDS.has(op.actual)) {
      reasons.push(`Adding "${op.actual}" changes the meaning of the sentence.`);
    }
  }
  return reasons;
}

function scoreFluency(timing, expectedWordCount) {
  if (!timing || !timing.durationMs) return { fluency: null, wpm: null, longestPauseMs: null, tips: [] };
  const tips = [];
  const seconds = timing.durationMs / 1000;
  const wpm = seconds > 0 ? Math.round((expectedWordCount / seconds) * 60) : 0;
  let fluency = 85;
  if (wpm > 0 && wpm < 50) {
    fluency -= 30;
    tips.push('Try saying the whole sentence in one smooth flow, a little faster.');
  } else if (wpm > 0 && wpm < 75) {
    fluency -= 12;
  } else if (wpm > 230) {
    fluency -= 15;
    tips.push('Try saying the sentence a little more slowly and clearly.');
  }
  const longestPauseMs = Math.max(0, ...(timing.pauseGapsMs || [0]));
  if (longestPauseMs > 1800) {
    fluency -= 25;
    tips.push('There was a long pause in the middle -- try to keep the sentence connected.');
  } else if (longestPauseMs > 1000) {
    fluency -= 10;
  }
  return { fluency: Math.max(0, Math.min(100, fluency)), wpm, longestPauseMs, tips };
}

function buildWordTips(ops) {
  const tips = [];
  for (const op of ops) {
    if (op.type === 'del') {
      tips.push(FUNCTION_WORDS.has(op.expected)
        ? `The small word "${op.expected}" was not detected -- these words are quick but important.`
        : `Missing word: "${op.expected}".`);
    } else if (op.type === 'sub') {
      tips.push(`Expected "${op.expected}" but heard "${op.actual}".`);
    } else if (op.type === 'ins') {
      tips.push(`Extra word heard: "${op.actual}".`);
    }
  }
  if (tips.length > 3) {
    tips.length = 3;
    tips.push('Listen to the sentence again, then try it slowly in one calm breath.');
  }
  return tips;
}

export class PronunciationAdapter {
  async assess(_audioBlob, _referenceText) { return null; }
}
let pronunciationAdapter = new PronunciationAdapter();
export function setPronunciationAdapter(adapter) { pronunciationAdapter = adapter; }
export function getPronunciationAdapter() { return pronunciationAdapter; }

export function scoreAttempt({ expected, altAccepted = [], transcript, confidence, timing, strictness = 'normal' }) {
  const thresholds = STRICTNESS_THRESHOLDS[strictness] || STRICTNESS_THRESHOLDS.normal;

  if (!transcript || !toTokens(transcript).length) {
    return {
      accepted: false, empty: true,
      wordAccuracy: 0, completeness: 0, clarity: null, fluency: null,
      grammarAdherence: 0, overallScore: 0,
      diff: toTokens(expected).map(w => ({ type: 'del', expected: w })),
      missing: toTokens(expected), incorrect: [], extra: [], problemWords: [],
      criticalErrors: [], tips: ['No speech was detected. Press the microphone and speak clearly.'],
      wpm: null, longestPauseMs: null,
      assessmentMode: 'transcript-based', pronunciationAssessment: null,
      strictnessUsed: strictness, matchedTarget: expected
    };
  }

  const targets = [expected, ...altAccepted];
  let best = null, bestTarget = expected;
  for (const t of targets) {
    const s = scoreAgainstTarget(t, transcript);
    if (!best || s.wordAccuracy > best.wordAccuracy) { best = s; bestTarget = t; }
  }

  const criticalErrors = findCriticalErrors(best.ops);
  const { fluency, wpm, longestPauseMs, tips: fluencyTips } = scoreFluency(timing, best.expectedTokens.length);
  const clarity = (typeof confidence === 'number' && confidence > 0)
    ? Math.round(confidence * 100)
    : null;
  const wordTips = buildWordTips(best.ops);

  const missing = best.ops.filter(o => o.type === 'del').map(o => o.expected);
  const incorrect = best.ops.filter(o => o.type === 'sub').map(o => ({ expected: o.expected, said: o.actual }));
  const extra = best.ops.filter(o => o.type === 'ins').map(o => o.actual);
  const problemWords = [...missing, ...incorrect.map(w => w.expected)].filter(w => !FUNCTION_WORDS.has(w));

  const grammarAdherence = Math.max(0, 100 - missing.length * 10 - incorrect.length * 14 - extra.length * 6);

  let accepted =
    criticalErrors.length === 0 &&
    best.wordAccuracy >= thresholds.wordAccuracy &&
    (clarity === null || clarity >= thresholds.clarity) &&
    (fluency === null || fluency >= thresholds.fluency);

  if (accepted && !thresholds.allowMissingFn && missing.length > 0) accepted = false;
  if (accepted && missing.some(w => !FUNCTION_WORDS.has(w))) accepted = false;

  const parts = [best.wordAccuracy];
  if (clarity !== null) parts.push(clarity);
  if (fluency !== null) parts.push(fluency);
  const overallScore = Math.round(parts.reduce((a, b) => a + b, 0) / parts.length);

  return {
    accepted, empty: false,
    wordAccuracy: best.wordAccuracy,
    completeness: best.completeness,
    clarity, fluency, grammarAdherence, overallScore,
    diff: best.ops, missing, incorrect, extra, problemWords, criticalErrors,
    tips: [...(criticalErrors.length ? criticalErrors : []), ...wordTips, ...fluencyTips],
    wpm, longestPauseMs,
    assessmentMode: 'transcript-based',
    pronunciationAssessment: null,
    strictnessUsed: strictness,
    matchedTarget: bestTarget
  };
}
