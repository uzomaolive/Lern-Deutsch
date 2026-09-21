/**
 * English translations for exam writing/speaking drills, keyed by the
 * German text the learner must rebuild (fill-blank sentence or the joined
 * word-order chunks). Looked up by the exam factories so call sites stay
 * unchanged.
 */
import { MAPPING, COMPOUND_MAPPING } from "./exam-translations-data";

export function translationForSentence(sentence: string): string | undefined {
  return MAPPING[sentence];
}

export function translationForChunks(chunks: string[]): string | undefined {
  const joined = chunks.join(" ");
  return MAPPING[joined] ?? COMPOUND_MAPPING[joined]?.[1];
}