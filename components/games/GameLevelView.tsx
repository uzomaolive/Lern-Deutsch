"use client";

import { useState } from "react";
import { GameRoundView } from "./GameRoundView";
import { useProgress } from "@/components/progress/ProgressProvider";
import { useMounted } from "@/hooks/useMounted";
import { gameRoundExerciseKey } from "@/lib/games/roundKeys";
import type { Game } from "@/content/games/schema";

interface GameLevelViewProps {
  game: Game;
}

export function GameLevelView({ game }: GameLevelViewProps) {
  const [levelIndex, setLevelIndex] = useState(0);
  const { state, recordExercise, recordFlashcard } = useProgress();
  const mounted = useMounted();
  const level = game.levels[levelIndex];

  return (
    <div className="mt-6">
      <div role="tablist" aria-label="Levels" className="flex flex-wrap gap-2">
        {game.levels.map((candidate, index) => (
          <button
            key={candidate.id}
            type="button"
            role="tab"
            aria-selected={index === levelIndex}
            onClick={() => setLevelIndex(index)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${
              index === levelIndex
                ? "bg-amber-600 text-stone-950"
                : "border border-stone-300 bg-white text-stone-700 hover:border-amber-500 hover:text-amber-700"
            }`}
          >
            {candidate.title}
          </button>
        ))}
      </div>

      <div role="tabpanel" className="mt-6 space-y-6">
        {level.rounds.map((round, roundIndex) => {
          const exerciseKey =
            round.kind === "exercise"
              ? gameRoundExerciseKey(
                  game.id,
                  level.id,
                  roundIndex,
                  round.exercise.id,
                )
              : undefined;
          const record = exerciseKey ? state.exercises[exerciseKey] : undefined;
          const savedAnswer = mounted && exerciseKey ? record?.answer : undefined;
          return (
            <div
              key={`${level.id}-${roundIndex}`}
              className="rounded-xl border border-stone-200 bg-stone-50 p-5"
            >
              <p className="mb-3 text-xs font-medium uppercase tracking-wide text-stone-500">
                Round {roundIndex + 1}
              </p>
              <GameRoundView
                round={round}
                roundIndex={roundIndex}
                exerciseKey={exerciseKey}
                savedAnswer={savedAnswer}
                onResult={
                  exerciseKey
                    ? (percent, answer) =>
                        recordExercise(exerciseKey, percent, answer)
                    : undefined
                }
                onFlashcardResult={
                  exerciseKey
                    ? (itemIndex, correct) =>
                        recordFlashcard(`${exerciseKey}:${itemIndex}`, correct)
                    : undefined
                }
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}