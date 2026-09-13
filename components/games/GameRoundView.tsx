"use client";

import { ExerciseHost } from "@/components/exercises/ExerciseHost";
import { MemoryCards } from "./MemoryCards";
import { CategorySort } from "./CategorySort";
import { RepeatAfterMe } from "./RepeatAfterMe";
import { TimeWordRush } from "./TimeWordRush";
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