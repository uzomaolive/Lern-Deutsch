"use client";

import { useEffect, useRef, useState } from "react";
import type { RushRound } from "@/content/games/schema";

interface QuestionState {
  index: number;
  selected: number | null;
  feedback: "idle" | "correct" | "wrong";
}

export function TimeWordRush({ round }: { round: RushRound }) {
  const [remaining, setRemaining] = useState(round.timeLimit);
  const [current, setCurrent] = useState<QuestionState>({
    index: 0,
    selected: null,
    feedback: "idle",
  });
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setFinished(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const question = round.questions[current.index];
  const allDone = current.index >= round.questions.length;

  function choose(optionIndex: number) {
    if (current.feedback !== "idle" || !question) return;
    const correct = optionIndex === question.correctIndex;
    setCurrent({
      ...current,
      selected: optionIndex,
      feedback: correct ? "correct" : "wrong",
    });
    if (correct) setScore((s) => s + 1);
  }

  function next() {
    if (current.index + 1 >= round.questions.length) {
      setFinished(true);
      return;
    }
    setCurrent({ index: current.index + 1, selected: null, feedback: "idle" });
  }

  function restart() {
    setRemaining(round.timeLimit);
    setScore(0);
    setFinished(false);
    setCurrent({ index: 0, selected: null, feedback: "idle" });
    timerRef.current = setInterval(() => {
      setRemaining((value) => {
        if (value <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setFinished(true);
          return 0;
        }
        return value - 1;
      });
    }, 1000);
  }

  if (finished || allDone) {
    return (
      <div>
        <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
        <p className="mt-3 text-lg font-semibold text-stone-900" role="status">
          {finished ? "Time is up! " : ""}Score: {score} of {round.questions.length}
        </p>
        <button
          type="button"
          onClick={restart}
          className="mt-3 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-stone-950 transition-colors hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
        >
          Play again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-base font-semibold text-stone-900">{round.title}</h3>
      <p className="mt-1 text-sm text-stone-600">{round.instruction}</p>

      <div className="mt-3 flex items-center justify-between">
        <p className="text-sm text-stone-600">
          Question {current.index + 1} of {round.questions.length} · Score {score}
        </p>
        <p
          role="timer"
          aria-label={`${remaining} seconds left`}
          className={`rounded-md px-2 py-1 text-sm font-semibold ${
            remaining <= 10 ? "bg-rose-100 text-rose-800" : "bg-stone-100 text-stone-700"
          }`}
        >
          ⏱ {remaining}s
        </p>
      </div>

      <p className="mt-4 text-lg font-medium text-stone-900">{question.prompt}</p>

      <div className="mt-3 grid gap-2 sm:grid-cols-2" role="group" aria-label="Answer options">
        {question.options.map((option, optionIndex) => {
          const isCorrectOption = optionIndex === question.correctIndex;
          const isSelected = optionIndex === current.selected;
          let styles = "border-stone-300 bg-white text-stone-800 hover:border-amber-500";
          if (current.feedback !== "idle") {
            if (isCorrectOption) {
              styles = "border-emerald-500 bg-emerald-50 text-emerald-900";
            } else if (isSelected) {
              styles = "border-rose-400 bg-rose-50 text-rose-900";
            } else {
              styles = "border-stone-200 bg-stone-50 text-stone-500";
            }
          }
          return (
            <button
              key={option}
              type="button"
              disabled={current.feedback !== "idle"}
              onClick={() => choose(optionIndex)}
              className={`rounded-lg border px-4 py-3 text-left text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 ${styles}`}
            >
              {option}
            </button>
          );
        })}
      </div>

      {current.feedback !== "idle" ? (
        <div className="mt-3 flex items-center gap-3">
          <p
            role="status"
            className={`text-sm font-medium ${
              current.feedback === "correct" ? "text-emerald-700" : "text-rose-700"
            }`}
          >
            {current.feedback === "correct"
              ? "Richtig!"
              : `Fast! Die richtige Antwort: ${question.options[question.correctIndex]}`}
          </p>
          <button
            type="button"
            onClick={next}
            className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-stone-950 transition-colors hover:bg-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  );
}