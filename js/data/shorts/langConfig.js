// ============================================================================
// Language configuration — ITALIAN (it-IT). See the German clone's file for
// the role of each list; the scorer folds diacritics on both sides.
// ============================================================================

export const LOCALE = 'it-IT';
export const APP_LANG = 'İtalyanca';

export const FUNCTION_WORDS = [
  'il', 'lo', 'la', 'i', 'gli', 'le', 'l', 'un', 'una', 'e', 'o', 'a', 'al', 'alla',
  'allo', 'ai', 'in', 'su', 'con', 'per', 'di', 'del', 'della', 'dello', 'dei',
  'degli', 'delle', 'è', 'sono', 'ero', 'io', 'tu', 'lui', 'lei', 'noi', 'voi',
  'loro', 'mi', 'ti', 'si', 'ci', 'vi', 'ce', 'ne', 'che', 'chi', 'qui', 'qua',
  'lì', 'là', 'sì', 'anche', 'ancora', 'già', 'ecco', 'se', 'ma', 'più', 'favore'
];

export const NEGATION_WORDS = ['non', 'mai', 'niente', 'nulla', 'nessuno', 'neanche', 'nemmeno'];

export const NUMBER_WORDS = [
  'zero', 'due', 'tre', 'quattro', 'cinque', 'sei', 'sette', 'otto', 'nove', 'dieci',
  'undici', 'dodici', 'tredici', 'quattordici', 'quindici', 'sedici', 'diciassette',
  'diciotto', 'diciannove', 'venti', 'trenta', 'quaranta', 'cinquanta', 'sessanta',
  'settanta', 'ottanta', 'novanta', 'cento', 'mille'
];

export const FILLER_WORDS = ['ehm', 'uhm', 'hmm'];

export const DIGIT_WORDS = {
  '0': 'zero', '1': 'uno', '2': 'due', '3': 'tre', '4': 'quattro', '5': 'cinque',
  '6': 'sei', '7': 'sette', '8': 'otto', '9': 'nove', '10': 'dieci', '11': 'undici',
  '12': 'dodici', '20': 'venti', '100': 'cento', '1000': 'mille'
};

export const CONTRACTIONS = [];
export const ASR_EQUIVALENTS = [['ok', 'okay']];
