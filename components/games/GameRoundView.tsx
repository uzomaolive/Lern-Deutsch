"use client";

import { ExerciseHost } from "@/components/exercises/ExerciseHost";
import { MemoryCards } from "./MemoryCards";
import { CategorySort } from "./CategorySort";
import { RepeatAfterMe } from "./RepeatAfterMe";
import { TimeWordRush } from "./TimeWordRush";
import { WordleGame } from "./WordleGame";
import { ScrambleGame } from "./ScrambleGame";
import { WordMatchGrid } from "./WordMatchGrid";
import type { GameRound } from "@/content/games/schema";

interface GameRoundViewProps {
  round: GameRound;
  roundIndex: number;
}

export function GameRoundView({ round, roundIndex }: GameRoundViewProps) {
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
  return (
    <ExerciseHost
      exercise={round.exercise}
      exerciseKey={`games:round:${roundIndex}:${round.exercise.id}`}
      onResult={() => {
        /* games are practice; nothing to persist */
      }}
    />
  );
}