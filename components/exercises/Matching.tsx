"use client";

import { useState } from "react";
import { percentCorrect } from "@/lib/progress/scoring";
import { FeedbackBanner } from "./feedback";
import type { MatchingExercise } from "@/content/schema";

interface MatchingProps {
  exercise: MatchingExercise;
  onResult: (percent: number) => void;
}

export function Matching({ exercise, onResult }: MatchingProps) {
  const [leftSel, setLeftSel] = useState<number | null>(null);
  const [rightSel, setRightSel] = useState<number | null>(null);
  const [matched, setMatched] = useState<Set<number>>(new Set());
  const [firstTryErrors, setFirstTryErrors] = useState<Set<number>>(new Set());
  const [wrongPair, setWrongPair] = useState<[number, number] | null>(null);
  const [done, setDone] = useState(false);

  const pairs = exercise.pairs;
  const left = pairs.map(([de]) => de);
  const right = pairs.map(([, en]) => en);

  function pickLeft(index: number) {
    if (done) return;
    setWrongPair(null);
    setLeftSel(index);
    setRightSel(null);
  }

  function pickRight(index: number) {
    if (done || leftSel === null) return;
    if (leftSel === index) {
      const nextMatched = new Set(matched);
      nextMatched.add(index);
      setMatched(nextMatched);
      setLeftSel(null);
      setRightSel(null);
      if (nextMatched.size === pairs.length) {
        setDone(true);
        onResult(percentCorrect(pairs.length - firstTryErrors.size, pairs.length));
      }
    } else {
      setFirstTryErrors(new Set(firstTryErrors).add(leftSel));
      setWrongPair([leftSel, index]);
      setLeftSel(null);
      setRightSel(null);
    }
  }

  function retry() {
    setMatched(new Set());
    setFirstTryErrors(new Set());
    setLeftSel(null);
    setRightSel(null);
    setWrongPair(null);
    setDone(false);
  }

  function columnStyles(
    index: number,
    side: "left" | "right",
  ): string {
    if (matched.has(index)) return "border-emerald-500 bg-emerald-50 text-emerald-900";
    if (wrongPair && wrongPair[side === "left" ? 0 : 1] === index)
      return "border-rose-400 bg-rose-50 text-rose-900";
    const selected = side === "left" ? leftSel === index : rightSel === index;
    return selected
      ? "border-amber-500 bg-amber-50 text-amber-900"
      : "border-stone-300 bg-white text-stone-800 hover:border-amber-500";
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{exercise.title}</h3>
      <p className="mt-1 text-sm text-stone-600">{exercise.instruction}</p>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="space-y-2">
          {left.map((item, index) => (
            <button
              key={index}
              type="button"
              disabled={matched.has(index) || done}
              onClick={() => pickLeft(index)}
              className={`block w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${columnStyles(index, "left")}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="space-y-2">
          {right.map((item, index) => (
            <button
              key={index}
              type="button"
              disabled={matched.has(index) || done}
              onClick={() => pickRight(index)}
              className={`block w-full rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${columnStyles(index, "right")}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {done ? (
        <FeedbackBanner kind={firstTryErrors.size === 0 ? "correct" : "wrong"} />
      ) : null}

      {done ? (
        <button
          type="button"
          onClick={retry}
          className="mt-3 rounded-lg border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 hover:border-amber-500 hover:text-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}