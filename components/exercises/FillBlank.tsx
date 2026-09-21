"use client";

import { useState } from "react";
import { checkFillBlank } from "@/lib/progress/answers";
import { percentCorrect } from "@/lib/progress/scoring";
import { FeedbackBanner } from "./feedback";
import type { FillBlankExercise } from "@/content/schema";

interface FillBlankProps {
  exercise: FillBlankExercise;
  /** Saved answer payload: { values } in blank order. */
  savedAnswer?: unknown;
  onResult: (percent: number, answer?: unknown) => void;
}

interface FillBlankSaved {
  values: string[];
}

function isFillBlankSaved(value: unknown): value is FillBlankSaved {
  return (
    typeof value === "object" &&
    value !== null &&
    Array.isArray((value as FillBlankSaved).values)
  );
}

export function FillBlank({ exercise, savedAnswer, onResult }: FillBlankProps) {
  const saved = isFillBlankSaved(savedAnswer) ? savedAnswer : null;
  const [values, setValues] = useState<string[]>(() =>
    saved ? [...saved.values] : exercise.blanks.map(() => ""),
  );
  const [feedback, setFeedback] = useState<("idle" | "correct" | "wrong")[]>(
    () =>
      saved
        ? exercise.blanks.map((blank, index) =>
            checkFillBlank(blank, saved.values[index] ?? "") ? "correct" : "wrong",
          )
        : exercise.blanks.map(() => "idle"),
  );
  const [submitted, setSubmitted] = useState(() => saved !== null);

  const parts = exercise.sentence.split("___");

  function submit() {
    const results = values.map((value, index) =>
      checkFillBlank(exercise.blanks[index], value),
    );
    const correct = results.filter(Boolean).length;
    setFeedback(results.map((ok) => (ok ? "correct" : "wrong")));
    setSubmitted(true);
    onResult(percentCorrect(correct, results.length), { values });
  }

  function retry() {
    setValues(exercise.blanks.map(() => ""));
    setFeedback(exercise.blanks.map(() => "idle"));
    setSubmitted(false);
  }

  const allAnswered = values.every((value) => value.trim().length > 0);
  const anyWrong = feedback.some((kind) => kind === "wrong");

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{exercise.title}</h3>
      <p className="mt-1 text-sm text-stone-600">{exercise.instruction}</p>

      {exercise.translation ? (
        <p className="mt-2 text-sm italic text-stone-500">
          Translation: {exercise.translation}
        </p>
      ) : null}

      <div className="mt-4 rounded-lg border border-stone-200 bg-white p-4 text-lg leading-10 text-stone-800">
        {parts.map((part, index) => (
          <span key={index}>
            {part}
            {index < parts.length - 1 ? (
              <input
                aria-label={`Blank ${index + 1} of ${exercise.blanks.length}`}
                name={`blank-${index + 1}`}
                value={values[index]}
                onChange={(event) => {
                  const next = [...values];
                  next[index] = event.target.value;
                  setValues(next);
                }}
                disabled={submitted}
                className={`mx-1 inline-block w-32 border-b-2 bg-transparent px-1 text-center focus-visible:outline-none ${
                  feedback[index] === "correct"
                    ? "border-emerald-500 text-emerald-800"
                    : feedback[index] === "wrong"
                      ? "border-rose-400 text-rose-800"
                      : "border-stone-400 focus:border-amber-600"
                }`}
              />
            ) : null}
          </span>
        ))}
      </div>

      {submitted && anyWrong ? (
        <div className="mt-3 space-y-1 text-sm text-stone-700">
          {exercise.blanks.map((blank, index) =>
            feedback[index] === "wrong" ? (
              <p key={index}>
                Blank {index + 1}:{" "}
                <span className="font-semibold">{blank.answers.join(" / ")}</span>
                {blank.hint ? <span className="text-stone-500"> ({blank.hint})</span> : null}
              </p>
            ) : null,
          )}
        </div>
      ) : null}

      {submitted ? (
        <FeedbackBanner
          kind={anyWrong ? "wrong" : "correct"}
          explainCorrect={exercise.explainCorrect}
          explainWrong={exercise.explainWrong}
          explain={exercise.explain}
          translation={exercise.translation}
        />
      ) : null}

      {!submitted ? (
        <button
          type="button"
          disabled={!allAnswered}
          onClick={submit}
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