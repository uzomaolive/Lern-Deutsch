"use client";

import { useState } from "react";
import type { KeypadRound } from "@/content/games/schema";

interface NumberKeypadGameProps {
  round: KeypadRound;
  seed: string;
}

const KEYS = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];

export function NumberKeypadGame({ round }: NumberKeypadGameProps) {
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState("");
  const [status, setStatus] = useState<"playing" | "correct" | "wrong">("playing");
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const item = round.items[index];

  function press(key: string) {
    if (status !== "playing") return;
    setTyped((t) => (t + key).slice(0, 5));
  }

  function submit() {
    if (status !== "playing" || typed.length === 0) return;
    if (Number(typed) === item.target) {
      setStatus("correct");
      setScore((s) => s + 1);
    } else {
      setStatus("wrong");
    }
  }

  function next() {
    if (index + 1 >= round.items.length) setDone(true);
    else {
      setIndex((i) => i + 1);
      setTyped("");
      setStatus("playing");
    }
  }

  function retry() {
    setIndex(0);
    setTyped("");
    setStatus("playing");
    setScore(0);
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

      <div className="mt-4 rounded-lg bg-white p-5 text-center">
        <p className="text-2xl font-semibold text-stone-900">{item.word}</p>
        <p className="mt-1 text-sm text-stone-500">Tap the digits on the keypad.</p>

        <p
          aria-live="polite"
          className={`mt-4 text-3xl font-bold tracking-widest ${status === "wrong" ? "text-rose-600" : "text-stone-900"}`}
        >
          {typed.length > 0 ? typed : "·"}
        </p>

        <div className="mx-auto mt-4 grid max-w-56 grid-cols-3 gap-2">
          {KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => press(key)}
              className="h-12 rounded-lg border border-stone-300 bg-white text-xl font-semibold text-stone-800 transition-colors hover:border-amber-500 hover:bg-amber-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
            >
              {key}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setTyped((t) => t.slice(0, -1))}
            className="h-12 rounded-lg border border-stone-300 bg-stone-100 text-sm font-semibold text-stone-600 transition-colors hover:border-amber-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            ⌫
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={typed.length === 0 || status !== "playing"}
            className="col-span-2 h-12 rounded-lg bg-amber-600 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-700 disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Check
          </button>
        </div>

        {status === "correct" ? (
          <p className="mt-3 font-medium text-emerald-700">Richtig! ✓</p>
        ) : status === "wrong" ? (
          <p className="mt-3 font-medium text-rose-700">Not quite. The number was {item.target}.</p>
        ) : null}

        {status !== "playing" ? (
          <button
            type="button"
            onClick={next}
            className="mt-4 rounded-lg bg-amber-600 px-4 py-2 text-sm font-semibold text-stone-950 transition-colors hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600"
          >
            Next →
          </button>
        ) : null}
      </div>
    </div>
  );
}