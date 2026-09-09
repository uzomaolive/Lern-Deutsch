"use client";

import { useState } from "react";
import { SpeakButton } from "@/components/ui/SpeakButton";
import { percentCorrect } from "@/lib/progress/scoring";
import { FeedbackBanner } from "./feedback";
import type { FlashcardExercise } from "@/content/schema";

interface FlashcardProps {
  exercise: FlashcardExercise;
  onResult: (percent: number) => void;
  /** Reports per-card mastery, keyed by card index within the exercise. */
  onFlashcardResult?: (itemIndex: number, correct: boolean) => void;
}

export function Flashcard({ exercise, onResult, onFlashcardResult }: FlashcardProps) {
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [known, setKnown] = useState<Set<number>>(new Set());
  const [done, setDone] = useState(false);

  const item = exercise.items[index];

  function advance(knewIt: boolean) {
    onFlashcardResult?.(index, knewIt);
    const nextKnown = new Set(known);
    if (knewIt) nextKnown.add(index);
    if (index + 1 >= exercise.items.length) {
      setKnown(nextKnown);
      setDone(true);
      onResult(percentCorrect(nextKnown.size, exercise.items.length));
      return;
    }
    setKnown(nextKnown);
    setIndex(index + 1);
    setRevealed(false);
  }

  function retry() {
    setIndex(0);
    setRevealed(false);
    setKnown(new Set());
    setDone(false);
  }

  if (done) {
    return (
      <div>
        <h3 className="text-base font-semibold text-stone-900">{exercise.title}</h3>
        <p className="mt-1 text-sm text-stone-600">{exercise.instruction}</p>
        <div className="mt-4 rounded-lg bg-white p-6 text-center">
          <p className="text-lg font-medium text-stone-800">
            You knew {known.size} of {exercise.items.length} cards.
          </p>
        </div>
        <FeedbackBanner kind={known.size === exercise.items.length ? "correct" : "wrong"} />
        <button
          type="button"
          onClick={retry}
          className="mt-3 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Practice again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{exercise.title}</h3>
      <p className="mt-1 text-sm text-stone-600">
        {exercise.instruction} Card {index + 1} of {exercise.items.length}.
      </p>

      <div className="mt-4 rounded-lg border border-stone-200 bg-white p-6 text-center">
        <div className="flex items-center justify-center gap-2">
          <p className="text-2xl font-semibold text-stone-900">{item.front}</p>
          {item.frontAudio ? <SpeakButton text={item.front} /> : null}
        </div>
        {revealed ? (
          <p className="mt-4 text-lg text-stone-700">{item.back}</p>
        ) : (
          <button
            type="button"
            onClick={() => setRevealed(true)}
            className="mt-4 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Show answer
          </button>
        )}
      </div>

      {revealed ? (
        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={() => advance(false)}
            className="flex-1 rounded-lg border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-800 hover:bg-rose-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          >
            Again
          </button>
          <button
            type="button"
            onClick={() => advance(true)}
            className="flex-1 rounded-lg border border-emerald-300 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-800 hover:bg-emerald-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            I knew it
          </button>
        </div>
      ) : null}
    </div>
  );
}