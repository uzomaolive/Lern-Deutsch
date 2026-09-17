/**
 * Games content model. Each game has levels; each level has rounds.
 * Rounds either reuse the six course exercise types (flashcard, matching,
 * multiple-choice, fill-blank, word-order, listening) or use a dedicated
 * game mechanic (memory cards, category sort, repeat after me, time rush).
 */

import type { Exercise } from "../schema";

export type GameCategory =
  | "vocabulary"
  | "grammar"
  | "listening"
  | "speaking"
  | "mixed";

export interface MemoryCard {
  /** German word or phrase (card front). */
  de: string;
  /** English or matching partner (card back). */
  en: string;
  /** Speak the German side via TTS. */
  audio?: boolean;
}

export interface MemoryRound {
  kind: "memory";
  title: string;
  instruction: string;
  cards: MemoryCard[];
}

export interface SortCategory {
  name: string;
  items: string[];
}

export interface SortRound {
  kind: "sort";
  title: string;
  instruction: string;
  categories: SortCategory[];
}

export interface RepeatRound {
  kind: "repeat";
  title: string;
  instruction: string;
  phrases: string[];
}

export interface RushQuestion {
  prompt: string;
  options: string[];
  correctIndex: number;
}

export interface RushRound {
  kind: "rush";
  title: string;
  instruction: string;
  /** Seconds allowed for the whole round. */
  timeLimit: number;
  questions: RushQuestion[];
}

export interface WordleRound {
  kind: "wordle";
  title: string;
  instruction: string;
  /** Candidate 5-letter German words; one is picked per play. */
  words: string[];
  /** Number of words to play in this round. Default 1. */
  plays?: number;
}

export interface ScrambleItem {
  de: string;
  en: string;
  /** Seconds allowed for this word. Default 30. */
  timeLimit?: number;
  /** Speak the German word via TTS. */
  audio?: boolean;
}

export interface ScrambleRound {
  kind: "scramble";
  title: string;
  instruction: string;
  items: ScrambleItem[];
}

export interface GridMatchRound {
  kind: "grid-match";
  title: string;
  instruction: string;
  /** German-English pairs shuffled into one grid. */
  pairs: [string, string][];
  /** Seconds allowed to clear the grid. Default 45. */
  timeLimit?: number;
}

export type GameRound =
  | { kind: "exercise"; exercise: Exercise }
  | MemoryRound
  | SortRound
  | RepeatRound
  | RushRound
  | WordleRound
  | ScrambleRound
  | GridMatchRound;

export interface GameLevel {
  id: string;
  title: string;
  rounds: GameRound[];
}

export interface Game {
  id: string;
  title: string;
  emoji: string;
  description: string;
  category: GameCategory;
  /** Level badges shown on the games index, e.g. ["A1", "A2"]. */
  tags?: string[];
  levels: GameLevel[];
}