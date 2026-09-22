"use client";

import { ExerciseHost } from "@/components/exercises/ExerciseHost";
import { MemoryCards } from "./MemoryCards";
import { CategorySort } from "./CategorySort";
import { RepeatAfterMe } from "./RepeatAfterMe";
import { TimeWordRush } from "./TimeWordRush";
import { WordleGame } from "./WordleGame";
import { ScrambleGame } from "./ScrambleGame";
import { WordMatchGrid } from "./WordMatchGrid";
import { TypingGame } from "./TypingGame";
import { DropGame } from "./DropGame";
import { HangmanGame } from "./HangmanGame";
import { WordSearchGame } from "./WordSearchGame";
import { TimeGame } from "./TimeGame";
import { NumberKeypadGame } from "./NumberKeypadGame";
import type { GameRound } from "@/content/games/schema";

interface GameRoundViewProps {
  round: GameRound;
  roundIndex: number;
  /** Stable progress key for exercise rounds; undefined for custom games. */
  exerciseKey?: string;
  /** Saved answer payload restored on revisit. */
  savedAnswer?: unknown;
  /** Fired once per attempt session with the first-attempt score and answer. */
  onResult?: (percent: number, answer?: unknown) => void;
  /** Flashcard-only: per-card mastery reports. */
  onFlashcardResult?: (itemIndex: number, correct: boolean) => void;
}

export function GameRoundView({
  round,
  roundIndex,
  exerciseKey,
  savedAnswer,
  onResult,
  onFlashcardResult,
}: GameRoundViewProps) {
  if (round.kind === "memory") {
    return <MemoryCards round={round} />;
  }
  if (round.kind === "sort") {
    return <CategorySort round={round} />;
  }
  if (round.kind === "repeat") {
    return <RepeatAfterMe round={round} />;
  }
  if (round.kind === "rush") {
    return <TimeWordRush round={round} />;
  }
  if (round.kind === "wordle") {
    return <WordleGame round={round} seed={`wordle:${roundIndex}`} />;
  }
  if (round.kind === "scramble") {
    return <ScrambleGame round={round} seed={`scramble:${roundIndex}`} />;
  }
  if (round.kind === "grid-match") {
    return <WordMatchGrid round={round} seed={`grid:${roundIndex}`} />;
  }
  if (round.kind === "typing") {
    return <TypingGame round={round} />;
  }
  if (round.kind === "drop") {
    return <DropGame round={round} seed={`drop:${roundIndex}`} />;
  }
  if (round.kind === "hangman") {
    return <HangmanGame round={round} seed={`hangman:${roundIndex}`} />;
  }
  if (round.kind === "wordsearch") {
    return <WordSearchGame round={round} seed={`wordsearch:${roundIndex}`} />;
  }
  if (round.kind === "time") {
    return <TimeGame round={round} />;
  }
  if (round.kind === "keypad") {
    return <NumberKeypadGame round={round} seed={`keypad:${roundIndex}`} />;
  }
  return (
    <ExerciseHost
      key={
        exerciseKey && savedAnswer !== undefined
          ? `answered:${exerciseKey}`
          : `fresh:${exerciseKey ?? roundIndex}`
      }
      exercise={round.exercise}
      exerciseKey={exerciseKey ?? `games:round:${roundIndex}:${round.exercise.id}`}
      savedAnswer={savedAnswer}
      onResult={onResult ?? (() => {})}
      onFlashcardResult={onFlashcardResult}
    />
  );
}