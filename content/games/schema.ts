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

export type GameRound =
  | { kind: "exercise"; exercise: Exercise }
  | MemoryRound
  | SortRound
  | RepeatRound
  | RushRound;

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
  levels: GameLevel[];
}