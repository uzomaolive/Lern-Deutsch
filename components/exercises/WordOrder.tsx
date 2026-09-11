"use client";

import { useEffect, useState } from "react";
import { FeedbackBanner } from "./feedback";
import { shuffleWithSeed } from "@/lib/exercises/shuffle";
import type { WordOrderExercise } from "@/content/schema";

interface WordOrderProps {
  exercise: WordOrderExercise;
  /** Saved answer payload: { built } as the learner's chunk order. */
  savedAnswer?: unknown;
  onResult: (percent: number, answer?: unknown) => void;
}

interface WordOrderSaved {
  built: string[];
}

function isWordOrderSaved(value: unknown): value is WordOrderSaved {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as WordOrderSaved).built)
  );
}

function seedFor(exercise: WordOrderExercise): string {
  return `word-order:${exercise.id}:${exercise.chunks.join("|")}`;
}

export function WordOrder({ exercise, savedAnswer, onResult }: WordOrderProps) {
  const saved = isWordOrderSaved(savedAnswer) ? savedAnswer : null;
  const savedBuilt = saved ? [...saved.built] : null;
  const [pool, setPool] = useState<string[]>(() =>
    savedBuilt
      ? exercise.chunks.filter((chunk) => !savedBuilt.includes(chunk))
      : shuffleWithSeed(exercise.chunks, seedFor(exercise)).items,
  );
  const [built, setBuilt] = useState<string[]>(() => savedBuilt ?? []);
  const [feedback, setFeedback] = useState<"idle" | "correct" | "wrong">(() => {
    if (!savedBuilt) return "idle";
    const correct =
      savedBuilt.length === exercise.chunks.length &&
      savedBuilt.every((chunk, index) => chunk === exercise.chunks[index]);
    return correct ? "correct" : "wrong";
  });

  useEffect(() => {
    if (savedAnswer !== undefined) return;
    setPool(shuffleWithSeed(exercise.chunks, seedFor(exercise)).items);
    setBuilt([]);
    setFeedback("idle");
  }, [exercise, savedAnswer]);

  function addToSentence(chunk: string) {
    if (feedback !== "idle") return;
    setPool(pool.filter((item) => item !== chunk));
    setBuilt([...built, chunk]);
  }

  function removeFromSentence(chunk: string) {
    if (feedback !== "idle") return;
    setBuilt(built.filter((item) => item !== chunk));
    setPool([...pool, chunk]);
  }

  function check() {
    const correct = built.every((chunk, index) => chunk === exercise.chunks[index]);
    setFeedback(correct ? "correct" : "wrong");
    onResult(correct ? 100 : 0, { built });
  }

  function retry() {
    setPool(shuffleWithSeed(exercise.chunks, seedFor(exercise)).items);
    setBuilt([]);
    setFeedback("idle");
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{exercise.title}</h3>
      <p className="mt-1 text-sm text-stone-600">{exercise.instruction}</p>

      <div
        aria-label="Your sentence"
        className="mt-4 flex min-h-16 flex-wrap items-center gap-2 rounded-lg border border-dashed border-stone-400 bg-white p-3"
      >
        {built.length === 0 ? (
          <span className="text-sm text-stone-500">Tap the words below to build the sentence.</span>
        ) : (
          built.map((chunk, index) => (
            <button
              key={`${chunk}-${index}`}
              type="button"
              onClick={() => removeFromSentence(chunk)}
              className="rounded-md border border-amber-300 bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-900 transition-colors hover:border-rose-400 hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              {chunk}
            </button>
          ))
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2" aria-label="Available words">
        {pool.map((chunk) => (
          <button
            key={chunk}
            type="button"
            onClick={() => addToSentence(chunk)}
            className="rounded-md border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-800 transition-colors hover:border-amber-500 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            {chunk}
          </button>
        ))}
      </div>

      {feedback !== "idle" ? (
        <FeedbackBanner
          kind={feedback}
          correctText={exercise.chunks.join(" ")}
          explain={exercise.explain}
        />
      ) : null}

      {feedback === "idle" ? (
        <button
          type="button"
          disabled={built.length !== exercise.chunks.length}
          onClick={check}
          className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-stone-950 transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:bg-stone-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Check
        </button>
      ) : (
        <button
          type="button"
          onClick={retry}
          className="mt-3 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Try again
        </button>
      )}
    </div>
  );
}