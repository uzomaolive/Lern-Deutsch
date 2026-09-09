/**
 * Answer normalization for typed exercises. Umlauts are made equivalent to
 * their transliterations (ae, oe, ue, ss) in both directions so learners on
 * non-German keyboards are not punished.
 */

export function normalizeAnswer(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/ß/g, "ss")
    .replace(/ü/g, "ue")
    .replace(/ö/g, "oe")
    .replace(/ä/g, "ae")
    .replace(/\s+/g, " ")
    .trim();
}

export interface FillBlankDefinition {
  answers: string[];
  hint?: string;
}

export function checkFillBlank(blank: FillBlankDefinition, input: string): boolean {
  const normalized = normalizeAnswer(input);
  if (normalized.length === 0) return false;
  return blank.answers.some((answer) => normalizeAnswer(answer) === normalized);
}