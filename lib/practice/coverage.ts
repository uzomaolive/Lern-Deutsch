import type { CheatSheet } from "@/content/practice/schema";

/**
 * Cheat-sheet coverage matching. Pure functions; the browser transcript
 * feeds in and the report counts how much of the cheat sheet the learner
 * actually used. Normalization: lowercase, umlauts kept, punctuation
 * stripped, whitespace collapsed, so partial phrases match.
 */

export function normalizeTranscript(text: string): string {
  return text
    .toLowerCase()
    .replace(/[.,!?;:„"“”()…]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Core of a cheat item without its leading article, so "der Termin"
 * still matches a transcript that says "einen Termin".
 */
const ARTICLE_RE = /^(der|die|das|ein|eine|einen|einem|einer|den|dem|mein|meine|meinen|meinem|dein|deine|ihr|ihre|ihren|sein|seine|seinen)\s+/;

export function coreWord(item: string): string {
  const normalized = normalizeTranscript(item);
  return normalized.replace(ARTICLE_RE, "");
}

/** True when the item's core appears in the transcript. */
function itemMatches(item: string, transcript: string): boolean {
  const normalized = normalizeTranscript(item);
  if (normalized.length === 0) return false;
  if (transcript.includes(normalized)) return true;
  const core = coreWord(item);
  if (core.length > 0 && core !== normalized && transcript.includes(core)) return true;
  // Separable verbs: "anrufen" is spoken as "rufe ... an". Match a verb
  // root from the stem when the prefix has moved to the end of the clause.
  const separablePrefixes = [
    "an", "aus", "ein", "auf", "mit", "ab", "vor", "zu", "nach", "los",
    "her", "hin", "weg", "zurück",
  ];
  const match = separablePrefixes.find((prefix) => core.startsWith(prefix));
  if (!match) return false;
  const stem = core.slice(match.length);
  if (stem.length <= 3) return false;
  // Conjugated forms share the root, e.g. stem "rufen" matches "rufe".
  const root = stem.slice(0, 4);
  return transcript.split(" ").some((word) => word.startsWith(root));
}

export interface CoverageReport {
  /** Cheat-sheet words that appear in the transcript. */
  usedWords: string[];
  /** Sentence starters that appear in the transcript. */
  usedStarters: string[];
  /** Connectors that appear in the transcript. */
  usedConnectors: string[];
  /** Words and starters that did not appear. */
  missed: string[];
  /** Percentage of cheat-sheet items (words + starters) that were used. */
  coveragePercent: number;
}

export function findCoveredItems(
  cheat: CheatSheet,
  transcript: string,
): Omit<CoverageReport, "missed" | "coveragePercent"> {
  const normalized = normalizeTranscript(transcript);
  if (normalized.length === 0) {
    return { usedWords: [], usedStarters: [], usedConnectors: [] };
  }

  const usedWords = cheat.words.filter((word) => itemMatches(word, normalized));
  const usedStarters = cheat.sentenceStarters.filter((starter) =>
    itemMatches(starter, normalized),
  );
  const usedConnectors = cheat.connectors.filter((connector) =>
    itemMatches(connector, normalized),
  );
  return { usedWords, usedStarters, usedConnectors };
}

export function buildCoverage(cheat: CheatSheet, transcript: string): CoverageReport {
  const used = findCoveredItems(cheat, transcript);
  const checklist = [...cheat.words, ...cheat.sentenceStarters];
  const missed = checklist.filter(
    (item) => ![...used.usedWords, ...used.usedStarters].includes(item),
  );
  const coveragePercent =
    checklist.length === 0
      ? 0
      : Math.round(
          ((used.usedWords.length + used.usedStarters.length) / checklist.length) *
            100,
        );
  return { ...used, missed, coveragePercent };
}