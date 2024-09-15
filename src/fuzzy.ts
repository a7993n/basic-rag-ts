import { get } from 'fast-levenshtein';

export class FuzzyMatch {
  public fuzzyMatch(term: string, word: string): number {
    const distance = get(term.toLowerCase(), word.toLowerCase());
    const maxLen = Math.max(term.length, word.length);
    return 1 - distance / maxLen;
  }
}
