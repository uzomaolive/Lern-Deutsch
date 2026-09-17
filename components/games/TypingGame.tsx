"use client";

import { useState } from "react";
import { AnswerInput } from "./AnswerInput";
import type { TypingRound } from "@/content/games/schema";

interface TypingGameProps {
  round: TypingRound;
}

export function TypingGame({ round }: TypingGameProps) {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [locked, setLocked] = useState(false);
  const [done, setDone] = useState(false);

  const item = round.items[index];

  function onResult(correct: boolean) {
    if (correct) {
      setScore((s) => s + 1);
      setLocked(true);
    }
  }

  function next() {
    if (index + 1 >= round.items.length) {
      setDone(true);
    } else {
      setIndex((i) => i + 1);
      setLocked(false);
    }
  }

  function retry() {
    setIndex(0);
    setScore(0);
    setLocked(false);
    setDone(false);
  }

  if (done) {
    return (
      <div>
        <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
        <div className="mt-4 rounded-lg bg-white p-6 text-center">
          <p className="text-lg font-medium text-stone-800">
            {score} of {round.items.length} correct
          </p>
        </div>
        <button
          type="button"
          onClick={retry}
          className="mt-3 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Play again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
      <div className="mt-1 flex flex-wrap items-center justify-between gap-2 text-sm text-stone-500">
        <span>
          {index + 1} of {round.items.length}
        </span>
        <span>Score: {score}</span>
      </div>
      <p className="mt-1 text-sm text-stone-600">{round.instruction}</p>

      <div className="mt-4 rounded-lg bg-white p-5">
        <p className="text-xl font-semibold text-stone-900">{item.prompt}</p>
        {item.audio ? <span className="sr-only">{item.prompt}</span> : null}
        <AnswerInput
          key={index}
          accept={item.accept}
          hint={item.hint}
          audioText={item.audio ? item.prompt : undefined}
          onResult={onResult}
        />
        {locked ? (
          <button
            type="button"
            onClick={next}
            className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Next →
          </button>
        ) : null}
      </div>
    </div>
  );
}